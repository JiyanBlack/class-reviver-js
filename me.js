const path=require('path');
let _origin_class=class Person {
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
let _instance={"name":"JiYan","age":24};
function _jsReviver() {
    // to revive already exported js file.
    let new_instance = new _origin_class();
    for (let attr in _instance) {
      new_instance[attr] = _instance[attr];
    }
    return new_instance;
  }
module.exports=_jsReviver;
