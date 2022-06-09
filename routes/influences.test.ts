const request = require('supertest');
const app = require('../app');
import { AppDataSource } from "../data-source";
import { Person } from "../entities/Person";
import { Influence } from "../entities/Influence";

describe('POST /influences', () => {
  test('WHEN an influence is successfully created THEN returns a success http response', async () => {
    const personRepository = AppDataSource.getRepository(Person).create({name: 'Janaina'})
    const person = await AppDataSource.getRepository(Person).save(personRepository)

    let influenceParams = {
      start_date: '1900-01-01',
      end_date: '1910-01-01',
      address: 'Any address',
      person_id: person.id.toString()
    }

    await request(app)
      .post('/influences')
      .send(influenceParams)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
  }) 

  test('WHEN giving a name THEN creates a person', async () => {
    const personRepository = AppDataSource.getRepository(Person).create({name: 'Janaina'})
    const person = await AppDataSource.getRepository(Person).save(personRepository)

    let influenceParams = {
      start_date: '1900-01-01',
      end_date: '1910-01-01',
      address: 'Any address',
      person_id: person.id.toString()
    }

    await request(app)
      .post('/influences')
      .send(influenceParams)
      .set('Accept', 'application/json')
      
      const influenceRepository = AppDataSource.getRepository(Influence)
      const influence = await influenceRepository.createQueryBuilder("influence").orderBy("influence.id", "DESC").limit(1).getOne()
    
    expect(influence!.start_date).toBe(influenceParams.start_date)
    expect(influence!.end_date).toBe(influenceParams.end_date)
    expect(influence!.address).toBe(influenceParams.address)
    expect(influence!.person.id).toBe(person.id)
  }) 
})