<script>
    import { fade } from 'svelte/transition';
    import { store } from '../store';
</script>

<style>
    iframe {
        position: fixed;
        z-index: 5;
        height: 50vh;
    }
</style>


<div transition:fade>
    {#if $store.youtube}
         <iframe 
            title = "Youtube"
            width = "100%"
            src = {`https://www.youtube.com/embed/${$store.trailer}`} 
            frameborder="0"
            allow = "autoplay; encrypted-media"
            allowfullscreen
        ></iframe>
    {/if}
</div>