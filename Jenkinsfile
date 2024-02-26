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
                sh "docker-compose -f ${DOCKER_COMPOSE_FILE} run app npm test"
            }
        }
        
        stage('Ensure prod Branch Exists') {
            steps {
                script {
                    // Verifica se a branch 'prod' já existe
                    def branchExists = sh(script: 'git show-ref --verify --quiet refs/heads/prod', returnStatus: true)
                    if (branchExists != 0) {
                        // Se a branch não existe, cria uma nova
                        sh 'git checkout -b prod'
                    } else {
                        // Se a branch já existe, faz checkout nela
                        sh 'git checkout prod'
                    }
                }
            }
        }
        
        stage('Commit and Push to prod Branch') {
            steps {
                script {
                    // Adiciona todas as alterações ao commit
                    sh 'git add .'
                    // Faz o commit das alterações
                    def commitStatus = sh(script: 'git commit -m "Committing changes to prod branch"', returnStatus: true)
                    if (commitStatus == 0) {
                        // Push para a branch 'prod' no repositório remoto se o commit for bem-sucedido
                        sh 'git push origin prod'
                    } else {
                        echo 'No changes to commit'
                    }
                }
            }
        }
    }
}
