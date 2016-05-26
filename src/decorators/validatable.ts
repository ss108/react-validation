import Q from "q"

import {objectToArray} from "../utils/utils.ts"

function _getRuleArgs(ruleSpec: any): Array<any>{
    return objectToArray(ruleSpec.slice(1)); //the first prop of the rule spec is the class of the rule
}

function _satisfiesRule(c: React.Component<any, any>): boolean{

}
