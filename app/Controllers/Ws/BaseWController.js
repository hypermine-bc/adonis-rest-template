'use strict'

class BaseWController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
}

module.exports = BaseWController
