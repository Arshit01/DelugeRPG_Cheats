let start = true;
let continue_ = undefined;
let attack = undefined;
let Continue = undefined;
let lvl = undefined;
let skip = undefined;
let sb = undefined;

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function battle() {
	while (start) {
		sb = document.querySelector('[name="Start Battle"]');
		Continue = document.querySelector('[name="Continue"]');
		if (sb != undefined) {
			sb.click();
			await sleep(2000);
		} else if (Continue != undefined) {
			Continue.click();
			await sleep(2000);
		} else {
			continue_ = document.querySelector('[name="continue_"]');
			attack = document.querySelector('[name="attack_"]');
			skip = document.querySelector('[name="skip_"]');
			if (attack != undefined) {
				attack.click();
				await sleep(2000);
			} else if (skip != undefined) {
				skip.click();
				await sleep(2000);
			} else if (continue_ != undefined) {
				continue_.click();
				await sleep(2000);
				lvl = document.querySelector('div.vpname');
				if (lvl != undefined) {
					start = false;
				}
			}
		}
	}
}

battle();