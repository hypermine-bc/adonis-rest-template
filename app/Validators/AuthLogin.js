'use strict'

class AuthLogin {

  /**
   * Rules for validating the inputs
   */
  get rules() {
    return {
      email: 'required|email',
      password: 'required'
    }
  }

  /**
   * Request sanitisation goes here
   */
  get sanitizationRules() {
    // sanitize data before validation
  }
}

module.exports = AuthLogin
