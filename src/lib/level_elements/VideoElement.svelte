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

<div class="videoElement">
	<iframe
		class="videoElement_iframe"
		src={embedURL(element.url)}
		title="Some Video"
		allow="web-share"
		referrerpolicy="strict-origin-when-cross-origin"
		allowfullscreen
	></iframe>
</div>

<style>
	.videoElement {
		display: flex;
		justify-content: center;
		width: 100%;
		margin: 0 auto;
	}

	.videoElement_iframe {
		width: 90%;
		border: none;
		aspect-ratio: 16 / 9;
	}
</style>
