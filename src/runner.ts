import fNode from 'node:fs';
import { interpreter } from './interpreter';

const readAst = (path: string) => JSON.parse(fNode.readFileSync(path) as unknown as string);

const runInterpreter = (path: string) => {
  try {
    const astTree = readAst(path);
    interpreter(astTree.expression, {});
  } catch (error: unknown) {
    console.error('Oops, an error occurred', error);
  }
};

const startTime = process.hrtime();
const listArgsPosition = 2;
const fileInterpreter = process.argv.slice(listArgsPosition)[0];

runInterpreter(fileInterpreter);

const NANOSECONDS_IN_A_SECOND = 1e9;
const endTime = process.hrtime(startTime);
const totalSeconds = endTime[0] + endTime[1] / NANOSECONDS_IN_A_SECOND;

console.log(`\nExecution in ${totalSeconds}s `);
