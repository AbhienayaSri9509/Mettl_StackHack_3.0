import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';

dotenv.config();

const projects = [
  {
    name: "Amazon Rainforest Conservation Project",
    description: "A comprehensive reforestation and conservation project in the Amazon basin, protecting 50,000 hectares of primary forest and restoring degraded lands.",
    pricePerCredit: 25.50,
    category: "Forestry",
    sdgGoals: [13, 15, 6, 1],
    location: {
      country: "Brazil",
      region: "Amazonas",
      coordinates: {
        latitude: -3.4653,
        longitude: -62.2159
      }
    },
    verraCertified: true,
    verraProjectId: "VCS-1234-AMZ",
    totalCredits: 500000,
    availableCredits: 350000,
    projectStartDate: new Date("2020-01-15"),
    projectEndDate: new Date("2030-12-31"),
    images: []
  },
  {
    name: "Solar Power Initiative - India",
    description: "Large-scale solar photovoltaic installation providing clean energy to rural communities, reducing dependence on coal-fired power plants.",
    pricePerCredit: 18.75,
    category: "Renewable Energy",
    sdgGoals: [7, 13, 11, 8],
    location: {
      country: "India",
      region: "Rajasthan",
      coordinates: {
        latitude: 26.9124,
        longitude: 75.7873
      }
    },
    verraCertified: true,
    verraProjectId: "VCS-5678-IND",
    totalCredits: 750000,
    availableCredits: 420000,
    projectStartDate: new Date("2021-06-01"),
    projectEndDate: new Date("2031-05-31"),
    images: []
  },
  {
    name: "Wind Farm Development - Kenya",
    description: "Construction and operation of a 100MW wind farm providing renewable energy to the national grid, creating local employment opportunities.",
    pricePerCredit: 22.00,
    category: "Renewable Energy",
    sdgGoals: [7, 13, 8, 9],
    location: {
      country: "Kenya",
      region: "Turkana",
      coordinates: {
        latitude: 3.1167,
        longitude: 35.6000
      }
    },
    verraCertified: true,
    verraProjectId: "VCS-9012-KEN",
    totalCredits: 300000,
    availableCredits: 180000,
    projectStartDate: new Date("2022-03-10"),
    projectEndDate: new Date("2032-03-09"),
    images: []
  },
  {
    name: "Sustainable Agriculture Program - Vietnam",
    description: "Promoting regenerative farming practices, reducing methane emissions from rice cultivation, and improving soil carbon sequestration.",
    pricePerCredit: 15.25,
    category: "Agriculture",
    sdgGoals: [2, 13, 15, 1],
    location: {
      country: "Vietnam",
      region: "Mekong Delta",
      coordinates: {
        latitude: 10.0452,
        longitude: 105.7469
      }
    },
    verraCertified: false,
    totalCredits: 200000,
    availableCredits: 150000,
    projectStartDate: new Date("2021-01-01"),
    projectEndDate: new Date("2030-12-31"),
    images: []
  },
  {
    name: "Urban Green Infrastructure - Singapore",
    description: "Development of green roofs, vertical gardens, and urban forests to reduce heat island effect and improve air quality in the city-state.",
    pricePerCredit: 30.00,
    category: "Infrastructure",
    sdgGoals: [11, 13, 15, 3],
    location: {
      country: "Singapore",
      region: "Central Region",
      coordinates: {
        latitude: 1.3521,
        longitude: 103.8198
      }
    },
    verraCertified: true,
    verraProjectId: "VCS-3456-SGP",
    totalCredits: 150000,
    availableCredits: 95000,
    projectStartDate: new Date("2020-09-01"),
    projectEndDate: new Date("2030-08-31"),
    images: []
  },
  {
    name: "Waste-to-Energy Facility - Sweden",
    description: "Advanced waste management facility converting municipal solid waste to energy, reducing landfill methane emissions and generating clean electricity.",
    pricePerCredit: 28.50,
    category: "Waste Management",
    sdgGoals: [7, 11, 12, 13],
    location: {
      country: "Sweden",
      region: "Stockholm",
      coordinates: {
        latitude: 59.3293,
        longitude: 18.0686
      }
    },
    verraCertified: true,
    verraProjectId: "VCS-7890-SWE",
    totalCredits: 400000,
    availableCredits: 250000,
    projectStartDate: new Date("2019-05-15"),
    projectEndDate: new Date("2029-05-14"),
    images: []
  },
  {
    name: "Mangrove Restoration - Indonesia",
    description: "Large-scale mangrove reforestation project protecting coastal communities from sea-level rise while sequestering significant amounts of carbon.",
    pricePerCredit: 20.00,
    category: "Forestry",
    sdgGoals: [13, 14, 15, 1],
    location: {
      country: "Indonesia",
      region: "Java",
      coordinates: {
        latitude: -6.2088,
        longitude: 106.8456
      }
    },
    verraCertified: false,
    totalCredits: 600000,
    availableCredits: 480000,
    projectStartDate: new Date("2021-04-01"),
    projectEndDate: new Date("2031-03-31"),
    images: []
  },
  {
    name: "Hydroelectric Power - Nepal",
    description: "Small-scale run-of-river hydroelectric project providing clean energy to remote mountain communities without large-scale environmental impact.",
    pricePerCredit: 19.25,
    category: "Renewable Energy",
    sdgGoals: [7, 13, 6, 1],
    location: {
      country: "Nepal",
      region: "Gandaki Province",
      coordinates: {
        latitude: 28.3949,
        longitude: 84.1240
      }
    },
    verraCertified: true,
    verraProjectId: "VCS-2468-NPL",
    totalCredits: 180000,
    availableCredits: 120000,
    projectStartDate: new Date("2022-01-10"),
    projectEndDate: new Date("2032-01-09"),
    images: []
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
    console.log(`Seeded ${projects.length} projects`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

