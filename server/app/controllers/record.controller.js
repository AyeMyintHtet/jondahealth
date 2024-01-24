const db = require("../models");
const Record = db.records;


exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.category || !req.body.pageCount || !req.body.languageId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a record
  let record = [];
  for (let i = 0; i < req.body.languageId.length; i++) {
    record.push({
      name: req.body.name,
      category: req.body.category,
      pageCount: req.body.pageCount,
      languageId: req.body.languageId[i],
    })
  }
  console.log('record', record)

  // Save Record in the database
  Record.bulkCreate(record)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res?.status(500).send({
        message:
          err.message || "Some error occurred while creating the Record."
      });
    });
};
exports.findAll = (req, res) => {
  Record.findAll({
    include: ["language"],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
exports.update = (req, res) => {
  const id = req.params.id;
  Record.destroy({
    where: { id: id }
  })
    .then(num => {
      console.log('num', num)
      if (num == 1) {
        console.log('req1', req.body)
        let record = [];
        for (let i = 0; i < req.body.languageId.length; i++) {
          record.push({
            name: req.body.name,
            category: req.body.category,
            pageCount: req.body.pageCount,
            languageId: req.body.languageId[i],
          })
        }
        Record.bulkCreate(record)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res?.status(500).send({
              message:
                err.message || "Some error occurred while creating the Record."
            });
          });
      } else {
        res.send({
          message: `Cannot delete Record with id=${id}. Maybe Record was not found!`
        });
      }
    })
};
exports.delete = (req, res) => {
  const id = req.params.id;
  Record.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Record was deleted successfully!"
        })
      } else {
        res.send({
          message: `Cannot delete Record with id=${id}. Maybe Record was not found!`
        });
      }
    })
};