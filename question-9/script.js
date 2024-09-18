const playlist = JSON.parse(localStorage.getItem('playlist')) || [];

document.getElementById('addSongBtn').addEventListener('click', addSong);
document.getElementById('search').addEventListener('input', displaySongs);
document.getElementById('genreFilter').addEventListener('change', displaySongs);

function addSong() {
    const title = document.getElementById('title').value.trim();
    const artist = document.getElementById('artist').value.trim();
    const duration = document.getElementById('duration').value.trim();
    const genre = document.getElementById('genre').value.trim();
    
    if (!title || !artist || !duration || !genre) return;

    playlist.push({ title, artist, duration, genre });
    localStorage.setItem('playlist', JSON.stringify(playlist));
    displaySongs();
}

function deleteSong(index) {
    playlist.splice(index, 1);
    localStorage.setItem('playlist', JSON.stringify(playlist));
    displaySongs();
}

function editSong(index) {
    const song = playlist[index];
    document.getElementById('title').value = song.title;
    document.getElementById('artist').value = song.artist;
    document.getElementById('duration').value = song.duration;
    document.getElementById('genre').value = song.genre;
    deleteSong(index); // Remove it and let user re-add
}

function displaySongs() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const genreFilter = document.getElementById('genreFilter').value;
    const filteredSongs = playlist.filter(song => 
        (song.title.toLowerCase().includes(searchTerm) || song.artist.toLowerCase().includes(searchTerm)) &&
        (genreFilter === '' || song.genre === genreFilter)
    );

    const playlistBody = document.getElementById('playlistBody');
    playlistBody.innerHTML = '';
    filteredSongs.forEach((song, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${song.title}</td>
            <td>${song.artist}</td>
            <td>${song.duration}</td>
            <td>${song.genre}</td>
            <td class="actions">
                <button onclick="editSong(${index})">Edit</button>
                <button onclick="deleteSong(${index})">Delete</button>
            </td>
        `;
        playlistBody.appendChild(row);
    });
}

function sortSongs(prop) {
    playlist.sort((a, b) => a[prop].localeCompare(b[prop]));
    displaySongs();
}

document.getElementById('sortTitle').addEventListener('click', () => sortSongs('title'));
document.getElementById('sortArtist').addEventListener('click', () => sortSongs('artist'));
document.getElementById('sortDuration').addEventListener('click', () => sortSongs('duration'));
document.getElementById('sortGenre').addEventListener('click', () => sortSongs('genre'));

displaySongs();
