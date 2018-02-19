/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	full_name : { type: 'string', required: true },
  	email : { type: 'string', required: true },
  	city : { type: 'string' },
  	ride_in_group : { type: 'string', required: true },
  	days : { type: 'string', required: true },
  }
};

