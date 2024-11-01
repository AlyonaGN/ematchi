<script lang="ts">
	import { send } from './transitions';
	import { get_twemoji_url } from './utils';

	export let emoji: string = '';
	export let selected: boolean;
	export let found: boolean;
	export let group: 'a' | 'b';
	console.log(selected);
</script>

<div class="square" class:flipped={selected || found}>
	<button on:click />
	<div class="background" />
	{#if !found}
		<img alt={emoji} src={get_twemoji_url(emoji)} out:send={{ key: `${emoji}:${group}` }} />
	{/if}
</div>

<style>
	.square {
		background-color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: transform 0.4s;
		transform-style: preserve-3d;
	}

	.flipped {
		background-color: rosybrown;
		transform: rotateY(180deg);
	}

	.background {
		transform: rotateY(180deg);
		backface-visibility: hidden;
		background-color: white;
		border: 0.5em solid #eee;
		width: 100%;
		height: 100%;
		position: absolute;
	}

	button {
		width: 100%;
		height: 100%;
		position: absolute;
		backface-visibility: hidden;
		background-color: #eee;
		border: none;
		border-radius: 1em;
		font-size: inherit;
	}

	img {
		width: 6em;
		height: 6em;
		pointer-events: none;
		transform: rotateY(180deg);
		backface-visibility: hidden;
	}
</style>
