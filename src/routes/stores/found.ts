import { writable } from 'svelte/store';

export const found = writable<string[]>([]);

export const addFound = (item: string) => {
	found.update((items: string[]) => {
		return [...items, item];
	});
};

export const setFound = (items: string[]) => {
	found.set(items);
};

const unsubscribe = found.subscribe((value) => {
	console.log(value);
});

unsubscribe();
