<script lang="ts">
	import Button from "./Button/Button.svelte";

	type CountResult = number;
	export let count: CountResult = 5;

	function increment(): void {
		count++;
	}

	function decrement(): void {
		count--;
	}
</script>

<Button id="decr" on:click={decrement}>--</Button>
<!-- svelte-ignore missing-declaration -->
<input value={count} />
<Button id="incr" on:click={increment}>++</Button>

<style lang="scss">
	// $primary-color: #336eaa;
	@import "./src/base";
	button {
		color: red;
		b {
			color: $primary-color;
		}
	}
</style>
