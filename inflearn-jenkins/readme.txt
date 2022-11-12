▣ ■ ●

Inflearn > Jenkins를 이용한 CI/CD Pipeline 구축

▣ 섹션1. DevOps와 CI/CD의 이해

■ Jenkins 설치 및 설정
https://hub.docker.com
https://github.com/jenkinsci/docker

● Docker이미지 다운로드
  작업디렉토리 : /mnt/c/DevWorkSpace/DOCKER/inflearn-jenkins
  $ docker pull jenkins/jenkins

● Jenkins 실행 (2번째걸로 실행)
  $ docker run -d -p 8080:8080 -p 50000:50000 --name jenkins-server --restart=on-failure jenkins/jenkins:lts-jdk11
  $ docker run -d -p 8080:8080 -p 50000:50000 --name jenkins-server --restart=on-failure -v jenkins_home:/var/jenkins_home/ jenkins/jenkins:lts-jdk11

  $ cd /mnt/c/DevWorkSpace/DOCKER/inflearn
  $ mkdir jenkins_home
  $ docker run -d -p 8080:8080 -p 50000:50000 --name jenkins-server --restart=on-failure -v /mnt/c/DevWorkSpace/DOCKER/inflearn-jenkins/jenkins_home:/var/jenkins_home/ jenkins/jenkins:lts-jdk11

● Jenkins 패스워드 확인 (1)
    user01@desk01:/mnt/c/DevWorkSpace/DOCKER/inflearn-jenkins$ docker ps
    CONTAINER ID   IMAGE                       COMMAND                  CREATED          STATUS          PORTS                                                                                      NAMES
    9534d88b7522   jenkins/jenkins:lts-jdk11   "/usr/bin/tini -- /u…"   10 minutes ago   Up 10 minutes   0.0.0.0:8080->8080/tcp, :::8080->8080/tcp, 0.0.0.0:50000->50000/tcp, :::50000->50000/tcp   jenkins-server
    user01@desk01:/mnt/c/DevWorkSpace/DOCKER/inflearn-jenkins$ docker exec -it 9534d88b7522 sh
    $ ls
    bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
    $ cd /var
    $ ls
    backups  cache  jenkins_home  lib  local  lock  log  mail  opt  run  spool  tmp
    $ cd jenkins_home
    $ ls
    config.xml               hudson.model.UpdateCenter.xml  jenkins.telemetry.Correlator.xml  nodeMonitors.xml  plugins     secret.key.not-so-secret  userContent  war
    copy_reference_file.log  identity.key.enc               jobs                              nodes             secret.key  secrets                   users
    $ cd secrets
    $ ls
    initialAdminPassword  jenkins.model.Jenkins.crumbSalt  master.key  org.jenkinsci.main.modules.instance_identity.InstanceIdentity.KEY
    $ cat initialAdminPassword
    04c4f416cce64f2899cba85cbdee1557

● Jenkins 패스워드 확인 (2)
    user01@desk01:/mnt/c/DevWorkSpace/DOCKER/inflearn-jenkins/jenkins_home/secrets$ ls
    initialAdminPassword
    jenkins.model.Jenkins.crumbSalt
    master.key
    org.jenkinsci.main.modules.instance_identity.InstanceIdentity.KEY
    user01@desk01:/mnt/c/DevWorkSpace/DOCKER/inflearn-jenkins/jenkins_home/secrets$ cat initialAdminPassword
    04c4f416cce64f2899cba85cbdee1557
    user01@desk01:/mnt/c/DevWorkSpace/DOCKER/inflearn-jenkins/jenkins_home/secrets$ 

● Jenkins Dokcer 접속
  user01@desk01:/mnt/c/DevWorkSpace/DOCKER$ docker ps
  CONTAINER ID   IMAGE                       COMMAND                  CREATED        STATUS         PORTS                                                                                      NAMES
  469af8b466e7   jenkins/jenkins:lts-jdk11   "/usr/bin/tini -- /u…"   18 hours ago   Up 6 minutes   0.0.0.0:8080->8080/tcp, :::8080->8080/tcp, 0.0.0.0:50000->50000/tcp, :::50000->50000/tcp   jenkins-server
  user01@desk01:/mnt/c/DevWorkSpace/DOCKER$ docker exec -it 469af8b466e7 sh
  $ id
  uid=1000(jenkins) gid=1000(jenkins) groups=1000(jenkins)
  $ ls
  bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
  $ cd var
  $ ls
  backups  cache  jenkins_home  lib  local  lock  log  mail  opt  run  spool  tmp
  $ cd jenkins_home
  $ ls
  config.xml                                          identity.key.enc                                jobs              secret.key                users
  copy_reference_file.log                             jenkins.install.InstallUtil.lastExecVersion     nodeMonitors.xml  secret.key.not-so-secret  war
  hudson.model.UpdateCenter.xml                       jenkins.install.UpgradeWizard.state             nodes             secrets
  hudson.plugins.emailext.ExtendedEmailPublisher.xml  jenkins.model.JenkinsLocationConfiguration.xml  plugins           updates
  hudson.plugins.git.GitTool.xml                      jenkins.telemetry.Correlator.xml                queue.xml.bak     userContent
  $

● Jenkins 접속
http://localhost:8080



● 참고 자료
  https://github.com/jenkinsci/docker


■ 실습1-1) Docker 컨테이너로 Jenkins 설치하기
●


■ 실습1-2) 첫번째 Item(Project) 생성
●