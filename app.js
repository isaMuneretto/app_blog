const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
//const routes = require('./routes');
const PORT = 8081;

const post = require('./routes/posts.routes');
const usuario = require('./routes/usuarios.routes');

app.use(cors());
app.use(bodyParser.json());
//app.use(routes);

app.use('/post', post);
app.use('/usuario', usuario);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});