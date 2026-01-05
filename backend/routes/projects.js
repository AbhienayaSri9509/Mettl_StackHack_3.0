import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// Get all projects with filters
router.get('/', async (req, res) => {
  try {
    const {
      category,
      country,
      verraCertified,
      minPrice,
      maxPrice,
      sdgGoal,
      search,
      page = 1,
      limit = 100
    } = req.query;

    const query = {};

    // Category filter
    if (category) {
      query.category = category;
    }

    // Country filter
    if (country) {
      query['location.country'] = country;
    }

    // VERRA certification filter
    if (verraCertified !== undefined) {
      query.verraCertified = verraCertified === 'true';
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.pricePerCredit = {};
      if (minPrice) query.pricePerCredit.$gte = parseFloat(minPrice);
      if (maxPrice) query.pricePerCredit.$lte = parseFloat(maxPrice);
    }

    // SDG goal filter
    if (sdgGoal) {
      query.sdgGoals = parseInt(sdgGoal);
    }

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Project.countDocuments(query);

    res.json({
      projects,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalProjects: total,
        hasMore: skip + projects.length < total
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new project
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update project
router.put('/:id', async (req, res) => {
  try {
    req.body.updatedAt = new Date();
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get project statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const stats = await Project.aggregate([
      {
        $group: {
          _id: null,
          totalProjects: { $sum: 1 },
          totalCredits: { $sum: '$totalCredits' },
          availableCredits: { $sum: '$availableCredits' },
          averagePrice: { $avg: '$pricePerCredit' },
          verraCertifiedCount: {
            $sum: { $cond: ['$verraCertified', 1, 0] }
          }
        }
      }
    ]);

    const categoryStats = await Project.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    const countryStats = await Project.aggregate([
      {
        $group: {
          _id: '$location.country',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      overall: stats[0] || {},
      categories: categoryStats,
      topCountries: countryStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

