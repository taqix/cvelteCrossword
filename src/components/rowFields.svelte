<script>
  import InputField from "./inputField.svelte";
  export let word;
  export let arrFalses = [false, false, false, false, false];
  export let indexOfRow;
  export let wordTrue = false;
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
    console.log(arrFalses);
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
    const oldId = parseInt(e.target.id);
    console.log(e.keyCode);
    if (e.keyCode === 8 || e.keyCode === 46 || e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 18) {
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

    const newId = getNewId(oldId, true);
    if (e.target.id.slice(0, 1) == 0) {
      document.getElementById("0" + newId).focus();
    } else {
      document.getElementById(newId).focus();
    }
    return
  }
</script>

<div>
  {#each word as letter, index}
    <input
      type="text"
      maxlength="1"
      on:change={(e) => checkIfLettersValid(e.target.value, e.target.id)}
      id={indexOfRow + String(index)}
      class={wordTrue ? "greened" : ""}
      on:keyup|preventDefault={(e) => changingFocus(e)}
    />
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
