/* Block 生成单位的类
 *
 * Block(opt) [private] 生成一个单位
 * 参数:
 * new Block(Object opt{
 *     unsigned int x,
 *     unsigned int y
 * })
 *
 */
function Block(opt){
    this.x = opt.x;
    this.y = opt.y;
    this.biomes = [,,,];

    //TODO 对此单位分配物质
    //TODO 对此单位分配能量
        //TODO 根据能量对此单位设定温度
    
}

module.exports = Block;
