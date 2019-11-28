// Peter Fröberg, pefr7147@student.su.se
// Douglas Hammarstam, doha6991@student.su.se

var myObject = {
    prototypes: []
}

myObject.create = function (prototypeList) {
    var newObject = {};
    newObject.__proto__ = this;
    newObject.prototypes = prototypeList;
    return newObject;
}

myObject.call = function (funcName, parameters) {
    console.log("In call function");

    if (typeof this[funcName] === "function") {
        console.log("In if statemt");
        return this[funcName](parameters);
    }
    if (this.prototypes != null) {
        for (parent of this.prototypes) {
            var parentresult = parent.call(funcName, parameters);
            if (parentresult) {
                return parentresult;
            }
        }
    }
    return null;
}


//Kurstester *****************
var obj0 = myObject.create(null);
obj0.func = function (arg) {return "func0: " + arg;};
var obj1 = myObject.create([obj0]);
var obj2 = myObject.create([]);
obj2.func = function (arg) {return "func2: " + arg;};
var obj3 = myObject.create([obj1, obj2]);
var result = obj3.call("func", ["hello"]);
console.log("should print ’func0: hello’ ->", result);


//Second test
obj0 = myObject.create(null);
obj0.func = function (arg) {return "func0: " + arg;};
obj1 = myObject.create([obj0]);
obj2 = myObject.create([]);
obj3 = myObject.create([obj2, obj1]);
result = obj3.call("test", ["hello"]);
console.log("should print ’func0: hello’ ->", result);

//Third test
obj0 = myObject.create(null);
obj0.func = function (arg) {return "func0: " + arg;};
result = obj0.call("func", ["hello"]);
console.log("should print ’func0: hello’ ->", result);
