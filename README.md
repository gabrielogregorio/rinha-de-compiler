# precisa do docker compose v2 ou editar o make

make build realiza o build do interpretador para typescript
make dev executa o script

No dockerfile você pode escolher o arquivo que quer executar

# Decisões
- Foi priorizado o uso de switch pelo desempenho, em testes, usando o if tinhamos 1s, e o switch 0.68s

CMD [ "node", "runner.js", "./files/fib.json" ]
