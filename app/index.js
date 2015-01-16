'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var EdiGenerator = module.exports = function EdiGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      skipInstall: options['skip-install'],
      callback: function() {
        this.emit('dependenciesInstalled');
      }.bind(this)
    });
  });

  this.on('dependenciesInstalled', function() {
    this.spawnCommand('grunt', ['git']);
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(EdiGenerator, yeoman.generators.Base);

EdiGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [{
    name: 'projectName',
    message: 'What\'s the name of the project? (e.g.: Slideshow)'
  },
  {
    name: 'projectDescription',
    message: 'Description:'
  },
  {
    name: 'instances',
    message: 'How many widget instances for test purpose?',
    default: 1,
    validate: function(input){
      // Check if is integer
      input = parseInt(input);
      return (typeof input==='number' && (input%1)===0) || 'Please provide an integer';
    }
  },
  {
    name: 'handlebars',
    message: 'Do you need handlebars? (y/n)',
    defaut: 'n'
  },
  {
    name: 'graphicLibrary',
    type: "list",
    message: 'Choose a graphic Library:',
    choices: [
      { name: 'None', value: null, checked: true },
      { name: 'Raphael', value: 'r' },
      { name: 'D3', value: 'd' },
      { name: 'Highchart', value: 'h' }
    ]
  }];

  this.prompt(prompts, function (props) {
    this.suffix = 'ec-';
    this.projectName = props.projectName;
    this.projectDescription = props.projectDescription;
    this.ns = this.suffix + this._.slugify(this.projectName);
    this.projectFolder = this.ns;
    this.instances = props.instances;
    this.handlebars = props.handlebars;
    this.graphicLibrary = props.graphicLibrary;
    cb();
  }.bind(this));
};

EdiGenerator.prototype.app = function app() {
  this.copy('node_modules/grunt-collection/package.json', 'node_modules/grunt-collection/package.json');
  this.directory('sites/', 'sites/');
  this.copy('css/style.css', 'css/style.css');
  this.copy('css/sass/style.scss', 'css/sass/style.scss');
  this.copy('css/sass/vars.scss', 'css/sass/vars.scss');
  this.copy('js/init.js', 'js/init.js');
  if(this.handlebars=='y'){
    this.copy('js/tpl/template.js', 'js/tpl/template.js');
    this.copy('js/tpl/handlebars/tpl.handlebars', 'js/tpl/handlebars/' + this.projectFolder + '.handlebars');
  }
  this.copy('js/tests/tests.js', 'js/tests/tests.js');
  this.copy('partials/widgetbody.handlebars', 'partials/widgetbody.handlebars');
  this.copy('partials/widgetexternal.handlebars', 'partials/widgetexternal.handlebars');
  this.copy('partials/widgethead.handlebars', 'partials/widgethead.handlebars');
  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('_minerva.json', 'minerva.json');
  this.copy('Gruntfile.js', 'Gruntfile.js');
};