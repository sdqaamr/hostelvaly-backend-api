import dbConnect from "./config/database.js";
import seedHostels from "./seeders/seedHostels.js";
import seedReviews from "./seeders/seedReviews.js";

const runSeeder = async () => {
    await dbConnect();
    await seedHostels();
    await seedReviews();
    console.log("Seeding completed successfully.");
    process.exit();
};

runSeeder();
