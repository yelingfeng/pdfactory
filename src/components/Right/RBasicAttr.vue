<template>
<strong class="nav_c_title" id="baseAttr">基本属性</strong>
	<ul class="baseAttr" rel="base">
		<li>
			<span class="f12_2f5a93">控件名称：</span>
			<span class="f12_2f5a93 w120" id="zR_baseName">图标型控件A</span>
		</li>
		<li>
			<div class="lineBox">
				<span class="f12_2f5a93 m_t_3">控件标题：</span>
				<input class="w80" type="text" id="zTitle">
				<input class="ttlDt" type="button">
			</div>
			<div class="lineBox">
				<select class="baseAttrSelect m_l_60" prop-type="font">
					<option v-for="font in fonts" value="{{font}}">{{font}}</option>
				</select>
				<select class="baseAttrSelect" prop-type="fontSize">
					<option v-for="size in sizes" value="size">{{size}}</option>
				</select>
			</div>
			<div class="lineBox baseAttrFont" prop-type="fontOther">
				<i class="B m_l_60">B</i>
				<i class="I">I</i>
				<i class="U">U</i>
				<i class="A" id="titleFontColor">A</i>
			</div>
			<div class="lineBox baseAttrTitlePst" prop-type="fontOther">
			 	<span class="f12_2f5a93 m_t_3">位置：</span>
				<select class="baseAttrSelect" prop-type="titlePositon">
					<option v-for="position in positions" value="{{position[0]}}">{{position[1]}}</option>
				</select>
			</div>
		</li>
		<li>
			<span class="f12_2f5a93 m_t_3">控件注释：</span>
			<input class="w122" type="text" id="zR_remark">
		</li>
		<li>
			<dl>
				<dt class="f12_2f5a93 m_t_3 t_align_l">位置大小：</dt>
				<dd class="control-style" rel="size">
					<div v-for="divsize in divsizes" class="{{divsize.divclass}}">
						<span>{{divsize.spantxt}}</span>
						<input type="text" class="{{divsize.iptclass}}" id="divsize.iptid" data-attr="divsize.iptattr">
					</div>
				</dd>
			</dl>
		</li>
		<li>
			<dl>
				<dt class="f12_2f5a93 m_t_3 t_align_l">控件边框：</dt>
				<dd class="control-look" rel="border">
					<span class="line-none"></span>
					<span class="line-has"></span>
				</dd>
			</dl>
		</li>
		<li>
			<dl>
				<dt class="f12_2f5a93 m_t_3 t_align_l p_l_12">透明度：</dt>
				<dd class="dd-range">
					<div class="z-range" style="width:170px;height:55px">
						<div id="range"></div>
					</div>
				</dd>
			</dl>
		</li>
	</ul>
</template>
<script>
    export default {
        data(){
        	return {
        		fonts:["黑体","宋体","仿宋","隶书","楷体"],
        		sizes:[12,14,16,18,20],
        		positions:[["center-top","中上"],["left-top","左上"],["right-top","右上"],["center-bottom","右下"]],
        		divsizes:[{"divclass":"m_b_10","spantxt":"左","iptclass":"f12_2f5a93","iptid":"t_align_left","iptattr":"position_l"},
        				  {"divclass":"m_b_10","spantxt":"上","iptclass":"f12_2f5a93","iptid":"t_align_top","iptattr":"position_t"},
        				  {"divclass":"","spantxt":"宽","iptclass":"f12_2f5a93","iptid":"t_width","iptattr":"position_w"},
        				  {"divclass":"","spantxt":"高","iptclass":"f12_2f5a93","iptid":"t_height","iptattr":"position_h"}
        				]
        	}
        }


    }
</script>