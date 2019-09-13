/**
Starting with a 1-indexed array of zeros and a list of operations, for each operation add a value to each of the array element between two given indices, inclusive. Once all operations have been performed, return the maximum value in your array.

For example, the length of your array of zeros n=10. Your list of queries is as follows:

a b k
1 5 3
4 8 7
6 9 1

index->	 1 2 3  4  5 6 7 8 9 10
        [0,0,0, 0, 0,0,0,0,0, 0]
        [3,3,3, 3, 3,0,0,0,0, 0]
        [3,3,3,10,10,7,7,7,0, 0]
        [3,3,3,10,10,8,8,8,1, 0]
        
The largest value is  after all operations are performed.

Constraints
  3 <= n <= 10^7
  1 <= m <= 2 * 10^5
  1 <= a <= b <= n
  0 <= k <= 10^9
*/

function arrayOperations(n, queries) {
    const a = Array(n + 1).fill(0);
    queries.forEach(q => {
        a[q[0] - 1] += q[2];
        a[q[1]] -= q[2];
    });
    let max = 0;
    let tmp = 0;
    a.forEach(v => {
        tmp += v;
        max = Math.max(tmp, max);
    });
    return max;
}

assertEquals(10, arrayOperations(10, [[1,5,3],[4,8,7],[6,9,1]]));

function assertEquals(expected, actual) {
	if (expected !== actual) {
		throw new Error('Expected ' + expected + ', got ' + actual);
	}
}