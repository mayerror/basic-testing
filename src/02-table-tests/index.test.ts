// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 134, b: 52, action: Action.Subtract, expected: 82 },
  { a: 9, b: 2, action: Action.Subtract, expected: 7 },
  { a: 2, b: 4, action: Action.Subtract, expected: -2 },
  { a: 11, b: 3, action: Action.Multiply, expected: 33 },
  { a: 9, b: 2, action: Action.Multiply, expected: 18 },
  { a: 25, b: 4, action: Action.Multiply, expected: 100 },
  { a: 12, b: 3, action: Action.Divide, expected: 4 },
  { a: 35, b: 5, action: Action.Divide, expected: 7 },
  { a: 116, b: 4, action: Action.Divide, expected: 29 },
];

const testCasesNull = [
  { a: 1, b: 2, action: '%', expected: null },
  { a: '2', b: 2, action: Action.Add, expected: null },
  { a: 3, b: '3', action: Action.Add, expected: null },
  { a: 134, b: true, action: Action.Subtract, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should perform $a $action $b and receive = $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
  test.each(testCasesNull)(
    'should try $action with incorrect parameters and receive $expected',
    ({ a, b, action }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBeNull();
    },
  );
});
