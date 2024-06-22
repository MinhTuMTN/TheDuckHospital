pipeline {
    agent any
    environment {
        SPRING_PID_FILE = 'spring-boot-app.pid'
    }
    stages {
        stage('Build') {
            steps {
                script {
                    // Dừng quá trình cũ (nếu có)
                    try {
                        bat "if [ -f $SPRING_PID_FILE ]; then kill \$(cat $SPRING_PID_FILE); fi"
                    } catch (Exception e) {
                        echo "No existing Spring Boot process to kill"
                    }
                }
                dir('C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\TheDuckHospital\\TheDuckHospitalAPI') {
                    bat 'mvn clean install' // Dùng 'bat' nếu trên Windows: bat 'mvn clean install'
                }
            }
        }
        stage('Deploy') {
            steps {
                dir('C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\TheDuckHospital\\TheDuckHospitalAPI') {
                    // Chạy ứng dụng Spring Boot và lưu PID
                    bat 'start mvn spring-boot:run && echo %! > spring-boot-app.pid' // Dùng 'start' nếu trên Windows: bat 'start mvn spring-boot:run && echo %! > spring-boot-app.pid'
                }
            }
        }
    }
}
