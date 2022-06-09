const dataSource = require("./data-source")

// Run for each test file

beforeAll(async ()=>{
    await dataSource.AppDataSource.initialize()
      .catch((err) => {
          console.error("Error during Data Source initialization:", err)
      })
});

afterAll(async ()=>{
    await dataSource.AppDataSource.destroy()
});