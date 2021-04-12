const app = require('express')();
const fs = require('fs');
const cors = require('cors');

app.use(cors());

const users = JSON.parse(fs.readFileSync('users.json'));
const bankAccounts = JSON.parse(fs.readFileSync('bankAccounts.json'));
const categories = JSON.parse(fs.readFileSync('categories.json'));

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

app.listen(3000 || process.env.PORT, () => console.log('Server running'))