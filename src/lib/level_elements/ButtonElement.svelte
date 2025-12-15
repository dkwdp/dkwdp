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
		color: #f6f4f1;
		cursor: pointer;
		background-color: #29be1a;
		height: 5rem;
		width: 13rem;
		font-size: 3rem;
		border-radius: 2rem;
		border: 2px solid #306b36;
		font-family: 'Changa One', sans-serif;
		box-shadow: 0px 6px #0b3307;

		text-shadow:
			-1px -1px 0 #306b36,
			1px -1px 0 #306b36,
			-1px 1px 0 #306b36,
			1px 1px 0 #306b36;

		transition:
			transform 0.1s ease-out,
			box-shadow 0.1s ease-out;
	}
	button:hover {
		transform: translateY(3px);
		box-shadow: 0px 3px #0b3307;
	}
</style>
