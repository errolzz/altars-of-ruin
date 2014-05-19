'use strict';

/* Directives */

var directives = angular.module('App.directives', []);

//prevents highlighting html when clicked
directives.directive('eatClick', 
    function() {
        return function(scope, element, attributes) {
            element[0].onselectstart = function() { return false; };
            element[0].style.MozUserSelect = 'none';
            element[0].style.KhtmlUserSelect = 'none';
            element[0].unselectable = 'on';
        }
    });

//turns an element into a scrollable list
directives.directive('scrollable',
    function() {
        return function(scope, element, attributes) {
            var yPos = element.attr('data-top') || element.prop('offsetTop'),
                windowHeight = Math.min(640, window.innerHeight),
                footerHeight = element.attr('data-footer') || 76, //custom or standard footer height
                scrollHeight = (windowHeight - yPos - footerHeight) + 'px';

            element.css('height', scrollHeight);

            scope.$watchCollection('[view.screen, view.overlayScreen, play.tier, townScreen]', function() {
                element[0].scrollTop = 0;
            });
        }
    });

directives.directive('autoBlur', 
    function() {
        return function(scope, element, attributes) {
            scope.$watch('heroCreated', function() {
                if(scope.heroCreated) {
                    element[0].blur();
                }
            });
        }
    });

directives.directive('expandable',
    function($timeout) {
        return function(scope, element, attributes) {
            var scroller;
            if(scope.zone) {
                scope.$watch('zone.selected', function() {
                    if(scope.zone.selected) {
                        scroller = U.getParentByClass(element[0], 'scroller');
                        U.scrollTo(scroller, element[0].offsetTop, 100); //68

                    }
                });
            }
            if(scope.item) {
                scope.$watchCollection('[item.selectedToEquip, item.selectedToBag, item.selectedToBuy, item.selectedToSell, item.selectedToForge]', function() {
                    if(scope.item.selectedToEquip || scope.item.selectedToBag || scope.item.selectedToBuy || scope.item.selectedToSell || scope.item.selectedToForge) {
                        scroller = U.getParentByClass(element[0], 'scroller');
                        var topMargin = 0;
                        if(scope.item.selectedToEquip || scope.item.selectedToBag) {
                            topMargin = 0; //196

                            $timeout(function() {
                                U.scrollTo(scroller, element[0].offsetTop - topMargin, 100);
                            }, 50);
                        } else {
                            U.scrollTo(scroller, element[0].offsetTop - topMargin, 100);
                        }
                        
                    }
                });
            }
            if(scope.mob) {
                scope.$watch('mob.selected', function() {
                    if(scope.mob.selected) {
                        scroller = U.getParentByClass(element[0], 'scroller');
                        U.scrollTo(scroller, element[0].offsetTop, 100);
                    }
                });
            }
            if(scope.skill) {
                scope.$watch('skill.selected', function() {
                    if(scope.skill.selected) {
                        scroller = U.getParentByClass(element[0], 'scroller');
                        U.scrollTo(scroller, element[0].offsetTop, 100); //no topMargin because this has absolute pos from force-top class
                    }
                });
            }
        }
    })

//keeps the log scrolled to the bottom
directives.directive('combatLog',
    function() {
        return function(scope, element, attributes) {
            scope.$watch('combatStatuses.length', function() {
                element[0].scrollTop = element[0].scrollHeight;
            });
        }
    });

//the hero health bar
directives.directive('heroHealthProgress',
    function() {
        return function(scope, element, attributes) {
            //watch the hero life
            scope.$watch('play.hero.currentLife', function() {
                var p = Math.max(scope.play.hero.currentLife / scope.play.hero.maxLife * 100, 0) + '%';
                element.css('width', p + '%');
            });
        }
    });

//the mob health bar
directives.directive('mobHealthProgress',
    function() {
        return function(scope, element, attributes) {
            //watch the mob life
            scope.$watch('play.mob.currentLife', function() {
                if(scope.play.mob) {
                    var p = Math.max(scope.play.mob.currentLife / scope.play.mob.maxLife * 100, 0) + '%';
                    element.css('width', p);
                }
            });
        }
    });

//the hero experience bar
directives.directive('heroExpProgress',
    function() {
        return function(scope, element, attributes) {
            //watch the hero life
            scope.$watch('play.hero.experiencePercent', function() {
                try {
                    var p = scope.play.hero.experiencePercent + '%';
                    element.css('width', p + '%');
                } catch(e) {}
            });
        }
    });

