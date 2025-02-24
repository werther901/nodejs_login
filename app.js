const express = require('express');
const ejs = require("ejs"); // 페이지 로딩을 위해 필수
// const cors = require("cors");
const app = express();
const path = require('path');
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(cors());
app.use(express.static(path.join(__dirname,'public')));

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(3000, () => {
  console.log('http://localhost:3000 에서 서버 실행중')
})

app.get('/', (req, res) => {
  res.send('반갑다');
})

// 로그인 페이지
app.get('/main', (req, res) => {
  res.render('main');
})

let data = "";

// 회원가입 페이지
app.get('/join', (req, res) => {
  res.render('join');
});

app.post('/main', (req, res) => {
  data = req.body;
  console.log(data);
  res.render('main', { userinfo: data });
});

app.get('/userInfo', (req, res) => {
  res.json(data);
});

app.get('/welcome', (req, res) => {
  res.render('welcome', {username: req.query});
});

app.get('/findId', (req, res) => {
  res.render('findId');
});

app.get('/findPw', (req, res) => {
  res.render('findPw');
});