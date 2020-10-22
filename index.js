const { exec } = require('child_process');
const fs = require('fs');

let inputUrl = `input.json`;
let outputUrl = `output.json`;
let compressedUrl = `${outputUrl}.Z`;

exec(
	`cp ${inputUrl} ${outputUrl}`,
	(error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
        }
        if (fs.existsSync(outputUrl)) {
            // const output = JSON.stringify(fs.readFileSync(`${outputUrl}`, 'utf-8')).replace(/ /g,'');
            // fs.writeFileSync(outputUrl, output);
            exec(`compress ${outputUrl}`, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
            
                if (fs.existsSync(compressedUrl)) {
                    const input = fs.readFileSync(`${inputUrl}`, 'utf-8');
                    const compressed = fs.readFileSync(`${compressedUrl}`);
                    console.log(
                        `Input Length: ${JSON.stringify(input).length}`
                    );
                    console.log(`Not compressed: ${JSON.stringify(input)}`);
                    console.log(`Compressed length: ${compressed.length}`);
                    console.log(`Compressed: ${compressed}`);
                    console.log(`Compressed: ${(compressed.length/JSON.stringify(input).length*100).toFixed(2)}%`);


                    exec(`uncompress ${compressedUrl}`, (error, stdout, stderr) => {
                        if (error) {
                            console.log(`error: ${error.message}`);
                            return;
                        }
                        if (stderr) {
                            console.log(`stderr: ${stderr}`);
                            return;
                        }
                        // if (fs.existsSync(uncompressedUrl)) {
                        //     const input = fs.readFileSync(`${inputUrl}`, 'utf-8');
                        //     const compressed = fs.readFileSync(`${compressedUrl}`, 'utf-8');
                        //     console.log(`Not compressed Length: ${JSON.stringify(input).length}`);
                        //     console.log(`Not compressed: ${JSON.stringify(input)}`);
                        //     console.log(`Compressed length: ${compressed.length}`);
                        //     console.log(`Compressed: ${compressed}`);

                        // }
                    });
                }
            });
        }
	}
);
