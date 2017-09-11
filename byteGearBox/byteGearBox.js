var ByteGear = require('./byteGear.js');
var request = require('request');
var fs = require('fs');

exports.getReadByteData = function(int8Array, byteGearBox)
{
  for (var ii = 0; ii < byteGearBox.byteGears.length; ++ii )
    ByteGear.getReadByteData(int8Array, byteGearBox.byteGears[ii]);
};
exports.getWriteByteData = function(int8Array, byteGearBox)
{
  for (var ii = 0; ii < byteGearBox.byteGears.length; ++ii )
    ByteGear.getWriteByteData(int8Array, byteGearBox.byteGears[ii]);
};
exports.setGearBoxReadData = function(int8Array, byteGearBox)
{
  for (var ii = 0; ii < byteGearBox.byteGears.length; ++ii )
    ByteGear.setGearReadData(int8Array, byteGearBox.byteGears[ii]);
};
exports.setGearBoxWriteData = function(int8Array, byteGearBox)
{
  for (var ii = 0; ii < byteGearBox.byteGears.length; ++ii )
    ByteGear.setGearWriteData(int8Array, byteGearBox.byteGears[ii]);
};
exports.getByteGear = function(name, byteGearBox)
{
  for (var ii = 0; ii < byteGearBox.byteGears.length; ++ii )
    if (byteGearBox.byteGears[ii].name == name) return byteGearBox.byteGears[ii];
  throw name + ' not found';
};
exports.printReadData = function (byteGearBox)
{
  console.log("broker = " + byteGearBox.broker + " topic = " + byteGearBox.topic + " readByteLength = " + byteGearBox.readByteLength);
  for (var ii = 0; ii < byteGearBox.byteGears.length; ++ii )
    ByteGear.printReadData(byteGearBox.byteGears[ii]);
};
exports.printWriteData = function (byteGearBox)
{
  console.log("broker = " + byteGearBox.broker + " topic = " + byteGearBox.topic + " writeByteLength = " + byteGearBox.writeByteLength);
  for (var ii = 0; ii < byteGearBox.byteGears.length; ++ii )
    ByteGear.printWriteData(byteGearBox.byteGears[ii]);
};

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
