pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script {
                    // Dừng quá trình cũ (dùng Windows command)
                    bat 'TASKKILL /F /IM java.exe || echo "No java process running"'
                }
                // Di chuyển đến thư mục làm việc và build project
                dir('C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\TheDuckHospital\\TheDuckHospitalAPI') {
                    bat 'mvn clean install'
                }
            }
        }
        stage('Deploy') {
            steps {
                // Chạy ứng dụng Spring Boot
                dir('C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\TheDuckHospital\\TheDuckHospitalAPI') {
                    bat 'start mvn spring-boot:run'
                }
            }
        }
    }
}
