import lottie from "lottie-web";

function initLottie(element, source) {
  return lottie.loadAnimation({
    container: document.getElementById(`${element}`),
    renderer: "svg",
    loop: false,
    autoplay: true,
    path: `${source}`,
  });
}

function initVideoPlayer(element) {
  return {
    video: document.querySelector(`#${element} .custom-video-player-video`),
    videoWrapper: document.querySelector(`#${element}.custom-video`),
    controlVolume: document.querySelector(
      `#${element} .custom-video-player-slider[name="volume"]`
    ),
    progressBar: document.querySelector(
      `#${element} .custom-video-progress-filled`
    ),
  };
}

function initAudioPlayer(element) {
  return document.querySelector(`audio.${element}`);
}

//CONTROLS

function controlsLottie(lottie, control, valuePercentaje) {
  let currentFrame = lottie.currentFrame;
  let totalFrames = lottie.totalFrames;

  if (control == "play") {
    lottie.play();
    return;
  }

  if (control == "pause") {
    lottie.pause();
    return;
  }

  if (control == "backward") {
    let percentageFrame = totalFrames * 0.1;
    let newFrame =
      currentFrame - percentageFrame < 0 ? 0 : currentFrame - percentageFrame;
    lottie.goToAndPlay(newFrame, true);
    return;
  }

  if (control == "forward") {
    let percentageFrame = totalFrames * 0.1;
    let newFrame =
      currentFrame + percentageFrame > totalFrames
        ? totalFrames
        : currentFrame + percentageFrame;
    lottie.goToAndPlay(newFrame, true);
    return;
  }

  if (control == "percentaje") {
    let totalFrames = lottie.totalFrames;

    let newFrame = totalFrames * (valuePercentaje / 100);
    lottie.goToAndPlay(newFrame, true);
    return;
  }
}

function controlsVideoPlayer(videoPlayer, control, valuePercentaje) {
  //const myVideo = document.querySelector("video.videoExample");
  if (control == "play") {
    videoPlayer.play();
    return;
  }

  if (control == "pause") {
    videoPlayer.pause();
    return;
  }

  if (control == "forward") {
    let percentage = videoPlayer.duration * 0.1;
    let newTime = videoPlayer.currentTime + percentage;

    videoPlayer.currentTime = newTime;
    videoPlayer.play();
    return;
  }

  if (control == "backward") {
    let percentage = videoPlayer.duration * 0.1;
    let newTime =
      videoPlayer.currentTime - percentage < 0
        ? 0
        : videoPlayer.currentTime - percentage;

    videoPlayer.currentTime = newTime;
    videoPlayer.play();
    return;
  }

  if (control == "percentaje") {
    let duration = videoPlayer.duration;

    let newTime = duration * (valuePercentaje / 100);
    videoPlayer.currentTime = newTime;
    videoPlayer.play();
    return;
  }
}

function controlsAudioPlayer(audioPlayer, control, valuePercentaje) {
  if (control == "play") {
    audioPlayer.play();
    return;
  }

  if (control == "pause") {
    audioPlayer.pause();
    return;
  }

  if (control == "forward") {
    let percentage = audioPlayer.duration * 0.1;
    let newTime = audioPlayer.currentTime + percentage;

    audioPlayer.currentTime = newTime;
    audioPlayer.play();
    return;
  }

  if (control == "backward") {
    let percentage = audioPlayer.duration * 0.1;
    let newTime =
      audioPlayer.currentTime - percentage < 0
        ? 0
        : audioPlayer.currentTime - percentage;

    audioPlayer.currentTime = newTime;
    audioPlayer.play();
    return;
  }
  if (control == "percentaje") {
    let duration = audioPlayer.duration;

    let newTime = duration * (valuePercentaje / 100);
    audioPlayer.currentTime = newTime;
    audioPlayer.play();
    return;
  }
}

export default {
  initLottie,
  initVideoPlayer,
  initAudioPlayer,

  controlsLottie,
  controlsVideoPlayer,
  controlsAudioPlayer,
};
