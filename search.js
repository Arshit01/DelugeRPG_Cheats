// ==UserScript==
// @name         Search
// @namespace    http://tampermonkey.net/
// @version      2024-12-27
// @description  Search for Pokemon
// @author       You
// @match        https://www.delugerpg.com/map/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=delugerpg.com
// @grant        none
// ==/UserScript==

(function () {
	'use strict';

	let start = true;

	let rpokemon = 'Mirage Pikachu (Pop Star)'
	let rdex = 'dex1020';
	let rclass = 'normal';

	let pokemon = undefined;
	let dex = undefined;
	let pclass = undefined;
	let exists = undefined;
	let context = undefined;

	const nw = document.getElementById("dr-nw");
	const n = document.getElementById("dr-n");
	const ne = document.getElementById("dr-ne");
	const w = document.getElementById("dr-w");
	const e = document.getElementById("dr-e");
	const sw = document.getElementById("dr-sw");
	const s = document.getElementById("dr-s");
	const se = document.getElementById("dr-se");

	let elements = [nw, n, ne, w, e, sw, s, se];

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	function getRandomClickableElement() {
		let clickableElements = elements.filter(element => !element.classList.contains("m-disable"));
		return clickableElements[Math.floor(Math.random() * clickableElements.length)];
	}

	function isLegend() {
		context = document.getElementById('mapcontext');
		if (context) {
			context = context.innerText;
			return context == 'Legendary Pokemon';
		}
		return false;
	}

	function isMythical() {
		context = document.getElementById('mapcontext');
		if (context) {
			context = context.innerText;
			return context == 'Mythical Pokemon';
		}
		return false;
	}

	async function startSearch() {
		let message = `1 = Catch Pokemon by dex ID and class\n2 = Catch any Legends Pokemon\n3 = Catch any Mythical Pokemon\n4 = Catch any Legends Pokemon or Retro Pokemon or specific Pokemon with class\n5 = Catch any Retro class Pokemon\n6 = Catch Pokemon by name and class\n7 = Catch Pokemon which does not exists with you`;
		let choice = prompt(message, "1");

		choice = parseInt(choice);
		if (![1, 2, 3, 4, 5, 6, 7].includes(choice)) {
			choice = 7;
		}

		if (choice == 1 || choice == 4) {
			rdex = prompt("Enter dex ID:", rdex) || rdex;
			rclass = prompt("Enter class:", rclass) || rclass;
		} else if (choice == 6) {
			rpokemon = prompt("Enter Pokemon name:", rpokemon) || rpokemon;
		}

		while (start && choice) {
			let randomElement = getRandomClickableElement();
			let searching = document.getElementById('searching');
			if (randomElement && !searching) {
				randomElement.click();
				await sleep(3000);
				handlePokemon(choice);
			}
		}
	}

	function handlePokemon(choice) {
		pokemon = document.getElementById('dexy');
		if (pokemon != undefined) {
			console.log(pokemon.innerText);
			pclass = pokemon.getAttribute('data-class');
			dex = pokemon.classList.contains(rdex);
			exists = document.querySelector("#show-poke > img").getAttribute('alt');

			if (shouldCatchPokemon(choice)) {
				if (confirm("Catch?")) {
					const c = document.getElementById('catchmon');
					start = false;
					c.click();
				}
			}
		}
	}

	function shouldCatchPokemon(choice) {
		if (choice == 1) {
			// Catch Pokemon by dex ID and class
			return (dex && pclass == rclass);
		} else if (choice == 2) {
			// Catch any Legends Pokemon
			return isLegend();
		} else if (choice == 3) {
			// Catch any Mythical Pokemon
			return isMythical();
		} else if (choice == 4) {
			// Catch any Legends Pokemon or Retro Pokemon or specific Pokemon with class
			return isLegend() || pclass == 'Retro' || (dex && pclass == rclass);
		} else if (choice == 5) {
			// Catch any Retro class Pokemon
			return pclass == 'Retro';
		} else if (choice == 6) {
			// Catch Pokemon by name and class
			return (pokemon.innerText == rpokemon && pclass == rclass);
		} else if (choice == 7) {
			// Catch Pokemon which does not exists with you
			return exists == 'N';
		}
		return false;
	}

	$(document).ready(function () {
		startSearch();
	});
})();