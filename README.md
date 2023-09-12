# Execução do interpretador via docker

> precisa do docker compose v2 ou editar o make

```bash
make build realiza o build do interpretador de typescript para javascript
make dev executa o script
```

No dockerfile você pode escolher o arquivo que quer executar `CMD [ "node", "./dist/runner.js", "./files/combination.json" ]`


# Execução do interpretador via cli

1. Use o nodejs 16.14 ou superior (recomendo o nodejs 20). `nvm use 16.14`
2. Instale os pacotes `yarn`
3. Faça o build do interpretador `yarn build`
4. Execute o sujeito informando o script que deseja executar `node dist/runner.js ./files/combination.json`


## Decisões
- Foi priorizado o uso de switch pelo desempenho, em testes, usando o if tinhamos 1s, e o switch 0.68s

CMD [ "node", "runner.js", "./files/fib.json" ]


## Extras

Para brincar com o bun, execute um yarn build para buildar o interpretador.

Instale e execute o bun no seu ubuntu 22

```bash

npm install -g bun
bun dist/runner.js  ./files/combination.json
```
