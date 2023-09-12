/* eslint-disable no-use-before-define */

type ExpressAnonymousFunction = {
  kind: 'Function';
  parameters: {
    text: string;
  }[];
  value: Expression;
};

type ExpressionBoolean = {
  kind: 'Bool';
  value: number;
};

type ExpressionInteger = {
  kind: 'Int';
  value: number;
};

type ExpressionString = {
  kind: 'Str';
  value: string;
};

type ExpressionNameVariable = {
  kind: 'Var';
  text: string;
};

type ExpressionCallFunction = {
  kind: 'Call';
  callee: Expression;
  arguments: Expression[];
};

type Operators = 'Add' | 'Sub' | 'Mul' | 'Div' | 'Rem' | 'Eq' | 'Neq' | 'Lt' | 'Gt' | 'Lte' | 'Gte' | 'And' | 'Or';

type ExpressionBinaryOperator = {
  kind: 'Binary';
  lhs: Expression;
  op: Operators;
  rhs: Expression;
};

type ExpressionCondition = {
  kind: 'If';
  condition: ExpressionBinaryOperator;
  then: Expression;
  otherwise: ExpressionBinaryOperator;
};

type ExpressionPrint = {
  kind: 'Print';
  value: Expression;
};

type ExpressionDeclareLet = {
  kind: 'Let';
  name: {
    text: string;
  };
  value: Expression;
  next: Expression;
};

export type Base = {
  expression: Expression;
};

export type Expression =
  | Base
  | ExpressionDeclareLet
  | ExpressionCondition
  | ExpressAnonymousFunction
  | ExpressionNameVariable
  | ExpressionBinaryOperator
  | ExpressionCallFunction
  | ExpressionInteger
  | ExpressionString
  | ExpressionPrint
  | ExpressionBoolean;

// FINISH IMPLEMENTATION SPECIFICATION...
