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
const muteButton = document.getElementById('mute');
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


// Function to add song to queue
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
    // Add the new queue item to the end of the queue list
    queueList.appendChild(queueItem);
}

