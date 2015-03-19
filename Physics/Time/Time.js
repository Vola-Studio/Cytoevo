/* Time 时间模块
 * 
 * bool Time.pause [get] 当前是否暂停
 *
 * * Time.pause [set] 设置暂停状态 传入值会被!!转换为bool类型
 *
 * int Time.tick [get] 当前时间
 * 
 * void Time.tick [set] 设置时间 传入任何值都会报错
 * 抛出错误:
 * You can't travel in time!
 *     该值不允许设置
 */
var vaild = require("../../Utils/vaild.js");
//时间是否暂停
var ifTimePaused = false;
//从世界被建立开始经过的时间总数
var tick = 0;

module.exports = {
    //获取和设置Time的暂停状态
    get pause(){return ifTimePaused;},
    set pause(val){ifTimePaused = !!val;},

    //获取和设置Time的Tick数
    get tick(){return tick;},
    set tick(val){
        throw "You can't travel in time!";
    }
}
