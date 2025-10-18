const express = require('express');

let port=3000;
const app = express();

app.listen(port, ()=>{
  console.log(`listen on http://localhost:${port}`);
});

app.get('/',(req,res)=>{
  res.send("hello world");
});

