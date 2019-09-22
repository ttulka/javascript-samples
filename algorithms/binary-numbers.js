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

// Flip Bit to Win: You have an integer and you can flip exactly one bit from a O to a 1. 
// Find the length of the longest sequence of 1 s you could create.
function longestSequenceOf1s(num) {
	let prev = 0;
	let curr = 0;
	let max = 0;
		
	let i = 0;
	let prevBit = 0;
	while (num >> i > 0) {
		const currBit = num & 1 << i;
		i++;
		
		if (currBit) {
			curr++;
		}		
		if (prevBit && !currBit || !(num >> (i + 1))) {
			if (max < curr + prev) {
				max = curr + prev + (curr && prev ? 1 : 0);
			}			
			prev = curr;
			curr = 0;
		}
		if (!currBit) {			
			curr = 0;		
		}
		if (!prevBit && !currBit) {
			prev = 0;
		}		
		prevBit = currBit;		
	}
	return max;
}

assertEquals('', asBinary(0).toString());
assertEquals('', asBinary(0).toString());
assertEquals('1', asBinary(1).toString());
assertEquals('1,0', asBinary(2).toString());
assertEquals('1,0,1', asBinary(5).toString());
assertEquals('1,0,0,0', asBinary(8).toString());
assertEquals('1,0,0,0,1', asBinary(17).toString());

assertEquals(1, longestSequenceOf1s(0b10000000001));
assertEquals(3, longestSequenceOf1s(0b01110011100));
assertEquals(4, longestSequenceOf1s(0b01101101101));
assertEquals(5, longestSequenceOf1s(0b01011100111));
assertEquals(6, longestSequenceOf1s(0b11000111111));
assertEquals(7, longestSequenceOf1s(0b01111101100));
assertEquals(8, longestSequenceOf1s(0b11011101111));

function assertEquals(expected, actual) {
	console.assert(expected === actual, 'Expected ' + expected + ', got ' + actual);
}