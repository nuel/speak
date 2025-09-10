/*
 * Speak engine
 */
const speakState = {
  currentLine: [],
  currentBalloon: null,
  speakIndex: 0,
  speed: 1,
}

const speak = (balloon, speed) => {
  if (speed) speakState.speed = speed;
  
  if (speakState.currentBalloon === balloon) return;

  if (balloon.innerHTML) {
    tokenize(balloon.innerHTML.trim());
    speakState.currentBalloon = balloon;
  }

  if (speakState.currentLine && speakState.speakIndex < speakState.currentLine.length) {
    speakState.speakIndex ++;
    speakState.currentBalloon.innerHTML = speakState.currentLine.slice(0, speakState.speakIndex).join('');

    const delay = cadence(speakState.currentLine[speakState.speakIndex - 1], speakState.currentBalloon.dataset.speed || speakState.speed);
    setTimeout(() => requestAnimationFrame(speak), delay);
  } else {
    doneTalking();
  }
}

// Split line into characters, punctuation clusters and markup tags
const tokenize = string => {
  for (let e = 0; e < string.length; e++) {
    if (string[e] === '<') {
      const pos = string.slice(e).search('>');
      speakState.currentLine.push(string.slice(e, e + pos + 1));
      e += pos;
    } else if (REST.test(string[e]) && REST.test(string[e + 1])) {
      const pos = string.slice(e).search(/\s/);
      if (pos > 0) {
        speakState.currentLine.push(string.slice(e, e + pos));
        e += pos - 1;
      } else {
        speakState.currentLine.push(string.slice(e));
        e = string.length;
      }
    } else {
      speakState.currentLine.push(string[e]);
    }
  }
}

// Determine delay based on punctuation
const REST = /(?<!<)^[.\/#!?$%\^&\*;:\-)]/;
const COMMA = /[,]/;
const cadence = (char, speed) => {
  if (REST.test(char)) {
    return 500 / speed;
  }
  if (COMMA.test(char)) {
    return 150 / speed;
  }

  return 10 / speed;
}

// Skip: fill out line and interupt speak() loop
const skip = () => {
  if (speakState.currentLine.length && speakState.currentBalloon) {
    speakState.currentBalloon.innerHTML = speakState.currentLine.join('')
    doneTalking();
  }
}

// End speech
const doneTalking = () => {
  speakState.currentLine = [];
  speakState.currentBalloon = null;
  speakState.speakIndex = 0;
}