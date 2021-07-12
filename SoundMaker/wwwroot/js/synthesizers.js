// create web audio api context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator node
const oscillator = audioCtx.createOscillator();

oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz

//handle waveform type dropdown
const waveformType = document.querySelector('#waveform');
waveformType.addEventListener('input', function () {
  oscillator.type = this.value;
}, false);

// freq knob

const freqControl = document.querySelector('[data-action="freq"]');
freqControl.addEventListener('input', function () {
  oscillator.frequency.value = this.value;
}, false);


// play pause audio
const muteNode = audioCtx.createGain();

//button to start osc
// if (!audioCtx) {
//   init();
// }
oscillator.start();
muteNode.gain.value = 0;

//button to mute

const playButton = document.querySelector('.tape-controls-play');
playButton.addEventListener('click', function () {
  audioCtx.resume().then(() => {
    if (muteNode.gain.value === 0) {
      muteNode.gain.value = gainNode.gain.value;
    } else {
      muteNode.gain.value = 0;
    }
  });
});

// volume
const gainNode = audioCtx.createGain();

const volumeControl = document.querySelector('[data-action="volume"]');
volumeControl.addEventListener('input', function () {
  gainNode.gain.value = this.value;
}, false);

//delay
const delayNode = audioCtx.createDelay(2.0)
var feedback = audioCtx.createGain();
feedback.gain.value = 0.8;

const delayControl = document.querySelector('[data-action="delay"]');
delayControl.addEventListener('input', function () {
  delayNode.delayTime.value = this.value;
  if (delayNode.delayTime.value === 0) {
    feedback.gain.value = 0.0;
  }
  else {
    feedback.gain.value = 0.8;
  }
  console.log(feedback.gain.value)
}, false);

delayNode.connect(feedback);
feedback.connect(delayNode);



//compressor
const compressor = audioCtx.createDynamicsCompressor();
// compressor.threshold.setValueAtTime(-50, audioCtx.currentTime);
// compressor.knee.setValueAtTime(40, audioCtx.currentTime);
// compressor.ratio.setValueAtTime(12, audioCtx.currentTime);
// compressor.attack.setValueAtTime(0, audioCtx.currentTime);
// compressor.release.setValueAtTime(0.25, audioCtx.currentTime);

oscillator.connect(compressor).connect(delayNode).connect(muteNode).connect(gainNode).connect(audioCtx.destination);

//Beat Machine

//starter set
let track;
let audioElement = document.querySelector("#techno");
track = audioCtx.createMediaElementSource(audioElement);

//dropdown menu of beats
const drumbeatType = document.querySelector('#drumbeat');
drumbeatType.addEventListener('input', function () {
  audioElement = document.querySelector("#" + this.value);
  track = audioCtx.createMediaElementSource(audioElement);
}, false);

// play pause audio
const playButton2 = document.querySelector('.beatboxplay');
playButton2.addEventListener('click', function () {
  // if (!audioCtx) {
  //   init();
  // }

  init();

  // check if context is in suspended state (autoplay policy)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  if (this.dataset.playing === 'false') {
    audioElement.play();
    this.dataset.playing = 'true';
    // if track is playing pause it
  } else if (this.dataset.playing === 'true') {
    audioElement.pause();
    this.dataset.playing = 'false';
  }

  let state = this.getAttribute('aria-checked') === "true" ? true : false;
  this.setAttribute('aria-checked', state ? "false" : "true");

}, false);

function init() {
  //effects chains for beat machine
  // volume
  const gainNode1 = audioCtx.createGain();

  const volumeControlOne = document.querySelector('[data-action="drumVolume"]');
  volumeControlOne.addEventListener('input', function () {
    gainNode1.gain.value = this.value;
  }, false);

  //  low pass filter
  var lowpassNode = audioCtx.createBiquadFilter();

  lowpassNode.type = 'lowpass';
  lowpassNode.frequency.value = 5000;
  const lowpassControl = document.querySelector('[data-action="lowpass"]');
  lowpassControl.addEventListener('input', function () {
    lowpassNode.frequency.value = this.value;
  }, false);
  //
  //delay
  let delayNodeDrum = audioCtx.createDelay(2.0)
  var feedbackDrum = audioCtx.createGain();
  feedbackDrum.gain.value = 0.0;

  let delayControlDrum = document.querySelector('[data-action="delayDrum"]');
  delayControlDrum.addEventListener('input', function () {
    delayNodeDrum.delayTime.value = this.value;
    if (delayNodeDrum.delayTime.value === 0) {
      feedbackDrum.gain.value = 0.0;
    }
    else {
      feedbackDrum.gain.value = 0.8;
    }
    console.log(feedbackDrum.gain.value)
  }, false);

  delayNodeDrum.connect(feedbackDrum);
  feedbackDrum.connect(delayNodeDrum);

  track.connect(gainNode1).connect(lowpassNode).connect(delayNodeDrum).connect(audioCtx.destination);
}

//BPM
// let tempo = 60.0;
// const bpmControl = document.querySelector('#bpm');
// bpmControl.addEventListener('input', function() {
//     tempo = Number(this.value);
// }, false);
