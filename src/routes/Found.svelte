<script lang="ts">
	import { found } from './stores/found';
	import { receive } from './transitions';
	import { get_twemoji_url } from './utils';
</script>

<div class="found">
	{#each $found as emoji (emoji)}
		<div class="pair">
			<img in:receive={{ key: `${emoji}:a` }} alt={emoji} src={get_twemoji_url(emoji)} />
			<img in:receive={{ key: `${emoji}:b` }} alt={emoji} src={get_twemoji_url(emoji)} />
		</div>
	{/each}
</div>

<style>
	.found {
		margin-top: 2em;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		filter: drop-shadow(0.2em 0.2em 0.5em rgba(0, 0, 0, 0.2));
	}
	.pair {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 8em;
		height: 8em;
		background: white;
		border-radius: 1em;
	}
	img {
		width: 6em;
		height: 6em;
		position: absolute;
	}
</style>
