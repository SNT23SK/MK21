const $arenas = document.querySelector('.arenas');
const $randomBtn = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');
const player1 = {
	player: 1,
	name: 'Scorpion',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: 'knife',
	attack: function fight() {
		console.log(this.name + ' fight... ');
	},
	changeHP,
	renderHP,
	elHP,
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
	attack: function fight() {
		console.log(this.name + ' fight... ');
	},
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
	attack: function fight() {
		console.log(this.name + ' fight... ');
	},
	changeHP,
	renderHP,
	elHP,
};
const player5 = {
	player: 5,
	name: 'Sub Zero',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapon: 'ice',
	attack: function fight() {
		console.log(this.name + ' fight... ');
	},
	changeHP,
	renderHP,
	elHP,
};

const HIT = {
	head: 30,
	body: 25,
	foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];

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

function getWinner(name) {
	const $winTitle = createElement('div', 'winTitle');
	name ? ($winTitle.innerText = name + ' wins') : ($winTitle.innerText = 'Draw');
	return $winTitle;
}

function checkWin() {
	console.log('output:player1.hp ', player1.hp);
	console.log('output:player2.hp ', player2.hp);
	if (player1.hp <= 0 || player2.hp <= 0) {
		$randomBtn.disabled = true;
		createReloadButton();
		if (player1.hp > player2.hp) {
			$arenas.appendChild(getWinner(player1.name));
		} else if (player1.hp < player2.hp) {
			$arenas.appendChild(getWinner(player2.name));
		} else {
			$arenas.appendChild(getWinner());
		}
	}
}
function getRandom(max) {
	const random = Math.ceil(Math.random() * max);
	return random;
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
function enemyAttack() {
	const hit = ATTACK[getRandom(3) - 1];
	const defence = ATTACK[getRandom(3) - 1];
	return {
		value: getRandom(HIT[hit]),
		hit,
		defence,
	};
}

function heroAttack() {
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
function checkAttack(enemy, hero) {
	let hit = 0;
	if (hero.hit !== enemy.defence) {
		hit = hero.value;
	}
	return hit;
}

function getDamage(player, damage) {
	player.changeHP(damage);
	player.renderHP();
}

$formFight.addEventListener('submit', function (e) {
	e.preventDefault();
	const enemy = enemyAttack();
	const hero = heroAttack();
	getDamage(player1, checkAttack(enemy, hero));
	getDamage(player2, checkAttack(hero, enemy));
	checkWin();
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
