// create web audio api context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator node
const oscillator1= audioCtx.createOscillator();

oscillator1.type = 'sine';
oscillator1.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz

// create 2nd Oscillator node
const oscillator2= audioCtx.createOscillator();

oscillator2.type = 'sine';
oscillator2.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz

//handle waveform type dropdown
const osc1WaveformType = document.querySelector('#osc1-waveform');
osc1WaveformType.addEventListener('input', function () {
  oscillator1.type = this.value;
}, false);

//handle waveform type dropdown
const osc2WaveformType = document.querySelector('#osc2-waveform');
osc2WaveformType.addEventListener('input', function () {
  oscillator2.type = this.value;
}, false);

// freq knob

const osc1FreqControl = document.querySelector('#osc1-freq');
osc1FreqControl.addEventListener('input', function () {
  oscillator1.frequency.value = this.value;
}, false);

// freq knob osc 2

const osc2FreqControl = document.querySelector('#osc2-freq');
osc2FreqControl.addEventListener('input', function () {
  oscillator2.frequency.value = this.value;
}, false);

//oscillators play button creation

const osc1PlayButton = document.querySelector('#oscillator1-play');

const osc2PlayButton = document.querySelector('#oscillator2-play');



// play pause oscillator 1 audio
const osc1MuteNode = audioCtx.createGain();

//button to start osc 1
// if (!audioCtx) {
//   init();
// }
oscillator1.start();
osc1MuteNode.gain.value = 0;

// play pause oscillator 1 audio
const osc2MuteNode = audioCtx.createGain();

//button to start osc 2
oscillator2.start();
osc2MuteNode.gain.value = 0;


//button to mute osc 1
osc1PlayButton.addEventListener('click', function () {
  console.log(osc1GainNode.gain.value)
 audioCtx.resume().then(() => {   
  if (osc1MuteNode.gain.value === 0) {
    osc1MuteNode.gain.value = osc1GainNode.gain.value;
  } else {
    osc1MuteNode.gain.value = 0;
  }
  });
});

// button to mute osc 2
osc2PlayButton.addEventListener('click', function () {
  console.log(osc2GainNode.gain.value)
 audioCtx.resume().then(() => {   
  if (osc2MuteNode.gain.value === 0) {
    osc2MuteNode.gain.value = osc2GainNode.gain.value;
  } else {
    osc2MuteNode.gain.value = 0;
  }
  });
});

// volume
const osc1GainNode = audioCtx.createGain();

const osc1VolumeControl = document.querySelector('#osc1-volume');
osc1VolumeControl.addEventListener('input', function () {
  osc1GainNode.gain.value = this.value;
}, false);

// volume
const osc2GainNode = audioCtx.createGain();

const osc2VolumeControl = document.querySelector('#osc2-volume');
osc2VolumeControl.addEventListener('input', function () {
  osc2GainNode.gain.value = this.value;
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

// panning
const pannerOptions = { pan: 0 };
const panner = new StereoPannerNode(audioCtx, pannerOptions);

const pannerControl = document.querySelector('[data-action="panner"]');
pannerControl.addEventListener('input', function() {
  panner.pan.value = this.value;
}, false);

//compressor
const compressor = audioCtx.createDynamicsCompressor();
// compressor.threshold.setValueAtTime(-50, audioCtx.currentTime);
// compressor.knee.setValueAtTime(40, audioCtx.currentTime);
// compressor.ratio.setValueAtTime(12, audioCtx.currentTime);
// compressor.attack.setValueAtTime(0, audioCtx.currentTime);
// compressor.release.setValueAtTime(0.25, audioCtx.currentTime);

oscillator1.connect(compressor).connect(delayNode).connect(osc1MuteNode).connect(osc1GainNode).connect(panner).connect(audioCtx.destination);

oscillator2.connect(osc2MuteNode).connect(osc2GainNode).connect(audioCtx.destination);

//Beat Machine

//starter set
let track;
let audioElement = document.querySelector("#techno");
track = audioCtx.createMediaElementSource(audioElement);

//dropdown menu of beats
const drumbeatType = document.querySelector('#drumbeat');
drumbeatType.addEventListener('input', function () {
  audioElement = document.querySelector("#"+ this.value);
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

 //low pass filter
// var lowpassNode = audioCtx.createBiquadFilter();

// lowpassNode.type = 'lowpass';
// const lowpassControl = document.querySelector('[data-action="lowpass"]');
// lowpassControl.addEventListener('input', function () {
//   lowpassNode.frequency.value = this.value;
// }, false);
 

 track.connect(gainNode1).connect(audioCtx.destination); 
}

//BPM
// let tempo = 60.0;
// const bpmControl = document.querySelector('#bpm');
// bpmControl.addEventListener('input', function() {
//     tempo = Number(this.value);
// }, false);
