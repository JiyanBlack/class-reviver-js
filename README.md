# class-reviver-js
A tool for serializing and deserializing ES2015 Class with Class methods.
# Example
###### Revive the json file with the original Class:
```javascript
const reviver = require('class-reviver');
//create a new instance
let me = new Person("JiYan", 24); 
//create the Class's reviver
let personReviver = new reviver.ClassReviver(Person); 
// revive 'me' instance from json file.
let newMe = personReviver.revive(JSON.parse(JSON.stringify(me)));
newMe.printName(); //JiYan
newMe.printAge(); //24
```
###### Serialize the class without the original Class:
```javascript
const reviver = require('class-reviver');
 //create a new instance
let me = new Person("JiYan", 24);
//create a reviver with the instance
let reviver = new reviver.ClassReviver(Person, me); 
// add the modules used in the class
// para format: {variableName: "module path"}
//similar to: const variableName=require("module path");
reviver.addModules({
  path: "path"
});
//serialize as a file
reviver.saveClassSync("./me"); 
 //revive/deserialize the original instance 'me'
let newMe = reviver.loadClassSync('./me');
newMe.printName(); //JiYan
newMe.printAge(); //24
```

See more infor
