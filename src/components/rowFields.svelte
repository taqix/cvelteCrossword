<script>
  import { writableArrayOfIsWin, arrayOfIdFounds } from "../stores/store";
  export let word;
  export let arrFalses = [false, false, false, false, false];
  export let indexOfRow;
  export let wordTrue = false;
  export let arrOfNumbersFieldWithLetterOfResult;
  export let arrayOfId = [];
  $: if (wordTrue) {
    $writableArrayOfIsWin[indexOfRow] = true;
  }
  $arrayOfIdFounds.forEach((obj) => {
    arrayOfId.push(obj.idOfField);
    console.log(arrayOfId);
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
    if (pos) {
      return oldId + 1;
    } else return oldId - 1;
  }

  function changingFocus(e) {
    checkIfLettersValid(e.target.value, e.target.id);
    const oldId = parseInt(e.target.id);
    console.log(e.keyCode);
    console.log(wordTrue);
    if ((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode == 39) {
      if (e.target.id.slice(0, 1) == 4 && e.target.id.slice(-1) == 4) {
        return;
      }
      if ((e.keyCode === 13 && e.target.id.slice(-1) == 4) || wordTrue) {
        const startId = parseInt(e.target.id.slice(0, 1)) + 1;
        document.getElementById(startId + "0").focus();
        return;
      }

      if (e.target.id.slice(-1) == 4) {
        const startId = e.target.id.slice(0, 1);
        document.getElementById(startId + "0").focus();
        return;
      }
      const newId = getNewId(oldId, true);
      if (e.target.id.slice(0, 1) == 0) {
        document.getElementById("0" + newId).focus();
      } else {
        document.getElementById(newId).focus();
      }
      return;
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
        document.getElementById("0" + newId).focus();
      } else {
        document.getElementById(newId).focus();
      }
      return;
    }
  }
  function changingFocusAndGiveInfoToStore(e,id){
    changingFocus(e)
    //TODO trzeba tutaj dodać sprawdzanie czy nie ma podwójnego pola zeby wysyłać jedną literę w dwa miejsca
    const idToChangeStore = arrayOfId.indexOf(id);
    $arrayOfIdFounds[idToChangeStore].isWrote = true
    $arrayOfIdFounds[idToChangeStore].letter = e.target.value

    console.log($arrayOfIdFounds);
  }
</script>

<div>
  {#each word as letter, index}
    {#if arrayOfId.includes(indexOfRow + String(index))}
      <input
        type="text"
        maxlength="1"
        disabled={wordTrue}
        id={indexOfRow + String(index)}
        class={wordTrue ? "greened" : ""}
        on:keyup|preventDefault={(e) => changingFocusAndGiveInfoToStore(e,(indexOfRow + String(index)))}
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
    border: 1px solid green;
    text-align: center;
    text-transform: uppercase;
  }
  .greened {
    background-color: green;
  }
</style>
