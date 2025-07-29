// Mock data service for demo purposes
export const getMockDashboardStats = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate realistic blood bank statistics
      const currentHour = new Date().getHours();
      const baseValues = {
        totalDonors: 18750 + Math.floor(Math.random() * 500), // Random between 18,750 - 19,250
        totalBloodUnits: 52300 + Math.floor(Math.random() * 1000), // Random between 52,300 - 53,300
        totalCampaigns: 186 + Math.floor(Math.random() * 20), // Random between 186 - 206
        totalHospitals: 63
      };
      
      // Add slight variations based on time of day (simulating real-time updates)
      if (currentHour >= 8 && currentHour <= 18) {
        baseValues.totalDonors += Math.floor(Math.random() * 50); // More active during day
        baseValues.totalBloodUnits += Math.floor(Math.random() * 100);
      }
      
      resolve(baseValues);
    }, 800); // Simulate realistic API delay
  });
};
