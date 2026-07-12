require('dotenv').config();
const app = require('./app');
const initDatabase = require('./database/initDatabase');

const PORT = process.env.PORT || 5001;

const startServer = async () => {
    try {
        await initDatabase();

        app.listen(PORT, () => {
            console.log(`[TransitOps] Enterprise Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
