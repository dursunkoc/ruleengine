const rules = require('./rules.js');

module.exports = (function() {
    var exec = function(facts) {
        return rules.filter(r => checkRule(r,facts));
    };
    var checkRule = function(rule, facts){
        var eligible = rule.eligibility(facts);
        if(eligible && rule.children){
            return rule.children.filter(r => checkRule(r,facts));
        }else if(eligible){
            return rule;
        }else{
            return false;
        }
    };

    return {
        exec: exec
    };
})();