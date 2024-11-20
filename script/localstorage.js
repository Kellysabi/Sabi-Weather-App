//store data in local storage 
localStorage.setItem('name', 'mario');
localStorage.setItem('age', 50);

//get data from local storage

let name = localStorage.getItem('name')
let age = localStorage.getItem('age')
console.log(name,age)

//updating data

localStorage.setItem('name', 'kelechi')

//using dot notation 

localStorage.age= 21;
name = localStorage.getItem('name')
age = localStorage.getItem('age')
console.log(name, age)

//deleting data from local storage
//localStorage.removeItem is to even a single item
//and  localStorage.clear
localStorage.removeItem('name');

//name = localStorage.getItem('name')

/*localStorage.clear();
console.log(name, age);*/

//stringifying and parsing data

const todos =[
    {text: 'play mariokart', author: 'shaun'},
    {text: 'buy some milk', author: 'mario'},
    {text: 'buy some bread', author: 'luigi'},
]
console.log(JSON.stringify(todos));

localStorage.setItem('todos', JSON.stringify(todos));
Todos = localStorage.getItem('todos')
console.log(Todos);
//how to make it an array back
console.log(JSON.parse(Todos));