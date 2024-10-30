<script lang="ts">
	import Game from './Game.svelte';
	import '../styles.css';
	import Modal from './Modal.svelte';
	import { levels } from './levels';

	let state: 'waiting' | 'playing' | 'paused' | 'won' | 'lost' = 'waiting';
	let game: Game;
</script>

<Game
	bind:this={game}
	on:play={() => {
		state = 'playing';
	}}
	on:pause={() => {
		state = 'paused';
	}}
	on:win={() => {
		state = 'won';
	}}
	on:lose={() => {
		state = 'lost';
	}}
/>

{#if state !== 'playing'}
	<Modal>
		<header>
			<h1>e<span>match</span>i</h1>
			<p>the emoji matching game</p>
		</header>

		{#if state === 'won' || state === 'lost'}
			<p>you {state} the game</p>
		{:else if state === 'paused'}
			<p>paused</p>
		{:else if state === 'waiting'}
			<p>choose the level</p>
		{/if}

		<div class="buttons">
			{#if state === 'paused'}
				<button on:click={() => {}}>resume</button>
				<button on:click={() => {}}>quit</button>
			{:else}
				{#each levels as level}
					<button
						on:click={() => {
							game.start(level);
						}}>{level.label}</button
					>
				{/each}
			{/if}
		</div>
	</Modal>
{/if}

<style>
	h1 {
		font-size: 4em;
	}

	h1 span {
		color: rgb(91, 27, 27);
	}

	p {
		font-family: Grandstander;
	}
</style>
