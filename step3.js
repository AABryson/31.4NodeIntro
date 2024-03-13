
const fs = require('fs')
const http = require('http')
const axios = require('axios')
const process = require('process')

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!\n');
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}
`);
});

function output(data, out) {
    if (out) {

        fs.writeFile(out, data, 'utf8', function (err, input) {
            if (err) {
                console.log(err)
                process.exit(1)
            }
        });
        } else {
            console.log(data)  
        }
}


function cat(path, out) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(`Error:${err}`);
//########################################
            process.exit(1);
        } else {
            output(data, out)
        }
    });
}


async function webCat(url, out) {
    try {
        const response = await axios.get(url);
//##############################data
        output(response.data, out)
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

let path = ''
let out = ''

if (process.argv[2] === '--out') {
    out = process.argv[3]
    path = process.argv[4]
} else {
    path = process.argv[2]
}

if (path.startsWith('http://')) {
    webCat(path, out);
} else {
    cat(path, out);
}
