function subsets(set) {
	if (set.length === 0) {
		return [[]];
	}
	const x = set[0];
	return subsets(set.slice(1)).reduce((a,c) => [...a, c, [x, ...c]], []);
}

assertEquals([[]], subsets([]));
assertEquals([[],[1]], subsets([1]));
assertEquals([[],[1],[2],[1,2]], subsets([1,2]));
assertEquals([[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]], subsets([1,2,3]));

function assertEquals(expected, actual) {
	expected = JSON.stringify(expected);
	actual = JSON.stringify(actual);
	console.assert(expected === actual, 'Expected ' + expected + ', got ' + actual);
}