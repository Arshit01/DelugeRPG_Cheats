let rpoke = 'Abra'
let rdex = 'dex27';
let rclass = 'normal';
let start = true;
let poke = null;
let dex = undefined;
let pclass = undefined;
let star = undefined;
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

async function searchForPoke() {
	while (start) {
		let clickableElements = elements.filter(element => !element.classList.contains("m-disable"));
		let randomElement = clickableElements[Math.floor(Math.random() * clickableElements.length)];

		if (randomElement) {
			randomElement.click();
			await sleep(2000);
			poke = document.getElementById('dexy');
			if (poke != null) {
				pclass = poke.getAttribute('data-class');
				dex = poke.classList.contains(rdex);
				console.log(poke.innerText);
				star = document.getElementsByClassName("fas fa-star spicon spib")[0];
				if (star != undefined || pclass == 'Retro' || (dex == true && pclass == rclass)) {
					if (confirm("Catch?")) {
						const c = document.querySelector('.btn-catch-action');
						c.click();
						start = false;
					}
				}
			}
		}
	}
}

searchForPoke();