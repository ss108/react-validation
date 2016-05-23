interface IRule {
    getDefaultPriority(): number;

    makeDefaultErrorMessage(fieldName: string): string;
    
    isSatisfiedBy(value: any): boolean;
}

export default IRule;
