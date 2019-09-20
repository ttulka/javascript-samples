class BinaryTree {
	
	constructor(...arr) {
		arr.forEach(x => this.add(x));
	}
		
	add(value) {
		this.root = addTo(value, this.root);
		return this;
		
		function addTo(value, node) {
			if (!node) {
				return new BinaryNode(value);
			}
			
			if (value > node.value) {
				node.right = addTo(value, node.right);
			} else {
				node.left = addTo(value, node.left);
			}
			return node;
		}
	}
	
	remove(value) {
		this.root = removeFrom(value, this.root);
		return this;
	
		function removeFrom(value, node) {
			if (!node) {
				return null;
			}
			if (node.value === value) {
			  return removeAndRewindNode(value, node);      
			
			} else if (value > node.value) {
				node.right = removeFrom(value, node.right);
				
			} else {
				node.left = removeFrom(value, node.left);
			}		
			return node;
		}
		
		function removeAndRewindNode(value, node) {
			if (node.left && node.right) {
				if (hasOnlyLeafs(node)) {
					node.value = node.right.value;
					node.right = null;
					return node;
				}			
				const parentOfMax = maxParentNode(node.left);
				if (parentOfMax) {
					node.value = parentOfMax.right.value;
					parentOfMax.right = parentOfMax.right.left;
					return node;
				}
				const parentOfMin = minParentNode(node.right);
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
		
		function hasOnlyLeafs(node) {
			return (!node.left || isLeaf(node.left)) && (!node.right || isLeaf(node.right));
		}
		
		function isLeaf(node) {
			return !node.left && !node.right;
		}
	
		function maxParentNode(root) {
			return isLeaf(root)
				? null
				: isLeaf(root)
					? root 
					: root.right
						? maxParentNode(root.right)
						: maxParentNode(root.left);
		}
		
		function minParentNode(root) {
			return isLeaf(root)
				? null
				: isLeaf(root.left)
					? root 
					: root.left
						? maxParentNode(root.left)
						: maxParentNode(root.right);
		}
	}
	
	preorderTraversal() {
		return preorder(this.root);
	
		function preorder(node) {
			return node
				? [node.value, 
				   ...preorder(node.left), 
				   ...preorder(node.right)
				  ]
				: [];
		}
	}
	
	inorderTraversal() {
		return inorder(this.root);
	
		function inorder(node) {
			return node
				? [...inorder(node.left), 
				   node.value, 
				   ...inorder(node.right)
				  ]
				: [];
		}
	}
	
	isBalanced() {		
		return checkHeight(this.root) != Infinity;
		
		function checkHeight(root) {
			if (!root) return -1;
			
			const leftHeight = checkHeight(root.left);
			if (leftHeight === Infinity) return Infinity; // Pass error up
			
			const rightHeight = checkHeight(root.right);
			if (rightHeight === Infinity) return Infinity; // Pass error up
			
			if (Math.abs(leftHeight - rightHeight) > 1) {
				return Infinity; // Found error -> pass it back
			} else {
				return Math.max(leftHeight, rightHeight) + 1;
			}
		}
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

function minimalTree(...sortedArr) {
	const tree = new BinaryTree();
	fill(tree, sortedArr, 0, sortedArr.length);
	return tree;
	
	function fill(tree, arr, l, r) {
		if (l < r) {
			const m = Math.floor((r - l) / 2 + l);
			tree.add(arr[m]);
		
			fill(tree, arr, l, m);
			fill(tree, arr, m + 1, r);
		}
	}
}

assertEquals('3,1,2,5,4,7,6,8', sampleTree().preorderTraversal().toString());
assertEquals('1,2,3,4,5,6,7,8', sampleTree().inorderTraversal().toString());

assertEquals('3,2,5,4,7,6,8', sampleTree().remove(1).preorderTraversal().toString());
assertEquals('3,1,5,4,7,6,8', sampleTree().remove(2).preorderTraversal().toString());
assertEquals('4,1,2,5,7,6,8', sampleTree().remove(3).preorderTraversal().toString());
assertEquals('3,1,2,5,7,6,8', sampleTree().remove(4).preorderTraversal().toString());
assertEquals('3,1,2,6,4,7,8', sampleTree().remove(5).preorderTraversal().toString());
assertEquals('3,1,2,5,4,7,8', sampleTree().remove(6).preorderTraversal().toString());
assertEquals('3,1,2,5,4,8,6', sampleTree().remove(7).preorderTraversal().toString());
assertEquals('3,1,2,5,4,7,6', sampleTree().remove(8).preorderTraversal().toString());

assertEquals('3,2,1,5,4', minimalTree(1,2,3,4,5).preorderTraversal().toString());
assertEquals('5,3,2,1,4,7,6,8', minimalTree(1,2,3,4,5,6,7,8).preorderTraversal().toString());

assertEquals(true, new BinaryTree(1).isBalanced());
assertEquals(true, new BinaryTree(1,2).isBalanced());
assertEquals(false, new BinaryTree(1,2,3).isBalanced());
assertEquals(false, new BinaryTree(1,2,3,4,5).isBalanced());
assertEquals(false, new BinaryTree(3,2,1).isBalanced());
assertEquals(false, new BinaryTree(5,4,3,2,1).isBalanced());
assertEquals(true, minimalTree(1,2,3,4,5).isBalanced());
assertEquals(true, minimalTree(1,2,3,4,5,6,7,8).isBalanced());

function sampleTree() {
	return new BinaryTree(3,1,5,2,4,7,8,6);
}

function assertEquals(expected, actual) {
	console.assert(expected === actual, 'Expected ' + expected + ', got ' + actual);
}