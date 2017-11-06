# Release Workflow

We provide a task to automate releases with the following options:

```
gulp release --bump (major|minor|patch|prerelease|premajor|preminor|prepatch) [--prerelease-identifier <yourIdentifier>]
```

*Hint: With `-B` there is a shorter alias available for `--bump`.*

See <http://semver.org> for details when to choose which release type.

The release task will:

- bump the version number in `package.json`
- generate a changelog
- commit changes
- create a Git tag

**Examples**

```
# Bump version from 3.1.2 to 4.0.0
gulp release -B major

# Bump version from 3.1.2 to 3.2.0
gulp release -B minor

# Bump version from 3.1.2 to 3.1.3
gulp release -B patch

# Bump version from 3.1.2 to 4.0.0-beta.0
gulp release -B premajor --prerelease-identifier beta

# Bump prerelease version eg. from 4.0.0-beta.0 to 4.0.0-beta.1
gulp release -B prerelease
```

## Changelog creation

The changelog is stored in the file `CHANGELOG.MD` in the project root. Every release updates this file.

We are using »conventional changelog« to get relevant changes out of the git commit history and group them nicely.

You should write your commit messages with this [conventions](https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-changelog-angular/convention.md) in mind.

See the last [commits](https://github.com/micromata/baumeister/commits) of Baumeister for some real life commit messages.

### Short summary of the conventions

Example commit message:
```
fix(uglify): Remove console output and debugger statements
```
Consists of:
```
type(scope): subject
```
#### Types

Types are used to group commits in the changelog.
Possible types which are rendered in the changelog are: `feat`, `fix` and `perf`.

There are additional ones which you can use. But these are only rendered if they introduce a breaking change:
`docs`, `chore`, `style`, `refactor`, and `test`.

#### Scope

The scope is optional and you can choose from whatever you want.
The scope is used as another grouping element below the type.

You can skip the parentheses if you don’t want to use Scope:
```
style: Fix linting errors
```

#### Subject

The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* capitalize first letter
* no dot (.) at the end

#### Additional Info,  Breaking changes and issue references

Are defined in the body of the commit message.

Example:
```
feat(build): Replace Grunt with Gulp
<BLANK LINE>
Closes #28
BREAKING CHANGE: Grunt Tasks aren’t available any longer.
But there are equivalent Gulp tasks.
List the available tasks with `gulp --tasks`
```
The body can include the motivation for the change and contrast this with previous behavior.

Plus it should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

### Generated Changelog

This is how a changelog based on this conventions is rendered:
https://github.com/angular/angular/blob/master/CHANGELOG.md
