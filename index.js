const $parent = document.querySelector('.parent');
const $player = document.querySelector('.player');
const $enemy = document.querySelector('.enemy');
const createElement = (tag, className) => {
	const $tag = document.createElement(tag);
	if (className) {
		if (Array.isArray(className)) {
			className.forEach((item) => {
				$tag.classList.add(item);
			});
		} else {
			$tag.classList.add(className);
		}
	}

	return $tag;
};

function createEmptyPlayerBlock() {
	const el = createElement('div', ['character', 'div11', 'disabled']);
	const img = createElement('img');
	img.src = 'https://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png';
	el.appendChild(img);
	$parent.appendChild(el);
}
getEnemy = async () => {
	const src = 'https://reactmarathon-api.herokuapp.com/api/mk/player/choose';
	const body = fetch(src).then((res) => res.json());
	return body;
};
let chooseCharacter = false;

async function init() {
	localStorage.removeItem('player1');
	localStorage.removeItem('player2');
	const src = 'https://reactmarathon-api.herokuapp.com/api/mk/players';
	const players = await fetch(src).then((res) => res.json());

	const enemy = await getEnemy();

	let imgSrc = null;
	createEmptyPlayerBlock();

	players.forEach((item) => {
		const el = createElement('div', ['character', `div${item.id}`]);
		const img = createElement('img');

		el.addEventListener('mousemove', () => {
			if (imgSrc === null) {
				imgSrc = item.img;
				const $img = createElement('img');
				$img.src = imgSrc;
				$player.appendChild($img);
			}
		});

		el.addEventListener('mouseout', () => {
			if (imgSrc) {
				imgSrc = null;
				if (!chooseCharacter) {
					$player.innerHTML = '';
				}
			}
		});

		el.addEventListener('click', (e) => {
			chooseCharacter = true;
			localStorage.setItem('player1', JSON.stringify(item));
			localStorage.setItem('player2', JSON.stringify(enemy));
			el.classList.add('active');
			setTimeout(() => {
				// create img for player
				const $img = createElement('img');
				imgSrc = item.img;
				$img.src = imgSrc;
				//  create img  for random enemy
				const $enemyCharacter = document.querySelector('.div' + enemy.id);
				$enemyCharacter.classList.add('active');

				const $img2 = createElement('img');

				$img2.src = enemy.img;

				$enemy.appendChild($img2);
			}, 2000);
			setTimeout(() => {
				window.location.pathname = 'arenas.html';
			}, 2000);
		});

		img.src = item.avatar;
		img.alt = item.name;

		el.appendChild(img);
		$parent.appendChild(el);
	});
}

init();
