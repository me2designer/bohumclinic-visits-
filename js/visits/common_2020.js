$(function(){ // DOCUMENT READY...
/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    svgImport = function (callback){
        $('img.svg').each(function(){
            var $img = $(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            $.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = $(data).find('svg');
                // Add replaced image's ID to the new SVG
                if(typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if(typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass+' replaced-svg');
                }
                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');
                // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
                if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                    $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
                }
                // Replace image with new SVG
                $img.replaceWith($svg);
                if(callback) callback();
            }, 'xml');
        });
    }
    svgImport();



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){


    /* FOOTER */
    var $wrap = $('#footer');
    
    if($wrap.length){
        scrollAction({
            target: $wrap,
            top: 100,
            scrollDownAction : function(){
                // 스크롤 DOWN 액션
                $wrap.addClass('active');
            },
            scrollUpAction : function(){
                // 스크롤 UP 액션
                $wrap.removeClass('active');
            }
        });
        // 위로가기
        $wrap.prepend('<button class="toTop" type="button"><i>TOP</i></button>');
        $wrap.find('.toTop').on('click', function(){
            $('html, body').animate({scrollTop: 0}, 400);
        });
    
        $(window).on('scroll', function () {
            var windowT = $(this).scrollTop();
    
            if (windowT >= 100){
                $wrap.find('.toTop').addClass('active');
            } else {
                $wrap.find('.toTop').removeClass('active');
            }
        });
    }



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/});// DOCUMENT READY...