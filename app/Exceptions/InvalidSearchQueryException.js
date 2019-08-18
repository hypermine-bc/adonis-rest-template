'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

const message = 'Invalid Search Query'
const status = 403
const code = 'E_NOT_STRING'

class InvalidSearchQueryException extends LogicalException {
    /**
     * Handle this exception by itself
     */
    // handle () {}

    constructor() {
        super(message, status, code)
    }

    // async handle(error, { response }) {
    //     response.status(status).send(message)
    // }
}

module.exports = InvalidSearchQueryException
