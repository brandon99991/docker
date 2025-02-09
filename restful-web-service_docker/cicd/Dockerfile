FROM openjdk:8-jdk-alpine
LABEL name="brandon99991"
LABEL version="0.5"
LABEL name="restful-web-service"
VOLUME /tmp
#RUN mkdir -p /whatap
ARG SERVER_ENV
ENV SERVER_ENV ${SERVER_ENV}
ARG CONFIG_NAME
ENV CONFIG_NAME 'restful-web-service_application.yml'
#ENV JAVA_OPTS="-Xmx512m -Xms512m -javaagent:/whatap/whatap.agent-2.0_29.jar -Dwhatap.micro.enabled=true"
ENV JAVA_OPTS="-Xmx256m -Xms256m"
COPY ./restful-web-service-0.0.1-SNAPSHOT.jar restful-web-service.jar
COPY ./restful-web-service_application.yml restful-web-service_application.yml
#COPY ./whatap.conf /whatap
#COPY ./whatap.agent-*.jar /whatap
# Timezone
RUN apk --no-cache add tzdata && apk --no-cache add curl && apk --no-cache add net-tools && cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && echo "Asia/Seoul" > /etc/timezone
#ENTRYPOINT exec java $JAVA_OPTS -Dspring.profiles.active=${SERVER_ENV} -Dspring.config.location=${CONFIG_NAME} -jar /restful-web-service.jar
ENTRYPOINT exec java $JAVA_OPTS -Dspring.config.location=${CONFIG_NAME} -jar /restful-web-service.jar
