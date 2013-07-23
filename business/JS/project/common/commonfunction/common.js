/*******************************************************************
 * 閫氱敤宸ュ叿鍖�
 *******************************************************************/
Ext.namespace("WXTL.Common");
//鐭僵淇� 骞冲彴绛惧悕
IDIOGRAPH = "";
//鐭僵淇� 骞冲彴绛惧悕闀垮害
IDIOGRAPHSIZE = 0;
//璐︽埛绛惧悕
USERIOGRAPH = "";
//璐︽埛绛惧悕闀垮害
USERIOGRAPHSIZE = 0;

OpenNum = 1;
//鐩戞帶閰嶇疆閫氱敤椤�
NUMCLIENTCONFIGID = 1;
NUMDBCONFIGID = 2;
NUMJOBCONFIGID = 3;
NUMSYSTEMCONFIGID = 101;

//鐩戞帶鎶ヨ璇锋眰閫氳缃戝厓ID閰嶇疆
NUMCOMUNICATIONNODEID = [23,24];
//褰撳墠缃戝厓ID
LOCALNODEID = 22;


MobileRegex = null;
IsTimeOut = false;
RegexInfo = eval(doSynRequest('URL/GetMobileReg.ashx?flag=reg'));//('Test/test.aspx'));//
if (RegexInfo != null) {
    if (RegexInfo.info != null) {
        MobileRegex = new RegExp(RegexInfo.info);
    }
    
};

//===========================================================================================甯哥敤姝ｅ垯琛ㄨ揪寮�
WXTL.Common.regex = {
    Require: /.+/,
    Email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    Phone: /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/,
    Mobile: MobileRegex,///^((\(\d{3}\))|(\d{3}\-))?(1(3\d|5[0-3]|5[5-9]|8[6-9]))\d{8}?$/, ///1(3\d|5[0-3]|5[5-9]|8[6-9])\d{8}$/,  ///^((\(\d{3}\))|(\d{3}\-))?(13|15|18)\d{9}?$/, 
    MobileList: /^(\d{11}){1,2}$/,///(^((\(\d{3}\))|(\d{3}\-))?(13|15|18)\d{9}\r?)?(^((\(\d{3}\))|(\d{3}\-))?(13|15|18)\d{9}\r?)$/,///^[\d\r\n]+$/,
    Url: /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
    IdCard: /^\d{15}(\d{2}[A-Za-z0-9])?$/,
    Currency: /^\d+(\.\d+)?$/,
    Number: /^\d+$/,
    Zip: /^[1-9]\d{5}$/,
    QQ: /^[1-9]\d{4,8}$/,
    IP: /^(([01]?[\d]{1,2})|(2[0-4][\d])|(25[0-5]))(\.(([01]?[\d]{1,2})|(2[0-4][\d])|(25[0-5]))){3}$/,
    IPPORT: /^(([01]?[\d]{1,2})|(2[0-4][\d])|(25[0-5]))(\.(([01]?[\d]{1,2})|(2[0-4][\d])|(25[0-5]))){3}(:\d{1,})?$/,
    Integer: /^[-\+]?\d{1,9}$/,
    Double: /^[-\+]?\d+(\.\d+)?$/,
    English: /^[A-Za-z]+$/,
    Chinese: /^[\u0391-\uFFE5]+$/,
    UnSafe: /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/,
    PostCode: /^\d{6}$/,
    //闈炴硶瀛楃楠岃瘉
    //Illegal:/^[^%& ',;=?$\x22]+$/,
    //Illegal: /^[^ %&'$\x22][^%&'$\x22]+$/
    
    //===========================Start========鍙獙璇佸崟寮曞彿
    //        Illegal: /^[^'][^']*$/,
    //        IllegalDiy: /^[^'][^']*$/,
    //===========================End========鍙獙璇佸崟寮曞彿
    
    //Illegal: /^[^ %&'$\x22][^%&'$\x22]*$/,
    //IllegalDiy: /^[^ %&'\x22][^%&'\x22]*$/,
    LessThanRowNum: /^(\d{1,11}\n?){1,1000}$/,
    Illegal: /^[^ %&,'$\x22][^%&'$\x22]*$/,
    IllegalDiy: null
};

//============================================================================================姝ｅ垯琛ㄨ揪寮忔彁绀轰俊鎭�

WXTL.Common.regexText = {
    IllegalDiyText: '璇蜂笉瑕佷互绌烘牸涓洪锛岃涓嶈杈撳叆闈炴硶瀛楃\"%&\',',
    IllegalText: '璇蜂笉瑕佷互绌烘牸涓洪锛岃涓嶈杈撳叆闈炴硶瀛楃\"%&\'$,',
    LessThanRowNumText: '璇疯緭鍏�1000琛屼互鍐呯殑鍐呭锛�',
    MobileListText: '璇锋寜鐓у府鍔╄鏄庤緭鍏ユ纭殑鎵嬫満鍙风爜鍒楄〃',
    IntegerText:'璇疯緭鍏ユ暟瀛楋紝涓旀暟瀛椾笉鑳藉ぇ浜�嶆暟'
};
/****************************************************************
 * 鎻忚堪锛氬府鍔╄鏄庢枃瀛�
 * @title锛氶渶瑕佹樉绀哄府鍔╄鏄庣殑鍦版柟
 * @isRed锛氭槸鍚︾孩鑹叉爣娉紙true:title鏄剧ず涓虹孩鑹诧紱false:title鏄剧ず涓洪粯璁ょ殑榛戣壊锛�
 * @qtipHtml锛氬府鍔╄鏄庢枃瀛�
 ****************************************************************/
Ext.namespace("WXTL.Common.help");
function getHelpMsg(title, isRed, qtipHtml){
    if (isRed) {
        return '<font color="red" style="font-size:12px">' + title + '<img src="jspack/product/common/Images/help.gif" align=AbsMiddle  qtitle=甯姪 qtip="' + qtipHtml + '" style="cursor:handy"/></font>';
    }
    else {
        return '<font style="font-size:12px">' + title + '<img src="jspack/product/common/Images/help.gif" align=AbsMiddle  qtitle=甯姪 qtip="' + qtipHtml + '" style="cursor:handy"/></font>';
    }
};

WXTL.Common.help.MOBILEFILE = getHelpMsg("鏂囦欢", true, "1銆佹枃浠舵牸寮忎负txt<br>2銆佹枃浠跺ぇ灏忛』灏忎簬4M<br>3銆佸唴瀹规牸寮�銆�<img src=jspack/product/common/Images/help/oldmobilefile.jpg align=top/>");
WXTL.Common.help.MOBILELIST = getHelpMsg("鍙风爜鍒楄〃", true, "1銆佽緭鍏ヨ鏁颁笉瓒呰繃1000琛�br>2銆佽緭鍏ユ牸寮�銆�<img src=jspack/product/common/Images/help/oldmobilelist.jpg align=Baseline/>");
WXTL.Common.help.NEWMOBILEFILE = getHelpMsg("鏂囦欢", true, "1銆佹枃浠舵牸寮忎负txt<br>2銆佹枃浠跺ぇ灏忛』灏忎簬4M<br>3銆佸唴瀹规牸寮�銆�<img src=jspack/product/common/Images/help/mobilefile.jpg align=top/>");
WXTL.Common.help.NEWMOBILELIST = getHelpMsg("鍙风爜鍒楄〃", true, "1銆佽緭鍏ヨ鏁颁笉瓒呰繃1000琛�br>2銆佽緭鍏ユ牸寮�銆�<img src=jspack/product/common/Images/help/mobilelist.jpg align=Baseline/>");
WXTL.Common.help.helpACCOUNTFILE = getHelpMsg("鏂囦欢", true, "1銆佹枃浠舵牸寮忎负txt<br>2銆佹枃浠跺ぇ灏忛』灏忎簬4M<br>3銆佸唴瀹规牸寮�銆�<img src=jspack/product/common/Images/help/accountfile.jpg align=top/>");
WXTL.Common.help.helpACCOUNTLIST = getHelpMsg("鍙风爜鍒楄〃", true, "1銆佽緭鍏ヨ鏁颁笉瓒呰繃1000琛�br>2銆佽緭鍏ユ牸寮�銆�<img src=jspack/product/common/Images/help/accountlist.jpg align=Baseline/>");
WXTL.Common.help.USERGROUPMOBILEFILE = getHelpMsg("鏂囦欢", true, "1銆佹枃浠舵牸寮忎负txt<br>2銆佹枃浠跺ぇ灏忛』灏忎簬4M<br>3銆佸鍚嶄笉寰楄秴杩�瓧绗�br>4銆佸唴瀹规牸寮�銆�<img src=jspack/product/common/Images/help/usergroupmobilefile.jpg align=top/>");
WXTL.Common.help.USERGROUPMOBILELIST = getHelpMsg("鍙风爜鍒楄〃", true, "1銆佽緭鍏ヨ鏁颁笉瓒呰繃1000琛�br>2銆佸鍚嶄笉寰楄秴杩�瓧绗�br>3銆佽緭鍏ユ牸寮�銆�<img src=jspack/product/common/Images/help/usergroupoldmobilelist.jpg align=Baseline/>");

/*********************************************************************************
 * 鎻忚堪锛氬姩鎬佸姞杞絁S鏂囦欢
 * @param {Object} arr锛氳鍔犺浇鐨凧S鏂囦欢鏁扮粍
 * @param {Object} i锛�
 * @param {Object} str:缁戝畾鍒板乏渚ц彍鍗曞彾瀛愯妭鐐硅彍鍗曠偣鍑讳簨浠惰皟鐢ㄧ殑鍑芥暟
 * @param {Object} obj:node锛堟坊鍔犲埌center鐨則ab淇℃伅锛�
 *********************************************************************************/
function loadJS(arr, i, str, obj){
    //var _successFlag = false;
    //var jsc ;
    var loadJsFlag = true;
    //var _docScript = document.getElementsByTagName('script');
    //=================鍒ゆ柇鍔ㄦ�佸姞杞絡s ==============Start
    //	for(var j=0; j< _docScript.length;j++){
    //		if(_docScript[j].src.indexOf(arr[i]) > 0 ){
    //			loadJsFlag = false;
    //		}
    //	}
    //=================鍒ゆ柇鍔ㄦ�佸姞杞絡s =============END
    
    if (loadJsFlag) {
		var _doc = document.getElementsByTagName('head')[0];
		var jsc = document.createElement('script');
		jsc.setAttribute('type', 'text/javascript');
		jsc.setAttribute('src', arr[i]);
		_doc.appendChild(jsc);
		jsc.onload = jsc.onreadystatechange = function(){
			if (this.readyState && this.readyState == "loading") {
				return;
			}
			else {
				if (i == arr.length - 1) {
					if (obj != null) {
						eval(str + "(obj)");
					}
				}
				else {
					loadJS(arr, i + 1, str, obj);
				}
			}
		};
	}
	else {
		if (obj != null) {
			eval(str + "(obj)");
		}
	}
};

WXTL.Common.JsLoader = function(str, obj){
    this.load = function(arr){
        loadJS(arr, 0, str, obj);
    };
};

//==============================================================================================閫氱敤鏃ユ湡鍑芥暟
WXTL.Common.dateTime = function(){
};

/**********************************************************
 * Describe锛氳幏鍙栧綋鍓嶆椂闂�
 * Return: date
 **********************************************************/
WXTL.Common.dateTime.getNow = function(){
    return new Date();
};

/**********************************************************
 * Describe锛氳幏鍙栧綋鍓嶆椂闂�
 * Return: String
 **********************************************************/
WXTL.Common.dateTime.getNowValue = function(){
    return this.getNow().toLocaleString();
};

/**********************************************************
 * Describe锛氬湪涓�涓椂闂翠笂娣诲姞绉�
 * @datevalue锛氭棩鏈�/String
 * @numsecond锛氳娣诲姞鐨勭鏁�/int
 * Return: date
 **********************************************************/
WXTL.Common.dateTime.addSecond = function(datevalue, numsecond){
    return new Date(Date.parse(datevalue) + 1000 * (numsecond)/*(+/-)绉�*/);
};

/**********************************************************
 * Describe锛氬湪涓�涓椂闂翠笂娣诲姞鍒嗛挓
 * @datevalue锛氭棩鏈�/String
 * @numsecond锛氳娣诲姞鐨勫垎閽熸暟/int
 * Return: date
 **********************************************************/
WXTL.Common.dateTime.addMinute = function(datevalue, numminute){
    return new Date(Date.parse(datevalue) + 1000 * 60(numminute)/*(+/-)鍒嗛挓*/);
};

/**********************************************************
 * Describe锛氬湪涓�涓椂闂翠笂娣诲姞灏忔椂
 * @datevalue锛氭棩鏈�/String
 * @numsecond锛氳娣诲姞鐨勫皬鏃舵暟/int
 * Return: date
 **********************************************************/
WXTL.Common.dateTime.addHour = function(datevalue, numhour){
    return new Date(Date.parse(datevalue) + 1000 * 60 * 60 * (numhour)/*(+/-)灏忔椂*/);
};
/**********************************************************
 * Describe锛氬湪涓�涓椂闂翠笂娣诲姞澶�
 * @datevalue锛氭棩鏈�/String
 * @numsecond锛氳娣诲姞鐨勫ぉ鏁�/int
 * Return: date
 **********************************************************/
WXTL.Common.dateTime.addDay = function(datevalue, numday){
    return new Date(Date.parse(datevalue) + 1000 * 60 * 60 * 24 * (numday)/*(+/-)澶�*/);
};

/**********************************************************
 * Describe锛氬湪涓�涓椂闂翠笂娣诲姞鏈�
 * @datevalue锛氭棩鏈�/String
 * @numsecond锛氳娣诲姞鐨勫ぉ鏁�/int
 * Return: date
 **********************************************************/
WXTL.Common.dateTime.addMonth = function(datevalue, numday){
	return new Date(datevalue.getFullYear(), datevalue.getMonth() + numday, datevalue.getDate());
};

/**********************************************************
 * Describe锛氬湪涓�涓椂闂翠笂娣诲姞骞�
 * @datevalue锛氭棩鏈�/String
 * @numsecond锛氳娣诲姞鐨勫ぉ鏁�/int
 * Return: date
 **********************************************************/
WXTL.Common.dateTime.addYear = function(datevalue, numday){
	return new Date(datevalue.getFullYear() + numday, datevalue.getMonth(), datevalue.getDate());
};

WXTL.Common.dateTime.getNowDate = function(){
    var mydate = new Date();
    return WXTL.Common.dateTime.formatDate(mydate);
};

/*灏哠tring绫诲瀷瑙ｆ瀽涓篋ate绫诲瀷.    
 parseDate('2006-1-1') return new Date(2006,0,1)
 parseDate(' 2006-1-1 ') return new Date(2006,0,1)
 parseDate('2006-1-1 15:14:16') return new Date(2006,0,1,15,14,16)
 parseDate(' 2006-1-1 15:14:16 ') return new Date(2006,0,1,15,14,16);
 parseDate('2006-1-1 15:14:16.254') return new Date(2006,0,1,15,14,16,254)
 parseDate(' 2006-1-1 15:14:16.254 ') return new Date(2006,0,1,15,14,16,254)
 parseDate('涓嶆纭殑鏍煎紡') retrun null
 */
WXTL.Common.dateTime.parseDate = function(str){
    if (typeof str == 'string') {
		var results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);
		if (results && results.length > 3) {
			return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]));
		}
		results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);
		if (results && results.length > 6) {
			return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]), parseInt(results[4]), parseInt(results[5]), parseInt(results[6]));
		}
		results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);
		if (results && results.length > 7) {
			return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]), parseInt(results[4]), parseInt(results[5]), parseInt(results[6]), parseInt(results[7]));
		}
	}
    return null;
};

/*    
 灏咲ate/String绫诲瀷,瑙ｆ瀽涓篠tring绫诲瀷.
 浼犲叆String绫诲瀷,鍒欏厛瑙ｆ瀽涓篋ate绫诲瀷
 涓嶆纭殑Date,杩斿洖 ''
 濡傛灉鏃堕棿閮ㄥ垎涓�鍒欏拷鐣�,鍙繑鍥炴棩鏈熼儴鍒�.
 */
WXTL.Common.dateTime.formatDate = function(v){
    if (typeof v == 'string') {
		v = WXTL.Common.dateTime.parseDate(v);
	}
    if (v instanceof Date) {
        var y = v.getFullYear();
        var m = v.getMonth() + 1;
        var d = v.getDate();
//        var h = v.getHours();
//        var i = v.getMinutes();
//        var s = v.getSeconds();
//        var ms = v.getMilliseconds();
        //    if(ms>0) return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s + '.' + ms;      
        //    if(h>0 || i>0 || s>0) return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;      
        return y + '/' + m + '/' + d;
    }
    return '';
};

/*********************************************************************************************
 * 鎻忚堪锛氶獙璇侀偖绠卞垪琛紙楠岃瘉琛屾暟鍙婃瘡琛岄偖绠辩殑鏍煎紡锛�
 * @param {Object} mailList:闇�瑕侀獙璇佺殑閭鍒楄〃
 * @param {Object} maxLine:鍏佽杈撳叆鐨勬渶澶ц鏁�
 *********************************************************************************************/
function checkMailList(mailList, maxLine){
    var _lines = new Array();
    if (Ext.isIE) {
        _lines = mailList.split("\r\n"); // 鎸夎鍒嗛殧澶勭悊锛屽惁鍒� /\s/g 鍙兘浼氬尮閰嶅埌鎹㈣绗�   
    }
    else {
        _lines = mailList.split("\n");
    }
    
    //alert(_lines.length);
    var _valid = true;
    if (_lines.length > maxLine) {
        _valid = false;
        return '宸茶緭鍏ヨ鏁�' + _lines.length + ',璇蜂笉瑕佽秴杩�' + maxLine + '琛�';
    }
    else {
        for (var i = 0; i < _lines.length; i++) {
            if (!WXTL.Common.regex.Email.test(_lines[i])) {
                _valid = false;
                return '鍖呭惈涓嶆纭殑閭鏍煎紡锛岃妫�鏌ワ紒';
            }
        }
    }
    
    return _valid;
};

/*********************************************************************************************
 * 鎻忚堪锛氶獙璇佸僵淇￠瑙堟祴璇曟椂鎵嬫満鍙�
 * @param {Object} mobileList:闇�瑕侀獙璇佺殑鎵嬫満鍙风爜鍒楄〃
 * @param {Object} maxLine:鍏佽杈撳叆鐨勬渶澶ц鏁�
 *   @param {Object}nummmstype 鍒ゆ柇褰╀俊绫诲瀷鏄惁涓轰釜鎬�
 *********************************************************************************************/
function checkMobileListMMSsend(mobileList, maxLine, nummmstype){
    var _lines = new Array();
    if (Ext.isIE) {
        _lines = mobileList.split("\r\n"); // 鎸夎鍒嗛殧澶勭悊锛屽惁鍒� /\s/g 鍙兘浼氬尮閰嶅埌鎹㈣绗�   
    }
    else {
        _lines = mobileList.split("\n");
    }
    
    //alert(_lines.length);
    var _valid = true;
    if (_lines.length > maxLine) {
        _valid = false;
        return '宸茶緭鍏ヨ鏁�' + _lines.length + ',璇蜂笉瑕佽秴杩�' + maxLine + '琛�';
    }
    else {
    
        if (nummmstype == 2) {
            var MobileString = _lines[0].substring(0, 11);
            if (!WXTL.Common.regex.Mobile.test(MobileString)) {
                _valid = false;
                return '鍖呭惈涓嶆纭殑鎵嬫満鍙风爜锛岃妫�鏌ワ紒';
            }
        }
        else {
            for (var i = 0; i < _lines.length; i++) {
                if (!WXTL.Common.regex.Mobile.test(_lines[i])) {
                    _valid = false;
                    return '鍖呭惈涓嶆纭殑鎵嬫満鍙风爜锛岃妫�鏌ワ紒';
                }
            }
        }
        
    }
    
    return _valid;
};
/*********************************************************************************************
 * 鎻忚堪锛氶獙璇佹墜鏈哄彿鐮佸垪琛紙楠岃瘉琛屾暟鍙婃瘡琛屾墜鏈哄彿鐮佺殑鏍煎紡锛�
 * @param {Object} mobileList:闇�瑕侀獙璇佺殑鎵嬫満鍙风爜鍒楄〃
 * @param {Object} maxLine:鍏佽杈撳叆鐨勬渶澶ц鏁�
 *********************************************************************************************/
function checkMobileList(mobileList, maxLine){
    var _lines = new Array();
    if (Ext.isIE) {
        _lines = mobileList.split("\r\n"); // 鎸夎鍒嗛殧澶勭悊锛屽惁鍒� /\s/g 鍙兘浼氬尮閰嶅埌鎹㈣绗�   
    }
    else {
        _lines = mobileList.split("\n");
    }
    
    //alert(_lines.length);
    var _valid = true;
    if (_lines.length > maxLine) {
        _valid = false;
        return '宸茶緭鍏ヨ鏁�' + _lines.length + ',璇蜂笉瑕佽秴杩�' + maxLine + '琛�';
    }
    else {
        for (var i = 0; i < _lines.length; i++) {
            if (!WXTL.Common.regex.Mobile.test(_lines[i])) {
                _valid = false;
                return '鍖呭惈涓嶆纭殑鎵嬫満鍙风爜锛岃妫�鏌ワ紒';
            }
        }
    }
    
    return _valid;
};

//============================================================================URL缂栫爜 URL瑙ｇ爜
/****************************************************
 * @YSX 2009-04-14
 * URL缂栫爜 URL瑙ｇ爜
 ****************************************************/
//瑙ｇ爜
WXTL.Common.urlDecode = function(str){
    var i, temp;
    var result = "";
    
    for (i = 0; i < str.length; i++) {
        if (str.charAt(i) == "%") {
            if (str.charAt(++i) == "u") {
                temp = str.charAt(i++) + str.charAt(i++) + str.charAt(i++) + str.charAt(i++) + str.charAt(i);
                result += unescape("%" + temp);
            }
            else {
                temp = str.charAt(i++) + str.charAt(i);
                if (eval("0x" + temp) <= 160) {
                    result += unescape("%" + temp);
                }
                else {
                    temp += str.charAt(++i) + str.charAt(++i) + str.charAt(++i);
                    result += Decode_unit("%" + temp);
                }
            }
        }
        else {
            result += str.charAt(i);
        }
    }
    
    return result;
};
/**************************************************
 * url缂栫爜
 * @param {Object} str
 **************************************************/
//url缂栫爜
WXTL.Common.urlEncode = function(str){
    var i, temp;//, p, q;
    var result = "";
    
    for (i = 0; i < str.length; i++) {
        temp = str.charCodeAt(i);
        if (temp >= 0x4e00) {
            execScript("ascCode=hex(asc(\"" + str.charAt(i) + "\"))", "vbscript");
            result += ascCode.replace(/(.{ 2 })/g, "%$1");
        }
        else {
            result += escape(str.charAt(i));
        }
    }
    return result;
};

/**************************************************
 * Describe:鍒ゆ柇鏄惁鍦ㄦ暟缁勫唴
 * @param {Object} obj:瀵硅薄
 * @param {Object} arr锛氭暟缁�
 **************************************************/
function isInArray(obj, arr){

    type = typeof obj;
    if (type == 'string' || type == 'number') {
        for (var i in arr) {
            if (arr[i] == obj) {
                return true;
            }
        }
        return false;
    }
};

//============================================================================================鏂囦欢鎿嶄綔鐩稿叧
//鏂囦欢绫诲瀷
var fileTypeArr = new Array();
fileTypeArr[0] = "txt";
fileTypeArr[1] = "csv";

var fileTypeArrDesc = "txt,csv";
//鏂囦欢澶у皬
var fileSize = 4194304;
var fileSizeDesc = "4M";
//鍒ゆ柇瀵煎叆鏂囦欢绫诲瀷鏄惁鍙互
function checkFileType(filePath){
    var suffix = getFileType(filePath);
    if (!isInArray(suffix.toLowerCase(), fileTypeArr)) {
        return false;
    }
    else {
        return true;
    }
};
/************************************************
*鍔熻兘鎻忚堪锛氫笂浼犳帶浠舵枃浠堕獙璇侊紝澶у皬銆佺被鍨嬬瓑
*filePath锛氬緟楠岃瘉鐨勬枃浠惰矾寰�
*permitFileTypeArr:鑷畾涔夊厑璁哥殑鏂囦欢绫诲瀷,Array
*permitFileTypeDesc锛氳嚜瀹氫箟鏂囦欢绫诲瀷楠岃瘉鎻忚堪
*************************************************/
function checkFileWithTypeArr(filePath, permitFileTypeArr, permitFileTypeDesc) {
	if (permitFileTypeArr == null) {
		if (!checkFileType(filePath)) {
			return '鏂囦欢绫诲瀷搴斾负' + fileTypeArrDesc;
		} else {
			if (getFileSize(filePath) != '' && getFileSize(filePath) > fileSize) {
				return '鏂囦欢澶у皬搴斿皬浜�' + fileSizeDesc;
			} else {
				return '';
			}
		}
	} else {
		if (!checkFileTypeWithTypeArr(filePath, permitFileTypeArr)) {
			return '鏂囦欢绫诲瀷搴斾负' + permitFileTypeDesc;
		} else {
			if (getFileSize(filePath) != '' && getFileSize(filePath) > fileSize) {
				return '鏂囦欢澶у皬搴斿皬浜�' + fileSizeDesc;
			} else {
				return '';
			}
		}
	}
};
// 鍒ゆ柇瀵煎叆鏂囦欢绫诲瀷鏄惁鍙互
function checkFileTypeWithTypeArr(filePath,typeArr){
    var suffix = getFileType(filePath);
    if (!isInArray(suffix.toLowerCase(), typeArr)) {
        return false;
    }
    else {
        return true;
    }
};

//鑾峰彇鏂囦欢绫诲瀷
function getFileType(filePath){
    try {
        return filePath.match(/^(.*)(\.)(.{1,8})$/)[3];
    } 
    catch (e) {
        return '';
    }
};

//鑾峰彇鏂囦欢澶у皬
function getFileSize(filePath){

    try {
        var fso = new ActiveXObject('Scripting.FileSystemObject');
        var file = fso.GetFile(filePath);
        return file.Size;
    } 
    catch (e) {
        //alert(e.description);
        return '';
    }
};

//鑾峰彇鏂囦欢淇℃伅
function getFileMessage(filePath,fileSize){
	if(fileSize != null){
		return "鏂囦欢璺緞锛�" + filePath + "\r鏂囦欢绫诲瀷锛�" + getFileType(filePath) + "\r鏂囦欢澶у皬锛�" + getFileSizeFormat(fileSize);
	}
	else{
	    return "鏂囦欢璺緞锛�" + filePath + "\r鏂囦欢绫诲瀷锛�" + getFileType(filePath) + "\r鏂囦欢澶у皬锛�" + getFileSizeFormat(getFileSize(filePath));
		//return "鏂囦欢璺緞锛�" + filePath + "\r鏂囦欢绫诲瀷锛�" + getFileType(filePath) + "\r鏂囦欢澶у皬锛�" + Ext.util.Format.fileSize(getFileSize(filePath));
	}
    
};

//涓婁紶鎺т欢妫�鏌ユ枃浠�
function checkFile(filePath){
    if (!checkFileType(filePath)) {
        return '鏂囦欢绫诲瀷搴斾负' + fileTypeArrDesc;
    }
    else{ 
        if (getFileSize(filePath) != '' && getFileSize(filePath) > fileSize) {
            return '鏂囦欢澶у皬搴斿皬浜�' + fileSizeDesc;
        }
        else {
            return '';
        }
    }
};

function Hashtable(){
    this._hash = {};
    this._count = 0;
    this.add = function(key, value){
        if (this._hash.hasOwnProperty(key)) 
            return false;
        else {
            this._hash[key] = value;
            this._count++;
            return true;
        }
    };
    this.remove = function(key){
        delete this._hash[key];
        this._count--;
    };
    this.count = function(){
        return this._count;
    };
    this.items = function(key){
        if (this.contains(key)){
            return this._hash[key];
        }
    };
    this.contains = function(key){
        return this._hash.hasOwnProperty(key);
    };
    this.clear = function(){
        this._hash = {};
        this._count = 0;
    };
};

function getFileSizeFormat(size){
    if (size < 0) {
		return "0B";
	}
	else {
		if (size < 1024) 
			return Math.round(size * Math.pow(10, 2)) / Math.pow(10, 2) + "B";
		else {
			if (size < 1024 * 1024) {
				return Math.round(size / 1024 * Math.pow(10, 2)) / Math.pow(10, 2) + "KB";
			}
			else {
				return Math.round(size / 1024 / 1024 * Math.pow(10, 2)) / Math.pow(10, 2) + "MB";
			}
		}
	}
    //	if(size<1024)
    //        return Math.round(size) +"B";
    //    else if(size<1024*1024)
    //        return Math.round(size/1024)+"KB";
    //    else 
    //        return Math.round(size/1024/1024)+"MB";
};

function getFileName(filePath){
    if (size < 1024 * 1024) {
		return size / 1024 + "KB";
	}
	else {
		return size / 1024 / 1024 + "MB";
	}
};

/*************************************************************
 * Describe: 鎵撳紑涓�涓柊绐楀彛
 * @url锛氳矾寰�
 * @width锛氱獥鍙ｅ搴�
 * @height锛氱獥鍙ｉ珮搴�
 **************************************************************/
function windowOpen(url, width, height){
    var newurl, arrurl;
    if (typeof(url) == "undefined" || url == "") {
        return;
    }
    else {
        if (url.indexOf("?") == -1) {
            newurl = url;
        }
        else {
            newurl = url.substring(0, url.indexOf("?") + 1);
            arrurl = url.substring(url.indexOf("?") + 1).split("&");
            for (var i = 0; i < arrurl.length; i++) {
                newurl += arrurl[i].split("=")[0] + "=" + escape(arrurl[i].split("=")[1]) + "&";
            }
            newurl = newurl.substring(0, newurl.length - 1);
        }
    }
    if (typeof(width) != "number" || typeof(height) != "number") {
        window.open(newurl);
    }
    else {
        window.open(newurl, "", "width=" + width + ",height=" + height);
    }
};

/*************************************************************
 * Describe: 鏂囦欢涓嬭浇
 * @urlStr锛氫笅杞借矾寰�
 * @idNum锛氬弬鏁板��
 **************************************************************/
function doLoad(urlStr, idNum){
    windowOpen(urlStr + "?id=" + idNum + "&flag=selectdesc", 400, 300);
};

/*************************************************************
 * Describe: 鏁版嵁瀵煎嚭
 * @urlStr锛氬鍑烘暟鎹闂矾寰�
 * @parmsString锛氬弬鏁�
 **************************************************************/
function exportData(urlStr, parmsString){
    window.open(urlStr + "?" +  parmsString, "", "width=400","height=300");
//    checkLogin();
//    if(!IsTimeOut){
//        windowOpen(urlStr + "?" + WXTL.Common.urlDecode(parmsString), 400, 300);
//    }
};


/*************************************************************
 * Describe: 楠岃瘉鐧诲綍淇℃伅鏄惁杩囨湡
 **************************************************************/
function checkLogin(){
    Ext.Ajax.request({
        url: 'url/IsLogIn.ashx?flag=islogin',
        method: "GET",
        params: {
            parentid: -1
        },
        success: function(form, action){
            var obj = Ext.util.JSON.decode(form.responseText);
            var falg = obj.success;
            if (falg == false) {
                IsTimeOut = true;
                Ext.Msg.alert("娓╅Θ鎻愮ず", "瀵逛笉璧凤紝鎮ㄧ殑淇℃伅宸茶繃鏈熻閲嶆柊鐧诲綍!", function(){
                    window.location.href = "login.htm";
                });
                
            }
        },
        failure: function(form, action){
            IsTimeOut = true;
            Ext.Msg.alert("娓╅Θ鎻愮ず", "璇烽噸鏂扮櫥褰�!");
            window.location.href = "login.htm";
        }
    });
};

//=========================================================================閫氱敤锛汲鍔犺浇
//var arr = new Array();

//arr[0] = "JS/event.js";
////arr[1] = "JS/urllist.js";
////arr[2] = "JS/center/Popedom/Department/URLList.js";
////arr[3] = "JS/center/Popedom/User/URLList.js";
////arr[4] = "JS/center/Popedom/Role/URLList.js";
////arr[5] = "JS/center/business/product/urllist.js";
////arr[6] = "JS/center/business/column/urllist.js";
////arr[6] = "JS/center/business/usergroup/urllist.js";
////arr[7] = "JS/center/purview/user/urllist.js";
//arr[1] = "ext/wxtl-all.js";
////arr[9] = "ext/VTypes.js";
//var loader = new WXTL.Common.JsLoader('', null);
//loader.load(arr);

/*************************************************************
 * Describe: 鏄剧ず鎻愮ず淇℃伅
 **************************************************************/
function showResult(msg){
    Ext.example.msg('娓╅Θ鎻愮ず', msg);
};
/*************************************************************
 * Describe: 澶勭悊寮傛璇锋眰
 * @url锛氳姹傚湴鍧�
 * @params锛氬弬鏁�
 * @store锛氭暟鎹�
 **************************************************************/
function doAjax(url, params, store){
    Ext.Ajax.request({
        url: url,
        method: "POST",
        params: params,
        success: function(form, action){
            var obj = Ext.util.JSON.decode(form.responseText);
            var falg = obj.success;
            if (falg == true) {
                Ext.Msg.alert("娓╅Θ鎻愮ず", "鎿嶄綔宸叉垚鍔�!");
                if (store != null){
                    store.reload();
                }
            }
            else {
                if (!obj.success && obj.info == "瀵逛笉璧凤紝鎮ㄦ病鏈夌櫥褰曪紒") {
                    Ext.Msg.alert("娓╅Θ鎻愮ず", "瀵逛笉璧凤紝鎮ㄧ殑淇℃伅宸茶繃鏈熻閲嶆柊鐧诲綍!", function(){
                        window.location.href = "login.htm";
                    });
                }
                else {
                    Ext.Msg.alert('娓╅Θ鎻愮ず', obj.info);
                }
            }
            //Ext.Msg.alert('娓╅Θ鎻愮ず', obj.info);
        
        },
        failure: function(form, action){
            var objJson = Ext.util.JSON.decode(action.response.responseText);
            Ext.Msg.alert('娓╅Θ鎻愮ず', objJson.info);
            //Ext.Msg.alert('娓╅Θ鎻愮ず', '绯荤粺蹇欙紝璇风◢鍊�...');
        }
    });
};

/*************************************************************
 * Describe: 澶勭悊寮傛璇锋眰
 * @url锛氳姹傚湴鍧�
 * @params锛氬弬鏁�
 * @store锛氭搷浣滄垚鍔熷悗鍥炶皟鍑芥暟
 **************************************************************/
function doAjaxWithCallBack(url, params, callBackFunc){
    Ext.Ajax.request({
        url: url,
        method: "POST",
        params: params,
        success: function(form, action){
            var obj = Ext.util.JSON.decode(form.responseText);
            var falg = obj.success;
            if (falg == true) {
                Ext.Msg.alert("娓╅Θ鎻愮ず", "鎿嶄綔宸叉垚鍔�!");
                callBackFunc();
            }
            else {
                if (!obj.success && obj.info == "瀵逛笉璧凤紝鎮ㄦ病鏈夌櫥褰曪紒") {
                    Ext.Msg.alert("娓╅Θ鎻愮ず", "瀵逛笉璧凤紝鎮ㄧ殑淇℃伅宸茶繃鏈熻閲嶆柊鐧诲綍!", function(){
                        window.location.href = "login.htm";
                    });
                }
                else {
                    Ext.Msg.alert('娓╅Θ鎻愮ず', obj.info);
                }
            }        
        },
        failure: function(form, action){
            var objJson = Ext.util.JSON.decode(action.response.responseText);
            Ext.Msg.alert('娓╅Θ鎻愮ず', objJson.info);
        }
    });
};

/*************************************************************
 * Describe: 澶勭悊寮傛璇锋眰,杩斿洖Json涓蹭俊鎭�
 * @url锛氳姹傚湴鍧�
 * @params锛氬弬鏁�
 **************************************************************/
function doAjaxJson(url, params){
    Ext.Ajax.request({
        url: url,
        method: "POST",
        params: params,
        success: function(form, action){
            //var obj = Ext.util.JSON.decode(form.responseText);
            var responses = reader.readRecords(Ext.decode(form.responseText));
            return responses;
        },
        failure: function(form, action){
            var objJson = Ext.util.JSON.decode(action.response.responseText);
            return objJson;
            //Ext.Msg.alert('娓╅Θ鎻愮ず', objJson.info);
            //Ext.Msg.alert('娓╅Θ鎻愮ず', '绯荤粺蹇欙紝璇风◢鍊�...');
        }
    });
};

/*****************************************************
 * Describe:鍚屾璇锋眰URL
 * @param {Object} url
 *****************************************************/
function doSynRequest(url){
    //var conn = Ext.lib.Ajax.getConnectionObject().conn;
    var conn = Ext.lib.Ajax.getConnectionObject().conn;
    conn.open("POST", url, false);
    conn.send('');
    var response = Ext.decode(conn.responseText);
    if (response.success == null) {
		return response;
	}
	else {
		if (!response.success && response.error != null && response.error == "瀵逛笉璧凤紝鎮ㄦ病鏈夌櫥褰曪紒") {
			//Ext.Msg.alert("娓╅Θ鎻愮ず", "瀵逛笉璧凤紝鎮ㄧ殑淇℃伅宸茶繃鏈熻閲嶆柊鐧诲綍!", function(){
			window.location.href = "login.htm";
		//});
		}
		else {
			return response;
		}
	}
    
};

/**
 * 鍚屾ajax璋冪敤 杩斿洖json Object
 * @param {}  urlStr
 * @param {}  paramsStr 涓哄瓧绗︿覆閿�煎褰㈠紡鈥渒ey=value&key2=value2鈥�
 * @return {} 杩斿洖json Object
 */
function ajaxSyncCall(urlStr, paramsStr) {	
	var obj;
	if (window.ActiveXObject) {
		obj = new ActiveXObject('Microsoft.XMLHTTP');
	} else if (window.XMLHttpRequest) {
		obj = new XMLHttpRequest();
	}
	obj.open('POST', urlStr, false);
	obj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	obj.send(paramsStr);
    return Ext.util.JSON.decode(obj.responseText);   
};  
//function doSynRequest(urlStr, paramsStr) {   
//    var obj;   
//    var value;   
//    if (window.ActiveXObject) {   
//        obj = new ActiveXObject('Microsoft.XMLHTTP');   
//    } else if (window.XMLHttpRequest) {   
//        obj = new XMLHttpRequest();   
//    }   
//    obj.open('POST', urlStr, false);   
//    obj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');   
//    obj.send(paramsStr);   
//	var result = Ext.decode(obj.responseText);
//    //var result = Ext.util.JSON.decode(obj.responseText);   
//    return result;   
//}  


/********************************************************************************************************************
 * Describe:褰╀俊缂栬緫鐩稿叧
 ********************************************************************************************************************/
/*****************************************************
 * Describe:鐢熸垚褰╀俊鍐呭html瀛楃涓�
 * @param {Object} sourceString锛氬僵淇¤祫婧愭ā鏉�
 * @param {Object} strList锛氬弬鏁板垪琛�
 *****************************************************/
function formatString(sourceString, strList){
    for (var i = 0; i < strList.length; i++) {
        sourceString = sourceString.replace("{" + i + "}", strList[i]);
    }
    return sourceString;
};

//====================================================褰╀俊娴忚
//鏈夊浘鐗囧僵淇℃ā鏉�
var MMSFrameString = '<div  style="border-style: solid; border-width: 1px; border-color: #808080 #FFFFFF #FFFFFF #808080;width:99%;height:99%"><DIV id="ZipCode" style=" BACKGROUND-COLOR:white;width:99%;height:99%"><br><div style="display:table-cell;height:100px;width:100px;vertical-align:middle;"><img style="max-width:100px;max-height:100px;_width:100px;" src={0} /></div><br><br><div style="word-wrap:break-word; word-break:break-all; padding-right: 5px; padding-left: 5px">{1}</div></DIV></div>';
//鏃犲浘鐗囧僵淇℃ā鏉�
var MMSNoImageFrameString = '<div  style="border-style: solid; border-width: 1px; border-color: #808080 #FFFFFF #FFFFFF #808080;width:99%;height:99%"><DIV id="ZipCode" style=" BACKGROUND-COLOR:white;width:99%;height:99%"><br><div style="word-wrap:break-word; word-break:break-all; padding-right: 5px; padding-left: 5px">{0}</div></DIV></div>';
//褰撳墠缂栬緫褰╀俊甯anel
var currMMSPanel;
/*****************************************************
 * Describe:褰撳墠褰╀俊甯ф覆鏌�
 * @param {Object} htmlString锛氬僵淇″抚html瀛楃涓�
 * @param {Object} title锛氬僵淇℃爣棰�
 *****************************************************/
function currMMSPanelRender(htmlString, title){
    currMMSPanel.body.update(htmlString);
    if (title != null) {
        currMMSPanel.setTitle(title);
    }
    currMMSPanel.render();
};

//====================================================褰╀俊鎾斁
//鎾斁鏃堕棿
var playTime;
//褰撳墠鎾斁甯ф暟
var playCurrFrameNum = 0;
/*****************************************************
 * Describe:棰勮褰╀俊
 * @param {Object} i锛氬紑濮嬮瑙堝抚搴忓彿
 *****************************************************/
function previewMMS(i){
    if (i + 1 < currMMSPanel.contentJson.frame.length) {
        i = i + 1;
        playCurrFrameNum = i;
        //currMMSPanelRender(formatString(MMSFrameString, new Array(currMMSPanel.contentJson.frame[i].vc2image.vc2rescurl, currMMSPanel.contentJson.frame[i].vc2word.vc2rescdesc1)), formatString("鎾斁锛氱{0}甯�", new Array(i + 1, 1)));
        if (currMMSPanel.contentJson.frame[i].vc2image.vc2rescurl != "") {
            currMMSPanelRender(formatString(MMSFrameString, new Array(currMMSPanel.contentJson.frame[i].vc2image.vc2rescurl, currMMSPanel.contentJson.frame[i].vc2word.vc2rescdesc1.replace(/\r\n/ig, "<br/>"))), formatString("鎾斁锛氱{0}甯�", new Array(i + 1, 1)));
        }
        else {
            currMMSPanelRender(formatString(MMSNoImageFrameString, new Array(currMMSPanel.contentJson.frame[i].vc2word.vc2rescdesc1.replace(/\r\n/ig, "<br/>"))), formatString("鎾斁锛氱{0}甯�", new Array(i + 1, 1)));
        }
        currMMSPanel.refreshBrotherPanel(i);
        playTime = setTimeout(formatString("previewMMS({0})", new Array(i, 1)), currMMSPanel.contentJson.frame[i].numframetime.toLowerCase().replace('s','') * 1000);
    }
    else {
        if(currMMSPanel.bottomToolbar.items.items[0].text != "鎾斁"){
            currMMSPanel.bottomToolbar.items.items[0].setText("鎾斁");
            currMMSPanel.bottomToolbar.items.items[4].disable();
            currMMSPanel.bottomToolbar.items.items[8].disable();
            if (currMMSPanel.brotherPanel != null) {
                currMMSPanel.brotherPanel.enable();
            }
            
            currMMSPanel.refreshBrotherPanel();
            if (currMMSPanel.contentJson.frame[currMMSPanel.currFrame].vc2image.vc2rescurl != "") {
                currMMSPanelRender(formatString(MMSFrameString, new Array(currMMSPanel.contentJson.frame[currMMSPanel.currFrame].vc2image.vc2rescurl, currMMSPanel.contentJson.frame[currMMSPanel.currFrame].vc2word.vc2rescdesc1.replace(/\r\n/ig, "<br/>"))), formatString("棰勮锛氱{0}甯1}, 鍏眥2}", new Array(currMMSPanel.currFrame + 1, Ext.util.Format.fileSize(currMMSPanel.currFrameSpace), Ext.util.Format.fileSize(currMMSPanel.mmsSpace))));
            }
            else {
                currMMSPanelRender(formatString(MMSNoImageFrameString, new Array(currMMSPanel.contentJson.frame[currMMSPanel.currFrame].vc2word.vc2rescdesc1.replace(/\r\n/ig, "<br/>"))), formatString("棰勮锛氱{0}甯1}, 鍏眥2}", new Array(currMMSPanel.currFrame + 1, Ext.util.Format.fileSize(currMMSPanel.currFrameSpace), Ext.util.Format.fileSize(currMMSPanel.mmsSpace))));
            }
            window.clearInterval(playTime);
            
        }
        playCurrFrameNum = 0;
    }
};

//======================================================褰╀俊甯у垪琛�
//褰╀俊甯фā鏉匡紙鏈夊浘鐗囷級
var MMSFrameSimpleStr = "<div style='display:table-cell;height:100px;width:100px;vertical-align:middle;'><img src={0} style='max-width:100px;max-height:100px;_width:100px;' /><div>";
//褰╀俊甯фā鏉匡紙鏃犲浘鐗囷級
var MMSFrameSimpleStrNoImage = '<div style="text-align:center;"><table width="100" height="80" border="0" align="center" cellpadding="0" cellspacing="0" background="jspack/product/common/Images/frame.gif"><tr><td></td></tr></table></div>';
/*****************************************************
 * Describe:鏂板垱寤哄僵淇�
 * @param {Object} mmsName锛氬僵淇″悕绉�
 * @param {Object} mmsDesc锛氬僵淇℃弿杩�
 * @param {Object} frameCount锛氬抚鎬绘暟
 * @param {Object} mmsType锛氬僵淇＄被鍨�
 *****************************************************/
function newMMS(mmsName, mmsDesc, frameCount, mmsType){
    //鍒涘缓褰╀俊鍒濆淇℃伅
    if (mmsDesc != null && mmsDesc != '' && mmsDesc != "undefined") {
        if (Ext.isIE == true) {
            mmsDesc = mmsDesc.replace(/\r\n/ig, "\\r\\n").replace(/\'/ig, "\\'");
        }
        else {
            mmsDesc = mmsDesc.replace(/\n/ig, "\\n").replace(/\'/ig, "\\'");
        }
        
    }
    mmsName = mmsName.replace(/\'/ig, "\\'");
    var frameJsonStr = "";
    for (var i = 1; i <= frameCount; i++) {
        if (frameCount != 1) {
			if (i == 1) {
				frameJsonStr = "frame: [{numframeid: 0,numframeorder:  " + i + ",vc2framename:'',vc2framedesc:'',numframetime: 5,vc2word: {numrescid: 0,numframeid: 0,vc2rescurl: '',vc2rescname: '',numtype: 3,numrescspace: 0,vc2rescdesc1: '',vc2rescdesc2: ''},vc2image: {numrescid: 0,numframeid: 0,vc2rescurl: '',vc2rescname: '',numtype: 2,numrescspace: 0,vc2rescdesc1: 0,vc2rescdesc2: 0},vc2backmusic: {numrescid: 1,numframeid: 1,vc2rescurl: '',vc2rescname: '',numtype: 1,numrescspace: 0,vc2rescdesc1: '',vc2rescdesc2: ''}}";
			}
			else {
				if (i == frameCount) {
					frameJsonStr = frameJsonStr + ",{numframeid: 0,numframeorder: " + i + ",vc2framename:'',vc2framedesc:'',numframetime: 5,vc2word: {numrescid: 0,numframeid: 0,vc2rescurl: '',vc2rescname: '',numtype: 3,numrescspace: 0,vc2rescdesc1: '',vc2rescdesc2: ''},vc2image: {numrescid: 0,numframeid: 0,vc2rescurl: '',vc2rescname: '',numtype: 2,numrescspace: 0,vc2rescdesc1: 0,vc2rescdesc2: 0},vc2backmusic: {numrescid: 1,numframeid: 1,vc2rescurl: '',vc2rescname: '',numtype: 1,numrescspace: 0,vc2rescdesc1: '',vc2rescdesc2: ''}}]";
				}
				else {
					frameJsonStr = frameJsonStr + ",{numframeid: 0,numframeorder: " + i + ",vc2framename:'',vc2framedesc:'',numframetime: 5,vc2word: {numrescid: 0,numframeid: 0,vc2rescurl: '',vc2rescname: '',numtype: 3,numrescspace: 0,vc2rescdesc1: '',vc2rescdesc2: ''},vc2image: {numrescid: 0,numframeid: 0,vc2rescurl: '',vc2rescname: '',numtype: 2,numrescspace: 0,vc2rescdesc1: 0,vc2rescdesc2: 0},vc2backmusic: {numrescid: 1,numframeid: 1,vc2rescurl: '',vc2rescname: '',numtype: 1,numrescspace: 0,vc2rescdesc1: '',vc2rescdesc2: '绗�" + i + "甯�'}}";
				}
			}
		}
		else {
			frameJsonStr = "frame: [{numframeid: 0,numframeorder:  " + i + ",vc2framename:'',vc2framedesc:'',numframetime: 5,vc2word: {numrescid: 0,numframeid: 0,vc2rescurl: '',vc2rescname: '',numtype: 3,numrescspace: 0,vc2rescdesc1: '',vc2rescdesc2: ''},vc2image: {numrescid: 0,numframeid: 0,vc2rescurl: '',vc2rescname: '',numtype: 2,numrescspace: 0,vc2rescdesc1: 0,vc2rescdesc2: 0},vc2backmusic: {numrescid: 1,numframeid: 1,vc2rescurl: '',vc2rescname: '',numtype: 1,numrescspace: 0,vc2rescdesc1: '',vc2rescdesc2: ''}}]";
		}
	};
    var mmsJsonStr = formatString("{nummmsid: 0,vc2centerid: '',vc2name: '{0}',vc2desc: '{1}',vc2smilurl: '',nummmstype:{2},{3}}", new Array(mmsName, mmsDesc, mmsType, frameJsonStr));
    return eval("(" + mmsJsonStr + ")");
};

//=====================================================鍒ゆ柇褰╀俊涓槸鍚︽湁绌哄抚
/*****************************************************
 * Describe:鍒ゆ柇褰╀俊涓槸鍚︽湁绌哄抚锛屽垽鏂僵淇″ぇ灏忎笉瓒呰繃50K
 * @param {Object} jsonMMSContent锛氬僵淇son瀛楃鍒�
 *****************************************************/
function checkMMS(jsonMMSContent){
    var returnResault = true;
    var numMMSSpace = 0;
    for (var i = 0; i < jsonMMSContent.frame.length; i++) {
        numMMSSpace = numMMSSpace + parseInt(jsonMMSContent.frame[i].vc2word.numrescspace) + parseInt(jsonMMSContent.frame[i].vc2image.numrescspace) + parseInt(jsonMMSContent.frame[i].vc2backmusic.numrescspace);
        if (jsonMMSContent.frame[i].vc2word.numrescspace == 0 && jsonMMSContent.frame[i].vc2image.numrescspace == 0 && jsonMMSContent.frame[i].vc2backmusic.numrescspace == 0) {
            returnResault = false;
            Ext.Msg.alert("娓╅Θ鎻愮ず", "瀵逛笉璧凤紝褰撳墠褰╀俊鍖呭惈鏈紪杈戠殑甯т俊鎭紝璇锋鏌�!");
            return returnResault;
        }
    }
    if(typeof(mmsConfigInfo) == "undefined"){
    	mmsConfigInfo = ajaxSyncCall(Js.Center.SendMMS.MMSConfigInfo,"flag=mmsconfiginfo");
	}
    if(mmsConfigInfo == null){
		if (numMMSSpace > 50 * 1024) {
            returnResault = false;
            Ext.Msg.alert("娓╅Θ鎻愮ず", "瀵逛笉璧凤紝褰╀俊澶у皬涓嶈兘瓒呰繃50K!");
            return returnResault;
        }
	}else{
		if(numMMSSpace > mmsConfigInfo.mmstotalsize){
			returnResault = false;
            Ext.Msg.alert("娓╅Θ鎻愮ず", "瀵逛笉璧凤紝褰╀俊澶у皬涓嶈兘瓒呰繃" + mmsConfigInfo.mmstotalsize/1024 + "K!");
            return returnResault;
		}
	}
    return returnResault;
};


/*****************************************************
 * Describe:鍒ゆ柇褰╀俊甯ф槸鍚︽槸绌哄抚锛堝浘鐗囧拰鏂囧瓧鑷冲皯鏈変竴椤癸級
 * @param {Object} isNeedImage:鏄惁闇�瑕佸浘鐗�
 * @param {Object} vc2FrameImageUrl锛氬抚鍘熷鍥剧墖
 * @param {Object} vc2Word锛氬抚鏂囧瓧
 * @param {Object} vc2ImageUrl锛氭柊鐨勫浘鐗�
 *****************************************************/
function checkMMSFrame(isNeedImage, vc2FrameImageUrl, vc2Word, vc2ImageUrl){
    if (isNeedImage) {
        if (vc2Word == "") {
            Ext.Msg.alert("娓╅Θ鎻愮ず", "瀵逛笉璧�,鍥剧墖鍜屾枃瀛楄鑷冲皯杈撳叆涓�椤�!");
            return false;
        }
        else {
            return true;
        }
    }
    else {
        if (vc2FrameImageUrl == "" && vc2Word == "" && vc2ImageUrl == "" && !isNeedImage) {
            Ext.Msg.alert("娓╅Θ鎻愮ず", "瀵逛笉璧�,鍥剧墖鍜屾枃瀛楄鑷冲皯杈撳叆涓�椤�!");
            return false;
        }
        else {
            return true;
        }
    }
    
};



//==鍥剧墖鏂囦欢绫诲瀷
var imageFileTypeArr = new Array();
imageFileTypeArr[0] = "jpg";
imageFileTypeArr[1] = "gif";
imageFileTypeArr[2] = "png";
imageFileTypeArr[3] = "bmp";
imageFileTypeArr[4] = "jpeg";
imageFileTypeArr[5] = "wbmp";
//==褰╀俊闊充箰鏂囦欢绫诲瀷
var MusicFileTypeArr = new Array();
MusicFileTypeArr[0] = "amr";
MusicFileTypeArr[1] = "mid";
MusicFileTypeArr[2] = "midi";
MusicFileTypeArr[3] = "mp3";
MusicFileTypeArr[4] = "wav";
//褰╀俊鍥剧墖銆佸寳浜煶涔愭牸寮忓府鍔╄鏄庝俊鎭�
MMSMUSICFILETYPEDESC=MusicFileTypeArr.join("|");
MMSIMAGEFILETYPEDESC=imageFileTypeArr.join("|");
/*****************************************************
 * Describe:鍒ゆ柇涓婁紶鍥剧墖鏂囦欢绫诲瀷
 * @param {Object} filePath:涓婁紶鍥剧墖璺緞
 *****************************************************/
function checkImageFileType(filePath){
    var suffix = getFileType(filePath);
    if (!in_array(suffix.toLowerCase(), imageFileTypeArr)) {
        return false;
    }
    else {
        return true;
    }
};

/*****************************************************
 * Describe:鍒ゆ柇褰╀俊甯у浘鐗囩被鍨嬫槸鍚︽纭�
 * @param {Object} isNeedImage:鏄惁闇�瑕佸浘鐗�
 * @param {Object} vc2ImageUrl:鏂扮殑鍥剧墖璺緞
 *****************************************************/
function checkMMSFrameImageType(isNeedImage, vc2ImageUrl){
    if (!isNeedImage) {
        if (!checkImageFileType(vc2ImageUrl)) {
            Ext.Msg.alert("娓╅Θ鎻愮ず", "瀵逛笉璧�,甯у浘鐗囧彧鑳戒笂浼�"+MMSIMAGEFILETYPEDESC+"鏂囦欢绫诲瀷");
            return false;
        }//涓嶆槸姝ｇ‘鐨勫浘鐗囩被鍨�
    }
    return true;
};



/*****************************************************
 * Describe:鍒ゆ柇涓婁紶鑳屾櫙闊充箰鏂囦欢绫诲瀷
 * @param {Object} filePath:涓婁紶鑳屾櫙闊充箰璺緞
 *****************************************************/
function checkMusicFileType(filePath){
    var suffix = getFileType(filePath);
    if (!in_array(suffix.toLowerCase(), MusicFileTypeArr)) {
        return false;
    }
    else {
        return true;
    }
};

/*****************************************************
 * Describe:鍒ゆ柇褰╀俊甯ц儗鏅煶涔愮被鍨嬫槸鍚︽纭�
 * @param {Object} isNeedImage:鏄惁闇�瑕佽儗鏅煶涔�
 * @param {Object} vc2ImageUrl:鏂扮殑鑳屾櫙闊充箰璺緞
 *****************************************************/
function checkMMSFrameMusicType(isNeedMusic, vc2MusicUrl){
    if (!isNeedMusic) {
        if (!checkMusicFileType(vc2MusicUrl)) {
            Ext.Msg.alert("娓╅Θ鎻愮ず", "瀵逛笉璧�,甯ц儗鏅煶涔愬彧鑳戒笂浼�"+MMSMUSICFILETYPEDESC+"鏂囦欢绫诲瀷");
            return false;
        }//涓嶆槸姝ｇ‘鐨勯煶涔愮被鍨�
    }
    return true;
};


//===================================================妫�娴嬩唬鐮佷腑鏄惁瀛樺湪HTML鏍囩
/*****************************************************
 * Describe:妫�娴嬩唬鐮佷腑鏄惁瀛樺湪HTML鏍囩
 * @param {Object} sourceHTML:闇�瑕佹鏌ョ殑浠ｇ爜瀛楃涓�
 *****************************************************/
function isExistsHtmlLable(sourceHTML){
    var arrElement = sourceHTML.match('<[^#]*>');//鍙栧嚭鎵�鏈夌殑<....>鏍煎紡鐨勫瓧涓�====='/<[/|A-Za-z]+>/ig'
    if (arrElement == null) {
        return false;
    }//濡傛灉涓虹┖鍒欒繑鍥瀎alse锛堜笉瀛樺湪锛�
    if (arrElement.length > 0) {
        //Ext.Msg.alert("娓╅Θ鎻愮ず", "瀵逛笉璧�,甯ф枃瀛椾腑涓嶈兘鍚湁HTML鏍囩");
        return true;
    }//瀛樺湪
    return false;
};
/*****************************************************
 * Describe:妫�娴嬪唴瀹归暱搴�
 * @param {Object} :闇�瑕佽绠楃殑浠ｇ爜瀛楃涓�
 *****************************************************/
function DataLength(fData) {
	var intLength = 0;
	for (var i = 0; i < fData.length; i++) {
		//璁＄畻姹夊瓧闀垮害
		if ((fData.charCodeAt(i) < 0) || (fData.charCodeAt(i) > 255)){
			intLength = intLength + 3;
		}
		else{
			intLength = intLength + 1;
		}
	}
	return intLength;
};

function in_array(stringToSearch, arrayToSearch){
    for (var s = 0; s < arrayToSearch.length; s++) {
        thisEntry = arrayToSearch[s].toString();
        if (thisEntry == stringToSearch) {
            return true;
        }
    }
    return false;
};

/*===================================================
 * 鍒涘缓瑙掕壊鎺堟潈鏍�
 ====================================================== */
function createPeimitTree(treeId, roleId, dataURL){
    document.getElementById(treeId).innerHTML = '';
    Ext.get(treeId).dom.innerHTML = '';
    PermissionTree = new Ext.tree.TreePanel({
        applyTo: treeId,
        checkModel: 'cascade',//'parentCascade', //瀵规爲鐨勭骇鑱斿閫�   
        onlyLeafCheckable: false,//瀵规爲鎵�鏈夌粨鐐归兘鍙��   
        style: 'padding:5px 10px 10px 10px',
        animate: false,
        rootVisible: true,
        autoScroll: true,
        loader: new Ext.tree.TreeLoader({
            url: dataURL,//Js.Center.Purview.RightURL,
            listeners: {
                "beforeload": function(treeloader, node){
                    treeloader.baseParams = {
                        flag: 'selectbyroleid',
                        RoleID: roleId,//row.get("numroleid"),
                        parentid: node.id,
                        method: 'Post'
                    };
                },
                "load": function(loader, node, response){
                    var childNodes = node.childNodes;
                    if (childNodes || childNodes.length > 0) {
                        Ext.MessageBox.show({
                            msg: '姝ｅ湪鍔犺浇鏁版嵁锛岃绋嶇瓑...',
                            progressText: 'Loading...',
                            width: 300,
                            wait: true,
                            waitConfig: {
                                interval: 200
                            },
                            icon: 'download',
                            animEl: 'saving'
                        });
                        
                    }
                    for (var i = 0; i < childNodes.length; i++) {
                        if (i == childNodes.length - 1) {
                            setTimeout(function(){
                                Ext.MessageBox.hide();
                            }, 3000);
                        }
                    }
                }
            },
            baseAttrs: {
                uiProvider: Ext.ux.TreeCheckNodeUI
            }
        }),
        root: new Ext.tree.AsyncTreeNode({
            id: '-1',
            text: '鏃犵嚎澶╁埄鐭俊鍙戦�佸钩鍙�'
        })
    });
    // PermissionTree.getEl().center();   
    //灞曞紑鎵�鏈夎妭鐐�
    PermissionTree.expandAll();
};

/*===================================================
 * 鍙栧緱涓�涓妭鐐圭殑鎵�鏈夊瓙鑺傜偣
 * 鍖呮嫭鏈妭鐐�
 ====================================================== */
function getAllChildrenNodes(node){
    var children = [];
    children.push(node);
    if (!node.isLeaf()) {
        for (var i = 0; i < node.childNodes.length; i++) {
            children = children.concat(getAllChildrenNodes(node.childNodes[i]));
        }
    }
    return children;
};
//鍔犺浇绛夊緟Loading鐣岄潰
WXTL.Common.WaitLoadMsg = null;
WXTL.Common.showWaitLoading = function(ishow){
    if (ishow) {
        document.body.style.cursor = "wait";
        WXTL.Common.WaitLoadMsg = new Ext.LoadMask(Ext.getBody(), {
            msg: '姝ｅ湪鍔犺浇鏁版嵁锛岃绋嶅��...',
            removeMask: true //瀹屾垚鍚庣Щ闄�
            //store:store
        });
        WXTL.Common.WaitLoadMsg.show();
    }
    else {
        document.body.style.cursor = "default";
        WXTL.Common.WaitLoadMsg.hide();
    }
};

/*************************************************************
 * Describe: 鑾峰彇SessionID
 **************************************************************/
function getSessionID(){
    var conn = Ext.lib.Ajax.getConnectionObject().conn;
    conn.open("POST", "/url/GetSession.ashx", false);
    conn.send('');
    var response = conn.responseText;
    
    if (response != null) {
        if (response.indexOf("娌℃湁鐧诲綍") > 0) {
            Ext.Msg.alert("娓╅Θ鎻愮ず", "瀵逛笉璧凤紝鎮ㄧ殑淇℃伅宸茶繃鏈熻閲嶆柊鐧诲綍!", function(){
                window.location.href = "login.htm";
            });
        }
        else {
            return response;
        }
        
    }
    else {
        Ext.Msg.alert("娓╅Θ鎻愮ず", "瀵逛笉璧凤紝鎮ㄧ殑淇℃伅宸茶繃鏈熻閲嶆柊鐧诲綍!", function(){
            window.location.href = "login.htm";
        });
    }
    //return "b0zp1q454in5lb55f23bi345";
};



function getTimeDiff(date1, date2, isFormat){
    try {    
        var len = arguments.length;        
        var tmpdate1 = new Date();        
        var tmpdate2 = new Date();        
        if (len == 1) {
			tmpdate1 = date1;
		}
		else {
			if (len == 3) {
				tmpdate1 = date1;
				tmpdate2 = date2;
			}
		}
        if (!(tmpdate1 instanceof Date) || !(tmpdate2 instanceof Date)) {        
            alert("璇疯緭鍏ユ纭殑鍙傛暟锛�");            
            return 0;            
        }
        else {        
            var time1 = tmpdate1.getTime();            
            var time2 = tmpdate2.getTime();            
            var time = Math.max(time1, time2) - Math.min(time1, time2);            
            if (!isNaN(time) && time > 0) {            
                if (isFormat) {                
                    var date = new Date(time);                    
                    var result = "";                    
                    result += (date.getFullYear() - 1970) > 0 ? (date.getFullYear() - 1970) + "骞�" : "";                    
                    result += (date.getMonth() - 1) > 0 ? (date.getMonth() - 1) + "鏈�" : "";                    
                    result += (date.getDate() - 1) > 0 ? (date.getDate() - 1) + "鏃�" : "";                    
                    result += (date.getHours() - 8) > 0 ? (date.getHours() - 1) + "灏忔椂" : "";                    
                    result += date.getMinutes() > 0 ? date.getMinutes() + "鍒嗛挓" : "";                    
                    result += date.getSeconds() > 0 ? date.getSeconds() + "绉�" : "";                    
                    return result;                    
                }
                else {                
                    return time;                    
                }                
            }
            else {            
                return '0绉�';                
            }            
        }        
    } 
    catch (e) {    
        alert(e.message);        
    }    
};

/*
 * 鍔ㄦ�佺敓鎴愰厤缃」椤甸潰
 */
WXTL.Common.generateConfigFormItem = function(configData,formPanel){
	var item;
	if(!configData.success && configData.info == "瀵逛笉璧凤紝鎮ㄦ病鏈夌櫥褰曪紒"){
		Ext.Msg.alert("娓╅Θ鎻愮ず", "瀵逛笉璧凤紝鎮ㄧ殑淇℃伅宸茶繃鏈熻閲嶆柊鐧诲綍!", function(){
            window.location.href = "login.htm";
        });
	}
	else{
		for(var i=0; i<configData.data.length;i++){
			//鍒ゆ柇閰嶇疆琛ㄤ腑鏄惁鏈夊�硷紝濡傛灉娌℃湁閰嶇疆椤圭殑鍊兼樉绀洪粯璁ゅ��
			var _value = configData.data[i].itemvalue != ""?configData.data[i].itemvalue:configData.data[i].vc2value;
	    	//鍒ゆ柇閰嶇疆椤规槸鍚﹂渶瑕侀殣钘�
			if(configData.data[i].numhide == 1){
				//鏍规嵁涓嶅悓绫诲瀷鍒涘缓涓嶅悓鎺т欢
				if(configData.data[i].numtypeid == 1 || configData.data[i].numtypeid == 5 || configData.data[i].numtypeid == 6|| configData.data[i].numtypeid == 7|| configData.data[i].numtypeid == 8){
		    		item = new Ext.form.TextField({
		    			fieldLabel: configData.data[i].vc2name,
		    			name:configData.data[i].vc2key,
		    			value:_value,
		    			maxLength:configData.data[i].vc2range
		    		});
		    		formPanel.add(item);
		    	}
		    	if(configData.data[i].numtypeid == 2){
		    		//鑾峰彇閰嶇疆椤硅寖鍥�
		    		var range;
		    		if(configData.data[i].vc2range != ""){
		    			range = configData.data[i].vc2range.split(",");
		    		}
		    		item = new Ext.form.NumberField({
		    			fieldLabel:configData.data[i].vc2name,
		    			name:configData.data[i].vc2key,
		    			value:_value,
		    			minValue:range[0],
		    			maxValue:range[1]
		    		});
		    		formPanel.add(item);
		    	}
		    	if(configData.data[i].numtypeid == 3){
		    		item = new Ext.form.TextArea({
		    			fieldLabel:configData.data[i].vc2name,
		    			name:configData.data[i].vc2key,
		    			value:_value,
		    			maxLength:configData.data[i].vc2range,
		    			height:100
		    		});
		    		formPanel.add(item);
		    	}
		    	if(configData.data[i].numtypeid == 4){
		    		item = new Ext.form.DateField({
		    			fieldLabel:configData.data[i].vc2name,
		    			name:configData.data[i].vc2key,
		    			value:WXTL.Common.dateTime.parseDate(_value),
		    			readOnly: true,
		                emptyText: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow()), 'Y-m-d'),
		                format: 'Y-m-d',
		                validateOnBlur: false
		    		});
		    		formPanel.add(item);
		    	}
		    	if(configData.data[i].numtypeid == 9){
		    		item = new Ext.form.ComboBox({
		    			fieldLabel:configData.data[i].vc2name,
		    			name:configData.data[i].vc2key,
		    			hiddenName: configData.data[i].vc2key,
		    			value:_value,
		                readOnly: true,
		                mode: "local",
		                displayField: "show",
		                valueField: "value",
		                triggerAction: "all",
		                emptyText: "璇烽�夋嫨",
		                store: new Ext.data.SimpleStore({
		                    fields: ["show", "value"],
		                    data:eval(configData.data[i].vc2range)
		                })
		    		});
		    		formPanel.add(item);
		    	}
			}
			else{
				item = new Ext.form.Hidden({
	    			fieldLabel: configData.data[i].vc2name,
	    			name:configData.data[i].vc2key,
	    			value:_value//,
	    			//maxLength:configData.data[i].vc2range
	    		});
	    		formPanel.add(item);
			}
			
	    }
	}
	
};
