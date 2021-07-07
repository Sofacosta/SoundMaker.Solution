// create web audio api context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator node
const oscillator = audioCtx.createOscillator();
// let track;

oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
//oscillator.connect(audioCtx.destination);


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
  console.log(gainNode.gain.value)
  if (muteNode.gain.value === 0) {
    muteNode.gain.value = gainNode.gain.value;
  } else {
    muteNode.gain.value = 0;
  }
});

// volume
const gainNode = audioCtx.createGain();

const volumeControl = document.querySelector('[data-action="volume"]');
volumeControl.addEventListener('input', function () {
  gainNode.gain.value = this.value;
}, false);

oscillator.connect(muteNode).connect(gainNode).connect(audioCtx.destination);