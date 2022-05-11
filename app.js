const express = require("express")
const exphbs = require('express-handlebars')
const Acct = require('./user.json')

const app = express()
const port = 3000

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const foundData = Acct.users.find(user => user.email === req.body.email )
  if (foundData){
    if (req.body.password === foundData.password){
      res.render('personal', { name: foundData.firstName})
    } else {
      res.render('index', { email: req.body.email, password: req.body.password, incorrect: 'incorrect email or password'})
    }

  } else {
    res.render('index', { email: req.body.email, password: req.body.password, incorrect: 'incorrect email or password'})
  }

})

app.listen(port, () => {
  console.log(`Listening on http://localhost${port}`)
})