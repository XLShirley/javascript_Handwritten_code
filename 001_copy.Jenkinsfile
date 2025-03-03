def GIT_URL = 'https://gitlab.datatist.cn/datatist/wolf-shrcb-static'
def PACKAGE_DIR = '/workspace/package'
def ARTIFACT_ID = 'wolf-shrcb-static'
def NAMESPACE = 'wolf'
def NPM_REGISTRY = '--registry=http://nexus.dev2.datatist.cn/nexus/repository/npm-all/'
def NPM_PUBLISH_REGISTRY = '--registry=http://nexus.dev2.datatist.cn/nexus/repository/npm-internal/'

def NODE_VERSION_DICT = [
    "v12.22": "/root/node-v12.22.12-linux-x64/bin/", 
    "v14.18": "/root/node-v14.18.0-linux-x64/bin/", 
    "v16.13": "/root/node-v16.13.0-linux-x64/bin/"
]

def NODE_VERSION_PATH = NODE_VERSION_DICT["${params.node_version}"]

pipeline {
    agent any
    options { retry(2) }

    parameters {
        string(name: 'tag', defaultValue: 'develop', description: '发布版本 ')
        choice(name: 'node_version', choices: ['v14.18', 'v12.22', 'v16.13'], description: '选择Node版本')
        choice(name: 'package_manager', choices: ['pnpm', 'npm', 'yarn'], description: '选择包管理器')
        choice(name: 'need_build', choices: ['true', 'false'], description: '是否需要build')
        choice(name: 'push_to_ftp', choices: ['false', 'true'], description: '是否将包发布至FTP')
        choice(name: 'restart_application', choices: ['true', 'false'], description: '是否重启应用')
    }

    environment {
        // Git commit message and id will be used in multiple places
        GIT_REV = ''
        BUILD_TIME = ''
        BUILD_TAG = ''
    }

    stages {
        stage('Git Checkout') {
            steps {
                script {
                    checkout scm: [
                        $class: 'GitSCM',
                        userRemoteConfigs: [[credentialsId: 'deploy', url: "${GIT_URL}"]],
                        branches: [[name: "${params.tag}"]]
                    ]
                }
            }
        }

        stage('Create Version File') {
            steps {
                script {
                    def commitId = ''
                    def commitMessage = ''
                    // Retrieve commit details based on tag
                    if ("${params.tag}" =~ /^v[0-9]+\.[0-9]+\.[0-9]+(\.[0-9]+)?$/) {
                        commitId = sh(script: "git rev-parse ${params.tag}", returnStdout: true).trim()
                        commitMessage = sh(script: "git log ${params.tag} -1 --pretty=%B", returnStdout: true).trim()
                    } else {
                        commitId = sh(script: "git rev-parse origin/${params.tag}", returnStdout: true).trim()
                        commitMessage = sh(script: "git log origin/${params.tag} -1 --pretty=%B", returnStdout: true).trim()
                    }

                    // Write version information into version.js files
                    writeFile file: './Front/src/version.js', text: """
                        export const commitId = '${commitId}';
                        export const branch = '${params.tag}';
                        export const commitMessage = "${commitMessage}";
                    """
                    writeFile file: './BMS/src/version.js', text: """
                        export const commitId = '${commitId}';
                        export const branch = '${params.tag}';
                        export const commitMessage = "${commitMessage}";
                    """
                }
            }
        }

        stage('Build BMS') {
            when {
                expression { return params.apps == 'ALL' || params.apps == 'BMS' }
            }
            steps {
                script {
                    buildApp('BMS')
                }
            }
        }

        stage('Build Front') {
            when {
                expression { return params.apps == 'ALL' || params.apps == 'FRONT' }
            }
            steps {
                script {
                    buildApp('Front')
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    deployPackage()
                }
            }
        }
    }

    // Helper methods
    def buildApp(app) {
        def nodeVersionTag = params.node_version
        def nodePath = NODE_VERSION_DICT[nodeVersionTag]

        sh """
            export PATH="${nodePath}:\$PATH"
            node --version
            git --version
            if [[ "${params.need_build}" == "true" ]]; then
                if [[ "${params.package_manager}" == "npm" ]]; then
                    cd ${app} && npm rebuild node-sass && npm install ${NPM_REGISTRY} && npm run build
                elif [[ "${params.package_manager}" == "yarn" ]]; then
                    cd ${app} && npm install -g yarn && yarn install ${NPM_REGISTRY} && yarn build
                elif [[ "${params.package_manager}" == "pnpm" ]]; then
                    cd ${app} && npm install -g pnpm@7 --registry=https://registry.npmmirror.com && pnpm install --no-frozen-lockfile ${NPM_REGISTRY} && pnpm build
                fi
            fi
        """
    }

    def deployPackage() {
        def finalFileSuffix = "${params.tag}".replaceAll('/', '_')
        def apps = ['BMS', 'Front']
        GIT_REV = sh(script: 'git log --pretty=format:"%h" -n 1', returnStdout: true).trim()
        BUILD_TIME = sh(script: 'date +%Y%m%d%H%M', returnStdout: true).trim()
        BUILD_TAG = "${GIT_REV}-${BUILD_TIME}"

        sh """
            rm -rf ./package/*
            mkdir -p ./package
            for app in ${apps.join(' ')}; do
                mkdir -p ./package/\$app
                cp -rf \$app/build/* ./package/\$app/
            done

            package_last=${ARTIFACT_ID}.tgz.${finalFileSuffix}
            cd ./package/
            chmod a+r -R ./*
            tar czvf \${package_last} ./*

            rm -rf ${PACKAGE_DIR}/\$package_last
            mv \${package_last} ${PACKAGE_DIR}/
            
            if [[ "${params.restart_application}" == "true" ]]; then
                kubectl patch -n ${NAMESPACE} deployment wolf-shrcb-static --type='json' -p '[{"op": "replace", "path": "/spec/template/spec/containers/1/args/0", "value": "'\${finalFileSuffix}'" }]'
                sleep 2
                pods=\$(kubectl get pod -n ${NAMESPACE} | grep wolf-shrcb-static | awk '{print \$1}')
                if [ -n "\$pods" ]; then
                    echo \$pods | xargs kubectl delete pod -n ${NAMESPACE}
                    echo "Successfully deployed wolf-shrcb-static \${finalFileSuffix}"
                fi
            else
                echo "Skipped deploy of wolf-shrcb-static \${finalFileSuffix}"
            fi

            if [[ "${params.push_to_ftp}" == "true" ]]; then
                ncftpput -u datatist -p Datatist-aws-ftp#888! -m idc-ftp.datatist.com /zhaoxin/k8s/package/shrcb/ ${PACKAGE_DIR}/\${package_last}
            fi
        """
    }
}



========



def GIT_BRANCH = 'develop'
def GIT_URL = 'https://gitlab.datatist.cn/datatist/wolf-shrcb-static'
def PACKAGE_DIR = '/workspace/package'
def ARTIFACT_ID = 'wolf-shrcb-static'
def NAMESPACE = 'wolf'
def NPM_REGISTRY = '--registry=http://nexus.dev2.datatist.cn/nexus/repository/npm-all/'
def NPM_PUBLISH_REGISTRY = '--registry=http://nexus.dev2.datatist.cn/nexus/repository/npm-internal/'
// add '//nexus.dev.datatist.cn/nexus/repository/npm-internal/:_authToken=NpmToken' to npmrc

def NODE_VERSION_DICT = [
    "v12.22": "/root/node-v12.22.12-linux-x64/bin/", 
    "v14.18": "/root/node-v14.18.0-linux-x64/bin/", 
    "v16.13": "/root/node-v16.13.0-linux-x64/bin/"
]
def NODE_VERSION_PATH = NODE_VERSION_DICT["${params.node_version}"]

pipeline {
    agent any
    options { retry(2) }
    parameters {
        string(name: 'tag', defaultValue: 'develop', description: '发布版本')
        choice(name: 'node_version', choices: ['v14.18', 'v12.22', 'v16.13'], description: '选择 Node.js 版本')
        choice(name: 'package_manager', choices: ['pnpm', 'npm', 'yarn'], description: '选择包管理器')
        choice(name: 'need_build', choices: ['true', 'false'], description: '是否需要构建，如果不构建，将只重启应用')
        choice(name: 'push_to_ftp', choices: ['false', 'true'], description: '是否需要将包发布至 FTP')
        choice(name: 'restart_application', choices: ['true', 'false'], description: '是否重启应用')
    }
    stages {
        stage('Git Checkout') {
            steps {
                checkout scm: [
                    $class: 'GitSCM', 
                    userRemoteConfigs: [[credentialsId: 'deploy', url: "${GIT_URL}"]],
                    branches: [[name: "${params.tag}"]],
                    poll: false
                ]
            }
        }

        stage('Create Version File') {
            steps {
                sh """
                    commitId=''
                    commitMessage=''
                    if [[ "${params.tag}" =~ ^(v|uat.v)[0-9]+\\.[0-9]+\\.[0-9]+(\\.[0-9]+){0,2}\$ ]]; then 
                        commitId=\$(git rev-parse ${params.tag})
                        commitMessage=\$(git log ${params.tag} -1 --pretty=%B)
                    else
                        commitId=\$(git rev-parse origin/${params.tag})
                        commitMessage=\$(git log origin/${params.tag} -1 --pretty=%B)
                    fi
                    echo "export const commitId = '\${commitId}';\n  export const branch = '${params.tag}';\n  export const commitMessage = \"\\\"\${commitMessage}\\\"\";\n\n" > ./Front/src/version.js
                    echo "export const commitId = '\${commitId}';\n  export const branch = '${params.tag}';\n  export const commitMessage = \"\\\"\${commitMessage}\\\"\";\n\n" > ./BMS/src/version.js
                """
            }
        }

        stage('Build BMS and Front') {
            parallel {
                stage('Build BMS') {
                    steps {
                        script {
                            buildApp('BMS')
                        }
                    }
                }
                stage('Build Front') {
                    steps {
                        script {
                            buildApp('Front')
                        }
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sh """
                    set -xe
                    final_file_suffix=\$(echo "${params.tag}" | sed 's/\\//_/g')

                    apps=(BMS Front)
                    GIT_REV=\$(git log --pretty=format:'%h' -n 1)
                    BUILD_TIME=\$(date +%Y%m%d%H%M)
                    BUILD_TAG=\${GIT_REV}-\${BUILD_TIME}
                    rm -rf ./package/*
                    mkdir -p ./package
                    for app in \${apps[@]}; do
                      mkdir -p ./package/\$app/
                      cp -rf \$app/build/* ./package/\$app/
                    done

                    package_last=${ARTIFACT_ID}.tgz.\${final_file_suffix}
                    cd ./package/
                    chmod a+r -R ./*
                    tar czvf \${package_last} ./*

                    rm -rf ${PACKAGE_DIR}/\$package_last
                    mv \${package_last} ${PACKAGE_DIR}/

                    if [ "${params.restart_application}" == "true" ]; then
                        kubectl patch -n ${NAMESPACE} deployment wolf-shrcb-static --type='json' -p '[{"op": "replace", "path": "/spec/template/spec/containers/1/args/0", "value": "'\${final_file_suffix}'" }]'
                        sleep 2
                        pods=\$(kubectl get pod -n ${NAMESPACE} | grep wolf-shrcb-static | sed -e 1d | awk '{print \$1}')
                        [ -n "\$pods" ] && echo \$pods | xargs kubectl delete pod -n ${NAMESPACE}
                        echo "success deploy wolf-shrcb-static \${final_file_suffix}" 
                    else
                        echo "skip deploy wolf-shrcb-static \${final_file_suffix}" 
                    fi

                    # 是否需要将包发布至 FTP
                    if [ "${params.push_to_ftp}" == "true" ]; then
                        ncftpput -u datatist -p Datatist-aws-ftp#888! -m idc-ftp.datatist.com /zhaoxin/k8s/package/shrcb/ ${PACKAGE_DIR}/\${package_last}
                    fi
                """
            }
        }
    }
}

def buildApp(app) {
    node_version_tag="${params.node_version}"
    export PATH="$NODE_VERSION_PATH:$PATH"
    node --version
    git --version
    
    if [[ ${params.need_build} == "true" ]]; then
        if [[ ${params.package_manager} == "npm" ]]; then
            cd ${app} && npm rebuild node-sass && npm install ${NPM_REGISTRY} && npm run build
        elif [[ ${params.package_manager} == "yarn" ]]; then
            cd ${app} && npm install -g yarn && yarn install ${NPM_REGISTRY} && yarn build
        elif [[ ${params.package_manager} == "pnpm" ]]; then
            cd ${app} && npm install -g pnpm@7 --registry=https://registry.npmmirror.com && pnpm install --no-frozen-lockfile ${NPM_REGISTRY} && pnpm build
        fi
    fi
}

