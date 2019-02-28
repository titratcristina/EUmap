/* Alternativă simplificată a directivei cu președinții pentru a fi afișată pe ecran-ul conectat la raspberry*/

var app = angular.module("myApp", []);
var socket = io(),
    lastdata, paused = false;

// actualizare în timp real prin intermediul socket-ului la adaugarea aprecierilor
socket.on('update', function (msg) {
    scope.get();
});

// funcție pentru schimbarea cardului cu președinția într-un interval de timp
function increment() {
    // se resetează când ajunge la capăt și o ia de la început
    scope.$apply(function () {
        if (scope.cindex == scope.data.presidency.length - 1)
            scope.cindex = 0;
        else
            scope.cindex++;
    });
    // cardul rămâne 5 secunde pe ecran, iar condiția este pentru a nu se suprapune cu timeoutul de la primirea socketului
    if (!paused) {
        setTimeout(function () {
            increment();
        }, 5000)
    }
}

setTimeout(function () {
    scope = angular.element($("html")).scope();
    // afișează notificarea, numită și toast, în partea de sus când un utilizator se conectează
    socket.on('user_connected', function (msg) {
        toastr.success('<h2>Un utilizator s-a conectat!</h2>', '', {
            "positionClass": "toast-top-full-width",
            "progressBar": false,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        });
        // pentru a șterge notificarea de pe ecran după 4 secunde
        setTimeout(function () {
            toastr.clear()
        }, 4000);
    });
    if (!paused) {
        setTimeout(function () {
            increment();
        }, 5000)
    }
}, 500);

app.controller('section', function ($scope, $http, $window) {
    $scope.cindex = 0;
    // încarcă datele de pe API în scope
    $scope.data = {};
    $scope.get = function (first) {
        $http.get("/presidency")
            .then(function (response) {
                $scope.data.presidency = response.data;
                if (!first) {
                    for (var i = lastdata.length - 1; i >= 0; i--) {
                        if (lastdata[i].likes < response.data[i].likes) {
                            paused = true;
                            $scope.cindex = i;
                            //afișarea notificării pe ecran când cineva dă like
                            toastr.info('<h2>' + response.data[i].name + ' a primit o apreciere!</h2>', '', {
                                "positionClass": "toast-top-full-width",
                                "progressBar": false,
                                "showEasing": "swing",
                                "hideEasing": "linear",
                                "showMethod": "fadeIn",
                                "hideMethod": "fadeOut"
                            });
                            setTimeout(function () {
                                toastr.clear();
                                paused = false;
                                increment();
                            }, 4000);
                        }
                    }
                }
                lastdata = response.data;
            });
    }
    // încărcă o dată la început
    $scope.get(true);
});
