function substrings(s) {	
	return subarrays(s.split('')).map(x => x.join(''));
	
	function subarrays(a) {
		const res = [];
		for (let size = 1; size <= a.length; size++) {
			for (let j = 0; j + size <= a.length; j++) {
				res.push(a.slice(j, j + size));
			}
		}	
		return res;
	}
}

//console.log('substrings',substrings('a'));
//console.log('substrings',substrings('ab'));
//console.log('substrings',substrings('abc'));
//console.log('substrings',substrings('abcd'));

assertEquals(['a'], substrings('a'));
assertEquals(['a','b','ab'], substrings('ab'));
assertEquals(['a','a','aa'], substrings('aa'));
assertEquals(['a','b','c','ab','bc','abc'], substrings('abc'));
assertEquals(['a','b','b','ab','bb','abb'], substrings('abb'));
assertEquals(['a','b','c','d','ab','bc','cd','abc','bcd','abcd'], substrings('abcd'));

function assertEquals(expected, actual) {
	expected = [...expected].sort();
	actual = [...actual].sort();	
	if (expected.length !== actual.length || !expected.every((x,i) => actual[i] === x)) {
		throw new Error('Expected ' + expected.toString() + ', got ' + actual.toString());
	}
}