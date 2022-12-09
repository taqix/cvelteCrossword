<script>


  import InputField from "./inputField.svelte";
  export let word;
  export let arrFalses = [false, false, false, false, false]
  export let wordTrue = false
  function checkIfLettersValid(letter,id){
    if(letter == word[id]){
      arrFalses[id] = true
    }
    else{
      arrFalses[id] = false
    }
    checkIfWordsValid()
  }
  function checkIfWordsValid(){
    let counter = 0
    arrFalses.forEach((f)=>{
      if(f==true) counter++
      if(counter==5)
      wordTrue = true
    })
  }

</script>

<div>
  {#each word as letter, index}
    <input type="text" on:change={(e)=> checkIfLettersValid(e.target.value, e.target.id)} id={index} class={wordTrue ? 'greened': ''}>
    <!-- <InputField correctLetter={letter} {clue} on:change={checkIfLettersValid}/> -->
    
  {/each}
</div>

<style>
    div{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    input{
        width:15%;
        font-size: 2em;
        height: 50px;
        border: 1px solid green;
        text-align: center;
        text-transform: uppercase;
    }
    .greened{
      background-color: green;
    }
</style>
