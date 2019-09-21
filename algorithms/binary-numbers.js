function asBinary(num) {
	const maxLevel = Math.round(Math.sqrt(num)) + 1;
	const res = [];
	
	while (res.length < maxLevel) {
		res.unshift((num >>> res.length) & 1);
	}	
	while (res[0] === 0) {	// remove leading 0s
		res.shift();
	}	
	return res;
}

assertEquals('', asBinary(0).toString());
assertEquals('1', asBinary(1).toString());
assertEquals('1,0', asBinary(2).toString());
assertEquals('1,0,1', asBinary(5).toString());
assertEquals('1,0,0,0', asBinary(8).toString());
assertEquals('1,0,0,0,1', asBinary(17).toString());

function assertEquals(expected, actual) {
	console.assert(expected === actual, 'Expected ' + expected + ', got ' + actual);
}