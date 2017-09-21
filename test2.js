var ByteGearBox = require('./byteGearBox.js');

ByteGearBox.getByteGearBoxFromUrl('https://aig.esss.lu.se:8443/IceCubeDeviceProtocols/gearbox/klyPlcProtoAio.json', handleJsonData);
//ByteGearBox.getByteGearBoxFromFile('./klyPlcProtoAio.json', handleJsonData);

function handleJsonData(byteGearBox)
{
  console.log(ByteGearBox.getByteGear('KLY_IP_ISn_Current', byteGearBox));
  
  console.log(ByteGearBox.getByteTooth("LOLO", ByteGearBox.getByteGear('KLY_IP_ISn_Current', byteGearBox), true).toothType);
//  ByteGearBox.printData(byteGearBox, true);

}

