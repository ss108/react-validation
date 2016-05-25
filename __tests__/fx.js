export default function fx(x){
    const t = typeof x;

    if(t !== "number"){
        throw "bs";
    }

    return x * 2;
}
