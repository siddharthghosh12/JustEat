const express = require('express');
const bodyParser = require('body-parser');
const Users = require('../models/usermodel');
const Restaurant = require('../models/Restaurant');
const Orders = require('../models/orderModel');
const twilio = require('../twilio');


const OrderRouter = express.Router();
OrderRouter.use(bodyParser.json());

OrderRouter.post('/place_order', (req, res, next) => {
    const { restname, userAddress, userName, userPhone, totalCost, dishes } = req.body;
    let order = '';
    let new_dishes_array = [];
    for (i = 0; i < dishes.length; ++i) {
        if (i === dishes.length - 1)
            order = order + `${dishes[i].dish.name}*${dishes[i].quantity}.`;
        else
            order = order + `${dishes[i].dish.name}*${dishes[i].quantity},`;
    }
    for (i = 0; i < dishes.length; ++i) {
        let new_object = {
            name: dishes[i].dish.name,
            Price: dishes[i].dish.Price,
            Quantity: dishes[i].quantity,
            Veg: dishes[i].dish.veg
        }
        new_dishes_array.push(new_object);
    }
    Restaurant.findOne({ name: restname })
        .then((restaurant) => {

            const phone = String(restaurant.Phone).replace(/[^\d]/g, '');
            let new_order = {
                restId: restaurant._id,
                restName: restname,
                userName: userName,
                userAddress: userAddress,
                userPhone: userPhone,
                totalCost: totalCost,
                createdAt: new Date(),
                dishes: [...new_dishes_array]
            }
            twilio.messages.create({
                body:
                    `
                    Name:${userName}
                    Phone:${userPhone}
                    address:${userAddress}
                    order : ${order}
                `,
                to: '+' + phone,
                from: '+12622055968',
            }, (err) => {
                if (err)
                    return res.status(422).send(err);
                Orders.create(new_order)
                    .then((info) => {
                        Users.findOne({ Phone: userPhone })
                            .then((user) => {
                                user.pastOrders.push({
                                    OrderId: info._id,
                                    restName: restname,
                                    restId:restaurant._id,
                                    address: userAddress,
                                    totalCost: totalCost,
                                    dishes: [...new_dishes_array]
                                })

                                user.save((err, user_info) => {
                                    if (err)
                                        return res.status(422).send(err);
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json({lastOrder:user_info.pastOrders[user_info.pastOrders.length - 1]});
                                })
                            }).catch(e => console.log(e))
                    }, err => console.log(err))
                    .catch(e => console.log(e));
            })
        })
        .catch(e => console.log(e));
});

OrderRouter.get('/check_status/:OrderId',(req,res,next) => {
    Orders.findById(req.params.OrderId)
        .then((order_info) => {
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json({orderAt : order_info.createdAt})
        })
        .catch(e => console.log(e));
})

OrderRouter.post('/received_order',(req,res,next) => {
    const phone = String(req.body.Phone).replace(/[^\d]/g, '');
    const orderId = req.body.orderId;
    Users.findOne({Phone:phone})
        .then((user) => {
            user.pastOrders.map((item) => {
                if(item.OrderId.toString() === orderId.toString())
                {
                    item.delivered = true;
                    item.orderStatus = 'delivered';
                    return item;
                }
                return item;
            })
            user.save((err, user) => {
                if (err)
                  return res.status(422).send({ error: err })
                else {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json')
                  res.send({ success: true });
                }
              })
        }).catch(e => console.log(e));
})

module.exports = OrderRouter;