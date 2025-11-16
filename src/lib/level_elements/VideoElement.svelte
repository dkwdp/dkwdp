<script lang="ts">
	import type { VideoElementData } from '$lib/types';
	export let element: VideoElementData;

	function embedURL(url: string): string {
		if (url.includes('youtube.com') || url.includes('youtu.be')) {
			const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop()?.split('?')[0];
			return `https://www.youtube.com/embed/${videoId}`;
		}
		return url;
	}
</script>

<div class="video-container">
<iframe src="{embedURL(element.url)}" title="Some Video" allow="web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
<style>
	.video-container {
		display : flex; 
		justify-content: center;
		width: 100%;
		max-width: 950px;
		margin: 0 auto;
		
	}
	.video-container iframe {
		max-width: 100%;
		aspect-ratio: 16 / 9;
		height: auto;
	}
</style>
