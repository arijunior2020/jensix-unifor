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
        sh "docker-compose -f ${DOCKER_COMPOSE_FILE} exec app npm test"
    }
}
        
        stage('Push to prod Branch') {
            steps {
                script {
                    // Envie as alterações para a nova branch 'dev' no GitHub
                    sh 'git config --global user.email "arimateiajunior.tic@gmail.com"'
                    sh 'git config --global user.name "Arimateia Junior"'
                    sh 'git checkout -b prod'
                    sh 'git add .'
                    sh 'git commit -m "Committing changes to prod branch"'
                    sh 'git push origin prod'
                }
            }
        }
    }
}