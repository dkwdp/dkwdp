<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let isPortrait = false;

	function checkOrientation() {
		isPortrait = window.innerHeight > window.innerWidth;
	}

	onMount(() => {
		checkOrientation();
		window.addEventListener('resize', checkOrientation);
		return () => window.removeEventListener('resize', checkOrientation);
	});
</script>

{#if isPortrait}
	<div class="rotateDevice" in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
		<div class="rotateDevice_icon"></div>
		<!-- TODO: Hier statdessen einen Spinner? Bsp.: mdi mdi-reload-->
		<h2>Bitte drehe dein Gerät</h2>
		<p>Für das beste Erlebnis empfehlen wir das Querformat :)</p>
	</div>
{/if}

<style>
	.rotateDevice {
		position: fixed;
		inset: 0;
		z-index: 100;
		background: #0a1128;
		color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		text-align: center;
	}

	.rotateDevice_icon {
		width: 80px;
		height: 160px;
		border: 4px solid #22d3ee;
		border-radius: 10px;
		margin-bottom: 2rem;
		animation: rotate 6s infinite ease-in-out;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		20% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(90deg);
		}

		100% {
			transform: rotate(0deg);
		}
	}

	p {
		color: #7dd3fc;
		opacity: 0.8;
	}
</style>
