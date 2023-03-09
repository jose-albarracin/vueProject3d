import lottie from "lottie-web";
import store from "../store";

const init = {
  durationPlayer: "&nbsp;/&nbsp;0:00",
  playBackRateButtom: false,
  playActive: false,
  progression: undefined,
  StatusAudio: undefined,
  valorOldVolume: 1,
  volumenValue: undefined,
  playBackRateValue: 1,
  seconds: undefined,
  minutes: undefined,
  currentTime: "0:00",
};

function initLottie(element, source) {
  return lottie.loadAnimation({
    container: document.getElementById(`${element}`),
    renderer: "svg",
    loop: false,
    autoplay: true,
    path: `${source}`,
  });
}

function initVideoPlayer(element, config) {
  let { dispatch, getters } = store;
  let { MediaPlayer } = getters;

  let obj = {
    video: document.querySelector(`#${element} .custom-video-player-video`),
    videoWrapper: document.querySelector(`#${element}.custom-video`),
    controlVolume: document.querySelector(
      `#${element} .custom-video-player-slider[name="volume"]`
    ),
    progressBar: document.querySelector(
      `#${element} .custom-video-progress-filled`
    ),
  };

  dispatch("UPDATE_state", {
    key: [`${element}_klausPlayer`],
    val: { ...obj, ...init },
  });

  dispatch("UPDATE_state", {
    parent: `${element}_klausPlayer`,
    key: "StatusAudio",
    val: config.muted,
  });

  if (MediaPlayer[`${element}_klausPlayer`].StatusAudio) {
    obj.controlVolume.value = 0;
    obj.video.volume = obj.controlVolume.value;
  }

  if (config.autoplay) {
    controlsVideoPlayer(obj, "play", element);
  }

  dispatch("UPDATE_state", {
    parent: `${element}_klausPlayer`,
    key: "playBackRateValue",
    val: 1,
  });

  if (config.controls.volumen) {
    dispatch("UPDATE_state", {
      parent: `${element}_klausPlayer`,
      key: "volumenValue",
      val: obj.controlVolume.value,
    });
  }

  return obj;
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

function controlsVideoPlayer(videoPlayer, control, element, params) {
  let durationPlayer = "&nbsp;/&nbsp;0:00";
  let seconds = undefined;
  let minutes = undefined;
  let currentTime = "0:00";

  const { video, videoWrapper, controlVolume, progressBar } = videoPlayer;

  let { dispatch, getters } = store;

  let { MediaPlayer } = getters;

  ///
  let updateProgress = () => {
    let progress = video.currentTime / video.duration;
    progressBar.style.flexBasis = Math.floor(progress * 1000) / 10 + "%";

    currentTimeAndDuration();
  };
  ///
  let currentTimeAndDuration = () => {
    seconds = Math.floor(video.currentTime);

    minutes = Math.floor(seconds / 60);
    seconds = seconds - minutes * 60;

    let durationTotal = Math.floor(video.duration);

    durationPlayer =
      " &nbsp;/&nbsp;" +
      (durationTotal > 60 ? Math.floor(durationTotal / 60) : "0") +
      ":" +
      (durationTotal % 60);

    currentTime = minutes + ":" + seconds.toString().padStart(2, "0");

    dispatch("UPDATE_state", {
      parent: `${element}_klausPlayer`,
      key: "currentTime",
      val: currentTime,
    });
    dispatch("UPDATE_state", {
      parent: `${element}_klausPlayer`,
      key: "durationPlayer",
      val: durationPlayer,
    });
  };

  ///
  if (control == "play") {
    dispatch("UPDATE_state", {
      parent: `${element}_klausPlayer`,
      key: "playBackRateButtom",
      val: false,
    });

    if (video.paused) {
      video.play();

      dispatch("UPDATE_state", {
        parent: `${element}_klausPlayer`,
        key: "playActive",
        val: !MediaPlayer[`${element}_klausPlayer`].playActive,
      });

      updateProgress();

      dispatch("UPDATE_state", {
        parent: `${element}_klausPlayer`,
        key: "progression",
        val: window.setInterval(updateProgress, 200),
      });
    } else {
      video.pause();
      dispatch("UPDATE_state", {
        parent: `${element}_klausPlayer`,
        key: "playActive",
        val: !MediaPlayer[`${element}_klausPlayer`].playActive,
      });
      //controlPlay.innerHTML = "►"
      clearInterval(MediaPlayer[`${element}_klausPlayer`].progression);
    }

    return;
  }

  if (control == "forwardBackward") {
    dispatch("UPDATE_state", {
      parent: `${element}_klausPlayer`,
      key: "playBackRateButtom",
      val: false,
    });
    //console.log("VALOR skip", skip)
    let value = Number(params);
    video.currentTime = video.currentTime + value;
    return;
  }

  if (control == "rate") {
    dispatch("UPDATE_state", {
      parent: `${element}_klausPlayer`,
      key: "playBackRateValue",
      val: params,
    });

    video.playbackRate = params;
    return;
  }

  if (control == "activeRate") {
    dispatch("UPDATE_state", {
      parent: `${element}_klausPlayer`,
      key: "playBackRateButtom",
      val: !MediaPlayer[`${element}_klausPlayer`].playBackRateButtom,
    });
    return;
  }
  if (control == "mute") {
    dispatch("UPDATE_state", {
      parent: `${element}_klausPlayer`,
      key: "StatusAudio",
      val: !MediaPlayer[`${element}_klausPlayer`].StatusAudio,
    });

    dispatch("UPDATE_state", {
      parent: `${element}_klausPlayer`,
      key: "playBackRateButtom",
      val: false,
    });

    if (MediaPlayer[`${element}_klausPlayer`].StatusAudio) {
      //myVid.volume = volume

      dispatch("UPDATE_state", {
        parent: `${element}_klausPlayer`,
        key: "valorOldVolume",
        val: video.volume,
      });

      controlVolume.value = 0;
      dispatch("UPDATE_state", {
        parent: `${element}_klausPlayer`,
        key: "volumenValue",
        val: controlVolume.value,
      });

      video.volume = controlVolume.value;
    } else {
      controlVolume.value =
        MediaPlayer[`${element}_klausPlayer`].valorOldVolume;
      dispatch("UPDATE_state", {
        parent: `${element}_klausPlayer`,
        key: "volumenValue",
        val: controlVolume.value,
      });

      video.volume = MediaPlayer[`${element}_klausPlayer`].valorOldVolume;
    }
  }

  if (control == "updateVolume") {
    dispatch("UPDATE_state", {
      parent: `${element}_klausPlayer`,
      key: "playBackRateButtom",
      val: false,
    });
    dispatch("UPDATE_state", {
      parent: `${element}_klausPlayer`,
      key: "volumenValue",
      val: controlVolume.value,
    });

    dispatch("UPDATE_state", {
      parent: `${element}_klausPlayer`,
      key: "StatusAudio",
      val: false,
    });

    let volume = controlVolume.value;
    video.volume = volume;
  }

  if (control == "updateCurrentProgress") {
    dispatch("UPDATE_state", {
      parent: `${element}_klausPlayer`,
      key: "playBackRateButtom",
      val: false,
    });

    let newProgress =
      (params.clientX - videoWrapper.getBoundingClientRect().left) /
      videoWrapper.clientWidth;
    progressBar.style.flexBasis = Math.floor(newProgress * 1000) / 10 + "%";
    video.currentTime = newProgress * video.duration;

    currentTimeAndDuration();
  }

  let isFullScreen = () => {
    return !!(
      document.fullScreen ||
      document.webkitIsFullScreen ||
      document.mozFullScreen ||
      document.msFullscreenElement ||
      document.fullscreenElement
    );
  };
  let setFullscreenData = (state) => {
    const vidWrapper = document.querySelector(
      `#${this.domElement}.custom-video`
    );
    vidWrapper.setAttribute("data-fullscreen", !!state);
  };

  if (control == "fullscreen") {
    dispatch("UPDATE_state", {
      parent: `${element}_klausPlayer`,
      key: "playBackRateButtom",
      val: false,
    });

    if (isFullScreen()) {
      // ...exit fullscreen mode
      // (Note: this can only be called on myVid)
      //myVid.webkitCancelFullScreen()
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitCancelFullScreen)
        document.webkitCancelFullScreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
      setFullscreenData(false);
    } else {
      // ...otherwise enter fullscreen mode
      // (Note: can be called on myVid, but here the specific element is used as it will also ensure that the element's children, e.g. the custom controls, go fullscreen also)
      if (videoWrapper.requestFullscreen) videoWrapper.requestFullscreen();
      else if (videoWrapper.mozRequestFullScreen)
        videoWrapper.mozRequestFullScreen();
      else if (videoWrapper.webkitRequestFullScreen) {
        // Safari 5.1 only allows proper fullscreen on the video element. This also works fine on other WebKit browsers as the following CSS (set in styles.css) hides the default controls that appear again, and
        // ensures that our custom controls are visible:
        // figure[data-fullscreen=true] video::-webkit-media-controls { display:none !important; }
        // figure[data-fullscreen=true] .controls { z-index:2147483647; }
        video.webkitRequestFullScreen();
      } else if (videoWrapper.msRequestFullscreen)
        videoWrapper.msRequestFullscreen();
      setFullscreenData(true);
    }
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
