import { getRandom, createElement } from './utils.js';
import { generateLog } from './logs.js';
import { getDamage, createPlayer, Player } from './player.js';
import { ATTACK, HIT } from './constants.js';
const $formFight = document.querySelector('.control');
const $arenas = document.querySelector('.arenas');
$arenas.classList.add('arena' + getRandom(5));

let player1;
let player2;

class Game {
	constructor() {
		this.getEnemy = async () => {
			const src = 'https://reactmarathon-api.herokuapp.com/api/mk/player/choose';
			const q = await fetch(src);
			const body = q.then((res) => res.json());
			return body;
		};

		this.start = async () => {
			const p1 = JSON.parse(localStorage.getItem('player1'));
			const p2 = JSON.parse(localStorage.getItem('player2'));

			player1 = new Player({
				...p1,
				player: 1,
			});
			player2 = new Player({
				...p2,
				player: 2,
			});

			$arenas.appendChild(createPlayer(player1));
			$arenas.appendChild(createPlayer(player2));
			generateLog('start', player1, player2);
			createReloadButton();

			let promise = new Promise((resolve) => {
				resolve(createFightImage());
			});
			promise
				.then(() => {
					setTimeout(() => {
						showButtonFight('visible');
						showInputs('visible');
					}, 2000);
				})
				.then(() => {});

			$formFight.addEventListener('submit', function (e) {
				e.preventDefault();
				const playerAttack = attack();
				const round = new Promise(function (res) {
					res(fight(playerAttack));
				});
				round
					.then((res) => {
						const heroData = {
							...res.player1,
						};
						const enemyData = {
							...res.player2,
						};
						checkAttack(enemyData, heroData);
					})
					.then(() => {
						checkWin();
					});
			});
		};
	}
}

function createFightImage() {
	const $fight = createElement('img', 'fight');
	$fight.src = './assets/fight.gif';
	$fight.style.zIndex = '-1';
	$formFight.appendChild($fight);
}
function showInputs(visible) {
	const $inputs = document.querySelectorAll('.inputWrap');
	$inputs.forEach((item) => {
		item.style.visibility = visible;
	});
}

function showButtonFight(visible) {
	const $btn = document.querySelector('.buttonWrap');
	$btn.style.visibility = visible;
}

async function fight({ hit, defence }) {
	const src = 'https://reactmarathon-api.herokuapp.com/api/mk/player/fight';
	const body = await fetch(src, {
		method: 'POST',
		body: JSON.stringify({
			hit,
			defence,
		}),
	}).then((res) => res.json());

	return body;
}
function checkWin() {
	const { hp: hp1, name: name1 } = player1;
	const { hp: hp2, name: name2 } = player2;
	if (hp1 <= 0 || hp2 <= 0) {
		$formFight.disabled = true;
		showButtonFight('hidden');
		showInputs('hidden');

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

const attack = () => {
	const attack = {};
	for (const item of $formFight) {
		if (item.checked && item.name === 'hit') {
			attack.hit = item.value;
		}
		if (item.checked && item.name === 'defence') {
			attack.defence = item.value;
		}
		item.checked = false;
	}
	return attack;
};

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
		window.location.pathname = 'index.html';
	});
}

export { Game };
