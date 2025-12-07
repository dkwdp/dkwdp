<script lang="ts">
	import type { Level } from '$lib/types';
	export let data: { level: Level; mapId: string };

	import VideoElement from '$lib/level_elements/VideoElement.svelte';
	import TextElement from '$lib/level_elements/TextElement.svelte';
	import InteractiveElement from '$lib/level_elements/InteractiveElement.svelte';
	import SwitchElement from '$lib/level_elements/SwitchElement.svelte';
	import ButtonElement from '$lib/level_elements/ButtonElement.svelte';
	import NextLevelButton from '$lib/level_elements/NextLevelButton.svelte';
	import { navigateToMap } from '$lib/helpers';

	function navBack() {
		navigateToMap();
	}
</script>

<div class="page-root max-w-3xl space-y-4 level-background">
	<nav>
		<button class="icon-button" on:click={navBack}> </button>
	</nav>
	<div class="content">
		<h1 class="text-2xl font-bold">{data.level.title}</h1>
		{#each data.level.elements as element, i (i)}
			{#if element.type === 'text'}
				<TextElement {element} />
			{:else if element.type === 'video'}
				<VideoElement {element} />
			{:else if element.type === 'interactive'}
				<InteractiveElement {element} />
			{:else if element.type === 'switch'}
				<SwitchElement {element} />
			{:else if element.type === 'button'}
				<ButtonElement {element} />
			{/if}
		{/each}
		<div class="nextLevel">
			{#if data.level.next_level}
				<NextLevelButton levelId={data.level.next_level} />
			{/if}
		</div>
	</div>

	<slot />
</div>

<style>
	.level-background {
		background-color: #072a41;
		background-image:
			linear-gradient(#12567b, #12567b), linear-gradient(#0f5171, #0f5171),
			url('/images/patternFlower.png'),
			linear-gradient(to right, #02428a 0%, #1f72a6 20%, #1f72a6 80%, #02428a 100%);

		background-size:
			60vw 100vh,
			61vw 100vh,
			auto,
			auto;

		background-position:
			center center,
			center center,
			0 0,
			0 0;

		background-repeat: no-repeat, no-repeat, repeat, no-repeat;

		min-height: 100vh;
		margin: 0;
	}

	.page-root {
		min-height: 100vh;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: 20vw;
		padding-right: 20vw;
		box-sizing: border-box;
	}

	.page-root nav .icon-button {
		position: absolute;
		top: 1rem;
		left: 1rem;
		z-index: 10;
		background-color: #018cd5;
		background-image: url('/images/map.png');
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
		width: 8rem;
		height: 6rem;
		justify-content: center;
		padding: 12px 24px;
		border-radius: 12px;
		border: 3px solid #002b63;
		box-shadow: 0px 6px #002b63;

		transition:
			transform 0.1s ease-out,
			box-shadow 0.1s ease-out;
		cursor: pointer;
	}
	.page-root nav .icon-button:hover {
		transform: translateY(3px);
		box-shadow: 0px 3px #002b63;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: 60rem;
		box-sizing: border-box;
	}

	h1 {
		color: white;
		text-align: center;
		margin-top: 0;
		margin-bottom: 0.5rem;
		position: absolute;
		top: 5%;
	}
	.nextLevel {
		position: absolute;
		top: 50%;
		right: 1rem;
	}
</style>
