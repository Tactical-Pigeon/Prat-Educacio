var carouselcount = 0;
$(document).ready(function(){
    setTimeout(() => {
        carousel()
    }, 5000);
    setTimeout(() => {
        featured(false)
    }, 9000);
});

function carousel() {
    var $firstimage = $('.carouselimgdiv').find('a:first')
    $firstimage.css({"margin-left": '-101vw'});
    setTimeout(() => {
        $(".carouselimgdiv").append($firstimage.css({"margin-left": '0'}));
    }, 2000);
    
    carouselcount++;
    setTimeout(() => {
        carouselcount--;
        if(carouselcount == 0){
            carousel()
        }
    }, 5000);
}

function carouselleft() {
    var $secondimage = $('.carouselimgdiv').find('a:last')
    $(".carouselimgdiv").prepend($secondimage.css({"margin-left": '-101vw'}));
    setTimeout(() => {
        $secondimage.css({"margin-left": '0'});
    }, 1);
    carouselcount++;
    setTimeout(() => {
        carouselcount--;
        if(carouselcount == 0){
            carousel()
        }
    }, 7000);
}

$('.carouseldiv').hover(function(){
  $('.arrow').fadeToggle()
});

var featuredcount = 0;
let featuredstop = false;
var featurei = 0;
var i = 0;

function featured(a) {
    if(a || !featuredstop){
        featurei++;
        if(featurei == $(".featuredcontentdiv").length){
            featurei = 0;
        }
        if(featurei-2 < 0){
            i = $(".featuredcontentdiv").length + (featurei-2);
            $(".featuredcontentdiv").eq(i).removeClass("secondaryfeaturedcontentdiv1");

        }else{
            $(".featuredcontentdiv").eq(featurei-2).removeClass("secondaryfeaturedcontentdiv1");
        }
        if(featurei-1 < 0){
            i = $(".featuredcontentdiv").length + (featurei-1);
            $(".featuredcontentdiv").eq(i).removeClass("mainfeaturedcontentdiv");
            $(".featuredcontentdiv").eq(i).addClass("secondaryfeaturedcontentdiv1");

        }else{
            $(".featuredcontentdiv").eq(featurei-1).removeClass("mainfeaturedcontentdiv");
            $(".featuredcontentdiv").eq(featurei-1).addClass("secondaryfeaturedcontentdiv1");
        }
        $(".featuredcontentdiv").eq(featurei).removeClass("secondaryfeaturedcontentdiv2");
        $(".featuredcontentdiv").eq(featurei).addClass("mainfeaturedcontentdiv");
        if(featurei+1 == $(".featuredcontentdiv").length){
            $(".featuredcontentdiv").eq([0]).addClass("secondaryfeaturedcontentdiv2");

        }else{
            $(".featuredcontentdiv").eq(featurei+1).addClass("secondaryfeaturedcontentdiv2");
        }
        featuredcount++;
        setTimeout(() => {
            featuredcount--;
            if(featuredcount == 0){
                featured(false)
            }
        }, 9000);
    }else{
        featuredcount++;
        setTimeout(() => {
            featuredcount--;
            if(featuredcount == 0){
                featured(false)
            }
        }, 9000);
    }
    
}

function featuredleft() {
    featurei--;
    if(featurei < 0){
        featurei = $(".featuredcontentdiv").length - 1;
    }
    if(featurei+2 > ($(".featuredcontentdiv").length)-1){
        i = 0 + (featurei+2-$(".featuredcontentdiv").length);
        $(".featuredcontentdiv").eq(i).removeClass("secondaryfeaturedcontentdiv2");

    }else{
        $(".featuredcontentdiv").eq(featurei+2).removeClass("secondaryfeaturedcontentdiv2");
    }
    if(featurei+1 == $(".featuredcontentdiv").length){
        i = 0 + (featurei+1-$(".featuredcontentdiv").length);
        $(".featuredcontentdiv").eq(i).removeClass("mainfeaturedcontentdiv");
        $(".featuredcontentdiv").eq(i).addClass("secondaryfeaturedcontentdiv2");

    }else{
        $(".featuredcontentdiv").eq(featurei+1).removeClass("mainfeaturedcontentdiv");
        $(".featuredcontentdiv").eq(featurei+1).addClass("secondaryfeaturedcontentdiv2");
    }
    $(".featuredcontentdiv").eq(featurei).removeClass("secondaryfeaturedcontentdiv1");
    $(".featuredcontentdiv").eq(featurei).addClass("mainfeaturedcontentdiv");
    if(featurei-1 < 0){
        i = $(".featuredcontentdiv").length + (featurei-1);
        $(".featuredcontentdiv").eq(i).addClass("secondaryfeaturedcontentdiv1");
    }else{
        $(".featuredcontentdiv").eq(featurei-1).addClass("secondaryfeaturedcontentdiv1");
    }
    featuredcount++;
    setTimeout(() => {
        featuredcount--;
        if(featuredcount == 0){
            featured(false)
        }
    }, 9000);
}

$(".featureddiv").hover(function(){
    featuredstop = true;
}, function(){
    featuredstop = false;
});