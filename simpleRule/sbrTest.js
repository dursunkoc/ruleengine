var sbrParser = require("./sbr").parser;

function sbr(input) {
    console.log(input + " ==> ");
    sbrParser.yy = {
        "person": {
            "name": "Dursun",
            "age":35,
            "isAlive": false,
            "dateOfBirth": new Date(19, 07, 1982)
        },
        "names": ["Dursun", "Yasemin", "Elif Nisa", "Beyza"],
        "now":new Date()
    };
    return sbrParser.parse(input);
}

console.log(sbr("person.name"));
console.log(sbr("person.age"));
console.log(sbr("person.isAlive"));
console.log(sbr("person.name = 'Dursun' AND person.dateOfBirth > now"));
console.log(sbr("person.name = 'Dursun' OR person.dateOfBirth > now"));
console.log(sbr("person.name IN names"));
console.log(sbr("person.name IN ['Dursun', 'Mustafa']"));
console.log(sbr("person.name"));
console.log(sbr("names"));
console.log(sbr("now"));
console.log(sbr("19-05-1982 00:00:00"));
console.log(sbr("new Date()"));

