/* String.prototype.format() 输出格式化字符串
 * 参数:
 * "".format(* data1, * data2, ...， * data9)
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
