require('dotenv').config()

// Express
const express = require('express');
const app = express()

// Importando el router
const userRoute = require('./routes/user.js')
const authRoute = require('./routes/auth.js')
const productRoute = require('./routes/product.js')
const cartRoute = require('./routes/cart.js')
const orderRoute = require('./routes/order.js')
const stripeRoute = require('./routes/stripe.js')
const cors = require('cors')

// Mongoose para conectar la BD
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL)
   .then(() => {
      console.log('Conexión exitosa a la base de datos');

   })
   .catch((error) => {
      console.log(error);

   })

// Rutas
app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/carts", cartRoute)
app.use("/api/orders", orderRoute)
app.use("/api/checkout", stripeRoute)

// Validando el puerto si exite uno en .env, o utiliza el 5000
const port = 5000
app.listen(process.env.PORT || port, () => {
   console.log(`¡Backend corriendo en el puerto ${port}!`);

})