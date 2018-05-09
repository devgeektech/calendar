function __log(e, data) {
    //log.innerHTML += "\n" + e + " " + (data || '');
  }

  var audio_context;
  var recorder;
  var audioFiles = {};
  function startUserMedia(stream) {
    var input = audio_context.createMediaStreamSource(stream);
    __log('Media stream created.');

    // Uncomment if you want the audio to feedback directly
    //input.connect(audio_context.destination);
    //__log('Input connected to audio context destination.');
    
    recorder = new Recorder(input);
    __log(recorder);
    __log('Recorder initialised.');
  }

  function startRecording(button) {
    recorder && recorder.record();
    __log('Recording...');
  }

  function stopRecording(button) {
    recorder && recorder.stop();
    __log('Stopped recording.');
    
    // create WAV download link using audio data blob
    // console.log(recorder)
    // console.log("---")
    createDownloadLink();
    if(recorder)
      recorder.clear();
  }

  function createDownloadLink() {
    // console.log("in d link ...")
    // console.log(recorder)
    recorder && recorder.exportWAV(function(blob) {
      var url = URL.createObjectURL(blob);
      var li = document.createElement('li');
      var au = document.createElement('audio');
      var hf = document.createElement('a');
      var ck = document.createElement('input');

      // console.log(blob)
      // console.log(url)
      var fileName = new Date().toISOString() + '.wav';
      audioFiles[url] = {fileName : fileName, blb : blob};
      console.log(audioFiles);
      au.controls = true;
      au.src = url;
      hf.href = url;
      hf.download = fileName;
      hf.innerHTML = hf.download;
      li.appendChild(au);
      li.appendChild(hf);
      ck.type = "radio";
      ck.name = "aud";
      ck.value = url;
      ck.className= "aduck";
      li.appendChild(ck);
      // console.log(li)
      // console.log("-----------------")
      // console.log(recordingslist)
      recordingslist.appendChild(li);
    });
  }
  function uploadRecordedFile(url, token, callback) {
      var fileData = audioFiles[url];
      var filename = fileData.fileName;
      var data = new FormData();
      data.append('audioUpload', fileData.blb);

      $.ajax({
        url :  "http://52.32.253.191/Message_Template2/public/api/messageTemplate/audioUpload",
        // 
        // url :  "http://localhost/fup/index.php",
        type: 'POST',
        data: data,
        contentType: false,
        processData: false,
        headers: {
          "Authorization": "Bearer " + token
        },
        success: function(resData) {
          console.log(resData);
          callback(resData)
          // return resData;
          //alert("boa!");
        },    
        error: function() {
          //alert("not so boa!");
        }
      });
  }

 var recorderObject = (function() {
  return {
     recorder: function() {
        (function($) {
            'use strict';
  window.onload = function init() {
    try {
      // webkit shim
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
      window.URL = window.URL || window.webkitURL;
      
      audio_context = new AudioContext;
      __log('Audio context set up.');
      __log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
      // console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
    } catch (e) {
      alert('No web audio support in this browser!');
    }
    
    navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
      // console.log('No live audio input: ' + e);
      __log('No live audio input: ' + e);
    });
  };
})(window.jQuery);
}
}
})(recorderObject||{})