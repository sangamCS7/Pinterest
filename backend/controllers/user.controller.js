import User from '../models/user.model.js';
import Pin from '../models/pin.model.js';

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const createdPins = await Pin.find({ postedBy: req.params.id });
        
        // This assumes the 'savedPins' array on the User model is populated with Pin IDs.
        const savedPins = await Pin.find({ _id: { $in: user.savedPins } });

        res.json({ user, createdPins, savedPins });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

