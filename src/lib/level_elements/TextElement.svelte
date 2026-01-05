<script lang="ts">
	import type { TextElementData } from "$lib/types";
	import { marked } from 'marked';
	export let element: TextElementData;
</script>

<div class= "text-container">
	{@html marked(element.markdown ?? "")}
</div>

<style>
	.text-container {
	max-width: 950px;
	margin: 0 auto;
	padding: 1rem;
	line-height: 1.6;
	font-family: Arial, sans-serif;
	color: rgb(255, 255, 255); 
	}

</style>