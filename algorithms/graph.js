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
	
	dependenciesOrder() {
		const res = [];
		const deps = Array.from(this.dependencies.values())
			.reduce((a,c) => [...a,...c]);		
			
		this.nodes
			.filter(n => !deps.includes(n))	// nodes that are no dependencies
			.forEach(n => {
				addDependencies(n, this.dependencies, res);
				res.push(n);				
			});
		return res;
		
		function addDependencies(node, depsMap, res) {
			const deps = depsMap.get(node) || [];
			deps.forEach(d => {
				if (!res.includes(d)) {
					addDependencies(d, depsMap, res);
					res.push(d);
				}				
			});
		}
	}
	
	toString() {
		return this.nodes
			.map(n => n + (this.dependencies.has(n) ? '[' + this.dependencies.get(n) + ']' : ''))
			.reduce((a,c) => a + ', ' + c);
	}
}

function sampleGraph() {
	const g = new Graph('a','b','c','d','e','f','g','h')
		.addDependency('f', 'a')
		.addDependency('f', 'b')
		.addDependency('f', 'c')
		.addDependency('c', 'a')
		.addDependency('b', 'a')
		.addDependency('b', 'e')
		.addDependency('b', 'h')
		.addDependency('a', 'e')
		.addDependency('d', 'g');	
	return g;
}

console.log(sampleGraph().toString());

assertEquals('g,d,e,a,h,b,c,f', sampleGraph().dependenciesOrder().toString());

function assertEquals(expected, actual) {
	console.assert(expected === actual, 'Expected ' + expected + ', got ' + actual);
}