import { getRandom } from './utils.js';
import { generateLog } from './logs.js';
const $randomBtn = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $arenas = document.querySelector('.arenas');
export const player1 = {
	player: 1,
	name: 'Scorpion',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: 'knife',
	attack,
	changeHP,
	renderHP,
	elHP,
};
export const player2 = {
	player: 2,
	name: 'Sub Zero',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapon: 'ice',
	attack,
	changeHP,
	renderHP,
	elHP,
};
const player3 = {
	player: 3,
	name: 'Liu Kang',
	hp: 80,
	img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
	weapon: 'fist',
	attack,
	changeHP,
	renderHP,
	elHP,
};
const player4 = {
	player: 4,
	name: 'Sonya',
	hp: 40,
	img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
	weapon: 'glock',
	attack,
	changeHP,
	renderHP,
	elHP,
};
const player5 = {
	player: 5,
	name: 'Kitana',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
	weapon: 'knife',
	attack,
	changeHP,
	renderHP,
	elHP,
};

function changeHP(damage) {
	if (this.hp > damage) {
		this.hp -= damage;
	} else {
		this.hp = 0;
	}
}

const HIT = {
	head: 30,
	body: 25,
	foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];

function getWinner(name) {
	const $winTitle = createElement('div', 'winTitle');
	name ? ($winTitle.innerText = name + ' wins') : ($winTitle.innerText = 'Draw');
	return $winTitle;
}

function elHP() {
	const $elLife = document.querySelector('.player' + this.player + ' .life');
	return $elLife;
}

function renderHP() {
	this.elHP().style.width = this.hp + '%';
}

function getDamage(player, damage) {
	player.changeHP(damage);
	player.renderHP();
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

export function checkWin() {
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

export function enemyAttack() {
	const hit = ATTACK[getRandom(3) - 1];
	const defence = ATTACK[getRandom(3) - 1];
	return {
		value: getRandom(HIT[hit]),
		hit,
		defence,
	};
}

export function checkAttack(enemy, hero) {
	if (hero.hit !== enemy.defence) {
		getDamage(player2, hero.value);
		generateLog('hit', player1, player2);
	}
	if (hero.hit === enemy.defence) {
		generateLog('defence', player1, player2);
	}
	if (enemy.hit !== hero.defence) {
		getDamage(player1, enemy.value);
		generateLog('hit', player2, player1);
	}
	if (enemy.hit === hero.defence) {
		generateLog('defence', player2, player1);
	}
}

export function attack() {
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
}

export function createPlayer(person) {
	const $player = createElement('div', 'player' + person.player);

	// progressbar
	const $progressbar = createElement('div', 'progressbar');
	$player.appendChild($progressbar);

	const $life = createElement('div', 'life');
	$life.style.width = person.hp + '%';
	$progressbar.appendChild($life);

	const $name = createElement('div', 'name');
	$name.innerText = person.name;
	$progressbar.appendChild($name);

	// character
	const $character = createElement('div', 'character');
	$player.appendChild($character);

	const $img = createElement('img');
	$img.src = person.img;
	$character.appendChild($img);

	return $player;
}

export function createElement(tag, className) {
	const $tag = document.createElement(tag);
	if (className) {
		$tag.classList.add(className);
	}
	return $tag;
}
