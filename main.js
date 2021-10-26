import { generateLog } from './logs.js';
import { createPlayer, player1, player2 } from './player.js';
import { checkAttack, attack, enemyAttack, checkWin } from './play.js';
const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');

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
