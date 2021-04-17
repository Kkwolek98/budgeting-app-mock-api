const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const users = JSON.parse(fs.readFileSync('users.json'));
const bankAccounts = JSON.parse(fs.readFileSync('bankAccounts.json'));
const categories = JSON.parse(fs.readFileSync('categories.json'));
const months = JSON.parse(fs.readFileSync('months.json'));

app.get('/ping', async(req,res) => {
    res.send('pong')
})

app.get('/users', async (req,res) => {
    res.send(users);
});

app.get('/users/:id', async (req, res) => {
    res.send(users.find(({id}) => id == req.params.id));
});

app.get('/bank-accounts', async (req, res) => {
    res.send(bankAccounts);
});

app.get('/bank-accounts/owner/:id', async (req, res) => {
    res.send(bankAccounts.filter(({owner}) => owner == req.params.id).slice(0,3));
});

app.get('/categories/user/:id', async (req,res) => {
    res.send(categories.find(({user}) => user == req.params.id).categories);
})

// housing, transportation, food, utilities, insurance, healthcare, investing, hobby
app.put('/goals/:id', async (req, res) => {
    const userCategories = categories.find(({user}) => user == req.params.id).categories;
    const changedCategories = req.body;
    changedCategories.forEach((el) => {
        userCategories.find(({category}) => category == el.category).spendingLimit = el.spendingLimit;
    });

    res.send(userCategories);
})

app.get('/months/user/:id', async (req,res) => {
    res.send(months.find(({user}) => user == req.params.id).months)
})

app.listen(process.env.PORT || 3000, () => console.log('Server running'))