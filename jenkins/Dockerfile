# Use uma imagem base do Jenkins
FROM jenkins/jenkins:lts

# Defina algumas variáveis de ambiente
ENV JENKINS_USER admin
ENV JENKINS_PASS admin

USER root

# Instalação do Docker
RUN apt-get update && \
    apt-get install -y apt-transport-https ca-certificates curl software-properties-common && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - && \
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable" && \
    apt-get update && \
    apt-get install -y docker-ce && \
    usermod -aG docker jenkins
    
# Instale o Docker Compose
RUN curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose


USER jenkins

# Exponha a porta 8080
EXPOSE 8080
