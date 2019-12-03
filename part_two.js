// Peter Fröberg, pefr7147@student.su.se
// Douglas Hammarstam, doha6991@student.su.se

function createClass(name, superclassList) {
    let obj = {
        classname: name,
        superclasses: superclassList,

        new: function () {
            obj = Object.create(this);
            obj.call = function (funcName, args) {
                if (typeof this[funcName] === "function") {
                    return this[funcName](args);
                }
                if (this.superclasses != null) {
                    for (s of this.superclasses) {
                        return s.__find(funcName)[funcName](args);
                    }
                }
                return null;
            }
            return obj;
        }, //end of new
        __find: function (funcName) {
            if (typeof this[funcName] === "function") {
                return this;
            } else {
                if (this.superclasses != null) {
                    for (s of this.superclasses) {
                        return s.__find(funcName);
                    }
                }
            }
        },// end __find
        addSuperClass: function (args) {
            if (!args.__checkSuperClass(this)) {
                this.superclasses.push(args);
            } else {
                throw "Circular referencing detected, superclass not added"
            }
        },
        __checkSuperClass: function (args) {
            var exists = false;

            if (this.superclasses != null) {
                if (this.superclasses.includes(args)) {
                    return true;
                }
                for (s in this.superclasses) {
                    exists = s.__checkSuperClass(args)
                }
            }
            return exists;
        } //end __checkSuperClass
    };
    return obj;
}

