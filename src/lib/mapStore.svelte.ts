interface MapViewInfo {
	zoom: number;
	translateX: number;
	translateY: number;
}

export const mapState = $state<{
	highlightFirstLevel: boolean;
	mapInfo: Record<string, MapViewInfo>;
}>
	({
	highlightFirstLevel: true,
	mapInfo: {}
});
