const req = require("express/lib/request");
const { redirect } = require("express/lib/response");

const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from cursos', (err, cursos) => {
            if (err) {
                res.json(err);
            }
            res.render('cursos', {
                data: cursos
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('insert into cursos set ?', [data], (err, curso) => {
            console.log(curso);
            res.redirect('/curso');
        })
    })
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('select * from cursos where id = ?', [id], (err, curso) => {
            res.render('cursos_edit', {
                data: curso[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newCurso = req.body;
    req.getConnection((req, conn) => {
        conn.query('update cursos set ? where id = ?', [newCurso, id], (err, rows) => {
            res.redirect('/curso');
        });
    });
};

controller.delete = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('delete from cursos where id = ?', [id], (err, rows) => {
            res.redirect('/curso');
        });
    });
};

module.exports = controller;