const request = require('supertest');
const app = require('../app');
import { AppDataSource } from "../data-source";
import { Person } from "../entities/Person";
import { Influence } from "../entities/Influence";
import { response } from "express";
import { parseISO } from "date-fns";

describe('POST /influences', () => {
  test('WHEN an influence is successfully created THEN returns a success http response', async () => {
    const personRepository = AppDataSource.getRepository(Person)
    const person = personRepository.create({name: 'Janaina'})
    await personRepository.save(person)
    
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
    const personRepository = AppDataSource.getRepository(Person)
    const person = personRepository.create({name: 'Janaina'})
    await personRepository.save(person)

    let influenceParams = {
      start_date: '1900-01-01',
      end_date: '1910-01-01',
      address: 'Any address 1',
      person_id: person.id.toString()
    }

    await request(app)
      .post('/influences')
      .send(influenceParams)
      .set('Accept', 'application/json')
      
    const influenceRepository = AppDataSource.getRepository(Influence)
    const influence = await influenceRepository.createQueryBuilder("influence").leftJoinAndSelect("influence.person", "person").orderBy("influence.id", "DESC").getOne()

    const expectedStartDate = new Date(influenceParams.start_date)
    const expectedEndDate = new Date(influenceParams.end_date)

    expect(influence!.start_date.toUTCString()).toBe(expectedStartDate.toUTCString())
    expect(influence!.end_date.toUTCString()).toBe(expectedEndDate.toUTCString())
    expect(influence!.address).toBe(influenceParams.address)
    expect(influence!.person.id).toBe(person.id)
  }) 

  test('WHEN a influence is created THEN returns a json with all fields completed', async () => {
    const personRepository = AppDataSource.getRepository(Person)
    const person = personRepository.create({name: 'Janaina'})
    await personRepository.save(person)

    let influenceParams = {
      start_date: '1900-01-01',
      end_date: '1910-01-01',
      address: 'Any address 1',
      person_id: person.id.toString()
    }

    const res = await request(app)
      .post('/influences')
      .send(influenceParams)
      .set('Accept', 'application/json')

      expect(res.body.start_date).toBe(influenceParams.start_date)
      expect(res.body.end_date).toBe(influenceParams.end_date) 
      expect(res.body.address).toBe(influenceParams.address) 
      expect(res.body.person.id).toBe(influenceParams.person_id)   

  })

  test('WHEN the address is an empty string or undefined THEN returns 400 http status', async () => {
    const personRepository = AppDataSource.getRepository(Person)
    const person = personRepository.create({name: 'Janaina'})
    await personRepository.save(person)

    let influenceParams = {
      start_date: '1900-01-01',
      end_date: '1910-01-01',
      address: '',
      person_id: person.id.toString()
    }

    await request(app)
      .post('/influences')
      .send(influenceParams)
      .set('Accept', 'application/json')
      .expect(400)
  }) 

  test('WHEN the start date is empty THEN returns 400 http status', async () => {
    const personRepository = AppDataSource.getRepository(Person)
    const person = personRepository.create({name: 'Janaina'})
    await personRepository.save(person)

    let influenceParams = {
      start_date: '',
      end_date: '1910-10-09',
      address: 'Any address',
      person_id: person.id.toString()
    }

    await request(app)
      .post('/influences')
      .send(influenceParams)
      .set('Accept', 'application/json')
      .expect(400)
  
  })

  test('WHEN the start date is not in a date format (yyyy-mm-dd) THEN returns 400 http status', async () => {
    const personRepository = AppDataSource.getRepository(Person)
    const person = personRepository.create({name: 'Janaina'})
    await personRepository.save(person)

    let influenceParams = {
      start_date: '24-07-1989',
      end_date: '1910-10-09',
      address: 'Any address',
      person_id: person.id.toString()
    }

    await request(app)
      .post('/influences')
      .send(influenceParams)
      .set('Accept', 'application/json')
      .expect(400)
  
  })

  test('WHEN a new influence is created for an existing person, if the start date is equal to any existing influence THEN returns 400 http status', async () => {
    const personRepository = AppDataSource.getRepository(Person)
    const person = personRepository.create({name: 'Janaina'})
    await personRepository.save(person)

    const influenceRepository = AppDataSource.getRepository(Influence)
    const influence = influenceRepository.create({
      start_date: '1900-12-10',
      end_date: '1910-10-09',
      address: 'Any address',
      person: person})
    await influenceRepository.save(influence)

    let influenceParams = {
      start_date: '1900-12-10',
      end_date: '1910-10-09',
      address: 'Any address',
      person_id: person.id.toString()
    }

    await request(app)
      .post('/influences')
      .send(influenceParams)
      .set('Accept', 'application/json')
      .expect(400)
  
  })

  test('WHEN a new influence is created for an existing person, if the start date is within the date range of an existing influence THEN returns 400 http status', async () => {
    const personRepository = AppDataSource.getRepository(Person)
    const person = personRepository.create({name: 'Janaina'})
    await personRepository.save(person)

    const influenceRepository = AppDataSource.getRepository(Influence)
    const influence = influenceRepository.create({
      start_date: '1900-12-10',
      end_date: '1910-10-09',
      address: 'Any address',
      person: person})
    await influenceRepository.save(influence)

    let influenceParams = {
      start_date: '1901-01-01',
      end_date: '1910-08-09',
      address: 'Any address',
      person_id: person.id.toString()
    }

    await request(app)
      .post('/influences')
      .send(influenceParams)
      .set('Accept', 'application/json')
      .expect(400)
  
  })

  test('WHEN a new influence is created for an existing person, if the end date is within the date range of an existing influence THEN returns 400 http status', async () => {
    const personRepository = AppDataSource.getRepository(Person)
    const person = personRepository.create({name: 'Janaina'})
    await personRepository.save(person)

    const influenceRepository = AppDataSource.getRepository(Influence)
    const influence = influenceRepository.create({
      start_date: '1905-01-01',
      end_date: '1910-10-09',
      address: 'Any address',
      person: person})
    await influenceRepository.save(influence)

    let influenceParams = {
      start_date: '1900-01-01',
      end_date: '1908-10-09',
      address: 'Any address',
      person_id: person.id.toString()
    }

    await request(app)
      .post('/influences')
      .send(influenceParams)
      .set('Accept', 'application/json')
      .expect(400)
  
  })

  // test('WHEN the name and the person id are empty THEN returns 400 http status', async () => {
  //   const personRepository = AppDataSource.getRepository(Person)
  //   const person = personRepository.create({name: 'Janaina'})
  //   await personRepository.save(person)

  //   const influenceRepository = AppDataSource.getRepository(Influence)
  //   const influence = influenceRepository.create({
  //     start_date: '1900-12-10',
  //     end_date: '1910-10-9',
  //     address: 'Any address',
  //     person: person})
  //   await influenceRepository.save(influence)

  //   let influenceParams = {
  //     start_date: '1910-01-01',
  //     end_date: '1910-10-9',
  //     address: 'Any address',
  //     person_id: person.id.toString(),
  //   }

  //   await request(app)
  //     .post('/influences')
  //     .send(influenceParams)
  //     .set('Accept', 'application/json')
  //     .expect(400)
  
  // })
})