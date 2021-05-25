def buildApp() {
    echo 'Building...'
    echo "Building version"
}

def testApp() {
    echo "app testing...."
}

def deployApp() {
    echo "app Deploying...."
    echo "Deploying version ${params.VERSION}"
}
return this
