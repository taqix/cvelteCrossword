export function checkIfWordAndResultCanBeUsed(mapOfWordsAndClues, result,data){
    let objOfWordAndClue
    if(authWord(mapOfWordsAndClues, result)){
        return result
    }
    else{
        const random = Math.floor(Math.random() * data.length);
        objOfWordAndClue = data[random];
        checkIfWordAndResultCanBeUsed(mapOfWordsAndClues, objOfWordAndClue.word,data)
    }
  }
function authWord(mapOfWordsAndClues,result){
    let arrayOfLetters = [false,false,false,false,false]
    mapOfWordsAndClues.forEach((obj)=>{
      arrayOfLetters.forEach((_,index)=>{
        for(let i=0;i<obj.word.length;i++){
            if(result[index] === obj.word[i]){
                arrayOfLetters[index] = true
                break;
            }
        }
      })
      
    })
    let counter = 0
    arrayOfLetters.forEach((obj)=>{
        
        if(obj === true){
            counter+=1
        }
        
        
        
    })
    if(counter === 5){
        return true
    }
    else if(counter !== 5){
        return false
    }
    
}