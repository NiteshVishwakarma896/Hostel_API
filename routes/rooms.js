const express = require('express');
const router = express.Router();
const database = require('../database');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: true }));


//GET all room details

router.get("/", (req, res) => {

    var sqlQuery = "SELECT * FROM Rooms";
    database.query(sqlQuery, (err, rows, fields) => {

        if (err) {
            res.status(500).send({ status: 0, message: "Something Went Wrong 😥", error: err });
        }

        res.json(rows);

    });
});

//GET all rooms with particular hostel id

router.get("/:id", (req, res) => {

    var id = req.params.id;
    var sql = `SELECT * FROM Rooms WHERE HostelId=${id}`;
    database.query(sql, (err, row, fields) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Invalid Hostel ID", error: err })
        }
        res.json(row[0]);
    })
});

/*post method for create rooms*/

router.post('/add', (req, res, next) => {

    var hostelId = req.body.hostelId;
    var room_no = req.body.room_no;
    var no_of_beds = req.body.no_of_beds;
    var avaliable = req.body.avaliable;

    var sql = `INSERT INTO Rooms (HostelId, RoomNo, No_Of_Bed, Avaliable)
                 VALUES ("${hostelId}", "${room_no}", "${no_beds}", "${avaliable}")`;

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

/*put method for update rooms*/

router.put('/update/:id', (req, res, next) => {

    var id = req.params.id;
    var no_of_beds = req.body.no_of_beds;
    var avaliable = req.body.avaliable;

    var sql = `UPDATE Rooms SET No_Of_Bed="${no_of_beds}", Avaliable="${avaliable}"  WHERE Id=${id}`;

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

/*delete method for delete rooms*/

router.delete('/delete/:id', (req, res, next) => {

    var id = req.params.id;
    var sql = `DELETE FROM Rooms WHERE Id=${id}`;

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



module.exports = router;