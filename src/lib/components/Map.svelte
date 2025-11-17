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
					
					{#if tile !== ' ' && hasConnection(tile, 'north') || hasConnection(tile, 'east') || hasConnection(tile, 'south') || hasConnection(tile, 'west')}
						<div class="tile-container" style="grid-row: {row + 1}; grid-column: {col + 1};">
							<svg viewBox="0 0 100 100" class="tile-svg" preserveAspectRatio="none">
								
								<!-- Nord-Verbindung -->
								{#if hasConnection(tile, 'north')}
									<line x1="50" y1="0" x2="50" y2="50" stroke="#976A1B" stroke-width="35" stroke-linecap="square"/>
									<line x1="50" y1="0" x2="50" y2="50" stroke="#D69726" stroke-width="30" stroke-linecap="square"/>
								{/if}
								
								<!-- Ost-Verbindung -->
								{#if hasConnection(tile, 'east')}
									<line x1="50" y1="50" x2="100" y2="50" stroke="#976A1B" stroke-width="35" stroke-linecap="square"/>
									<line x1="50" y1="50" x2="100" y2="50" stroke="#D69726" stroke-width="30" stroke-linecap="square"/>
								{/if}
								
								<!-- Süd-Verbindung -->
								{#if hasConnection(tile, 'south')}
									<line x1="50" y1="50" x2="50" y2="100" stroke="#976A1B" stroke-width="35" stroke-linecap="square"/>
									<line x1="50" y1="50" x2="50" y2="100" stroke="#D69726" stroke-width="30" stroke-linecap="square"/>
								{/if}
								
								<!-- West-Verbindung -->
								{#if hasConnection(tile, 'west')}
									<line x1="0" y1="50" x2="50" y2="50" stroke="#976A1B" stroke-width="35" stroke-linecap="square"/>
									<line x1="0" y1="50" x2="50" y2="50" stroke="#D69726" stroke-width="30" stroke-linecap="square"/>
								{/if}
								
								<!-- Zentrum-Punkt für Kreuzungen/Ecken -->
								<circle cx="50" cy="50" r="10" fill="#D69726"/>
								<circle cx="50" cy="50" r="7" fill="#D69726"/>
								
							</svg>
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
	}
	
	.tile-svg {
		width: 100%;
		height: 100%;
		display: block;
	}
	
	/* Level-Punkt */
	.level-node {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
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