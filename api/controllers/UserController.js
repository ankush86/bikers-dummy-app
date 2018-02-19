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

  fillData: function(req, res) {
    User.find({sort: 'createdAt DESC'}).exec((err, records) => {
      if(err) {
        return res.json({status: 404 ,error: 'No records found'});
      } else {
        if(records.length == 0) {
          var data = [
            {
              'full_name': 'James Isac Neutron',
              'email': 'neutron@example.com',
              'city': 'City',
              'ride_in_group': 'Always',
              'days': ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
            },
            {
              'full_name': 'Carl Wheezer',
              'email': 'carl@example.com',
              'city': 'City',
              'ride_in_group': 'Sometimes',
              'days': ['Mon','Tue','Wed','Thu','Fri']
            },
            {
              'full_name': 'Cindy Vortex',
              'email': 'cindyvortex@example.com',
              'city': 'City',
              'ride_in_group': 'Never',
              'days': ['Sun','Sat']
            },
            {
              'full_name': 'Sheen Estevez',
              'email': 'sheen@example.com',
              'city': 'City',
              'ride_in_group': 'Sometimes',
              'days': ['Mon','Wed','Fri']
            },
          ];
          var result = [];
          async.forEach(data, (obj, callback) => {
            User.create(obj).exec((err, record) => {
              if(err) {
                callback(err);
              } else {
                result.push(record);
                callback();
              }
            });            
          }, function(err) {
            if(err) {
              return res.json({status: 400 ,error: 'Unable to create user'});
            } else {
              return res.json({status: 200 ,data: result});
            }
          });
        } else {
          return res.json({status: 200 ,data: records});
        }
      }  
    });
  },


};

