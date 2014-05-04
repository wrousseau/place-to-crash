/**
 * Location
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  adapter: 'neo4j',

  attributes: {
  	user: {
      type: 'string',
      maxLength: 30,
      required: false
    },
  	lat: {
      type: 'int',
      required: false
    },
    lng: {
      type: 'int',
      required: false
    },
    country: {
      type: 'string',
      maxLength: 30,
      required: false
    },
    city: {
      type: 'string',
      maxLength: 30,
      required: false
    },
    zipCode: {
      type: 'int',
      required: false
    },
    street: {
      type: 'string',
      maxLength: 30,
      required: false
    },
    streetNumber: {
      type: 'int',
      required: false
    },
    otherInfo:
    {
      type: 'string',
      maxLength: 100,
      required: false
    }
  	/* e.g.
  	nickname: 'string'
  	*/
    
  }

};
