<script lang="ts">
	import { resolve } from '$app/paths';
	import type { MapStructure } from '$lib/types';
	export let structure: MapStructure;

	// Berechne Anzahl der Zeilen und Spalten
	$: rows = structure.tiles.length;
	$: cols = structure.tiles[0]?.length || 0;
	
	// Funktion: Hole das Tile-Zeichen an einer Position
	function getTile(row: number, col: number): string {
		return structure.tiles[row]?.[col] || ' ';
	}
	
	// Funktion: Hat ein Tile eine Verbindung in eine Richtung?
	function hasConnection(tile: string, direction: 'north' | 'east' | 'south' | 'west'): boolean {
		const connections: Record<string, string[]> = {
			// Vertikale Linien
			'I': ['north', 'south'],
			'i': ['north', 'south'],
			'|': ['north', 'south'],
			
			// Horizontale Linie
			'-': ['east', 'west'],
			'–': ['east', 'west'],
			
			// Ecken
			'L': ['north', 'east'],
			'l': ['north', 'east'],
			'r': ['east', 'south'],
			'R': ['east', 'south'],
			'7': ['west', 'south'],
			'J': ['north', 'west'],
			'j': ['north', 'west'],
			
			// T-Kreuzungen
			'T': ['east', 'south', 'west'],
			't': ['east', 'south', 'west'],
			'q': ['north', 'south', 'west'],
			'Q': ['north', 'south', 'west'],
			'w': ['north', 'east', 'west'],
			'W': ['north', 'east', 'west'],
			'p': ['north', 'east', 'south'],
			'P': ['north', 'east', 'south'],
			
			// Kreuzung
			'+': ['north', 'east', 'south', 'west'],
			
			// Dead ends
			"'": ['north'],
			'>': ['east'],
			',': ['south'],
			'<': ['west']
		};
		
		return connections[tile]?.includes(direction) || false;
	}

		// Funktion: Bestimme den Tile-Typ und Rotation basierend auf Verbindungen
	function getTileImageInfo(tile: string): { type: string; rotation: number } | null {
		if (tile === ' ') return null;
		
		const north = hasConnection(tile, 'north');
		const east = hasConnection(tile, 'east');
		const south = hasConnection(tile, 'south');
		const west = hasConnection(tile, 'west');
		
		const connectionCount = [north, east, south, west].filter(Boolean).length;
		
		// Falls keine Verbindungen
		if (connectionCount === 0) return null;
		
		// Einzelne Verbindung (Dead end)
		if (connectionCount === 1) {
			if (north || south) return { type: 'straight', rotation: 90 };
			if (east || west) return { type: 'straight', rotation: 0 };
		}
		
		// Gerade Linie
		if (connectionCount === 2) {
			// Vertikale Linie (Nord-Süd)
			if (north && south) return { type: 'straight', rotation: 90 };
			// Horizontale Linie (Ost-West)
			if (east && west) return { type: 'straight', rotation: 0 };
			
			// Ecken		
			if (north && east) return { type: 'corner', rotation: 90 };
			if (east && south) return { type: 'corner', rotation: 180 };
			if (south && west) return { type: 'corner', rotation: 270 };
			if (west && north) return { type: 'corner', rotation: 0 };
		}
		
		// T-Kreuzung
		if (connectionCount === 3) {
			if (north && east && west) return { type: 't-junction', rotation: 0 };
			if (north && south && east) return { type: 't-junction', rotation: 90 };
			if (east && south && west) return { type: 't-junction', rotation: 180 };
			if (north && south && west) return { type: 't-junction', rotation: 270 };
		}
		
		// Kreuzung
		if (connectionCount === 4) {
			return { type: 'cross', rotation: 0 };
		}
		
		return null;
	}
</script>

<div class="map-container">
	<h1>{structure.title}</h1>
	
	<div class="map-wrapper">
		<!-- Hintergrundbild -->
		<img src={structure.background} alt={structure.title} class="map-bg" />
		
		<!-- Grid mit Wegen und Level-Punkten -->
		<div class="grid" style="--rows: {rows}; --cols: {cols};">
			
			<!-- 1. Wege zeichnen -->
			{#each Array(rows) as _, row}
				{#each Array(cols) as _, col}
					{@const tile = getTile(row, col)}
					{@const tileInfo = getTileImageInfo(tile)}
					
					{#if tileInfo}
						<div 
							class="tile-container" 
							style="grid-row: {row + 1}; grid-column: {col + 1}; --rotation: {tileInfo.rotation}deg;"
						>
							<img 
								src="/content/tiles/{tileInfo.type}.png" 
								alt="path tile"
								class="tile-img"
								style="transform: rotate({tileInfo.rotation}deg);"
							/>
						</div>
					{/if}
				{/each}
			{/each}
			
			<!-- 2. Level-Punkte platzieren -->
			{#each structure.levels as level}
				<a 
					href={resolve(`/map/${structure.id}/level/${level.id}`)}
					class="level-node"
					style="grid-row: {level.pos[0] + 1}; grid-column: {level.pos[1] + 1};"
					title={level.title}
				>
					<div class="dot"></div>
				</a>
			{/each}
			
		</div>
	</div>
</div>

<style>
	* {
		box-sizing: border-box;
	}
	
	.map-container {
		padding: 0;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #c9c9af;
		position: relative;
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
	}
	
	.map-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.map-bg {
		max-width: 100%;
		max-height: 100%;
		width: auto;
		height: auto;
		object-fit: contain;
		display: block;
	}
	
	.grid {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		max-width: 100vw;
		max-height: 100vh;
		display: grid;
		grid-template-rows: repeat(var(--rows), 1fr);
		grid-template-columns: repeat(var(--cols), 1fr);
		/* Grid sichtbar machen */
		background: repeating-linear-gradient(
			0deg,
			rgba(255,0,0,0.1) 0px,
			rgba(255,0,0,0.1) 1px,
			transparent 1px,
			transparent calc(100% / var(--rows))
		),
		repeating-linear-gradient(
			90deg,
			rgba(255,0,0,0.1) 0px,
			rgba(255,0,0,0.1) 1px,
			transparent 1px,
			transparent calc(100% / var(--cols))
		);
	}
	
	/* Tiles */
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
		object-fit: contain;
		transform: rotate(var(--rotation));
		display: block;
	}
	
	/* Level-Punkt */
	.level-node {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}
	
	.dot {
		width: clamp(1.5rem, 3vw, 3rem);
		height: clamp(1.5rem, 3vw, 3rem);
		background: #0088D2;
		border-radius: 50%;
		border: clamp(1px, 0.5vw, 3px) solid #005E91;
	}
	
	.level-node:hover .dot {
		background: #7AD8D8;
	}
</style>