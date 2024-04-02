const express = require('express');
const router = express.Router();


/*
 * GET /
 * HOME
*/ 
/*router.get('', async (req, res)=> {
    const locals = {
        title: "CENGDEN",
        description: "Trade Center"
    }
    const page = req.query.p || 0
    const itemsPerPage = 10
    
    let items = []
    
    const count = db.collection('items').count()
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    db.collection('items')
    .find({type:"item"})
    .skip(page * itemsPerPage)
    .limit(itemsPerPage)///////////////////
    .forEach(element => {
        items.push(element)
    })
    .then(() => {
        res.status(200).json(items)
        res.render('index', {
            locals, 
            items,
            current: page,
            nextPage: hasNextPage ? nextPage : null
        })
    })
    .catch (() => {
        res.status(500).json({error: 'could not fetch the documents'})
    })

    
    
});*/
/*router.get('', async (req, res)=> {
    const locals = {
        title: "CENGDEN",
        description: "Trade Center"
    }
    
    let perPage = 10;
    let page = req.query.page || 1;

    const data = find({type: "item"})
    .sort({createdAt: -1})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();


    const count = await Item.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    try {
        res.render('index', {
            locals, 
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null
        });

    } catch (error) {
        console.log(error);
    }
});*/

/*
*GET
*ITEM:ID
*/ 

/*router.get('/item/:id', async (req, res)=> {
    
    try {
        
        let slctd = req.params.id;
        const data = await Item.findById({_id: slctd});
        const locals = {
            title: data.title,
            description: data.description
        }

        res.render('item', {locals, data});

    } catch (error) {
        console.log(error);
    }
});*/



function insertItem () {
    Item.insertMany([
        {
            title: "Phone 1",
            owner: "osman",
            category: "phone",
            price: "2000 TL",
            description: "iphone",
            type:"item"
        },
        {
            title: "Laptop 1",
            owner: "memo",
            category: "computer",
            price: "4500 TL",
            description: "bozuk",
            type:"item"
        },
        {
            title: "car 1",
            owner: "ali",
            category: "car",
            price: "40000 TL",
            description: "gitmiyor",
            type:"item"

        },
        {
            title: "car 1",
            owner: "ali",
            category: "car",
            price: "40000 TL",
            description: "gitmiyor",
            type:"item"

        },
        {
            surname: "can",
            name: "ali",
            email: "ali@ceng.metu.edu.tr",
            password: "ali",
            favs: "",
            type:"user"
        }
    ])
}

//insertItem();



router.get('/login', (req,res) => {
    res.render('about');
});

module.exports = router
