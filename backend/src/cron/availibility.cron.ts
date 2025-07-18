import cron from "node-cron";
import { Pool } from "../config/db.js";

export const startAvailabilityCronJob = () => {
  // This runs every day at midnight

  cron.schedule("0 0 * * *", async () => {
    console.log("Running availability update cron job...");

    const query = `
        UPDATE cars
        SET availability = true
        WHERE id IN (
            SELECT car_id
            FROM bookings
            WHERE end_date < CURDATE() AND status = 'Confirmed'
            GROUP BY car_id
            HAVING MAX(end_date) < CURDATE()
        )`;

    try {
      const [result]: any = await Pool.query(query);

      //   console.log(result);

      if (result.changedRows > 0) {
        console.log("Availability updated successfully.");
      } else {
        console.log("No cars needed availability update.");
      }
    } catch (error) {
      console.error("Error updating availability: ", error);
    }
  });
};
