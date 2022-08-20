let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressbar = document.getElementById('progressbar');
let gif = document.getElementById('gif');
let mysongname = document.getElementById('mysongname');

let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Waqt ki Baatein", Duration: "4:06", filePath: "songs/1.mp3", coverPath: "cover/waqt.jpg"},
    {songName: "Baarishein", Duration: "3:26", filePath: "songs/2.mp3", coverPath: "cover/baarishein.jpg"},
    {songName: "Farq Hai", Duration: "3:03", filePath: "songs/3.mp3", coverPath: "cover/farq.jpg"},
    {songName: "Sun Lo Na", Duration: "2:53", filePath: "songs/4.mp3", coverPath: "cover/sun.jpg"},
    {songName: "Gul", Duration: "3:43", filePath: "songs/5.mp3", coverPath: "cover/gul.jpg"},
    {songName: "Alag Aasmaan", Duration: "3:44", filePath: "songs/6.mp3", coverPath: "cover/alag.jpg"},
]

//display details of songs
songItem.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("timestamp")[0].innerText = songs[i].Duration;
});

//handle pause/play
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
});

//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    progres = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressbar.value = progres;
});

progressbar.addEventListener('change', ()=>{
    audioElement.currentTime = progressbar.value * audioElement.duration/100;
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
        gif.style.opacity=1;
    }) 
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        mastersongname.innerText = songs[songIndex].songName;
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=6){
        songIndex=1;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    mastersongname.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('prev').addEventListener('click', ()=>{
    if(songIndex<=1){
        songIndex=6;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    mastersongname.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});