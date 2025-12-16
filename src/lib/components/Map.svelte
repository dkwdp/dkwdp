<script lang="ts">
	import { resolve } from '$app/paths';
	import type { MapStructure } from '$lib/types';
	export let structure: MapStructure; // get map-data

	// calculate number of rows and column
	$: rows = structure.tiles.length; // $ --> new value with change of structure.tiles
	$: cols = structure.tiles[0]?.length || 0; // ? --> in case tiles[0] doesn't exist
	
	// initial start-values for viewport (later automatically changed by bind:clientWidth)
	let viewportWidth = 1920;
	let viewportHeight = 1080;
	
	$: TILE_SIZE = Math.max(
		Math.ceil(viewportWidth / cols * 1.5), // map-size is 1.5 times the viewport
		Math.ceil(viewportHeight / rows * 1.5),
		120 // minimum tile-size
	);
	
	$: mapWidth = cols * TILE_SIZE;
	$: mapHeight = rows * TILE_SIZE;

	// zoom variable
	let zoom = 1;

	// min zoom so map always fills viewport
	$: MIN_ZOOM = Math.max(
		viewportWidth / mapWidth,
		viewportHeight / mapHeight
	);
	const MAX_ZOOM = 3; // maximum 300%
	const ZOOM_SENSITIVITY = 0.001;
	
	// calculate scaled map size
	$: scaledMapWidth = mapWidth * zoom;
	$: scaledMapHeight = mapHeight * zoom;
	
	// border for scrolling
	$: maxTranslateX = 0;
	$: minTranslateX = Math.min(0, viewportWidth - scaledMapWidth);
	$: maxTranslateY = 0;
	$: minTranslateY = Math.min(0, viewportHeight - scaledMapHeight);
	
	// drag/drop variables
	let isDragging = false;
	let hasMoved = false;
	let startX = 0;
	let startY = 0;
	let translateX = 0;
	let translateY = 0;
	let currentTranslateX = 0;
	let currentTranslateY = 0;
	
	function handleMouseDown(e: MouseEvent) {
		isDragging = true;
		hasMoved = false;
		startX = e.clientX - currentTranslateX;
		startY = e.clientY - currentTranslateY;
	}
	
	function handleMouseMove(e: MouseEvent) {
		if (!isDragging) return;
		
		const newX = e.clientX - startX;
		const newY = e.clientY - startY;
		
		// if mouse has moved (more than 3)
		if (Math.abs(newX - currentTranslateX) > 3 || Math.abs(newY - currentTranslateY) > 3) {
			hasMoved = true;
		}
		
		// clamp border
		translateX = Math.min(maxTranslateX, Math.max(minTranslateX, newX));
		translateY = Math.min(maxTranslateY, Math.max(minTranslateY, newY));
	}
	
	function handleMouseUp() {
		isDragging = false;
		currentTranslateX = translateX;
		currentTranslateY = translateY;
	}
	
	// zoom with mouse wheel
	function handleWheel(e: WheelEvent) {
		e.preventDefault();
		
		// mousposition relative to viewport
		const mouseX = e.clientX;
		const mouseY = e.clientY;
		
		// position on map before zoom
		const mapX = (mouseX - translateX) / zoom;
		const mapY = (mouseY - translateY) / zoom;
		
		// calculate new zoom
		const delta = -e.deltaY * ZOOM_SENSITIVITY;
		const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom + delta));
		
		// calculate new translation
		let newTranslateX = mouseX - mapX * newZoom;
		let newTranslateY = mouseY - mapY * newZoom;
		
		zoom = newZoom;
		
		// calculate new borders
		const newScaledMapWidth = mapWidth * newZoom;
		const newScaledMapHeight = mapHeight * newZoom;
		const newMaxTranslateX = 0;
		const newMinTranslateX = Math.min(0, viewportWidth - newScaledMapWidth);
		const newMaxTranslateY = 0;
		const newMinTranslateY = Math.min(0, viewportHeight - newScaledMapHeight);
		
		// clamp borders
		translateX = Math.min(newMaxTranslateX, Math.max(newMinTranslateX, newTranslateX));
		translateY = Math.min(newMaxTranslateY, Math.max(newMinTranslateY, newTranslateY));
		
		currentTranslateX = translateX;
		currentTranslateY = translateY;
	}

	// get one tile out of the array
	function getTile(row: number, col: number): string {
		return structure.tiles[row]?.[col] || ' ';
	}
	
	// check if tile has any connections
	function hasConnection(tile: string, direction: 'north' | 'east' | 'south' | 'west'): boolean {
		const connections: Record<string, string[]> = {
			
			// vertical lines
			'I': ['north', 'south'],
			'i': ['north', 'south'],
			'|': ['north', 'south'],
			
			// horizontal lines
			'-': ['east', 'west'],
			'–': ['east', 'west'],
			
			// corners
			'L': ['north', 'east'],
			'l': ['north', 'east'],
			'r': ['east', 'south'],
			'R': ['east', 'south'],
			'7': ['west', 'south'],
			'J': ['north', 'west'],
			'j': ['north', 'west'],
			
			// T-crossing
			'T': ['east', 'south', 'west'],
			't': ['east', 'south', 'west'],
			'q': ['north', 'south', 'west'],
			'Q': ['north', 'south', 'west'],
			'w': ['north', 'east', 'west'],
			'W': ['north', 'east', 'west'],
			'p': ['north', 'east', 'south'],
			'P': ['north', 'east', 'south'],
			
			// crossing
			'+': ['north', 'east', 'south', 'west'],
			
			// dead-end
			"'": ['north'],
			'>': ['east'],
			',': ['south'],
			'<': ['west']
		};
		
		return connections[tile]?.includes(direction) || false;
	}

	// check all 4 directions, count connections, rotate tile-image
	function getTileImageInfo(tile: string): { type: string; rotation: number } | null {
		if (tile === ' ') return null;
		
		const north = hasConnection(tile, 'north');
		const east = hasConnection(tile, 'east');
		const south = hasConnection(tile, 'south');
		const west = hasConnection(tile, 'west');
		
		const connectionCount = [north, east, south, west].filter(Boolean).length;
		
		// if no connection
		if (connectionCount === 0) return null;
		
		// 1 connection (dead-end)
		if (connectionCount === 1) {
			if (north) return { type: 'dead-end', rotation: 0 }; // Verbindung nach oben
			if (east) return { type: 'dead-end', rotation: 90 }; // Verbindung nach rechts
			if (south) return { type: 'dead-end', rotation: 180 }; // Verbindung nach unten
			if (west) return { type: 'dead-end', rotation: 270 }; // Verbindung nach links
		}
		
		// 2 connections (straight line)
		if (connectionCount === 2) {
			// vertical line (north-south)
			if (north && south) return { type: 'straight', rotation: 90 };
			// horizontal line (east-west)
			if (east && west) return { type: 'straight', rotation: 0 };
			
			// corners		
			if (north && east) return { type: 'corner', rotation: 90 };
			if (east && south) return { type: 'corner', rotation: 180 };
			if (south && west) return { type: 'corner', rotation: 270 };
			if (west && north) return { type: 'corner', rotation: 0 };
		}
		
		// 3 connections (T-crossing)
		if (connectionCount === 3) {
			if (north && east && west) return { type: 't-junction', rotation: 0 };
			if (north && south && east) return { type: 't-junction', rotation: 90 };
			if (east && south && west) return { type: 't-junction', rotation: 180 };
			if (north && south && west) return { type: 't-junction', rotation: 270 };
		}
		
		// 4 connections (crossing)
		if (connectionCount === 4) {
			return { type: 'cross', rotation: 0 };
		}
		
		return null;
	}
</script>

<!-- listens for events for whole window (so drag and drop works) -->
<svelte:window
	on:mousemove={handleMouseMove} 
	on:mouseup={handleMouseUp}
	on:wheel={handleWheel}
/>

<div class="map-container" bind:clientWidth={viewportWidth} bind:clientHeight={viewportHeight}>
	<h1>{structure.title}</h1>
	
	<!-- Svelte normally warns that divs shouldn't have events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div 
		class="map-viewport"
		on:mousedown={handleMouseDown}
	>
		<div 
			class="map-content"
			style="
				width: {mapWidth}px; 
				height: {mapHeight}px;
				transform: translate({translateX}px, {translateY}px) scale({zoom});
				cursor: {isDragging ? 'grabbing' : 'grab'};
				transform-origin: 0 0;
			"
		>

		<!-- background-image -->
		<img src={
			structure.background} 
			alt={structure.title} 
			class="map-bg"
			draggable="false"
		/>
		
		<!-- grid with paths and level-points -->
		<div class="grid" style="--rows: {rows}; --cols: {cols}; --tile-size: {TILE_SIZE}px;">
			
			<!-- 1. "paint" the paths -->
			<!-- Array(rows) creates an empty array with rows slots -->
			{#each Array(rows) as _, row}
				{#each Array(cols) as _, col}
					<!-- local variables for loop -->
					{@const tile = getTile(row, col)}
					{@const tileInfo = getTileImageInfo(tile)}
					
					{#if tileInfo}
						<div 
							class="tile-container" 
							style="grid-row: {row + 1}; grid-column: {col + 1};"
						>
							<img 
								src="/content/tiles/{tileInfo.type}.png" 
								alt="path tile"
								class="tile-img"
								style="transform: rotate({tileInfo.rotation}deg);"
								draggable="false"
							/>
						</div>
					{/if}
				{/each}
			{/each}
			
			<!-- 2. set level-points -->
			{#each structure.levels as level}
				<a 
					href={hasMoved ? undefined : resolve(`/map/${structure.id}/level/${level.id}`)}
					class="level-node"
					style="grid-row: {level.pos[0] + 1}; grid-column: {level.pos[1] + 1};"
					title={level.title}
					draggable="false"
					on:click={(e) => {
						if (hasMoved) {
							e.preventDefault();
						}
					}}
				>
					<div class="dot"></div>
				</a>
			{/each}
			
			</div>
		</div>
	</div>
</div>

<style>
	* {
		box-sizing: border-box;
	}

	:global(body) {
		overflow: hidden;
		margin: 0;
		padding: 0;
	}

	:global(html) {
		overflow: hidden;
	}
	
	.map-container {
		padding: 0;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #c9c9af;
		position: fixed;
		top: 0;
		left: 0;
	}
	
	h1 {
		position: absolute;
		top: 1rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 100;
		margin: 0;
		color: white;
		font-size: clamp(1.5rem, 4vw, 2.5rem);
		pointer-events: none;
		text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
	}
	
	.map-viewport {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		user-select: none;
	}

	.map-content {
		position: relative;
		will-change: transform;
	}
	
	.map-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		pointer-events: none;
	}
	
	.grid {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-rows: repeat(var(--rows), var(--tile-size));
		grid-template-columns: repeat(var(--cols), var(--tile-size));
	}
	
	/* tiles */
	.tile-container {
		width: 100%;
		height: 100%;
		pointer-events: none;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.tile-img {
		width: 100%;
		height: 100%;
		object-fit: fill;
		display: block;
		pointer-events: none;
	}
	
	/* level-point */
	.level-node {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 10;
		pointer-events: none;
		text-decoration: none;
	}
	
	.dot {
		width: 4rem;
		height: 4rem;
		background: #0088D2;
		border-radius: 50%;
		border: 4px solid #005E91;
		transition: background 0.2s, transform 0.2s;
		pointer-events: auto;
		cursor: pointer;
	}
	
	.level-node:hover .dot {
		background: #7AD8D8;
		transform: scale(1.1);
	}
</style>