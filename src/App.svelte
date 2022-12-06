<script>
  import "./lib/Tailwind.css";
  import { onMount } from "svelte";
  import RowField from "./components/rowFields.svelte";
  const urlApi = "https://porucznik-zag.github.io/word-api/words.json";
  export const xSize = 5;
  export let mapOfWordsAndClues = [];
  onMount(async function () {
    try {
      const response = await fetch(urlApi);
      const data = await response.json();
      const randomNumbersArr = getRandomNumbers(data);
      mapOfWordsAndClues = createBoard(randomNumbersArr, data);
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
      }
    }
    return arrOfNumbers;
  }

  function createBoard(randomNumbersArr, data) {
    const arrOfObjWords = [];
    randomNumbersArr.forEach((number) => {
      const obj = {word: data[number].word, clue: data[number].clue}
      arrOfObjWords.push(obj)
    });
    return arrOfObjWords;
  }
</script>

<section class="w-full flex justify-center" >
  <div id="board" class="w-2/4 flex justify-center mt-10 flex-col">
    {#each mapOfWordsAndClues as objWordAndClue}
      <RowField word={objWordAndClue.word} clue={objWordAndClue.clue}/>
    {/each}
  </div>
</section>

<style>
</style>
