<script>
import InputField from "./inputField.svelte";
export let xSize;
</script>
{#each Array(xSize) as _}
    <InputField />
{/each}
<style>

</style>