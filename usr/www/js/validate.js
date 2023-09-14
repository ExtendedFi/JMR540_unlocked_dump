var digits = "0123456789";
var lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
var uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var hexdigits = "0123456789ABCDEFabcdef";
var specialLetter = "`~!@#$%^*_+-{}[]|:?,./";
var IP_CLASS_OTHER = 0;
var IP_CLASS_A = 1;
var IP_CLASS_B = 2;
var IP_CLASS_C = 3;
var device_no_allow_letter = "`~!@#$%^&*()=+_[]{}\|;:.'\",<>/?";

function isValidDeviceNameStr (s) {
  var i;
  for (i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    if (device_no_allow_letter.indexOf(c) >= 0)
	{
      return false;
    }
  }
  return true;
}

function isValidPasswdStr (s) {
  var i;
  for (i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    if ((specialLetter.indexOf(c) == -1) && !isLetter(c) && !isDigit(c))
	{
      return false;
    }
  }
  return true;
}

// Compare ip1 and ip2
// Return 1 if ip1 > ip2, 0 if ip1 = ip2, -1 if ip1 < ip2
function ipCmp(ip1, ip2) {
  var ip1_arr = ip1.value.split(".");
  var ip2_arr = ip2.value.split(".");
  var cmp = 0;
  for (var i = 0; i < 4; ++i) {
    if (parseInt(ip1_arr[i], 10) > parseInt(ip2_arr[i], 10)) {
      cmp = 1;
      break;
    } else if (parseInt(ip1_arr[i], 10) < parseInt(ip2_arr[i], 10)) {
      cmp = -1;
      break;
    }
  }
  return cmp;
}

function isEmpty(s){
  return ((s == null) || (s.length == 0));
}

function isLetter (c){
  return ( ((c >= "a") && (c <= "z")) || ((c >= "A") && (c <= "Z")) );
}

function isDigit (c){
  return ((c >= "0") && (c <= "9"));
}

function isDNSChar(c) {
  if (isLetter(c))
    return true;
  if (isDigit(c))
    return true;
  if ( (c=="-") || (c==".") )
    return true;
  return false;
}

function isASCIICode(c) {
  //if (c < 255)
  if (c < 128)
    return true;
  else
    return false;
}

function isInteger (s){
  var i;
  for (i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    if (!isDigit(c))
      return false;
  }
  return true;
}

function isSignedInteger (s) {
  var startPos = 0;
  if ( (s.charAt(0) == "-") || (s.charAt(0) == "+") )
    startPos = 1;
  return (isInteger(s.substring(startPos, s.length), secondArg))
}

function isAlphabetic (s) {
  var i;
  for (i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    if (!isLetter(c))
      return false;
  }
  return true;
}

function isHexStr (s) {
  var i;
  for (i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    if (hexdigits.indexOf(c) == -1){
      return false;
    }
  }
  return true;
}

function isASCIIStr (s) {
  var i;
  for (i = 0; i < s.length; i++) {
    var c = s.charCodeAt(i);
    if (!isASCIICode(c)) {
      return false;
    }
  }
  return true;
}

// Check if string is letter and digit combination
function isLetterDigitStr(s) {
  var i;
  for (i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    if (!(isLetter(c) || isDigit(c))) {
      return false;
    }
  }
  return true;
}

function isDNSStr(s) {
  var i;
  for (i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    if (!isDNSChar(c)) {
      return false;
    }
  }
  return true;
}

function isIntegerInRange (s, a, b) {
  if (!isInteger(s, false)) return false;
  var num = parseInt(s,10);
  return ((num >= a) && (num <= b));
}

function stringLeftTrim(s) {
  return (typeof(s) != "string") ? null : s.replace(/^ +/, "");
}

function stringRightTrim(s){
  return (typeof(s) != "string") ? null : s.replace(/ +$/, "");
}

function stringTrim(s){
  return stringRightTrim(stringLeftTrim(s));
}

//////////////////////
function checkEmpty(s) {
  return ( isEmpty(s.value) );
}

function checkMAC(mac) {
  var mac_reg1 = "^[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}$";
  var mac_reg2 = "^([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$";
  var regex1 = new RegExp(mac_reg1);
  var regex2 = new RegExp(mac_reg2);

  if (regex1.test(mac.value)) {
    return true;
  } else if(regex2.test(mac.value)) {
    var newMac = RegExp.$1+":"+RegExp.$2+":"+RegExp.$3+":"+RegExp.$4+":"+RegExp.$5+":"+RegExp.$6;
    mac.value = newMac;
    return true;
  } else {
    return false;
  }
}

// Check if mac is a multicast mac
// return true if mac is a multicast mac, otherwise false
function checkMulticastMac(mac) {
  if (!checkMAC(mac)) {
    return false;
  } else {
    var hwaddr = mac.value.split(":");
    if ((parseInt(hwaddr[0], 16) & 1) != 0) {
      return true;
    } else {
      return false;
    }
  }
}

// Check if mac is a broadcast mac
// return true if mac is a broadcast mac, otherwise false
function checkBroadcastMac(mac) {
  if (!checkMAC(mac)) {
    return false;
  } else {
    var hwaddr = mac.value.split(":");
    if ((parseInt(hwaddr[0], 16) & parseInt(hwaddr[1], 16) & parseInt(hwaddr[2], 16) & parseInt(hwaddr[3], 16) & parseInt(hwaddr[4], 16) & parseInt(hwaddr[5], 16)) == 0xff) {
      return true;
    } else {
      return false;
    }
  }
}

// Check if mac is a null mac
// return true if mac is a null mac, otherwise false
function checkNullMac(mac) {
  if (!checkMAC(mac)) {
    return false;
  } else {
    var hwaddr = mac.value.split(":");
    if ((parseInt(hwaddr[0], 16) | parseInt(hwaddr[1], 16) | parseInt(hwaddr[2], 16) | parseInt(hwaddr[3], 16) | parseInt(hwaddr[4], 16) | parseInt(hwaddr[5], 16)) == 0x00) {
      return true;
    } else {
      return false;
    }
  }
}

function checkPIN(pin) {
  if ( isEmpty(pin.value) )
    return false;
  if ( (pin.value.length<4) || (pin.value.length>8) )
    return false;
  if ( !isInteger(pin.value) )
    return false;
  return true;
}

function checkPUK(puk) {
  if ( isEmpty(puk.value) )
    return false;
  if ( puk.value.length!=8 )
    return false;
  if ( !isInteger(puk.value) )
    return false;
  return true;
}

function checkPort(networkport) {
  if ( isEmpty(networkport.value) )
    return false;
  if ( !isInteger(networkport.value) )
    return false;
  var num = parseInt(networkport.value, 10);
  if ( (num < 1) || (num > 65535) )
    return false;
  return true;
}

function checkMTU(mtu) {
  if ( isEmpty(mtu.value) )
    return false;
  if ( !isInteger(mtu.value) )
    return false;
  var num = parseInt(mtu.value,10);
  if ( (num < 616) || (num > 1500) )
    return false;
  return true;
}

// Check targetIP is in ipaddress mask range
function checkIPSubnetMask(ipaddress, subnetMask, targetIP) {
  if ( !checkIP(ipaddress) )
    return false;
  if ( !checkSubnetMask(subnetMask) )
    return false;
  if ( !checkIP(targetIP) )
    return false;

  var ipaddressArr = ipaddress.value.split(".");
  var subnetMaskArr = subnetMask.value.split(".");
  var targetIPArr = targetIP.value.split(".");

  for (var i = 0; i < 4; i++) {
    if ((ipaddressArr[i] & subnetMaskArr[i]) != (targetIPArr[i] & subnetMaskArr[i])) {
      return false;
    }
  }
  return true;
}

// Check lan ip and wan ip are not both in lan subnet mask
function checkLanWanIPSubnetMask(lanIP, lanSubnetMask, wanIP, wanSubnetMask) {
  if (checkIPSubnetMask(lanIP, lanSubnetMask, wanIP)) {
    return false;
  }
  if (checkIPSubnetMask(lanIP, wanSubnetMask, wanIP)) {
    // If lan ip and wan ip are in the same subnet, return false
    return false;
  }
  return true;
}

function getIPRangeStr(ipaddress, subnetMask) {
  var firstValidIP = getFirstValidIP(ipaddress, subnetMask);
  var lastValidIP = getLastValidIP(ipaddress, subnetMask);
  return "\n(" + firstValidIP + "~" + lastValidIP + ")";
}

function getLastValidIP(ipaddress, subnetMask) {
  var BI = getBroadcastIP(ipaddress, subnetMask);
  return getPreviousIP(BI);
}

function getFirstValidIP(ipaddress, subnetMask) {
  var NN = getNetworkNumber(ipaddress, subnetMask);
  return getNextIP(NN);
}

function getPreviousIP(ipaddress) {
  var ipArr = ipaddress.split(".");
  var ipIntArr = Array();
  for (var i = 0; i < ipArr.length; ++i) {
    ipIntArr[i] = parseInt(ipArr[i], 10);
  }
  ipIntArr[3] -= 1;

  for (var i = 3; i >= 0; --i) {
    if (ipIntArr[i] < 0) {
      ipIntArr[i] += 256;
      ipIntArr[i-1] -= 1;
    }
  }
  if (ipIntArr[0] < 0) {
    return "0.0.0.0";
  } else {
    return ipIntArr[0] + "." + ipIntArr[1] + "." + ipIntArr[2] + "." + ipIntArr[3];
  }
}

function getNextIP(ipaddress) {
  var ipArr = ipaddress.split(".");
  var ipIntArr = Array();
  for (var i = 0; i < ipArr.length; ++i) {
    ipIntArr[i] = parseInt(ipArr[i], 10);
  }
  ipIntArr[3] += 1;

  for (var i = 3; i >= 0; --i) {
    if (ipIntArr[i] > 255) {
      ipIntArr[i] -= 255;
      ipIntArr[i-1] += 1;
    }
  }
  if (ipIntArr[0] > 255) {
    return "255.255.255.255";
  } else {
    return ipIntArr[0] + "." + ipIntArr[1] + "." + ipIntArr[2] + "." + ipIntArr[3];
  }
}

function getBroadcastIP(ipaddress, subnetMask) {
  var ipaddressArr = ipaddress.value.split(".");
  var subnetMaskArr = subnetMask.value.split(".");
  var NN1, NN2, NN3, NN4;
  var BI1, BI2, BI3, BI4;

  NN1 = parseInt(ipaddressArr[0], 10) & parseInt(subnetMaskArr[0], 10);
  NN2 = parseInt(ipaddressArr[1], 10) & parseInt(subnetMaskArr[1], 10);
  NN3 = parseInt(ipaddressArr[2], 10) & parseInt(subnetMaskArr[2], 10);
  NN4 = parseInt(ipaddressArr[3], 10) & parseInt(subnetMaskArr[3], 10);

  BI1 = NN1 | (~parseInt(subnetMaskArr[0], 10) & 0xff);
  BI2 = NN2 | (~parseInt(subnetMaskArr[1], 10) & 0xff);
  BI3 = NN3 | (~parseInt(subnetMaskArr[2], 10) & 0xff);
  BI4 = NN4 | (~parseInt(subnetMaskArr[3], 10) & 0xff);

  return BI1 + "." + BI2 + "." + BI3 + "." + BI4;
}

function getNetworkNumber(ipaddress, subnetMask) {
  var ipaddressArr = ipaddress.value.split(".");
  var subnetMaskArr = subnetMask.value.split(".");
  var NN1, NN2, NN3, NN4;

  NN1 = parseInt(ipaddressArr[0], 10) & parseInt(subnetMaskArr[0], 10);
  NN2 = parseInt(ipaddressArr[1], 10) & parseInt(subnetMaskArr[1], 10);
  NN3 = parseInt(ipaddressArr[2], 10) & parseInt(subnetMaskArr[2], 10);
  NN4 = parseInt(ipaddressArr[3], 10) & parseInt(subnetMaskArr[3], 10);

  return NN1 + "." + NN2 + "." + NN3 + "." + NN4;
}

// Get IP class, A(1) B(2) C(3) Invalid(0)
function getIPClass(ipaddress) {
  var ipaddressArr = ipaddress.value.split(".");
  var octet1 = parseInt(ipaddressArr[0], 10);
  if (0 <= octet1  && octet1 <= 127)  return IP_CLASS_A;
  if (128 <= octet1 && octet1 <= 191) return IP_CLASS_B;
  if (192 <= octet1 && octet1 <= 223) return IP_CLASS_C;
  return IP_CLASS_OTHER;
}

// Check if IP class is valid with the specified subnet mask
function checkValidIPClassSubnetMask(ipaddress, subnetMask) {
  var ipClass = getIPClass(ipaddress);
  var subnetMaskArr = subnetMask.value.split(".");
  if (ipClass == IP_CLASS_A && parseInt(subnetMaskArr[0], 10) == 255)
    return true;
  if (ipClass == IP_CLASS_B && parseInt(subnetMaskArr[0], 10) == 255 && parseInt(subnetMaskArr[1], 10) == 255)
    return true;
  if (ipClass == IP_CLASS_C && parseInt(subnetMaskArr[0], 10) == 255 && parseInt(subnetMaskArr[1], 10) == 255 && parseInt(subnetMaskArr[2], 10) == 255)
    return true;
  // Otherwise, invalid IP Class
  return false;
}

//Check Network Number(NN) and Broadcast IP(BI)
function checkNNBI(ipaddress, subnetMask) {
  var ipaddressArr = ipaddress.value.split(".");
  var subnetMaskArr = subnetMask.value.split(".");
  var NN1, NN2, NN3, NN4;
  var BI1, BI2, BI3, BI4;

  NN1 = parseInt(ipaddressArr[0], 10) & parseInt(subnetMaskArr[0], 10);
  NN2 = parseInt(ipaddressArr[1], 10) & parseInt(subnetMaskArr[1], 10);
  NN3 = parseInt(ipaddressArr[2], 10) & parseInt(subnetMaskArr[2], 10);
  NN4 = parseInt(ipaddressArr[3], 10) & parseInt(subnetMaskArr[3], 10);

  BI1 = NN1 | (~parseInt(subnetMaskArr[0], 10) & 0xff);
  BI2 = NN2 | (~parseInt(subnetMaskArr[1], 10) & 0xff);
  BI3 = NN3 | (~parseInt(subnetMaskArr[2], 10) & 0xff);
  BI4 = NN4 | (~parseInt(subnetMaskArr[3], 10) & 0xff);

  if((parseInt(ipaddressArr[0], 10) == NN1 && parseInt(ipaddressArr[1], 10) == NN2 && parseInt(ipaddressArr[2], 10) == NN3 && parseInt(ipaddressArr[3], 10) == NN4) ||
    (parseInt(ipaddressArr[0], 10) == BI1 && parseInt(ipaddressArr[1], 10) == BI2 && parseInt(ipaddressArr[2], 10) == BI3 && parseInt(ipaddressArr[3], 10) == BI4))
      return false;

  return true;
}

function checkIP(ipaddress) {
  if ( isEmpty(ipaddress.value) )
    return false;
  var ip = ipaddress.value.split(".");
  var entry = 0;
  if (ip.length != 4 )
    return false;
  for (var i = 0; i < ip.length; i++) {
    if ( ! isInteger(ip[i]) )
      return false;
    if (ip[i].length==0)
      return false;
    entry=parseInt(ip[i], 10);
    if ( (entry<0) || (entry>255) )
      return false;
  }
  return true;
}

function checkPrivateIP(ipaddress) {
  if ( isEmpty(ipaddress.value) )
    return false;
  var ip = ipaddress.value.split(".");
  var entry = 0;
  if (ip.length != 4 )
    return false;
  //192.168.xxx.xxx
  for (var i = 0; i < ip.length; i++) {
    if ( ! isInteger(ip[i]) )
      return false;
    entry=parseInt(ip[i], 10);
    switch (i){
    case 0:
      if (entry!=192) return false;
      break;
    case 1:
      if (entry!=168) return false;
      break;
    case 2:
    case 3:
      if ( (entry<0) || (entry>255) ) return false;
      break;
    }
  }
  return true;
}

function checkIPv4(ipaddress) {
  if ( !checkIP(ipaddress) )
    return false;
  var ip = ipaddress.value.split(".");
  for (var i = 0; i < ip.length; ++i) {
    var octet = ip[i];
    if (i == 0) {
      if (parseInt (octet, 10) < 1 || parseInt (octet, 10) > 223)
        return false;
    }
    else if (i == 3) {
      if (parseInt (octet, 10) < 0 || parseInt (octet, 10) > 255)
        return false;
    }
    else {
      if (parseInt (octet, 10) < 0 || parseInt (octet, 10) > 255)
        return false;
    }
  }
  // Not allowed to set loopback address
  if (ip[0] == 127)
    return false;
  return true;
}

function checkDNSServer(dns) {
  if ( !checkIP(dns) )
    return false;
  return true;
}

function checkGateway(gateway) {
  if ( !checkIP(gateway) )
    return false;
  return true;
}

function checkSubnetMask(subnetmask) {
  var subnetMaskArr = subnetmask.value.split(".");
  var correct_range = {128:1, 192:1, 224:1, 240:1, 248:1, 252:1, 254:1, 255:1, 0:1};

  if ( !checkIP(subnetmask) )
    return false;

  // First octet should always be 255 (For class A/B/C IP)
  if (parseInt(subnetMaskArr[0], 10) != 255)
    return false;

  for (var i = 0; i < 4; i++) {
    if(!(subnetMaskArr[i] in correct_range)) {
      return false;
    }
  }

  if ((subnetMaskArr[0] == 0) || (subnetMaskArr[0] != 255 && subnetMaskArr[1] != 0) ||
      (subnetMaskArr[1] != 255 && subnetMaskArr[2] != 0) || (subnetMaskArr[2] != 255 && subnetMaskArr[3] != 0))
      return false;

  return true;
}

function getUTF8Bytes(s) {
  var totalLength = 0;
  var i;
  var charCode;
  for (i = 0; i < s.length; ++i) {
    charCode = s.charCodeAt(i);
    if (charCode <= 0x007f) {
      totalLength = totalLength + 1;
    } else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
      totalLength += 2;
    } else if ((0x0800 <= charCode) && (charCode <= 0xd7ff)) {
      totalLength += 3;
    } else if ((0xe000 <= charCode) && (charCode <= 0xffff)) {
      totalLength += 3;
    } else if ((0x010000 <= charCode) && (charCode <= 0x10ffff)) {
      totalLength += 4;
    }
  }
  return totalLength;
}

function getShiftJISBytes(s) {
  var totalLength = 0;
  var i;
  var charCode;
  for (i = 0; i < s.length; ++i) {
    charCode = s.charCodeAt(i);
    if (charCode <= 0x00df) {
      totalLength = totalLength + 1;
    } else {
      totalLength = totalLength + 2;
    }
  }
  return totalLength;
}

function checkSSID(ssid) {
  if ( isEmpty(ssid.value) )
    return false;
  //if ( getUTF8Bytes(ssid.value) > 32 )
  //if ( getShiftJISBytes(ssid.value) > 32 )
  if ( ssid.value.length > 32 )
    return false;
  if ( !isASCIIStr(ssid.value) )
    return false;
  return true;
}

function checkProfileName(profile) {
  if ( isEmpty(profile.value) )
    return false;
  if ( profile.value.length > 32 )
    return false;
  if (typeof isShiftJISStr == "function") {
    if ( !isShiftJISStr(profile.value) )
      return false;
  }
  return true;
}

function checkDeviceName(device) {
  if ( isEmpty(device.value) )
    return 0;
  if ( device.value.length>64 )
    return 1;
  if ( !isASCIIStr(device.value) || !isValidDeviceNameStr(device.value))
    return 2;
  return 3;
}

//RFC 1035
function validateDNS (dnsvalue) {
  var regex = new RegExp("^(([a-zA-Z]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$");
  if (dnsvalue.length==0)
    return false;
  return (regex.test(dnsvalue)) ;
}

//Spec 3GPP TS 23.003
function validateAPNNetworkID(apnnetwork) {
  var regexS = new RegExp("^(rac|lac|sgsn)");
  var regexE = new RegExp("[\.]gprs$");
  if ( (apnnetwork.length < 1) || (apnnetwork.length > 63) )
    return false;
  if (regexS.test(apnnetwork))
    return false;
  if (regexE.test(apnnetwork))
    return false;
  return (validateDNS(apnnetwork));
}

function validateAPN(apnvalue) {
  var regexFull = new RegExp("^([0-9a-zA-Z\-\.]{1,63})[\.]mnc([0-9]{3})[\.]mcc[0-9]{3}[\.]gprs$");
  if (apnvalue.length==0)
    return false;
  if ( regexFull.test(apnvalue) ) {
    return (validateAPNNetworkID(RegExp.$1));
  } else
    return (validateAPNNetworkID(apnvalue));
}

function checkAPN(apn) {
  if ( isEmpty(apn.value) )
    return false;
  if ( apn.value.length>100 )
    return false;
  if ( !isDNSStr(apn.value) )
    return false;
  return (validateAPN(apn.value));
}

function checkAPNUsername(username) {
  if ( isEmpty(username.value) )
    return false;
  if ( username.value.length>32 )
    return false;
  if ( !isASCIIStr(username.value) )
    return false;
  return true;
}

function checkPassword(password) {
  if ( isEmpty(password.value) )
    return 0;
  if ( (password.value.length>32) || (password.value.length < 8))
    return 0;  
  if ( !isValidPasswdStr(password.value) )
    return -1;
  return 1;
}

function checkUserName(usr) {
  if ( isEmpty(usr.value) )
    return false;
  if ( usr.value.length>32 )
    return false;
  if ( !isASCIIStr(usr.value) )
    return false;
  return true;
}

function checkAPNPassword(password) {
  if ( isEmpty(password.value) )
    return false;
  if ( password.value.length>32 )
    return false;
  if ( !isASCIIStr(password.value) )
    return false;
  return true;
}

function checkSBPassword(password) {
  if ( isEmpty(password.value) )
    return false;
  if ( password.value.length > 4 || password.value.length < 4 )
    return false;
  if ( !isInteger(password.value) )
    return false;
  return true;
}

function validateWPS(wpspinvalue) {
  var digit_pin = parseInt(wpspinvalue, 10);

  var accum = 0;
  var pin_check_sum = 0;
  var pin = (digit_pin - (digit_pin%10)) / 10;
  while (pin) {
    accum += 3 * (pin % 10);
    pin = (pin-(pin%10)) / 10;
    accum += pin % 10;
    pin = (pin-(pin%10)) / 10;
  }
  pin_check_sum = (10 - accum % 10) % 10;

  return (pin_check_sum == (digit_pin % 10));
}

function checkWPSPIN(wpspin) {
  var regex1 = new RegExp("^[0-9]{8}$");
  var regex2 = new RegExp("^([0-9]{4})-([0-9]{4})$");
  var regex3 = new RegExp("^([0-9]{4}) ([0-9]{4})$");
  var regex4 = new RegExp("^[0-9]{4}$");

  if ( isEmpty(wpspin.value) )
    return false;
  if ( wpspin.value.length!=8 && wpspin.value.length!=4 && wpspin.value.length!=9 )
    return false;

  if (regex1.test(wpspin.value)) {
    return (validateWPS(wpspin.value));
  }
  else if (regex2.test(wpspin.value) || regex3.test(wpspin.value)) {
    var newWPS = RegExp.$1+RegExp.$2;
    if (validateWPS(newWPS)) {
      wpspin.value=newWPS;
      return true;
    } else
      return false;
  }
  else if (regex4.test(wpspin.value)) {
    return true;
  }
  return false;
}

function validateWEP64char5(securitykey) {
  if ( isEmpty(securitykey.value) )
    return false;
  if ( securitykey.value.length!=5 )
    return false;
  if ( !isASCIIStr(securitykey.value) )
  //if ( !isLetterDigitStr(securitykey.value) )
    return false;
  return true;
}

function validateWEP128char13(securitykey) {
  if ( isEmpty(securitykey.value) )
    return false;
  if ( securitykey.value.length!=13 )
    return false;
  if ( !isASCIIStr(securitykey.value) )
  //if ( !isLetterDigitStr(securitykey.value) )
    return false;
  return true;
}

function validateWEP64hex10(securitykey) {
  if ( isEmpty(securitykey.value) )
    return false;
  if ( securitykey.value.length!=10 )
    return false;
  if ( !isHexStr(securitykey.value) )
    return false;
  return true;
}

function validateWEP128hex26(securitykey) {
  if ( isEmpty(securitykey.value) )
    return false;
  if ( securitykey.value.length!=26 )
    return false;
  if ( !isHexStr(securitykey.value) )
    return false;
  return true;
}

function validateAllWEP(securitykey) {
  if (validateWEP64char5(securitykey))
    return true;
  if (validateWEP128char13(securitykey))
    return true;
  if (validateWEP64hex10(securitykey))
    return true;
  if (validateWEP128hex26(securitykey))
    return true;
  return false;
}

function validateOtherkey(securitykey) {
  if ( isEmpty(securitykey.value) )
    return false;

  var len = securitykey.value.length;

  if (len < 8 || len > 64)
    return false;

  if (len >=8 && len <= 63 ) {
    if ( isASCIIStr(securitykey.value) )
      return true;
    else
      return false;
  }

  if (len==64) {
    if ( isHexStr(securitykey.value) )
      return true;
    else
      return false;
  }
  return false;
}

function validateKey(keytype, securitykey) {
  switch(keytype) {
    case "none":
      break;
    case "char5":
      return (validateWEP64char5(securitykey));
      break;
    case "char13":
      return (validateWEP128char13(securitykey));
      break;
    case "hex10":
      return (validateWEP64hex10(securitykey));
      break;
    case "hex26":
      return (validateWEP128hex26(securitykey));
      break;
    case "allwep":
      return (validateAllWEP(securitykey));
      break;
    case "user":
      return (validateOtherkey(securitykey));
      break;
    default:
      break;
  }
  return true;
}

//DNS ONLY for PING
function checkDNS(dns) {
  var regexDNS = new RegExp("^([0-9a-zA-Z\-]+\.)+[0-9a-zA-Z\-]+$");
  var regexF1 = new RegExp("^\-");

  if( isEmpty(dns.value))
    return false;
  if (!isDNSStr(dns.value))
    return false;
  if (regexF1.test(dns.value))
    return false;
  return (regexDNS.test(dns.value));
}

// Check if data call is idle
function checkDataCallIdle(data_call_status) {
  // data_call_status: Idle / Connect / Connecting
  if (data_call_status != "Idle") {
    return false;
  }
  return true;
}

function checkSambaUserName(user) {
  if ( isEmpty(user.value) )
    return false;
  if ( user.value.length>255 )
    return false;
  if ( !isSambaRule(user.value) )
  	return false;
  return true;
}

function checkSambaWorkgroup(workgroup) {
  if ( isEmpty(workgroup.value) )
    return false;
  if ( workgroup.value.length>32 )
    return false;
  if ( !isSambaRule(workgroup.value) )
    return false;
  return true;
}

function checkSambaPassword(password) {
	if ( isEmpty(password.value) )
		return false;
	if ( workgroup.value.length>32 )
		return false;
	if ( workgroup.value.length<6 )
		return false;
	if ( !isASCIIStr(password.value) )
    return false;
  return true;
}

function isSambaRule(s) {
	var i;
	var tt='@';
	for (i = 0; i < s.length; i++) {
		var c = s[i];
		if(!isLetter(c) && !isDigit(c) && c != '_')
			return false;
	}
	return true;
}

function validate_mac( mac_filter )
{
    if( checkEmpty( mac_filter ) )
    {
        return false;
    }
	
	if(checkMAC(mac_filter) == false)
	{
		return false;
	}

    if( checkNullMac( mac_filter ) )
    {
        alert(arrayMsg[32]);
        mac_filter="";
        mac_filter.focus();
        return false;
    }

    return true;
}

