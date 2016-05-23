export default class Required {
    getDefaultPriority() {
        return 0;
    }
    makeDefaultErrorMessage(fieldName) {
        return `${fieldName} is required.`;
    }
    isSatisfiedBy(value) {
        return (value !== null) && value.length > 0;
    }
}
