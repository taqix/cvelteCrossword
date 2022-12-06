<script>
  import "./lib/Tailwind.css";
  import { onMount } from "svelte";
  import RowField from "./components/rowFields.svelte";
  const urlApi = "https://porucznik-zag.github.io/word-api/words.json";
  export const xSize = 5;
  onMount(async function () {
    try {
      const response = await fetch(urlApi);
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  });
</script>

<section class="w-full flex justify-center flex-row">
  <div id="board" class="w-2/4 flex justify-center mt-10">
    <RowField {xSize} />
  </div>
</section>

<style>
</style>
