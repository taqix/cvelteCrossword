<script>
  import { writableArrayOfIsWin, arrayOfIdFounds } from "../stores/store";
  export let word;
  export let arrFalses = [false, false, false, false, false];
  export let indexOfRow;
  export let wordTrue = false;
  export let arrOfNumbersFieldWithLetterOfResult;
  export let arrayOfId = [];
  export let arrOfIdShowedOnMount;
  $: if (wordTrue) {
    $writableArrayOfIsWin[indexOfRow] = true;
  }
  $arrayOfIdFounds.forEach((obj) => {
    arrayOfId.push(obj.idOfField);
  
  });
  function checkIfLettersValid(letter, id) {
    const idToDoc = id.slice(-1);
    if (letter.toUpperCase() == word[idToDoc].toUpperCase()) {
      arrFalses[idToDoc] = true;
    } else {
      arrFalses[idToDoc] = false;
    }
    checkIfWordsValid();
  }
  function checkIfWordsValid() {
    let counter = 0;
    arrFalses.forEach((f) => {
      if (f == true) counter++;
      if (counter == 5) {
        wordTrue = true;
      } else wordTrue = false;
    });
  }

  function getNewId(oldId, pos) {
    let returnID;
    if (pos) {
      while (true) {
        let first = oldId.slice(0, 1);
        let second = oldId.slice(-1);
        let newId = String(first) + (parseInt(second) + 1);
        if (parseInt(newId.slice(-1)) === 5) {
          
          newId = String(first) + 0;
          
        }
        if (!document.getElementById(newId).disabled) {
          returnID = newId;
          break;
        } else {
          oldId = newId;
        }
      }
    } else {
      while (true) {
        let first = oldId.slice(0, 1);
        let second = oldId.slice(-1);
        let newId = String(first) + (parseInt(second) - 1);
        
        if (parseInt(newId.slice(-2)) === -1) {
          
          newId = String(first) + (word.length - 1);
          
        }
        if (!document.getElementById(newId).disabled) {
          returnID = newId;
          break;
        } else if (document.getElementById(newId).disabled) {
          oldId = newId;
        }
      }
    }
    return returnID;
    // if (pos) {
    //   return oldId + 1;
    // } else return oldId - 1;
  }

  function changingFocus(e) {
    
    checkIfLettersValid(e.target.value, e.target.id);
    const oldId = e.target.id;
    
    if(e.keyCode === 18){
      return
    }
    if (
      (e.keyCode >= 65 && e.keyCode <= 90) ||
      e.keyCode == 39
      
    ) {
      // if (e.target.id.slice(0, 1) == 4 && e.target.id.slice(-1) == 4) {
      //   return;
      // }
      let nextFoundedMove;
      
      if ((e.keyCode === 13 && e.target.id.slice(-1) == 4) || wordTrue) {
        
        let startId = parseInt(e.target.id.slice(0, 1));
        if (parseInt(e.target.id.slice(0, 1)) === 4) {
          startId = 0;
        }
        
        nextFoundedMove = getNextRow(startId + 1);
        document.getElementById(nextFoundedMove).focus();
        return;
      } else {
        const newId = getNewId(oldId, true);
        
        if (e.target.id.slice(0, 1) == 0) {
          document.getElementById(newId).focus();
        } else {
          document.getElementById(newId).focus();
        }
        return;
      }

      // if (e.target.id.slice(-1) == 4) {
      //   const startId = e.target.id.slice(0, 1);
      //   document.getElementById(startId + "0").focus();
      //   return;
      // }
    }
    if (
      e.keyCode === 8 ||
      e.keyCode === 46 ||
      e.keyCode === 38 ||
      e.keyCode === 40 ||
      e.keyCode === 18
    ) {
      return;
    }

    if (e.keyCode === 37) {
      const newId = getNewId(oldId, false);
      
      if (e.target.id.slice(0, 1) == 0) {
        document.getElementById(newId).focus();
      } else {
        document.getElementById(newId).focus();
      }
      return;
    }
  }
  function changingFocusAndGiveInfoToStore(e, id) {
    changingFocus(e);
    //TODO trzeba tutaj dodać sprawdzanie czy nie ma podwójnego pola zeby wysyłać jedną literę w dwa miejsca
    const idToChangeStore = arrayOfId.indexOf(id);
    $arrayOfIdFounds[idToChangeStore].isWrote = true;
    $arrayOfIdFounds[idToChangeStore].letter = e.target.value;

    
  }

  // function makeTrueArray(id) {
  //   arrFalses[id] = true;
  
  // }

  function giveLetterAndGiveTrue(letter, index) {
    arrFalses[index] = true;
    return letter;
  }

  function getNextRow(lastIndexRow) {
    let returnedId;
    let isFounded = false;
    while (true) {
      let second = 0;
      let next = String(lastIndexRow) + second;
      
      for (let i = 0; i < 5; i++) {
        next = String(lastIndexRow) + second;
        if (!document.getElementById(next).disabled) {
          
          isFounded = true;
          break;
        } else {
          
          second = second + 1;
        }
      }
      if (isFounded) {
        returnedId = next;
        break;
      } else {
        lastIndexRow++;
      }
    }
    return returnedId;
  }
</script>

<div class="flex gap-1">
  {#each word as letter, index}
    {#if arrayOfId.includes(indexOfRow + String(index))}
      <label for={indexOfRow + String(index)}
        >{arrayOfId.indexOf(indexOfRow + String(index)) + 1}</label
      >
      <input
        type="text"
        maxlength="1"
        disabled={wordTrue}
        id={indexOfRow + String(index)}
        class={wordTrue ? "greened" : ""}
        on:keyup|preventDefault={(e) =>
          changingFocusAndGiveInfoToStore(e, indexOfRow + String(index))}
      />
    {:else if arrOfIdShowedOnMount.includes(indexOfRow + String(index))}
      <input
        type="text"
        maxlength="1"
        id={indexOfRow + String(index)}
        class={wordTrue ? "greened" : ""}
        value={giveLetterAndGiveTrue(letter, index)}
        on:keyup|preventDefault={(e) =>
          changingFocusAndGiveInfoToStore(e, indexOfRow + String(index))}
        disabled
      />
    {:else}
      <input
        type="text"
        maxlength="1"
        disabled={wordTrue}
        id={indexOfRow + String(index)}
        class={wordTrue ? "greened" : ""}
        on:keyup|preventDefault={(e) => changingFocus(e)}
      />
    {/if}

    <!-- <InputField correctLetter={letter} {clue} on:change={checkIfLettersValid}/> -->
  {/each}
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  input {
    width: 15%;
    font-size: 2em;
    height: 50px;
    border: 1px solid #0284c7;
    text-align: center;
    text-transform: uppercase;
    border-radius: 0.75rem;
  }
  input:focus{
    background-color: rgb(103, 232, 249,0.6);
  }
  input:disabled{
    background-color:rgb(3, 105, 161,0.7)
    
  }
  .greened {
    background-color: green;
  }
  label {
    width: 15px;
    z-index: 10;
    text-align: center;
  }
  div label + input {
    margin-left: -20px;
  }
</style>
