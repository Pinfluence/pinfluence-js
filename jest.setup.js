const dataSource = require("./data-source")

// Run for each test file

beforeEach(async ()=>{
    await dataSource.AppDataSource.initialize()
      .catch((err) => {
          console.error("Error during Data Source initialization:", err)
      })
});

afterEach(async ()=>{
    await dataSource.AppDataSource.destroy()
});