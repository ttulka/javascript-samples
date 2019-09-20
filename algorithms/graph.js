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
		const nodes = [...this.nodes];
		const deps = new Map(this.dependencies);
		
		while (true) {
			const n = nodes.find(n => !deps.has(n));
			if (!n) {
				break;
			}
			res.unshift(n);
			
			// remove the dependency
			nodes.splice(nodes.indexOf(n), 1);
			
			deps.forEach((v,k) => {
				if (v.includes(n)) {
					if (v.length === 1) {
						deps.delete(k);
					} else {
						v.splice(v.indexOf(n), 1);
						deps.set(k, v);
					}
				}
			});
		}				
		return res;
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

assertEquals('d,g,f,c,b,a,e', sampleGraph().dependenciesOrder().toString());

function assertEquals(expected, actual) {
	console.assert(expected === actual, 'Expected ' + expected + ', got ' + actual);
}