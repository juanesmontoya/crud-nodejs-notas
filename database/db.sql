create database sistemacursos;
use sistemacursos;

create table if not exists estudiantes (
	id INT UNSIGNED AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    cedula INT UNSIGNED NOT NULL,
    edad INT UNSIGNED NOT NULL,
    sexo CHAR(1) NOT NULL,
    PRIMARY KEY (id)
);

create table if not exists materias (
	id INT UNSIGNED AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

create table if not exists cursos (
	id INT UNSIGNED AUTO_INCREMENT NOT NULL,
    id_estudiante INT UNSIGNED NOT NULL,
    id_materia INT UNSIGNED NOT NULL,
    nota DECIMAL (3,2),
    PRIMARY KEY (id),
    CONSTRAINT FOREIGN KEY FK_estudiante (id_estudiante) REFERENCES estudiantes (id),
    CONSTRAINT FOREIGN KEY FK_materia (id_materia) REFERENCES materias (id)
);


/*----------------------------------------*/
/* ----------- PROCEDIMIENTOS ----------- */
/*----------------------------------------*/

/* PROCEDIMIENTO PARA CREAR UN ESTUDIANTE */
DELIMITER //
CREATE PROCEDURE ingresoEstudiante(in dnombre varchar(50), in dcedula int, in dedad int, in dsexo char(1))
	BEGIN
		if ((select count(*) from estudiantes where cedula = dcedula) = 0)
        then
			insert into estudiantes (id,nombre,cedula,edad,sexo) values (null,dnombre,dcedula,dedad,dsexo);
        end if;
	END//
DELIMITER ;

/* PROCEDIMIENTO PARA MODIFICAR UN ESTUDIANTE */
DELIMITER //
CREATE PROCEDURE modificarEstudiante(in idestudiante int,in dnombre varchar(50), in dcedula int, in dedad int, in dsexo char(1))
	BEGIN
		update estudiantes set nombre = dnombre,cedula = dcedula, edad = dedad, sexo = dsexo where id = idestudiante;
	END//
DELIMITER ;

/* PROCEDIMIENTO PARA ELIMINAR UN ESTUDIANTE */
DELIMITER //
CREATE PROCEDURE salidaEstudiante(in estudiante int)
	BEGIN
		 delete from estudiantes where id = estudiante;
	END//
DELIMITER ;

/* PROCEDIMIENTO PARA CREAR UNA MATERIA */
DELIMITER //
CREATE PROCEDURE ingresoMateria(in materia varchar(50), in descrip varchar(100))
	BEGIN
		if ((select count(*) from materias where nombre = materia) = 0)
        then
			insert into materias (id,nombre,descripcion) values (null,materia,descrip);
        end if;
	END//
DELIMITER ;

/*PROCEDIMIENTO PARA MODIFICAR UNA MATERIA*/
DELIMITER //
CREATE PROCEDURE modificarMateria(in idmateria int, in materia varchar(50), in descrip varchar(100))
	BEGIN
		update materias set nombre = materia, descripcion = descrip where id = idmateria;
    END//
DELIMITER;

/* PROCEDIMIENTO PARA ELIMINAR UNA MATERIA */
DELIMITER //
CREATE PROCEDURE salidaMateria(in materia varchar(50))
	BEGIN
		 delete from materias where nombre = materia;
	END//
DELIMITER ;

/* PROCEDIMIENTO PARA CREAR UN CURSO */
DELIMITER //
CREATE PROCEDURE ingresoCurso(in estudiante int, in materia int)
	BEGIN
		if ((select count(*) from cursos where id_estudiante = estudiante and id_materia= materia) = 0)
        then
			insert into cursos (id,id_estudiante,id_materia) values (null,estudiante,materia);
        end if;
	END//
DELIMITER ;

/* PROCEDIMIENTO PARA ELIMINAR UN CURSO */
DELIMITER //
CREATE PROCEDURE salidaCurso(in estudiante int, in materia varchar(50))
	BEGIN
		 delete from cursos where id_estudiante = estudiante and id_materia= materia;
	END//
DELIMITER ;

/* PROCEDIMIENTO PARA MODIFICAR UNA NOTA DE UNA MATERIA */
DELIMITER //
CREATE PROCEDURE modificarNota(in estudiante int,in materia int,in notafinal decimal(3,2))
	BEGIN
		 update cursos set nota = notafinal where id_estudiante = estudiante and id_materia = materia;
	END//
DELIMITER ;

/* PROCEDIMIENTO PARA ELIMINAR UNA NOTA DE UNA MATERIA */
DELIMITER //
CREATE PROCEDURE eliminarNota(in estudiante int,in materia int)
	BEGIN
		delete from cursos where id_estudiante = estudiante and id_materia = materia;
	END//
DELIMITER ;

SHOW TABLES;

describe estudiantes;