/**
There are three types of edits that can be performed on strings: insert a character,
remove a character, or replace a character. Given two strings, write a function to check if they are
one edit (or zero edits) away.
EXAMPLE
pale, ple -> true
pales, pale -> true
pale, bale -> true
pale, bake -> false
*/

function oneWay(a, b) {
	if (Math.abs(a.length - b.length) > 1) return false;
	if (a === b) return true;
	
	let i = 0;
	let j = 0;
	let diffs = 0;
			
	while (i < a.length && j < b.length) {
		if (a.charAt(i) !== b.charAt(j)) {
			if (++diffs > 1) {
				return false;
			}				
			if (a.length > b.length) {	// try to remove from a
				i++;
			} else if (b.length > a.length) { // try to remove from b
				j++
			} else {
				i++;
				j++;
			}
		} else {
			i++;
			j++;
		}
	}
	return true;	
}

assertEquals(true, oneWay('pale', 'ple'));
assertEquals(true, oneWay('pales', 'pale'));
assertEquals(true, oneWay('pale', 'bale'));
assertEquals(false, oneWay('pale', 'bake'));
assertEquals(false, oneWay('pale', 'a'));
assertEquals(true, oneWay('pale', 'pal'));

function assertEquals(expected, actual) {
	console.assert(expected === actual, 'Expected ' + expected + ', got ' + actual);
}