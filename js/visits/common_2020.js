$(function(){ // DOCUMENT READY...
/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){


    /* toTop */ 
    var $wrap = $('#wrap');

    $wrap.append('<button id="toTop" type="button"><i>TOP</i></button>');
    $('#toTop').on('click', function(){
        $('html, body').animate({scrollTop: 0}, 400);
    });

   $(window).on('scroll', function () {
       var windowT = $(this).scrollTop();

       if (windowT >= 100){
           $('#toTop').addClass('active');
       } else {
           $('#toTop').removeClass('active');
       }
   });



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){


    
   // 개인정보이용수집동의
   $('.agreeText').on('click', function(){
    ckeck_policy3 = $(this).parents('form').find('input[name*=agree]');
    LAYER('policy3');
    });

    // 개인정보처리방침
    $('.privacy').on('click', function(){
        LAYER('policy1');
    });

    // 이용약관
    $('.usage').on('click', function(){
        LAYER('policy2');
    });



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/});// DOCUMENT READY...