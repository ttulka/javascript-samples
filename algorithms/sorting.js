function bubblesort(arr) {
	const a = [...arr];
	for (let i = 0; i < a.length - 1; i ++) {
		for (let j = i + 1; j < a.length; j ++) {
			if (a[i] > a[j]) {
				const v = a[i];
				a[i] = a[j];
				a[j] = v;
			}
		}
	}
	return a;
}

assertEquals(bubblesort([]).toString(), '');
assertEquals(bubblesort([1]).toString(), '1');
assertEquals(bubblesort([1,2]).toString(), '1,2');
assertEquals(bubblesort([2,1]).toString(), '1,2');
assertEquals(bubblesort([5,4,3,2,1]).toString(), '1,2,3,4,5');
assertEquals(bubblesort([4,3,1,2,5]).toString(), '1,2,3,4,5');

function assertEquals(expected, actual) {
	if (expected !== actual) {
		throw new Error('Expected ' + expected + ', got ' + actual);
	}
}