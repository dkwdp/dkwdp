<script lang="ts">
	import type { TextElementData } from "$lib/types";
	export let element: TextElementData;
</script>

<div class= "text-container">
	{element.markdown}
</div>

<style>
	.text-container {
	max-width: 950px;
	margin: 0 auto;
	padding: 1rem;
	line-height: 1.6;
	font-family: Arial, sans-serif;
	color: white; 

	}

</style>