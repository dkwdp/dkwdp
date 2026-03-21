<script lang="ts">
	import { navigateToMap } from '$lib/helpers';

	function navBack() {
		navigateToMap();
	}
</script>

<header>
	<button class="header_mapButton" on:click={navBack} aria-label="Karte"></button>
	<h1 class="header_title">Leveltitel: xyz</h1>
</header>

<style>
	header {
		position: relative;
		z-index: 10;
		display: flex;
		align-items: center;
		gap: 2rem;
		padding: 8px 16px;
		background-color: rgba(10, 17, 40, 0.8);
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
		width: clamp(4rem, 2.667rem + 5.926vw, 8rem);
		aspect-ratio: 4 / 3;
		border: none;
	}
	.header_mapButton:hover {
		transform: scale(1.1);
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 10px;
	}
</style>
