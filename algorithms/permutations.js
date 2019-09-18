function permutation(str, prefix = '') {
	const res = [];
	if (str.length === 0) {
		res.push(prefix);
	} else {
		for (let i = 0; i < str.length; i++) {
			const rem = str.substring(0, i) + str.substring(i + 1);
			res.push(...permutation(rem, prefix + str.charAt(i)));
		}
	}
	return res;
}

assertEquals(['a'], permutation('a'));
assertEquals(['aa'], permutation('aa'));
assertEquals(['ab','ba'], permutation('ab'));
assertEquals(['abc','acb','bca','bac','cab','cba'], permutation('abc'));

function assertEquals(expected, actual) {
	expected = expected.sort();
	actual = actual.sort();	
	console.assert(expected.length === actual.length || expected.every((x,i) => actual[i] === x),
		'Expected ' + expected.toString() + ', got ' + actual.toString());
}