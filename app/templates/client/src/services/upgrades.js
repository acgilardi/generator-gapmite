var Upgrade1 = require('./upgrade1');
    //Upgrade2 = require('./upgrade2');


var Upgrades = module.exports = function() {
    // Add upgrades
    upgrades = [];
    upgrades.push(Upgrade1());
    //upgrades.push(Upgrade2());

    return upgrades;
};

