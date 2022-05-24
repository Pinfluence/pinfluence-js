const request = require('supertest');
const app = require('../app');

describe('POST /persons', () => {
  test('when giving a name then creates a person', async () => {
    const res = await request(app)
      .post('/persons')
      .send({name: 'john'})
      .set('Accept', 'application/json')
      .expect(201)
      .expect('Content-Type', /json/)
      


    // const personRepository = AppDataSource.getRepository(Person)
    // const person = personRepository.getLatestPerson()
    // const expectedName = person.name
    
    // expect(person.name).notToBe(vazio)
    

  }) 
})