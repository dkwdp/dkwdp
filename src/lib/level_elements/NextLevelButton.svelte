<script lang="ts">
	import LevelNavButton from '../components/LevelNavButton.svelte';
	import type { LevelId } from '$lib/types';
	export let levelId: LevelId;
</script>

<LevelNavButton {levelId} iconClass="mdi mdi-arrow-right-thick" ariaLabel="Nächstes Level" />
