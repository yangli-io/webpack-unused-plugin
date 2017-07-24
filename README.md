# Webpack Unused Plugin

## Installation

```
npm install webpack-unused-plugin
```

## Usage

```js
import UnusedPlugin from 'webpack-unused-plugin';

// ...  
plugins: [new UnusedPlugin({
    filename: 'unused-files.json',
    ignore: [/\/server\//. /\.spec\./, /\.test\./],
    srcPath: './src/**/*.js'
})],
// ...

```