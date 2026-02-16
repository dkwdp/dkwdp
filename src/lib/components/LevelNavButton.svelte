<script lang="ts">
    import type { LevelId } from '$lib/types';
    import { normalize_and_goto } from '$lib/helpers';
    import { page } from '$app/state';

    export let levelId: LevelId;
    export let ariaLabel: string = 'Level';
    export let iconClass: string = '';

    function open() {
        if (page.params.mapId == null) throw new Error('Can\'t reach next Level :( (mapId is null)');
        normalize_and_goto(levelId, page.params.mapId);
    }
</script>

<button class="c-navButton c-navButton-disabled {iconClass}" on:click={open} aria-label={ariaLabel}></button>

<style>
    .c-navButton {
        color: #094579;
        cursor: pointer;
        background-color: #018cd5;
        height: 28rem;
        width: 6rem;
        font-size: 5rem;
        border-radius: 1rem;
        border: 2px solid #004c61;
        font-family: 'Changa One', sans-serif;
        box-shadow: 0px 6px #092230;
        justify-content: center;

        transition:
            transform 0.1s ease-out,
            box-shadow 0.1s ease-out;
    }
    .c-navButton:hover {
        transform: translateY(3px);
        box-shadow: 0px 3px #092230;
    }

    /* Beispiel wie man Modifier Klassen implementieren kann */
    .-disabled {
        opacity: 0.5;
        pointer-events: none;
    }

</style>
