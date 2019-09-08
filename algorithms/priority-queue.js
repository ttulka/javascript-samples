// priority queue implementation

class PriorityQueue {
	
	constructor() {
		this.heap = [];
	}
	
	add(value) {
		this.heap.push(value);		
		this.swim(this.heap, this.heap.length - 1);
	}	
			
	remove() {
		return this.heap.pop();
	}
	
	swim(heap, index) {
		const parentIndex = this.parentIndexFor(index);		
		if (heap[index] > heap[parentIndex]) {
			this.swap(heap, parentIndex, index);
			this.swim(heap, parentIndex)
		}
	}
	
	swap(arr, index1, index2) {
		const value = arr[index1];
		arr[index1] = arr[index2];
		arr[index2] = value;
	}
	
	parentIndexFor(index) {
		return Math.trunc(index / 2);
	}
}

const queue = new PriorityQueue();
queue.add(3);
queue.add(1);
queue.add(5);
queue.add(2);
queue.add(4);

console.log(queue);

assertEquals(queue.remove(), 1);
assertEquals(queue.remove(), 2);
assertEquals(queue.remove(), 3);
assertEquals(queue.remove(), 4);
assertEquals(queue.remove(), 5);


function assertEquals(expected, actual) {
	if (expected !== actual) {
		throw new Error('Expected ' + expected + ', got ' + actual);
	}
}