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
		display: flex;
		justify-content: center;
		align-items: center;
		color: #094579;
		background-color: #018cd5;
		height: clamp(8rem, 1.333rem + 29.63vw, 28rem);
		width: clamp(2rem, 0.667rem + 5.926vw, 6rem);
		font-size: clamp(1.75rem, 0.667rem + 4.815vw, 5rem);
		border-radius: 1rem;
		border: 2px solid #004c61;
		font-family: 'Changa One', sans-serif;
		box-shadow: 0px 6px #092230;
		transition:
			transform 0.1s ease-out,
			box-shadow 0.1s ease-out;
	}

	@media (max-width: var(--tp)) {
		.c-navButton {
			height: 14rem;
		}
	}

	.c-navButton:hover {
		box-shadow: 0px 3px #092230;
	}

	/* Beispiel wie man Modifier Klassen implementieren kann */
	.-disabled {
		opacity: 0.5;
		pointer-events: none;
	}
</style>
