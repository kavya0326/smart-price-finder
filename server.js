const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const indexPath = path.join(__dirname, "index.html");

const server = http.createServer((req, res) => {
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");

if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
}

if (req.url === "/" || req.url === "/index.html") {
    fs.readFile(indexPath, (err, content) => {
        if (err) {
            res.writeHead(500, {
                "Content-Type": "text/plain"
            });
            res.end("Could not load index.html");
            return;
        }

        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });
        res.end(content);
    });
    return;
}

if (req.url.startsWith("/api/search")) {
    res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8"
    });

    res.end(JSON.stringify({
        message: "Search endpoint is ready.",
        livePricesAvailable: false,
        note: "Connect an approved retailer API to retrieve genuine current prices.",
        retailers: [
            "Amazon India",
            "Flipkart",
            "Meesho"
        ]
    }));
    return;
}

res.writeHead(404, {
    "Content-Type": "text/plain"
});
res.end("Not found");

});

server.listen(PORT, () => {
console.log("PriceCompare is running at http://localhost:3000");
});