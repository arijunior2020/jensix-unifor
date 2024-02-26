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
                sh 'echo "No tests to run"'
            }
        }
        
        stage('Ensure prod Branch Exists') {
    steps {
        script {
            // Verifica se a branch 'prod' existe no repositório remoto usando a API do GitHub
            def branchExists = sh(script: 'curl -s -o /dev/null -w "%{http_code}" https://api.github.com/repos/arijunior2020/jensix-unifor/branches/prod', returnStdout: true).trim()
            if (branchExists == '200') {
                // Se a branch existe no repositório remoto, faz checkout nela
                sh 'git checkout prod'
            } else {
                // Se a branch não existe no repositório remoto, cria uma nova localmente e faz push para o repositório remoto
                sh 'git checkout -b prod'
                sh 'git push origin prod'
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
