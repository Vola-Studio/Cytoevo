/* Time 时间模块
 * 
 * bool Time.pause [get] 当前是否暂停
 *
 * * Time.pause [set] 设置暂停状态 传入值会被!!转换为bool类型
 *
 * int Time.tick [get] 当前时间
 * 
 * void Time.tick [set] 设置时间 传入任何值都会报错
 *
 * Time_Pause_Status_Changed [Event] [bool ifRunning]
 *     当暂停状态改变时产生的事件
 *     bool ifRunning是时间在改变后的状态,true为正常
 */

//var event = require("../../Event/Event.js");

const flag = /*event.flags.Physics_Time =*/ {
	Time_Paused: symbol(),
	Time_Resumed: symbol(),
	Time_Pause_Status_Changed: symbol(),
}

class Time {
	constructor () {
		this.tick = 0
		this.pause = false
	}
	refresh () {return new Time()}
}

export default new Time()