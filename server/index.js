const express = require('express');

const app = express()

const posts = [
    {id: 1, content: 'me gustan los gatos'},
     {id: 2, content: 'me gustan los perros'},
     {id: 3, content: 'me gustan lo loros'},
];

/* const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(JSON.stringify(posts));
}); */

app.get('/', (req, res)=>{
res.send('<h1>Hola</h1>')
})

app.get('/api/notes',( req, res)=>{
  res.json(posts)
})

app.get('/api/notes/:id',(req, res)=>{
  const id = Number(req.params.id)
  console.log({id})

  const post = posts.find(post => post.id === id)
  console.log("hola",{post})
  res.json(post)
})

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);