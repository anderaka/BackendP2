'use strict';

const express = require('express');
const router = express.Router();
const anuncios = require('../../models/anuncios')


router.get('/', async (req, res, next) => {

    try {

      const name = req.query.name;
      const price = req.query.price;
      const description = req.query.description;
      const tags = req.query.tag;
      const sell = req.query.sell;

      const limit = parseInt(req.query.limit || 9);
      const start = parseInt(req.query.start || 0);
      const sort = req.query.sort || '_id';
  
      const filter = {};
  
      if (typeof name !== 'undefined') {

        filter.name = name;

      }

      if (typeof sell !== 'undefined'){

        filter.sell = sell;

      }


      if (typeof tags !=='undefined') {

        if (typeof tags === 'string') {

          filter.tags = tags;

        } else {

          filter.tags = {$in : tags};

        }

      }

      if (typeof price !== 'undefined') {

        const spacePrice = price.split('-');

        if (spacePrice[1] === '') {

          filter.price = {$gte: spacePrice[0]};

        }
        else if (spacePrice[0] === '') {

          filter.price = {$lte: spacePrice[1]};

        }
        else if (spacePrice.length === 1) {

          filter.price = spacePrice[0];

        }
        else {

          filter.price = {$gte: spacePrice[0], $lte: spacePrice[1]};

        }
      }

      const docs = await anuncios.list(filter, limit, start, sort);
      res.json(docs);

    } catch(err) {

      next(err);

    }

  });

router.get('/tags', async (req, res, next) => {
  try {

    const docs = await anuncios.tagList();
    res.json(docs);

  } catch(err) {

    next(err);

  }

});

router.get('/:id', async (req, res, next) => {
    try {
      const _id = req.params.id;
  
      const anuncio = await anuncios.findOne({ _id });
      if(!anuncio) {

        const err = new Error('not found');
        err.status = 404;
        return next(err);

      }

      res.json({ result: anuncio });
    } catch (err) {

      next(err);

    }
  });

router.post('/', async (req, res, next) => {
    try {

      const anuncioData = req.body;
      const anuncio = new anuncios(anuncioData);

      const anuncioSaveData= await anuncio.save();
      res.status(201).json({ result: anuncioSaveData });
  
    } catch (err) {

      next(err);
      
    }
});

module.exports = router;