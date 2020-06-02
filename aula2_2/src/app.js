//const express = require('express');

import express from 'express';
const app = express();
const port = 2000;


app.get('/:id',(req,res)=>{
    res.send(`<h1>${req.params.id}</h1>`)
})
app.post('/',(req,res)=>res.send("<h1>post</h1>"))


app.route('/rout')
.get((req,res) => {
    res.send("<h1>gustavo get</h1>")
    res.end()
})
app.route('/book')
.get((req,res) => {
    res.send('<h1>gustavo get</h1>')
    res.end()
})
.post((req, res) => {
    res.send('Add a book');
  })
.put((req, res) => {
    res.send('Update the book');
  });


app.listen(port,()=>{
    console.log("servidor rodando")
})
