const xlsx = require('node-xlsx').default;

function Stud(param){
    this.lastName  = param.lastName;
    this.firstName = param.firstName;
    this.patronyc  = param.patronyc;
    this.group     = param.group;
    this.place     = param.place;
}

let
    students = [],
    data     = xlsx.parse(`${__dirname}/data.xlsx`)[0].data;

for(var i = 1; i < data.length; i++){
    let stud = new Stud({
        lastName : data[i][0],
        firstName: data[i][1],
        patronyc : data[i][2],
        group    : data[i][3],
        place    : data[i][4],
    });
    students.push(stud);
}

console.log(students);
