import axios from 'axios';
import Dev from '../models/Dev';
import parseStringAsArray from '../../utils/parseStringAsArray';

class DevController {
    async index(req, res) {
        const { page = 1 } = req.query;
        const { id } = req.params;

        const dev = id ?
            await Dev.findById(id) :
            await Dev.paginate({}, { page, limit: 10, sort: { _id: 'desc' } });

        if (id && !dev) {
            return res.status(400).json({ error: 'Dev not found.' });
        }

        return res.json(dev);
    }

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        const devExists = await Dev.findOne({ github_username });

        if (!devExists) {
            const { data } = await axios.get(
                `https://api.github.com/users/${github_username}`
            );

            const { name = login, avatar_url, bio } = data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }

        return res.json(devExists);
    }

    async update(req, res) {
        const { techs, latitude, longitude } = req.body;
        const { id } = req.params;

        const dev = await Dev.findById(id);

        if (!dev) {
            return res.status(400).json({ error: 'Dev not found.' });
        }

        const techsArray = parseStringAsArray(techs);

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };

        const updatedUser = await Dev.findByIdAndUpdate(
            id, {
                techs: techsArray,
                location,
            }, { new: true }
        );

        return res.json(updatedUser);
    }

    async delete(req, res) {
        const { id } = req.params;

        const dev = await Dev.findById(id);

        if (!dev) {
            return res.status(400).json({ error: 'Dev not found.' });
        }

        try {
            await Dev.findByIdAndRemove(id);
            return res.status(204).end();
        } catch (err) {
            return res.send(err);
        }
    }
}

export default new DevController();
