import { interpret } from '.';

const combination = {
  name: 'files/combination.rinha',
  expression: {
    kind: 'Let',
    name: {
      text: 'combination',
      location: {
        start: 4,
        end: 15,
        filename: 'files/combination.rinha',
      },
    },
    value: {
      kind: 'Function',
      parameters: [
        {
          text: 'n',
          location: {
            start: 22,
            end: 23,
            filename: 'files/combination.rinha',
          },
        },
        {
          text: 'k',
          location: {
            start: 25,
            end: 26,
            filename: 'files/combination.rinha',
          },
        },
      ],
      value: {
        kind: 'Let',
        name: {
          text: 'a',
          location: {
            start: 41,
            end: 42,
            filename: 'files/combination.rinha',
          },
        },
        value: {
          kind: 'Binary',
          lhs: {
            kind: 'Var',
            text: 'k',
            location: {
              start: 45,
              end: 46,
              filename: 'files/combination.rinha',
            },
          },
          op: 'Eq',
          rhs: {
            kind: 'Int',
            value: 0,
            location: {
              start: 50,
              end: 51,
              filename: 'files/combination.rinha',
            },
          },
          location: {
            start: 45,
            end: 51,
            filename: 'files/combination.rinha',
          },
        },
        next: {
          kind: 'Let',
          name: {
            text: 'b',
            location: {
              start: 61,
              end: 62,
              filename: 'files/combination.rinha',
            },
          },
          value: {
            kind: 'Binary',
            lhs: {
              kind: 'Var',
              text: 'k',
              location: {
                start: 65,
                end: 66,
                filename: 'files/combination.rinha',
              },
            },
            op: 'Eq',
            rhs: {
              kind: 'Var',
              text: 'n',
              location: {
                start: 70,
                end: 71,
                filename: 'files/combination.rinha',
              },
            },
            location: {
              start: 65,
              end: 71,
              filename: 'files/combination.rinha',
            },
          },
          next: {
            kind: 'If',
            condition: {
              kind: 'Binary',
              lhs: {
                kind: 'Var',
                text: 'a',
                location: {
                  start: 81,
                  end: 82,
                  filename: 'files/combination.rinha',
                },
              },
              op: 'Or',
              rhs: {
                kind: 'Var',
                text: 'b',
                location: {
                  start: 86,
                  end: 87,
                  filename: 'files/combination.rinha',
                },
              },
              location: {
                start: 81,
                end: 87,
                filename: 'files/combination.rinha',
              },
            },
            then: {
              kind: 'Int',
              value: 1,
              location: {
                start: 103,
                end: 104,
                filename: 'files/combination.rinha',
              },
            },
            otherwise: {
              kind: 'Binary',
              lhs: {
                kind: 'Call',
                callee: {
                  kind: 'Var',
                  text: 'combination',
                  location: {
                    start: 130,
                    end: 141,
                    filename: 'files/combination.rinha',
                  },
                },
                arguments: [
                  {
                    kind: 'Binary',
                    lhs: {
                      kind: 'Var',
                      text: 'n',
                      location: {
                        start: 142,
                        end: 143,
                        filename: 'files/combination.rinha',
                      },
                    },
                    op: 'Sub',
                    rhs: {
                      kind: 'Int',
                      value: 1,
                      location: {
                        start: 146,
                        end: 147,
                        filename: 'files/combination.rinha',
                      },
                    },
                    location: {
                      start: 142,
                      end: 147,
                      filename: 'files/combination.rinha',
                    },
                  },
                  {
                    kind: 'Binary',
                    lhs: {
                      kind: 'Var',
                      text: 'k',
                      location: {
                        start: 149,
                        end: 150,
                        filename: 'files/combination.rinha',
                      },
                    },
                    op: 'Sub',
                    rhs: {
                      kind: 'Int',
                      value: 1,
                      location: {
                        start: 153,
                        end: 154,
                        filename: 'files/combination.rinha',
                      },
                    },
                    location: {
                      start: 149,
                      end: 154,
                      filename: 'files/combination.rinha',
                    },
                  },
                ],
                location: {
                  start: 130,
                  end: 155,
                  filename: 'files/combination.rinha',
                },
              },
              op: 'Add',
              rhs: {
                kind: 'Call',
                callee: {
                  kind: 'Var',
                  text: 'combination',
                  location: {
                    start: 158,
                    end: 169,
                    filename: 'files/combination.rinha',
                  },
                },
                arguments: [
                  {
                    kind: 'Binary',
                    lhs: {
                      kind: 'Var',
                      text: 'n',
                      location: {
                        start: 170,
                        end: 171,
                        filename: 'files/combination.rinha',
                      },
                    },
                    op: 'Sub',
                    rhs: {
                      kind: 'Int',
                      value: 1,
                      location: {
                        start: 174,
                        end: 175,
                        filename: 'files/combination.rinha',
                      },
                    },
                    location: {
                      start: 170,
                      end: 175,
                      filename: 'files/combination.rinha',
                    },
                  },
                  {
                    kind: 'Var',
                    text: 'k',
                    location: {
                      start: 177,
                      end: 178,
                      filename: 'files/combination.rinha',
                    },
                  },
                ],
                location: {
                  start: 158,
                  end: 179,
                  filename: 'files/combination.rinha',
                },
              },
              location: {
                start: 130,
                end: 179,
                filename: 'files/combination.rinha',
              },
            },
            location: {
              start: 77,
              end: 185,
              filename: 'files/combination.rinha',
            },
          },
          location: {
            start: 57,
            end: 185,
            filename: 'files/combination.rinha',
          },
        },
        location: {
          start: 37,
          end: 185,
          filename: 'files/combination.rinha',
        },
      },
      location: {
        start: 18,
        end: 187,
        filename: 'files/combination.rinha',
      },
    },
    next: {
      kind: 'Print',
      value: {
        kind: 'Call',
        callee: {
          kind: 'Var',
          text: 'combination',
          location: {
            start: 196,
            end: 207,
            filename: 'files/combination.rinha',
          },
        },
        arguments: [
          {
            kind: 'Int',
            value: 10,
            location: {
              start: 208,
              end: 210,
              filename: 'files/combination.rinha',
            },
          },
          {
            kind: 'Int',
            value: 2,
            location: {
              start: 212,
              end: 213,
              filename: 'files/combination.rinha',
            },
          },
        ],
        location: {
          start: 196,
          end: 214,
          filename: 'files/combination.rinha',
        },
      },
      location: {
        start: 190,
        end: 215,
        filename: 'files/combination.rinha',
      },
    },
    location: {
      start: 0,
      end: 215,
      filename: 'files/combination.rinha',
    },
  },
  location: {
    start: 0,
    end: 215,
    filename: 'files/combination.rinha',
  },
};

describe('', () => {
  it('', () => {
    expect(interpret({}, combination.expression)).toEqual(45);
  });
});
