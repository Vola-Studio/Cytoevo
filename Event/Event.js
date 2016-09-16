let symbs = {_: Symbol()}
let anonymous = Symbol()
let sets = {
	shouldHave: symb => sets[symb] = sets[symb] || {[anonymous]: []}
}

let center = new class {
	when (symb, fn, fnName = Symbol()) {
		sets.shouldHave(symb)
		if(fnName.constructor === Symbol) {
			sets[symb][anonymous].push(fn)
			return sets[symb][anonymous].length - 1
		}
		else {
			sets[symb][fnName] = fn
		}
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
		if(Number.isInterger(fnName)) sets[symb][anonymous][length] = undefined
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

let start = center.once(symbs._, (e, d) => console.log('Event init: ' + d))
new Event(symbs._, Date()).dispatch()