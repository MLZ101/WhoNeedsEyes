
// NOTE THAT localStorage sometimes loses order, so we cannot rely on it to create p elements in order
// for that, I'll take the data, store and sort them in an array then display
// I wish I used a normal db, oh well, the more you know (send help)

items = new Array();
var toRead2 = "";     // for the notes
var toRead = "";      // for everyhting else

let pressed5 = false;

for (var i=0; i< localStorage.length; i++)
{
    items[i] = localStorage.key(i) + '\n<br>' + localStorage.getItem(localStorage.key(i));
}   
items.sort();

container = document.getElementById("container");
const tts = window.speechSynthesis;




// ---------- Structuring the Elements -----------

p = document.createElement("p");
if (!localStorage.getItem("index")){
    p.textContent = 'No Saves Yet';
    p.style.border = 'none';
    p.style.color = 'white';
    p.style.textAlign = 'center';
    p.style.backgroundColor = 'transparent';
    toRead = p.textContent + '\n' + 'Press 5 for help\n';
}
else{
    p.textContent = 'Total of ' + localStorage.getItem("index") +  ' Notes' ;
    p.style.border = 'none';
    p.style.color = 'white';
    p.style.backgroundColor = 'transparent';
    p.style.textAlign = 'center';
    toRead = p.textContent + '\n' + 'Press 5 for help\n';
}

container.appendChild(p);


console.log(items.length)
for (var i = items.length; i > 0; i--) {

    if(items[i-1].includes("Note")) {         // skip the index
        p = document.createElement("p");
        p.innerHTML = items[i-1];           
        container.appendChild(p);  
        toRead2 += p.textContent + '\n';
    }
}
  

p = document.createElement("p");
p.style.border = 'none';
p.style.color = 'white';
p.innerHTML = 'Press 5 For Help\n<br>';
p.style.textAlign = 'center';
p.style.backgroundColor = 'transparent';
container.appendChild(p);

window.addEventListener('load', ()=> {
  console.log(toRead);

  utterance = new SpeechSynthesisUtterance('this is the saved notes page\n' + toRead);
  tts.speak(utterance);
});



console.log(pressed5);


// ----------- Configuring Buttons --------------

document.addEventListener('keydown', (event)=> {   
  tts.cancel();
  if(event.key === '5'){
    help = document.createElement("p");
    help.style.border = 'none';
    help.style.color = 'white';
    help.innerHTML = 'Press 0 to Start Reading the Notes\n<br>1 for HomePage\n<br>2 for Note-taking Page';
    help.style.textAlign = 'center';
    help.style.backgroundColor = 'transparent';
    console.log(pressed5);
    if(!pressed5){
      pressed5 = true;
      container.appendChild(help);
    }
    utterance = new SpeechSynthesisUtterance(help.textContent);
    tts.speak(utterance);
  }

  if(event.key === '0'){
    utterance = new SpeechSynthesisUtterance(toRead2);
    tts.speak(utterance);
  }

  if(event.key === '1'){
    location.href = "index.html";
  }

  if(event.key === '2'){
    location.href = "speech_to_text.html";
  }
});   
 











// add date and time