export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, productName } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required for payment." });
    }

    // Mock/Dummy payment intent for local testing
    const mockClientSecret = `pi_${Math.random().toString(36).substring(2)}_secret_${Math.random().toString(36).substring(2)}`;

    res.status(200).json({
      success: true,
      amount: amount * 100,
      currency: "inr",
      productName: productName || "Marketplace Item",
      clientSecret: mockClientSecret,
      message: "Payment intent created successfully (Mock Mode).",
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: error.message 
    });
  }
};