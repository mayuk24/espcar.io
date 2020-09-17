const
	{jsTemplate,inoTemplate}	= require('./templates'),
	fs					= require('fs'),
	path				= require('path'),
	jsFile			= path.join(__dirname, '../../public/js/app.js'),
	inoFile			= path.join(__dirname, '../../../espcar-ino/espcar/espcar.ino'),
	writeFiles	= (file,template,msg) =>{
		fs.open(file, 'w', (err, desc) => {
			if(!err && desc) {
				fs.writeFile(desc,template, (err) => {
					if (err) throw err;
					console.log(`${msg} updated`);
				});
			}
		});
	};

writeFiles(inoFile,inoTemplate,'espcar.ino');
writeFiles(jsFile,jsTemplate,'app.js');
