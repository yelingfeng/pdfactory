import {ZCOMP_TYPE} from "./../util/ResourcesConfig"

const Rule = {}
Rule['CHART'] = ZCOMP_TYPE.CHART;
Rule['TABLE']  = ZCOMP_TYPE.TABLE;
Rule['TEXT']  = ZCOMP_TYPE.TEXT;
Rule['SEARCH']  = ZCOMP_TYPE.SEARCH;
Rule['DATERANGE']  = ZCOMP_TYPE.DATERANGE;
Rule['OTHER']  = ZCOMP_TYPE.OTHER;



/**
* 
* 组件类型策略对象
*  
**/
class ComponentStrategy (){
	constructor(rule , strategy){
		this.rule = rule ; 
		this.setStrategy();
	}

	setStrategy(key){
		return 
	}
}
