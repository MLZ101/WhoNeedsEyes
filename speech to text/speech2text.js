
// -------------------------- Setting Up the Speech Recognition (speech to text) and its Variables -------------------------------

const main_div = document.getElementById("input");
let inputs = new Array();    
let audio = new Audio("smallpop-end.mp3"); 
let toRead = "";
var pressed5 = false;


window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;


const recognition = new SpeechRecognition();
recognition.interimResults = true;


let textblock = document.getElementById("textblock");

var i = 0;
var can_save = true;


if (localStorage.getItem(localStorage.key(0))){(
  localStorage.setItem("index", parseInt(localStorage.getItem("index"))));
}

else{
  localStorage.setItem("index", '0');
}





//-------------------------- Setting Up the Speech Synthesis (text to speech)  -------------------------------


const tts = window.speechSynthesis;
p = document.getElementById('toread');
toRead += p.innerText;


window.addEventListener('load', ()=> {
  utterance = new SpeechSynthesisUtterance('this is the note-taking page\n' + p.innerText);
  tts.speak(utterance);
});


toRead = '';



// --------------------------- Magical Code That Makes Your Voice a String and Displays It Upon Click --------------------------                                            

recognition.addEventListener("result", (event) => {
  const text = Array.from(event.results) 
  .map((result) => result[0]) 
  .map((result) => result.transcript) 
  .join("");

  
  if (event.results[0].isFinal) {
    switch(text.toLowerCase()){                 // these words/phrases can be used as literal when said with a full text not as a single input
      case "comma.":               
        inputs[i] = ',';
        textblock.value +=',';
        audio.play();
        break;

    case "point.":
      inputs[i] = '.';
      textblock.value +='.';
      console.log(inputs[i]);
      audio.play();
      break;

    case "question mark.":
      inputs[i] = '?';
      textblock.value +='?';
      audio.play();
      break;

    case "exclamation mark.":
      inputs[i] = '!';
      textblock.value +='! ';
      audio.play();
      break;

    case "colon.":
      inputs[i] = ':';
      textblock.value +=':';
      audio.play();
      break;

    default:
      inputs.push(' ' + text.substring(0, text.length - 1));
      textblock.value += ' ' + text ;

      audio.play();
      break;
    } 

    toRead += text;

    document.addEventListener('keydown', (event)=> {   

      if (event. key === '6'){
        utterance = new SpeechSynthesisUtterance(toRead);
        tts.speak(utterance);                                 
      }
    }); 
    

    console.log(text);
    i++;                                               
    
    document.addEventListener('keydown', (event) =>{          
    if (event.key === ' ' && can_save) {                     
    new Audio("save_sound.wav").play();
    localStorage.setItem("Note " + (parseInt(localStorage.getItem("index"))+1).toString()
                        ,inputs.join("")
                        );

    localStorage.setItem("index", parseInt(localStorage.getItem("index"))+1);
    can_save = false;
    toRead = '';
    textblock.value = '';
    inputs.length = 0;
    }

});
  }

});


document.addEventListener('keydown', (event) =>{ 
  tts.cancel();
  if (event. key === '0'){
    recognition.start();
    can_save = true;                                  
  }

  if(event.key === '1'){
    tts.cancel();
    location.href = "index.html";
  }

  if(event.key === '3'){
    tts.cancel();
    location.href = "saved.html";
  }



  if (event.key === '5'){
    help = document.createElement("p");
    help.style.border = 'none';
    help.style.color = 'white';
    help.innerHTML = "Click '0' to Start or Continue Inputting Speech \n<br> '6' to Read What You've Written So Far \n<br> 'Spacebar' to Save \n<br> and the Buttons '1', '3' for Different Pages <br>\n";
    help.style.textAlign = 'center';
    help.style.backgroundColor = 'transparent';
    if (!pressed5){
      pressed5 = true;
      main_div.appendChild(help);
    }
    utterance = new SpeechSynthesisUtterance(help.textContent);
    tts.speak(utterance);
  }
});

// Note: \n for pause in speech synthesis while <br> for new line in p element

// help option instead of toRead