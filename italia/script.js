window.onload = function () {
  let video = document.getElementById("video");

  let playButton = document.getElementById("play");
  let muteButton = document.getElementById("mute");
  let volumeOnButton = document.getElementsByClassName("fa-volume-up")[0];
  let volumeOffButton = document.getElementsByClassName("fa-volume-off")[0];

  playButton.addEventListener("click", function () {
    if (video.paused == true) {
      video.play();
      playButton.style.backgroundImage = "url('../italia/image/icon_PLAY.png')";
    } else {
      video.pause();
      playButton.style.backgroundImage = "url('../italia/image/icon_PLAY.png')";
      playButton.style.backgroundImage =
        "url('../italia/image/icon_PAUSE.png')";
    }
  });

  muteButton.addEventListener("click", function () {
    if (video.muted == false) {
      video.muted = true;

      volumeOnButton.style.visibility = "hidden";
      volumeOffButton.style.visibility = "visible";
    } else {
      video.muted = false;

      volumeOnButton.style.visibility = "visible";
      volumeOffButton.style.visibility = "hidden";
    }
  });
};
