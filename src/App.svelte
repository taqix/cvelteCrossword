<script>
  import "./lib/Tailwind.css";
  import { checkIfWordAndResultCanBeUsed } from "./auth";
  import { onMount } from "svelte";
  import RowField from "./components/rowFields.svelte";
  import { writableArrayOfIsWin, arrayOfIdFounds } from "./stores/store";
  import { Confetti } from "svelte-confetti";
  import {
    getNumbersFieldsWithLetterOfResult,
    drawIndexShowed,
  } from "./idFields";
  export let wordResultToArr = [];
  const urlApi = "https://porucznik-zag.github.io/word-api/words.json";
  export const xSize = 5;
  export let mapOfWordsAndClues = [];
  export let wordResult;
  export let arrOfNumbersFieldWithLetterOfResult = [];
  export let startTime;
  export let arrayOfId = [];
  export let arrOfIdShowedOnMount = [];
  export let endGameClose = false;
  const allEqual = (arr) => arr.every((val) => val === arr[0]);

  onMount(async function () {
    try {
      const response = await fetch(urlApi);
      const data = await response.json();
      const randomNumbersArr = getRandomNumbers(data);
      mapOfWordsAndClues = createBoard(randomNumbersArr, data);
      wordResult = getRandomWordResult(data);
      wordResultToArr = [...wordResult];
      arrOfNumbersFieldWithLetterOfResult = getNumbersFieldsWithLetterOfResult(
        mapOfWordsAndClues,
        wordResult
      );
      $arrayOfIdFounds = arrOfNumbersFieldWithLetterOfResult;
      arrOfNumbersFieldWithLetterOfResult.forEach((obj) => {
        arrayOfId.push(obj.idOfField);
      });
      startTime = Date.now();
      arrOfIdShowedOnMount = drawIndexShowed(arrayOfId);
      console.log(mapOfWordsAndClues);
    } catch (e) {
      console.log(e);
    }
  });
  function toggle() {
		endGameClose = !endGameClose;
	}
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

    const random = Math.floor(Math.random() * data.length);
    obj = data[random];
    checkedResult = checkIfWordAndResultCanBeUsed(
      mapOfWordsAndClues,
      obj.word,
      data
    );

    return checkedResult;
  }
</script>

<section class="w-screen grid grid-cols-1 place-content-center">
  <div id="board" class="w-3/4 grid grid-cols-1 place-self-center gap-y-1 mt-3">
    {#each mapOfWordsAndClues as objWordAndClue, index}
      <div class="flex justify-center">
        <div class="w-2/4 flex ">
          <RowField
            word={objWordAndClue.word}
            indexOfRow={String(index)}
            {arrOfNumbersFieldWithLetterOfResult}
            {arrOfIdShowedOnMount}
          />
        </div>
        <span
          class="w-1/4 flex items-center content-center justify-center font-medium"
          >{objWordAndClue.clue}</span
        >
      </div>
    {/each}
    <div class="mt-5 flex justify-center content-center gap-x-1">
      {#each [...wordResultToArr] as lett, index}
        {#if $arrayOfIdFounds[index].isWrote}
          <label for={"input" + index}>{index + 1}</label>
          <input
            type="text"
            disabled
            id={"input" + index}
            class={endGameClose ? "greened" : ""}
            value={$arrayOfIdFounds[index].letter}
          />
        {:else}
          <label for={"input" + index}>{index + 1}</label>
          <input type="text" disabled id={"input" + index} class={endGameClose ? "greened" : ""} />
        {/if}
      {/each}
    </div>
  </div>
</section>
{#if allEqual($writableArrayOfIsWin) && $writableArrayOfIsWin[0] != false && !endGameClose}<div
    class="h-screen w-screen flex content-center justify-center flex-col z-10 absolute top-0 bg-sky-500/70"
  >
    <div
      class="w-fit h-fit self-center py-2.5 px-2.5 border-2 border-sky-500 rounded-lg "
    >
      <div
        class="text-center  subpixel-antialiased font-sans text-2xl font-medium tracking-normal"
      >
        Wygrana
      </div>
      <div
        class="text-center  subpixel-antialiased font-sans text-2xl font-medium tracking-normal"
      >
        Czas: {(Date.now() - startTime) / 1000}s
      </div>
      <button class="text-center subpixel-antialiased font-sans text-2xl font-medium justify-self-center tracking-normal w-full border rounded-xl border-red-700  mt-3 transition  ease-in hover:scale-110 hover:bg-red-700 hover:text-white" on:click={toggle}>Zamknij</button>
      <Confetti size={10} infinite={true} x={[-3,3]} y={[-1,1.5]}/>
      
    </div>
    
  </div>
{/if}

<style>
  input[type="text"] {
    width: 15%;
    font-size: 2em;
    height: 50px;
    border: 1px solid #0284c7;
    text-align: center;
    text-transform: uppercase;
    border-radius: 0.75rem;
  }
  label {
    width: 15px;
    z-index: 10;
    text-align: center;
  }
  div label + input {
    margin-left: -20px;
  }
  .greened {
    background-color:rgb(3, 105, 161,0.7)
  }
</style>
