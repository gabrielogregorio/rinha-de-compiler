import { interpreter } from './interpreter';
import { readAst } from './readAst';

interpreter(readAst('/var/rinha/source.rinha.json').expression, {});
