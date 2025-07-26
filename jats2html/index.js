import { parseArgs } from 'node:util';
import { readFileSync } from 'fs';
import { J2HN } from './j2hN.js';
import formatXml from 'xml-formatter';

const { values, positionals } = parseArgs({
    // args: process.argv.slice(2),
    allowPositionals: true,
    options: {
        'raw': {
            type: 'boolean',
            short: 'r',
            description: 'Output the XML without pretty printing',
            default: false,
        },
        'help': {
            type: 'boolean',
            short: 'h',
            description: 'Show this help message',
            default: false,
        }
    }
});
// console.warn(`values: ${JSON.stringify(values)}`);
// console.warn(`positionals: ${JSON.stringify(positionals)}`);

if (values.help) {
    console.log('Usage: node index.js [options] <input-file>');
    console.log('Options:');
    console.log('  -r, --raw       Output the XML without pretty printing');
    console.log('  -h, --help      Show this help message');
    process.exit(0);
}

const inputFile = positionals[0];
if (!inputFile) {
    console.error('Usage: node index.js <input-file>');
    process.exit(1);
}
console.warn(`Input file: ${inputFile}`);
const jatsXml = readFileSync(inputFile, 'utf-8');

const htmlOutput = J2HN(jatsXml);

/* ***
出力
*** */

if (values.raw) {
    console.log(htmlOutput);
    process.exit(0);
} else {
    // console.warn('Pretty printing the output...');
    console.log(formatXml(htmlOutput, {
        indentation: '  ',
        collapseContent: true,
        lineSeparator: '\n'
    }));
}

/* ***
End of script
*** */