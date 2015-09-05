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
var event = require("../../Event/Event.js");

var flag = event.flags.Physics_Time = {
    Time_Paused: Math.random().toString(),
    Time_Resumed: Math.random().toString(),
    Time_Pause_Status_Changed: Math.random().toString()
}

//时间是否暂停
var ifTimePaused = false;

//从世界被建立开始经过的时间总数
var tick = 0;

module.exports = {
    //获取和设置Time的暂停状态
    get pause(){return ifTimePaused;},
    set pause(val){
        ifTimePaused = !!val;
        event.publish(flag.Time_Pause_Status_Changed, [!!val]);
    },

    //获取和设置Time的Tick数
    get tick(){return tick;},
    set tick(val){
        
    }
}
