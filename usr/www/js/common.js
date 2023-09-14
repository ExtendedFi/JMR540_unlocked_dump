//--------------- common setting start ------------------------------------

var REBOOT_REDIRECT_SECONDS = 60;       // Time to redirect page after execute reboot command
var ENABLE_JAPANESE_VERSION = true;     // Enable change to Japanese button
var ENABLE_WAN_WIFI_WPS = true;         // Enable wan wifi wps function
var MAX_WIFI_PROFILE_NUM = 20;          // Max wan wifi profile number
var WIFI_DEFAULT_PROFILE_NUM = 3;       // Default wifi profile number
var WIFI_PROFILE_RANGE = 1;             // WiFi get profile range when scan profile status
var ENABLE_FIRMWARE_UPDATE = true;      // Enable firmware update function
var POLLING_FW_STATUS_SECONDS = 2;      // Time to polling firmware update status
var POLLING_3G_STATUS_SECONDS = 5;      // Time to polling 3G network status
var POLLING_APN_STATUS_SECONDS = 5;     // Time to polling APN apply status
var POLLING_WAN_WIFI_STATUS_SECONDS = 5;// Time to polling WAN WiFi status
var POLLING_LAN_WPS_STATUS_SECONDS = 1; // Time to polling LAN WPS status
var POLLING_WAN_WPS_STATUS_SECONDS = 1; // Time to polling WAN WPS status
var POLLING_WAN_WIFI_STATUS_SECONDS = 5;// Time to polling WAN WiFi status
var LAN_WIFI_APPLY_REDIRECT_SECONDS = 10; // Time to redirect page after apply lan wifi command
var WAN_WIFI_APPLY_REDIRECT_SECONDS = 30; // Time to redirect page after apply wan wifi command
var INTERNET_WIRED_APPLY_REDIRECT_SECONDS = 10; // Time to redirect page after apply internet wired command
var DHCP_APPLY_REDIRECT_SECONDS = 30;   // Time to redirect page after apply DHCP command
var APN_APPLY_REDIRECT_SECONDS = 30;    // Time to redirect page after apply APN command
var XHR_RETRY_COUNT = 3;                // xhr retry count
var XHR_RETRY_SECONDS = 5;              // xhr retry seconds
var CHANGE_INTERFACE_STATUS_SECONDS = 10; //Time to turn on/off wireless interface
var MAX_PORT_CONVERT_NUM = 16;
var ACS_APPLY_REDIRECT_SECONDS = 10;

// SIM status message index (refer to message.js)
var SIM_STATUS_INSERTED_IDX = 155;
var SIM_STATUS_NO_SIM_IDX = 156;
var SIM_STATUS_ENTER_PIN_IDX = 157;
var SIM_STATUS_PIN_LOCKED_IDX = 158;
var SIM_STATUS_SIM_LOCKED_IDX = 159;
var SIM_STATUS_NETWORK_BLOCKED_IDX = 160; // Not used
var SIM_STATUS_ENTER_PIN2_IDX = 161;
var SIM_STATUS_PIN2_LOCKED_IDX = 162;
var SIM_STATUS_PUK_LOCKED_IDX = 163;
var SIM_STATUS_UNKNOWN_IDX = -1;

// LAN WPS Status
var LAN_WPS_IDLE = "IDLE";
var LAN_WPS_PROCESSING = "PROCESSING";
var LAN_WPS_SUCCESS = "Success";
var LAN_WPS_FAIL = "Fail";

// Internet Connection Mode
var INT_CON_BRIDGE = "bridge";
var INT_CON_ROUTER = "router";

var replace_array =Array({"replace_str":"&ndash;","str":"–"},{"replace_str":"&mdash;","str":"—"},{"replace_str":"&iexcl;","str":"!"},{"replace_str":"&iquest;","str":"?"},{"replace_str":"&quot;","str":"\""},{"replace_str":"&ldquo;","str":"“"},{"replace_str": "&rdquo;","str":"”"},{"replace_str":"&lsquo;","str":"‘"},{"replace_str":"&rsquo;","str":"’"},{"replace_str":"&laquo;","str":"?"},{"replace_str":"&raquo;","str":"?"},{"replace_str":"&amp;","str":"&"},{"replace_str":"&cent;","str":"￠"},{"replace_str":"&copy;","str":"c"},{"replace_str":"&divide;","str":"\""},{"replace_str":"&gt;","str":">"},{"replace_str": "&lt;","str":"<"},{"replace_str":"&micro;","str":"μ"},{"replace_str":"&middot;","str":"·"},{"replace_str":"&para;","str":"?"},{"replace_str":"&plusmn;","str":"±"},{"replace_str":"&euro;","str":"€"},{"replace_str":"&pound;","str":"￡"},{"replace_str":"&reg;","str":"R"},{"replace_str":"&sect;","str":"§"},{"replace_str":"&trade;","str":"?"},{"replace_str":"&yen;","str":"￥"},{"replace_str":"&deg;","str":"°"});

//--------------- common setting end ------------------------------------

var userAgent = navigator.userAgent; 
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

//--------------- common function start ------------------------------------
function isMobileWeb()
{
/*
	if(/Windows/i.test(userAgent))	    
		return 0;
	
	return 1;	
*/
    if (/Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)) 
        return 1;
    return 0;
}

function leftSwipe(focus, category, focusTable)
{
	//var imported = document.createElement('script');
	//imported.src = '/js/swipe.js';
	//document.head.appendChild(imported);
	var url = "/no-cgi/networkMobileMenu.html";
	if(isMobileWeb() == 1)
	{
		var newSwipe = new Swipe(document.getElementById(focus), document.getElementById(focusTable), function(event, direction) {
			//event.preventDefault();
			
			switch (direction) {
				case "right":
					window.top.frames['MainMenu'].location.href = "/no-cgi/mainMenuNewLogin.html";
					switch(category)
					{
						case "mangt":
						url="/no-cgi/userMgtMobileMenu.html";
						break;
					}
					window.top.frames['content'].location.href = url;
					break;
			}
		});
        return newSwipe;
	}
}
// Get dhcp server status, depend on DHCPS_ENABLE and internet connection mode.
// On enable, return true.
// On disable, return false.
function is_dhcp_enable(DHCPS_ENABLE, con_mode) {
  if (con_mode == INT_CON_BRIDGE) {
    return false;
  } else {
    return (DHCPS_ENABLE == "1");
  }
}

// Fix input fields length avoid IE's layout container expansion bug.
// note: target fields should set rvalue attribute.
function fix_input_fields() {
  var elems = document.getElementsByTagName('input');
  for (var i = 0; i < elems.length; i++) {
    var obj = elems[i];
    var rvalue = obj.getAttribute("rvalue");
    if (rvalue) {
      obj.setAttribute("value", rvalue);
    }
  }
}

// Get sim status message index
function get_sim_status_msg_idx(sim_status) {
  if (sim_status == "Inserted")         return SIM_STATUS_INSERTED_IDX;
  if (sim_status == "No SIM")           return SIM_STATUS_NO_SIM_IDX;
  if (sim_status == "Enter PIN")        return SIM_STATUS_ENTER_PIN_IDX;
  if (sim_status == "PIN Locked")       return SIM_STATUS_PIN_LOCKED_IDX;
  if (sim_status == "SIM Locked")       return SIM_STATUS_SIM_LOCKED_IDX;
  if (sim_status == "Enter PIN2")       return SIM_STATUS_ENTER_PIN2_IDX;
  if (sim_status == "PIN2 Locked")      return SIM_STATUS_PIN2_LOCKED_IDX;
  if (sim_status == "PUK Locked")       return SIM_STATUS_PUK_LOCKED_IDX;
  return SIM_STATUS_UNKNOWN_IDX;  // Unknown
}

// escape newline
function escape_nl(str) {
  return str.replace(/(\r\n|[\r\n])/g, "\\n");
}

// create xhr object for ajax operation
// @param ignore_browser_check: true to ignore confirm user, 
//                              otherwise(may not set) it will confirm user if browser not supported.
function createXHR(ignore_confirm) {
  var xmlHttp = false;
  
  try {
    // Firefox, Opera 8.0+, Safari
    xmlHttp = new XMLHttpRequest();
  } catch (e) {
    // Internet Explorer
    try {
      xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        xmlHttp = false;
      }
    }
  }
  
  // Create xhr success
  if (xmlHttp != false) {
    return xmlHttp;
  }
  // Create xhr fail, ask user continue or redirect to browser update page.
  else if (ignore_confirm != true) {
    // User still want to browse the page
    if (confirm(arrayMsg[218])) {
      return xmlHttp;
    }
    // Redirect to browser update page.
    else {
      redirect_main("browser.html");
    }
  }
}

// Refresh information bar
function refresh_information_bar() {
  if (top != null && top.bodyFrame != null && top.bodyFrame.topFrame != null) {
    if (typeof top.bodyFrame.topFrame.update_information_request == "function") {
      top.bodyFrame.topFrame.update_information_request();
    }
  }
}

// show msg in msg_area and hide/show msg_row
// @param message id
function show_msg(msg_id) {
  var msg_row = document.getElementById("msg_row");
  var msg_area = document.getElementById("msg_area");
  if (msg_id != "") {
    msg_area.innerHTML = arrayMsg[msg_id];
    msg_row.style.display = "";
  } else {
    msg_area.innerHTML = "";
    msg_row.style.display = "none";
  }
}

// check if target class exist in original class str
// @param ori_class_str: original class string
// @param target_class: target class name
// @return true if target class exist in original class str
function exist_css_class(ori_class_str, target_class) {
  var ori_class_arr = String(ori_class_str).split(' ');
  var exist = false;
  if (ori_class_str != null) {
    for (var i = 0; i < ori_class_arr.length; ++i) {
      if (ori_class_arr[i] == target_class) {
        exist = true;
        break;
      }
    }
  }
  return exist;
}


// filter target class in css class string
// @param ori_class_str: original class string
// @param target_class: target class name
// @return filtered class string
function filter_css_class(ori_class_str, target_class) {
  var ori_class_arr = String(ori_class_str).split(' ');
  var new_class = "";
  if (ori_class_str != null) {
    for (var i = 0; i < ori_class_arr.length; ++i) {
      if (ori_class_arr[i] != target_class) {
        new_class += ori_class_arr[i] + " ";
      }
    }
  }
  return new_class;
}

function getCookie(name) {
  var start = document.cookie.indexOf( name + "=" );
  var len = start + name.length + 1;
  if ((!start) && (name != document.cookie.substring(0, name.length))) {
    return null;
  }
  if (start == -1)    return null;
  var end = document.cookie.indexOf(';', len);
  if (end == -1)      end = document.cookie.length;
  return unescape(document.cookie.substring(len, end));
}

function setCookie(name, value, expires, path, domain, secure) {
  var today = new Date();
  today.setTime( today.getTime() );
  if ( expires ) {
    expires = expires * 1000 * 60 * 60 * 24;
  }
  var expires_date = new Date( today.getTime() + (expires) );
  document.cookie = name+'='+escape( value ) +
      ( ( expires ) ? ';expires='+expires_date.toGMTString() : '' ) + //expires.toGMTString()
      ( ( path ) ? ';path=' + path : '' ) +
      ( ( domain ) ? ';domain=' + domain : '' ) +
      ( ( secure ) ? ';secure' : '' );
}

function deleteCookie( name, path, domain ) {
  if ( getCookie( name ) ) document.cookie = name + '=' +
      ( ( path ) ? ';path=' + path : '') +
      ( ( domain ) ? ';domain=' + domain : '' ) +
      ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
}


/**
 * check if target is hex
 * @param s_text: target text
 */
function is_hex(s_text)
{
  var valid_chars = "0123456789ABCDEFabcdef";
  var result = true;
  var current_char;

  for (i = 0; i < s_text.length && result == true; ++i) {
    current_char = s_text.charAt(i);
    if (valid_chars.indexOf(current_char) == -1) {
      result = false;
    }
  }
  return result;
}

/**
 * check if key is in correct format with key_type
 * @param key_type: target key type
 * @param key:  target key
 * @return check result, true valid, false invalid
 */
function validate_key(key_type, key)
{
  switch(key_type) {
    case "none":
    case "No key":
      return true;
      break;
    case "char5":
    case "5 characters(WEP64)":
      return key.length == 5;
      break;
    case "char13":
    case "13 characters(WEP128)":
      return key.length == 13;
      break;
    case "hex10":
    case "10 hex digits(WEP64)":
      return key.length == 10 && is_hex(key);
      break;
    case "hex26":
    case "26 hex digits(WEP64)":
      return key.length == 26 && is_hex(key);
      break;
    case "user":
    case "User input":
      return key.length > 0;
      break;
  }
  return false;
}

/**
 * check if target is numeric
 * @param s_text: target text
 */
function is_numeric(s_text)
{
  var ValidChars = "0123456789.";
  var IsNumber=true;
  var Char;

  for (i = 0; i < s_text.length && IsNumber == true; i++) {
    Char = s_text.charAt(i);
    if (ValidChars.indexOf(Char) == -1) {
      IsNumber = false;
    }
  }
  return IsNumber;
}

/**
 * Toggle big menu
 * @param oDiv: target menu div id
 */
function toggle_big_menu(oDiv){
  var vDiv = top.bodyFrame.mainFrame.leftFrame.document.getElementById(oDiv);
  vDiv.style.display = (vDiv.style.display == 'none')?'block':'none';
}

/**
 * Set background image
 * @param img_id: target id.
 * @param img_src: target img path.
 */
function set_background_image(id, img_src)
{
	var target = document.getElementById(id);
	target.style.background = "url("+img_src+")";
}

/**
 * Set div color
 * @param img_id: target div
 * @param target_color: target color
 */
function set_div_color(div_id, target_color)
{
  var target_div = document.getElementById(div_id);
  target_div.style.color = target_color;
}

/**
 * Set div background-url
 * @param img_id: target div
 * @param img_src: target img path.
 */
function set_div_bg_url(div_id, img_src)
{
  var target_div = document.getElementById(div_id);
  target_div.style.background = "url(" + img_src + ")";
}

/**
 * Set image src
 * @param img_id: target img id.
 * @param img_src: target img path.
 */
function set_image_src(img_id, img_src)
{
  var target_img = document.getElementById(img_id);
  target_img.src = img_src;
}

/**
 * Redirect to target page.
 * @param page: target page
 */
function redirect(page)
{
  window.location = page;
}

/**
 * Redirect main frame to target page.
 * @param page: target page
 */
function redirect_main(page)
{
  top.bodyFrame.mainFrame.rightFrame.mainContentFrame.location.href = page;
}

/**
 * Redirect top to target page.
 * @param page: target page
 */
function redirect_top(page)
{
  top.location.href = page;
}

/**
 * Check text field is blank or not
 * Return true if field is blank.
 * Otherwise return false.
 * @param field: target field
 * @return: check result
 */
function check_text_blank(field)
{
  if (field == null || field.value.length == 0) {
    return true;
  } else {
    return false;
  }
}

/**
 * Check field length is in valid range.
 * Return true if field length is in valid range.
 * Otherwise return false.
 * @param field: target field
 * @param min_length: min length
 * @param max_length: max length
 * @return: check result
 */
function check_length(field, min_length, max_length)
{
  if (field == null || field.value.length < min_length || field.value.length > max_length) {
    return false;
  } else {
    return true;
  }
}

/**
 * Check field is all in digit.
 * Return true if field is all in digit.
 * Otherwise return false.
 * @param field: target field
 * @return: check result
 */
function check_digit(field)
{
  var valid_chars = "0123456789";
  var is_number = true;
  var cur_char;

  for (i = 0; i < field.value.length && is_number == true; ++i) {
    cur_char = field.value.charAt(i); 
    if (valid_chars.indexOf(cur_char) == -1) {
      is_number = false;
    }
  }
  return is_number;
}

/**
 * Check s_text is integer
 * @param field: target text
 * @return: check result
 */
function check_integer(s_text)
{
  var valid_chars = "0123456789";
  var is_number = true;
  var cur_char;

  for (i = 0; i < s_text.length && is_number == true; ++i) {
    cur_char = s_text.charAt(i); 
    if (valid_chars.indexOf(cur_char) == -1) {
      is_number = false;
    }
  }
  return is_number;
}

/**
 * Check field is all in digit.
 * Return true if field is all in digit.

 * Otherwise return false.
 * @param field: target field
 * @return: check result

 */
function check_port(port)
{
  if (check_integer(port)) {
    if (port >= 1 && port <= 65535) {
      return true;
    }
  }
  return false;
}

/**
 * Check if ip is valid or not.
 * xxx.xxx.xxx.xxx
 * @return: check result.
 **/
function check_ip(ipaddress)
{
  if ((ipaddress.value == null) || (ipaddress.value.length == 0))
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

/**
 * Check if mac is valid or not.
 * xx:xx:xx:xx:xx:xx, x = {0123456789ABCDEFabcdef}
 * @return: check result.
 **/
function check_mac(mac)
{
  var add_mac_reg = "^[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}$";
  var regex = new RegExp(add_mac_reg);
  if (regex.test(mac.value)) {
    return true;
  }
  else {
    return false;
  }
}

/**
 * Check if enter PIN is valid or not.
 * 4-8 digits.
 * @return: check result.
 **/
function check_pin(pin)
{
  if (check_text_blank(pin)) {
    return false;
  }
  if (!check_digit(pin)) {
    return false;
  }
  if (!check_length(pin, 4, 8)) {
    return false;
  }
  return true;
}

/**
 * Check if enter PUK is valid or not.
 * @return: check result.
 **/
function check_puk(puk)
{
  if (check_text_blank(puk)) {
    return false;
  }
  return true;
}

function createMenu(index, endindex)
{
	for (var i = 1; i <= endindex; i++)
	{
		if(index == i)
		  document.getElementById(index).className = "on";
		else
		  document.getElementById(i).className = "";
	}
}


function convertString(encoded_str)
{
    var i = 0;
    var myObj = {"str":"&", len: 1}; 
   
	for(i = 0; i < replace_array.length; i++)
	{
		if(0 == encoded_str.indexOf(replace_array[i].replace_str))
		{
		    myObj.str = replace_array[i].str;
		    myObj.len = replace_array[i].replace_str.length;
		    return myObj;
		}
    }
    return myObj;
}

function replaceSpecialString(value)
{
	var i = 0;	
	var vlen = value.length;
	var decoded_obj;
	var res_value = ""; 
	
	for(i=0; i<vlen; i++)
	{
	    if(value.substr(i, 1) != "&")
	        res_value += value.substr(i, 1);
	    else
        {
            decoded_obj = convertString(value.substr(i));
            res_value += decoded_obj.str;
            i += decoded_obj.len;
            i--;
        }
	}

	return res_value;
}
//--------------- common function end ------------------------------------