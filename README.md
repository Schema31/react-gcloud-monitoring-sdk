# react-gcloud-monitoring-sdk

```javascript
import Logger from "@schema31/react-gcloud-monitoring-sdk";

const EMERGENCY = 0;
const ALERT = 1;
const CRITICAL = 2;
const ERROR = 3;
const WARNING = 4;
const NOTICE = 5;
const INFO = 6;
const DEBUG = 7;

const LoggerConfig = { // Logger configurations
  streamname: "development",
  authentication: "456476567567",
  threshold: NOTICE,
  url: "https://yourStreamUrl.com/" //if logger url is not set, the default value will be used instead
}
const devMode = true;

/**
  *
  * @param {object} LoggerConfig - Basic configurations to setup the logging stream
  * @param {bool} devMode - if true enables additional console logging
  *
  */
const logger = new Logger(LoggerConfig, devMode); //set devMode TRUE for additional console logging
const additionals = {
    "Type": "Exception",
    "AppName": "Your application name"
}

try{
   throw Error("Error")
}catch(e){
  logger.logException(e, additionals)
}

logger.LogInfo({ 
  ...additionals,
  level: 6 //default value for info logging
})

```
