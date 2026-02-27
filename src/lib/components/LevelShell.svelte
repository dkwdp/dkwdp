<script lang="ts">
	import type { Level } from '$lib/types';

	export let data: { level: Level; mapId: string };

	import VideoElement from '$lib/level_elements/VideoElement.svelte';
	import TextElement from '$lib/level_elements/TextElement.svelte';
	import InteractiveElement from '$lib/level_elements/InteractiveElement.svelte';
	import SwitchElement from '$lib/level_elements/SwitchElement.svelte';
	import ButtonElement from '$lib/level_elements/ButtonElement.svelte';
	import NextLevelButton from '$lib/level_elements/NextLevelButton.svelte';
	import PreviousLevelButton from '$lib/level_elements/PreviousLevelButton.svelte';
	import { navigateToMap } from '$lib/helpers';

	function navBack() {
		navigateToMap();
	}
</script>

<div class="levelShell level-background">
	<div class="levelShell_left">
		<nav>
			<button class="levelShell_mapButton" on:click={navBack} aria-label="Karte"></button>
		</nav>
		{#if data.level.previous_level}
			<PreviousLevelButton levelId={data.level.previous_level} />
		{/if}
	</div>

	<div class="levelShell_center">
		<h1>{data.level.title}</h1>
		<div class="levelShell_elementsStack">
			{#each data.level.elements as element, i (i)}
				{#if element.type === 'text'}
					<TextElement {element} />
				{:else if element.type === 'video'}
					<VideoElement {element} />
				{:else if element.type === 'interactive'}
					<InteractiveElement {element} level={data.level} mapId={data.mapId} />
				{:else if element.type === 'switch'}
					<SwitchElement {element} />
				{:else if element.type === 'button'}
					<ButtonElement {element} />
				{/if}
			{/each}
		</div>
	</div>

	<div class="levelShell_right">
		<div>
			{#if data.level.next_level}
				<NextLevelButton levelId={data.level.next_level} />
			{/if}
		</div>
	</div>
</div>

<style>
	.level-background {
		background-color: var(--bg-dark);
		background-image:
			url('/images/patternFlower.png'),
			linear-gradient(
				to right,
				var(--bg-grad-left) 0%,
				var(--bg-grad-mid) 20%,
				var(--bg-grad-mid) 80%,
				var(--bg-grad-left) 100%
			);

		background-repeat: repeat, no-repeat;
		background-position:
			0 0,
			0 0;
		background-size: auto, auto;

		min-height: 100vh;
		margin: 0;
	}
	.levelShell {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		position: relative;
	}

	.levelShell_center {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 75%;

		background-image:
			linear-gradient(var(--bg-grad-1), var(--bg-grad-1)),
			linear-gradient(var(--bg-grad-2), var(--bg-grad-2));

		background-repeat: no-repeat, no-repeat;
		background-size:
			98% 100%,
			100% 100%;
		background-position:
			center center,
			center center;
	}
	.levelShell_left,
	.levelShell_right {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem 1rem 0 1rem;
	}

	h1 {
		text-align: center;
		margin-top: 2rem;
		margin-bottom: 2rem;
	}

	.levelShell_mapButton {
		position: absolute;
		left: 1rem;
		top: 1rem;
		background-color: var(--accent);
		background-image: url('/images/map.png');
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
		width: clamp(4rem, 2.667rem + 5.926vw, 8rem);
		aspect-ratio: 4 / 3;
		border-radius: 12px;
		border: 3px solid var(--accent-border);
		box-shadow: 0 6px var(--accent-border);
		transition:
			transform 0.1s ease-out,
			box-shadow 0.1s ease-out;
	}

	.levelShell_mapButton:hover {
		transform: translateY(3px);
		box-shadow: 0 3px var(--accent-border);
	}

	.levelShell_elementsStack {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
</style>
