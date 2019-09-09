class BinaryTree {
		
	add(value) {
		this.root = this.addTo(value, this.root);
	}
	
	addTo(value, node) {
		if (!node) {
			return new BinaryNode(value);
		}
		
		if (value > node.value) {
			node.right = this.addTo(value, node.right);
		} else {
			node.left = this.addTo(value, node.left);
		}
		return node;
	}
	
	remove(value) {
		this.root = this.removeFrom(value, this.root);
	}
	
	removeFrom(value, node) {
		if (!node || value === node.value) {
			return null;
		}
		if (value == node.right) {
			node.right = this.removeNode(node.right);
			
		} else if (value == node.left) {
			node.left = this.removeNode(node.left);
			
		} else if (value > node.value) {
			this.removeFrom(value, node.right);
			
		} else {
			this.removeFrom(value, node.left);
		}		
		return node;
	}
	
	removeNode(node) {
		if (node.left && node.right) {
			const max = this.maxNode(node.left);
			if (max.value <= value) {
				max.left = node.right;
				return max;
			}
			const min = this.minNode(node.right);
			if (min.value > value) {
				min.right = node.left;
				return min;
			}
		}
		else if (node.left) {
			return node.left;
		}	
		else if (node.right) {
			return node.right;
		}	
		else {
			return null;
		}
	}
	
	maxNode(root) {
		// TODO
	}
	
	minNode(root) {
		// TODO
	}
	
	preorderTraversal() {
		return this.preorderTraversalFrom(this.root);
	}
	
	preorderTraversalFrom(node) {
		return node
			? [node.value, 
				...this.preorderTraversalFrom(node.left), 
				...this.preorderTraversalFrom(node.right)
			  ]
			: [];
	}
}

class BinaryNode {
	
	constructor(value) {
		this.value = value;
	}
}

const tree = new BinaryTree();
tree.add(3);
tree.add(1);
tree.add(5);
tree.add(2);
tree.add(4);
tree.add(7);
tree.add(8);
tree.add(6);

assertEquals('3,1,2,5,4,7,6,8', tree.preorderTraversal().toString());

tree.remove(8);

assertEquals('3,1,2,5,4,7,6', tree.preorderTraversal().toString());

tree.remove(2);

assertEquals('3,1,5,4,7,6', tree.preorderTraversal().toString());

tree.remove(3);

assertEquals('3,1,5,4,7,6', tree.preorderTraversal().toString());


function assertEquals(expected, actual) {
	if (expected !== actual) {
		throw new Error('Expected ' + expected + ', got ' + actual);
	}
}