/** @module
 * @file Event controllers.
 * @requires ../Utils/format.js
 * @requires ../Utils/valid.js
 * @copyright zjwpeter 2014-2015 <zjwpeter@gmail.com>
 * @license GPL-3.0+
 */

require("../Utils/format.js");
var vaild = require("../Utils/vaild.js");

// TODO: Deprecate this.
function console_red(a,b){
    console.error("\x1B[31m", a, b, "\x1B[39m");
}

/** Event Pool. @private */
var pool = {};
/** Event Flags. @static
* Please follow the `Event.flags.Module_Name.Flag_Name` scheme. */
var flags = {};

/**
* Suscribes for a event.
*
* @param {string} name - Event Name.
* @param {string} fKey - Function name key.
* @param {function} fn - The function to execute in publish.
* @throws {TypeError}    All type mismatch.
*/
function on(name, fnName, fn){
    if(!vaild(name, String)){
        console_red("Event.on: name is not a String:", name);
        throw new TypeError("name is not a String");
    }
    if(!vaild(fKey, String)){
        console_red("Event.on: fKey is not a String:", fKey);
        throw new TypeError("fKey is not a String");
    }
    if(!vaild(fn, Function)){
        console_red("Event.on: fn is not a Function:", fn);
        throw new TypeError("fn is not a Function");
    }
    // Finally adds the stuffs to the pool.
    if(!pool[name]){
        pool[name] = {};
    }
    pool[name][fnName] = fn;
}

/**
* Publishs a event.
*
* @param {string} name - Event Name.
* @param {string} args - Argument to pass to each function.
* @param         _this - The `this` context for the functions.
* @throws {TypeError}    All type mismatch.
* @throws Everything thrown by event processors.
*/
function publish(name, args, _this){
    if(!vaild(name, String)){
        console_red("Event.publish: name is not a String:", name);
        throw new TypeError("name is not a String");
    }
    if(!(vaild(args, Array) || vaild(args, "undefined"))){
        console_red("Event.publish: agrs is not a Array:", args);
        throw new TypeError("args is not a Array");
    }
    // Checks for the existance
    if(!vaild(pool[name], Object)){
        console.warn("[Event/Event.js] 事件发布：没有名为%1的事件".format(name));
        return;
    }
    for(var i in pool[name]){
        _this = _this ? null : _this;
        pool[name][i].apply(_this, args);
    }
}

/**
* Cancels subscrption
*
* @param {string} name - Event Name.
* @param {string} fKey - Function name key.
* @throws {TypeError}    All type mismatch.
* @return {Boolean}      False on failure (e.g. non-exist) and otherwise true.
*/
function cancel(name, fKey){
    if(!vaild(name, String)){
        console_red("Event.cancel: name is not a String:", name);
        throw new TypeError("name is not a String");
    }
    if(!vaild(fKey, String)){
        console_red("Event.cancel: fnName is not a String:", fKey);
        throw new TypeError("fKey is not a String");
    }
    // Real stuff
    try{
        return delete pool[name][fKey];
    }catch(e){
        return false;
    }
}
module.exports = {
    on: on,
    publish: publish,
    cancel: cancel,
    flags: flags
}
