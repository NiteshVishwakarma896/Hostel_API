const express = require('express');
const router = express.Router();
const database = require('../database');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: true }));

const table = "Users";


//GET all hostler details

router.get("/", (req, res) => {

    var sqlQuery = `SELECT * FROM ${table}`;
    database.query(sqlQuery, (err, rows, fields) => {

        if (err) {
            res.status(500).send({ status: 0, message: "Something Went Wrong 😥", error: err });
        }

        res.json(rows);

    });
});

//GET all users with particular  id

router.get("/:id", (req, res) => {

    var id = req.params.id;
    var sql = `SELECT * FROM ${table} WHERE Id=${id}`;
    database.query(sql, (err, row, fields) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Invalid Hostler Id !", error: err })
        }
        res.json(row[0]);
    })
});

/*post method for create hostlers*/

router.post('/add', (req, res, next) => {

    var FirstName = req.body.first_name;
    var MiddleName = req.body.middle_name;
    var LastName = req.body.last_name;
    var DOB = req.body.dob;
    var Contact = req.body.contact;
    var Email = req.body.email;
    var Address = req.body.address;
    var Gender = req.body.gender;
    var Occupation = req.body.occupation;
    var OccupationAddress = req.body.occupation_address;
    var GuardianName = req.body.guardian_name;
    var GuardianRelation = req.body.guardian_relation;
    var GuardianContact = req.body.guardian_contact;
    var GuardianEmail = req.body.guardian_email;

    var sql = `INSERT INTO ${table} (FirstName,MiddleName,LastName,DOB,Contact,Email,Address,Gender,Occupation,
                OccupationAddress,GuardianName,GuardianRelation,GuardianContact,GuardianEmail)
                 VALUES ("${FirstName}", "${MiddleName}", "${LastName}", "${DOB}",
                 "${Contact}", "${Email}", "${Address}", "${Gender}",
                 "${Occupation}", "${OccupationAddress}", "${GuardianName}", "${GuardianRelation}",
                 "${GuardianContact}", "${GuardianEmail}")`;

    database.query(sql, (err, result) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Unable to add new hostler !", error: err });
        }
        res.json({
            'status': '1',
            'message': 'Successfully Added New Hostler .',
            id: result.insertId
        });
    });
});

/*put method for update hostlers*/

router.put('/update/:id', (req, res, next) => {

    var id = req.params.id;
    var Contact = req.body.contact;
    var Address = req.body.address;
    var Occupation = req.body.occupation;
    var OccupationAddress = req.body.occupation_address;
    var GuardianContact = req.body.guardian_contact;
    var GuardianEmail = req.body.guardian_email;

    var sql = `UPDATE ${table} SET Contact="${Contact}", Address="${Address}",
                                   Occupation="${Occupation}", OccupationAddress="${OccupationAddress}",
                                   GuardianContact="${GuardianContact}", GuardianEmail="${GuardianEmail}"
                                   WHERE Id=${id}`;

    database.query(sql, function(err, result) {
        if (err) {
            res.status(500).send({ status: 0, message: 'Error Could not update hostler !', error: err });
        }
        res.json({
            'status': '1',
            'message': 'Successfully Updated Hostler Details !'
        });
    });
});

/*delete method for delete rooms*/

router.delete('/delete/:id', (req, res, next) => {

    var id = req.params.id;
    var sql = `DELETE FROM ${table} WHERE Id=${id}`;

    database.query(sql, function(err, result) {
        if (err) {
            res.status(500).send({ status: 0, message: 'Error Could not delete Hostler !', error: err });
        }
        res.json({
            'status': '1',
            'message': 'Successfully Deleted Hostler !'
        });
    });
});



module.exports = router;