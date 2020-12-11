SERVER.name = 'test';
var thisPage = {};
thisPage.pop = {list:''};

var fileList = [
    SERVER.fonts+'/fonts/NanumBarunGothic/NanumBarunGothic.css',
    SERVER.fonts+'/fonts/CenturyGothic/CenturyGothic.css',
    SERVER.fonts+'/fonts/KoPubWorldBatang/KoPubWorldBatang.css',
    SERVER.fonts+'/fonts/HGGGothicssi/HGGGothicssi.css',
    SERVER.fonts+'/fonts/IropkeBatang/IropkeBatang.css',    
    SERVER.public+'/lib/swiper/swiper.css',
    SERVER.public+'/css/reset.css',
    SERVER.public+'/css/common_pc.css',
    '/css/visits/common_2020.css',
    '/lib/gsap/TweenMax.min.js',
    SERVER.public+'/lib/swiper/swiper.js',    
    SERVER.public+'/js/modules.js',
    SERVER.public+'/js/public.js',
    SERVER.common+'/js/common.js',
    SERVER.public+'/js/analysis.js',
    '/js/visits/common_2020.js',

]

if(location.pathname==''||location.pathname=='/') {
    fileList.push('/css/visits/main_2020.css');
    fileList.push('/js/visits/main_2020.js');
}

FILES(fileList);


