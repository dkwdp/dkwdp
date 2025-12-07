<script lang="ts">
    import type { ButtonElementData } from '$lib/types';
    import { scratchWindowReference } from '$lib/scratchWindowStore'; 
    
    let { url, target, text }: ButtonElementData = $props();

    const TARGET_NAME = 'scratch-editor'; 
    const SCRATCH_URL_PART = 'scratch.mit.edu';

    function openOrFocus(event: MouseEvent) {
        
        event.preventDefault(); 
        const isScratch = element.url.includes(SCRATCH_URL_PART);
        const currentWindow = $scratchWindowReference;

        if (isScratch) {
            
            if (currentWindow && !currentWindow.closed) {
                currentWindow.focus();
                
            } else {
                const newWindow = window.open(element.url, TARGET_NAME);
                scratchWindowReference.set(newWindow);
            }
        } else {
            window.open(element.url, element.target || '_blank');
        }
    }
</script>

<button on:click={openOrFocus}>
    {element.text}
</button>