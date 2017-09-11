exports.setByteToothData = function(int8Array, byteGearOffset, byteToothJson)
{
    var offset = byteGearOffset + byteToothJson['byteOff'];
    switch(byteToothJson['toothType']) 
    {
        case "BOOLEAN":
            byteToothJson['value'] = "FALSE";
            if (((int8Array[offset] >> byteToothJson['bitOff']) & 1) > 0) byteToothJson['value'] = "TRUE";
            break;
        case "FLOAT":
            var buffer = new ArrayBuffer(4);
            var barr = new Int8Array(buffer);
            var floatView = new Float32Array(buffer);
            for (var ii = 0; ii < 4; ++ii) barr[ii] = int8Array[ii + offset];
            byteToothJson['value'] = floatView.toString();
            break;
        case "BYTE":
            byteToothJson['value'] = int8Array[offset].toString();
            break;
        case "SHORT":
            buffer = new ArrayBuffer(2);
            barr = new Int8Array(buffer);
            var intView = new Int16Array(buffer);
            for (var ii = 0; ii < 2; ++ii) barr[ii] = int8Array[ii + offset];
            byteToothJson['value'] = intView.toString();
            break;
        case "INT":
            buffer = new ArrayBuffer(4);
            barr = new Int8Array(buffer);
            intView = new Int32Array(buffer);
            for (var ii = 0; ii < 4; ++ii) barr[ii] = int8Array[ii + offset];
            byteToothJson['value'] = intView.toString();
            break;
        case "DOUBLE":
            buffer = new ArrayBuffer(8);
            barr = new Int8Array(buffer);
            var doubleView = new Float64Array(buffer);
            for (var ii = 0; ii < 8; ++ii) barr[ii] = int8Array[ii + offset];
            byteToothJson['value'] = doubleView.toString();
            break;
        case "S7DT":
            this.jsonObj['value'] = "S7DT";
            break;
       default:
            break;
    }    
};
exports.getByteArray = function(int8Array, byteGearOffset, byteToothJson)
{
    var offset = byteGearOffset + byteToothJson['byteOff'];
    switch(byteToothJson['toothType']) 
    {
        case "BOOLEAN":
            if (byteToothJson['value'] == "TRUE")
            {
                int8Array[offset] |= 1 << byteToothJson['bitOff'];
            }
            else
            {
               int8Array[offset] &= ~(1 << byteToothJson['bitOff']);
            }
            break;
        case "FLOAT":
            var farr = new Float32Array(1);
            farr[0] = Number(byteToothJson['value']);
            var barr = new Int8Array(farr.buffer);
            for (var ii = 0; ii < 4; ++ii) int8Array[ii + offset] = barr[ii];
            break;
        case "BYTE":
            int8Array[offset] = Number(byteToothJson['value']);
            break;
        case "SHORT":
            var iarr = new Int16Array(1);
            iarr[0] = Number(byteToothJson['value']);
            barr = new Int8Array(iarr.buffer);
            for (var ii = 0; ii < 2; ++ii) int8Array[ii + offset] = barr[ii];
            break;
        case "INT":
            iarr = new Int32Array(1);
            iarr[0] = Number(byteToothJson['value']);
            barr = new Int8Array(iarr.buffer);
            for (var ii = 0; ii < 4; ++ii) int8Array[ii + offset] = barr[ii];
            break;
        case "DOUBLE":
            var darr = new Float64Array(1);
            darr[0] = Number(byteToothJson['value']);
            barr = new Int8Array(darr.buffer);
            for (var ii = 0; ii < 8; ++ii) int8Array[ii + offset] = barr[ii];
            break;
        case "S7DT":
            break;
       default:
            break;
    }    
};
exports.printTable = function(byteToothJson)
{
    console.log('\t' + '\t' + "name = " + byteToothJson['name'] + "\t" + "type = " + byteToothJson['toothType'] + "\t" + "bitOff = " + byteToothJson['bitOff'] + "\t" + "byteOff = " + byteToothJson['byteOff'] + "\t" + "value = " + byteToothJson['value']);
};
