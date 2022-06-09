const request = require('supertest');
const app = require('../app');
import { AppDataSource } from "../data-source";
import { Person } from "../entities/Person";

describe('POST /persons', () => {
  test('WHEN a person is successfully created THEN returns a success http response', async () => {
    await request(app)
      .post('/persons')
      .send({name: 'john'})
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
  }) 

  // test('WHEN giving a name THEN creates a person', async () => {
  //   await request(app)
  //     .post('/persons')
  //     .send({name: 'john'})
  //     .set('Accept', 'application/json')
      
  //   const personRepository = AppDataSource.getRepository(Person)
  //   const person = await personRepository.createQueryBuilder("person").orderBy("person.id", "DESC").limit(1).getOne()
    
  //   expect(person!.name).toBe("john")
  // }) 

  // test('WHEN the name is an empty string THEN returns 400 http status', async () => {
  //   await request(app)
  //     .post('/persons')
  //     .send({name: ''})
  //     .set('Accept', 'application/json')
  //     .expect(400)
  // }) 

  // test('WHEN no name is given THEN returns 400 http status', async () => {
  //   await request(app)
  //     .post('/persons')
  //     .send({})
  //     .set('Accept', 'application/json')
  //     .expect(400)
  // }) 

  // test('WHEN name is not a string THEN returns 400 http status', async () => {
  //   await request(app)
  //     .post('/persons')
  //     .send({name: 123})
  //     .set('Accept', 'application/json')
  //     .expect(400)
  // }) 
})