class BinaryTree {
		
	add(value) {
		this.root = this.addTo(value, this.root);
    return this;
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
		return this;
	}
	
	removeFrom(value, node) {
		if (!node) {
			return null;
		}
		if (node.value === value) {
		  return this.removeAndRewindNode(value, node);      
		
		} else if (value > node.value) {
			node.right = this.removeFrom(value, node.right);
			
		} else {
			node.left = this.removeFrom(value, node.left);
		}		
		return node;
	}
	
	removeAndRewindNode(value, node) {
		if (node.left && node.right) {
			if (this.hasOnlyLeafs(node)) {
				node.value = node.right.value;
				node.right = null;
				return node;
			}			
			const parentOfMax = this.maxParentNode(node.left);
			if (parentOfMax) {
				node.value = parentOfMax.right.value;
				parentOfMax.right = parentOfMax.right.left;
				return node;
			}
			const parentOfMin = this.minParentNode(node.right);
			if (parentOfMin) {
				node.value = parentOfMin.left.value;
				parentOfMin.left = parentOfMin.left.right;
				return node;
			}			
		}
		else if (node.left) {
			return node.left;
		}	
		else if (node.right) {
			return node.right;
		}	
		return null;
	}
		
	hasOnlyLeafs(node) {
		return (!node.left || this.isLeaf(node.left)) && (!node.right || this.isLeaf(node.right));
	}
	
	isLeaf(node) {
		return !node.left && !node.right;
	}
	
	maxParentNode(root) {
		return this.isLeaf(root)
			? null
			: this.isLeaf(root)
				? root 
				: root.right
					? this.maxParentNode(root.right)
					: this.maxParentNode(root.left);
	}
	
	minParentNode(root) {
		return this.isLeaf(root)
			? null
			: this.isLeaf(root.left)
				? root 
				: root.left
					? this.maxParentNode(root.left)
					: this.maxParentNode(root.right);
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
	
	toString() {
		return this.root ? this.root.toString() : '<>';
	}
}

class BinaryNode {
	
	constructor(value) {
		this.value = value;
	}
	
	toString() {
		return this.value
			+ (this.left || this.right 
				? '<' + (this.left ? 'L' + this.left.toString() : '') 
					  + (this.right ? 'R' + this.right.toString() : '') + '>'
				: ''
			  );
	}
}

assertEquals('3,1,2,5,4,7,6,8', generatedTree().preorderTraversal().toString());
assertEquals('3,2,5,4,7,6,8', generatedTree().remove(1).preorderTraversal().toString());
assertEquals('3,1,5,4,7,6,8', generatedTree().remove(2).preorderTraversal().toString());
assertEquals('4,1,2,5,7,6,8', generatedTree().remove(3).preorderTraversal().toString());
assertEquals('3,1,2,5,7,6,8', generatedTree().remove(4).preorderTraversal().toString());
assertEquals('3,1,2,6,4,7,8', generatedTree().remove(5).preorderTraversal().toString());
assertEquals('3,1,2,5,4,7,8', generatedTree().remove(6).preorderTraversal().toString());
assertEquals('3,1,2,5,4,8,6', generatedTree().remove(7).preorderTraversal().toString());
assertEquals('3,1,2,5,4,7,6', generatedTree().remove(8).preorderTraversal().toString());

function generatedTree() {
	return new BinaryTree()
		.add(3)
		.add(1)
		.add(5)
		.add(2)
		.add(4)
		.add(7)
		.add(8)
		.add(6);
}

function assertEquals(expected, actual) {
	if (expected !== actual) {
		throw new Error('Expected ' + expected + ', got ' + actual);
	}
}