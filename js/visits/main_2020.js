$(function(){ // DOCUMENT READY...
/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){


    // SVG Import
    $('img[src*=".svg"]').makeSvg();


})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){


    /* HEADER -  scroll event */
    var $wrap = $('#header');
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $wrap.outerHeight();

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();

        if(Math.abs(lastScrollTop - st) <= delta)
        return;

        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $wrap.removeClass('down').addClass('up');
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $wrap.removeClass('up').addClass('down');
            }
        }

        lastScrollTop = st;
    }



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /* HEADER - GNB */
    var $wrap = $('#header');
    var $gnb = $('#header').find('#gnb')
    var headerH = $wrap.height() * -1;

    // section 이동
    $gnb.find('.link_gnb').on('click', function(){
        var target = $(this).attr('data-target')||$(this).attr('data-anchor');
        var focus = $(this).attr('data-focus');

        moveTo({
            speed : 400,
            top : headerH - 1,
            target : target,
            focus : focus,
            afterAction : function(){
                if($wrap.hasClass('down') && target !== '#wrap'){
                    setTimeout(function(){
                        $wrap.removeClass('down');
                        $wrap.addClass('up');
                    }, 200);
                }
            }
        });
    });

    //현재위치표시
    var $section = $('#container > section');

    $section.each(function() {
        var $this = $(this);

        scrollAction({
            target: $this,
            top: 0,
            scrollDownAction : function(){
                // 스크롤 DOWN 액션
                var id = $this.attr('id');
                var width = $gnb.find('.link_gnb[data-target="#'+id+'"] span').width();
                var left = $gnb.find('.link_gnb[data-target="#'+id+'"] span').position().left;

                $gnb.find('.bar').attr('style','width:'+width+'px;transform:translateX('+left+'px)');
                $gnb.find('.link_gnb').removeClass('on');
                $gnb.find('.link_gnb[data-target="#'+id+'"]').addClass('on')
            },
            scrollUpAction : function(){
                // 스크롤 UP 액션
                var $prev = $this.prev();
                var id = $prev.attr('id');

                if($prev.length){
                    var width = $gnb.find('.link_gnb[data-target="#'+id+'"] span').width();
                    var left = $gnb.find('.link_gnb[data-target="#'+id+'"] span').position().left;

                    $gnb.find('.bar').attr('style','width:'+width+'px;transform:translateX('+left+'px)');
                    $gnb.find('.link_gnb').removeClass('on');
                    $gnb.find('.link_gnb[data-target="#'+id+'"]').addClass('on')
                }
            }
        });
    });



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /* 메인 비주얼 */
    var $wrap = $('#secVisual');

    var swiper = new Swiper($wrap.find('.swiper-container'), {
        autoplay: {
            delay: 4000,
            disableOnInteraction : false,
        },
        pagination: {
            el: $wrap.find('.swiper-pagination'),
            clickable: true,
        },
        effect: 'fade',
        speed: 1000,
    });



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /* 서비스 소개 */
    var $wrap = $('#secService');
    var $btnTab = $wrap.find('.btn_tab');
    var swiper = new Swiper($wrap.find('.swiper-container'), {
        autoplay: {
            delay: 6000,
            //disableOnInteraction : false,
        },
        effect: 'fade',
        fadeEffect: { crossFade: true },
        speed: 600,
        loop: true,
        pagination: {
            el: $wrap.find('.swiper-pagination'),
            clickable: true,
            renderBullet: function (index, className) {
                if (index == 3 || index == 4){
                    return '';
                }
                return '<span class="' + className + '"></span>';
            },
        },
        on : {
            slideChangeTransitionStart : function(){
                $wrap.attr('data-slide',this.realIndex);

                // Tab pagination
                if (this.realIndex <= 2){
                    $btnTab.removeClass('on');
                    $btnTab.eq(0).addClass('on');
                } else if (this.realIndex == 3){
                    $btnTab.removeClass('on');
                    $btnTab.eq(1).addClass('on');
                } else if (this.realIndex == 4){
                    $btnTab.removeClass('on');
                    $btnTab.eq(2).addClass('on');
                }

                // Tab Index
                var tabIdx = $btnTab.siblings('.on').index();
                $wrap.attr('data-tab',tabIdx);

                // .msg pagination
                if (this.realIndex == 3 || this.realIndex == 4){
                    $wrap.find('.swiper-pagination').removeClass('on');
                } else {
                    $wrap.find('.swiper-pagination').addClass('on');
                }

                // animateNumber
                var $this = $wrap.find('[data-swiper-slide-index='+this.realIndex+']');
                var $count = $this.find('.count');
                var $num = $this.find('.num');
                var _countWidth = $count.width();
                var _countNum = $num.html();

                $count.css('min-width',_countWidth);

                if ($num.hasClass('animateNumber')){
                    $num.animateNumber({
                        totalPlayTime : 600,
                        endNumber : _countNum.replace(/[^0-9]/g,''),
                        endValue : _countNum,
                    });
                }

                // data-slide:3 → data-slide:2 뒤로 이동한 경우에
                if (this.realIndex == 3){
                    $wrap.find('[data-swiper-slide-index=2] .num').addClass('animateNumber');
                } else {
                    $wrap.find('[data-swiper-slide-index=2] .num').removeClass('animateNumber');
                }

                // data-slide:1 → data-slide:0 뒤로 이동한 경우에
                if (this.realIndex == 1){
                    $wrap.find('[data-swiper-slide-index=0] .num').removeClass('animateNumber');
                } else {
                    $wrap.find('[data-swiper-slide-index=0] .num').addClass('animateNumber');
                }
            },
        },
    });


    $btnTab.on('click', function(){
        var idx = $(this).index();

        if (idx == 0){
            swiper.slideTo($wrap.find('.swiper-slide[data-swiper-slide-index=0]').index(), 0, true);
        } else if (idx == 1){
            swiper.slideTo($wrap.find('.swiper-slide[data-swiper-slide-index=3]').index(), 0, true);
        } else if (idx == 2){
            swiper.slideTo($wrap.find('.swiper-slide[data-swiper-slide-index=4]').index(), 0, true);
        }
    });



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /* 전문가 네트워크 */
    var $wrap = $('#secNetwork');

    // line 리셋
    TweenMax.set($wrap.find('.bg .line'), {strokeDasharray:2000, strokeDashoffset:2000})

    scrollAction({
        target: $wrap,
        top: 40,
        scrollDownAction : function(){
            // 스크롤 DOWN 액션
            $wrap.addClass('active');

            if($wrap.hasClass('active')){
                TweenMax.to($wrap.find('.bg .line'), 2, {strokeDasharray:3460, strokeDashoffset:1730, delay:0.5, ease:Linear.easeNone})
                TweenMax.staggerTo($wrap.find('.bg span'), 0.5, {opacity:1, delay:0.5}, 0.5)
                TweenMax.staggerTo($wrap.find('.item_network'), 2, {backgroundColor:'rgba(0,0,0,0.7)', delay:2.5, className:'item_network on'}, 0.5)
            }
        },
        scrollUpAction : function(){
            // 스크롤 UP 액션
        }
    });



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /* 수상내역 */
    var $wrap = $('#secAward');
    var Y;

    function anim (index){
        var $year = $wrap.find('.swiper-container .swiper-slide-active').find('.year');
        var len = $year.find('i').length;
        var num = Y[len-index];
        var $el = $year.find('i').eq(len-index);
        $el.animateNumber({
            increase : 1,
            interval : 20,
            startNumber : 0,
            endNumber : 9,
            endValue : num,
            callback : function(){
                index++;
                $el = $year.find('i').eq(len-index);
                if(index-1!=len) anim(index);
            }
        }, true);
    }

    function afterSlideAction (el){
        var $this = el;
        var _index = Number($this.attr('data-swiper-slide-index'));

        $wrap.attr('slide-index', _index);

        var $year = $this.find('.year');
        var y = $year.attr('data-year');

        if(Y!=y){
            Y=y;
            $year.find('i').text(0)
            anim(0)
        }
    }

     // 본문
     var swiper = new Swiper($wrap.find('.swiper-container'), {
        autoplay: {
            delay: 3000,
            disableOnInteraction : false,
        },
        fadeEffect: { crossFade: true },
        virtualTranslate: true,
        slidersPerView: 1,
        effect: "fade",
        speed: 1000,
        loop: true,
        loopedSlides: 3,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: $wrap.find('.swiper-pagination'),
            clickable: true,
            renderBullet: function (index, className) {
                return '<button class="'+className+'" type="button"><strong></strong></button>';
            },
        },
        on: {
            slideChangeTransitionStart : function(){
                var $this = $wrap.find('.swiper-container .swiper-slide-active');
                afterSlideAction($this);
            },
        },
    });


    var $pagination = $wrap.find('.swiper-pagination');

    $pagination.append('<div class="bar"></div>')

})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /* 방문상담신청 */
    var $wrap = $('#freeConsult');

    // swiper
    var swiper = new Swiper($wrap.find('.swiper-container'), {
        autoplay: {
            delay: 1400,
            disableOnInteraction : false,
        },
        pagination: {
            el: $wrap.find('.swiper-pagination'),
            clickable: true,
        },
        speed: 600,
        loop : true,
    });

    // 입력폼
    $wrap.find('.formMemo textarea').html('상담가능일시 : \r\n내용 :');

    var $local = $wrap.find('.formLocal').detach();
    var $memo = $wrap.find('.formMemo').detach();
    $wrap.find('.loadForm').importForm({
        inBoundsUrl : (SERVER.name!='local'?SERVER.bohumClinic:'')+'/api/fa/inbound',
        name : 'form_01',
        formSet : {
            'data-action' : false,
            'data-check' : false,
            'data-calc' : false,
            'data-focus-action' : false,
            'data-auto-focus' : true
        },
        addData: function(){
            var data = {};
            data.region = $wrap.find('.formLocal select').val();
            data.requestMemo = $wrap.find('.formMemo textarea').val();
            storeRegion = data.region;
            return data;
        },
        afterLoad : function(){
            $wrap.find('.formBox').prepend($local);
            $wrap.find('.formPassed').after($memo);
            var $submit = $wrap.find('.submit');
            var $submit_clone = $submit.clone();
            $submit.addClass('hidden').after($submit_clone);
            $submit_clone.on('click', function(){

                getUser($wrap.find('form'));
                if($wrap.find('.formLocal select').val()){
                    $submit.trigger('click');
                } else {
                    alert('지역을 선택하세요');
                }
            });
            resizingTextarea('textarea');
            $wrap.find('textarea').trigger('keyup');

            if(cookie.region){
                var region = cookie.region;
                $('#freeConsult select.local').val(region);
            } else {
                // if(myCity&&$('#freeConsult select.local').find('[value='+myCity+']').length){
                //     $('#freeConsult select.local').val(myCity);
                // };
            }

            if(cookie.consult_memo){
                var memo = cookie.consult_memo;
                $wrap.find('textarea').val(memo);
                $wrap.find('textarea').trigger('keyup');
            }

            // label 추가
            $wrap.find('.formLocal').prepend('<p class="labelName">지역<span>*</span></p>');
            $wrap.find('.formName').prepend('<p class="labelName">이름<span>*</span></p>');
            $wrap.find('.formBirth').prepend('<p class="labelName">생년월일<span>*</span></p>');
            $wrap.find('.formPhone').prepend('<p class="labelName">연락처<span>*</span></p>');
            $wrap.find('.formMemo').prepend('<p class="labelName">문의사항</p>');
        },
        afterSend : function(){

            cookie.set('region', $wrap.find('.formLocal select').val());
            cookie.set('consult_memo', $wrap.find('textarea').val());
            setTimeout(function(){

                var gtag_label = '';
                if(params.pid) gtag_label+=('&pid='+params.pid);
                if(params.aid) gtag_label+=('&aid='+params.aid);
                if(gtag) {
                    gtag('event', '상담', {
                        'send_to': adList.googleAds,
                        'event_category': '추적',
                        'event_label': gtag_label
                    });
                    gtag('event', '상담', {
                        'send_to': adList.googleAnalytics,
                        'event_category': '추적',
                        'event_label': gtag_label
                    });
                    cookie.set('gtag_submit', 1);
                }

                LAYER({
                    name : 'mainConsultComp',
                });
            },500)
        }
    });



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    var $wrap = $('#asideContTop');
    var wrapW = $wrap.width();    
    TweenMax.set($wrap, {right:wrapW * -1})

    // layer open
    var $btnOpen = $wrap.find('.btn_open');
    $btnOpen.on('click', function(){
        moveTo({
            speed : 400,
            top : 0,
            target : $('#wrap'),
            afterAction : function(){
                console.log('a');
            }
        });
    });



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/});// DOCUMENT READY...