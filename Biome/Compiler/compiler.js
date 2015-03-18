/* GESCompiler Ges编译器
 * new compiler_v1_x16(code)
 * 参数:
 * new compiler_v1_x16((String bin) code)
 * 
 * 抛出错误:
 * TypeError: Code is not bin
 *     code 应该是由0和1组成的字符串
 * 
 * compiler_v1_x16.prototype.read() [private] 读取16位GES
 * 返回值:
 * String bin 16位由0和1组成的字符串
 * Object Function [compiler_v1_x16.functionEndSymbol]专用结束符号
 * 
 * compiler_v1_x16.compiler() 编译GES
 */
var vaild = require("../../Utils/vaild.js");
function compiler_v1_x16(code){
    if(!vaild(code, "bin")){
        console.log("\x1B[31mCompiler_v1_x16:", code," is not vaild code\x1B[39m");
        throw "TypeError: Code is not bin";
    };
    
    this.code = code;
    this.bits = 16;
    this.version = 1;
    this.point = 0;
    this.bin = {
        out: {},
        inside: {}
    };
}
//编译器内部用于标示函数结束的符号
compiler_v1_x16.functionEndSymbol = Function;

//GES读取器
compiler_v1_x16.prototype.read = function(){
    if(this.point + this.bits > this.code.length){
        //如果到底就返回endSymbol
        return compiler_v1_x16.functionEndSymbol;
    }
    var cmd = this.code.substring(this.point, this.point + this.bits);
    this.point += this.bits;
    return cmd;
}
compiler_v1_x16.getVal = function(c, s, t){
    return parseInt(c.substring(s, t),2);
}
compiler_v1_x16.prototype.compiler = function(){
    var c = this.read(), v = compiler_v1_x16.getVal;
    if(c == compiler_v1_x16.functionEndSymbol){
        return false;
    }
    var magicNum = c.substring(0, 4);
    var matterID = v(c, 4, 12), matterNum = v(c, 12, 16);
    switch (magicNum) {
        //3位 0-7
        //4位 0-15
        //5位 0-31
        //6位 0-63
        //8位 0-255
        //条件检查
        case "0000": case "0001": 
            return this.condChecker(
                v(c, 4, 8),v(c, 8, 14),
                {"00": ">","01": "<","10": "=","11": "!"}[c.substring(14)]
            );
        //能量合成
        case "0010":
            return this.energyMaker(matterID, matterNum);
        case "0101":
            return this.getMatter(matterID, matterNum);
        case "0110":
            return this.throwMatter(matterID, matterNum);
        case "1001":
            return this.muti();
        case "1100":
        case "1110":
            var type = { "1100": "outside", "1110": "inside" }[c.substring(0, 4)];
            var eventName = c.substring(4, 9);//5bits
            var importance = c.substring(9, 12);//3bits

            var allLine = "";//所有代码
            var thisLine = "";//当前行代码
            do {
                allLine += thisLine;
                thisLine = this.compiler();
            } while (thisLine != Function && thisLine);
            //do...while在遇到下一个1100/1110段前会一直this,compiler() 也就是说1110/1100是函数分隔符

            if(!this.read() == Function){
                this.point -= this.bits;
            }
            //当point所在位置已经是最后的函数了，将其指向前一段会将代码重新编译，然后将结果抛弃
            //但是如果最后一个函数是空函数，则会导致无限循环

            var code = Function(allLine);
            var fnName = eventName + importance;
            this.bin[type] = this.bin[type] ? this.bin[type] : {};
            this.bin[type][fnName] = code;
            return Function;
    }
    return "";
}
