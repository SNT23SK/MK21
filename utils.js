const getRandom = (max) => Math.ceil(Math.random() * max);
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
export { getRandom, createElement };
