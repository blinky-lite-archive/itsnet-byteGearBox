var ByteGearBox = require('./byteGearBox/byteGearBox.js');
var ByteGear = require("./byteGearBox/byteGear.js");

ByteGearBox.getByteGearBoxFromUrl('https://aig.esss.lu.se:8443/IceCubeDeviceProtocols/gearbox/klyPlcProtoAio.json', handleJsonData);
//ByteGearBox.getByteGearBoxFromFile('./klyPlcProtoAio.json', handleJsonData);

function handleJsonData(byteGearBox)
{
//  console.log(ByteGearBox.getByteGear('KLY_IP_ISn_Current', byteGearBox));
  
//  console.log(ByteGear.getReadByteTooth("LOLO", ByteGearBox.getByteGear('KLY_IP_ISn_Current', byteGearBox)).toothType);
  ByteGearBox.printWriteData(byteGearBox);

}

