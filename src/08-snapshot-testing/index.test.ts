import { generateLinkedList } from './index';

const testList = { value: 5, next: { value: null, next: null } };

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList([5]);
    console.log(list);
    expect(list).toStrictEqual(testList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = generateLinkedList([5, 2]);
    console.log(list);
    expect(list).toMatchSnapshot();
  });
});
