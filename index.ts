// import { AppDataSource } from "./data-source";
// import { Person } from "./entity/Person";

// AppDataSource.initialize()
//     .then(() => {
//         console.log("Data Source has been initialized")
//     })
//     .catch((error) => { 
// 			const result = error.message; // error under useUnknownInCatchVariables 
// 				if (typeof error === "string") {
// 					error.toUpperCase() // works, `e` narrowed to string
// 				} else if (error instanceof Error) {
// 					error.message // works, `e` narrowed to Error
// 			}
//     })
