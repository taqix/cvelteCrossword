export function checkIfWordAndResultCanBeUsed(
  mapOfWordsAndClues,
  result,
  data
) {
  let objOfWordAndClue;
  console.log(result);
  while (true) {
    let arrayOfLetters = [false, false, false, false, false];
    mapOfWordsAndClues.forEach((obj) => {
      arrayOfLetters.forEach((_, index) => {
        for (let i = 0; i < obj.word.length; i++) {
          if (result[index] === obj.word[i] && result!=obj.word) {
            arrayOfLetters[index] = true;
            break;
          }
        }
      });
    });
    let counter = 0;
    arrayOfLetters.forEach((obj) => {
      if (obj === true) {
        counter += 1;
      }
    });

    if (counter === 5) {
      let isInMap = false;
      mapOfWordsAndClues.forEach((obj) => {
        console.log(result, obj.word);
        if (result === obj.word) {
          console.log(result, obj.word);
          isInMap = true;
        }
      });
      console.log(isInMap);
      console.log("cos", result);
      break;
    } else if (counter !== 5) {
      const random = Math.floor(Math.random() * data.length);
      objOfWordAndClue = data[random];
      result = objOfWordAndClue.word;
    }
  }
  return result;
}
