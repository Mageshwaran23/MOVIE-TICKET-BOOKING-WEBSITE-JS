const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");

const detail = document.getElementById("details");

const intervalTime = 2.5 * 60 * 60 * 1000;


let suggestions = [
    "Ponniyin Selvan 2",
    "Guardians of the Galaxy Vol.3",
    "Evil Dead Rise",
    "Fast X",
    "Viduthalai",
    "The Super Mario Bros. Movie",
    "The Kerala Story",
    "Suzume",
    "August 16, 1947",
];

inputBox.onkeyup = (e)=>{
    let userData = e.target.value; 
    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{
            window.location.href = 'timing.html';
            
        }
        emptyArray = suggestions.filter((data)=>{
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); 
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); 
    }
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        window.location.href = 'timing.html';
    }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

let currentTime = new Date().getTime();
let nextIntervalEnd = Math.floor(currentTime / intervalTime) * intervalTime + intervalTime;

let initialTime = localStorage.getItem('countdownInitialTime');
if (!initialTime) {
  initialTime = nextIntervalEnd;
  localStorage.setItem('countdownInitialTime', initialTime);
}

let remainingTime = nextIntervalEnd - currentTime;

function startCountdown() {
  currentTime = new Date().getTime();
  remainingTime = nextIntervalEnd - currentTime;

  if (remainingTime < 0) {
    nextIntervalEnd += intervalTime;
    initialTime = nextIntervalEnd;
    localStorage.setItem('countdownInitialTime', initialTime);
    remainingTime = nextIntervalEnd - currentTime;
  }

  let hours = Math.floor(remainingTime / (1000 * 60 * 60));
  let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  let countdownDiv = document.getElementById('countdown');
  countdownDiv.innerHTML = ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);

  setTimeout(startCountdown, 1000);
}
startCountdown();

document.getElementById('totalcount').innerHTML = localStorage.getItem("selectedSeats");
document.getElementById('totalprice').innerHTML = localStorage.getItem("selectedMoviePrice");

