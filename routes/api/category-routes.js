const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const categories = await Category.findAll().catch((err) => {
    res.json(err);
  });
  res.json(categories);
});

router.get('/:id', async (req, res) => {
  try {
    const categoryId = await Category.findByPk(req.params.id);
    if (!categoryId) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(categoryId);
  } catch (err) {
    res.status(500).json(err);
  }
});



  // This route uses async/await with try/catch for errors
  // along with HTTP status codes
  router.post('/', async (req, res) => {
    try {
      const newCategory = await Category.create(req.body);
      // 200 status code means the request is successful
      res.status(200).json(newCategory);
    } catch (err) {
      // 400 status code means the server could not understand the request
      res.status(400).json(err);
    }
  });



// UPDATE a user
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedCategory[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedCategory) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
