const User = require('../dataConfig/user');

const bcrypt = require('bcrypt');


class LoadController {
  constructor() {
  }

  register(req, res) {
    res.render('register')
  }

  registerSolve(req, res) {
    const userName = req.body.username;
    const password = req.body.password;
    const tel = req.body.tel;

    User.findOne({
      where: {
        userName
      }
    }).then(user => {
      if (user == null) {
        bcrypt.hash(password, 10, function(err, hash) {
          return User.create({
            userName,
            password: hash,
            tel,
          }) 
        })
      } else {
        res.send(`账户${userName}已经存在`);
      }
    }).then((user) => {
      res.send(`创建账户${userName}成功`);
    });
  }

  load(req, res) {
    res.render('load');
  }

  loadSolve(req, res) {
    const userName = req.body.username;
    const password = req.body.password;

    User.findOne({
      where: {
        userName,
      }
    }).then(user => {
      if (user == null) {
        return res.send('用户不存在');
      }
      bcrypt.compare(password, user.getDataValue('password'), function(err, result) {
        if (!result) {
          return res.send('用户密码错误');
        }
        res.send('登陆成功');
      })
    });
  }
}

const loadController = new LoadController();

module.exports = loadController;