import { cubicOut } from 'svelte/easing';
import { crossfade } from 'svelte/transition';
import { FOUND_ANIMATION_DELAY } from './utils';

export const [send, receive] = crossfade({
	duration: 400,
	easing: cubicOut,
	delay: FOUND_ANIMATION_DELAY
});
