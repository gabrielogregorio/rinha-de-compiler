# Rinha de compiladores - Interpretador

[Repositório para quem quiser participar](https://github.com/aripiprazole/rinha-de-compiler)

Este é um interpretador que recebe uma AST conforme especificação do [rinha](https://github.com/aripiprazole/rinha-de-compiler) e interpreta as instruções.

O projeto é baseado em node 20 e typescript e ainda está em desenvolvimento.

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


## Execução do interpretador via cli

1. Use o nodejs 16.14 ou superior (recomendo o nodejs 20).
2. Instale os pacotes `yarn`
3. Faça o build do interpretador `yarn build`
4. Execute interpretador buildado informando o arquivo alvo `node dist/runner.js ./files/combination.json`


## Decisões
- Foi priorizado o uso de switch pelo desempenho, em testes, usando o if tinhamos 1s, e o switch 0.68s
- Switch em alguns casos não teve melhora significativa, por isso ainda temos ifs espalhados por ai.
- Node js 20 se mostrou muito mais eficiente do que node 16, coisas de 2s foram para 1.6s
- Bun foi mais rápido do que nodejs, indo para 1.4s mas por enquanto ainda sigo no nodejs, para aprender melhor sobre o node antes que o bun o substitua de vez haha
- Ao usar o babel para compilar, o tempo de execução em alguns casos foi de 1.5s para 10s. Usar o typescript puro temos o tempo de 1.5s para os mesmos casos.
- Decidi não dividir o interpretador em funções a parte, já que começei a lidar com algumas questões chatinhas como uma função sendo chamada antes dela ter sido declarada (ta o js permite isso, mas é feio, estranho, sugeito a bugs e enfim, to tentando evitar.), e outros pontos que são feios e estranhos, e por isso preferi manter tudo junto.

## Extras

Para brincar com o bun, execute um yarn build para buildar o interpretador.

1. Instale e execute o bun no seu ubuntu 22

```bash
npm install -g bun
bun dist/runner.js  ./files/combination.json
```
