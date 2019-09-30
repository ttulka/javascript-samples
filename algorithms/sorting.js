function bubblesort(arr) {
	const a = [...arr];
	for (let i = 0; i < a.length - 1; i ++) {
		for (let j = 0; j < a.length - i - 1; j ++) {
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
	for (let i = 0; i < a.length; i++) {
		for (let j = i; j > 0; j--) {
			if (a[j] < a[j - 1]) {
				const v = a[j];
				a[j] = a[j - 1];
				a[j - 1] = v;
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

function selectionsort(arr) {
	const a = [...arr];
	for (let i = 0; i < a.length; i++) {
		let min = i;
		for (let j = i + 1; j < a.length; j ++) {			
			if (a[j] < a[min]) {
				min = j;
			}
		}
		if (min !== i) {
			const v = a[i];
			a[i] = a[min];
			a[min] = v;
		}
	}	
	return a;
}

assertEquals('', selectionsort([]).toString());
assertEquals('1', selectionsort([1]).toString());
assertEquals('1,2', selectionsort([1,2]).toString());
assertEquals('1,2', selectionsort([2,1]).toString());
assertEquals('1,2,3,4,5', selectionsort([5,4,3,2,1]).toString());
assertEquals('1,2,3,4,5', selectionsort([4,3,1,2,5]).toString());

function mergesort(a) {
	if (a.length < 2) {
		return a;
	}
	const middle = Math.floor(a.length / 2);
	
	return merge(mergesort(a.slice(0, middle)), mergesort(a.slice(middle)));
	
	function merge(l, r) {
		const sorted = [];
		while (l.length && r.length) {
			if (l[0] < r[0]) {
				sorted.push(l[0]);
				l.shift();
			} else {
				sorted.push(r[0]);
				r.shift();
			}
		}
		while (l.length)
			sorted.push(l.shift());
		
		while (r.length)
			sorted.push(r.shift());
	
		return sorted;
	}
}

assertEquals('', mergesort([]).toString());
assertEquals('1', mergesort([1]).toString());
assertEquals('1,2', mergesort([1,2]).toString());
assertEquals('1,2', mergesort([2,1]).toString());
assertEquals('1,2,3,4,5', mergesort([5,4,3,2,1]).toString());
assertEquals('1,2,3,4,5', mergesort([4,3,1,2,5]).toString());

function quicksort(a) {
	if (a.length < 2) {
		return a;
	}
	sort(a, 0, a.length - 1);
	return a;
	
	function sort(a, li, ri) {
		if (ri <= li) {
			return;
		}
		k = partition(a, li, ri);
		sort(a, li, k - 1);
		sort(a, k + 1, ri);
	}
	
	function partition(a, li, ri) {
		let i = li;
		let j = ri + 1;
		while (true) {
			while (a[++i] < a[li])
				if (i === ri) break;
			while (a[li] < a[--j])
				if (j === li) break;
			
			if (i >= j) break;
			
			const v = a[i];
			a[i] = a[j];
			a[j] = v;
		}
		const v = a[li];
		a[li] = a[j];
		a[j] = v;
		
		return j;
	}
}

assertEquals('', quicksort([]).toString());
assertEquals('1', quicksort([1]).toString());
assertEquals('1,2', quicksort([1,2]).toString());
assertEquals('1,2', quicksort([2,1]).toString());
assertEquals('1,2,3,4,5', quicksort([5,4,3,2,1]).toString());
assertEquals('1,2,3,4,5', quicksort([4,3,1,2,5]).toString());

// You are given two sorted arrays, A and B; merge B with A in sorted order.
function sortedMerge(a, b) {
	const res = [];
	let i = 0;
	let j = 0;
	while (i < a.length && j < b.length) {
		if (a[i] < b[j]) {
			res.push(a[i++]);
		} else {
			res.push(b[j++]);
		}
	}
	while (i < a.length) {
		res.push(a[i++]);
	}
	while (j < b.length) {
		res.push(b[j++]);
	}
	return res;
}

assertEquals('', sortedMerge([],[]).toString());
assertEquals('1', sortedMerge([1],[]).toString());
assertEquals('1', sortedMerge([],[1]).toString());
assertEquals('1,2', sortedMerge([1],[2]).toString());
assertEquals('1,2', sortedMerge([2],[1]).toString());
assertEquals('1,2,3', sortedMerge([1,2],[3]).toString());
assertEquals('1,2,3', sortedMerge([3],[1,2]).toString());
assertEquals('1,2,3', sortedMerge([2,3],[1]).toString());
assertEquals('1,2,3,4', sortedMerge([2,3],[1,4]).toString());

// You are given two sorted arrays, A and B; A has a large enough buffer at the end to hold B.
// Merge B into A in sorted order.
function sortedMerge2(a, b) {
	let aLength = a.length - b.length;
	
	// shift items of A to the end
	for (let i = aLength - 1; i >= 0; i--) {
		a[i + b.length] = a[i];
	}
	
	let pos = 0;
	let i = b.length,
		j = 0;
	while (i < a.length && j < b.length) {
		if (a[i] < b[j]) {
			a[pos++] = a[i++];
		} else {
			a[pos++] = b[j++];
		}
	}
	while (i < a.length) {
		a[pos++] = a[i++];
	}
	while (j < b.length) {
		a[pos++] = b[j++];
	}
	return a;
}

assertEquals('', sortedMerge2([],[]).toString());
assertEquals('1', sortedMerge2([1],[]).toString());
assertEquals('1', sortedMerge2([null],[1]).toString());
assertEquals('1,2', sortedMerge2([1,null],[2]).toString());
assertEquals('1,2', sortedMerge2([2,null],[1]).toString());
assertEquals('1,2,3', sortedMerge2([1,2,null],[3]).toString());
assertEquals('1,2,3', sortedMerge2([3,null,null],[1,2]).toString());
assertEquals('1,2,3', sortedMerge2([2,3,null],[1]).toString());
assertEquals('1,2,3,4', sortedMerge2([2,3,null,null],[1,4]).toString());

function assertEquals(expected, actual) {
	console.assert(expected === actual, 'Expected ' + expected + ', got ' + actual);
}

// performance measurements
const LENGTH = 10000;
const arr = Array(LENGTH).fill(0).map(x => Math.round(Math.random() * LENGTH));

[bubblesort, insertionsort, selectionsort, mergesort, quicksort].forEach(alg => {
	console.time(alg.name);
	alg(arr);
	console.timeEnd(alg.name);
});


