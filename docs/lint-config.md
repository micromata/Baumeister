# Configuring linters

Below you’ll find information how to adapt the rules in case they don’t fit your preferences.

## ESLint (JavaScript)

We are using [eslint-config-xo](https://github.com/sindresorhus/eslint-config-xo) as presets but adapted a few rules within:

```
.eslintrc.json
```

See [ESLint rules](http://eslint.org/docs/rules/) in case you like get details to these rules.

In addition we extend the settings for client code in:

```
src/app/.eslintrc.json
```

See [Configuring ESLint](http://eslint.org/docs/user-guide/configuring) if you need to know more.


## stylelint (Sass)

We are using [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) as presets but adapted a few rules within:

```
.stylelintrc.json
```

See [stylelint rules](https://stylelint.io/user-guide/rules/) in case you like get details to these rules and the [stylelint user guide](https://stylelint.io/user-guide/configuration/) to see how to configure stylelint (e.g. how to turn of rules).

## Bootlint (Markup)

We are using [Bootlint](https://github.com/twbs/bootlint) to check for potential markup errors when using Bootstrap.
You can disable certain [rules](https://github.com/twbs/bootlint/wiki) within:

```
gulp/tasks/lint-bootstrap.js
```
