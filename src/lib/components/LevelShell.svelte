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

<div class="page-root level-background">

    <nav>
        <button class="icon-button" on:click={navBack} aria-label="Karte"></button>
    </nav>

	<div class="column-left">
        <div class="previousLevel-wrapper">
            {#if data.level.previous_level}
                <PreviousLevelButton levelId={data.level.previous_level} />
            {/if}
        </div>
	</div>

	<div class="column-center">
		<h1 class="text-2xl font-bold">{data.level.title}</h1>
		<div class="elements-stack space-y-4">
			{#each data.level.elements as element, i (i)}
				{#if element.type === 'text'}
					<TextElement {element} />
				{:else if element.type === 'video'}
					<VideoElement {element} />
				{:else if element.type === 'interactive'}
					<InteractiveElement element={element} level={data.level} mapId={data.mapId}/>
				{:else if element.type === 'switch'}
					<SwitchElement {element} />
				{:else if element.type === 'button'}
					<ButtonElement {element} />
				{/if}
			{/each}
		</div>
	</div>

	<div class="column-right">
		<div class="nextLevel-wrapper">
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
        background-image: linear-gradient(#12567b, #12567b), linear-gradient(#0f5171, #0f5171),
        url('/images/patternFlower.png'),
        linear-gradient(to right, #02428a 0%, #1f72a6 20%, #1f72a6 80%, #02428a 100%);

        background-size: 60vw 100%,
        61vw 100%,
        auto,
        auto;

        background-position: center center,
        center center,
        0 0,
        0 0;

        background-repeat: no-repeat, no-repeat, repeat, no-repeat;
        min-height: 100vh;
        margin: 0;
    }

    .page-root {
        min-height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: stretch;
        box-sizing: border-box;
        padding: 1rem;
    }


    .column-left {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        padding-left: 1rem;
    }

    .column-center {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 60rem;
        min-width: 0;
    }

    .column-right {
        flex: 0 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 10rem;
        align-items: flex-end;
        padding-right: 1rem;
    }

    h1 {
        color: white;
        text-align: center;
        margin-top: 2rem;
        margin-bottom: 2rem;
    }

    .icon-button {
        background-color: #018cd5;
        background-image: url('/images/map.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        width: 8rem;
        height: 6rem;
        border-radius: 12px;
        border: 3px solid #002b63;
        box-shadow: 0 6px #002b63;
        transition: transform 0.1s ease-out,
        box-shadow 0.1s ease-out;
        cursor: pointer;
    }

    .icon-button:hover {
        transform: translateY(3px);
        box-shadow: 0 3px #002b63;
    }

    .elements-stack {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
</style>
