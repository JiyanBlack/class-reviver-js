//for testing this module
const Person = require("./testObj.js");
reviver = require('./reviver.js');

var path=require('path');

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  printName() {
    let that = this;
    setTimeout(() => console.log(that.name), 1000);
  }

  printAge() {
    console.log(this.age);
  }

  printPath(){
      console.log(path.resolve("./"));
  }
}


let me = new Person("JiYan", 23);
let reviver1 = new reviver.ClassReviver(Person, me);
// console.log(PersonReviver.getObjMethods());
// console.log(PersonReviver.ObjCode);
reviver1.addModules({
  path: "path"
});
reviver1.saveClassSync("./me.js");
let new_me = reviver.loadClassSync('./me.js');
let another_new_me = require('./me.js')();
new_me.printName();
new_me.printAge();
new_me.printPath();
// another_new_me.printAge();

let reviver2 = new reviver.ClassReviver(Person);
reviver2;

decache("./reviver.js");
decache('./testObj.js')
