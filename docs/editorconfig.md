# Setting up your Editor (optional)

We strongly advise to install an [EditorConfig plugin](http://editorconfig.org/#download) and take a look at the `.editorconfig` file in the root of this project.

Beside that we recommend setting up a project within in your editor if you don’t want to see these generated files cluttered all over your project. In case of Sublime Text it’s as easy as hitting »Project« → »Save Project As …« and adding the following to `projectName.sublime-project`.

```json
{
  "folders": [{
    "path": ".",
    "folder_exclude_patterns": [
      "node_modules",
      "server",
      "dist",
      "src/assets/css",
			".git"
    ],
    "file_exclude_patterns": [
      ".editorconfig",
      ".travis.yml",
			".browserify-cache-client.json",
			".browserify-cache-vendor.json",
			".DS_Store"
    ]
  }]
}
```
