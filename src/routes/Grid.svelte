<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Square from './Square.svelte';
	export let grid: string[] = [];

	let a = -1;
	let b = -1;
	let reset_timeout: Timeout;

	const dispatch = createEventDispatcher();
</script>

<div class="grid">
	{#each grid as emoji, i}
		<Square
			{emoji}
			on:click={() => {
				clearTimeout(reset_timeout);
				if (a === -1 && b === -1) {
					a = i;
				} else if (b === -1) {
					b = i;
					// correct answer flow
					if (grid[a] === grid[b]) {
						dispatch('found', {
							emoji
						});
					}
					// reset a and b in any case to ensure the new game starts w/o flipped cards
					reset_timeout = setTimeout(() => {
						a = -1;
						b = -1;
					}, 1000);
				} else {
					b = -1;
					a = i;
				}
			}}
			selected={a === i || b === i}
			group={grid.indexOf(emoji) === i ? 'a' : 'b'}
		/>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(var(--size), 1fr);
		grid-template-rows: repeat(var(--size), 1fr);
		height: 100%;
		grid-gap: 0.5rem;
		perspective: 100vw;
	}
</style>
