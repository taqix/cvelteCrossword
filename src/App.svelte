<script>
  import "./lib/Tailwind.css";
  import { checkIfWordAndResultCanBeUsed } from "./auth";
  import { onMount } from "svelte";
  import RowField from "./components/rowFields.svelte";
  import { writableArrayOfIsWin } from "./stores/store"
  const urlApi = "https://porucznik-zag.github.io/word-api/words.json";
  export const xSize = 5;
  export let mapOfWordsAndClues = [];
  export let wordResult;
  const allEqual = arr => arr.every(val => val === arr[0]);
  onMount(async function () {
    try {
      const response = await fetch(urlApi);
      const data = await response.json();
      const randomNumbersArr = getRandomNumbers(data);
      mapOfWordsAndClues = createBoard(randomNumbersArr, data);
      wordResult = getRandomWordResult(data);
      console.log(mapOfWordsAndClues);
    } catch (e) {
      console.log(e);
    }
  });
  function getRandomNumbers(data) {
    const arrOfNumbers = [];
    for (let i = 0; i < 5; i++) {
      const random = Math.floor(Math.random() * data.length);
      if (!arrOfNumbers.includes(random)) {
        arrOfNumbers.push(random);
      } else {
        i--;
      }
    }
    return arrOfNumbers;
  }

  function createBoard(randomNumbersArr, data) {
    const arrOfObjWords = [];
    randomNumbersArr.forEach((number) => {
      const obj = { word: data[number].word, clue: data[number].clue };
      arrOfObjWords.push(obj);
    });
    return arrOfObjWords;
  }

  function getRandomWordResult(data) {
    let obj;
    let checkedResult;
    for (let i = 0; i < 1; i++) {
      const random = Math.floor(Math.random() * data.length);
      obj = data[random];
      checkedResult = checkIfWordAndResultCanBeUsed(
        mapOfWordsAndClues,
        obj.word,
        data
      );
    }
    return checkedResult;
  }
</script>

<section class="w-full flex justify-center">
  <div id="board" class="w-3/4 flex justify-center mt-10 flex-col">
    {#each mapOfWordsAndClues as objWordAndClue, index}
      <div class="flex flex-row content-center justify-center">
        <div class="w-2/4">
          <RowField word={objWordAndClue.word} indexOfRow={String(index)} />
        </div>
        <span class="w-2/4 flex items-center justify-center font-medium"
          >{objWordAndClue.clue}</span
        >
      </div>
    {/each}
    <div class="mt-5">
      {#each Array(5) as _}
        <input type="text" disabled />
      {/each}
    </div>
    <div class="mt-5">
      {#if allEqual($writableArrayOfIsWin)}
        {#if $writableArrayOfIsWin[0]!=false}
          <div>Winek</div>
        {/if}
        
      {/if}
    </div>
  </div>
</section>

<style>
  input[type="text"] {
    width: 15%;
    font-size: 2em;
    height: 50px;
    border: 1px solid green;
    text-align: center;
    text-transform: uppercase;
  }
</style>
