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

playButton.addEventListener('click', function() {
  if(!audioCtx) {
		init();
	}
  
  if (this.dataset.playing === 'false') {
    oscillator.start();
    this.dataset.playing = 'true';
    // if track is playing pause it
  } else if (this.dataset.playing === 'true') {
    oscillator.stop();
    //gainNode.gain.value = 0;
    this.dataset.playing = 'false';
  }

});

// volume
const gainNode = audioCtx.createGain();

const volumeControl = document.querySelector('[data-action="volume"]');
volumeControl.addEventListener('input', function() {
  gainNode.gain.value = this.value;
}, false);

oscillator.connect(gainNode).connect(audioCtx.destination);