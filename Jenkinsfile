// Set to TRUE if there is code changes from Git. //
CODE_CHANGES = getGitChanges()

// Declarative //
pipeline {
   agent any
   parameters {
     choice(name: 'VERSION', choices: ['1.1.0', '1.2.0', '1.3.0'], description: 'Choose Version')
     booleanParam(name: 'executeTests', defaultValue: true, desctiption: 'If you want to execute it...')
   }
   environment {
     NEW_VERSION = '1.3.0'
   }
    stages {
      stage('Build') {
        // Build only when branch name is 'main' && there is any code changes in repo. //
        when {
          expression {
            BRANCH_NAME == 'main' && CODE_CHANGES == true
          }
        }
      steps {
              echo 'Building...'
              echo "Building version ${NEW_VERSION}"
      }
    }
    stage('Test') {
       // Execute steps of this stage ONLY when branch is 'master' OR 'dev' //
       when {
         expression {
           BRANCH_NAME == 'main' || BRANCH_NAME == 'dev'
         }
       }
       steps {
         echo 'Testing...'
       }
    }
    stage('Deploy') {
      when {
        expression {
          params.executeTests
        }
      }
      steps {
        echo 'Deploying...'
        echo "Deploying version number ${VERSION}"
      }
    } 
  }
  post {
    always {
      // Send Email , Status of all Builds etc...  //
    }
    success {
     // Script only relevant if all builds are success. //
    }
    failure {
      // Script only relevant if any build not success.. //
    }
  }
}
