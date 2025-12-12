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
	<div class= "aspect-ratio-box">
		<iframe src="{embedURL(element.url)}" title="Some Video" allow="web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
	</div>
</div>
<style>
	.video-container {
    	display: flex;
    	justify-content: center;
    	width: 100%;
    	margin: 0 auto;
		
	}
	.aspect-ratio-box {
    	position: relative;
    	width: 100%;
    	max-width: 950px;
    	aspect-ratio: 16 / 9;
	}
	.aspect-ratio-box iframe {
    	position: absolute;
    	top: 0;
		left: 0;
    	width: 100%;
    	height: 100%;
    	border: none;
	}
</style>