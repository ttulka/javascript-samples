function bubblesort(arr) {
	const a = [...arr];
	for (let i = 0; i < a.length - 1; i ++) {
		for (let j = 0; j < a.length - i; j ++) {
			if (a[j] > a[j + 1]) {
				const v = a[j];
				a[j] = a[j + 1];
				a[j + 1] = v;
			}
		}
	}
	return a;
}

assertEquals('', bubblesort([]).toString());
assertEquals('1', bubblesort([1]).toString());
assertEquals('1,2', bubblesort([1,2]).toString());
assertEquals('1,2', bubblesort([2,1]).toString());
assertEquals('1,2,3,4,5', bubblesort([5,4,3,2,1]).toString());
assertEquals('1,2,3,4,5', bubblesort([4,3,1,2,5]).toString());

function insertionsort(arr) {
	const a = [...arr];
	for (let i = 1; i < a.length; i++) {
		for (let j = 0; j < i; j ++) {
			if (a[i] < a[j]) {
				const v = a[i];
				a[i] = a[j];
				a[j] = v;
			}
		}
	}
	
	return a;
}

assertEquals('', insertionsort([]).toString());
assertEquals('1', insertionsort([1]).toString());
assertEquals('1,2', insertionsort([1,2]).toString());
assertEquals('1,2', insertionsort([2,1]).toString());
assertEquals('1,2,3,4,5', insertionsort([5,4,3,2,1]).toString());
assertEquals('1,2,3,4,5', insertionsort([4,3,1,2,5]).toString());


function assertEquals(expected, actual) {
	if (expected !== actual) {
		throw new Error('Expected ' + expected + ', got ' + actual);
	}
}