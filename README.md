# Rinha de compiladores - Interpretador

## Execução do interpretador via docker

> É preciso do docker compose v2 ou você pode editar o makefile para sua versão favorita

1 - [Tutorial](https://www.nerdlivre.com.br/como-instalar-o-docker-compose-no-ubuntu-22-04/) para o caso de você precisar de instalar o docker no seu ubuntu

2 - Após rodar os comandos, talvez vocẽ precise rodar mais alguns comandos, segue abaixo
```bash
sudo usermod -aG docker $USER
sudo chmod 666 /var/run/docker.sock
```

3 - Execute o build da aplicação
```bash
make build # ou make b
```

4 - No dockerfile você pode escolher o arquivo que quer executar `CMD [ "node", "./dist/runner.js", "./files/combination.json" ]`

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
- `CMD [ "node", "runner.js", "./files/fib.json" ]`

## Extras

Para brincar com o bun, execute um yarn build para buildar o interpretador.

1. Instale e execute o bun no seu ubuntu 22

```bash
npm install -g bun
bun dist/runner.js  ./files/combination.json
```
