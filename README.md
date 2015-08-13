#Install Platform

##Install NVM
 
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash  
    nvm install stable  
    nvm use stable  
    nvm alias default stable  
 
##Updating NPM and Install global dependencies

    npm install -g npm
    npm install -g npm-check-updates ungit yo grunt-cli bower karma mocha supertest should phantomjs
 
#Clone this app example
  
    mkdir application-reference-nodejs
    git clone git@github.com:pami-inssjp/application-reference-nodejs.git
  
#Install dependencies

    cd application-reference-nodejs
    npm install
    
##Test app

    mocha

##Configuration

This example use the config package for manage configuration. For reference view /config/default.json file

    {
      "port": 9000,
      "ip": "0.0.0.0",
      "console": {
    	  "filename": "application.log",
    	  "levellog": "debug" //debug, log, info, warn, error
      },
      "jwt": {
        "secret":"my-secret-word"
      }
    }
