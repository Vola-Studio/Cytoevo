/** @module */

/** Formats the string.
 * @param  Arguments that are tostring-able.
 * @return Formatted string.
 * @see    http://stackoverflow.com/questions/610406/
 */
String.prototype.format = function(){
    return this.replace(/%1/, arguments[0])
        .replace(/%2/, arguments[1])
        .replace(/%3/, arguments[2])
        .replace(/%4/, arguments[3])
        .replace(/%5/, arguments[4])
        .replace(/%6/, arguments[5])
        .replace(/%7/, arguments[6])
        .replace(/%8/, arguments[7])
        .replace(/%9/, arguments[8]);
}
