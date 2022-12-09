<script>
    export let correctLetter; 
    export let clue;
    $: console.log(clue)
</script>

<input type="text" maxlength="1" value={correctLetter}>


<style>
    input{
        width:15%;
        font-size: 2em;
        height: 50px;
        border: 1px solid green;
        text-align: center;
        text-transform: uppercase;
    }
</style>