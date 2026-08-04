const api = 'https://mira.streamerr.co/api/nowplaying/megawatt_radio';


async function u() {

    try {

        const r = await fetch(api + '?t=' + Date.now());

        const d = await r.json();


        document.getElementById('song').textContent =
            d.now_playing.song.title || '';


        document.getElementById('artist').textContent =
            d.now_playing.song.artist || '';



        if (d.live && d.live.is_live) {

            document.getElementById('status').textContent = 'LIVE';

            document.getElementById('show').textContent =
                d.live.stream_title || 'Live Show';

        } 
        
        else {

            document.getElementById('status').textContent = 'PLAYLIST';


            const playlist = d.now_playing.playlist;


            document.getElementById('show').textContent =
                (playlist && playlist !== 'MegaWatt Radio')
                ? playlist
                : '';

        }


    } catch (e) {

        console.log(e);

    }

}


u();

setInterval(u, 10000);
