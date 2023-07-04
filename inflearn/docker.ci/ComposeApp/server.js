const express = require("express");
const redis = require("redis");

// 레디스 클라이언트 생성
// 도커 Compose를 사용할 때는 host옵션을 docker-compose.yml파일에 
// 명시한 컨테이너 이름으로 주면된다. (도커 compose에서 컨테이너의 hostname을 명시함.)
const client = redis.createClient({
    socket:{
        host:"redis-server",
        port:"6379"
    }
});

const app = express();

app.get('/', async (req, res) => {
    await client.connect();
    let number = await client.get('number');
    if (number === null) {
        number = 0;
    }
    console.log('Number: ' + number);
    
    res.send("숫자가 1씩 올라갑니다. 숫자: " + number)
    
    await client.set("number", parseInt(number) + 1)
    await client.disconnect();;;
    
})
    
app.listen(8080);
    
console.log('Server is running');