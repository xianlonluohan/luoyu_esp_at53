// shims.d.ts
declare namespace emakefun {
    /**
    * 从串口读取单个字节
    * @returns 读取到的字节(0-255)，如果没有数据返回-1
    */
    //% shim=emakefun::readSerialByte
    //% blockHidden=true
    function readSerialByte(): number;

    /**
     * 获取串口可读字节数
     * @returns 可读字节数
     */
    //% shim=emakefun::availableBytes
    //% blockHidden=true
    function availableBytes(): number;
}