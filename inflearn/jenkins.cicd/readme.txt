▣ ■ ● Inflearn > Jenkins를 이용한 CI/CD Pipeline 구축 
▣ 섹션1. DevOps와 CI/CD의 이해

■ Jenkins 설치

● 공식 Jenkins Docker image : https://github.com/jenkinsci/docker

● Jenkins Docker Volume : /home/user01/volume.docker/jenkins_home
                          => Jenkins실행을 하면, /var/jenkins_home/ 디렉토리로 마운트됨. 

● 설치 참고 : https://www.notion.so/brandon9999/1-DevOps-CI-CD-4767edd962584875a21ef5e434e25b97

● Jenkins Dokcer 접속
  $ docker exec -it jenkins-server sh
  $ id
  uid=1000(jenkins) gid=1000(jenkins) groups=1000(jenkins)

● Jenkins 접속
  http://localhost:8080

● 참고 자료
  https://github.com/jenkinsci/docker

  
