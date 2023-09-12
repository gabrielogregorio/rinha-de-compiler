import fNode from 'node:fs';

export const readAst = (path: string) => JSON.parse(fNode.readFileSync(path) as unknown as string);
