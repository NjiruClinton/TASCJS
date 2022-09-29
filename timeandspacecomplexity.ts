
function timeAndSpaceComplexities (file: string) {
var fs = require('fs');
var esprima = require('esprima');
var escomplexModule = require('typhonjs-escomplex-module');
var escomplexProject = require('typhonjs-escomplex-project');
var escomplex = require('typhonjs-escomplex');
var readfile = fs.readFileSync(file, 'utf8');
//console.log(file);
var ast = esprima.parse(readfile, { loc: true, range: true });
//console.log(ast)
var report = escomplex.analyzeModule(readfile, escomplexModule, escomplexProject);
console.log(report);
}

timeAndSpaceComplexities('test.js');