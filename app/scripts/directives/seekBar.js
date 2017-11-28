(function() {
    function seekBar($document) {
        /*
        *@desc calculates the horizontal percent along the seek bar where the event occured.  Passed in from $event
        */
        var calculatePercent = function(seekBar, event){
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        }
        
        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: { onChange: '&' },
            link: function(scope, element, attributes){
                scope.value = 0;
                scope.max = 100;
                /*
                *@desc holds the element that matches the directive seek-bar as a jQuery object so we can call jQuery methods on it
                */
                var seekBar = $(element);
                
                attributes.$observe('value', function(newValue) {
                    scope.value = newValue;
                });
                
                attributes.$observe('max', function(newValue) {
                    scope.max = newValue;
                });
                
                /*
                *@func percentString
                *@desc calculates percent based on value and max value of seek bar
                */
                var percentString = function () {
                    /*
                    *@desc holds value of seek bar such as current song time
                    *@type value default is 0
                    */
                    var value = scope.value;
                    /*
                    *@desc holds the max value for seek bar such as total song time
                    *@type value default is 100 such as 100%
                    */
                    var max = scope.max;
                    var percent = value/max * 100;
                    return percent + "%";
                };
                /*
                *@func scope.fillStyle
                *@desc returns the width of the seek bar fill based on calculated perecent
                */
                scope.fillStyle = function () {
                    return {width: percentString()};
                };
                /*
                *@func scope.thumbStyle
                *@desc returns the placement of the thumb based on calculated percent
                */
                scope.thumbStyle = function () {
                    return {left: percentString()};
                };
                /*
                *@desc updates the seek bar value based on the seek bar's width and the location of the users click on the seek bar
                */
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                    notifyOnChange(scope.value);
                };
                
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent (seekBar, event);
                            scope.$apply(function() {
                                scope.value = percent * scope.max;
                                notifyOnChange(scope.value);
                        });
                        
                });
                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
                var notifyOnChange = function(newValue) {
                    if (typeof scope.onChange === 'function') {
                        scope.onChange({value: newValue});
                    }
                };
            }
        };
    
    }
    angular
        .module('blocJams')
        .directive('seekBar', ['$document',seekBar]);
})();