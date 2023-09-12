# Rinha de compiladores - Interpretador

## Execução para o rinha

Clone o repositório

```bash
https://github.com/gabrielogregorio/rinha-de-compiler.git
```

Execute o docker

```bash
docker build -t rinha .
docker run rinha
```

## Extras

## Execução do interpretador via cli

1. Use o nodejs 16.14 ou superior (recomendo o nodejs 20).
2. Instale os pacotes `yarn`
3. Faça o build do interpretador `yarn build`
4. Execute interpretador buildado informando o arquivo alvo `node dist/runner.js ./files/combination.json`


## Decisões
- Foi priorizado o uso de switch pelo desempenho, em testes, usando o if tinhamos 1s, e o switch 0.68s
- Switch em alguns casos não teve melhora significativa
- Node js 20 se mostrou muito mais eficiente do que node 16
- Ao usar o babel para compilar, o tempo de execução em alguns casos foi de 1.5s para 10s. Usar o typescript puro temos o tempo de 1.5s para os mesmos casos

## Decisões Extras
- Bun foi mais rápido do que nodejs

## Extras

Para brincar com o bun, execute um yarn build para buildar o interpretador.

1. Instale e execute o bun no seu ubuntu 22

```bash
npm install -g bun
bun dist/runner.js  ./files/combination.json
```
