const $arenas = document.querySelector('.arenas');
const $randomBtn = document.querySelector('.button');
const player1 = {
	player: 1,
	name: 'Scorpion',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: 'knife',
	attack: function fight() {
		console.log(this.name + ' fight... ');
	},
};
const player2 = {
	player: 2,
	name: 'Kitana',
	hp: 90,
	img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
	weapon: 'knife',
	attack: function fight() {
		console.log(this.name + ' fight... ');
	},
};
const player3 = {
	player: 3,
	name: 'Liu Kang',
	hp: 80,
	img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
	weapon: 'fist',
	attack: function fight() {
		console.log(this.name + ' fight... ');
	},
};
const player4 = {
	player: 4,
	name: 'Sonya',
	hp: 40,
	img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
	weapon: 'glock',
	attack: function fight() {
		console.log(this.name + ' fight... ');
	},
};

const player5 = {
	player: 5,
	name: 'Sub Zero',
	hp: 50,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapon: 'ice',
	attack: function fight() {
		console.log(this.name + ' fight... ');
	},
};

function createElement(tag, className) {
	const $tag = document.createElement(tag);
	if (className) {
		$tag.classList.add(className);
	}
	return $tag;
}

function createPlayer(person) {
	const $player = createElement('div', 'player' + person.player);

	// progressbar
	const $progressbar = createElement('div', 'progressbar');
	$player.appendChild($progressbar);

	const $life = createElement('div', 'life');
	$life.style.width = `${person.hp}%`;
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

$randomBtn.addEventListener('click', function () {
	console.log('click random ');
	changeHP(player1, 9);
	changeHP(player2, 19);
});
function changeHP(player, damage) {
	const $playerLife = document.querySelector('.player' + player.player + ' .life');
	if (player.hp > 0) {
		player.hp -= damage;
	} else {
		player.hp = 0;
		$randomBtn.disabled = true;
		$arenas.appendChild(playerLose(player.name));
	}
	$playerLife.style.width = player.hp + '%';
	console.log('output : player.hp', player.hp);
}

function playerLose(name) {
	const $loseTitle = createElement('div', 'loseTitle');
	$loseTitle.innerText = name + ' lose';
	return $loseTitle;
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
