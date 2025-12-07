<script lang="ts">
    import type { ButtonElementData } from '$lib/types';
    import { scratchState } from '$lib/scratchWindowStore.svelte';
    
    let { element }: { element: ButtonElementData } = $props();

    const TARGET_NAME = 'scratch-editor'; 
    const SCRATCH_HOST = 'scratch.mit.edu';

    let isScratch = $derived.by(() => {
        try {
            return new URL(element.url).hostname === SCRATCH_HOST;
        } catch {
            return false;
        }
    });

    function openOrFocus(event: MouseEvent) {
        event.preventDefault(); 
        
        const currentWindow = scratchState.current;

        if (isScratch) {
            if (currentWindow && !currentWindow.closed) {
                currentWindow.focus();
            } else {
                const newWindow = window.open(element.url, TARGET_NAME);
                scratchState.current = newWindow;
            }
        } else {
            window.open(element.url, element.target || '_blank');
        }
    }
</script>

<button onclick={openOrFocus}>
    {element.text}
</button>