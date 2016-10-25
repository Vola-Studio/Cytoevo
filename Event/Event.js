let symbs = {_: Symbol()}
let anonymous = Symbol()
let sets = {
	shouldHave: symb => sets[symb] = sets[symb] || {[anonymous]: []}
}

let center = new class EventCenter{
	when (symb, fn, fnName = Symbol()) {
		if (Array.isArray(symb)) 
			return symb.map(v => this.when(v, fn, fnName))

		sets.shouldHave(symb)

		if(fnName.constructor === Symbol) {
			sets[symb][anonymous].push(fn)
			return sets[symb][anonymous].length - 1
		}
		else sets[symb][fnName] = fn
	}
	once (symb, fn) {
		let promFn
		let prom = new Promise((resolve, reject) => promFn = {resolve, reject})
		sets.shouldHave(symb)
		let fnName = this.when(symb, function (event) {
			let r = pub(fn, event)
			!(r instanceof Error) ? promFn.resolve(r) : promFn.reject(e)
			this.remove(symb, fnName)
		})
		return prom
	}
	remove (symb, fnName) {
		sets.shouldHave(symb)
		if(Number.isInterger(fnName)) delete sets[symb][anonymous][length]
		else delete sets[symb][fnName]
	}
}

function pub (fn, env) {
	if (fn instanceof Function) try {
		return fn.bind(env)(env, ...env.data)
	} catch (e) {
		return e
	}
}

class Event {
	constructor (symb, ...data) {
		// Todo: this.tick = now time
		this.data = data
		this.symb = symb
	}
	dispatch () {
		let set = sets[this.symb]
		if (!set) return false

		let cancel = false
		this.prevent = () => cancel = false
		debugger

		for (let name in set) cancel || pub(set[name], this)
		set[anonymous].forEach(f => cancel || pub(f, this))
	}
}
Event.when = center.when.bind(center)
Event.once = center.once.bind(center)
Event.remove = center.once.bind(center)

export default {Event, Symbs: symbs}