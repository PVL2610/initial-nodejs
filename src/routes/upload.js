const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const path = require('path');


router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/api/upload/${req.file.filename}`;
    res.status(200).json({ message: 'File uploaded successfully', fileUrl });
});

router.get('/:filename', (req, res) => {
    const filePath = path.join(__dirname, '../public/img', req.params.filename);
    res.sendFile(filePath);
});

module.exports = router;