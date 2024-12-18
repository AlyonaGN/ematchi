import { cubicOut } from 'svelte/easing';
import { crossfade } from 'svelte/transition';

export const [send, receive] = crossfade({
	duration: 300,
	easing: cubicOut
});
