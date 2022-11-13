#####################################################
# tomcat9 Docker이미지 만들어서 k8s에서 서비스 하기
# 작업 서버 : K8S Master (192.168.35.210)
# 작업 user : user01, root
#####################################################

0) Tomcat Dockerfile
   https://doc.skill.or.kr/dockerfile-docker-image-tomcat+jenkins

   // ssh 설치 추가 // 2022.11.13  

1) 작업 디렉토리
   $ pwd
   /home/user01/workspace/docker/tomcat/tomcat9

2) dockerfile build
   $ docker build -t tomcat9jdk8 .

3) docker image 확인
   $ docker images

4) docker 실행
   $ sudo docker run -d --name tomcat9jdk8 --network host -p 18080:8080 -p 10022:22 -v '/mnt2/workspace/docker/tomcat/tomcat9/mnt/webapps:/usr/local/tomcat/webapps' -v '/mnt2/workspace/docker/tomcat/tomcat9/mnt/conf:/usr/local/tomcat/conf' -v '/mnt2/workspace/docker/tomcat/tomcat9/mnt/logs:/usr/local/tomcat/logs' -v '/mnt2/workspace/docker/tomcat/tomcat9/mnt/bin:/usr/local/tomcat/bin' tomcat9jdk8

   $ sudo docker run -d --privileged --name tomcat9jdk8 -p 18080:8080 -p 10022:22 -e container=docker -v '/mnt2/workspace/docker/tomcat/tomcat9/mnt/webapps:/usr/local/tomcat/webapps' -v '/mnt2/workspace/docker/tomcat/tomcat9/mnt/conf:/usr/local/tomcat/conf' -v '/mnt2/workspace/docker/tomcat/tomcat9/mnt/logs:/usr/local/tomcat/logs' -v '/mnt2/workspace/docker/tomcat/tomcat9/mnt/bin:/usr/local/tomcat/bin' tomcat9jdk8

*-------------------------------------
# 참고 : 도커에 ssh를 추가 설치할 경우 

0) 도커에 접속
1) tomcat root계정 암호 생성 : root / q
2) open-ssh설치 
   $ apt-get update
   $ apt-get install vim net-tools openssh-server ufw

   $ vi /etc/ssh/sshd_config
     PermitRootLogin을 yes로 바꿈
   $ service ssh start
   $ ufw allow ssh
   $ ufw status

   // ssh가 설치된 컨테이너를 도커 이미지로 만들고 DockerHub에 push하기
   [user01@desk01:/home/user01/.ssh]$ docker commit tomcat9jdk8 tomcat9jdk8:ssh
   [user01@desk01:/home/user01/.ssh]$ docker tag tomcat9jdk8:ssh brandon9999/tomcat9jdk8:ssh
   [user01@desk01:/home/user01/.ssh]$ docker login
   [user01@desk01:/home/user01/.ssh]$ sudo docker push brandon9999/tomcat9jdk8:ssh

   * 기존 실행 중인 tomcat9jdk8 컨테이너는 삭제한다.
*-------------------------------------

5) DockerHub 로그인
   $ docker login

6) Docker image Tag (DockerHub에 Push하기 위해)
   $ sudo docker tag tomcat9jdk8 brandon9999/tomcat9jdk8

7) Docker push (sudo로 할 경우에 denied발생함.)
   $ docker push brandon9999/tomcat9jdk8

8) K8S Pod생성 (only 테스트 / 아래 deploy로 진행할 것)
   $ kubectl run redistest01 --image=brandon9999/tomcat9jdk8

*-----------------------------
# NFS 생성 참고
https://www.notion.so/brandon9999/NFS-Storage-3d874e767f7945f6b7ecf5cc36630c0f#878832a1c78041e997fa7d05ec22c760


$ cat /etc/exports
/home/nfs       192.168.35.210(rw,sync,no_subtree_check) 192.168.35.211(ro,sync,no_subtree_check) 192.168.35.212(ro,sync,no_subtree_check)
*-----------------------------

9) k8s에서 사용할 NFS생성 
   NFS서버 : master서버 (192.168.35.210)
   NSF Path : /home/nfs
              /home/nfs/tomcat9
              /home/nfs/tomcat9/conf      (Tomcat conf디렉토리)
              /home/nfs/tomcat9/webapps   (redis.war)
              /home/nfs/tomcat9/bin       (to-do)
              /home/nfs/tomcat9/logs      (to-do)

10) K8S deploy 생성
$ kubectl create -f redistest_deploy.yaml

11) K8S svc(NodePort) 생성
$ kubectl create -f redistest_nodeport.yaml

12) 서비스 호출 (PC에서)
    http://192.168.35.210:30001/redis/index.jsp