services.value('tiers', [
    {
        tier: 0,
        name: 'Common Grounds',
        min: 1,
        max: 5,
        zones: []   
    },
    {
        tier: 1,
        name: 'Bottom Rungs',
        min: 5,
        max: 12,
        zones: []   
    },
    {
        tier: 2,
        name: 'Outer Malice',
        min: 8,
        max: 18,
        zones: []   
    },
    {
        tier: 3,
        name: 'Loster Lay',
        min: 14,
        max: 28,
        zones: []   
    },
    {
        tier: 4,
        name: 'Farr Rot',
        min: 20,
        max: 33,
        zones: []   
    },
    {
        tier: 5,
        name: 'Sodden Mires',
        min: 30,
        max: 40,
        zones: []   
    },
    {
        tier: 6,
        name: 'The Altars',
        min: 40,
        max: 55,
        zones: []   
    }
]);

//zones
services.value('zones', [
    {
        id: 'town',
        tier: 'town',
        name: 'Town',
        desc: 'Head back to town to buy and sell items - rest up and tend to your wounds',
        mobs: []
    },
    {
        id: 'z0',
        tier: 0,
        name: 'The Woods',
        desc: 'Sparse trees thick with leaves tower over green brush on the moss covered floor',
        mobs: [
            {name: 'Dire Bandit', desc: 'A down on his luck thief of the lowest order', level: 1, rare: 1}, //DEVNOTE: rare should be 1
            {name: 'Hedge Witch', desc: 'A haggard old wench of a witch', level: 1, rare: 0.7},
            {name: 'Hedge Poisoner', desc: 'A dirty old rogue with a lust for vile potions', level: 2, rare: 0.9},
            {name: 'Craven', desc: 'Cloaked in grimy cloth, this wretched being risks little while preying on the weak', level: 3, rare: 1},
            {name: 'Craven Netter', desc: 'Not wanting to risk his worthless life, this trapper takes what he can', level: 4, rare: 0.7},
            {name: 'Mangle Mane', desc: 'This wolf hunts without a pack, and seems better for it', level: 4, rare: 0.6},
            {name: 'Gorefather', desc: 'The outcast in the thicket, a misshapen giant who only knows how to hate', level: 5, rare: 0.1, uniques: ['u0']},
            {name: 'Sliverfoot', desc: 'The bandit champion who\'s name became legend before he reached a decade in age', level: 9, rare: 0.05, uniques: ['u1']}
        ]
    },
    {
        id: 'z1',
        tier: 0,
        name: 'The Ruins',
        desc: 'An ancient wreck of a forgotten city, on the steps of which Town was built',
        mobs: [
            {name: 'Outcast Scamp', desc: 'Skittering low to the ground, these cautious rodents of men think only of their next meal', level: 1, rare: 1},
            {name: 'Outcast Trundler', desc: 'A three legged mutant vermin who feeds on his own kind', level: 1, rare: 0.8},
            {name: 'Ruin Creeper', desc: 'Small and humanoid in appearance, these dodgy beings seek anything with a shine', level: 1, rare: 1},
            {name: 'Ruin Rebel', desc: 'After the fall of the King, those responsible for the collapse rarely prospered', level: 2, rare: 1},
            {name: 'Scavanger', desc: 'With nothing left to lose these men hunt for treasure where there is none', level: 1, rare: 1},
            {name: 'Firespitter', desc: 'A native beast of these lands, this lizard can singe the most seasoned warrior', level: 3, rare: 0.6},
            {name: 'Tangle the Climber', desc: 'He made a name for himself where there was little competition, but beware', level: 4, rare: 0.04, uniques: ['u2', 'u3']}
        ]
    },
    {
        id: 'z2',
        tier: 0,
        name: 'Crumbling caves',
        desc: 'A barren stone pit marks the entrance of these dingy caverns',
        mobs: [ 
            {name: 'Graytooth', desc: 'An old man soon to sink into the stone', level: 1, rare: 1},
            {name: 'Rawfinger', desc: 'Years of darkness have given these fiends supernatural touch', level: 2, rare: 1},
            {name: 'Bloodcooker', desc: 'These monsters have an infatuation with meat and fire', level: 2, rare: 1},
            {name: 'Batrot Carrier', desc: 'Half human half bat, these terrors lurk in most shallow caves', level: 3, rare: 1},
            {name: 'Batrot Infected', desc: 'Afflicted with some disease these cross species are easily pushed into rage', level: 3, rare: 1},
            {name: 'Batrot Brainwreck', desc: 'Eternal darkness rots the human part of these normally nocturnal pests', level: 3, rare: 1},
            {name: 'Batrot Lost', desc: 'Wandering the dark in search of daylight, these winged beasts never rest', level: 4, rare: 1},
            {name: 'Batrot Double Strain', desc: 'A misstep of nature who got all the best from man and beast', level: 5, rare: 0.1, uniques: ['u4']},
            {name: 'Graytooth Giant', desc: 'Years of isolation have turned this mass of flesh into a monster', level: 6, rare: 0.04, uniques: ['u4', 'u5']}
        ]
    },
    {
        id: 'z12',
        tier: 0,
        name: 'Rough Sands',
        desc: 'It once was a sea port, but sorcery has turned it to burnt sand',
        mobs: [
            {name: 'Drifter', desc: 'He has few clothes and fewer brain cells', level:1, rare: 1},
            {name: 'Treasurer', desc: 'They are convinced something is buried out here', level:2, rare: 1},
            {name: 'Wrecked Chainbearer', desc: 'They still have the ship\'s shackles on', level:3, rare: 1},
            {name: 'Shore Hunter', desc: 'They used to fish with spears, now they hunt', level:4, rare: 1},
            {name: 'Crab Hand', desc: 'A cross species revealed from the deep', level:4, rare: 0.9},
            {name: 'Carrion Gull', desc: 'A giant bird with an iron beak', level:6, rare: 0.6},
            {name: 'Sand Burrower', desc: 'They lay in wait, buried in the sand', level:7, rare: 0.2, uniques: ['u28', 'u29']}
        ]
    },
    {
        id: 'z13',
        tier: 0,
        name: 'Cracked Lands',
        desc: 'Parched earth as far as the eye can see',
        mobs: [
            {name: 'Tunneler', desc: 'A brown robed ground dweller', level:1, rare: 1},
            {name: 'Kaah Maraurder', desc: 'They swarm the sand dunes searching for caravans', level:2, rare: 1},
            {name: 'Kaah Corrupter', desc: 'The bright sun overhead belies the nature of these foul conjurers', level:2, rare: 1},
            {name: 'Kaah Wielder', desc: 'Coveted magic wielders of the sands', level:2, rare: 1},
            {name: 'Kaah Axmen', desc: 'Simple bandits, they deliver a death any man can understand', level:3, rare: 1},
            {name: 'Red Burrower', desc: 'An intelligent lizard beast who tracks prey by vibration', level:5, rare: 0.3, uniques: ['u31']},
            {name: 'Disintegrated', desc: 'A walking heap of bones held together by dried blood', level:5, rare: 0.2, uniques: ['u30']},
            {name: 'Mange Hound', desc: 'A self proclaimed king on four legs', level:6, rare: 0.1, uniques: ['u30']}
        ]
    },
    {
        id: 'z18',
        tier: 0,
        name: 'Abandoned Fair',
        desc: 'Once a gem in the land, now a ghastly show of horrors',
        mobs: [
            {name: 'Ticket Taker', desc: 'Striped clothes, a top hat, and teeth like knives', level:2, rare: 1},
            {name: 'Wooden Pony Man', desc: 'Beware this crazy kicking mule of a man', level:2, rare: 1},
            {name: 'Mallet Worker', desc: 'Armed with a hammer of iron, test your strength if you dare', level:2, rare: 1},
            {name: 'Fairworker', desc: 'In charge of keeping the general disorder', level:3, rare: 1},
            {name: 'Cutpurse', desc: 'Anywhere with a crowd will have these foul rogues', level:3, rare: 1},
            {name: 'Casketeer', desc: 'They will have a coffin ready for you', level:4, rare: 1},
            {name: 'Knife Thrower', desc: 'He put his skills to good use since the fall', level:4, rare: 0.8},
            {name: 'Axe Thrower', desc: 'A man of singular talent, but it works for him', level:5, rare: 0.6},
            {name: 'Rope Walker', desc: 'Keep one eye up throughout these grounds', level:5, rare: 0.4},
            {name: 'Tumbling Fool', desc: 'Infuriating athleticism keeps these slight fools alive', level:6, rare: 0.2, uniques: ['u40']},
            {name: 'Dire Fool', desc: 'A mystery even among the fair folk', level:6, rare: 0.2, uniques: ['u41']}
        ]
    },
    {
        id: 'z3',
        tier: 1,
        name: 'Darker Woods',
        desc: 'The trunks and vines thicken blocking out most light',
        mobs: [
            {name: 'Ironwood Bandit', desc: 'A hard life has lead these rogues to a life of crime', level: 3, rare: 1},
            {name: 'Ironwood Blade', desc: 'Suited to guardsman, these fighters itch to redden their swords', level: 4, rare: 1},
            {name: 'Ironwood Mender', desc: 'These medics are just as skilled in the art of ending life as they are in saving it', level: 5, rare: 1},
            {name: 'Bark Eater', desc: 'These poor souls were driven to madness but are now quite happy eating wood', level: 5, rare: 1},
            {name: 'Noct', desc: 'A vicious tree lurker, they descend at night to feed on the wandering weak', level: 7, rare: 0.6},
            {name: 'Korviss', desc: 'He was banished from the Ironwood for challenging Darling, now he walks the woods alone', level: 8, rare: 0.3},
            {name: 'Rootwalker', desc: 'Some ancient magic animates these trees', level: 5, rare: 1},
            {name: 'Darling Black', desc: 'Leader of the Ironwood, seldom seen except in the heat of battle', level: 11, rare: 0.1, uniques: ['u6', 'u7']}
        ]
    },
    {
        id: 'z3a',
        tier: 1,
        name: 'The Sewers',
        desc: 'A stench of filth from another age rises in visible fumes from the muck covered floor',
        mobs: [
            {name: 'Rotting Man', desc: 'Too many days in the sewer have taken a horrible toll on their flesh', level: 3, rare: 1},
            {name: 'Vermin Thrower', desc: 'A filthy cur who flings the bodies of dead rats to stun intruders', level: 3, rare: 1},
            {name: 'Drain Guard', desc: 'These guards seek to keep stragglers in, not out', level: 4, rare: 1},
            {name: 'Mutant', desc: 'There are an infinite variety of misshapen horrors lurking in the shadowed corners', level: 5, rare: 1},
            {name: 'Gory Mutant', desc: 'The bodily harm suffered by these freaks has multiplied their hostility', level: 6, rare: 0.8},
            {name: 'Vermin Lancer', desc: 'These rat men fancy themselves warriors', level: 6, rare: 0.6},
            {name: 'Bubbleskin', desc: 'A particularly vicious mutant who stores parts of victims in clear bubbles on it\'s skin', level: 9, rare: 0.2, uniques: ['u9']},
            {name: 'Vermin Lord', desc: 'Born in the sewers, this beast of a man is very territorial', level: 11, rare: 0.1, uniques: ['u8', 'u9']}
        ]
    },
    {
        id: 'z4',
        tier: 1,
        name: 'Supply Yard',
        desc: 'A vast maze of old crates and barrels which were abandoned soon after trade dried up',
        mobs: [
            {name: 'Crate Inhabitant', desc: 'Always hungry and liable to attack anyone who come close to his boxy home', level: 4, rare: 1},
            {name: 'Crate Hauler', desc: 'Perhaps they used to work here, perhaps they just like keeping busy', level: 4, rare: 1},
            {name: 'Plank Warrior', desc: 'Capable fighters, these curs fashion splintery swords from the cargo crates', level: 5, rare: 1},
            {name: 'Alley Shanker', desc: 'Hidden amongst the nooks and crannies these rogues wait for passers by', level: 5, rare: 1},
            {name: 'Tattooed Crewman', desc: 'Abandoned with their last shipment, these sea dogs are quick to a fight', level: 6, rare: 0.8},
            {name: 'Tattooed Captain', desc: 'A leader of men on the sea now a leader of nothing on the docks', level: 7, rare: 0.6},
            {name: 'Hookhand', desc: 'An accident at the loading bay led this pirate to a life of murder even before the kingdom fell', level: 8, rare: 0.1, uniques: ['u11']},
            {name: 'Pegleg Prince', desc: 'Artful and cunning, this young scalawag has a the commanding presence needed to run the yard', level: 9, rare: 0.03, uniques: ['u10']}
        ]
    },
    {
        id: 'z5',
        tier: 1,
        name: 'Savaged Jungle',
        desc: 'A primal energy emanates from every root, branch, and beast',
        mobs: [
            {name: 'Living Vine', desc: 'Quicker than a viper this vegetation feeds on live flesh', level: 4, rare: 1},
            {name: 'Wirefur Savage', desc: 'An ape man of fearful intelligence and limbs like steal', level: 5, rare: 1},
            {name: 'Wirefur Climber', desc: 'These apes are likely to get the drop on you from above', level: 6, rare: 1},
            {name: 'Green Caller', desc: 'A native of the dark growth, the jungle is on their side', level: 6, rare: 1},
            {name: 'Green Claw', desc: 'These natives craft lethal poisons made from secret flowers found deep in the jungle', level: 7, rare: 1},
            {name: 'Serpent Herder', desc: 'A humanoid snake who commands his lesser kin', level: 8, rare: 1},
            {name: 'Pit Builder', desc: 'An outcast of men who has made a life for himself within the tangled trees', level: 8, rare: 0.4, uniques: ['u13']},
            {name: 'Red Jaws', desc: 'Champion of the Green natives, who feeds so often on raw meat his face is always dripping red', level: 10, rare: 0.3, uniques: ['u12']},
            {name: 'Tree Crusher', desc: 'An ancient ape from ages past, huge and silent and angry', level: 11, rare: 0.1, uniques: ['u12', 'u13']}
        ]
    },
    {
        id: 'z26',
        tier: 1,
        name: 'River Wilds',
        desc: 'Shrouded by mists from the river this green sanctuary is truly wild',
        mobs: [
            {name: 'Thumbfoot Barker', desc: 'Monkey man with a loud mouth', level:5, rare: 1},
            {name: 'Thumbfoot Rootraiser', desc: 'This ape rips saplings from the earth for fun', level:6, rare: 1},
            {name: 'Thumbfoot Mauler', desc: 'The warrior monkeys who mostly fight each other', level:6, rare: 1},
            {name: 'Tree Dropper', desc: 'Wild gray men who chop trees with crude stone tools', level:6, rare: 1},
            {name: 'Tree Binder', desc: 'They lash trees into traps', level:7, rare: 1},
            {name: 'Current Caller', desc: 'On the banks of the river these shamans speak', level:7, rare: 0.7},
            {name: 'Riverspear', desc: 'Quick swimmers require a quicker lance to catch', level:8, rare: 0.7},
            {name: 'Skullwasher', desc: 'Obsessed with trophies, these apes save skulls of their food', level:10, rare: 0.5},
            {name: 'Boneskin Diver', desc: 'Divers who\'s skin resembles cracked bone', level:12, rare: 0.1, uniques: ['u56']},
            {name: 'Thumbfoot Alpha', desc: 'Giant males who claim', level:12, rare: 0.3, uniques: ['u57']}
        ]
    },
    {
        id: 'z34',
        tier: 1,
        name: 'Buried Cavern',
        desc: 'Only a small hole leads in and out',
        mobs: [
            {name: 'Living Stone', desc: 'Moving slabs of jagged rock', level:5, rare: 1},
            {name: 'Tentacles', desc: 'They cling to the ceiling to snag food below', level:5, rare: 1},
            {name: 'Regretful', desc: 'Outcast from slag, they ponder their mistakes', level:6, rare: 1},
            {name: 'Slag Razor', desc: 'Slinking in the corridors', level:6, rare: 0.8},
            {name: 'Slag Thumper', desc: 'They stand in doors eying all who pass', level:8, rare: 0.7},
            {name: 'Slag Wrestler', desc: 'Champions of raw pit fights', level:9, rare: 0.5},
            {name: 'Slag Boiler', desc: 'The cook', level:10, rare: 0.3, uniques: ['u73']},
            {name: 'The Slag King', desc: 'A man as hard as the walls he lives in', level:12, rare: 0.1, uniques: ['u72', 'u73']}
        ]
    },
    {
        id: 'z31',
        tier: 1,
        name: 'Plagued Meadow',
        desc: 'An old grazing pasture riddled with and unknown disease',
        mobs: [
            {name: 'Redflesh Walker', desc: 'A farmer succumbing to death', level:5, rare: 1},
            {name: 'Redflesh Clubber', desc: 'Scarred flesh stable-hand with a club', level:6, rare: 1},
            {name: 'Redflesh Dragger', desc: 'They haul carcasses to and fro', level:7, rare: 1},
            {name: 'Redmarrow Howler', desc: 'With rot down to the bone they cry in pain', level:8, rare: 1},
            {name: 'Redmarrow Piercer', desc: 'Lost hands gives way to sharpened forearms', level:9, rare: 1},
            {name: 'Caravan Shield', desc: 'Grunts protecting the carriages', level:9, rare: 0.8},
            {name: 'Caravan Ward', desc: 'Inside veiled carriages sit these figures of renown', level:10, rare: 0.8},
            {name: 'Caravan Sentinel', desc: 'They lead the procession through the fetid grass', level:11, rare: 0.4},
            {name: 'Plaged Escort', desc: 'They used to belong to a caravan', level:11, rare: 0.3, uniques: ['u67']},
            {name: 'Plaged Broadblade', desc: 'Before the sickness took them their skill was legend', level:12, rare: 0.3, uniques: ['u66']}
        ]
    },
    {
        id: 'z',
        tier: 2,
        name: 'Desperate Clearing',
        desc: 'A vast and unnatural clearing surrounded by thick old trunks and vines',
        mobs: [
            {name: 'Hut Dweller', desc: 'A plains tribesman who is too old and bitter to continue the hunt', level:9, rare: 1},
            {name: 'Cauldron Tender', desc: 'Busy brewing the poisons the hunters use', level:9, rare: 1},
            {name: 'Pedestal Priest', desc: 'A holy spiritcaller who has a preternatural connection to the plain and surrounding jungle', level:10, rare: 1},
            {name: 'Pedestal Guard', desc: 'A prestigious position in the tribe, these honored warriors guard the priests', level:11, rare: 1},
            {name: 'Manhunter', desc: 'A veteran hunter, his spear is an extension of himself', level:13, rare: 1},
            {name: 'Blood Shaman', desc: 'These grim eyed throat chanters possess a darker kind of power than the priests', level:13, rare: 0.8},
            {name: 'Bakvuerlu', desc: 'Contained in a tunnel system below the plain, this ancient beast is both feared and revered', level:14, rare: 0.6, uniques: ['u14']},
            {name: 'Painted Chief', desc: 'Leader of the plains by birthright, his bloodline is long and vicious', level:16, rare: 0.4, uniques: ['u15']}
        ]
    },
    {
        id: 'z6',
        tier: 2,
        name: 'Ropewalker Mines',
        desc: 'Deep under a nameless mountain this gold mine has been taken over by burly bearded hillmen',
        mobs: [
            {name: 'Gold Hander', desc: 'These younger men run about collecting anything valuable from the older miners', level: 7, rare: 1},
            {name: 'Black Hander', desc: 'A rough giant who uses his bare hands to clear away worthless rubble', level: 9, rare: 1},
            {name: 'Bucketwielder', desc: 'Hi ho hi ho, a bucket wielding life I know', level: 9, rare: 1},
            {name: 'Cart Straddler', desc: 'The paths down the mine are uneven and carts require some extra handling', level: 13, rare: 1},
            {name: 'Rope Harnesser', desc: 'These men tend to the extensive system of ropes and pulleys on which materials and tools are carried', level: 15, rare: 1},
            {name: 'Gold Pickstriker', desc: 'Using a small pick these miners are nearing the end and do precise work', level: 15, rare: 0.6, uniques: ['u16']},
            {name: 'Black Pickstriker', desc: 'Experienced and hearty men who hack away at the raw rock', level: 17, rare: 0.4, uniques: ['u17']},
            {name: 'Wire Lasher', desc: 'Someone has to keep all these bastards on schedule', level: 18, rare: 0.2, uniques: ['u16', 'u17']}
        ]
    },
    {
        id: 'z7',
        tier: 2,
        name: 'Forgotten caves',
        desc: 'They are not actually forgotten, just avoided',
        mobs: [
            {name: 'Six Toe Biter', desc: 'Pale skinned with sparse dark hair, watch out for their oversized mandibles', level:8, rare: 1},
            {name: 'Six Toe Brawler', desc: 'Giant hands and small brains make these cave dwellers hunger for violence', level:8, rare: 1},
            {name: 'Six Toe Hacker', desc: 'Lacking any natural offensive features, these six toe savages turned to tools', level:16, rare: 1},
            {name: 'Bloody Crumpler', desc: 'Ragged skin oozing red, brute will crush you dead', level:16, rare: 1},
            {name: 'Bloody Lung', desc: 'This torn flesh fiend has a holler to strip skin from bone', level:17, rare: 1},
            {name: 'Spider Catcher', desc: 'A writhing mass of limbs which scour crevices for arachnids for their venom', level:17, rare: 0.8},
            {name: 'Moss Roller', desc: 'A janitor of the dark, this gatherer tends to lichens on the wall', level:18, rare: 0.3, uniques: ['u19']},
            {name: 'Moss Wretcher', desc: 'Unique stomach acid turns cave moss to mortar used for their dwellings', level:18, rare: 0.3, uniques: ['u19']},
            {name: 'Seven Toe', desc: 'A legend among the Six Toe, he has seven', level:19, rare: 0.1, uniques: ['u18']}
        ]
    },
    {
        id: 'z29',
        tier: 2,
        name: 'Rogue\'s Paradise',
        desc: 'This rocky haven proves a life of crime can pay',
        mobs: [
            {name: 'Canyon Rogue', desc: 'They creep along the high walls', level:10, rare: 1},
            {name: 'Canyon Brawler', desc: 'Drunk more often than not', level:12, rare: 1},
            {name: 'Canyon Trickster', desc: 'Considered untrustworthy even here', level:12, rare: 1},
            {name: 'Silent Knifer', desc: 'There is always dirty work to be done', level:13, rare: 1},
            {name: 'Silent Poisoner', desc: 'Vile men at the disposal of the richest', level:13, rare: 1},
            {name: 'Golden Griefer', desc: 'Made their fortune scamming barons', level:14, rare: 1},
            {name: 'Gem Runner', desc: 'Gems speak amongst thieves', level:15, rare: 0.8},
            {name: 'Treasure Guard', desc: 'The caves of wealth need tending to', level:15, rare: 0.7},
            {name: 'Hackle Raiser', desc: 'Savage dog of the thief king', level:16, rare: 0.6},
            {name: 'Circle Boss', desc: 'Runs the pit fights here', level:17, rare: 0.3, uniques: ['u62']},
            {name: 'Thief King Charep', desc: 'Burgled his way to the top', level:18, rare: 0.1, uniques: ['u63']}
        ]
    },
    {
        id: 'z8',
        tier: 2,
        name: 'The Wastes',
        desc: 'Harsh winds sear this plain of any civilized life',
        mobs: [
            {name: 'Haggard Dredge', desc: 'Savage wanderers crazed by battles long forgotten', level:9, rare: 1},
            {name: 'Haggard Swordsman', desc: 'Some remnants of battle remain in these displaced soldiers', level:9, rare: 1},
            {name: 'Waste Raider', desc: 'These men wage war on anything that moves', level:10, rare: 1},
            {name: 'Waste Looter', desc: 'Lurking just beyond a battle, the looter waits for his prize', level:11, rare: 1},
            {name: 'Waste Chieftan', desc: 'He claims dominance over his special part of nothing', level:12, rare: 1},
            {name: 'Bloodeye Rebel', desc: 'Unsatisfied with his standing, this fighter yearns for more', level:12, rare: 0.8},
            {name: 'Bloodeye Leader', desc: 'He hopes to move his men out of these wretched wastes', level:15, rare: 0.6},
            {name: 'Slashface', desc: 'Raised amongst the wasted pit fighters, this mongrel knows nothing but bloodshed', level:16, rare: 0.4, uniques: ['u21']},
            {name: 'Naked Fred', desc: 'Happy with his lot in life, Fred will fight hard to preserve his existence', level:17, rare: 0.2, uniques: ['u20']}
        ]
    },
    {
        id: 'z9',
        tier: 2,
        name: 'Trader\'s Path',
        desc: 'The best route through the kingdom',
        mobs: [
            {name: 'Holedigger', desc: 'Lots of wagons on the path, a sunk wheel makes an easy target', level:7, rare: 1},
            {name: 'Brush Raider', desc: 'The edges of the trail are lined with these heathens', level:9, rare: 1},
            {name: 'Brush Burner', desc: 'A ring of fire can can bring the best bred horses to a stop', level:9, rare: 1},
            {name: 'Brush Trapper', desc: 'These cage builders specialize in man-sized traps', level:10, rare: 1},
            {name: 'Scrawny Wolfkeeper', desc: 'One who can speak to wolves will always get by', level:11, rare: 1},
            {name: 'Scrawny Bearkeeper', desc: 'One who can speak to bears is one to watch out for', level:14, rare: 0.8},
            {name: 'Merchant Thief', desc: 'These crooks make off with entire wagons and wives without ever being seen', level:15, rare: 0.5},
            {name: 'Bearclaw Bother', desc: 'The paths are policed by these unsavory highwaymen', level:16, rare: 0.4, uniques: ['u22']},
            {name: 'Bearclaw Captain', desc: 'Controlling the path takes a firm hand and bloody sword', level:17, rare: 0.3, uniques: ['23']}
        ]
    },
    {
        id: 'z10',
        tier: 2,
        name: 'Smuggler Tunnels',
        desc: 'An old hole leading from the Trader\'s Path into an underground network',
        mobs: [
            {name: 'Picker', desc: 'A lowly rock digger', level:8, rare: 1},
            {name: 'Rawhand Tunneler', desc: 'Hands as hard as iron give these men all the tools they need', level:9, rare: 1},
            {name: 'Iron Hoarder', desc: 'They find awe in the ore and will defend their stash', level:11, rare: 1},
            {name: 'Steel Taker', desc: 'These men love the shine of raw steel in their hands', level:11, rare: 1},
            {name: 'Silver Stealer', desc: 'Not satisfied with steal these men lust for something more precious', level:11, rare: 1},
            {name: 'Gold Runner', desc: 'Once they find a nugget of gold these greedy fools flee with their find', level:13, rare: 1},
            {name: 'Packrat', desc: 'The latest find is not nearly as important as the growing pile', level:14, rare: 0.8},
            {name: 'Dirty Lowlife', desc: 'He is just here hiding out from his latest crime', level:16, rare: 0.5},
            {name: 'Tunnel Warden', desc: 'A relic of the old tunnels, these men still fancy themselves boss', level:16, rare: 0.2, uniques: ['u24']},
            {name: 'Desolate Digger', desc: 'Insanity and greed can create a monster', level:18, rare: 0.1, uniques: ['u25']}
        ]
    },
    {
        id: 'z11',
        tier: 3,
        name: 'Valiant Quarry',
        desc: 'Many castles were built with this stone, now it belongs to the Von Horn',
        mobs: [
            {name: 'Voh Horn Warrior', desc: 'A goat man who jumps at any opportunity for violence', level:12, rare: 1},
            {name: 'Voh Horn Crusher', desc: 'Goat horns on his head and a boulder in his hands', level:13, rare: 1},
            {name: 'Voh Horn Shadow', desc: 'A sneaky hoofed goat man with malicious intent', level:14, rare: 1},
            {name: 'Exiled Tribesman', desc: 'These exiled nomads have taken to the cliffs', level:15, rare: 1},
            {name: 'Von Piercer', desc: 'Armed with a long trident, these goats live for the hunt', level:19, rare: 1},
            {name: 'Von Trapper', desc: 'These goat men often travel with Von Piercers, a deadly duo', level:19, rare: 1},
            {name: 'Quarry Scavenger', desc: 'Hardened men with fierce tempers and no limits', level:25, rare: 0.6},
            {name: 'Rock Dropper', desc: 'shunned from the Von clans, these goat men live for vengeance', level:19, rare: 0.1, uniques: ['u27']},
            {name: 'Black Hoof', desc: 'The notorious leader of the Von clans', level:26, rare: 0.3, uniques: ['u26']}
        ]
    },
    {
        id: 'z14',
        tier: 3,
        name: 'Hangman\'s Forest',
        desc: 'Countless criminals found their end in these strong trees',
        mobs: [
            {name: 'Slack Lynchman', desc: 'Low of spirit and lower of mind they walk the woods with ropes', level:16, rare: 1},
            {name: 'Rogue Footman', desc: 'Black hoods hide the faces of these sneaky surfs', level:18, rare: 1},
            {name: 'Axeman', desc: 'The trunks of this wood need an axe like any other', level:18, rare: 1},
            {name: 'Blackbark Stalker', desc: 'Trails in the black soil show these hunters the way', level:19, rare: 1},
            {name: 'Blackbark Netter', desc: 'Waiting in the trees to drop barbed nets', level:21, rare: 1},
            {name: 'Blackbark Spiker', desc: 'Builders of traps for any game that wanders through', level:22, rare: 0.8},
            {name: 'Blackbark Trooper', desc: 'Tough men with hardened bark armor', level:24, rare: 0.6},
            {name: 'Ruson Redstump', desc: 'So named for the hundred necks he severed on his stump', level:18, rare: 0.2, uniques: ['u32']},
            {name: 'Noosecrafter', desc: 'Famed for his craft this old man is not to be taken lightly', level:25, rare: 0.1, uniques: ['u33']}
        ]
    },
    {
        id: 'z15',
        tier: 3,
        name: 'Temple Causeway',
        desc: 'A relic of an acient religion',
        mobs: [
            {name: 'Snake Wrestler', desc: 'Vipers killed his parents, now he\'s out for revenge', level:19, rare: 1},
            {name: 'Poison Peddler', desc: 'A villain with vials so vile to vex your veins', level:19, rare: 1},
            {name: 'Sourback Cutter', desc: 'A knife in a ragged sash is all this rogue needs', level:20, rare: 1},
            {name: 'Sourback Singer', desc: 'Chanting madness these souls reek doom', level:21, rare: 1},
            {name: 'Sourback Ruiner', desc: 'Thoughts of chaos plague these once holy knights', level:22, rare: 1},
            {name: 'Temple Ward', desc: 'These sentinels never sleep', level:22, rare: 0.8},
            {name: 'Temple Honor Guard', desc: 'They watch the priests with awe and devotion', level:23, rare: 0.7},
            {name: 'Temple Speaker', desc: 'A holy vessel for the word of devils', level:23, rare: 0.4},
            {name: 'Frogfeather', desc: 'A winged leaping beast', level:24, rare: 0.1, uniques: ['u34']},
            {name: 'Vilevein', desc: 'It swims around the green pools', level:24, rare: 0.1, uniques: ['u35']}
        ]
    },
    {
        id: 'z16',
        tier: 3,
        name: 'Infested Fields',
        desc: 'The dead of battle bring countless maggots',
        mobs: [
            {name: 'Slither Shell', desc: 'Hard shelled slugs with a hungry stare', level:13, rare: 1},
            {name: 'Slither Thorn', desc: 'Digging into fresh is easier with barbs', level:14, rare: 1},
            {name: 'Dissector', desc: 'Stalking the carnage these fiends search for fresh vitals', level:14, rare: 1},
            {name: 'Gut Crawler', desc: 'They revel in the intestines of the fallen', level:15, rare: 1},
            {name: 'Moth Keeper', desc: 'They keep to the outskirts of the bodies', level:16, rare: 1},
            {name: 'Moth Worshiper', desc: 'An unhealthy infatuation guides these servants', level:19, rare: 0.9},
            {name: 'Moth Reveler', desc: 'Covered in the wings of their powdery prophets', level:23, rare: 0.8},
            {name: 'Hive Dweller', desc: 'Creating blood honey from bodies of men', level:19, rare: 0.5},
            {name: 'Hive Spinner', desc: 'This crafter creates more ruin from rotten gore', level:26, rare: 0.2, uniques: ['u36', 'u37']}
        ]
    },
    {
        id: 'z17',
        tier: 3,
        name: 'King\'s Path',
        desc: 'Leading to the kingdom capital, this road is a shadow of the old ways',
        mobs: [
            {name: 'Armed Trader', desc: 'No road is safe and these men know it', level:16, rare: 1},
            {name: 'Wagon Guard', desc: 'Hired hands with a history of confrontation', level:16, rare: 1},
            {name: 'Hired Chef', desc: 'A rough veteran, but everyone has to eat', level:17, rare: 1},
            {name: 'Road Robber', desc: 'Where there is value their will be thieves', level:18, rare: 1},
            {name: 'Marauding Trapper', desc: 'Skilled with rope and chain these brigands lay in wait', level:19, rare: 1},
            {name: 'Marauding Axer', desc: 'When the traps are sprung there is dirty work to do', level:19, rare: 0.8},
            {name: 'Marauding King', desc: 'He clawed his way to the top of the dirtiest ladder around', level:24, rare: 0.4},
            {name: 'Turned Tracker', desc: 'Once an esteemed woodsman of the king', level:22, rare: 0.4},
            {name: 'Lady of the Road', desc: 'An enchantress who can turn any man to mush', level:19, rare: 0.1, uniques: ['u38', 'u39']}
        ]
    },
    {
        id: 'z19',
        tier: 3,
        name: 'Smuggler\'s Den',
        desc: 'A foul nest of fortune seekers and the war zone of the Red and Blue Circle gangs',
        mobs: [
            {name: 'Red Circle Stalker', desc: 'The signature killer of the Red Circle Gang', level:12, rare: 1},
            {name: 'Red Circle Ram', desc: 'Chosen for their bulk, they can be very convincing', level:15, rare: 1},
            {name: 'Red Circle Chanter', desc: 'Half their mind on magic the on money', level:16, rare: 1},
            {name: 'Blue Circle Handler', desc: 'Quick eyes and quicker hands make these thieves especially useful', level:16, rare: 1},
            {name: 'Blue Circle Bully', desc: 'Soldiers of the Blue Circle Gang', level:17, rare: 1},
            {name: 'Blue Circle Talker', desc: 'Drawing power from the dark these spellcasters like their loot', level:19, rare: 1},
            {name: 'Iron Master', desc: 'A dealer specializing in hot iron', level:20, rare: 0.8},
            {name: 'Steel Master', desc: 'A dealer specializing in cold steel', level:21, rare: 0.8},
            {name: 'Silver Master', desc: 'A dealer specializing in shining silver', level:21, rare: 0.7},
            {name: 'Gold Master', desc: 'A dealer specializing in glimmering gold', level:23, rare: 0.4},
            {name: 'Prowler', desc: 'The Vault Master\'s eyes on the den', level:17, rare: 0.4},
            {name: 'Vault Master', desc: 'The cunning overlord of the den', level:19, rare: 0.1, uniques: ['u42', 'u43']}
        ]
    },
    {
        id: 'z20',
        tier: 3,
        name: 'Deadgrass Hills',
        desc: 'Rolling hills of dry white grass tall enough to hide many dangers',
        mobs: [
            {name: 'Mournful Rider', desc: 'A wanderer trying to come to terms with a life bathed in blood', level:15, rare: 1},
            {name: 'Corpseduster', desc: 'Crawling salamanders who seek the dead under the grass', level:15, rare: 1},
            {name: 'Valley Vagrant', desc: 'Free men who will not be bound by the rules of others', level:19, rare: 1},
            {name: 'Deadweed Hunter', desc: 'His gut-strung bow sends arrows to targets unseen', level:19, rare: 1},
            {name: 'Grassland Vermin', desc: 'The lesser warriors of the rat people', level:19, rare: 1},
            {name: 'Grassland Raider', desc: 'Proven commanders of the vermin clans', level:21, rare: 0.9},
            {name: 'Grassland Puller', desc: 'Ropes and hooks snare their prey', level:24, rare: 0.8},
            {name: 'Hilltop Watcher', desc: 'Seated on thatched hovels they scan for targets', level:25, rare: 0.6},
            {name: 'Hilltop Archer', desc: 'They wait for signals from the Watchers', level:20, rare: 0.4},
            {name: 'Hill Master Lo', desc: 'To and fro goes Hill Master Lo', level:27, rare: 0.2, uniques: ['u44', 'u45']}
        ]
    },
    {
        id: 'z21',
        tier: 3,
        name: 'Valiant Mine',
        desc: 'When the dead kings needed precious metals, they dug here',
        mobs: [
            {name: 'Cave Ape Brawler', desc: 'Inhuman strength with glowing red eyes sunk deep in black fur', level:14, rare: 1},
            {name: 'Cave Ape Mender', desc: 'Skilled fingers stained red with the blood of their own', level:16, rare: 1},
            {name: 'Cave Ape Alpha', desc: 'A large menace born to fight and breed', level:17, rare: 0.7},
            {name: 'Ghouler', desc: 'Lack of sunlight has taken their humanity', level:18, rare: 1},
            {name: 'Lasher', desc: 'Pitch white skin laced with red scars from their own chain whip', level:22, rare: 1},
            {name: 'Base Lurker', desc: 'A creeper of corners waiting for juicy limbs', level:24, rare: 0.9},
            {name: 'Blindling', desc: 'No need for eyes this deep in the dark', level:25, rare: 0.8},
            {name: 'Cave Ape Cannibal', desc: 'One that got too hungry and went bad', level:26, rare: 0.4},
            {name: 'Curo the Chained', desc: 'Locked in the depths for ages by an unknown hero', level:27, rare: 0.2, uniques: ['u46', 'u47']}
        ]
    },
    {
        id: 'z22',
        tier: 4,
        name: 'Tourn\'s Path',
        desc: 'A grim walkway of pain',
        mobs: [
            {name: 'Brainsaw Watcher', desc: 'Impish devil who delights in torture', level:19, rare: 1},
            {name: 'Brainsaw Edger', desc: 'This brawny mass of muscle crafts tools of agony', level:19, rare: 1},
            {name: 'Brainsaw Cleaver', desc: 'They spend their time at the chopping block', level:26, rare: 1},
            {name: 'Murk Bleeder', desc: 'Obsessed with the red inside you', level:27, rare: 0.5},
            {name: 'Murk Strangler', desc: 'They love to hear your last breath escape their grip', level:33, rare: 0.5},
            {name: 'Murk Spiker', desc: 'Violence driven taskmasters', level:32, rare: 0.5},
            {name: 'Fleshsewn', desc: 'A grotesque cannibal who even snacks on himself', level:33, rare: 0.1, uniques: ['u48', 'u49']}
        ]
    },
    {
        id: 'z23',
        tier: 4,
        name: 'Mud Baths',
        desc: 'Heavy rains and little vegetation created this waste of brown sludge',
        mobs: [
            {name: 'Pit Crawler', desc: 'They like to hide beneath the muck', level:30, rare: 1},
            {name: 'Filth Flinger', desc: 'Handfuls of goop are their weapons of choice', level:31, rare: 1},
            {name: 'Sludger', desc: 'A moving mound of living mud', level:32, rare: 1},
            {name: 'Bottom Dweller', desc: 'Deep under the stinky surface these beasts lurk', level:32, rare: 1},
            {name: 'Shum', desc: 'Lord of the muck', level:33, rare: 0.2, uniques: ['u50', 'u51']}
        ]
    },
    {
        id: 'z24',
        tier: 4,
        name: 'Black Cliffs',
        desc: 'Rising from parched earth are these jet black towers of stone',
        mobs: [
            {name: 'Uru Climber', desc: 'Raised from birth to scale these walls', level:21, rare: 1},
            {name: 'Uru Defender', desc: 'Native warriors with a fierce pride for their home', level:22, rare: 1},
            {name: 'Uru Sorcerer', desc: 'They draw power from the stone itself', level:24, rare: 1},
            {name: 'Cavern Wretch', desc: 'The deep holes in the cliffs are not unoccupied', level:25, rare: 0.6},
            {name: 'Bloat Gull', desc: 'They feed steadily on those who fall', level:29, rare: 0.4},
            {name: 'Fallen', desc: 'Not all who fall die', level:23, rare: 0.2, uniques: ['u53']},
            {name: 'Nooser', desc: 'Impossible to see rope man from up high', level:31, rare: 0.2, uniques: ['u52']}
        ]
    },
    {
        id: 'z25',
        tier: 4,
        name: 'Chainrunner Mines',
        desc: 'Heavy ore requires thick chains in this old gold mine',
        mobs: [
            {name: 'Trackcrawler', desc: 'Repairs the track for the heavy carts to ride', level:25, rare: 1},
            {name: 'Tunnel Slug', desc: 'A native beast to the cave', level:25, rare: 1},
            {name: 'Ore Hoarder', desc: 'An ex Blackgut who got too greedy', level:26, rare: 0.9},
            {name: 'Blackgut Searcher', desc: 'They keep a keen eye for any shine in the walls', level:28, rare: 0.7},
            {name: 'Blackgut Hauler', desc: 'Years of rock dust have given these brutes their name', level:28, rare: 0.6},
            {name: 'Blackgut Chainer', desc: 'They set the links that make this mine function', level:28, rare: 0.5},
            {name: 'Blackgut Breaker', desc: 'Gold is not easily dug from the rock', level:29, rare: 0.3, uniques: ['u54', 'u55']}
        ]
    },
    {
        id: 'z27',
        tier: 4,
        name: 'Tower Yard',
        desc: 'It stretches for miles outside of Hunger\'s keep',
        mobs: [
            {name: 'Roaming Watch', desc: 'Dark eyes peer out through a dark helm', level:21, rare: 1},
            {name: 'Torch Keeper', desc: 'The way to the keep is lit with bonfires', level:22, rare: 1},
            {name: 'Hooded Lanceweilder', desc: 'They guard the yard', level:23, rare: 1},
            {name: 'Hooded Captain', desc: 'Champions of the lance', level:24, rare: 1},
            {name: 'Well Wench', desc: 'Even the most grim troops need to drink', level:26, rare: 1},
            {name: 'Wall Mason', desc: 'Rotting stone needs looking after', level:27, rare: 0.8},
            {name: 'Oil Cauldroner', desc: 'They haul foul blackness to torch', level:29, rare: 0.4},
            {name: 'Wandering Longcloak', desc: 'A reaper in shadows', level:29, rare: 0.3, uniques: ['u59']},
            {name: 'Gatekeeper', desc: 'He stands at the base of the keep', level:30, rare: 0.2, uniques: ['u58']}
        ]
    },
    {
        id: 'z28',
        tier: 4,
        name: 'Old Battlegrounds',
        desc: 'Magic lingerings of a great battle left their mark',
        mobs: [
            {name: 'Wandering Soldier', desc: 'Sightless beings dragging ancient weapons', level:17, rare: 1},
            {name: 'Risen Lancer', desc: 'Once an honored warrior', level:25, rare: 1},
            {name: 'Risen Heavy Guard', desc: 'Wearing old plate they roam', level:29, rare: 1},
            {name: 'Risen Footman', desc: 'Their lances are as thick as their limbs', level:30, rare: 1},
            {name: 'Dead Horseman', desc: 'Bones riding more bones', level:31, rare: 0.8},
            {name: 'Battle Mage', desc: 'Forever locked in their last moments of sorcery', level:31, rare: 0.6},
            {name: 'Arms Commander', desc: 'They rally the dead', level:32, rare: 0.4},
            {name: 'General Reins', desc: 'He leads a dead army', level:33, rare: 0.2, uniques: ['u60']},
            {name: 'General Groor', desc: 'A giant damned skeleton', level:33, rare: 0.1, uniques: ['u61']}
        ]
    },
    {
        id: 'z30',
        tier: 4,
        name: 'Lurker Caverns',
        desc: 'Hidden by thorn covered vines these caves run deep',
        mobs: [
            {name: 'Webclaw Beastbringer', desc: 'Amphibian conjurers in the dankness', level:26, rare: 1},
            {name: 'Webclaw Spineweilder', desc: 'Amphibian carnivores with bone weapons', level:26, rare: 1},
            {name: 'Webclaw Raiser', desc: 'Trap-setting newt men with clear skin', level:27, rare: 1},
            {name: 'Lurking Ruiner', desc: 'Hardened scales sneaking in the dark', level:28, rare: 1},
            {name: 'Lurking Impaler', desc: 'With bone spears these snakes slither', level:30, rare: 1},
            {name: 'Greyskin Fury', desc: 'Foul beings furious with their misfortune', level:30, rare: 0.8},
            {name: 'Greyskin Rusher', desc: 'Lack of sun has left these fiends reckless', level:30, rare: 0.8},
            {name: 'Greyskin Champion', desc: 'Nothing holds this warrior of the deep back', level:33, rare: 0.6},
            {name: 'Wretched Explorer', desc: 'Once a famed mapmaker now a horrible creature of gloom', level:26, rare: 0.4},
            {name: 'Gnir the Dark', desc: 'Ancient grimness manifest', level:27, rare: 0.2, uniques: ['u64', 'u65']}
        ]
    },
    {
        id: 'z32',
        tier: 4,
        name: 'Stink Mountain',
        desc: 'The sewage of the entire realm must end up here',
        mobs: [
            {name: 'Bog Lavisher', desc: 'They revel in the fumes', level:29, rare: 1},
            {name: 'Bog Swimmer', desc: 'Freakishly agile through the sludge', level:29, rare: 1},
            {name: 'Hardcave Tumbler', desc: 'Just above the bogs the cavemen climb', level:30, rare: 1},
            {name: 'Hardcave Chucker', desc: 'Rock throwers from high up ledges', level:30, rare: 1},
            {name: 'Stonesword Novice', desc: 'Low brows and high tempered rock wielders', level:30, rare: 1},
            {name: 'Stonesword Elite', desc: 'Experts of stinky stone weaponry', level:31, rare: 1},
            {name: 'Stench Crawler', desc: 'With skin like a sponge these beasts reek', level:31, rare: 0.8},
            {name: 'Hulking Dredge', desc: 'A shambling monster from the bog', level:32, rare: 0.6},
            {name: 'Wasted Giant', desc: 'They take years to form from raw filth', level:33, rare: 0.6},
            {name: 'Carcasser', desc: 'Bottom feeders of the bog', level:29, rare: 0.3, uniques: ['u68']},
            {name: 'Wasted Giant Lord', desc: 'An ancient bulk of things long rotten', level:33, rare: 0.1, uniques: ['u69']}
        ]
    },
    {
        id: 'z33',
        tier: 5,
        name: 'Sickly Swamp',
        desc: 'Green mists and black mud',
        mobs: [
            {name: 'Swamp Goblin', desc: 'A shrieking flailing creep', level:29, rare: 1},
            {name: 'Mutated', desc: 'Natural toxins here can have drastic effects', level:32, rare: 1},
            {name: 'Preserved', desc: 'They lay in the mud a hundred years before awakening', level:33, rare: 1},
            {name: 'Bog Mother', desc: 'They breed low beasts to serve them', level:36, rare: 0.6},
            {name: 'Vine Fighter', desc: 'Swamp warriors who swing thorny vine', level:38, rare: 0.4},
            {name: 'The Rot Lord', desc: 'He slithers slowly bringing unnatural decay', level:40, rare: 0.2, uniques: ['u70', 'u71']}
        ]
    },
    {
        id: 'z35',
        tier: 5,
        name: 'Hunger\'s Keep',
        desc: 'A dark castle built of black stone',
        mobs: [
            {name: 'Starved Steward', desc: 'Robed in tattered gray they float about', level:33, rare: 1},
            {name: 'Starved Edgebreaker', desc: 'Clad in iron armor with matching hammers', level:34, rare: 1},
            {name: 'Starved Pike', desc: 'Silent guards with weapons twice the height of a man', level:35, rare: 1},
            {name: 'Boneyard Wolf', desc: 'Ribs show through their tough gray fur', level:37, rare: 1},
            {name: 'Boneyard Warden', desc: 'Lashing the wolves and prowling the lot', level:39, rare: 0.7},
            {name: 'Keep Shadow', desc: 'Quick assassins lurking in dark corners', level:33, rare: 0.4},
            {name: 'Hunger', desc: 'The hooded master of the house', level:35, rare: 0.3, uniques: ['u74', 'u75']}
        ]
    },
    {
        id: 'z36',
        tier: 5,
        name: 'Blind Caverns',
        desc: 'Sunlight could never reached this deep',
        mobs: [
            {name: 'Milkeye Lurker', desc: 'Feeling their way through the tunnels', level:28, rare: 1},
            {name: 'Milkeye Rager', desc: 'Senseless rage in the dark', level:30, rare: 1},
            {name: 'Whiteface Scather', desc: 'Bone faced spider men', level:31, rare: 1},
            {name: 'Whiteface Burstling', desc: 'They lay in wait then pounce', level:33, rare: 0.8},
            {name: 'Whiteface Malform', desc: 'A bone skinned insect with massive crab claws', level:36, rare: 0.6},
            {name: 'Skinkling', desc: 'A white snake with circular jaws', level:40, rare: 0.3},
            {name: 'Skink', desc: 'Twelve sets of legs and pulsing teeth', level:40, rare: 0.2, uniques: ['u77']},
            {name: 'Moonskin', desc: 'An immense white scaled beast', level:40, rare: 0.1, uniques: ['u76']}
        ]
    },
    {
        id: 'z37',
        tier: 5,
        name: 'Pits of the Taken',
        desc: 'An infernal chasm of nightmarish beasts',
        mobs: [
            {name: 'Fire Tender', desc: 'They keep the pyres burning', level:30, rare: 1},
            {name: 'Slitherer', desc: 'A black writhing serpent with human arms', level:31, rare: 1},
            {name: 'Collector', desc: 'Gore loving ghouls with a fetish for organs', level:31, rare: 1},
            {name: 'Pit Dartman', desc: 'They shoot blowguns of bone', level:33, rare: 1},
            {name: 'Pit Mage', desc: 'Summoners of necromantic powers', level:35, rare: 1},
            {name: 'Pit Hammerer', desc: 'They craft black iron blades', level:36, rare: 1},
            {name: 'Death Wreaker', desc: 'A demon warrior with four arms', level:37, rare: 1},
            {name: 'Spear Tongue', desc: 'A legless demon with a huge forked tongue', level:39, rare: 0.9},
            {name: 'Maimflesh Imp', desc: 'They carry a simple dagger for their work', level:36, rare: 0.5},
            {name: 'Fleshless Imp', desc: 'He stripped off his own skin', level:42, rare: 0.2, uniques: ['u78', 'u79']}
        ]
    },
    {
        id: 'z38',
        tier: 5,
        name: 'Diseased Trench',
        desc: 'Still festering with the sickness of battle',
        mobs: [
            {name: 'Eaten Spearman', desc: 'A victim of cannibalism', level:29, rare: 1},
            {name: 'Rotting Sellsword', desc: 'From another land these fighters came only to die', level:31, rare: 1},
            {name: 'Rotting Flailer', desc: 'Two weapons of ball and chain swing wild', level:36, rare: 1},
            {name: 'Rotting Runner', desc: 'They used to carry messages, now they carry disease', level:39, rare: 1},
            {name: 'Diseased Armsman', desc: 'A foot soldier taken over by the contagion', level:40, rare: 0.8},
            {name: 'Diseased Commander', desc: 'Still leading his rotten platoon', level:40, rare: 0.6},
            {name: 'Diseased Magicker', desc: 'They were placed one per platoon', level:41, rare: 0.6},
            {name: 'Trench Spiker', desc: 'They set crude wooden spikes on the edges', level:37, rare: 0.4},
            {name: 'Trench Mender', desc: 'War medics who could not tend to themselves in the end', level:39, rare: 0.4},
            {name: 'Trench Digger', desc: 'Giant men with heavy shovels', level:40, rare: 0.4},
            {name: 'Trench Boss Frig', desc: 'Chief engineer who oversaw the trench', level:42, rare: 0.2, uniques: ['u80', 'u81']}
        ]
    },
    {
        id: 'z39',
        tier: 5,
        name: 'Cursed Village',
        desc: 'This place lay too close to Tourn\'s altar',
        mobs: [
            {name: 'Limbless Villager', desc: 'They crawl and roll on the dirt looking for meat', level:30, rare: 1},
            {name: 'Rotbone Villager', desc: 'Crazed folk looking for anyone not under Tourn\'s influence', level:32, rare: 1},
            {name: 'Skinless Farmer', desc: 'Vicious mindless men armed with farm tools', level:32, rare: 1},
            {name: 'Eyeless Watchman', desc: 'These lookouts see with everything but their eyes', level:33, rare: 1},
            {name: 'Halfhead Swordsman', desc: 'A village guard with no brain', level:35, rare: 1},
            {name: 'Halfhead Brawler', desc: 'The town ruffians who fight mindlessly', level:37, rare: 0.8},
            {name: 'Longjaw Cursor', desc: 'Inhuman distended mouths always screaming', level:40, rare: 0.3},
            {name: 'Longjaw Chaser', desc: 'Monster jawed men with quick legs', level:41, rare: 0.3},
            {name: 'Halfhead Executioner', desc: 'Even missing the top of his head this axeman has a mean swing', level:33, rare: 0.1, uniques: ['u82', 'u83']}
        ]
    },
    {
        id: 'z40',
        tier: 5,
        name: 'Rawrock Forest',
        desc: 'Narrow passages, sharp rocks, and many places for an ambush',
        mobs: [
            {name: 'Vulture Keeper', desc: 'All day they tend the dark birds', level:28, rare: 1},
            {name: 'Vulture Fighter', desc: 'A blade in one hand a carrion bird on the other', level:29, rare: 1},
            {name: 'Vulture Lord', desc: 'They are bound to black feathers and curved beaks', level:36, rare: 0.5},
            {name: 'Rawrock Earthshaker', desc: 'Hoof men who topple boulders', level:36, rare: 1},
            {name: 'Rawrock Clansman', desc: 'Hoof warriors with rock clubs', level:37, rare: 1},
            {name: 'Rawrock Helmcrusher', desc: 'Hoof giants wielding stones in each hand', level:38, rare: 0.9},
            {name: 'Rawrock Lord', desc: 'Twice the height of a man wearing stone armor', level:40, rare: 0.4},
            {name: 'Shadowed Trancer', desc: 'They slide from the rock to ensnare', level:40, rare: 0.3},
            {name: 'Gored Climber', desc: 'A man who fell and escaped the vultures with his life but not his mind', level:35, rare: 0.2, uniques: ['u84']},
            {name: 'Ivory Vulture', desc: 'An enormous genetic freak with insatiable hunger', level:38, rare: 0.2, uniques: ['u85']}
        ]
    },
    {
        id: 'z41',
        tier: 5,
        name: 'Viper Pits',
        desc: 'A dark well leads to this maze of reptilian horror',
        mobs: [
            {name: 'Viper', desc: 'A ringed snake with lethal venom', level:33, rare: 1},
            {name: 'Snakecharmer', desc: 'Worshipers of snake demons', level:34, rare: 1},
            {name: 'Serpent Guard', desc: 'Half man half snake sentinels', level:36, rare: 1},
            {name: 'Serpent Handler', desc: 'Their relation with scales borders on the sensuous', level:37, rare: 1},
            {name: 'Viperborn Brute', desc: 'Scaled men with venom for blood', level:38, rare: 0.8},
            {name: 'Viperborn Blade', desc: 'Green scaled sneaky snake men with crude knives', level:39, rare: 0.4},
            {name: 'Viperborn Chief', desc: 'A chosen priest one among the Viperborn', level:40, rare: 0.4},
            {name: 'Pit Lord Cauffer', desc: 'He is lord of this place because no one can challenge him', level:42, rare: 0.1, uniques: ['u86', 'u87']}
        ]
    },
    {
        id: 'z42',
        tier: 6,
        name: 'Altar of the Cursed',
        desc: 'A haunted old fort of a long dead duke',
        mobs: [
            {name: 'Shambling Armor', desc: 'An incomplete set of living armor who clatters about', level:38, rare: 1},
            {name: 'Halting Armor', desc: 'It is missing a few pieces but is very mobile', level:40, rare: 1},
            {name: 'Marching Armor', desc: 'A perfect suit of armor still making it\'s rounds', level:41, rare: 1},
            {name: 'Blackshadow Warlock', desc: 'He scurries through the halls on devious errands', level:43, rare: 1},
            {name: 'Blackshadow Witch', desc: 'They pour over old texts and chant over bubbling brews', level:44, rare: 1},
            {name: 'Blackshadow Piercer', desc: 'A brutish slave of the witches', level:44, rare: 1},
            {name: 'Eternal Guard', desc: 'A warrior of bone who\'s living parts fell away long ago', level:46, rare: 0.7},
            {name: 'Librarian', desc: 'A mage of terrible power', level:53, rare: 0.5},
            {name: 'Graceful Armor', desc: 'A gleaming set of living armor that time has not touched', level:50, rare: 0.5},
            {name: 'Blackshadow Lord', desc: 'Lord of the Cursed Altar', level:55, rare: 0.2, uniques: ['u88', 'u89']}
        ]
    },
    {
        id: 'z43',
        tier: 6,
        name: 'The Besieged Altar',
        desc: 'Decades under siege left this castle\'s people crazed',
        mobs: [
            {name: 'Drawbridge Guard', desc: 'He questions any who come near the bridge', level:42, rare: 1},
            {name: 'Moat Patroller', desc: 'They swim the murky water ready with blades', level:42, rare: 1},
            {name: 'Forlorn Soldier', desc: 'Sullen guards who have no hope of victory', level:43, rare: 1},
            {name: 'Forlorn Archer', desc: 'Deadly aim even without lifting their sunken heads', level:44, rare: 1},
            {name: 'Crazed Chaoscaller', desc: 'A wizard who stood too long against the onslaught', level:46, rare: 1},
            {name: 'High Guard', desc: 'They guard the inner wall of the keep', level:48, rare: 1},
            {name: 'Royal Sorcerer', desc: 'Robed in rich garb they tend to the nobles', level:50, rare: 1},
            {name: 'Royal Guard', desc: 'They stand alone by the royal chambers', level:51, rare: 1},
            {name: 'Gloom Walker', desc: 'Spiritual doom made manifest', level:51, rare: 0.8},
            {name: 'Barracks Master', desc: 'Tough as nails drillmaster', level:53, rare: 0.5},
            {name: 'Moat Master', desc: 'He gives the command to lower the bridge', level:48, rare: 0.4},
            {name: 'Castle Lord Greymind', desc: 'Of a royal line of men gone insane', level:55, rare: 0.2, uniques: ['u90', 'u91']}
        ]
    },
    {
        id: 'z44',
        tier: 6,
        name: 'Altar of Cloaks',
        desc: 'A dark city of gray stone and secretive inhabitants',
        mobs: [
            {name: 'Longcloak Boiler', desc: 'Hidden in stone huts they cook red soups', level:45, rare: 1},
            {name: 'Longcloak Slicer', desc: 'Flowing cloaks with concealed blades', level:45, rare: 1},
            {name: 'Noface Bruiser', desc: 'A plain white mask with no features belies the violence of these men', level:48, rare: 1},
            {name: 'Noface Hammer', desc: 'The plain white mask hides the sweat as they crush stone', level:49, rare: 1},
            {name: 'Guile Cloak', desc: 'A quick trickster of shadows', level:49, rare: 0.8},
            {name: 'Wrapped Summoner', desc: 'They call upon the dead buried beneath the city', level:51, rare: 0.8},
            {name: 'Torncloak Swordsman', desc: 'A proud fighter with a battleworn cape', level:52, rare: 0.7},
            {name: 'Torncloak Sorcerer', desc: 'Many years of battle have tested his skills', level:53, rare: 0.4},
            {name: 'Hidden Counciler', desc: 'One of the men responsible for the downfall of the city', level:48, rare: 0.2},
            {name: 'Lord Khilinni', desc: 'The new lord of chaos withing this city', level:55, rare: 0.2, uniques: ['u92', 'u93']}
        ]
    },
    {
        id: 'z45',
        tier: 6,
        name: 'Altar of the Minotaur',
        desc: 'Endless tunnels that house maniac beasts',
        mobs: [
            {name: 'Young Charger', desc: 'Only a few years old and already stampeding', level:49, rare: 1},
            {name: 'Brawling Bull', desc: 'An especially angry cow', level:49, rare: 1},
            {name: 'Revered Horn', desc: 'An old warrior who moves slow but surely', level:50, rare: 1},
            {name: 'Trampler', desc: 'The largest of the minotaurs', level:51, rare: 1},
            {name: 'Nursery Guard', desc: 'Holding great axes these bulls are chosen for their vigilance', level:52, rare: 1},
            {name: 'Ironhoof', desc: 'Some bulls have hooves of black metal', level:53, rare: 0.5},
            {name: 'Ironhorn', desc: 'Some bulls have horns of raw metal', level:54, rare: 0.5},
            {name: 'Horn King\'s Guard', desc: 'The personal guards of the king', level:50, rare: 0.3},
            {name: 'King Roong', desc: 'The king of the tunnels', level:56, rare: 0.1, uniques: ['u94', 'u95']}
        ]
    },
    {
        id: 'z46',
        tier: 6,
        name: 'Stone Cult Altar',
        desc: 'A place of Earthly worship',
        mobs: [
            {name: 'Gravel Eater', desc: 'Wide faced monster with a mouth for stones', level:46, rare: 1},
            {name: 'Earth Haunter', desc: 'Angry spirits risen from deep under the ground', level:47, rare: 1},
            {name: 'Granite Carver', desc: 'A weapon carver cult member', level:50, rare: 1},
            {name: 'Stalagmer', desc: 'Cultist thugs carrying broken off stone', level:50, rare: 0.6},
            {name: 'Shine Harvester', desc: 'They seek riches in their precious walls', level:52, rare: 0.4},
            {name: 'Obsidian Cultist', desc: 'They hold black stone blades imbued with power', level:52, rare: 0.2},
            {name: 'The Obsidian Lord', desc: 'Black eyes of endless night', level:55, rare: 0.2, uniques: ['u96', 'u97']}
        ]
    },
    {
        id: 'z47',
        tier: 6,
        name: 'Tourn\'s Altar',
        desc: 'A demonic field of pain and flame',
        mobs: [
            {name: 'Tourn Broodling', desc: 'Hatched from foul spawning pits these beasts must feed soon', level:39, rare: 1},
            {name: 'Tourn Caller', desc: 'Their voices pull on the hearts of all demons', level:42, rare: 1},
            {name: 'Tourn Ripper', desc: 'Huge taloned beasts and quick minds', level:44, rare: 1},
            {name: 'Tourn Wing', desc: 'Red leathery skin stretches over sharp bone', level:44, rare: 1},
            {name: 'Infernal Walker', desc: 'These demons scour the grounds for victims', level:48, rare: 0.8},
            {name: 'Infernal Racker', desc: 'They capture souls for eternal torture', level:52, rare: 0.5},
            {name: 'Burdoned Ancient', desc: 'A demon so old his skin sags mostly off the bone', level:54, rare: 0.5},
            {name: 'Chainer', desc: 'A bound beast who drags his enemies with him', level:56, rare: 0.2},
            {name: 'Tourn', desc: 'The evil lord of this demonic plane', level:60, rare: 0.1, uniques: ['u98', 'u99']}
        ]
    }
]);