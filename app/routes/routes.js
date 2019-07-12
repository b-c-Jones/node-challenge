const ObjectID = require('mongodb').ObjectID;

module.exports = function (app, database) {
  app.post('/OAuth', (req, res) => {
    console.log(req.body);
    res.send(req.body);
  })

  // app.get('/:id', (req, res) => {
  //   const id = req.params.id;
  //   const details = { _id: new ObjectID(id) };
  //   database.db().collection('notes').findOne(details, (err, item) => {
  //     if (err) {
  //       res.send({ 'error': 'an error occured' })
  //     } else {
  //       res.send(item)
  //     };
  //   });
  // });

  // app.delete('/:id', (req, res) => {
  //   const id = req.params.id;
  //   const details = { _id: new ObjectID(id) };
  //   database.db().collection('notes').remove(details, (err, item) => {
  //     if (err) {
  //       res.send({ 'error': 'an error occured' })
  //     } else {
  //       res.send(`Note ${id} deleted.`)
  //     };
  //   });
  // });

  // app.put('/:id', (req, res) => {
  //   const id = req.params.id;
  //   const details = { _id: new ObjectID(id) };
  //   const note = { text: req.body.body, title: req.body.title };
  //   database.db().collection('notes').update(details, note, (err, item) => {
  //     if (err) {
  //       res.send({ 'error': 'an error occured' })
  //     } else {
  //       res.send(item)
  //     };
  //   });
  // });

  // app.post('/', (req, res) => {
  //   const note = { text: req.body.body, title: req.body.title };
  //   database.db().collection('notes').insert(note, (err, result) => {
  //     if (err) {
  //       res.send({ 'error': 'an error occured' })
  //     } else {
  //       res.send(result.ops[0])
  //     };
  //   });
  // });
};