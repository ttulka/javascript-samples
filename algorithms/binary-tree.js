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
    }    
    if (node.right.value === value) {
			node.right = this.removeAndRewindNode(value, node.right);
			
		} else if (node.left.value === value) {
			node.left = this.removeAndRewindNode(value, node.left);
			
		} else if (value > node.value) {
			this.removeFrom(value, node.right);
			
		} else {
			this.removeFrom(value, node.left);
		}		
		return node;
	}
	
	removeAndRewindNode(value, node) {
		if (node.left && node.right) {
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
	
	maxParentNode(root) {
		return !root.right
      ? null
      : (root.right.right
        ? this.maxParentNode(root.right)
        : root);
	}
	
	minParentNode(root) {
		return !root.left
      ? null
      : (root.left.left
        ? this.minParentNode(root.left)
        : root);
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

const tree = generatedTree();

assertEquals('3,1,2,5,4,7,6,8', tree.preorderTraversal().toString());
assertEquals('3,1,2,5,4,7,6', tree.remove(8).preorderTraversal().toString());
assertEquals('3,1,5,4,7,6', tree.remove(2).preorderTraversal().toString());
assertEquals('3,1,6,4,7', tree.remove(5).preorderTraversal().toString());
assertEquals('4,1,6,7', tree.remove(3).preorderTraversal().toString());

assertEquals('2,1,5,4,7,6,8', generatedTree().remove(3).preorderTraversal().toString());

assertEquals('2,1,5,4,7,6,8', generatedTree().remove(3).preorderTraversal().toString());

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