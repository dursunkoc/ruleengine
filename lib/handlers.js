const rules = require('../rules/rules.js');

module.exports = (function() {
    var deduct = function(facts) {
        return rules.filter(r => checkRule(r,facts));
    };
    var checkRule = function(rule, facts){
        var eligible = rule.eligibility(facts);
        if(eligible && rule.children){
            return rule.children.filter(r => checkRule(r,facts));
        }else if(eligible){
            return rule;
        }else{
            return null;
        }
    };
    var deductionHandler = function(request, reply) {
        if (request.method === 'get') {
            //todo:read facts from request.params
            reply(deduct(facts));
            return;
        } else if (request.method === 'post') {
            var facts = request.payload;
            reply(deduct(facts));
            return;
        } else {
            var response = reply("Unsupported Method");
            response.statusCode = 403;
            return;
        }
    };

    return {
        deductionHandler: deductionHandler
    };
})();