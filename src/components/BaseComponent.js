import Element from "./../core/Element"
import {TestAction} from "./../vuex/actions"
import Component from "vue-class-component"
import {log} from "./../util/zUtil"

import Chart from "./Chart" 

@Component({	
	props : {
		options:{
			type:Object,
			default: function () {
	           return { }
	        }
		}
	},
	vuex:{
		actions:{
			TestAction	
		}
	},
	components:{
		Chart	
	},
	template:`	
		<div>
			<Element id="abc" :max-num='1' :w='180' :h='180' >
				 <component :is="compName"></component>
			</Element>
		</div>
	`		
})
export default class BaseComponent extends Element{
	data(){
		var compName = this.options.content.type
		return {
			compName:"Chart"
		}
	}
	ready(){	
		log(this.options);
	}
}
