export function getNumbersFieldsWithLetterOfResult(arrOfWords, result){
    
    let arrayOfFounds = []
    let arrOfId = []
    for(let i = 0; i < 5; i++){
        arrayOfFounds.push({idOfField: "", isWrote: false,isFound: false,letter:""})
    }
    arrOfWords.forEach((obj,index)=>{
        for(let i=0;i<arrOfWords.length;i++){
            for(let j=0;j<result.length;j++){
                if(obj.word[i] === result[j]){
                    const id = String(index)+String(i)
                    if(arrayOfFounds[j].isFound === false && !arrOfId.includes(id)){
                        arrayOfFounds[j].isFound = true
                        arrayOfFounds[j].idOfField = id
                        arrOfId.push(id)
                    }
                    
                    
                }
                
            }
            
            
        }
    
    })
    return arrayOfFounds
}
export function drawIndexShowed(arrayOfIdFounds){
    let arrOfId = [];
    for(let i=0;i<3;i++){
        const random1 = Math.floor(Math.random() * 4)
        const random2 = Math.floor(Math.random() * 4)
        if(arrayOfIdFounds.includes(random1 + String(random2)) || arrOfId.includes(random1 + String(random2)))
        {
            i--
        }
        else{
            arrOfId.push(random1 + String(random2))
        }
        
    }
    return arrOfId;
}