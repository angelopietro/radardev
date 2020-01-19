import mongoose from 'mongoose';

class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init() {}

    mongo() {
        this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
}
export default new Database();
