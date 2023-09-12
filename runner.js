const fs = require('fs');
const interpreter = require('./dist/index')

const filePath = process.argv.slice(2)[0];

const readAst = (filePathLocal) => {
  return JSON.parse(fs.readFileSync(filePathLocal))
}
const runInterpreter = (filePathLocal) => {
  try {
    const astTree = readAst(filePathLocal)
    return interpreter.interpreter(astTree.expression, {});
  } catch (error) {
    console.error('ops, algo deu errado:', error.message);
    return
  }

}

const inicio = process.hrtime();

runInterpreter(filePath)

const intervalo = process.hrtime(inicio);

const segundosTotais = intervalo[0] + intervalo[1] / 1e9;

console.log(`Tempo de execução: ${segundosTotais}s `);
