<script lang="ts">
  import Map from '$lib/components/Map.svelte';
	import type { MapStructure } from '$lib/types';
  export let data: { structure: MapStructure, mapId: string };
  
  // Highlight the first level
  $: highlightedLevelId = data.structure.levels[0]?.id;
</script>

<Map 
  structure={data.structure} 
  mapId={data.mapId}
  highlightedLevelId={highlightedLevelId}
/>
