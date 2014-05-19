//items
//use fingerprints like 'i3-q16-4-m5-3'
//item id:      i3
//quality id:   q16
//value:        4
//magic id:     m5
//magic rank:   3
services.value('items', {
    //uses the mob level, rarity, and droppable unique items to see what item if any the mob drops
    //generates a fingerprint, then uses buildItem to return the full item
    //50 mob levels
    getLoot: function(level, rarity, uniques, noPotions) {
        //a number between 0.1 and 1, where 1 guarantees a drop
        var chanceToDrop = 1.2 - rarity;
        
        //roll to see if any loot is dropped
        if(Math.random() < chanceToDrop) {
            //good roll, something is getting dropped!

            //if the mob has uniques, see if one of them drop
            if(uniques.length > 0 && Math.random() + 0.4 < chanceToDrop) {
                //another good roll, drop a unique item
                var unique = uniques[Math.floor(Math.random() * uniques.length)];
                return this.buildItem(unique);
            } else {
                //either a bad roll for uniques or there are no uniques

                //figure out the quality availability based on mob level
                var percent = level / 50;
                //the +2 gives them the chance to get a quality higher than the mob level
                //it also accounts for level 50 weirdness
                var quality = this.qualities[Math.min( Math.floor(Math.random() * (this.qualities.length + 2) * percent), this.qualities.length -1)];
                //the item type
                var type = this.types[Math.floor(Math.random() * this.types.length)];
                //the value
                var value = type.valueMin + Math.floor(Math.random() * (type.valueMax - type.valueMin));
                //the fingerprint
                var fingerprint = type.id + '-' + quality.id + '-' + value;
                
                //check if the item is magic
                if(Math.random() + 0.1 < chanceToDrop) {
                    //yes, a magic item, chose a type at random
                    var magic = this.magics[Math.floor(Math.random() * this.magics.length)];
                    //the magic rank, max of 10
                    var rank = 1 + Math.floor(Math.random() * (10 * percent));

                    fingerprint += '-' + magic.id + '-' + rank;
                }
                //drop the item
                return this.buildItem(fingerprint);
            }
        } else {
            //failed item roll
            //check health potion drop
            if(Math.random() * 1.6 < chanceToDrop && !noPotions) { //DEVNOTE: chanceToDrop
                //dropped health potion
                return this.buildItem('lifePotion');
            } else {
                //dropped nothing
                return null;
            }
        }
    },

    //returns and array of built items
    buildItems: function(fingerprints) {
        var builtItems = [];
        for (var i = fingerprints.length - 1; i >= 0; i--) {
            try {
                var item = this.buildItem(fingerprints[i]);
                builtItems.push(item);
            } catch(e) {
                //console.log('false item!');
            }
        };
        return builtItems;
    },

    //builds and returns an item based on a fingerprint string
    buildItem: function(fingerprint) {
        //item base
        var parts = fingerprint.split('-');
        var item = {
            fingerprint: fingerprint,
            name: '',
            type: '',
            quality: 0,
            value: 0,
            weight: 0,
            worth: 0,
            strength: 0,
            vitality: 0,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: undefined,
            buy: false
        };
        
        //check if it's a life potion
        if(parts.length == 1 && parts[0] == 'lifePotion') {
            return {
                fingerprint: 'lifePotion',
                name: 'Life Potion',
                type: 'lifePotion',
                weight: 0.1,
                worth: 5
            }
        }

        //check if it's a unique item
        if(parts.length == 1 && parts[0].indexOf('u') == 0) {
            var u = U.findOne(this.uniques, 'fingerprint', parts[0]);
            return u;
        }

        //break down of the fingerprint
        var type = U.findOne(this.types, 'id', parts[0]),
            quality = U.findOne(this.qualities, 'id', parts[1]),
            value = Number(parts[2]);

        //base name
        item.name = quality.name + ' ' + type.name;
        item.type = type.name;
        item.class = type.class;
        item.quality = Number(parts[1].substring(1));
        item.weight = type.weight;
        item.slot = type.slot;
        item.value = value;

        //calculate item worth
        item.worth = item.quality + Math.max(type.worth * quality.mod, 1);

        //magic items
        if(parts.length == 5) {
            var magic = U.findOne(this.magics, 'id', parts[3]);
            var rank = Number(parts[4]);
            item.name += ' ' + magic.name;
            item[magic.property] += Math.max(Math.floor(magic.value * rank), 0.1);
            item.worth += 2 * Math.max(quality.mod, 1) * rank;
        }

        //add the quality modifier to the item value
        item.value = Math.max(1, item.value + quality.mod);
        
        return item;
    },

    types: [
        //weapons
        {
            id: 'i0',
            class: 'weapon',
            name: 'sword',
            valueMin: 2,
            valueMax: 5,
            weight: 2,
            worth: 6,
            slot: 0
        },
        {
            id: 'i1',
            class: 'weapon',
            name: 'axe',
            valueMin: 3,
            valueMax: 5,
            weight: 2,
            worth: 6,
            slot: 0
        },
        {
            id: 'i2',
            class: 'weapon',
            name: 'hammer',
            valueMin: 2,
            valueMax: 6,
            weight: 2,
            worth: 5,
            slot: 0
        },
        {
            id: 'i3',
            class: 'weapon',
            name: 'shortblade',
            valueMin: 2,
            valueMax: 3,
            weight: 1,
            worth: 3,
            slot: 0
        },
        {
            id: 'i4',
            class: 'weapon',
            name: 'knuckles',
            valueMin: 1,
            valueMax: 7,
            weight: 1,
            worth: 3,
            slot: 0
        },
        //chest armor
        {
            id: 'i5',
            class: 'armor',
            name: 'shirt',
            valueMin: 3,
            valueMax: 4,
            weight: 1.6,
            worth: 7,
            slot: 1
        },
        {
            id: 'i6',
            class: 'armor',
            name: 'mail',
            valueMin: 5,
            valueMax: 7,
            weight: 2.8,
            worth: 10,
            slot: 1
        },
        {
            id: 'i7',
            class: 'armor',
            name: 'breastplate',
            valueMin: 8,
            valueMax: 10,
            weight: 4,
            worth: 14,
            slot: 1
        },
        //head armor
        {
            id: 'i8',
            class: 'armor',
            name: 'hat',
            valueMin: 2,
            valueMax: 3,
            weight: .5,
            worth: 2,
            slot: 2
        },
        {
            id: 'i9',
            class: 'armor',
            name: 'mask',
            valueMin: 3,
            valueMax: 4,
            weight: 1,
            worth: 4,
            slot: 2
        },
        {
            id: 'i10',
            class: 'armor',
            name: 'helm',
            valueMin: 5,
            valueMax: 8,
            weight: 2,
            worth: 6,
            slot: 2
        },
        //hand armor
        {
            id: 'i11',
            class: 'armor',
            name: 'gloves',
            valueMin: 1,
            valueMax: 2,
            weight: .5,
            worth: 1,
            slot: 3
        },
        {
            id: 'i12',
            class: 'armor',
            name: 'gages',
            valueMin: 2,
            valueMax: 3,
            weight: 1,
            worth: 3,
            slot: 3
        },
        {
            id: 'i13',
            class: 'armor',
            name: 'gauntlets',
            valueMin: 3,
            valueMax: 5,
            weight: 2,
            worth: 5,
            slot: 3
        },
        //foot armor
        {
            id: 'i14',
            class: 'armor',
            name: 'shoes',
            valueMin: 2,
            valueMax: 3,
            weight: .5,
            worth: 4,
            slot: 4
        },
        {
            id: 'i15',
            class: 'armor',
            name: 'boots',
            valueMin: 4,
            valueMax: 6,
            weight: 1,
            worth: 6,
            slot: 4

        },
        {
            id: 'i16',
            class: 'armor',
            name: 'greaves',
            valueMin: 7,
            valueMax: 9,
            weight: 2,
            worth: 10,
            slot: 4
        }
    ],
    //item qualities
    //add to item value and worth
    qualities: [
        {id: 'q0', name: 'broken', mod: -2},
        {id: 'q1', name: 'wasted', mod: -1},
        {id: 'q2', name: 'cracked', mod: 0},
        {id: 'q3', name: 'worn', mod: 1},
        {id: 'q4', name: 'wooden', mod: 2},
        {id: 'q5', name: 'bone', mod: 3},
        {id: 'q6', name: 'rusty', mod: 4},
        {id: 'q7', name: 'worn', mod: 5},
        {id: 'q8', name: 'dull', mod: 6},
        {id: 'q9', name: 'common', mod: 7},
        {id: 'q10', name: 'tarnished', mod: 8},
        {id: 'q11', name: 'bronze', mod: 9},
        {id: 'q12', name: 'iron', mod: 10},
        {id: 'q13', name: 'hardened', mod: 12},
        {id: 'q14', name: 'staunch', mod: 14},
        {id: 'q15', name: 'steel', mod: 16},
        {id: 'q16', name: 'polished', mod: 18},
        {id: 'q17', name: 'fancy', mod: 20},
        {id: 'q18', name: 'blacksteel', mod: 22},
        {id: 'q19', name: 'glowing', mod: 24},
        {id: 'q20', name: 'enchanted', mod: 27},
        {id: 'q21', name: 'mystic', mod: 30},
        {id: 'q22', name: 'blessed', mod: 34},
        {id: 'q23', name: 'perfect', mod: 40}
    ],
    //magic properties
    //each has rank 1-10
    //rank value = rank * value
    //stat bonuses
    //item weight reduction
    //value increase
    //worth increase
    magics: [
        {
            id: 'm0',
            name: 'of brawn',
            property: 'strength',
            value: 5
        },
        {
            id: 'm1',
            name: 'of the guard',
            property: 'vitality',
            value: 5
        },
        {
            id: 'm2',
            name: 'of the thief',
            property: 'agility',
            value: 5
        },
        {
            id: 'm3',
            name: 'of haste',
            property: 'haste',
            value: 1
        },
        {
            id: 'm4',
            name: 'of quality',
            property: 'value',
            value: 1
        },
        {
            id: 'm5',
            name: 'of worth',
            property: 'worth',
            value: 5
        }
    ],

    //two uniques per zone
    //1 weapon, 1 armor
    uniques: [
        //the woods
        {
            fingerprint: 'u0',
            name: 'Gorefather Arm',
            type: 'hammer',
            class: 'weapon',
            value: 8,
            weight: 3.2,
            worth: 32,
            strength: 8,
            vitality: 5,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u1',
            name: 'Thornrippers',
            type: 'gloves',
            class: 'armor',
            value: 6,
            weight: 1,
            worth: 16,
            strength: 0,
            vitality: 0,
            agility: 10,
            maxLife: 0,
            haste: 0,
            slot: 3
        },
        //the ruins
        {
            fingerprint: 'u2',
            name: 'Ruin Piercer',
            type: 'sword',
            class: 'weapon',
            value: 8,
            weight: 1,
            worth: 21,
            strength: 2,
            vitality: 2,
            agility: 6,
            maxLife: 0,
            haste: 1,
            slot: 0
        },
        {
            fingerprint: 'u3',
            name: 'Vinewrap',
            type: 'mask',
            class: 'armor',
            value: 6,
            weight: 2,
            worth: 12,
            strength: 0,
            vitality: 5,
            agility: 0,
            maxLife: 0,
            haste: 1,
            slot: 2
        },
        //crumbling caves
        {
            fingerprint: 'u4',
            name: 'Giant Bat Tooth',
            type: 'shortblade',
            class: 'weapon',
            value: 8,
            weight: 1,
            worth: 13,
            strength: 0,
            vitality: 0,
            agility: 12,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u5',
            name: 'Raw Sandals',
            type: 'shoes',
            class: 'armor',
            value: 7,
            weight: 1,
            worth: 10,
            strength: 10,
            vitality: 10,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: 4
        },
        //darker woods
        {
            fingerprint: 'u6',
            name: 'Pulp Cleaver',
            type: 'axe',
            class: 'weapon',
            value: 11,
            weight: 2,
            worth: 41,
            strength: 6,
            vitality: 10,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u7',
            name: 'Core Bark',
            type: 'shirt',
            class: 'armor',
            value: 14,
            weight: 4,
            worth: 33,
            strength: 0,
            vitality: 16,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: 1
        },
        //the sewers
        {
            fingerprint: 'u8',
            name: 'Pipe Fittings',
            type: 'knuckles',
            class: 'weapon',
            value: 10,
            weight: 1,
            worth: 46,
            strength: 10,
            vitality: 0,
            agility: 10,
            maxLife: 0,
            haste: 1,
            slot: 0
        },
        {
            fingerprint: 'u9',
            name: 'Galoshes',
            type: 'shoes',
            class: 'armor',
            value: 10,
            weight: 1,
            worth: 31,
            strength: 0,
            vitality: 10,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: 4
        },
        //supply yard
        {
            fingerprint: 'u10',
            name: 'Wival Pick',
            type: 'axe',
            class: 'weapon',
            value: 10,
            weight: 2.3,
            worth: 39,
            strength: 6,
            vitality: 0,
            agility: 4,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u11',
            name: 'Handling Mitts',
            type: 'gloves',
            class: 'armor',
            value: 8,
            weight: 1,
            worth: 41,
            strength: 10,
            vitality: 0,
            agility: 5,
            maxLife: 0,
            haste: 0,
            slot: 3
        },
        //savaged jungle
        {
            fingerprint: 'u12',
            name: 'Wirefur Machete',
            type: 'sword',
            class: 'weapon',
            value: 12,
            weight: 2,
            worth: 28,
            strength: 2,
            vitality: 10,
            agility: 2,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u13',
            name: 'Serpent Toes',
            type: 'boots',
            class: 'armor',
            value: 12,
            weight: 1.6,
            worth: 22,
            strength: 0,
            vitality: 4,
            agility: 10,
            maxLife: 0,
            haste: 0,
            slot: 4
        },
        //desperate clearing
        {
            fingerprint: 'u14',
            name: 'Cauldron Maul',
            type: 'hammer',
            class: 'weapon',
            value: 13,
            weight: 3,
            worth: 40,
            strength: 12,
            vitality: 0,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u15',
            name: 'Painted Hide',
            type: 'shirt',
            class: 'armor',
            value: 16,
            weight: 1,
            worth: 34,
            strength: 0,
            vitality: 10,
            agility: 3,
            maxLife: 0,
            haste: 0,
            slot: 1
        },
        //ropewalker mines
        {
            fingerprint: 'u16',
            name: 'Cable Cutter',
            type: 'shortblade',
            class: 'weapon',
            value: 14,
            weight: 1,
            worth: 41,
            strength: 2,
            vitality: 2,
            agility: 2,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u17',
            name: 'Ore Bucket',
            type: 'helm',
            class: 'armor',
            value: 14,
            weight: 2,
            worth: 31,
            strength: 6,
            vitality: 6,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: 2
        },
        //forgotten caves
        {
            fingerprint: 'u18',
            name: 'Spider Bashers',
            type: 'knuckles',
            class: 'weapon',
            value: 14,
            weight: 1,
            worth: 46,
            strength: 10,
            vitality: 0,
            agility: 0,
            maxLife: 0,
            haste: 1,
            slot: 0
        },
        {
            fingerprint: 'u19',
            name: 'Spider Fingers',
            type: 'gages',
            class: 'armor',
            value: 15,
            weight: 1.2,
            worth: 28,
            strength: 0,
            vitality: 10,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: 3
        },
        //the wastes
        {
            fingerprint: 'u20',
            name: 'Fred\'s Axe',
            type: 'axe',
            class: 'weapon',
            value: 15,
            weight: 2.1,
            worth: 40,
            strength: 0,
            vitality: 0,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u21',
            name: 'Sand Stompers',
            type: 'shoes',
            class: 'armor',
            value: 16,
            weight: 1.4,
            worth: 20,
            strength: 0,
            vitality: 0,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: 4
        },
        //trader's path
        {
            fingerprint: 'u22',
            name: 'Bearclaw Blade',
            type: 'sword',
            class: 'weapon',
            value: 13,
            weight: 1,
            worth: 50,
            strength: 10,
            vitality: 10,
            agility: 4,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u23',
            name: 'Bearclaw Chain',
            type: 'mail',
            class: 'armor',
            value: 20,
            weight: 2,
            worth: 46,
            strength: 4,
            vitality: 4,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: 1
        },
        //smuggler tunnels
        {
            fingerprint: 'u24',
            name: 'Knife of the Warden',
            type: 'shortblade',
            class: 'weapon',
            value: 13,
            weight: 1,
            worth: 38,
            strength: 10,
            vitality: 0,
            agility: 10,
            maxLife: 0,
            haste: 1,
            slot: 0
        },
        {
            fingerprint: 'u25',
            name: 'Rat Cap',
            type: 'hat',
            class: 'armor',
            value: 16,
            weight: 1,
            worth: 30,
            strength: 0,
            vitality: 0,
            agility: 16,
            maxLife: 0,
            haste: 2,
            slot: 2
        },
        //valiant quarry
        {
            fingerprint: 'u26',
            name: 'Valiant Sledge',
            type: 'hammer',
            class: 'weapon',
            value: 21,
            weight: 3.2,
            worth: 100,
            strength: 30,
            vitality: 0,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u27',
            name: 'Quarry Hooves',
            type: 'greaves',
            class: 'armor',
            value: 20,
            weight: 2,
            worth: 66,
            strength: 4,
            vitality: 22,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: 4
        },
        //rough sands
        {
            fingerprint: 'u28',
            name: 'Crab Claws',
            type: 'knuckles',
            class: 'weapon',
            value: 6,
            weight: 1.2,
            worth: 10,
            strength: 6,
            vitality: 0,
            agility: 3,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u29',
            name: 'Burrowers',
            type: 'gauntlets',
            class: 'armor',
            value: 8,
            weight: 2,
            worth: 14,
            strength: 0,
            vitality: 8,
            agility: 6,
            maxLife: 0,
            haste: 0,
            slot: 3
        },
        //cracked lands
        {
            fingerprint: 'u30',
            name: 'Kaah Broadsword',
            type: 'sword',
            class: 'weapon',
            value: 7,
            weight: 1.2,
            worth: 16,
            strength: 5,
            vitality: 5,
            agility: 2,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u31',
            name: 'Mange Skin',
            type: 'shirt',
            class: 'armor',
            value: 12,
            weight: 1,
            worth: 12,
            strength: 4,
            vitality: 2,
            agility: 2,
            maxLife: 0,
            haste: 0,
            slot: 1
        },
        //hangman's forest
        {
            fingerprint: 'u32',
            name: 'Ruson\'s Axe',
            type: 'axe',
            class: 'weapon',
            value: 19,
            weight: 3.2,
            worth: 100,
            strength: 4,
            vitality: 20,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u33',
            name: 'Executioner Hood',
            type: 'mask',
            class: 'armor',
            value: 20,
            weight: 1.2,
            worth: 70,
            strength: 15,
            vitality: 0,
            agility: 17,
            maxLife: 0,
            haste: 0,
            slot: 2
        },
        //temple causeway
        {
            fingerprint: 'u34',
            name: 'Sacrificial Blade',
            type: 'shortblade',
            class: 'weapon',
            value: 18,
            weight: 1.1,
            worth: 91,
            strength: 10,
            vitality: 7,
            agility: 7,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u35',
            name: 'Speaker Gloves',
            type: 'gloves',
            class: 'armor',
            value: 20,
            weight: 1.0,
            worth: 40,
            strength: 4,
            vitality: 22,
            agility: 24,
            maxLife: 0,
            haste: 0,
            slot: 3
        },
        //infested fields
        {
            fingerprint: 'u36',
            name: 'Hooked Stinger',
            type: 'sword',
            class: 'weapon',
            value: 19,
            weight: 3.2,
            worth: 52,
            strength: 10,
            vitality: 0,
            agility: 12,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u37',
            name: 'Moth Husks',
            type: 'greaves',
            class: 'armor',
            value: 24,
            weight: 2,
            worth: 60,
            strength: 20,
            vitality: 2,
            agility: 4,
            maxLife: 0,
            haste: 0,
            slot: 4
        },
        //king's path
        {
            fingerprint: 'u38',
            name: 'Marauder Fists',
            type: 'knuckles',
            class: 'weapon',
            value: 18,
            weight: 1,
            worth: 56,
            strength: 30,
            vitality: 5,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u39',
            name: 'Tracker\'s Coat',
            type: 'shirt',
            class: 'armor',
            value: 26,
            weight: 2,
            worth: 66,
            strength: 4,
            vitality: 4,
            agility: 30,
            maxLife: 0,
            haste: 0,
            slot: 1
        },
        //abandoned fair
        {
            fingerprint: 'u40',
            name: 'Strongman Mallet',
            type: 'hammer',
            class: 'weapon',
            value: 7,
            weight: 3,
            worth: 18,
            strength: 7,
            vitality: 3,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u41',
            name: 'Dire Mask',
            type: 'mask',
            class: 'armor',
            value: 12,
            weight: 2,
            worth: 16,
            strength: 4,
            vitality: 8,
            agility: 0,
            maxLife: 0,
            haste: 2,
            slot: 2
        },
        //smuggler's den
        {
            fingerprint: 'u42',
            name: 'Prowler Axe',
            type: 'axe',
            class: 'weapon',
            value: 19,
            weight: 2.1,
            worth: 47,
            strength: 0,
            vitality: 21,
            agility: 12,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u43',
            name: 'Bully Hands',
            type: 'gages',
            class: 'armor',
            value: 28,
            weight: 2,
            worth: 50,
            strength: 12,
            vitality: 12,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: 3
        },
        //deadgrass hills
        {
            fingerprint: 'u44',
            name: 'Fossil Blade',
            type: 'shortblade',
            class: 'weapon',
            value: 18,
            weight: 1,
            worth: 44,
            strength: 2,
            vitality: 6,
            agility: 10,
            maxLife: 0,
            haste: 1,
            slot: 0
        },
        {
            fingerprint: 'u45',
            name: 'Woven Toe Shoe',
            type: 'shoes',
            class: 'armor',
            value: 21,
            weight: 1.2,
            worth: 46,
            strength: 8,
            vitality: 6,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: 4
        },
        //valiant mine
        {
            fingerprint: 'u46',
            name: 'Broad Faced Pick',
            type: 'axe',
            class: 'weapon',
            value: 18,
            weight: 2,
            worth: 48,
            strength: 9,
            vitality: 12,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u47',
            name: 'Ape Vest',
            type: 'mail',
            class: 'armor',
            value: 26,
            weight: 2.8,
            worth: 50,
            strength: 8,
            vitality: 7,
            agility: 2,
            maxLife: 0,
            haste: 0,
            slot: 1
        },
        //tourn's path
        {
            fingerprint: 'u48',
            name: 'Brainsaw Edge',
            type: 'sword',
            class: 'weapon',
            value: 24,
            weight: 2.2,
            worth: 71,
            strength: 4,
            vitality: 22,
            agility: 10,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u49',
            name: 'Thick Murk Bucket',
            type: 'helm',
            class: 'armor',
            value: 33,
            weight: 2.1,
            worth: 66,
            strength: 8,
            vitality: 8,
            agility: 8,
            maxLife: 0,
            haste: 0,
            slot: 2
        },
        //mud baths
        {
            fingerprint: 'u50',
            name: 'Sunken Punchers',
            type: 'knuckles',
            class: 'weapon',
            value: 23,
            weight: 1.2,
            worth: 50,
            strength: 10,
            vitality: 2,
            agility: 1,
            maxLife: 0,
            haste: 1,
            slot: 0
        },
        {
            fingerprint: 'u51',
            name: 'Shovel Gloves',
            type: 'gloves',
            class: 'armor',
            value: 30,
            weight: 2,
            worth: 36,
            strength: 12,
            vitality: 8,
            agility: 2,
            maxLife: 0,
            haste: 0,
            slot: 3
        },
        //black cliffs
        {
            fingerprint: 'u52',
            name: 'Axe of Uru',
            type: 'axe',
            class: 'weapon',
            value: 25,
            weight: 3,
            worth: 82,
            strength: 14,
            vitality: 12,
            agility: 10,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u53',
            name: 'Climber Shoes',
            type: 'shoes',
            class: 'armor',
            value: 32,
            weight: 2,
            worth: 70,
            strength: 10,
            vitality: 0,
            agility: 14,
            maxLife: 0,
            haste: 0,
            slot: 4
        },
        //chainrunner mines
        {
            fingerprint: 'u54',
            name: 'Filthy Old Shank',
            type: 'shortblade',
            class: 'weapon',
            value: 24,
            weight: 1.1,
            worth: 40,
            strength: 14,
            vitality: 0,
            agility: 0,
            maxLife: 0,
            haste: 1,
            slot: 0
        },
        {
            fingerprint: 'u55',
            name: 'Blackgut Bulk',
            type: 'breastplate',
            class: 'armor',
            value: 36,
            weight: 4,
            worth: 86,
            strength: 4,
            vitality: 18,
            agility: 2,
            maxLife: 0,
            haste: 0,
            slot: 1
        },
        //river wilds
        {
            fingerprint: 'u56',
            name: 'Thumbfoot Maul',
            type: 'hammer',
            class: 'weapon',
            value: 8,
            weight: 3,
            worth: 15,
            strength: 6,
            vitality: 3,
            agility: 3,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u57',
            name: 'Cap of Green Mist',
            type: 'hat',
            class: 'armor',
            value: 10,
            weight: 2,
            worth: 14,
            strength: 0,
            vitality: 4,
            agility: 6,
            maxLife: 0,
            haste: 0,
            slot: 2
        },
        //tower yard
        {
            fingerprint: 'u58',
            name: 'Sword of the Watch',
            type: 'sword',
            class: 'weapon',
            value: 25,
            weight: 2,
            worth: 88,
            strength: 6,
            vitality: 6,
            agility: 16,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u59',
            name: 'Keeper\'s Mitts',
            type: 'gauntlets',
            class: 'armor',
            value: 32,
            weight: 2,
            worth: 73,
            strength: 10,
            vitality: 8,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: 3
        },
        //old battlegrounds
        {
            fingerprint: 'u60',
            name: 'The Undercleaver',
            type: 'axe',
            class: 'weapon',
            value: 24,
            weight: 2.6,
            worth: 80,
            strength: 11,
            vitality: 9,
            agility: 4,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u61',
            name: 'War Marchers',
            type: 'greaves',
            class: 'armor',
            value: 34,
            weight: 2.2,
            worth: 76,
            strength: 4,
            vitality: 17,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: 4
        },
        //rogue's paradise
        {
            fingerprint: 'u62',
            name: 'Cheekmashers',
            type: 'knuckles',
            class: 'weapon',
            value: 15,
            weight: 2,
            worth: 31,
            strength: 7,
            vitality: 0,
            agility: 7,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u63',
            name: 'Haven Leathers',
            type: 'shirt',
            class: 'armor',
            value: 17,
            weight: 2,
            worth: 30,
            strength: 3,
            vitality: 2,
            agility: 7,
            maxLife: 0,
            haste: 0,
            slot: 1
        },
        //lurker caverns
        {
            fingerprint: 'u64',
            name: 'Wicked Spike',
            type: 'shortblade',
            class: 'weapon',
            value: 21,
            weight: 2,
            worth: 66,
            strength: 4,
            vitality: 2,
            agility: 20,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u65',
            name: 'Explorer Cap',
            type: 'helm',
            class: 'armor',
            value: 29,
            weight: 2,
            worth: 68,
            strength: 4,
            vitality: 2,
            agility: 8,
            maxLife: 0,
            haste: 0,
            slot: 2
        },
        //plagued meadow
        {
            fingerprint: 'u66',
            name: 'Red Blade of Woe',
            type: 'sword',
            class: 'weapon',
            value: 10,
            weight: 2.2,
            worth: 14,
            strength: 4,
            vitality: 6,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u67',
            name: 'Harbinger Grasp',
            type: 'gagues',
            class: 'armor',
            value: 13,
            weight: 1.7,
            worth: 17,
            strength: 4,
            vitality: 6,
            agility: 2,
            maxLife: 0,
            haste: 1,
            slot: 3
        },
        //stink mountain
        {
            fingerprint: 'u68',
            name: 'Carcass Carver',
            type: 'axe',
            class: 'weapon',
            value: 25,
            weight: 2,
            worth: 91,
            strength: 20,
            vitality: 2,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u69',
            name: 'Stink Walkers',
            type: 'boots',
            class: 'armor',
            value: 34,
            weight: 2,
            worth: 70,
            strength: 4,
            vitality: 2,
            agility: 15,
            maxLife: 0,
            haste: 0,
            slot: 4
        },
        //sickly swamp
        {
            fingerprint: 'u70',
            name: 'Goblin Crusher',
            type: 'hammer',
            class: 'weapon',
            value: 34,
            weight: 3.2,
            worth: 110,
            strength: 10,
            vitality: 2,
            agility: 3,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u71',
            name: 'Robes of Rot',
            type: 'shirt',
            class: 'armor',
            value: 50,
            weight: 2,
            worth: 104,
            strength: 4,
            vitality: 22,
            agility: 2,
            maxLife: 0,
            haste: 0,
            slot: 1
        },
        //buried cavern
        {
            fingerprint: 'u72',
            name: 'Slag Bone Dusters',
            type: 'knuckles',
            class: 'weapon',
            value: 11,
            weight: 2,
            worth: 20,
            strength: 4,
            vitality: 6,
            agility: 4,
            maxLife: 0,
            haste: 2,
            slot: 0
        },
        {
            fingerprint: 'u73',
            name: 'The Slag Crown',
            type: 'helm',
            class: 'armor',
            value: 12,
            weight: 2,
            worth: 16,
            strength: 4,
            vitality: 4,
            agility: 4,
            maxLife: 0,
            haste: 0,
            slot: 2
        },
        //hunger's keep
        {
            fingerprint: 'u74',
            name: 'Black Stone Cutlass',
            type: 'sword',
            class: 'weapon',
            value: 39,
            weight: 2,
            worth: 112,
            strength: 0,
            vitality: 12,
            agility: 14,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u75',
            name: 'Grip of Hunger',
            type: 'gloves',
            class: 'armor',
            value: 40,
            weight: 2,
            worth: 90,
            strength: 12,
            vitality: 0,
            agility: 12,
            maxLife: 0,
            haste: 0,
            slot: 3
        },
        //blind caverns
        {
            fingerprint: 'u76',
            name: 'Claws of the Blind',
            type: 'knuckles',
            class: 'weapon',
            value: 38,
            weight: 2,
            worth: 102,
            strength: 10,
            vitality: 10,
            agility: 0,
            maxLife: 0,
            haste: 1,
            slot: 0
        },
        {
            fingerprint: 'u77',
            name: 'Whiteskin Sloshes',
            type: 'shoes',
            class: 'armor',
            value: 38,
            weight: 2,
            worth: 98,
            strength: 4,
            vitality: 18,
            agility: 6,
            maxLife: 0,
            haste: 0,
            slot: 4
        },
        //pits of the taken
        {
            fingerprint: 'u78',
            name: 'Deep Fire Hatchet',
            type: 'axe',
            class: 'weapon',
            value: 40,
            weight: 2.8,
            worth: 110,
            strength: 3,
            vitality: 14,
            agility: 9,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u79',
            name: 'Scarred Chest',
            type: 'mail',
            class: 'armor',
            value: 46,
            weight: 2,
            worth: 104,
            strength: 16,
            vitality: 8,
            agility: 8,
            maxLife: 0,
            haste: 0,
            slot: 1
        },
        //diseased trench
        {
            fingerprint: 'u80',
            name: 'Field Surgeons Knife',
            type: 'shortblade',
            class: 'weapon',
            value: 36,
            weight: 2,
            worth: 98,
            strength: 4,
            vitality: 13,
            agility: 4,
            maxLife: 0,
            haste: 1,
            slot: 0
        },
        {
            fingerprint: 'u81',
            name: 'Trench Top',
            type: 'helm',
            class: 'armor',
            value: 40,
            weight: 2,
            worth: 88,
            strength: 7,
            vitality: 7,
            agility: 12,
            maxLife: 0,
            haste: 0,
            slot: 2
        },
        //cursed village
        {
            fingerprint: 'u82',
            name: 'Mold Hold Hammer',
            type: 'hammmer',
            class: 'weapon',
            value: 39,
            weight: 4,
            worth: 95,
            strength: 10,
            vitality: 3,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u83',
            name: 'Wire Laced Gloves',
            type: 'gloves',
            class: 'armor',
            value: 39,
            weight: 1,
            worth: 87,
            strength: 9,
            vitality: 9,
            agility: 3,
            maxLife: 0,
            haste: 0,
            slot: 3
        },
        //rawrock forest
        {
            fingerprint: 'u84',
            name: 'Old Stone Axe',
            type: 'axe',
            class: 'weapon',
            value: 40,
            weight: 2,
            worth: 112,
            strength: 4,
            vitality: 4,
            agility: 4,
            maxLife: 0,
            haste: 1,
            slot: 0
        },
        {
            fingerprint: 'u85',
            name: 'Vulture Feet',
            type: 'boots',
            class: 'armor',
            value: 36,
            weight: 1.7,
            worth: 55,
            strength: 7,
            vitality: 2,
            agility: 18,
            maxLife: 0,
            haste: 0,
            slot: 4
        },
        //viper pits
        {
            fingerprint: 'u86',
            name: 'Chauffer\'s Fang',
            type: 'shortblade',
            class: 'weapon',
            value: 38,
            weight: 1.2,
            worth: 99,
            strength: 10,
            vitality: 10,
            agility: 7,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u87',
            name: 'Vile Scaled Tunic',
            type: 'mail',
            class: 'armor',
            value: 48,
            weight: 3,
            worth: 86,
            strength: 16,
            vitality: 9,
            agility: 2,
            maxLife: 0,
            haste: 0,
            slot: 1
        },
        //altar of the cursed
        {
            fingerprint: 'u88',
            name: 'Blackshadow Steel',
            type: 'sword',
            class: 'weapon',
            value: 50,
            weight: 1.9,
            worth: 144,
            strength: 10,
            vitality: 0,
            agility: 20,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u89',
            name: 'Living Helm',
            type: 'helm',
            class: 'armor',
            value: 54,
            weight: 2.6,
            worth: 137,
            strength: 4,
            vitality: 22,
            agility: 6,
            maxLife: 0,
            haste: 0,
            slot: 2
        },
        //the besieged altar
        {
            fingerprint: 'u90',
            name: 'Misused Smithy Hammer',
            type: 'hammer',
            class: 'weapon',
            value: 49,
            weight: 3.4,
            worth: 128,
            strength: 20,
            vitality: 0,
            agility: 0,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u91',
            name: 'Mits of Maddness',
            type: 'gages',
            class: 'armor',
            value: 51,
            weight: 2,
            worth: 119,
            strength: 4,
            vitality: 12,
            agility: 12,
            maxLife: 0,
            haste: 0,
            slot: 3
        },
        //altar of cloaks
        {
            fingerprint: 'u92',
            name: 'Hidden Rings',
            type: 'knuckles',
            class: 'weapon',
            value: 46,
            weight: 1,
            worth: 102,
            strength: 10,
            vitality: 10,
            agility: 16,
            maxLife: 0,
            haste: 1,
            slot: 0
        },
        {
            fingerprint: 'u93',
            name: 'Feet of Khilinni',
            type: 'shoes',
            class: 'armor',
            value: 44,
            weight: 2,
            worth: 140,
            strength: 10,
            vitality: 22,
            agility: 20,
            maxLife: 0,
            haste: 0,
            slot: 4
        },
        //altar of the minotaur
        {
            fingerprint: 'u94',
            name: 'Minotaur Axe',
            type: 'axe',
            class: 'weapon',
            value: 50,
            weight: 2.8,
            worth: 132,
            strength: 10,
            vitality: 14,
            agility: 10,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u95',
            name: 'Cage of Roong',
            type: 'breastplate',
            class: 'armor',
            value: 60,
            weight: 3.6,
            worth: 140,
            strength: 14,
            vitality: 2,
            agility: 2,
            maxLife: 0,
            haste: 0,
            slot: 1
        },
        //stone cult altar
        {
            fingerprint: 'u96',
            name: 'Obsidian File',
            type: 'shortblade',
            class: 'weapon',
            value: 46,
            weight: 1.1,
            worth: 127,
            strength: 0,
            vitality: 20,
            agility: 15,
            maxLife: 0,
            haste: 0,
            slot: 0
        },
        {
            fingerprint: 'u97',
            name: 'Fable Rock Hood',
            type: 'hat',
            class: 'armor',
            value: 47,
            weight: 2,
            worth: 113,
            strength: 8,
            vitality: 12,
            agility: 8,
            maxLife: 0,
            haste: 0,
            slot: 2
        },
        //tourn's altar
        {
            fingerprint: 'u98',
            name: 'Sword of Tourn',
            type: 'sword',
            class: 'weapon',
            value: 55,
            weight: 1,
            worth: 162,
            strength: 10,
            vitality: 10,
            agility: 10,
            maxLife: 0,
            haste: 1,
            slot: 0
        },
        {
            fingerprint: 'u99',
            name: 'Bloodied Hands',
            type: 'gauntlets',
            class: 'armor',
            value: 52,
            weight: 2,
            worth: 150,
            strength: 6,
            vitality: 22,
            agility: 8,
            maxLife: 0,
            haste: 0,
            slot: 3
        }
    ]
});