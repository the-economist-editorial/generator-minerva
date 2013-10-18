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
      }.bind(this);
    });
  });
  
  this.on('dependenciesInstalled', function() {
    this.spawnCommand('grunt', ['git_init']);
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(EdiGenerator, yeoman.generators.Base);

EdiGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [{
    name: 'projectName',
    message: 'What\'s the name of the project?'
  }];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;
    cb();
  }.bind(this));
};

EdiGenerator.prototype.app = function app() {
  this.copy('css/style.css', 'css/style.css');
  this.copy('css/sass/style.scss', 'css/sass/style.scss');
  this.copy('js/init.js', 'js/init.js');
  this.copy('js/tpl/template.js', 'js/tpl/template.js');
  this.copy('js/tpl/handlebars/tpl.handlebars', 'js/tpl/handlebars/tpl.handlebars');
  this.copy('js/tests/tests.js', 'js/tests/tests.js');
  this.copy('index.html', 'index.html');
  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('Gruntfile.js', 'Gruntfile.js');
};
