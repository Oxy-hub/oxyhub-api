const xss = require('xss');

class UtilityService {
  /**  
   This function is responsible for sanitizing the properties of any object passed to it
   Options accepts a property called skipKeys(for now) which can be used to skip any particular property's sanitization 
  */
  sanitizeObject(payload, options) {
    const sanitized = {};
    const { skipKeys } = options;

    Object.keys(payload).forEach(key => {
      if (skipKeys.includes(key)) {
        sanitized[key] = payload[key];
      } else {
        sanitized[key] = xss(payload[key]);
      }
    });

    return sanitized;
  }
}

exports.UtilityService = UtilityService;
