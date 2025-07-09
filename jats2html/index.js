import { readFileSync } from 'fs';
import { J2HN } from './j2hN.js';
import formatXml from 'xml-formatter';

const inputFile = process.argv[2];
if (!inputFile) {
    console.error('Usage: node j2hN.js <input-file>');
    process.exit(1);
}
console.warn(`Input file: ${inputFile}`);
const jatsXml = readFileSync(inputFile, 'utf-8');

const htmlOutput = J2HN(jatsXml);

/* ***
出力
*** */

console.log(formatXml(htmlOutput, {
    indentation: '  ',
    collapseContent: true,
    lineSeparator: '\n'
}));

/* ***
End of script
*** */