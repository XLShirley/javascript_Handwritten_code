def GIT_BRANCH = 'develop'
def GIT_URL = 'https://gitlab.datatist.cn/datatist/datatist-wolf-static'
def PACKAGE_DIR= '/workspace/package'
def ARTIFACT_ID = 'wolf-static'
def NAMESPACE = 'wolf'
def NPM_REGISTORY='--registry=http://nexus.dev2.datatist.cn/nexus/repository/npm-all/'
def NPM_PUBLISH_REGISTORY='--registry=http://nexus.dev2.datatist.cn/nexus/repository/npm-internal/'
// add '//nexus.dev.datatist.cn/nexus/repository/npm-internal/:_authToken=NpmToken.fa6f0c9e-0082-3b99-a9e7-9f0000fafafe' to npmrc
// npm私服账号和密码 username：deployment password：Datatist1506 
// 邮箱：deployment@datatist.com 
// 登录：npm login --registry=http://nexus.dev.datatist.cn/nexus/repository/npm-internal/ 
// 推送：npm publish --registry=http://nexus.dev.datatist.cn/nexus/repository/npm-internal/ 
// 下拉：npm i *** --registry=http://nexus.dev.datatist.cn/nexus/repository/npm-all/
def NODE_VERSION_DICT=["v12.22":"/root/node-v12.22.12-linux-x64/bin/", "v14.18":"/root/node-v14.18.0-linux-x64/bin/",
 "v16.13":"/root/node-v16.13.0-linux-x64/bin/"]
def NODE_VERSION_PATH=NODE_VERSION_DICT["${params.node_version}"]



pipeline {
    agent any
    options { retry(2) }
    parameters {
        string(name: 'tag', defaultValue: 'develop', description: '发布版本 ')
        choice(name: 'node_version', choices: ['v16.13', 'v14.18','v12.22'], description: '选择node版本')
        choice(name: 'package_manager', choices: ['pnpm','npm', 'yarn'], description: '选择包管理器')
        choice(name: 'need_build', choices: ['true', 'false'], description: '是否需要build, 如果不build，将只重启应用')
        choice(name: 'push_to_ftp', choices: ['false', 'true'], description: '是否需要将包发布至ftp')
        choice(name: 'restart_application', choices: ['true', 'false'], description: '是否重启应用')
        choice(name: 'apps', choices: ['ALL', 'BMS','FRONT'], description: '打包应用') 
    }
    stages {
        stage('Git Checkout') {
            steps {
                //sh "git version"
                //git branch: 'feature/boar', credentialsId: 'deploy', url: 'https://gitlab.datatist.cn/datatist/datatist-infrastructure-platform.git' ${GIT_BRANCH}
                // git branch: "${GIT_BRANCH}", credentialsId: 'deploy', url: "${GIT_URL}"
                checkout scm: [$class: 'GitSCM', userRemoteConfigs: [[credentialsId: 'deploy', url: "${GIT_URL}"]],  branches: [[name: "${params.tag}"]]], poll: false
            }
        }
        stage('create version file') {
        	steps {
        		sh """
        			commitId=''
        			commitMessage=''
        			# true : v1.1.0 v12.12.13 v123.123.123.123
        			# false:  1.1.0 12.13 v12.13 v1.2.3.4.5
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
        // stage('publis wolf-static-component') {
        //     steps {
        //         sh "[ \"${params.need_build}\" == \"true\" ] && cd wolf-static-component && npm install ${NPM_REGISTORY} && npm run build && npm publish ${NPM_PUBLISH_REGISTORY}"
        //     }
        // }
        
        stage('Build BMS') {
            when { expression { return params.apps == 'ALL' || params.apps == 'BMS' } }
            steps {
                sh """
                node_version_tag="${params.node_version}"
                export PATH="$NODE_VERSION_PATH:$PATH"
                node --version
                git --version
                if [[ "${params.tag}" =~ ^(v|uat.v)[0-9]+\\.[0-9]+\\.[0-9]+(\\.[0-9]+){0,2}\$ ]]; then 
        			git rev-parse --abbrev-ref ${params.tag}
        		else
        			git rev-parse --abbrev-ref origin/${params.tag}
        		fi
                if [[ ${params.need_build} == "true" ]];then
                    if [[ ${params.package_manager} == "npm" ]];then
                        cd BMS &&  npm rebuild node-sass && npm install ${NPM_REGISTORY} && npm run build
                    elif  [[ ${params.package_manager} == "yarn" ]];then
                        cd BMS && npm install -g yarn &&  yarn install ${NPM_REGISTORY} && yarn build
                    elif   [[ ${params.package_manager} == "pnpm" ]];then
                        cd BMS && npm  install -g pnpm@7 --registry=https://registry.npmmirror.com && pnpm install --no-frozen-lockfile&& pnpm build
                    fi
                fi
                """
            }
        }
        stage('Build Front') {
            when { expression { return params.apps == 'ALL' || params.apps == 'FRONT' } }
            steps {
                //sh "[ \"${params.need_build}\" == \"true\" ] && cd Front && rimraf node_modules"
                sh """
                node_version_tag="${params.node_version}"
                export PATH="$NODE_VERSION_PATH:$PATH"
                node --version
                if [[ ${params.need_build} == "true" ]];then
                    if [[ ${params.package_manager} == "npm" ]];then
                        cd Front &&  npm rebuild node-sass && npm install ${NPM_REGISTORY} && npm run build
                    elif  [[ ${params.package_manager} == "yarn" ]];then
                        cd Front && npm  install -g yarn &&  yarn install ${NPM_REGISTORY} && yarn build
                    elif   [[ ${params.package_manager} == "pnpm" ]];then
                        cd Front && npm  install -g pnpm@7 --registry=https://registry.npmmirror.com && CI=true pnpm install --no-frozen-lockfile&& pnpm build
                    fi
                fi
                
                """
             //    sh "[ \"${params.need_build}\" == \"true\" ] && cd Front && cnpm install --registry=http://nexus.dev.datatist.cn/nexus/repository/npm-all/ && cnpm run build"
            }
        }

        stage ('Deploy') {
            steps {
                sh """
                    set -xe
                    final_file_suffix=\$(echo "${params.tag}" | sed 's/\\//_/g')

                    apps=(BMS Front)
                    GIT_REV=`git log --pretty=format:'%h' -n 1`
                    BUILD_TIME=`date +%Y%m%d%H%M`
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
                    
                    if [ \"${params.restart_application}\" == \"true\" ]; then
                        kubectl patch -n ${NAMESPACE} deployment wolf-static --type='json' -p '[{"op": "replace", "path": "/spec/template/spec/containers/1/args/0", "value": "'\${final_file_suffix}'" }]'
                        sleep 2
                        pods=`kubectl get pod -n ${NAMESPACE} wolf-static | sed -e 1d | awk '{print \$1}'`
                        [ -n "\$pods" ] && echo \$pods | xargs kubectl delete pod -n ${NAMESPACE}
                        echo "success deploy wolf-static \${final_file_suffix}" 
                    else
                        echo "skip deploy wolf-static \${final_file_suffix}" 
                    fi
                    # 是否需要将包发布至ftp
                    if [ \"${params.push_to_ftp}\" == \"true\" ]; then
                        ncftpput -u datatist -p Datatist-aws-ftp#888! -m idc-ftp.datatist.com /zhaoxin/k8s/package/ ${PACKAGE_DIR}/\${package_last}
                        ncftpput -u datatist -p Datatist-aws-ftp#888! -m ftp.datatist.com /zhaoxin/k8s/package/ ${PACKAGE_DIR}/\${package_last}
                    fi
                """
            }
        }
    }
}