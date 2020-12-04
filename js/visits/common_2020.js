$(function(){ // DOCUMENT READY...
/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){


   


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