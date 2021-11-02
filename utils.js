const getRandom = (max) => Math.ceil(Math.random() * max);
const createElement = (tag, className) => {
	const $tag = document.createElement(tag);
	if (className) {
		$tag.classList.add(className);
	}
	return $tag;
};
export { getRandom, createElement };
