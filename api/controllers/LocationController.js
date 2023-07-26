const Location = require('../models/locations');
const Book = require('../models/books');

class LocationController {
    static async getLocationById(req, res) {
        const { id } = req.params;

        try {
            let locations, directories, books;
            if (id == 0) {
                // default parent location
                locations = await Location.getDefaultLocation();
                directories = await Location.getByParentId(locations[0].id);
                books = await Book.getByLocationId(locations[0].id);
                
            } else {
                locations = await Location.getLocationUntilRoot(id);
                directories = await Location.getByParentId(id);
                books = await Book.getByLocationId(id);
            }

            res.json({ locations, directories, books });
        } catch (err) {
            console.log('Error fetching data: ', err.message);
            res.status(500).json({ message: 'Error fetching data.' })
        }
    }

    static async createLocation(req, res) {
        const { name, parent_location_id } = req.body;

        try {
            await Location.create(name, parent_location_id);
            res.json({ message: 'Location created successfully.'});
        } catch (err) {
            console.log('Error creating location: ', err.message);
            res.status(500).json({ message: 'Error creating location.' });
        }
    }

    static async updateLocation(req, res) {
        const { id } = req.params;
        const { name, parent_location_id } = req.body;

        try {
            await Location.update(id, name, parent_location_id);
            res.json({ message: 'Location updated successfully.'});
        } catch (err) {
            console.log('Error updating location: ', err.message);
            res.status(500).json({ message: 'Error updating location.' });
        }
    }

    static async deleteLocation(req, res) {
        const { id } = req.params;

        try {
            await Location.delete(id);
            res.json({ message: 'Location deleted successfully.'});
        } catch (err) {
            console.log('Error deleting location: ', err.message);
            res.status(500).json({ message: 'Error deleting location.' });
        }
    }
}

module.exports = LocationController;