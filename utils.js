export function normalize(num) {
	if (num < 10) {
		num = '0' + num;
	}
	return num;
}
export function getRandom(max) {
	const random = Math.ceil(Math.random() * max);
	return random;
}
