const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const duration = document.getElementById('duration');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const musicPlayer = document.querySelector('.music-player');
const songListElement = document.getElementById('song-list');

const songs = [
    { title: 'Unstoppable', artist: 'Sia', src: 'song1.mp3', img: 'artist.webp' },
    { title: 'Hall of Fame', artist: 'The Script', src: 'song2.mp3', img: 'artist2.webp' },
    { title: 'In The End', artist: 'Mellen Gi & Tommee Profitt', src: 'song3.mp3', img: 'artist3.jpg' }
];

let currentSongIndex = 0;

function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    musicPlayer.style.backgroundImage = `url(${song.img})`;
    document.body.style.backgroundColor = `Black`;

    audio.onloadedmetadata = () => {
        const totalMinutes = Math.floor(audio.duration / 60);
        const totalSeconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
        duration.textContent = `0:00 / ${totalMinutes}:${totalSeconds}`;
    };
}

function playSong() {
    audio.play();
}

function pauseSong() {
    audio.pause();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

function updateProgress() {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;

        const currentMinutes = Math.floor(audio.currentTime / 60);
        const currentSeconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
        const totalMinutes = Math.floor(audio.duration / 60);
        const totalSeconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');

        duration.textContent = `${currentMinutes}:${currentSeconds} / ${totalMinutes}:${totalSeconds}`;
    }
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    
    audio.currentTime = (clickX / width) * duration;
}

function populateSongList() {
    songListElement.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(songs[currentSongIndex]);
            playSong();
        });
        songListElement.appendChild(li);
    });
}

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
playButton.addEventListener('click', playSong);
pauseButton.addEventListener('click', pauseSong);
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);

populateSongList();
loadSong(songs[currentSongIndex]);
