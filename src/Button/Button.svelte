<script lang="ts">
	export let id: string = "";
</script>

<button {id} on:click><slot /></button>
