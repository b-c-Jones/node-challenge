
module.exports = function (app, database) {
  app.post('/', (req, res) => {
    var when;
    console.log(req.body);
    if (req.body.when === "before") {
      when = "$lt"
    } else if (req.body.when === "after") {
      when = "$gte"
    };

    const filter = database.db().collection('user-items').find({ "created": { $lt: 1555525072000 } })
    filter.forEach(function(item) {
      console.log("item", item);
    });
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
