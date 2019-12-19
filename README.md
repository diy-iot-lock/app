# DIY IoT lock - application


Step 1: Use `publishConfig` option in your package.json
```json
"publishConfig": { "registry": "https://npm.pkg.github.com/" }
```


Step 2: Authenticate
```text
$ npm login --registry=https://npm.pkg.github.com/
```


Step 3: Publish
```text
$ npm publish
```
