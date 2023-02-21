const express = require('express');

const app = express();
app.use(express.json())

const job = {};

app.use((req,res, next)=>{
    console.log(req.method, req.url);
    next();
})
app.post("/registerjob",(req, res)=>{
    const jobId = `job${Math.random().toFixed(2)*100}`;
    job[jobId] = 0;
    updateJob(jobId, 0);
    res.send(jobId);
})

app.get("/job/:jobId", async (req, res)=>{
    const jobId = req.params.jobId;
    console.log(jobId, job[jobId])
    let s = await checkJob(jobId);
    while(s == false){
        console.log("s", s)
        s = await checkJob(jobId);
    }
    res.end("\n\nJobStatus: Complete " + job[jobId] + "%\n\n")

})

async function checkJob(jobId){
    return new Promise((resolve, reject)=>{
        if (job[jobId] < 100){
            setTimeout(()=> resolve(false),  1000);
        }
        else
            resolve(true);
    })
}


function updateJob(jobId, progress){
    job[jobId] = progress;
    console.log(jobId, job[jobId])
    if (job[jobId] === 100){
        return;
    }
    setTimeout(()=>updateJob(jobId, progress + 10),3000);
}


app.listen(3000, () => console.log('Listening on port 3000'));