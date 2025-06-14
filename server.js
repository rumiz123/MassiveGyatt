const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const USERS_FILE = path.join(__dirname, 'users.json');

function loadUsers(){
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  } catch(e){
    return [];
  }
}

function saveUsers(users){
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

app.post('/signup', (req, res) => {
  const {username, password} = req.body;
  if(!username || !password) return res.status(400).json({error: 'Missing fields'});
  const users = loadUsers();
  if(users.find(u => u.username === username)){
    return res.status(400).json({error: 'User exists'});
  }
  users.push({username, password});
  saveUsers(users);
  res.json({success: true});
});

app.post('/login', (req, res) => {
  const {username, password} = req.body;
  if(!username || !password) return res.status(400).json({error: 'Missing fields'});
  const users = loadUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if(!user) return res.status(401).json({error: 'Invalid credentials'});
  res.json({success: true});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
