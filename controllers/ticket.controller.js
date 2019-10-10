'use strict'

const repository = require("../repositories/ticket.repository")

class ticketController {
    constructor() {}
    
        async post (req, resp, next) {
            let created = await new repository().create(req.body)
            resp.status(201).send(created)
        }
        async get (req, resp, next) {
            let list = await new repository().getAll()
            resp.status(200).send(list)
        }
        async getById (req, resp, next) {
            let result = await new repository().getById(req.params.id)
            resp.status(200).send(result)
        }
        async put (req, resp, next) {
            let updated = await new repository().update(req.params.id, req.body)
            resp.status(202).send(updated)
        }
        async delete (req, resp, next) {
            let deleted = await new repository().delete(req.params.id)
            resp.status(204).send()
        }
    
}

module.exports = ticketController