import express from 'express'
import fetch from "node-fetch";

let app = express();
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*" )
    res.header("Access-Control-Allow-Headers","*")
    res.header("Access-Control-Allow-Methods","*")
    next()
})
app.get("/login",
    async (req, res) => {
       let code = req.query.code
        let response = await fetch("https://github.com/login/oauth/access_token",{
            method: "POST",
            body: JSON.stringify({
                "client_id":"a77163e503a46430ed55",
                "client_secret":"1c5c782ddba087248d7790e244290461c5977c86",
                 code
            }),
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }

        })
        let data = await response.json()
        res.json(data)

    })
app.listen(8000)
