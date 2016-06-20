/**
 * Created by  on 2016/6/20.
 */
import {mixin} from "core-decorators"
import Component from "vue-class-component"
import Base from "./Base"
@Component({
    props :['eid','maxNum'],
    template:`
         <div class="zlayoutElement" eid={{eid}} maxNum={{maxNum}}>
            <div class="zlayout-eleContent">
                <div class="zlayout-component"></div>
            </div>
            <div class="zlayout-rb">
                <span class="z-radius north-west-resize"></span>
                <span class="z-radius north-resize"></span>
                <span class="z-radius north-east-resize"></span>
                <span class="z-radius west-resize"></span>
                <span class="z-radius east-resize"></span>
                <span class="z-radius south-west-resize"></span>
                <span class="z-radius south-resize"></span>
                <span class="z-radius south-east-resize"></span>
            </div>
        </div>
    `
})
@mixin(Base)
export  default class Element{
    data(){
        return {

        }
    }
    ready(){
        this.getOption();
    }
}
