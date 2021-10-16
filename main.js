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
	hp: 100,
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

$randomBtn.addEventListener('click', function () {
	changeHP(player1, randomDamage(20));
	changeHP(player2, randomDamage(20));
	checkWin();
});
function changeHP(playerObj, damage) {
	const $playerLife = document.querySelector('.player' + playerObj.player + ' .life');
	if (playerObj.hp > damage) {
		playerObj.hp -= damage;
	} else {
		playerObj.hp = 0;
		$randomBtn.disabled = true;
	}
	$playerLife.style.width = playerObj.hp + '%';
}

function playerLose(name) {
	const $loseTitle = createElement('div', 'loseTitle');
	$loseTitle.innerText = name + ' lose';
	return $loseTitle;
}
function playerWin(name) {
	const $winTitle = createElement('div', 'winTitle');
	$winTitle.innerText = name + ' wins';
	return $winTitle;
}

function checkWin() {
	console.log('output:player1.hp ', player1.hp);
	console.log('output:player2.hp ', player2.hp);
	if (player1.hp <= 0 || player2.hp <= 0) {
		player1.hp > player2.hp
			? $arenas.appendChild(playerWin(player1.name))
			: $arenas.appendChild(playerWin(player2.name));
	}
}
function randomDamage(max) {
	const random = Math.ceil(Math.random() * max);
	return random;
}
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
