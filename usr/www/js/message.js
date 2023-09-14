
//Message display
var arrayMsg = new Array();
arrayMsg[0]  = "Please input password.";
arrayMsg[1]  = "Invalid password.";
arrayMsg[2]  = "Please input PIN.";
arrayMsg[3]  = "Incorrect input PIN. \n(Ex: 1234)\nFormat: 4~8 digits";

arrayMsg[4]  = "Do you want to delete this profile?";
arrayMsg[5]  = "Pass";
arrayMsg[6]  = "Security is wrong";
arrayMsg[7]  = "Please select a profile to connect.";

arrayMsg[8]  = "Please input profile name.";
arrayMsg[9]  = "Incorrect input profile name. \n(Ex: Profile_xx) \nFormat: 1~32 chars";
arrayMsg[10] = "Please input/select SSID.";
arrayMsg[11] = "Incorrect input SSID. \n(Ex: MyWiFiAP) \nFormat: 1~32 ASCII chars";
arrayMsg[12] = "Please input/select BSSID/MAC.";
arrayMsg[13] = "Incorrect input BSSID/MAC. \n(Ex: 1A:2B:3C:4D:5E:6F)\nFormat: xx:xx:xx:xx:xx:xx (xx: hex)";

arrayMsg[14] = "Please input security key.";
arrayMsg[15] = "Incorrect input security key. \n(Ex: abcde) \nWEP64 : 5 chars exactly";
arrayMsg[16] = "Incorrect input security key. \n(Ex: abcdefghijklm) \nWEP128 : 13 chars exactly";
arrayMsg[17] = "Incorrect input security key. \n(Ex: 1234567890) \nWEP64 : 10 hex digits exactly";
arrayMsg[18] = "Incorrect input security key. \n(Ex: 1234567890abcdef1234567890) \nWEP128 : 26 hex digits exactly";

arrayMsg[19] = "Please select a profile candidate.";

arrayMsg[20] = "Please input MTU.";
arrayMsg[21] = "Incorrect input MTU value. \n(Ex: 1500) \nFormat: 616~1500 ";

arrayMsg[22] = "Please input IP Address.";
arrayMsg[23] = "Incorrect input IP Address. \n(Ex: 192.168.255.1, aaa.bbb.ccc.ddd)\nFormat : xxx.xxx.xxx.xxx (xxx:0~255)";
arrayMsg[24] = "Please input Subnet mask.";
arrayMsg[25] = "Incorrect input Subnet mask. \n(Ex: 255.255.255.0)";
arrayMsg[26] = "Please input Gateway.";
arrayMsg[27] = "Incorrect input Gateway. \n(Ex: 192.168.255.254) \nFormat: xxx:xxx:xxx:xxx (xxx:0~255)";
arrayMsg[28] = "Please input DNS Server.";
arrayMsg[29] = "Incorrect input DNS Server. \n(Ex: 219.127.89.37, aaa.bbb.ccc.ddd) \nFormat : xxx.xxx.xxx.xxx (xxx:0~255)";

arrayMsg[30] = "Allocated IP is duplicated.";

arrayMsg[31] = "Please input MAC address.";
arrayMsg[32] = "Invalid input MAC address. \n(Ex: 1A:2B:3C:4D:5E:6F) \nFormat: xx:xx:xx:xx:xx:xx (xx:hex)";

arrayMsg[33] = "Please input Port number.";
arrayMsg[34] = "Incorrect input port number. \n(Ex: 23) \nFormat: 1~65535 ";

arrayMsg[35] = "Settings is saved successfully.";
arrayMsg[36] = "Failed to save settings.";

arrayMsg[37] = "Please input device name.";
arrayMsg[38] = "Incorrect input device name. \n(Ex: my101SB) \nFormat: 1~32 ASCII chars ";

arrayMsg[39] = "Please input old password.";
arrayMsg[40] = "Please input new password.";
arrayMsg[41] = "Please input verified password.";
arrayMsg[42] = "Verified new password is not matched.";
arrayMsg[43] = "Incorrect old password.";

arrayMsg[44]  = "Please input PUK.";
arrayMsg[45]  = "Incorrect input PUK. \n(Ex: 12345678) \nFormat: 8 digits ";
arrayMsg[46]  = "Please input Current PIN.";
arrayMsg[47]  = "Please input New PIN.";
arrayMsg[48]  = "Please input Verified PIN.";
arrayMsg[49]  = "Validate new PIN is not matched.";

arrayMsg[50] = "Please input APN.";
arrayMsg[51] = "Incorrect input APN. \n(Ex: internet) \nFormat: 1~100 ASCII chars ";
arrayMsg[52] = "Please input APN Username.";
arrayMsg[53] = "Incorrect input APN username. \n(Ex: user) \nFormat: 1~32 ASCII chars ";
arrayMsg[54] = "Please input APN Password.";
arrayMsg[55] = "Incorrect input APN password \n(Ex:xxxx) \nFormat: 1~32 ASCII chars ";

arrayMsg[56] = "Please input SSID.";
arrayMsg[57] = "Incorrect input SSID. \n(Ex: MyWiFIAp) \nFormat: 1~32 ASCII chars ";

arrayMsg[58] = "Delete selected registration?";

arrayMsg[59] = "Please select a profile for DATA MAIN.";
arrayMsg[60] = "Please select a profile for DATA SUB.";

arrayMsg[61] = "Please select a DNS setting.";
arrayMsg[62] = "Please select an authentication method.";

arrayMsg[63] = "Please select a 3G connection mode.";
arrayMsg[64] = "Please select a data communication area mode.";
arrayMsg[65] = "Please select a network operator.";

arrayMsg[66] = "Cannot add profile anymore. (max 20 profiles)"; // WiFi profile
arrayMsg[67] = "Invalid operation.";
arrayMsg[68] = "Operation failed.";

arrayMsg[69] = "Please select a connection mode.";
arrayMsg[70] = "Please select an encryption method.";
arrayMsg[71] = "Please select a security key type.";
arrayMsg[72] = "Please select a WiFi connection mode.";

arrayMsg[73] = "Please select an IP address acquisition method.";

arrayMsg[74] = "Please select a protocol.";
arrayMsg[75] = "Please select a internet side's IP address mode.";
arrayMsg[76] = "Please select an option to enable/disable create new port change rule.";

arrayMsg[77] = "Please select an option to use/not use DHCP server function.";

arrayMsg[78] = "Please select a time for system idle.";
arrayMsg[79] = "Please select a time for system standby.";
arrayMsg[80] = "Please select a time for system deep standby.";
arrayMsg[81] = "Please select a time for automatic power off.";

arrayMsg[82] = "Please login first.";

arrayMsg[83] = "Browser not support.";
arrayMsg[84] = "Nothing return."
arrayMsg[85] = "Unknown error.";

arrayMsg[86] = "Do you want to reboot the device?";
arrayMsg[87] = "The system is rebooting... Please wait for a while...";

arrayMsg[88] = "Please select an option to enable/disable restriction";

arrayMsg[89] = "Login is locked, please try later.";

arrayMsg[90] = "The system is restoring to initialization setting... Please wait for a while...";
arrayMsg[91] = "Do you want to restore the initialization setting?";

arrayMsg[92] = "Pinging...";
arrayMsg[93] = "Operation success";

arrayMsg[94] = "Use";
arrayMsg[95] = "Not use";

arrayMsg[96] = "Incorrect input WiFi Spot password. (Ex: 1234) \nFormat: 4 digits";
arrayMsg[97] = "Connect to the AP successfully.";
arrayMsg[98] = "Connect to the AP failed";
arrayMsg[99] = "Please select a WPS mode.";

arrayMsg[100] = "Please select an option to enable/disable WPS function.";
arrayMsg[101] = "Please select WPS mode.";

arrayMsg[102] = "Please select a wired connection mode.";

arrayMsg[103] = "End port cannot less then start port.";

arrayMsg[104] = "Incorrect PIN.";
arrayMsg[105] = "Incorrect PUK.";
arrayMsg[106] = "Remaining retry count: ";
arrayMsg[107] = "Please select an option to enable/disable PIN code.";

arrayMsg[108] = "LAN start port is too large.";

arrayMsg[109] = "Please input WPS PIN.";
arrayMsg[110] = "Incorrect input WPS PIN. \n(Ex: 12345670, aaaaaaac) \nFormat: 4/8 digits. (last digit is checksum)";

arrayMsg[111] = "Please select an option to enable/disable wireless LAN function.";
arrayMsg[112] = "Please select an wireless LAN communication standard.";
arrayMsg[113] = "Please select an channel.";
arrayMsg[114] = "Please select an option to enable/disable multi SSID.";
arrayMsg[115] = "Incorrect security key. \n(Ex: abcdefgh) \nFormat: 8~63 ASCII chars.";
arrayMsg[116] = "Please select a default key.";

arrayMsg[117] = "Please select an option to enable/disable SSID stealth.";
arrayMsg[118] = "Do you want to restart WiFi?";
arrayMsg[119] = "Applying LAN WiFi setting... Please wait a while...";

arrayMsg[120] = "Profile name cannot be duplicated.";
arrayMsg[121] = "Cannot delete default profile.";
arrayMsg[122] = "Do you want to delete selected profile?";
arrayMsg[123] = "Cannot modify default profile.";

arrayMsg[124] = "Network searching...";

arrayMsg[125] = "The IP range should be in the same subnet as LAN IP.";
arrayMsg[126] = "WAN IP and LAN IP should not in the same subnet.";

arrayMsg[127] = "Please add registration before enable MAC filter. \nNote: Enable MAC filter will block all mac not in the registration list";

arrayMsg[128] = "Multicast MAC is invalid. (lsb of the most significant address octet cannot set to 1)";
arrayMsg[129] = "Broadcast MAC is invalid. (FF:FF:FF:FF:FF:FF)";
arrayMsg[130] = "Null MAC is invalid. (00:00:00:00:00:00)";

arrayMsg[131] = "Do you want to reset packet number?";

arrayMsg[132] = "Do you want to apply DHCP?";
arrayMsg[133] = "Applying IP address setting... Please wait a while...";

arrayMsg[134] = "The LAN ip address can't be set \"x.x.x.0\" and \"x.x.x.255\".";
arrayMsg[135] = "The \"From IP\" and \"To IP\" can't be the same with LAN IP address.";
arrayMsg[136] = "The \"Fixed allocation IP\" can't be the same with LAN IP address.";
arrayMsg[137] = "The \"From IP\" must less than \"To IP\".";
arrayMsg[138] = "If you change the LAN IP, please remember to update the MAC filter and port convert list.";
arrayMsg[139] = "Do you want to change the LAN IP?";

arrayMsg[140] = "In all IP or subnet mask fields, 0.0.0.0 and 127.0.0.0(loopback) are not allowed.";
arrayMsg[141] = "Default gateway can't be the same with IP address.";
arrayMsg[142] = "Primary DNS can't be the same with secondary DNS.";

arrayMsg[143] = "The registered LAN side's IP can't be the same with device LAN IP.";
arrayMsg[144] = "The registered LAN side's IP should be in the same subnet as device LAN IP.";
arrayMsg[145] = "Port number is duplicated.";

arrayMsg[146] = "Do you want to restart setting web page?";

// Security
arrayMsg[147] = "Open/Shared key";
arrayMsg[148] = "WPA-PSK";
arrayMsg[149] = "WPA2-PSK";
arrayMsg[150] = "No encryption";
arrayMsg[151] = "WEP";
arrayMsg[152] = "TKIP";
arrayMsg[153] = "AES";
arrayMsg[154] = "none";

// SIM status
arrayMsg[155] = "Inserted";
arrayMsg[156] = "No SIM";
arrayMsg[157] = "Enter PIN";
arrayMsg[158] = "PIN Locked";
arrayMsg[159] = "SIM Locked";
arrayMsg[160] = "Network Blocked";  // Not used
arrayMsg[161] = "Enter PIN2";
arrayMsg[162] = "PIN2 Locked";
arrayMsg[163] = "PUK Locked";

arrayMsg[164] = "Allocated MAC is duplicated.";

arrayMsg[165] = "User input";
arrayMsg[166] = "5 ASCII characters(WEP64)";
arrayMsg[167] = "13 ASCII characters(WEP128)";
arrayMsg[168] = "10 hex digits(WEP64)";
arrayMsg[169] = "26 hex digits(WEP128)";

arrayMsg[170] = "Do you want to apply internet wired?";
arrayMsg[171] = "Applying Internet wired setting... Please wait a while...";

arrayMsg[172] = "Please set WiFi Spot password before connect to it.";

arrayMsg[173] = "\"TKIP\"/\"WEP\" is not allowed in the WiFi \"n only\" mode.";

arrayMsg[174] = "WPA-PSK/WPA2-PSK";
arrayMsg[175] = "AES/TKIP";

arrayMsg[176] = "Please input IP address or domain name.";
arrayMsg[177] = "Incorrect input IP Address / Domain name. \nIP address (Ex: 192.168.5.1, aaa.bbb.ccc.ddd) Format : xxx.xxx.xxx.xxx (xxx:0~255)\nDomain name ( Ex: www.google.com ) Format:xxx.xxx.xxx.xxx (xxxx:0-9, a-z, A-Z, -)";

arrayMsg[178] = "Please select a firmware upgrade option.";
arrayMsg[179] = "Please insert a USIM card before configure USIM setting.";
arrayMsg[180] = "3G connection OFF. Please turn 3G connection on to enable USIM settings.";

arrayMsg[181] = "Incorrect input password. \n(Ex: PasSWoRD) \nFormat: 1~32 ASCII chars";
arrayMsg[182] = "WiFi is disabled now. Please remove the ethernet cable to enable WiFi";

arrayMsg[183] = "Port Convert can't be enabled.\nPlease check Internet 3G/WiFi/wired settings";
arrayMsg[184] = "Incorrect input security key. \n(Ex: abcde) \nFormat: 5 chars/10 chars/13 digits/26 digits";

arrayMsg[185] = "Incorrect input IP Address.";

arrayMsg[186] = "Connecting";
arrayMsg[187] = "Not connecting";

arrayMsg[188] = "Bridge mode";
arrayMsg[189] = "Router mode";

arrayMsg[190] = "SIM Error";

arrayMsg[191] = "WPS is currently enabled but the security is open.";
arrayMsg[192] = "Please note that WPS cannot be used if the Authentication method is set to WPA-PSK or Encryption is set to TKIP only. Do you want to apply?";
arrayMsg[193] = "WPS will be disabled if the SSID is HIDDEN. Do you want to apply?";
arrayMsg[194] = "Please note that WPS cannot be used if the Authentication method is set to WPA-PSK or Encryption is set to TKIP only.";
arrayMsg[195] = "WPS can't be enabled due to the SSID is HIDDEN.";
arrayMsg[196] = "WPS will be enabled with open security.";

arrayMsg[197] = "DATA MAIN";
arrayMsg[198] = "DATA SUB";

arrayMsg[199] = "Please select SSID.";

arrayMsg[200] = "PIN is locked. Please kindly ask for PUK.<br>If you enter wrong PUK 10 times, you need to charge for New USIM card at shop.";
arrayMsg[201] = "PUK is locked. You need to charge for New USIM card at shop";

arrayMsg[202] = "Incorrect input Destination Address.\n(Ex: 192.168.5.1, 2001:b021:2d:1001::1, www.google.com)";
arrayMsg[203] = "Incorrect input IPv4 Address. \n(Ex: 192.168.5.1)";
arrayMsg[204] = "Please insert valid SIM card first.";

arrayMsg[205] = "In order to apply settings, need to restart.\nNo internet access while restarting process. Is it ok to apply?";
arrayMsg[206] = "Applying APN setting... Please wait a while...";

arrayMsg[207] = "The IP range should be in the same subnet as WAN IP.";

arrayMsg[208] = "Cannot add profile anymore. (max 16 profiles)"; // MAC filter
arrayMsg[209] = "Cannot add profile anymore. (max 12 profiles)"; // APN
arrayMsg[210] = "Cannot add profile anymore. (max 16 profiles)"; // IP address setting
arrayMsg[211] = "Cannot add profile anymore. (max 16 profiles)"; // Port convert

arrayMsg[212] = "Do you want to change the communication standard?";

arrayMsg[213] = "Please try again later.";

arrayMsg[214] = "Blacklist";
arrayMsg[215] = "Internet unavailable";
arrayMsg[216] = "Invalid security key";
arrayMsg[217] = "WiFi Spot login fail";
arrayMsg[218] = "Your browser may not fully support 101SB Web UI.\nYou may continue using your current browser, however, you may experience unexpected problems.";
arrayMsg[219] = "Please input user name.";

arrayMsg[220] = "Incorrect input user name. \n(Ex: nas) \nFormat: 1~255 letter or digit or _ ";

arrayMsg[221] = "Please input workgroup.";
arrayMsg[222] = "Incorrect input workgroup. \n(Ex: WORKGROUP) \nFormat: 1~32 letter or digit or _ ";

arrayMsg[223] = "Applying internet access mode setting... Please wait a while...";
arrayMsg[224] = "Incorrect input password. \n(Ex: PasSWoRD) \nFormat: 6~32 ASCII chars";

arrayMsg[225] = "Multi SSID can't be enabled due to access mode is ";
arrayMsg[226] = "Can't set access mode to ";
arrayMsg[227] = " because Multi SSID is enabled";
arrayMsg[228] = "Scanning visible network... Please wait a while...";  //Foxconn zhi-qing add, for PLMN, 2013/8/2
arrayMsg[229] = "Scanning visible network fail.";   //Foxconn zhi-qing add, for PLMN, 2013/8/2

arrayMsg[230] = "Please input user name ";
arrayMsg[231] = "Please input correct user name ";
arrayMsg[232] = "Please input password";
arrayMsg[233] = "Incorrect old user name";
arrayMsg[234] = "Incorrect input user name. \n(Ex: my101SB) \nFormat: 1~32 ASCII chars ";

arrayMsg[235] = "Firmware image is not exist";
arrayMsg[236] = "Firmware image cannot open";
arrayMsg[237] = "Firmware is not valid";
arrayMsg[238] = "uncompress file fail";
arrayMsg[239] = "write firmware to flash fail";
arrayMsg[240] = "WiFi Calibration data backup fail";
arrayMsg[241] = "WPS can not be triggered by gui.";
arrayMsg[242] = "Invalid character is included in the Password field. Please input valid characters. Valid characters: `~!@#$%^*_+-{}[]|:?,./, digits and alphabets.";
arrayMsg[243] = "Characters, `~!@#$%^&*()=+_[]{}\|;:.'\",<>/? are not allowed.";