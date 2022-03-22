const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

//import routes
const estudianteRoutes =require('./routes/estudiante');
const materiaRoutes =require('./routes/materia');
const cursoRoutes =require('./routes/curso');
const { urlencoded } = require('express');

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'nacional2022',
    port: '3306',
    database: 'sistemacursos'
}, 'single'));
app.use(express.urlencoded({extended: false}));

//routes
app.use('/', estudianteRoutes);
app.use('/materia', materiaRoutes);
app.use('/curso', cursoRoutes);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//start
app.listen(app.get('port'), () =>{
    console.log('Sever on port 3000');
});