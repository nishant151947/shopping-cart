

const express = require('express');
var cors = require('cors'); //allow any ip adress to access our express server

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post("/checkout",async(req,res)=>{
    /*
    req.body.items
    [
      {
         id: 1,
         quantity:2
      }
    ]

    stripe wants
    [
       {
         price:1,
         quantity:2
       }
    ]
    */

    // console.log(req.body);
    // const items  = req.body.items;
    // let lineItems = [];
    // items.forEach((item)=>{
    //     lineItems.push(
    //         {
    //             price:item.id,
    //             quantity:item.quantity
    //         }
    //     )
    // });
    // const session = await stripe.checkout.sessions.create({
    //     line_items:lineItems,
    //     mode:'payment',
    //     success_url:"http://localhost:5174/success",
    //     cancel_url:"http://localhost:5174/cancel"
    // });
    // res.send(JSON.stringify({
    //     url:session.url
    // }))
    try {
      console.log("Received items:", req.body.items);
      const items = req.body.items;

      // Build line items using Stripe Price IDs
      let lineItems = items.map((item) => ({
        price: item.id, // Must be 'price_...' string
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel",
      });

      // Send URL back to your fixed frontend
      res.status(200).json({ url: session.url });
    } catch (error) {
      console.error("Stripe Session Error:", error.message);
      res.status(500).json({ error: error.message });
    }
});

app.listen(4000,()=>console.log('listening on port 4000')
)
