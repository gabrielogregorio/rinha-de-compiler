import fNode from 'fs';

export const readAst = (path: string) => JSON.parse(fNode.readFileSync(path) as unknown as string);
