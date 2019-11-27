var myObject = {
    prototypes:[]
}

myObject.create = function (prototypeList){
    var newObject = {};
    newObject.__proto__ = this;
    newObject.prototypes = prototypeList;
    return newObject;
}

myObject.call = function (funcName, parameters) {
    console.log("In call function");

    if(typeof this[funcName] === "function"){
        console.log("In if statemt");
        return this[funcName](parameters);
    }
}

o1 = myObject.create(null)

o1.func =  function(Parameters){
    return "fun funktionen"
}

o1.call("func", "Parameters")
