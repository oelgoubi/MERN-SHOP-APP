const express = require('express');

const router = express.Router();


// Bring  Item Model 
const Item = require('../../models/Item');

// @route  GET api/items
// @desc   GET All Items
// @access Public

router.get('/',(req,res,next)=>{
    Item.find()
    .sort({ date : -1})
    .then(items => 
        res.status(200).json({
            items,
            message:"all the items were fetched"
        } ))
    .catch(err => res.status(500).json({
        message:err.message
    }));

})


// @route  POST api/items
// @desc   POST an Item
// @access Public

router.post('/',(req,res,next)=>{
   
    const newItem = Item({
        name : req.body.name
    });
    
    newItem.save()
    .then((new_item)=>
      res.json({
        item : new_item,
        message:'Product was stored in the DB'
      }))
    .catch(err => res.status(201).json({
        message:err.message
    }))
   
})

// @route  GET api/items/:itemId
// @desc   GET one item
// @access Public
router.get('/:itemId',(req,res,next)=>{
    
    const itemId = req.params.itemId;
    //console.log(itemId)
    
    Item.findById(itemId)
    .select('_id name date')
    .exec()
    .then(doc=>{
        console.log("From the DB",doc);
        doc ? 
        res.status(200).json({
            product : doc
        })
        :
        res.status(404).json({
            message:"No Valid entry found for provided ID"
        })
        
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            message:'Error or Invalid Id',
            error : err
        })
    })

});



// @route  Delete api/items/:itemId
// @desc   Delete one item
// @access Public
router.delete('/:itemId',(req,res,next)=>{

    const itemId = req.params.itemId;
    Item.findById(itemId)
    .select('_id name date')
    .exec()
    .then(item=>{
        console.log("From the DB",item);
        item ? 
        item.remove()
        .then((itemR)=> {
             res.status(200).json({
             message : "The item was deleted",
             item : itemR
           }) })
        :
        res.status(404).json({
            message:"No Valid entry found for provided ID"
        })
        
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            message:'Error or Invalid Id',
            error : err
        })
    })
   
});

// @route  Update api/items/  - passing the data in the body
// @desc   Update one item
// @access Public

router.patch('/:itemId',(req,res,next)=>{
    const id=req.params.itemId;
    // Check the info that we want to change 
    const updateOps ={};
    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value; // each property
    }
    Item.update({_id:id},{$set : updateOps})
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).json({
            message:'Item updated',
            new_item : result
        })
    })
    .catch(err => {
        res.status(500).json({
            message:err.message
        })
    })
});




module.exports = router;