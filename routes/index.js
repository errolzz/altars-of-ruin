
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index.html');
};

exports.site = function(req, res){
  res.render('../site/index.html');
};