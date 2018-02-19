/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function(req, res) {
    var user = req.allParams();
    User.create(user).exec((err, record) => {
      if(err) {
        return res.json({status: 400 ,error: 'Unable to create user'});
      } else {
        return res.json({status: 201, data: record});
      }
    });
  },

  findAll: function(req, res) {
    User.find({sort: 'createdAt DESC'}).exec((err, records) => {
      if(err) {
        return res.json({status: 404 ,error: 'Unable to find users'});
      } else {
        return res.json({status: 200, data: records});
      }  
    });
  },

  delete: function(req, res) {
    var userId = req.params.id;
    if (!userId) 
      return res.json({ status:400, error: 'Missing user id field' });

    User.destroy({ id: userId }).exec((err, user) => {
      if (!user || user.length === 0) 
        return res.json({ status:404, error: 'No user found in our record' });
      
      return res.json({ status:200 });
    });
    
  },


};

