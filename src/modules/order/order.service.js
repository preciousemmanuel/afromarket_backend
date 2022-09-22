const models = require('../../db/models')
var Sequelize = require('sequelize')

const {
    sequelize,
    Order,
    Product,
    OrderedItem
} = models

exports.createOrder = async (user, data) =>{
    try {

        const {order_tray} = data
        let total_price = 0
        let ordered_items = []
        const newOrder= await Order.create(
            {   items: '',
                UserId:user.id
            },
            {raw: true}
        )
        
        for(const item of order_tray){
            const product = await Product.findOne({where:{id: item.id}})
            await Product.update(
                {quantity_available: Number(product.quantity_available)-Number(item.quantity_ordered) },
                {where:{id: item.id}}
            )
            const productPush = await Product.findOne({
                attributes:['id','name', 'price', 'description'],
                where:{id: item.id}}
            )
            const ordered_item = await OrderedItem.create({
                product_id: product.id,
                product_name: product.name,
                quantity_ordered: Number(item.quantity_ordered),
                price: Number(product.price),
                total: (Number(product.price))*(Number(item.quantity_ordered)),
                OrderId:newOrder.id
            })

            const orderId = ordered_item.id
            ordered_items.push(orderId)
            total_price += Number(ordered_item.total)
        }
        console.log(ordered_items)
        console.log(total_price);
        
        console.log();
        

        await Order.update(
            {
                items: ordered_items,
                order_cost: total_price,
            },
            {where: {id:newOrder.id}}
        )
        const updatedOrder = await Order.findOne({
            where:{id:newOrder.id}
        })
         return {
            error: false,
            message: "Order created successfully",
            data: updatedOrder
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to create an Order at the moment",
            data: null
        }
        
    }
}

exports.cancelOrder = async (user, data) =>{
    try {
        const existingOrder = await Order.findOne({
            where:{
                id: data.id,
                UserId: user.id
            }
        })

        if(!existingOrder){
            return{
                error: true,
                message: 'Cannot find specified Order',
                data: null
            }
        }
        await Order.upsert({
            id: existingOrder.id,
            status: "canceled",
        })
         const canceledOrder = await Order.findOne({
            where:{
                id: existingOrder.id,
                UserId: user.id
            }
        })

     
        return {
            error: false,
            message: "Order canceled successfully",
            data: canceledOrder
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to cancel order at the moment",
            data: null
        }
        
    }
}

exports.getMyOrders = async (user) =>{
    try {
        let allMyOrders = {}

        const myOrders = await Order.findAll({
            where:{
                UserId: user.id,
            },
            order: [
                ['created_at', 'DESC'],
            ],
        })

        if(Number(myOrders.length) < 1 ){
            return{
                error: true,
                message: 'Cannot find any of your orders',
                data: null
            }
        }

          for(const order of myOrders){
            const orderId = order.id
            const ordered_items = await OrderedItem.findAll({where:{OrderId: orderId}})
            allMyOrders[orderId] = ordered_items
        }
        
        
        return {
            error: false,
            message: "Orders Retrieved successfully",
            data: [myOrders, allMyOrders]
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to retrieve orders at the moment",
            data: null
        }
        
    }
}

exports.getSingleOrder = async (user, data) =>{
    try {
        const singleOrder = await Order.findOne({
            where:{
                id: data.id,
                UserId: user.id
            }
        })
        const orderedItems = singleOrder.items
        let orderTray = []
        for(const item of orderedItems){
            const order_item = await OrderedItem.findOne({where:{id: item}})
            orderTray.push(order_item)
        }
        return {
            error: false,
            message: "single order fetched successfully",
            data: {order:singleOrder, orderedItems:orderTray}
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to fetch single order at the moment",
            data: null
        }
        
    }
}
