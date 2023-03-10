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

function initLottie(element, source, config) {
  let { dispatch } = store;

  let obj = {
    media: lottie.loadAnimation({
      container: document.querySelector(`#${element}.lottieRef`),
      renderer: "svg",
      loop: config.loop,
      autoplay: config.autoplay,
      path: `${source}`,
    }),
    mediaWrapper: document.querySelector(`#${element}.custom-video`),
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
    key: "playBackRateValue",
    val: 1,
  });
  if (config.autoplay) {
    controlsLottie(obj, "play", element);
    dispatch("UPDATE_state", {
      parent: `${element}_klausPlayer`,
      key: "playActive",
      val: true,
    });
  }

  return obj;
}

function initVideoPlayer(element, config) {
  let { dispatch, getters } = store;
  let { MediaPlayer } = getters;

  let obj = {
    media: document.querySelector(`#${element} .custom-video-player-video`),
    mediaWrapper: document.querySelector(`#${element}.custom-video`),
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

  /*  if (config.autoplay) {
    controlsVideAndAudioPlayer(obj, "play", element);
  } */

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

function initAudioPlayer(element, config) {
  let { dispatch, getters } = store;
  let { MediaPlayer } = getters;

  let obj = {
    media: document.querySelector(`#${element} .custom-video-player-video`),
    mediaWrapper: document.querySelector(`#${element}.custom-video`),
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
    controlsVideAndAudioPlayer(obj, "play", element);
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

//CONTROLS

function controlsLottie(sourceMedia, control, element, params) {
  const { media, mediaWrapper, progressBar } = sourceMedia;

  let { dispatch, getters } = store;

  let { MediaPlayer } = getters;

  let updateProgress = () => {
    let progress = media.currentFrame / media.totalFrames;
    progressBar.style.flexBasis = Math.floor(progress * 1000) / 10 + "%";

    currentTimeAndDuration();
  };
  ///
  let currentTimeAndDuration = () => {
    dispatch("UPDATE_state", {
      parent: `${element}_klausPlayer`,
      key: "currentTime",
      val: Math.floor(media.currentFrame),
    });
    dispatch("UPDATE_state", {
      parent: `${element}_klausPlayer`,
      key: "durationPlayer",
      val: " &nbsp;/&nbsp;" + media.totalFrames,
    });
  };

  if (control == "play") {
    if (media.isPaused) {
      media.play();
      dispatch("UPDATE_state", {
        parent: `${element}_klausPlayer`,
        key: "playActive",
        val: !MediaPlayer[`${element}_klausPlayer`].playActive,
      });

      dispatch("UPDATE_state", {
        parent: `${element}_klausPlayer`,
        key: "progression",
        val: window.setInterval(updateProgress, 10),
      });
    } else {
      media.pause();
      dispatch("UPDATE_state", {
        parent: `${element}_klausPlayer`,
        key: "playActive",
        val: !MediaPlayer[`${element}_klausPlayer`].playActive,
      });
      clearInterval(MediaPlayer[`${element}_klausPlayer`].progression);
    }
    return;
  }
  if (control == "updateCurrentProgress") {
    dispatch("UPDATE_state", {
      parent: `${element}_klausPlayer`,
      key: "playBackRateButtom",
      val: false,
    });

    let newProgress =
      (params.clientX - mediaWrapper.getBoundingClientRect().left) /
      mediaWrapper.clientWidth;

    progressBar.style.flexBasis = Math.floor(newProgress * 1000) / 10 + "%";

    let finalProgress = newProgress * media.totalFrames;
    if (media.isPaused) {
      media.goToAndStop(finalProgress, true);
    } else {
      media.goToAndPlay(finalProgress, true);
    }

    currentTimeAndDuration();
  }

  if (control == "forwardBackward") {
    let percentageFrame = (media.totalFrames * params) / 100;

    let newFrame =
      media.currentFrame + percentageFrame < 0
        ? 0
        : media.currentFrame + percentageFrame > media.totalFrames
        ? media.totalFrames
        : media.currentFrame + percentageFrame;

    if (media.isPaused) {
      media.goToAndStop(newFrame, true);
      updateProgress();
    } else {
      media.goToAndPlay(newFrame, true);
    }
  }

  if (control == "rate") {
    dispatch("UPDATE_state", {
      parent: `${element}_klausPlayer`,
      key: "playBackRateValue",
      val: params,
    });

    media.setSpeed(params);
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

  if (control == "fullscreen") {
    fullScreen(sourceMedia, element);
  }
}

function controlsVideAndAudioPlayer(sourceMedia, control, element, params) {
  let durationPlayer = "&nbsp;/&nbsp;0:00";
  let seconds = undefined;
  let minutes = undefined;
  let currentTime = "0:00";

  const { media, mediaWrapper, controlVolume, progressBar } = sourceMedia;

  let { dispatch, getters } = store;

  let { MediaPlayer } = getters;

  ///
  let updateProgress = () => {
    let progress = media.currentTime / media.duration;
    progressBar.style.flexBasis = Math.floor(progress * 1000) / 10 + "%";

    currentTimeAndDuration();
  };
  ///
  let currentTimeAndDuration = () => {
    seconds = Math.floor(media.currentTime);

    minutes = Math.floor(seconds / 60);
    seconds = seconds - minutes * 60;

    let durationTotal = Math.floor(media.duration);

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

    if (media.paused) {
      media.play();

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
      media.pause();
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
    media.currentTime = media.currentTime + value;
    return;
  }

  if (control == "rate") {
    dispatch("UPDATE_state", {
      parent: `${element}_klausPlayer`,
      key: "playBackRateValue",
      val: params,
    });

    media.playbackRate = params;
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
        val: media.volume,
      });

      controlVolume.value = 0;
      dispatch("UPDATE_state", {
        parent: `${element}_klausPlayer`,
        key: "volumenValue",
        val: controlVolume.value,
      });

      media.volume = controlVolume.value;
    } else {
      controlVolume.value =
        MediaPlayer[`${element}_klausPlayer`].valorOldVolume;
      dispatch("UPDATE_state", {
        parent: `${element}_klausPlayer`,
        key: "volumenValue",
        val: controlVolume.value,
      });

      media.volume = MediaPlayer[`${element}_klausPlayer`].valorOldVolume;
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
    media.volume = volume;
  }

  if (control == "updateCurrentProgress") {
    dispatch("UPDATE_state", {
      parent: `${element}_klausPlayer`,
      key: "playBackRateButtom",
      val: false,
    });

    let newProgress =
      (params.clientX - mediaWrapper.getBoundingClientRect().left) /
      mediaWrapper.clientWidth;
    progressBar.style.flexBasis = Math.floor(newProgress * 1000) / 10 + "%";
    media.currentTime = newProgress * media.duration;

    currentTimeAndDuration();
  }

  if (control == "fullscreen") {
    fullScreen(sourceMedia, element);
  }
}

function fullScreen(sourceMedia, element) {
  //console.log("DATA: ", sourceMedia, "", element);
  let { dispatch } = store;
  const { media, mediaWrapper } = sourceMedia;

  dispatch("UPDATE_state", {
    parent: `${element}_klausPlayer`,
    key: "playBackRateButtom",
    val: false,
  });
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
    mediaWrapper.setAttribute("data-fullscreen", !!state);
  };

  if (isFullScreen()) {
    // ...exit fullscreen mode
    // (Note: this can only be called on myVid)
    //myVid.webkitCancelFullScreen()
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
    setFullscreenData(false);
  } else {
    // ...otherwise enter fullscreen mode
    // (Note: can be called on myVid, but here the specific element is used as it will also ensure that the element's children, e.g. the custom controls, go fullscreen also)
    if (mediaWrapper.requestFullscreen) mediaWrapper.requestFullscreen();
    else if (mediaWrapper.mozRequestFullScreen)
      mediaWrapper.mozRequestFullScreen();
    else if (mediaWrapper.webkitRequestFullScreen) {
      // Safari 5.1 only allows proper fullscreen on the video element. This also works fine on other WebKit browsers as the following CSS (set in styles.css) hides the default controls that appear again, and
      // ensures that our custom controls are visible:
      // figure[data-fullscreen=true] video::-webkit-media-controls { display:none !important; }
      // figure[data-fullscreen=true] .controls { z-index:2147483647; }
      media.webkitRequestFullScreen();
    } else if (mediaWrapper.msRequestFullscreen)
      mediaWrapper.msRequestFullscreen();
    setFullscreenData(true);
  }
}

export default {
  initLottie,
  initVideoPlayer,
  initAudioPlayer,

  controlsLottie,
  controlsVideAndAudioPlayer,
  fullScreen,
};
