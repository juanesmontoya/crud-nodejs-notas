const req = require("express/lib/request");
const { redirect } = require("express/lib/response");

const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from materias', (err, materias) => {
            if (err) {
                res.json(err);
            }
            res.render('materias', {
                data: materias
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('insert into materias set ?', [data], (err, materia) => {
            console.log(materia);
            res.redirect('/materia');
        })
    })
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('select * from materias where id = ?', [id], (err, materia) => {
            res.render('materias_edit', {
                data: materia[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newMateria = req.body;
    req.getConnection((req, conn) => {
        conn.query('update materias set ? where id = ?', [newMateria, id], (err, rows) => {
            res.redirect('/materia');
        });
    });
};

controller.delete = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('delete from materias where id = ?', [id], (err, rows) => {
            res.redirect('/materia');
        });
    });
};

module.exports = controller;