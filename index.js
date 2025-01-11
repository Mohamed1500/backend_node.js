const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./models/database');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'endpoints.html'));
});

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});