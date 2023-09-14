
var webdav_rootpath = "/webdav";
var xhr_sd_query = null;
var process_cb = null;

function fx_encode(path)
{
	var divide_path = path.split("/");
	var encode_path='';
	for(var i = 1; i < divide_path.length; i++)
	{
		encode_path = encode_path+'/'+encodeURIComponent(divide_path[i]);	
	}
	return encode_path;
}

function get_register_cb() 
{
      return process_cb;
} 

function register_cb(call_back) 
{
      process_cb = call_back ;
}

function WebDav_SendCOPYorMOVE(method, call_back, host, src, dest)
{
    if( xhr_sd_query == null )
    {
        xhr_sd_query = createXHR();
    }
	
    if (xhr_sd_query)
    {
	    if(src == webdav_rootpath)
			src = webdav_rootpath+'/';
		
		if(dest == webdav_rootpath)
			dest = webdav_rootpath+'/';	
		
	    var encode_path = fx_encode(src);		
	    xhr_sd_query.open(method, encode_path);				
	    xhr_sd_query.setRequestHeader("Host", host);
	    xhr_sd_query.setRequestHeader("Destination", "http://"+host+dest);		
            xhr_sd_query.onreadystatechange = call_back;
	    xhr_sd_query.send(null);
    }
}

function WebDav_SendPUT(call_back, path, filetype, content, contentLength, progressHandler, completeHandler)
{
    if( xhr_sd_query == null )
    {
        xhr_sd_query = createXHR();
    }

    if (xhr_sd_query)
    {
		if(path == webdav_rootpath)
			path = webdav_rootpath+'/';

		var encode_path = fx_encode(path);
		xhr_sd_query.open("PUT", encode_path);
        xhr_sd_query.upload.addEventListener("progress", progressHandler, false);
        xhr_sd_query.addEventListener("load", completeHandler, false);        

		//xhr_sd_query.setRequestHeader("Content-Type", filetype);		
        xhr_sd_query.onreadystatechange = call_back;
	    xhr_sd_query.send(content);
    }
}
    
function WebDav_SendOptions(method,call_back, path)
{
    if( xhr_sd_query == null )
    {
        xhr_sd_query = createXHR();
    }

    if (xhr_sd_query)
    {
		if(path == webdav_rootpath)
			path = webdav_rootpath+'/';
		
		var encode_path = fx_encode(path);
		xhr_sd_query.open(method, encode_path);		
		xhr_sd_query.setRequestHeader("Content-type", "text/xml;charset=UTF-8");			
        xhr_sd_query.onreadystatechange = call_back;
        xhr_sd_query.send(null);
    }        
}

function preprocess_cb(xml_content)
{
    //alert("preprocess_cb: typeof xml_content = " + typeof xml_content);
    var call_back = get_register_cb ();
    if( null == call_back )
    {
         alert("no one register call back function!!!");
         return;
    }
    if( null == xml_content )
    {
         alert("null == xml_content!!!");
         return;
    }
	if(typeof xml_content == "string")
	{
	    return call_back(-1, xml_content);
	}

	call_back(0, xml_content);
}

function WebDav_PropfindXML(path, xmlData, cb) 
{
    var ret;
    if( xhr_sd_query == null )
    {
        xhr_sd_query = createXHR();
    }
    if (xhr_sd_query)
    {
        xhr_sd_query.open("PROPFIND", path);
        xhr_sd_query.setRequestHeader("Content-type", "text/xml;charset=UTF-8");
        xhr_sd_query.setRequestHeader("Depth", "1");
        xhr_sd_query.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 207) 
            {
                //return this.responseXML;
                //return cb(this.responseXML);
                cb(this.responseXML);
            }else if (this.readyState == 4 && this.status != 207)
            {
                cb("PROPFIND_Error");
            }
        };
        xhr_sd_query.send(xmlData);
    }
}

function WebDav_PROPFIND (path, call_back) 
{ 		
	var xml = '<?xml version=\"1.0\" encoding=\"utf-8\"?>\n';
	xml += '<propfind xmlns=\"DAV:\">\n';
	xml += '<prop>\n';
	xml += '<getcontentlength/>\n';
	xml += '<resourcetype/>\n';
	xml += '<getlastmodified/>\n';
	xml += '</prop>\n';
	xml += '</propfind>\n';

	var encode_path = fx_encode(path);

    register_cb(call_back);
	WebDav_PropfindXML(encode_path, xml, preprocess_cb);
}