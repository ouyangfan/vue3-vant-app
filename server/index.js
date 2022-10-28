// const express = require('express')
import express from 'express'
import bodyParser from 'body-parser'

import { nearbyList, accountList, products, orderList } from './data.js'

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// test
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/shop/hot-list', (req, res) => {
  res.send({
    code: 1,
    data: nearbyList,
    message: 'success'
  })
})

app.post('/api/user/login', (req, res) => {
  const { username, password } = req.body
  let flag = false
  for (const it of accountList) {
    if (it.username === username && it.password === password) {
      flag = true
      break
    }
  }

  if (flag) {
    res.send({
      code: 1,
      data: '',
      message: 'success'
    })
  } else {
    res.send({
      code: 101,
      data: '',
      message: 'fail'
    })
  }
})

app.get('/api/shop/:id/products', (req, res) => {
  console.log(req.params, req.query)
  const category = req.query.tab
  let data = []
  if (category === 'all') {
    data = products
  } else {
    data = products.filter((item) => item.category === category)
  }

  res.send({
    code: 1,
    data: data,
    message: 'success'
  })
})

app.get('/api/order', (req, res) => {
  console.log(111)
  res.send({
    code: 1,
    data: orderList,
    message: 'success'
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
