'use strict';
const Joi = require('joi');
const product = require('../services/models/todolists');
module.exports = function () {
    return [
        // Get
        {
            method: 'GET',
            path: '/api/todolists',
            config: {
                handler: async function (req, reply) {
                    const data = await product.find({}, (req, res, next) => { })
                    return (data)
                }
            }
        },
        {
            method: 'GET',
            path: '/api/todolists/{id}',
            config: {
                handler: async function (req, reply) {
                    if (req.params.id) {
                        const data = await product.findById(req.params.id, (err, call) => {
                            if (err) {
                                return ({ status: false })
                            } else {
                                return (call)
                            }
                        });
                        return (data)
                    }
                }

            }
        },
        // Create
        {
            method: 'POST',
            path: '/api/todolists',
            config: {
                validate: {
                    payload: {
                        // required fields
                        _id: Joi.string(),
                        product_code: Joi.string(),
                        product_name: Joi.string(),
                        product_qty: Joi.number(),
                        product_price: Joi.number(),
                        product_detail: Joi.string(),
                        product_img: Joi.string(),
                        product_group: Joi.string()
                    }
                },
                handler: async function (request, reply) {
                    // console.log(request.payload.product_code);
                    if (request.payload._id == undefined && request.payload.id == undefined) {
                        // console.log("save");
                        const data = await product.create(request.payload, function (err, call) {
                            if (err) {
                                return err
                            }
                        })
                        return (data);

                    } else if (request.payload._id || request.payload.id) {
                        let tmpId
                        if (request.payload._id) {
                            tmpId = request.payload._id
                        } else {
                            tmpId = request.payload.id
                        }
                        const data = await product.findById(tmpId, (err, call) => { });
                        return (data)
                    } else {
                        return ({ status: false })
                    }
                }
            }
        },
        // Update
        {
            method: 'PUT',
            path: '/api/todolists',
            config: {
                handler: async function (request, reply) {
                    if (request.payload._id || request.payload.id) {
                        let tmpId
                        if (request.payload._id) {
                            tmpId = request.payload._id
                        } else {
                            tmpId = request.payload.id
                        }
                        try {
                            request.payload.product_lastUpdate = Date.now();
                            const data = await product.findByIdAndUpdate(tmpId, request.payload, (err, call) => {
                                if (err) {
                                    return ({ status: false })
                                } else {
                                    return ({ status: true, id: call._id })
                                }
                            })
                            return ({ status: true })
                        } catch (err) {
                            return ({ status: false })
                        }

                    } else {
                        return ({ status: false })
                    }
                }
            }
        },
        // Delete
        {

            method: 'DELETE',
            path: '/api/todolists',
            config: {
                handler: async function (request, reply) {
                    if (request.payload._id || request.payload.id) {
                        let tmpId
                        if (request.payload._id) {
                            tmpId = request.payload._id
                        } else {
                            tmpId = request.payload.id
                        }
                        try {
                            const data = await product.findByIdAndRemove(tmpId, (err, call) => {
                                if (err) {
                                    return ({ status: false })
                                } else {
                                    return ({ status: true, id: tmpId })
                                }
                            });
                            return ({ status: true, id: tmpId })
                        } catch (err) {
                            return ({ status: false })
                        }

                    } else {
                        return ({ status: false })
                    }
                }
            }
        }
    ];
}();