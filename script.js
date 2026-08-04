const api = 'https://mira.streamerr.co/api/nowplaying/megawatt_radio';


const schedule = [
    ["00:00","06:00"],
    ["06:00","10:00"],
    ["10:00","13:00"],
    ["13:00","16:00"],
    ["16:00","19:00"],
    ["19:00","22:00"],
    ["22:00","24:00"]
];


function getCurrentTimeSlot() {

    const now = new Date();

    const minutes =
        now.getHours() * 60 + now.getMinutes();


    for (const slot of schedule) {

        const start = slot[0].split(":");
        const end = slot[1].split(":");


        const startMinutes =
            Number(start[0]) * 60 + Number(start[1]);


        const endMinutes =
            Number(end[0]) * 60 + Number(end[1]);


        if (minutes >= startMinutes && minutes < endMinutes) {

            return slot[0] + " - " + slot[1];

        }

    }

    return "";

}



async function updateWidget() {

    try {

        const response = await fetch(api + '?t=' + Date.now());

        const data = await response.json();


        document.getElementById("song").textContent =
            data.now_playing.song.title || "";


        document.getElementById("artist").textContent =
            data.now_playing.song.artist || "";



        if (data.live && data.live.is_live) {

            document.getElementById("status").textContent = "LIVE";

            document.getElementById("show").textContent =
                data.live.stream_title || "Live Show";

        } 
        
        else {

            document.getElementById("status").textContent = "PLAYLIST";


            const playlist =
                data.now_playing.playlist;


            const time =
                getCurrentTimeSlot();



            if (playlist && playlist !== "MegaWatt Radio") {

                document.getElementById("show").textContent =
                    playlist + " • " + time;

            } 
            
            else {

                document.getElementById("show").textContent =
                    time;

            }

        }


    } catch (error) {

        console.log(error);

    }

}


updateWidget();

setInterval(updateWidget,10000);
