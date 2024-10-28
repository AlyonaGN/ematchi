<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import Countdown from './Countdown.svelte';
	import Found from './Found.svelte';
	import Grid from './Grid.svelte';
	import { levels } from './levels';
	import type { Level } from './levels';
	import { shuffle } from './utils';

	const level = levels[0];

	const dispatch = createEventDispatcher();

	let size: number = level.size;
	let grid: string[] = create_grid(level);
	let found: string[] = [];
	let remaining: number = level.duration;
	let duration = level.duration;
	let playing: boolean;

	function create_grid(level: Level): string[] {
		const copy = level.emojis.slice();
		const pairs: string[] = [];

		for (let i = 0; i < level.size ** 2 / 2; i++) {
			const index = Math.floor(Math.random() * copy.length);
			const emoji = copy[index];

			copy.splice(index, 1);
			pairs.push(emoji);
		}

		pairs.push(...pairs);
		return shuffle(pairs);
	}

	function countdown() {
		const start = Date.now();
		let remaining_at_start = remaining;

		function loop() {
			if (playing) return;

			requestAnimationFrame(loop);

			remaining = remaining_at_start - (Date.now() - start);

			if (remaining <= 0) {
				playing = false;
				dispatch('lose');
			}
		}

		loop();
	}

	onMount(countdown);
</script>

<div class="game">
	<div class="info">
		<Countdown {remaining} {duration} />
	</div>
	<div class="grid-container">
		<Grid
			{grid}
			on:found={(e) => {
				found = [...found, e.detail.emoji];
			}}
			{found}
		/>
	</div>
	<div class="info">
		<Found {found} />
	</div>
</div>

<style>
	.game {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: min(1vmin, 0.3rem);
	}

	.info {
		width: 80vmin;
		height: 10vmin;
	}

	.grid-container {
		width: 80vmin;
		height: 80vmin;
	}
</style>
