<script lang="ts">
	import type { ButtonElementData } from '$lib/types';
	import { scratchState } from '$lib/scratchWindowStore.svelte';

	let { element }: { element: ButtonElementData } = $props();

	const TARGET_NAME = 'scratch-editor';
	const SCRATCH_HOST = 'scratch.mit.edu';

	let isScratch = $derived.by(() => {
		try {
			return new URL(element.url).hostname === SCRATCH_HOST;
		} catch {
			return false;
		}
	});

	function openOrFocus(event: MouseEvent) {
		event.preventDefault();

		const currentWindow = scratchState.current;

		if (isScratch) {
			if (currentWindow && !currentWindow.closed) {
				currentWindow.focus();
			} else {
				const newWindow = window.open(element.url, TARGET_NAME);
				scratchState.current = newWindow;
			}
		} else {
			window.open(element.url, element.target || '_blank');
		}
	}
</script>

<button onclick={openOrFocus}>{element.text}</button>

<style>
	button {
		color: var(--text-light);
		cursor: pointer;
		background-color: var(--green-500);
		height: 5rem;
		width: 13rem;
		font-size: 3rem;
		border-radius: 2rem;
		border: 2px solid var(--green-700);
		font-family: 'Changa One', sans-serif;
		box-shadow: 0px 6px var(--green-shadow);

		text-shadow:
			-1px -1px 0 var(--green-700),
			1px -1px 0 var(--green-700),
			-1px 1px 0 var(--green-700),
			1px 1px 0 var(--green-700);

		transition:
			transform 0.1s ease-out,
			box-shadow 0.1s ease-out;
	}
	button:hover {
		transform: translateY(3px);
		box-shadow: 0px 3px var(--green-shadow);
	}
</style>
