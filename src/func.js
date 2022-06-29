export function getRandomInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

export function getEquation(a,b){
    const elem=[];
    elem.push(a);
    elem.push(b);
    elem.push("x^2");
    if (a+b!==0){
        if(a+b>=2)elem.push("+"+(a+b)+"x");
        else if(a+b<=-2)elem.push(a+b+"x");
        else if(a+b===1)elem.push("x");
        else if(a+b===-1)elem.push("-x");
    };
    if(a*b!==0){
        if(a*b>=1)elem.push("+"+a*b.toString());
        else elem.push(a*b.toString());
    };
    return elem;
}