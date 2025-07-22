const http = require('http');
const url = require('url');

const server = http.createServer();
PORT = 3200;
//https://localhost:3200/add?a=12&b=12

server.on('request' , (req , res) =>{
    const parasedUrl = url.parse(req.url , true); //// true gives query as object
    const operation = parasedUrl.pathname; // e.g. /add
    const values = parasedUrl.query;        // e.g. { a: '5', b: '3' }

    const a = parseFloat(values.a);
    const b = parseFloat(values.b);

    let result;
    if(operation === '/add')
    {
        result = a+b;
    }

    else if( operation === '/sub')
    {
        result = a-b;
    }
    else if(operation === '/mul')
    {
        result = a*b;
    }
    else if(operation === '/div')
    {
        if(b === 0)
        {
            res.write("Cannot divide a number by zero (0)");
            res.end(`Change value of B`);
        }
        else{
            result = a/b;
        }
    }

    else
    {
        res.writeHead(404 , {'content-type' : 'text/html'});
        res.end("Not found");
    }


    res.writeHead(200, {'content-type' : 'text'});
    res.end(`Result is : ${result}`);
});

server.on('connection' , () =>{
    console.log(`server established at port ${PORT}`);
});

server.on('listening' , () =>{
    console.log(`Running at port no : ${PORT}`);
});

server.listen(PORT);