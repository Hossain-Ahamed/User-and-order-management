import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

//node express application
async function main() {
    try {
      await mongoose.connect(config.database_URL as string);
  
      app.listen(config.PORT, () => {
        console.log(`App listening on port ${config.PORT}`);
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  main();
  