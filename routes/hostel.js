const express = require('express');
const router = express.Router();
const database = require('../database');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: true }));

const table = "Hostel";


//GET all hostel details

router.get("/", (req, res) => {

    var sqlQuery = `SELECT * FROM ${table}`;
    database.query(sqlQuery, (err, rows, fields) => {

        if (err) {
            res.status(500).send({ status: 0, message: "Something Went Wrong 😥", error: err });
        }

        res.json(rows);

    });
});

//GET all hostel with particular id

router.get("/:id", (req, res) => {

    var id = req.params.id;
    var sql = `SELECT * FROM ${table} WHERE Id=${id}`;
    database.query(sql, (err, row, fields) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Invalid Hostel ID", error: err })
        }
        res.json(row[0]);
    })
});

/*post method for create hostel*/

router.post('/add', (req, res, next) => {

    var HostelName = req.body.name;
    var OwnerName = req.body.owner;
    var Address = req.body.address;
    var Contact = req.body.contact;
    var Email = req.body.email;
    var OwnerContact = req.body.owner_contact;

    var sql = `INSERT INTO ${table} (HostelName, OwnerName, Address, Contact, Email, OwnerContact, IsActive)
                 VALUES ('${HostelName}', '${OwnerName}', '${Address}', '${Contact}','${Email}', '${OwnerContact}', '1')`;

    database.query(sql, (err, result) => {

        if (err) {
            res.status(500).send({ status: 0, message: "Unable to add new hostels !", error: err });
        }
        res.json({
            'status': '1',
            'message': 'Successfully Added New Hostel',
            id: result.insertId
        });
    });
});

/*put method for adding students to  hostel*/

router.put('/addHostler/:id', (req, res, next) => {

    var HostlerId = req.params.id;

    var HostelName = req.body.hostel_name;
    var HostelId = req.body.hostel_id;

    var sql = `UPDATE  Users SET HostelId="${HostelId}", Hostel="${HostelName}" WHERE Id=${HostlerId}`;

    database.query(sql, (err, result) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Unable to add new members to hostel !", error: err });
        }
        res.json({
            'status': '1',
            'message': 'Successfully Added New Member to Hostel .'

        });
    });
});


/*put method for update hostel*/

router.put('/update/:id', (req, res, next) => {

    var id = req.params.id;
    var HostelName = req.body.name;
    var OwnerName = req.body.owner;
    var Address = req.body.address;
    var Contact = req.body.contact;
    var Email = req.body.email;
    var OwnerContact = req.body.owner_contact;

    var sql = `UPDATE ${table} SET HostelName="${HostelName}", OwnerName="${OwnerName}", Address="${Address}", 
                                   Contact="${Contact}", Email="${Email}", OwnerContact="${OwnerContact}"  WHERE Id=${id}`;

    database.query(sql, function(err, result) {
        if (err) {
            res.status(500).send({ status: 0, message: 'Error Could not update hostel details !', error: err });
        }
        res.json({
            'status': '1',
            'message': 'Successfully Updated Details !'
        });
    });
});

/*delete method for delete hostel*/

router.delete('/delete/:id', (req, res, next) => {

    var id = req.params.id;
    var sql = `DELETE FROM ${table} WHERE Id=${id}`;

    database.query(sql, function(err, result) {
        if (err) {
            res.status(500).send({ status: 0, message: 'Error Could not delete hostel !', error: err });
        }
        res.json({
            'status': '1',
            'message': 'Successfully Deleted Hostel !'
        });
    });
});



module.exports = router;