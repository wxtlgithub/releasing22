Ext.namespace('Js.Center.System');Js.Center.System.SpecialMobileURL='URL/system/tlspecialmobile/tlspecialmobilequery.ashx';Js.Center.System.SpecialMobileUpdateURL='URL/system/tlspecialmobile/tlspecialmobileupdate.ashx';Ext.namespace('Js.Center.System.SpecialMobileAdd');Js.Center.System.SpecialMobileAdd.func=function(){var AddtlspecialmobileInfofp=new Ext.form.FormPanel({frame:true,labelWidth:80,layout:'form',defaultType:"textfield",defaults:{anchor:"90%",msgTarget:"side"},buttonAlign:"center",bodyStyle:"padding:10px 0 10px 15px",items:[{xtype:"hidden",name:"flag",value:"insert"},{xtype:"combo",name:"numsvcid",fieldLabel:"<font color=red>通道</font>",hiddenName:"numsvcid",readOnly:true,mode:"local",typeAhead:true,triggerAction:'all',selectOnFocus:true,emptyText:'-=请选择=-',allowBlank:false,blankText:"通道不允许为空",displayField:"vc2svcname",valueField:"numsvcid",store:Js.Center.Common.ServiceCodeStore},{xtype:'textarea',name:'mobilelist',fieldLabel:getHelpMsg("手机号码",true,"1、每行一个手机号码，以回车换行<br>2、最多可输入100行<br>3、示例：<br>13800000000<br>13900000000"),width:300,height:200,allowBlank:false,blankText:"请输入手机号码列表",maxLength:2000,maxLengthText:"请将输入内容控制在100行以内！",validator:function(value){return checkMobileList(value,100)}}]});var mainForm=AddtlspecialmobileInfofp.getForm();this.window=new WXTL.Widgets.CommonWindows.Window({title:"添加特殊手机号码",mainForm:mainForm,updateURL:Js.Center.System.SpecialMobileUpdateURL,displayStore:Js.Center.System.SpecialMobile.Infostore,items:[AddtlspecialmobileInfofp]})};Ext.namespace('Js.Center.System.SpecialMobileDelete');Js.Center.System.SpecialMobileDelete.func=function(row){var deleteSplit="";for(var i=0;i<row.length;i++){if(row.length==1){deleteSplit=row[i].data.vc2mobile}else{if(i<(row.length-1)){deleteSplit=row[i].data.vc2mobile+","+deleteSplit}if(i==(row.length-1)){deleteSplit=deleteSplit+row[i].data.vc2mobile}}};var params={ids:deleteSplit,flag:"delete"};doAjax(Js.Center.System.SpecialMobileUpdateURL,params,Js.Center.System.SpecialMobile.Infostore)};Ext.namespace('Js.Center.System.SpecialMobile');Js.Center.System.SpecialMobile.info=function(node){Js.Center.Common.ServiceCodeStore.reload();if(Ext.get("Js.Center.System.SpecialMobile.SpecialMobilePanel")==null){var _pageSize=12;var fields=["vc2mobile","numsvcid","vc2svcname","vc2desc","createtime","creator","createorname"];Js.Center.System.SpecialMobile.Infostore=new WXTL.Widgets.CommonData.GroupingStore({proxy:new Ext.data.HttpProxy({url:Js.Center.System.SpecialMobileURL,method:"POST"}),reader:new Ext.data.JsonReader({fields:fields,root:"data",id:"vc2mobile",totalProperty:"totalCount"}),sortInfo:{field:'createtime',direction:"DESC"},baseParams:{tlspecialmobile:'',serviceid:'',flag:'selectbykey'}});Js.Center.System.SpecialMobile.Infostore.load({params:{start:0,limit:_pageSize,tlspecialmobile:'',serviceid:'',flag:'selectbykey'}});var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:"vc2mobile"});var cm=new Ext.grid.ColumnModel([sm,{header:"手机号码",tooltip:"手机号码",dataIndex:"vc2mobile",sortable:true},{header:"通道名称",tooltip:"通道名称",dataIndex:"vc2svcname",sortable:true},{header:"创建时间",tooltip:"创建时间",dataIndex:"createtime",sortable:true},{header:"创建者",tooltip:"创建者",dataIndex:"creator",sortable:true}]);var specialMobileGrid=new WXTL.Widgets.CommonGrid.GridPanel({anchor:'100% 100%',pageSize:_pageSize,needMenu:false,store:Js.Center.System.SpecialMobile.Infostore,afterEditURL:Js.Center.System.SpecialMobileUpdateURL,inertMethod:'Js.Center.System.SpecialMobileAdd',deleteMethod:'Js.Center.System.SpecialMobileDelete.func',autoScroll:true,sm:sm,cm:cm,tbar:new Ext.Toolbar({items:[{iconCls:'addicon',text:"添加",handler:function(){specialMobileGrid.doInsert()}},"","-","",{text:"删除",iconCls:"deleteicon",handler:function(){specialMobileGrid.doDelete()}}]})});var selectPanel=new WXTL.Widgets.CommonPanel.QueryFormPanel({height:110,queryMethod:"Js.Center.System.SpecialMobile.queryGrid",items:[{layout:'column',items:[{columnWidth:.5,layout:'form',defaultType:"textfield",defaults:{anchor:"90%",msgTarget:"side"},buttonAlign:"center",bodyStyle:"padding:10px 0 10px 15px",items:[{xtype:"textfield",fieldLabel:'手机号码',name:'vc2name',id:'Js.Center.System.SpecialMobile.Mobile',regex:WXTL.Common.regex.Mobile,regexText:'请输入正确的手机号码'}]},{columnWidth:.5,layout:'form',defaultType:"textfield",defaults:{anchor:"90%",msgTarget:"side"},buttonAlign:"center",bodyStyle:"padding:10px 0 10px 15px",items:[{xtype:"xComboBox",name:"numsvcid",fieldLabel:"通道",hiddenName:"Js.Center.System.SpecialMobile.NumSvcid",readOnly:true,mode:"local",displayField:"vc2svcname",valueField:"numsvcid",triggerAction:"all",emptyText:'-=请选择=-',store:Js.Center.Common.ServiceCodeStore}]}]}]});Js.Center.System.SpecialMobile.queryGrid=function(){if(selectPanel.getForm().isValid()){var _mobile=Ext.get("Js.Center.System.SpecialMobile.Mobile").getValue();var _svcid=Ext.get("Js.Center.System.SpecialMobile.NumSvcid").getValue();var _flag='selectbykey';Js.Center.System.SpecialMobile.Infostore.baseParams={tlspecialmobile:_mobile,serviceid:_svcid,flag:_flag};Js.Center.System.SpecialMobile.Infostore.load({params:{start:0,limit:_pageSize}})}};Js.Center.System.SpecialMobile.SpecialMobilePanel=new Ext.Panel({frame:true,id:"Js.Center.System.SpecialMobile.SpecialMobilePanel",bodyBorder:false,border:false,autoScroll:true,layout:"anchor",defaults:{collapsible:true},items:[selectPanel,specialMobileGrid]})};GridMain(node,Js.Center.System.SpecialMobile.SpecialMobilePanel,"openroomiconinfo","Js.Center.System.SpecialMobile.Infostore")};