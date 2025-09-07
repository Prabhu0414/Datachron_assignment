require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');

connectDB(process.env.MONGO_URI).then(

    async () => {
        const admin = new User({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'adminpass',
            role: 'Admin'
        });

        await admin.save();
        console.log('Admin user created');
        process.exit();
    }
)