import { getRandom } from './utils.js';
import { logs } from './constants.js';
const $chat = document.querySelector('.chat');
export function generateLog(type, player1, player2, damage) {
	const today = new Date(),
		time = today.toLocaleTimeString(),
		startTime = today.toLocaleTimeString().slice(0, -3),
		{ name: name1, hp: hp1 } = player1,
		{ name: name2, hp: hp2 } = player2,
		random = getRandom(logs[type].length) - 1;
	switch (type) {
		case 'start':
			const textStart = logs[type]
				.replace('[time]', startTime)
				.replace('[player1]', name1)
				.replace('[player2]', name2);
			const startEl = `<p>${textStart}</p>`;
			$chat.insertAdjacentHTML('afterbegin', startEl);
			break;
		case 'hit':
			const textHit = logs[type][random]
				.replace('[playerKick]', name1)
				.replace('[playerDefence]', name2);
			const hit = `<span class='red'>-${damage}</span>`;
			const elHit = `<p>${time} ${textHit} ${hit}  ${hp2}/100</p>`;
			$chat.insertAdjacentHTML('afterbegin', elHit);
			const $spanHit = document.querySelector('.red');
			$spanHit.style.color = '#cd0e03';
			break;
		case 'defence':
			const textDef = logs[type][random]
				.replace('[playerKick]', name1)
				.replace('[playerDefence]', name2);
			const elDef = `<p>${time} ${textDef} <span class='blue'>-${damage}</span>  ${hp2}/100</p>`;
			$chat.insertAdjacentHTML('afterbegin', elDef);
			const $pDef = document.querySelector('.blue');
			$pDef.style.color = '#0431f9';
			break;
		case 'end':
			const textEnd = logs[type][random]
				.replace('[playerWins]', name1)
				.replace('[playerLose]', name2);
			const endEl = `<p>${textEnd}</p>`;
			$chat.insertAdjacentHTML('afterbegin', endEl);
			break;
		case 'draw':
			const drawEl = logs[type][random];
			$chat.insertAdjacentHTML('afterbegin', drawEl);
			break;
	}
}
