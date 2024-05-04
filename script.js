// Get references to elements
const songNameElement = document.getElementById('song-name');
const artistNameElement = document.getElementById('artist-name');
const audioPlayerElement = document.querySelector('.audio-player audio');
const songImageElement = document.querySelector('.song-img img');
const detailsSection = document.querySelector('.details');
const searchInput = document.getElementById('searchInput');
const playPauseButton = document.getElementById('playpause');
const stopButton = document.getElementById('stop');
const progressBar = document.getElementById('progress-bar');
const queueList = document.querySelector('.Queue-list');

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

// Function to add song to queue
function addToQueue(songName, artistName, audioSource, imageUrl) {
    // Check if the song is already in the queue
    const existingQueueItem = document.querySelector(`.qdetails h3[data-song="${songName}"][data-artist="${artistName}"]`);
    if (existingQueueItem) {
        return; // Song is already in the queue, so exit the function
    }

    const queueItem = document.createElement('div');
    queueItem.classList.add('qbox');
    queueItem.innerHTML = `
        <div class="q-img-container">
            <img src="${imageUrl}" class="q-img">
        </div>
        <div class="qdetails">
            <h3 data-song="${songName}" data-artist="${artistName}">${songName}</h3>
            <p>${artistName}</p>
            <audio src="${audioSource}"></audio> <!-- Add audio source to qbox -->
        </div>
    `;

    // Add the new queue item to the end of the queue list
    queueList.appendChild(queueItem);
}

// Function to play song from the queue
function playFromQueue(songName, artistName, audioSource, imageUrl) {
    // Update player with song details
    updatePlayer(songName, artistName, audioSource, imageUrl);

    // Rotate the image when song is played
    songImageElement.classList.add('rotate');

    // Start playing the audio
    audioPlayerElement.play();

    // Show the stop button and hide the play button
    playPauseButton.style.display = 'none';
    stopButton.style.display = 'inline-block';

    // Remove display:none from progress bar
    progressBar.style.display = 'block';
}

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

        // Add the song to the queue
        addToQueue(songName, artistName, audioSource, imageUrl);

        // Update player with song details
        updatePlayer(songName, artistName, audioSource, imageUrl);

        // Rotate the image when song is played
        songImageElement.classList.add('rotate');

        // Start playing the audio
        audioPlayerElement.play();

        // Show the stop button and hide the play button
        playPauseButton.style.display = 'none';
        stopButton.style.display = 'inline-block';

        // Remove display:none from progress bar
        progressBar.style.display = 'block';
    });
});

// Add click event listener to each queue item
queueList.addEventListener('click', function(event) {
    const queueItem = event.target.closest('.qbox');
    if (queueItem) {
        const songName = queueItem.querySelector('h3').getAttribute('data-song');
        const artistName = queueItem.querySelector('h3').getAttribute('data-artist');
        const audioSource = queueItem.querySelector('audio').src;
        const imageUrl = queueItem.querySelector('img').src;
        playFromQueue(songName, artistName, audioSource, imageUrl);
    }
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

// Event listener for updating progress bar as audio plays
audioPlayerElement.addEventListener('timeupdate', function () {
    const duration = audioPlayerElement.duration;
    const currentTime = audioPlayerElement.currentTime;
    const progress = (currentTime / duration) * 100;
    progressBar.style.width = progress + '%';
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

// Mute Button
const muteButtons = document.querySelectorAll('.volume-mute');

muteButtons.forEach(muteButton => {
    muteButton.addEventListener('click', function () {
        const muteIcon = this.querySelector('i');
        const isMuted = audioPlayerElement.muted;

        if (isMuted) {
            // Unmute the audio
            audioPlayerElement.muted = false;
            // Change icon to volume up
            muteIcon.classList.remove('fa-volume-mute');
            muteIcon.classList.add('fa-volume-up');
            
        } else {
            // Mute the audio
            audioPlayerElement.muted = true;
            // Change icon to mute
            muteIcon.classList.remove('fa-volume-up');
            muteIcon.classList.add('fa-volume-mute');
        }
    });
});

// Global variable to keep track of the repeat mode
let repeatMode = 'none'; // Possible values: 'none', 'all', 'one'

// Get a reference to the repeat 1 button
const repeatOneButton = document.getElementById('repeat-one');

// Add an event listener to the repeat 1 button
repeatOneButton.addEventListener('click', function() {
    // Toggle the repeat mode
    switch (repeatMode) {
        case 'none':
            // Change to repeat all
            repeatMode = 'all';
            repeatOneButton.style.color = 'red'; // Change color to red
            repeatOneButton.innerHTML = '<i class="fas fa-sync"></i>'; // Reset icon
            break;
        case 'all':
            // Change to repeat one
            repeatMode = 'one';
            repeatOneButton.style.color = 'green'; // Change color to green
            repeatOneButton.innerHTML = '<i class="fas fa-sync"></i> 1'; // Set icon with text '1'
            break;
        case 'one':
            // Change to no repeat
            repeatMode = 'none';
            repeatOneButton.style.color = ''; // Reset color to default
            repeatOneButton.innerHTML = '<i class="fas fa-sync"></i>'; // Reset icon
            break;
    }

    // Log the current repeat mode
    console.log('Repeat mode:', repeatMode);
});

// Global variable to keep track of the current song index
let currentSongIndex = -1; // Initialize with -1 to indicate no current song

// Function to play the next song
function playNextSong() {
    // Get all the queue items
    const queueItems = document.querySelectorAll('.qbox');

    // Increment the current song index
    currentSongIndex++;

    // Check if repeat mode is 'one' and reset index if needed
    if (repeatMode === 'one') {
        if (currentSongIndex >= queueItems.length) {
            currentSongIndex = 0;
        }
    } else {
        // Check if the current song index exceeds the number of songs in the queue
        if (currentSongIndex >= queueItems.length) {
            // Reset the current song index based on the repeat mode
            if (repeatMode === 'none') {
                // Stop playback if repeat mode is 'none'
                stopPlayback();
                return;
            } else {
                // Reset index to 0 if repeat mode is 'all'
                currentSongIndex = 0;
            }
        }
    }

    // Get the next song
    const nextSong = queueItems[currentSongIndex];

    // Play the next song
    const songName = nextSong.querySelector('h3').getAttribute('data-song');
    const artistName = nextSong.querySelector('h3').getAttribute('data-artist');
    const audioSource = nextSong.querySelector('audio').src;
    const imageUrl = nextSong.querySelector('img').src;
    playFromQueue(songName, artistName, audioSource, imageUrl);
}

// Event listener for the forward button
document.getElementById('Next').addEventListener('click', playNextSong);

// Event listener to play next song when the current song ends
audioPlayerElement.addEventListener('ended', function() {
    playNextSong();
});

// Function to stop playback
function stopPlayback() {
    audioPlayerElement.pause();
    audioPlayerElement.currentTime = 0;
    playPauseButton.style.display = 'inline-block';
    stopButton.style.display = 'none';
    progressBar.style.width = '0%';
}

// Function to add additional event listeners and functionality as needed
document.addEventListener("DOMContentLoaded", function() {
    const queueButton = document.getElementById("queueButton");
    const crossButton = document.getElementById("crossButton");
    const localDiv = document.querySelector(".local");
    const navDiv = document.querySelector(".nav");
    const rightDiv = document.querySelector(".right");

    queueButton.addEventListener("click", function() {
        localDiv.style.width = "100%";
        localDiv.style.display = "block";
        navDiv.style.display = "none";
        rightDiv.style.display = "none";
        crossButton.style.display = "block"; // Make cross button visible
    });

    crossButton.addEventListener("click", function() {
        localDiv.style.display = "none"; // Hide local div
        navDiv.style.display = "block"; // Make nav div visible
        rightDiv.style.display = "block"; // Make right div visible
        crossButton.style.display = "none"; // Hide cross button
    });
});
