import { objectToArray } from "../utils/utils.js";
import _ from "underscore";

function _getRuleArgs(ruleSpec) {
    return objectToArray(ruleSpec.slice(1));
}

export default function validatable(target, fieldName) {
    const T = target.prototype;

    Object.defineProperty(T, "isValidatable", {
        get: () => {
            return true;
        },
        enumerable: true
    });

    Object.defineProperty(T, "errors", {
        get: () => {
            return this.state.validationResults.filter((vr) => { return !vr.valid; });
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
        set: (value) => {
            if (!this._dirty) {
                this._dirty = value;
            }
        },
        enumerable: true
    });

    Object.defineProperty(T, "error", {
        get: () => {
            var errors = this.errors;
            if (errors.length === 0) {
                return null;
            }
            return errors.sort((a, b) => {
                return a.priority - b.priority;
            });
        },
        enumerable: true
    });

    T._validate = (ruleSpec) => {
        var ruleClass = ruleSpec.rule;
        var ruleArgs = _getRuleArgs(ruleSpec);
        var rule = new ruleClass(...ruleArgs);
        return rule.isSatisfiedBy(this.validationValue);
    };

    T.validate = () => {
        var rules = this.props.validation;

        var res = rules.map((r) => {
            return this._validate(r);
        });

        const s = {validatonResults: res};

        this.setState(s);
    };
}
