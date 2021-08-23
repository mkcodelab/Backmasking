const input = document.getElementById('fileInput');
const processBtn = document.getElementById('process');

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let audioEl;

processBtn.addEventListener('click', process);

function process() {

  if (input.files[0] == undefined) {
    return false;
  }
  let reader1 = new FileReader();
  reader1.onload = function(ev) {
    
    audioCtx.decodeAudioData(ev.target.result).then(function(buffer){

      let source = audioCtx.createBufferSource();
      Array.prototype.reverse.call( buffer.getChannelData(0) );
      Array.prototype.reverse.call( buffer.getChannelData(1) );
      console.log(buffer.numberOfChannels);
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.start(0);
      audioEl = source;
    });
  };
  reader1.readAsArrayBuffer(input.files[0]);
}

const stopBtn = document.getElementById('stop');
stopBtn.addEventListener('click', ()=> {
    audioEl.stop();
    audioEl.disconnect(audioCtx.destination);
})