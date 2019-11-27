var myObject = {
    prototypes:[]
}
myObject.call = function (func) {
    console.log("call funktion")
    this.hasOwnProperty(func)
}

myObject.create = function (prototypeList){
    var newObject = {};
    newObject.__proto__ = this;
    newObject.prototypes = prototypeList;


    return newObject;
}


