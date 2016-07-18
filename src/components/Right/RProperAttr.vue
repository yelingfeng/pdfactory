<template>
<strong class="nav_c_title">专有属性</strong>
	<div>
		<ul class="baseAttr" rel="specialBar">
			<li class="propDpyNone">    
			    <span class="compLabelName">柱形颜色：</span>
				<div class="compName" id="barColor"></div>
			</li>
			<li class="propDpyNone">
				<div class="lineBox">   
				    <span class="compLabelName">坐标：</span>
					<select class="baseAttrSelect specialAxis" prop-type="specialAxis">
						<option v-for="coordinate in coordinates" dataval="{{coordinate.dataval}}" value="{{coordinate.value}}">{{coordinate.text}}</option>
					</select>
				</div>
			</li>
			<li prop-type="barAxis">
				<div class="lineBox">
					<div>
					    <span class="compLabelName">横轴名称：</span>
						<input class="w122" type="text" valname="xName">
					</div>
					<div class="m_t_5 fl">
					    <span class="compLabelName">横轴单位：</span>
						<input class="w122" type="text" valname="xUnit">
					</div>
				</div>
				<div class="lineBox">
					<div>
					    <span class="compLabelName">左纵名称：</span>
						<input class="w122" type="text" valname="ylName">
					</div>
					<div class="m_t_5 fl">
					    <span class="compLabelName">左纵单位：</span>
						<input class="w122" type="text" valname="ylUnit">
					</div>
				</div>
				<div class="lineBox" showid="bar-specialAxisInput3">
					<div>
					    <span class="compLabelName">右纵名称：</span>
						<input class="w122" type="text" valname="yrName">
					</div>
					<div class="m_t_5 fl">
					    <span class="compLabelName">右纵单位：</span>
						<input class="w122" type="text" valname="yrUnit">
					</div>
				</div>
			</li>
			<li prop-type="barAxisVal" id="barMM">  
			    <dt class="f12_2f5a93 t_align_l">坐标极值：</dt>
				<dd class="ddBox propDpyNone">  
				    <em>横轴</em>
					<em class="">Min</em>
					<input type="text" valname="xMin">  
					<em class="m_l_15">Max</em>
					<input class="" type="text" valname="xMax">
				</dd>
				<dd class="ddBox">  
				    <em>左纵</em>
					<em class="">Min</em>
					<input class="" type="text" valname="ylMin">    
					<em class="m_l_15">Max</em>
					<input type="text" valname="ylMax">
				</dd>
				<dd class="ddBox" showid="bar-specialAxisMM3">  
				    <em>右纵</em>
					<em class="">Min</em>
					<input class="" type="text" valname="yrMin">    
					<em class="m_l_15">Max</em>
					<input class="" type="text" valname="yrMax">
				</dd>
			</li>
			<li>
				<div class="lineBox" prop-type="spcPropCheck">
					<input type="checkbox" id="chk2" class="check" name="check" valname="showBarVal" proptype="3"> 
					<span class="checkBoxDescription"><label for="chk2">显示图表值</label></span>
				</div>
			</li>
		</ul>
		<ul class="baseAttr" rel="specialBarstrip">
			<li class="propDpyNone">    
			    <span class="compLabelName">条形颜色：</span>
				<div class="compName" id="barstripColor"></div>
			</li>
			<li class="propDpyNone">
				<div class="lineBox">   
				    <span class="compLabelName">坐标：</span>
					<select class="baseAttrSelect specialAxis" prop-type="specialAxis">
						<option v-for="specialcoordinate in specialcoordinates" dataval="{{specialcoordinate.dataval}}" value="{{specialcoordinate.value}}">{{specialcoordinate.text}}</option>
					</select>
				</div>
			</li>
			<li prop-type="barAxis">
				<div class="lineBox">   
				    <span class="compLabelName">纵轴单位：</span>
					<input class="w122" type="text" valname="ylUnit">
				</div>
				<div class="lineBox">   
				    <span class="compLabelName">下横名称：</span>
					<input class="w122" type="text" valname="xbName">
				</div>
				<div class="lineBox">   
				    <span class="compLabelName">下横单位：</span>
					<input class="w122" type="text" valname="xbUint">
				</div>
				<div class="lineBox propDpyNone" showid="barstrip-specialAxisInput3">   
				    <span class="compLabelName">上横名称：</span>
					<input class="w122" type="text" valname="xtName">
				</div>
				<div class="lineBox propDpyNone" showid="barstrip-specialAxisInput3">   
				    <span class="compLabelName">上横单位：</span>
					<input class="w122" type="text" valname="xtUint">
				</div>
			</li>
			<li prop-type="barAxisVal" id="barstripMM"> 
			    <dt class="f12_2f5a93 t_align_l">坐标极值：</dt>
				<dd class="ddBox propDpyNone">  
				    <em>纵轴</em>
					<em class="">Min</em>
					<input type="text" valname="yMin">  
					<em class="m_l_15">Max</em>
					<input class="" type="text" valname="yMax">
				</dd>
				<dd class="ddBox">  
				    <em>下横</em>
					<em class="">Min</em>
					<input class="" type="text" valname="xbMin">    
					<em class="m_l_15">Max</em>
					<input type="text" valname="xbMax">
				</dd>
				<dd class="ddBox" showid="barstrip-specialAxisMM3"> 
				    <em>上横</em>
					<em class="">Min</em>
					<input class="" type="text" valname="xtMin">    
					<em class="m_l_15">Max</em>
					<input class="" type="text" valname="xtMax">
				</dd>
			</li>
			<li class="propDpyNone">
				<div class="lineBox" prop-type="spcPropCheck">
					<input type="checkbox" class="check" name="check" id="showValPct" valname="showValPct" proptype="3"> 
					<span class="checkBoxDescription"><label for="showValPct">显示指标占比</label></span>
				</div>
			</li>
			<li>
				<div class="lineBox" prop-type="spcPropCheck">
					<input type="checkbox" id="chk1" class="check" name="check" valname="showPiePercent" proptype="3"> 
					<span class="checkBoxDescription"><label for="chk1">显示指标占比</label></span>
				</div>
			</li>
		</ul>
		<ul class="baseAttr" rel="specialLine">
			<li class="propDpyNone">    
			    <span class="compLabelName">线条类型：</span>
				<select class="baseAttrSelect">
					<option v-for="linestyle in linestyles">{{linestyle}}</option>
				</select>
			</li>
			<li class="propDpyNone">    
			    <span class="compLabelName">线条颜色：</span>
				<div class="compName" id="LineColor"></div>
			</li>
			<li id="lineAxis">
				<div class="lineBox">   
				    <span class="compLabelName">坐标：</span>
					<select class="baseAttrSelect specialAxis">
						<option v-for="linecoordinate in linecoordinates" dataval="{{linecoordinate.dataval}}">{{linecoordinate.text}}</option>
				</div>
			</li>
			<li prop-type="barAxis">
				<div class="lineBox">   
				    <span class="compLabelName">横轴名称：</span>
					<input class="w122" type="text" valname="xName">
				</div>
				<div class="lineBox">   
				    <span class="compLabelName">横轴单位：</span>
					<input class="w122" type="text" valname="xUnit">
				</div>
				<div class="lineBox">   
				    <span class="compLabelName">左纵名称：</span>
					<input class="w122" type="text" valname="ylName">
				</div>
				<div class="lineBox">   
				    <span class="compLabelName">左纵单位：</span>
					<input class="w122" type="text" valname="ylUnit">
				</div>
				<div class="lineBox" showid="line-specialAxisInput3">   
				    <span class="compLabelName">右纵名称：</span>
					<input class="w122" type="text" valname="yrName">
				</div>
				<div class="lineBox" showid="line-specialAxisInput3">   
				    <span class="compLabelName">右纵单位：</span>
					<input class="w122" type="text" valname="yrUnit">
				</div>
			</li>
			<li prop-type="barAxisVal" id="lineMM"> 
			    <dt class="f12_2f5a93 t_align_l">坐标极值：</dt>
				<dd class="ddBox propDpyNone">  
				    <em>横轴</em>
					<em class="">Min</em>
					<input type="text" valname="xMin">  
					<em class="m_l_15">Max</em>
					<input type="text" valname="xMax">
				</dd>
				<dd class="ddBox">  
				    <em>左纵</em>
					<em class="">Min</em>
					<input type="text" valname="ylMin"> 
					<em class="m_l_15">Max</em>
					<input type="text" valname="ylMax">
				</dd>
				<dd class="ddBox propDpyNone" showid="line-specialAxisMM3"> 
				    <em>右纵</em>
					<em class="">Min</em>
					<input class="" type="text" valname="yrMin">    
					<em class="m_l_15">Max</em>
					<input class="" type="text" valname="yrMax">
				</dd>
			</li>
			<li>
				<div class="lineBox" prop-type="spcPropCheck" id="linePoint">
					<input type="checkbox" class="check" name="check" checked="true" id="showLinePoint" valname="showLinePoint" proptype="3"> 
					<span class="checkBoxDescription"><label for="showLinePoint">显示线条节点</label></span>
				</div>
			</li>
			<li>
				<div class="lineBox" prop-type="spcPropCheck" id="lineVal">
					<input type="checkbox" id="chkLine" class="check" name="check" valname="showLineVal" proptype="3"> 
					<span class="checkBoxDescription"><label for="chkLine">显示图表值</label></span>
				</div>
			</li>
		</ul>
		<ul class="baseAttr" rel="specialPie">
			<li class="propDpyNone">    
			    <span class="compLabelName">环形颜色：</span>
				<div class="compName" id="pieColor"></div>
			</li>
			<li class="propDpyNone" prop-type="piePropVal">
				<div class="lineBox">   
				    <span class="compLabelName">环内半径：</span>
					<input class="w122" type="text" valname="pieR">
				</div>
			</li>
			<li class="propDpyNone" prop-type="piePropVal">
				<div class="lineBox">   
				    <span class="compLabelName">圆心距：</span>
					<input class="w122" type="text" valname="centerR">
				</div>
			</li>
			<li prop-type="piePropVal" id="zbz">
				<div class="lineBox">   
				    <span class="compLabelName">占比值：</span>
					<input class="w122" type="text" valname="pieShowPercent" placeholder="2">
				</div>
			</li>
			<li>
				<div class="lineBox" prop-type="spcPropCheck">
					<input type="checkbox" class="check" id="chk3" name="check" valname="showPieName" proptype="3"> 
					<span class="checkBoxDescription"><label for="chk3">名称</label></span>
				</div>
				<div class="lineBox" prop-type="spcPropCheck">
					<input type="checkbox" class="check" id="chk33" name="check" valname="showPiePercent" rel="group" proptype="3"> 
					<span class="checkBoxDescription"><label for="chk33">百分比</label></span>
				</div>
				<div class="lineBox" prop-type="spcPropCheck">
					<input type="checkbox" class="check" id="chk333" name="check" valname="showPieValues" rel="group" proptype="3"> 
					<span class="checkBoxDescription"><label for="chk333">值</label></span>
				</div>
			</li>
		</ul>
		<ul class="baseAttr" rel="specialMap">
			<li>
				<div class="lineBox" prop-type="spcPropCheck">
					<input type="checkbox" class="check" name="check" id="showGVal" valname="showGVal" proptype="2"> 
					<span class="checkBoxDescription"><label for="showGVal">显示图表值</label></span>
				</div>
			</li>
			<li>
				<div class="lineBox" prop-type="spcPropCheck">
					<input type="checkbox" class="check" name="check" id="showRestoreVal" valname="showRestoreVal" proptype="2"> 
					<span class="checkBoxDescription"><label for="showRestoreVal">显示刷新</label></span>
				</div>
			</li>
		</ul>
		<ul class="baseAttr" rel="specialTimepick">
			<li>
				<div class="lineBox" prop-type="spTimePropCheck">
					<input type="checkbox" class="check" id="st-quarter-checked">   
					<span class="checkBoxDescription"><label for="st-quarter-checked">刻</label></span>
				</div>
				<div class="lineBox" prop-type="spTimePropCheck">
					<input type="checkbox" class="check" id="st-hour-checked">  
					<span class="checkBoxDescription"><label for="st-hour-checked">小时</label></span>
				</div>
				<div class="lineBox" prop-type="spTimePropCheck">
					<input type="checkbox" class="check" id="st-day-checked">   
					<span class="checkBoxDescription"><label for="st-day-checked">天</label></span>
				</div>
			</li>
			<li>
				<div class="lineBox" prop-type="spTimePropCheck">  
				    <span class="compLabelName">默认选中：</span>
					<select class="baseAttrSelect" id="st-default-type">
						<option v-for="time in Timebucket" value="{{time.value}}">{{time.text}}</option>
					</select>
				</div>
			</li>
			<li>
				<div class="lineBox" prop-type="spTimePropCheck">   
				    <span class="compLabelName">粒度大小：</span>
					<select class="baseAttrSelect" id="st-default-minSize">
						<option v-for="particle in particlesize" value="{{particle}}">{{particle}}</option>
					</select>
				</div>
			</li>
			<li>
				<div class="lineBox" prop-type="spTimePropCheck">   
				    <span class="compLabelName">时间格式：</span>
					<select class="baseAttrSelect" id="st-default-format">
						<option v-for="date in daterange" value="{{date.value}}">{{date.text}}</option>
					</select>
				</div>
			</li>
			<li>
				<div class="lineBox">
					<input type="checkbox" class="check" id="st-isFixed-checked">   
					<span class="checkBoxDescription"><label for="st-isFixed-checked">是否固定刻度</label></span>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
    export default {
        data(){
            return {
            	coordinates:[{"dataval":"bar-1","value":"1","text":"单横单纵坐标"},
            				 {"dataval":"bar-2","value":"2","text":"单横双纵坐标"}
            				],
				specialcoordinates:[{"dataval":"barstrip-1","value":"1","text":"单横单纵坐标"},
									{"dataval":"barstrip-2","value":"2","text":"双横单纵坐标"}
								   ],
			    linestyles:["光滑","折线"],
			    linecoordinates:[{"dataval":"line-1","text":"单横单纵坐标"},
			    				 {"dataval":"line-2","text":"单横双纵坐标"},
			    				 {"dataval":"line-3","text":"正反单纵坐标"},
			    				 {"dataval":"line-4","text":"正反双纵坐标"}],
				Timebucket:[{"value":"quarter","text":"刻"},
							{"value":"hour","text":"小时"},
							{"value":"date","text":"天"}],
				particlesize:[8,1,5,7,10,24,30,80],
				daterange:[ {"value":"yyyy-MM","text":"年月"},
							{"value":"yyyy-MM-dd","text":"年月日"},
							{"value":"yyyy-MM-dd hh:mm:ss","text":"年月日时分秒"}]
            }
        }
    }
</script>