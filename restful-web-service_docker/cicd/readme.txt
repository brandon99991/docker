0. 프로젝트 정보
   Path : /home/user01/workspace/cicd/restful-web-service
   STS 프로젝트 : restful-web-service   
   Jenkins 프로젝트 : restful-web-service_docker
   GitHub : https://github.com/brandon99991/dev01_project.git/springboot/restful-web-service

1. url
   WSL 도커 : http://localhost:9001/users/1
   K8S : http://192.168.35.210:31001/users

2. Jenkins 빌드 후 Exec command 
  2.1) WSL서버에 SSH로 실행됨
----------------------------------------------
cd /home/user01/workspace/cicd/restful-web-service/
docker build --tag=restful-web-service -f Dockerfile .
docker rm -f restful-web-service
docker run --privileged -d -p 9001:9001 --name restful-web-service restful-web-service:latest
#docker login  // 사전 로그인해 두거나, 패스워드 묻지않게 설정 필요
docker tag restful-web-service brandon9999/restful-web-service
docker push brandon9999/restful-web-service

export KUBECTL=/usr/local/bin/kubectl
export KCONFIG=/home/user01/k8s.manage/.kube/config
export WORKDIR=/home/user01/workspace/cicd/restful-web-service
$KUBECTL --kubeconfig=$KCONFIG delete deploy restful-web-service
$KUBECTL --kubeconfig=$KCONFIG create -f $WORKDIR/k8s/restful-web-service_deploy.yaml
$KUBECTL --kubeconfig=$KCONFIG delete svc restful-web-service-svcnp
$KUBECTL --kubeconfig=$KCONFIG create -f $WORKDIR/k8s/restful-web-service_nodeport.yaml
----------------------------------------------

  2.2) K8S Master서버에 SSH로 실행됨
       jar파일을 /home/nfs/tmp/에 단순 copy
