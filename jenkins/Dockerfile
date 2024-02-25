# Use uma imagem base do Jenkins
FROM jenkins/jenkins:lts

# Defina algumas variáveis de ambiente
ENV JENKINS_USER admin
ENV JENKINS_PASS admin

# Copie o script install-plugins.sh para a localização esperada
COPY install-plugins.sh /usr/local/bin/install-plugins.sh

USER root
RUN chmod +x /usr/local/bin/install-plugins.sh

USER jenkins

# Copie plugins.txt para o contêiner
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt

# Instale plugins usando o script de instalação de plugins do Jenkins
RUN /usr/local/bin/install-plugins.sh < /usr/share/jenkins/ref/plugins.txt

# Copie configurações personalizadas do Jenkins para o contêiner
COPY config.xml /var/jenkins_home/config.xml

# Exponha a porta 8080
EXPOSE 8080