## Unit tests

We use [Jest](https://facebook.github.io/jest/), for running unit test and generating test coverage reports.
See config in property `jest` in `package.json`.

Just type the following to run all test once:

```
npm test
```

You can watch changes and run tests automatically with:

```
npm run test:watch
```
This comes in handy since it’s blazingly fast. It runs only tests related to changed files per default but has an interactive mode which enables you to run all if needed.

### For those who are new to Jest

Writing test with Jest feels pretty much the same like writing tests with Mocha/Chai|Jasmine.
Just have a look at our small dummy test in `src/app/__tests__`.

Placing tests in `__tests__` directories is a default from Jest.
You can adjust the name of your tests-directory with the `testDirectoryName` configuration option.

The most important things to know:
- [API docs](https://facebook.github.io/jest/docs/api.html)
- [Assertions](https://facebook.github.io/jest/docs/expect.html)

*Your are not forced to use Jests assertions. You can alternatively use `assert` by just requiring it or install and use Chai.*

We strongly recommend to check the [docs](https://facebook.github.io/jest/docs/getting-started.html) to dive deeper and read for instance how Jest can help you with mocking.
