const slice = (str, pat, acc) => {
	let len = pat.shift()
	if(undefined === len) return acc
	return slice(str.slice(len), pat, acc.concat(str.substring(0, len)))
}
function read(raw16){
	let first = slice(raw16, [4], [])[0]
	let nextPat
	if(first === '0000' || first === '0001') nextPat = [4, 4, 6, 2] // , query type, wanted value, operator
	else if (first === '1100' || first === '1110') nextPat = [4, 6] // type, eventName, _
	else if (first === '0010' || first === '0101' || first === '0110') nextPat = [4, 8, 4] // , ele id, ele num
	else nextPat = [4, 1]
	return slice(raw16, nextPat, [])
}
const saveFunction = (state, object) => {
	let [type, eventName, _] = state.lastFunction
	state.data.push('')
	object[type] = object[type] || {}
	object[type][eventName] = new Function(state.data.join(';'))
}
const funcType = pattern => ({'1100': 'out', '1110': 'in'}[pattern])
const eventType = a => a
const bin = x => parseInt(x, 2)

const compiler_v2_x16_helper = (raw, object) => 
	raw.match(/.{16}/g)
	.reduce((state, ges) => 
		read(ges).reduce((curriedPatternApply, pattern, index, array) => {
			if (0 == index) { // when index = 0, generate the curry function for each pattern
				switch (pattern) {
					case '1100':
					case '1110': return eventName => {
						if (state.lastFunction) saveFunction(state, object)
						state.lastFunction = [funcType(pattern), eventType(eventName)]
						state.data = []
						return ''
					}
					case '0010': return id => total => `this.generateEnergy(${bin(id)}, ${bin(total)})`
					case '0101': return id => total => `this.require(${bin(id)}, ${bin(total)})`
					case '0110': return id => total => `this.provide(${bin(id)}, ${bin(total)})`
					case '1001': return _ => 'this.divide()'
					case '0000':
					case '0001': return queryType => wantedValue => operator => `if(this.query(${bin(queryType)}, ${bin(wantedValue)}, ${operator}))`
					default:     return _ => ''
				}
			} else if (index == array.length - 1) {
				let val = curriedPatternApply(pattern)
				state.data.push(val)
				return state
			} else return curriedPatternApply(pattern)
		}, new Function())
	, {
		lastFunction: ['1110', 'now'],
		data: []
	})
class compiler_v2_x16 {
	constructor (code) {
		let _code
		Object.defineProperty(this, 'code', {get: function () {
			return _code
		}, set (value) {
			_code = value
			// TODO: 注册一个 N 轮后的事件
			//       触发后再重编译
			this.compiler()
		}})
		this.code = code
		this.bits = 16
		this.version = 2
	}
	compiler () {
		compiler_v2_x16_helper(this.code + '1100000000000000', this)
	}
}
export default compiler_v2_x16