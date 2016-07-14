<template>
    <strong class="nav_c_title">数据与级联</strong>
    	<ul class="control-look" rel="data">
    		<li>
    		    <span>
    		        <input class="picChs" type="button" value="配置" id="dataSetting_btn">
    		    </span>
    		</li>
    		<li>
    		    <span class="f12_2f5a93">当前控件的数据源：</span>
    			<div>
    			    <span class="f12_000" id="zR_dataSource"></span>
    			    <span></span>
    			</div>
    		</li>
    		<li><span class="f12_2f5a93">当前控件的父控件：</span>
    			<div class="c_list" id="zR_parentCom"></div>
    		</li>
    	</ul>
</template>
<script>
    export default {
        data(){
            return {

            }
        }
    }
</script>