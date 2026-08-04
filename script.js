const api = 'https://mira.streamerr.co/api/nowplaying/megawatt_radio';

async function u() {
    try {
        const r = await fetch(api + '?t=' + Date.now());
        const d = await r.json();

        song.textContent = d.now_playing.song.title || 'Unknown Track';
        artist.textContent = d.now_playing.song.artist || '';

        if (d.live && d.live.is_live) {
            status.textContent = 'LIVE';
            show.textContent = d.live.stream_title || 'Live Show';
        } else {
            status.textContent = 'PLAYLIST';
            show.textContent = d.now_playing.playlist || '';
        }

    } catch (e) {
        console.log(e);
    }
}

u();
setInterval(u, 10000);
