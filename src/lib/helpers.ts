import type { LevelId } from '$lib/types';
import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { page } from '$app/state';


export function normalize_level_id(
	level_id: LevelId,
	current_map: string | undefined,
	previous_level: string
): { levelId: string; mapId: string; previousId: string; serverUrl: string | null } {
	if (!level_id) {
		throw new Error(`level_id is ${level_id}`);
	}
	if (current_map === undefined) throw new Error('current_map is undefined');
	if (previous_level === undefined) throw new Error('previous_level is undefined');


	let id_level: string;
	let id_map: string;
	let id_previous: string;
	let server_url: string | null = null;

	if (typeof level_id === 'string') {
		id_level = level_id;
		id_map = current_map;
		id_previous = previous_level;

	} else if (typeof level_id === 'object') {
		id_level = level_id.levelId;
		id_map = level_id.mapId ?? current_map;
		id_previous = level_id.previousLevelId;
		if (level_id.serverUrl) {
			server_url = level_id.serverUrl;
		}
	} else {
		throw new Error('goto_level_id: level_id is not a string or object');
	}

	return {
		levelId: id_level,
		mapId: id_map,
		previousId: id_previous,
		serverUrl: server_url
	};
}

export function normalize_and_goto(
	level_id: LevelId,
	current_map: string | undefined,
	previous_level: string
) {
	const { levelId, mapId } = normalize_level_id(level_id, current_map, previous_level);
	goto(resolve(`/map/[mapId]/level/[levelId]`, { levelId, mapId })).catch(err => {
		console.error('Failed to go to level', levelId, 'in map', mapId, err);
	});
}

export function go_back(
	level_id: LevelId,
	current_map: string | undefined,
	previous_level: string
) {
	const { levelId, mapId, previousId } = normalize_level_id(level_id, current_map, previous_level);
	goto(resolve(`/map/[mapId]/level/[levelId]`, { levelId: previousId, mapId })).catch(err => {
		console.error('Failed to go to previous level', err);
	});
}

export function navigateToMap(mapId?: string) {
	mapId = mapId ?? page.params.mapId;
	if (!mapId) throw new Error('mapId is undefined');

	goto(resolve(`/map/[mapId]`, { mapId })).catch(err => {
		console.error('Failed to go to map ', mapId, err);
	});
}
