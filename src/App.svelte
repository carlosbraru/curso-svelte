<script>
	import {onMount} from 'svelte';
	import  {store}  from './store';
	import { fade } from 'svelte/transition';
	import Snackbar from './components/Snackbar.svelte';
	import Page from './components/Page.svelte';
	import Thumbnail from './components/Thumbnail.svelte';
	import Youtube from './components/Youtube.svelte';
   
	let data = [];
	const API_KEY = "e788d0a3";
	const query = 'avenger';

	const videos = [
		'rDHQhXXvMMU',
		'pKoH9GkEKxQ',
		'JwghZEmvmb8',
		'rDHQhXXvMMU',
		'pKoH9GkEKxQ',
		'JwghZEmvmb8',
		'rDHQhXXvMMU',
		'pKoH9GkEKxQ',
		'JwghZEmvmb8',
		'rDHQhXXvMMU'
	];

	onMount( async() => {
		try {
			//i:una sola peli. // s:varias 
			const protocolo = window.location.protocol != 'https:' ? 'http' : 'https';
			let response = await fetch(`${protocolo}://www.omdbapi.com/?s=${query}&apikey=e788d0a3&plot=short`); 
			response = await response.json();

			// esto se hace para que Svelte detecte cambios y actúe en consecuencia.
			response = [...response.Search].reduce( (container, item) => {
				const objMovie = {
					id: item.imdbID,
					url: item.Poster.replace("X300", ""),
					title: item.Title
				};
				container.push(objMovie);
				return container;
			}, []);

			response = response.map((item, index) => {
				const movie = item;
				movie.trailer = videos[index];
				return movie;
			});

			data = response;
			
			const first = data[0];
			store.update(state => ({
				...state,
				id: first.id,
				url: first.url,
				title: first.title,
				trailer: first.trailer
			}));

		} catch (error) {

			console.error(error.message);
			store.update(state => ({
				...state,
				show: true,
				type: 'error',
				title: error.message
			}));
		}
		
	});

</script>

<main>
	<Snackbar />
	
	<Youtube />

	{#if data.length > 0}
		 <div transition:fade>
			 <Page />
		 </div>
		 <Thumbnail {data}/>
	{:else}
		<!-- Hace el loading -->
		 <div class="loader-container">
			 <div class="loader">
				 {#each new Array(8) as miDiv }
					  <div></div>
				 {/each}
			 </div>
		 </div>
	{/if}

	

</main>

<style>
	:global(:root) {
		--primary: #3e2723;
		--light-primary: #d3b8ae;
		--dark-primary: #1b0000;
		--secondary: #bb4d00;	
		--success: #558b2f;
		--error: #c62828;
		--white: #FFF;
		--color: #ffc107;
		--font-family: 'Orbitron', sans-serif;
	}

	main {
		padding: 0;
		margin: 0;
		height: 100vh;
	}

	.loader-container {
			height: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			background: var(--dark-primary);
			filter: opacity(.9);
			color: var(--white);
		}
		.loader {
			display: inline-block;
			position: relative;
			width: 80px;
			height: 80px;
		}
		.loader div {
			animation: loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
			transform-origin: 40px 40px;
		}
		.loader div:after {
			content: " ";
			display: block;
			position: absolute;
			width: 7px;
			height: 7px;
			border-radius: 50%;
			background: var(--white);
			margin: -4px 0 0 -4px;
		}
		.loader div:nth-child(1) {
			animation-delay: -0.036s;
		}
		.loader div:nth-child(1):after {
			top: 63px;
			left: 63px;
		}
		.loader div:nth-child(2) {
			animation-delay: -0.072s;
		}
		.loader div:nth-child(2):after {
			top: 68px;
			left: 56px;
		}
		.loader div:nth-child(3) {
			animation-delay: -0.108s;
		}
		.loader div:nth-child(3):after {
			top: 71px;
			left: 48px;
		}
		.loader div:nth-child(4) {
			animation-delay: -0.144s;
		}
		.loader div:nth-child(4):after {
			top: 72px;
			left: 40px;
		}
		.loader div:nth-child(5) {
			animation-delay: -0.18s;
		}
		.loader div:nth-child(5):after {
			top: 71px;
			left: 32px;
		}
		.loader div:nth-child(6) {
			animation-delay: -0.216s;
		}
		.loader div:nth-child(6):after {
			top: 68px;
			left: 24px;
		}
		.loader div:nth-child(7) {
			animation-delay: -0.252s;
		}
		.loader div:nth-child(7):after {
			top: 63px;
			left: 17px;
		}
		.loader div:nth-child(8) {
			animation-delay: -0.288s;
		}
		.loader div:nth-child(8):after {
			top: 56px;
			left: 12px;
		}
		@keyframes loader {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}

</style>