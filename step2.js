
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

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(`Error:${err}`);
//########################################
            process.exit(1);
        } else {
            console.log(data);
        }
    });
}


async function webCat(url) {
    try {
        const response = await axios.get(url);
//##############################data
        console.log(response.data);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

let path = process.argv[2]

if (path.startsWith('http:')) {
    webCat(path);
} else {
    cat(path);
}
