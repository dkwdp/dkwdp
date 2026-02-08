<script lang="ts">
	import type { JupyterElementData } from '$lib/types';
	import { onMount } from 'svelte';
	import { EditorView, basicSetup } from 'codemirror';
	import { python } from '@codemirror/lang-python';
	import { indentWithTab } from '@codemirror/commands';
	import { keymap } from '@codemirror/view';

	interface Props {
		element: JupyterElementData;
	}

	let { element } = $props() as Props;
	
	let code = element.initialCode;
	let output = $state('');
	let pyodide: any = null;
	let isReady = $state(false);
	let editorContainer: HTMLDivElement;

	onMount(async () => {
		let view: EditorView;
		
		view = new EditorView({
			doc: code,
			extensions: [
				basicSetup,
				python(),
				EditorView.updateListener.of((update) => {
					if (update.docChanged) {
						code = update.state.doc.toString();
					}
				}),
				keymap.of([indentWithTab]),
				EditorView.theme({
					'&': { backgroundColor: 'white' },
					'.cm-content': { backgroundColor: 'white' },
					'.cm-gutters': { backgroundColor: '#f5f5f5', color: '#999' }
				})
			],
			parent: editorContainer
		});

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
			output = 'Bereit';
		} catch (error) {
			output = `Error: ${error}`;
		}

		return () => {
			view.destroy();
		};
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
			// Extract last line 
			const errorMsg = error.message ;
            const lines = errorMsg.split('\n').filter((line:string) => line.trim());
            const lastLine = lines[lines.length - 1] ;
            output = lastLine;
        }
    }
</script>

<div class="jupyter-container">
	<h3>Code Editor</h3>
	<div bind:this={editorContainer}></div>
	<button onclick={runCode} disabled={!isReady}>Prüfen</button>
	<pre>{output}</pre>
</div>

<style>
	.jupyter-container {
		border: 1px solid #ffffff;
		padding: 1rem;
		margin: 10rem;
		max-width: 800px;
		width: 100%;
	}
	h3 {
		margin: 0 0 1rem 0;
		color: #f5f5f5;
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
