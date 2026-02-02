<script lang="ts">
	import type { JupyterElementData } from '$lib/types';
	import { onMount } from 'svelte';

	interface Props {
		element: JupyterElementData;
	}

	let { element } = $props() as Props;
	
	let code = $state(element.initialCode);
	let output = $state('');
	let pyodide: any = null;
	let isReady = $state(false);

	onMount(async () => {
		try {
			output = 'Lädt...';
			
			// Load Pyodide from CDN
			const script = document.createElement('script');
			script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
			await new Promise((resolve, reject) => {
				script.onload = resolve;
				script.onerror = reject;
				document.head.appendChild(script);
			});
			
			pyodide = await (window as any).loadPyodide();
			
			// Setup stdout once at start
			pyodide.runPython('import sys; from io import StringIO');
			
			isReady = true;
			output = '';
		} catch (error) {
			output = `Error: ${error}`;
		}
	});

	async function runCode() {
		if (!isReady) return;
		try {
			output = 'Lädt';
			
			// Redirect stdout to capture print()
			pyodide.runPython('sys.stdout = StringIO()');
			
			// Execute user code
			pyodide.runPython(code);
			
			// Get output
			const result = pyodide.runPython('sys.stdout.getvalue()');
			output = result || 'Done';
		} catch (error: any) {
			const errorMsg = error.message ;
            const lines = errorMsg.split('\n').filter((line:string) => line.trim());
            const lastLine = lines[lines.length - 1] ;
            output = lastLine;
        }
    }
</script>

<div>
	<h3>Code Editor</h3>
	<textarea rows="3" bind:value={code}></textarea>
	<button onclick={runCode} disabled={!isReady}>Run Code</button>
	<pre>{output}</pre>
</div>

<style>
	div {
		border: 1px solid #ffffff;
		padding: 1rem;
		margin: 10rem;
		max-width: 800px;
		width: 100%;
		border-radius: 1.5rem;
	}
	h3 {
		margin: 0 0 1rem 0;
		color: #f5f5f5;
	}
	textarea {
		width: 100%;
		min-height: 150px;
		font-family: monospace;
		box-sizing: border-box;
		resize: none;
	}
	button {
		width: 100%;
		padding: 0.5rem;
		margin: 0.5rem 0;
	}
	pre {
		background: #f5f5f5;
		padding: 0.5rem;
		min-height: 50px;
		margin: 0;
	}
</style>
