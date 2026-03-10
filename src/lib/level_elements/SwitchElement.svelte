<script lang="ts">
	import type { SwitchElementData, NextLevelWithImage } from '$lib/types';
	import { normalize_and_goto } from '$lib/helpers';
	import { page } from '$app/state';

	export let element: SwitchElementData;
	const countChoices = element.next_levels.length;

	function go(chosen: NextLevelWithImage) {
		normalize_and_goto(chosen.levelId, page.params.mapId);
	}
</script>

<div class="imageRow" class:two={countChoices === 2} class:three={countChoices === 3}>
	{#each element.next_levels as choice, i (i)}
		<button class="imageButton" on:click={() => go(choice)}>
			<img
				class="image"
				src={'/content/' +
					page.params.mapId +
					'/levels/' +
					page.params.levelId +
					'/' +
					choice.image}
				alt=""
			/>
			<h3 class="switchTitle">{choice.title || ''}</h3>
			{#if choice.description}
				<div class="descBox">
					<p class="switchDesc">{choice.description || ''}</p>
				</div>
			{/if}
		</button>
	{/each}
</div>

<style>
	.imageButton {
		padding: 0;
		position: relative;
		background: none;
		display: inline-block;
		border-radius: 12px;
		border: 3px solid var(--dark-900);
		box-shadow: 0 6px var(--dark-900);

		transition:
			transform 0.1s ease-out,
			box-shadow 0.1s ease-out;
	}

	.imageButton:hover {
		box-shadow: 0 3px var(--dark-900);
	}

	.two .imageButton {
		width: 33%;
		height: auto;
	}

	.three .imageButton {
		width: 24%;
		height: auto;
	}

	.imageRow {
		display: flex;
		flex-direction: row;
		gap: 16px;
		justify-content: center;
	}

	.image {
		width: 100%;
		height: auto;
		display: block;
	}

	.switchTitle {
		top: 1%;
		left: 0%;
		position: absolute;
		width: 100%;
		height: auto;
		color: var(--text-light);
		font-family: 'Changa One', sans-serif;
		font-size: 3cqw;
		text-shadow:
			-1px -1px 0 var(--black),
			1px -1px 0 var(--black),
			-1px 1px 0 var(--black),
			1px 1px 0 var(--black);
	}

	.descBox {
		top: 60%;
		left: 0%;
		position: absolute;
		width: 100%;
		background-color: var(--dark-900-70);
		backdrop-filter: blur(3px);
	}

	.switchDesc {
		height: auto;
		color: var(--text-light);
		font-family: 'Changa One', sans-serif;
		font-size: 2cqw;
		text-shadow:
			-1px -1px 0 var(--black),
			1px -1px 0 var(--black),
			-1px 1px 0 var(--black),
			1px 1px 0 var(--black);
	}
</style>
