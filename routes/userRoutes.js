const express = require('express');
const router = express.Router();
const User = require('../models/user');

// 1. Lijst van alle gebruikers met query-parameters en paginering
router.get('/', async (req, res) => {
    try {
        // Query parameters ophalen
        const { page = 1, limit = 10, name, age } = req.query;

        // Zoekcriteria
        const where = {};
        if (name) {
            where.name = name; 
        }
        if (age) {
            where.age = age; 
        }

        
        const offset = (page - 1) * limit;

        // Gebruikers ophalen met paginering en filters
        const users = await User.findAndCountAll({
            where, 
            limit: parseInt(limit), 
            offset: parseInt(offset), 
        });

        // Reactie terugsturen
        res.json({
            totalUsers: users.count, 
            totalPages: Math.ceil(users.count / limit), 
            currentPage: parseInt(page), 
            data: users.rows, 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// 2. Gebruiker toevoegen
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 3. Gebruiker bijwerken
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        await user.update(req.body);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 4. Gebruiker verwijderen
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        await user.destroy();
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

