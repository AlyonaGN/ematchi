<script>
	import Square from './Square.svelte';
</script>

<div class="grid">
	{#each Array(16) as square}
		<Square />
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(4, 1fr);
		height: 100%;
		grid-gap: 0.5rem;
	}
</style>
