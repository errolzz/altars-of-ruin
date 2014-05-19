'use strict';

/* Services */

var services = angular.module('App.services', []);

//drives what partial to use
services.value('view', {
    //the three main sections of the game
    //start, town, world
    screen: 'start',

    //show or hide the overlay screen
    overlay: false,

    //overlay screens
    //false, menu, heroacter, travel
    overlayScreen: 'blank',

    //shows or hides the footer nav
    footer: false,

    //shows or hides footer nav for overlays
    overlayFooter: true
});

//this needs to be populated with saved data at runtime
services.value('heroes', []);

//this holds useful info for a single play session
services.value('play', {
    hero: undefined,
    tier: undefined,
    zone: {id: 'town'},
    mobs: undefined,
    mob: undefined,
    regen: true,
    town: {
        kills: 4, //this is set to 4 so shopkeep tull gets new items
        items: []
    }
});

services.value('intro', [
    'It has been nine years since the fall of the king',
    'The realm has descended into chaos',
    'The six cults of ruin contend for power',
    'Villages fend for themselves',
    'Travelers are rare'
]);

services.service('serializer', function() {
    this.serializeHero = function(hero) {
        var savableHero = {};

        return savableHero;
    }
});

services.factory('$exceptionHandler', function(play) {
    return function (exception, cause) {
        try {
            $.ajax({
                type: "POST",
                url: 'http://altarsofruin.com/error.php',
                data: {
                    error: exception,
                    hero: JSON.stringify(play.hero),
                    heroName: play.hero.name,
                    token: 'errol666'
                },
                dataType: 'json'
            });
        } catch(e) {
            
        }
    };
});

//creates a blank hero object
services.factory('heroFactory', function(zones) {
    return {
        createHero: function(heroName) {
            var alph = 'abcdefghijklmnopqrstuvwxyz'.split(''),
                killList = [];
                
            for (var i=0, l=zones.length; i<l; i++) {
                for (var j=0, l2=zones[i].mobs.length; j<l2; j++) {
                    if(zones[i].mobs[j].rare < 0.4) {
                        killList.push({
                            name: zones[i].mobs[j].name,
                            kills: 0
                        });
                    }
                };
            };

            return {
                //starting hero stats
                id: alph[Math.floor(Math.random()*26)] + Math.floor(Math.random()*1000) + alph[Math.floor(Math.random()*26)] + Math.floor(Math.random()*1000),
                hero: true,
                name: heroName,
                class: '',
                level: 1,
                strength: 0,
                addedStrength: 10,
                vitality: 0,
                addedVitality: 10,
                agility: 0,
                addedAgility: 10,
                maxLife: 100,
                currentLife: 100,
                haste: 0,
                weight: 0,
                damage: 0,
                armor: 0,
                experience: 0,
                experiencePercent: 0,
                gold: 0,
                passiveSkills: {
                    sword: 0,
                    axe: 0,
                    hammer: 0,
                    shortblade: 0,
                    knuckles: 0
                },
                combat: [],
                combatSkills: [],
                equipped: [], //['i0-q21-5-m1-7', 'i7-q22-9-m0-8', 'i9-q20-4-m2-6', 'i12-q21-3', 'i15-q22-6-m0-6'],
                equippedItems: [],
                inventory: [],
                inventoryItems: [],
                zones: [], //{id: 'z1', mobs: [2,3,3,7,1,2]}
                kills: killList
            };
        }
    }
});

services.service('spawner', function(play) {
    this.getMobsForZone = function() {
        var mobs = [],
            visited = U.findOne(play.hero.zones, 'id', play.zone.id);

        //check if hero has already been there
        if(visited) {
            //if they have been there
            for(var i=0; i<visited.mobs.length; i++) {
                //loop through the mobs previous generated for the zone
                //get those mobs from the zone and push them into the mobs array
                var mob = this.buildUniqueMob(play.zone.mobs[visited.mobs[i]], play.hero.level);
                mobs.push(mob);
            }
        } else {
            //if they have not been there, generate new mobs
            if(play.zone.id == 'town') return [];

            var numberOfMobs = 9,
                zoneSpawn = {
                    id: play.zone.id,
                    mobs: []
                };
            
            //create a copy of the array
            var availableMobs = play.zone.mobs.slice(0);

            for (var i = numberOfMobs - 1; i >= 0; i--) {
                
                var roll = Math.random(),
                    possibles = [];

                //loop through the zone mobs and save the possible mobs to spawn based on the roll
                for (var j = availableMobs.length - 1; j >= 0; j--) {
                    if(roll < availableMobs[j].rare) {
                        var possible = availableMobs[j];
                        possibles.push(possible);
                    }
                };
                //choose a mob at random from the possible list
                var mobPossibleIndex = Math.floor(Math.random() * possibles.length);
                
                var mob = this.buildUniqueMob(possibles[mobPossibleIndex], play.hero.level);

                //if a mob is rarer than .4, it can only spawn once
                if(mob.rare < 0.5) {
                    availableMobs.splice(mob.index, 1);
                }

                zoneSpawn.mobs.push(mob.index);
                mobs.push(mob);
            };

            play.hero.zones.push(zoneSpawn);
        }

        return mobs;
    }

    this.buildUniqueMob = function(mobDef, heroLevel) {
        var mob = {
            name: mobDef.name,
            index: mobDef.id,
            desc: mobDef.desc,
            level: mobDef.level,
            rare: mobDef.rare,
            uniques: mobDef.uniques
        }
        return mob;
    }
});

services.service('combat', function() {
    //mobData should eventually hold stuff to make these guys more unique
    this.generateMob = function(mobData) {
        var mob = angular.copy(mobData, {});
        mob.hero = false;

        //set mob base stats, accounts for levling up + items
        mob.strength = mob.vitality = mob.agility = mob.level * 3;
        //set mob haste
        mob.haste = 6 * (mob.level / 55);
        //set mob life
        mob.maxLife = mob.currentLife = 50 + mob.level * 10 + mob.vitality * 4;
        //weight
        mob.weight = 12 - Math.max(3, (mob.level / 50 * 12)); //3 min, 12 max
        //damage
        mob.damage = mob.strength + mob.level + (mob.level * 1.2); //base item, strength, item qual(approx), mob skill modified 1.2
        //armor
        mob.armor = 10 + mob.level * 3; //base items, item quals(approx)
        //skill
        mob.skill = mob.level * 2;

        return mob;
    };

    this.generateHero = function(heroData) {
        var hero = heroData; //angular.copy(heroData, {});

        //strength
        hero.strength = hero.addedStrength + this.getStatsFromItems(hero.equippedItems, 'strength');

        //vitality
        hero.vitality = hero.addedVitality + this.getStatsFromItems(hero.equippedItems, 'vitality');

        //agility
        hero.agility = hero.addedAgility + this.getStatsFromItems(hero.equippedItems, 'agility');

        //haste
        hero.haste = this.getStatsFromItems(hero.equippedItems, 'haste');

        //life
        hero.maxLife = 50 + (hero.level * 10) + (hero.vitality * 4);
        //adjust current life if it is higher than max life
        if(hero.currentLife > hero.maxLife) hero.currentLife = hero.maxLife;
        if(hero.currentLife < 1) hero.currentLife = 1;

        //weight
        hero.weight = this.getStatsFromItems(hero.equippedItems, 'weight');

        //speed
        hero.speed = ((3 - (2.5 * hero.haste / 10)) * 700) / 1000;
        hero.speed += Math.floor(hero.weight / 10) * 500;
        Number(hero.speed).toFixed(1);

        //damage
        hero.damage = hero.strength;
        var weapon = U.findOne(hero.equippedItems, 'class', 'weapon');
        if(weapon) {
            hero.damage += weapon.value + hero.passiveSkills[weapon.type];    
        } else {
            hero.damage += hero.passiveSkills['knuckles'];
        }

        var neededToLevel = U.calculateXpToLevel(hero.level);
        hero.experiencePercent = Number(hero.experience / neededToLevel * 100).toFixed(1);

        //armor
        hero.armor = this.getStatsFromItems(hero.equippedItems, 'value', 'weapon');

        return hero;
    };

    this.getStatsFromItems = function(items, stat, exclude) {
        var total = 0;
        for (var i = items.length - 1; i >= 0; i--) {
            if(items[i].class != exclude) total += items[i][stat];
        };
        return total;
    };

    //a single attack by a(attacker) on d(defender)
    this.attack = function(a, d) {
        var result = {
            damage: 0,
            message: ''
        };

        //if the attaker is the hero
        if(a.hero) {
            //figure out what passive weapon skill they are using
            var weapon = U.findOne(a.equippedItems, 'class', 'weapon');
            var skillName = weapon ? weapon.type : 'knuckles';
            //assign skill value to hero for attack
            a.skill = a.passiveSkills[skillName];

            this.checkSkillUp(a, skillName);
            this.checkSkillDowns(a, skillName);
        }

        //check for a random miss
        if (this.checkMiss(a.skill)) {
            return {
                damage: 0,
                message: a.hero ? 'You miss' : a.name + ' misses'
            }
        }

        //check for a dodge
        if(this.checkDodge(a.agility, a.weight, d.agility, d.weight)) {
            return {
                damage: 0,
                message: a.hero ? d.name + ' dodges' : 'You dodge'
            }
        }

        //check for a block
        if(this.checkBlock(a.skill, d.skill)) {
            return {
                damage: 0,
                message: a.hero ? d.name + ' blocks' : 'You block'
            }
        }

        //a hit! check how much armor absorbs
        var finalDamageMax = this.getDamage(a.damage, d.armor);
        //redo this to use a weighted range
        var finalDamage = Math.floor(finalDamageMax - (Math.random() * (finalDamageMax * 0.25)));

        //all melee mobs
        var mobAction = 'You are dealt';

        if(!a.hero) {
            //check for caster
            var casters = [
                {name: 'caller', message: 'You feel dizzy and take'},
                {name: 'witch', message: 'You puke bile and suffer'},
                {name: 'mender', message: 'You scream in pain and suffer'},
                {name: 'priest', message: 'Vision blurs as you take'},
                {name: 'shaman', message: 'You feel sick and suffer'},
                {name: 'corrupter', message: 'Darkness strikes you for'},
                {name: 'speaker', message: 'Your mind reels for'},
                {name: 'singer', message: 'Your mind reels for'},
                {name: 'chanter', message: 'Your mind reels for'},
                {name: 'talker', message: 'Your mind reels for'},
                {name: 'sorcerer', message: 'Raw energy hits you for'},
                {name: 'steward', message: 'You are drawn for'},
                {name: 'mage', message: 'Raw energy hits you for'},
                {name: 'magic', message: 'Raw energy hits you for'},
                {name: 'trancer', message: 'You stagger and suffer'},
                {name: 'warlock', message: 'Your heart stops and you take'},
                {name: 'librarian', message: 'Your brain bleeds for'},
                {name: 'lady', message: 'Your heart stops and you take'},
                {name: 'summon', message: 'Death claws you for'},
                {name: 'cult', message: 'Dark power strikes for'},
                {name: 'tourn', message: 'Agony crushes you for'}
            ];
            var n = a.name.toLowerCase();
            for (var i = casters.length - 1; i >= 0; i--) {
                if(n.indexOf(casters[i].name) >= 0) {
                    mobAction = casters[i].message;
                    break;
                }
            };
        }
        return {
            damage: finalDamage,
            message: a.hero ? 'You hit for ' + finalDamage + ' damage' : mobAction + ' ' + finalDamage + ' damage'
        }
    };

    this.checkSkillUp = function(hero, skillName) {
        //skill levels are capped at twice the hero level
        if(hero.passiveSkills[skillName] < hero.level * 2 && hero.passiveSkills[skillName] < 100) {
            //get the percent completed of skill level
            var percentSkillComplete = hero.passiveSkills[skillName] / 100;
            //start with 50% chance to skill up with skill of 0
            //subtract from that 0 - 40% based on percent complete
            //making it harder to skill up the close to max
            var chanceToSkillUp = 0.3 - (0.28 * percentSkillComplete);
            if(Math.random() < chanceToSkillUp) {
                hero.passiveSkills[skillName] += 1;
            }
        }
    };

    this.checkSkillDowns = function(hero, skillName) {
        //loop through all passive skills
        for(var skill in hero.passiveSkills) {
            //if it is not the skill of the current weapon
            if(skill != skillName && hero.passiveSkills[skill] > 0) {
                //4% chance to skill down
                if(Math.random() > 0.96) {
                    hero.passiveSkills[skill] -= 1;
                }
            }
        }
    };

    this.checkMiss = function(skill) {
        var threshold = 0.2 - (skill * 0.002);
        return Math.random() < threshold ? true : false;
    };

    this.checkDodge = function(aAgility, aWeight, dAgility, dWeight) {
        //base chance to dodge
        var threshold = 0.05;
        //increase chance based on agility difference
        threshold += Math.min(0.1, 0.1 * dAgility / aAgility);
        //increase chance based on weight difference
        threshold += Math.min(0.1, 0.1 * aWeight / dWeight);

        return Math.random() < threshold ? true : false;
    };

    //todo, make this possible
    this.checkBlock = function(aSkill, dSkill) {
        var skillDiff = Math.min(20, Math.max(-20, dSkill - aSkill)), //between -20 and 20 difference
            threshold = (skillDiff + 20) / 40 * .25; //maps between 0 and .25 chance to counter

        return Math.random() < threshold ? true : false;
    };

    this.getDamage = function(aDamage, dArmor) {
        //so 50 defense blocking 100 damage is .5 coverage
        var coverage = dArmor / aDamage,
            reduction = aDamage * Math.min(0.66, coverage * 0.66);

        //the most damage that can be blocked is 66% of the total
        return Math.ceil(aDamage - reduction);
    };
});

//all possible injuries
services.value('injuries', [
    null,
    'You have a few minor cuts',
    'You are bruised all over',
    'Your ankle is swollen to the size of a grapefruit',
    'You have a dislocated shoulder',
    'Looks like a broken nose',
    'You are covered in deep gashes down to the bone',
    'You have torn several ligaments',
    'That\'s a hernia, and you seem depressed',
    'Most of your fingers are broken and you are missing some teeth',
    'Your arm is cracked in three places',
    'Both your wrists have exploded',
    'One of your legs is bent the wrong way',
    'Your pelvis has been crushed',
    'One of your lungs is collapsed and the other is missing',
    'Your skill is fractured and you are missing some vertebrae'
]);

//combat skills
services.value('skills', [
    {
        id: 's0',
        name: 'Strike',
        desc: 'Heightened sense of combat allows you to see hidden openings in your enemy\'s defense',
        bullets: [
            'An extra attack during combat',
            'Does the same damage as a normal attack',
            'Usable every 3 seconds'
        ],
        firstName: 'Striking',
        secondName: 'Striker'
    },
    {
        id: 's1',
        name: 'Mend',
        desc: 'A lifetime of injuries have given you a new level of familiarity with your wounds',
        bullets: [
            'Heal yourself for 25% of your total health during combat',
            'Usable once per fight'
        ],
        firstName: 'Mending',
        secondName: 'Mender'
    },
    {
        id: 's2',
        name: 'Cripple',
        desc: 'If you know how the body works, you know how to make it stop working',
        bullets: [
            'Slows your enemy\'s attack speed by 30%',
            'Usable once per fight'
        ],
        firstName: 'Crippling',
        secondName: 'Crippler'
    },
    {
        id: 's3',
        name: 'Sap',
        desc: 'Warriors know that to rob a man of strength you need to rob him of his will',
        bullets: [
            'Decrease the strength of your opponent by 30%',
            'Usable once per fight'
        ],
        firstName: 'Sapping',
        secondName: 'Sapper'
    },
    {
        id: 's4',
        name: 'Scramble',
        desc: 'The faster you can fight, the faster your enemy can die',
        bullets: [
            'Increases the rate of your attacks by 40%',
            'Lasts for 6 seconds',
            'Usable every 12 seconds'
        ],
        firstName: 'Scrambling',
        secondName: 'Scrambler'
    },
    {
        id: 's5',
        name: 'Stun',
        desc: 'Even the most stalwart of foes can be knocked senseless if hit them hard enough',
        bullets: [
            'Stun your opponent and stop them from attacking for 4 seconds',
            'Usable every 14 seconds'
        ],
        firstName: 'Stunning',
        secondName: 'Stunner'
    },
    {
        id: 's6',
        name: 'Blind',
        desc: 'Hard to fight if you cannot see',
        bullets: [
            'Decrease your opponent\'s agility and weapon skill by 50%',
            'Lasts 6 seconds',
            'Usable every 12 seconds'
        ],
        firstName: 'Blinding',
        secondName: 'Blinder'
    },
    {
        id: 's7',
        name: 'Cleave',
        desc: 'Armor isn\'t much good when it\'s falling to pieces during a fight',
        bullets: [
            'Reduces the effectiveness of an opponent\'s armor by 30%',
            'Usable once per fight'
        ],
        firstName: 'Cleaving',
        secondName: 'Cleaver'
    },
    {
        id: 's8',
        name: 'Dread',
        desc: 'Your ghastly visage can put anyone into a panic',
        bullets: [
            'Your enemy panics and stops attacking you',
            'Your damage is reduced by 40%',
            'Lasts 10 seconds',
            'Usable once per fight'
        ],
        firstName: 'Dreadful',
        secondName: 'Dreader'
    }
]);
