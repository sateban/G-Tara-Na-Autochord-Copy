document.addEventListener('DOMContentLoaded', function () {
    initializeChordPlayer();
});

function initializeChordPlayer() {
    const chords = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    chords.forEach(chord => {
        const audioPlayer = document.getElementById(`${chord}-Major_audioPlayer`);
        const playButton = document.getElementById(`${chord}-Major_playButton`);

        audioPlayer.src = `./static/audio/major/${chord}_Major.mp3`;

        audioPlayer.addEventListener('ended', function () {
            updatePlayButtonIcon(playButton, 'play');
        });

        playButton.addEventListener('click', function () {
            togglePlay(audioPlayer, playButton);
        });
    });
}

function togglePlay(audioPlayer, playButton) {
    if (audioPlayer.paused) {
        audioPlayer.play();
        updatePlayButtonIcon(playButton, 'pause');
    } else {
        audioPlayer.pause();
        updatePlayButtonIcon(playButton, 'play');
    }
}

function updatePlayButtonIcon(playButton, state) {
    const icon = playButton.querySelector('.fa');

    if (state === 'play') {
        icon.classList.remove('fa-pause-circle');
        icon.classList.add('fa-play-circle');
    } else if (state === 'pause') {
        icon.classList.remove('fa-play-circle');
        icon.classList.add('fa-pause-circle');
    }
}