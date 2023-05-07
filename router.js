const express = require('express');
const fs = require('fs');
const path = require('path')

const router = express.Router();

let notes = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json')))

router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

router.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data))
  })
})

router.post('/api/notes', (req, res) => {
  const newNote = req.body;
  const id = req.body.title || Date.now().toString();
  newNote.id = id;
  notes.push(newNote);
  fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notes));
  res.json(newNote)
})

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

module.exports = router; 