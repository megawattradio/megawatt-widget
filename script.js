const api = 'https://mira.streamerr.co/api/nowplaying/megawatt_radio';


const schedule = {

0: [
["00:00","06:00","The Midnight Shuffle"],
["06:00","10:00","The Class of 2010"],
["10:00","13:00","The Ultimate Nostalgia Collection"],
["13:00","16:00","Cinema Through the Decades"],
["16:00","19:00","The Ultimate Number Ones Collection"],
["19:00","22:00","K-Pop Spotlight"],
["22:00","24:00","Pop Snapshot"]
],


1: [
["00:00","06:00","The Midnight Shuffle"],
["06:00","10:00","The Swinging Sixties"],
["10:00","13:00","The Ultimate Nostalgia Collection"],
["13:00","16:00","Forever Legends"],
["16:00","19:00","Drive Time Anthems"],
["19:00","22:00","Golden Hits Through the Decades"],
["22:00","24:00","Pop Snapshot"]
],


2: [
["00:00","06:00","The Midnight Shuffle"],
["06:00","10:00","The Sensational Seventies"],
["10:00","13:00","The Ultimate Nostalgia Collection"],
["13:00","16:00","Forever Legends"],
["16:00","19:00","Drive Time Anthems"],
["19:00","22:00","Golden Hits Through the Decades"],
["22:00","24:00","Pop Snapshot"]
],


3: [
["00:00","06:00","The Midnight Shuffle"],
["06:00","10:00","The Electric Eighties"],
["10:00","13:00","The Ultimate Nostalgia Collection"],
["13:00","16:00","Forever Legends"],
["16:00","19:00","Drive Time Anthems"],
["19:00","22:00","Golden Hits Through the Decades"],
["22:00","24:00","Pop Snapshot"]
],


4: [
["00:00","06:00","The Midnight Shuffle"],
["06:00","10:00","The Nostalgic Nineties"],
["10:00","13:00","The Ultimate Nostalgia Collection"],
["13:00","16:00","Forever Legends"],
["16:00","19:00","Drive Time Anthems"],
["19:00","22:00","Golden Hits Through the Decades"],
["22:00","24:00","Pop Snapshot"]
],


5: [
["00:00","06:00","The Midnight Shuffle"],
["06:00","10:00","The Naughty Noughties"],
["10:00","13:00","The Ultimate Nostalgia Collection"],
["13:00","16:00","R&B Anthems"],
["16:00","19:00","Ultimate Party Anthems"],
["19:00","22:00","Clubland Anthems"],
["22:00","24:00","Pop Snapshot"]
],


6: [
["00:00","06:00","The Midnight Shuffle"],
["06:00","10:00","The Naughty Noughties"],
["10:00","13:00","The Ultimate Nostalgia Collection"],
["13:00","16:00","R&B Anthems"],
["16:00","19:00","Ultimate Party Anthems"],
["19:00","22:00","Clubland Anthems"],
["22:00","24:00","Pop Snapshot"]
]

};



function getSchedule() {

    const now = new Date();

    const day = now.getDay();

    const minutes =
        now.getHours() * 60 + now.getMinutes();


    for (const item of schedule[day]) {

        const start = item[0].split(":");

        const end = item[1].split(":");


        const startMinutes =
            Number(start[0]) * 60 + Number(start[1]);


        const endMinutes =
            Number(end[0]) * 60 + Number(end[1]);


        if(minutes >= startMinutes && minutes < endMinutes){

            return item;

        }

    }

}



async function updateWidget(){

try {


const response = await fetch(api + '?t=' + Date.now());

const data = await response.json();



document.getElementById("song").textContent =
data.now_playing.song.title || "";


document.getElementById("artist").textContent =
data.now_playing.song.artist || "";



if(data.live && data.live.is_live){


document.getElementById("status").textContent="LIVE";


document.getElementById("show").textContent =
data.live.stream_title || "Live Show";


}

else {


document.getElementById("status").textContent="PLAYLIST";


const show=getSchedule();


if(show){

document.getElementById("show").textContent =
show[2] + " • " + show[0] + " - " + show[1];

}


}


}

catch(error){

console.log(error);

}

}



updateWidget();

setInterval(updateWidget,10000);
