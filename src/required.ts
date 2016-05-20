import Rule from "./rule.ts"


export default class Required implements Rule{
    getDefaultPriority(){
        return 0;
    }

    makeDefaultErrorMessage(fieldName: string){
        return `${fieldName} is required.`;
    }

    isSatisfiedBy(value: any){
        return (value !== null) && value.length > 0;
    }
}
