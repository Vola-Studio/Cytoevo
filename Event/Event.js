/* Event 事件中心
 * 
 * Event.on(name, fnName, fn) 订阅name事件，回调函数是名为fnName的fn
 * 参数:
 * Event.on(String name, String fnName, Function fn)
 * 
 * 抛出错误:
 * TypeError: name is not a String
 * TypeError: fnName is not a String
 * TypeError: fn is not a function
 *     name和fnName应该是字符串, fn应该是一个函数
 *
 * Event.publish(name, args, _this) 发布name事件
 * 参数:
 * Event.publish(String name, Array args*, * _this*)
 * 
 * 抛出错误:
 * TypeError: name is not a String
 * TypeError: args is not a Array
 *     name应该是字符串, args应该是数组或不提供
 *
 * Event.cancel(name, fnName) 根据订阅器名称取消订阅
 * 参数:
 * Event.cancel(String name, String fnName)
 * 
 * 抛出错误:
 * TypeError: name is not a String
 * TypeError: fnName is not a String
 *     name和fnName应该是字符串
 */
require("../Utils/format.js");
var vaild = require("../Utils/vaild.js");
function console_red(a,b){
    console.log("\x1B[31m", a, b, "\x1B[39m");
}
var pool = {};
//事件订阅器
function on(name, fnName, fn){
    if(!vaild(name, String)){
        console_red("Event.on: name is not a String:", name);
        throw "TypeError: name is not a String";
    }
    if(!vaild(fnName, String)){
        console_red("Event.on: fnName is not a String:", fnName);
        throw "TypeError: fnName is not a String";
    }
    if(!vaild(fn, Function)){
        console_red("Event.on: fn is not a Function:", fn);
        throw "TypeError: fn is not a Function";
    }
    //逻辑
    if(!pool[name]){
        pool[name] = {};
    }
    pool[name][fnName] = fn;
}
//事件发布器
function publish(name, args, _this){
    if(!vaild(name, String)){
        console_red("Event.publish: name is not a String:", name);
        throw "TypeError: name is not a String";
    }
    if(!(vaild(args, Array) || vaild(args, "undefined"))){
        console_red("Event.publish: agrs is not a Array:", fnName);
        throw "TypeError: args is not a Array";
    }
    //检查
    if(!vaild(pool[name], Object)){
        console.warn("[Event/Event.js] 事件发布：没有名为%1的事件".format(name));
        return;
    }
    for(var i in pool[name]){
        _this = _this ? null : _this;
        pool[name][i].apply(_this, args);
    }
}
function cancel(name, fnName){
    if(!vaild(name, String)){
        console_red("Event.cancel: name is not a String:", name);
        throw "TypeError: name is not a String";
    }
    if(!vaild(fnName, String)){
        console_red("Event.cancel: fnName is not a String:", fnName);
        throw "TypeError: fnName is not a String";
    }
    //逻辑
    try{
        return delete pool[name][fnName];
    }catch(e){
        return false;
    }
}
module.exports = {
    on: on,
    publish: publish,
    cancel: cancel
}
