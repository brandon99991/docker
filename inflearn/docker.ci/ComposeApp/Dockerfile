# Base 이미지
FROM node:14

# Dockerfile에서 "WORKDIR /usr/src/app" 을 설정하면, 
# Default 접속 및 작업 경로가 /usr/src/app가 된다. 
# 또한, Dockerfile에서 COPY명령으로 복사되는 파일들도 이 경로에 복사된다.
WORKDIR /usr/src/app

# 현재 디렉토리의 모든 파일을 컨테이너 작업디렉토리(WORKDIR)에 copy한다.
COPY ./ ./

# npm : NPM Repository에서 Node.js 모듈을 다운받고, 설치 및 관리해 주는 프로그램
RUN npm install

CMD ["node", "server.js"]
