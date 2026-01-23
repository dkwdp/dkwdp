<script lang="ts">
	import type { LevelId } from '$lib/types';
	import { go_back } from '$lib/helpers';
	import { page } from '$app/state';
	export let levelId: LevelId;

	function openLevelId() {
		if (page.params.mapId == null) throw new Error('mapId is null');
		go_back(levelId, page.params.mapId, "");
	}
</script>

<button onclick={openLevelId} class="mdi mdi-arrow-left-thick" aria-label="Vorheriges Level"></button>

<style>
	button {
		color: #094579;
		cursor: pointer;
		background-color: #018cd5;
		height: 28rem;
		width: 6rem;
		font-size: 5rem;
		border-radius: 1rem;
		border: 2px solid #004c61;
		font-family: 'Changa One', sans-serif;
		box-shadow: 0px 6px #092230;
		justify-content: center;

		transition:
			transform 0.1s ease-out,
			box-shadow 0.1s ease-out;
	}
	button:hover {
		transform: translateY(3px);
		box-shadow: 0px 3px #092230;
	}
</style>
