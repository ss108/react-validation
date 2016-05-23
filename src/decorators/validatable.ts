import Q from "q"

import {objectToArray} from "../utils/utils.ts"

function _getRuleArgs(ruleSpec: any){
    return objectToArray(ruleSpec.slice(1)); //the first prop of the rule spec is the class of the rule
}
