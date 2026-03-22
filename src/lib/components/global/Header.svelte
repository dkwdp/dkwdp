<script lang="ts">
	import { navigateToMap } from '$lib/helpers';
	export let headerTitle: string;

	function navBack() {
		navigateToMap();
	}
</script>

<header>
	<button class="header_mapButton" on:click={navBack} aria-label="Karte"></button>
	<h1 class="header_title">{headerTitle}</h1>
</header>

<style scoped>
	header {
		position: relative;
		z-index: 10;
		display: flex;
		align-items: center;
		gap: 2rem;
		padding: 8px 16px;
		background-color: rgba(10, 17, 40, 0.5);
		backdrop-filter: blur(4px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.4);
	}

	.header_mapButton {
		background-image: url(/images/map.png);
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
		background-color: transparent;
		color: white;
		height: 8vh;
		aspect-ratio: 4 / 3;
		border: none;
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		transition: all 0.3s;
	}
	.header_mapButton:hover {
		transform: scale(1.1);
		background-color: rgba(255, 255, 255, 0.3);
	}

	@media (max-height: 500px) and (orientation: landscape) {
		.header_mapButton {
			height: 12vh;
		}

		.header_title {
			font-size: 1.5rem;
		}
	}
</style>
