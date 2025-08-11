import app from ".";
import { dbConnect } from "./config/dbConnection";

async function main() {

    await dbConnect();
    app.listen(3000, () => {
        console.log("Server running on port 3000")
    })
}

main()