module.exports = [{
    name: 'Eligible for X',
    description: 'Describes what does eligibility for x means',
    eligibility: function(facts) {
        return facts['cust']['location'] == 'Ankara' && facts['cust']['tenure'] > 10;
    },
    aProperty: 'xx',
    bProperty: false,
    cProperty: 13,
    children: [{
    	    name: 'Eligible for X1',
		    description: 'Describes what does eligibility for x1 means',
		    eligibility: function(facts) {
		        return facts['cust']['gender'] == 'Male';
		    },
		    aProperty: 'xxx',
		    bProperty: false,
		    cProperty: 13
    	},{
    	    name: 'Eligible for X2',
		    description: 'Describes what does eligibility for x2 means',
		    eligibility: function(facts) {
		        return facts['cust']['gender'] == 'Female';
		    },
		    aProperty: 'xxy',
		    bProperty: false,
		    cProperty: 15
    	}

    ]
}, {
    name: 'Eligible for Y',
    description: 'Describes what does eligibility for y means',
    eligibility: function(facts) {
        return facts.cust.location == 'Istanbul' && facts['cust']['tenure'] > 5;
    },
    aProperty: 'yy',
    bProperty: false,
    cProperty: 12,
}, {
    name: 'Eligible for Z',
    description: 'Describes what does eligibility for z means',
    eligibility: function(facts) {
    	console.log("['Istanbul','Ankara'].indexOf(facts['cust']['location']) "+ (['Istanbul','Ankara'].indexOf(facts['cust']['location'])));
        return ['Istanbul','Ankara'].indexOf(facts['cust']['location']) > -1 && facts['cust']['tenure'] > 15;
    },
    aProperty: 'zz',
    bProperty: true,
    cProperty: 120,
}];