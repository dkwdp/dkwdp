<script lang="ts">
	import type { SwitchElementData } from '$lib/types';
	import { normalize_and_goto, normalize_level_id } from '$lib/helpers';
	import { page } from '$app/state';

	export let element: SwitchElementData;
	const countChoices = element.next_levels.length;

	function go(chosen: { levelId: any }) {
		normalize_and_goto(chosen.levelId, page.params.mapId);
	}
</script>

<!--<button class="px-3 py-2 rounded-lg shadow" on:click={go}>
	Nice description of level {normalize_level_id(element.next_level, page.params.mapId)}.
</button>-->
<div class="imageRow" class:two={countChoices == 2} class:three={countChoices == 3}>
	{#each element.next_levels as choice}
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
		</button>
	{/each}
</div>

<style>
	.imageButton {
		padding: 0;
		background: none;
		display: inline-block;
		border-radius: 12px;
		border: 3px solid #0b0b0b;
		box-shadow: 0px 6px #0b0b0b;

		transition:
			transform 0.1s ease-out,
			box-shadow 0.1s ease-out;
		cursor: pointer;
	}

	.imageButton:hover {
		transform: translateY(3px);
		box-shadow: 0px 3px #0b0b0b;
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
</style>
