// Object.freeze makes an object immutable
let data = Object.freeze({ value: 5 });
console.log(data.value); // 5
data.value = 10; //we tried to change value inside the frozen object
console.log(data.value); // 5 not changed
