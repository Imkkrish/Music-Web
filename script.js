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

        // Show the stop button and hide the play button
        playPauseButton.style.display = 'none';
        stopButton.style.display = 'inline-block';

        // Remove display:none from progress bar
        progressBar.style.display = 'block';

        // Add the song to the queue
        addToQueue(songName, artistName, imageUrl);
    });
});

// Function to add song to queue
function addToQueue(songName, artistName, imageUrl) {
    const queueItem = document.createElement('div');
    queueItem.classList.add('qbox');
    queueItem.innerHTML = `
        <div class="q-img"> <!-- Updated class name -->
            <img src="${imageUrl}" alt="${songName}" class="q-img"> <!-- Added class attribute -->
        </div>
        <div class="qdetails">
            <h3>${songName}</h3>
            <p>${artistName}</p>
        </div>
    `;
    // Add the new queue item to the beginning of the queue list
    queueList.insertBefore(queueItem, queueList.firstChild);
}


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

// Event listener to update progress bar during audio playback
audioPlayerElement.addEventListener('timeupdate', function () {
    const currentTime = audioPlayerElement.currentTime;
    const duration = audioPlayerElement.duration;
    const progress = (currentTime / duration) * 100;
    progressBar.style.width = progress + '%';
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


// Add additional event listeners and functionality as needed
// Function to add song to queue
function addToQueue(songDiv) {
    const songName = songDiv.querySelector('h4').textContent;
    const artistName = songDiv.querySelector('p').textContent;
    const audioSource = songDiv.querySelector('audio').src;
    const imageUrl = songDiv.querySelector('img').src;

    const queueItem = document.createElement('div');
    queueItem.classList.add('qbox');
    queueItem.innerHTML = `
        <div class="q-img-container">
            <img src="${imageUrl}" class="q-img">
        </div>
        <div class="qdetails">
            <h3>${songName}</h3>
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
        addToQueue(this);

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
        const songName = queueItem.querySelector('h3').textContent;
        const artistName = queueItem.querySelector('p').textContent;
        const audioSource = queueItem.querySelector('audio').src;
        const imageUrl = queueItem.querySelector('img').src;
        playFromQueue(songName, artistName, audioSource, imageUrl);
    }
});


// Function to add song to queue (LIFO)
function addToQueue(songDiv) {
    const songName = songDiv.querySelector('h4').textContent;
    const artistName = songDiv.querySelector('p').textContent;
    const audioSource = songDiv.querySelector('audio').src;
    const imageUrl = songDiv.querySelector('img').src;

    // Check if the song is already in the queue
    const existingQueueItems = document.querySelectorAll('.qbox');
    for (const item of existingQueueItems) {
        const qSongName = item.querySelector('h3').textContent;
        const qArtistName = item.querySelector('p').textContent;
        if (songName === qSongName && artistName === qArtistName) {
            return; // Song is already in the queue, so exit the function
        }
    }

    // Song is not in the queue, so add it
    const queueItem = document.createElement('div');
    queueItem.classList.add('qbox');
    queueItem.innerHTML = `
        <div class="q-img-container">
            <img src="${imageUrl}" class="q-img">
        </div>
        <div class="qdetails">
            <h3>${songName}</h3>
            <p>${artistName}</p>
            <audio src="${audioSource}"></audio> <!-- Add audio source to qbox -->
        </div>
    `;

    // Add the new queue item to the beginning of the queue list
    queueList.insertBefore(queueItem, queueList.firstChild);
}

// Global variable to keep track of the current song index
let currentSongIndex = -1; // Initialize with -1 to indicate no current song

// Function to play the next song
function playNextSong() {
    // Get all the queue items
    const queueItems = document.querySelectorAll('.qbox');

    // Increment the current song index
    currentSongIndex++;

    // If the current song index exceeds the number of songs in the queue, reset it to 0
    if (currentSongIndex >= queueItems.length) {
        currentSongIndex = 0;
    }

    // Get the next song
    const nextSong = queueItems[currentSongIndex];

    // Play the next song
    const songName = nextSong.querySelector('h3').textContent;
    const artistName = nextSong.querySelector('p').textContent;
    const audioSource = nextSong.querySelector('audio').src;
    const imageUrl = nextSong.querySelector('img').src;
    playFromQueue(songName, artistName, audioSource, imageUrl);
}

// Event listener for the forward button
document.getElementById('Next').addEventListener('click', playNextSong);

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

// Event listener to play next song when the current song ends
audioPlayerElement.addEventListener('ended', function() {
    playNextSong();
});


// Get a reference to the repeat 1 button
const repeatOneButton = document.getElementById('repeat-one');

// Variable to track the state of the button
let repeatState = 0; // 0: Initial state, 1: All songs repeat, 2: Repeat 1

// Add an event listener to the repeat 1 button
repeatOneButton.addEventListener('click', function() {
    // Toggle the repeatState variable
    repeatState = (repeatState + 1) % 3;

    // Update the button appearance based on the repeatState
    switch (repeatState) {
        case 0:
            // Initial state
            repeatOneButton.style.color = ''; // Reset color to default
            repeatOneButton.innerHTML = '<i class="fas fa-sync"></i>'; // Reset icon
            break;
        case 1:
            // All songs repeat state
            repeatOneButton.style.color = 'red'; // Change color to red
            repeatOneButton.innerHTML = '<i class="fas fa-sync"></i>'; // Reset icon
            break;
        case 2:
            // Repeat 1 state
            repeatOneButton.style.color = 'green'; // Change color to green
            repeatOneButton.innerHTML = '<i class="fas fa-sync"></i> 1'; // Set icon with text '1'
            break;
    }

    // Add your logic for handling the different repeat states here
    switch (repeatState) {
        case 0:
            console.log('Initial state: No repeat');
            break;
        case 1:
            console.log('All songs repeat');
            break;
        case 2:
            console.log('Repeat 1');
            break;
    }
});



// Global variable to keep track of the repeat mode
let repeatMode = 'none'; // Possible values: 'none', 'all', 'one'

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
    const songName = nextSong.querySelector('h3').textContent;
    const artistName = nextSong.querySelector('p').textContent;
    const audioSource = nextSong.querySelector('audio').src;
    const imageUrl = nextSong.querySelector('img').src;
    playFromQueue(songName, artistName, audioSource, imageUrl);
}

//

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



