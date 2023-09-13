import { readAst } from './readAst';
import { interpreter } from './interpreter';

export const runInterpreter = (path: string) => {
  try {
    const astTree = readAst(path);
    interpreter(astTree.expression, {});
  } catch (error: unknown) {
    console.error('Oops, an error occurred', error);
  }
};

const startTime = process.hrtime();
const listArgsPosition = 2;

runInterpreter(process.argv.slice(listArgsPosition)[0]);

const NANOSECONDS_IN_A_SECOND = 1e9;
const endTime = process.hrtime(startTime);
const totalSeconds = endTime[0] + endTime[1] / NANOSECONDS_IN_A_SECOND;

console.log(`\nExecution in ${totalSeconds}s `);
