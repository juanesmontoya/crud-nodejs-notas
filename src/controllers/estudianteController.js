const req = require("express/lib/request");
const { redirect } = require("express/lib/response");

const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from estudiantes', (err, estudiantes) => {
            if (err) {
                res.json(err);
            }
            res.render('estudiantes', {
                data: estudiantes
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('insert into estudiantes set ?', [data], (err, estudiante) => {
            console.log(estudiante);
            res.redirect('/');
        })
    })
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('select * from estudiantes where id = ?', [id], (err, estudiante) => {
            console.log(estudiante);
            res.render('estudiantes_edit', {
                data: estudiante[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newEstudiante = req.body;
    req.getConnection((req, conn) => {
        conn.query('update estudiantes set ? where id = ?', [newEstudiante, id], (err, rows) => {
            res.redirect('/');
        });
    });
};

controller.delete = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('delete from estudiantes where id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
    });
};

module.exports = controller;