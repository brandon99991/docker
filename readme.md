

▣ ■ ●
==============================
■ Docker Basic
==============================

● 참고
```
// local directory
/home/user01/repository/github.brandon99991/docker

// local git 설정
$ git config --global user.name "brandon99991"
$ git config --global user.email "induomo2@gmail.com"
$ git remote set-url origin https://토큰@github.com/brandon99991/docker.git

// Remote git 확인
$ git remote -v

// github push 명령
$ git add .
$ git commit -m "message ~~~"
$ git push -u origin master
```

● 도커 서비스 기동 및 확인
```
$ systemctl enable docker  
$ systemctl status docker  
$ systemctl start docker  

or 

$ sudo service docker start
$ sudo service docker restart  // 재기동

// 도커 엔진 확인
$ sudo docker info
```

● docker 네트웍 정보
```
$ docker network ls
user01@desk01:/etc/default$ docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
15c91d5c8b09   bridge    bridge    local
47b5456e2020   host      host      local
9a1cc22362c6   none      null      local 

$ docker network inspect bridge
```

● docker login (DockerHub 로그인)
```
$ docker login

// dockerhub
brandon9999 (induomo@gmail.com) / ???
```

● docker 빌드 및 실행(1)
```
1) 빌드 (Dockerbuild 파일이 위치한 곳에서 빌드)
  $ sudo docker build ./
2) 실행
  $ sudo docker run -it b03ef665e81b (도커 image)
```

● docker 빌드 및 실행(2)
```
1) 빌드 (Dockerbuild 파일이 위치한 곳에서 빌드)
  $ sudo docker build -t brandon9999/hellodocker:latest ./
2) 실행
  $ sudo docker run -it brandon9999/hellodocker  (데몬 옵션 : -d)
```

● docker 컨테이너 조회
```
  $ sudo docker ps  (-a 옵션은 실행중이지 않은 컨테이너도 조회함.)
```

● docker 이미지 push (도커허브에 push함)
```
  // docker push [hub 계정명]/[hub 레퍼지토리명]:[태그] - 도커 허브에 이미지 저장
  $ sudo docker push brandon9999/hellodocker:latest
```

● docker 이미지 삭제
```
user01@desk01:~/workspace/HelloDocker$ sudo docker images
REPOSITORY                   TAG           IMAGE ID       CREATED          SIZE
brandon9999/hellodocker      latest        b03ef665e81b   25 minutes ago   5.54MB
brandon9999/hellodockerrrr   lateeeeeest   b03ef665e81b   25 minutes ago   5.54MB
brandon9999/hellodockerrrr   latest        b03ef665e81b   25 minutes ago   5.54MB
alpine                       latest        9c6f07244728   11 days ago      5.54MB
nginx                        latest        b692a91e4e15   2 weeks ago      142MB
laravelsail/php81-composer   latest        d109f96a6d48   8 months ago     531MB
user01@desk01:~/workspace/HelloDocker$ 
user01@desk01:~/workspace/HelloDocker$ sudo docker rmi brandon9999/hellodockerrrr
Untagged: brandon9999/hellodockerrrr:latest
```

● 도커 컨테이너 삭제 
```
  $ sudo docker rm -f $(docker ps -aq --filter ancestor=brandon9999/hellodocker)
```

● 실행중인 도커 컨테이너에 명령 보내기 (exec)
```
  // 도커 실행
  $ desk01:~$ docker run alpine ping localhost
```

● 실행중인 도커 컨테이너 로그 보기
```
  $ desk01:~$ docker logs [컨테이너ID]

  // 도커 컨테이너 id 확인
  user01@desk01:~$ docker ps
  CONTAINER ID   IMAGE     COMMAND            CREATED          STATUS          PORTS     NAMES
  6edbe1f98fbc   alpine    "ping localhost"   45 seconds ago   Up 44 seconds             wonderful_poincare

  // 도커 컨테이너에 명령 보내기 (예 : ls 명령)
  user01@desk01:~$ docker exec 6edbe1f98fbc ls
```

● 쉘 (sh, bash, zsh) 사용해 보기
```
  $ docker run alpine ping localhost

  $ docker ps
  CONTAINER ID   IMAGE     COMMAND            CREATED          STATUS          PORTS     NAMES
  c94ca365806a   alpine    "ping localhost"   16 seconds ago   Up 16 seconds             agitated_wing

  $ docker exec -it c94ca365806a sh
  / # 
  / # ls
  bin    etc    lib    mnt    proc   run    srv    tmp    var
  dev    home   media  opt    root   sbin   sys    usr
```

  Github연동 테스트 ..........  
  Github연동 테스트2 ..........  
  Github연동 테스트3 ..........  

