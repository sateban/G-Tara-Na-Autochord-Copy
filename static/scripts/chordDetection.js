let isRecording = false;
let mediaRecorder;
let audioChunks = [];

function toggleRecording(event) {
    const micButton = event.currentTarget;
    const section = micButton.closest('.section');
    const statusElement = section.querySelector('#status');
    const chordsElement = section.querySelector('#chords');
    const accuracyElement = section.querySelector('#accuracy');
    const sectionId = section.id.replace('section', '');
    const selectedChord = sectionId + (sectionId.includes('Minor') ? ':min' : ':maj'); // Determine if it's a major or minor chord

    if (!isRecording) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                statusElement.innerText = 'Recording...';
                isRecording = true;

                mediaRecorder.ondataavailable = event => {
                    audioChunks.push(event.data);
                };

                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    const formData = new FormData();
                    formData.append('file', audioBlob, 'recording.wav');

                    fetch('/api/detect', {
                        method: 'POST',
                        body: formData
                    })
                    .then(response => response.json())
                    .then(data => {
                        const detectedChord = data.chords.join(', ');
                        statusElement.innerText = detectedChord.includes(selectedChord) ? 'Correct Chord!' : 'Incorrect Chord!';
                        chordsElement.innerText = 'Chord Detected: ' + detectedChord;
                        accuracyElement.innerText = 'Accuracy Rate: ' + (Math.random() * (90 - 60) + 60).toFixed(2) + '%'; // Example accuracy rate
                    })
                    .catch(error => {
                        statusElement.innerText = 'Error: ' + error;
                    });

                    audioChunks = [];
                };
            });
    } else {
        mediaRecorder.stop();
        statusElement.innerText = 'Processing...';
        isRecording = false;
    }
}