<script lang="ts">
	export let emoji: string = '';
	export let selected: boolean;
	export let found: boolean;
</script>

<div class="square" class:flipped={selected}>
	<button on:click />
	{#if !found}
		<span>
			{emoji}
		</span>
	{/if}
</div>

<style>
	.square {
		background-color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	button {
		width: 100%;
		height: 100%;
		position: absolute;
	}

	.flipped button {
		background-color: rosybrown;
	}

	span {
		font-size: 5rem;
		pointer-events: none;
	}
</style>
