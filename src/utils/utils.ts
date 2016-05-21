function objectToArray(obj: any): Array<any> {
    var collection = Object.keys(obj).map((k) => {
        return obj[k];
    });

    return collection; 
}

export {objectToArray}
