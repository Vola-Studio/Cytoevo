/* Block 生成单位的类
 *
 * Block(opt) [private] 生成一个单位
 * 参数:
 * new Block(Object opt{
 *     unsigned int x,
 *     unsigned int y
 * })
 *
 * 抛出错误:
 * CallError: Call as a function
 *     请使用new关键字操作
 * TypeError: opt.x is not a unsigned int
 * TypeError: opt.y is not a unsigned int
 *     x和y应该是大于等于0的整数
 */
var vaild = require("../../Utils/vaild.js");
function Block(opt){
    //TODO Check Call as function
    if(!vaild(opt.x, "unsigned int")){
        console.log("\x1B[31mBlock: opt.x:", opt.x, "is not unsigned int\x1B[39m");
        throw "TypeError: opt.x is not a unsigned int";
    }
    if(!vaild(opt.y, "unsigned int")){
        console.log("\x1B[31mBlock: opt.y:", opt.y, "is not unsigned int\x1B[39m");
        throw "TypeError: opt.y is not a unsigned int";
    }


    this.x = opt.x;
    this.y = opt.y;
    this.biomes = [,,,];

    //TODO 对此单位分配物质
    //TODO 对此单位分配能量
        //TODO 根据能量对此单位设定温度
    
}

module.exports = Block;
