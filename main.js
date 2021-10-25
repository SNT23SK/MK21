import { normalize, getRandom } from './utils.js';
import { logs } from './logs.js';
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
	attack,
	changeHP,
	renderHP,
	elHP,
};
const player2 = {
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

const HIT = {
	head: 30,
	body: 25,
	foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];

function generateLog(type, player1, player2) {
	const today = new Date();
	const {
		hh = normalize(today.getHours()),
		mm = normalize(today.getMinutes()),
		ss = normalize(today.getSeconds()),
	} = today;
	const time = `${hh}:${mm}:${ss}`;
	const random = getRandom(logs[type].length) - 1;
	switch (type) {
		case 'start':
			const textStart = logs[type]
				.replace('[time]', `${hh}:${mm}`)
				.replace('[player1]', player1.name)
				.replace('[player2]', player2.name);
			const startEl = `<p>${textStart}</p>`;
			$chat.insertAdjacentHTML('afterbegin', startEl);
			break;
		case 'hit':
			const textHit = logs[type][random]
				.replace('[playerKick]', player1.name)
				.replace('[playerDefence]', player2.name);
			const elHit = `<p>${time} ${textHit} -${100 - player2.hp}  ${player2.hp}/100</p>`;
			$chat.insertAdjacentHTML('afterbegin', elHit);
			const $pHit = document.querySelector('p');
			$pHit.style.color = '#cd0e03';
			break;
		case 'defence':
			const textDef = logs[type][random]
				.replace('[playerKick]', player1.name)
				.replace('[playerDefence]', player2.name);
			const elDef = `<p>${time} ${textDef} -${100 - player2.hp}  ${player2.hp}/100</p>`;
			$chat.insertAdjacentHTML('afterbegin', elDef);
			const $pDef = document.querySelector('p');
			$pDef.style.color = '#0431f9';
			break;
		case 'end':
			const textEnd = logs[type][random]
				.replace('[playerWins]', player1.name)
				.replace('[playerLose]', player2.name);
			const endEl = `<p>${textEnd}</p>`;
			$chat.insertAdjacentHTML('afterbegin', endEl);
			break;
		case 'draw':
			const drawEl = logs[type][random];
			$chat.insertAdjacentHTML('afterbegin', drawEl);
			break;
	}
}

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
function attack() {
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

function getDamage(player, damage) {
	player.changeHP(damage);
	player.renderHP();
}

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
