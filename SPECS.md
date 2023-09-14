# Especificação

Essa é a especificação da arvore sintática abstrata. Uma árvore sintática abstrata é uma estrutura
feita para ser lida por um computador que expressa um programa. Por exemplo, se você tem um programa que diz
"Some dois números e mostre o resultado", a Árvore Sintática Abstrata irá mostrar que há uma ação
principal (somar dois números e mostrar o resultado) e que essa ação é composta por duas partes
(somar e mostrar). Isso torna mais fácil para o computador entender e executar o programa corretamente.

Uma representação da árvore abstrata de `1 + 2` seria:

```
└ Add
  ├── Literal
  │   └── 1
  └── Literal
      └── 2
```

Ou em JSON da linguagem Rinha

```
{
  "name": "ata.rinha",
  "expression": {
    "kind": "Binary",
    "lhs": {
      "kind": "Int",
      "value": 1,
      "location": ..
    },
    "op": "Add",
    "rhs": {
      "kind": "Int",
      "value": 2,
      "location": ..
    },
    "location": ..
  },
  "location": ..
}
```

Onde `..` é um location node que foi ocultado por brevidade.

## Nodes

### File

`File` é uma estrutura que tem dados do arquivo inteiro e que contém os seguintes campos:

| Nome       | Tipo                  |               |
| ---------- | --------------------- |---------------|
| name       | String                | [❌](#File#)    |
| expression | Term                  | [❌](#File#)    |
| location   | [Location](#location) | [❌](#File#)    |

### Location

`Location` é uma estrutura que contém campos para localização de um pedaço da árvore dentro do código fonte

| Nome     | Tipo   |      |
| -------- | ------ |------|
| start    | Int    |  [❌](#Location#)  |
| end      | Int    |  [❌](#Location#)  |
| filename | String |  [❌](#Location#)  |

### Parameter

`Parameter` representa o nome de uma parâmetro. É definida por:

| Nome     | Tipo                  |      |
| -------- | --------------------- |------|
| text     | String                |  [❌](#Parameter#)  |
| location | [Location](#location) |  [❌](#Parameter#)  |

### Var (Nome de uma variável)

`Var` representa o nome de uma variável. É definida por:

| Nome     | Tipo                  |      |
| -------- | --------------------- |------|
| kind     | String                |  [❌](#Var#)  |
| text     | String                |  [❌](#Var#)  |
| location | [Location](#location) |  [❌](#Var#)  |

### Function (Função anônima)

`Function` é a criação de uma função anônima que pode capturar o ambiente, ela é representada por:

| Nome       | Tipo                      |      |
| ---------- | ------------------------- |------|
| kind       | String                    |  [❌](#Function#)  |
| parameters | [[Parameter](#parameter)] |  [❌](#Function#)  |
| value      | Term                      |  [❌](#Function#)  |
| location   | [Location](#location)     |  [❌](#Function#)  |

Toda função quando chamada deve dar erro caso o número de parâmetros seja diferente do número de argumentos.

### Call (Aplicação de função)

`Call` é uma aplicação de funçao entre um termo e varios outros termos chamados de argumentos. Essa estrutura é representada por:

| Nome      | Tipo                  |      |
| --------- | --------------------- |------|
| kind      | String                |  [❌](#Call#)  |
| callee    | Term                  |  [❌](#Call#)  |
| arguments | [Term]                |  [❌](#Call#)  |
| location  | [Location](#location) |  [❌](#Call#)  |

### Let

`Let` é uma estrutura que representa um `let in`, ou seja, além de ela conter um let, ela especifica a proxima estrutura. Todo let pode fazer _shadowing_, ou seja, usar o mesmo nome de outra variável e "ocultar" o valor da variável antiga, porém, isso não será testado.

| Nome     | Tipo                    | Status    |
| -------- | ----------------------- |-----------|
| kind     | String                  | [❌](#Let#) |
| name     | [Parameter](#parameter) | [❌](#Let#) |
| value    | Term                    | [❌](#Let#) |
| next     | Term                    | [❌](#Let#) |
| location | [Location](#location)   | [❌](#Let#) |

É permitido usar hoisting como forma de possibilitar a criação de funções recursivas.

### Str (Texto)

`Str` é uma estrutura que representa um literal de texto. Ela é representada por:

| Nome     | Tipo                  |status|
| -------- | --------------------- |------|
| kind     | String                |  [❌](#Str#)  |
| value    | String                |  [❌](#Str#)  |
| location | [Location](#location) |  [❌](#Str#)  |

### Int (Inteiro)

`Int` é uma estrutura que representa um literal de número inteiro signed que tem tamanho de 32 bits, ou seja um Int32. Ela é representada por:

| Nome     | Tipo                  |status|
| -------- | --------------------- |------|
| kind     | String                |  [❌](#Int#)  |
| value    | Number                |  [❌](#Int#)  |
| location | [Location](#location) |  [❌](#Int#)  |

### BinaryOp (Operador Binário)

Um `BinaryOp` é um enumerador que representa uma operação binária. Essas são as variantes disponiveis:

| Nome | Descrição        | Exemplos que devem ser válidos                                      |           |
| ---- | ---------------- | ------------------------------------------------------------------- |-----------|
| Add  | Soma             | `3 + 5 = 8`, `"a" + 2 = "a2"`, `2 + "a" = "2a"`, `"a" + "b" = "ab"` | [❌](#Add#) |
| Sub  | Subtração        | `0 - 1 = -1`                                                        | [❌](#Sub#) |
| Mul  | Multiplicação    | `2 * 2 = 4`                                                         | [❌](#Mul#) |
| Div  | Divisão          | `3 / 2 = 1`                                                         | [❌](#Div#) |
| Rem  | Resto da divisão | `4 % 2 = 0`                                                         | [❌](#Rem#) |
| Eq   | Igualdade        | `"a" == "a"`, `2 == 1 + 1`, `true == true`                          | [❌](#Eq#)  |
| Neq  | Diferente        | `"a" != "b"`, `3 != 1 + 1`, `true != false`                         | [❌](#Neq#) |
| Lt   | Menor            | `1 < 2`                                                             | [❌](#Lt#)  |
| Gt   | Maior            | `2 > 3`                                                             | [❌](#Gt#)  |
| Lte  | Menor ou igual   | `1 <= 2`                                                            | [❌](#Lte#) |
| Gte  | Maior ou igual   | `1 >= 2`                                                            | [❌](#Gte#) |
| And  | Conjunção        | `true && false`                                                     | [❌](#And#) |
| Or   | Disjunção        | `false \|\| true`                                                   | [❌](#Or#)  |

Overflow não será testado.

### Bool (Booleano)

`Bool` é uma estrutura que representa um literal de boolean. Ela é representada por:

| Nome     | Tipo                  |      |
| -------- | --------------------- |------|
| kind     | String                |  [✅](#Bool#)  |
| value    | Bool                  |  [✅](#Bool#)  |
| location | [Location](#location) |  [✅](#Bool#)  |

### If

`If` é uma estrutura que representa um bloco if/else dentro da linguagem. Ele é usado para tomar decisões com base em uma condição e sempre retorna um valor, é como se fosse um ternário de JS. O formato da estrutura é semelhante ao seguinte exemplo:

A condição do if deve ser sempre um boolean.

```javascript
if (true) {
  a;
} else {
  b;
}
```

| Nome      | Tipo                  |         |
| --------- | --------------------- |---------|
| kind      | String                | [❌](#If#)|
| condition | Term                  | [❌](#If#)|
| then      | Term                  | [❌](#If#)|
| otherwise | Term                  | [❌](#If#)|
| location  | [Location](#location) | [❌](#If#)|

### Binary (Operação Binária)

`Binary` é uma operação binária entre dois termos sendo representada por:


| Nome     | Tipo                                   |         |
| -------- | -------------------------------------- |---------|
| kind     | String                                 | [❌](#Binary#) |
| lhs      | Term                                   | [❌](#Binary#) |
| op       | [BinaryOp](#binaryop-operador-binário) | [❌](#Binary#) |
| rhs      | Term                                   | [❌](#Binary#) |
| location | [Location](#location)                  | [❌](#Binary#) |

### Tuple (Criação de uma 2-Tuple)

`Tuple` é um elemento que descreve a criação de uma tupla com a sintaxe:

```
(x, y)
```

Ela tem os seguintes elementos:

| Nome     | Tipo                  |         |
| -------- | --------------------- |---------|
| kind     | String                | [❌](#Tuple#) |
| first    | Term                  | [❌](#Tuple#) |
| second   | Term                  | [❌](#Tuple#) |
| location | [Location](#location) | [❌](#Tuple#) |

### First (Função de pegar o primeiro elemento de uma tupla)

`First` é uma chamada de função que pega o primeiro elemento de uma tupla. Ela é definida por:

```
first((1, 2))
```

| Nome     | Tipo                  |          |
| -------- | --------------------- |----------|
| kind     | String                | [❌](#First#) |
| value    | Term                  | [❌](#First#) |
| location | [Location](#location) | [❌](#First#) |

Quando o first for chamado com algo que não é uma tupla ele deve dar um erro de runtime.

### Second (Função de pegar o segundo elemento de uma tupla)

`Second` é uma chamada de função que pega o segundo elemento de uma tupla. Ela é definida por:

```
second((1, 2))
```

| Nome     | Tipo                  |              |
| -------- | --------------------- |-------------|
| kind     | String                | [❌](#Second#) |
| value    | Term                  | [❌](#Second#) |
| location | [Location](#location) | [❌](#Second#) |

Quando o second for chamado com algo que não é uma tupla ele deve dar um erro de runtime.

### Print (Função de printar para o standard output)

`Print` é a chamada da função de printar para o standard output. Ela é definida por:

Exemplos que devem ser válidos: `print(a)`, `print("a")`, `print(2)`, `print(true)`, `print((1, 2))`

| Nome     | Tipo                  |status|
| -------- | --------------------- |------|
| kind     | String                |  [❌](#Print#)  |
| value    | Term                  |  [❌](#Print#)  |
| location | [Location](#location) |  [❌](#Print#)  |

Os valores devem ser impressos como:

| Tipo    | Como deve ser printado           |status|
| ------- | -------------------------------- |------|
| String  | a string sem aspas duplas ex `a` |  [✅](#PrintString#)  |
| Number  | o literal de número ex `0`       |  [✅](#PrintNumber#)  |
| Boolean | `true` ou `false`                |  [✅](#PrintBoolean#)  |
| Closure | `<#closure>`                     |  [✅](#PrintClosure#)  |
| Tuple   | `(term, term)`                   |  [✅](#PrintTuple#)  |

### Term [✅](#TermType#)

Um termo pode ser qualquer uma das seguintes estruturas:

- Int
- Str
- Call
- Binary
- Function
- Let
- If
- Print
- First
- Second
- Bool
- Tuple
- Var
