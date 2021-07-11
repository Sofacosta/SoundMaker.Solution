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

const playButton = document.querySelector('.tape-controls-play');

// play pause audio
const muteNode = audioCtx.createGain();

//button to start osc
// if (!audioCtx) {
//   init();
// }
oscillator.start();
muteNode.gain.value = 0;

//button to mute
playButton.addEventListener('click', function () {
  console.log(gainNode.gain.value)
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

//low pass filter
var lowpassNode = audioCtx.createBiquadFilter();
// Note: the Web Audio spec is moving from constants to strings.
// filter.type = 'lowpass';
lowpassNode.type = 'lowpass';
const lowpassControl = document.querySelector('[data-action="lowpass"]');
lowpassControl.addEventListener('input', function () {
  lowpassNode.frequency.value = this.value;
}, false);

//compressor
const compressor = audioCtx.createDynamicsCompressor();
// compressor.threshold.setValueAtTime(-50, audioCtx.currentTime);
// compressor.knee.setValueAtTime(40, audioCtx.currentTime);
// compressor.ratio.setValueAtTime(12, audioCtx.currentTime);
// compressor.attack.setValueAtTime(0, audioCtx.currentTime);
// compressor.release.setValueAtTime(0.25, audioCtx.currentTime);

oscillator.connect(compressor).connect(delayNode).connect(muteNode).connect(gainNode).connect(audioCtx.destination);

//Beat Machine
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx2;

const audioElement = document.querySelector('audio');
let track;

// get the audio element
// const audioElement = document.querySelector('audio');

// pass it into the audio context
// const track = audioCtx2.createMediaElementSource(audioElement);
// track.connect(audioCtx2.destination);

const playButton2 = document.querySelector('.beatboxplay');

// play pause audio
playButton2.addEventListener('click', function () {
  if (!audioCtx2) {
    init();
  }
console.log("hi");
  // check if context is in suspended state (autoplay policy)
  if (audioCtx2.state === 'suspended') {
    audioCtx2.resume();
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

// if track ends
audioElement.addEventListener('ended', () => {
  playButton.dataset.playing = 'false';
  playButton.setAttribute("aria-checked", "false");
}, false);

function init() {

  audioCtx2 = new AudioContext();
  track = audioCtx2.createMediaElementSource(audioElement);

  // volume
  const gainNode1 = audioCtx2.createGain();

  const volumeControl = document.querySelector('[data-action="volume"]');
  volumeControl.addEventListener('input', function () {
    gainNode1.gain.value = this.value;
  }, false);

 
  track.connect(gainNode1).connect(audioCtx2.destination);
}
  

//BPM
// let tempo = 60.0;
// const bpmControl = document.querySelector('#bpm');
// bpmControl.addEventListener('input', function() {
//     tempo = Number(this.value);
// }, false);
