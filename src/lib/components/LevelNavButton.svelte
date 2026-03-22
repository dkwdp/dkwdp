<script lang="ts">
	import type { LevelId } from '$lib/types';
	import { normalize_and_goto } from '$lib/helpers';
	import { page } from '$app/state';

	export let levelId: LevelId;
	export let ariaLabel: string = 'Level';
	export let iconClass: string = '';

	function open() {
		if (page.params.mapId == null) throw new Error("Can't reach next Level :( (mapId is null)");
		normalize_and_goto(levelId, page.params.mapId);
	}
</script>

<button class="c-navButton {iconClass}" on:click={open} aria-label={ariaLabel}></button>

<style>
	.c-navButton {
		padding: 15px;
		border-radius: 50%;
		border: 2px solid rgba(34, 211, 238, 0.5);
		background: transparent;
		color: #22d3ee;
		font-size: 3rem;
		cursor: pointer;
		transition: all 0.3s;
		aspect-ratio: 1/1;
	}

	@media (max-height: 500px) and (orientation: landscape) {
		.c-navButton {
			font-size: 1rem;
			border: 2px solid rgba(34, 211, 238, 0.5);
		}
	}

	.c-navButton:hover {
		transform: scale(1.1);
		background-color: rgba(34, 211, 238, 0.1);
		border: 2px solid rgba(34, 211, 238, 1);
	}

	/* Beispiel wie man Modifier Klassen implementieren kann */
	.-disabled {
		opacity: 0.5;
		pointer-events: none;
	}
</style>
