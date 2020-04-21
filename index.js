const
    xlsx = require('node-xlsx').default,
    {PDFDocument, StandartFonts, rgb} = require('pdf-lib'),
    fs   = require('fs')

function Stud(param){
    this.lastName  = param.lastName;
    this.firstName = param.firstName;
    this.patronyc  = param.patronyc;
    this.group     = param.group;
    this.place     = param.place;
}

Stud.prototype.getFullData = function(){
    return this.lastName + ' ' +
           this.firstName + ' ' +
           this.patronyc + ' ' +
           this.group + ' ' +
           this.place;
}

async function main(){

    let
        students = [],
        pdfDoc   = await PDFDocument.create(),
        data     = xlsx.parse(`${__dirname}/data.xlsx`)[0].data;

    for(let i = 1; i < data.length; i++){
        let stud = new Stud({
            lastName : data[i][0],
            firstName: data[i][1],
            patronyc : data[i][2],
            group    : data[i][3],
            place    : data[i][4],
        });
        students.push(stud);
    }

    for(let i = 0; i < students.length; i++){
        let page = pdfDoc.addPage();
        page.drawText(students[i].getFullData(), {encode: 'utf-8'});
    }

    let save = await pdfDoc.save();
    fs.writeFileSync('test.pdf', save);

}

main();
