const EMERGENCY = 0;
const ALERT = 1;
const CRITICAL = 2;
const ERROR = 3;
const WARNING = 4;
const NOTICE = 5;
const INFO = 6;
const DEBUG = 7;

/**
* Classe che serve per scriver un GELF Log (unico protocollo supportato è il REST)
*/
export default class GELF {

  /**
  *
  * @param {streamname, authentication, threshold} options streamname è il nome del flusso
  * authentication la chiave di autenticazione, threshold la soglia minima di importanza per
  * scrivere o meno un  GELF
  */
  constructor(options)
  {
    if(options.hasOwnProperty('streamname') && options.streamname.length != 0)
    {
      this.host = options.streamname
    }
    if(options.hasOwnProperty('url') && options.url.length != 0)
    {
      this.url = options.url
    }
    if(options.hasOwnProperty('authentication') && options.authentication.length != 0)
    {
      this._AuthKey = options.authentication
    }

    if(options.hasOwnProperty('threshold'))
    {
      this.threshold = parseInt(options.threshold)
    }else{
      this.threshold = DEBUG
    }

    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
  }

  getDebugLevel(){
    return DEBUG;
  }

  getInfoLevel(){
    return INFO;
  }

  getNoticeLevel(){
    return NOTICE;
  }

  getWarningLevel(){
    return WARNING;
  }

  getErrorLevel(){
    return ERROR;
  }

  getCriticalLevel(){
    return CRITICAL;
  }

  getAlertLevel(){
    return ALERT;
  }

  getEmergencyLevel(){
    return EMERGENCY;
  }

  /**
  *
  * @param {short_message, full_message, facility, level, file, line, additionals} options short_message è il titolo del Messaggio
  * full_message il corpo del Messaggio, facility è la scorciatoia per identificare un gruppo di Messaggi, level è uno tra
  * const EMERGENCY|ALERT|CRITICAL|ERROR|WARNING|NOTICE|INFO|DEBUG, file è il nome o percorso del file che genera il Messaggio,
  * line è la linea che genera il Messaggio, additionals è un oggetto formato chiave=>valore per aggiungere delle
  * informazioni supplementari al Messaggio
  */
  send(options = {})
  {
    if (!this.host || !this._AuthKey || !this.url)
    {
      console.log('Unable to send GELF stream')
      return
    }

    const body = {
      host: this.host,
      _AuthKey: this._AuthKey,
      _timestamp: new Date(),
      _page: window.location.pathname,
      _href: window.location.href,
      _referrer: document.referrer,
      _browser: typeof navigator.userAgent !== 'undefined' ? navigator.userAgent : window.navigator.product + " " + window.navigator.appName + " " + window.navigator.appVersion,
      _browserLanguage: navigator.language,
      _screen: "Screen dimensions: " +  window.screen.width + "x" + window.screen.height + " Screen available dimensions: " +  window.screen.availWidth + "x" + window.screen.availHeight + " Screen inner dimensions: " +  window.innerWidth + "x" + window.innerHeight
    };

    if(options.hasOwnProperty('short_message') && this.is_string_full(options.short_message))
    {
      body.short_message = encodeURI(options.short_message)
    }

    if(options.hasOwnProperty('full_message') && this.is_string_full(options.full_message))
    {
      body.full_message = encodeURI(options.full_message)
    }

    if(options.hasOwnProperty('facility') && this.is_string_full(options.facility))
    {
      body.facility = encodeURI(options.facility)
    }

    if(options.hasOwnProperty('level') && this.is_int(options.level))
    {
      body.level = options.level
    }
    else body.level = DEBUG

    if(options.hasOwnProperty('file') && this.is_string_full(options.file))
    {
      body.file = encodeURI(options.file)
    }

    if(options.hasOwnProperty('line') && this.is_int(options.line))
    {
      body.line = options.line
    }

    if(options.hasOwnProperty('additionals'))
    {
      const self = this
      Object.keys(options.additionals).forEach(function(key) {
        if(self.is_string_full(key)){
          try{
            body["_"+key] = self.is_string_full(options.additionals[key]) ? encodeURI(options.additionals[key]) : JSON.stringify(options.additionals[key]);
          }catch(e){}
        }
      });
    }

    if(this.threshold < body.level)
    {
      return
    }

    const searchParams = new URLSearchParams();
    Object.keys(body).forEach(key => searchParams.append(key, body[key]));

    fetch(this.url, {
      method: 'POST',
      body: searchParams.toString(),
      headers: this.headers
    })
    .then(response => {
      //console.log(response)
    })
    .catch(error => {
      console.error('There was an error on LOG writing', error)
    });
  }

  is_string(input){
    return (typeof input == 'string' || input instanceof String)
  }

  is_string_full(input){
    return this.is_string(input) && input.length != 0;
  }

  is_int(input) {
    if (isNaN(input)) {
      return false;
    }
    var x = parseFloat(input);
    return (x | 0) === x;
  }
}
