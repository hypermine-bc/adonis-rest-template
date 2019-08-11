'use strict'

class AuthRegister {

  /**
   * Rules for validating the inputs
   */
  get rules () {
    return {
      email: 'required|email|unique:users,email',
      username: 'required',
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

module.exports = AuthRegister
