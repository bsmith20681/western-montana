var dataChanged		= false;
var gHighLightColor	= 'feffbd';

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

//grabs the "browseType" that we need for naming the cookie ...
function QueryUrlDataForCookie(queryString)
{

	queryString = queryString + "";  //just to make doubly sure we have a JS string object.  (the +"" forces a cast)

	// if a query string wasn't specified, use the query string from the URL
	if (queryString == undefined)
	{
		queryString = location.search ? location.search : '';
	}

	// remove the leading question mark from the query string if it is present
	if (queryString.charAt(0) == '?') queryString = queryString.substring(1);

	// check whether the query string is empty
	if (queryString.length > 0)
	{

		// replace plus signs in the query string with spaces
		queryString = queryString.replace(/\+/g, ' ');

		// split the query string around ampersands and semicolons
		var queryComponents = queryString.split(/[&;]/g);

		// loop over the query string components
		for (var index = 0; index < queryComponents.length; index ++)
		{
			// extract this component's key-value pair
			var keyValuePair = queryComponents[index].split('=');
			var key          = decodeURIComponent(keyValuePair[0]);
			var value        = keyValuePair.length > 1
							   ? decodeURIComponent(keyValuePair[1])
							   : '';

			////THIS CHECK IS NEEDED, because if the full url is entered it will be
			// omar.testxolighst.com/Page-ItemBrowse?browseType     at this point
			// and we need just "browseType" as the key, not the whole shabang
			if (index == 0) //for key must chop off everything before the "?" sign
			{
				//alert(key);  //debug
				var posQuestionMark = key.search("browseType");
				key = key.substr(posQuestionMark);
				//alert(key);  //debug
			}

			// store the value
			this[key] = value;
		}
	}

	var browseType = this['browseType'];
	if (typeof browseType === "undefined")
	{
		browseType = "CatalogBrowse";  //default to CatalogBrowse if nothing entered
	}

	//alert(browseType); //debug, this is the final value we need
	return browseType;

}  //End QueryUrlDataForCookie function


// Wrapper function, created for ItemList html, to set the location of the current page for the cookie
function createBackToSearchResultsCookie(url)
{

	////1st pull out the browse type from window.location ... THEN create the cookie depending on that.
	////parse ( window.location  )  and get "browseType", QueryUrlDataForCookie is basically the parse
	var browseType = QueryUrlDataForCookie(url)
	var cookieName = browseType;
	createCookie(cookieName, window.location);  //or could use window.location, for 2nd param, either one

}

// gets the base url ... say its illuminous.testxolights.com/something/something/somethingLongOldPageUrl
// it will return just the top part ...  (illumionous.testxolights.com) , useful when you need to get to the site root
function getBaseURL() {
    var url = location.href;  // entire url including querystring - also: window.location.href;
    var baseURL = url.substring(0, url.indexOf('/', 14));


    if (baseURL.indexOf('http://localhost') != -1) {
        // Base Url for localhost
        var url = location.href;  // window.location.href;
        var pathname = location.pathname;  // window.location.pathname;
        var index1 = url.indexOf(pathname);
        var index2 = url.indexOf("/", index1 + 1);
        var baseLocalUrl = url.substr(0, index2);

        return baseLocalUrl + "/";
    }
    else {
        // Root Url for domain name
        return baseURL + "/";
    }

}


function goBackToSearchResults(browseType) {
	browseType = browseType + "";  //typecast to string basically

	var goLocation = readCookie(browseType);
	//alert(goLocation);  //debug

	//if cookie doesn't exist, default search in the CatalogBrowse (Chad told me it was Lighting-Fixtures)
	if (goLocation == "" || typeof goLocation == "undefined") {
		goLocation = getBaseURL() + "Lighting-Fixtures";
	}

	window.location = goLocation;
}


function checkDataChanged() {
	if (dataChanged) {
		if (confirm('Are you sure you wish to continue? All unsaved data on this page will be lost.'))
			return true;
		else
			return false;
	} else {
		return true;
	}
}

function toggleVII(forPrint)
{
	var vii = $('.vii');

	if (typeof forPrint === "undefined")
	{
		if ( vii.css("visibility") == "visible" )
		{
			vii.css("display", "");
			vii.css("visibility", "hidden");
			createCookie("viiVisible","0",365);
		}
		else
		{
			vii.css("display", "");
			vii.css("visibility", "visible");
			createCookie("viiVisible","1",365);
		}
	}
	else if (forPrint)
	{
		vii.css("display", "none");
		vii.css("visibility", "hidden");
	}
	else
	{
		vii.css("display", "");
		vii.css("visibility", "visible");
	}
	return;
}

function toggleCOGS(forPrint)
{
	var cogs = $('.cogs');
	var move = null;

	if (typeof forPrint === "undefined")
	{
		if ( cogs.css("visibility") == "visible" )
		{
			cogs.css("display", "");
			cogs.css("visibility", "hidden");
			createCookie("cogsVisible","0", 365);
			move = '0px';
		}
		else
		{
			cogs.css("display", "");
			cogs.css("visibility", "visible");
			createCookie("cogsVisible","1", 365);
			move = '50px';
		}
	}
	else if (forPrint)
	{
		cogs.css("display", "none");
		cogs.css("visibility", "hidden");
		move = '0px';
	}
	else
	{
		cogs.css("display", "");
		cogs.css("visibility", "visible");
		move = '0px';
	}
	// fix cogs overlapping (JQuery re-write);
	if(move.length > 0)
		$('ul.ulMoveMeDown').css("margin-top", move);
}

var isCtrl = false;
var isAlt = false;
document.onkeyup=function(e)
{
	var keycode;
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;

	if(keycode == 17) isCtrl=false;
	if(keycode == 18) isAlt=false;
}

fieldEnteredOn = "";
document.onkeydown=function(e)
{
	var keycode;
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;

	if(keycode == 17) isCtrl=true;
	if(keycode == 18) isAlt=true;
	if(keycode == 86 && isCtrl == true && isAlt == true)
	{
		toggleVII();
		return false;
	}
	if(keycode == 67 && isCtrl == true && isAlt == true)
	{
		toggleCOGS();
		return false;
	}
	if (keycode == 13)
	{
		if (window.event)
			targ = window.event.srcElement;
		else if (e)
			targ = e.target;

		while (targ.nodeType > 1) {
			targ = targ.parentNode;
		}

		if (targ.form && targ.tagName != 'TEXTAREA')
		{
			fieldEnteredOn = targ.name;
			targ.form.submit();
		}
	}
}

function combineFunctions(function1, function2) {
    return function() {
        if (function1)
            function1();
        if (function2)
            function2();
    }
}

function fireOnclick(objID)
{
	var target=document.getElementById(objID);
	if(document.dispatchEvent) // W3C
	{
		var oEvent = document.createEvent( "MouseEvents" );
		oEvent.initMouseEvent("click", true, true,window, 1, 1, 1, 1, 1, false, false, false, false, 0, target);
		target.dispatchEvent( oEvent );
	}
	else if(document.fireEvent) // IE
	{
		target.fireEvent("onclick");
	}
}



/* ************************************** */
/* START generic global light box scripts */


	var sW;
	var sH;
	var sT;
	var ns	= (navigator.appName.indexOf("Netscape") != -1);
	var ie	= (navigator.appName.indexOf("Internet Explorer") != -1);
	function setScreenSize() {
		if ( ie ) {
		   	sW = document.documentElement.scrollLeft + document.documentElement.clientWidth;
		   	sH = document.documentElement.scrollTop + document.documentElement.clientHeight;
			sT = document.documentElement.scrollTop;
		   	if ( sW == 0 ) { sW = document.body.scrollLeft + document.body.clientWidth; }
		   	if ( sH == 0 ) { sH = document.body.scrollTop + document.body.clientHeight; }
		   	if ( sT == 0 ) { sT = document.body.scrollTop; }
		} else if ( ns ) {
			sW = pageXOffset + innerWidth;
			sH = pageYOffset + innerHeight;
			sT = pageYOffset;
		} else {
			sW = document.body.scrollLeft + document.body.clientWidth;
			sH = document.body.scrollTop + document.body.clientHeight;
			sT = document.body.scrollTop;
		}

	}

	// actual jquery scripts moved to header files
	function gLightBox(jsonParams,pCloseTog,pPositioning,pReloadInfoLinks) {
		setScreenSize();

		var gLightBoxBG	= document.getElementById('gLightBoxBG');
		var gLightBox	= document.getElementById('gLightBox');

		// include a style sheet
		var newStyle		= document.createElement('link');
			newStyle.type	= 'text/css';
			newStyle.rel	= 'stylesheet';
			newStyle.href	= 'css/gLightBox.css';
			document.getElementsByTagName('head')[0].appendChild(newStyle);


		// setup background div unless already done
		if ( !gLightBoxBG ) {
			var bgDiv			= document.createElement('div');
				bgDiv.id		= 'gLightBoxBG';
				bgDiv.onclick	= ((pCloseTog) ? '' : function(){ rLightBox() } );
				bgDiv.title		= ((pCloseTog) ? '' : 'click to continue' );
				document.getElementsByTagName('body')[0].appendChild(bgDiv);
		}
		// setup main light box div unless already done
		if ( !gLightBox ) {
			var newDiv						= document.createElement('div');
				newDiv.id					= 'gLightBox';
				newDiv.style.display		= 'none';
				newDiv.style.position		= ((pPositioning) ? 'absolute' : 'fixed' );
				document.getElementsByTagName('body')[0].appendChild(newDiv);
		} else {
			gLightBox.style.display		= 'none';
		}


		// reset div elements
		gLightBoxBG	= document.getElementById('gLightBoxBG');
		gLightBox	= document.getElementById('gLightBox');

		// show light box background now
		gLightBoxBG.style.display	= 'block';
		gLightBoxBG.style.width		= sW+'px';
		gLightBoxBG.style.height	= sH+'px';
		gLightBoxBG.style.left		= '0px';
		gLightBoxBG.style.top		= '0px';

		// show light box now & set placement
		// default to 600x400 - call resizeLightBox() to resize
		gLightBox.style.display		= 'block';
		gLightBox.style.width		= '600px';
		gLightBox.style.height		= '400px';
		gLightBox.style.left		= ((sW-600)/2)+'px';
		gLightBox.style.top			= parseInt((pPositioning) ? sT+25 : 25 )+'px';

		// some default/loading text - background-color:#fff;
		if ( gLightBox && !jsonParams ) {
			var htmlStr		= '<div style="width:'+gLightBox.style.width+'; height:'+gLightBox.style.height+';">'
							+ '<img src="css/smoothness/images/ajax-loader_trans.gif" class="lbLoadingImage" alt="... Loading ..." title="... Loading ..." \/>'
							+ '<br \/>'
							+ '... Loading ...'
							+ '<\/div>';
			gLightBox.innerHTML	= htmlStr;
		} else {

			// default to on
			pReloadInfoLinks	= ((pReloadInfoLinks !== false) ? true : false );
			var passFuseaction	= ((pReloadInfoLinks === true) ? jsonParams['ajaxhandler'] : false );

			// ******************************************** //
			// make ajax call and load data string directly
			$('#gLightBox').load("index.php", jsonParams, function(){ toggleLightBox(false, passFuseaction); });
//			$(function() { $( "#gLightBox" ).draggable(); });
		}

	}

	function toggleLightBox(pToggle,pFuseaction) {
		var gLightBox	= document.getElementById('gLightBox');
		var dispValue	= ((pToggle) ? 'block' : 'none' );
		if ( gLightBox ) {
			gLightBox.style.display			= 'block'; // dispValue;
			gLightBox.style.backgroundColor	= ((dispValue=='block') ? '#fff' : 'transparent' );

			// reload info links
			// pass fuseaction: grab other pages being loaded
			if ( pFuseaction ) {
				gGetInfoElements(pFuseaction);
			} else {

				gLoadInfoElements();
			}
		}
	}

	function rLightBox() {
		rInfoDiv();
		var gLightBoxBG	= document.getElementById('gLightBoxBG');
		var gLightBox	= document.getElementById('gLightBox');
		if ( gLightBoxBG && gLightBox ) {
			document.getElementsByTagName('body')[0].removeChild(gLightBoxBG);
			document.getElementsByTagName('body')[0].removeChild(gLightBox);
		}
	}

	function resizeLightBox(pWidth,pHeight,pElement,pOffset,pCallback,pJustResize) {
		setScreenSize();

		if ( pJustResize !== true ) {
			// hide content until loaded
			var curElement	= document.getElementById(pElement);
			var tempDiv		= document.getElementById('tempDiv');
			if ( curElement && tempDiv ) {
				tempDiv.style.display		= 'none';
			}
		}

		toggleLightBox(true);
		animateResize(pWidth,pHeight,pElement,pOffset,pCallback);

	}

	function animateResize(pWidth,pHeight,pElement,pOffset,pCallback,pStep) {
		var gLightBox	= document.getElementById('gLightBox');
		var pStep		= parseInt(((pStep) ? pStep : 0 ) + 1);
		var tSteps		= 10;


		if ( gLightBox ) {

			if ( pElement ) {
				var mWrapper	= document.getElementById(pElement);
				var mOffset		= ((pOffset) ? pOffset : 0 );
			}

			var newWidth	= pWidth;
			var newHeight	= pHeight;
//			var newTop		= 50;
			var newLeft		= ((sW-pWidth)/2);

			var newW		= 0;
			var newH		= 0;
			var newL		= 0;

			var tWidth		= parseInt(gLightBox.style.width.replace('px',''));
			var tHeight		= parseInt(gLightBox.style.height.replace('px',''));

			if ( tWidth > 0 ) {
				if ( pStep <= tSteps ) {
					newW = Math.round(pWidth - ((pWidth - tWidth) * (tSteps - pStep) / tSteps));
					newH = Math.round(pHeight - ((pHeight - tHeight) * (tSteps - pStep) / tSteps));
					newL = ((sW-newW)/2);

					gLightBox.style.width	= newW+'px';
					gLightBox.style.height	= newH+'px';
//					gLightBox.style.top		= newTop+'px';
					gLightBox.style.left	= newL+'px';

					if ( mWrapper ) {
						mWrapper.style.width	= parseInt(newW-mOffset)+'px';
						mWrapper.style.height	= parseInt(newH-mOffset)+'px';
					}

					setTimeout(function(){ animateResize(pWidth,pHeight,pElement,pOffset,pCallback,pStep); },20);
				}
			} else {
					gLightBox.style.width	= newWidth+'px';
					gLightBox.style.height	= newHeight+'px';
//					gLightBox.style.top		= newTop+'px';
					gLightBox.style.left	= newLeft+'px';
			}

			// callback when fully loaded and sized
			if ( (pStep == tSteps) ) {
				if ( typeof(pCallback) == 'function' ) {

					// show content when loading
					var curElement	= document.getElementById(pElement);
					var tempDiv		= document.getElementById('tempDiv');
					if ( curElement && tempDiv ) {
						tempDiv.style.display	= 'block';
					}

					return pCallback();
				}
			}

//			$( "#gLightBox" ).show( 'size', { to: { width: newWidth, height: newHeight } }, 500, callback );

		}

	}

	// function to pop open the test/print window
	function printTearSheet(pBasePath,pVid,pViid) {
		var usePath	= ((pBasePath) ? pBasePath : '' );
		var windowoptions;
		var appwindow;
		var w = 850;
		var h = (((screen.height) > 1050) ? 1050 : (screen.height - 100) );
		var sW = (screen.width-w)/2;
		var sH = (screen.height-h)/2;
		windowoptions = "menubar=yes,resizable=no,width="+w+",height="+h+",scrollbars=yes";
		appwindow = window.open(pBasePath+"/Page-TagsPrintLayout?get=tear&vid="+pVid+"&viid="+pViid,"TagsPrintPopup",windowoptions);
		if ( appwindow ) {
			appwindow.moveTo(sW,sH);
			appwindow.focus();
		}

	}

	function gAddOnload(pFunction) {
		var gOldOnload;

		if ( typeof(pFunction) == 'function' ) {
			if ( typeof(window.onload) == 'function' ) {
				gOldOnload    = window.onload;
				window.onload = function() {
					gOldOnload();
					pFunction();
				}
			} else {
				window.onload = pFunction;
			}
		}
	}


	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g,"");
	}

	function implode(glue, pieces) {
		var i = '',
			retVal = '',
			tGlue = '';
		if (arguments.length === 1) {
			pieces = glue;
			glue = '';
		}
		if (typeof(pieces) === 'object') {
			if (pieces instanceof Array) {
				return pieces.join(glue);
			} else {
				for (i in pieces) {
					retVal += tGlue + pieces[i];
					tGlue = glue;
				}
				return retVal;
			}
		} else {
			return pieces;
		}
	}

	function in_array(needle, haystack, argStrict) {
		var key = '', strict = !! argStrict;

		if (strict) {
			for (key in haystack) {
				if (haystack[key] === needle) {				return true;
				}
			}
		} else {
			for (key in haystack) {			if (haystack[key] == needle) {
					return true;
				}
			}
		}
		return false;
	}

	function dump(arr,level) {
		var dumped_text = "";
		if (!level) level = 0;

		var level_padding = "";
		for (var j=0;j<level+1;j++) {
			level_padding += "	";
		}

		if (typeof(arr) == 'object') {
			for(var item in arr) {
				var value = arr[item];
				if(typeof(value) == 'object') {
					dumped_text += level_padding + "'" + item + "' ...\n";
					dumped_text += dump(value,level+1);
				} else {
					dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
				}
			}
		} else {
			dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
		}
		alert(dumped_text);
		//return dumped_text;
	}

	function dumpV(arr,level) {
		var dumped_text = "";
		if(!level) level = 0;

		var level_padding = "";
		for(var j=0;j<level+1;j++) {
			level_padding += "	";
		}

		if(typeof(arr) == 'object') {
			for(var item in arr) {
				var value = arr[item];
				if(typeof(value) == 'object') {
					dumped_text += level_padding + "'" + item + "' ...\n";
					dumped_text += dump(value,level+1);
				} else {
					dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
				}
			}
		} else {
			dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
		}
		document.write(dumped_text);
		//return dumped_text;
	}


	function disableEnterKey(e) {
		var key;
		if ( window.event )
			key = window.event.keyCode;     //IE
		else
			key = e.which;     //firefox
		if ( key == 13 )
			return false;
		else
			return true;
	}

	function ucwords(str) {
		return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
			return $1.toUpperCase();
		});
	}

	function htmlentities(string, quote_style, charset, double_encode) {
	    var hash_map = {},
	        symbol = '',
	        entity = '',
	        self = this;
	    string += '';
	    double_encode = !!double_encode || double_encode == null;

	    if (false === (hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style))) {
	        return false;
	    }
	    hash_map["'"] = '&#039;';

	    if (double_encode) {
	        for (symbol in hash_map) {
	            entity = hash_map[symbol];
	            string = string.split(symbol).join(entity);
	        }
	    } else {
	        string = string.replace(/([\s\S]*?)(&(?:#\d+|#x[\da-f]+|[a-z][\da-z]*);|$)/g, function (ignore, text, entity) {
	            return self.htmlentities(text, quote_style, charset) + entity;
	        });
	    }

	    return string;
	}

	function get_html_translation_table(table, quote_style) {
	    var entities = {},
	        hash_map = {},
	        decimal = 0,
	        symbol = '';
	    var constMappingTable = {},
	        constMappingQuoteStyle = {};
	    var useTable = {},
	        useQuoteStyle = {};

	    // Translate arguments
	    constMappingTable[0] = 'HTML_SPECIALCHARS';
	    constMappingTable[1] = 'HTML_ENTITIES';
	    constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
	    constMappingQuoteStyle[2] = 'ENT_COMPAT';
	    constMappingQuoteStyle[3] = 'ENT_QUOTES';

	    useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
	    useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';

	    if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
	        throw new Error("Table: " + useTable + ' not supported');
	        // return false;
	    }

	    entities['38'] = '&amp;';
	    if (useTable === 'HTML_ENTITIES') {
	        entities['160'] = '&nbsp;';
	        entities['161'] = '&iexcl;';
	        entities['162'] = '&cent;';
	        entities['163'] = '&pound;';
	        entities['164'] = '&curren;';
	        entities['165'] = '&yen;';
	        entities['166'] = '&brvbar;';
	        entities['167'] = '&sect;';
	        entities['168'] = '&uml;';
	        entities['169'] = '&copy;';
	        entities['170'] = '&ordf;';
	        entities['171'] = '&laquo;';
	        entities['172'] = '&not;';
	        entities['173'] = '&shy;';
	        entities['174'] = '&reg;';
	        entities['175'] = '&macr;';
	        entities['176'] = '&deg;';
	        entities['177'] = '&plusmn;';
	        entities['178'] = '&sup2;';
	        entities['179'] = '&sup3;';
	        entities['180'] = '&acute;';
	        entities['181'] = '&micro;';
	        entities['182'] = '&para;';
	        entities['183'] = '&middot;';
	        entities['184'] = '&cedil;';
	        entities['185'] = '&sup1;';
	        entities['186'] = '&ordm;';
	        entities['187'] = '&raquo;';
	        entities['188'] = '&frac14;';
	        entities['189'] = '&frac12;';
	        entities['190'] = '&frac34;';
	        entities['191'] = '&iquest;';
	        entities['192'] = '&Agrave;';
	        entities['193'] = '&Aacute;';
	        entities['194'] = '&Acirc;';
	        entities['195'] = '&Atilde;';
	        entities['196'] = '&Auml;';
	        entities['197'] = '&Aring;';
	        entities['198'] = '&AElig;';
	        entities['199'] = '&Ccedil;';
	        entities['200'] = '&Egrave;';
	        entities['201'] = '&Eacute;';
	        entities['202'] = '&Ecirc;';
	        entities['203'] = '&Euml;';
	        entities['204'] = '&Igrave;';
	        entities['205'] = '&Iacute;';
	        entities['206'] = '&Icirc;';
	        entities['207'] = '&Iuml;';
	        entities['208'] = '&ETH;';
	        entities['209'] = '&Ntilde;';
	        entities['210'] = '&Ograve;';
	        entities['211'] = '&Oacute;';
	        entities['212'] = '&Ocirc;';
	        entities['213'] = '&Otilde;';
	        entities['214'] = '&Ouml;';
	        entities['215'] = '&times;';
	        entities['216'] = '&Oslash;';
	        entities['217'] = '&Ugrave;';
	        entities['218'] = '&Uacute;';
	        entities['219'] = '&Ucirc;';
	        entities['220'] = '&Uuml;';
	        entities['221'] = '&Yacute;';
	        entities['222'] = '&THORN;';
	        entities['223'] = '&szlig;';
	        entities['224'] = '&agrave;';
	        entities['225'] = '&aacute;';
	        entities['226'] = '&acirc;';
	        entities['227'] = '&atilde;';
	        entities['228'] = '&auml;';
	        entities['229'] = '&aring;';
	        entities['230'] = '&aelig;';
	        entities['231'] = '&ccedil;';
	        entities['232'] = '&egrave;';
	        entities['233'] = '&eacute;';
	        entities['234'] = '&ecirc;';
	        entities['235'] = '&euml;';
	        entities['236'] = '&igrave;';
	        entities['237'] = '&iacute;';
	        entities['238'] = '&icirc;';
	        entities['239'] = '&iuml;';
	        entities['240'] = '&eth;';
	        entities['241'] = '&ntilde;';
	        entities['242'] = '&ograve;';
	        entities['243'] = '&oacute;';
	        entities['244'] = '&ocirc;';
	        entities['245'] = '&otilde;';
	        entities['246'] = '&ouml;';
	        entities['247'] = '&divide;';
	        entities['248'] = '&oslash;';
	        entities['249'] = '&ugrave;';
	        entities['250'] = '&uacute;';
	        entities['251'] = '&ucirc;';
	        entities['252'] = '&uuml;';
	        entities['253'] = '&yacute;';
	        entities['254'] = '&thorn;';
	        entities['255'] = '&yuml;';
	    }

	    if (useQuoteStyle !== 'ENT_NOQUOTES') {
	        entities['34'] = '&quot;';
	    }
	    if (useQuoteStyle === 'ENT_QUOTES') {
	        entities['39'] = '&#39;';
	    }
	    entities['60'] = '&lt;';
	    entities['62'] = '&gt;';


	    // ascii decimals to real symbols
	    for (decimal in entities) {
	        symbol = String.fromCharCode(decimal);
	        hash_map[symbol] = entities[decimal];
	    }

	    return hash_map;
	}

	function explode(delimiter, string, limit) {
	    var emptyArray = {
	        0: ''
	    };

	    // third argument is not required
	    if (arguments.length < 2 || typeof arguments[0] == 'undefined' || typeof arguments[1] == 'undefined') {
	        return null;
	    }

	    if (delimiter === '' || delimiter === false || delimiter === null) {
	        return false;
	    }

	    if (typeof delimiter == 'function' || typeof delimiter == 'object' || typeof string == 'function' || typeof string == 'object') {
	        return emptyArray;
	    }

	    if (delimiter === true) {
	        delimiter = '1';
	    }

	    if (!limit) {
	        return string.toString().split(delimiter.toString());
	    } else {
	        // support for limit argument
	        var splitted = string.toString().split(delimiter.toString());
	        var partA = splitted.splice(0, limit - 1);
	        var partB = splitted.join(delimiter.toString());
	        partA.push(partB);
	        return partA;
	    }
	}

	function preg_split(pattern, subject, limit, flags) {
	    limit = limit || 0; flags = flags || ''; //Limit and flags are optional
	    var result, ret=[], index=0, i = 0,
	        noEmpty = flags.indexOf("PREG_SPLIT_NO_EMPTY") !== -1,
	        delim = flags.indexOf("PREG_SPLIT_DELIM_CAPTURE") !== -1,
	        offset = flags.indexOf("PREG_SPLIT_OFFSET_CAPTURE") !== -1,
			regexpBody=/^\/(.*)\/\w*$/.exec(pattern.toString())[1],
			regexpFlags=/^\/.*\/(\w*)$/.exec(pattern.toString())[1];
			//non global regexp cause a infinite loop when executing the while,
			//so if it's not global copy the regexp and add the "g" modifier.
			pattern=pattern.global || typeof pattern!="string" ? pattern :
					new RegExp(regexpBody,regexpFlags+(regexpFlags.indexOf("g")!==-1 ? "":regexpFlags+"g"));
	    var _filter = function(str,strindex) {
	        // If the match is empty and the PREG_SPLIT_NO_EMPTY flag is set don't add it
	        if(noEmpty && !str.length) {return;}
	        // If the PREG_SPLIT_OFFSET_CAPTURE flag is set
	        // transform the match into an array and add the index at position 1
	        if(offset) {str = [str,strindex];}
	        ret.push(str);
	    };
		//Special case for empty regexp
		if(!regexpBody){
			var result=subject.split("");
			for(i=0;i<result.length;i++) _filter(result[i],i);
			return ret;
		}
	    // Exec the pattern and get the result
	    while(result = pattern.exec(subject)) {
	        // Stop if the limit is 1
	        if (limit === 1) {break;}
	        // Take the correct portion of the string and filter the match
	        _filter(subject.slice(index, result.index), index);
	        index = result.index+result[0].length;
	        // If the PREG_SPLIT_DELIM_CAPTURE flag is set every capture match must be included in the results array
	        if(delim) {
	            // Convert the regexp result into a normal array
	            var resarr = Array.prototype.slice.call(result);
	            for(i = 1; i < resarr.length; i++) {
	                if(result[i] !== undefined) {
	                    _filter(result[i], result.index+result[0].indexOf(result[i]));
	                }
	            }
	        }
	        limit--;
	    }
	    // Filter last match
	    _filter(subject.slice(index, subject.length), index);
	    return ret;
	}


	// date stuff
	function getDateMonth(pNum,pFull) {
		if ( pNum ) {
			var dateMonthArray		= [];
				dateMonthArray[0]	= 'Jan'+((pFull) ? 'uary' : '' );
				dateMonthArray[1]	= 'Feb'+((pFull) ? 'ruary' : '' );
				dateMonthArray[2]	= 'Mar'+((pFull) ? 'ch' : '' );
				dateMonthArray[3]	= 'Apr'+((pFull) ? 'il' : '' );
				dateMonthArray[4]	= 'May'+((pFull) ? '' : '' );
				dateMonthArray[5]	= 'Jun'+((pFull) ? 'e' : '' );
				dateMonthArray[6]	= 'Jul'+((pFull) ? 'y' : '' );

				dateMonthArray[7]	= 'Aug'+((pFull) ? 'ust' : '' );
				dateMonthArray[8]	= 'Sep'+((pFull) ? 'tember' : '' );
				dateMonthArray[9]	= 'Oct'+((pFull) ? 'ober' : '' );
				dateMonthArray[10]	= 'Nov'+((pFull) ? 'ember' : '' );
				dateMonthArray[11]	= 'Dec'+((pFull) ? 'ember' : '' );

			return dateMonthArray[pNum];
		}
	}

	// get select index and set value
	function selectValueSet(pSelect,pValue) {
		var selectObject = pSelect;
		if ( pValue == '' ) {
			selectObject.selectedIndex	= 0;
		} else {
			for ( var i=0,n=selectObject.length; i<n; i++ ) {
				if ( selectObject[i].value == pValue ) {
					selectObject.selectedIndex	= i;
				}
			}
		}
	}
	// get value and set radio
	function setCheckedValue(pRadio, pValue) {
		if ( !pRadio ) {
			return;
		}
		var radioLength = pRadio.length;
		if ( radioLength == undefined ) {
			pRadio.checked = (pRadio.value == pValue.toString());
			return;
		}
		for ( var i=0; i<radioLength; i++ ) {
			pRadio[i].checked = false;
			if ( pRadio[i].value == pValue.toString() ) {
				pRadio[i].checked = true;
			}
		}
	}


	function currencyFormat(pAmount) {
		var delimiter = ",";
		pAmount = new String(pAmount);
		var a = pAmount.split('.',2)
		var d = a[1];
		var i = parseInt(a[0]);
		if ( isNaN(i) ) {
			return '';
		}
		var minus = '';
		if ( i < 0 ) {
			minus = '-';
		}
		i = Math.abs(i);
		var n = new String(i);
		var a = [];
		while ( n.length > 3 ) {
			var nn = n.substr(n.length-3);
			a.unshift(nn);
			n = n.substr(0,n.length-3);
		}
		if ( n.length > 0 ) {
			a.unshift(n);
		}
		n = a.join(delimiter);
		if ( d.length < 1 ) {
			pAmount = n;
		} else {
			pAmount = n + '.' + d;
		}
		pAmount = minus + pAmount;
		return pAmount;
	}


/* --------------------------------------------------- */
// global ajax handler
	function gAjaxHandler(cbFunction,pParams,pUIClass,ajFunction) {
		var ajaxRequest;
		eval("var readyHandler = function() {"+cbFunction+"(ajaxRequest); };");

		if ( pParams ) {
			var tParams = '';
			for ( var p in pParams ) {
				tParams += "&"+p+"="+pParams[p];
			}
			pParams = tParams;
		}

		var params	= "ajaxfunction="+ajFunction+"&ajaxhandler="+pUIClass+pParams;

		if (window.ActiveXObject)
			ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
		else
			ajaxRequest = new XMLHttpRequest();

		ajaxRequest.open("POST","index.php?"+params,true);
		ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		ajaxRequest.setRequestHeader("Content-length", params.length);
		ajaxRequest.setRequestHeader("Cache-Control", "no-cache");
		ajaxRequest.setRequestHeader("Connection", "close");
		ajaxRequest.onreadystatechange = readyHandler;
		ajaxRequest.send(params);

		return ajaxRequest;
	}


/* --------------------------------------------------- */
/* track mouse movement */
	document.onmousemove = gMousePosition;

	var gMouseX	= 0;
	var gMouseY	= 0;

	function gMousePosition(e) {
		/* set the current positions */
		if (ie) {
			gMouseX = event.clientX + document.body.scrollLeft;
			gMouseY = event.clientY + document.body.scrollTop;
		} else {
			gMouseX = e.pageX;
			gMouseY = e.pageY;
		}
		if (gMouseX < 0) { gMouseX = 0; }
		if (gMouseY < 0) { gMouseY = 0; }

		return true;

	}

/* --------------------------------------------------- */
/* information links */
	var infoMapArray	= [];

	function initInfoLinks() {
/*
		var newJQuery1		= document.createElement('script');
			newJQuery1.type	= 'text/javascript';
			newJQuery1.src	= 'JavaScript/jquery/jquery-1.6.2.min.js';

		var newJQuery2		= document.createElement('script');
			newJQuery2.type	= 'text/javascript';
			newJQuery2.src	= 'JavaScript/jquery/jquery-ui-1.8.16.custom.min.js';

		document.getElementsByTagName('head')[0].appendChild(newJQuery1);
		document.getElementsByTagName('head')[0].appendChild(newJQuery2);
*/
		gGetInfoElements();
	}

	function gGetInfoElements(pFuseaction) {
		var newParams	= [];
		newParams['fuseaction']	= ((pFuseaction) ? pFuseaction : '' );
		gAjaxHandler('handleInfoElements',newParams,'InformationMapping','ajaxGetInfoElements');
	}

	function handleInfoElements(ajaxRequest) {
		var tData	= [];

		if (ajaxRequest.readyState == 4 && ajaxRequest.responseText.length > 0) {
			eval("tData	= " + ajaxRequest.responseText);

			for ( var i in tData ) {
				infoMapArray[i]		= [];
				infoMapArray[i]		= tData[i];
			}
//dump( infoMapArray );

			gLoadInfoElements();
		}
	}

	function gLoadInfoElements(pCounter) {
		var curElement;
		var newElement;
		var curSize		= '';
		var curStyle	= '';
		var curPosition	= '';
		var curPosVert	= '';
		var curPosHori	= '';
		var eStyle		= '';
		var curHeader	= '';

		rInfoDiv();

		for ( var i in infoMapArray ) {
			var aElement	= infoMapArray[i]['elementID'];
			var aID			= infoMapArray[i]['id'];
			if ( !document.getElementById('infoLink_'+aElement+aID) && document.getElementById(aElement) ) {
				curElement	= document.getElementById(aElement);
				curSize		= infoMapArray[i]['iSize'];
				curStyle	= infoMapArray[i]['iStyle'];
				curPosition	= infoMapArray[i]['iPosition'];
				curPosVert	= infoMapArray[i]['iPosVertical'];
				curPosHori	= infoMapArray[i]['iPosHorizontal'];
				curHeader	= ((infoMapArray[i]['headerText']) ? 'Help:  '+infoMapArray[i]['headerText'] : 'Click here for more Information' );
//				curHeader	= 'Click here for more Information';

				newElement								= document.createElement('img');
				newElement.id							= 'infoLink_'+curElement.id+aID;
				newElement.onclick						= function() { gLoadInfoString(this.id.replace('infoLink_',''),this.parentNode.id) };
//				newElement.onclick						= function() { var infoID = aID; gLoadInfoString(infoID,this.id.replace('infoLink_','')) };
				newElement.style.position				= 'absolute';
				newElement.style.top					= curPosVert+'px';
				eval("newElement.style."+curPosition+"	= '"+curPosHori+"px';");
				newElement.style.border					= 'solid 0px orange';
				newElement.style.width					= curSize+'px';
				newElement.style.height					= curSize+'px';
				newElement.className					= 'infoFadeLinks infoMap'+curStyle;
				newElement.alt							= curHeader;
				newElement.title						= curHeader;
				newElement.setAttribute('src', 'Images/infoLinks/info_'+curStyle+'.gif');
				newElement.setAttribute('alt', curHeader);

				curElement.style.position	= 'relative';
				curElement.appendChild(newElement);

			}
		}


		var useCounter	= ((pCounter) ? pCounter : 1 );
		if ( useCounter <= 3 ) {
			useCounter++;
			setTimeout( function() { gLoadInfoElements(useCounter); } , 1000);
		}

	}

	function gLoadInfoString(pInfoID,pElementID,pFuseaction) {
		var useID	= pInfoID.replace(pElementID,'');
		if ( document.getElementById(pElementID) ) {
			setScreenSize();
			var fuseaction	= ((pFuseaction) ? pFuseaction : '' );
			var divHeight	= infoMapArray['im_'+pElementID+useID]['height'];
			var divWidth	= infoMapArray['im_'+pElementID+useID]['width'];
			var divTop		= (((gMouseY-sT-10) > divHeight) ? (gMouseY - divHeight) : gMouseY );
			var divLeft		= (((sW-gMouseX-35) > divWidth) ? gMouseX : (gMouseX - divWidth) );

			gInfoDiv(divHeight,divWidth,divTop,divLeft);
			infoFadeIn();

//			$('#infoDisplayDiv').load("index.php", { ajaxhandler: 'InformationMapping', ajaxfunction: 'ajaxLoadInfoString', elementID: pElementID }, function(){ var elemID = pElementID; addCloseLink(elemID); });
			$('#infoDisplayDiv').load("index.php", { ajaxhandler: 'InformationMapping', ajaxfunction: 'ajaxLoadInfoString', elementID: useID }, function(){ var elemID = pElementID+useID; addCloseLink(elemID); });

		}
	}

	function gInfoDiv(pHeight,pWidth,pTop,pLeft) {
		rInfoDiv();

		var infoDivBG					= document.createElement('div');
/*
*/
		infoDivBG.id					= 'infoDisplayBG';
		infoDivBG.style.position		= 'absolute';
		infoDivBG.style.zIndex			= 1000000100;
		infoDivBG.style.height			= pHeight+'px';
		infoDivBG.style.width			= pWidth+'px';
		infoDivBG.style.top				= (pTop+10)+'px';
		infoDivBG.style.left			= (pLeft+10)+'px';
		infoDivBG.style.backgroundColor	= '#000';
		infoDivBG.className				= 'infoDefault infoMapDisplayBG';

		var infoDiv						= document.createElement('div');
//		infoDiv.onclick					= function() { gLoadInfoString('',this.parentNode.id) };
		infoDiv.id						= 'infoDisplayDiv';
		infoDiv.style.position			= 'absolute';
		infoDiv.style.zIndex			= 1000000200;
		infoDiv.style.height			= pHeight+'px';
		infoDiv.style.width				= pWidth+'px';
		infoDiv.style.top				= pTop+'px';
		infoDiv.style.left				= pLeft+'px';
		infoDiv.style.border			= 'solid 1px #000';
		infoDiv.style.backgroundColor	= '#fff';
		infoDiv.className				= 'infoDefault infoMapDisplayDiv ui-state-default';
//		infoDiv.innerHTML				= '<div style="width:'+pWidth+'px; height:'+pHeight+'px; text-align:center;">'
//										+ '<img src="css/smoothness/images/ajax-loader_trans.gif" class="infoLoadCircle" style="height:'+Math.round(pHeight/2)+'px;margin:'+Math.round(pHeight/4)+'px auto 0 auto;" alt="... Loading ..." title="... Loading ..." \/>'
//										+ '<\/div>';

		infoDivBG.style.display			= 'none';
		infoDiv.style.display			= 'none';

		document.getElementsByTagName('body')[0].appendChild(infoDivBG);
		document.getElementsByTagName('body')[0].appendChild(infoDiv);
	}
	function rInfoDiv() {
		var infoDivBG	= document.getElementById('infoDisplayBG');
		var gInfoDiv	= document.getElementById('infoDisplayDiv');
		if ( infoDivBG && gInfoDiv ) {
			document.getElementsByTagName('body')[0].removeChild(infoDivBG);
			document.getElementsByTagName('body')[0].removeChild(gInfoDiv);
		}
	}

	function addCloseLink() {
		if ( document.getElementById('infoStringContainer') ) {
			var closeLink				= document.createElement('img');
			closeLink.id				= 'infoCloseLink';
			closeLink.onclick			= function() { infoFadeIn(true) }; // rInfoDiv
			closeLink.style.position	= 'absolute';
			closeLink.style.top			= '2px';
			closeLink.style.right		= '2px';
			closeLink.style.border		= 'solid 0px #f00';
			closeLink.style.width		= '20px';
			closeLink.style.height		= '20px';
			closeLink.className			= '';
			closeLink.alt				= 'Close';
			closeLink.title				= 'Close';
			closeLink.setAttribute('src', 'Images/infoLinks/info_stop.gif');
			closeLink.setAttribute('alt', 'Close');

			document.getElementById('infoStringContainer').style.position	= 'relative';
			document.getElementById('infoStringContainer').appendChild(closeLink);

		}

	}

	function infoTransfer() {
/*
		var options = { };
		options = { to: "#infoDisplayDiv", className: "ui-effects-transfer" };
		$( "#infoDisplayDiv" ).effect( transfer, options, 500, function(){ infoFadeIn(); } );
*/
		infoFadeIn();
	}
	function infoFadeIn(pOut) {
		var fadeSpeed	= 350;
		if ( pOut ) {
			$( "#infoDisplayDiv" ).fadeOut( fadeSpeed, function(){ rInfoDiv(); } );
			$( "#infoDisplayBG" ).fadeOut( fadeSpeed );
		} else {
			$( "#infoDisplayDiv" ).fadeIn( fadeSpeed );
			$( "#infoDisplayBG" ).fadeIn( fadeSpeed );
//			$(function() { $( "#infoDisplayDiv" ).draggable(); });
//			$(function() { $( "#infoDisplayBG" ).draggable(); });
		}
	}

	function infoEffectCallback() {
//		document.getElementById('infoDisplayBG').style.display			= 'block';
//		document.getElementById('infoDisplayDiv').style.display			= 'block';
		infoFadeIn();
	}

	function blankFunction() {
	}


	var gTabPre	= '';	// set per page
	var gTab	= 1;	// set global tab flag
	function gToggleTabs(pTab,pCount) {
		gTab = pTab;

		infoFadeIn(true);

		var curTab	= document.getElementById(gTabPre+'Tab'+pTab);
		var curForm	= document.getElementById(gTabPre+'Form'+pTab);
		var tempTab;
		var tempForm;

		// reset everything
		for ( var i=1,n=pCount; i<=n; i++ ) {
			tempTab		= document.getElementById(gTabPre+'Tab'+i);
			tempForm	= document.getElementById(gTabPre+'Form'+i);

			if ( tempTab ) {
				tempTab.style.zIndex		= parseInt(10+i);
				tempTab.style.top			= '5px';
				tempTab.style.left			= parseInt(10 + ((i-1) * 101))+'px';
				tempTab.style.height		= '35px';
				tempTab.style.width			= '100px';
				tempTab.style.border		= 'solid 1px #000';
				tempTab.style.borderBottom	= 'solid 1px #000'; // solid 1px #0000ff
				tempTab.style.fontWeight	= 'normal';
			}
			if ( tempForm )
				tempForm.style.display		= 'none';
		}

		if ( document.getElementById('gTabInput') )
			document.getElementById('gTabInput').value = pTab;

		// set new tab
		if ( curTab ) {
			curTab.style.zIndex			= 20;
			curTab.style.top			= '2px';
			curTab.style.left			= parseInt(10 + ((pTab-1) * 101))+'px';
			curTab.style.height			= '39px';
			curTab.style.width			= '106px';
			curTab.style.border			= 'solid 2px #000';
			curTab.style.borderBottom	= '0';
			curTab.style.fontWeight		= 'bold';
		}
		if ( curForm )
			curForm.style.display		= 'inline';
	}

	function count(mixed_var,mode) {
		var key, cnt = 0;

		if (mixed_var === null || typeof mixed_var === 'undefined') {
		    return 0;
		} else if (mixed_var.constructor !== Array && mixed_var.constructor !== Object) {
		    return 1;
		}

		if (mode === 'COUNT_RECURSIVE') {
		    mode = 1;
		}
		if (mode != 1) {
		    mode = 0;
		}

		for (key in mixed_var) {
		    if (mixed_var.hasOwnProperty(key)) {
		        cnt++;
		        if (mode == 1 && mixed_var[key] && (mixed_var[key].constructor === Array || mixed_var[key].constructor === Object)) {
		            cnt += this.count(mixed_var[key], 1);
		        }
		    }
		}

		return cnt;
	}


    function gAddItem(pVendor,pItemNum,pItemID,asPopup) {
		if ( document.AddToCartForm ) {
			document.AddToCartForm.itemNumAdd.value	= pItemNum;
			document.AddToCartForm.vendorAdd.value	= pVendor;
			document.AddToCartForm.itemIDAdd.value	= pItemID;
		}

        if ( asPopup ) {
			gLightBox({ ajaxhandler: 'AddToElement', ajaxfunction: 'ajaxAddToCart', itemIDAdd: pItemID, Quantity: 1 });
			return false;
		}

		if ( document.AddToCartForm )
			document.AddToCartForm.submit;
	}

    function gToggleCompare(pID,pSetCheckbox,pShowingSaved) {
		if (pSetCheckbox) {
			document.getElementById('compare_'+pID).checked	= true;
		}

		var foundIt = false;
		var compareStr = "";
		var cmpcookie = readCookie("compare");

		if (cmpcookie) {
			var compare = cmpcookie.split('|');
			for(var i=0; i < compare.length; i++) {
				if (compare[i] == pID) {
					foundIt = true;
				} else {
					if (compare[i]) {
						compareStr += "|";
						compareStr += compare[i];
					}
				}
			}
		}
		if (!foundIt) {
			if (pID) {
				compareStr += "|";
				compareStr += pID;
			}
		}
		createCookie("compare",compareStr);

		if (pShowingSaved == 1) {
			document.location = "/Compare-Items";
		}
	}


	function gHandleRadio(pObject,pValue) {
		if ( !pObject ) {
			return "";
		}
		var radioLength	= pObject.length;
		if ( radioLength == undefined ) {
			if ( pValue ) {
				pObject.checked = (pObject.value == pValue.toString());
				return;
			} else {
				if ( pObject.checked ) {
					return pObject.value;
				} else {
					return "";
				}
			}
		}
		for ( var i=0; i<radioLength; i++ ) {
			if ( pValue ) {
				pObject[i].checked	= false;
				if ( pObject[i].value == pValue.toString() ) {
					pObject[i].checked	= true;
				}
			} else {
				if ( pObject[i].checked ) {
					return pObject[i].value;
				}
			}
		}
		if ( !pValue ) {
			return "";
		}
	}


	// ------------------------------------------------------------
	// global function for showrooms to access cart data and counts
	var gDataMap	= {	'cart'			: { 'ui': 'CartElement', 'aj' : 'ajaxGetCart' },
						'brands'		: { 'ui': 'ItemBrowse', 'aj' : 'GetVendorsJSON' },
						'attributes'	: { 'ui': 'AjaxClass', 'aj' : 'ajaxGetItemsByAttributes' },
						'items'			: { 'ui': 'AjaxClass', 'aj' : 'ajaxGetItemsByOptions' },
						'logininfo'		: { 'ui': 'AjaxClass', 'aj' : 'ajaxGetLoginNameType' } };
	var gDataArray	= [];
	var gCBFunction	= [];
	function gGetData(ajaxRequest,pType,pParams,pFunction) {
		if ( ajaxRequest ) {
			var tData	= [];
			if (ajaxRequest.readyState == 4 && ajaxRequest.responseText.length > 0) {
				eval("tData	= " + ajaxRequest.responseText);
				var curType		= tData['type'];
				var curFunction	= gCBFunction[curType];
				delete tData['type'];
				gDataArray[curType]	= tData;
				if ( typeof(curFunction) == 'function' )
					curFunction();
				delete tData; delete curType; delete curFunction;
			}
		} else {
			gCBFunction[pType]	= ((pFunction) ? pFunction : '' );
			var newParams	= [];
			if ( count(pParams) )
				for ( var p in pParams )
					newParams[p]	= pParams[p];
			gAjaxHandler('gGetData',newParams,gDataMap[pType]['ui'],gDataMap[pType]['aj']);
			delete newParams;
		}
	}


//	gGetData(false,'cart',[],myTestFunc);
//	gGetData(false,'brands',{limit:10},myTestFunc);
//	gGetData(false,'attributes',{limit:1,attribute:'Overstock'},myTestFunc);
//	gGetData(false,'logininfo',[],myTestFunc);

	function myTestFunc() {
		dump( gDataArray );
	}


	var gNameLoader	= 0;
	function gNameLoading(pElement,pToggle) {
		if ( pElement ) {
			if ( pToggle )
				gNameLoader	= 1;

			if ( gNameLoader ) {
				if ( pToggle || pElement.innerHTML.length > 20 )
					pElement.innerHTML	= '';
				pElement.innerHTML	+= '.';
				if ( gNameLoader )
					setTimeout(function(){ gNameLoading(pElement) }, 15);
			}
		} else {
			gNameLoader	= 0;
		}
	}

	function CheckLogin(pStatus) {
		var fullName	= document.getElementById('fullName');
		if ( pStatus ) {
//			gNameLoading(fullName,true);
			gGetData(false,'logininfo',[],CheckLogin);
		} else {
			if ( gDataArray['logininfo']['id'] > 0 ) {
//				dump( gDataArray['logininfo'] );

				var custInfo		= document.getElementById('custInfo');
				var CustBlock1		= document.getElementById('CustBlock1');
				var CustBlock2		= document.getElementById('CustBlock2');
				var CustBlock3		= document.getElementById('CustBlock3');
				var CustWebBlock1	= document.getElementById('CusWebtBlock1');
				var CustWebBlock2	= document.getElementById('CustWebBlock2');
				var CustWebBlock3	= document.getElementById('CustWebBlock3');

				var useLink	= ((gDataArray['logininfo']['link']) ? gDataArray['logininfo']['link'] : "<a href='/login.php'>Please Sign In</a>" );

				if ( fullName ) {
//					gNameLoading();
					fullName.innerHTML	= ((gDataArray['logininfo']['id'] != 3) ? gDataArray['logininfo']['name'] : useLink );
				}
				if ( gDataArray['logininfo']['id'] == 5 ) {
					if ( custInfo )
						custInfo.style.display	= 'inline';
					if ( CustBlock1 )
						CustBlock1.style.display	= 'inline';
					if ( CustBlock2 )
						CustBlock2.style.display	= 'inline';
					if ( CustBlock3 )
						CustBlock3.style.display	= 'inline';
				}
				if ( gDataArray['logininfo']['id'] == 3 ) {
					if ( CustWebBlock1 )
						CustWebBlock1.style.display	= 'inline';
					if ( CustWebBlock2 )
						CustWebBlock2.style.display	= 'inline';
					if ( CustWebBlock3 )
						CustWebBlock3.style.display	= 'inline';
				}

				delete custInfo;
				delete CustBlock1;
				delete CustBlock2;
				delete CustBlock3;
				delete CustWebBlock1;
				delete CustWebBlock2;
				delete CustWebBlock3;
			}
		}
		delete fullName;
	}
//	window.onload	= combineFunctions(window.onload,function(){ CheckLogin(1); } );
//	if ( typeof(CheckLogin) == 'function' ) {
//		gAddOnload(function(){ CheckLogin(1); });
//	}

