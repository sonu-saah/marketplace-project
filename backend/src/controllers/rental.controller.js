import RentalBooking from "../models/RentalBooking.js";

// Day 16: Return Rental Item & Calculate Late Fee
export const returnRental = async (req, res) => {
  try {
    const { bookingId } = req.params;
    
    // 1. Database se booking dhoondo
    const booking = await RentalBooking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found in database" });
    }

    // 2. Check agar item pehle se return ho chuka hai
    if (booking.status === "Returned") {
      return res.status(400).json({ message: "Item is already returned" });
    }

    // 3. Dates set karo (Aaj ki date aur Kab dena tha)
    const today = new Date(); // Current date and time
    const expectedDate = new Date(booking.endDate); // Database wali aakhri date
    
    let lateDays = 0;
    let latePenalty = 0;
    const PENALTY_PER_DAY = 100; // Har din ka 100 Rs fine

    // 4. Late calculation logic
    if (today > expectedDate) {
      // Math.abs() minus value ko plus karta hai, difference in milliseconds
      const diffTime = Math.abs(today - expectedDate);
      
      // Milliseconds ko actual Days mein convert karna (1 din = 24 ghante)
      lateDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      latePenalty = lateDays * PENALTY_PER_DAY;
    }

    // 5. Database mein update karo
    booking.status = "Returned";
    booking.actualReturnDate = today;
    booking.lateDays = lateDays;
    booking.latePenalty = latePenalty;

    await booking.save(); // Naya data MongoDB mein save ho jayega

    // 6. Client ko response bhejo
    res.status(200).json({
      message: "Rental item returned successfully",
      lateDays: lateDays,
      latePenalty: latePenalty,
      booking: booking
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};