const express = require('express');
const router = express.Router();
const database = require('../database');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: true }));

const table = "Meals";

//GET all Meals details

router.get("/", (req, res) => {

    var sqlQuery = `SELECT * FROM ${table}`;
    database.query(sqlQuery, (err, rows, fields) => {

        if (err) {
            res.status(500).send({ status: 0, message: "Something Went Wrong 😥", error: err });
        }

        res.json(rows);

    });
});

//GET all Meals details which are avaliable

router.get("/avaliable", (req, res) => {

    var sqlQuery = `SELECT * FROM ${table} WHERE IsActive=1`;
    database.query(sqlQuery, (err, rows, fields) => {

        if (err) {
            res.status(500).send({ status: 0, message: "Something Went Wrong 😥", error: err });
        }

        res.json(rows);

    });
});


//GET all meals with particular hostel id

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

/*post method for create meals*/

router.post('/add', (req, res, next) => {

    var hostelId = req.body.hostelId;
    var MealName = req.body.meal_name;
    var Day = req.body.day;

    var sql = `INSERT INTO ${table} (HostelId, MealName, Day, IsActive) VALUES ("${hostelId}", "${MealName}", "${Day}", "1")`;
    database.query(sql, (err, result) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Unable to add new records !", error: err });
        }
        res.json({
            'status': '1',
            'message': 'Successfully Added New Room',
            id: result.insertId
        });
    });
});

/*put method for update meals*/

router.put('/update/:id', (req, res, next) => {

    var id = req.params.id;
    var Status = req.body.status;

    var sql = `UPDATE ${table} SET IsActive="${Status}"  WHERE Id=${id}`;

    database.query(sql, function(err, result) {
        if (err) {
            res.status(500).send({ status: 0, message: 'Error Could not update meals !', error: err });
        }
        res.json({
            'status': '1',
            'message': 'Successfully Updated Meals !'
        });
    });
});

/*delete method for delete rooms*/

/*router.delete('/delete/:id', (req, res, next) => {

    var id = req.params.id;
    var sql = `DELETE FROM ${table} WHERE Id=${id}`;

    database.query(sql, function(err, result) {
        if (err) {
            res.status(500).send({ status: 0, message: 'Error Could not delete records !', error: err });
        }
        res.json({
            'status': '1',
            'message': 'Successfully Deleted Record !'
        });
    });
});
*/


module.exports = router;