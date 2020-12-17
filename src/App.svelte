<script>
  import { findAllSubstrings } from './util.js';

	export let name;

  let text = '';
  let subtext = '';
  // Normally I'd call this `caseSensitive`, but I want to demonstrate
  //   a shorthand for two-way binding below
  let value = false;

  // This assignment is reactive - it runs whenever any of the variables
  //   (text, subtext or isRegex) change
  // If not already declared, the reactive label ($:) implicitly `let results`
  $: results = findAllSubstrings(text, subtext, value);
</script>

<!--
  While Svelte components are usually all in a single file, it isn't
    unreasonable that a large block of CSS (which is automatically scoped to
    it's components) would be moved into it's own file, demonstrated here
-->
<style src="./App.css"></style>

<!-- This is passed in from the `props` object in from main.js -->
<h1>Hi, {name}!</h1>
<div>
  <!--
    This is a fully reactive binding to a text input
    {text} means use the variable (just like Angular would do with {{text}})
    bind:value is two way binding - the value of text will be updated in this
      scope whenever it is updated in the input
  -->
  Text: <input type="text" bind:value={text} />
</div>
<div>
  Subtext: <input type="text" bind:value={subtext} />
</div>
<div>
  <!-- This is a shorthand for two way binding, identical to `value={value}` -->
  Case Sensitive: <input type="checkbox" {value} />
</div>
<div>
  <!--
    Svelte is really powerful for templating
    This is a conditional block and a few lines down is a loop
    Svelte blocks surround elements, which is a little bit more verbose, a
      whole lot more readable and doesn't need <ng-template> or anything
      similar
  -->
  {#if results && results.length > 0}
    Subtext is found in Text in locations:
    <ul>
      <!-- Looping here -->
      {#each results as result}
        <li>{result}</li>
      {/each}
    </ul>
  {:else}
    Subtext is not found in Text
  {/if}
</div>
