/**
 * Created by yelingfeng on 2016/7/20.
 */
import Util from "util/zUtil"
import {getChartView} from "./../api"
import RC from "util/ResourcesConfig"
import _ from "lodash"
import zParameter from "components/zParameter"
const Zlay = {

    Zids : [],		// ID缓存数组
    Z : {},			// 对象缓存
    curComponent : null, // 当前组件

    isRunTime: true ,
    editorView : false,

    common : {
        /**
         * 根据ZID获取对象
         */
        getCurrentObj(zid){
            return Zlay.common.getCurrentZ()[zid];
        },

        // 获取当前Z缓存对象
        getCurrentZ(){
            return Zlay.isRunTime ? Zlay.Z : Zlay.Z;
        },

        /**
         * 时间粒度转换
         */
        getTimeType (timetype){
            var tt ;
            switch(timetype){
                case "quarter":tt = "1" ;
                    break;
                case "hour":tt = "2";
                    break;
                case "date":tt = "3";
                    break;
                default: tt = "1" ;break;
            }
            return tt;
        },

        /**
         * 加载数据新方法
         * @new
         * @param option  参数 [datasets]
         * @param callback 回调
         */
        //TODO
        loadDataSource(option,callback){
            var _this = Zlay.common;
            var datasets = option.datasets;
            if(datasets == null){
                return console.info("没有获得配置数据源---> datasets is null");
            }
            // 查询参数
            var _gparams_ =  zParameter.getParams();
            // 时间刻度单独传
            var datetimeKeys ={};
            datetimeKeys[zParameter.COMP_NAME.STIME] = 1;
            datetimeKeys[zParameter.COMP_NAME.ETIME] = 1;
            datetimeKeys[zParameter.COMP_NAME.TIMETYPE] = 1;

            datasets.forEach(function(ds){
                _loadDdata_(ds,callback);
            });

            function _loadDdata_(op,callback){
                var paramSql = op.sql;
                // 包括了级联和查询参数
                var paramStrArray = _.clone(op.paramStr);
                var type = op.type;
                var page = 1;
                var rows = op.rows;
                if(paramSql == ''){
                    return ;
                }

                var newArr = [];

                var searchKeys = {};
                var mainSearchKeys = {};
                _gparams_.forEach(function(it){
                    searchKeys[it.name] = 1;
                });

                paramStrArray.forEach(function(it){
                    if(searchKeys[it.name]){
                        mainSearchKeys[it.name] = 1;
                    }
                });

                // 组件查询参数没有  并且查询参数有值
                if(Object.keys(mainSearchKeys).length == 0 && Object.keys(searchKeys).length >0 ){
                    newArr = paramStrArray.concat(_gparams_)
                }else{
                    paramStrArray.forEach(function(mainParam){
                        var name = mainParam.name;
                        // 过滤paramStr里面的参数 把zParameter里面的参数传进去
                        _gparams_.forEach(function(it){
                            if(it.zid == mainParam.zid && it.name == name){
                                mainParam.value =it.value;
                            }
                        });
                        newArr.push(mainParam);
                    });
                }



                //处理子窗体全局参数
                if(Object.keys(zParameter.parameter2).length){
                    var p2 = _.clone(zParameter.parameter2);
                    var p2Arr = [];
                    for(var k in p2){
                        var param2 = p2[k];
                        p2Arr.push({name:k,value:param2.value});
                    }
                    newArr = newArr.concat(p2Arr);
                }

                var reg = /^__key1$|^__key2$|^__key3$|^__key4$|^__key5$/;
                newArr = _.filter(newArr, function(n) {
                    return !reg.test(n.name);
                });

                // 自定义参数key1-5
                if(Object.keys(zParameter.custormParam).length){
                    var keys = Object.keys(zParameter.custormParam);
                    var keyArr = [];
                    keys.forEach(function(key){
                        var v = Util.getUrlString(key);
                        if(v!=null && v!=''){
                            keyArr.push({name:key,value:v});
                        }
                    })
                    if(keyArr.length)newArr = newArr.concat(keyArr)
                }

                newArr = Util.arrayUniqueAttr(newArr,"name");


                newArr.forEach(function(it){
                    delete it.createTime;
                    delete it.createUser;
                    delete it.moduleId;
                    delete it.id;
                    // delete it.zid;
                    // delete it.labelName;
                    delete it.sortIndex;
                    delete it.labelName;
                    delete it.datatype;
                    delete it.baseValue;
                    delete it.datasourceId;
                    if(!it.value){
                        it.value = "";
                    }
                });


                if(typeof(newArr) != "string"){
                    newArr = JSON.stringify(newArr);
                }

                getChartView({
                    "sql":op.sql,
                    "datasourceId":op.datasourceId,
                    "paramStr": newArr,
                    "type":type,// 1: 数据源 2：动态标题
                    "page":page,
                    "rows":rows,
                    "sqlType":op.sqlType
                }).then((reply) =>{
                    console.log(reply)
                    //if($.isFunction(callback)){
                    //    callback(reply,type);
                    //}
                },(fail)=>{
                    console.log(fail)
                });
            }
        },


        //获取指定节点 -> 子节点组件对象
        /**
         * A-
         *   -b
         *     -c
         *  获取b往下的所有子节点数据源(Zlay.Z)
         */
        getTreeChildComp(zid){
            var obj = {};
            var core = Zlay.isRunTime? Zlay.zViewCommon.V : Zlay.Z;
            var temp = [];
            for(var id in Zlay.treeDataObj){
                lookD(Zlay.treeDataObj[id])
            }
            addObj(zid,temp);
            // 查询源
            function lookD(obj){
                obj.forEach(function(it){
                    if(it.zid == zid){
                        temp.push(it.childList);
                    }else{
                        lookD(it.childList);
                    }
                });

            }
            // 添加对象 源
            function addObj(id,child){
                obj[id] = core[id];
                if(child && child.length){
                    child.forEach(function(it){
                        it.forEach(function(c){
                            addObj(c.zid,c.childList);
                        })
                    });
                }
            }
            return obj;
        },

        // 解析属性结构菜单
        loadTreeComponents(config){
            var rootDataObj = {};
            var allDataObj = {};
            // 所有一级节点遍历
            var buildTree = function(childList){
                childList.forEach(function(obj){
                    rootDataObj[obj.zid] = obj.childList;
                });
            }

            // 所有节点遍历  方便可以掉到中间某及节点
            var buildAll =  function(childList){
                childList.forEach(function(obj){
                    allDataObj[obj.zid] = obj.childList;
                    if(obj.childList && obj.childList.length){
                        buildAll(obj.childList);
                    }
                });
            }

            if(config && typeof config == "object"){
                buildTree(config);
                buildAll(config);
            }
            Zlay.treeDataObj = rootDataObj;
            Zlay.allDataObj = allDataObj;
        },


        // VIEW时候 子窗体弹出方法
        //TODO
        openLayer (option){

            var w = option.w ;
            var h = option.h ;
            var bgColor = option.bgColor;
            var id = option.zid;
            var boxCls = "zChildWinWapperView";
            var compName = option.compName;
            var cascadeOp = option.casecadeOp;

            var cpClass = zCPCommon._CacheObj_[id] ;
            if(!cpClass && cpClass.componentData){
                return ;
            }

            //弹出
            layer.open({
                type: 1,
                title : "",
                area: [w +"px" , h + "px" ],
//					    move :"."+boxCls,
//					    moveType : 1,
                shade: [0.01, '#000'],
                shadeClose :false,
                content: "<div class='"+boxCls+"'></div>",
                success : function(layero,index){
                    Zlay.editorView = true;
                    var box = layero.find("."+boxCls);
                    box.css({
                        width:w,
                        height:h
                    });
//					    	// 获得窗体设置颜色
                    layer.style(index, {
                        "background-color": bgColor
                    });
                    var componentData = cpClass.componentData;
                    if(componentData){
                        var buildConfig = Zlay.common.buildPanelConfig(componentData);
                        var ids = [];

                        var zSearchObj = [];
                        buildConfig.forEach(function(obj){
                            obj.zid = obj.id;
                            obj.appendTo = box;
                            obj.isView = true;
                            delete obj.id;

                            if(obj.type == RC.ZCOMP_TYPE.OTHER){
                                obj.css.width = w;
                                obj.css.height = h;
                                obj.css.left = 0 ;
                                obj.css.top = 0;
                            }
                            // 子窗体标题偏移处理
                            if(obj.type == RC.ZCOMP_TYPE.TEXT){
                                obj.css.top = obj.css.top>=50 ? obj.css.top- 50:0;
                            }
                            Zlay._createComponent(obj);
//									 if(zParameter.isHas(obj.zid)){
//										 zSearchObj.push(obj.zid);
//									 }
                            ids.push(obj.zid);
                        });
                        var obj = {};
                        for(var k in Zlay.zViewCommon.V){
                            ids.forEach(function(it){
                                if(it == k){
                                    obj[k] = Zlay.zViewCommon.V[k];
                                }
                            });
                        }
                        for(var o in obj){
                            box.find(RC.ZElEMENT_SPAN).hide();
                            box.find("."+RC.ZELEMENT_COMPONENT_CLS).css("cursor","default");
                        }

//								zSearchObj.forEach(function(zid){
//									 var obj = me.common.getCurrentObj(zid);
//									 obj.loadDataSource()
//								})

                        Zlay.comboCascade(compName,cascadeOp);
                        // 子窗体缓存级联父图数据
                        Zlay.childCascdeOp = {name:compName,op:cascadeOp};
                    }
                },
                end  : function(){
                    //me.destoryView();
                    Zlay.editorView = false;
                }
            });

        },


        /**
         * 得到一组组件的对象数据
         * @param objs
         * @returns
         */
        getComponentDataArray(objs){
            var arr = [];
            for(var k in objs){
                arr.push(Zlay.common.getComponentData(objs[k]));
            }
            return arr;
        },

        /**
         * 子窗体保存 记录子窗体查询条件parameter
         */
        //TODO
        getWindowParameterData(objs){
            var paramArr = [];
            for(var k in objs){
                var obj = objs[k];
                if(obj.option.componentType == RC.ZCOMP_TYPE.SEARCH){
                    var v = obj.getValue();
                    // 如果是时间轴
                    if(obj.option.component.childType == RC.Z_SEARCH_COMPONENT.TIME_PICKER){

                    }
                    paramArr.push(v);
                }
            }
            return paramArr;
        },

        /**
         *  获取当前组件级联的父图数据
         *  @param comp 组件对象
         * @returns
         */
        getCascadePData(comp){
            var cascadeStr = comp.myOption.content.cascade;
            var arr = [];
            if(cascadeStr!=null&& cascadeStr!=""){
                var cArr = cascadeStr.split(",");
                cArr.forEach(function(cascade){
                    var compName = cascade.split(".");
                    var compObj = Zlay.getComponentByCodeName(compName[0]);
                    var lastData ;
                    if(compObj!=null){
                        if(compObj.myOption.content.chartType == 'line'){
                            lastData = window._echart_line_hoverData_X;
                        }else{
                            lastData = compObj.myOption.lastData;
                        }
                        arr.push({
                            name : cascade,
                            content : compObj ? lastData : []
                        })
                    }
                })

                return arr;
            }

        },
        /**
         * 初始化组件级联参数值
         * @param comp
         * @returns
         */
        initSetCompCascadeData(comp){
            // 取最后一条级联父图的数据
            var lastData = Zlay.common.getCascadePData(comp);
            var datasets = comp.myOption.content.datasets;
            if( lastData !== undefined){
                var cascadeArr = {}
                var cascadeParams = [];
                lastData.forEach(function(data){
                    var name = data.name;
                    var columnName = name.split(".")[1];
                    columnName= columnName.toLowerCase();
                    var content = data.content;
                    if(content!=null){
                        var value = content[columnName];
                        if(columnName == "name" && value == undefined){
                            value = data.content.label;
                        }
                        cascadeArr[name] =value ;
                        cascadeParams.push({name:name,value:value});
                    }
                });
                comp.option.CascadeCache =cascadeParams;
                datasets.forEach(function(ds){
                    if(ds.paramStr){
                        ds.paramStr.forEach(function(_param){
                            for(var key in cascadeArr){
                                if(_param.name == key){
                                    _param.value = cascadeArr[key];
                                }
                            }
                        })
                    }
                });

            }
        },



        /**
         * 获取组件对象
         * @param obj
         * @returns
         */
        //TODO
        getComponentData(obj){

            // 根据级联字段 创建横向级联PID 关系
            var setPid2Array = function(cascade){
                var result = [];
                var keyObj = {};
                if(cascade){
                    var arr1 = cascade.split(",");
                    var arr2 = [];
                    if($.isArray(arr1)){
                        arr1.forEach(function(it){
                            arr2.push(it.split(".")[0]);
                        });
                    }
                    if(arr2.length){
                        arr2.forEach(function(it){
                            var id = Zlay.getCompIdByName(it);
                            if(!keyObj[id]){
                                result.push(id);
                            }
                            keyObj[id] = 1;
                        })
                    }
                }

                if(result.length){
                    return result.join(",");
                }else{
                    return "";
                }

            };


            // 数据属性
            var getDataProperty = function(obj){

                var ds = obj.option.datasets;
//						if($.isArray(ds)){
//							ds.forEach(function(it){
//								 if(it.paramStr){
//									 it.paramStr.forEach(function(param){
//										 //param.value = "";
//									 });
//								 }
//							});
//						}
                return ds;
            };
            // 获取contents属性
            var getContentProperty = function(obj){
                var prop = {},

                    ctype = obj.option.componentType;
                switch(ctype){
                    case RC.ZCOMP_TYPE.TEXT :
                        prop.content = obj.getValue();
                        prop.childType = obj.option.isMulti ; // true false
                        prop.clsName  = obj.getClsName();
                        break;
                    case RC.ZCOMP_TYPE.CHART :
                        prop.chartObj = {
                            data : obj.option.data,
                            dataOpton : obj.option.dataOption ,
                            clickEvent : obj.option.clickEvent
                        },
                            prop.chartType = obj.option.chartType; // pie bar line..
                        prop.childType = obj.option.childType;
                        break;
                    case RC.ZCOMP_TYPE.TABLE :
                        prop.chartType = obj.option.tableType;
                        break;
                    case RC.ZCOMP_TYPE.SEARCH :
                        prop.childType = obj.option.component.childType;
                        break;
                    case RC.ZCOMP_TYPE.DATERANGE:
                        break;
                    case RC.ZCOMP_TYPE.OTHER :
                        prop.content = obj.getValue();
                        prop.chartType = obj.option.chartType;
                        break;
                    default :;
                }
                prop.type = ctype;
                prop.chartCategory = obj.option.chartCategory;
                prop.cascade = obj.option.cascade;

                prop.datasets = getDataProperty(obj);
                return prop;
            };
            var prop = {},
                boxObj =obj,
                $box = boxObj.box ,
                offset = $box.offset(),
                w =  $box.width(),
                h = $box.height(),
                opacity = boxObj.getOpactiy();


            prop.zid = $box.attr("id");
            prop.child = boxObj.option.child;
            prop.code = boxObj.getName();
            prop.titleName = boxObj.getTitleName();
            //右侧属性存储值
            /*prop.props = {
             title:boxObj.getTitleProps(),
             };*/
            prop.props = boxObj.getAllProps(),
                prop.remark= boxObj.getRemark();
            prop.grapping = boxObj.option.grapping;
            prop.levelIndex = parseInt($box.css("z-index"),10);
            prop.visible = boxObj.option.isChild ?  0 : 1; // 子窗体为0
            // 存maxNum当前组件最大值
            prop.grapping = boxObj.option.maxNum;

            var CpClass = zCPCommon._CacheObj_[prop.zid];
            //TODO
            // 是否含有子面板数据
            if(CpClass){
                var saveObj = CpClass.getSave();
                prop.childrenData = saveObj.componentData || [];
                prop.childSize = saveObj.childSize;
                prop.parameterData = saveObj.parameterData;
                if(prop.parameterData && prop.parameterData.length){
                    // 时间轴参数处理
                    if(obj.option.component.type == RC.Z_SEARCH_COMPONENT.TIME_PICKER){
                        zParameter.syncParamTime(prop.zid,prop.parameterData);
                    }else{
                        prop.parameterData.forEach(function(it){
                            zParameter.syncParam(it);
                        })

                    }
                }
            }


            // 是子窗体 创建PID
            if(prop.visible == 0){
                prop.pid = zCPCommon.getParentZid(prop.zid);
            }

            prop.coordinate = {
                x : offset.left,
                y : offset.top,
                width:w,
                height:h,
                opacity : opacity
            };
            $box.removeClass("ele-focus");
            var _class = $box.attr("class");
            prop.border = _class.indexOf("border-")>-1 ? _class.substring(_class.indexOf("border-"),_class.length) : "";
            prop.content = getContentProperty(obj);
            prop.pid2 = setPid2Array(prop.content.cascade);
            prop.clsName = prop.content.clsName;
            delete prop.content.clsName;

            return prop;
        },

        //  构建面板参数    通过component 配置
        buildPanelConfig(components){
            var dataStore =[]
            if(components){
                components.forEach(function(comp){
                    var _type =  comp.content ==null ? 0 : comp.content.type;
                    var ctype = _type;
                    var dataObj = {
                        id  : comp.zid ,
                        type : ctype,
                        name : comp.code,
                        title : comp.titleName || "",
                        css : {
                            width : parseInt(comp.coordinate.width,10),
                            height : parseInt(comp.coordinate.height,10),
                            top : parseInt(comp.coordinate.y,10),
                            left :parseInt( comp.coordinate.x,10),
                            opacity : parseInt(comp.coordinate.opacity,10)
                        },
                        border : comp.border,
                        child : comp.child,
                        maxNum : comp.grapping,
                        childSize: comp.childSize,
                        visible : parseInt(comp.visible,10),
                        isChild : comp.visible == 0 ? true : false,
                        zIndex :  parseInt(comp.levelIndex,10),
                        remark : comp.remark,
                        pid : comp.pid,
                        zid : comp.zid,
                        component : {
                            type  :ctype,
                            chartType : comp.content.chartType,
                            childType : comp.content.childType,
                            tableType : comp.content.chartType,
                            chartCategory :comp.content.chartCategory,
                            cascade : comp.content.cascade,
                            datasets : comp.content.datasets,
                            textType : comp.clsName,
                            isMulti : comp.childType,
                            content:  comp.content,
                            props: comp.props,
                            titleName: comp.titleName,
                            data :  []
                        }

                    };
                    if(dataObj.type == RC.ZCOMP_TYPE.TEXT){
                        dataObj.component.titleName = comp.content.content;
                    }
                    if(dataObj._type == RC.ZCOMP_TYPE.TEXT){
                        dataObj.component.data = {
                            content :  comp.content.content
                        }
                    }
                    dataStore.push(dataObj);

                });
            }

            return dataStore;

        },

        //TODO
        // 处理子面板数据 设置到子面板 返回非子面板dataStore
        setChildConfig(datas){
            var childData = [];
            var Ds = [];
            var _temp = [];

            var wrap = Zlay.isRunTime ? $("#zlayoutCenterView") : zCore._wapper ;
            if(datas.length){
                for(var i = 0;i<datas.length ; i++){
                    var d = datas[i];
                    if(d.pid!==''){
                        _temp.push(d);
                        continue;
                    }
                    Ds.push(d);
                }
                if(Ds.length){
                    // 处理子面板数据
                    Ds.forEach(function(it){
                        var zid = it.zid;
                        var childDs = [];
                        _temp.forEach(function(child){
                            if(child.pid == zid){
                                childDs.push(child);
                                zCPCommon._ParentZid_[child.zid] = zid;
                            }
                        });

                        if(childDs.length){
                            var config = {
                                pid : zid,
                                width :  it.childSize?  it.childSize.width :$(window).width(),
                                height : it.childSize?  it.childSize.height : $(window).height(),
                                name : it.code,
                                bg : it.childSize ?it.childSize.bgColor :"",
                                wrap : wrap
                            };
                            var cpClass = zCPCommon._createCp(config);
                            cpClass.componentData = childDs;
                            cpClass.panelOp = it.childSize;
                            cpClass.box.hide();
                            zCPCommon._CacheObj_[zid] = cpClass;
                        }

                    });
                }
            }

            return Ds;
        },

        //TODO 入口
        initConfig :function (){
            if(Zlay.pConfig){

                Zlay.common.loadTreeComponents( Zlay.pConfig.pid2TreeComponents);

                var components = Zlay.common.setChildConfig(Zlay.pConfig.components);
                var dataStore =Zlay.common.buildPanelConfig(components) ;

                zParameter.init(Zlay.pConfig.parameters);

                Zlay.buildData(dataStore);
                Zlay.renderInit();
            }
        },

        // 创建子窗体dialog
        createDialog(option){
            return Dialog(option);
        },
        // 设置数据配置
        setDataset(Data){
            for(var k in Zlay.Z){
                if(Data!=null && Data.id == k){
                    Zlay.Z[k].option.datasets =Data.datasets;
                    Zlay.Z[k].option.cascade =Data.cascade;
                    Zlay.Z[k].realtimeUpdateData();
                }
            }
        },

        // 清空状态
        clearCenterStatus(wapper){
            if(Zlay.isRunTime){
                return ;
            }

            if(wapper){
                // hide拖拽四周小框  移除element外框虚线
                wapper.find(RC.ZElEMENT_SPAN).hide().end().find(".zlayoutElement").removeClass(RC.ZElEMENT_ELE_FOCUS);

                if(Zlay.curObject && Zlay.curObject.resetLabel){
                    Zlay.curObject.resetLabel();
                    Zlay.curObject = null;
                }

                Zlay.curComponent = null;
                // hide右键
                $.smartMenu.hide();
                zCore.zToolbar.closeAllPopList();
            }

        },

        getFormObj(type,optCon){
            switch(type){
                case "1":
                    var opObj = new zDs_TextNumber(optCon);
                    break;
                case "2":
                    optCon.laydate={
                        format: 'YYYY-MM-DD'
                    }
                    var opObj = new zDs_Date(optCon);
                    break;
                case "8":
                    optCon.laydate={
                        format: 'YYYY-MM-DD hh:mm:ss',
                        istime: true
                    }
                    var opObj = new zDs_Date(optCon);
                    break;
                case "3":
                    var opObj = new zDs_Text(optCon);
                    break;
                case "4":
                case "5":
                case "6":
                case "7":
                    var opObj = new zDs_Select(optCon);
                    break;
                default:
                    break;

            }
            return opObj;
        },


        // 执行深度数据加载/
        /**
         * @param zid 组件
         * @param childList 子组件配置信息对象
         * @param dataSource 对应对象源
         */
        loadTreeData(zid,childList,dataSource){
            zid = Zlay.isRunTime? zid +"_view" : zid;
            var zObj = dataSource[zid];
            if(zObj){
                Zlay.common.initSetCompCascadeData(zObj);
                zObj.loadDataSource(function(){
                    if(childList && childList.length){
                        if(zObj && zObj.option.chartType == "line" &&  Zlay.common.validCurIfCascade(zid) ){
                            zObj.clickEchartLine();
                        }

                        childList.forEach(function(it){
                            var itObj = Zlay.common.getCurrentObj(it.zid);
                            Zlay.common.loadTreeData(it.zid,it.childList,dataSource);
                        });

                    }
                });
            }

        },
        //TODO
        renderInit(datas){
            if(datas ==null)return;
            for(var id in Zlay.treeDataObj){
                Zlay.common.loadTreeData(id,Zlay.treeDataObj[id],datas)
            }
        },

        // 查询
        renderSearch(){
            for(var id in Zlay.treeDataObj){
                Zlay.common.loadTreeDataView(id,Zlay.treeDataObj[id],Zlay.zViewCommon.V);
            }
        },


        loadTreeDataView(zid,childList,dataSource){
            var _zid = Zlay.isRunTime? zid +"_view" : zid;
            var zObj = dataSource[_zid];
            if(zObj){
                Zlay.common.initSetCompCascadeData(zObj);
                zObj.loadDataSource(function(){
                    if(childList && childList.length){
                        if(zObj && zObj.option.chartType == "line" && Zlay.common.validCurIfCascade(zid)){
                            zObj.clickEchartLine();
                        }else{
                            childList.forEach(function(it){
                                var itObj = Zlay.common.getCurrentObj(it.zid + "_view" );
                                Zlay.common.loadTreeDataView(it.zid,it.childList,dataSource);
                            });
                        }
                    }
                });
            }
        },

        // 判断当前组件是否为只有横向级联的父图
        validCurIfCascade(zid){
            var _id = zid.substring(0,zid.lastIndexOf("_"));
            // 查找横向级联子
            var lds = _.filter(Zlay.pConfig.components,function(obj){
                return obj.pid2 == _id && obj.pid !=obj.pid2;
            });
            return lds.length > 0 ;
        },

        /**
         * 执行全局查询 不刷新zid组件
         * @param zid
         * @returns
         */
        renderGlobalParamSearch(zid,Datas){
            var allObj = {};
            zid = zid.replace("_view","");

            var sourceObj ;
            // 新建时候没有treeDataObj 直接从全局缓存里取
            if(Zlay.treeDataObj == undefined){
                sourceObj = Datas;
            }else{
                sourceObj = Zlay.treeDataObj;
            }
            for(var id in sourceObj){
                if(zid !== id ){
                    allObj[id] = sourceObj[id];
                }
            }

            var Datas = zParameter.getShouldQueryObj(zid,Datas);
            if(Datas){
                for(var id in allObj){
                    Zlay.isRunTime?
                        Zlay.common.loadTreeDataView(id,allObj[id],Datas):
                        Zlay.common.loadTreeData(id,allObj[id],Datas)
                }
            }

        },

        //TODO
        /**
         * @param searchType 查询组价类型
         * @param param 携带的查询参数
         * 执行全局查询
         */
        makeGlobalSearch(searchType , param){
            var Z = Zlay.common.getCurrentZ();
            var zid = param.zid;


            var greg = new RegExp("/" + RC.Z_SEARCH_COMPONENT.TIME_PICKER+"|"+RC.Z_SEARCH_COMPONENT.SUBMITBUTTON +"/");
            // 如果是时间轴 或者 全局按钮
            if(greg.test(searchType)){

                Zlay.curSearchCompName = "timePicker";
                // 新建时候没有treeDataObj 直接从全局缓存里取
                if(Zlay.treeDataObj == undefined){
                    sourceObj = Zlay.Z;
                }else{
                    sourceObj = Zlay.treeDataObj;
                }
                var allObj = {};
                for(var id in sourceObj){
                    if(zid !== id ){
                        allObj[id] = sourceObj[id];
                    }
                }
                for(var id in allObj){
                    Zlay.isRunTime?
                        Zlay.common.loadTreeDataView(id,allObj[id],Z):
                        Zlay.common.loadTreeData(id,allObj[id],Z)
                }

            }else{
                Zlay.curSearchCompName = null;
                var Zs = {};

                var obj = {
                    NAME :param.labelName,
                    VALUE: param.value
                }

                Zlay.comboCascade(param.compName,obj);

                Zlay.common.renderGlobalParamSearch(zid,Z);
            }

        }

    },

    // 删除一组组件
    removeArray(ids){
        if(ids&& ids.length>0){
            ids.forEach(function(_id){
                for(var zid in Zlay.Z){
                    if(zid == _id){
                        Zlay.Z[zid].destory();
                    }
                }
            });
        }
    },

    // 删除控件
    remove (zid){
        var delIndex = 0;
        for(var i = Zlay.Zids.length-1;i>=0 ;i--){
            if(Zlay.Zids[i] == zid){
                delIndex = i;
                delete Zlay.Z[zid];
            }
        }
        Zlay.Zids.splice(delIndex,1);
        Zlay.curComponent = null;
        Zlay.curObject = null;
        zCore.zRight.clearStatus();
        //zCore.zRight.removeAttributes();//删除控件时 隐藏右侧属性区
    },
    resize(){
        var me = this;
        var Z = Zlay.common.getCurrentZ();
        for(var key in Z){
            Z[key].resizeBox();
        }
    },
    resizeH(){
        var me = this;
        var Z = Zlay.common.getCurrentZ();
        for(var key in Z){
            Z[key].resizeH();
        }
    },
    bindEvent(){
        var me = this;
        var center = Zlay.isRunTime ? $("body") : zCore._center;

        if(Zlay.isRunTime){
            this.zViewCommon.init();
        }
        center.on('click',function(e){
            Zlay.common.clearCenterStatus(center);
//					// 阻止事件传播
            if(Zlay.isRunTime){
                if($(".ui-popup").is(":visible") && window._SearchSelectObj_){
                    window._SearchSelectObj_.close()
                }
            }
            e.preventDefault();
            e.stopPropagation();
        });
    },
    get(zid){

        return Zlay.common.getCurrentObj(zid);
    },
    /**
     * 获取控件集合
     * @param zid
     * @returns
     */
    getComponentList (zid){
        var listObj = [];
        for(var key in Zlay.Z){
            if(key !== zid){
                listObj.push({ name : Zlay.Z[key].getName(), id : key});
            }
        }
        return listObj;
    },

    /**
     * 获取当前所有查询组件
     * @returns
     */
    getSearchCompList(zid){
        var arr =[];
        var Z = Zlay.common.getCurrentZ();
        for(var key in Z){
            var obj = Z[key] ;
            if(obj&& obj.option.componentType == RC.ZCOMP_TYPE.SEARCH && obj.option.id !=zid ){
                arr.push(obj);
            }
        }
        return arr;
    },


    /**
     * 根据codeName 获得组件对象
     */
    getComponentByCodeName (name){
        var _comp = null;
        for(var key in Zlay.Z){
            if(Zlay.Z[key].getName() == name ){
                _comp = Zlay.Z[key];
            }
        }
        return _comp;
    },

    /**
     * 根据Name 获组件ID
     */
    getCompIdByName(name){
        var id = null;
        var obj = Zlay.getComponentByCodeName(name);
        if(obj){
            id = obj.id;
        }
        return id;
    },
    //TODO
    /**
     * 级联组件loadData
     * @param obj  组件对象
     * @param keys
     * @param option
     * @returns
     */
    _CascadeLoadData(dsOption){
        var DS = [];
        var targetObj ;
        //查询关键字段
        var keys = RC.CASCADE_KEYS;
        dsOption.forEach(function(option){

            // 目标数据源
            if(targetObj == null){
                targetObj = option.targetObj;
            }
            // 级联字符串  A.NAME,A.XGROUP (父图的信息)
            var cascadeStr = option.cascadeStr;
            // 父图NAME{String}
            var pname  = option.name;
            // 级联时候的数据
            var data = option.data || {};
            // 子图param集合 {Array}|| [];
            var _param = [];
            // 级联数组[图表A.NAME,图表A.XGROUP,图表A.YGROUP,图表A.TIME]
            var _cascadeArray = cascadeStr.split(",");
            _cascadeArray.forEach(function(cascadeName){
                var componentName = cascadeName.split(".")[0];// 图表A,图表B
                var columnName = cascadeName.split(".")[1];// 级联字段NAME ,XGROUP,YGROUP....

                // keys 是固定字符串
                keys.forEach(function(key){
                    // 级联父图名称相同 并且 存在级联字段数据 并且是指定字段名称
                    if(componentName == pname && data[key]!=null && key == columnName ){
                        _param.push({name:cascadeName, value : data[key],datatype:3});
                    }
                });
            });

            if(_param.length > 0){
                targetObj.option.CascadeCache = _param;
            }

            //var paramArray = option.parameters;
            var paramArray = _.clone(zParameter.getParamView());
            _param = _param.concat(paramArray);
            var param = {
                "sql":option.sql,
                "datasourceId":option.datasourceId,
                "paramStr":_param,
                "type" : option.type
            }
            DS.push(param)
        })

        var id = targetObj.id;
        targetObj.loadDataSource(DS,function(){
            //targetObj._setBound();
            //targetObj.resizeComponent();
            // 执行当前子节点的数据
            // var childSource = Zlay.common.getTreeChildComp(id);
            //Zlay.common.loadTreeData(id,Zlay.allDataObj[id],childSource);
            // 继续级联
            targetObj.triggerData();

        });
    },

    /**
     * 级联子图方法
     * @param name 父图name
     * @param option 数据
     */
    //TODO
    comboCascade(name,option){
        var me = this;
        var ToT =  Zlay.isRunTime ? Zlay.zViewCommon.V :Zlay.Z;
        for(var key in ToT){
            var item =  ToT[key];
            if(item.getName() !== name){
                var cascadeStr = item.option.cascade;
                var dataSources = item.option.datasets;
                if(dataSources != null && cascadeStr!=null && cascadeStr !=='' && cascadeStr.indexOf(name)>-1){
                    var dsArray = [];
                    dataSources.forEach(function(ds){
                        dsArray.push({
                            cascadeStr: cascadeStr,
                            name: name,
                            type : ds.type,
                            sql :ds.sql,
                            datasourceId : ds.datasourceId,
                            data : option,
                            targetObj : item,
                            //parameters : Zlay.pConfig.parameters || []
                            //parameters : zParameter.getParams() || []
                        });

                    });
                    if(dsArray.length){
                        Zlay._CascadeLoadData(dsArray);
                    }

                }
            }
        }
    },


    getComponentNameByType(type){
        var name = "";
        switch(type){
            case RC.ZCOMP_TYPE.CHART:
                name = "图表" ;
                break;
            case RC.ZCOMP_TYPE.TEXT:
                name = "文本";
                break;
            case RC.ZCOMP_TYPE.TABLE:
                name = "表格";
                break;
            case RC.ZCOMP_TYPE.SEARCH:
                name = "查询";
                break;
            case RC.ZCOMP_TYPE.DATERANGE:
                name = "时间段";
                break;
            case RC.ZCOMP_TYPE.OTHER:
                name = "特殊";
                break;
        }
        return name;
    },


    // 系统生成控件名称 根据类型
    getBoxName(type){
        var name = Zlay.getComponentNameByType(type);

        var len  = Zlay.getComponentTypeNum(type) ;
        // 获取字母
        var codekey = Util.getCharCode(len + 1);

        // 处理下重名问题
        codekey = Zlay.handlerCodekey(codekey)

        name += codekey ;

        return {
            name: name,
            num : len + 1
        }
    },
    // 根据组件类型 取组件中最大的值+1
    getComponentTypeNum(type){
        var num = 0;
        var maxArray = [0];
        for(var key in Zlay.Z){
            var obj = Zlay.Z[key];
            if(obj.option.componentType == type){
                maxArray.push(obj.option.maxNum);
            }
        }
        num = Math.max.apply(null,maxArray);
        return num;
    },

    /**
     * 获取创建的element数据
     *
     */
    //TODO
    getData(){
        var me = this;
        // box 容器属性
        var getzBoxProperty = function(){
            var props = {
                    "name": "",
                    "styleid": "",
                    "bkimg": "",
                    "desc" : ""
                },
            // 面板和底板属性
                zWinObj = zCore.zToolbar.getWinPanelData();
            var isWin = false;
//					if(zWinObj.title != null && zWinObj.title != ''){
//						isWin = true;
//					}
            if(zCore.zToolbar.$winHeader.is(":visible")){
                isWin = true;
            }

            props.bkcolor =zWinObj.color;
            /*props.components = {
             "props":{
             "title":me.getTitleProps()
             }
             };*/
            props.transparency = zWinObj.opacity;
            props.parttern =  isWin ? 1 : 0 ; // 存在窗体对象是1
            props.size = {
                min : zWinObj.minBtn,
                max : zWinObj.maxBtn,
                title : zWinObj.title,
                height : zCore._center.height() - 50,
                width : zCore._center.width()
            };

            return props;
        };

        // 参数
//				var getParamProperty = function(){
//					//return Zlay.pConfig.parameters;
//					return zParameter.getParams();
//				};

        var zData = {};
        zData = getzBoxProperty();

        var comps = [];
        var compArray = Zlay.common.getComponentDataArray(Zlay.Z);

        var keys = {};
        compArray.forEach(function(it){
            // 遍历子面板
            if($.isArray(it.childrenData)){
                if(it.childrenData.length){
                    it.childrenData.forEach(function(com){
                        if(!keys[com.zid]){
                            comps.push(com);
                        }
                    })
                }
            }
            if(it.visible == 1){
                comps.push(it);
            }
            keys[it.zid] = 1;
        });


        zData.components = comps;
        var _pts = zParameter.getParams();

        _pts.forEach(function(it){
            if(it.name == zParameter.COMP_NAME.TEXT){
                it.value = "";
            }
        })
        zData.parameters = _pts;

        return zData;
    },

    // 加载数据
    buildData : function(datas){

        datas.forEach(function(d){
            Zlay.buildBox(d);
        });
        zCore._center.find(RC.ZElEMENT_SPAN).hide();
    },

    buildBox(obj){

        obj.zid = obj.id;
        obj.appendTo = zCore._center;
        delete obj.id;

        Zlay._createComponent(obj);
    },
    renderInit(){
        Zlay.common.renderInit(Zlay.Z);
    },

    closeLayer(){
        layer.closeAll();
    },


    /**
     * 级联空字段
     */
    createCascadeEmpty(){
        var option = {};
        var cascadekeys = RC.CASCADE_KEYS;
        cascadekeys.forEach(function(it){
            option[it] = "";
        });

        option.NAME1 = " ";
        option.NAME2 = " ";
        return option;
    },

    /**
     *  需求是想要有数据的时间点 级联 而不是最后一个数据.
     * 因为这个图是特殊图 不走统一处理函数  ,协商后SQL传一个flag列标记 判断有标记flag=1的时间点为级联数据 而不是最后一条数据 ...
     * 所有这个方法目的 就是data中有flag=1的找出来返回那条数据
     * @param data{Array}
     */
    handerLineFlagData(){
        var wantData =null;
        if(data && data.length){
            // 倒叙取第一个 后台传了一组flag=1的
            wantData = _.findLast(data,function(it){
                return it.flag == 1;
            })
        }
        return wantData;
    }

}


export default Zlay