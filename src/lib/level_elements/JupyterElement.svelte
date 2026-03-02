<script lang="ts">
	import type { JupyterElementData } from '$lib/types';
	import { onMount } from 'svelte';
	import { EditorView, basicSetup } from 'codemirror';
	import { python } from '@codemirror/lang-python';
	import { indentWithTab } from '@codemirror/commands';
	import { keymap } from '@codemirror/view';
	import { oneDark } from "@codemirror/theme-one-dark";

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
				oneDark
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

			await pyodide.loadPackage("numpy");

			pyodide.FS.mkdir("/dojosw");

			const files = [
				"__init__.py",
				"music.py",
				"musik.py",
				"roboter.py"
			];

			for (const file of files) {
				const response = await fetch(`/python-libs/dojosw/${file}`);
				const content = await response.text();
				pyodide.FS.writeFile(`/dojosw/${file}`, content);
			}

			pyodide.runPython(`
				import sys
				sys.path.append("/")
			`);
			
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

		pyodide.runPython('sys.stdout = StringIO()');

		const result = pyodide.runPython(code);
		const jsResult = result && result.toJs ? result.toJs() : result;

		const textOutput = pyodide.runPython('sys.stdout.getvalue()');

		if (Array.isArray(jsResult)) {
			const audioCtx = new AudioContext();
			const buffer = audioCtx.createBuffer(1, result.length, 44100);
			const data = buffer.getChannelData(0);

			for (let i = 0; i < result.length; i++) {
				data[i] = result[i];
			}

			const source = audioCtx.createBufferSource();
			source.buffer = buffer;
			source.connect(audioCtx.destination);
			source.start();

			output = textOutput || "Playing sound...";
			return;
		}

		output = textOutput || 'Done';

	} catch (error: any) {
		const lines = error.message.split('\n').filter((line: string) => line.trim());
		output = lines[lines.length - 1];
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
