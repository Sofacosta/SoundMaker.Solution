// create web audio api context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator node
const oscillator = audioCtx.createOscillator();

oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz

// freq knob

const freqControl = document.querySelector('[data-action="freq"]');
freqControl.addEventListener('input', function () {
  oscillator.frequency.value = this.value;
}, false);

const playButton = document.querySelector('.tape-controls-play');

// play pause audio
const muteNode = audioCtx.createGain();

//button to start osc
if (!audioCtx) {
  init();
}

oscillator.start();
muteNode.gain.value = 0;

//button to mute
playButton.addEventListener('click', function () {
  //google chrome best practice
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
var biquadFilter = audioCtx.createBiquadFilter();
// Note: the Web Audio spec is moving from constants to strings.
// filter.type = 'lowpass';
biquadFilter.type = "lowshelf";
biquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);
biquadFilter.gain.setValueAtTime(25, audioCtx.currentTime);
const lowpassControl = document.querySelector('[data-action="lowpass"]');
lowpassControl.addEventListener('input', function () {
  biquadFilter.frequency.value = this.value;
  console.log(biquadFilter.frequency.value)
}, false);

//compressor
const compressor = audioCtx.createDynamicsCompressor();
// compressor.threshold.setValueAtTime(-50, audioCtx.currentTime);
// compressor.knee.setValueAtTime(40, audioCtx.currentTime);
// compressor.ratio.setValueAtTime(12, audioCtx.currentTime);
// compressor.attack.setValueAtTime(0, audioCtx.currentTime);
// compressor.release.setValueAtTime(0.25, audioCtx.currentTime);

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

oscillator.connect(convolver).connect(compressor).connect(delayNode).connect(muteNode).connect(gainNode).connect(audioCtx.destination);