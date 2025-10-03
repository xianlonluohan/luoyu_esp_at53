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
 * Read a single byte from the serial port
 * @returns Read bytes, if there is no data, return -1
 */
//%
int readSerialByte() {
  if (getMicroBit()->serial.isReadable()) {
    return getMicroBit()->serial.getc();
  }
  return -1;
}

/**
 * Get the current buffer data length
 * @returns Current buffer data length
 */
//%
int available() {
  return getMicroBit()->serial.getRxBufferSize();
}
}  // namespace emakefun