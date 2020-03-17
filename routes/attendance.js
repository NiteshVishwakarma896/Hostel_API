const express = require('express');
const router = express.Router();
const database = require('../database');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: true }));

const table = "Attendance";

//GET all attendance details

router.get("/", (req, res) => {

    var sqlQuery = `SELECT * FROM ${table}`;
    database.query(sqlQuery, (err, rows, fields) => {

        if (err) {
            res.status(500).send({ status: 0, message: "Something Went Wrong 😥", error: err });
        }

        res.json(rows);

    });
});

//GET all attendance with particular hostel id

router.get("/:id", (req, res) => {

    var id = req.params.id;
    var sql = `SELECT * FROM ${table} WHERE HostelId=${id}`;
    database.query(sql, (err, row, fields) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Invalid Hostel ID", error: err })
        }
        res.json(row[0]);
    })
});

/*post method for create attendance*/

router.post('/add', (req, res, next) => {

    var hostelId = req.body.hostelId;
    var hostlerId = req.body.hostlerId;
    var HostlerName = req.body.HostlerName;
    var status = req.body.status;

    var sql = `INSERT INTO ${table} (HostelId, HostlerId, HostlerName, Present_OR_Absent) 
                VALUES ("${hostelId}", "${hostlerId}", "${HostlerName}", "${status}")`;
    database.query(sql, (err, result) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Unable to add new records !", error: err });
        }
        res.json({
            'status': '1',
            'message': 'Successfully Added New Attendance !',
            id: result.insertId
        });
    });
});

/*put method for update attendance*/

router.put('/update/:id', (req, res, next) => {

    var id = req.params.id;
    var status = req.body.status;

    var sql = `UPDATE ${table} SET Present_OR_Absent="${status}"  WHERE HostlerId=${id}`;

    database.query(sql, function(err, result) {
        if (err) {
            res.status(500).send({ status: 0, message: 'Error Could not update records !', error: err });
        }
        res.json({
            'status': '1',
            'message': 'Successfully Updated Attendance !'
        });
    });
});

/*delete method for delete attendance*/

/*router.delete('/delete/:id', (req, res, next) => {

    var id = req.params.id;
    var sql = `DELETE FROM ${table} WHERE HostlerId=${id}`;

    database.query(sql, function(err, result) {
        if (err) {
            res.status(500).send({ status: 0, message: 'Error Could not delete attendance !', error: err });
        }
        res.json({
            'status': '1',
            'message': 'Successfully Deleted Attendance !'
        });
    });
});
*/


module.exports = router;