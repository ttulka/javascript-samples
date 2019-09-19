class LinkedList {
	constructor(head, ...data) {
		this.head = new Node(head);
		
		let prev = this.head;
		for(let d of data) {
			prev.next = new Node(d);
			prev = prev.next;
		};
	}
	
	asArray() {
		const res = [];
		let pointer = this.head;
		while (pointer) {
			res.push(pointer.data);
			pointer = pointer.next;
		}
		return res;
	}
}

class Node {
	constructor(data, next = null) {
		this.data = data;
		this.next = next;
	}
}

function isPalindrom(list) {
	const a = list.asArray();
	let left = 0;
	let right = a.length - 1;
	do {
		if (a[left] !== a[right]) {
			return false;
		}		
	} while (left++ < right--);
	return true;
}

assertEquals('1,2,3', new LinkedList(1,2,3).asArray().toString());

assertEquals(true, isPalindrom(new LinkedList(1)));
assertEquals(true, isPalindrom(new LinkedList(1,1)));
assertEquals(true, isPalindrom(new LinkedList(1,1,1)));
assertEquals(true, isPalindrom(new LinkedList(1,2,1)));
assertEquals(true, isPalindrom(new LinkedList(1,2,3,2,1)));
assertEquals(true, isPalindrom(new LinkedList(1,2,3,3,2,1)));
assertEquals(false, isPalindrom(new LinkedList(1,2)));
assertEquals(false, isPalindrom(new LinkedList(1,2,3)));

function assertEquals(expected, actual) {
	console.assert(expected === actual, 'Expected ' + expected + ', got ' + actual);
}