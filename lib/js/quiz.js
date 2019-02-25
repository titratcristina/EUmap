/*
Dynamic JS Quiz
Source: https://codepen.io/4D1L/pen/rOOWYM
Adaptat la proiectul curent.
*/

$(document).ready(function () {
    "use strict";

    // arrayul cu întrebari, variantele de răspuns și răspunsurile corecte
    var questions = [{
            question: "Care este mottoul președinției române?",
            choices: ['Coeziunea, o valoare comună europeană', 'Puterea stă în unire', 'O Europă care protejează', 'Uniţi în diversitate', 'Toţi în unu'],
            correctAnswer: 0
        }, {
            question: "În ce an a preluat Estoina Președinția Consiliului UE?",
            choices: ["1 iulie - 31 decembrie 2018", "1 ianuarie - 30 iunie 2017", "1 ianuarie - 30 iunie 2019", "1 iulie - 31 decembrie 2015", "1 iulie - 31 decembrie 2017"],
            correctAnswer: 4
        }, {
            question: "Care sunt statele fondatoare ale Uniunii Europene?",
            choices: ['🇧🇬 Bulgaria, 🇷🇴 România', '🇧🇪 Belgia, 🇫🇷 Franța, 🇩🇪 Germania, 🇮🇹 Italia, 🇱🇺 Luxemburg, 🇳🇱 Olanda', '🇩🇰 Danemarca, 🇮🇪 Irlanda, 🇬🇧 Regatul Unit', '🇦🇹 Austria, 🇫🇮 Finlanda, 🇸🇪 Suedia', '🇨🇾 Cipru, 🇪🇪 Estonia, 🇱🇻 Letonia, 🇲🇹 Malta, 🇵🇱 Polonia'],
            correctAnswer: 1
        }, {
            question: "Președinția Românei la Consiliul Uniunii Europene urmărește...",
            choices: ['să coopereze cu partenerii săi pentru unitatea dintre statele membre', 'să aprofundeze dimensiunile sociale ale UE', 'să depășească fragmentarea, punând accentul pe cetățeni', 'să contribuie la asigurarea convergenței și coeziunii europene', 'să conserve valorile comune,'],
            correctAnswer: 3
        }, {
            question: "În ce perioadă a preluat România Președinția Consiliului UE?",
            choices: ["1 ianuarie - 30 iunie 2019", "1 iulie - 31 decembrie 2015", "1 ianuarie - 30 iunie 2018", "1 ianuarie - 30 iunie 2015", "1 iulie - 31 decembrie 2018"],
            correctAnswer: 0
        }, {
            question: "În ce an a intrat România în Uniunea Europeană?",
            choices: ["2013", "1986", "2004", "2007", "1958"],
            correctAnswer: 3
        }, {
            question: "Cine are cea mai mare populație din UE?",
            choices: ["Franța", "România", "Estonia", "Suedia", "Germania"],
            correctAnswer: 4
        }, {
            question: "Ce țară are cea mai mare suprafață din UE?",
            choices: ["Suedia", "Germania", "Franța", "Spania", "Finlanda"],
            correctAnswer: 2
  }, {
            question: "România face parte din spațiul Schengen?",
            choices: ['da', 'este candidat', 'nu'],
            correctAnswer: 1
  }, {
            question: "Câte țări sunt în Uniunea Europeană?",
            choices: ['2', '22', '103', '28', '-2'],
            correctAnswer: 3
  }
  ];

    var questionCounter = 0; // numarul de întrebări
    var selections = []; // arrayul pentru alegerile utilizatorului
    var quiz = $('.content'); // divul pentru quiz

    // apelează funcția care afișează întrebarea conform variabilei questionCounter
    // pentru afișarea inițială
    displayNext();

    // butonul înainte, care permite trecerea la următoarea întrebare
    $('#next').on('click', function (e) {
        // ascunderea butonului in timpul animației (când se schimbă întrebarea)
        if (quiz.is(':animated')) {
            return false;
        }
        choose(); // adaugă răspunsul ales de utilizator în arrayul cu răsp. corecte

        // afișarea unei alerte când utilizatorul nu a selectat niciun răspuns
        if (isNaN(selections[questionCounter])) {
            $('#warning').text('Te rog, selectează un raspuns!');
        } else {
            questionCounter++; // incrementarea indexului
            displayNext(); // afișarea întrebării conform indexului incrementat
            $('#warning').text(''); // golirea alertei
        } //trece la întrebarea urmatoare dacă este selectat un răspuns
    });

    // butonul înapoi, care permite trecerea la întrebarea anterioară
    $('#prev').on('click', function (e) {
        // neafișarea butonului in timpul animației (când se schimbă întrebarea)
        if (quiz.is(':animated')) {
            return false;
        }
        choose(); // adaugă răspunsul ales de utilizator în arrayul cu răsp. corecte
        questionCounter--; // decrementarea indexului
        displayNext(); // afișarea întrebării conform indexului incrementat
    });

    // butonul Start Over care resetează și reîncepe quizul 
    $('#start').on('click', function (e) {
        if (quiz.is(':animated')) {
            return false;
        }
        questionCounter = 0; // indexul revine la poziția zero
        selections = []; // se golește arrayul cu răspunsuri
        displayNext(); // se afișează întrebarea cu indexul 0, adică prima
        $('#start').hide(); // se ascunde butonul, deoarece apare la finalul t
    });

    // crearea și returnarea divului care conține întrebări, butoanele radio cu variantele de rpspuns și textul de avertizare 
    function createQuestionElement(index) {
        var qElement = $('<div>', {
            id: 'question'
        });
        //variabila cu numărul întrebării
        var header = $('<h3>Întrebarea ' + (index + 1) + ':</h3>');
        qElement.append(header);
        //variabila cu întrebarea
        var question = $('<p>').append(questions[index].question);
        qElement.append(question);
        //variabila cu inputurile radio
        var radioButtons = createRadios(index);
        qElement.append(radioButtons);
        //variabila cu textul de avertizare
        var warningText = $('<p id="warning">');
        qElement.append(warningText);

        return qElement;

    }

    // crearea dinamică a listei cu opțiuni de răspuns 
    function createRadios(index) {
        var radioList = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < questions[index].choices.length; i++) {
            item = $('<li>');
            input = '<input type="radio" name="answer" value=' + i + ' />';
            input += questions[index].choices[i];
            item.append(input);
            radioList.append(item);
        }
        return radioList;
    }

    // în array-ul cu răspunsuri, la poziția întrebării curente se adaugă varianta de răspuns aleasă de utilizator
    function choose() {
        selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }

    // aafișarea întrebării conform indexului incrementat
    function displayNext() {
        quiz.fadeOut(function () {
            $('#question').remove();

            if (questionCounter < questions.length) {

                var nextQuestion = createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();
                if (!(isNaN(selections[questionCounter]))) {
                    $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
                }

                // controlarea afișării butonului înapoi
                if (questionCounter === 1) {
                    $('#prev').show();
                } else if (questionCounter === 0) {
                    $('#prev').hide();
                    $('#next').show();
                }

            } else {
                var scoreElem = displayScore();
                quiz.append(scoreElem).fadeIn();
                $('#next').hide();
                $('#prev').hide();
                $('#start').show();
            }
        });
    }

    // calcularea punctajului și returnarea unui paragraf 
    function displayScore() {
        var score = $('<h3>', {
            id: 'question'
        });

        var numCorrect = 0;
        for (var i = 0; i < selections.length; i++) {
            if (selections[i] === questions[i].correctAnswer) {
                numCorrect++;
            }
        }
        // afișarea unui mesaj în funcție de puntajul obținut
        var percentage = numCorrect / questions.length;
        if (percentage >= 0.9) {
            score.append('🤩 Incredibil! Ai obținut <span style="color: green;">' + numCorrect + ' din ' +
                questions.length + '</span> răspunsuri corecte!');
        } else if (percentage >= 0.7) {
            score.append('😊 Bună treabă! Ai obținut <span style="color: blue;">' + numCorrect + ' din ' +
                questions.length + '</span> răspunsuri corecte!');
        } else if (percentage >= 0.5) {
            score.append('🤔 Ai obținut <span style="color: orange;">' + numCorrect + ' din ' +
                questions.length + '</span> răspunsuri corecte.');
        } else {
            score.append('😞 Ai obținut doar <span style="color: red;">' + numCorrect + ' din ' +
                questions.length + '</span> răspunsuri corecte. Vrei sa incerci iar?');
        }
        score.append('<br><br><div class="progress"><div class="progress-bar" role="progressbar" style="width: ' + percentage * 100 + '%;" aria-valuenow="' + percentage * 100 + '" aria-valuemin="0" aria-valuemax="100">' + percentage * 100 + '%</div></div>')
        return score;
    }
});
