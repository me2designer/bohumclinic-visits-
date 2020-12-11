

$(function(){ // DOCUMENT READY...
/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){


    // SVG Import
    $('img[src*=".svg"]').makeSvg();


})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /* HEADER - GNB */
    var $wrap = $('#header');
    var $gnb = $wrap.find('#gnb');

    // section 이동
    $gnb.find('.link_gnb').on('click', function(){
        var target = $(this).attr('data-target')||$(this).attr('data-anchor');
        var focus = $(this).attr('data-focus');
        var top = 0;

        if (target == '#secAward'){
            top = 20 * -1;
        }

        moveTo({
            speed : 400,
            top : top,
            target : target,
            focus : focus,
        });
    });

    //현재위치표시
    var $section = $('#container > section');

    $section.each(function() {
        var $this = $(this);

        scrollAction({
            target: $this,
            top: 10,
            scrollDownAction : function(){
                // 스크롤 DOWN 액션
                var id = $this.attr('id');
                var width = $gnb.find('.link_gnb[data-target="#'+id+'"] span').width();
                var left = $gnb.find('.link_gnb[data-target="#'+id+'"] span').position().left;

                $gnb.find('.bar').attr('style','width:'+width+'px;transform:translateX('+left+'px)');
                $gnb.find('.link_gnb').removeClass('on');
                $gnb.find('.link_gnb[data-target="#'+id+'"]').addClass('on')

                // #wrap에 현재 Section명 추가
                $('#wrap').attr('data-section-name',id);
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

                    // #wrap에 현재 Section명 추가
                    $('#wrap').attr('data-section-name',id);
                }
            }
        });
    });



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /* 메인 비주얼 */
    var $wrap = $('#secVisual');
    var state = false;

    var swiper = new Swiper($wrap.find('.swiper-container'), {
        autoplay: {
            delay: 4000,
            disableOnInteraction : false,
        },
        effect: 'fade',
        speed: 1000,
        pagination: {
            el: $wrap.find('.swiper-pagination'),
            clickable: true,
        },
        on : {
            init : function(){                
                var $this = $wrap.find('.swiper-slide-active');

                $wrap.addClass('active');
                TweenMax.set($wrap.find('.bg'), {scale:1.05});
                TweenMax.to($this.find('.bg'), 5, {scale:1});

                state = true;
            },
            slideChangeTransitionEnd : function(){
                var $this = $wrap.find('.swiper-slide-active');

                TweenMax.set($wrap.find('.bg'), {scale:1.05});
                TweenMax.to($this.find('.bg'), 5, {scale:1});
                TweenMax.delayedCall(1, function(){
                    if (!state) return;
                    state = false;
                    
                    $('#asideCont .btn_open').click();
                });
            },
        },
    });

    // scroll down시 tweenMax 종료
    var $secService = $('#secService');
    scrollAction({
        target: $secService,
        top: 90,
        scrollDownAction : function(){
            // 스크롤 DOWN 액션
            state = false;
        },     
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
            disableOnInteraction : false,
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


    // 순서 reset
    scrollAction({
        target: $wrap,
        top: 10,
        scrollDownAction : function(){
            // 스크롤 DOWN 액션
            swiper.slideTo($wrap.find('.swiper-slide[data-swiper-slide-index=0]').index(), 600, true);
        },
    });



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /* 전문가 네트워크 */
    var $wrap = $('#secNetwork');
    var tl = new TimelineMax();
    
    scrollAction({
        target: $wrap,
        top: 10,
        scrollDownAction : function(){
            // 스크롤 DOWN 액션
            tl.addLabel("span", 0)
              .to($wrap.find('.bg .line'), 2, {strokeDasharray:3460, strokeDashoffset:1730, ease:Linear.easeNone})
              .staggerTo($wrap.find('.bg span'), 0.5, {opacity:1}, 0.5, "span")
              .staggerTo($wrap.find('.item_network'), 2, {backgroundColor:'rgba(0,0,0,0.7)', className:'item_network on'}, 0.5);

            tl.restart();
        }
    });

    scrollAction({
        target: $wrap,
        top: 100,
        scrollUpAction : function(){
            console.log('a');
            // 스크롤 UP 액션
            tl.kill();
            $wrap.find('.bg .line').css({'stroke-dasharray':2000, 'stroke-dashoffset':2000});
            $wrap.find('.bg span').css({opacity:0});
            $wrap.find('.item_network').css({'background-color':'rgba(0,0,0,0)'}).removeClass('on');
        },
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


    // 순서 reset
    scrollAction({
        target: $wrap,
        top: 10,
        scrollDownAction : function(){
            // 스크롤 DOWN 액션
            swiper.slideTo($wrap.find('.swiper-slide[data-swiper-slide-index=0]').index(), 1000, true);
        },
    });



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



    /* 상담신청 side */
    var $wrap = $('#asideCont');
    var $service = $('#secService');
    var $freeConsult = $('#freeConsult');
    var $btnOpen = $wrap.find('.btn_open');
    var wrapW = $wrap.width();

    // layer open
    $btnOpen.on('click', function(){
        if (!$wrap.hasClass('active')){
            $wrap.addClass('active noTouch');
            TweenMax.to($wrap, 0.4, {ease: Power1.easeIn, right:0, onComplete:function(){
                $wrap.removeClass('noTouch');
            }});

            if ($wrap.hasClass('btnChange')){
                $btnCont.click();
            } else {
                $btnStep.click();
            }
        } else {
            $wrap.removeClass('active noTouch');
            TweenMax.to($wrap, 1, {ease: Power4.easeOut, right:wrapW * -1, onComplete:function(){
                $wrap.removeClass('noTouch');
            }});
        };
    });

    // #secService 인접 시 Layer Close
    scrollAction({
        target: $service,
        top: 30,
        scrollDownAction : function(){
            // 스크롤 DOWN 액션
            $wrap.addClass('btnChange');

            if ($wrap.hasClass('active')){
                $btnOpen.click();
            }
        },
        scrollUpAction : function(){
            // 스크롤 UP 액션

            if ($wrap.hasClass('active') && $wrap.hasClass('btnChange')){
                $wrap.removeClass('btnChange');            
            }
        },
    });

    // #freeConsult 인접 시 Layer Close
    scrollAction({
        target: $freeConsult,
        top: 30,
        scrollDownAction : function(){
            // 스크롤 DOWN 액션
            if ($wrap.hasClass('active')){
                $btnOpen.click();

                $wrap.addClass('noTouch').animate({
                    opacity : 0
                }, 300);
            } else {
                $wrap.addClass('noTouch').animate({
                    opacity : 0
                }, 300);
            }
        },
        scrollUpAction : function(){
            // 스크롤 UP 액션
            $wrap.css({right : wrapW * -1}).removeClass('active').animate({
                opacity : 1
            }, 300,function(){
                $wrap.removeClass('noTouch');
            });
        },
    });

    // swiper
    var swiper = new Swiper($wrap.find('.swiper-container'), {
        simulateTouch: false, // drag 전환 방지
        effect: 'fade',
        fadeEffect: { crossFade: true },
        on : {
            init: function(){
            $wrap.attr('data-slide',this.realIndex);
            },
            slideChangeTransitionStart : function(){
                $wrap.attr('data-slide',this.realIndex);
            },
        },
    });

    // swiper - .swiper-slide 전환
    var $step =  $wrap.find('.step');
    var $progress = $wrap.find('.progress');
    var $btnStep = $progress.find('.btn_step');
    var $btnCont = $progress.find('.btn_cont');
    var setTimeStep, setTimeCont;
    var stepPlay = false, contPlay = false;

    var stepFnc = function(){
        var itemCss = {borderColor:'#f6d039', color:'#000', backgroundColor:'#f6d039'}
        setTimeStep =  new TimelineMax({delay:0.5,onUpdate:updateStats, onComplete:function(){
            if (!$wrap.hasClass('active')) {
                    setTimeStep.kill();
                    return;
            }

            $btnCont.click();
        }});

        setTimeStep.call(function(){
                        if(!stepPlay) stepPlay = true;
                    })
                    .to($step.find('.item_step:eq(0)'), 1, itemCss,)
                    .to($step.find('.bg.fst'), 0.5, {strokeDashoffset:'-1550'})
                    .to($step.find('.item_step:eq(1)'), 1, itemCss)
                    .to($step.find('.bg.fst'), 0.5, {strokeDashoffset:'-1810'})
                    .to($step.find('.item_step:eq(2)'), 1, itemCss)
                    .to($step.find('.bg.fst'), 0.5, {strokeDashoffset:'-2180'})
                    .to($step.find('.item_step:eq(3)'), 1, itemCss)
                    .to($step.find('.bg.fst'), 0.5, {strokeDashoffset:'-2410'})
                    .to($step.find('.item_step:eq(4)'), 1, itemCss)
                    .to($step.find('.bg.fst'), 0.5, {strokeDashoffset:'-2640', strokeDasharray:'1220, 1300'})
                    .to($step.find('.item_step:eq(5)'), 1, itemCss)
                    .to($step, 0, {delay:1})

        function updateStats() {
            var timer = setTimeStep.totalProgress().toFixed(3); //소수점 3자리

            $progress.find('.progress_fill').css('width', (timer * 100) + '%');
        }
    }

    var contFnc = function(){
        setTimeCont = TweenMax.to($wrap, 6, {onUpdate:updateStats, onComplete:function(){
            if (!$wrap.hasClass('active') || $wrap.hasClass('btnChange')) {
                setTimeCont.kill();
                return;
            }

            $btnStep.click();
        }});

        function updateStats() {
            if(!contPlay) contPlay = true;
            var timer = setTimeCont.totalProgress().toFixed(3); //소수점 3자리
            $progress.find('.progress_fill').css('width', (timer * 100) + '%');
        }
    }

    $btnStep.on('click', function(){
        if (stepPlay) setTimeStep.kill();
        if (contPlay) setTimeCont.kill();

        TweenMax.set($step.find('.bg.fst'), {strokeDasharray:'1100, 1300', strokeDashoffset:'-1350'});
        TweenMax.set($step.find('.item_step'), {borderColor:'#fff', color:'#fff', backgroundColor:'#457dd8'});
        swiper.slideTo($wrap.find('.swiper-slide:eq(0)').index(), 200, true);
        stepFnc();
    });

    $btnCont.on('click', function(){
        if (stepPlay) setTimeStep.kill();
        if (contPlay) setTimeCont.kill();

        swiper.slideTo($wrap.find('.swiper-slide:eq(1)').index(), 200, true);
        contFnc();
    });

    // 입력폼 선택시 swiper 정지
    $wrap.find('.swiper-slide').on('click', function(){
        if ($wrap.attr('data-slide') !== '1') return;
        setTimeStep.kill();
        setTimeCont.kill();
    });



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/(function(){



    /* 상담신청 side - loadForm */
    var $wrap = $('#asideCont');

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
                $wrap.find('select.local').val(region);
            } else {
                // if(myCity&&$('#freeConsult select.local').find('[value='+myCity+']').length){
                //     $wrap.find('select.local').val(myCity);
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




    /* 결과페이지 sample */
    // 파리미터
    var data = getQuery();

    function getQuery(){
        var url = document.location.href;
        var qs = url.substring(url.indexOf('?') + 1).split('&');
            data = decodeURIComponent(qs);
        return data;
    };

    // layer
    if(data == 'complete'){
        LAYER({
            name : 'visitsMainConsultComp',
            afterLoad : function(){
                var $wrap = $('#visitsMainConsultComp');
                var $btnClose = $wrap.parent().next('.close');

                $btnClose.attr('data-public-path','/img/common/btnClose01.png');
                $btnClose.on('click', function(){
                    $('.layer_wrap').off('scroll touchmove mousewheel');
                });

                $('.layer_wrap').on('scroll touchmove mousewheel', function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                });

                // SVG Import
                $('img[src*=".svg"]').makeSvg();


                var itemCss = {borderColor:'#f6d039', color:'#000', backgroundColor:'#f6d039'}
                var setTimeStep =  new TimelineMax({repeatDelay:1, repeat:-1})

                setTimeStep.to($wrap.find('.item_step:eq(0)'), 0.5, itemCss)
                            .to($wrap.find('.bg.fst'), 0.5, {strokeDashoffset:'-1550'})
                            .to($wrap.find('.item_step:eq(1)'), 0.5, itemCss)
                            .to($wrap.find('.bg.fst'), 0.5, {strokeDashoffset:'-1810'})
                            .to($wrap.find('.item_step:eq(2)'), 0.5, itemCss)
                            .to($wrap.find('.bg.fst'), 0.5, {strokeDashoffset:'-2180'})
                            .to($wrap.find('.item_step:eq(3)'), 0.5, itemCss)
                            .to($wrap.find('.bg.fst'), 0.5, {strokeDashoffset:'-2410'})
                            .to($wrap.find('.item_step:eq(4)'), 0.5, itemCss)
                            .to($wrap.find('.bg.fst'), 0.5, {strokeDashoffset:'-2640', strokeDasharray:'1220, 1300'})
                            .to($wrap.find('.item_step:eq(5)'), 0.5, itemCss)
            },
        });
    }



})();/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/});// DOCUMENT READY...