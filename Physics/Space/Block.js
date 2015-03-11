/* Block 生成单位的类
 *
 * Block(opt) 生成一个单位
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
function Block(opt){
    //TODO 检查条件
    this.x = opt.x;
    this.y = opt.y;
    this.biomes = [,,,];

    //TODO 对此单位分配物质
    //TODO 对此单位分配能量
        //TODO 根据能量对此单位设定温度
    
}

exports = Block;
