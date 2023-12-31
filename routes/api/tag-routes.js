const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {

  const products = await Tag.findAll({
    include: [{ model: Product }]
  }).catch((err) => {
    res.json(err);
  });
  res.json(products);
});


router.get('/:id', async(req, res) => {
  try{
    const tagId = await Tag.findByPk(req.params.id,{
      include: [{ model: Product }]
    });
    if (!tagId) {
      res.status(404).json({ message: 'No product with this id!' });
      return;
    }
    res.status(200).json(tagId);
  } catch (err) {
    res.status(500).json(err);
  }
  });

router.post('/', async(req, res) => {
  try {
    const newTag = await Tag.create(req.body);

    res.status(200).json(newTag);
  } catch (err) {

    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {

  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedTag[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deleteTag) {
      res.status(200).json({message: 'Tag not found'});
      return;
    }

    res.status(200).json(deleteTag);
    console.log('Tag deleted!');
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
