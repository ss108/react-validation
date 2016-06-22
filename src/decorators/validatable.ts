import Q from "Q"
import * as React from "react";

import {objectToArray} from "../utils/utils.ts";
import IRule from "../rules/rule.ts";

function _getRuleArgs(ruleSpec: any): Array<any>{
    return objectToArray(ruleSpec.slice(1)); //the first prop of the rule spec is the class of the rule
}

export default function validatable(target: React.Component<any, any>): void{
    const T = target.prototype;

    Object.defineProperty(T, "isValidatable", {
        get: () => {
            return true;
        },
        enumerable: true
    });

    Object.defineProperty(T, "errors", {
        get: () => {
            return this.state.validationResults.filter((vr: any) => {return vr.valid;});
        },
        enumerable: true
    });

    Object.defineProperty(T, "isValid", {
        get: () => {
            return this.errors.length === 0;
        },
        enumerable: true
    });

    Object.defineProperty(T, "isDirty", {
        get: () => {
            return this._dirty || false;
        },
        set: (value: boolean) => {
            if(! this._dirty) {
                this._dirty = value;
            }
        },
        enumerable: true
    });

    Object.defineProperty(T, "error", {
        get: () => {
            var errors = this.errors;

            if(errors.length === 0){
                return null;
            }

            return errors.sort((a: any, b: any) =>{
                return a.priority - b.priority;
            });
        },
        enumerable: true
    });

    T._validate = function(ruleSpec: any) : boolean{

       var ruleClass = ruleSpec.rule;
       var ruleArgs = _getRuleArgs(ruleSpec);
       var rule = new ruleClass(...ruleArgs);

       return rule.isSatisfiedBy(this.validationValue);
    }

    T.validate = () => {






    }


}
