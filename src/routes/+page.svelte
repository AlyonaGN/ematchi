<script lang="ts">
	import Game from './Game.svelte';
	import '../styles.css';
	import Modal from './Modal.svelte';
	import { levels } from './levels';
	import { confetti } from '@neoconfetti/svelte';

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
				<button on:click={() => game.resume()}>resume</button>
				<button on:click={() => (state = 'waiting')}> quit </button>
			{:else}
				{#each levels as level}
					<button
						class="level-button"
						on:click={() => {
							game.start(level);
							state = 'playing';
						}}>{level.label}</button
					>
				{/each}
			{/if}
		</div>
	</Modal>
{/if}

{#if state === 'won'}
	<div
		class="confetti"
		use:confetti={{
			stageWidth: innerWidth,
			stageHeight: innerHeight
		}}
	/>
{/if}

<style>
	h1 {
		font-size: 4em;
		text-align: center;
	}

	h1 span {
		color: rgb(91, 27, 27);
	}

	p {
		font-family: Grandstander;
		font-size: 1.5em;
		text-align: center;
	}

	.confetti {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 30%;
		left: 50%;
		pointer-events: none;
	}

	.buttons {
		margin-top: 40px;
		display: flex;
		gap: 1em;
	}

	button {
		font-size: 2em;
		border-radius: 16px;
		background-color: rgb(91, 27, 27);
		color: white;
		border: none;
		padding: 20px 20px;
		cursor: pointer;
	}

	button:hover {
		color: rgb(91, 27, 27);
		background-color: white;
		border: rgb(91, 27, 27) 1px solid;
	}
</style>
