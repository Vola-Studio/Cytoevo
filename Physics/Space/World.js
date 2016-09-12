import Block from './Block.js'
let world = null

function WorldGenerator({x, y}) {
	world = []
	
	for (let i = 0; i < x; i++) {
		var thisLine = []
		for (let j = 0; j < y; j++) {
			thisLine.push(new Block({x: i, y: j}))
		}
		world.push(thisLine)
	}
}

export default {
	generator: WorldGenerator,
	getWorld: () => world,
	getBlock: (x, y) => world[x] ? (world[x][y] || null) : null
}
