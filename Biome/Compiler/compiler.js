require("../../Utils/format.js");
function compiler_v1_x16(code){
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
            return "this.query($1, $2, $3);"
            .format(
                v(c, 4, 8),
                v(c, 8, 14),
                {"00": ">","01": "<","10": "=","11": "!"}[c.substring(14)]
             );
        //能量合成
        case "0010":
            return "this.energyMaker($1, $2);".format(matterID, matterNum);
        case "0101":
            return "this.getMatter($1, $2);".format(matterID, matterNum);
        case "0110":
            return "this.throwMatter($1, $2);".format(matterID, matterNum);
        case "1001":
            return "this.divide();";
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

            var code = Function(allLine);
            var fnName = eventName + importance;
            this.bin[type] = this.bin[type] ? this.bin[type] : {};
            this.bin[type][fnName] = code;
            return Function;
    }
    return "";
}
module.exports = compiler_v1_x16;
