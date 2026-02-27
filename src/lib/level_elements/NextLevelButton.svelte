<script lang="ts">
	import type { LevelId } from '$lib/types';
	import { normalize_and_goto } from '$lib/helpers';
	import { page } from '$app/state';
	export let levelId: LevelId;

	function openLevelId() {
		if (page.params.mapId == null) throw new Error('mapId is null');
		normalize_and_goto(levelId, page.params.mapId);
	}
</script>

<button onclick={openLevelId} class="mdi mdi-arrow-right-thick" aria-label="Nächstes Level"></button>

<style>
	button {
		color: var(--cyan-700);
		cursor: pointer;
		background-color: var(--accent);
		height: 28rem;
		width: 6rem;
		font-size: 5rem;
		border-radius: 1rem;
		border: 2px solid var(--cyan-700);
		font-family: 'Changa One', sans-serif;
		box-shadow: 0px 6px var(--dark-900);
		justify-content: center;

		transition:
			transform 0.1s ease-out,
			box-shadow 0.1s ease-out;
	}
	button:hover {
		transform: translateY(3px);
		box-shadow: 0px 3px var(--dark-900);
	}
</style>
