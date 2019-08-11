'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

const message = 'Invalid json in filters'
const status = 403
const code = 'E_NOT_JSON'

class InvalidFilterJsonException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle () {}

  constructor() {
    super(message, status, code)
  }
}

module.exports = InvalidFilterJsonException
