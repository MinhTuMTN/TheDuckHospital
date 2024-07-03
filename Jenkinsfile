pipeline {
    agent any

    stages {
        stage('Build with Maven') {
            steps {
                script {
                    bat '''
                    cd TheDuckHospitalAPI
                    mvn clean package
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat '''
                    docker build -t minhtumtn/theduckhospitalapi .
                    '''
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    bat '''
                    docker image prune -f
                    docker container stop hospitalapi || echo "this container does not exist"
                    ping -n 11 localhost
                    docker run -d -p 8080:8080 -e TZ=Asia/Jakarta --rm --name hospitalapi minhtumtn/theduckhospitalapi --force
                    '''
                }
            }
        }
    }
}
