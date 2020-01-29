const fs = require('fs');

const dataBuffer = fs.readFileSync('1-json.json');
const parseData = JSON.parse(dataBuffer.toString());
parseData.name = "Dhruv";
parseData.age = 28;
console.log(JSON.stringify(parseData));

fs.writeFileSync('1-json.json', JSON.stringify(parseData));