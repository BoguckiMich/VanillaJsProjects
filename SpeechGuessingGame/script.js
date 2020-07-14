const msgElement = document.getElementById("msg");

const randomNumber = getRandomNumber();

console.log(randomNumber);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  console.log(msg);
  writeMessage(msg);
  checkNumber(msg);
}

function checkNumber(msg) {
  const number = +msg;

  if (Number.isNaN(number)) {
    msgElement.innerHTML += "<div>That is not a valid number</div>";
    return;
  }

  if (number > 100 || number < 1) {
    msgElement.innerHTML += "<div>Number must be in range from 1 to 100</div>";
    return;
  }

  if (number === randomNumber) {
    document.body.innerHTML = `
      <div class="final-page"><h2>Congrats! You have guessed the number! <br><br>
      It was ${number}</h2>
      <button class="play-again" id="play-again">Play Again</button></div>
    `;
  } else if (number > randomNumber) {
    msgElement.innerHTML += "<div>GO LOWER</div>";
  } else {
    msgElement.innerHTML += "<div>GO HIGHER</div>";
  }
}

function writeMessage(msg) {
  msgElement.innerHTML = `
    <div>You said:</div>
    <span class="box">${msg}</span>
    `;
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

recognition.addEventListener("end", () => recognition.start());

recognition.addEventListener("result", onSpeak);

document.body.addEventListener("click", (e) => {
  if (e.target.id == "play-again") {
    window.location.reload();
  }
});
