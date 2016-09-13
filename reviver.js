'use strict';

const fs = require('fs');
const path = require('path');

function loadClassSync(filePath) {
  return require(path.resolve(filePath))();
}

//begin of the class
class ClassReviver {
  constructor(Obj, instance) {
    if (Obj instanceof Object) {
      this.Obj = Obj;
      this.instance = instance;
      this.instanceStr = JSON.stringify(instance);
      this.ObjCode = Obj.toString(Obj);
      this.expCode = null;
      this.objModules = {};
    } else {
      throw new TypeError('ClassReviver receives a ' + typeof Obj + ' object.', 'reviver.js');
    }
  }

  revive(jsonObj) {
    //to revive the instance use passed in object.
    let new_instance = new this.Obj();
    for (let attr in jsonObj) {
      new_instance[attr] = jsonObj[attr];
    }
    return new_instance;
  }

  addModules(dict) {
    //accept a dictionary of modules {in}
    if (!dict instanceof Object) throw new TypeError('addModules Function receives a ' + typeof Obj + ' object, should be object.', 'reviver.js');
    for (let key in dict) {
      this.objModules[key] = dict[key];
    }
  }

  saveClassSync(filePath) {
    let code = this._generateCode();
    fs.writeFileSync(filePath, code);
  }

  _generateCode() {
    //begin to insert codes
    let code = '';
    for (let amodule in this.objModules) {
      code += 'const ' + amodule + "=require('" + this.objModules[amodule] + "');\n";
    }
    code += 'let _origin_class=' + this.ObjCode + '\n';
    code += 'let _instance=' + this.instanceStr + ';\n';
    code += 'function ' + this._jsReviver.toString() + '\n';
    code += 'module.exports=_jsReviver;\n';
    return code;
  }

  _jsReviver() {
    // to revive already exported js file.
    let new_instance = new _origin_class();
    for (let attr in _instance) {
      new_instance[attr] = _instance[attr];
    }
    return new_instance;
  }
}
//end of the class.

exports.loadClassSync = loadClassSync;
exports.ClassReviver = ClassReviver;
