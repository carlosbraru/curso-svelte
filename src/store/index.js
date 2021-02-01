import { writable } from 'svelte/store';

const state = {
    id: null,
    url: null,
    title: null,
    message: null,
    type: null,
    show: null,
    trailer: null,
    trailerActive: null,
    youtoube: null
}

export const store = writable(state);