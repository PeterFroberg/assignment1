function createClass(name, superclassList) {
    let obj = {
        classname: name,
        superclasses:  superclassList,

        new: function(){
            return Object.create(this);
        },

        call: function(funkName, parameters){

        }
    };
    return obj;
}

/*
c1 = new createClass("testClass",["test"])

console.log(c1.className)
console.log(c1.superclasses)
*/

var class0 = createClass("Class0", null);
class0.func = function(arg) { return "func0: " + arg; };
var class1 = createClass("Class1", [class0]);
var class2 = createClass("Class2", []);
class2.func = function(arg) { return "func2: " + arg; };
var class3 = createClass("Class3", [class1, class2]);
var obj3 = class3.new();
var result = obj3.call("func", ["hello"]);
