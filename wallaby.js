var wallabyWebpack = require('wallaby-webpack');

var webpackPostprocessor = wallabyWebpack({
  entryPatterns: [
    'src/wallabyTest.js',
    'src/**/*spec.js'
  ],

  module: {
    loaders: [{
        test: /\.css$/,
        loader: 'raw-loader'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.js$/,
        loader: 'angular2-template-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.styl$/,
        loaders: ['raw-loader', 'stylus-loader']
      },
      {
        test: /\.less$/,
        loaders: ['raw-loader', 'less-loader']
      },
      {
        test: /\.scss$|\.sass$/,
        loaders: ['raw-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url-loader?limit=128000'
      }
    ]
  }
});

var compilerOptions = require('./src/tsconfig.spec.json').compilerOptions;

module.exports = function (wallaby) {

  return {
    files: [{
        pattern: 'src/**/*.ts',
        load: false
      },
      {
        pattern: 'src/**/*.d.ts',
        ignore: true
      },
      {
        pattern: 'src/**/*.css',
        load: false
      },
      {
        pattern: 'src/**/*.less',
        load: false
      },
      {
        pattern: 'src/**/*.scss',
        load: false
      },
      {
        pattern: 'src/**/*.sass',
        load: false
      },
      {
        pattern: 'src/**/*.html',
        load: false
      },
      {
        pattern: 'src/**/*spec.ts',
        ignore: true
      }
    ],

    tests: [{
      pattern: 'src/**/*spec.ts',
      load: false
    }],

    testFramework: 'jasmine',

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript(compilerOptions)
    },

    env: {
      kind: 'electron'
    },

    postprocessor: webpackPostprocessor,

    setup: function () {
      window.__moduleBundler.loadTests();
    },

    hints: {
      ignoreCoverage: /istanbul ignore next/
    },

    filesWithNoCoverageCalculated: [
      'src/**/*-helper.ts',
      'src/app/mock-http/**.ts',
      'src/test.ts',
      'src/wallabyTest.ts',
      'src/main.ts',
      'src/environments/environment*.ts',
      'src/app/router-store.ts',
      'src/app/app.imports.ts',
      'src/app/app.declarations.ts',
      'src/app/app.providers.ts',
      'src/app/services/renderer/**/*.ts'
    ],

    debug: false
  };
};
