import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import PointSchema from './utils/PointSchema';

const DevSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    github_username: {
        type: String,
    },
    bio: {
        type: String,
    },
    avatar_url: {
        type: String,
    },
    techs: [{
        type: String,
    }, ],
    location: {
        type: PointSchema,
        createIndexes: '2dsphere',
    },
});

DevSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Dev', DevSchema);
