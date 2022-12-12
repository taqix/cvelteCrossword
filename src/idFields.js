export function getNumbersFieldsWithLetterOfResult(arrOfWords, result){
    console.log(result);
    let arrayOfFounds = []
    for(let i = 0; i < 5; i++){
        arrayOfFounds.push({idOfField: "", isWrote: false,isFound: false,letter:""})
    }
    arrOfWords.forEach((obj,index)=>{
        for(let i=0;i<arrOfWords.length;i++){
            for(let j=0;j<result.length;j++){
                if(obj.word[i] === result[j]){
                    if(arrayOfFounds[j].isFound === false){
                        arrayOfFounds[j].isFound = true
                        const id = String(index)+String(i)
                        arrayOfFounds[j].idOfField = id
                        
                    }
                    
                    // console.log(arrayOfFounds)
                }
                
            }
            // if(obj.word[index]===result[i]){
            //     console.log(obj.word[index],result[i],index,i,obj.word,result);
            // }
            
            // console.log(index,i);
        }
        // console.log(obj.word,index,result);
    })
    return arrayOfFounds
}