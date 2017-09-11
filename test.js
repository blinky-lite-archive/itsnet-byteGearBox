var ByteTooth = require("./byteTooth.js");
var byteToothJson = {
    'name':'bname',
    'description':'bdescription',
    'toothType':'DOUBLE',
    'byteOff':0,
    'bitOff':0,
    'writeable':false,
    'value':'2.0'};
console.log(ByteTooth.printTable(byteToothJson));

var buffer = new ArrayBuffer(8);
var int8View = new Int8Array(buffer);

ByteTooth.setByteArrayFromByteTooth(int8View, 0, byteToothJson);
console.log(int8View);

int8View[0] = 24;
int8View[1] = 45;
int8View[2] = 68;
int8View[3] = 84;
int8View[4] = -5;
int8View[5] = 33;
int8View[6] = 9;
int8View[7] = 64;
ByteTooth.setByteToothFromByteArray(int8View, 0, byteToothJson);
console.log(ByteTooth.printTable(byteToothJson));
console.log(JSON.stringify(byteToothJson));

