//for testing this module
const reviver = require('./reviver.js');
const path = require('path');

//sample class
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

  printPath() {
    console.log(path.resolve("./"));
  }
}

console.log("Test serializing and deserializing js class:")
let me = new Person("JiYan", 24);
let reviver1 = new reviver.ClassReviver(Person, me);
reviver1.addModules({
  path: "path"
});
reviver1.saveClassSync("./me.js");
let new_me = reviver.loadClassSync('./me.js');
new_me.printName();
new_me.printAge();
new_me.printPath();

console.log("Test reviving class methods to json object:");
let another_reviver = new reviver.ClassReviver(Person);
let another_me = another_reviver.revive(JSON.parse(JSON.stringify(me)));
another_me.printName();
another_me.printAge();
another_me.printPath();
console.log("Tests done!");
