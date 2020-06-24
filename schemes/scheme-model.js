const db = require('../data/config')

function find () {
  return db('schemes')
}

function findById ( id ) {
  return db('schemes').where('id', id)
}

function findSteps ( id ) {
  return db('steps as s')
      .join('schemes as sm', 'sm.id', 's.scheme_id')
      .where('sm.id', id)
      .select('sm.scheme_name', 's.step_number', 's.instructions')
      .orderBy('s.step_number', 'asc')
}

async function add ( scheme ) {
  const [ id ] = await db('schemes').insert(scheme)
  return db('schemes').where('id', id).first()
}

function update ( changes, id ) {
  return db('schemes').where('id', id).update(changes)
}

function remove ( id ) {
  return db('schemes').where('id', id).del()
}

module.exports = {
  find: find,
  findById: findById,
  findSteps: findSteps,
  add: add,
  update: update,
  remove: remove,
}
