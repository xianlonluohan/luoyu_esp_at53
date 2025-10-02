#include <string>

#include "MicroBit.h"
#include "MicroBitSerial.h"
#include "pxt.h"

using namespace pxt;

MicroBit* getMicroBit() {
  return &uBit;
}

namespace emakefun {
/**
 * 从串口读取单个字节（非阻塞）
 * @returns 读取到的字节，如果没有数据返回-1
 */
//%
int readSerialByte() {
  if (getMicroBit()->serial.isReadable()) {
    return getMicroBit()->serial.getc();
  }
  return -1;
}

/**
 * 获取串口可读字节数
 * @returns 可读字节数
 */
//%
int availableBytes() {
  // MicroBitSerial 没有直接的方法获取可读字节数
  // 我们可以通过尝试读取来判断
  return getMicroBit()->serial.isReadable() ? 1 : 0;
}
}  // namespace emakefun