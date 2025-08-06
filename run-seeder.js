import dbConnect from "./config/database.js";
import seedHostels from "./seeders/seedHostels.js";
import seedUsers from "./seeders/seedUsers.js";
import seedVisitRequests from "./seeders/seedVisitRequests.js";
import seedBookings from "./seeders/seedBookings.js";
import seedReviews from "./seeders/seedReviews.js";

const runSeeder = async () => {
  dbConnect();
  await seedHostels();
  await seedUsers();
  await seedVisitRequests();
  await seedBookings();
  await seedReviews();
  console.log("Seeding completed successfully.");
  process.exit();
};

runSeeder();
