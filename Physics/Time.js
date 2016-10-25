import {Event, Symbs, EventCenter} from '../../Event/Event.js'

Symbs.TimeEvent = {
	Paused: symbol(),
	Resumed: symbol(),
	PauseStatusChanged: symbol(),
}
let time

class Time {
	constructor () {
		this.tick = 0
		this.__pause__ = false
	}
	refresh () {
		time = new Time()
		return time
	}
	set pause (v) {
		if (v != this.___pause__)
			new Event(Symbs.TimeEvent[['Resumed', 'Paused'][v + 0]], !!v).dispatch()
	}
	get pause () {return this.__pause__}
}

time = new Time()

Event.when(
	[Symbs.TimeEvent.Paused,
	 Symbs.TimeEvent.Resumed
	],
	v => new Event(Symbs.TimeEvent.PauseStatusChanged, v).dispatch()
)

export default time