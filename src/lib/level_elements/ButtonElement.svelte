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
		background-color: var(--green-500);
		height: clamp(3rem, 1.571rem + 3.81vw, 5rem);
		width: clamp(8rem, 4.429rem + 9.524vw, 13rem);
		font-size: clamp(1.5rem, 0.429rem + 2.857vw, 3rem);
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
		box-shadow: 0px 3px var(--green-shadow);
	}
</style>
