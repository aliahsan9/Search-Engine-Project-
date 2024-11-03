const name = document.getElementById('name');
const rollno = document.getElementById('rollno');
const marks = document.getElementById('marks');
const button = document.getElementById('button');
button.addEventListener('onclick',()=>{
    localStorage.setItem(name);
    localStorage.setItem(rollno);
    localStorage.setItem(marks);
})
