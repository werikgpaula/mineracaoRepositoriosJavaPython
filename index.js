const download = require("download-git-repo")
const fs    = require('fs');
const sloc  = require('sloc');

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
	return files_;
}

var metrics = {}

function getMetrics(files){
    metrics = {
		total: 0,
		source: 0,
		comment: 0,
		single: 0,
		block: 0,
		mixed: 0,
		blockEmpty: 0,
		empty: 0,
		todo: 0
	}
	for(var file of files){
		file = file.toString()
		let code = fs.readFileSync(file).toString()
	    var stats = sloc(code,"js");
	    for(i in sloc.keys){
	    	var k = sloc.keys[i];
	    	metrics[k] += stats[k]
	    }
	}	
}

download('Netflix/ribbon', './repositorio/java',  function (err) {
	console.log(err ? err : 'Success')
	const files = getFiles('./repositorio/java')
	getMetrics(files)
	fs.writeFile('./metrics/java.txt', JSON.stringify(metrics), function (err) {
		if (err) return console.log(err);		
	  	console.log('Metrica salva com sucesso');
	})
})

download('ilius/pyglossary', './repositorio/python',  function (err) {
	console.log(err ? err : 'Success')
	const files = getFiles('./repositorio/python')
	getMetrics(files)
	fs.writeFile('./metrics/python.txt', JSON.stringify(metrics), function (err) {
		if (err) return console.log(err);		
	  	console.log('Metrica salva com sucesso');
	})
})