const cp = require('child_process');
const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'pug');
app.locals.basedir = path.join(__dirname, 'views');

// Pages
app.get('/', (_, res) => res.render('index'));

app.get('/variables/types', (_, res) => res.render('pages/variables/types'));
app.get('/variables/assignment', (_, res) => res.render('pages/variables/assignment'));
app.get('/variables/destructuring', (_, res) => res.render('pages/variables/destructuring'));
app.get('/variables/copy', (_, res) => res.render('pages/variables/copy'));

app.get('/functions/basics', (_, res) => res.render('pages/functions/function_basics'));
app.get('/functions/arrow', (_, res) => res.render('pages/functions/arrow_functions'));

app.get('/promises', (_, res) => res.render('pages/promises/promises'));
app.get('/strict', (_, res) => res.render('pages/strict/strict'));
app.get('/this', (_, res) => res.render('pages/this/this'));
app.get('/oop', (_, res) => res.render('pages/oop/oop'));
app.get('/array', (_, res) => res.render('pages/array/array'));
app.get('/object', (_, res) => res.render('pages/object/object'));

// Execute code
app.post('/play', async (req, res) => {
  const { code } = req.body;
  fs.writeFileSync('.code.js', code);
  cp.exec('node .code.js', (error, stdout, stderr) => {
    const response = {};
    if (error) response.error = error.message;
    if (stderr) response.stderr = stderr;
    response.stdout = stdout;
    return res.json(response);
  });
});

// Starts server
app.listen(3000, () => console.log('Server is up and running'));
