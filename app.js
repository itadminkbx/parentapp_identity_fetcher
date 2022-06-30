const sha256 = require('js-sha256')
const axios = require('axios')
exports.identityFetcher = async function(appId,merchCode,merchKey,url,token,method){return new Promise((resolve, reject)=>{
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 32; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    let nonce = result;
    let currenttime = Math.floor(new Date().getTime() / 1000);
    var signstring ="access_token=" +token +"&appid=" +appId +"&merch_code=" +merchCode +"&method="+method+"&nonce_str=" +nonce +"&resource_type=OPENID" +"&timestamp=" +currenttime +"&trade_type=APPH5&version=1.0&key=" +merchKey;
    let shastring = sha256(signstring);
    let biz_content = {
        merch_code: merchCode,
        appid: appId,
        trade_type: "APPH5",
        access_token: token,
        resource_type: "OPENID",
    };
    let identityFetcherRequestData = {
        Request: {
            method: method,
            timestamp: String(currenttime),
            nonce_str: nonce,
            sign_type: "SHA256",
            sign: shastring,
            version: "1.0",
            biz_content: biz_content,
        }
    }
    axios.post(url, identityFetcherRequestData).then((identityFetcherResponse)=>{
        resolve(identityFetcherResponse);
    })
    .catch((identityFetcherError) => {
        reject(identityFetcherError)
    })

})
}