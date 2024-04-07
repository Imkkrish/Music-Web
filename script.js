// Get references to elements
const songNameElement = document.getElementById('song-name');
const artistNameElement = document.getElementById('artist-name');
const audioPlayerElement = document.querySelector('.audio-player audio');
const songImageElement = document.querySelector('.song-img img');
const detailsSection = document.querySelector('.details');
const searchInput = document.getElementById('searchInput');

// Function to update player with song details
function updatePlayer(songName, artistName, audioSource, imageUrl) {
    songNameElement.textContent = songName;
    artistNameElement.textContent = artistName;
    audioPlayerElement.src = audioSource;
    songImageElement.src = imageUrl;
    // Remove any existing animation classes
    songImageElement.classList.remove('rotate');
}

// Function to handle search
function handleSearch() {
    const searchText = searchInput.value.toLowerCase();
    songDivs.forEach(songDiv => {
        const title = songDiv.querySelector('h4').textContent.toLowerCase();
        const artist = songDiv.querySelector('p').textContent.toLowerCase();
        if (title.includes(searchText) || artist.includes(searchText)) {
            songDiv.style.display = 'block';
        } else {
            songDiv.style.display = 'none';
        }
    });
}

// Add input event listener to the search input
searchInput.addEventListener('input', handleSearch);

// Get all song divs
const songDivs = document.querySelectorAll('.song');

// Hide details section initially
detailsSection.style.display = 'none';

// Add click event listener to each song div
songDivs.forEach(songDiv => {
    songDiv.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default behavior of link
        
        // Show details section
        detailsSection.style.display = 'block';

        // Get song details from clicked song div
        const songName = this.querySelector('h4').textContent;
        const artistName = this.querySelector('p').textContent;
        const audioSource = this.querySelector('audio').src;
        const imageUrl = this.querySelector('img').src;

        // Update player with song details
        updatePlayer(songName, artistName, audioSource, imageUrl);

        // Rotate the image when song is played
        songImageElement.classList.add('rotate');
        
        // Start playing the audio
        audioPlayerElement.play();
    });
});

// Event listener to remove rotation animation when the audio stops
audioPlayerElement.addEventListener('ended', function() {
    songImageElement.classList.remove('rotate');
});

// Event listener to remove rotation animation when the audio is paused
audioPlayerElement.addEventListener('pause', function() {
    songImageElement.classList.remove('rotate');
});

// Event listener to resume rotation animation when the audio is played again after being paused
audioPlayerElement.addEventListener('play', function() {
    songImageElement.classList.add('rotate');
});



///



document.addEventListener('DOMContentLoaded', function () {
    const audioPlayerElement = document.getElementById('audio');
    const playPauseButton = document.getElementById('playpause');
    const stopButton = document.getElementById('stop');
    const nextButton = document.getElementById('Next');
    const repeatButton = document.getElementById('Repeat');
    const shuffleButton = document.getElementById('Shufflet');
    const muteButton = document.getElementById('mute');
    const progressBar = document.getElementById('progress-bar');

    // Stop Button
    stopButton.addEventListener('click', function () {
        audioPlayerElement.pause();
        playPauseButton.style.display = 'inline-block';
        stopButton.style.display = 'none';
    });

    // Play/Pause Button
    playPauseButton.addEventListener('click', function () {
        if (audioPlayerElement.paused) {
            audioPlayerElement.play();
            playPauseButton.style.display = 'none';
            stopButton.style.display = 'inline-block';
        } else {
            audioPlayerElement.pause();
            playPauseButton.style.display = 'inline-block';
            stopButton.style.display = 'none';
        }
    });

    // Update Progress Bar
    audioPlayerElement.addEventListener('timeupdate', function () {
        const duration = audioPlayerElement.duration;
        const currentTime = audioPlayerElement.currentTime;
        const progress = (currentTime / duration) * 100;
        progressBar.style.width = progress + '%';
    });

    // Next Button - Implement your functionality here

    // Repeat Button - Implement your functionality here

    // Shuffle Button - Implement your functionality here

    // Mute Button
    let isMuted = false;
    muteButton.addEventListener('click', function () {
        if (isMuted) {
            audioPlayerElement.muted = false;
            isMuted = false;
        } else {
            audioPlayerElement.muted = true;
            isMuted = true;
        }
    });

    // Add additional event listeners and functionality as needed
});
// Event listener for updating progress bar as audio plays
audioPlayerElement.addEventListener('timeupdate', function () {
    const duration = audioPlayerElement.duration;
    const currentTime = audioPlayerElement.currentTime;
    const progress = (currentTime / duration) * 100;
    progressBar.style.width = progress + '%';
    // Add rotation class to image element if audio is playing
    if (!audioPlayerElement.paused) {
        songImageElement.classList.add('rotate');
    }
});

// Event listener to allow seeking in the audio
progressBar.addEventListener('click', function (e) {
    const rect = progressBar.getBoundingClientRect();
    const totalWidth = rect.width;
    const offsetX = e.clientX - rect.left;
    const percentage = offsetX / totalWidth;
    const newTime = percentage * audioPlayerElement.duration;
    audioPlayerElement.currentTime = newTime;
    // Add rotation class to image element after seeking
    songImageElement.classList.add('rotate');
});

// Event listener to update progress bar during audio playback
audioPlayerElement.addEventListener('timeupdate', function () {
    const currentTime = audioPlayerElement.currentTime;
    const duration = audioPlayerElement.duration;
    const progress = (currentTime / duration) * 100;
    progressBar.style.width = progress + '%';
});

