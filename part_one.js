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
    if (typeof this[funcName] === "function") {
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

myObject.addPrototype = function (args) {

    if (!args.checkProto(this)) {
        this.prototypes.push(args);
    } else {
        throw "Circular referencing detected, prototype not added"
    }
}

myObject.checkProto = function (args) {
    var exists = false;

    if (this.prototypes != null) {
        if (this.prototypes.includes(args)) {
            return true;
        }
        for (p in this.prototypes) {
            exist = p.checkPrototype(args)
        }
    }
    return exists;
}
