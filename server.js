const express = require('express');
const helmet = require("helmet");
const app = express();
const request = require('request');
var CryptoJS = require("crypto-js"); 
var SHA256 = require("crypto-js/sha256"); 
var Base64 = require("crypto-js/enc-base64"); 

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
require("./app/routes/doctors.routes.js")(app);
app.get('/api/notice', async (req, res) => {
    res.send("공지사항");
});

app.post("/api/postAbnormal", (req, res) =>{
    const { phone, docID, clientID, content } = req.body
    var str = docID;
    var str2 = clientID;
    var str3 = content;
    console.log(str + str2 + str3);
    res.json({ docID, clientID , content });
    send_message(phone, docID, clientID, content);
});

app.post("/api/postAbnormal", (req, res) =>{
    const { phone, docID, clientID, content } = req.body
    var str = docID;
    var str2 = clientID;
    var str3 = content;
    console.log(str + str2 + str3);
    res.json({ docID, clientID , content });
    send_message(phone, docID, clientID, content);
});

app.post("/api/phoneverification", (req, res) =>{
    const { phone } = req.body
    console.log(phone);
    res.json({ phone });
    send_message(phone);
})

function send_message(phone, clientID, docID, content) { 
    var user_phone_number = '01086837738'; //doctor number
    var resultCode = 404; 
    const date = Date.now().toString(); 
    const uri = "ncp:sms:kr:269420343710:sanmo_app"; 
    const secretKey = "9MgDOKuUL7jZCzG8WfzsVANT55SPWIaYNxLxeDFc"; 
    const accessKey = "VPoCrxzoZdP8SUtpRIDk"; 
    const method = "POST"; 
    const space = " "; 
    const newLine = "\n"; 
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`; 
    const url2 = `/sms/v2/services/${uri}/messages`; 
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method); 
    hmac.update(space); 
    hmac.update(url2); 
    hmac.update(newLine); 
    hmac.update(date); 
    hmac.update(newLine); 
    hmac.update(accessKey); 
    const hash = hmac.finalize(); 
    const signature = hash.toString(CryptoJS.enc.Base64); 

    if (arguments.length == 1){
        var user_auth_number = Math.random().toString(36).slice(2); 
        user_phone_number = phone; //client number
        content = `동동맘톡 인증번호 ${user_auth_number} 입니다.`;
    }
    request( { 
        method: method, 
        json: true, 
        uri: url, 
        headers: { 
            "Contenc-type": "application/json; charset=utf-8", 
            "x-ncp-iam-access-key": accessKey, 
            "x-ncp-apigw-timestamp": date, 
            "x-ncp-apigw-signature-v2": signature, 
        }, 
        body: { 
            type: "SMS", 
            countryCode: "82", 
            from: "01086837738", 
            subject:"동동맘톡",
            content: `${content}`, 
            messages: [ 
                { to: `${user_phone_number}`,
             }, 
            ], 
        }, 
    }, 
    function (err, res, html) { 
        if (err) console.log(err); 
        else { 
            resultCode = 200; 
            console.log(html); 
        } 
    } ); 
    return resultCode;
}



async function load() {
    while(true){
        
    }
}
const server = app.listen(3000, () =>{
    console.log( 'http://localhost:' + '3000');
});