'use strict'

require('../models/ticket.model')
const Base = require('../bin/base/repository.base')

class TicketRepository {
    constructor() {
        this._base = new Base('ticket')
    }

    async create(data){
        return await this._base.create(data)        
    }

    async update(id, data) {
        return await this._base.update(id, data)
    }

    async getAll() {
        return await this._base.getAll()      
    }

    async getById(id) {
        return await this._base.getById(id)
    }

    async delete(id) {
        return await this._base.delete(id)
    }
}

module.exports = TicketRepository