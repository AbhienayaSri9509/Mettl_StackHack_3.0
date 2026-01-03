// Calculate Impact Score based on multiple factors
export const calculateImpactScore = (project) => {
  let score = 0;
  const maxScore = 100;

  // SDG Goals (max 30 points)
  const sdgCount = project.sdgGoals?.length || 0;
  score += Math.min(sdgCount * 5, 30);

  // VERRA Certification (20 points)
  if (project.verraCertified) {
    score += 20;
  }

  // Category impact (max 20 points)
  const categoryScores = {
    'Forestry': 20,
    'Renewable Energy': 18,
    'Infrastructure': 15,
    'Agriculture': 12,
    'Waste Management': 15,
    'Water Management': 12,
    'Other': 8
  };
  score += categoryScores[project.category] || 8;

  // Credit availability (max 15 points)
  const availabilityRatio = project.availableCredits / project.totalCredits;
  if (availabilityRatio > 0.7) score += 15;
  else if (availabilityRatio > 0.4) score += 10;
  else score += 5;

  // Price competitiveness (max 15 points)
  // Lower price = higher impact (more accessible)
  const avgPrice = 20; // assumed average
  if (project.pricePerCredit <= avgPrice * 0.7) score += 15;
  else if (project.pricePerCredit <= avgPrice) score += 10;
  else score += 5;

  return Math.min(Math.round(score), maxScore);
};

// Calculate trust score (simulated)
export const calculateTrustScore = (project) => {
  let score = 3.5; // base score

  if (project.verraCertified) score += 0.8;
  if (project.sdgGoals?.length >= 4) score += 0.3;
  if (project.category === 'Forestry' || project.category === 'Renewable Energy') score += 0.2;
  if (project.availableCredits / project.totalCredits > 0.5) score += 0.2;

  return Math.min(parseFloat(score.toFixed(1)), 5.0);
};

