import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  pricePerCredit: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Infrastructure', 'Forestry', 'Renewable Energy', 'Agriculture', 'Waste Management', 'Water Management', 'Blue Carbon', 'Technology', 'Community', 'Other'],
    required: true
  },
  sdgGoals: {
    type: [Number],
    required: true,
    validate: {
      validator: function (v) {
        return v.length > 0 && v.every(goal => goal >= 1 && goal <= 17);
      },
      message: 'SDG goals must be between 1 and 17'
    }
  },
  location: {
    country: {
      type: String,
      required: true
    },
    region: {
      type: String,
      required: true
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  verraCertified: {
    type: Boolean,
    required: true,
    default: false
  },
  verraProjectId: {
    type: String,
    default: null
  },
  totalCredits: {
    type: Number,
    required: true,
    min: 0
  },
  availableCredits: {
    type: Number,
    required: true,
    min: 0
  },
  projectStartDate: {
    type: Date,
    required: true
  },
  projectEndDate: {
    type: Date
  },
  images: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

ProjectSchema.index({ category: 1 });
ProjectSchema.index({ 'location.country': 1 });
ProjectSchema.index({ verraCertified: 1 });
ProjectSchema.index({ pricePerCredit: 1 });

const Project = mongoose.model('Project', ProjectSchema);

export default Project;

