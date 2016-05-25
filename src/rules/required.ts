import IRule from "./rule.ts"


export default class Required implements IRule{
    getDefaultPriority(){
        return 0;
    }

    makeDefaultErrorMessage(fieldName: string){
        return `${fieldName} is required.`;
    }

    isSatisfiedBy(value: any){
        return (value !== undefined) && (value !== null) && value.length > 0;
    }
}
