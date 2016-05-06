/*
 * There is no meaningful way to make an abstract class in Javscript, otherwise this would be one.
 */
export default class Rule {
    constructor(priority){
        this._defaultPriority = priority;
    }

    get defaultPriority(){
        return this._defaultPriority;
    }

    isSatisfiedBy(value){
        throw new Error("Not implemented--override in derived rule.");
    }
}
