'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const InvalidFilterJsonException = use('App/Exceptions/InvalidFilterJsonException')
const InvalidSearchQueryException = use('App/Exceptions/InvalidSearchQueryException')
const FilterParser = use('App/Helpers/FilterParser')
const { validate } = use('Validator')
const Logger = use('Logger')

/**
 * Resourceful controller for interacting with basehttps
 */
class BaseController {
  
  constructor(){

    this.model
    this.allowedWiths
    this.request
    this.response
    this.updatable
    this.searchable
    this.logData = {
      userid:"",
      controller:"",
      method:"",
      data:{}
    }

    this.accessLog = function (auth, message, method, ControllerName, data={}) {
      var d = Date(Date.now());
      this.logData.userid = auth.user.id
      this.logData.method = method
      this.logData.controller = ControllerName
      this.logData.data = data
      this.logData.time = d.toString()
      
      Logger
        .transport('file')
        .info(message,this.logData)
    }

    this.addWheres = function ($query) {
      let req = this.request.input("filters", "[]")
      let filters = [];
      try{

        filters = JSON.parse(req)

      } catch (error) {

        throw new InvalidFilterJsonException()

      }

      let filter = new FilterParser()

      return filter.parse($query, filters)
    }

    this.addSearchables = function ($query) {
      let req = this.request.input("query", "")
      
      try{
        if(req)
        {
          this.searchable.forEach(columnName => {
            $query.orWhere(columnName, 'like', '%' + req + '%')
          })
        }
      } catch (error) {

        throw new InvalidSearchQueryException()

      }

      return $query
    }

    this.addWiths = function ($query,$relations){
      $relations.forEach(relation=>{ $query.with(relation)})
      return $query
    }

    this.getwiths = function () {
      let req = this.request.input('attributes', '').split(",")
      let res = req.filter(value => -1 !== this.allowedWiths.indexOf(value))
      return res
    }

    this.getValidator = function (){
    }

    this.preCreate = function (data) {
      
      return data 
      
    }
    this.postCreate = function (data) {}

    this.preUpdate = function (data) {
      
      return data 
      
    }
    this.postUpdate = function (data) {}
  }


  /**
   * Show a list of all basehttps.
   * GET basehttps
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, auth }) {
    this.request = request
    this.response = response

    const page = this.request.input("page", 1)

    let query = this.model.query()
    query = this.addWiths(query, this.getwiths())
    query = this.addWheres(query)
    query = this.addSearchables(query)
    
    let res = await query.paginate(page)

    this.accessLog(auth, "", "index()", this.constructor.name)

    return response.json(res)

  }

  /**
   * Create/save a new basehttp.
   * POST basehttps
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {

    let rules = this.getValidators().rules;
    let messages = this.getValidators().messages;
    
    const validation = await validate(request.all(), rules, messages)
    
    if (validation.fails()) {
      return response.status(422).json(validation.messages())
    }

    let dataToCreate = request.only(Object.keys(rules));

    dataToCreate = this.preCreate(dataToCreate);

    let data = await this.model.create(dataToCreate);

    this.postCreate(data)

    this.accessLog(auth, "", "store()", this.constructor.name)

    return response.status(201).json(data)

  }

  /**
   * Display a single basehttp.
   * GET basehttps/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, auth }) {

    this.request = request
    this.response = response

    let query = this.model.query()

    query = this.addWiths(query, this.getwiths())

    query = query.where({ id: params.id})

    let res = await query.fetch()

    this.accessLog(auth, "", "show()", this.constructor.name)

    return response.json(res)

  }

  /**
   * Update basehttp details.
   * PUT or PATCH basehttps/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, auth }) {
    const entity = await this.model.find(params.id)

    if (!entity) {
      return response.status(404).json({ data: 'Resource not found' })
    }
    let rules = this.getValidators().rules;
    let messages = this.getValidators().messages;

    const validation = await validate(request.all(), rules, messages)

    if (validation.fails()) {
      return response.status(422).json(validation.messages())
    }

    let dataToUpdate = request.only(Object.keys(rules))

    entity.merge(dataToUpdate)

    let data = await entity.save()

    this.postUpdate(data)

    this.accessLog(auth, "Resource-id : " + params.id, "update()", this.constructor.name)

    return response.status(201).json(data)

  }

  /**
   * Delete a basehttp with id.
   * DELETE basehttps/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }

  async delete({ params, response, auth }) {
    const entity = await this.model.find(params.id)

    if (!entity) {
      return response.status(404).json({ data: 'Resource not found' })
    }

    await entity.delete()

    this.accessLog(auth, "Resource-id : " + params.id, "delete()", this.constructor.name)

    return response.status(204).json(null)
  }
}

module.exports = BaseController
