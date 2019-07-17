module.exports = function (app, database) {
  app.post('/get-data', (req, res) => {
    console.log(req.body)
    var date = new Date(req.body.date).getTime();
    console.log(date);
    if (req.body.when === "before") {
      var filter = database.db().collection('user-items').find({ "created": { $lt: date } });
    } else if (req.body.when === "after") {
      var filter = database.db().collection('user-items').find({ "created": { $gte: date } });
    };
      filter.count().then(function(count) {
        console.log(count);
      });
    filter.toArray().then(function(value) {
      res.send(value);
    });
  });

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
