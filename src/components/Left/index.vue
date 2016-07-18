<template>
    <div id="zlayoutLeft" class="commonLayout">
        <div class="leftInner">
            <h2 class="zlayoutTitle">
                <strong>控件区</strong>
                <span class="zlayout-dropUp"></span>
                <ul class="nav" id="zleftComponent">
                	<li class="nav_c_con">
                	    <chart></chart>
                	</li>
                    <li class="nav_c_con">
                    	<text></text>
                    </li>
                    <li class="nav_c_con">
                        <ztable></table>
                    </li>
                    <li class="nav_c_con">
                      <search></search>
                    </li>
                    <li class="nav_c_con">
                      <others></others>
                    </li>
                </ul>
            </h2>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import chart from "./chart"
    import text from "./text"
    import ztable from "./table"
    import search from "./search"
    import others from "./others"
    export default {
        data(){
            return {}
        },
        components:{
            chart,
            text,
            ztable,
            search,
            others
        }
    }
</script>