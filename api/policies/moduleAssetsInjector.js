/**
 * flash
 *
 * @module      :: Policy
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {  

  // If Ajax request, no need to refresh the assets
  if(req.isAjax) return next();

  fs = require('fs');
  
  // Gathering the possible controller and action (index by default)
  splitPath = req.path.split('/');
  if (splitPath.length > 1) {
  	controller = splitPath[1];
  	action = (splitPath.length === 2 || !splitPath[2]) ? 'index' : splitPath[2];
  }
  path = '/public/'+controller+'/'+action;

  // Adding to locals arrays the found assets
  res.locals.scripts = [];
  res.locals.styles = [];
  if (fs.existsSync(process.cwd()+'/assets'+path+'.js'))
  {
  	res.locals.scripts.push(path+'.js');
  }
  if (fs.existsSync(process.cwd()+'/assets'+path+'.css'))
  {
  	res.locals.styles.push(path+'.css');
  }

  next();
};