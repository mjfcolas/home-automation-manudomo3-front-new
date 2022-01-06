pipeline {
    agent any

    environment {
        SONAR_LOGIN = 'sonar'
        SONAR_PROJECT_KEY = 'fr.li212.manudomo3:manudomo3-back'
    }

    post {
        failure {
            updateGitlabCommitStatus name: 'build', state: 'failed'
        }
        success {
            updateGitlabCommitStatus name: 'build', state: 'success'
        }
    }
    options {
        gitLabConnection('gitlab')
    }
    triggers {
        gitlab(triggerOnPush: true, triggerOnMergeRequest: true, branchFilterType: 'All')
    }

    tools {
        nodejs "node14"
    }
    stages {

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}
