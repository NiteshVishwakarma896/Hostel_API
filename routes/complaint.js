const express = require('express');
const router = express.Router();
const database = require('../database');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: true }));

const table = "Complaint";


//GET all complaints details

router.get("/", (req, res) => {

    var sqlQuery = `SELECT * FROM ${table}`;
    database.query(sqlQuery, (err, rows, fields) => {

        if (err) {
            res.status(500).send({ status: 0, message: "Something Went Wrong 😥", error: err });
        }

        res.json(rows);

    });
});

//GET particular complaint with particular complaint id

router.get("/:id", (req, res) => {

    var id = req.params.id;
    var sql = `SELECT * FROM ${table} WHERE Id=${id}`;
    database.query(sql, (err, row, fields) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Invalid Complaint ID", error: err })
        }
        res.json(row[0]);
    })
});

/*post method for create complaints*/

router.post('/add', (req, res, next) => {

    var HostelId = req.body.hostelId;
    var HostlerId = req.body.hostlerId;
    var Title = req.body.title;
    var Complain = req.body.complain;

    var sql = `INSERT INTO ${table} (HostelId, HostlerId, Title, Complaint) 
                VALUES ("${HostelId}", "${HostlerId}", "${Title}", "${Complain}")`;

    database.query(sql, (err, result) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Unable to add new complains !", error: err });
        }
        res.json({
            'status': '1',
            'message': 'Successfully Added New Complains.',
            id: result.insertId
        });
    });
});

/*put method for update complaints*/

/*router.put('/update/:id', (req, res, next) => {

    var id = req.params.id;
    var no_of_beds = req.body.no_of_beds;
    var avaliable = req.body.avaliable;

    var sql = `UPDATE ${table} SET No_Of_Bed="${no_of_beds}", Avaliable="${avaliable}"  WHERE Id=${id}`;

    database.query(sql, function(err, result) {
        if (err) {
            res.status(500).send({ status: 0, message: 'Error Could not update records !', error: err });
        }
        res.json({
            'status': '1',
            'message': 'Successfully Updated Record !'
        });
    });
});
*/

/*delete method for delete complaints*/

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