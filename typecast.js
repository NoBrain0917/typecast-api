const reqeust = require("sync-request");
let id, pw, token;

randomArray = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

tokenAlive = function() {
    if (token == null) throw new Error("로그인이 되어있지 않습니다.");
    try {
        var res = reqeust("GET", "https://typecast.ai/api/auth/alive", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        var result = JSON.parse(res.getBody("utf8")).result;
        if (result == "ok") {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        throw new Error("정보를 처리할 수 없습니다.");
    }
}

module.exports.actors = {
    "찬구": "5c547544fcfee90007fed455", //도네목소리1
    "주하": "5d01a52563338e00072b8c9c",
    "카밀라": "5f8d7b0de146f10007b8042f",
    "우주": "5f8e95eae146f10007b85f45",
    "혜정": "5f8e9644f6120100074475f0",
    "한유격": "5faa3acfac283a00075d0d2e",
    "영희": "5c3c52caea9791000747155e",
    "소영": "5c789c317ad86500073a02cc",
    "지영": "5c789c34dabcfa0008b0a390",
    "경완": "5d01a52163338e00072b8c9b",
    "성욱": "5d01a52b63338e00072b8c9e",
    "애란": "5d01a52c63338e00072b8c9f",
    "줄리아": "5e11db231c5eaa000b7d4c9c",
    "민지": "5eb55ce920d1b60016e91de6",
    "신혜": "5ecbbc4b0fbab10007bb3c7d",
    "준상": "5ecbbc7399979700087711db",
    "현경": "5ecbbc5599979700087711d6",
    "성규": "5ecbbc6099979700087711d8",
    "윤성": "5ecbbc696b7c780008be50c4",
    "관용": "5ebea235433bd200073e0e15",
    "정순": "5ebea242728f5b00075e6211",
    "다희": "5ebea251fcf5110007b77d0f",
    "경숙": "5ebea266728f5b00075e6215",
    "동우": "5ebea0fefcf5110007b77cc4",
    "연길": "5ebea13564afaf00087fc2e7",
    "지우": "5ebea14e433bd200073e0dce",
    "나진": "5ebea185728f5b00075e61e3",
    "쥬비": "5ebea194728f5b00075e61e8",
    "정희": "5ebea1a364afaf00087fc2fb",
    "연우": "5eb55cf1f0b0a700071f89c7",
    "용호": "5ea7b4268727390007ba95fc",
    "재훈": "5c789c32dabcfa0008b0a38d",
    "정섭": "5c789c32dabcfa0008b0a38e",
    "상도": "5c789c337ad86500073a02ce",
    "진혁": "5c3c52ca5827e00008dd7f36",
    "민상": "5c3c52ca5827e00008dd7f38",
    "찬혁": "5c547545fcfee90007fed458",
    "지철": "5c789c33dabcfa0008b0a38f",
    "수진": "5c3c52ca5827e00008dd7f3a",
    "국희": "5c789c31dabcfa0008b0a38c",
    "제임스":"5c547545168d0a0007f5cf13",
    "선영": "5c789c317ad86500073a02cb",
    "금희": "5c789c337ad86500073a02cd",
    "명희": "5c789c347ad86500073a02cf",
    "미오": "5c3c52caea9791000747155c",
    "보노": "5c547544fcfee90007fed454",
    "덕춘": "5c3c52c95827e00008dd7f34",
    "강수정": "5e4f7a5da82e1f000aca31af",
    "이승주": "5e4f7a5d716fd30009920721",
    "주원": "5c547545fcfee90007fed459", //도네 목소리2
    "의찬": "5c547545fcfee90007fed456",
    "마크": "5e11db23b70e890009fb7ae7",
    "트럼프": "5c3c52c9ea9791000747155b",
    "김정은": "5c3c52ca5827e00008dd7f35",
    "신디": "5c547545168d0a0007f5cf14",
    "현진": "5d01a522bb04140008a23f34",
    "정원": "5d01a529bb04140008a23f36",
    "성배": "5d01a52bbb04140008a23f37",
    "리춘희": "5d357d34ba9d2d0007195f9e",
    "하은": "5de781b108fd6b000882c58f",
    "범수": "5c3c52cb5827e00008dd7f3b"
}

module.exports.init = function(email, password) {
    if (email == null || password == null) throw new Error("인자는 null일 수 없습니다.");
    try {
        var res1 = reqeust("POST", "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA7rq_sg-scoKIMWPbq7MJ-3kGu7W1Uouw", {
            json: {
                "email": email,
                "password": password,
                "returnSecureToken": true
            }
        })
    } catch (e) {
        throw new Error("이메일 또는 비밀번호가 잘못되었습니다.");
    }
    try {
        var idToken = JSON.parse(res1.getBody("utf8")).idToken;
        var res2 = reqeust("POST", "https://typecast.ai/api/auth-fb/custom-token", {
            json: {
                "token": idToken
            }
        })
        var accessToken = JSON.parse(res2.getBody("utf8")).result.access_token;
        var res3 = reqeust("POST", "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=AIzaSyA7rq_sg-scoKIMWPbq7MJ-3kGu7W1Uouw", {
            json: {
                "token": accessToken,
                "returnSecureToken": true
            }
        })
        id = email;
        pw = password;
        token = JSON.parse(res3.getBody("utf8")).idToken;
    } catch (e) {
        throw new Error("로그인하지 못했습니다.");
    }
}


module.exports.importVoice = function(tell, actorName) {
    return new Promise((resolve, reject) => {
        var actorID = this.actors[randomArray(Object.keys(this.actors))];
        if (actorName != null) {
            if (this.actors[actorName] != null) {
                actorID = this.actors[actorName];
            } else {
                throw new Error("찾을 수 없는 이름 입니다.");
            }
        }
        if (token == null) throw new Error("로그인이 되어있지 않습니다.");
        if (!tokenAlive()) this.init(id, pw);
        try {
            var res1 = reqeust("POST", "https://typecast.ai/api/speak/batch/post", {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                json: [{
                    "actor_id": actorID,
                    "text": tell,
                    "lang": "auto",
                    "max_seconds": 30,
                    "naturalness": 0.8,
                    "speed_x": 1,
                    "gid": "f8ON1ZpeF0mDFjZTQlr9G",
                    "style_idx": 0
                }]
            })
            var speak_url = JSON.parse(res1.getBody('utf8')).result.speak_urls;
            var res2 = reqeust("POST", "https://typecast.ai/api/speak/batch/get", {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                json: speak_url
            })
            setTimeout(function() {
                var res3 = reqeust("POST", "https://typecast.ai/api/speak/batch/get", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    json: speak_url
                })
            
                var url = JSON.parse(res3.getBody("utf8")).result[0].audio.url;
                var res4 = reqeust("GET", `${url}/no-redirect`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                var preview = (tell.length>50? true:false) 
                if (!preview) resolve(JSON.parse(res4.getBody("utf8")).result);
                if (preview) {
                    var res5 = reqeust("POST", "https://typecast.ai/api/speak/batch/q", {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        json: {
                            "query_list": speak_url,
                            "quality": "normal"
                        }
                    })
                    var downloadurl = JSON.parse(res5.getBody("utf8")).result.url;
                    var res6 = reqeust("GET", downloadurl, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    var res7 = reqeust("POST", "https://typecast.ai/api/speak/batch/download/v2", {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        json: {
                            "multiple": false,
                            "format": "mp3",
                            "quality": "normal",
                            "query_list": [{
                                "speak_url": speak_url[0],
                                "silence_sec": 0.3
                            }]
                        }
                    })
                    var downloadurl2 = JSON.parse(res7.getBody("utf8")).result.url;
                    var res8 = reqeust("GET", downloadurl2, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    var downloadurl3 = JSON.parse(res8.getBody("utf8")).result.download_url;
                    var res9 = reqeust("GET", `${downloadurl3}/proxy`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    resolve(JSON.parse(res9.getBody("utf8")).result);
                }
            }, (tell.length*0.04)*1000)
        } catch (e) {
            throw new Error("tts를 가져올 수 없습니다.");
        }
    })
}
