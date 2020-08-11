# react-gcloud-monitoring-sdk

# Setup
```javascript
import Logger from "@schema31/react-gcloud-monitoring-sdk";

const LoggerConfig = {
  streamname: "development", //mandatory: the log stream name
  authentication: "456476567567", //mandatory: the log stream authentication key
  threshold: 7, //optional: the default value is 7, corresponding to DEBUG level
  url: "https://yourStreamUrl.com/" //optional: default url for logging 
}
const devMode = true;

/**
  *
  * @param {object} LoggerConfig - Basic configurations to setup the logging stream
  * @param {bool} devMode - if true enables additional console logging
  *
  */
const logger = new Logger(LoggerConfig, devMode);
```

## Levels and Thresholds
```javascript
const EMERGENCY = 0;
const ALERT = 1;
const CRITICAL = 2;
const ERROR = 3;
const WARNING = 4;
const NOTICE = 5;
const INFO = 6;
const DEBUG = 7;
```

## Basic Usage

### Exception Logging
```javascript
try{
   throw Error("Error")
}catch(e){
  logger.logException(e, {
      "Type": "Exception",
      "AppName": "Your application name",
      ...
  })
}
```

### Info Logging
```javascript
logger.LogInfo({ 
  "AppName": "Your application name",
  "short_message": "message_name",
  ...
})
```

### Debug Logging
```javascript
logger.LogDebug({ 
  "AppName": "Your application name",
  "short_message": "message_name",
  ...
})
```

### Notice Logging
```javascript
logger.LogNotice({ 
  "AppName": "Your application name",
  "short_message": "message_name",
  ...
})
```

### Warning Logging
```javascript
logger.LogWarning({ 
  "Type": "Exception",
  "AppName": "Your application name",
  "short_message": "message_name",
  ...
})
```

### Error Logging
```javascript
logger.LogError({ 
  "AppName": "Your application name",
  "short_message": "message_name",
  ...
})
```

### Critical Logging
```javascript
logger.LogCritical({ 
  "AppName": "Your application name",
  "short_message": "message_name",
  ...
})
```

### Alert Logging
```javascript
logger.LogAlert({ 
  "AppName": "Your application name",
  "short_message": "message_name",
  ...
})
```

### Emergency Logging
```javascript
logger.LogEmergency({ 
  "AppName": "Your application name",
  "short_message": "message_name",
  ...
})
```

In case `short_message` is not set, the library will send a default code corresponding to the current level: 
"debug" for `DEBUG`, "info" for `INFO`, "notice" for `NOTICE`, "warning" for `WARNING`, "error" for `EMERGENCY`, `ALERT`, `CRITICAL` and `ERROR`.
