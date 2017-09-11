var ByteTooth = require("./byteTooth.js");

exports.getReadByteTooth = function(name, byteGear)
{
  for (var ii = 0; ii <  byteGear.readToothList.length; ++ii)
    if ( byteGear.readToothList[ii].name == name) return byteGear.readToothList[ii];
  throw name + ' not found';
};
exports.getWriteByteTooth = function(name, byteGear)
{
  var writeToothList = byteGear['writeToothList'];
  return  writeToothList[name];
};
exports.getReadByteData = function(int8Array, byteGear)
{
  for (var ii = 0; ii <  byteGear.readToothList.length; ++ii)
      ByteTooth.getByteArray(int8Array, byteGear.readByteOff, byteGear.readToothList[ii]);
};
exports.getWriteByteData = function(int8Array, byteGear)
{
  for (var ii = 0; ii <  byteGear.writeToothList.length; ++ii)
      ByteTooth.getByteArray(int8Array, byteGear.writeByteOff, byteGear.writeToothList[ii]);
};
exports.setGearReadData = function(int8Array, byteGear)
{
  for (var ii = 0; ii <  byteGear.readToothList.length; ++ii)
      ByteTooth.setByteToothData(int8Array, byteGear.readByteOff, byteGear.readToothList[ii]);
};
exports.setGearWriteData = function(int8Array, byteGear)
{
  for (var ii = 0; ii <  byteGear.writeToothList.length; ++ii)
      ByteTooth.setByteToothData(int8Array, byteGear.writeByteOff, byteGear.writeToothList[ii]);
};
exports.printReadData = function(byteGear)
{
  console.log('\t' + "Name = " + byteGear.name + " readByteOff = " + byteGear.readByteOff);
  for (var ii = 0; ii <  byteGear.readToothList.length; ++ii)
    ByteTooth.printTable(byteGear.readToothList[ii]);
};
exports.printWriteData = function(byteGear)
{
  console.log('\t' + "Name = " + byteGear.name + " writeByteOff = " + byteGear.writeByteOff);
  for (var ii = 0; ii <  byteGear.writeToothList.length; ++ii)
    ByteTooth.printTable(byteGear.writeToothList[ii]);
};

