■ (인프런) 따라하며 배우는 도커와 CI환경
● 섹션 6. Docker Compose 사용하기 (ComposeApp)

1) npm init 실행 (package.json 생성)
2) package.json 수정
3) server.js 작성
4) Dockerfile 작성 (base이미지는 node:14)
5) redis 컨테이너 실행 (생략)
    $ docker run redis
6) Dockerfile 빌드
    $ docker build -t brandon9999/composeapp ./
7) docker-compose.yml 작성
   // redis서버 컨테이너(redis-server)와 redis클라이언트 컨테이너(node-app)간의
   // 네트웍 연결은 Docker Compose를 이용함.
8) docker-compose 설치
    $ sudo apt install docker-compose
9) docker compose 를 이용해서 컨테이너 실행
    $ docker-compose up
    or
    $ docker-compose up --build
10) 서비스 호출
    http://localhost:5000/
11) docker 다운
    $ docker-compose down
12) docker 기동(-d 옵션)
    --build 옵션 없이 기동 : 이미지가 없을때 이미지를 빌드하고 컨테이너 시작
    --build 옵션으로 기동 : 이미지가 있든 없든 이미지를 빌드하고 컨테이너 시작
    $ docker-compose up -d --build