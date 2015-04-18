'use strict';

/* Controllers */

var controllers = angular.module('App.controllers', []);

controllers.controller('AppCtrl', ['$scope', '$timeout', 'view', 'play', 'heroes', 'serializer', 'zones', 'tiers',
    function($scope, $timeout, view, play, heroes, serializer, zones, tiers) {
        $scope.view = view;
        $scope.play = play;
        $scope.tiers = tiers;
        $scope.zones = zones;
        $scope.heroes = heroes;
        $scope.header = '';

        $scope.init = function() {
            //load heroes
            $scope.heroes = JSON.parse(localStorage.getItem('saved_heroes')) || []; //DEVNOTE: don't have []

            //set up zone tiers and mob ids
            var numberOfZones = zones.length;
            for(var i=0; i<numberOfZones; i++) {
                var mobs = zones[i].mobs,
                    numberOfMobs = mobs.length;

                //add zones to tiers
                if(zones[i].id != 'town') $scope.tiers[zones[i].tier].zones.push(zones[i]);

                //add ids to mobs
                for (var j = numberOfMobs - 1; j >= 0; j--) {
                    mobs[j].id = j;
                };
            };
            
            //start regen
            heroRegen();
        }

        $scope.setHeader = function(text) {
            $scope.header = text;
        }

        $scope.showScreen = function(name) {
            $scope.play.regen = true;
            view.screen = name;
            view.footer = name == 'town' || name == 'world' ? true : false;
            $scope.overlay(false);
        }

        $scope.overlay = function(name) {
            if(view.overlayScreen == name && view.overlay == true) {
                //if the same screen is opened twice, close it
                view.overlay = false;

                view.overlayFooter = true;
            } else {
                //if name is undefined set overlay to false
                view.overlay = name ? true : false;
                //if name is undefined, use menu
                view.overlayScreen = name ? name : 'blank';

                view.overlayFooter = view.overlayScreen == 'tutorial' ? false : true;
            }
        }

        $scope.openSite = function() {
            var url = encodeURI('http://altarsofruin.com');
            window.open(url, '_system', 'location=no');
        }

        $scope.save = function() {
            localStorage.setItem('saved_heroes', JSON.stringify($scope.heroes));
        }

        function heroRegen() {
            var healMod = 1,
                healAmt = 0;

            $timeout(function() {
                if(play.hero && $scope.play.regen) {
                    healMod = view.screen == 'town' ? 2 : 1;
                    healAmt = Math.floor((play.hero.vitality / 2.2) * healMod);
                    play.hero.currentLife = Math.min(play.hero.maxLife, play.hero.currentLife + healAmt);
                    $scope.save();
                }
                heroRegen();
            }, 5000);
        }
    }
]);

//heroacter select / create screen
controllers.controller('StartCtrl', ['$scope', '$timeout', 'heroFactory', 'intro', 'skills',
    function($scope, $timeout, heroFactory, intro, skills) {
        var play = $scope.play,
            heroes = $scope.heroes;

        $scope.intro = intro;
        //when an existing hero is selected
        $scope.heroSelected = false;
        //when an empty hero slot is selected
        $scope.newHero = false;
        //when a hero is deleted
        $scope.heroDeleted = false;

        $scope.heroCreated = false;

        $scope.setHeader('Select a hero');

        generateHeroes();

        function generateHeroes() {
            for(var i=0; i<heroes.length; i++) {
                //set up hero skills
                for(var j=0; j<heroes[i].combat.length; j++) {
                    var cs = U.findOne(skills, 'id', heroes[i].combat[j]);
                    heroes[i].combatSkills[j] = cs;
                }

                if(heroes[i].combat.length == 1) {
                    heroes[i].class = heroes[i].combatSkills[0].secondName;
                } else if(heroes[i].combat.length == 2) {
                    heroes[i].class = heroes[i].combatSkills[0].firstName;
                    heroes[i].class += ' ' + heroes[i].combatSkills[1].secondName;
                }
            }

        }

        $scope.selectHero = function(hero) {
            $scope.heroDeleted = false;
            $scope.newHero = false;
            $scope.heroSelected = hero;
            play.hero = hero;
        }

        $scope.createHero = function() {
            $scope.newHero = true;
            $scope.heroCreated = false;
            $scope.heroSelected = false;
            $scope.heroDeleted = false;
        }

        $scope.deleteHero = function() {
            for(var i=0; i<$scope.heroes.length; i++) {
                if(heroes[i] == $scope.heroSelected) {
                    heroes.splice(i, 1);
                    play.hero = undefined;
                    $scope.heroDeleted = false;
                    $scope.heroSelected = false;
                    $scope.save();
                    break;
                }
            }
        }

        $scope.submitHero = function(heroName) {
            $scope.error = undefined;
            if(heroName) {
                //check that the name is not already used
                for(var i=0; i<$scope.heroes.length; i++) {
                    if(heroName == $scope.heroes[i].name) {
                        $scope.error = 'That hero already exists';
                    }
                }
            } else {
                $scope.error = 'You must enter a hero name';
            }

            if($scope.error) return;

            play.hero = heroFactory.createHero(heroName);
            heroes.push(play.hero);
            generateHeroes();
            
            $scope.save();
            $scope.heroCreated = true;
            
            $scope.heroName = '';
            $scope.selectHero(play.hero);
            $scope.intro = true;
            playIntro();
        }

        function playIntro() {
            $scope.setHeader('Altars of ruin');
            $scope.counter = 0;
            $scope.intros = [];
            showIntroText();
        }

        function showIntroText() {
            $timeout(function() {
                $scope.intros.push(intro[$scope.counter]);
                $scope.counter++;

                if($scope.counter > 5) {
                    $scope.setHeader('Select a hero');
                    $scope.intro = false;
                    $scope.overlay('tutorial');
                } else {
                    showIntroText();
                }
            }, 2400); //DEVNOTE: 2400
        }

        $scope.enterTown = function() {
            $scope.counter = 0;
            $scope.intro = false;
            play.zone = {id:'town'};
            $scope.showScreen('town');
        }
    }
]);

//town screen
controllers.controller('TownCtrl', ['$scope', '$timeout', 'injuries', 'items', 'combat', 'skills',
    function($scope, $timeout, injuries, items, combat, skills) {
        var play = $scope.play;
        $scope.townScreen = 'town';

        $scope.buildHero = function() {
            $scope.townScreen = 'town';

            //build inventory items
            play.hero.inventoryItems = items.buildItems(play.hero.inventory);
            //build equipped items
            play.hero.equippedItems = items.buildItems(play.hero.equipped);
            //calculate all stats for the hero
            play.hero = combat.generateHero(play.hero);
            //set up hero skills
            for(var i=0; i<play.hero.combat.length; i++) {
                var cs = U.findOne(skills, 'id', play.hero.combat[i]);
                play.hero.combatSkills[i] = cs;
            }

            $scope.save();
        }

        //buying
        $scope.buy = function() {
            $scope.resetTown();
            play.town.items = generateItemsForSale();
            $scope.itemsForSale = items.buildItems(play.town.items);
            $scope.townScreen = 'buy';
        }
        $scope.selectItemToBuy = function(item) {
            var justClose = item.selectedToBuy;

            for(var i=0; i<$scope.itemsForSale.length; i++) {
                $scope.itemsForSale[i].selectedToBuy = false;
                $scope.itemsForSale[i].buy = false;
            }

            if(justClose) return;

            item.selectedToBuy = true;
            $scope.itemToBuy = item;
        }
        $scope.closeBuyItem = function() {
            $scope.itemToBuy.buy = false;
            $scope.itemToBuy.selectedToBuy = false;
            $scope.itemToBuy = undefined;
        }
        $scope.buyItem = function() {
            play.hero.gold -= $scope.itemToBuy.worth;

            //remove item from town store
            U.removeOne(play.town.items, $scope.itemToBuy.fingerprint);
            //add selected item to inventory
            play.hero.inventory.push($scope.itemToBuy.fingerprint);
            //build inventory items
            play.hero.inventoryItems = items.buildItems(play.hero.inventory);
            //build for sale items
            $scope.itemsForSale = items.buildItems(play.town.items);

            $scope.closeBuyItem();
            $scope.save();
        }

        //selling
        $scope.sell = function() {
            $scope.resetTown();
            //build inventory items
            play.hero.inventoryItems = items.buildItems(play.hero.inventory);
            $scope.townScreen = 'sell';
        }
        $scope.selectItemToSell = function(item) {
            var justClose = item.selectedToSell;

            for(var i=0; i<play.hero.inventoryItems.length; i++) {
                play.hero.inventoryItems[i].selectedToSell = false;
                play.hero.inventoryItems[i].sell = false;
            }
            if(justClose) return;

            item.selectedToSell = true;
            $scope.itemToSell = item;
        }
        $scope.closeSellItem = function() {
            $scope.itemToSell.selectedToSell = false;   
            $scope.itemToSell.sell = false;   
            $scope.itemToSell = undefined;   
        }
        $scope.sellItem = function() {
            play.hero.gold += $scope.itemToSell.worth;

            //remove selected item from inventory
            var selectedItemFingerprint = U.removeOne(play.hero.inventory, $scope.itemToSell.fingerprint);
            //build inventory items
            play.hero.inventoryItems = items.buildItems(play.hero.inventory);

            $scope.closeSellItem();
            $scope.save();
        }

        //forging
        $scope.forge = function() {
            $scope.resetTown();
            //build inventory items
            play.hero.inventoryItems = items.buildItems(play.hero.inventory);
            play.hero.equippedItems = items.buildItems(play.hero.equipped);

            $scope.townScreen = 'forge';
        }
        $scope.selectItemToForge = function(item, type) {
            var justClose = item.selectedToForge;
            $scope.perfect = false;

            for(var i=0; i<play.hero.inventoryItems.length; i++) {
                play.hero.inventoryItems[i].selectedToForge = false;
                play.hero.inventoryItems[i].forge = false;
            }
            for(var j=0; j<play.hero.equippedItems.length; j++) {
                play.hero.equippedItems[j].selectedToForge = false;
                play.hero.equippedItems[j].forge = false;
            }
            if(justClose) return;
            
            item.equipped = type == 'equipped' ? true : false;
            item.selectedToForge = true;
            $scope.itemToForge = item;

            var parts = item.fingerprint.split('-');
            
            //check if the item is perfect or unique
            if(parts.length === 1) {
                $scope.perfect = true;
            } else {
                var quality = U.findOne(items.qualities, 'id', parts[1]);
                if(quality.name == 'perfect') $scope.perfect = true;
            }

            $scope.forgeCost = item.worth * (item.quality + 1);
        }
        $scope.closeForgeItem = function() {
            $scope.itemToForge.selectedToForge = false;   
            $scope.itemToForge.forge = false;   
            $scope.itemToForge = undefined;   
        }
        $scope.forgeItem = function() {
            //decide equipped item or inventory
            var array = $scope.itemToForge.equipped ? play.hero.equipped : play.hero.inventory;
            
            //remove the fingerprint of the item to be forged
            var selectedItemFingerprint = U.removeOne(array, $scope.itemToForge.fingerprint);
            //break the item fingerprint into parts
            var parts = selectedItemFingerprint.split('-');
            //upgrade the quality of the fingerprint
            parts[1] = 'q' + Number($scope.itemToForge.quality + 1);
            //rebuild the fingerprint
            var forgedFingerprint = parts[0] + '-' + parts[1] + '-' + parts[2];
            //magic
            if(parts.length == 5) {
                forgedFingerprint += '-' + parts[3] + '-' + parts[4];
            }

            //save if the item was equipped or bagged for reselection
            var type = $scope.itemToForge.equipped == true ? 'equipped' : 'bag';

            //pay gold
            play.hero.gold -= $scope.forgeCost;

            //add the forged item to inventory
            array.push(forgedFingerprint);
            //build hero items
            play.hero.inventoryItems = items.buildItems(play.hero.inventory);
            play.hero.equippedItems = items.buildItems(play.hero.equipped);

            $scope.closeForgeItem();
            $scope.save();

            //reselect the forged item
            array = type == 'equipped' ? play.hero.equippedItems : play.hero.inventoryItems;

            for(var i=0; i<array.length; i++) {
                if(array[i].fingerprint == forgedFingerprint) {
                    $scope.selectItemToForge(array[i], type);
                    break;
                }
            }
        }

        //healing
        $scope.heal = function() {
            $scope.resetTown();
            var hurt = 1 - play.hero.currentLife / play.hero.maxLife;
            var inj = Math.floor(injuries.length * hurt);

            $scope.injuryCost = Math.floor(play.hero.level * inj / 4);
            $scope.injury = injuries[inj];

            $scope.townScreen = 'heal';
        }
        $scope.payHealer = function() {
            if($scope.canAfford($scope.injuryCost)) {
                play.hero.gold -= $scope.injuryCost;
                play.hero.currentLife = play.hero.maxLife;
                $scope.heal();
            } else {
                $scope.goldNeeded = $scope.injuryCost;
            }

            $scope.save();
        }

        $scope.resetTown = function() {
            $scope.injury = $scope.injuryCost = undefined;
            $scope.goldNeeded = undefined;
            $scope.itemToSell = undefined;
            $scope.itemToBuy = undefined;
            $scope.equippedItemToForge = undefined;
            $scope.bagItemToForge = undefined;
            $scope.perfect = false;
            $scope.forgeCost = 0;
            $scope.townScreen = 'town';
        }

        $scope.canAfford = function(cost) {
            return cost <= play.hero.gold ? true : false;
        }

        function generateItemsForSale() {
            var itemsForSale = [];
            if(play.town.kills < 3) {
                play.town.kills++;
                itemsForSale = play.town.items;
            } else {
                play.town.kills = 0;
                var numberOfItems = 1 + Math.floor(Math.random() * 6);

                for(var i=0; i<numberOfItems; i++) {
                    var level = 1 + Math.floor(Math.random() * play.hero.level),
                        rare = 1 - Math.random() * .8,
                        item = items.getLoot(level, rare, [], true);

                    if(item) itemsForSale.push(item.fingerprint);
                }
            }
            return itemsForSale;
        }
    }
]);

controllers.controller('HeroCtrl', ['$scope', 'items', 'combat',
    function($scope, items, combat) {
        var play = $scope.play;
        $scope.heroScreen = 'stats';

        $scope.buildHero = function() {
            //build inventory items
            play.hero.inventoryItems = items.buildItems(play.hero.inventory);
            //build equipped items
            play.hero.equippedItems = items.buildItems(play.hero.equipped);

            setupEquipped();

            //calculate all stats for the hero
            play.hero = combat.generateHero(play.hero);

            $scope.inventoryWeight = combat.getStatsFromItems(play.hero.inventoryItems, 'weight');

            $scope.save();
        }

        $scope.drinkPotion = function() {
            //remove the health potion from the inventory
            var selectedItemFingerprint = U.removeOne(play.hero.inventory, $scope.selectedToEquip.fingerprint);

            //return hero to full health
            play.hero.currentLife = play.hero.maxLife;

            $scope.buildHero();
            $scope.selectedToEquip = undefined;
            $scope.selectedToBag = undefined;
        }

        //inventory items
        $scope.selectItem = function(item) {
            for(var i=0; i<play.hero.inventoryItems.length; i++) {
                play.hero.inventoryItems[i].selectedToEquip = false;
            }
            item.selectedToEquip = true;
            $scope.selectedToEquip = item;
        }

        $scope.closeItem = function() {
            $scope.selectedToEquip.selectedToEquip = false;
            $scope.selectedToEquip = undefined;
            $scope.selectedToBag = undefined;
        }

        $scope.equipItem = function() {
            //check for item equipped in same slot
            var currentItem = U.findOne(play.hero.equippedItems, 'slot', $scope.selectedToEquip.slot);

            //if there was an item in the slot
            if(currentItem) {
                //remove that item from equipped
                var currentItemFingerprint = U.removeOne(play.hero.equipped, currentItem.fingerprint);
                //add that item to inventory
                play.hero.inventory.push(currentItemFingerprint);
            }

            //remove selected item from inventory
            var selectedItemFingerprint = U.removeOne(play.hero.inventory, $scope.selectedToEquip.fingerprint);
            //add selected item to equipped
            play.hero.equipped.push(selectedItemFingerprint);

            $scope.buildHero();
            $scope.selectedToEquip = undefined;
            $scope.selectedToBag = undefined;
        }

        //equipped items
        $scope.selectEquippedItem = function(item) {
            for(var i=0; i<play.hero.equippedItems.length; i++) {
                play.hero.equippedItems[i].selectedToBag = false;
            }
            
            item.selectedToBag = true;
            $scope.selectedToBag = item;
        }

        $scope.closeEquippedItem = function() {
            $scope.selectedToBag.selectedToBag = false;
            $scope.selectedToBag = undefined;
            $scope.selectedItem = undefined;
        }

        $scope.unequipItem = function() {
            //remove selected item from equipped
            var selectedItemFingerprint = U.removeOne(play.hero.equipped, $scope.selectedToBag.fingerprint);
            //add selected item to equipped
            play.hero.inventory.push(selectedItemFingerprint);

            $scope.buildHero();

            $scope.selectedToBag = undefined;
            $scope.selectedItem = undefined;
        }

        function setupEquipped() {
            $scope.equippedSlots = [
                {
                    empty: true,
                    slot: 'weapon'
                },
                {
                    empty: true,
                    slot: 'chest'
                },
                {
                    empty: true,
                    slot: 'head'
                },
                {
                    empty: true,
                    slot: 'hands'
                },
                {
                    empty: true,
                    slot: 'feet'
                }
            ];

            //loop through equipped items
            //replace empty slots with actual items
            for (var i=0; i<play.hero.equippedItems.length; i++) {
                var item = play.hero.equippedItems[i]
                item.slotName = $scope.equippedSlots[item.slot].slot;
                $scope.equippedSlots[item.slot] = item;
            }
        }
    }
]);

controllers.controller('TravelCtrl', ['$scope', 'spawner',
    function($scope, spawner) {
        var play = $scope.play;
        $scope.tierView = !play.tier;

        $scope.init = function() {
            //loop through all zones
            var numberOfZones = $scope.zones.length;
            for (var i = numberOfZones - 1; i >= 0; i--) {
                var mobs = $scope.zones[i].mobs,
                    numberOfMobs = mobs.length;

                //add ids to mobs
                for (var j = numberOfMobs - 1; j >= 0; j--) {
                    mobs[j].id = j;
                };
            };
        }

        $scope.showTiers = function() {
            $scope.tierView = true;
        }

        $scope.selectTier = function(tier) {
            $scope.play.tier = tier;
            $scope.tierView = false;
        }

        $scope.selectZone = function(zone) {
            for(var i=0; i<$scope.zones.length; i++) {
                $scope.zones[i].selected = false;
            }
            zone.selected = true;
            $scope.selectedZone = zone;
        }

        $scope.cancelZone = function() {
            $scope.selectedZone.selected = false;
            $scope.selectedZone = undefined;
        }

        $scope.travel = function(zone) {
            play.zone = zone;
            play.mobs = spawner.getMobsForZone();
            $scope.setHeader(play.zone.name);

            if(zone.name == 'Town') {
                $scope.showScreen('town');
            } else {
                $scope.showScreen('world');
            }
            
            $scope.tierView = false;
            play.mob = undefined;
            $scope.selectedZone = undefined;
            $scope.save();
        }
    }
]);

controllers.controller('TutorialCtrl', ['$scope',
    function($scope) {
        $scope.tutScreen = 0;

        $scope.back = function() {
            $scope.tutScreen = Math.max(0, $scope.tutScreen - 1);
        }

        $scope.next = function() {
            $scope.tutScreen = Math.min(9, $scope.tutScreen + 1);
        }
    }
]);
