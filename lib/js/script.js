//activarea scroll-ului smooth
var scroll = new SmoothScroll('a[href*="#"]:not([data-easing]):not([data-toggle="tab"])');

//funcția pentru deschiderea modalului cu președințiile
function openModal() {
    $('#Modal').modal('show');
}

//funcția pentru deschiderea modalului cu orașe
function openCityModal() {
    $('#cityModal').modal('show');
}

//controlarea meniului din modalul de la președinții
$('#nav-tab a').on('click', function (e) {
    e.preventDefault();
    $(this).tab('show');
});

//activarea funcției care ascunde sau afișează un div sau o porțiune de text 
$('.collapse').collapse()

// funcţia care stochează vizitatorii într-un cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// funcţia care returnează valoarea unui cookie specific
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

setTimeout(function () {
    (function () {
        // Vertical Timeline - by CodyHouse.co
        function VerticalTimeline(element) {
            this.element = element;
            this.blocks = this.element.getElementsByClassName("js-cd-block");
            this.contents = this.element.getElementsByClassName("js-cd-content");
            this.offset = 0.8;
            this.hideBlocks();
        };

        VerticalTimeline.prototype.hideBlocks = function () {
            // ascunde blocurile când nu sunt în prim plan 
            if (!"classList" in document.documentElement) {
                return;
            }
            var self = this;
            for (var i = 0; i < this.blocks.length; i++) {
                (function (i) {
                    if (self.blocks[i].getBoundingClientRect().top > window.innerHeight * self.offset) {
                        self.contents[i].classList.add("cd-is-hidden");
                    }
                })(i);
            }
        };

        VerticalTimeline.prototype.showBlocks = function () {
            if (!"classList" in document.documentElement) {
                return;
            }
            var self = this;
            for (var i = 0; i < this.blocks.length; i++) {
                (function (i) {
                    if (self.contents[i].classList.contains("cd-is-hidden") && self.blocks[i].getBoundingClientRect().top <= window.innerHeight * self.offset) {
                        // adaugă animația bounce-in
                        self.contents[i].classList.add("cd-timeline__content--bounce-in");
                        self.contents[i].classList.remove("cd-is-hidden");
                    }
                })(i);
            }
        };

        var verticalTimelines = document.getElementsByClassName("js-cd-timeline"),
            verticalTimelinesArray = [],
            scrolling = false;
        if (verticalTimelines.length > 0) {
            for (var i = 0; i < verticalTimelines.length; i++) {
                (function (i) {
                    verticalTimelinesArray.push(new VerticalTimeline(verticalTimelines[i]));
                })(i);
            }

            // arată blocurile când se dă scroll
            window.addEventListener("scroll", function (event) {
                if (!scrolling) {
                    scrolling = true;
                    (!window.requestAnimationFrame) ? setTimeout(checkTimelineScroll, 250): window.requestAnimationFrame(checkTimelineScroll);
                }
            });
        }

        function checkTimelineScroll() {
            verticalTimelinesArray.forEach(function (timeline) {
                timeline.showBlocks();
            });
            scrolling = false;
        };
    })();
}, 500)
