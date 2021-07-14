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

// create 3rd Oscillator node
const oscillator3= audioCtx.createOscillator();

oscillator3.type = 'sine';
oscillator3.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz

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

//handle waveform type dropdown
const osc3WaveformType = document.querySelector('#osc3-waveform');
osc3WaveformType.addEventListener('input', function () {
  oscillator3.type = this.value;
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

// freq knob osc 3

const osc3FreqControl = document.querySelector('#osc3-freq');
osc3FreqControl.addEventListener('input', function () {
  oscillator3.frequency.value = this.value;
}, false);

//oscillators play button creation

const osc1PlayButton = document.querySelector('#oscillator1-play');

const osc2PlayButton = document.querySelector('#oscillator2-play');

const osc3PlayButton = document.querySelector('#oscillator3-play');



// play pause oscillator 1 audio
const osc1MuteNode = audioCtx.createGain();

//button to start osc 1
// if (!audioCtx) {
//   init();
// }
oscillator1.start();
osc1MuteNode.gain.value = 0;

// play pause oscillator 2 audio
const osc2MuteNode = audioCtx.createGain();

//button to start osc 2
oscillator2.start();
osc2MuteNode.gain.value = 0;

// play pause oscillator 3 audio
const osc3MuteNode = audioCtx.createGain();

//button to start osc 3
oscillator3.start();
osc3MuteNode.gain.value = 0;


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

// button to mute osc 3
osc3PlayButton.addEventListener('click', function () {
  console.log(osc3GainNode.gain.value)
 audioCtx.resume().then(() => {   
  if (osc3MuteNode.gain.value === 0) {
    osc3MuteNode.gain.value = osc3GainNode.gain.value;
  } else {
    osc3MuteNode.gain.value = 0;
  }
  });
});

// volume for osc 1
const osc1GainNode = audioCtx.createGain();
osc1GainNode.gain.value = .2;

const osc1VolumeControl = document.querySelector('#osc1-volume');
osc1VolumeControl.addEventListener('input', function () {
  osc1GainNode.gain.value = this.value;
}, false);

// volume for osc 2
const osc2GainNode = audioCtx.createGain();
osc2GainNode.gain.value = .2;

const osc2VolumeControl = document.querySelector('#osc2-volume');
osc2VolumeControl.addEventListener('input', function () {
  osc2GainNode.gain.value = this.value;
}, false);

// volume for osc 2
const osc3GainNode = audioCtx.createGain();
osc3GainNode.gain.value = .2;

const osc3VolumeControl = document.querySelector('#osc3-volume');
osc3VolumeControl.addEventListener('input', function () {
  osc3GainNode.gain.value = this.value;
}, false);



//delay for osc 1
const osc1Delay = audioCtx.createDelay(2.0)
var osc1DelayFeedback = audioCtx.createGain();
osc1DelayFeedback.gain.value = 0.8;

const osc1DelayControl = document.querySelector('#osc1-delay');
osc1DelayControl.addEventListener('input', function () {
  osc1Delay.delayTime.value = this.value;
  if (osc1Delay.delayTime.value === 0) {
    osc1DelayFeedback.gain.value = 0.0;
  }
  else {
    osc1DelayFeedback.gain.value = 0.8;
  }
  console.log(osc1DelayFeedback.gain.value)
}, false);

osc1Delay.connect(osc1DelayFeedback);
osc1DelayFeedback.connect(osc1Delay);

//delay for osc 2
const osc2Delay = audioCtx.createDelay(2.0)
var osc2DelayFeedback = audioCtx.createGain();
osc2DelayFeedback.gain.value = 0.8;

const osc2DelayControl = document.querySelector('#osc2-delay');
osc2DelayControl.addEventListener('input', function () {
  osc2Delay.delayTime.value = this.value;
  if (osc2Delay.delayTime.value === 0) {
    osc2DelayFeedback.gain.value = 0.0;
  }
  else {
    osc2DelayFeedback.gain.value = 0.8;
  }
  console.log(osc2DelayFeedback.gain.value)
}, false);

osc2Delay.connect(osc2DelayFeedback);
osc2DelayFeedback.connect(osc2Delay);

//delay for osc 3
const osc3Delay = audioCtx.createDelay(2.0)
var osc3DelayFeedback = audioCtx.createGain();
osc3DelayFeedback.gain.value = 0.8;

const osc3DelayControl = document.querySelector('#osc3-delay');
osc3DelayControl.addEventListener('input', function () {
  osc3Delay.delayTime.value = this.value;
  if (osc3Delay.delayTime.value === 0) {
    osc3DelayFeedback.gain.value = 0.0;
  }
  else {
    osc3DelayFeedback.gain.value = 0.8;
  }
  console.log(osc3DelayFeedback.gain.value)
}, false);

osc3Delay.connect(osc3DelayFeedback);
osc3DelayFeedback.connect(osc3Delay);


//reverb
// grab audio track via XHR for convolver node
const convolver = audioCtx.createConvolver();
var soundSource;

ajaxRequest = new XMLHttpRequest();

ajaxRequest.open('GET', 'https://mdn.github.io/voice-change-o-matic/audio/concert-crowd.ogg', true);

ajaxRequest.responseType = 'arraybuffer';

ajaxRequest.onload = function () {
  var audioData = ajaxRequest.response;

  audioCtx.decodeAudioData(audioData, function (buffer) {
    soundSource = audioCtx.createBufferSource();
    convolver.buffer = buffer;
  }, function (e) { console.log("Error with decoding audio data" + e.err); });

};

ajaxRequest.send();

const pannerOptions = { pan: 0 };

// panning osc 1
const osc1Panner = new StereoPannerNode(audioCtx, pannerOptions);

const osc1PannerControl = document.querySelector('#osc1-panner');
osc1PannerControl.addEventListener('input', function() {
  osc1Panner.pan.value = this.value;
}, false);

// // panning osc 2
const osc2Panner = new StereoPannerNode(audioCtx, pannerOptions);

const osc2PannerControl = document.querySelector('#osc2-panner');
osc2PannerControl.addEventListener('input', function() {
  osc2Panner.pan.value = this.value;
}, false);

// // panning osc 3
const osc3Panner = new StereoPannerNode(audioCtx, pannerOptions);

const osc3PannerControl = document.querySelector('#osc3-panner');
osc3PannerControl.addEventListener('input', function() {
  osc3Panner.pan.value = this.value;
}, false);
//compressor
const compressor = audioCtx.createDynamicsCompressor();
// compressor.threshold.setValueAtTime(-50, audioCtx.currentTime);
// compressor.knee.setValueAtTime(40, audioCtx.currentTime);
// compressor.ratio.setValueAtTime(12, audioCtx.currentTime);
// compressor.attack.setValueAtTime(0, audioCtx.currentTime);
// compressor.release.setValueAtTime(0.25, audioCtx.currentTime);

oscillator1.connect(compressor).connect(osc1Delay).connect(osc1MuteNode).connect(osc1GainNode).connect(osc1Panner).connect(audioCtx.destination);

oscillator2.connect(osc2Delay).connect(osc2MuteNode).connect(osc2GainNode).connect(osc2Panner).connect(audioCtx.destination);

oscillator3.connect(convolver).connect(osc3Delay).connect(osc3MuteNode).connect(osc3GainNode).connect(osc3Panner).connect(audioCtx.destination);


//Alternate Beat Machine
let track;
let audioElement = document.querySelector("#techno");
track = audioCtx.createMediaElementSource(audioElement);

let drumBassTrack;
let drumBassAudioElement = document.querySelector("#drumandbass");
drumBassTrack = audioCtx.createMediaElementSource(drumBassAudioElement);

// play pause techno audio
const playButton2 = document.querySelector('#techno-play');
playButton2.addEventListener('click', function () {

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

}, false);

//drum bass play button
const drumBassPlayButton = document.querySelector('#drum-bass-play');
drumBassPlayButton.addEventListener('click', function () {

  init();

  // check if context is in suspended state (autoplay policy)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  if (this.dataset.playing === 'false') {
    drumBassAudioElement.play();
    this.dataset.playing = 'true';
    // if track is playing pause it
  } else if (this.dataset.playing === 'true') {
    drumBassAudioElement.pause();
    this.dataset.playing = 'false';
  }

}, false);





//Beat Machine

//starter set
// let track;
// let audioElement = document.querySelector("#techno");
// track = audioCtx.createMediaElementSource(audioElement);

//dropdown menu of beats
// const drumbeatType = document.querySelector('#drumbeat');
// drumbeatType.addEventListener('input', function () {
//   audioElement = document.querySelector("#" + this.value);
//   track = audioCtx.createMediaElementSource(audioElement);
// }, false);

// play pause audio
// const playButton2 = document.querySelector('.beatboxplay');
// playButton2.addEventListener('click', function () {
 

//   init();

  // check if context is in suspended state (autoplay policy)
//   if (audioCtx.state === 'suspended') {
//     audioCtx.resume();
//   }

//   if (this.dataset.playing === 'false') {
//     audioElement.play();
//     this.dataset.playing = 'true';
//     // if track is playing pause it
//   } else if (this.dataset.playing === 'true') {
//     audioElement.pause();
//     this.dataset.playing = 'false';
//   }

//   let state = this.getAttribute('aria-checked') === "true" ? true : false;
//   this.setAttribute('aria-checked', state ? "false" : "true");

// }, false);

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

  drumBassTrack.connect(gainNode1).connect(lowpassNode).connect(delayNodeDrum).connect(audioCtx.destination);
}

//BPM
// let tempo = 60.0;
// const bpmControl = document.querySelector('#bpm');
// bpmControl.addEventListener('input', function() {
//     tempo = Number(this.value);
// }, false);
