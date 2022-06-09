/** ========================================================================
 ** BOROTALCO SCRIPTS
 ** ========================================================================

 | |__   ___  _ __ ___ | |_ __ _| | ___ ___
 | '_ \ / _ \| '__/ _ \| __/ _` | |/ __/ _ \
 | |_) | (_) | | | (_) | || (_| | | (_| (_) |
 |_.__/ \___/|_|  \___/ \__\__,_|_|\___\___/

 0.Config
 2.Utilities
 3.Resize Debounce
 4.Scroll Debounce
 5.Navigations
 6.Owl Carousel
 7.Bg video

 ** ========================================================================
 **/

/*
** ========================================================================
** 0.Config
** ======================================================================== 
	Main object configuration
** ======================================================================== 
**/
var borotalco = borotalco || {}; //  short name inside other module: _B

// MAIN CONFIG
// borotalco.config = {};
// borotalco.config.$body = $("body");
// borotalco.config.$htmbody = $("html, body");
// borotalco.config.timeAnimation = 400;
// borotalco.config.timeToRemove = 1000;
// borotalco.config.timeAnimationScroll = 800;
// borotalco.config.stepMobileW = 1200;

/*
 ** ========================================================================
 ** 6.Bg video
 ** ========================================================================
 **/
borotalco.bgVideo = (function (_B) {
  "use strict";
  var config = {
    $bgVideo: $(".bg-video-wrap"),
    videoClass: "bg-video",
    videoStatus: [],
  };

  var createBgVideo = function ($wrap) {
    var video = "";
    var preload = $wrap.attr("preload")
      ? 'preload="' + $wrap.attr("preload") + '"'
      : 'preload="auto"';
    var autoplay = $wrap.attr("autoplay") ? "autoplay" : "";
    var loop = $wrap.attr("loop") ? "loop" : "";
    var muted = typeof $wrap.attr("muted") !== "undefined" ? "muted" : "";
    var poster = $wrap.attr("poster")
      ? 'poster="' + $wrap.attr("poster") + '"'
      : "";
    var controls = $wrap.attr("controls") ? "controls" : "";
    var urlVideo = $wrap.attr("data-url");

    video +=
      "<video " +
      preload +
      " " +
      muted +
      " " +
      autoplay +
      " " +
      loop +
      " " +
      controls +
      " " +
      poster +
      ' class="' +
      config.videoClass +
      '">';
    video += '<source src="' + urlVideo + '" type="video/mp4">';
    video += "</video>";

    return video;
  };

  var checkBgvideo = function (w) {
    /*if(_B.config.$body.hasClass('touch') && w < _B.config.stepMobileW){
            removebgVideo();
        }else{
            appendBgvideo();
        }*/

    appendBgvideo();
  };

  var appendBgvideo = function () {
    config.$bgVideo.each(function () {
      var $wrap = $(this);
      var isAutoplay = typeof $wrap[0].getAttribute("autoplay") === "string"; //autoplay video will not append

      if (
        _B.config.$body.hasClass("touch") &&
        _B.resize.getCurrentResizeW() < _B.config.stepMobileW &&
        isAutoplay
      ) {
        $wrap.removeAttr("autoplay");
        $wrap.append(createBgVideo($wrap));
        handlePlayButton($wrap);
        handleVolumeButton($wrap);
        //$(this).empty();
      } else {
        if (!$wrap.find("." + config.videoClass).length) {
          $wrap.append(createBgVideo($wrap));
          handlePlayButton($wrap);
          handleVolumeButton($wrap);
        }
      }
    });
  };

  var handlePlayButton = function ($wrap) {
    var $btn = $wrap.closest(".card").find(".button-play");
    var $video = $wrap.find("video");

    $btn.click(function (ev) {
      ev.preventDefault();
      if ($btn[0].className.indexOf("pause") > -1) {
        $video[0].pause();
        $(".bg-shader-flat").show();
      } else {
        $video[0].play();
        $(".bg-shader-flat").hide();
      }
      $(this).toggleClass("pause");

      !$wrap.closest(".card").hasClass("opened") &&
        $wrap.closest(".card").addClass("opened");
    });

    var interval = setInterval(function () {
      if (getVideoStatus($video).paused) {
        $btn.removeClass("pause");
      }
    }, 1000);
  };

  var handleVolumeButton = function ($wrap) {
    var $btn = $wrap.closest(".card").find(".button-volume");
    var $video = $wrap.find("video");

    $btn.click(function (ev) {
      ev.preventDefault();
      if (getVideoStatus($video).muted) {
        $video[0].muted = false;
        this.classList.add("volume-up");
        this.classList.remove("volume-off");
      } else {
        $video[0].muted = true;
        this.classList.add("volume-off");
        this.classList.remove("volume-up");
      }
    });
  };

  var getVideoStatus = function ($video) {
    var videoStatus = {
      error: $video[0].error,
      currentSrc: $video[0].currentSrc,
      preload: $video[0].preload,
      seeking: $video[0].seeking,
      paused: $video[0].paused,
      volume: $video[0].volume,
      muted: $video[0].muted,
      networkState: $video[0].networkState,
      readyState: $video[0].readyState,
    };

    return videoStatus;
  };

  var removebgVideo = function () {
    //console.log('remove');
    config.$bgVideo.each(function () {
      $(this).empty();
    });
  };

  //auto init
  var init = (function () {
    checkBgvideo(_B.resize.getCurrentResizeW());
  })();

  //public
  return {
    checkBgvideo: checkBgvideo,
  };
})(borotalco);
