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

// Implement an algorithm to print all valid (i.e., properly opened and closed) combinations of n pairs of parentheses.
// Example: n=2 (()) ()()
function parentheses(n) {
	if (n == 1) {
		return ['()'];
	}
	const res = new Set();
	parentheses(n - 1).map(enthanced).forEach(ap => ap.forEach(p => res.add(p)));
	return Array.from(res);
		
	function enthanced(s) {
		const res = new Set();
		for (let i = 0; i < s.length; i++) {
			if (s.charAt(i) === '(') {
				// 1. find a closing parenthes and close the substring into parentheses
				const closed = s.slice(0, i) + '(' + s.slice(i);
				const closingIndex = closed.indexOf(')', i + 1);				
				res.add(closed.slice(0, closingIndex) + ')' + closed.slice(closingIndex));
				// 2. put new parentheses pair inside the parentheses
				res.add(s.slice(0, i) + '()' + s.slice(i));				
			}			
		}
		return res;
	}
}

assertEquals(['()'], parentheses(1));
assertEquals(['(())','()()'], parentheses(2));
assertEquals(['((()))','()(())','(()())','(())()','()()()'], parentheses(3));

function coinChanges(amount, coins, index = 0) {
	if (index >= coins.length) {	// last coin
		return amount === 0 ? 1 : 0;
	}
	let changeWays = 0;	
	for (let i = 0; i * coins[index] <= amount; i++) {		
		changeWays += coinChanges(amount - i * coins[index], coins, index + 1);
	}
	return changeWays;
}

assertEquals(1, coinChanges(1, [5,3,1]));
assertEquals(1, coinChanges(2, [5,3,1]));
assertEquals(2, coinChanges(3, [5,3,1]));
assertEquals(2, coinChanges(4, [5,3,1]));
assertEquals(3, coinChanges(5, [5,3,1]));
assertEquals(4, coinChanges(6, [5,3,1]));
assertEquals(4, coinChanges(7, [5,3,1]));
assertEquals(5, coinChanges(8, [5,3,1]));
assertEquals(6, coinChanges(9, [5,3,1]));
assertEquals(7, coinChanges(10, [5,3,1]));

function assertEquals(expected, actual) {
	expected = JSON.stringify(expected);
	actual = JSON.stringify(actual);
	console.assert(expected === actual, 'Expected ' + expected + ', got ' + actual);
}