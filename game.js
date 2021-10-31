import { getRandom, createElement } from './utils.js';
import { generateLog } from './logs.js';
import { getDamage, createPlayer } from './player.js';
import { Player } from './player.js';
const $formFight = document.querySelector('.control'),
	$arenas = document.querySelector('.arenas'),
	ATTACK = ['head', 'body', 'foot'],
	HIT = {
		head: 30,
		body: 25,
		foot: 20,
	};

let player1 = new Player({
	player: 1,
	name: 'Scorpion',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: 'knife',
});
let player2 = new Player({
	player: 2,
	name: 'Sub Zero',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapon: 'ice',
});

class Game {
	constructor() {
		this.start = () => {
			$arenas.appendChild(createPlayer(player1));
			$arenas.appendChild(createPlayer(player2));
			generateLog('start', player1, player2);
			$formFight.addEventListener('submit', function (e) {
				e.preventDefault();
				const enemy = enemyAttack();
				const hero = attack();
				checkAttack(enemy, hero);
				checkWin();
			});
		};
	}
}

function checkWin() {
	const { hp: hp1, name: name1 } = player1;
	const { hp: hp2, name: name2 } = player2;
	if (hp1 <= 0 || hp2 <= 0) {
		$formFight.disabled = true;
		createReloadButton();
		if (hp1 > hp2) {
			$arenas.appendChild(getWinner(name1));
			generateLog('end', player1, player2);
		} else if (hp1 < hp2) {
			$arenas.appendChild(getWinner(name2));
			generateLog('end', player2, player1);
		} else {
			$arenas.appendChild(getWinner());
			generateLog('draw', player1, player2);
		}
	}
}
function enemyAttack() {
	const hit = ATTACK[getRandom(3) - 1];
	const defence = ATTACK[getRandom(3) - 1];
	return {
		value: getRandom(HIT[hit]),
		hit,
		defence,
	};
}
function checkAttack(enemy, hero) {
	if (hero.hit !== enemy.defence) {
		getDamage(player2, hero.value);
		generateLog('hit', player1, player2, hero.value);
	}
	if (hero.hit === enemy.defence) {
		generateLog('defence', player1, player2, hero.value);
	}
	if (enemy.hit !== hero.defence) {
		getDamage(player1, enemy.value);
		generateLog('hit', player2, player1, enemy.value);
	}
	if (enemy.hit === hero.defence) {
		generateLog('defence', player2, player1, enemy.value);
	}
}
const attack = () => {
	const attack = {};
	for (const item of $formFight) {
		if (item.checked && item.name === 'hit') {
			attack.value = getRandom(HIT[item.value]);
			attack.hit = item.value;
		}
		if (item.checked && item.name === 'defence') {
			attack.defence = item.value;
		}
		item.checked = false;
	}
	return attack;
};
function getWinner(name) {
	const $winTitle = createElement('div', 'winTitle');
	name ? ($winTitle.innerText = name + ' wins') : ($winTitle.innerText = 'Draw');
	return $winTitle;
}
function createReloadButton() {
	const $reload = createElement('div', 'reloadWrap');
	const $btn = createElement('button', 'button');
	$btn.innerText = 'Restart';
	$reload.appendChild($btn);
	$arenas.appendChild($reload);
	$reload.addEventListener('click', () => {
		window.location.reload();
	});
}

export { Game };
