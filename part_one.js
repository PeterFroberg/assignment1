// Peter Fröberg, pefr7147@student.su.se
// Douglas Hammarstam, doha6991@student.su.se

let myObject = {
    prototypes: []
}

myObject.create = function (prototypeList) {
    let newObject = {};
    newObject.__proto__ = this;
    newObject.prototypes = prototypeList;
    return newObject;
}

myObject.call = function (funcName, args) {
    console.log("In call function");

    if (typeof this[funcName] === "function") {
        console.log("In if statment");
        return this[funcName](args);
    }
    if (this.prototypes != null) {
        for (parent of this.prototypes) {
            var parentresult = parent.call(funcName, args);
            if (parentresult) {
                return parentresult;
            }
        }
    }
    return null;
}

myObject.addPrototype = function(parameter) {

    if(!parameter.checkProto(this)) {
        this.prototypes.push(parameter);
    }else {
        //throw "Circular referencing detected, prototype not added"
        console.log("Exists");
    }
}

myObject.checkProto = function (proto) {
    var exists = false;

    if(this.prototypes != null) {
        if (this.prototypes.includes(proto)) {
            return true;
        }
        for (p in this.prototypes) {
            exist = p.checkPrototype(proto)
        }
    }
    return exists;
}


//Egna tester
//var obj0 = myObject.create(null);
//var obj1 = myObject.create([obj0]);
//obj0.addPrototype(obj1);

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
