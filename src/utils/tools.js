export function shuffleArray(array) {
	var bool = [1, -1];
	return array.concat().sort(function (a, b) {
		return bool[Math.floor(Math.random() * bool.length)];
	})
}