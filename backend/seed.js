import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';

dotenv.config();

const projects = [
  // --- FORESTRY & CONSERVATION (6 Projects) ---
  {
    name: "Amazon Rainforest Conservation - Brazil",
    description: "Protecting 50,000 hectares of primary rainforest in the Amazon basin. This project creates a buffer zone against deforestation, preserving biodiversity and capturing millions of tons of CO2.",
    pricePerCredit: 28.50,
    category: "Forestry",
    sdgGoals: [13, 15, 6, 1],
    location: {
      country: "Brazil",
      region: "Amazonas",
      coordinates: { latitude: -3.4653, longitude: -62.2159 }
    },
    verraCertified: true,
    verraProjectId: "VCS-1122-AMZ",
    totalCredits: 1000000,
    availableCredits: 850000,
    projectStartDate: new Date("2020-01-15"),
    projectEndDate: new Date("2040-12-31"),
    images: ["https://images.unsplash.com/photo-1511497532942-9f382b8136c4?auto=format&fit=crop&w=800&q=80"]
  },
  {
    name: "Borneo Peatland Restoration",
    description: "Restoring degraded peatlands in Central Kalimantan to prevent peat fires and reduce massive carbon emissions. Includes community fire-prevention training.",
    pricePerCredit: 32.00,
    category: "Forestry",
    sdgGoals: [13, 15, 3, 8],
    location: {
      country: "Indonesia",
      region: "Central Kalimantan",
      coordinates: { latitude: -2.2100, longitude: 113.9100 }
    },
    verraCertified: true,
    verraProjectId: "VCS-1456-IDN",
    totalCredits: 750000,
    availableCredits: 120000, // Low availability = scarcity
    projectStartDate: new Date("2019-06-01"),
    projectEndDate: new Date("2039-05-31"),
    images: ["https://images.unsplash.com/photo-1596395819057-36e744d081a2?auto=format&fit=crop&w=800&q=80"]
  },
  {
    name: "Great Green Wall - Sahel",
    description: "Part of the African-led initiative to grow an 8,000km natural wonder of the world across the entire width of Africa to combat desertification.",
    pricePerCredit: 24.50,
    category: "Forestry",
    sdgGoals: [1, 2, 8, 13, 15],
    location: {
      country: "Senegal",
      region: "Sahel Region",
      coordinates: { latitude: 15.5000, longitude: -14.5000 }
    },
    verraCertified: false,
    totalCredits: 500000,
    availableCredits: 480000,
    projectStartDate: new Date("2021-01-01"),
    projectEndDate: new Date("2035-12-31"),
    images: ["https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80"]
  },
  {
    name: "Valdivian Temperate Rainforest - Chile",
    description: "Conservation of ancient temperate rainforests in Southern Chile, home to the Alerce trees, some of the longest-living trees on Earth.",
    pricePerCredit: 45.00,
    category: "Forestry",
    sdgGoals: [13, 15],
    location: {
      country: "Chile",
      region: "Los Rios",
      coordinates: { latitude: -40.0000, longitude: -72.0000 }
    },
    verraCertified: true,
    verraProjectId: "VCS-9988-CHL",
    totalCredits: 200000,
    availableCredits: 15000, // Very limited
    projectStartDate: new Date("2018-01-01"),
    projectEndDate: new Date("2048-12-31"),
    images: ["https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80"]
  },
  {
    name: "Redwood Carbon Project - USA",
    description: "Improved forest management in Northern California's redwood forests, focusing on increasing carbon stocks and sustainable timber harvesting.",
    pricePerCredit: 55.00,
    category: "Forestry",
    sdgGoals: [13, 15, 12],
    location: {
      country: "USA",
      region: "California",
      coordinates: { latitude: 40.7450, longitude: -124.1120 }
    },
    verraCertified: true,
    verraProjectId: "ACR-223-USA",
    totalCredits: 300000,
    availableCredits: 290000,
    projectStartDate: new Date("2020-01-01"),
    projectEndDate: new Date("2120-01-01"),
    images: ["https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80"]
  },
  {
    name: "Congo Basin Protection",
    description: "Protecting the world's second-largest rainforest. This project focuses on preventing illegal logging and providing alternative livelihoods for local communities.",
    pricePerCredit: 21.00,
    category: "Forestry",
    sdgGoals: [1, 13, 15],
    location: {
      country: "DR Congo",
      region: "Equateur",
      coordinates: { latitude: 0.0450, longitude: 18.2500 }
    },
    verraCertified: true,
    verraProjectId: "VCS-776-COD",
    totalCredits: 2000000,
    availableCredits: 1500000,
    projectStartDate: new Date("2015-01-01"),
    projectEndDate: new Date("2045-12-31"),
    images: ["https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?auto=format&fit=crop&w=800&q=80"]
  },

  // --- BLUE CARBON (4 Projects) ---
  {
    name: "Blue Carbon Mangroves - Myanmar",
    description: "Restoring degraded mangrove ecosystems in the Ayeyarwady Delta to protect against cyclones and sequester carbon at rates 4x higher than terrestrial forests.",
    pricePerCredit: 35.00,
    category: "Blue Carbon", // Custom category for cool factor
    sdgGoals: [13, 14, 15, 8],
    location: {
      country: "Myanmar",
      region: "Ayeyarwady",
      coordinates: { latitude: 16.5000, longitude: 95.0000 }
    },
    verraCertified: true,
    verraProjectId: "VCS-234-MMR",
    totalCredits: 400000,
    availableCredits: 120000,
    projectStartDate: new Date("2016-01-01"),
    projectEndDate: new Date("2036-12-31"),
    images: ["https://images.unsplash.com/photo-1588612502844-48283995f782?auto=format&fit=crop&w=800&q=80"]
  },
  {
    name: "Seagrass Restoration - Australia",
    description: "Pioneering project restoring seagrass meadows in Shark Bay. Seagrass captures carbon up to 35 times faster than tropical rainforests.",
    pricePerCredit: 42.00,
    category: "Blue Carbon",
    sdgGoals: [13, 14, 9],
    location: {
      country: "Australia",
      region: "Western Australia",
      coordinates: { latitude: -25.5000, longitude: 113.5000 }
    },
    verraCertified: false,
    totalCredits: 100000,
    availableCredits: 80000,
    projectStartDate: new Date("2022-01-01"),
    projectEndDate: new Date("2032-12-31"),
    images: ["https://images.unsplash.com/photo-1682687982501-1e58ab814714?auto=format&fit=crop&w=800&q=80"]
  },
  {
    name: "Kelp Forest Regeneration - California",
    description: "Restoring giant kelp forests along the California coast. These underwater forests grow 2 feet per day and are vital for marine biodiversity.",
    pricePerCredit: 38.00,
    category: "Blue Carbon",
    sdgGoals: [13, 14],
    location: {
      country: "USA",
      region: "Monterey Bay",
      coordinates: { latitude: 36.6000, longitude: -121.9000 }
    },
    verraCertified: false,
    totalCredits: 50000,
    availableCredits: 45000,
    projectStartDate: new Date("2023-01-01"),
    projectEndDate: new Date("2028-12-31"),
    images: ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"]
  },
  {
    name: "Coral Reef Protection - Fiji",
    description: "Community-led initiative to protect coral reefs and establish marine protected areas, enhancing fish stocks and blue carbon storage.",
    pricePerCredit: 29.00,
    category: "Blue Carbon",
    sdgGoals: [14, 13, 8],
    location: {
      country: "Fiji",
      region: "Viti Levu",
      coordinates: { latitude: -17.7134, longitude: 178.0650 }
    },
    verraCertified: true,
    verraProjectId: "VCS-555-FJI",
    totalCredits: 150000,
    availableCredits: 90000,
    projectStartDate: new Date("2019-01-01"),
    projectEndDate: new Date("2029-12-31"),
    images: ["https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=800&q=80"]
  },

  // --- RENEWABLE ENERGY (5 Projects) ---
  {
    name: "Geothermal Power - Iceland",
    description: "Harnessing volcanic activity to produce 100% clean, baseload renewable energy for the national grid and district heating.",
    pricePerCredit: 15.00,
    category: "Renewable Energy",
    sdgGoals: [7, 13, 9],
    location: {
      country: "Iceland",
      region: "Reykjavik",
      coordinates: { latitude: 64.1466, longitude: -21.9426 }
    },
    verraCertified: true,
    verraProjectId: "VCS-999-ISL",
    totalCredits: 500000,
    availableCredits: 400000,
    projectStartDate: new Date("2010-01-01"),
    projectEndDate: new Date("2040-12-31"),
    images: ["https://images.unsplash.com/photo-1476231682828-37edb4819a0f?auto=format&fit=crop&w=800&q=80"]
  },
  {
    name: "Off-Shore Wind Farm - North Sea",
    description: "Massive 1GW offshore wind farm providing clean energy to millions of homes in Northern Europe.",
    pricePerCredit: 19.50,
    category: "Renewable Energy",
    sdgGoals: [7, 13],
    location: {
      country: "Netherlands",
      region: "North Sea",
      coordinates: { latitude: 54.0000, longitude: 4.0000 }
    },
    verraCertified: true,
    verraProjectId: "GS-456-NLD",
    totalCredits: 2000000,
    availableCredits: 1800000,
    projectStartDate: new Date("2021-01-01"),
    projectEndDate: new Date("2041-12-31"),
    images: ["https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80"]
  },
  {
    name: "Solar Desert Project - Morocco",
    description: "One of the world's largest concentrated solar power plants, turning the intense Sahara sun into clean electricity even after dark.",
    pricePerCredit: 18.00,
    category: "Renewable Energy",
    sdgGoals: [7, 9, 13],
    location: {
      country: "Morocco",
      region: "Ouarzazate",
      coordinates: { latitude: 30.9335, longitude: -6.9370 }
    },
    verraCertified: true,
    verraProjectId: "VCS-333-MAR",
    totalCredits: 1500000,
    availableCredits: 500000,
    projectStartDate: new Date("2016-01-01"),
    projectEndDate: new Date("2036-12-31"),
    images: ["https://images.unsplash.com/photo-1509391364303-141e31068a96?auto=format&fit=crop&w=800&q=80"]
  },
  {
    name: "Rural Hydro Electrification - Peru",
    description: "Bringing electricity to isolated Andean communities through small-scale hydro projects, replacing diesel generators and kerosene lamps.",
    pricePerCredit: 22.50,
    category: "Renewable Energy",
    sdgGoals: [7, 1, 3, 4],
    location: {
      country: "Peru",
      region: "Cusco",
      coordinates: { latitude: -13.5320, longitude: -71.9675 }
    },
    verraCertified: true,
    verraProjectId: "GS-123-PER",
    totalCredits: 100000,
    availableCredits: 20000,
    projectStartDate: new Date("2019-01-01"),
    projectEndDate: new Date("2029-12-31"),
    images: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"]
  },
  {
    name: "Biomass Energy - India",
    description: "Converting agricultural waste (mustard crop residue) into electricity, preventing open-field burning and providing farmers with extra income.",
    pricePerCredit: 16.00,
    category: "Renewable Energy",
    sdgGoals: [7, 13, 8],
    location: {
      country: "India",
      region: "Punjab",
      coordinates: { latitude: 30.9010, longitude: 75.8573 }
    },
    verraCertified: true,
    verraProjectId: "CDM-888-IND",
    totalCredits: 300000,
    availableCredits: 250000,
    projectStartDate: new Date("2018-01-01"),
    projectEndDate: new Date("2028-12-31"),
    images: ["https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80"]
  },

  // --- TECHNOLOGY & INDUSTRIAL (4 Projects) ---
  {
    name: "Direct Air Capture - Iceland",
    description: "Orca plant: High-tech facility capturing CO2 directly from the air and mineralizing it underground in basalt rock for permanent storage.",
    pricePerCredit: 850.00, // Premium price
    category: "Technology",
    sdgGoals: [9, 13],
    location: {
      country: "Iceland",
      region: "Hellisheidi",
      coordinates: { latitude: 64.0413, longitude: -21.3962 }
    },
    verraCertified: true,
    verraProjectId: "PURO-111-ISL",
    totalCredits: 5000, // Very scarce
    availableCredits: 500,
    projectStartDate: new Date("2021-09-08"),
    projectEndDate: new Date("2031-09-08"),
    images: ["https://images.unsplash.com/photo-1569163139599-0f4517e36b31?auto=format&fit=crop&w=800&q=80"]
  },
  {
    name: "Biochar Production - USA",
    description: "Converting sustainably harvested biomass into biochar, which is applied to soil to lock carbon away for centuries while improving soil health.",
    pricePerCredit: 150.00,
    category: "Technology",
    sdgGoals: [12, 13, 15],
    location: {
      country: "USA",
      region: "Oregon",
      coordinates: { latitude: 44.0521, longitude: -123.0868 }
    },
    verraCertified: true,
    verraProjectId: "PURO-222-USA",
    totalCredits: 20000,
    availableCredits: 15000,
    projectStartDate: new Date("2020-01-01"),
    projectEndDate: new Date("2030-12-31"),
    images: ["https://images.unsplash.com/photo-1622384762286-02e1bc63a06b?auto=format&fit=crop&w=800&q=80"]
  },
  {
    name: "Landfill Gas Capture - Mexico",
    description: "Capturing methane from a large municipal landfill and using it to generate electricity, preventing a potent greenhouse gas from escaping.",
    pricePerCredit: 12.00,
    category: "Waste Management",
    sdgGoals: [11, 13, 7],
    location: {
      country: "Mexico",
      region: "Monterrey",
      coordinates: { latitude: 25.6866, longitude: -100.3161 }
    },
    verraCertified: true,
    verraProjectId: "CDM-456-MEX",
    totalCredits: 800000,
    availableCredits: 600000,
    projectStartDate: new Date("2017-01-01"),
    projectEndDate: new Date("2027-12-31"),
    images: ["https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80"]
  },
  {
    name: "Cement Carbon Capture - Canada",
    description: "Retrofitting a cement plant to capture CO2 emissions from the manufacturing process, effectively decarbonizing concrete production.",
    pricePerCredit: 95.00,
    category: "Technology",
    sdgGoals: [9, 13, 11],
    location: {
      country: "Canada",
      region: "Edmonton",
      coordinates: { latitude: 53.5461, longitude: -113.4938 }
    },
    verraCertified: false,
    totalCredits: 50000,
    availableCredits: 40000,
    projectStartDate: new Date("2023-01-01"),
    projectEndDate: new Date("2033-12-31"),
    images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"]
  },

  // --- COMMUNITY (3 Projects) ---
  {
    name: "Clean Cookstoves - Kenya",
    description: "Distributing efficient cookstoves to rural families, reducing demand for charcoal/wood and improving indoor air quality for women and children.",
    pricePerCredit: 14.00,
    category: "Community",
    sdgGoals: [3, 5, 7, 13],
    location: {
      country: "Kenya",
      region: "Nairobi",
      coordinates: { latitude: -1.2921, longitude: 36.8219 }
    },
    verraCertified: true,
    verraProjectId: "GS-444-KEN",
    totalCredits: 1000000,
    availableCredits: 600000,
    projectStartDate: new Date("2015-01-01"),
    projectEndDate: new Date("2025-12-31"),
    images: ["https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=800&q=80"]
  },
  {
    name: "Clean Water Access - Rwanda",
    description: "Rehabilitating boreholes to provide safe drinking water to communities, eliminating the need to boil water using wood fuel.",
    pricePerCredit: 18.00,
    category: "Community",
    sdgGoals: [3, 6, 13],
    location: {
      country: "Rwanda",
      region: "Kigali",
      coordinates: { latitude: -1.9441, longitude: 30.0619 }
    },
    verraCertified: true,
    verraProjectId: "GS-555-RWA",
    totalCredits: 400000,
    availableCredits: 350000,
    projectStartDate: new Date("2019-01-01"),
    projectEndDate: new Date("2029-12-31"),
    images: ["https://images.unsplash.com/photo-1584467735392-e427493a388f?auto=format&fit=crop&w=800&q=80"]
  },
  {
    name: "Biodigesters for Farmers - Vietnam",
    description: "Installing small-scale biodigesters that turn farm waste into clean gas for cooking, reducing methane emissions and reliance on fossil fuels.",
    pricePerCredit: 17.50,
    category: "Community",
    sdgGoals: [7, 13],
    location: {
      country: "Vietnam",
      region: "Hanoi",
      coordinates: { latitude: 21.0285, longitude: 105.8542 }
    },
    verraCertified: true,
    verraProjectId: "GS-666-VNM",
    totalCredits: 200000,
    availableCredits: 150000,
    projectStartDate: new Date("2020-01-01"),
    projectEndDate: new Date("2030-12-31"),
    images: ["https://images.unsplash.com/photo-1505246294793-199f3c760458?auto=format&fit=crop&w=800&q=80"]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/carbon-credits');
    console.log('Connected to MongoDB');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');

    // Insert seed data
    await Project.insertMany(projects);
    console.log(`Successfully seeded ${projects.length} premium projects with images`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
