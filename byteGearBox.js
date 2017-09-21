var request = require('request');
var fs = require('fs');

exports.getGearBoxByteData = function(int8Array, byteGearBox, getRead)
{
  for (var ii = 0; ii < byteGearBox.byteGears.length; ++ii )
  {
    var toothList;
    var byteOff;
    if (getRead)
    {
      toothList = byteGearBox.byteGears[ii].readToothList;
      byteOff = byteGearBox.byteGears[ii].readByteOff;
    }
    else
    {
      toothList = byteGearBox.byteGears[ii].writeToothList;
      byteOff = byteGearBox.byteGears[ii].writeByteOff;
    }
    for (var ij = 0; ij <  toothList.length; ++ij)
      getGearBoxByteToothByteArray(int8Array, byteOff, toothList[ij]);
  }
};
exports.setGearBoxValues = function(int8Array, byteGearBox, setRead)
{
  for (var ii = 0; ii < byteGearBox.byteGears.length; ++ii )
  {
    var toothList;
    var byteOff;
    if (setRead)
    {
      toothList = byteGearBox.byteGears[ii].readToothList;
      byteOff = byteGearBox.byteGears[ii].readByteOff;
    }
    else
    {
      toothList = byteGearBox.byteGears[ii].writeToothList;
      byteOff = byteGearBox.byteGears[ii].writeByteOff;
    }
    for (var ij = 0; ij <  toothList.length; ++ij)
      setGearBoxByteToothData(int8Array, byteOff, toothList[ij]);
  }
};
exports.getGearBoxByteGear = function(name, byteGearBox)
{
  for (var ii = 0; ii < byteGearBox.byteGears.length; ++ii )
    if (byteGearBox.byteGears[ii].name == name) return byteGearBox.byteGears[ii];
  throw name + ' not found';
};
exports.getGearBoxByteTooth = function(name, byteGear, getRead)
{
    var toothList;
    if (getRead)
    {
      toothList = byteGear.readToothList;
    }
    else
    {
      toothList = byteGear.writeToothList;
    }
  for (var ii = 0; ii <  toothList.length; ++ii)
    if ( toothList[ii].name == name) return toothList[ii];
  throw name + ' not found';
};
exports.printGearBoxData = function(byteGearBox, printRead)
{
  var byteLength;
  var byteLengthLabel;
  if (printRead)
  {
    byteLength = byteGearBox.readByteLength;
    byteLengthLabel = " readByteLength = ";
  }
  else
  {
    byteLength = byteGearBox.writeByteLength;
    byteLengthLabel = " writeByteLength = ";
  }
  console.log("broker = " + byteGearBox.broker + " topic = " + byteGearBox.topic + byteLengthLabel + byteLength);
  for (var ii = 0; ii < byteGearBox.byteGears.length; ++ii )
  {
    var toothList;
    var byteOff;
    var byteOffLabel;
    if (printRead)
    {
      toothList = byteGearBox.byteGears[ii].readToothList;
      byteOff = byteGearBox.byteGears[ii].readByteOff;
      byteOffLabel = " readByteOff = ";
    }
    else
    {
      toothList = byteGearBox.byteGears[ii].writeToothList;
      byteOff = byteGearBox.byteGears[ii].writeByteOff;
      byteOffLabel = " writeByteOff = ";
    }
    console.log('\t' + "Name = " + byteGearBox.byteGears[ii].name + byteOffLabel + byteOff);
    for (var ij = 0; ij <  toothList.length; ++ij)
      console.log('\t' + '\t' + "name = " + toothList[ij]['name'] + "\t" + "type = " + toothList[ij]['toothType'] + "\t" + "bitOff = " + toothList[ij]['bitOff'] + "\t" + "byteOff = " + toothList[ij]['byteOff'] + "\t" + "value = " + toothList[ij]['value']);
  }
};
function setGearBoxByteToothData(int8Array, byteGearOffset, byteToothJson)
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
}
function getGearBoxByteToothByteArray(int8Array, byteGearOffset, byteToothJson)
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
}

exports.getByteGearBoxFromUrl = function(gearBoxUrl, callback)
{
  var options = 
  {
    method: 'post',
    body: {},
    json: true,
    url: gearBoxUrl
  };
  request(options, 
  function (err, res, body) 
  {  
    if (err) 
    {
      console.error('error posting json: ', err);
      throw err;
    }
    callback(body);
  });
};
exports.getByteGearBoxFromFile = function(filePath, callback)
{
  fs.readFile(filePath, 
  function(err, data)
  {
    if (err) throw err;
    callback(JSON.parse(data));
  });
};


var byteToothJson = {
    'name':'bname',
    'description':'bdescription',
    'toothType':'DOUBLE',
    'byteOff':0,
    'bitOff':0,
    'writeable':false,
    'value':'2.0'};
console.log('\t' + '\t' + "name = " + byteToothJson['name'] + "\t" + "type = " + byteToothJson['toothType'] + "\t" + "bitOff = " + byteToothJson['bitOff'] + "\t" + "byteOff = " + byteToothJson['byteOff'] + "\t" + "value = " + byteToothJson['value']);

var buffer = new ArrayBuffer(8);
var int8View = new Int8Array(buffer);

getGearBoxByteToothByteArray(int8View, 0, byteToothJson);
console.log(int8View);

int8View[0] = 24;
int8View[1] = 45;
int8View[2] = 68;
int8View[3] = 84;
int8View[4] = -5;
int8View[5] = 33;
int8View[6] = 9;
int8View[7] = 64;
setGearBoxByteToothData(int8View, 0, byteToothJson);
console.log('\t' + '\t' + "name = " + byteToothJson['name'] + "\t" + "type = " + byteToothJson['toothType'] + "\t" + "bitOff = " + byteToothJson['bitOff'] + "\t" + "byteOff = " + byteToothJson['byteOff'] + "\t" + "value = " + byteToothJson['value']);
console.log(JSON.stringify(byteToothJson));
