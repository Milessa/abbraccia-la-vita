window.onload = function () {
  // Video
  let video = document.getElementById("video");

  // Buttons
  let playButton = document.getElementById("play");
  let muteButton = document.getElementById("mute");
  let volumeOnButton = document.getElementsByClassName("fa-volume-up")[0];
  let volumeOffButton = document.getElementsByClassName("fa-volume-off")[0];

  // Event listener for the play/pause button
  playButton.addEventListener("click", function () {
    if (video.paused == true) {
      // Play the video
      video.play();

      // Update the button text to 'Pause'
      playButton.style.backgroundImage = "url('../image/icon_PLAY.png')";
    } else {
      // Pause the video
      video.pause();

      // Update the button text to 'Play'
      playButton.style.backgroundImage = "url('../image/icon_PLAY.png')";
      playButton.style.backgroundImage = "url('../image/icon_PAUSE.png')";
    }
  });

  // Event listener for the mute button
  muteButton.addEventListener("click", function () {
    if (video.muted == false) {
      // Mute the video
      video.muted = true;

      // Update the button text
      // muteButton.innerHTML = "Unmute";
      volumeOnButton.style.visibility = "hidden";
      volumeOffButton.style.visibility = "visible";
    } else {
      // Unmute the video
      video.muted = false;

      // Update the button text
      // muteButton.innerHTML = "Mute";
      volumeOnButton.style.visibility = "visible";
      volumeOffButton.style.visibility = "hidden";
    }
  });
};
