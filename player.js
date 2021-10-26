import { attack } from './play.js';

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
function elHP() {
	const $elLife = document.querySelector('.player' + this.player + ' .life');
	return $elLife;
}
function renderHP() {
	this.elHP().style.width = this.hp + '%';
}
export function createElement(tag, className) {
	const $tag = document.createElement(tag);
	if (className) {
		$tag.classList.add(className);
	}
	return $tag;
}
export function getDamage(player, damage) {
	player.changeHP(damage);
	player.renderHP();
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
