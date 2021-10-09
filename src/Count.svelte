<button id="decr" on:click={decrement}>--</button>
<!-- svelte-ignore missing-declaration -->
<input value={count} />
<button id="incr" on:click={increment}>++</button>

<script lang="ts">
    type CountResult = number;
    export let count: CountResult = 5;

    function increment(): void {
        count++;
    }

    function decrement(): void {
        count--;
    }
</script>

<style lang="scss">
    // $primary-color: #336eaa;
    @import './src/base';
    button {
        color: red;
        b {
            color: $primary-color;
        }
    }
</style>
