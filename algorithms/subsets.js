function subsets(set) {
	if (set.length === 0) {
		return [[]];
	}
	const x = set[0];
	const s = set.slice(1);	// set without x
	
	return subsets(s)
		.reduce((a,c) => [...a, c, [x, ...c]], []);
}

assertEquals([[]], subsets([]));
assertEquals([[],[1]], subsets([1]));
assertEquals([[],[1],[2],[1,2]], subsets([1,2]));
assertEquals([[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]], subsets([1,2,3]));

function permutations(set) {
	if (set.length === 0) {
		return [[]];
	}
	const res = [];
	for (let i = 0; i < set.length; i++) {
		const x = set[i];
		const s = set.slice(); s.splice(i, 1);	// set without x
		
		permutations(s)
			.reduce((a,c) => [...a, [x, ...c]], [])
			.forEach(p => res.push(p));
	}
	return res;
}

assertEquals([[]], permutations([]));
assertEquals([[1]], permutations([1]));
assertEquals([[1,2],[2,1]], permutations([1,2]));
assertEquals([[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]], permutations([1,2,3]));

function assertEquals(expected, actual) {
	expected = JSON.stringify(expected);
	actual = JSON.stringify(actual);
	console.assert(expected === actual, 'Expected ' + expected + ', got ' + actual);
}