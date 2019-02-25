//directivele paginii
app.directive('navbar', function () {
    return {
        restrict: 'E', // crearea unui element-tag 
        templateUrl: '/lib/html/navbar.html'
    }
});

app.directive('intro', function () {
    return {
        restrict: 'E',
        templateUrl: '/lib/html/intro.html'
    }
});

app.directive('presidency', function () {
    return {
        restrict: 'E',
        templateUrl: '/lib/html/presidency.html'
    }
});

app.directive('modal', function () {
    return {
        restrict: 'E',
        templateUrl: '/lib/html/modal.html'
    }
});

app.directive('city', function () {
    return {
        restrict: 'E',
        templateUrl: '/lib/html/city.html'
    }
});

app.directive('map', function () {
    return {
        restrict: 'E',
        templateUrl: '/lib/html/map.html'
    }
});

app.directive('priorities', function () {
    return {
        restrict: 'E',
        templateUrl: '/lib/html/priorities.html'
    }
});


app.directive('timeline', function () {
    return {
        restrict: 'E',
        templateUrl: '/lib/html/timeline.html'
    }
});


app.directive('footsy', function () {
    return {
        restrict: 'E',
        templateUrl: '/lib/html/footer.html'
    }
});

/* Source: https://embed.plnkr.co/plunk/1esaGq
https://stackoverflow.com/questions/23646395/rendering-a-star-rating-system-using-angularjs
Adaptat la proiectul curent
*/
app.directive('starRating', function () {
    return {
        restrict: 'A', // crearea unui atribut introdus în tag
        template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
            '\u2605' + // caracterul steluţă
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {
            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({ //memorarea în array numărul de steluţe selectate
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };
            // urmărește valoarea variabilei care conține numărul de steluţe selectate
            scope.$watch('ratingValue', function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    }
});
