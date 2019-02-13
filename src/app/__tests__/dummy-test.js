/**
 * Using Jest for tests.
 * See:
 * - https://facebook.github.io/jest/docs/expect.html for assertions
 * - https://facebook.github.io/jest/docs/api.html for methods
 */

let one;

beforeAll(() => {
  one = 1;
});

describe('Dummy', () => {
  it('has a test', () => {
    expect(one).toBeTruthy();
  });
});
