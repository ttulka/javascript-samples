class LinkedList {
	constructor(...data) {
		if (!data) {
			this.head = null;
		} else {
			this.head = new Node(data[0]);
			
			let prev = this.head;
			for(let i = 1; i < data.length; i++) {
				prev.next = new Node(data[i]);
				prev = prev.next;
			};
		}
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
	
	reversed() {
		const list = new LinkedList();
		
		let p = this.head;
		let n = new Node(p.data);
		while (p.next) {
			n = new Node(p.next.data, n);
			p = p.next;
		}
		list.head = n;
		return list;
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

function circularNode(list) {
	if (!list.head || !list.head.next) {
		return null;
	}
	let slow = list.head;
	let fast = list.head.next.next;
	while (fast && fast.next) {
		if (slow && slow === fast) {
			return slow;
		}
		fast = fast.next.next;
		slow = slow.next;
	}
	return null;
}

assertEquals('1,2,3', new LinkedList(1,2,3).asArray().toString());

assertEquals('1', new LinkedList(1).reversed().asArray().toString());
assertEquals('2,1', new LinkedList(1,2).reversed().asArray().toString());
assertEquals('3,2,1', new LinkedList(1,2,3).reversed().asArray().toString());
assertEquals('5,4,3,2,1', new LinkedList(1,2,3,4,5).reversed().asArray().toString());

assertEquals(true, isPalindrom(new LinkedList(1)));
assertEquals(true, isPalindrom(new LinkedList(1,1)));
assertEquals(true, isPalindrom(new LinkedList(1,1,1)));
assertEquals(true, isPalindrom(new LinkedList(1,2,1)));
assertEquals(true, isPalindrom(new LinkedList(1,2,3,2,1)));
assertEquals(true, isPalindrom(new LinkedList(1,2,3,3,2,1)));
assertEquals(false, isPalindrom(new LinkedList(1,2)));
assertEquals(false, isPalindrom(new LinkedList(1,2,3)));

assertEquals(null, circularNode(new LinkedList(1)));
assertEquals(null, circularNode(new LinkedList(1,1)));
assertEquals(null, circularNode(new LinkedList(1,2,3)));

const circularList = new LinkedList(1);
const node4 = new Node(4);
const node2 = new Node(2, new Node(3, node4));
node4.next = node2;
circularList.head.next = node2;
assertEquals(2, circularNode(circularList).data);

function assertEquals(expected, actual) {
	console.assert(expected === actual, 'Expected ' + expected + ', got ' + actual);
}