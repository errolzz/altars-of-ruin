//world screen
controllers.controller('WorldCtrl', ['$scope', '$timeout', 'combat', 'items', 'skills', 'spawner',
    function($scope, $timeout, combat, items, skills, spawner) {
        var play = $scope.play;
        $scope.skills = skills;
        $scope.fighting = false;

        var combatSkills = {};
        var heroDelayMod = 1,
            mobDelayMod = 1;
        var heroAttackTimer, mobAttackTimer;

        $scope.respawnZone = function() {
            //clear out the hero zone item for the current zone
            //get the index of the current zone in the heros zones list
            for(var i=0; i<play.hero.zones.length; i++) {
                if(play.hero.zones[i].id == play.zone.id) {
                    play.hero.zones.splice(i, 1);
                    break;
                }
            }
            //respawn the zone
            play.mobs = spawner.getMobsForZone();
        }

        $scope.selectMob = function(mob) {
            var justClose = mob.selected;

            $scope.selectedIndex = undefined;
            for(var i=0; i<play.mobs.length; i++) {
                play.mobs[i].selected = false;
                //save the index of the mob
                //this matches the index in the heros zone mob list
                if(play.mobs[i] === mob) {
                    $scope.selectedIndex = i;
                }
            }

            if(justClose) {
                $scope.selectedMob = undefined;
                return;
            }

            $scope.selectedMob = mob;
            mob.selected = true;
            play.mob = mob;
        }

        $scope.setupAttack = function() {
            $scope.play.regen = false;
            $scope.view.footer = false;
            $scope.fighting = true;
            $scope.combatStatuses = [];
            play.mob.selected = false;
            $scope.selectedMob = undefined;

            //rebuild hero's equipped items just in case
            play.hero.equippedItems = items.buildItems(play.hero.equipped);

            //calculate all stats for the hero
            play.hero = combat.generateHero(play.hero);

            //calculate all the stats for the selected mob
            play.mob = combat.generateMob(play.mob);

            //if the hero has over 10 weight in inventory
            //display message saying it is slowing them down
            $scope.inventoryWeight = combat.getStatsFromItems(play.hero.inventoryItems, 'weight');
            if($scope.inventoryWeight > 10) {
                $scope.combatStatuses.push({message: 'The items in your bag are slowing you down', statusClass:['red-background', 'black-text']});
                $scope.combatStatuses.push({message: 'Go sell some in the pawn shop', statusClass:['red-background', 'black-text']});
            }

            //start the fight
            heroStrike();
            mobStrike();
        }

        function heroAttack() {
            var heroDelay = (3 - (2.5 * play.hero.haste / 24)) * 700 * heroDelayMod; //24 is arbitrary

            //increase delay for inventory items
            //for every 10 weight, add .5 second delay
            heroDelay += Math.floor($scope.inventoryWeight / 10) * 500;

            //hero timer
            heroAttackTimer = $timeout(heroStrike, heroDelay);
        }

        function mobAttack() {
            var mobDelay = (3 - (2.5 * play.mob.haste / 36)) * 700 * mobDelayMod;
            //mob timer
            mobAttackTimer = $timeout(mobStrike, mobDelay);
        }

        function heroStrike() {
            if($scope.fighting == false || $scope.fleeing == true) {
                resetTimers();
                return;
            }
            
            //the attack
            var result = makeAttack(play.hero, play.mob);
            var statusClass = result.damage > 0 ? ['white-background', 'red-text'] : ['white-background', 'black-text'];
            $scope.combatStatuses.push({message: result.message, statusClass: statusClass});

            if(play.mob.currentLife <= 0) {
                //hero was killed
                resetTimers();
                fightComplete(play.hero);
            } else if(play.hero.currentLife <= 0) {
                resetTimers();
                fightComplete(play.mob);
            } else {
                //defender still lives
                heroAttack();
            }
        }

        function mobStrike() {
            if($scope.fighting == false || $scope.fleeing == true) {
                resetTimers();
                return;
            }

            //the attack
            var result = makeAttack(play.mob, play.hero);
            var statusClass = result.damage > 0 ? ['red-background', 'white-text'] : ['white-background', 'black-text'];
            $scope.combatStatuses.push({message: result.message, statusClass: statusClass});

            if(play.hero.currentLife <= 0) {
                //hero was killed
                resetTimers();
                heroDeath();
                fightComplete(play.mob);
            } else if(play.mob.currentLife <= 0) {
                resetTimers();
                fightComplete(play.hero);
            } else {
                //defender still lives
                mobAttack();
            }
        }

        function resetTimers() {
            $timeout.cancel(heroAttackTimer);
            $timeout.cancel(mobAttackTimer);
        }

        function heroDeath() {
            //lose 20% exp of xp needed to level
            var neededToLevel = calculateXp();
            play.hero.experience = Math.max(0, Number(play.hero.experience - (neededToLevel * 0.2)).toFixed(1));
            calculateXp();
            //lose 20% of gold
            play.hero.gold = Math.floor(play.hero.gold * 0.8);

            $scope.save();
        }

        function makeAttack(attacker, defender) {
            var result = combat.attack(attacker, defender);

            defender.currentLife -= result.damage;
            return result;
        }

        $scope.combatSkill = function(num) {
            if($scope.fightOver) return; //ignore if fight is over

            var skillName = String(play.hero.combatSkills[num].name).toLowerCase();
            combatSkills[skillName](play.hero.combatSkills[num]);
        }

        $scope.flee = function() {
            if($scope.fightOver || $scope.fleeing) return; //ignore if fight is over

            //you fled, stop the fight
            $scope.fleeing = true;
            $timeout.cancel(mobAttackTimer);
            $timeout.cancel(heroAttackTimer);

            $scope.combatStatuses.push({message: 'You try to flee...', statusClass: ['yellow-background', 'white-text']});

            $timeout(function() {
                var chanceToFlee = 0.2 + 0.3 * play.hero.level / play.mob.level;
                $scope.play.regen = true;

                if(Math.random() < chanceToFlee) {
                    //you escaped
                    $scope.combatStatuses.push({message: 'And escape with your life!', statusClass: ['black-background', 'white-text']});

                    $timeout(function() {
                        $scope.fighting = false;
                        $scope.resetCombat();
                    }, 3000);
                } else {
                    heroDeath();
                    //you were caught
                    $scope.combatStatuses.push({message: 'But you are caught and killed', statusClass: ['red-background', 'white-text']});
                    $timeout(function() {
                        $scope.fighting = false;
                        $scope.setHeader('Death!');
                        $scope.victory = false;
                        $scope.results = true;

                    }, 3000);
                }
            }, 2000);
        }

        $scope.takeLoot = function() {
            //add item to inventory
            play.hero.inventory.push($scope.loot.fingerprint);
            play.hero.inventoryItems = items.buildItems(play.hero.inventory);

            $scope.continue();
            $scope.save();
        }

        $scope.revive = function() {
            //set life to 20%
            play.hero.currentLife = Math.floor(play.hero.maxLife * 0.2);
            play.mob = undefined;
            play.zone = undefined;
            //send them to town
            $scope.showScreen('town');
            $scope.resetCombat();
            $scope.view.footer = true;

            $scope.save();
        }

        $scope.continue = function() {
            if($scope.chooseStats && $scope.results) {
                $scope.results = false;
                $scope.setHeader('Level Up!');
            } else if($scope.chooseSkill) {
                $scope.results = false;
                $scope.chooseStats = false;
                $scope.setHeader('Select a Combat Skill');
            } else {
                $scope.resetCombat();
            }
        }

        $scope.changeStat = function(stat, amount) {
            if(amount == 1 && $scope.statPoints.free > 0) {
                play.hero[stat] += amount;
                $scope.statPoints.free--;
            }
            
            if(amount == -1 && $scope.statPoints.free < $scope.statPoints.total && $scope.statPoints[stat] < play.hero[stat]) {
                play.hero[stat] += amount;
                $scope.statPoints.free++;  
            }
        }

        function fightComplete(attacker) {
            $scope.play.regen = true;
            $scope.fightOver = true;
            //final combat status
            if(attacker.hero) {
                $scope.combatStatuses.push({message: 'You win!', statusClass: ['black-background', 'white-text']});
            } else {
                $scope.combatStatuses.push({message: 'You have been killed!', statusClass: ['black-background', 'red-text']});
            }
            
            $timeout(function() {
                $scope.fighting = false;
                $scope.results = true;

                if(attacker.hero) {
                    doVictory();
                } else {
                    $scope.setHeader('Death!');
                    $scope.victory = false;
                }
            }, 2000);
        }

        function doVictory() {
            $scope.setHeader('Victory!');
            $scope.victory = true;
            $scope.loot = items.getLoot(play.mob.level, play.mob.rare, play.mob.uniques || []);

            var goldMax = play.mob.level + (play.mob.level * (1 - play.mob.rare));
            $scope.gold = Math.ceil(Math.random() * goldMax);
            play.hero.gold += $scope.gold;

            for(var i=0; i<play.hero.zones.length; i++) {
                if(play.hero.zones[i].id == play.zone.id) {
                    //remove the mob from the player zone mob list
                    play.hero.zones[i].mobs.splice($scope.selectedIndex, 1);
                    //updated the actual zone mobs
                    play.mobs = spawner.getMobsForZone();
                    break;
                }
            }

            if(play.mob.rare < 0.4) {
                U.findOne(play.hero.kills, 'name', play.mob.name).kills++;
            }

            addXp();
            $scope.save();
        }

        function addXp() {
            play.hero.experience += play.mob.level;
            var neededToLevel = calculateXp();

            if(play.hero.experience >= neededToLevel) {
                //level up
                play.hero.level++;
                play.hero.experience = 0;
                play.hero.experiencePercent = 0;
            }

            checkLevelUp();
        }

        //checks this after every kill
        //in case the app quits before choosing stats or a skill
        function checkLevelUp() {
            
            play.hero = combat.generateHero(play.hero);

            //check if total added stats equals what they should for hero level
            var totalStats = play.hero.addedStrength + play.hero.addedVitality + play.hero.addedAgility,
                shouldHaveForLevel = 30 + 5 * (play.hero.level - 1),
                toDistribute = shouldHaveForLevel - totalStats;

            if(totalStats < shouldHaveForLevel) {
                //add to stats
                $scope.chooseStats = true;
                $scope.statPoints = {
                    total: toDistribute,
                    free: toDistribute,
                    addedStrength: play.hero.addedStrength,
                    addedVitality: play.hero.addedVitality,
                    addedAgility: play.hero.addedAgility
                }
            }

            //choose skills
            if(play.hero.level >= 6 && play.hero.combat.length == 0) {
                //first skill, all skills available
                $scope.availableSkills = skills;
                $scope.chooseSkill = true;
            } else if(play.hero.level >= 12 && play.hero.combat.length == 1) {
                //create list of learnable skills
                $scope.availableSkills = [];
                for(var i=0; i<skills.length; i++) {
                    if(play.hero.combat[0] != skills[i].id) {
                        $scope.availableSkills.push(skills[i]);
                    }
                }
                $scope.chooseSkill = true;
            }
        }

        function calculateXp() {
            //assuming hero kills mobs their own level
            //34 kills to reach level 2
            //50 kills to reach level 6
            //146 kills to reach level 30
            //226 kills to reach level 50
            var neededToLevel = U.calculateXpToLevel(play.hero.level);
            play.hero.experiencePercent = Number(play.hero.experience / neededToLevel * 100).toFixed(1);

            return neededToLevel;
        }

        //learning a skill
        $scope.selectSkillToLearn = function(skill) {
            for(var i=0; i<$scope.availableSkills.length; i++) {
                $scope.availableSkills[i].selected = false;
                $scope.availableSkills[i].learn = false;
            }
            skill.selected = true;
            $scope.skillToLearn = skill;
        }

        $scope.learnSkill = function() {
            $scope.chooseSkill = false;
            $scope.skillToLearn.selected = false;

            //add selected item to inventory
            play.hero.combat.push($scope.skillToLearn.id);
            play.hero.combatSkills.push(U.findOne(skills, 'id', $scope.skillToLearn.id));

            $scope.skillToLearn = undefined;
            $scope.continue();
            $scope.save();
        }

        $scope.resetCombat = function() {
            resetTimers();
            resetSkills();
            play.mob = undefined;
            $scope.fightOver = false;
            $scope.loot = undefined;
            $scope.victory = undefined;
            $scope.statPoints = undefined;
            $scope.fleeing = false;
            $scope.results = false;
            $scope.chooseStats = false;
            $scope.chooseSkill = false;
            $scope.view.footer = true;
            $scope.combatStatuses = [];
            $scope.availableSkills = [];
            if(play.zone) $scope.setHeader(play.zone.name);
        }

        //combat skills

        //reset skills
        function resetSkills() {
            for(var i=0; i<play.hero.combatSkills.length; i++) {
                play.hero.combatSkills[i].used = false;
                try {
                    $timeout.cancel(play.hero.combatSkills[i].timer1);
                } catch(e) {}
                try {
                    $timeout.cancel(play.hero.combatSkills[i].timer2);
                } catch(e) {}
            }
        }

        combatSkills.strike = function(strike) {
            //if the strike is ready
            if(!strike.used) {
                //make the strike
                var result = makeAttack(play.hero, play.mob);

                strike.used = true;
                //start the strike timer
                strike.timer = $timeout(function() {
                    //ready to use again
                    strike.used = false;
                }, 3000); //after 3 seconds
                $scope.combatStatuses.push({message: result.message, statusClass: ['black-background', 'white-text']});
            }
        }
        combatSkills.mend = function(mend) {
            if(!mend.used) {
                play.hero.currentLife = Math.min(play.hero.maxLife, play.hero.currentLife + Math.floor(play.hero.maxLife * .25));
                mend.used = true;
                $scope.combatStatuses.push({message: 'You mend your wounds', statusClass: ['black-background', 'white-text']});
            }
        }
        combatSkills.cripple = function(cripple) {
            if(!cripple.used) {
                mobDelayMod = 1.3;
                cripple.used = true;
                $scope.combatStatuses.push({message: 'You cripple ' + play.mob.name, statusClass: ['black-background', 'white-text']});
            }
        }
        combatSkills.sap = function(sap) {
            if(!sap.used) {
                play.mob.strength = Math.floor(play.mob.strength * 0.7);
                sap.used = true;
                $scope.combatStatuses.push({message: 'You sap ' + play.mob.name, statusClass: ['black-background', 'white-text']});
            }
        }
        combatSkills.scramble = function(scramble) {
            if(!scramble.used) {
                //use scramble
                scramble.used = true;
                //increase attack speed by 40%
                heroDelayMod = 0.6;
                //keep speed up for 6 seconds then return to normal
                scramble.timer1 = $timeout(function() {
                    heroDelayMod = 1;
                }, 6000);
                //make usable again in 12 seconds
                scramble.timer2 = $timeout(function() {
                    scramble.used = false;
                }, 12000);
                $scope.combatStatuses.push({message: 'You begin to scramble', statusClass: ['black-background', 'white-text']});
            }
        }
        combatSkills.stun = function(stun) {
            if(!stun.used) {
                stun.used = true;
                $timeout.cancel(mobAttackTimer);

                stun.timer1 = $timeout(function() {
                    if($scope.fighting && !$scope.fleeing) mobAttack();
                }, 4000);

                stun.timer2 = $timeout(function() {
                    stun.used = false;
                }, 14000);

                $scope.combatStatuses.push({message: 'You stun ' + play.mob.name, statusClass: ['black-background', 'white-text']});
            }
        }
        combatSkills.blind = function(blind) {
            if(!blind.used) {
                blind.used = true;
                play.mob.skill = play.mob.skill * 0.5;
                play.mob.agility = play.mob.agility * 0.5;

                blind.timer1 = $timeout(function() {
                    if($scope.fighting && !$scope.fleeing) mobAttack();
                }, 6000);
                blind.timer2 = $timeout(function() {
                    blind.used = false;
                }, 12000);
                $scope.combatStatuses.push({message: 'You blind ' + play.mob.name, statusClass: ['black-background', 'white-text']});
            }
        }
        combatSkills.cleave = function(cleave) {
                if(!cleave.used) {
                    cleave.used = true;
                    play.mob.armor = play.mob.armor * 0.3;
                    $scope.combatStatuses.push({message: 'You clave ' + play.mob.name + '\'s armor', statusClass: ['black-background', 'white-text']});
                }
        }
        combatSkills.dread = function(dread) {
            if(!dread.used) {
                dread.used = true;
                $timeout.cancel(mobAttackTimer);
                play.mob.agility = play.mob.agility * 10;
                play.mob.armor = play.mob.armor * 10;
                dread.timer1 = $timeout(function() {
                    if($scope.fighting && !$scope.fleeing) mobAttack();
                }, 10000);
                $scope.combatStatuses.push({message: 'You terrify ' + play.mob.name, statusClass: ['black-background', 'white-text']});
            }
        }
    }
]);