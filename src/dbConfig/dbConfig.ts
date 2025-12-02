import mongoose from 'mongoose'

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)  
        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log('Mongodb connected successfully!')
        })

        connection.on("error", (error) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running' + error)
        })

    } catch (error) {
        console.log('Something went wrong in connection to the DB!')
       console.log(error) 
    }
}