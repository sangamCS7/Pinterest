import Pin from '../models/pin.model.js';

export const createPin = async (req, res) => {
    const { title, description } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: 'Image is required' });
    }

    try {
        const newPin = new Pin({
            title,
            description,
            imageUrl: req.file.path, // URL from Cloudinary
            postedBy: req.user._id, // From auth middleware
        });

        const createdPin = await newPin.save();
        res.status(201).json(createdPin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllPins = async (req, res) => {
    try {
        const pins = await Pin.find({}).populate('postedBy', 'username profilePic').sort({ createdAt: -1 });
        res.json(pins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- I've also added the missing controllers from the guide for completeness ---

export const getPinById = async (req, res) => {
    try {
        const pin = await Pin.findById(req.params.id).populate('postedBy', 'username profilePic');
        if (pin) {
            res.json(pin);
        } else {
            res.status(404).json({ message: 'Pin not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePin = async (req, res) => {
    try {
        const pin = await Pin.findById(req.params.id);

        if (!pin) {
            return res.status(404).json({ message: 'Pin not found' });
        }

        if (pin.postedBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await pin.deleteOne();
        res.json({ message: 'Pin removed' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

