import fs from 'node:fs';
import { interpreter } from './interpreter';

const filePath = process.argv.slice(2)[0];

const readAst = (filePathLocal) => JSON.parse(fs.readFileSync(filePathLocal) as unknown as string);
// eslint-disable-next-line consistent-return
const runInterpreter = (filePathLocal) => {
  try {
    const astTree = readAst(filePathLocal);
    return interpreter(astTree.expression, {});
  } catch (error) {
    console.error('ops, algo deu errado:', error.message);
  }
};

const inicio = process.hrtime();

runInterpreter(filePath);

const intervalo = process.hrtime(inicio);

const segundosTotais = intervalo[0] + intervalo[1] / 1e9;

console.log(`Tempo de execução: ${segundosTotais}s `);
