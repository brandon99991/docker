▣ ■ ● Inflearn > Jenkins를 이용한 CI/CD Pipeline 구축

▣ 섹션1. DevOps와 CI/CD의 이해

■ Jenkins 설치 및 설정
https://hub.docker.com
https://github.com/jenkinsci/docker

● 작업디렉토리 : /home/user01/workspace/DOCKER/inflearn-jenkins

● Docker이미지 다운로드
  $ docker pull jenkins/jenkins

● Jenkins 실행 (항상 실행시에 --restart=on-failure 옵션 주면 됨)
  $ docker run -d -p 8080:8080 -p 50000:50000 --name jenkins-server -v /home/user01/workspace/docker/inflearn-jenkins/jenkins_home:/var/jenkins_home/ jenkins/jenkins:lts-jdk11

● Jenkins 패스워드 확인
    $ docker ps
    $ ls
    bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
    $ cd /var/jenkins_home
    $ cd jenkins_home
    $ ls
    config.xml               hudson.model.UpdateCenter.xml  jenkins.telemetry.Correlator.xml  nodeMonitors.xml  plugins     secret.key.not-so-secret  userContent  war
    copy_reference_file.log  identity.key.enc               jobs                              nodes             secret.key  secrets                   users
    $ cd secrets
    $ ls
    initialAdminPassword  jenkins.model.Jenkins.crumbSalt  master.key  org.jenkinsci.main.modules.instance_identity.InstanceIdentity.KEY
    $ cat initialAdminPassword
    04c4f416cce64f2899cba85cbdee1557

● Jenkins Dokcer 접속
  $ docker exec -it jenkins-server sh
  $ id
  uid=1000(jenkins) gid=1000(jenkins) groups=1000(jenkins)

● Jenkins 접속
  http://localhost:8080

● 참고 자료
  https://github.com/jenkinsci/docker