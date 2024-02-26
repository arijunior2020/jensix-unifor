pipeline {
    agent any
    
    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }
    
    stages {
        stage('Build Images') {
            steps {
                script {
                    // Executa o build das imagens com base no docker-compose
                    sh "docker-compose -f ${DOCKER_COMPOSE_FILE} build"
                }
            }
        }
        
        stage('Test Application') {
            steps {
                // Execute testes da aplicação, se necessário
                // Por exemplo:
                sh "docker-compose -f ${DOCKER_COMPOSE_FILE} up -d"
                sh "docker-compose -f ${DOCKER_COMPOSE_FILE} exec app npm test"
                sh "docker-compose -f ${DOCKER_COMPOSE_FILE} down"
            }
        }
        
        stage('Push to Dev Branch') {
            steps {
                script {
                    // Envie as alterações para a nova branch 'dev' no GitHub
                    sh 'git config --global user.email "arimateiajunior.tic@gmail.com"'
                    sh 'git config --global user.name "Arimateia Junior"'
                    sh 'git checkout -b dev'
                    sh 'git add .'
                    sh 'git commit -m "Committing changes to dev branch"'
                    sh 'git push origin dev'
                }
            }
        }
    }
}