function ajxCreateXMLHttpRequest(cbFunc, sync) {
    var XMLhttpObject = null;
    try {
        XMLhttpObject = new XMLHttpRequest();
    } catch (e) {
        return null;
    }
    if (XMLhttpObject) {
        var ua = navigator.userAgent;
        var safari = ua.indexOf("Safari") != -1;
        var konqueror = ua.indexOf("Konqueror") != -1;
        var mozes = ((a = navigator.userAgent.split("Gecko/")[1]) ? a.split(" ")[0] : 0) >= 20011128;
        var mobile = ua.indexOf("Mobile") != -1;
        if (window.opera || safari || konqueror || mozes) {
            XMLhttpObject.onload = function() {
                cbFunc(XMLhttpObject);
            }
        } else {
            XMLhttpObject.onreadystatechange = function() {
                cbFunc(XMLhttpObject);
            }
        }
        try {
            XMLhttpObject.open("POST", avrIP + "/YamahaRemoteControl/ctrl", sync);
        } catch (e) {
            return null;
        }
        XMLhttpObject.setRequestHeader("Content-Type", "text/xml");
        if (safari && mobile) {
            XMLhttpObject.setRequestHeader('Cache-Control', 'no-cache');
        }
    }
    return XMLhttpObject;
}
function ajxSendGetData(data, cbFunc) {
    var sync = true;
    var XMLhttpObject = null;
    try {
        XMLhttpObject = new XMLHttpRequest();
    } catch (e) {
        return null;
    }
    if (XMLhttpObject) {
        var ua = navigator.userAgent;
        var safari = ua.indexOf("Safari") != -1;
        var konqueror = ua.indexOf("Konqueror") != -1;
        var mozes = ((a = navigator.userAgent.split("Gecko/")[1]) ? a.split(" ")[0] : 0) >= 20011128;
        if (window.opera || safari || konqueror || mozes) {
            XMLhttpObject.onload = function() {
                cbFunc(XMLhttpObject);
            }
        } else {
            XMLhttpObject.onreadystatechange = function() {
                cbFunc(XMLhttpObject);
            }
        }
        try {
            XMLhttpObject.open("GET", data, sync);
        } catch (e) {
            return null;
        }
        XMLhttpObject.setRequestHeader('Pragma', 'no-cache');
        XMLhttpObject.setRequestHeader('Cache-Control', 'no-cache');
        XMLhttpObject.setRequestHeader('If-Modified-Since', 'Thu, 01 Jun 1970 00:00:00 GMT');
    }
    XMLhttpObject.send(null);
}
function ajxCreateXMLObject() {
    var xml;
    if (window.ActiveXObject) {
        xml = new ActiveXObject("Microsoft.XMLDOM");
    } else if (document.implementation) {
        xml = document.implementation.createDocument("", "", null);
    } else {
        return null;
    }
    return xml;
}
function ajxSendData(httpObj, xml) {
    httpObj.send(xml);
}
function ajxRecvDataForRecovery(res) {
    if ((res.readyState == 4) && (res.status == 200)) {
        setBackupRecoveryProgressText(res.responseText);
    }
}
function ajxRecvDataForFirmwareUpdate(res) {
    if ((res.readyState == 4) && (res.status == 200)) {
        getFirmwareUpdateReturn(res.responseText);
    }
}
gZoneName2Idx = {
    "Main_Zone": 0,
    "Zone_2": 1,
    "Zone_3": 2,
    "Zone_4": 3
};
gZoneIdx2Name = {
    "0": "Main_Zone",
    "1": "Zone_2",
    "2": "Zone_3",
    "3": "Zone_4"
};
gDlyTm = {
    "0": 450,
    "1": 600,
    "2": 750,
    "3": 900
};
gPower2Idx = {
    "Standby": 0,
    "On": 1,
    "On/Standby": 2
};
gPower2Name = {
    "0": "Standby",
    "1": "On",
    "2": "On/Standby"
};
gOnOff2Name = {
    "0": "Off",
    "1": "On"
};
gOnOff2Idx = {
    "On": 1,
    "Off": 0
};
gSleep2Idx = {
    "Off": 0,
    "30 min": 1,
    "60 min": 2,
    "90 min": 3,
    "120 min": 4,
    "Last": 5
};
gMute2Idx = {
    "Off": 0,
    "Att -40 dB": 1,
    "Att -20 dB": 2,
    "On": 3,
    "On/Off": 4
};
gMuteStatus2Name = {
    "0": "Off",
    "1": "Att -40 dB",
    "2": "Att -20 dB",
    "3": "On",
    "4": "On/Off"
};
var g_NotExist = '0';
var gZoneISIIdx2Name = {
    "0": "Item_1",
    "1": "Item_2",
    "2": "Item_3",
    "3": "Item_4",
    "4": "Item_5",
    "5": "Item_6",
    "6": "Item_7",
    "7": "Item_8",
    "8": "Item_9",
    "9": "Item_10",
    "10": "Item_11",
    "11": "Item_12",
    "12": "Item_13",
    "13": "Item_14",
    "14": "Item_15",
    "15": "Item_16",
    "16": "Item_17",
    "17": "Item_18",
    "18": "Item_19",
    "19": "Item_20",
    "20": "Item_21",
    "21": "Item_22",
    "22": "Item_23",
    "23": "Item_24",
    "24": "Item_25",
    "25": "Item_26",
    "26": "Item_27",
    "27": "Item_28",
    "28": "Item_29",
    "29": "Item_30"
};
gNetworkConnectIdx = {
    "Unknown": -1,
    "Unknown Network": 0,
    "Wired LAN": 1,
    "Wireless LAN": 2,
    "Wireless Direct": 3,
    "Extend (1)": 4,
    "Extend (2)": 5,
    "Extend (3)": 6
};
gNetworkConnectName = {
    0: "Unknown Network",
    1: "Wired LAN",
    2: "Wireless LAN",
    3: "Wireless Direct",
    4: "Extend (1)",
    5: "Extend (2)",
    6: "Extend (3)"
};
gSecurityTypeIdx = {
    "None": 0,
    "WEP": 1,
    "WPA2-PSK(AES)": 2,
    "Mixed Mode": 3
};
gDirectSecurityTypeIdx = {
    "None": 0,
    "WPA2-PSK(AES)": 1
};
function ajxReload(g_Zone) {
    ajxDispStatusBar('Go Reload');
    if (g_heart_beat == 0) {
        if (GetEleId("divsettingpage").style.display == "none") {
            if (g_Info.blnPartyModeValid()) {
                timerAfterCmd("ajxGetPartyModeStatus", 150);
            }
            if (g_Zone == -1) {
                for (var i = 0; i < g_Info.GetMaxZoneNum(); i++) {
                    timerAfterCmdWithParam("ajxGetBasicStatus('" + gZoneIdx2Name[i] + "')", gDlyTm[i]);
                }
            } else {
                timerAfterCmdWithParam("ajxGetBasicStatus('" + gZoneIdx2Name[g_Zone] + "')", 450);
            }
        } else {}
        g_reload_count = 0;
    } else {
        g_reload_count++;
        if (g_reload_count >= 10) {
            var alertmsg = 'Network Communication Error!\n' + '\n' + 'The receiver is not responding to the network communication.\n' + 'Following example cases might have caused this situation:\n' + '\n' + '- The receiver is turned off while the Network Standby is set to off. See if the Network Standby is set to \"On\".\n' + '\n' + '- AC power of the receiver is not supplied.\n' + '\n' + '- Network itself has some problems. Verify router\'s status, network cables, IP address on the receiver and so on.\n';
            alert(alertmsg);
            g_reload_count = 0;
        } else {}
    }
    g_heart_beat = 1;
    if (g_Info.m_bootMode == 2) {
        ajxGetNetworkStandby();
    }
}
var gInit = new ajxInit();
function ajxInit() {
    this.svsInfo = false;
    this.fexistInfo = false;
    this.initAllDone = false;
    this.initStg1Done = false;
    this.checkCount = 0;
    this.TimerID = 0;
    this.devTuner = false;
    this.devHdradio = false;
    this.devDab = false;
    this.devIpod = true;
    this.checkStage1 = function() {
        if (this.initStg1Done == true) {
            return true;
        }
        if (g_Info.m_bootMode != 2) {
            return true;
        }
        if (this.svsInfo == false || this.fexistInfo == false) {
            return false;
        }
        this.checkCount = 50;
        if (g_Info.blnExistZone() == false) {
            for (var i = 1; i < CSTzoneNumMax; i++) {
                this.zoneinfo[i].name = true;
            }
            this.PartyMode = true;
        }
        if (false == g_Info.blnPartyModeValid()) {
            this.PartyMode = true;
        }
        if (g_Info.m_existTuner == false) {
            this.tunerPreset = true;
        }
        if (g_Info.m_existHD == false) {
            this.hdradioPreset = true;
        }
        if (g_Info.m_existDAB == false) {
            this.dabPreset = true;
        }
        this.initStg1Done = true;
        return true;
    }
    this.tunerPreset = false;
    this.hdradioPreset = false;
    this.dabPreset = false;
    this.ipodMode = true;
    this.netusbPreset = false;
    this.PartyMode = false;
    this.AirPlayPasswordMode = false;
    function devZoneInfo() {
        this.name = false;
        this.inputSelItem = false;
    }
    this.zoneinfo = [];
    for (var i = 0; i < CSTzoneNumMax; i++) {
        this.zoneinfo.push(new devZoneInfo());
    }
    this.checkStage2 = function() {
        var ret = true;
        if (g_Info.m_bootMode != 2) {
            return this.friendlynameinfo;
        }
        if (this.tunerPreset == false || this.hdradioPreset == false || this.dabPreset == false || this.ipodMode == false || this.PartyMode == false || this.netusbPreset == false) {
            ret = false;
        }
        for (var i = 0; i < g_Info.GetMaxZoneNum(); i++) {
            if (this.zoneinfo[i].name == false || this.zoneinfo[i].inputSelItem == false) {
                ret = false;
                break;
            }
        }
        return ret;
    }
    this.clear = function() {
        this.svsInfo = false;
        this.fexistInfo = false;
        this.initAllDone = false;
        this.initStg1Done = false;
        this.checkCount = 0;
        this.devTuner = false;
        this.devHdradio = false;
        this.devDab = false;
        this.devIpod = true;
        for (var i = 0; i < CSTzoneNumMax; i++) {
            this.zoneinfo[i].name = false;
            this.zoneinfo[i].inputSelItem = false;
        }
        this.friendlynameinfo = false;
        this.networkstandbyinfo = false;
    }
}
function ajxInitConfig() {
    g_Info.m_infoTuner.m_Device = "";
    g_Info.m_infoHdradio.m_Device = "";
    g_Info.m_infoDab.m_Device = "";
    g_Info.m_infoiPod.m_Device = "";
    g_Info.m_info[0].m_zoneName = "";
    g_Info.m_info[1].m_zoneName = "";
    g_Info.m_info[2].m_zoneName = "";
    g_Info.m_info[3].m_zoneName = "";
    gInit.clear();
    ajxGetInitConfigCommon();
    if (g_Info.m_bootMode == 2) {
        ajxGetInitConfigStg1();
    }
    gInit.TimerID = setInterval("ajxCheckInitConfig()", 10);
}
function ajxGetInitConfigCommon() {
    ajxGetService_Info();
    if ((gInit.fexistInfo == false) || (g_Info.modelName == "")) {
        ajxDispStatusBar('ajxGetFeatureExistence_Info');
        ajxGetFeatureExistence_Info();
    }
    if (gInit.friendlynameinfo == false) {
        ajxGetFriendlyName()
    }
    if (gInit.AirPlayPasswordMode == false) {
        ajxGetAirPlayPassword();
    }
}
function ajxGetInitConfigStg1() {
    var ret;
    if (gInit.svsInfo == false) {
        ajxDispStatusBar('ajxGetService_Info');
        ret = ajxGetService_Info();
    }
    if ((gInit.fexistInfo == false) || (g_Info.modelName == "")) {
        ajxDispStatusBar('ajxGetFeatureExistence_Info');
        ret = ajxGetFeatureExistence_Info();
    }
    if (gInit.devTuner == false) {
        ajxDispStatusBar('ajxGetTunerConfig');
        ajxGetTunerConfig();
    }
    if (gInit.devHdradio == false) {
        ajxDispStatusBar('ajxGetHD_RadioConfig');
        ajxGetHD_RadioConfig();
    }
    if (gInit.devDab == false) {
        ajxDispStatusBar('ajxGetDABConfig');
        ajxGetDABConfig();
    }
}
function ajxGetInitConfigStg2() {
    for (var i = 0; i < g_Info.GetMaxZoneNum(); i++) {
        if (gInit.zoneinfo[i].inputSelItem == false) {
            ajxGetInputSelItem(gZoneIdx2Name[i]);
        }
        if (gInit.zoneinfo[i].name == false) {
            ajxGetRename(gZoneIdx2Name[i]);
        }
    }
    if (gInit.friendlynameinfo == false) {
        ajxGetFriendlyName()
    }
    if (gInit.networkstandbyinfo == false) {
        ajxGetNetworkStandby()
    }
    if (gInit.tunerPreset == false) {
        ajxDispStatusBar('ajxGetTunerx');
        ajxGetTunerPresetData();
    }
    if (gInit.hdradioPreset == false) {
        ajxDispStatusBar('ajxGetHdradioPresetData');
        ajxGetHdradioPresetData();
    }
    if (gInit.dabPreset == false) {
        ajxDispStatusBar('ajxGetDabPresetData');
        ajxGetDabPresetData();
        ajxDispStatusBar('ajxGetDabFmPresetData');
        ajxGetDabFmPresetData();
    }
    if (gInit.netusbPreset == false) {
        ajxDispStatusBar('ajxGetNetusbPreset');
        ajxGetNetusbPreset();
    }
    if (gInit.ipodMode == false) {
        ajxDispStatusBar('ajxGetIpodMode');
        ajxGetIpodMode(false);
    }
    if (gInit.PartyMode == false) {
        ajxDispStatusBar('ajxGetPartyMode');
        ajxGetPartyMode(false);
    }
}
function ajxCheckInitConfig() {
    if (gInit.checkStage1() == false) {
        gInit.checkCount++;
        if (gInit.checkCount > 50) {
            gInit.checkCount = 0;
            ajxGetInitConfigStg1();
        }
    } else if (gInit.checkStage2() == false) {
        gInit.checkCount++;
        if (gInit.checkCount > 50) {
            gInit.checkCount = 0;
            ajxGetInitConfigStg2();
        }
    } else {
        ajxDispStatusBar('ajxGetInitConfigComp');
        checkParameter(true);
        window.status = " ";
        clearInterval(gInit.TimerID);
        onLoad2();
        ajxReload(-1);
    }
}
function ajxGetBasicStatus(zone) {
    ajxSendXMLData(true, "GET", zone, "Basic_Status", "GetParam");
}
function ajxGetInputSelItem(zone) {
    ajxSendXMLData(false, "GET", zone, "Input", "Input_Sel_Item", "GetParam");
}
function ajxSendXMLData() {
    var len = arguments.length;
    if (len < 4) {
        return;
    }
    var httpObj = ajxCreateXMLHttpRequest(ajxRecvData, arguments[0]);
    var xml = ajxCreateXMLObject();
    if (httpObj && xml) {
        var elm = new Array;
        elm[0] = xml.createElement("YAMAHA_AV");
        xml.appendChild(elm[0]);
        elm[0].setAttribute('cmd', arguments[1]);
        var i;
        for (i = 1; i < len - 2; i++) {
            elm[i] = xml.createElement(arguments[i + 1]);
            elm[i - 1].appendChild(elm[i]);
        }
        elm[len - 3].appendChild(xml.createTextNode(arguments[len - 1]));
        ajxSendData(httpObj, xml);
    }
}
function ajxSetZonePower(zone, OnOff) {
    ajxSendXMLData(true, "PUT", gZoneIdx2Name[zone], "Power_Control", "Power", gPower2Name[OnOff]);
}
function ajxSetAllPower(OnOff) {
    ajxSendXMLData(true, "PUT", "System", "Power_Control", "Power", gPower2Name[OnOff]);
}
function ajxSetPartyMode(OnOff) {
    if (g_Info.blnPartyModeValid()) {
        ajxSendXMLData(true, "PUT", "System", "Party_Mode", "Mode", gOnOff2Name[OnOff]);
    }
}
function ajxGetPartyModeStatus() {
    ajxGetPartyMode(true);
}
function ajxGetPartyMode(sync) {
    if (g_Info.blnPartyModeValid()) {
        ajxSendXMLData(sync, "GET", "System", "Party_Mode", "Mode", "GetParam");
        timerAfterCmd("ajxGetPartyModeTarget", 100);
    }
}
function ajxGetPartyModeTarget() {
    if (g_Info.blnPartyModeValid()) {
        ajxSendXMLData(true, "GET", "System", "Party_Mode", "Target_Zone", "GetParam");
    }
}
function ajxSetMute(zone, OnOff) {
    var mute;
    if (OnOff == 0) {
        mute = "Off";
    } else {
        mute = "On";
    }
    ajxSendXMLData(true, "PUT", gZoneIdx2Name[zone], "Volume", "Mute", mute);
}
function ajxSetSystemMemory(zone, mem) {
    ajxSendXMLData(true, "PUT", gZoneIdx2Name[zone], "Scene", "Scene_Load", 'Scene ' + mem);
}
function ajxSetSleep(zone, time) {
    var sleep = ["Off", "30 min", "60 min", "90 min", "120 min", "Last"];
    ajxSendXMLData(true, "PUT", gZoneIdx2Name[zone], "Power_Control", "Sleep", sleep[time]);
}
function ajxSetVolumeLvlNum(zone, volumenum) {
    if (zone == -1) {
        zone = 0;
    }
    var val = encodeVal(volumenum * 10);
    val[2] = 1;
    var httpObj = ajxCreateXMLHttpRequest(ajxRecvData, true);
    var xml = ajxCreateXMLObject();
    if (httpObj && xml && val[0] == 0) {
        var top = xml.createElement("YAMAHA_AV");
        xml.appendChild(top);
        top.setAttribute("cmd", "PUT");
        var e1 = xml.createElement(gZoneIdx2Name[zone]);
        var e2 = xml.createElement("Volume");
        var e3 = xml.createElement("Lvl");
        var e41 = xml.createElement("Val");
        var e42 = xml.createElement("Exp");
        var e43 = xml.createElement("Unit");
        top.appendChild(e1);
        e1.appendChild(e2);
        e2.appendChild(e3);
        e3.appendChild(e41);
        e3.appendChild(e42);
        e3.appendChild(e43);
        e41.appendChild(xml.createTextNode(val[1]));
        e42.appendChild(xml.createTextNode(val[2]));
        e43.appendChild(xml.createTextNode("dB"));
        ajxSendData(httpObj, xml);
    }
}
function ajxSetInput(zone, inputname) {
    ajxSendXMLData(true, "PUT", gZoneIdx2Name[zone], "Input", "Input_Sel", inputname);
}
function ajxSetSurround(surroundname) {
    var httpObj = ajxCreateXMLHttpRequest(ajxRecvData, true);
    var xml = ajxCreateXMLObject();
    if (httpObj && xml) {
        var top = xml.createElement("YAMAHA_AV");
        xml.appendChild(top);
        top.setAttribute("cmd", "PUT");
        var e1 = xml.createElement("Main_Zone");
        var e2 = xml.createElement("Surround");
        var e3 = xml.createElement("Program_Sel");
        var e4 = xml.createElement("Current");
        var e51 = xml.createElement(g_StraightName);
        var e52 = xml.createElement("Sound_Program");
        top.appendChild(e1);
        e1.appendChild(e2);
        e2.appendChild(e3);
        e3.appendChild(e4);
        e4.appendChild(e51);
        if (surroundname == g_StraightName) {
            e51.appendChild(xml.createTextNode("On"));
        } else {
            e51.appendChild(xml.createTextNode("Off"));
            e4.appendChild(e52);
            e52.appendChild(xml.createTextNode(surroundname));
        }
        ajxSendData(httpObj, xml);
    }
}
function ajxSetEnhancer(mode) {
    ajxSendXMLData(true, "PUT", "Main_Zone", "Surround", "Program_Sel", "Current", "Enhancer", mode);
}
function ajxRecvData(httpObj) {
    var Cmd = ["Service", "System", "Main_Zone", "Zone_2", "Zone_3", "Zone_4", "Tuner", "USB", "HD_Radio", "DAB", "NET_RADIO", "SERVER", "SiriusXM", "Rhapsody", "Napster", "Pandora", "AirPlay", "iPod_USB", "Spotify", "JUKE", "Bluetooth", "MusicCast_Link"];
    if ((httpObj.readyState == 4) && (httpObj.status == 200)) {
        var xmlData = httpObj.responseXML;
        if (xmlData) {
            var cmdname = "";
            for (var i = 0; i < Cmd.length; i++) {
                var zone = xmlData.getElementsByTagName(Cmd[i]);
                if (zone.length == 1) {
                    cmdname = Cmd[i];
                    break;
                } else if (zone.length > 1 && Cmd[i] == "DAB") {
                    cmdname = Cmd[i];
                    break;
                }
            }
            if (cmdname == "") {
                ajxCleanUpObj(httpObj);
                return false;
            }
            var tmp = xmlData.getElementsByTagName("YAMAHA_AV")[0];
            var rsp = tmp.getAttribute("rsp");
            var rc = tmp.getAttribute("RC");
            switch (cmdname) {
            case "Service":
                ajxHandleService_Info(xmlData, rsp, rc);
                break;
            case "System":
                ajxHandleSystem(xmlData, rsp, rc);
                break;
            case "Main_Zone":
                ajxHandleZoneX(xmlData, rsp, rc, 0);
                break;
            case "Zone_2":
                ajxHandleZoneX(xmlData, rsp, rc, 1);
                break;
            case "Zone_3":
                ajxHandleZoneX(xmlData, rsp, rc, 2);
                break;
            case "Zone_4":
                ajxHandleZoneX(xmlData, rsp, rc, 3);
                break;
            case "iPod_USB":
                ajxHandleIpod(xmlData, rsp, rc);
                break;
            case "Tuner":
                ajxHandleTuner(xmlData, rsp, rc);
                break;
            case "HD_Radio":
                ajxHandleHdradio(xmlData, rsp, rc);
                break;
            case "DAB":
                ajxHandleDab(xmlData, rsp, rc);
                break;
            case "USB":
            case "NET_RADIO":
            case "SERVER":
            case "SiriusXM":
            case "Rhapsody":
            case "Napster":
            case "Pandora":
            case "AirPlay":
            case "Spotify":
            case "JUKE":
            case "Bluetooth":
            case "MusicCast_Link":
                ajxHandleNetusb(xmlData, rsp, rc);
                break;
            default:
                break;
            }
        }
        ajxCleanUpObj(httpObj);
    }
}
function ajxCleanUpObj(httpObj) {
    var xmlData = httpObj.responseXML;
    delete xmlData;
    xmlData = {};
    xmlData = null;
    if (g_IsIE) {
        httpObj.onreadystatechange = {};
    } else {
        httpObj.onload = {};
    }
    delete httpObj;
    httpObj = null;
}
function ajxFindChildNodeName(xmlData, pNodeName) {
    val = xmlData.getElementsByTagName(pNodeName).item(0);
    for (var i = 0; i < val.childNodes.length; i++) {
        if (val.childNodes[i].nodeType == 1) {
            return val.childNodes[i].nodeName;
        }
    }
    return null;
}
function ajxGetParam(xmlData) {
    var node = 'YAMAHA_AV';
    var xml = ajxCreateXMLObject();
    var elm = new Array;
    elm[0] = xml.createElement(node);
    xml.appendChild(elm[0]);
    elm[0].setAttribute('cmd', 'GET');
    for (var i = 1; ; i++) {
        var child = ajxFindChildNodeName(xmlData, node);
        if (child != null) {
            node = child;
            elm[i] = xml.createElement(node);
            elm[i - 1].appendChild(elm[i]);
        } else {
            if (i > 1) {
                elm[i - 1].appendChild(xml.createTextNode('GetParam'));
                var httpObj = ajxCreateXMLHttpRequest(ajxRecvData, true);
                ajxSendData(httpObj, xml);
            }
            break;
        }
    }
}
function ajxHandleZoneX(xmlData, rsp, rc, zone) {
    if (rsp == 'GET' && rc == 0) {
        ajxHandleRcvGetStatus(xmlData, zone);
        if (g_Zone == -1) {
            setTopMenuParameter();
        } else {
            setZoneParameter();
            switch (g_inputName[g_Info.m_info[zone].m_input]) {
            case "TUNER":
                ajxReloadAnaHdTuner(zone);
                break;
            case "iPod (USB)":
                ajxReloadIpod();
                break;
            case "USB/NET":
            case "SERVER":
            case "NET RADIO":
            case "USB":
            case "Rhapsody":
            case "Napster":
            case "SiriusXM":
            case "Spotify":
            case "Pandora":
            case "AirPlay":
            case "JUKE":
            case "Bluetooth":
            case "MusicCast Link":
                ajxReloadNetusb();
                break;
            case "MULTI CH":
            case "PHONO":
            case "AV1":
            case "AV2":
            case "AV3":
            case "AV4":
            case "AV5":
            case "AV6":
            case "AV7":
            case "V-AUX":
            case "AUDIO1":
            case "AUDIO2":
            case "AUDIO3":
            case "AUDIO4":
            default:
                break;
            }
        }
        return;
    }
    if (rsp == 'PUT') {
        if (EXISTTAG(xmlData, 'Scene_Load') == false) {
            ajxGetParam(xmlData);
        } else {
            ajxGetBasicStatus(gZoneIdx2Name[zone]);
        }
        if ((rc == 3) || (rc == 4)) {
            if (EXISTTAG(xmlData, 'Config') == true) {
                var zname = "";
                for (var i = 0; i < g_Info.GetMaxZoneNum(); i++) {
                    zname = gZoneIdx2Name[i];
                    if (EXISTTAG(xmlData, zname) == true) {
                        gInit.zoneinfo[i].name = false;
                        ajxGetRename(zname);
                    }
                }
            }
            if (EXISTTAG(xmlData, 'Network_Name') == true) {
                gInit.friendlynameinfo = false;
                ajxGetFriendlyName();
            }
            if (EXISTTAG(xmlData, 'Network') == true) {
                if (EXISTTAG(xmlData, 'Parameters') == true) {
                    if (EXISTTAG(xmlData, 'IP') == true) {
                        if (EXISTTAG(xmlData, 'Wired_or_Wireless') == true) {
                            ajxGetNetwork();
                        }
                    }
                } else if (EXISTTAG(xmlData, 'MAC_Address_Filter') == true) {
                    ajxGetMacFilter();
                } else if (EXISTTAG(xmlData, 'Network_Standby') == true) {
                    ajxGetNetworkStandby();
                }
            }
        }
    }
}
function ajxHandleService_Info(xmlData, rsp, rc) {
    if (rsp == 'GET' && rc == 0) {
        var val;
        if (EXISTTAG(xmlData, 'Destination') == true) {
            val = GEBTN(xmlData, 'Destination', ' ');
            g_Info.destination = val;
            gInit.svsInfo = true;
        }
        if ((EXISTTAG(xmlData, 'Service') == true) && (EXISTTAG(xmlData, 'Info') == true) && EXISTTAG(xmlData, 'Web_Control') == true) {
            val = GEBTN(xmlData, 'Web_Control', '');
            switch (val) {
            case "Basic 2":
                g_Info.m_bootMode = 1;
                break;
            case "Full":
                g_Info.m_bootMode = 2;
                break;
            default:
                g_Info.m_bootMode = 0;
                break;
            }
        }
    }
}
function ajxHandleSystem(xmlData, rsp, rc) {
    if (rsp == 'GET' && rc == 0) {
        var val;
        if (EXISTTAG(xmlData, 'Config') == true) {
            val = GEBTN(xmlData, 'Model_Name', '');
            g_Info.modelName = val;
            val = GCEBTN(xmlData, 'Feature_Existence', 'Zone_2', '');
            if (val != g_NotExist) {
                g_Info.existZone2 = true;
            }
            val = GCEBTN(xmlData, 'Feature_Existence', 'Zone_3', '');
            if (val != g_NotExist) {
                g_Info.existZone3 = true;
            }
            val = GCEBTN(xmlData, 'Feature_Existence', 'Zone_4', '');
            if (val != g_NotExist) {
                g_Info.existZone4 = true;
            }
            val = GCEBTN(xmlData, 'Feature_Existence', 'Tuner', '');
            if (val != g_NotExist) {
                g_Info.m_existTuner = true;
            }
            val = GCEBTN(xmlData, 'Feature_Existence', 'HD_Radio', '');
            if (val != g_NotExist) {
                g_Info.m_existHD = true;
            }
            val = GCEBTN(xmlData, 'Feature_Existence', 'DAB', '');
            if (val != g_NotExist) {
                g_Info.m_existDAB = true;
            }
            gInit.fexistInfo = true;
        }
        if (EXISTTAG(xmlData, 'Power_Control') == true) {
            val = GEBTN(xmlData, 'Power', 'Standby');
            if (val == 'Standby' || val == 'On') {
                var pwrIdx = gPower2Idx[val];
                for (var i = 0; i < CSTzoneNumMax; i++) {
                    g_Info.m_info[i].m_OnOff = pwrIdx;
                }
            }
        }
        if (EXISTTAG(xmlData, 'Party_Mode') == true) {
            if (EXISTTAG(xmlData, 'Target_Zone') == true) {
                val = GCEBTN(xmlData, 'Target_Zone', 'Zone_2', '');
                if (val == 'Enable') {
                    g_Info.m_partyModeTargetZone2 = true;
                } else if (val == 'Disable') {
                    g_Info.m_partyModeTargetZone2 = false;
                }
                val = GCEBTN(xmlData, 'Target_Zone', 'Zone_3', '');
                if (val == 'Enable') {
                    g_Info.m_partyModeTargetZone3 = true;
                } else if (val == 'Disable') {
                    g_Info.m_partyModeTargetZone3 = false;
                }
                val = GCEBTN(xmlData, 'Target_Zone', 'Zone_4', '');
                if (val == 'Enable') {
                    g_Info.m_partyModeTargetZone4 = true;
                } else if (val == 'Disable') {
                    g_Info.m_partyModeTargetZone4 = false;
                }
            }
            val = GCEBTN(xmlData, 'Party_Mode', 'Mode', '');
            if (val == 'Off' || val == 'On') {
                var old_status = g_Info.m_partyMode;
                g_Info.m_partyMode = gOnOff2Idx[val];
                gInit.PartyMode = true;
                ajxDispStatusBar('Go Reload END');
                if (g_Info.m_partyMode != old_status) {}
            }
        }
        if (EXISTTAG(xmlData, 'MAC_Address_Filter') == true) {
            for (var i = 0; i < 10; i++) {
                var num = 'Number_' + (i + 1);
                val = GEBTN(xmlData, num, '000000000000');
                g_Info.m_macAddr[i] = val;
            }
        }
        if (EXISTTAG(xmlData, 'Network_Name') == true) {
            val = GEBTN(xmlData, 'Network_Name', '');
            DispNewFriendlyName(val, gInit.friendlynameinfo);
            gInit.friendlynameinfo = true;
        }
        if (EXISTTAG(xmlData, 'Network_Standby') == true) {
            val = GEBTN(xmlData, 'Network_Standby', 'Off');
            setNetworkStandby(val);
            gInit.networkstandbyinfo = true;
            g_heart_beat = 0;
        }
        if (EXISTTAG(xmlData, 'Network') == true) {
            if (EXISTTAG(xmlData, 'Parameters') == true) {
                val = GEBTN(xmlData, 'Connection', 'Wired LAN');
                if (val == 'Wireless LAN') {
                    g_Info.m_Connection = 'Wireless(Wi-Fi)';
                } else if (val == 'Wired LAN') {
                    g_Info.m_Connection = 'Wired';
                } else if ((val == 'Wireless Direct') || (val == 'Extend (1)') || (val == 'Extend (2)') || (val == 'Extend (3)')) {
                    g_Info.m_Connection = val;
                } else {
                    val = 'Unknown Network';
                    g_Info.m_Connection = val;
                }
                g_Info.m_ConnectionIdx = gNetworkConnectIdx[val];
                val = GCEBTN(xmlData, 'Wireless_LAN', 'SSID', '');
                g_Info.m_Wireless_SSID = val;
                val = GCEBTN(xmlData, 'Wireless_LAN', 'Security_Type', '');
                g_Info.m_Wireless_Security_Type = val;
                val = GCEBTN(xmlData, 'Wireless_LAN', 'Security_Key', '');
                g_Info.m_Wireless_Security_Key = val;
                val = GCEBTN(xmlData, 'Wireless_Direct', 'SSID', '');
                g_Info.m_Direct_SSID = val;
                val = GCEBTN(xmlData, 'Wireless_Direct', 'Security_Type', '');
                g_Info.m_Direct_Security_Type = val;
                val = GCEBTN(xmlData, 'Wireless_Direct', 'Security_Key', '');
                g_Info.m_Direct_Security_Key = val;
                val = GCEBTN(xmlData, 'Wired_or_Wireless', 'DHCP', '');
                g_Info.m_ipDHCP = val;
                val = GCEBTN(xmlData, 'Wired_or_Wireless', 'IP_Address', '');
                g_Info.m_ipIP_Address = val;
                val = GCEBTN(xmlData, 'Wired_or_Wireless', 'Subnet_Mask', '');
                g_Info.m_ipSubnet_Mask = val;
                val = GCEBTN(xmlData, 'Wired_or_Wireless', 'Default_Gateway', '');
                g_Info.m_ipDefault_Gateway = val;
                val = GCEBTN(xmlData, 'Wired_or_Wireless', 'DNS_Server_1', '');
                g_Info.m_ipDNS_Server_1 = val;
                val = GCEBTN(xmlData, 'Wired_or_Wireless', 'DNS_Server_2', '');
                g_Info.m_ipDNS_Server_2 = val;
                val = GCEBTN(xmlData, 'Wireless_Direct', 'DHCP_Server', '');
                g_Info.m_ipDHCP_Direct = val;
                val = GCEBTN(xmlData, 'Wireless_Direct', 'IP_Address', '');
                g_Info.m_ipIP_Address_Direct = val;
                val = GCEBTN(xmlData, 'Wireless_Direct', 'Subnet_Mask', '');
                g_Info.m_ipSubnet_Mask_Direct = val;
                val = GCEBTN(xmlData, 'Wireless_Direct', 'Default_Gateway', '');
                g_Info.m_ipDefault_Gateway_Direct = val;
                val = GCEBTN(xmlData, 'Wireless_Direct', 'DNS_Server_1', '');
                g_Info.m_ipDNS_Server_1_Direct = val;
                val = GCEBTN(xmlData, 'Wireless_Direct', 'DNS_Server_2', '');
                g_Info.m_ipDNS_Server_2_Direct = val;
            }
        }
        if (EXISTTAG(xmlData, 'Product_PIN') == true) {
            val = GEBTN(xmlData, 'Product_PIN', '');
            g_Info.m_AirPlay_Password_Direct = val.replace(/&amp;|&gt;|&lt;|&quot;|&apos;/g, unescapeForXML);
            gInit.AirPlayPasswordMode = true;
        }
        if (g_Zone == -1) {
            setTopMenuParameter();
        }
        return;
    }
    if (rsp == 'PUT') {
        if (EXISTTAG(xmlData, 'Party_Mode') == true && EXISTTAG(xmlData, 'Volume') == true) {
            for (var i = 0; i < g_Info.GetMaxZoneNum(); i++) {
                ajxGetBasicStatus(gZoneIdx2Name[i]);
            }
        } else if (EXISTTAG(xmlData, 'Network') == true && EXISTTAG(xmlData, 'Parameters') == true) {} else {
            ajxGetParam(xmlData);
        }
        if (rc != 0) {
            if (EXISTTAG(xmlData, 'Network') == true) {
                if (EXISTTAG(xmlData, 'Parameters') == true) {
                    g_Info.m_ConnectionFailure = true;
                }
            }
            if (EXISTTAG(xmlData, 'Product_PIN') == true) {
                g_Info.m_AirPlayPasswordFailuer = true;
            }
        }
    }
}
function ajxHandleRcvGetStatus(xmlData, zoneIdx) {
    var info = g_Info.m_info[zoneIdx];
    if (EXISTTAG(xmlData, 'Config') == true) {
        val = GEBTN(xmlData, 'Zone', '');
        info.m_zoneName = val;
        DispNewRenameOne(zoneIdx, val, gInit.zoneinfo[zoneIdx].name);
        gInit.zoneinfo[zoneIdx].name = true;
    }
    if (EXISTTAG(xmlData, 'Basic_Status') == true) {
        var val = GEBTN(xmlData, 'Power', 'Standby');
        if (val == 'Standby' || val == 'On') {
            info.m_OnOff = gPower2Idx[val];
        }
        val = GEBTN(xmlData, 'Sleep', 'Off');
        var Idx = gSleep2Idx[val];
        if (Idx != undefined) {
            info.m_sleep = Idx;
        }
        if (EXISTTAG(xmlData, 'Volume') == true) {
            val = GEBTN(xmlData, 'Val', '');
            var exp = GEBTN(xmlData, 'Exp', '');
            if (val != '' && exp != '') {
                info.m_volume = parseInt(val) / Math.pow(10, parseInt(exp));
            }
            val = GEBTN(xmlData, 'Output_Info', '');
            if (val == 'Fixed') {
                info.m_fixed = true;
            } else if (val == 'Variable') {
                info.m_fixed = false;
            }
        }
        val = GEBTN(xmlData, 'Mute', 'Off');
        if (val == "Off") {
            Idx = 0;
        } else {
            Idx = 1;
        }
        if (Idx != undefined) {
            info.m_mute = Idx;
        }
        val = GEBTN(xmlData, 'Input_Sel', '');
        Idx = gInput2IdxForAll[val];
        if (Idx != undefined) {
            info.m_input = Idx;
        }
        if (zoneIdx == 0) {
            var prg = GEBTN(xmlData, 'Sound_Program', '');
            var onoff = GEBTN(xmlData, g_StraightName, '');
            if (onoff == 'On') {
                prg = g_StraightName;
            }
            Idx = gPrg2IdxForAll[prg];
            if (Idx != undefined) {
                info.m_surround = Idx;
                setSelectSurround(info.m_surround);
            }
            var enh = GEBTN(xmlData, 'Enhancer', '');
            if (enh == 'On') {
                setSelectEnhancer(1);
            } else if (enh == 'Off') {
                setSelectEnhancer(0);
            } else {
                var inputsel = GEBTN(xmlData, 'Input_Sel', '');
                if (inputsel != '') {
                    timerAfterCmd("ajxGetSurr", 500);
                }
            }
        }
    }
    if (EXISTTAG(xmlData, 'Input_Sel_Item') == true) {
        var inputNameListLength = getInputNameList(zoneIdx).length;
        for (var i = 0; i < inputNameListLength; i++) {
            var item_name = gZoneISIIdx2Name[i];
            var input_name = "";
            if (EXISTTAG(xmlData, item_name) == true) {
                var val = GCEBTN(xmlData, item_name, 'Param', '');
                input_name = val;
            }
            getInputNameList(zoneIdx)[i] = input_name;
        }
        gInit.zoneinfo[zoneIdx].inputSelItem = true;
    }
}
function ajxGetSurr() {
    ajxSendXMLData(true, "GET", "Main_Zone", "Surround", "Program_Sel", "Current", "GetParam");
}
function EXISTTAG(xml, tag) {
    var Val = xml.getElementsByTagName(tag);
    var ret = false;
    if (Val.length) {
        ret = true;
    }
    return ret;
}
function GEBTN(xml, tag, def) {
    var Val = xml.getElementsByTagName(tag);
    var val = def;
    if (Val.length) {
        if (Val[0].firstChild) {
            val = Val[0].firstChild.nodeValue;
        }
    }
    return val;
}
function GCEBTN(xml, tag1, tag2, def) {
    var Tag1Val = xml.getElementsByTagName(tag1);
    var rval = def;
    for (var i = 0; i < Tag1Val.length; i++) {
        var len = Tag1Val[i].childNodes.length;
        for (var j = 0; j < len; j++) {
            if (Tag1Val[i].childNodes[j].nodeName == tag2) {
                if (Tag1Val[i].childNodes[j].firstChild == null) {
                    return rval;
                } else {
                    rval = Tag1Val[i].childNodes[j].firstChild.nodeValue;
                    return rval;
                }
            }
        }
    }
    return rval;
}
function ajxReloadHdradio() {
    ajxGetHdradioPlayInfo();
}
function ajxSetHdradioPresetTuningProc(cmd) {
    if (g_Info.m_infoHdradio.m_band == 0) {
        ajxSendXMLData(true, "PUT", 'HD_Radio', 'Play_Control', 'Tuning', 'Freq', 'AM', 'Val', cmd);
    } else {
        ajxSendXMLData(true, "PUT", 'HD_Radio', 'Play_Control', 'Tuning', 'Freq', 'FM', 'Val', cmd);
    }
}
function ajxSetHdradioStereoMono(cmd) {
    ajxSendXMLData(true, "PUT", 'HD_Radio', 'Play_Control', 'Audio_Mode', 'Current', cmd);
}
function ajxSetHdradioBand(cmd) {
    ajxSendXMLData(true, "PUT", 'HD_Radio', 'Play_Control', 'Tuning', 'Band', cmd);
}
function ajxGetHdradioPreset(index) {
    if (index < 1 || 40 < index) {
        return false;
    }
    ajxSendXMLData(true, "PUT", 'HD_Radio', 'Play_Control', 'Preset', 'Preset_Sel', index);
}
function ajxGetHdradioProgram(index) {
    var prg = 'HD' + parseInt(index + 1);
    ajxSendXMLData(true, "PUT", 'HD_Radio', 'Play_Control', 'Program_Number', prg);
}
function ajxGetHdradioPlayInfo() {
    ajxSendXMLData(true, "GET", 'HD_Radio', 'Play_Info', 'GetParam');
}
function ajxGetHdradioPresetData() {
    ajxSendXMLData(false, "GET", 'HD_Radio', 'Play_Control', 'Preset', 'Preset_Sel_Item', 'GetParam');
}
function ajxHandleHdradio(xmlData, rsp, rc) {
    var HdradioCmd = ["Play_Info", "Play_Control", "Config"];
    var cmdname = "";
    for (var i = 0; i < HdradioCmd.length; i++) {
        var cmd = xmlData.getElementsByTagName(HdradioCmd[i]);
        if (cmd.length == 1) {
            cmdname = HdradioCmd[i];
            break;
        }
    }
    switch (cmdname) {
    case "Play_Info":
        ajxHandleHdradioPlayInfo(xmlData, rsp);
        break;
    case "Play_Control":
        ajxHandleHdradioPlayControl(xmlData, rsp);
        break;
    case "Config":
        ajxHandleHdradioConfig(xmlData, rsp);
        break;
    default:
        break;
    }
}
function ajxHandleHdradioConfig(xmlData, rsp) {
    if (rsp == 'PUT') {
        return;
    }
    var val2 = GEBTN(xmlData, 'Feature_Availability', '');
    if (val2 != "") {
        g_Info.m_infoHdradio.m_Device = val2;
        gInit.devHdradio = true;
    }
}
function ajxHandleHdradioPlayControl(xmlData, rsp) {
    if (rsp == 'PUT') {
        timerAfterCmd("ajxReloadHdradio", 300);
        return;
    }
    var pcmd = ["Search_Mode", "Preset_Sel", "Preset_Sel_Item"];
    var cmdname = "";
    for (var i = 0; i < pcmd.length; i++) {
        var cmd = xmlData.getElementsByTagName(pcmd[i]);
        if (cmd.length == 1) {
            cmdname = pcmd[i];
            break;
        }
    }
    switch (cmdname) {
    case "Search_Mode":
        break;
    case "Preset_Sel":
        break;
    case "Preset_Sel_Item":
        ajxHandleTunerHdPlayControlData(xmlData, GetEleId("hdrselectch"));
        gInit.hdradioPreset = true;
        break;
    default:
        break;
    }
}
function ajxHandleHdradioPlayInfo(xmlData, rsp) {
    if (rsp == 'PUT') {
        return;
    }
    val = GEBTN(xmlData, 'Search_Mode', 'Tuning');
    if (val == 'Tuning') {
        g_Info.m_infoHdradio.m_radiopreset = -1;
    } else {
        g_Info.m_infoHdradio.m_radiopreset = ajxHandleTunerHdPlayControlPresetSel(xmlData, GetEleId("hdrselectch"));
    }
    val = GEBTN(xmlData, 'Band', 'FM');
    var a_band = {
        "AM": 0,
        "FM": 1
    };
    onSetHdBand(a_band[val]);
    var exp = GEBTN(xmlData, 'Exp', '1');
    val = GEBTN(xmlData, 'Val', '875');
    if ((isNaN(val) == true)) {
        g_Info.m_infoHdradio.m_frequency = val;
        g_Info.m_infoHdradio.m_unit = 2;
    } else {
        g_Info.m_infoHdradio.m_frequency = val / Math.pow(10, exp);
        val = GEBTN(xmlData, 'Unit', 'MHz');
        var a_unit = {
            "kHz": 0,
            "MHz": 1
        };
        g_Info.m_infoHdradio.m_unit = a_unit[val];
    }
    val = GEBTN(xmlData, 'Station', '');
    g_Info.m_infoHdradio.m_StationName = val;
    val = GEBTN(xmlData, 'Program_Number', '---');
    if (val.charAt(2) == "-") {
        g_Info.m_infoHdradio.m_program = -1;
    } else {
        g_Info.m_infoHdradio.m_program = parseInt(val.charAt(2)) - 1;
    }
    val = GEBTN(xmlData, 'Category', '');
    g_Info.m_infoHdradio.m_ProgramType = val;
    val = GEBTN(xmlData, 'Title', '');
    g_Info.m_infoHdradio.m_Title = val;
    val = GEBTN(xmlData, 'Artist', '');
    g_Info.m_infoHdradio.m_Artist = val;
    val = GEBTN(xmlData, 'Album', '');
    g_Info.m_infoHdradio.m_Comment = val;
    val = GCEBTN(xmlData, 'Audio_Mode', 'Current', '');
    if (val == 'Auto') {
        onSetHdStereoMono(0);
    } else if (val == 'Mono') {
        onSetHdStereoMono(1);
    }
    for (var I = 0; I < 8; I++) {
        val = GEBTN(xmlData, 'HD_' + (I + 1), '');
        if (val == 'Available') {
            g_Info.m_infoHdradio.m_ProgValid[I] = true;
        } else {
            g_Info.m_infoHdradio.m_ProgValid[I] = false;
        }
    }
    onSetHdradioInfo();
}
function ajxReloadDab() {
    ajxGetDabPlayInfo();
}
function ajxSetDabPresetTuningProc(cmd) {
    if (g_Info.m_infoDab.m_band == 0) {
        ajxSendXMLData(true, "PUT", 'DAB', 'Play_Control', 'FM', 'Tuning', 'Freq', 'Val', cmd);
    } else {
        var dabCmd = 'Skip Rev';
        if (cmd == 'Auto_Down') {
            dabCmd = 'Skip Fwd';
        }
        ajxSendXMLData(true, "PUT", 'DAB', 'Play_Control', 'DAB', 'Service', dabCmd);
    }
}
function ajxSetDabBand(cmd) {
    ajxSendXMLData(true, "PUT", 'DAB', 'Play_Control', 'Band', cmd);
}
function ajxSetDabStereoMono(cmd) {
    ajxSendXMLData(true, "PUT", 'DAB', 'Play_Control', 'FM', 'FM_Mode', cmd);
}
function ajxSetDabPreset(index) {
    if (index < 1 || 40 < index) {
        return false;
    }
    if (g_Info.m_infoDab.m_band == 0) {
        ajxSendXMLData(true, "PUT", 'DAB', 'Play_Control', 'FM', 'Preset', 'Preset_Sel', index);
    } else {
        ajxSendXMLData(true, "PUT", 'DAB', 'Play_Control', 'DAB', 'Preset', 'Preset_Sel', index);
    }
}
function ajxGetDabPlayInfo() {
    ajxSendXMLData(true, "GET", 'DAB', 'Play_Info', 'GetParam');
}
function ajxGetDabFmPresetData() {
    ajxSendXMLData(false, "GET", 'DAB', 'Play_Control', 'FM', 'Preset', 'Preset_Sel_Item', 'GetParam');
}
function ajxGetDabPresetData() {
    ajxSendXMLData(false, "GET", 'DAB', 'Play_Control', 'DAB', 'Preset', 'Preset_Sel_Item', 'GetParam');
}
function ajxSetDabTunerFreq(freq) {
    var val = new Array;
    val[0] = 0;
    val[1] = freq * 100;
    val[1] = Math.round(val[1]);
    val[2] = 2;
    var httpObj = ajxCreateXMLHttpRequest(ajxRecvData, true);
    var xml = ajxCreateXMLObject();
    if (httpObj && xml && val[0] == 0) {
        var top = xml.createElement("YAMAHA_AV");
        xml.appendChild(top);
        top.setAttribute("cmd", "PUT");
        var e1 = xml.createElement("DAB");
        var e2 = xml.createElement("Play_Control");
        var e3 = xml.createElement("FM");
        var e4 = xml.createElement("Tuning");
        var e5 = xml.createElement("Freq");
        var e61 = xml.createElement("Val");
        var e62 = xml.createElement("Exp");
        var e63 = xml.createElement("Unit");
        top.appendChild(e1);
        e1.appendChild(e2);
        e2.appendChild(e3);
        e3.appendChild(e4);
        e4.appendChild(e5);
        e5.appendChild(e61);
        e5.appendChild(e62);
        e5.appendChild(e63);
        e61.appendChild(xml.createTextNode(val[1]));
        e62.appendChild(xml.createTextNode('2'));
        e63.appendChild(xml.createTextNode('MHz'));
        ajxSendData(httpObj, xml);
    }
}
function ajxHandleDab(xmlData, rsp, rc) {
    var DabCmd = ["Play_Info", "Play_Control", "Config"];
    var cmdname = "";
    for (var i = 0; i < DabCmd.length; i++) {
        var cmd = xmlData.getElementsByTagName(DabCmd[i]);
        if (cmd.length == 1) {
            cmdname = DabCmd[i];
            break;
        }
    }
    switch (cmdname) {
    case "Play_Info":
        ajxHandleDabPlayInfo(xmlData, rsp);
        break;
    case "Play_Control":
        ajxHandleDabPlayControl(xmlData, rsp);
        break;
    case "Config":
        ajxHandleDabConfig(xmlData, rsp);
        break;
    default:
        break;
    }
}
function ajxHandleDabPlayInfo(xmlData, rsp) {
    if (rsp == 'PUT') {
        return;
    }
    var val = GEBTN(xmlData, 'Band', 'FM');
    var a_band = {
        "FM": 0,
        "DAB": 1
    };
    onSetDabBand(a_band[val]);
    var infofm = xmlData.getElementsByTagName('FM');
    var fmnode;
    if (infofm[0].firstChild) {
        fmnode = infofm.item(0).cloneNode(true);
    }
    var infodab = xmlData.getElementsByTagName('DAB');
    var dabnode;
    if (infodab.length >= 2 && infodab[1].firstChild) {
        dabnode = infodab.item(1).cloneNode(true);
    }
    var a_fmMode = {
        "Auto": 0,
        "Mono": 1
    };
    val = GEBTN(fmnode, 'FM_Mode', '');
    g_Info.m_infoDab.m_fmMode = a_fmMode[val];
    var a_audioMode = {
        "Mono": 0,
        "Stereo": 1
    };
    val = GEBTN(dabnode, 'Audio_Mode', '');
    g_Info.m_infoDab.m_audioMode = a_audioMode[val];
    if (g_Info.m_infoDab.m_band == 0) {
        onSetDabStereoMono(g_Info.m_infoDab.m_fmMode);
    } else {
        onSetDabStereoMono(g_Info.m_infoDab.m_audioMode);
    }
    var fmval = GEBTN(fmnode, 'Val', '875');
    var fmexp = GEBTN(fmnode, 'Exp', '2');
    var fmunit = GEBTN(fmnode, 'Unit', 'MHz');
    if (isNaN(fmval) == true) {
        g_Info.m_infoDab.m_fmFrequency = fmval;
        g_Info.m_infoDab.m_fmUnit = "";
    } else {
        g_Info.m_infoDab.m_fmFrequency = fmval / Math.pow(10, fmexp);
        g_Info.m_infoDab.m_fmUnit = fmunit;
    }
    g_Info.m_infoDab.m_radiopreset = -1;
    g_Info.m_infoDab.m_dabMessage = "";
    g_Info.m_infoDab.m_dabFMLabelTxt = "";
    g_Info.m_infoDab.m_dabChLabellbl = "";
    g_Info.m_infoDab.m_dabServiceLabellbl = "";
    g_Info.m_infoDab.m_dabDlslbl = "";
    g_Info.m_infoDab.m_dabEnsembleLabellbl = "";
    g_Info.m_infoDab.m_dabProgramTypelbl = "";
    g_Info.m_infoDab.m_dabDabTxt = "";
    g_Info.m_infoDab.m_dabChLabelTxt = "";
    g_Info.m_infoDab.m_dabServiceLabelTxt = "";
    g_Info.m_infoDab.m_dabDlsTxt = "";
    g_Info.m_infoDab.m_dabEnsembleLabelTxt = "";
    g_Info.m_infoDab.m_dabProgramTypeTxt = "";
    g_Info.m_infoDab.m_dabNowTuneAID = 0;
    if (g_Info.m_infoDab.m_band == 0) {
        if (g_Info.destination != "A") {
            g_Info.m_infoDab.m_dabDabTxt = "Program Service";
            g_Info.m_infoDab.m_dabChLabellbl = "Program Type";
            g_Info.m_infoDab.m_dabServiceLabellbl = "Radio Text";
            g_Info.m_infoDab.m_dabDlslbl = "Clock Time";
            g_Info.m_infoDab.m_dabFMLabelTxt = GEBTN(fmnode, 'Program_Service', '');
            g_Info.m_infoDab.m_dabChLabelTxt = GEBTN(fmnode, 'Program_Type', '');
            g_Info.m_infoDab.m_dabServiceLabelTxt = GEBTN(fmnode, 'Radio_Text', '');
            g_Info.m_infoDab.m_dabDlsTxt = GEBTN(fmnode, 'Clock_Time', '');
        }
    } else {
        var dabState = GEBTN(dabnode, 'Status', '');
        switch (dabState) {
        case "Not Ready":
        case "Initial Scan":
            g_Info.m_infoDab.m_dabMessage = "Init Scan is not implemented.";
            break;
        case "Tune Aid":
            g_Info.m_infoDab.m_dabMessage = "Tune AID is performed.";
            g_Info.m_infoDab.m_dabNowTuneAID = 1;
            break;
        case "Ready":
            var dabText = "DAB";
            g_Info.m_infoDab.m_dabDabTxt = "DAB";
            if (GEBTN(dabnode, 'DAB_PLUS', '') == "Assert") {
                dabText = dabText + " +";
            }
            if (GEBTN(dabnode, 'Category', '') == "Secondary") {
                dabText = dabText + " 2";
            }
            g_Info.m_infoDab.m_dabDabTxt = dabText;
            if (GEBTN(dabnode, 'Off_Air', '') == "Assert") {
                g_Info.m_infoDab.m_dabChLabellbl = "Off Air";
            } else {
                g_Info.m_infoDab.m_dabChLabellbl = "CH Label / Freq.";
                g_Info.m_infoDab.m_dabServiceLabellbl = "Service Label";
                g_Info.m_infoDab.m_dabDlslbl = "DLS";
                g_Info.m_infoDab.m_dabEnsembleLabellbl = "Ensemble Label";
                g_Info.m_infoDab.m_dabProgramTypelbl = "Program Type";
                var dabval = GCEBTN(dabnode, 'Freq', 'Val', '1740');
                var dabexp = GCEBTN(dabnode, 'Freq', 'Exp', '3');
                var dabunit = GCEBTN(dabnode, 'Freq', 'Unit', 'MHz');
                if (isNaN(dabval) == true) {
                    g_Info.m_infoDab.m_dabChLabelTxt = GEBTN(dabnode, 'Ch_Label', '') + ' / ' + dabval;
                } else {
                    g_Info.m_infoDab.m_dabChLabelTxt = GEBTN(dabnode, 'Ch_Label', '') + ' / ' + (dabval / Math.pow(10, dabexp)) + ' ' + dabunit;
                }
                g_Info.m_infoDab.m_dabServiceLabelTxt = GEBTN(dabnode, 'Service_Label', '');
                g_Info.m_infoDab.m_dabDlsTxt = GEBTN(dabnode, 'DLS', '');
                g_Info.m_infoDab.m_dabEnsembleLabelTxt = GEBTN(dabnode, 'Ensemble_Label', '');
                g_Info.m_infoDab.m_dabProgramTypeTxt = GEBTN(dabnode, 'Program_Type', '');
            }
            break;
        default:
            break;
        }
    }
    onSetDabInfo();
}
function ajxHandleDabPlayControl(xmlData, rsp) {
    if (rsp == 'PUT') {
        timerAfterCmd("ajxReloadDab", 300);
        return;
    }
    if (EXISTTAG(xmlData, 'FM') == true) {
        ajxHandleDabPlayControlPresetSelItem(xmlData, GetEleId("dabfmpresetselect"), false);
        gInit.dabPreset = true;
    } else if (EXISTTAG(xmlData, 'DAB') == true) {
        ajxHandleDabPlayControlPresetSelItem(xmlData, GetEleId("dabpresetselect"), true);
        gInit.dabPreset = true;
    }
}
function ajxHandleDabPlayControlPresetSelItem(xmlData, objPreset, dabFlag) {
    if (EXISTTAG(xmlData, 'Preset_Sel_Item') == true) {
        for (var i = 1; i <= 41; i++) {
            var itemroot = xmlData.getElementsByTagName('Item_' + i);
            if (itemroot.length) {
                if (itemroot[0].firstChild) {
                    var itemnode = itemroot.item(0).cloneNode(true);
                    var stat = GEBTN(itemnode, 'Param', 'No Preset');
                    if (stat != "No Preset") {
                        var optionText = "";
                        if (dabFlag == true) {
                            optionText = stat;
                        } else {
                            optionText = GEBTN(itemnode, 'Title', '---');
                        }
                        var option = document.createElement('option');
                        option.setAttribute('value', stat);
                        option.innerHTML = optionText;
                        objPreset.appendChild(option);
                    }
                }
            }
        }
    }
}
function ajxHandleDabConfig(xmlData, rsp) {
    if (rsp == 'PUT') {
        return;
    }
    var val2 = GEBTN(xmlData, 'Feature_Availability', '');
    if (val2 != "") {
        g_Info.m_infoDab.m_Device = val2;
        gInit.devDab = true;
    }
}
var iPodModeTimer = null;
var iPodModeCont = 0;
function ajxReloadIpod() {
    ajxGetIpodListInfo();
    timerAfterCmd("ajxGetIpodPlayInfo", 100);
}
function ajxGetIpodUnitName() {
    var IpodUnit = 'iPod_USB';
    return IpodUnit;
}
function ajxSetIpodPlayback(cmd) {
    var unitName = ajxGetIpodUnitName();
    ajxSendXMLData(true, "PUT", unitName, 'Play_Control', 'Playback', cmd);
}
function ajxSetIpodRepeat(mode) {
    var unitName = ajxGetIpodUnitName();
    ajxSendXMLData(true, "PUT", unitName, 'Play_Control', 'Play_Mode', 'Repeat', mode);
}
function ajxSetIpodDSel(line) {
    var unitName = ajxGetIpodUnitName();
    ajxSendXMLData(true, "PUT", unitName, 'List_Control', 'Direct_Sel', line);
}
function ajxGetIpodRepeat() {
    var unitName = ajxGetIpodUnitName();
    ajxSendXMLData(true, "GET", unitName, 'Play_Control', 'Play_Mode', 'Repeat', 'GetParam');
}
function ajxSetIpodShuffle(mode) {
    var unitName = ajxGetIpodUnitName();
    ajxSendXMLData(true, "PUT", unitName, 'Play_Control', 'Play_Mode', 'Shuffle', mode);
}
function ajxGetIpodShuffle() {
    var unitName = ajxGetIpodUnitName();
    ajxSendXMLData(true, "GET", unitName, 'Play_Control', 'Play_Mode', 'Shuffle', 'GetParam');
}
function ajxSetIpodButton(cmd) {
    var unitName = ajxGetIpodUnitName();
    ajxSendXMLData(true, "PUT", unitName, 'List_Control', 'Cursor', cmd);
}
function ajxGetIpodListInfo() {
    var unitName = ajxGetIpodUnitName();
    ajxSendXMLData(true, "GET", unitName, 'List_Info', 'GetParam');
}
function ajxGetIpodPlayInfo() {
    var unitName = ajxGetIpodUnitName();
    ajxSendXMLData(true, "GET", unitName, 'Play_Info', 'GetParam');
}
function ajxGetIpodMode(sync) {
    var unitName = ajxGetIpodUnitName();
    ajxSendXMLData(sync, "GET", unitName, 'Play_Control', 'iPod_Mode', 'GetParam');
}
function ajxSetIpodMode(cmd) {
    var unitName = ajxGetIpodUnitName();
    ajxSendXMLData(true, "PUT", unitName, 'Play_Control', 'iPod_Mode', cmd);
}
function ajxSetIpodPageUpDown(cmd) {
    var unitName = ajxGetIpodUnitName();
    ajxSendXMLData(true, "PUT", unitName, 'List_Control', 'Page', cmd);
}
function ajxHandleIpod(xmlData, rsp, rc) {
    var ipodCmd = ["Play_Info", "Play_Control", "List_Control", "List_Info", "Config"];
    var cmdname = "";
    for (var i = 0; i < ipodCmd.length; i++) {
        var cmd = xmlData.getElementsByTagName(ipodCmd[i]);
        if (cmd.length == 1) {
            cmdname = ipodCmd[i];
            break;
        }
    }
    switch (cmdname) {
    case "Play_Info":
        ajxHandleIpodPlayInfo(xmlData, rsp);
        break;
    case "Play_Control":
        ajxHandleIpodPlayControl(xmlData, rsp);
        break;
    case "List_Control":
        ajxHandleIpodListControl(xmlData, rsp);
        break;
    case "List_Info":
        ajxHandleIpodList_Info(xmlData);
        break;
    case "Config":
        ajxHandleIpodConfig(xmlData, rsp);
        break;
    }
}
function ajxHandleIpodListControl(xmlData, rsp) {
    timerAfterCmd("ajxGetIpodListInfo", 700);
    timerAfterCmd("ajxGetIpodListInfo", 1400);
    ajxIpodActionReload(2000);
}
function ajxIpodActionReload(timebase) {
    timerAfterCmd("ajxGetIpodPlayInfo", timebase);
}
function ajxHandleIpodConfig(xmlData, rsp) {
    if (rsp == 'PUT') {
        return;
    }
    var val = GEBTN(xmlData, 'Feature_Availability', '');
    if (val != '') {
        g_Info.m_infoiPod.m_Device = val;
        gInit.devIpod = true;
    }
}
function ajxHandleIpodPlayControl(xmlData, rsp) {
    var playCmd = ["iPod_Mode", "Repeat", "Shuffle", "Playback"];
    var cmdname = "";
    for (var i = 0; i < playCmd.length; i++) {
        var cmd = xmlData.getElementsByTagName(playCmd[i]);
        if (cmd.length == 1) {
            cmdname = playCmd[i];
            break;
        }
    }
    switch (cmdname) {
    case "Playback":
        if (rsp == 'PUT') {
            ajxIpodActionReload(2000);
        }
        break;
    case "Repeat":
        ajxHandleIpodRepeat(xmlData, rsp);
        break;
    case "Shuffle":
        ajxHandleIpodShuffle(xmlData, rsp);
        break;
    case "iPod_Mode":
        ajxHandleIpodControl(xmlData, rsp);
        break;
    }
}
function ajxHandleIpodControl(xmlData, rsp) {
    if (rsp == 'PUT') {
        ajxGetIpodMode(true);
        return;
    }
    var val = GEBTN(xmlData, 'iPod_Mode', '');
    if (val == 'Normal' || val == 'Extended') {
        var modeIdx = {
            "Normal": 0,
            "Extended": 1
        };
        g_Info.m_infoiPod.m_Control = val;
        onSetIpodMode(modeIdx[val]);
        gInit.ipodMode = true;
    }
}
function ajxHandleIpodPlayInfo(xmlData, rsp) {
    if (rsp == 'PUT') {
        return;
    }
    var val = GEBTN(xmlData, 'Playback_Info', 'Stop');
    g_Info.m_infoiPod.m_Status = val;
    val = GEBTN(xmlData, 'Artist', '');
    g_Info.m_infoiPod.m_Artist = val;
    val = GEBTN(xmlData, 'Album', '');
    g_Info.m_infoiPod.m_Album = val;
    val = GEBTN(xmlData, 'Song', '');
    g_Info.m_infoiPod.m_Song = val;
    ajxHandleIpodRepeat(xmlData, rsp)
    ajxHandleIpodShuffle(xmlData, rsp)
    ajxHandleIpodControl(xmlData, rsp)
    onSetiPodPlayInfo();
}
function ajxHandleIpodRepeat(xmlData, rsp) {
    if (rsp == 'PUT') {
        timerAfterCmd("ajxGetIpodRepeat", 2000);
        return;
    }
    var Repeat2Idx = {
        "Off": 0,
        "All": 1,
        "One": 2
    };
    var val = GEBTN(xmlData, 'Repeat', 'Off');
    onSetiPodRepeat(Repeat2Idx[val]);
}
function ajxHandleIpodShuffle(xmlData, rsp) {
    if (rsp == 'PUT') {
        timerAfterCmd("ajxGetIpodShuffle", 2000);
        return;
    }
    var Shuffle2Idx = {
        "Off": 0,
        "Songs": 1,
        "Albums": 2
    };
    var val = GEBTN(xmlData, 'Shuffle', 'Off');
    onSetiPodShuffle(Shuffle2Idx[val]);
}
function ajxHandleIpodList_Info(xmlData) {
    var val = GEBTN(xmlData, 'Menu_Name', '');
    g_Info.m_infoiPod.m_MenuName = val;
    val = parseInt(GEBTN(xmlData, 'Max_Line', '1'));
    var Max_Line = xmlData.getElementsByTagName("Max_Line");
    var page = parseInt((val + 7) / 8);
    val = parseInt(GEBTN(xmlData, 'Current_Line', '1'));
    var curpage = parseInt((val + 7) / 8);
    var pos = pos = val - (curpage - 1) * 8;
    g_Info.m_infoiPod.m_Pos = pos;
    g_Info.m_infoiPod.m_Page = 'PAGE ' + curpage + ' / ' + page;
    var linetxt = new Array;
    var txt = xmlData.getElementsByTagName("Txt");
    var linecont = new Array;
    var aCont = xmlData.getElementsByTagName("Attribute");
    for (var i = 0; i < 8; i++) {
        linetxt[i] = "";
        if (txt[i].parentNode.tagName == ("Line_" + (i + 1))) {
            if (txt[i].firstChild) {
                linetxt[i] = txt[i].firstChild.nodeValue;
            }
        }
        if (aCont[i].parentNode.tagName == ("Line_" + (i + 1))) {
            if (aCont[i].firstChild) {
                linecont[i] = aCont[i].firstChild.nodeValue;
            }
        }
    }
    g_Info.m_infoiPod.m_Line1 = linetxt[0];
    g_Info.m_infoiPod.m_Line2 = linetxt[1];
    g_Info.m_infoiPod.m_Line3 = linetxt[2];
    g_Info.m_infoiPod.m_Line4 = linetxt[3];
    g_Info.m_infoiPod.m_Line5 = linetxt[4];
    g_Info.m_infoiPod.m_Line6 = linetxt[5];
    g_Info.m_infoiPod.m_Line7 = linetxt[6];
    g_Info.m_infoiPod.m_Line8 = linetxt[7];
    g_Info.m_infoiPod.m_Container1 = linecont[0];
    g_Info.m_infoiPod.m_Container2 = linecont[1];
    g_Info.m_infoiPod.m_Container3 = linecont[2];
    g_Info.m_infoiPod.m_Container4 = linecont[3];
    g_Info.m_infoiPod.m_Container5 = linecont[4];
    g_Info.m_infoiPod.m_Container6 = linecont[5];
    g_Info.m_infoiPod.m_Container7 = linecont[6];
    g_Info.m_infoiPod.m_Container8 = linecont[7];
    onSetiPodOsdInfo();
}
function ajxGetNetusbUnitName() {
    var NetworkUnit = 'NET_RADIO';
    var InputName = g_inputName[g_Info.m_info[g_Zone].m_input];
    switch (InputName) {
    case "SERVER":
        NetworkUnit = 'SERVER';
        break;
    case "NET RADIO":
        NetworkUnit = 'NET_RADIO';
        break;
    case "USB":
        NetworkUnit = 'USB';
        break;
    case "SiriusXM":
        NetworkUnit = 'SiriusXM';
        break;
    case "Rhapsody":
        NetworkUnit = 'Rhapsody';
        break;
    case "Napster":
        NetworkUnit = 'Napster';
        break;
    case "Pandora":
        NetworkUnit = 'Pandora';
        break;
    case "AirPlay":
        NetworkUnit = 'AirPlay';
        break;
    case "Spotify":
        NetworkUnit = 'Spotify';
        break;
    case "JUKE":
        NetworkUnit = 'JUKE';
        break;
    case "Bluetooth":
        NetworkUnit = 'Bluetooth';
        break;
    case "MusicCast Link":
        NetworkUnit = 'MusicCast_Link';
        break;
    default:
        break;
    }
    return NetworkUnit;
}
function ajxReloadNetusb() {
    ajxGetNetusbListInfo();
    timerAfterCmd("ajxGetNetusbPlayInfo", 100);
}
function ajxSetNetusbPlayback(cmd) {
    var unitName = ajxGetNetusbUnitName();
    ajxSendXMLData(true, "PUT", unitName, 'Play_Control', 'Playback', cmd);
}
function ajxSetNetusbRepeat(mode) {
    var unitName = ajxGetNetusbUnitName();
    ajxSendXMLData(true, "PUT", unitName, 'Play_Control', 'Play_Mode', 'Repeat', mode);
}
function ajxSetNetUsbDSel(line) {
    var unitName = ajxGetNetusbUnitName();
    ajxSendXMLData(true, "PUT", unitName, 'List_Control', 'Direct_Sel', line);
}
function ajxGetNetusbFeedback() {
    var unitName = ajxGetNetusbUnitName();
    ajxSendXMLData(true, "GET", unitName, 'Play_Control', 'Feedback', 'GetParam');
}
function ajxGetNetusbRepeat() {
    var unitName = ajxGetNetusbUnitName();
    ajxSendXMLData(true, "GET", unitName, 'Play_Control', 'Play_Mode', 'Repeat', 'GetParam');
}
function ajxSetNetusbShuffle(mode) {
    var unitName = ajxGetNetusbUnitName();
    ajxSendXMLData(true, "PUT", unitName, 'Play_Control', 'Play_Mode', 'Shuffle', mode);
}
function ajxGetNetusbShuffle() {
    var unitName = ajxGetNetusbUnitName();
    ajxSendXMLData(true, "GET", unitName, 'Play_Control', 'Play_Mode', 'Shuffle', 'GetParam');
}
function ajxSetNetusbButton(cmd) {
    var unitName = ajxGetNetusbUnitName();
    ajxSendXMLData(true, "PUT", unitName, 'List_Control', 'Cursor', cmd);
}
function ajxSetNetusbPreset(presetNo) {
    var unitName = ajxGetNetusbUnitName();
    if ((presetNo >= 1) && (presetNo <= 40)) {
        ajxSendXMLData(true, "PUT", unitName, 'Play_Control', 'Preset', 'Preset_Sel', presetNo);
    }
}
function ajxGetNetusbPreset() {
    ajxSendXMLData(false, "GET", 'USB', 'Play_Control', 'Preset', 'Preset_Sel_Item', 'GetParam');
    gInit.netusbPreset = true;
}
function ajxGetNetusbListInfo() {
    var unitName = ajxGetNetusbUnitName();
    switch (unitName) {
    case "AirPlay":
    case "Spotify":
    case "Bluetooth":
    case "MusicCast_Link":
        break;
    default:
        ajxSendXMLData(true, "GET", unitName, 'List_Info', 'GetParam');
        break;
    }
}
function ajxGetNetusbPlayInfo() {
    var unitName = ajxGetNetusbUnitName();
    ajxSendXMLData(true, "GET", unitName, 'Play_Info', 'GetParam');
}
function ajxSetNetusbPageUpDown(cmd) {
    var unitName = ajxGetNetusbUnitName();
    ajxSendXMLData(true, "PUT", unitName, 'List_Control', 'Page', cmd);
}
function ajxSetNetThumbUpDown(cmd) {
    var unitName = ajxGetNetusbUnitName();
    ajxSendXMLData(true, "PUT", unitName, 'Play_Control', 'Feedback', cmd);
}
function ajxSetNetworkStandby(cmd) {
    ajxSendXMLData(true, "PUT", 'System', 'Misc', 'Network', 'Network_Standby', cmd);
}
function ajxGetNetworkStandby() {
    ajxSendXMLData(true, "GET", 'System', 'Misc', 'Network', 'Network_Standby', 'GetParam');
}
function ajxHandleNetusb(xmlData, rsp, rc) {
    var netusbCmd = ["Play_Info", "List_Info", "Play_Control", "List_Control", "Config"];
    var cmdname = "";
    for (var i = 0; i < netusbCmd.length; i++) {
        var cmd = xmlData.getElementsByTagName(netusbCmd[i]);
        if (cmd.length == 1) {
            cmdname = netusbCmd[i];
            break;
        }
    }
    switch (cmdname) {
    case "Play_Info":
        ajxHandleNetusbPlayInfo(xmlData, rsp);
        break;
    case "List_Info":
        ajxHandleNetusbList_Info(xmlData);
        break;
    case "Play_Control":
        ajxHandleNetusbPlayControl(xmlData, rsp);
        break;
    case "List_Control":
        ajxHandleNetusbListControl(xmlData, rsp);
        break;
    }
}
function ajxHandleNetusbPlayControl(xmlData, rsp) {
    var pcmd = ["Playback", "Preset", "Repeat", "Shuffle", "Feedback"];
    var cmdname = "";
    for (var i = 0; i < pcmd.length; i++) {
        var cmd = xmlData.getElementsByTagName(pcmd[i]);
        if (cmd.length == 1) {
            cmdname = pcmd[i];
            break;
        }
    }
    switch (cmdname) {
    case "Playback":
    case "Preset":
        ajxHandleNetusbPreset(xmlData, rsp);
        break;
    case "Repeat":
        ajxHandleNetusbRepeat(xmlData, rsp);
        break;
    case "Shuffle":
        ajxHandleNetusbShuffle(xmlData, rsp);
        break;
    case "Feedback":
        ajxHandleNetusbFeedback(xmlData, rsp);
        break;
    }
}
function ajxHandleNetusbListControl(xmlData, rsp) {
    timerAfterCmd("ajxGetNetusbListInfo", 700);
    timerAfterCmd("ajxGetNetusbListInfo", 1400);
    ajxNetusbActionReload(2000);
}
function ajxNetusbActionReload(timebase) {
    timerAfterCmd("ajxGetNetusbPlayInfo", timebase);
    timerAfterCmd("ajxGetNetusbPlayInfo", timebase + 1500);
}
function ajxHandleNetusbPlayInfo(xmlData, rsp) {
    if (rsp == 'PUT') {
        return;
    }
    var val = GEBTN(xmlData, 'Playback_Info', 'Stop');
    g_Info.m_infoNetwork.m_Status = val;
    val = GEBTN(xmlData, 'Artist', '');
    g_Info.m_infoNetwork.m_Artist = val;
    val = GEBTN(xmlData, 'Album', '');
    g_Info.m_infoNetwork.m_Album = val;
    val = GEBTN(xmlData, 'Song', '');
    if (val != "") {
        g_Info.m_infoNetwork.m_Song = val;
    } else {
        val = GEBTN(xmlData, 'Title', '');
        if (val != "") {
            g_Info.m_infoNetwork.m_Song = val;
        } else {
            val = GEBTN(xmlData, 'Track', '');
            g_Info.m_infoNetwork.m_Song = val;
        }
    }
    val = GEBTN(xmlData, 'Station', '');
    g_Info.m_infoNetwork.m_Station = val;
    val = GEBTN(xmlData, 'Ch_Name', '');
    g_Info.m_infoNetwork.m_Ch = val;
    ajxHandleNetusbRepeat(xmlData, rsp);
    ajxHandleNetusbShuffle(xmlData, rsp);
    ajxHandleNetusbFeedback(xmlData, rsp);
    onSetNetPlayInfo();
}
function ajxHandleNetusbFeedback(xmlData, rsp) {
    if (rsp == 'PUT') {
        ajxGetNetusbFeedback();
        return;
    }
    if (EXISTTAG(xmlData, 'Feedback') == true) {
        var val = GEBTN(xmlData, 'Feedback', '---');
        if (val == 'Thumb Up') {
            onSetNetThumbUpDown('Up');
        } else if (val == 'Thumb Down') {
            onSetNetThumbUpDown('Down');
        } else {
            onSetNetThumbUpDown('None');
        }
    }
}
function ajxHandleNetusbRepeat(xmlData, rsp) {
    if (rsp == 'PUT') {
        ajxGetNetusbRepeat();
        return;
    }
    var Repeat2Idx = {
        "Off": 0,
        "All": 1,
        "One": 2
    };
    var val = GEBTN(xmlData, 'Repeat', 'Off');
    onSetNetRepeat(Repeat2Idx[val]);
}
gNetusbShuffle2Idx = {
    "Off": 0,
    "On": 1
};
function ajxHandleNetusbShuffle(xmlData, rsp) {
    if (rsp == 'PUT') {
        ajxGetNetusbShuffle();
        return;
    }
    var val = GEBTN(xmlData, 'Shuffle', 'Off');
    onSetNetShuffle(gNetusbShuffle2Idx[val]);
}
function ajxHandleNetusbPreset(xmlData, rsp) {
    if (rsp == 'PUT') {
        timerAfterCmdWithParam("ajxGetBasicStatus('" + gZoneIdx2Name[g_Zone] + "')", 1000);
        return;
    }
    var objPreset = GetEleId("selectnetpresetsel");
    if (EXISTTAG(xmlData, 'Preset_Sel_Item') == true) {
        for (var i = 1; i <= 40; i++) {
            var itemroot = xmlData.getElementsByTagName('Item_' + i);
            if (itemroot.length) {
                if (itemroot[0].firstChild) {
                    var itemNode = itemroot.item(0).cloneNode(true);
                    var param = GEBTN(itemNode, 'Param', 'Empty');
                    var optionText = GEBTN(itemNode, 'Title', 'Empty');
                    if ((param != 'Empty')) {
                        if (optionText != optionText.substr(0, 40)) {
                            optionText = optionText.substr(0, 40) + "...";
                        }
                        var option = document.createElement('option');
                        option.setAttribute('value', param);
                        option.innerHTML = optionText;
                        objPreset.appendChild(option);
                    }
                }
            }
        }
    }
}
function ajxHandleNetusbList_Info(xmlData) {
    var val = GEBTN(xmlData, 'Menu_Name', '');
    g_Info.m_infoNetwork.m_MenuName = val;
    val = parseInt(GEBTN(xmlData, 'Max_Line', '1'));
    var page = parseInt((val + 7) / 8);
    val = parseInt(GEBTN(xmlData, 'Current_Line', '1'));
    var curpage = parseInt((val + 7) / 8);
    var pos = val - (curpage - 1) * 8;
    g_Info.m_infoNetwork.m_Pos = pos;
    g_Info.m_infoNetwork.m_Page = 'PAGE ' + curpage + ' / ' + page;
    var linetxt = new Array;
    var txt = xmlData.getElementsByTagName("Txt");
    var linecont = new Array;
    var aCont = xmlData.getElementsByTagName("Attribute");
    for (var i = 0; i < 8; i++) {
        linetxt[i] = "";
        if (txt[i].parentNode.tagName == ("Line_" + (i + 1))) {
            if (txt[i].firstChild) {
                linetxt[i] = txt[i].firstChild.nodeValue;
            }
        }
        if (aCont[i].parentNode.tagName == ("Line_" + (i + 1))) {
            if (aCont[i].firstChild) {
                linecont[i] = aCont[i].firstChild.nodeValue;
            }
        }
    }
    g_Info.m_infoNetwork.m_Line1 = linetxt[0];
    g_Info.m_infoNetwork.m_Line2 = linetxt[1];
    g_Info.m_infoNetwork.m_Line3 = linetxt[2];
    g_Info.m_infoNetwork.m_Line4 = linetxt[3];
    g_Info.m_infoNetwork.m_Line5 = linetxt[4];
    g_Info.m_infoNetwork.m_Line6 = linetxt[5];
    g_Info.m_infoNetwork.m_Line7 = linetxt[6];
    g_Info.m_infoNetwork.m_Line8 = linetxt[7];
    g_Info.m_infoNetwork.m_Container1 = linecont[0];
    g_Info.m_infoNetwork.m_Container2 = linecont[1];
    g_Info.m_infoNetwork.m_Container3 = linecont[2];
    g_Info.m_infoNetwork.m_Container4 = linecont[3];
    g_Info.m_infoNetwork.m_Container5 = linecont[4];
    g_Info.m_infoNetwork.m_Container6 = linecont[5];
    g_Info.m_infoNetwork.m_Container7 = linecont[6];
    g_Info.m_infoNetwork.m_Container8 = linecont[7];
    onSetNetOsdInfo();
}
function ajxReloadAnaHdTuner(zone) {
    var lTunerType;
    lTunerType = g_Info.GetTunerType();
    switch (lTunerType) {
    case CSTtunerTypeAnalog:
        ajxReloadTuner();
        break;
    case CSTtunerTypeHD:
        ajxReloadHdradio();
        break;
    case CSTtunerTypeDAB:
        ajxReloadDab();
        break;
    case CSTtunerTypeNone:
        break;
    }
}
function ajxReloadTuner() {
    ajxGetTunerPlayInfo();
}
function ajxSetTunerPresetTuningProc(cmd) {
    if (g_Info.m_infoTuner.m_band == 0) {
        ajxSendXMLData(true, "PUT", 'Tuner', 'Play_Control', 'Tuning', 'Freq', 'AM', 'Val', cmd);
    } else {
        ajxSendXMLData(true, "PUT", 'Tuner', 'Play_Control', 'Tuning', 'Freq', 'FM', 'Val', cmd);
    }
}
function ajxSetTunerStereoMono(cmd) {
    ajxSendXMLData(true, "PUT", 'Tuner', 'Play_Control', 'FM_Mode', cmd);
}
function ajxSetTunerBand(cmd) {
    ajxSendXMLData(true, "PUT", 'Tuner', 'Play_Control', 'Tuning', 'Band', cmd);
}
function ajxGetTunerPreset(index) {
    if (index < 1 || 40 < index) {
        return false;
    }
    ajxSendXMLData(true, "PUT", 'Tuner', 'Play_Control', 'Preset', 'Preset_Sel', index);
}
function ajxGetTunerPlayInfo() {
    ajxSendXMLData(true, "GET", 'Tuner', 'Play_Info', 'GetParam');
}
function ajxGetTunerPresetData() {
    ajxSendXMLData(false, "GET", 'Tuner', 'Play_Control', 'Preset', 'Preset_Sel_Item', 'GetParam');
}
function ajxSetTunerFreq(tunertype, band, freq) {
    var val = new Array;
    val[0] = 0;
    val[1] = freq;
    if (band == 'AM') {
        val[2] = 0;
    } else {
        val[1] = val[1] * 100;
        val[1] = Math.round(val[1]);
        val[2] = 2;
    }
    var httpObj = ajxCreateXMLHttpRequest(ajxRecvData, true);
    var xml = ajxCreateXMLObject();
    if (httpObj && xml && val[0] == 0) {
        var top = xml.createElement("YAMAHA_AV");
        xml.appendChild(top);
        top.setAttribute("cmd", "PUT");
        var e1 = xml.createElement(tunertype);
        var e2 = xml.createElement("Play_Control");
        var e3 = xml.createElement("Tuning");
        var e41 = xml.createElement("Band");
        var e42 = xml.createElement("Freq");
        var e51 = xml.createElement("FM");
        var e52 = xml.createElement("AM");
        var e61 = xml.createElement("Val");
        var e62 = xml.createElement("Exp");
        var e63 = xml.createElement("Unit");
        top.appendChild(e1);
        e1.appendChild(e2);
        e2.appendChild(e3);
        e3.appendChild(e41);
        e3.appendChild(e42);
        e41.appendChild(xml.createTextNode(band));
        if (band == 'AM') {
            e42.appendChild(e52);
            e52.appendChild(e61);
            e52.appendChild(e62);
            e52.appendChild(e63);
            e61.appendChild(xml.createTextNode(val[1]));
            e62.appendChild(xml.createTextNode('0'));
            e63.appendChild(xml.createTextNode('kHz'));
        } else {
            e42.appendChild(e51);
            e51.appendChild(e61);
            e51.appendChild(e62);
            e51.appendChild(e63);
            e61.appendChild(xml.createTextNode(val[1]));
            e62.appendChild(xml.createTextNode('2'));
            e63.appendChild(xml.createTextNode('MHz'));
        }
        ajxSendData(httpObj, xml);
    }
}
function encodeVal(num) {
    var ret = new Array;
    ret[0] = -1;
    ret[2] = 0;
    num = num.toString();
    var len = num.length;
    for (ret[2] = 0; ret[2] < len; ret[2]++) {
        if (num.indexOf(".") == -1) {
            ret[0] = 0;
            ret[1] = parseInt(num);
            break;
        }
        num = num * 10;
        num = num.toString();
    }
    return ret;
}
function ajxHandleTuner(xmlData, rsp, rc) {
    var TunerCmd = ["Play_Info", "Play_Control", "Config"];
    var cmdname = "";
    for (var i = 0; i < TunerCmd.length; i++) {
        var cmd = xmlData.getElementsByTagName(TunerCmd[i]);
        if (cmd.length == 1) {
            cmdname = TunerCmd[i];
            break;
        }
    }
    switch (cmdname) {
    case "Play_Info":
        ajxHandleTunerPlayInfo(xmlData, rsp);
        break;
    case "Play_Control":
        ajxHandleTunerPlayControl(xmlData, rsp);
        break;
    case "Config":
        ajxHandleTunerConfig(xmlData, rsp);
        break;
    }
}
function ajxConvValue(xmlData, tag) {
    var ret = new Array("0","0","MHz");
    var top = xmlData.getElementsByTagName(tag);
    if (top.length) {
        if (top[0].firstChild) {
            var tmp = top.item(0).cloneNode(true);
            ret[0] = GEBTN(tmp, 'Val', '0');
            ret[1] = GEBTN(tmp, 'Exp', '0');
            ret[2] = GEBTN(tmp, 'Unit', 'MHz');
        }
    }
    return ret;
}
function ajxHandleTunerConfig(xmlData, rsp) {
    var val;
    var rds;
    var blnDev;
    var blnRDS;
    if (rsp == 'PUT') {
        return;
    }
    var val2 = GEBTN(xmlData, 'Feature_Availability', '');
    if (val2 != "") {
        if (g_Info.m_existTuner == false) {
            g_Info.m_existTunerRDS = false;
            g_Info.m_infoTuner.m_Device = val2;
            gInit.devTuner = true;
        } else {
            var val3 = GEBTN(xmlData, 'RDS', '');
            if (val3 == 'Exist') {
                g_Info.m_existTunerRDS = true;
            } else {
                g_Info.m_existTunerRDS = false;
            }
            g_Info.m_infoTuner.m_Device = val2;
            gInit.devTuner = true;
        }
        var fmroot = xmlData.getElementsByTagName('FM');
        if (fmroot.length) {
            if (fmroot[0].firstChild) {
                var fm = fmroot.item(0).cloneNode(true);
                var ret = ajxConvValue(fm, 'Min');
                g_Info.m_infoTuner.m_fmminfreq = parseInt(ret[0]) / Math.pow(10, ret[1]);
                ret = ajxConvValue(fm, 'Max');
                g_Info.m_infoTuner.m_fmmaxfreq = parseInt(ret[0]) / Math.pow(10, ret[1]);
                ret = ajxConvValue(fm, 'Step');
                g_Info.m_infoTuner.m_fmstepfreq = parseInt(ret[0]) / Math.pow(10, ret[1]);
            }
        }
        var amroot = xmlData.getElementsByTagName('AM');
        if (amroot.length) {
            if (amroot[0].firstChild) {
                var am = amroot.item(0).cloneNode(true);
                var ret = ajxConvValue(am, 'Min');
                g_Info.m_infoTuner.m_amminfreq = parseInt(ret[0]) / Math.pow(10, ret[1]);
                ret = ajxConvValue(am, 'Max');
                g_Info.m_infoTuner.m_ammaxfreq = parseInt(ret[0]) / Math.pow(10, ret[1]);
                ret = ajxConvValue(am, 'Step');
                g_Info.m_infoTuner.m_amstepfreq = parseInt(ret[0]) / Math.pow(10, ret[1]);
            }
        }
    }
}
function ajxHandleTunerPlayControl(xmlData, rsp) {
    if (rsp == 'PUT') {
        timerAfterCmd("ajxReloadTuner", 300);
        return;
    }
    var pcmd = ["Search_Mode", "Preset_Sel", "Preset_Sel_Item"];
    var cmdname = "";
    for (var i = 0; i < pcmd.length; i++) {
        var cmd = xmlData.getElementsByTagName(pcmd[i]);
        if (cmd.length == 1) {
            cmdname = pcmd[i];
            break;
        }
    }
    switch (cmdname) {
    case "Search_Mode":
        break;
    case "Preset_Sel":
        break;
    case "Preset_Sel_Item":
        ajxHandleTunerHdPlayControlData(xmlData, GetEleId("tunerradiopreset"));
        gInit.tunerPreset = true;
        break;
    default:
        break;
    }
}
function ajxHandleTunerHdPlayControlData(xmlData, objPreset) {
    if (EXISTTAG(xmlData, 'Preset_Sel_Item') == true) {
        for (var i = 1; i <= 41; i++) {
            var itemroot = xmlData.getElementsByTagName('Item_' + i);
            if (itemroot.length) {
                if (itemroot[0].firstChild) {
                    var itemnode = itemroot.item(0).cloneNode(true);
                    var stat = GEBTN(itemnode, 'Param', 'No Preset');
                    var optionText = GEBTN(itemnode, 'Title', 'Empty');
                    if ((stat != "No Preset") && (optionText != 'Empty')) {
                        var option = document.createElement('option');
                        option.setAttribute('value', stat);
                        option.innerHTML = optionText;
                        objPreset.appendChild(option);
                    }
                }
            }
        }
    }
}
function ajxConvTunerPresetTextFormat(index, band, freq_text) {
    var space1_text = "";
    if (index < 10) {
        space1_text = ' ';
    } else {}
    var conv_text = "";
    conv_text = index + space1_text + ':' + band + ' ' + freq_text;
    return conv_text;
}
function ajxHandleTunerHdPlayControlPresetSel(xmlData, objPreset) {
    var pos = GEBTN(xmlData, 'Preset_Sel', '');
    var index = -1;
    if (pos == "No Preset") {} else {
        if (isNaN(pos)) {} else {
            var index = eval(pos);
            if (index > 0) {
                index--;
            }
        }
    }
    var sel = objPreset.selectedIndex;
    if (sel != index) {
        sel = index;
        objPreset.selectedIndex = sel;
    }
    return sel;
}
function ajxHandleTunerPlayInfo(xmlData, rsp) {
    if (rsp == 'PUT') {
        return;
    }
    val = GEBTN(xmlData, 'Search_Mode', 'Tuning');
    if (val == 'Tuning') {
        g_Info.m_infoTuner.m_radiopreset = -1;
    } else {
        g_Info.m_infoTuner.m_radiopreset = ajxHandleTunerHdPlayControlPresetSel(xmlData, GetEleId("tunerradiopreset"));
    }
    val = GEBTN(xmlData, 'Band', 'FM');
    var a_band = {
        "AM": 0,
        "FM": 1
    };
    onSetTunerBand(a_band[val]);
    var exp = GEBTN(xmlData, 'Exp', '1');
    val = GEBTN(xmlData, 'Val', '875');
    if ((isNaN(val) == true)) {
        g_Info.m_infoTuner.m_frequency = val;
        g_Info.m_infoTuner.m_unit = 2;
    } else {
        g_Info.m_infoTuner.m_frequency = val / Math.pow(10, exp);
        val = GEBTN(xmlData, 'Unit', 'MHz');
        var a_unit = {
            "kHz": 0,
            "MHz": 1
        };
        g_Info.m_infoTuner.m_unit = a_unit[val];
    }
    val = GEBTN(xmlData, 'FM_Mode', '');
    if (val == "Auto") {
        onSetTunerStereoMono(0);
    } else if (val == "Mono") {
        onSetTunerStereoMono(1);
    }
    val = GEBTN(xmlData, 'Program_Type', '');
    g_Info.m_infoTuner.m_ProgramType = val;
    val = GEBTN(xmlData, 'Program_Service', '');
    g_Info.m_infoTuner.m_ProgramService = val;
    val = GEBTN(xmlData, 'Radio_Text_A', '');
    g_Info.m_infoTuner.m_RadioTextA = val;
    val = GEBTN(xmlData, 'Radio_Text_B', '');
    g_Info.m_infoTuner.m_RadioTextB = val;
    val = GEBTN(xmlData, 'Clock_Time', '');
    g_Info.m_infoTuner.m_ClockTime = val;
    onSetAnalogTunerInfo();
}
function ajxGetService_Info() {
    ajxSendXMLData(false, "GET", 'System', 'Service', 'Info', 'GetParam');
}
function ajxGetFeatureExistence_Info() {
    ajxSendXMLData(false, "GET", 'System', 'Config', 'GetParam');
}
function ajxGetZone2Config() {
    ajxSendXMLData(false, "GET", 'Zone_2', 'Config', 'GetParam');
}
function ajxGetTunerConfig() {
    if (g_Info.m_existTuner == true) {
        ajxSendXMLData(false, "GET", 'Tuner', 'Config', 'GetParam');
    }
}
function ajxGetHD_RadioConfig() {
    if (g_Info.m_existHD == true) {
        ajxSendXMLData(false, "GET", 'HD_Radio', 'Config', 'GetParam');
    }
}
function ajxGetDABConfig() {
    if (g_Info.m_existDAB == true) {
        ajxSendXMLData(false, "GET", 'DAB', 'Config', 'GetParam');
    }
}
function ajxGetiPodConfig(sync) {
    ajxSendXMLData(sync, "GET", 'iPod', 'Config', 'GetParam');
}
function ajxGetRename(zone) {
    ajxSendXMLData(false, "GET", zone, 'Config', 'GetParam');
}
function ajxSetRename(zone, name) {
    ajxSendXMLData(true, "PUT", zone, 'Config', 'Name', 'Zone', name);
}
function ajxGetFriendlyName() {
    ajxSendXMLData(true, "GET", 'System', 'Misc', 'Network', 'Network_Name', 'GetParam');
}
function ajxSetFriendlyName(name) {
    ajxSendXMLData(true, "PUT", 'System', 'Misc', 'Network', 'Network_Name', name);
}
function ajxSetRenames(nameArray) {
    for (var i = 0; i < nameArray.length; i++) {
        ajxSetRename(gZoneIdx2Name[i], nameArray[i])
    }
}
function ajxSetAirPlayPassword(password) {
    ajxSendXMLData(true, "PUT", 'System', 'Misc', 'Network', 'Product_PIN', password);
}
function ajxGetAirPlayPassword() {
    ajxSendXMLData(false, "GET", 'System', 'Misc', 'Network', 'Product_PIN', 'GetParam');
}
function ajxDispStatusBar(str) {}
function ajxGetMacFilter() {
    ajxSendXMLData(false, "GET", 'System', 'Misc', 'Network', 'MAC_Address_Filter', 'GetParam');
}
function ajxSetMacFilter(macArray) {
    var httpObj = ajxCreateXMLHttpRequest(ajxRecvData, true);
    var xml = ajxCreateXMLObject();
    if (httpObj && xml) {
        var top = xml.createElement("YAMAHA_AV");
        xml.appendChild(top);
        top.setAttribute("cmd", "PUT");
        var e0 = xml.createElement("System");
        var e1 = xml.createElement("Misc");
        var e2 = xml.createElement("Network");
        var e3 = xml.createElement("MAC_Address_Filter");
        var e41 = xml.createElement("Mode");
        var e42 = xml.createElement("Address");
        top.appendChild(e0);
        e0.appendChild(e1);
        e1.appendChild(e2);
        e2.appendChild(e3);
        e3.appendChild(e41);
        e3.appendChild(e42);
        e41.appendChild(xml.createTextNode("On"));
        for (var i = 0; i < 10; i++) {
            var mac = macArray[i];
            if (mac != "") {
                var num = "Number_" + (i + 1);
                var e421 = xml.createElement(num);
                e42.appendChild(e421);
                e421.appendChild(xml.createTextNode(mac));
            }
        }
        ajxSendData(httpObj, xml);
    }
}
function ajxGetNetwork() {
    ajxSendXMLData(false, "GET", 'System', 'Misc', 'Network', 'Parameters', 'GetParam');
}
function ajxSetNetworkParam(connection, dhcpStatus, ipArray, paramArray) {
    var httpObj = ajxCreateXMLHttpRequest(ajxRecvData, true);
    var xml = ajxCreateXMLObject();
    if (httpObj && xml) {
        var top = xml.createElement("YAMAHA_AV");
        xml.appendChild(top);
        top.setAttribute("cmd", "PUT");
        var eSystem = xml.createElement("System");
        var eMisc = xml.createElement("Misc");
        var eNetwork = xml.createElement("Network");
        var eParam = xml.createElement("Parameters");
        var eConnect = xml.createElement("Connection");
        var eWireless = xml.createElement("Wireless");
        var eWirelessLAN = xml.createElement("Wireless_LAN");
        var eDirect = xml.createElement("Wireless_Direct");
        var eSSID = xml.createElement("SSID");
        var eSecurityType = xml.createElement("Security_Type");
        var eSecurityKey = xml.createElement("Security_Key");
        var eIP = xml.createElement("IP");
        var eWiredOrWireless = xml.createElement("Wired_or_Wireless");
        var eDHCP = xml.createElement("DHCP");
        var eIPAddress = xml.createElement("IP_Address");
        var eSubnet = xml.createElement("Subnet_Mask");
        var eGateway = xml.createElement("Default_Gateway");
        var eDNS1 = xml.createElement("DNS_Server_1");
        var eDNS2 = xml.createElement("DNS_Server_2");
        top.appendChild(eSystem);
        eSystem.appendChild(eMisc);
        eMisc.appendChild(eNetwork);
        eNetwork.appendChild(eParam);
        eParam.appendChild(eConnect);
        eConnect.appendChild(xml.createTextNode(gNetworkConnectName[connection]));
        if ((connection == 0) || (connection == 2) || (connection == 3)) {
            eParam.appendChild(eWireless);
        } else {}
        var param;
        if (connection == 2) {
            eWireless.appendChild(eWirelessLAN);
            param = paramArray[0];
            eWirelessLAN.appendChild(eSSID);
            eSSID.appendChild(xml.createTextNode(param));
            param = paramArray[1];
            eWirelessLAN.appendChild(eSecurityType);
            eSecurityType.appendChild(xml.createTextNode(param));
            param = paramArray[2];
            eWirelessLAN.appendChild(eSecurityKey);
            eSecurityKey.appendChild(xml.createTextNode(param));
        } else if ((connection == 0) || (connection == 3)) {
            eWireless.appendChild(eDirect);
            param = paramArray[1];
            eDirect.appendChild(eSecurityType);
            eSecurityType.appendChild(xml.createTextNode(param));
            param = paramArray[2];
            eDirect.appendChild(eSecurityKey);
            eSecurityKey.appendChild(xml.createTextNode(param));
        } else {}
        if ((connection == 0) || (connection == 1) || (connection == 2)) {
            eParam.appendChild(eIP);
            eIP.appendChild(eWiredOrWireless);
            eWiredOrWireless.appendChild(eDHCP);
            eDHCP.appendChild(xml.createTextNode(dhcpStatus));
            var ip;
            ip = ipArray[0];
            if (ip != "") {
                eWiredOrWireless.appendChild(eIPAddress);
                eIPAddress.appendChild(xml.createTextNode(ip));
            }
            ip = ipArray[1];
            if (ip != "") {
                eWiredOrWireless.appendChild(eSubnet);
                eSubnet.appendChild(xml.createTextNode(ip));
            }
            ip = ipArray[2];
            if (ip != "") {
                eWiredOrWireless.appendChild(eGateway);
                eGateway.appendChild(xml.createTextNode(ip));
            }
            ip = ipArray[3];
            if (ip != "") {
                eWiredOrWireless.appendChild(eDNS1);
                eDNS1.appendChild(xml.createTextNode(ip));
            }
            ip = ipArray[4];
            if (ip != "") {
                eWiredOrWireless.appendChild(eDNS2);
                eDNS2.appendChild(xml.createTextNode(ip));
            }
        } else {}
        ajxSendData(httpObj, xml);
    }
}
function ajxStartFirmwareUpdate() {
    var httpObj = ajxCreateXMLHttpRequest(ajxRecvData, true);
    var xml = ajxCreateXMLObject();
    if (httpObj && xml) {
        var top = xml.createElement("YAMAHA_AV");
        xml.appendChild(top);
        top.setAttribute("cmd", "PUT");
        var e0 = xml.createElement("System");
        var e1 = xml.createElement("Misc");
        var e2 = xml.createElement("Update");
        var e3 = xml.createElement("Local_PC");
        var e4 = xml.createElement("Control");
        top.appendChild(e0);
        e0.appendChild(e1);
        e1.appendChild(e2);
        e2.appendChild(e3);
        e3.appendChild(e4);
        e4.appendChild(xml.createTextNode("Start"));
        ajxSendData(httpObj, xml);
    }
}
function ajxSetAllZoneMute(OnOff) {
    if (g_Info.blnPartyModeValid()) {
        ajxSendXMLData(true, "PUT", "System", "Party_Mode", "Volume", "Mute", gOnOff2Name[OnOff]);
    }
}
function ajxSetAllZoneVol(cmd) {
    if (g_Info.blnPartyModeValid()) {
        ajxSendXMLData(true, "PUT", "System", "Party_Mode", "Volume", "Lvl", cmd);
    }
}
ajxInitConfig();
