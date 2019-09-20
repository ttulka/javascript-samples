class Graph {
	constructor(...nodes) {
		this.nodes = nodes;
		this.dependencies = new Map();
	}
	
	addDependency(node, dep) {
		if (!this.dependencies.has(node)) {
			this.dependencies.set(node, []);
		}
		this.dependencies.get(node).push(dep);
		return this;
	}
	
	toString() {
		return this.nodes
			.map(n => n + (this.dependencies.has(n) ? '[' + this.dependencies.get(n) + ']' : ''))
			.reduce((a,c) => a + ', ' + c);
	}
}

function sampleGraph() {
	const g = new Graph('a','b','c','d','e','f','g')
		.addDependency('f', 'a')
		.addDependency('f', 'b')
		.addDependency('f', 'c')
		.addDependency('c', 'a')
		.addDependency('b', 'a')
		.addDependency('b', 'e')
		.addDependency('a', 'e')
		.addDependency('d', 'g');	
	return g;
}

console.log(sampleGraph().toString());

function assertEquals(expected, actual) {
	console.assert(expected === actual, 'Expected ' + expected + ', got ' + actual);
}