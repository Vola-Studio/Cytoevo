/* Event/Time.js 时间事件
 * 
 * Timer_Add_One [Event] 每过1tick发送一次的事件
 * Cycle_Changed [Event] [unsigned Number]
 *     时间每过1tick的长度变更
 *     该事件会提供参数[unsigned Number newCycle]
 *     newCycle是变更之后的新的长度,单位是毫秒
 */
var event = require("./Event.js");
var time = require("../Physics/Time/Time.js");
var cycle = 1000;

var flag = event.flags.Event_Time = {
    Timer_Add_One: Math.random().toString(),
    Cycle_Changed: Math.random().toString(),
    //Timer_Onchange: Math.random().toString(),
    //Binder_Changed_Publisher: Math.random().toString()
}

//在未被暂停时每cycle毫秒发布一次Timer_Add_One事件
setInterval(function (){
    if(!time.pause){
        event.publish(flag.Timer_Add_One);
    }
}, cycle);

//event.on(flag.Timer_Add_One, flag.Binder_Changed_Publisher, function(){
//    event.publish(flag.Timer_Onchange);
//});

module.exports = {
    get cycle(){return cycle;},
    set cycle(v){
        if(typeof v == "number" && isFinite(v) && v>=250){
            cycle = v;
            event.publish(flag.Cycle_Changed, [v]);
        }else{
            throw "Invaild time cycle number";
        }
    }
}
