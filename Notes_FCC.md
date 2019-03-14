# FreeCodeCamp
## Managing Packages with npm
### Introduction
* When starting a new project, npm generates a `package.json` file. This file lists the package dependencies for your project.
* npm saves packages in a folder named `nodemodules`. These packages can be installed in two ways:
  * **globally** in a root `nodemodules` folder, accessible by all projects.
  * **locally** within a project's own `nodemodules` folder, accessible only to that project.

### Add Keywords to Your package.json
```js
"keywords": [ "descriptive", "related", "words" ],
```
The keywords-field is where you can describe your project using related keywords.

### Expand Your Project with External Packages from npm
* Package Manager ensure dependency management.
* npm automatically installs all the required dependencies.
* In the dependencies-section, packages your project require are stored using the following format:
```js
"dependencies": {
  "package-name": "version",
  "express": "4.14.0"
}
```

### Semantic Versioning
* Semantic Versioning (SemVer) is an industry standard for software versioning aiming to make it easier to manage dependencies.
* This is how Semantic Versioning works according to the official website:

  Given a version number MAJOR.MINOR.PATCH, increment the:
  * MAJOR version when you make incompatible API changes,
  * MINOR version when you add functionality in a backwards-compatible manner, and
  * PATCH version when you make backwards-compatible bug fixes.
  
  This means that PATCHes are bug fixes and MINORs add new features but neither of them break what worked before. Finally, MAJORs add changes that won’t work with earlier versions.

### Tilde-Character Patch Version
* To allow a npm dependency to get updated to the latest PATCH-version, you can prefix the dependency’s version with the tilde-character (~). 
```js
"some-package-name": "~1.3.8" allows updates to any 1.3.x version.
```

### Caret-Character Patch Version
* Caret allows both MINOR and PATCHes update.
```js
"some-package-name": "^1.3.8" allows updates to any 1.x.x version.
```

