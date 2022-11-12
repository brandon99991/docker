#####################################################
# WildFly Docker이미지 만들어서 k8s에서 서비스 하기
# 작업 서버 : K8S Master (192.168.35.210)
# 작업 user : user01, root
#####################################################

0) 다운로드
   Wildfly 설치 파일
      wget https://download.jboss.org/wildfly/18.0.1.Final/wildfly-18.0.1.Final.tar.gz

   Wildfly Dockerfile
      https://colinch4.github.io/2020-12-03/README.docker/
      //https://doc.skill.or.kr/dockerfile-docker-image-tomcat+jenkins

1) 작업 디렉토리
/home/user01/winshare/DOCKER/wildfly/wildfly18

[user01@master:\>]$ ls
apphome    dockerfile  k8s.rediscluster  wildfly-18.0.1.Final
dbuild.sh  drun.sh     k8s.redissingle   wildfly-18.0.1.Final.tar
dlogin.sh  drun00.sh   readme.txt

2) dockerfile build
$ docker build -t wildfly18jdk8:0.3 .

3) docker image 확인
$ docker images
REPOSITORY                     TAG              IMAGE ID       CREATED              SIZE
wildfly18jdk8                  0.3               0fc237d87bcd   5 hours ago        939MB

4) docker 실행
$ sudo docker run -d --name wildfly18jdk8 -it --rm -p 8080:8080 wildfly18jdk8:0.3

$ sudo docker run -d --name wildfly18jdk8 --network host brandon9999/wildfly18jdk8:0.3

$ sudo docker run -d --name wildfly18jdk8 --network host -v '/home/user01/winshare/DOCKER/wildfly/wildfly18/apphome/bin:/opt/jboss/wildfly/bin' -v '/home/user01/winshare/DOCKER/wildfly/wildfly18/apphome/standalone:/opt/jboss/wildfly/standalone' -v '/home/user01/winshare/DOCKER/wildfly/wildfly18/apphome/webapps:/opt/jboss/wildfly/webapps' -v '/home/user01/winshare/DOCKER/wildfly/wildfly18/apphome/logs:/opt/jboss/wildfly/logs' brandon9999/wildfly18jdk8

5) DockerHub 로그인
$ docker login

6) Docker image Tag
$ sudo docker tag wildfly18jdk8:0.3 brandon9999/wildfly18jdk8:latest

7) Docker push (sudo로 할 경우에 denied발생함.)
$ docker push brandon9999/wildfly18jdk8:latest

8) K8S Pod생성 (only 테스트 / 아래 deploy로 배포할 것)
$ kubectl run wildfly18redis --image=brandon9999/wildfly18jdk8

9) k8s에서 사용할 NFS 디렉토리 구성
   NFS서버 : master서버 (192.168.35.210)
   NSF Path : /home/nfs
              /home/nfs/wildfly18_redissingle
              /home/nfs/wildfly18_redissingle/bin      (wildfly bin디렉토리 Mount)
              /home/nfs/wildfly18_redissingle/tmp      (tmp 디렉토리 Mount)
              /home/nfs/wildfly18_redissingle/tmp/standalone.xml
              /home/nfs/wildfly18_redissingle/tmp/webapps

10) WildFly 실행 스크립트 수정 (아래 내용 추가할 것)
    /home/nfs/wildfly18_redissingle/bin/standalone.sh

    ////////////////////////////////////////////////////
    mkdir /opt/jboss/wildfly/deploy -p
    cp -Rf /opt/jboss/wildfly/tmp/webapps/* /opt/jboss/wildfly/deploy/
    cp -Rf /opt/jboss/wildfly/tmp/standalone.xml /opt/jboss/wildfly/standalone/configuration/
    chmod -Rf 777 /opt/jboss/wildfly
    ////////////////////////////////////////////////////

11) K8S deploy 생성 (/home/user01/winshare/DOCKER/wildfly/wildfly18/k8s.redissingle)
$ kubectl create -f redissingle_deploy.yaml

12) K8S svc(NodePort) 생성 (/home/user01/winshare/DOCKER/wildfly/wildfly18/k8s.redissingle)
$ kubectl create -f redissingle_nodeport.yaml

13) 서비스 호출 (PC에서)
    http://192.168.35.210:30003/redis/index.jsp