// Peter Fröberg, pefr7147@student.su.se
// Douglas Hammarstam, doha6991@student.su.se

function createClass(name, superclassList) {
    let obj = {
        classname: name,
        superclasses: superclassList,

        new: function () {
            obj = Object.create(this);
            obj.call = function (funcName, args) {
                console.log("In call function");
                if (typeof this[funcName] === "function") {
                    console.log("local funkction in :" + this.constructor.name);
                    return this[funcName](args);
                }
                if (this.superclasses != null) {
                    for (parent of this.superclasses) {
                        return parent.__find(funcName)[funcName](args);
                    }
                }
                return null;
            }

            return obj;

        }, //end of new function
        __find: function(funcName){
            if(typeof this[funcName] === "function"){
                return this;
            }else{
                if(this.superclasses != null){
                    for(parent of this.superclasses){
                        return parent.__find(funcName);
                    }
                }
            }
        },// end __find
        addSuperClass: function (args) {
            if(!args.__checkSuperClass(this)) {
                this.superclasses.push(args);
            }else {
                throw "Circular referencing detected, superclass not added"
                console.log("Exists");
            }
        },
        __checkSuperClass: function(args){
            var exists = false;

            if(this.superclasses != null) {
                if (this.superclasses.includes(args)) {
                    return true;
                }
                for (p in this.superclasses) {
                    exist = p.__checkSuperClass(args)
                }
            }
            return exists;
        }
    };
    return obj;
}


var class0 = createClass("Class0", null);
class0.func = function (arg) {
    return "func0: " + arg;
};
var class1 = createClass("Class1", [class0]);
var class2 = createClass("Class2", []);
class2.func = function (arg) {
    return "func2: " + arg;
};
var class3 = createClass("Class3", [class1, class2]);
var obj3 = class3.new();
var result = obj3.call("func", ["hello"]);
console.log("should print ’func0: hello’ ->", result);

var class0 = createClass("Class 0", null);
var class1 = createClass("Class 1", [class0]);
class0.addSuperClass(class1);
