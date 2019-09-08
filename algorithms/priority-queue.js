// priority queue implementation

class PriorityQueue {
	
	constructor() {
		this.heap = [];
	}
	
	add(value) {
		this.heap.push(value);		
		this.swimUp(this.heap, this.heap.length - 1);
	}	
			
	remove(value) {
		if (!value) {
			return this.heap.pop();
			
		} else {
			const valueIndex = this.indexOf(value);
			if (valueIndex) {
				this.swap(this.heap, valueIndex, this.heap.length);
				this.swimDown(this.heap, valueIndex);
				this.heap = this.heap
					.reduce((a,c) => c ? [...a, c] : a, [])
					.slice(0, -1);
				return value; 
			}
		}
	}
	
	swimUp(heap, index) {
		const parentIndex = this.parentIndexFor(index);		
		if (heap[index] > heap[parentIndex]) {
			this.swap(heap, parentIndex, index);
			this.swimUp(heap, parentIndex)
		}
	}
	
	swimDown(heap, index) {
		[index * 2, index * 2 + 1].forEach(childIndex => {
			if (heap[childIndex] > heap[index]) {
				this.swap(heap, childIndex, index);
				this.swimDown(heap, childIndex)
			}
		});
	}
	
	indexOf(value) {
		return this.heap.indexOf(value);
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
queue.add(7);
queue.add(8);
queue.add(9);
queue.add(6);

console.log(queue);

queue.remove(9);
queue.remove();
queue.remove();
queue.remove();
queue.remove();
queue.remove();
queue.remove();
queue.remove();
assertEquals(8, queue.remove());


function assertEquals(expected, actual) {
	if (expected !== actual) {
		throw new Error('Expected ' + expected + ', got ' + actual);
	}
}