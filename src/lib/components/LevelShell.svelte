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
	import RotateDevice from './RotateDevice.svelte';
</script>

<div class="levelShell">
	<Header headerTitle={data.level.title}></Header>
	<RotateDevice></RotateDevice>
	<div class="levelShell_content">
		<div class="levelShell_left">
			{#if data.level.previous_level}
				<PreviousLevelButton levelId={data.level.previous_level} />
			{/if}
		</div>

		<div class="levelShell_center">
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
			{#if data.level.next_level}
				<NextLevelButton levelId={data.level.next_level} />
			{/if}
		</div>
	</div>
</div>

<style>
	.levelShell {
		display: flex;
		flex-direction: column;
		position: relative;
		background: radial-gradient(circle at center, #1a2a6c 0%, #0a1128 100%);
		height: 100dvh;
	}

	.levelShell_content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		position: relative;
		height: auto;
		flex: 1 1 auto;
		min-height: 0;
	}

	.levelShell_center {
		flex: 6 6 auto;
		background: transparent;
		border-radius: 30px;
		border: 4px solid rgba(59, 130, 246, 0.4);
		box-shadow: 0 0 50px rgba(59, 130, 246, 0.2); /* TODO: Glow Ja / Nein ? */
		padding: 30px;
		text-align: center;
		margin: 2rem 0;
		overflow-y: auto;
		scrollbar-width: none;
	}
	.levelShell_left,
	.levelShell_right {
		display: flex;
		flex: 1 1 clamp(1rem, 4vw, 8rem);
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0 1rem;
	}

	.levelShell_elementsStack {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	@media (max-height: 500px) and (orientation: landscape) {
		.levelShell_center {
			margin: 0.5rem 0;
		}
	}
</style>
