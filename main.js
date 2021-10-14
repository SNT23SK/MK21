const player1 = {
	name: 'Scorpion',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: 'knife',
	attack: function fight() {
		console.log(this.name + ' fight... ');
	},
};
const player2 = {
	name: 'Kitana',
	hp: 90,
	img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
	weapon: 'knife',
	attack: function fight() {
		console.log(this.name + ' fight... ');
	},
};
const player3 = {
	name: 'Liu Kang',
	hp: 80,
	img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
	weapon: 'fist',
	attack: function fight() {
		console.log(this.name + ' fight... ');
	},
};
const player4 = {
	name: 'Sonya',
	hp: 40,
	img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
	weapon: 'glock',
	attack: function fight() {
		console.log(this.name + ' fight... ');
	},
};

const player5 = {
	name: 'Sub Zero',
	hp: 50,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapon: 'ice',
	attack: function fight() {
		console.log(this.name + ' fight... ');
	},
};

const $arenas = document.querySelector('.arenas');

function createPlayer(player, person) {
	const $player = document.createElement('div');
	$player.classList.add(`${player}`);
	$arenas.appendChild($player);

	// progressbar
	const $progressbar = document.createElement('div');
	$progressbar.classList.add('progressbar');
	$player.appendChild($progressbar);

	const $life = document.createElement('div');
	$life.classList.add('life');
	$life.style.width = `${person.hp}%`;
	$progressbar.appendChild($life);

	const $name = document.createElement('div');
	$name.classList.add('name');
	$name.innerText = person.name;
	$progressbar.appendChild($name);

	// character
	const $character = document.createElement('div');
	$character.classList.add('character');
	$player.appendChild($character);

	const $img = document.createElement('img');
	$img.src = person.img;
	$character.appendChild($img);
}
createPlayer('player1', player1);
createPlayer('player2', player5);
