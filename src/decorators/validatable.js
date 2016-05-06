
function objectToArray(obj){
    var collection = Object.keys(obj).map((k) => {
        return obj[k];
    });

    return Array.from(collection);
}

function _getRuleArgs(ruleSpec){
    return objectToArray(ruleSpec.slice(1)); //the first prop of the rule spec is the class of the rule
}

function _satisfiesRule(thing, ruleSpec){
    var res = false;

    var args = _getRuleArgs(ruleSpec);
    var ruleClass = ruleSpec.rule;
    var rule = new ruleClass(...args); //should work 

    var value = thing.validationValue; //anything decorated with "validatable" must implement a getter for this. There is a way to enforce that, will be added later

    res = rule.isSatisfiedBy(value);

    var fullResult {rule: rule, valid: res} //TODO: class?
    fullResult.message = ruleSpec.message || rule.makeDefaultErrorMessage(c.props.name, ...args);
    fullResult.priority = ruleSpec.priority || rule.defaultPriority;

    return fullResult;
}

function _validate(thing){
    var d = Q.defer();

    var ruleSpec = c.props.validation;

    var validationResults = ruleSpec.map(_satisfiesRule.bind(null, c));

    c.setState({validationResults: validationResults}, () =>{
        d.resolve(null);
    });

    return d.promise;
}

export default function validatable(target){
    const type = target.prototype;

    Object.defineProperty(type, "isValidatable", {
        get: () => {return true;},
        enumerable: true
        }
    );

    Object.defineProperty(type, "errors", {
        get: () => {
            this.state.validationResults.filter((vr) => {return vr.valid;});
        },
        enumerable: true
    });

    Object.defineProperty(type, "isValid", {
        get: () =>{
           return this.errors.length === 0; 
        },
        enumerable: true
    });

    Object.defineProperty(type, "isDirty", {
        get: function() {
            return this._dirty || false;
        },
        set: function(value) {
            if (! this._dirty) {
                this._dirty = value;
            }
        },
        enumerable: true
    });

    /**
    * Returns the highest priority error present on a field.
    */
    Object.defineProperty(type, "error", {
        get: function() {
            var errors = Array.from(this.errors);

            if (errors.length === 0) {
                return null;
            }

            return errors.sort((a,b) =>{
                return a.priority - b.priority; //this is also an untested thing that should theoretically
            }); 
        },
        enumerable: true
    }); 

}
