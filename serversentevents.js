const app = require('express')();

app.get("/", (req, res)=>{
    res.send("Hello world")
})

app.get("/stream", (req,res)=>{
    res.setHeader("Content-Type", "text/event-stream")
    res.setHeader("Cache-Control", "no-cache")
    res.setHeader("Connection", "keep-alive")
    let i = 0;
    setInterval(()=>{
        res.write(`data: ${i++}\n\n`)
    }, 1000)

})

app.listen(8080, ()=>{
    console.log("Listening on port 8080")
})