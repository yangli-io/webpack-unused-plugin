import glob from 'glob';
import fs from 'fs';
import path from 'path';
import './arrayFindPolyfill';

export default class UnusedPlugin {
  constructor(opts = { filename: 'unused-files.json', ignore: [], srcPath: '**/*.js' }) {
    this.opts = opts;
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      const modules = compilation.getStats().toJson().modules;

      glob(this.opts.srcPath, {}, (err, files) => {
        if (err) console.log(err);

        if (!err)
          var notFound = files.filter(file => {
            const test = this.opts.ignore.filter(regex => regex.test(file));

            if (test.length) return false;

            return !modules.find(({ name }) => file === name)
          });

        let outputFile = path.join(compilation.outputOptions.path, this.opts.filename);

        fs.writeFile(
          path.join(outputFile),
          JSON.stringify(notFound),
          callback
        );
      });
    });
  }
}
