$(".user").click(function () {
    $("#userpopup").slideToggle("slow");
    $(".user").toggleClass("usercorners");
});
$(".contactme").click(function () {
    $(".sendmessage_popup").animate({ right: "10vw" })
    $(".popup_grayish").fadeToggle()
});
$(".popup_grayish").click(function () {
    $(".sendmessage_popup").animate({ right: "-300px" })
    $(".popup_grayish").fadeToggle()
});
$(".secondaryimage").hover(function () {
    $("#mainimage").replaceWith("<img id='mainimage'></img>");
    document.getElementById("mainimage").src = this.src;
    document.getElementById("mainimage").alt = this.alt;
});
$(".secondaryvideo").hover(function () {
    $("#mainimage").replaceWith("<video id='mainimage' controls></video>");
    document.getElementById("mainimage").src = $(this).data("vid");
    document.getElementById("mainimage").alt = this.alt;
});
$(".mainimagediv").hover(function () {
    if ($(this).data("vid") && $(this).parent().hasClass("mainfeaturedcontentdiv")) {
        $(this).find('#mainimage').replaceWith("<video id='mainimage' autoplay muted></video>");
        console.log($(this).data("vid"));
        $(this).find('#mainimage').attr("src", $(this).data("vid"))
    };
}, function () {
    if ($(this).data("vid") && $(this).parent().hasClass("mainfeaturedcontentdiv")) {
        $(this).find('#mainimage').replaceWith("<img id='mainimage'></img>");
        $(this).find('#mainimage').attr("src", $(this).data("img"));
    };
});
$(".tinyimages img").hover(function () {
    if ($(this).parent().parent().parent().hasClass("mainfeaturedcontentdiv")) {
        $(this).parent().parent().parent().find(".mainimagediv").find('#mainimage').attr("src", $(this).attr("src"));
    };
}, function () {
    if ($(this).parent().parent().parent().hasClass("mainfeaturedcontentdiv")) {
        $(this).parent().parent().parent().find(".mainimagediv").find('#mainimage').attr("src", $(this).parent().parent().parent().find(".mainimagediv").data("img"));
    };
});
$(".featuredarrow").hover(function () {
    $(this).css({ "filter": "brightness(100%)" })
    $(".secondaryfeaturedcontentdiv" + $(this).attr('class').charAt(13)).css({ "filter": "brightness(80%)" })
}, function () {
    $(this).css({ "filter": "brightness(50%)" })
    $(".secondaryfeaturedcontentdiv" + $(this).attr('class').charAt(13)).css({ "filter": "brightness(20%)" })
});

// ==================== Settings Page JS ====================
$('.settingspfp').click(function () {
    $('#pfp').click();
});

$('#pfp').on("change", function () {
    $("form").submit();
});