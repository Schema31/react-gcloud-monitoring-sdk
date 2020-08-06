import GELF from './GELF'

export default class Logger
{
  constructor(config, devMode)
  {
    // { url, streamname, authentication, threshold }
    this.devMode = devMode
    this.gelf = new GELF(config);
  }

  send(options = {})
  {
    this.gelf.send(options)
  }

  LogDebug(options = {})
  {
    let gelf = this.gelf
    options.level = gelf.getDebugLevel()
    gelf.send(options)
  }

  LogInfo(options = {})
  {
    let gelf = this.gelf
    options.level = gelf.getInfoLevel()
    gelf.send(options)
  }

  LogNotice(options = {})
  {
    let gelf = this.gelf
    options.level = gelf.getNoticeLevel()
    gelf.send(options)
  }

  LogWarning(options = {})
  {
    let gelf = this.gelf
    options.level = gelf.getWarningLevel()
    gelf.send(options)
  }

  LogError(options = {})
  {
    let gelf = this.gelf
    options.level = gelf.getErrorLevel()
    gelf.send(options)
  }

  LogCritical(options = {})
  {
    let gelf = this.gelf
    options.level = gelf.getCriticalLevel()
    gelf.send(options)
  }

  LogAlert(options = {})
  {
    let gelf = this.gelf
    options.level = gelf.getAlertLevel()
    gelf.send(options)
  }

  LogEmergency(options = {})
  {
    let gelf = this.gelf
    options.level = gelf.getEmergencyLevel()
    gelf.send(options)
  }

  logException(e, otherAdditionals = {})
  {
    let gelf = this.gelf
    try{
      e = JSON.parse(e)
    }
    catch(e){}

    let e_name = e.name || e.error || e.status
    let e_message = e.message || e.reason || e.statusText
    let e_stack = e.stack

    try{
      if (e.body) otherAdditionals.body = e.body
      if (e.headers) otherAdditionals.headers = e.headers
      if (e.status) otherAdditionals.status = e.status
      if (e.statusText) otherAdditionals.statusText = e.statusText
      if (e.type) otherAdditionals.type = e.type
      if (e.url) otherAdditionals.url = e.url
    }catch(e){}

    if (this.devMode === true) console.log('logException', gelf, e, otherAdditionals)

    if (typeof e.then === 'function') {
      // probably a promise
      Promise.resolve(e).then((results) => {
        if(results.ok !== 'undefined' && results.ok === false){
          if (this.devMode === true)
          {
            console.log("E' una Promise ... la elaboro")
            console.log(results);
          }
          e_name = results.status
          e_message = results.statusText
          e_stack = e_name + " - " + e_message + " - " + results.url
          otherAdditionals.body = results.body
          otherAdditionals.headers = results.headers
          otherAdditionals.status = results.status
          otherAdditionals.statusText = results.statusText
          otherAdditionals.type = results.type
          otherAdditionals.url = results.url

          let options = {
            short_message: e_name + " - " + e_message,
            full_message: typeof e_stack !== 'undefined' ? e_stack : e_message,
            facility: e_name,
            level: gelf.getErrorLevel(),
            additionals: otherAdditionals
          }
          gelf.send(options)
        }
      });
    } else {
      // definitely not a promise
      let options = {
        short_message: e_name + " - " + e_message,
        full_message: typeof e_stack !== 'undefined' ? e_stack : e_message,
        facility: e_name,
        level: gelf.getErrorLevel(),
        additionals: otherAdditionals
      }
      gelf.send(options)
    }
  }
}
