﻿/*
*短信二审
*
*/

Ext.namespace('Js.Center.SendSMS.SecondCheck');
var sPanel;
 // 分页每页显示数量
var _pageSize = 12;
Js.Center.SendSMS.SecondCheck.info = function(node){
    
    if (Ext.get("Js.Center.SendSMS.SecondCheck.MainPanel") == null) {
        //============================================================================定义GridPanel相关
        //=============================================================定义formpanel
        
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            title: "信息审核",
            labelWidth: 80,
            needButtons: false,
            height: 230,
            collapsed: false,
            //查询调用的方法
            queryMethod: "Js.Center.SendSMS.SecondCheck.queryGrid",
            items: [{
                layout: 'column',
                items: [{
                    xtype: "hidden",
                    name: "numcontentid",
                    id: "Js.Center.SendSMS.SecondCheck.NumContentID"
                }, {
                    xtype: "hidden",
                    name: "flag",
                    id: "Js.Center.SendSMS.SecondCheck.Flag",
                    value: "secondcheck"
                }, {
                    columnWidth: .5,
                    layout: 'form',
                    defaultType: "textfield",
                    //锚点布局-
                    defaults: {
                        anchor: "80%",
                        msgTarget: "side"
                    },
                    buttonAlign: "center",
                    bodyStyle: "padding:10px 0 10px 15px",
                    items: [{
                        xtype: 'textfield',
                        name: 'numsendtypename',
                        id: "Js.Center.SendSMS.SecondCheck.SendTypeName",
                        readOnly: true,
                        fieldLabel: '发送类型',
                        allowBlank: false
                    }, {
                        xtype: 'textfield',
                        name: 'vc2username',
                        id: "Js.Center.SendSMS.SecondCheck.SendUser",
                        readOnly: true,
                        fieldLabel: '发送人',
                        allowBlank: false
                    }, {
                        xtype: 'textarea',
                        name: 'vc2content',
                        id: "Js.Center.SendSMS.SecondCheck.Content",
                        readOnly: true,
                        fieldLabel: '信息内容',
                        allowBlank: false,
                        blankText: "请选择审核信息"
                    }]
                }, {
                    columnWidth: .5,
                    layout: 'form',
                    defaultType: "textfield",
                    //锚点布局-
                    defaults: {
                        anchor: "80%",
                        msgTarget: "side"
                    },
                    buttonAlign: "center",
                    bodyStyle: "padding:10px 0 10px 15px",
                    items: [{
                        xtype: 'textfield',
                        name: 'datsend',
                        id: "Js.Center.SendSMS.SecondCheck.DatSend",
                        readOnly: true,
                        fieldLabel: '发送时间',
                        allowBlank: false,
                        blankText: "请选择审核信息"
                    }, {
                        xtype: 'textarea',
                        name: 'vc2reason',
                        id: "Js.Center.SendSMS.SecondCheck.Reason",
                        fieldLabel: '审核建议',
                        allowBlank:false,
                        blankText:"请填写审核建议",
                        value:"通过",
                        regex: WXTL.Common.regex.IllegalDiy,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 200,
                        maxLengthText: '长度应小于等于200',
                        validator: function(){
                        var word = Ext.get("Js.Center.SendSMS.SecondCheck.Reason").dom.value;
                        if (isExistsHtmlLable(word)) {
                            return false;
                        }
                        else {
                            return true;
                            }
                        },
                        invalidText: '帧文字不能包含HTML标签'
                        
                    }]
                },{
                    columnWidth: 1,
                    layout: 'form',
                    //defaultType: "textfield",
                    //锚点布局-
                    defaults: {
                        anchor: "95%",
                        msgTarget: "side"
                    },
                    //buttonAlign: "center",
                    bodyStyle: "padding:0px 0 10px 15px",
                    items: [{
                        //xtype: 'ClickLabel',
                        //id: "Js.Center.SendSMS.SecondCheck.MobileListInfo",
                        //fieldLabel: '号码分布情况',
                        html:"<div id='Js.Center.SendSMS.SecondCheck.MobileListInfo'></div>"
                    }]
                }]
            }],
            buttons: [new Ext.Button({
                text: '通过',
                handler: function(){
					secondCheckDoPass("-10");
				} 
            }), new Ext.Button({
                text: '驳回',
                handler: function(){
					secondCheckDoReject("-10");
				} 
            })]
        });
        
        sPanel = selectPanel;
        
        //==============================================================Grid数据定义
        
        Js.Center.SendSMS.SecondCheck.infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.SendSMS.SmsContentURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: ["numcontentid", "vc2content", "datsend", "vc2status", "numstate", "nummessageformat", "numsendmethod", "numpriority", "vc2detail", "numcheck", "vc2reason", "datcreate", "numcreaterid", "datpresend", "numcheck1id", "datcheck1", "numcheck2id", "datcheck2", "numprenum", "numprodid", "numsource", "numsendtype", "vc2typelist", "numstatename", "numsendtypename", "nummessageformatname", "vc2longcode", "vc2username", "username1", "username2", "vc2departname","numtotal","numsuccess","numfailed"],
                root: "data",
                id: "numlogid",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                field: 'datcheck1',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
                flag: 'selectbykey',
                state: "1",
                numsendtype: "1,2,3,4,5,6,7,9"
            }
        });
        Js.Center.SendSMS.SecondCheck.infostore.reload({
            params: {
                start: 0,
                limit: _pageSize
            },
            callback: function(records, options, success){
                if (Js.Center.SendSMS.SecondCheck.infostore.getCount() > 0) {
                    secondCheckDoView(0);
                }
            }
        });
        //==============================================================列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numcolumnid"
        });
        //==============================================================列头
        var cm = new Ext.grid.ColumnModel([{
            header: "短信内容",
            tooltip: "短信内容",
            dataIndex: "vc2content",
            sortable: true
        }, {
            header: "发送人",
            tooltip: "发送人",
            dataIndex: "vc2username",
            sortable: true
        }, {
            header: "部门",
            tooltip: "部门",
            dataIndex: "vc2departname",
            sortable: true
        }, {
            header: "发送类型",
            tooltip: "发送类型",
            dataIndex: "numsendtypename",
            sortable: true
        }, {
            header: "发送时间",
            tooltip: "发送时间",
            dataIndex: "datsend",
            sortable: true
        }, {
            header: "审核状态",
            tooltip: "审核状态",
            dataIndex: "numstatename",
            sortable: true
//            renderer:function (value){
//            if(value == 1){
//                return "一审通过";
//            }
//            }
        }, {
            header: "一审时间",
            tooltip: "一审时间",
            dataIndex: "datcheck1",
            sortable: true
        },{
            header: "内容类型",
            tooltip: "内容类型",
            dataIndex: "nummessageformatname",
            sortable: true
        }, {
            header: "创建时间",
            tooltip: "创建时间",
            dataIndex: "datcreate",
            sortable: true
        }, {
            header: "操作",
            tooltip: "操作",
            dataIndex: "numsvcid",
            width: 80,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                return "<a href='#' onclick='secondCheckDoView(\"" + rowIndex + "\")'>查看</a>";//　<a href='#' onclick='secondCheckDoReject(\"" + rowIndex + "\")'>驳回</a>
            }
        }, {
            header: "<font color='green'>合法</font>/<font color='red'>非法</font>",
            tooltip: "合法/非法",
            dataIndex: "numcontentid",
            width: 100,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
              var row =  Js.Center.SendSMS.SecondCheck.infostore.getAt(rowIndex);
               var suc = "<font color='green'>"+ row.get("numsuccess") +"</font>";
                var fail = "/<font color='red'>"+ row.get("numfailed") +"</font>";
                if(row.get("numsendtype") != 2){
                    suc = row.get("numsuccess")>0?"<a href='#' onclick='exportData(\"" + Js.Center.SendSMS.SmsContentURL + "\",\"id=" + value + "&flag=selectexport&successtype=1\")'><font color='green'>"+ row.get("numsuccess") +"</font></a>" : "<font color='green'>"+ row.get("numsuccess") +"</font>";
                    fail = row.get("numfailed")>0? "/<a href='#' onclick='exportData(\"" + Js.Center.SendSMS.SmsContentURL + "\",\"id=" + value + "&flag=selectexport&successtype=0\")'><font color='red'>"+ row.get("numfailed") +"</font></a>" : "/<font color='red'>"+ row.get("numfailed") +"</font>";
                    //return "<a href='#' onclick='exportData(\"" + Js.Center.SendSMS.SmsContentURL + "\",\"id=" + value + "&flag=selectexport&successtype=1\")'><font color='green'>"+ row.get("numsuccess") +"</font></a>/<a href='#' onclick='exportData(\"" + Js.Center.SendSMS.SmsContentURL + "\",\"id=" + value + "&flag=selectexport&successtype=0\")'><font color='red'>"+ row.get("numfailed") +"</font></a>";
                } else {
                	suc = "<font color='green'>"+ row.get("numtotal") +"</font>";
                }
                return suc + fail;
            }
        }]);
        
        
        //==============================================================定义grid
        var gridPanel = new WXTL.Widgets.CommonGrid.GridPanel({
            title: "短信二审列表",
            anchor: '100% 100%',
            pageSize: _pageSize,
            store: Js.Center.SendSMS.SecondCheck.infostore,
            needMenu: false,
            sm: sm,
            cm: cm,
            needRightMenu: false,
            listeners: {
                "rowclick": function(grid, rowindex, e){
                    secondCheckDoView(rowindex);
                }
            }
        });
        
        //============================================================================ 定义formpanel
        //============================================================== 定义查询按钮事件方法
        Js.Center.SendSMS.SecondCheck.queryGrid = function(){
            var columnName = Ext.get("columnname").getValue();
            var flag = 'selectbykey';
            Js.Center.SendSMS.SecondCheck.infostore.baseParams = {
                columnname: columnName,
                state: "0"
            };
            Js.Center.SendSMS.SecondCheck.infostore.reload();
        };
        
        //============================================================================定义主panel
        Js.Center.SendSMS.SecondCheck.MainPanel = new Ext.Panel({
            id: "Js.Center.SendSMS.SecondCheck.MainPanel",
            frame: true,
            bodyBorder: false,
            border: false,
            autoScroll: true,
            layout: "anchor",
            defaults: {
                collapsible: true
            },
            items: [selectPanel, gridPanel]
        })
    };
    //============================================================================绑定到center
    GridMain(node, Js.Center.SendSMS.SecondCheck.MainPanel, "openroomiconinfo", "Js.Center.SendSMS.SecondCheck.infostore", "secondDoView()");
};

function secondDoView(){
    Js.Center.SendSMS.SecondCheck.infostore.reload({
        params: {
            start: 0,
            limit: 12
        },
        callback: function(records, options, success){
            if (Js.Center.SendSMS.SecondCheck.infostore.getCount() > 0) {
                secondCheckDoView(0);
            }
        }
    });
};

//审核通过方法
function secondCheckDoPass(rowindex){
	if(rowindex != "-10"){
		secondCheckDoView(rowindex);
	}
    if (sPanel.getForm().isValid()) {
        Ext.get("Js.Center.SendSMS.SecondCheck.Flag").dom.value = "secondcheck";
        // 弹出效果
        Ext.MessageBox.show({
            msg: '正在保存，请稍等...',
            progressText: 'Saving...',
            width: 300,
            wait: true,
            icon: 'download',
            animEl: 'saving'
        });
        setTimeout(function(){
            Ext.MessageBox.hide();
        }, 300000);
           var params = {
                    flag: "secondcheck",
                    numcontentid: Ext.get("Js.Center.SendSMS.SecondCheck.NumContentID").dom.value,
                    vc2content: Ext.get("Js.Center.SendSMS.SecondCheck.Content").dom.value,
                    vc2username: Ext.get("Js.Center.SendSMS.SecondCheck.SendUser").dom.value,
                    datsend: Ext.get("Js.Center.SendSMS.SecondCheck.DatSend").dom.value,
                    numsendtypename: Ext.get("Js.Center.SendSMS.SecondCheck.SendTypeName").dom.value,
                    vc2reason: Ext.get("Js.Center.SendSMS.SecondCheck.Reason").dom.value
      
                };
           //doAjax( Js.Center.SendSMS.SmsContentUpdateURL, params);
           doAjaxWithCallBack(Js.Center.SendSMS.SmsContentUpdateURL, params,Js.Center.SendSMS.SecondCheck.callBackFunc);
                
//                Js.Center.SendSMS.SecondCheck.infostore.reload({
//                        params: {
//                            start: 0,
//                            limit: _pageSize
//                        },
//                        callback: function(records, options, success){
//                            sPanel.getForm().reset();
//                            if (Js.Center.SendSMS.SecondCheck.infostore.getCount() > 0) {
//                                secondCheckDoView(0);
//                            }
//                        }
//                    });
        
//        sPanel.getForm().submit({
//            url: Js.Center.SendSMS.SmsContentUpdateURL,
//            method: "POST",
//            success: function(form, action){
//                var objJson = Ext.util.JSON.decode(action.response.responseText);
//                var falg = objJson.success;
//                if (falg == true) {
//                    Ext.Msg.alert("温馨提示", "操作已成功!");
//                    Js.Center.SendSMS.SecondCheck.infostore.reload({
//                        params: {
//                            start: 0,
//                            limit: _pageSize
//                        },
//                        callback: function(records, options, success){
//                            sPanel.getForm().reset();
//                            if (Js.Center.SendSMS.SecondCheck.infostore.getCount() > 0) {
//                                secondCheckDoView(0);
//                            }
//                        }
//                    });
//                }
//                else 
//                    Ext.Msg.alert('温馨提示', objJson.info);
//            },
//            failure: function(form, action){
//                var objJson = Ext.util.JSON.decode(action.response.responseText);
//                Ext.Msg.alert('温馨提示', objJson.info);
//                Js.Center.SendSMS.SecondCheck.infostore.reload({
//                    params: {
//                        start: 0,
//                        limit: _pageSize
//                    },
//                    callback: function(records, options, success){
//                        sPanel.getForm().reset();
//                        if (Js.Center.SendSMS.SecondCheck.infostore.getCount() > 0) {
//                            secondCheckDoView(0);
//                        }
//                    }
////                });
//                //Ext.Msg.alert('温馨提示', '系统忙，请稍候...');
//            }
//        });
    }
};
//审核驳回犯法
function secondCheckDoReject(rowindex){
	if(rowindex != "-10"){
		secondCheckDoView(rowindex);
	}
	if(Ext.get("Js.Center.SendSMS.SecondCheck.Reason").dom.value.replace(/[ ]/g,"")  == "通过"){
         Ext.get("Js.Center.SendSMS.SecondCheck.Reason").dom.value = "";   
    }
    if (sPanel.getForm().isValid()) {
        Ext.get("Js.Center.SendSMS.SecondCheck.Flag").dom.value = "rejectcheck";
        // 弹出效果
        Ext.MessageBox.show({
            msg: '正在保存，请稍等...',
            progressText: 'Saving...',
            width: 300,
            wait: true,
            icon: 'download',
            animEl: 'saving'
        });
        setTimeout(function(){
            Ext.MessageBox.hide();
        }, 300000);
        
        var params = {
            flag: "rejectcheck",
            numcontentid: Ext.get("Js.Center.SendSMS.SecondCheck.NumContentID").dom.value,
            vc2content: Ext.get("Js.Center.SendSMS.SecondCheck.Content").dom.value,
            vc2username: Ext.get("Js.Center.SendSMS.SecondCheck.SendUser").dom.value,
            datsend: Ext.get("Js.Center.SendSMS.SecondCheck.DatSend").dom.value,
            numsendtypename: Ext.get("Js.Center.SendSMS.SecondCheck.SendTypeName").dom.value,
            vc2reason: Ext.get("Js.Center.SendSMS.SecondCheck.Reason").dom.value

        };
        doAjaxWithCallBack(Js.Center.SendSMS.SmsContentUpdateURL, params,Js.Center.SendSMS.SecondCheck.callBackFunc);
        
//       doAjax( Js.Center.SendSMS.SmsContentUpdateURL, params);
//            
//        Js.Center.SendSMS.SecondCheck.infostore.reload({
//                params: {
//                    start: 0,
//                    limit: _pageSize
//                },
//                callback: function(records, options, success){
//                    sPanel.getForm().reset();
//                    if (Js.Center.SendSMS.SecondCheck.infostore.getCount() > 0) {
//                        secondCheckDoView(0);
//                    }
//                }
//            });
//        sPanel.getForm().submit({rejectcheck
//            url: Js.Center.SendSMS.SmsContentUpdateURL,
//            method: "POST",
//            success: function(form, action){
//                var objJson = Ext.util.JSON.decode(action.response.responseText);
//                var falg = objJson.success;
//                if (falg == true) {
//                    Ext.Msg.alert("温馨提示", "操作已成功!");
//                    Js.Center.SendSMS.SecondCheck.infostore.reload({
//                        params: {
//                            start: 0,
//                            limit: _pageSize
//                        },
//                        callback: function(records, options, success){
//                            sPanel.getForm().reset();
//                            if (Js.Center.SendSMS.SecondCheck.infostore.getCount() > 0) {
//                                secondCheckDoView(0);
//                            }
//                        }
//                    });
//                }
//                else 
//                    Ext.Msg.alert('温馨提示', objJson.info);
//            },
//            failure: function(form, action){
//                var objJson = Ext.util.JSON.decode(action.response.responseText);
//                Ext.Msg.alert('温馨提示', objJson.info);
//                Js.Center.SendSMS.SecondCheck.infostore.reload({
//                    params: {
//                        start: 0,
//                        limit: _pageSize
//                    },
//                    callback: function(records, options, success){
//                        sPanel.getForm().reset();
//                        if (Js.Center.SendSMS.SecondCheck.infostore.getCount() > 0) {
//                            secondCheckDoView(0);
//                        }
//                    }
////                });
//                //Ext.Msg.alert('温馨提示', '系统忙，请稍候...');
//            }
//        });
    }
};
Js.Center.SendSMS.SecondCheck.callBackFunc = function(){
	Js.Center.SendSMS.SecondCheck.infostore.reload({
        params: {
            start: 0,
            limit: _pageSize
        },
        callback: function(records, options, success){
            sPanel.getForm().reset();
            if (Js.Center.SendSMS.SecondCheck.infostore.getCount() > 0) {
                secondCheckDoView(0);
            }
        }
    });
};
function secondCheckDoView(rowIndex){
    if (Js.Center.SendSMS.SecondCheck.infostore.getCount() > 0) {
        var row = Js.Center.SendSMS.SecondCheck.infostore.getAt(rowIndex);
        var sucRate;
        var mobileTotalInfo = "总数<font color='green'>"+ row.get("numtotal") + "个</font>";
        var mobileSucInfo = "合法数<font color='green'>"+ row.get("numsuccess") + "个</font>";
        var mobileFailInfo = "非法数<font color='green'>"+ row.get("numfailed") + "个</font>";
        if(row.get("numtotal") != "" && row.get("numtotal") != 0){
            //sucRate = Math.round(row.get("numsuccess")/row.get("numtotal")*10000)/100;
            sucRate = row.get("numsuccess")/row.get("numtotal")*10000 /100;
        }
        else{
            sucRate = 0;
        }
        if(sucRate.toString().length > 5){
            sucRate = sucRate.toString().substring(0,5);
        }
        
        Ext.get("Js.Center.SendSMS.SecondCheck.NumContentID").dom.value = row.get("numcontentid");
        Ext.get("Js.Center.SendSMS.SecondCheck.Content").dom.value = row.get("vc2content");
        Ext.get("Js.Center.SendSMS.SecondCheck.SendUser").dom.value = row.get("vc2username");
        Ext.get("Js.Center.SendSMS.SecondCheck.DatSend").dom.value = row.get("datsend");
        Ext.get("Js.Center.SendSMS.SecondCheck.SendTypeName").dom.value = row.get("numsendtypename");
        Ext.get("Js.Center.SendSMS.SecondCheck.Reason").dom.value = "通过";
        
        if(row.get("numsendtype") !=2){
            if(row.get("numtotal") > 0){
                mobileTotalInfo = "总数<a href='#' onclick='exportData(\"" + Js.Center.SendSMS.SmsContentURL + "\",\"id=" + row.get("numcontentid") + "&flag=selectexport&successtype=-1\")'><font color='green'>"+ row.get("numtotal") + "个</font></a> ";
            }
            if(row.get("numsuccess") > 0){
                mobileSucInfo = "合法数<a href='#' onclick='exportData(\"" + Js.Center.SendSMS.SmsContentURL + "\",\"id=" + row.get("numcontentid") + "&flag=selectexport&successtype=1\")'><font color='green'>"+ row.get("numsuccess") + "个</font></a> ";
            }
            if(row.get("numfailed") > 0){
                mobileFailInfo = "非法数<a href='#' onclick='exportData(\"" + Js.Center.SendSMS.SmsContentURL + "\",\"id=" + row.get("numcontentid") + "&flag=selectexport&successtype=0\")'><font color='green'>"+ row.get("numfailed") + "个</font></a> ";
            }
        } else {
        	//客户组
            if(row.get("numtotal") > 0){
                mobileTotalInfo = "总数<font color='green'>"+ row.get("numtotal") + "个</font>";
                mobileSucInfo = "合法数<font color='green'>"+ row.get("numtotal") + "个</font> ";
            }
            if(row.get("numfailed") > 0){
                mobileFailInfo = "非法数<font color='green'>" + row.get("numfailed") + "个</font> ";
            }
            sucRate = 100;
        }
         Ext.get("Js.Center.SendSMS.SecondCheck.MobileListInfo").dom.innerHTML = "号码分布情况：" + mobileTotalInfo+"，"+ mobileSucInfo +"，"+ mobileFailInfo +"，"+ "合法率<font color='red'>"+sucRate+"%</font>";
    }
};