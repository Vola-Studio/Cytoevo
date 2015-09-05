/** @module
 * @file Event controllers.
 * @requires ../Utils/format.js
 * @requires ../Utils/valid.js
 * @copyright zjwpeter 2014-2015 <zjwpeter@gmail.com>
 * @license GPL-3.0+
 */

require("../Utils/format.js");

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
