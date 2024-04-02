require('dotenv').config();

const express = require('express');
const {ObjectId} = require('mongodb')
const expressLayout = require('express-ejs-layouts');

//const connectdb = require('./server/config/db');
const { connectToDb, getDb} = require('./server/config/db')
const router = require('./server/routes/main');

const app = express();
app.use(express.json())
const PORT = 5000 || process.env.PORT;

let db
connectToDb((err) => {
    if(!err) {
        app.listen(PORT , () => {
            console.log(`App listens to port ${PORT}`);
        });
        db = getDb()
    }
})
//connectdb();

    
    
router.get('', async (req, res)=> {
    const locals = {
        title: "CENGDEN",
        description: "Trade Center"
    }
    const page = req.query.p || 0
    const itemsPerPage = 10
    
    let items = []
    
    const count = db.collection('items').count()
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / itemsPerPage);

    db.collection('items')
    .find({type:"item"})
    .skip(page * itemsPerPage)
    .limit(itemsPerPage)///////////////////
    .forEach(element => {
        items.push(element)
    })
    .then(() => {
        //res.status(200).json(items)
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

    
    
})

/*app.get('/items', (req, res) => {
    const page = req.query.p || 0
    const itemsPerPage = 10
    
    let items = []
    
    db.collection('items')
    .find({type:"item"})
    .skip(page * itemsPerPage)
    .limit(itemsPerPage)///////////////////
    .forEach(element => {
        items.push(element)
    })
    .then(() => {
        res.status(200).json(items)
    })
    .catch (() => {
        res.status(500).json({error: 'could not fetch the documents'})
    })
    
    //res.json({mssg: "welcome to the api"})
})*/

router.get('/item/:id', (req, res) => {

    if(ObjectId.isValid(req.params.id)) {
        db.collection('items')
        .findOne({_id: new ObjectId(req.params.id)})
        .then(doc => {
            //res.status(200).json(doc)
            const locals = {
                title: doc.title,
                description: doc.description
            }
    
            res.render('item', {locals, doc});
        })
        .catch(err => {
            res.status(500).json({error: 'Could not fetch document'})
        })
    }
    else {
        res.status(500).json({error: 'Not a valid doc'})
    }
})
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
app.post('/items', (req, res) => {
    const item = req.body
    db.collection('items')
    .insertOne(item)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({err: 'Could not create doc'})
    })
})

router.delete('item/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('items')
        .deleteOne({_id: ObjectId(req.params.id)})
        .then(result => {
            res.status(200).json(result)
        })
    }
    else {
        res.status(500).json({error: 'Not valid doc id'})
    }
})

app.patch('/items/:id', (req, res) => {
    const updates = req.body
    if(ObjectId.isValid(req.params.id)) {
        db.collection('items')
        .updateOne({_id: ObjectId(req.params.id)}, {$set: updates})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({err: 'Could not create doc'})
        })    
    }
    else {
        res.status(500).json({error: 'Not valid doc id'})
    }
})

app.use(express.static('public'));

app.use(expressLayout);


app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'));


