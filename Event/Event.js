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
 * Event.publish(String name, Array args*, Object _this*)
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
var pool = {};
//事件订阅器
function on(name, fnName, fn){
    if(!(pool[name] instanceof Object)){
        pool[name] = {};
    }
    pool[name][fnName] = fn;
}
//事件发布器
function publish(name, args, _this){
    if(!(pool[name] instanceof Object)){
        console.warn("[Event/Event.js] 事件发布：没有名为%1的事件".format(name));
        return;
    }
    for(var i in pool[name]){
        _this = _this ? null : _this;
        pool[name][i].apply(_this, args);
    }
}
function cancel(name, fnName){
    try{
        return delete pool[name][fnName];
    }catch(e){
        return false;
    }
}
