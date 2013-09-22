/**
 * @author Administrator
 */
Ext.namespace('Js.Center.SendSMS.DepartSendDetailsInfo');
Ext.QuickTips.init();

Js.Center.SendSMS.DepartSendDetailsInfo.func = function(row){

Js.Center.SendSMS.DepartSendDetailsInfo.numContentID=row.get("numcontentid");
//Js.Center.SendSMS.DepartSendDetailsInfo.numsendplanid=row.get("numsendplanid");

Js.Center.SendSMS.DepartSendDetailsInfo.numParentconID=row.get("numparentconid");
Js.Center.SendSMS.DepartSendDetailsInfo.datSend=row.get("datsend");

var setSendtype = function(){var value = row.get("numsendtype");
				//alart(value);
				if(value==1){
					Js.Center.SendSMS.DepartSendDetailsInfo.numType = "栏目";
				}
				if(value==2){
					Js.Center.SendSMS.DepartSendDetailsInfo.numType = "客户组";
				}
				if(value==3){
					Js.Center.SendSMS.DepartSendDetailsInfo.numType = "持仓股票";
				}
				if(value==4){
					Js.Center.SendSMS.DepartSendDetailsInfo.numType = "手机号码";
				}
				if(value==5){
					Js.Center.SendSMS.DepartSendDetailsInfo.numType =  "按文件发送";
				}
	};
	setSendtype();
//if (departSendDetailsInfoWin == null) {
	// ================================================================ 定义FormPanel
	var departSendDetailsInfoPanel = new Ext.form.FormPanel({
		id: "departSendDetailsInfoPanel",
		width: 700,
		frame: true,
		labelWidth: 80,
		defaults:{
			anchor:"99%"
		},
		items: [{
			xtype: "hidden",
			name: "numcontentid",
			fieldLabel: "信息编号"
		}, {
			xtype: "textfield",
			name: "vc2creatername",
			fieldLabel: "发送人",
			//anchor:"30%",
			readOnly: true
		},{
			xtype: "textfield",
			name: "numsendtype1",
			fieldLabel: "发送方式",
			readOnly: true,
			//anchor:"30%",
			value: Js.Center.SendSMS.DepartSendDetailsInfo.numType  
		}, {
			xtype: "textarea",
			name: "vc2content",
			fieldLabel: "短信内容",
			readOnly: true,
			width: 600,
			height: 100
		}]
	});
	// ======================================================================= 定义GridPanel相关
	// ===============================================分页每页显示数量
	//var pageSize = 12;
	var _pageSize = 12;
	// ===============================================指定列参数
	var fields = ["numsendgroupid","nummtcnt","numrep_succnt","numrep_nocnt","numrep_faicnt","numsuc_rate","numresendcnt","numparentconid","numsendtype"];
	Js.Center.SendSMS.DepartSendDetailsInfo.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
		proxy: new Ext.data.HttpProxy({
			url: Js.Center.SendSMS.SendQueryURL,
			method: "POST"
		}),
		reader: new Ext.data.JsonReader({
			fields: fields,
			root: "data",
			id: "numsendgroupid",
			totalProperty: "totalCount"
		
		}),
        sortInfo: {
            field: 'numsendgroupid',
            direction: 'DESC'
        },//解决分组无效代码
		baseParams: {
			flag: 'querydetailbycontentid',
			contentid: Js.Center.SendSMS.DepartSendDetailsInfo.numContentID,
			//numsendplanid:Js.Center.SendSMS.DepartSendDetailsInfo.numsendplanid,
			numparentconid:Js.Center.SendSMS.DepartSendDetailsInfo.numParentconID,
            datsend:Js.Center.SendSMS.DepartSendDetailsInfo.datSend
		}
	});
	Js.Center.SendSMS.DepartSendDetailsInfo.Infostore.load({
            params: {
                start: 0,
                limit: _pageSize,
                flag: 'querydetailbycontentid',
				contentid:Js.Center.SendSMS.DepartSendDetailsInfo.numContentID,
				//numsendplanid:Js.Center.SendSMS.DepartSendDetailsInfo.numsendplanid,
				numparentconid:Js.Center.SendSMS.DepartSendDetailsInfo.numParentconID,
                datsend:Js.Center.SendSMS.DepartSendDetailsInfo.datSend
            }
        });
	
	// ==================================================== 列选择模式
	var sm = new Ext.grid.CheckboxSelectionModel({
		dataIndex: "numsendgroupid"
	});
	// ==================================================== 列头
	var cm = new Ext.grid.ColumnModel([{
		header: "实际发送量",
		tooltip: "实际发送量",
		dataIndex: "nummtcnt",
		sortable: true
	}, {
		header: "成功量",
		tooltip: "成功量",
		dataIndex: "numrep_succnt",
		sortable: true
	}, {
		header: "未知状态",
		tooltip: "未知状态",
		dataIndex: "numrep_nocnt",
		sortable: true
	}, {
		header: "失败量",
		tooltip: "失败量",
		dataIndex: "numrep_faicnt",
		sortable: true
	}, {
		header: "成功率",
		tooltip: "成功率",
		dataIndex: "numsuc_rate",
		sortable: true,
		renderer: function(value){
		    if(value=="0.0000"){
		        return "0.00%";
		    }
		    else{
			    var rate = value*100;
			    return Math.round(rate*100)/100 +"%";
			    }
			}
	},{
		header: "状态",
		tooltip: "状态",
		dataIndex: "numresendcnt",
		sortable: true,
		renderer: function(value){
		    if(value=="-1"){
		        return "重发";
		    }
		    if(value=="0"){
			    return "原始";
		    }
		    if(value=="1"){
		    	return "原始(已重发)";
		    }

		}
	}, {
		header: "详情",
		tooltip: "详情",
		dataIndex: "numsendgroupid",
		renderer: function(value, meta, record, rowIndex, colIndex, store){
			var parcontentid="";
			//重发按钮  
			var recordData=record.data;
			if(recordData.numrep_faicnt>0 && recordData.numresendcnt==0 && recordData.numsendtype!=2 && recordData.numsendtype!=9)
			{
				parcontentid="&nbsp;&nbsp;<a href='#' id='Js.Center.SendSMS.DepartSendDetailsInfo.retransmission.aID_" + Js.Center.SendSMS.DepartSendDetailsInfo.numContentID + "' onclick='Js.Center.SendSMS.DepartSendDetailsInfo.retransmission(\"" + Js.Center.SendSMS.DepartSendDetailsInfo.numContentID +"\")'>重发</a>";
			}
            return "<a href='#' onclick='exportData(\"" + Js.Center.SendSMS.SendQueryURL+ "\",\"contentid=" + Js.Center.SendSMS.DepartSendDetailsInfo.numContentID + "&start=0&limit=-1&flag=loadErrorDetails\")'>下载</a>"+parcontentid;
		}
	}]);
	//==============================================================定义grid
	var departSendQueryinfoGrid = new WXTL.Widgets.CommonGrid.GridPanel({
	    title:"",
		//id: "departSendQueryinfoGridPanel",
		anchor: '99% 99%',
		width: 700,
		pageSize: _pageSize,
		needMenu: false,
		store: Js.Center.SendSMS.DepartSendDetailsInfo.Infostore,
		sm: sm,
		cm: cm,
		needRightMenu: false
	});
	
	
	var gridPanel = new Ext.Panel({
		width: 700,
		frame: true,
		bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
		items:[departSendQueryinfoGrid]
	});
	// ================================================================= 定义窗体
	var departSendDetailsInfoWin = new Ext.Window({
		title: "查看发送详细信息",
		width: 750,
		plain: true,
		iconCls: "addicon",
		// 不可以随意改变大小
		resizable: false,
		// 是否可以拖动
		// draggable : false,
		defaultType: "textfield",
		labelWidth: 80,
		collapsible: true, // 允许缩放条
		closeAction: 'hide',
		closable: true,
		plain: true,
		// 弹出模态窗体        
		modal: 'true',
		buttonAlign: "center",
		bodyStyle: "padding:10px 0 0 15px",
		items: [gridPanel, departSendDetailsInfoPanel],
		listeners: {
			"show": function(){
				// 当window show事件发生时清空一下表单
				departSendDetailsInfoPanel.getForm().loadRecord(row);
				
			}
		},
		buttons: [{
			text: "关  闭",
			minWidth: 70,
			handler: function(){
				departSendDetailsInfoWin.hide();
			}
		}]
	
	});
	// ================================================================== 执行显示
//}
	//短信重发 
	   Js.Center.SendSMS.DepartSendDetailsInfo.retransmission=function(ctid)
	   {
			Ext.Msg.confirm('温馨提示','该功能会导致相关统计信息和额外的费用，而且该功能只能使用一次!',
			  function(btn){
	            if (btn == "yes") {
	            	var params={
	            		contentid:ctid,
	            		flag:"flagReSend"
	            	};
	            	//异步执行存储过程
	            	doAjax(Js.Center.SendSMS.SendQueryURL, params);
	            	//隐藏重发按钮
	            	var reSendID="Js.Center.SendSMS.DepartSendDetailsInfo.retransmission.aID_" + ctid;
	            	Ext.get(reSendID).setVisible(false);
	            	//提示
	            	Ext.Msg.alert('温馨提示','重发功能将在后台执行，请过几分钟后查看重发结果!');
	            }
	        });
	    };
		//短信重发
	departSendDetailsInfoWin.show();
};
