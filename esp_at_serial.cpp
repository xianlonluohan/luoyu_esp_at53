#include <string>

#include "MicroBit.h"
#include "MicroBitSerial.h"
#include "pxt.h"

using namespace pxt;

namespace emakefun {
/**
 * Read a single byte from the serial port
 * @returns Read bytes, if there is no data, return -1
 */
//%
int readSerialByte() {
  if (uBit.serial.isReadable()) {
    return uBit.serial.getc();
  }
  return -1;
}

/**
 * Get the current buffer data length
 * @returns Current buffer data length
 */
//%
int available() {
  return uBit.serial.getRxBufferSize();
}
}  // namespace emakefun