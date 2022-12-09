<script>
  import InputField from "./inputField.svelte";
  export let word;
  export let clue;
  function checkIfWordisValid(){

  }

</script>

<div>
  {#each word as letter}
    <InputField correctLetter={letter} {clue}/>
    
  {/each}
</div>

<style>
    div{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>
