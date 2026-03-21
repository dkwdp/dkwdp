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
	import Header from './global/Header.svelte';
</script>

<div class="levelShell level-background">
	<div class="levelShell_top"><Header></Header></div>
	<div class="levelShell_bottom">
		<div class="levelShell_left">
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
</div>

<style>
	.level-background {
		background-color: var(--bg-dark);
		background-image: linear-gradient(
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
		opacity: 20%, 100%;
		min-height: 100vh;
		margin: 0;
	}
	.levelShell {
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.levelShell_bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		position: relative;
	}

	.levelShell_center {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;

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
		flex: 0 0 clamp(6rem, 12vw, 12rem);
		width: clamp(2rem, 12vw, 12rem);
	}

	h1 {
		text-align: center;
		margin-top: 2rem;
		margin-bottom: 2rem;
	}

	.levelShell_elementsStack {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
</style>
