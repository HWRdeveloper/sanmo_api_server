const express = require('express');
const helmet = require("helmet");
const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/api/notice', async (req, res) => {
    res.send("공지사항");
});

app.post("/api/postAbnormal", (req, res) =>{
    const { docID, clientID, content } = req.body
    var str = docID;
    var str2 = clientID;
    var str3 = content;
    console.log(str + str2 + str3);
    res.json({ docID, clientID , content });
})

async function load() {
    while(true){
        
    }
}
const server = app.listen(3000, () =>{
    console.log( 'http://localhost:' + '3000');
});
