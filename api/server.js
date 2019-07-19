const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser');



const app = express()
const SECRET = 'SADJKLXZMCMLK'

// 使能处理json 允许客户端提交json数据
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3002

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// 获取歌单
app.get('/api/getDiscList', async (req, res) => {
  var params = {
    picmid: 1,
    rnd: 0.19454408658542421,
    g_tk: 314474274,
    loginUin: 1024676057,
    hostUin: 0,
    inCharset: 'utf8',
    outCharset: 'utf-8',
    format: 'json',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 19
  }
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  console.log(req)
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

// 获取歌单详细
app.post('/api/getDiscDetail', async (req, res) => {
  var params = {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    new_format: 1,
    disstid: req.body.disstid,
    g_tk: 1372905423,
    loginUin: 1024676057,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  }
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  console.log(req)
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

app.listen(port, () => {
  console.log(`Servers run in http://localhost:${port}`)
})

