import { getRandom } from './utils.js';
import { generateLog } from './logs.js';
import { getDamage, createElement, createPlayer } from './player.js';
import { player1, player2 } from './player.js';
const $randomBtn = document.querySelector('.button'),
	$formFight = document.querySelector('.control'),
	$arenas = document.querySelector('.arenas'),
	ATTACK = ['head', 'body', 'foot'],
	HIT = {
		head: 30,
		body: 25,
		foot: 20,
	};
class Game {
	constructor() {
		this.start = () => {
			$formFight.addEventListener('submit', function (e) {
				e.preventDefault();
				const enemy = enemyAttack();
				const hero = attack();
				checkAttack(enemy, hero);
				checkWin();
			});
			$arenas.appendChild(createPlayer(player1));
			$arenas.appendChild(createPlayer(player2));
			generateLog('start', player1, player2);
		};
	}
}

function checkWin() {
	const { hp: hp1, name: name1 } = player1;
	const { hp: hp2, name: name2 } = player2;
	if (hp1 <= 0 || hp2 <= 0) {
		$randomBtn.disabled = true;
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
