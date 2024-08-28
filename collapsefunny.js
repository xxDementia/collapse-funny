/*

MOD BY: @the_dem (dem)

@ripplesplash (aurora) - playtester, coding and debugging help
@mistsofnowh3r3 (sola) - gif support, slight music tweak
@joael (jo) - playtester

*/


////////////////////////////////////////

// TABLE OF CONTENTS //

// 1. CSS
// 2. DIALOGUE ACTORS
// 3. SOUND EFFECTS
// 4. CUSTOM SFXMAP
// 5. COMBAT ACTIONS
// 6. CUSTOM COMBAT FORMATIONS & COMBAT ACTORS + OTHERS
// 7. NON-DESTRUCTIVE COMBAT ACTION MODIFICATION
// 8. BULLET HELL
// 9. STAGE MODIFICATIONS
// 10. INSPECT ENTITY
// 11. CUSTOM FUNCTIONS
// 12. ITEM MODIFICATIONS
// 13. REACTION MODIFICATIONS
// 14. DIALOGUE
// 15. MOD LOAD

////////////////////////////////////////

// CSS
css = `
.errorzone {
    display: none;
    position: absolute;
    width: 150vmax;
    heigh   t: 150vmax;
    background-image: url(https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/pain.png), url(https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/pain.png), url(https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/pain.png) !important;
    background-position: center;
    background-size: cover, auto, auto;
    background-color: black;
    animation: SPIN 6s linear infinite reverse;
    transition: opacity 200ms linear;
    opacity: 0;
    pointer-events: none;
    z-index: 101;
}

.funfriendfunny .dialogue-text {
    background-image: url(/img/textures/static.gif);
    background-position: center;
    background-size: 100%;
    text-shadow: 1px 1px var(--dark-color), 2px 2px 2px var(--friend-color);
    letter-spacing: 0.1em;
}

.collapse #realgrid .lifter:not(.fixed) {
    background-image: url(https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/elevatorfrienddisabled.png) !important;
}

.lifter {
    backface-visibility: visible;
    -webkit-backface-visibility: visible;
    background: green;
    width: 300%;
    height: 300%;
    position: absolute;
    transform: rotateX(-90deg) rotateY(180deg) translateY(-50%);
    background: url(https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/elevatorfriend.png) !important;
    background-position: center;
    background-size: cover, auto !important;
    background-repeat: no-repeat !important;
}    

#enemy-graphic .lifter.sprite figure::after, .lifter.aggressormode figure::after {
    content: "";
    width: 25vh;
    height: 25vh;
    display: block;
    background: url(https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/f13.gif), url(https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/dithered%20arrows.gif), url(https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/displaydith.png) !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    background-size: cover, auto !important;
    animation: None !important;
    border-radius: None !important;
}

#realgrid[stage*="cquarters2"] .desk .doodad.d1 {
    --baseTransform: translateX(-100%) rotateY(14deg);
    height: calc(var(--gridTileSize) * 0.5);
    width: calc(var(--gridTileSize) * 1);
    background-image: url(https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/drinkypilealcohol.png) !important;
}

.empty_gun_rack {
    background-image: url(https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/gunrackempty.gif) !important;
}

.scarl_gun_rack {
    background-image: url(https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/gunrackwscarl.gif) !important;
}

#realgrid .listener figure {
    position: absolute;
    bottom: 0;
    width: calc(var(--gridTileSize) * 2.5);
    height: calc(var(--gridTileSize) * 2.5);
    background: url(https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/birdlistenerdithered.png) !important;
}

.archives #realgrid .door.realdoor::after {
    background-image: url(https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/literaldoor.png);
}

.archives #realgrid .door.realdoorbroken::after {
    background-image: url(https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/literaldoorbroken.png) !important;
}

.archives #realgrid .door.realdoorframe::after {
    background-image: url(https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/literaldoor_frame.png) !important;
}

.literaldoor figure {
    width: 200%;
    height: 135%;
    transform: rotateX(90deg) rotateZ(27deg) translateZ(calc(var(--gridTileSize) * -0.95)) !important;
    background-image: url(https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/literaldoor_separate.png);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

#realgrid[stage="embassy_archivalboss"] .prop .bstrdpillar figure {
    background-image: url(https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/chainsdithr.png) !important;
}

.actor .combat-dialogue {
    text-transform: none !important;
}

.archivalgolem.bstrdboss.kavruka::after {
    background-image: url(https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/archivalgolem-arms-kavruka.gif) !important;
}

.bh_kavruka {
    transition: opacity 200ms !important;
}

.bh_kavruka.bh_grenade_shot {
    opacity: 0 !important;
}

.dyingqou.chest figure {
    background-image: url(https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/qouchest.png) !important;
}

.dyingqou.chestopen figure {
    background-image: url(https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/qouchest_opened.png) !important;
}

#bstrdancers::after, #bstrdancers::before {
    width: 120vw;
    height: 20vh;
    background-image: url(https://file.garden/ZBykMtEMpVTUWZ-e/alt_bstrdshuffle.gif) !important;
    background-size: 3vw auto;
    background-position: center;
    background-repeat: repeat-x;
    animation: THE_BSTRD_SHUFFLE_1 1s linear infinite;
    animation-play-state: paused;
}
`
var head = document.head || document.getElementsByTagName('head')[0]
var style = document.createElement('style');

head.appendChild(style);

style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

// DIALOGUE ACTORS

    // FUNFRIEND in lowercase
env.dialogueActors.funfriendfunny = {
    element: "#funfriend",
    image: '/img/sprites/funfriend/funfriend.gif',
    type: "obesk funfriendfunny",
    voice: ()=>{play('talk', 2)}
}

    // elevatorfriend
env.dialogueActors["movefriend"] = {
    elementID: "movefriend0",
    image: "https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/elevatorportrait.png",
    type: "obesk",
    voice: ()=>play('talk', 0.8)
}

env.dialogueActors["bstrd quiet"] = {
    type: "bstrd portrait-cover"
}

// SOUND EFFECTS

var ding = new Howl({
    src: ['https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/elevatording.wav'],
    preload: true,
    html5: false,
    volume: 0.75,
    sprite: {
        __default: [0, 4600]
    }
});

var tf2zoom = new Howl({
    src: ['https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/deathcam.wav'],
    preload: true,
    html5: false,
    volume: 0.75,
    sprite: {
        __default: [0, 4600]
    }
});

var lockedDoor = new Howl({
    src: ['https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/lockeddoor.wav'],
    preload: true,
    html5: false,
    volume: 0.75,
    sprite: {
        __default: [0, 1500]
    }
});

var error = new Howl({
    src: ['https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/errorsfx.wav'],
    preload: true,
    html5: false,
    volume: 0.75,
    sprite: {
        __default: [0, 1500]
    }
});

var jerma = new Howl({
    src: ['https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/jerma.wav'],
    preload: true,
    html5: false,
    volume: 1,
    sprite: {
        fyou: [0, 1000],
        dork: [1000, 1000],
        eats: [2000, 1000],
        loser: [3000, 1000],
        __default: [0, 4000]
    }
});

var foghorn = new Howl({
    src: ['https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/foghorn.wav'],
    preload: true,
    html5: false,
    volume: 0.75,
    sprite: {
        __default: [0, 4000]
    }
});

var fortniteChest = new Howl({
    src: ['https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/fortnitechest.wav'],
    preload: true,
    html5: false,
    loop: true,
    volume: 1,
    sprite: {
        __default: [0, 9727]
    }
});

var lootChest = new Howl({
    src: ['https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/lootfortnitechest.wav'],
    preload: true,
    html5: false,
    volume: 1,
    sprite: {
        __default: [0, 5000]
    }
});

var doorKick = new Howl({
    src: ['https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/door%20kick%20down.wav'],
    preload: true,
    html5: false,
    volume: 0.75,
    sprite: {
        __default: [0, 2500]
    }
});

    // i know this kinda doesn't count as sfx but I can't be bothered to add another section for music
env.embassy.music_bstrdcombatfortnite = new Howl({
    onload: function () {page.howls.push(this)},
    src: ['https://file.garden/ZBykMtEMpVTUWZ-e/bstrd_dance.ogg'],
    preload: true,
    volume: 1,
    sprite: {
        __default: [1, 131800, true]
    }
})


// CUSTOM SFXMAP
// feat. fortnite shot, miss sfx, AR-15 sounds, and MC water bucket

var sfxmap_custom = new Howl({
    src: ['https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/CUSTOM_CSFX_new.ogg'],
    preload: true,
    html5: false,
    volume: 0.75,
    sprite: {
        fortniteShot: [0, 1500],
        shotMiss: [1500, 1000],
        ar15Shot: [2500, 1500],
        ar15Click: [4000, 500],
        beerSplash: [4500, 1000],
        fyou: [5500, 1000],
        dork: [6500, 1000],
        eats: [7500, 1000],
        loser: [8500, 1000],
        __default: [0, 9500],
    }
});

function play(sfxName, pitch = true, volume = 0.75, forcePlay) {
    if(forcePlay) env.recentSfx = false    
    if(env.recentSfx) return
    env.recentSfx = true
    
    //we may change this depending on the SFX played
    var sfx = sfxName

    //if this uses a talk sound, we randomly select one of eight
    switch(sfxName) {
        case "talk": sfx = `talk${rand(1, 9)}`; break
        case "talkhigh": sfx = `talkhigh${rand(1, 9)}`; break
        case "talklaugh": sfx = `talklaugh${rand(1, 9)}`; break
        case "talksignal": sfx = `talksignal${rand(1, 9)}`; break
        case "talkcore": sfx = `talkcore${rand(1, 9)}`; break
        case "talkgal": sfx = `talkgal${rand(1, 9)}`; break
        case "talkgel": sfx = `talkgel${rand(1, 9)}`; break
        case "talkcroak": sfx = `talkcroak${rand(1, 9)}`; break
        case "talkchoir": sfx = `talkchoir${rand(1, 9)}`; break
        case "talkflower": sfx = `talkflower${rand(1, 9)}`; break
        case "talkfloweralt": sfx = `talkfloweralt${rand(1, 5)}`; break
        case "talkfairy": sfx = `talkfairy${rand(1, 9)}`; break
        //shot also has a variety
        case "shot": sfx = `shot${rand(1, 7)}`; break

        // case "[NAME]": sfx = `[NAME]${rand(1, #)}`; break
        // (<>) - NOTE::'rand(1,#)';'inclusive exclusive';'number of different sounds plus one'
    }


    //custom sfx check
    let sourceSFXmap = sfxmap

    if(!sfxmap._sprite[sfx])
        sourceSFXmap = sfxmap_custom


    //randomize the pitch slightly by default
    if(pitch === true) {
        sourceSFXmap.rate((Math.random() * 0.2) + 0.9) 
    } else if(typeof pitch == "number") { //set the pitch if specified
        sourceSFXmap.rate(pitch)
    } else { //otherwise false
        sourceSFXmap.rate(1)
    }

    //duck the BGM briefly so the SFX doesn't layer with it too hard
    if(env.bgm && !env.bgm.isFading && !env.noBgmDuck) {
        env.bgm.volume(0.5)
        setTimeout(()=>{ try{env.bgm.fade(0.5, env.bgm.intendedVol ? env.bgm.intendedVol : 1, 500)} catch(e) {} }, 500)
    }
    
    //play!
    setTimeout(()=>env.recentSfx = false, 50)
    sourceSFXmap.volume(volume)
    sourceSFXmap.play(sfx)    
}


// COMBAT ACTIONS

env.ACTIONS.akizet_mag_dump = {
    slug: "akizet_mag_dump",
    name: "Mag Dump",
    type: 'special',
    desc: "'uses SCAR-L';'rapid attacks'",
    anim: "wobble",
    help: "x30 RANDOM ENEMY::100% -1HP 33%C -2HP +1T:VULNERABLE",
    usage: {
        act: "%USER OPEN FIRES",
    },
    accuracy: 1,
    crit: 0.33,
    amt: 1,
    exec: function(user, target) {
        let animElement = user.sprite || user.box
        let initialRate = env.bgm.rate()

        animElement.classList.add('scramble')
        ratween(env.bgm, initialRate + 0.5)
        play('click1', 1, 1)

        let targetTeam
        switch(user.team.name) {
            case "ally": targetTeam = env.rpg.enemyTeam; break;
            case "enemy": targetTeam = env.rpg.allyTeam; break;
        }

        gakvuTalked = false
        env.rpg.halt = true

        let anim = env.ACTION_ANIMS.shoot
        for (let i = 0; i < 30; i++) {
            let baseDelay = ((env.ADVANCE_RATE * 0.1) * i)
            let animDelay = baseDelay + anim.duration;
            let validTargets = targetTeam.members.filter(member => member.state != "dead")
            if(validTargets) {
                let target = validTargets.sample()
                
                setTimeout(()=>anim.exec(this, user, target), baseDelay)
                setTimeout(()=>{
                    env.GENERIC_ACTIONS.singleTarget({
                        action: this, 
                        user, 
                        target,
                        hitSfx: { name: "fortniteShot" },
                        critSfx: { name: "fortniteShot" },
                        missSfx: { name: "shotMiss" },
                        critStatus: {
                            name: 'vulnerable',
                            length: 1
                        }
                    })

                    animElement.classList.add('scramble')
                    setTimeout(()=>animElement.classList.remove('scramble'), 100)
                    updateStats();	
                }, animDelay)
            }
        }

        if(env.combat.lastEngaged == 'archivecontainers')
            change('COMBAT!!ambushUsedGun', true)

        setTimeout(()=>{
            env.rpg.halt = false
            animElement.classList.remove('scramble')
            advanceTurn();
            ratween(env.bgm, initialRate)
        }, (env.ADVANCE_RATE * 0.1) * 30 + 500)
    }
}

env.ACTIONS.gakvu_mag_dump = {
    slug: "gakvu_mag_dump",
    name: "Mag Dump",
    type: 'special',
    desc: "'uses AR-15';'rapid attacks'",
    anim: "wobble",
    help: "x30 RANDOM ENEMY::100% -1HP 33%C -2HP +1T:VULNERABLE",
    usage: {
        act: "%USER OPEN FIRES",
    },
    accuracy: 1,
    crit: 0.33,
    amt: 1,
    exec: function(user, target) {
        let animElement = user.sprite || user.box
        let initialRate = env.bgm.rate()

        animElement.classList.add('aiming')
        ratween(env.bgm, initialRate + 0.5)
        play('ar15Click', 1, 1)

        let targetTeam
        switch(user.team.name) {
            case "ally": targetTeam = env.rpg.enemyTeam; break;
            case "enemy": targetTeam = env.rpg.allyTeam; break;
        }

        env.rpg.halt = true
        gakvuTalked = false

        let anim = env.ACTION_ANIMS.shoot
        for (let i = 0; i < 30; i++) {
            let baseDelay = ((env.ADVANCE_RATE * 0.1) * i)
            let animDelay = baseDelay + anim.duration;
            let validTargets = targetTeam.members.filter(member => member.state != "dead")
            if(validTargets) {
                let target = validTargets.sample()
                
                setTimeout(()=>anim.exec(this, user, target), baseDelay)
                setTimeout(()=>{
                    env.GENERIC_ACTIONS.singleTarget({
                        action: this, 
                        user, 
                        target,
                        hitSfx: { name: "ar15Shot" },
                        critSfx: { name: "ar15Shot" },
                        missSfx: { name: "shotMiss" },
                        critStatus: {
                            name: 'vulnerable',
                            length: 1
                        }
                    })

                    animElement.classList.add('scramble')
                    setTimeout(()=>animElement.classList.remove('scramble'), 100)
                    updateStats();	
                }, animDelay)
            }
        }

        setTimeout(()=>{
            env.rpg.halt = false
            animElement.classList.remove('aiming')                
            advanceTurn()
            ratween(env.bgm, initialRate)
        }, (env.ADVANCE_RATE * 0.1) * 30 + 500)
    }
}

env.ACTIONS.beer_splash = {
    slug: "beer_splash",
    name: "Beer Splash",
    type: 'support+target+self+autohit',
    desc: "'utilizes alcoholic beverage';'restore health';'heal over time';'cure puncture'",
    help: "AUTOHIT +2HP +3T:REGEN -PUNCTURE, 50%C +2HP",
    anim: "heal",
    usage: {
        act: "%USER SPLASHES %TARGET",
        crit: "%TARGET FEELS DRUNKER",
        hit: "%TARGET FEELS DRUNK",
        miss: "%USER MISSES"
    },
    crit: 0.5,
    amt: -2,
    autohit: true,
    exec: function(user, target) {
        return env.GENERIC_ACTIONS.singleTarget({
            beneficial: true,
            action: this, 
            user, 
            target,
            hitSfx: {
                name: 'beerSplash',
                rate: 1,
                volume: 3
            },
            hitStatus: {
                name: 'regen',
                length: 3
            },
        })
    }
}

env.ACTIONS.miltza_mag_dump = {
    slug: "miltza_mag_dump",
    name: "Mag Dump",
    type: 'special',
    desc: "'uses AR-15';'rapid inaccurate attacks'",
    anim: "wobble",
    help: "x30 RANDOM ENEMY::50% -1HP 33%C -2HP +1T:VULNERABLE\nNOTE::'low accuracy';'targets teammates'",
    usage: {
        act: "%USER SPRAYS AND PRAYS",
    },
    accuracy: 0.50,
    crit: 0.33,
    amt: 1,
    exec: function(user, target) {
        let animElement = user.sprite || user.box
        let initialRate = env.bgm.rate()

        animElement.classList.add('aiming')
        ratween(env.bgm, initialRate + 0.5)
        play('ar15Click', 1, 1)

        let targetTeam = {name: "all", members: env.rpg.turnOrder}

        gakvuTalked = false

        let anim = env.ACTION_ANIMS.shoot
        for (let i = 0; i < 30; i++) {
            let baseDelay = ((env.ADVANCE_RATE * 0.1) * i)
            let animDelay = baseDelay + anim.duration;
            let validTargets = targetTeam.members.filter(member => member.state != "dead")
            if(validTargets) {
                let target = validTargets.sample()
                
                setTimeout(()=>anim.exec(this, user, target), baseDelay)
                setTimeout(()=>{
                    env.GENERIC_ACTIONS.singleTarget({
                        action: this, 
                        user, 
                        target,
                        hitSfx: { name: "ar15Shot" },
                        critSfx: { name: "ar15Shot" },
                        missSfx: { name: "shotMiss" },
                        specialAmt: 1,
                        specialCrit: 0.3,
                        critStatus: {
                            name: 'vulnerable',
                            length: 1
                        }
                    })

                    animElement.classList.add('scramble')
                    setTimeout(()=>animElement.classList.remove('scramble'), 100)
                    updateStats();	
                }, animDelay)
            }
        }

        if(env.combat.lastEngaged == 'archivecontainers')
            change('COMBAT!!ambushUsedGun', true)

        setTimeout(()=>{
            animElement.classList.remove('aiming')                
            advanceTurn()
            ratween(env.bgm, initialRate)
        }, (env.ADVANCE_RATE * 0.1) * 30 + 500)
    }
}

env.ACTIONS.incoherent_grenades = {
    slug: "incoherent_gundown",
    name: "BSTRD GRENADES",
    type: 'special',
    desc: "BATTLEFIELD 100%",
    accuracy: 1,
    crit: 0,
    exec: function(user, target) {
        addStatus({target: user, status: "incoherent", length: 1, noReact: true});
        actionMessage(user, "%USER HURLS KAVRUKAS AT %TARGET", target);

        //vortex on screen, circle expands into fullscreen blackness (animation in CSS)
        env.rpg.insertAdjacentHTML('beforeend', `
            <div class="golem-vortex bh-action-${user.slug} bh-action"></div>
            <div id="${user.slug}-bh" class="bh-action-${user.slug} bh-action">
                <div class="bh_damage-wrapper"></div>
            </div>
        `);
        env.rpg.vortex = document.querySelector(`.golem-vortex.bh-action-${user.slug}`)
        env.rpg.actionZone = document.querySelector(`#${user.slug}-bh`)

        //animate the vortex
        setTimeout(()=>{
            env.rpg.vortex.classList.add('active'); 

            bh_start({
                playerEl: `<div id="bh_player" class="notice" style="background-image:url(${target.portraitUrl})"></div>`, 
                onHit: () => {
                    var hit

                    if(user.state == "lastStand") {
                        let possibleTargets = env.rpg.allyTeam.members.filter(member => member.hp > 0)

                        if(possibleTargets.length == 0) env.bulletHell.complete()
                        hit = combatHit(possibleTargets[rand(0, possibleTargets.length)], {amt: 1, acc: 1, crit: 0, origin: user});
                        if(hit) jerma.play([["fyou"], ["dork"], ["eats"], ["loser"]].sample()); else play("miss", 1.25, 0.75)
                        
                    } else if(target.state != "dead") {
                        hit = combatHit(target, {amt: 1, acc: 1, crit: 0, origin: user});
                        if(target.hp == 0) env.bulletHell.complete()
                        if(hit) jerma.play([["fyou"], ["dork"], ["eats"], ["loser"]].sample()); else play("miss", 1.25, 0.75)

                    } else {
                        env.bulletHell.complete()
                    }

                    updateStats();
                    if(hit == false) return "dodged"; else return "damaged"
                },
                onEnd: () => {
                },
                centered: true
            })
            bh_invuln(true)

            //animation done, activate ze game
            if(env.rpg.kavrukaDamage) {
                env.rpg.kavrukaDamage.forEach(damage=>bh_kavrukadamage(damage))
                env.rpg.actionZone.insertAdjacentHTML('beforeend', `
                <div id="bh_kavrukafirering" 
                    class="bh_damager bh_kavrukafirering"
                    style="--kavrukaDamageCount: ${env.rpg.kavrukaDamage.length}">
                </div>`)
                env.rpg.kavrukaFireRing = document.querySelector('#bh_kavrukafirering')
            }
            
            setTimeout(()=>{
                body.classList.add('in-golem-vortex')
                env.rpg.actionZone.classList.add('active')
                document.querySelector(`#bh_player`).classList.add('active')

                if(user.state == "lastStand") {
                    bh_grenade("last_stand");
                } else if(!user.tutorial) {
                    startDialogue("d3_archivebosstut")
                    user.tutorial = true
                //changes moves based on health - string refers to the urgency with which he shoots, missing more the lower his HP is but creating more hazards that way
                } else if(user.hp < (0.5 * user.maxhp)) {
                    bh_grenade("high");
                } else {
                    bh_grenade("low");
                }
            }, 500);

            setTimeout(()=>{
                env.rpg.classList.add('cull');
            }, 1400);
        }, env.ADVANCE_RATE * 0.5);
    }
}

env.ACTIONS.kavruka_spam = {
    slug: "kavruka_spam",
    name: "Explosive",
    type: 'special',
    desc: "'utilize explosive device'",
    help: "ALL FOES 80% -1HP, 30% x2 +1T:STUN",
    anim: "basic-attack",
    accuracy: 0.8,
    crit: 0.3,
    amt: 1,
    usage: {
        act: "%USER DEPLOYS A KAVRUKA"
    },
    exec: function(user, target) {
        let action = this

        let team = {members: []}
        for(let i = 0; i < 3; i++)
            env.rpg.allyTeam.members.forEach((el)=>{team.members.push(el)})

        env.GENERIC_ACTIONS.teamWave({
            team: team,
            exec: (actor, i) => {
                let anim = env.ACTION_ANIMS.shoot
                let baseDelay = ((env.ADVANCE_RATE * 0.05) * i);
                let animDelay = baseDelay + anim.duration * 0.5;
                    
                setTimeout(()=>anim.exec(action, user, actor), baseDelay)
                setTimeout(function(){
                    env.GENERIC_ACTIONS.singleTarget({
                        beneficial: false,
                        action: action, 
                        user, 
                        target: actor,
                        hitSfx: { name: [['fyou'], ['dork'], ['eats'], ['loser']].sample(), rate: 1 },
                        critSfx: { name: [['fyou'], ['dork'], ['eats'], ['loser']].sample(), rate: 1 },
                        critStatus: {
                            name: 'stun',
                            length: 1
                        },
                    })
                    updateStats();
                }, animDelay);
            },
            advanceAfterExec: true
        })
    }
}

// CUSTOM COMBAT FORMATIONS & COMBAT ACTORS + OTHER

    // adds dialogue mid-combat after 3 turns
env.COMBAT_FORMATIONS.bstrdboss_gunless = {
    enemies: ["maintcloak", "gunlessbstrdboss", "bstrdlight"],
    rewards: ['kavruka', 'aima_cyst'],
    advanceRate: 1000,
    bgmRate: 0.75,
    getBgm: ()=> {return env.embassy.music_bstrdcombatfortnite}
}

env.COMBAT_FORMATIONS.bstrdboss_gunless_lowintensity = {
    enemies: ["maintcloak", "gunlessbstrdboss_low", "bstrdlight"],
    rewards: ['kavruka', 'aima_cyst'],
    advanceRate: 1000,
    bgmRate: 0.75,
    getBgm: ()=> {return env.embassy.music_bstrdcombatfortnite}
}

env.embassy.startMovefriendBoss = (intensity = "regular")=>{ 
    cutscene(true)
    let miltzaParty = [... page.party]
    miltzaParty[1] = {
        slug: "miltza",
        name: "Miltza",
        combatActor: "miltza",
        class: "Cynical Artist",
        hp: 10
    }
    
    if(check('PAGE!!unlocked_black_box'))
        env.COMBAT_ACTORS.miltza.actions[0] = 'miltza_mag_dump'

    var counter = 0;

    change('PAGE!!pranked', false)

    var bossVersion = env.COMBAT_FORMATIONS.movefriend.enemies
    if(intensity == "low") bossVersion = env.COMBAT_FORMATIONS.movefriend_lowintensity.enemies

    startCombat(bossVersion, miltzaParty, {
        bgm: env.embassy.music_p1boss, 
        bgmRate: 0.75,
        bgmStart: 0.1,
        turnCallback: (actor)=>{
            if(actor.slug == 'akizet')
            {
                counter++;

                if(env.rpg.active && counter == 3)
                    startDialogue('movefriend_backpedal')

                if(env.rpg.enemyTeam.members[1].hp == 60 && counter > 3 && hasStatus(env.rpg.enemyTeam.members[1], 'regen') > 0)
                {
                    focusEnemyTeam()
                    setTimeout(()=>{startDialogue('gakvu_pranked')}, 3000)
                }
            }

        },
        endCallback: (loser) => {
            if(loser.name == "ally") env.combat.lossState()
            else if(intensity == "low") env.embassy.endMovefriendBoss()

            env.COMBAT_ACTORS.miltza.actions[0] = 'miltza_attack'
        }
    });
    env.rpg.classList.add('hideteams')
    
    setTimeout(()=>{
        startDialogue('d3_movecmb')
        cutscene(false)
    }, 2000)
}

env.embassy.startArchivalBoss = (lowIntensity = false)=>{
    env.combat.lastEngaged = "bstrdboss"
    let formation = env.COMBAT_FORMATIONS['bstrdboss']
    if(lowIntensity) formation = env.COMBAT_FORMATIONS['bstrdboss_lowintensity']

    startCombat(formation.enemies, page.party, {
        bgm: env.embassy.music_bstrdcombatfortnite, 
        bgmRate: 1,
        combatClass: "bastard",
        startCallback: ()=>{ //set up the lil dancin guys
            env.rpg.insertAdjacentHTML('beforeend', '<div id="bstrdancers"></div>')
            let dancers = document.querySelector('#bstrdancers')
            env.rpg.bstrdancerDetect = env.setInterval(()=>{
                if(env.bgm.seek() > 52 && env.bgm.seek() < 84) {
                    dancers.classList.add('dance')
                    if(env.bgm.seek() > 68) dancers.classList.add('double')
                } else {
                    dancers.classList.remove('dance')
                    setTimeout(()=>dancers.classList.remove('double'), 1000)
                }
            }, 1000)
        },
        endCallback: (loser)=> {
            if(loser.name != "ally") startDialogue('d3_archivebossend'); else env.combat.lossState()
            clearInterval(env.rpg.bstrdancerDetect)
        }
    })
    env.ADVANCE_RATE = 1500
},

env.embassy.startArchivalBossGunless = (lowIntensity = false)=>{
    env.combat.lastEngaged = "bstrdboss"
    let formation = env.COMBAT_FORMATIONS['bstrdboss_gunless']
    if(lowIntensity) formation = env.COMBAT_FORMATIONS['bstrdboss_gunless_lowintensity']
    // create a low intensity version of this ^^

    startCombat(formation.enemies, page.party, {
        bgm: env.embassy.music_bstrdcombatfortnite, 
        bgmRate: 1,
        combatClass: 'bastard',
        startCallback: ()=>{ //set up the lil dancin guys
            env.rpg.insertAdjacentHTML('beforeend', '<div id="bstrdancers"></div>')
            let dancers = document.querySelector('#bstrdancers')
            env.rpg.bstrdancerDetect = env.setInterval(()=>{
                if(env.bgm.seek() > 52 && env.bgm.seek() < 84) {
                    dancers.classList.add('dance')
                    if(env.bgm.seek() > 68) dancers.classList.add('double')
                } else {
                    dancers.classList.remove('dance')
                    setTimeout(()=>dancers.classList.remove('double'), 1000)
                }
            }, 1000)
        },
        endCallback: (loser)=> {
            if(loser.name != "ally") startDialogue('d3_archivebossend'); else env.combat.lossState()
            clearInterval(env.rpg.bstrdancerDetect)
        }
    })
    env.ADVANCE_RATE = 1500
}

env.COMBAT_ACTORS.gunlessbstrdboss = {
    name: "BSTRD Golem",
    readoutActor: "bstrd",
    maxhp: 80,
    hp: 80,
    lastStand: "bstrd",
    statusImmunities: ["stun"],
    actions: ["incoherent_grenades"],
    graphic: `
        <div class="sprite-wrapper archival-golem bstrd-golem golemsprite" id="%SLUG-sprite-wrapper">
            <div class="sprite-overflow spritestack">
                <img src="/img/sprites/combat/foes/bstbody.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                
                <div class="sprite golemsprite-head">
                    <img src="/img/sprites/combat/foes/bsthead.gif" id="%SLUG-golemsprite-head">
                    <img src="/img/sprites/combat/foes/bstface.gif" id="%SLUG-golemsprite-face">
                </div>
                <img src="/img/sprites/combat/foes/bstbody.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                <img src="https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/archivalgolem-arms-kavruka.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
            </div>

            <div class="target" entity="bstrd golem"></div>
        </div>
        `,
    reactions: {
        receive_destabilized: ["WOaoOAw"],
        receive_rez: ["AHAHA :^) GOT U"],
        puncture: ["OOUUEU"],
        destabilized: ["DOUBLE BOOMS !!"],
    }
}

env.COMBAT_ACTORS.gunlessbstrdboss_low = {
    name: "BSTRD Golem",
    readoutActor: "bstrd",
    maxhp: 200,
    hp: 200,
    statusImmunities: ["stun"],
    actions: ["kavruka_spam"],
    graphic: `
        <div class="sprite-wrapper archival-golem bstrd-golem golemsprite" id="%SLUG-sprite-wrapper">
            <div class="sprite-overflow spritestack">
                <img src="/img/sprites/combat/foes/bstbody.gif" id="%SLUG-golemsprite-base" class="sprite golemsprite-base">
                
                <div class="sprite golemsprite-head">
                    <img src="/img/sprites/combat/foes/bsthead.gif" id="%SLUG-golemsprite-head">
                    <img src="/img/sprites/combat/foes/bstface.gif" id="%SLUG-golemsprite-face">
                </div>
                <img src="/img/sprites/combat/foes/bstbody.gif" id="%SLUG-golemsprite-body" class="sprite golemsprite-body">
                <img src="https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/archivalgolem-arms-kavruka.gif" id="%SLUG-golemsprite-arms" class="sprite golemsprite-arms">
            </div>

            <div class="target" entity="bstrd golem"></div>
        </div>
        `,
    reactions: {
        receive_destabilized: ["WOaoOAw"],
        receive_rez: ["AHAHA :^) GOT U"],
        puncture: ["OOUUEU"],
        destabilized: ["DOUBLE DAMAGE !!"],
    }
}

env.COMBAT_ACTORS.enemy_movefriend.name = 'Elevatorfoe'

env.entities.movefriend.name = 'elevatorfriend'


// NON-DESTRUCTIVE COMBAT ACTION MODIFICATION

if(check('collapseSave') && check('collapseSave').pageFlags['PAGE!!checkedguns'])
{
    env.COMBAT_ACTORS.akizet.actions[0] = 'akizet_mag_dump'
}

if(check('collapseSave') && check('collapseSave').pageFlags['PAGE!!unlocked_black_box'])
{
    env.COMBAT_ACTORS.gakvu.actions[0] = 'gakvu_mag_dump'
}

if(check('collapseSave') && check('collapseSave').pageFlags['PAGE!!barfriend'])
{
    env.COMBAT_ACTORS.tozik.actions[1] = 'beer_splash'
}


// DESTRUCTIVE ACTOR CLASS MODIFICATION
// PROBLEM: errors the whole mod if there isn't an existing iteration but that's easily fixable,
//              problem stems from save system, actor's class string is saved
// TODO: figure out a nondestructive method (might not be possible)

// page.party[0].class = 'Fortnite Veteran'

// page.party[1].class = 'My Bestie'

// page.party[2].class = 'Tipsy Technician'


// BULLET HELL

function bh_movefriend({level="tutorial", duration=15000}) {
	var sending = {} //holds objects passed to attack functions
	var effectiveDuration = duration

	//switch to determine what to send and how quickly to send it
	var possibleConfigs
	ratween(env.bgm, 1)

	bh_invuln(true)
	setTimeout(()=>bh_invuln(false), 1500)
	setTimeout(()=>env.bulletHell.p.classList.add('hidenotice'), 1500)

	env.bulletHell.complete = ()=>{
		bh_stop()
		MUI("deprohibit")
		env.bulletHell.p.classList.remove('active')
		body.classList.remove('in-golem-vortex')
		env.rpg.classList.remove('cull')
		env.rpg.vortex.classList.remove('active')
		env.rpg.actionZone.classList.remove('active')
		if(env.rpg.active) ratween(env.bgm, 0.75)
						
		setTimeout(()=>{
			env.rpg.vortex.remove()
			env.rpg.actionZone.remove()
			env.bulletHell.p.remove()
			if(env.rpg.active) advanceTurn();
		}, 2000)
	}

	switch(level) {
		case "tutorial":
            // sets attack's accuracy to guaranteed for just this moment
            env.ACTIONS["incoherent_movefriend"].accuracy = 100

			// surprise 1 spike
			env.bulletHell.setTimeout(()=> {
                bh_sidespike({ side: "left", duration: 1000, targetPlayer: true, targetVariance: 0})
			}, duration - 1000)

            // ok back to normal :)
            env.bulletHell.setTimeout(()=> {
                env.ACTIONS["incoherent_movefriend"].accuracy = 1
			}, duration)
		break

		case "healthy":
			//we start with the list of 'basic' attacks
			possibleConfigs = [
				//two random pits and random spikes
				()=> {
					bh_pit({ spot: "random", growSpeed: 5000, size: "75vmax" })
					bh_pit({ spot: "random", growSpeed: 5000, size: "75vmax" })
					env.bulletHell.setInterval(()=>bh_sidespike({ side: "random", duration: 4000, targetPlayer: 1 }), 500)
					env.bulletHell.intervals.push(bh_spiralspike({speed: 5000, rate: 1000}))
				},
		
				//diagonal pits that shift to other pits, with random spikes
				()=> {
					let firstPits = [bh_pit({ spot: "top left", growSpeed: 5000, size: "75vmax" }), bh_pit({ spot: "bottom right", growSpeed: 5000, size: "75vmax" })]
					env.bulletHell.setInterval(()=>bh_sidespike({ side: "random", duration: 4000, targetPlayer: 1 }), 500)
					env.bulletHell.setTimeout(()=>{
						firstPits.forEach(el=>el.classList.remove('growing'))
						bh_pit({ spot: "bottom left", growSpeed: 5000, size: "75vmax" })
						bh_pit({ spot: "top right", growSpeed: 5000, size: "75vmax" })
					}, 8000)
				},

				//a wall comes in from above, then below, while speedy horizontal spikes are thrown
				()=> {
					let topWall = bh_wall({side: "top"})
					env.bulletHell.setInterval(()=>bh_sidespike({ side: "horizontal", duration: 3000, targetPlayer: 1, targetVariance: 200 }), 500)

					env.bulletHell.setTimeout(()=>{
						topWall.classList.add('inactive')
						let bottomWall = bh_wall({side: "bottom"})
					}, 8000)
				},

				//ditto, but turned 90 degrees
				()=> {
					let topWall = bh_wall({side: "right"})
					env.bulletHell.setInterval(()=>bh_sidespike({ side: "vertical", duration: 3000, targetPlayer: 1, targetVariance: 200 }), 500)

					env.bulletHell.setTimeout(()=>{
						topWall.classList.add('inactive')
						let bottomWall = bh_wall({side: "left"})
					}, 8000)
				},
			]
			possibleConfigs[rand(0, possibleConfigs.length)]()
		break

		case "threatened":
			//then comes the list of more intermediate attacks
			possibleConfigs = [
				//walls come in from bottom and left with bullets from above, then shifts down to left corner through some more walls, then moves to right corner
				()=> {
					let bottomWall = bh_wall({side: "bottom", speed: 5000, size: 70})
					let leftWall = bh_wall({side: "left", speed: 5000, size: 70})
					let bottomBullets = env.bulletHell.setInterval(()=>bh_sidespike({ side: "bottom", duration: 5000, targetPlayer: 0 }), 500)

					var topBullets, topWall, rightWall
					env.bulletHell.setTimeout(()=>{
						bottomWall.classList.add('inactive')
						leftWall.classList.add('inactive')

						clearInterval(bottomBullets)
						topBullets = env.bulletHell.setInterval(()=>bh_sidespike({ side: "top", duration: 5000, targetPlayer: 0 }), 900)

						topWall = bh_wall({side: "top", speed: 5000, size: 70})
						rightWall = bh_wall({side: "right", speed: 5000, size: 70})
					}, 5000)

					env.bulletHell.setTimeout(()=>{
						rightWall.classList.add('inactive')
						bh_wall({side: "left", speed: 5000, size: 70})
					}, 10000)
				},
				
				//spiral spike attack
				()=>{
					env.bulletHell.setInterval(()=>bh_sidespike({ side: "horizontal", duration: 8000, targetPlayer: 0}), 900)
					
					env.bulletHell.setTimeout(()=>{
						bh_pit({spot: "center", size: "80vmax"})
						env.bulletHell.intervals.push(bh_spiralspike({}))
					}, 2000)
					env.bulletHell.setTimeout(()=>{
						bh_pit({spot: "top left", size: "50vmax"})
						bh_pit({spot: "bottom right", size: "45vmax"})
					}, 4000)
					env.bulletHell.setTimeout(()=>{
						bh_pit({spot: "bottom left", size: "45vmax"})
						bh_pit({spot: "top right", size: "50vmax"})
					}, 4000)
				},
				
				
				//pits form, only leaving one spot (the center) safe at first
				//outer pits recede, while a center one expands
				()=>{
					let topLeftPit = bh_pit({spot: "top left", size: '70vmax', growSpeed: "3000"})
					let midLeftPit = bh_pit({spot: "center left", size: '70vmax', growSpeed: "3000"})
					let botLeftPit = bh_pit({spot: "bottom left", size: '70vmax', growSpeed: "3000"})
					let topRightPit = bh_pit({spot: "top right", size: '75vmax', growSpeed: "3000"})
					let midRightPit = bh_pit({spot: "center right", size: '70vmax', growSpeed: "3000"})
					let botRightPit = bh_pit({spot: "bottom right", size: '70vmax', growSpeed: "3000"})
					let botPit = bh_pit({spot: "bottom", size: '50vmax', growSpeed: "3000"})
					let topPit = bh_pit({spot: "top", size: '50vmax', growSpeed: "3000"})
					let cenPit;

					env.bulletHell.speedDivider = 3

					let bullets = env.bulletHell.setInterval(()=>bh_sidespike({ side: "vertical", duration: 5000, targetPlayer: 0.8, targetVariance: 400}), 500)
					env.bulletHell.setTimeout(()=>{
						cenPit = bh_pit({spot: "center", size: "80vmax", growSpeed: "8000"})
						midLeftPit.classList.remove('growing')
						midRightPit.classList.remove('growing')
					}, 3000)

					env.bulletHell.setTimeout(()=>{
						midLeftPit.style.setProperty("--growSpeed", "4000ms")
						midRightPit.style.setProperty("--growSpeed", "4000ms")
						midLeftPit.classList.add('growing')
						midRightPit.classList.add('growing')

						topLeftPit.classList.remove('growing')
						botRightPit.classList.remove('growing')
						
						env.bulletHell.speedDivider = 4
					}, 6000)

					env.bulletHell.setTimeout(()=>{
						topLeftPit.style.setProperty("--growSpeed", "4000ms")
						botRightPit.style.setProperty("--growSpeed", "4000ms")
						topLeftPit.classList.add('growing')
						botRightPit.classList.add('growing')

						topPit.classList.remove('growing')
						botPit.classList.remove('growing')
					}, 10000)
				}
				
			]
			possibleConfigs[rand(0, possibleConfigs.length)]()
		break

		case "last stand":
		// if pranked make attack basically guaranteed to hit
        if(check('PAGE!!pranked')) env.ACTIONS["incoherent_movefriend"].accuracy = 100
        
        //in this mode, it starts with pits in all corners that grow over some time
			changeBgm(env.embassy.music_p1boss_laststand, {preserve: false, length: 7000})

			let currentPits = [
				bh_pit({ spot: "top left", growSpeed: 7500, size: "75vmax" }),
				bh_pit({ spot: "top right", growSpeed: 7500, size: "75vmax" }),
				bh_pit({ spot: "bottom left", growSpeed: 7500, size: "75vmax" }),
				bh_pit({ spot: "bottom right", growSpeed: 7500, size: "75vmax" }),
			]

			let fastSpeed = 500
			if(window.innerHeight < 800) {
				fastSpeed = 900
			}

			//meanwhile some TARGETED side spikes fly in
			let currentSpikes = []
        if(!check('PAGE!!pranked')) {
			env.bulletHell.setTimeout(()=>{
				currentSpikes.push(
					env.bulletHell.setInterval(()=>bh_sidespike({ side: "left", duration: 3000, targetPlayer: 0.8 }), fastSpeed)
				)

				env.bulletHell.setTimeout(()=>
					currentSpikes.push(
						env.bulletHell.setInterval(()=>bh_sidespike({ side: "right", duration: 3000, targetPlayer: 0.8 }), fastSpeed)
					)
				, 250)
			}, 1000)
        } else {
            env.bulletHell.setTimeout(()=>{
				currentSpikes.push(
					env.bulletHell.setInterval(()=>bh_sidespike({ side: "left", duration: 3000, targetPlayer: 1 }), fastSpeed / 4)
				)

				env.bulletHell.setTimeout(()=>
					currentSpikes.push(
						env.bulletHell.setInterval(()=>bh_sidespike({ side: "right", duration: 3000, targetPlayer: 1 }), fastSpeed / 4)
					)
				, 250)
			}, 1000)
        }

			var firstSpiral
			env.bulletHell.setTimeout(()=>{
				firstSpiral = bh_spiralspike({speed: 1500, rate: fastSpeed, targetPlayer: 1, targetVariance: 0})
			}, 5000)

			//after a little bit of survival, we put walls over the pits and then fade the pits away
			//then the side spikes are swapped out for vertical spikes
			let currentWalls = []
			env.bulletHell.setTimeout(()=>{
				currentPits.forEach(el=>{
					el.classList.remove('growing')
					env.bulletHell.setTimeout(()=>el.remove, 7500)
				})

				currentWalls.push(
					bh_wall({side: "top", speed: 5000, size: 40}),
					bh_wall({side: "bottom", speed: 5000, size: 40})
				)

				env.bulletHell.setTimeout(()=>{
					currentSpikes.forEach(spike => clearInterval(spike))
					currentSpikes = []
				}, 4000)

				env.bulletHell.setTimeout(()=>{
					currentSpikes.push(
						env.bulletHell.setInterval(()=>bh_sidespike({ side: "top", duration: 3000, targetPlayer: 1, targetvariance: 200 }), 1000)
					)
	
					env.bulletHell.setTimeout(()=>
						currentSpikes.push(
							env.bulletHell.setInterval(()=>bh_sidespike({ side: "bottom", duration: 3000, targetPlayer: 1, targetvariance: 200 }), 1000)
						)
					, 500)
	
					env.bulletHell.setTimeout(()=>
						currentSpikes.push(
							env.bulletHell.setInterval(()=>bh_sidespike({ side: "vertical", duration: 4000, targetPlayer: 0 }), 1000)
						)
					, 750)
				}, 4005)
			}, 10000)

			//after a little longer, a wall closes in from the left, then retracts as another comes in from the right
			var leftWall
			env.bulletHell.setTimeout(()=>{
				leftWall = bh_wall({side: "left", speed: 10000, size: 60})
				currentWalls.push(leftWall)
			}, 20000)

			//the left wall recedes again, letting the right one come in
			var rightWall
			env.bulletHell.setTimeout(()=>{
				let tempLeft = leftWall
				tempLeft.classList.add("inactive")
				env.bulletHell.setTimeout(()=>{tempLeft.remove()}, 10000)

				rightWall = bh_wall({side: "right", speed: 10000, size: 60})
				currentWalls.push(rightWall)

				clearInterval(firstSpiral)
			}, 30000)

			//the walls recede, giving way to growing pits
			var briefSpiral
			env.bulletHell.setTimeout(()=>{
				currentWalls.forEach(wall=>{
					wall.classList.add('inactive')
					env.bulletHell.setTimeout(()=>{wall.remove()}, 10000)
				})

				if(!check('PAGE!!pranked')) briefSpiral = bh_spiralspike({speed: 5000, rate: 800, targetPlayer: 0.5, targetVariance: 100})
                else briefSpiral = bh_spiralspike({speed: 4000, rate: 200, targetPlayer: 1, targetVariance: 0})

				bh_pit({spot: "top right", size: "100vmax", growSpeed: 30000})
				bh_pit({spot: "top left", size: "100vmax", growSpeed: 30000})
				bh_pit({spot: "bottom right", size: "100vmax", growSpeed: 30000})
				bh_pit({spot: "bottom left", size: "100vmax", growSpeed: 30000})
				bh_pit({spot: "top", size: "40vmax", growSpeed: 30000})
				bh_pit({spot: "bottom", size: "40vmax", growSpeed: 30000})

				currentSpikes.forEach(spike => clearInterval(spike))
				currentSpikes = []
			}, 35000)
			
			//spikes are refreshed to be a little more aggressive, slowly growing less so
			//at first they're fairly targeted
			let lastSpikes
			env.bulletHell.setTimeout(()=>{
				clearInterval(lastSpikes)
				lastSpikes = env.bulletHell.setInterval(()=>bh_sidespike({ side: "random", duration: 3000, targetPlayer: 0.7, targetvariance: 100 }), 400)
				ratween(env.bgm, 0.5, 20000)
			}, 35000)

			env.bulletHell.setTimeout(()=>{
				firstSpiral = bh_spiralspike({speed: 4000, rate: fastSpeed, targetPlayer: 0.5, targetVariance: 100})
			}, 40000)

			//then they grow slower and more random
			env.bulletHell.setTimeout(()=>{
				clearInterval(lastSpikes)
				clearInterval(firstSpiral)
				clearInterval(briefSpiral)
				env.bulletHell.speedDivider = 3
				env.bulletHell.setInterval(()=>bh_sidespike({ side: "random", duration: 4000, targetPlayer: 0.5, targetvariance: 200 }), 600)
				env.bulletHell.setInterval(()=>bh_sidespike({ side: "random", duration: 6000, targetPlayer: 0.5, targetvariance: 300 }), 800)
                env.setTimeout(()=>chatter({actor: 'gakvu', text: 'just hold on....', readout: true}), 1000)
			}, 45000)

			//gakvu tries to get through
			var gakplat
			env.bulletHell.setTimeout(()=>{
				env.rpg.actionZone.insertAdjacentHTML("beforeend", `<div class="bh_platform bh_gakvuplatform">`)
				gakplat = document.querySelector(".bh_gakvuplatform")
                env.setTimeout(()=>chatter({actor: 'gakvu', text: 'i almost...', readout: true}), 100)

				env.bulletHell.setTimeout(()=>gakplat.classList.add('active'), 100)
				env.bulletHell.setTimeout(()=>gakplat.classList.add('activefail'), 2000)
                env.setTimeout(()=>chatter({actor: 'gakvu', text: 'ⵙ┴❀ᚈ⒫', readout: true}), 2000)
			}, 55000)
			
			//finally, they stop, gakvu breaking through
			env.bulletHell.setTimeout(()=>{
				env.bulletHell.clearIntervals()
                chatter({actor: 'gakvu', text: 'got it!!', readout: true})
				setTimeout(()=>{play("mend", 0.25)}, 1000),
				env.bulletHell.setTimeout(()=>{gakplat.classList.remove('activefail'); play("mend", 0.25)}, 2000)
				env.bulletHell.setTimeout(()=>gakplat.classList.add('explosion'), 4100)

                // resets attack accuracy
                env.ACTIONS["incoherent_movefriend"].accuracy = 1
			}, 63000)

			env.bulletHell.setTimeout(()=>{
				try{ endCombat(env.rpg.enemyTeam) } catch(e) { /* miltzabug */ }
				env.embassy.endMovefriendBoss()
			}, 68000)
		break
	}

	//set up ending based on input duration
	env.bulletHell.setTimeout(env.bulletHell.complete, effectiveDuration); 
}

function bh_grenade(urgency = "low") {
    if(typeof env.rpg.kavrukaDamage == "undefined") env.rpg.kavrukaDamage = []
	bh_invuln(true)
	env.bulletHell.protectionTime = 200; //we want it to hurt really bad if you stay still

	setTimeout(()=>env.bulletHell.p.classList.add('hidenotice'), 1500)
	setTimeout(()=>env.bulletHell.p.classList.remove('notice', 'hidenotice'), 2000)

	setTimeout(()=>{bh_invuln(false)}, 2000)
	
	env.bulletHell.complete = ()=>{
		if(env.rpg.active){
			bh_stop()
			MUI("deprohibit")
			body.classList.remove('in-golem-vortex')
			env.rpg.classList.remove('cull')
			env.rpg.vortex.classList.remove('active')
			env.rpg.actionZone.classList.remove('active')
			
			setTimeout(()=>{
				env.rpg.vortex.remove()
				env.rpg.actionZone.remove()
				env.bulletHell.p.remove()
				if(env.rpg.currentActor.name == "BSTRD Golem") advanceTurn();
			}, 2000)

			env.bulletHell.p.classList.remove('active')
		}
	}

    switch(urgency) {
		case 'tutorial': 
			bh_kavruka_alt({})

			env.bulletHell.setTimeout(()=>{
				bh_kavruka_alt({})
			}, 3000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka_alt({})
			}, 5000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka_alt({})
			}, 7000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka_alt({})
			}, 9000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka_alt({})
			}, 10000)

			env.bulletHell.setTimeout(env.bulletHell.complete, 17000)
		break

		case 'low': 
			bh_kavruka_alt({})

			env.bulletHell.setTimeout(()=>{
				bh_kavruka_alt({})
			}, 3000)

            env.bulletHell.setTimeout(()=>{
				bh_kavruka_alt({})
			}, 4000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka_alt({})
			}, 5000)

            env.bulletHell.setTimeout(()=>{
				bh_kavruka_alt({})
			}, 6000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka_alt({})
			}, 7000)

            env.bulletHell.setTimeout(()=>{
				bh_kavruka_alt({})
			}, 8000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka_alt({})
			}, 9000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka_alt({})
			}, 10000)

			env.bulletHell.setTimeout(env.bulletHell.complete, 17000)
		break

		//last stand focuses more on bullets or grenades depending on stage damage
		case "last_stand": 
			env.ADVANCE_RATE = 2000
			env.bulletHell.protectionTime = 600
			ratween(env.bgm, 1.15)

			let bstrd = env.rpg.enemyTeam.members.find(member => member.name == "BSTRD Golem")
			let tozik = env.rpg.allyTeam.members.find(member => member.name == "Tozik")
			
            if(env.rpg.kavrukaDamage.length <= 20){
				rpgDialogue(bstrd, "I STILL GOT SO MANY!!!", true)
				for (let i = 0; i < 3; i++) bh_kavruka_alt({delay: 4000 + (i * 500)})
				env.bulletHell.setTimeout(()=>rpgDialogue(bstrd, "BOOM!! BOOM!!!!", true), 3000)
				env.bulletHell.setTimeout(()=>rpgDialogue(bstrd, "WOOOO!!!! YEAAAA!!!", true), 5000)
				env.bulletHell.setTimeout(()=>{
					for (let i = 0; i < 7; i++) bh_kavruka_alt({delay: 4000 + (i * 500)})
					rpgDialogue(bstrd, "HOLD ON I GOT SOME MORE", true)
				}, 6000)
				env.bulletHell.setTimeout(()=>rpgDialogue(bstrd, "nyeooowww", true), 9000)
				if(check('PAGE!!barfriend', true))
                    env.bulletHell.setTimeout(()=> rpgDialogue(tozik, "...h-hic.. tis is nothig..", true), 15000);
                else 
                    env.bulletHell.setTimeout(()=> rpgDialogue(tozik, "this is nothing", true), 15000);
				env.bulletHell.setTimeout(()=>rpgDialogue(bstrd, "yeaa :P", true), 16000)
                env.bulletHell.setTimeout(()=>rpgDialogue(bstrd, "actually been saving it for this part brace urselvs", true), 18000)
				env.bulletHell.setTimeout(()=>{
					for (let i = 0; i < 280; i++) bh_kavruka_alt({delay: 4000 + (i * 35)})
					rpgDialogue(bstrd, "nyyuueeeooowww", true)
				}, 20000)
				env.bulletHell.setTimeout(()=>rpgDialogue(bstrd, "o sht", true), 30000)
				env.bulletHell.setTimeout(()=>{
					error.play()
					setTimeout(()=>error.play(), 200)
					setTimeout(()=>error.play(), 400)
					setTimeout(()=>error.play(), 700)
					setTimeout(()=>error.play(), 900)
				}, 30000)
			} else {
				ratween(env.bgm, 0.75, 2000)
				rpgDialogue(bstrd, "OVER ALREADY??", true)
				env.bulletHell.setTimeout(()=>rpgDialogue(bstrd, "BUT I STILL HAVE SO MUCH!!", true), 2000)
				env.bulletHell.setTimeout(()=>{
					rpgDialogue(bstrd, "OK IM JUST GONNA USE THEM ALL NOW", true)
					ratween(env.bgm, 1.15)
				}, 4000)
				
				for (let i = 0; i < 208; i++) {
					env.bulletHell.setTimeout(()=>bh_kavruka_alt({}), 3500 + (i * 125))
				}

				env.bulletHell.setTimeout(()=>{	
					error.play()
					setTimeout(()=>error.play(), 200)
					setTimeout(()=>error.play(), 400)
					setTimeout(()=>error.play(), 700)
					setTimeout(()=>error.play(), 900)
				}, 36000)
			}

			env.bulletHell.setTimeout(()=>{	
				env.bulletHell.complete()
				ratween(env.bgm, 0.25, 6000)
				env.bgm.fade(env.bgm.volume(), 0.25, 6000)

				if(env.rpg.enemyTeam.members[0].hp > 0 || env.rpg.enemyTeam.members[2].hp > 0) {
					cutscene(true)
					env.rpg.enemyTeam.members[0].hp = 0
					env.rpg.enemyTeam.members[2].hp = 0
					updateStats()

					env.bulletHell.setTimeout(()=>{
						rpgDialogue(bstrd, "blew them up", true)
					}, 2000)

					env.bulletHell.setTimeout(()=>{
						rpgDialogue(bstrd, "im out", true)
					}, 4000)

					env.bulletHell.setTimeout(()=>{
						endCombat(env.rpg.enemyTeam)
						cutscene(false)
					}, 7000)
				} else {
					cutscene(true)

					env.bulletHell.setTimeout(()=>{
						rpgDialogue(bstrd, "im out", true)
					}, 2000)

					env.bulletHell.setTimeout(()=>{
						endCombat(env.rpg.enemyTeam)
						cutscene(false)
					}, 7000)
				}
			}, check("PAGE!!unlocked_black_box") ? 50000 : 36000)
		break;

		default:
			bh_kavruka_alt({})

			env.bulletHell.setTimeout(()=>{
				bh_kavruka_alt({})
			}, 2000)

            env.bulletHell.setTimeout(()=>{
				bh_kavruka_alt({})
			}, 3000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka_alt({})
			}, 4000)

            env.bulletHell.setTimeout(()=>{
				bh_kavruka_alt({})
			}, 5000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka_alt({})
			}, 6000)

            env.bulletHell.setTimeout(()=>{
				bh_kavruka_alt({})
			}, 7000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka_alt({})
			}, 8000)

            env.bulletHell.setTimeout(()=>{
				bh_kavruka_alt({})
			}, 9000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka_alt({})
			}, 10000)

            env.bulletHell.setTimeout(()=>{
				bh_kavruka_alt({})
			}, 11000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka_alt({})
			}, 12000)

			env.bulletHell.setTimeout(env.bulletHell.complete, 17000)
		break;
	}
}

function bh_kavruka_alt({delay = 4400}) {
	//chooses random spot within screen bounds, leave space for full circle
	if(typeof env.rpg.kavrukaDamage == "undefined") env.rpg.kavrukaDamage = []
	if(env.rpg.kavrukaDamage >= 100) return
	let ringLimitX = env.rpg.kavrukaDamage.length * (window.innerWidth * 0.005);
	let ringLimitY = env.rpg.kavrukaDamage.length * (window.innerHeight * 0.005);
	let limits = {
		x: {
			min: ringLimitX,
			max: window.innerWidth - ringLimitX
		},
		y: {
			min: ringLimitY,
			max: window.innerHeight - ringLimitY
		}
	}

	if(env.rpg.kavrukaDamage.length < 60) {
		//do an initial random roll for position
		function roll() {finalX = rand(limits.x.min, limits.x.max); finalY = rand(limits.y.min, limits.y.max)}
		roll()

		//account for updated limits given screen damage
		//reroll the position if what it got was within one of the existing damage zones
		let rollTries = 0
		while(!env.rpg.kavrukaDamage.every(damage=>{
			return (!(finalX > damage.x && finalX < damage.xMax) && !(finalY > damage.y && finalY < damage.yMax))
		}) && rollTries < 10) { roll(); rollTries++ }
	} else {
		let scale = (window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight)
		finalX = (window.outerWidth / 2) - scale * 0.15
		finalY = (window.outerHeight / 2) - scale * 0.15
	}

	//lifecycle:
	// start - spot chosen, kavruka animates in as if tossed
	// risk - yellow spot appears, in this window pressing Q/E or clicking deflects
	// fail - explosion - kavruka explodes, wracking screen with static for an instant (invuln)
	//		  permadamage appears and is added to list

	//create element with css variables necessary, correspond to css setup for animation
	let currentBullet = env.bulletHell.bulletCount++
	document.querySelector('.bh_damage-wrapper').insertAdjacentHTML('beforeend', `
		<div id="bh_kavruka-${currentBullet}" 
			class="bh_kavruka"
			style="--delay: ${delay}ms; --spritedelay: ${delay + 500}ms; --x: ${finalX}px; --y: ${finalY}px">
		</div>
	`)
	let bh_currentBullet = document.querySelector(`#bh_kavruka-${currentBullet}`)

	//mouse or q/e press event for kavruka deflection
	//if you're over "deflectable", mark it deflected and track that out here too
	//this is an inner function so each kavruka has its own reference
	let deflected = false
	function bh_kavruka_action() {
		env.bulletHell.p.classList.remove('pulse')
		env.setTimeout(()=>{env.bulletHell.p.classList.add('pulse')}, 50)

		let targets = document.elementsFromPoint(env.bulletHell.cursorDelta.x, env.bulletHell.cursorDelta.y)
		targets.forEach(el=>{
			if(el == bh_currentBullet)
            {
				if(bh_currentBullet.classList.contains('bh_deflectable'))
                {
                    el.classList.add('bh_deflected')
				    deflected = true
				    play('miss', 0.75)
                }
                else
                {
                    el.classList.add('bh_grenade_shot')
				    deflected = true
				    play(['fortniteShot', 'ar15Shot'].sample(), 1)
                    setTimeout(()=>{bh_currentBullet.remove()}, 200)
                }
			}
		})
	}
	function bh_kavruka_keydown(e) {if (e.key == "q" || e.key == "e") bh_kavruka_action()}

	//add timeout to enter deflect mode
    body.addEventListener('click', bh_kavruka_action)
	body.addEventListener('keydown', bh_kavruka_keydown)
    
	env.bulletHell.setTimeout(()=>{
		bh_currentBullet.classList.add("bh_deflectable")
	}, delay)

	//add timeout to remove or explode
	//deflected == false means failure
	env.bulletHell.setTimeout(()=>{
		body.removeEventListener('click', bh_kavruka_action)
		body.removeEventListener('keydown', bh_kavruka_keydown)

		if(deflected) { //successful reflection
			setTimeout(()=> bh_currentBullet.remove(), 1000 )
		} else { //detonation
			bh_currentBullet.classList.remove("bh_deflectable")
			bh_currentBullet.classList.add('exploding', 'bh_damager')
			play('shot1', 0.5, 2)

			let pos = bh_currentBullet.getBoundingClientRect()
			let scale = (window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight)
			let kavrukaData = {
				x: pos.x + (pos.width / 2),
				y: pos.y + (pos.height / 2),
				//these are used for calcs on rolling future throw positions
				xMax: pos.x + pos.width,
				yMax: pos.y + pos.height,
				width: scale * 0.3,
				height: scale * 0.3,
				deg: `${rand(0, 360)}deg`
			}
			env.rpg.kavrukaDamage.push(kavrukaData)

			//update or add fire ring if needed
			if(env.rpg.kavrukaFireRing) env.rpg.kavrukaFireRing.style.setProperty('--kavrukaDamageCount', env.rpg.kavrukaDamage.length);
			else {
				env.rpg.actionZone.insertAdjacentHTML('beforeend', `
				<div id="bh_kavrukafirering" 
					class="bh_damager bh_kavrukafirering"
					style="--kavrukaDamageCount: ${env.rpg.kavrukaDamage.length}">
				</div>`)
				env.rpg.kavrukaFireRing = document.querySelector('#bh_kavrukafirering')
			}

			setTimeout(()=>{ //do fire addition
				bh_kavrukadamage(kavrukaData, true)
			}, 750)

			setTimeout(()=>{		
				bh_currentBullet.remove()
			}, 1000)
		}
		
	}, delay + 500)
}


// STAGE MODIFICATIONS

env.stages['embassy_cquarters2'].exec = ()=> { 
    env.embassy.updateStageData()
    toggleBgm(env.embassy.music_safe)

    if(!check('PAGE!!kazkiroom')) {
        startDialogue("d3r2")
        change('PAGE!!kazkiroom', true)
    }
    
    if(check('PAGE!!checkedguns')) {
        
    }

    env.stage.current.onStep()
}

if(check('collapseSave') && flags.collapseSave.inventory.findIndex(item => item[0].slug === 'sorry_cyst') != -1)
    env.stages['embassy_archivalcore_sensitive'].entities['<'].class = 'door realdoorbroken left'
else
    env.stages['embassy_archivalcore_sensitive'].entities['<'].class = 'door realdoor left'

env.stages.embassy_recreation.entities.r.lockExec = ()=>{if(isStageClear() == false) chatter({actor: 'sourceless', text: 'WE MUST KILL THEM ALL', readout: true}); else chatter({actor: 'sourceless', text: 'NOW WE RESCUE THEM', readout: true});}

if(check('collapseSave') && check('PAGE!!mindcore2extracted'))
    env.stages.embassy_recreation.entities['q'].contains.class = 'dyingqou collapseonly chestopen'

env.stages.embassy_cpersonnel.entities['{'].lockExec = ()=>{setTimeout(() => {chatter({actor: 'akizet', text: 'locked.', readout: true})}, 1000); lockedDoor.play()}
env.stages.embassy_cpersonnel.entities['}'].lockExec = ()=>{setTimeout(() => {chatter({actor: 'akizet', text: 'locked.', readout: true})}, 1000); lockedDoor.play()}

env.stages.embassy_archivalvein.entities['v'].lockExec = ()=>{setTimeout(() => {chatter({actor: 'akizet', text: 'locked.', readout: true})}, 1000); lockedDoor.play()}

env.stages.embassy_archivalintro.entities['♠'].exec = ()=> {
    if(document.querySelectorAll('.evil') && !check("PAGE!!archivewarn")) {
        chatter({actor: 'akizet', text: 'look ahead!! foes!!', readout: true})
        setTimeout(()=>chatter({actor: 'akizet', text: 'golems formed of black corru...', readout: true}), 2000)
        setTimeout(()=>chatter({actor: 'akizet', text: 'they are not that tough, we should be able to take em', readout: true}), 4000)
        change("PAGE!!archivewarn", true)
    }
}

env.stages['embassy_archivalboss'].entities['^'].class = 'door up realdoorframe'

env.stages['embassy_archivalboss'].entities["L"] = {
    class: "prop",
    contains: {
        class: "literaldoor",
        html: `<figure style="transform: rotateY(0deg)"></figure>`
    }
}

env.stages['embassy_archivalboss'].plan['39'] = 'L'

// INSPECT ENTITY

env.entities["unkind eye"].actions[0].exec = () => {
    change('PAGE!!eyeexamined', true)

    MUI('prohibit')
    chatter({actor: 'akizet', text: 'damn thats some big balls'})
    env.setTimeout(()=>chatter({actor: 'gakvu', text: 'akizet those are not balls'}), 3000)
    env.setTimeout(()=>chatter({actor: 'gakvu', text: 'those are circles'}), 6000)
    env.setTimeout(()=>chatter({actor: 'akizet', text: 'whgat???'}), 9000)
    if(check('PAGE!!barfriend', false)) env.setTimeout(()=>chatter({actor: 'tozik', text: 'what the actual fuck are you guys on about'}), 12000); else env.setTimeout(()=>chatter({actor: 'tozik', text: '...hehhheh..'}), 12000)
    if(check('PAGE!!barfriend', false)) env.setTimeout(()=>chatter({actor: 'tozik', text: 'thats the eye of velzie'}), 15000); else env.setTimeout(()=>chatter({actor: 'tozik', text: 'ehehhehhh..hic..! b-balls..'}), 15000)
    if(check('PAGE!!barfriend', false)) env.setTimeout(()=>chatter({actor: 'tozik', text: 'a rather comical depiction'}), 18000); else env.setTimeout(()=>chatter({actor: 'tozik', text: 'truue...'}), 18000)
    if(check('PAGE!!barfriend', false)) env.setTimeout(()=>chatter({actor: 'sourceless', text: 'I KNOW WHO TO BELIEVE'}), 23000); else env.setTimeout(()=>chatter({actor: 'sourceless', text: 'YEEAAAAH TOZIK KNOWS WHAT IM TALKIN ABOUT'}), 23000)
    if(check('PAGE!!barfriend', false)) env.setTimeout(()=>{chatter({actor: 'sourceless', text: 'ME, I AM THE ONLY PERSON WHO IS RIGHT'}); MUI('deprohibit')}, 27000); else env.setTimeout(()=>{chatter({actor: 'sourceless', text: 'I AM THE ONLY PERSON WHO IS RIGHT'}); MUI('deprohibit')}, 27000)
}

env.entities["simulacra"].actions[0].exec = () => { chatter({actor: 'akizet', text: 'i dont like wine, beer, or the black death', readout: true}); change('PAGE!!kazkisip', true) }

env.entities["barfriend"].actions[2].showIf = ()=>{return check('PAGE!!embassy_day', 3) && isStageClear(true) && check('PAGE!!barfriend', false)} // checks to make sure the room has been cleared and the player have not talked to barfriend before
env.entities["barfriend"].actions[2].name = "get a drink"

env.entities["damaged qou body"].actions[0].name = "perform cpr"
env.entities["damaged qou body"].actions[0].exec = ()=>{
    if(isStageClear()) {
        startDialogue('d3_rec_body1');
        change("PAGE!!mindcore1extracted", true)
        if(check("PAGE!!mindcore1extracted") && check("PAGE!!mindcore2extracted")) change("PAGE!!recreation_leavable", true)
        
    } else chatter({actor: 'sourceless', text: 'FIRST WE SCRAMBLE THESE FOES LIKE AN OMLETTE', readout: true})
}

env.entities["mangled qou body"].actions[0].name = "loot"
env.entities["mangled qou body"].actions[0].exec = ()=>{
    if(isStageClear()) {
        startDialogue('d3_rec_body2');
        change("PAGE!!mindcore2extracted", true)
        if(check("PAGE!!mindcore1extracted") && check("PAGE!!mindcore2extracted")) change("PAGE!!recreation_leavable", true)
        
    } else chatter({actor: 'sourceless', text: 'FIRST WE SCRAMBLE THESE FOES LIKE AN OMLETTE', readout: true})
}

env.entities['bstrd door'].actions[0].exec = ()=>{
    chatter({actor: 'sourceless', text: 'LET US DUNK ON THESE FOES FIRST', readout: true})
}

env.entities['bstrd door'].actions[5].exec = ()=>{
    cutscene(true)

    chatter({actor: 'bstrd', text: 'WHAT THA FACKINGE SHAT', readout: true, delay: 2000})
    chatter({actor: 'bstrd', text: 'umm sounds coolio but i gotta biz my shet in here', readout: true, delay: 4000})
    chatter({actor: 'bstrd', text: 'mayb3 LATA :p bich', readout: true, delay: 7000})

    env.setTimeout(()=>{
        play("talkchoir", 0.75)
        vfx({type: 'beacon', state: true})
    }, 400)

    setTimeout(()=>{
        vfx({type: 'beacon', state: false})
        cutscene(false)
    }, 7000)
}

env.entities['unnerving cyst'].actions[0].exec = ()=>{
    chatter({actor: 'sourceless', text: 'LET US DUNK ON THESE FOES FIRST', readout: true})
}

env.entities['bstrd golem'].actions[0].exec = ()=>{
    if(check('PAGE!!unlocked_black_box')) {
        chatter({actor: 'bstrd', text: "BUSY getting my SHIET FLIPPED in a SAUCED PAN", readout: true, delay: 2000})
        chatter({actor: 'bstrd', text: "CANOT BELIEV my GUNE was FUKN STOLEN", readout: true, delay: 4000})
        chatter({actor: 'bstrd', text: "FACK YU BICTH >:[", readout: true, delay: 6000})
    }
    else
    {
        chatter({actor: 'bstrd', text: "BUSY MURDRNING U RN", readout: true, delay: 2000})
        chatter({actor: 'bstrd', text: "POW POW >:}", readout: true, delay: 4000})
    }

    env.setTimeout(()=>{
        play("talkchoir", 0.75)
        vfx({type: 'beacon', state: true})
    }, 400)

    setTimeout(()=>{
        vfx({type: 'beacon', state: false})
    }, 2000)
}


// CUSTOM FUNCTIONS

    // thanks chatgpt for this one
    // EDIT: i REALLY need to get rid of this code and reuse the method i used for the qou body chest, soon though!
function updateGunRack() {
    const elements = document.querySelectorAll('.gridpiece.prop > .kazkiguns');

    elements.forEach((element) => {
        if(check('PAGE!!checkedguns'))
            element.classList.add('empty_gun_rack');
        else
            element.classList.add('scarl_gun_rack')
    });
}

env.stages['embassy_cpersonnel'].entities['<'].exec = function() {
    setTimeout(updateGunRack, 500);
};

function focusEnemyTeam() {
    cutscene(true)

    if(env.rpg.turnOrder[3].state == 'living') {addStatus({target: env.rpg.turnOrder[3], status: "focused", length:5}); play('mend', 0.5)};
    setTimeout(()=>{if(env.rpg.turnOrder[4].state == 'living') {addStatus({target: env.rpg.turnOrder[4], status: "focused", length:5}); play('mend', 0.5)}}, 250)
    setTimeout(()=>{if(env.rpg.turnOrder[5].state == 'living') {addStatus({target: env.rpg.turnOrder[5], status: "focused", length:5}); play('mend', 0.5)}}, 500)

    setTimeout(()=>{cutscene(false)}, 500)
}

function prankedEndRestart() {
    endDialogue()
    cutscene(true)

    if(env.rpg.turnOrder[0].state == 'living') {addStatus({target: env.rpg.turnOrder[0], status: "destabilized", length:10}); play('destabilize')}; 
    setTimeout(()=>{if(env.rpg.turnOrder[1].state == 'living') {addStatus({target: env.rpg.turnOrder[1], status: "destabilized", length:10}); play('destabilize')}}, 250)
    setTimeout(()=>{if(env.rpg.turnOrder[2].state == 'living') {addStatus({target: env.rpg.turnOrder[2], status: "destabilized", length:10}); play('destabilize')}}, 500)
    setTimeout(()=>{if(env.rpg.turnOrder[3].state == 'living') {addStatus({target: env.rpg.turnOrder[3], status: "destabilized", length:10}); play('destabilize')}}, 750)
    setTimeout(()=>{if(env.rpg.turnOrder[4].state == 'living') {addStatus({target: env.rpg.turnOrder[4], status: "destabilized", length:10}); play('destabilize')}}, 1000)
    setTimeout(()=>{if(env.rpg.turnOrder[5].state == 'living') {addStatus({target: env.rpg.turnOrder[5], status: "destabilized", length:10}); play('destabilize')}}, 1250)

    setTimeout(()=>{cutscene(false); startDialogue("pranked_aftermath")}, 2500)
}

bh_movefriend = eval("("+bh_movefriend.toString().replace(
    "just hold on....",
    "just hold on besties....."
  )+")")

bh_movefriend = eval("("+bh_movefriend.toString().replace(
  "ⵙ┴❀ᚈ⒫",
  "SHIT"
)+")")

env.combat.dynamicReward =  eval("("+env.combat.dynamicReward.toString().replace(
    "WITHIN THE DEBRIS, I FIND A${['a', 'e', 'i', 'o', 'u'].some(letter => rewardItem.name.toLowerCase().startsWith(letter)) ? \"N\" : \"\"}",
    "HUH THERES THIS"
  )+")")

env.combat.dynamicReward =  eval("("+env.combat.dynamicReward.toString().replace(
    "THERE ARE NO DEVICES IN THE DEBRIS",
    "DAMN THERES NOTHIN IN HERE"
)+")")

    // theres a second instance of this in dynamicReward()
env.combat.dynamicReward =  eval("("+env.combat.dynamicReward.toString().replace(
    "THERE ARE NO DEVICES IN THE DEBRIS",
    "DAMN THERES NOTHIN IN HERE"
)+")")

    // changes the inspect for BSTRD golem depending on whether or not you stole his gun
function bstrdEntity() {
    if(check('PAGE!!unlocked_black_box') == true)
        env.entities['bstrd golem'].text = `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'interjection';'evil mode';'hehe'
    ::INHERITED CONTEXT::<span style='color: var(--bastard-color)'>'archival golem armed with knowledge';'controlled by an alien entity?';</span>`
    else
    env.entities['bstrd golem'].text = `::ACTIVE THOUGHTFORM
    ::EXPLICIT PURPOSE::'interjection';'evil mode';'hehe'
    ::INHERITED CONTEXT::<span style='color: var(--bastard-color)'>'archival golem armed with knowledge';'controlled by an alien entity?';<span style='font-family: bastard;font-size: 3em;line-height: 1.5em;' definition="ANALYSIS::'low cohesion'">'also has a fully automatic machine gun';'so cool'</span></span>`
}

    // keeps the chair in research >:}
env.stages['embassy_research'].exec = eval("("+env.stages['embassy_research'].exec.toString().replace(
  `document.querySelectorAll(".gridpiece[slug='4']").forEach(el=>{el.innerHTML = ""; el.classList.remove('prop', 'blocks')})`,
  ""
)+")")

env.stages['embassy_research'].exec = eval("("+env.stages['embassy_research'].exec.toString().replace(
`document.querySelectorAll(".gridpiece[slug='4']").forEach(el=>{el.innerHTML = ""; el.classList.remove('prop', 'blocks')})`,
""
)+")")

    // now wipes action changes when starting new iteration
env.embassy.newCollapseIteration = (part) => {
    switch(part) {
        case 1:
            cutscene(false)
            env.embassy.setDay(3)
            change('collapseSave', false)
            
            env.COMBAT_ACTORS.akizet.actions[0] = 'akizet_attack'
            env.COMBAT_ACTORS.gakvu.actions[0] = 'gakvu_attack'
            env.COMBAT_ACTORS.tozik.actions[1] = 'mend'
        break

        case 2:
            cutscene(false)
            change("collapseSave", GlobalSaves.collapseSave_ep3start)
            change("TEMP!!ep2->ep3transfer", true)
            moveTo("/local/ocean/embassy/golem/")

            env.COMBAT_ACTORS.akizet.actions[0] = 'akizet_attack'
            env.COMBAT_ACTORS.gakvu.actions[0] = 'gakvu_attack'
            env.COMBAT_ACTORS.tozik.actions[1] = 'mend'
        break
    }
}


// ITEM MODIFICATIONS
// TODO: when items are finally fixed add chains as a separate item
// EDIT: naaah it is fine as is

env.ITEM_LIST.sorry_cyst = {
    slug: "sorry_cyst",
    name: "BSTRD CHAINZ",
    image: "https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/BSTRDCHAINS.png",
    description: `'chains from the golem we beat up';'very cool';'<span style='color: var(--bastard-color) !important; font-family: bastard;font-size: 3em;line-height: 1.5em;'>sick ass fukin CHAINZ</span>'`,
    max: 1,
    batches: 1
}

/*

// WON'T BE ADDED:
// I WILL NEED TO RECONTEXTUALIZE "DISABLER" TO "NUCLEAR BOMB".
// that means miltza would have a BOMB aimed at the TEAM

env.ITEM_LIST.disabler.name = "nuclear bomb"
env.ITEM_LIST.disabler.image = "https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/nuclearbomb.png"
*/

env.ITEM_LIST.restorative.name = "BAND-AID®"
env.ITEM_LIST.restorative.image = "https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/bandaids.png"
env.ITEM_LIST.restorative.description = "'quick-acting corrucystic cloth adhesive';'best used for fractures away from danger';'quick patch'"

env.ITEM_LIST.satik_cyst.name = "mini-shield pot"
env.ITEM_LIST.satik_cyst.image = "https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/shieldpot.png"
env.ITEM_LIST.satik_cyst.description = "'contains rapid ablative barrier applicators';'shorthand for fortnite item ,,Small Shield Potion,,';'drink in case of emergency'"

env.ITEM_LIST.aima_cyst.name = "aim assist"
env.ITEM_LIST.aima_cyst.image = "https://file.garden/ZBykMtEMpVTUWZ-e/collapsefunnyassets/aim-assists.png"
env.ITEM_LIST.aima_cyst.description = "'perception-enhancing targeting device';'traditional gaming implement';'useful for pwning'"


// REACTION MODIFICATIONS

env.COMBAT_ACTORS.akizet.reactions = {
    evade: ["evaded!", "evaded!", "evaded!", "you couldnt hit water if you fell out of a boat", "try again bud", "try again bud", "try again bud"],
    crit: [ ()=>env.combat.has('husk') ? "GET AWAY" : "BLAM" ],
    crit_buff: [ ()=>env.combat.has('husk') ? "DIE" : "ez!"],
    miss: ["FUCK", "SHIT", "THIS IS ASS"],
    dead: ["avenge mee...."],
    receive_hit: ["OW!"],
    receive_crit: ["SHIT!!"],
    receive_puncture: ["ah! reminds me of heroin", "this feels familiar"],
    receive_buff: ["thanks", "we will triumph"],
    receive_destabilized: ["woaah is this what weed feels like", "im gonna throw up......"],
    receive_rez: ["back from the dead baby"],
    puncture: ["I NEEEED A MEDIC BAG", 
        ()=>env.combat.has('tozik') ? "TOZIK" : "DOC CMON MAN",
        ()=>env.combat.has('cavik') ? "CAVIK" : "band aid®s PLEASE" 
    ],
    regen: ["better than ever", "mmmm health"],
    destabilized: ["so high..."],
    stun: ["NO.. MHY TURN..."],
    receive_carapace: ["for free??!?!", "so awesome"],
    receive_repairs: ["thank you, cavik", "better !"],
    receive_fear: ["NO, NO...", "AAAAARRG...", "velzie spare me.."],
    receive_redirection: ["thats right tank it", "final death in 10...", "i can take it thank you very much"],
}

env.COMBAT_ACTORS.gakvu.reactions = {
    evade: [
        ()=>env.combat.has('husk') ? "AAAAHHH!" : "haha!",
        ()=>env.combat.has('husk') ? "dont touch me!!" : "woaAOAOOAAaah!!",
    ],
    crit: [
        ()=>env.combat.has('husk') ? "clean cut!" : "it is simply that easy",
        ()=>env.combat.has('husk') ? "waiter! waiter! a few more like that please!" : "im sooo lucky"
    ],
    crit_buff: ["so that goes this way..."],
    miss: [
        ()=>env.combat.has('husk') ? "ah SHIT!!" : "oh... man",
        ()=>env.combat.has('husk') ? "it is simply too fast!!" : "whoops!",
        "...or so ive been told"
    ],
    dead: ["..."],
    receive_crit: ["gah!!!"],
    receive_puncture: ["i am... sludgifying...?", "eeyah!!! what the flip..."],
    receive_buff: ["thaaaaanks bestieee"],
    receive_destabilized: ["velzie this isnt what you think it is"],
    receive_rez: [
        ()=>env.combat.has('husk') ? "thank you sooo much" : "MY SAVIOR...",
    ],
    puncture: ["im bleedin!!", "Ough."],
    regen: [
        ()=>env.combat.has('husk') ? "feeling ok" : "feelin good!",
    ],
    destabilized: ["........."],
    stun: ["my glasses.. where did they GO?!"],
    receive_carapace: ["so obese"],
    receive_repairs: ["thaaaanks caveek"],
    receive_fear: ["stop looking at me youre WEIRD!!", "get away from me!", "NO.. NO NO NO NO NO", "huh? what?? speak up"],
    receive_redirection: ["bozko?? youd do it.. for me???"],
}

env.COMBAT_ACTORS.tozik.reactions = {
    crit: [
        ()=>check('PAGE!!barfriend', true) ? "heHAhEhaEHAHAheh" : "eh good enough",
        ()=>check('PAGE!!barfriend', true)  ? "y-hic.. yeah..!" : "oooh good one me",
    ],
    crit_buff: [()=>check('PAGE!!barfriend', true)  ? "keep.. go-hic. goinh..." : "thats right keep going"],
    dead: [()=>check('PAGE!!barfriend', true) ? "arg.." : "uff."],
    receive_destabilized: [()=>check('PAGE!!barfriend', true) ? "i.. hic. heer... call" : "i hear it calling"],
    receive_rez: [()=>check('PAGE!!barfriend', true) ? "wha..? wher.. am i..." : "LETS FINISH THIS."],
    puncture: [()=>check('PAGE!!barfriend', true) ? "aAAgrggh.." : "this will need a patch"],
    destabilized: [()=>check('PAGE!!barfriend', true) ? "..." : "(silent praying)"],
    stun: [()=>check('PAGE!!barfriend', true) ? "ca-hic. cant see..." : "where... am i"],
    receive_carapace: [()=>check('PAGE!!barfriend', true) ? "th.. thannnkss..." : "thank you"],
    receive_repairs: [()=>check('PAGE!!barfriend', true) ? "bettur.." : "now thats better"],
    receive_fear: [()=>check('PAGE!!barfriend', true) ? "st.. stop..." : "stop trippin",
    ()=>check('PAGE!!barfriend', true) ? "hh.. how..." : "and yet it got the moves",
    ()=>check('PAGE!!barfriend', true) ? "who... hic-hurrrt youuu..?" : "who hurt you?",
    ()=>check('PAGE!!barfriend', true) ? "i.. i canf..." : "NO.. THAT CANT BE...",
    ()=>check('PAGE!!barfriend', true) ? "hrrg... urk..!" : "(mumbl mumble)"],
    receive_redirection: [()=>check('PAGE!!barfriend', true) ? "no... m-hic. me. i.. can take..." : "i too can take hits, ladies and gents get me instead"],
}

env.COMBAT_ACTORS.miltza.reactions = {
    evade: [
        ()=>env.combat.has('husk') ? "waahh!!!!" : "i did it.. i did it!!",
    ],
    crit: ["die!! kill yourself!!"],
    crit_buff: ["is that better??"],
    miss: [
        ()=>env.combat.has('husk') ? "how does it have the moves?!" : "we will get em next time",
    ],
    dead: ["Dead. Not big surprise."],
    receive_crit: ["AAAH SHIT!!"],
    receive_puncture: ["band aids® band aids®!! BAND AIDSS®®!!!", "medic medic!! MEDIC!!! MEDIC!!!!"],
    receive_buff: ["thank you for the win!"],
    receive_destabilized: ["die DIE!! DIE!! DIE!!! DIE!!!!!!!", "blocking them wasnt enough i want them SLUDGED"],
    puncture: ["i am losing!"],
    stun: ["oaaBZZRRZuuuRRZZTTauRRRTTTT"],
    receive_carapace: ["uber!!"],
    receive_repairs: ["thank you, thank you!", "aaaahhh... much better"],
    receive_fear: ["that one just like me...!", "stop...", "velzie kidnap me", "stay away! away!!"],
    receive_redirection: ["what? red fabric??", "watch this simple trick"],
}


// DIALOGUE

/* 
    DIALOGUE
    D3 START
*/
env.dialogues["d3_start"] = generateDialogueObject(` 
syscheck
    sys
        ATTENTION::"previously viewed";"skip"

    RESPONSES::sys
        proceed<+>start
            EXEC::change("PAGE!!notSkipping", true)
        get right to it<+>END
            SHOWIF::['gameplay_off', false]
            EXEC::change('PAGE!!skiptut', true);content.classList.remove('innerfocus', 'showfocus', 'cullstage');content.classList.add('collapse');env.embassy.startTutorialGolem();vn.renderParty()
            FAKEEND::(combat)
        acquire amnesia<+>CHANGE::d3_tutorial_end
            SHOWIF::['gameplay_off', true]
            EXEC::content.classList.remove('innerfocus', 'showfocus', 'cullstage');content.classList.add('collapse');vn.renderParty()
            FAKEEND::(skip)

start
    sourceless
        WE THE GANG ARE HALF CONNECTED TO THE TIMESTOPPER...
            SHOWIF::[["PAGE!!notSkipping", false], ["embassy__d3_start-end", true]]
            EXEC::content.classList.add('innerfocus', 'showfocus');content.querySelector('.focus').classList.add('day3');setTimeout(()=>{sendDialogue(env.currentDialogue.chain['syscheck']);}, 1000);

    sourceless
        WE THE GANG ARE HALF CONNECTED TO THE TIMESTOPPER
            EXEC::content.classList.add('innerfocus', 'showfocus');content.querySelector('.focus').classList.add('day3')
            SHOWIF::[["PAGE!!notSkipping", false]]
        IT HAS BASICALLY BEEN LEFT WITH US,
        WOOHOO!!! FREE THINGYMABOB
        THIS THING CAN DATA ANALYSIS SO FAST

    tozik
        next

    sourceless
        WOW!! SO MUCH FREE TIME!!!!
        I MEAN WHO WOULD HAVE GUESSED? IT IS CALLED A TIMESTOPPER AFTER ALL
        I CAN FEEL THE PRESENCE OF AN OUTSIDE GOLEM ATTACHING A BIRD
            EXEC::document.querySelector('.redundancy').style.setProperty('--dataoffset', 3)

    gakvu
        locked!
        and loaded!
    
    sourceless
        ANOTHER CYST, PRE CONTACT, EYE 4.. YADA YADA YADA

    tozik
        eh nothing here
        next one
    
    sourceless
        HERE COMES ANOTHER, I AM NOT EVEN GOING TO BOTHER READING THE DATA FOR THIS ONE
            EXEC::document.querySelector('.redundancy').style.setProperty('--dataoffset', 6)
        TOZIK'S MIND PASSES OVER IT, WHAT A DWEEB, SCANNING THIS FOR NOTHING
        I AM SO BORED...
        AH SHIT HERE WE GO AGAIN, THAT THOUGHT WASHES OVER ME
        CAVIK... NO NO, I JUST NEED TO STOP THINKING ABOUT WHAT HAPPENED
        IS THERE A WAY TO DISABLE THINKING
    
    gakvu
        akizet?
    
    sourceless
        IS IT HERE? NO, THAT'S JUST FOR MY EYESIGHT
            EXEC::flash(true)
        OOPS OK HERE WE GO
            EXEC::flash(false)

    gakvu
        akizet wake up
    
    akizet
        what is this one mine

    gakvu
        uhh yuh

    akizet
        checking
    
    sourceless
        UUUUGH
        THROUGH THE TIMESTOPPER I PRETEND TO LOOK, HOPEFULLY THEY DO NOT NOTICE
    
    akizet
        this one...
    
    RESPONSES::akizet
        matches<+>match
        doesnt match<+>nomatch

match
    akizet
        matches yup mhm uhhuh

    tozik
        hmm.....
        weve gone far enough
        could assume that the only discrepancy is the first one
        thanks for the help this would have taken muuuuuch longer all alone
    
    sourceless
        JUST LIED THROUGH MY TEETH LIKE A CHAMP
        DUMBASS AHAHAHAHA

    gakvu
        you owe me a massive, big ol smooch jut bo-
    
    tozik
        not happening
        you did not have to say.. that...
            EXEC::env.embassy.day3Static();
        ...huh

    sourceless
        SOMETHINGS WRONG
        OTHERS FEEL IT TOO
    
    gakvu
        hey,
    
    tozik
        shut
        i hear it calling
    
    sourceless
        ...
        ...
        
    tozik
        what is that
        is that coming from the birds
    
    sourceless
        INSTANTLY,
        <span definition="INHERITED CONTEXT::'french';'translates to bread in english';'yum'">PAIN</span>
            EXEC::env.embassy.day3Signal();
            WAIT::6000

    sourceless quiet
        HELP!!
        IM DYING!!!!!
            EXEC::content.classList.add('collapse', 'show-vn');content.classList.remove('fade-stage');content.classList.add('slowpain');vn.renderParty()
            WAIT::4000
        GODDAMN IT
        OW
        WHAT THE FUCK WAS THAT
            EXEC::content.classList.remove('innerfocus');content.classList.remove('painmode');changeBgm(env.embassy.music_collapse, {length: 6000});
    
    sourceless
        IM STILL CONNECTED TO THE TIMESTOPPER
            EXEC::content.classList.remove('slowpain')
        I COLLAPSED FACE FIRST INTO THE FLOOR AND SHATTER INTO A MILLION PIECES
        OK NOT REALLY
        BUT SO DID GAKVU AND TOZIK--AND THE GOLEM
            EXEC::content.classList.remove('painprep')
        GOLEM LOOKS SLUDGED THO

    akizet
        gakvu?
        tozik?
        say something

    gakvu
        something
    
    sourceless
        TOZIK STANDS BACK UP
            EXEC::env.embassy.vn({bg: true, tozik: 'fullview'})
        GAKVU CLINGS TO A NEARBY BIRD
            EXEC::env.embassy.vn({bg: true, gakvu: 'fullview'})
        ONE OF HER LEGS SLUDGED ITSELF
        HAHA HOW UNLUCKY
        I AM FINE SHE IS NOT--OH, SHE IS REFORMING IT
    
    gakvu
        ...what just hit us?
        was that a bomb????
    
    tozik
        does it look like a bomb went off ya dingus
    
    sourceless
        GAKVU RUMMAGES THROUGH HER GLOWY COAT, PRODUCING A SMALL CORRUCYST
        CLEARLY ANOTHER ONE OF HER FALSE ENVIRONMENTS, LUCKILY IT MELTS IN HER CLAWS
    
    gakvu
        fuck
        my games.. not my video games!!
        not my 243 gaze streak on corru crush...
    
    sourceless
        TOZIK ALSO CHECKS HIS COMMUNICATIONS CYST
    
    tozik
        shit
    
    sourceless
        OH NO
        FUNFRIEND??
    
    funfriendfunny
        Hello Akizetesche Qou Jokzi.
    
    sourceless
        WHAT THE HELL
        UH. FUNFRIEND? DO WE HAVE COMMS?
    
    funfriendfunny
        Yes. Want me to activate them?
    
    akizet
        mine... works
    
    sourceless
        YES DO IT

    funfriendfunny
        Activating.. Now!
    
    sourceless
        I HEAR THAT THING AGAIN
        ...ALONG WITH SCREAMS OF TERROR AND ANGUISH FROM THE NEARBY AREA
        SOMEONE NEEDS HELP
        TOZIK AND GAKVU BOTH STARE AT ME
    
    akizet
        its bad, real bad
        all im hearing is screams of absolute terror
        we need to do something
    
    sourceless
        GAKVU'S RECEPTORS TWIST VERY VERY TIGHTLY
        TOZIK JUST STANDS THERE
    
    gakvu
        are the bright cousins attacking us..?
        could they be using... the dull?!??

    tozik
        are you dull in the head how could they possibly be using the dull just look over there

    sourceless
        HOW INCOHERENT
            EXEC::env.embassy.vn({fade: true});specialCam('listener-zoom')
    tozik
        that thing we heard earlier may have been the cause
            EXEC::env.embassy.vn({fade: false});specialCam(false)
        but i know our fellow humans could not be doing this
    
    gakvu
        we gotta get out of this crazy place...
    
    akizet
        agreed - stay behind me
        oh,
    
    sourceless
        UH WHAT
        HOW ARE WE STILL CONNECTED
    
    timestopper
        WAS THIS ALWAYS REMOTE CAPABLE?

    tozik
        do you have adhd or something yes we were told that from the start
    
    gakvu
        lol
            EXEC::env.embassy.vn({tgolem: 'showleft'})

    sourceless
        HEY WAIT A MOMENT
            EXEC::env.embassy.vn({tgolem: 'display show', gakvu: 'defocus', tozik: 'defocus'})
        WE ALL LOOK BACK AT THE ASSISTANT GOLEM
            EXEC::changeBgm(env.embassy.music_unsafe, {rate: 1})
        I ENTIRELY FORGOT ABOUT THIS GOLEM
            EXEC::env.embassy.vn({tgolem: 'display show center'})
    
    aggressor
        o   ut o  u  t o 
        i wo nt i won t leet
    
    gakvu
        hello?
    
    sourceless
        UH OH
            EXEC::env.embassy.vn({tgolem: 'display show approach'})
        SHIT, FUCK FUCK FUCK
    
    akizet
        fuck!! bestie get away!!!!!

    sourceless
        I USE THE TIMESTOPPER TO STOP TIME
        CLEARLY THESE TWO ARE UNACCUSTOMED TO FIGHTING FOR THEIR LIVES
        YES, I CAN SAVE THEM
    
    timestopper
        WHAT DO I DO WHAT DO I DO WHAT DO I DO WHAT DO I DO WHAT DO I DO WHAT DO I DO
        ITS GOING RIGHT FOR MY MIND-CORE ITS GOING TO KILL ME
        THIS IS IT, ITS SO JOEVER
    
    akizet
        calm down just watch
    
    RESPONSES::akizet
        kill it<+>END
            EXEC::env.embassy.vn({fade: true});env.embassy.startTutorialGolem();ratween(env.bgm, 0.75, 5000)
            SHOWIF::['gameplay_off', false]
            FAKEEND::initiate combat
        kill it like the flash<+>CHANGE::d3_tutorial_end
            EXEC::vn.done();
            SHOWIF::['gameplay_off', true]
            FAKEEND::bypass combat

END::env.embassy.vn({bg: false, fade: false, gakvu: '', tozik: '', tgolem: ''})

nomatch
    akizet
        doesnt match yup mhm uhhuh
        trust me

    tozik
        hmm.....
        are you sure
        it looks like it does

    sourceless
        SHIT
        IT DOES
        UHH UMMM I PLAY MY DAMAGE CONTROL CARD

    akizet
        fuck you i dont lie

    tozik
        uhhuh you did dipshit
        well weve gone far enough
        could assume that the only discrepancy is the first one
        thanks for the help this would have taken muuuuuch longer all alone

    gakvu
        you owe me a massive, big ol smooch jut bo-
    
    tozik
        not happening
        you did not have to say.. that...
            EXEC::env.embassy.day3Static();
        ...huh

    sourceless
        SOMETHINGS WRONG
        OTHERS FEEL IT TOO
    
    gakvu
        hey,
    
    tozik
        shut
        i hear it calling
    
    sourceless
        ...
        ...
        
    tozik
        what is that
        is that coming from the birds
    
    sourceless
        INSTANTLY,
        <span definition="INHERITED CONTEXT::'french';'translates to bread in english';'yum'">PAIN</span>
            EXEC::env.embassy.day3Signal();
            WAIT::6000

    sourceless quiet
        HELP!!
        IM DYING!!!!!
            EXEC::content.classList.add('collapse', 'show-vn');content.classList.remove('fade-stage');content.classList.add('slowpain');vn.renderParty()
            WAIT::4000
        GODDAMN IT
        OW
        WHAT THE FUCK WAS THAT
            EXEC::content.classList.remove('innerfocus');content.classList.remove('painmode');changeBgm(env.embassy.music_collapse, {length: 6000});
    
    sourceless
        IM STILL CONNECTED TO THE TIMESTOPPER
            EXEC::content.classList.remove('slowpain')
        I COLLAPSED FACE FIRST INTO THE FLOOR AND SHATTER INTO A MILLION PIECES
        OK NOT REALLY
        BUT SO DID GAKVU AND TOZIK--AND THE GOLEM
            EXEC::content.classList.remove('painprep')
        GOLEM LOOKS SLUDGED THO

    akizet
        gakvu?
        tozik?
        say something

    gakvu
        something
    
    sourceless
        TOZIK STANDS BACK UP
            EXEC::env.embassy.vn({bg: true, tozik: 'fullview'})
        GAKVU CLINGS TO A NEARBY BIRD
            EXEC::env.embassy.vn({bg: true, gakvu: 'fullview'})
        ONE OF HER LEGS SLUDGED ITSELF
        HAHA HOW UNLUCKY
        I AM FINE SHE IS NOT--OH, SHE IS REFORMING IT
    
    gakvu
        ...what just hit us?
        was that a bomb????
    
    tozik
        does it look like a bomb went off ya dingus
    
    sourceless
        GAKVU RUMMAGES THROUGH HER GLOWY COAT, PRODUCING A SMALL CORRUCYST
        CLEARLY ANOTHER ONE OF HER FALSE ENVIRONMENTS, LUCKILY IT MELTS IN HER CLAWS
    
    gakvu
        fuck
        my games.. not my video games!!
        not my 243 gaze streak on corru crush...
    
    sourceless
        TOZIK ALSO CHECKS HIS COMMUNICATIONS CYST
    
    tozik
        shit
    
    sourceless
        OH NO
        FUNFRIEND??
    
    funfriendfunny
        Hello Akizetesche Qou Jokzi.
    
    sourceless
        WHAT THE HELL
        UH. FUNFRIEND? DO WE HAVE COMMS?
    
    funfriendfunny
        Yes. Want me to activate them?
    
    akizet
        mine... works
    
    sourceless
        YES DO IT

    funfriendfunny
        Activating.. Now!
    
    sourceless
        I HEAR THAT THING AGAIN
        ...ALONG WITH SCREAMS OF TERROR AND ANGUISH FROM THE NEARBY AREA
        SOMEONE NEEDS HELP
        TOZIK AND GAKVU BOTH STARE AT ME
    
    akizet
        its bad, real bad
        all im hearing is screams of absolute terror
        we need to do something
    
    sourceless
        GAKVU'S RECEPTORS TWIST VERY VERY TIGHTLY
        TOZIK JUST STANDS THERE
    
    gakvu
        are the bright cousins attacking us..?
        could they be using... the dull?!??

    tozik
        are you dull in the head how could they possibly be using the dull just look over there

    sourceless
        HOW INCOHERENT
            EXEC::env.embassy.vn({fade: true});specialCam('listener-zoom')
    tozik
        that thing we heard earlier may have been the cause
            EXEC::env.embassy.vn({fade: false});specialCam(false)
        but i know our fellow humans could not be doing this
    
    gakvu
        we gotta get out of this crazy place...
    
    akizet
        agreed - stay behind me
        oh,
    
    sourceless
        UH WHAT
        HOW ARE WE STILL CONNECTED
    
    timestopper
        WAS THIS ALWAYS REMOTE CAPABLE?

    tozik
        do you have adhd or something yes we were told that from the start
    
    gakvu
        lol
            EXEC::env.embassy.vn({tgolem: 'showleft'})

    sourceless
        HEY WAIT A MOMENT
            EXEC::env.embassy.vn({tgolem: 'display show', gakvu: 'defocus', tozik: 'defocus'})
        WE ALL LOOK BACK AT THE ASSISTANT GOLEM
            EXEC::changeBgm(env.embassy.music_unsafe, {rate: 1})
        I ENTIRELY FORGOT ABOUT THIS GOLEM
            EXEC::env.embassy.vn({tgolem: 'display show center'})
    
    aggressor
        o   ut o  u  t o 
        i wo nt i won t leet
    
    gakvu
        hello?
    
    sourceless
        UH OH
            EXEC::env.embassy.vn({tgolem: 'display show approach'})
        SHIT, FUCK FUCK FUCK
    
    akizet
        fuck!! bestie get away!!!!!

    sourceless
        I USE THE TIMESTOPPER TO STOP TIME
        CLEARLY THESE TWO ARE UNACCUSTOMED TO FIGHTING FOR THEIR LIVES
        YES, I CAN SAVE THEM
    
    timestopper
        WHAT DO I DO WHAT DO I DO WHAT DO I DO WHAT DO I DO WHAT DO I DO WHAT DO I DO
        ITS GOING RIGHT FOR MY MIND-CORE ITS GOING TO KILL ME
        THIS IS IT, ITS SO JOEVER
    
    akizet
        calm down just watch
    
    RESPONSES::akizet
        kill it<+>END
            EXEC::env.embassy.vn({fade: true});env.embassy.startTutorialGolem();ratween(env.bgm, 0.75, 5000)
            SHOWIF::['gameplay_off', false]
            FAKEEND::initiate combat
        kill it like the flash<+>CHANGE::d3_tutorial_end
            EXEC::vn.done();
            SHOWIF::['gameplay_off', true]
            FAKEEND::bypass combat

END::env.embassy.vn({bg: false, fade: false, gakvu: '', tozik: '', tgolem: ''})
`)

/* plays after combat screen comes in */
env.dialogues["d3_tutorial_start"] = generateDialogueObject(`
start
    sourceless
        NOW THAT TIME IS SLOWED WE CAN STRIKE
        THIS GOLEM APPEARS TO BE WEAK AS HELL THIS SHOULD BE AS EASY AS CAKE

    sys
        ATTENTION::"thoughtform initiated"
        NOTE::"kill"

    moth
        damn
            SHOWONCE::
        sorry. quiet
            SHOWONCE::

    sourceless
        I CAN STAB...
        OR I CAN DO THE EQUIVALENT OF VEHICULAR MANSLAUGHTER
        ...JUST WITHOUT THE CAR
        HM, OR I CAN JUST PREPARE TO PARRY IT
    
    RESPONSES::akizet
        do something<+>END
            EXEC::env.rpg.classList.remove('hideteams')
            FAKEEND::proceed
`)

/* plays after akizet's move, when it's gakvu's turn */
env.dialogues["d3_tutorial_gakvu"] = generateDialogueObject(`
start
    sourceless
        WITH MY "DISTRACTION" SUCCESSFUL, I LOOK AT THE OTHERS WITH MY MIND
            EXEC::change("PAGE!!gaktut", true)
    
    akizet
        gakvu
        your turn!
    
    gakvu
        akizet, bestie!!
        i cant do anything.. i ca--
    
    akizet
        think of something. doesnt matter
        just kill it bestie
        we will triumph
    
    gakvu
        ok!!
        i have just the thing
    
    RESPONSES::akizet
        ATTAAAAACK<+>END
            FAKEEND::proceed
`)

/* tozik's turn in the tutorial */
env.dialogues["d3_tutorial_tozik"] = generateDialogueObject(`
start
    sourceless
        WHAT? 
            SHOWIF::'PAGE!!earlygak'
        WHAT THE HELL WAS THAT
            SHOWIF::'PAGE!!earlygak'
        EH ILL JUST CONTINUE NEXT
            SHOWIF::'PAGE!!earlygak'
        I GIVE TOZIK THE SIDE EYE
            EXEC::change("PAGE!!toztut", true)
    
    tozik
        if you dinguses get hit i got something in store for repairs
    
    RESPONSES::akizet
        do it<+>END
            FAKEEND::proceed
`)

/* akizet's little pep before it lets them loose in the tutorial */
env.dialogues["d3_tutorial_akizet"] = generateDialogueObject(`
start
    sourceless
        THEY ARE SCARED, THOUGH I AM TRAINING THEM TO BE THE VERY BEST FIGHTERS
        WE ARE BIG AND THIS IS SMALL TEENY TINY GOLEM

    akizet
        do you see???? you guys can fight now get on with it
    
    timestopper
        OK
    
    RESPONSES::akizet
        attack<+>END
            EXEC::changeBgm(env.embassy.music_combat, {rate: 0.5, seek: 100})
            FAKEEND::proceed
`)

/* plays after tutorial victory */
env.dialogues['d3_tutorial_end'] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"noobie mode enabled";'prove yourself by turning it off'
            EXEC::vn.renderParty()
____END

    sourceless
        SLUDGED. TURNED TO GOOP
        WE DID IT.. WE DID IT!!! WE DID IT!!!!!!!!!!!!!
        HUH THERES SOME <span definition="INHERITED CONTEXT::${env.ITEM_LIST['restorative'].description}">BAND AID®S</span>, GUESS ILL TAKE THEM
            EXEC::addItem(env.ITEM_LIST['restorative'], 3)
        GAKVU AND TOZIK SHARE A LOOK - ONE OF TRIUMPH, BUT SHOCK
            EXEC::env.embassy.vn({bg: true, gakvu: 'fullview', tozik: 'fullview'})
        I START CLAPPING
    
    akizet
        woooooooohooooo!!
        we did it! we won!
    
    sourceless
        THE OTHERS SIMPLY DIP THEIR RECEPTORS IN AFFIRMATION AND STAY CLOSE
        HOW DISAPPOINTING, I HOPED THAT THE OTHERS WERE MORE ENTHUSIASTIC ABOUT OUR VICTORY AS I WAS WHICH I GUESS WASN'T THE CASE
        ALSO I FEEL SOMETHING WEIRD, IS SOMEONE AFRAID OF ME

    RESPONSES::akizet
        get going<+>END
            EXEC::revertBgm();env.embassy.vn({bg: false, gakvu: '', tozik: ''})
`)

env.dialogues["d3_connector"] = generateDialogueObject(`
start
____SHOWIF::['PAGE!!connectors', false]
    sourceless
        JUST GONNA TAKE ANOTHER CONNECTOR
        JUST IN CASE WE FIND ANYONE SO THEY CAN ALSO AAAAAAAAND ITS SLUDGED
        DAMN, THEY ALL ARE

    akizet
        what the hell
        the timestopper is ok why are the other connectors sludging this is so cringe

    tozik
        i mean obviously didnt we just saw gakvu's cyst sludge
            SHOWIF::['PAGE!!barfriend', false]
        rggngn gak... cyst..... sl-hic.. sluge....
            SHOWIF::['PAGE!!barfriend']

    sourceless
        THAT IS TRUE,
____END
        ALL THE CONNECTORS ARE SLUDGED
            SHOWIF::'PAGE!!connectors'
        DAMN
    
    RESPONSES::akizet
        shucks<+>END
            EXEC::change("PAGE!!connectors", true)
            FAKEEND::(proceed)
`)

env.dialogues["movefriend_disabled"] = generateDialogueObject(`
start
    sourceless
        SOMETHING IS WRONG WITH THE ELEVATOR
            EXEC::specialCam("movefriend_examine")
    
    timestopper
        IS IT DEAD?
        WE ARENT IN A LIVELEAK VIDEO ARE WE?
    
    tozik
        i certainly hope not
            EXEC::env.embassy.vn({tozik: 'defocus'});
        i have the secret sauce
    
    sourceless
        HE KNEELS TO THE BUTTON PANEL OF THE ELEVATOR
        PRODDING AT IT WITH THE SAME TOOL HE ATTACKED WITH
            SHOWIF::['PAGE!!earlytoz']
        HE THEN SCRATCHES HIS HEAD AND MOTIONS HIS RECEPTORS BACK
    
    tozik
        hmmmmmm dying but not dead
            EXEC::env.embassy.vn({bg: true, tozik: 'fullview'});
        just need some mats you guys got any
    
    akizet
        what...
        well i have 450 wood, 370 bricks, and 50 metal
    
    tozik
        i meant sfer
    
    sourceless
        OH
    
    akizet
        well...
        cmon guys take out your pickaxes and break the walls to recreation, it isnt that far away 
    
    tozik
        what
        you intend to dig through the walls??
        akizet you cant be serious
        density here is almost at natural spire levels
        a simple 'pickaxe' wont let you break through a single segment,
        let alone a few
        ...
        sorry

    sourceless
        BITCH
        HE UNDERESTIMATE THE POWER OF FORTNITE
        GAKVU PUSHES HERSELF FROM THE WALL
            EXEC::env.embassy.vn({gakvu: 'defocus'});
        
    gakvu
        besties
        listen
        if you two agree never to tell anyone about this
        i can make us a path to the nearby rooms

    sourceless
        I STARE. TOZIK TURNS
    
    gakvu
        our favorite recreation is pretty close
            EXEC::env.embassy.vn({gakvu: 'fullview'});
        that one corner was under regeneration,
        so those containers that were in the corner probably have <span definition="INHERITED CONTEXT::'damn fine corru fuel';'dollar dollar'">sfer</span>
        personnel tendril nearby too!
        prob' hit both of them for materials
        how about we start with recreation?
        but. besties. promise. on velzie?
    
    akizet
        ...
    
    sourceless
        THIS WAS MY CHANCE
        I WHIP OUT MY GIANT PICKAXE
        I WILL DO AS EPIC GAMES INTENDED
    
    gakvu
        what the fuck
    
    sourceless
        I SHOVE GAKVU
            EXEC::env.embassy.vn({fade: true});specialCam("recreation_open")
        SHE STAGGERS OUT OF THE WAY AND I STAND IN HER PLACE
        FROM THERE I DUG OUT THE WALL, STRIKING ITS WEAK POINTS
            EXEC::change("PAGE!!recreation_unlocked", true);step()
        A LONG HALLWAY WAS REVEALED, RUNNING AT A SLIGHT DECLINE, ALL THE WAY TO RECREATION
    
    tozik
        how--?
    
    sourceless
        I UNEQUIP THE PICKAXE AND STORE IT AWAY IN MY INVENTORY
            EXEC::env.embassy.vn({tozik: 'defocus', fade: false});

    gakvu
        damn ok
        we have been blessed with a miracle
    
    sourceless
        HER RECEPTORS TWIST CYNICALLY - IT IS A JOKE
        DOES SHE ALSO DOUBT THE POWER OF FORTNITE?
        I SENSE TOZIK'S FRUSTRATION - HE DOES NOT WANT TO BELIEVE
        MUST FEEL STUPID BEING PROVEN WRONG DOESNT HE?
        GAKVU CAN TELL, SO SHE DROPS HER ACT

    gakvu
        sorry, just trying to stay positive besties!
        so anyways
        my mind-core follows a mobile groundsmindry pattern
    
    tozik
        what the fuck thats illegal
            EXEC::env.embassy.vn({tozik: 'fullview'});
    
    gakvu
        indeed it is bestie
        on velzie, right?
        do not talk about this again or i am <span definition="NOTE::INHERITED CONTEXT::'implies ALTERED altered living state'">dead</span>.
    
    akizet
        im sorry but what does this have to do with this situation
    
    gakvu
        well akizet
        if you had let me do what i was just about to do perhaps you would have saw, worstie
        how about next time you wait
    
    sourceless
        DAMN
        IS IT CAUSE I PUSHED HER TOO HARD?
        I WILL TAKE THIS AT FACE VALUE FOR NOW - WE HAVE MORE PRESSING MATTERS
        THE PATH TO RECREATION IS OPEN
        WE NEED TO FIND ENOUGH MATERIALS TO REPAIR THIS ELEVATOR
    
    tozik
        ...uh-huh

    RESPONSES::akizet
        let us move on<+>END
            EXEC::env.embassy.vn({gakvu: '', tozik: '', bg: false});specialCam(false)
`)

/* 
    RECREATION
*/

env.dialogues["d3_rec_enter"] = generateDialogueObject(` 
start
    sourceless
        OH MY GOD
        A SWARM OF WARPED CONTAINERS SKITTERING AROUND THE ROOM, THEY ARE EVERYWHERE
        THERE ARE EVEN A FEW QOU BODIES, DAMN BASTARDS ILL GET YOU
    
    akizet
        we must kill them all.
    
    sourceless
        GAKVU AND TOZIK BOTH SLINK BEHIND ME
        PUSSIES
    
    tozik
        sfer in those containers
        shouldnt be too hard we got each other

    sys
        WARNING::'enemies in space'
        NOTE::'you touch you fight'
        NOTE::'you move they move'

    RESPONSES::akizet
        go go go!!<+>END
`)

env.dialogues["d3_rec_clear"] = generateDialogueObject(` 
start
    sourceless
        TOO EASY, MY TIME ON THE SURFACE REWARDED ME WITH EXPERIENCE
        TEXEC::env.combat.dynamicReward()
        TOZIK STANDS BY A CONTAINER, GAKVU KNEELS NEAR ANOTHER, 
        AND THEY SLUDGE THROUGH THE SLUDGY REMAINS
            EXEC::changeBgm(env.embassy.music_collapse, {rate: 1})
    
    akizet
        got anything

    sourceless
        THREE SFER CUBES, EACH NO LARGER THAN A <span definition="INHERITED CONTEXT::'i dont know what the fuck this is'">KALSTIK</span>
            EXEC::env.embassy.advanceSfer(3)
        WHAT A DISAPPOINTINGLY SMALL LOOT DROP

    tozik
        damn it this literally not enough sfer
        theres also this..

    sourceless
        TOZIK PULLS A CYST FROM THE OOZE
        AND CONNECTS TO IT TO SEE ITS CONTENTS

    tozik
        ...
        uhhh. nothing useful

    sourceless
        HE THROWS THE CYST IN THE OPPOSITE DIRECTION WITH A REMARKABLE AMOUNT OF FORCE
        IT SHATTERS AND SLUDGES PROMPTLY AFTER
        HOW SUSPICIOUS, THERE ARE NO TIME FOR QUESTIONS THOUGH
        GAKVU IS STARING AT THE MANGLED QOU-BODY NEARBY, AWAY FROM US
    
    akizet
        gakvu,

    sourceless
        HER RECEPTORS UNTWIST IN EASE

    gakvu
        alive
        their mind-cores though
        we just need to do chest compressions

    tozik
        what
        how is that going to help at all
        that is literally the most idiotic thing ive ever heard they are qou not human
    
    sourceless
        GAKVU FIRMLY WAVES HER RECEPTORS

    gakvu
        shut up jut boy does it look like i know medical terms
    
    tozik
        ...
    
    gakvu
        yeah i thought so

    RESPONSES::akizet
        damn bestie<+>END
            EXEC::change("PAGE!!queue_person_enable", true);
`)

env.dialogues["d3_rec_body1"] = generateDialogueObject(` 
start
    sourceless
        I ATTEMPT TO DO CHEST COMPRESSIONS
            EXEC::specialCam('deadqou1');pauseSwapCam(true)
        ACCORDING TO WHAT I KNEW, WHICH WASNT A WHOLE LOT, I PUT MY HANDS ON THE 'THROAT'
        PUSHING DOWN WITH ALL MY BODY WEIGHT, IT ONLY GIVES AND MY HANDS COLLAPSE THROUGH
            EXEC::play('stab', 0.5, 1)
        I DID IT! SUCCESS!!
        HUH THATS ODD I SEE SOMETHING

    akizet
        oh whats this?
    
    sourceless
        I GRIP THE OBJECT DIRECTLY AND YANK IT OUT
            EXEC::env.embassy.vn({itzil: 'display'});
        THIS MUST BE MY REWARD FOR SUCH A HEROIC ACT
            EXEC::env.embassy.vn({bg: true, itzil: 'display show'});
        ITS METALLIC VOICE YELLING OUT,
    
    itzil
        woah ther' pard'ner!
        i thought...
        i thought that was it!
        what happened? why'd they attack lil' ol me?
        i was just enjoying a big ol pint o' beer on ma off-time...
    
    gakvu
        dunno
        there was some sort of signal
        when it hit, these things started to attack...
        glad you survived, bestie good job on the cpr

    akizet
        thanks, we are so lucky to have saved you on time
        what is your name?
    
    itzil
        wow!
        seems t'me velzie has a role for me yet
        i am itzil!!
        'spposed to be in golem maintenance,
        but, i had ma girlfriend covering, for...
        wait was this the only place attacked
    
    akizet
        dunno - elevator disabled, comms sabotaged
        we are simply trying to fix the elevator
        you should go through the path we formed, safe there

    itzil
        its... movefriend not 'elevator', pard'ner.
        though, i can help if you need it!
        g'day!

    sourceless
        THE QOU'S MINDCORE TURNS AND SKITTERS TOWARDS THE ELEVATOR
            EXEC::env.embassy.vn({bg: false, itzil: ''});
    
    RESPONSES::akizet
        what a strange fella<+>END
            EXEC::env.embassy.vn({itzil: ''});specialCam(false);pauseSwapCam(false)
`)

env.dialogues["d3_rec_body2"] = generateDialogueObject(` 
start
    sourceless
        I APPROACHED THE BODY
            EXEC::specialCam('deadqou2');pauseSwapCam(true)
        HOLDING OUT MY HAND, I PRESS AND HELD E
            EXEC::env.embassy.vn({bg: false}); document.querySelector('[entity="mangled qou body"]').parentElement.classList.add('chest'); fortniteChest.play()
        THE POWER OF FORTNITE RESONATED WITHIN, IT WILL OPEN
        IT REFORMED ITSELF INTO A CHEST, AND OPENED
            EXEC::env.embassy.vn({bg: true, karik: 'display show'}); document.querySelector('[entity="mangled qou body"]').parentElement.classList.remove('chest'); document.querySelector('[entity="mangled qou body"]').parentElement.classList.add('chestopen'); setTimeout(()=>{fortniteChest.stop()}, 900); lootChest.play()
        THE MINDCORE IMMEDIATELY HOPS TO THE OTHER SIDE OF THE ROOM,
            EXEC::specialCam('deadqou2-scamper');env.embassy.vn({karik: 'display show climb'});
        CLIMBING UP THE WALL BEFORE IT EVEN LOOKS AT US

    karik
        woah bro!
        hey!
        sorry, i thought you were one of them constructs
        is it safe?

    akizet
        nope still ongoing, name?

    karik
        ah, <span definition="INHERITED CONTEXT::'horrific mangling of original phrase';'what the fuck'">my parasites of the shining variety</span>! 
        i am karik! it is so so so unfortanuanate we meet liek this!

____SHOWIF::['PAGE!!barfriend', false]
    tozik
        leave
            EXEC::env.embassy.vn({tozik: 'defocus'});
            SHOWIF::['PAGE!!barfriend', false]

    karik
        awww ok bro

____SHOWIF::['PAGE!!barfriend']
        hrhhhrhg.... mmmrm..
            EXEC::env.embassy.vn({tozik: 'defocus'})
        urrguug..
            EXEC::env.embassy.vn({tozik: 'display show climb'})

    karik
        oh... huh.
        ...ok
____END
    
    sourceless
        I COULD DEFINITELY GO FOR A <span definition="INHERITED CONTEXT::'fat veilk parasite';'delicious food yum'">CELKI</span>-SEED JUST ABOUT NOW
            EXEC::env.embassy.vn({karik: 'display climb'});
        AND KARIK IS DEFINITELY <span definition="INHERITED CONTEXT::'fat veilk parasite';'delicious food yum'">CELKI</span> SHAPED..
        OH--IT DISAPPEARED INTO THE ELEVATOR HALLWAY
    
    RESPONSES::akizet
        whatever<+>END
            EXEC::specialCam(false);env.embassy.vn({bg: false, tozik: '', karik: ''});pauseSwapCam(false); env.stages.embassy_recreation.entities['q'].contains.class = 'dyingqou collapseonly chestopen'
`)


env.dialogues["d3_barfriend"] = generateDialogueObject(` 
start
    sourceless
        I APPROACH BARFRIEND, GAKVU AND TOZIK FOLLOWING BEHIND
            EXEC::env.embassy.vn({gakvu: "defocus", tozik: "defocus"});pauseSwapCam(true)
        IT TOOK SHELTER BEHIND ITS MASSIVE WINE, BEER, COFFEE, AND TEA DISPENSARY, PATHETIC

    akizet
        barfriend...?

    barfriend
        AYE, AKIZETESCHE!
        BARTENDER'S IN A LI'LE BI' O' AN EMERGENCY!
        CLOSED! COME BACK LAY'AH!

    akizet
        damn it all to hell
        how will i get my orange beer now

    barfriend
        UMM PER'APS WHEN THERE ISN'T A CRISIS GOING ON?
        SORRY! CLOSED! SEE YOU LAY'AH!
        
    sourceless
        GAKVU GLARES AT BARFRIEND INTENSELY

    gakvu
        get me a drink, bartender.

    barfriend
        WHOT IS THA'?
        DONT YOU KNOW SHITS HITTIN' THE FAN RIGHT NOW?
        BETTER GET GOING KIDDO!
    
    akizet
        its pointless no drinks guys im sorry

    sourceless
        TOZIK LEANS AGAINST THE BARTOP
        STARING AT THE CONTAINERS, THEN THE QOU-BODIES...

    akizet
        tozik?

    sourceless
        A MOMENT PASSES BEFORE HE ACTUALLY LOOKS AT ME

    tozik
        akizet
            EXEC::env.embassy.vn({tozik: "fullview", bg: true});
        i think i got just the thing to convince em to get us a drink
        
    sourceless
        HE DIGS INTO HIS POCKETS AND PULLS OUT THE SFER WE HAD JUST GATHERED..
        BUT ONLY ONE

    tozik
        barfriend listen
        hear me out
        one sfer take it or leave it

    barfriend
        YES CAN DO!
    
    sourceless
        BARFRIEND QUICKLY PULLS OUT A BIG BOOT GLASS,
        AND FILLS IT WITH ORANGE BEER

    barfriend
        ALRIGHT HERE YOU GO! GOOD LUCK!

    tozik
        thanks
            EXEC::addItem(env.ITEM_LIST['sfer_cube'], -1);env.COMBAT_ACTORS.tozik.actions[1] = 'beer_splash';readoutAdd({message: "quick mend permanently replaced with beer splash", name:"sys", show: true, forceMini: true});

    sourceless
        TOZIK TAKES A BIG SIP FROM THE BEER GLASS
        AND A FEW MORE, FOR GOOD MEASURE I PRESUME
        OK I THINK HE SHOULD STOP DRINKI
        AAAAAAND HES DRUNK

    tozik
        hhhrrrggh... leh. lets go ba-hic.. back...
    
    RESPONSES::akizet
        uhhhh ok<+>END
            EXEC::change("PAGE!!barfriend", true);env.embassy.vn({gakvu: "", tozik: "", bg: false});pauseSwapCam(false)
`)

/*
    PERSONNEL - LOWER-AWAY TENDRIL
*/

env.dialogues["d3_person_enable"] = generateDialogueObject(` 
start
    sourceless
        HERE WE GO AGAIN, THIS TIME I LET GAKVU AHEAD OF ME
            EXEC::specialCam("personnel_open");pauseSwapCam(true)
        SHE HOLDS HER PALMS OUT AND THE WALLS BOUNCE AND BOIL
            EXEC::change("PAGE!!cpersonnel_unlocked", true);
        ...WHAT? HOW IS THIS POSSIBLE????

    akizet
        how are you doing that

    gakvu
        didnt i just tell you bestie

    sourceless
        THATS RIGHT.. HOWEVER GROUNDSMINDRY IS KINDA LAME
        FORTNITE IS BETTER THAN WHATEVER THIS 'GROUNDSMINDRY' THING IS
        I MUST INTERCEPT BEFORE SHE FULLY FINISHES
        OH - IT IS TOO LATE AND THE PATH IS FULLY FORMED, NOW
            EXEC::step()

    RESPONSES::akizet
        another time<+>END
            EXEC::specialCam(false);pauseSwapCam(false)
`)

env.dialogues["d3_person_intro"] = generateDialogueObject(` 
start
    sourceless
        IT IS SO DARK IN HERE I CAN BARELY SEE
        AH - SHIT HERE WE GO AGAIN
        OHOHOHO!! THIS IS GOING TO BE SO FUN
        I MUST KILL THEM ALL
    
    timestopper
        LOOK! THERE!
        THERE ARE MORE QOU-BODIES
        KILL KILL KILL
        ...
        WE MUST KILL THEM ALL, ALL OF THEM
        ...OK, TREAD CAREFULLY
            SHOWIF::['PAGE!!barfriend', false]
        BLAUH... CARE.. CA-HIC. CAREFUH..
            SHOWIF::['PAGE!!barfriend']
    
    RESPONSES::akizet
        no can do<+>END
`)

env.dialogues["d3_person_clear"] = generateDialogueObject(`
start
____SHOWIF::['PAGE!!checkedguns', false]
    sourceless
        WE TRIUMPED AGAINST ADVERSITY
            EXEC::pauseSwapCam(true)
        WHEW!! HARD WORK
            EXEC::env.embassy.vn({bg: true, tozik: "defocus", gakvu: "defocus"});pauseSwapCam(true)
____END

____SHOWIF::['PAGE!!checkedguns']
    sourceless
        THIS WAS SIMPLY TOO EASY
            EXEC::pauseSwapCam(true)
        THE SCAR-L IS HARD CARRYING,
        THIS IS THE GREATEST GAZE OF MY DEATH
            EXEC::env.embassy.vn({bg: true, tozik: "defocus", gakvu: "defocus"});pauseSwapCam(true)
____END
    
    gakvu
        daaaaamn pop off besties pop off!!
            SHOWIF::['PAGE!!checkedguns', false]
        my god akizet, you shred
            SHOWIF::['PAGE!!checkedguns']
        except for these ones
    
    sourceless
        SHE POINTS TO A NEARBY CORPSE
            EXEC::changeBgm(env.embassy.music_collapse, {rate: 1})
        HER SORROW SPREADS INTO OUR CONNECTORS
        WHAT A WIMP
        TO FEEL SO SORRY FOR A LEVEL ONE CROOK MUST BE SUCH A BURDEN
    
    gakvu
        this is nonsensical...
        they really are killing <em>everyone</em>

    sourceless
        AND? WHAT ABOUT IT
        I REALLY WANT TO SAY THAT TO HER FACE BUT,
        IT IS RUDE
    
    tozik
        if you couldnt tell from the recreation room you could definitely tell now
            EXEC::env.embassy.vn({bg: true, tozik: "fullview"})
            SHOWIF::['PAGE!!barfriend', false]
        bllergh... aggghggrg....
            SHOWIF::['PAGE!!barfriend']

    sourceless
        TOZIK PULLS A SFER CUBE FROM THE REMAINS OF A CONTAINER
            EXEC::env.embassy.advanceSfer()
            SHOWIF::['PAGE!!barfriend', false]
____SHOWIF::['PAGE!!barfriend']
        TOZIK STUMBLES OVER TO THE REMAINS OF A NEARBY CONTAINER
        AND NEARLY TRIPS OVER IT
        I.. ASSIST HIM BY RIFLING THROUGH THE REMAINS FOR HIM
        AND FOUND SOME SFER!
            EXEC::env.embassy.advanceSfer()
____END
        
____SHOWIF::'EXEC::env.embassy.enoughSfer(false) && check(\`PAGE!!barfriend\`, false)'
    tozik
        god this is still not enough
        we gotta find more

____SHOWIF::'EXEC::env.embassy.enoughSfer(false) && check(\`PAGE!!barfriend\`, true)'
        brlbrbbrrrrghg... not.. no-hic.. enouff...
        find... morghgghhh..

____SHOWIF::'EXEC::env.embassy.enoughSfer(true) && check(\`PAGE!!barfriend\`, false)'
        got enough to repair the elevator
        go back

____SHOWIF::'EXEC::env.embassy.enoughSfer(true) && check(\`PAGE!!barfriend\`, true)'
        hhguhgh.. got... enuff..
        ghh.. gho-hic... go backhhchj
____END

    RESPONSES::akizet
        les go<+>END
            EXEC::env.embassy.vn({bg: false, tozik: "", gakvu: ""});pauseSwapCam(false)
`)

env.dialogues["d3r2"] = generateDialogueObject(`
start
    sourceless
        NO FREAKIN WAY
            EXEC::pauseSwapCam(true)

    gakvu
        oh hey one of my bestie's room!
            EXEC::env.embassy.vn({gakvu: "fullview"})
        besties... welcome to kazkis room!!

____SHOWIF::['PAGE!!barfriend', false]
    tozik
        what the fuck
            EXEC::env.embassy.vn({tozik: "defocus"})
        why are there so many guns

    sourceless
        GUNS
            EXEC::specialCam("kazkiguns");env.embassy.vn({tozik: "", gakvu: ""})
        I WANT THESE, I NEED THESE
        I START JUMPING IN PLACE AT THE SIGHT OF THEM

    gakvu
        just cause!
        has she-

    tozik
        akizet?
    
    akizet
        yes..
        YES!! YES!!!!

    gakvu
        akizet, we are not using the guns
    
    akizet
        aw...

    RESPONSES::akizet
        curses<+>END
            EXEC::specialCam(false);pauseSwapCam(false)
____END

____SHOWIF::['PAGE!!barfriend']
    tozik
        mmrrrpgggmmghh
            EXEC::env.embassy.vn({tozik: "defocus"})
        urrrghgh...
            EXEC::env.embassy.vn({tozik: 'display show climb'})

    sourceless
        GUNS
            EXEC::specialCam("kazkiguns");env.embassy.vn({tozik: "", gakvu: ""})
        I WANT THESE, I NEED THESE
        I RUSH FORWARD TO GRAB IT OFF THE WALL
        BEFORE TRIPPING ON TOZIKS BODY

    gakvu
        has she-

    tozik
        ..! guaaaaaaaah!!
    
    akizet
        FUUUUUUUUUUCK!!!!
        AAAAAAAAAAAAHHJ!!!!!!!

    gakvu
        besties are you ok..
    
    akizet
        tozik you fat as fuck drunken wretch
    
    tozik
        ...
        nmngragagrgnmm.....

    RESPONSES::akizet
        fuck you<+>END
            EXEC::specialCam(false);pauseSwapCam(false)
____END
`)

env.dialogues["d3r2_chest"] = generateDialogueObject(`
start
    sourceless
        WHAT AN INTERESTING DISPLAY
            EXEC::pauseSwapCam(true)
        I HEAR THE SOUND OF TREASURES WITHIN
        HOLDING E, THE TREASURES REVEALED THEMSELVES
            EXEC::change("d3_kazkichest", true); addItem(env.ITEM_LIST['restorative'], 4)
    
    gakvu
        damn girl you go! good loot
            EXEC::env.embassy.vn({bg: true, gakvu: "fullview"})

____SHOWIF::['PAGE!!barfriend', false]
    tozik
        something has been bothering me
            EXEC::env.embassy.vn({tozik: "fullview"})
        why are the doors not 'biting' us
        and the timestopper, why is it cooperating
    
    akizet
        perhaps its because things "just works"
        havent you heard of that huh? huh tozik?
        mr android user?
    
    tozik
        shut up androids are better
____END

____SHOWIF::['PAGE!!barfriend']
    tozik
        i.. som-hic... sometin-ben-bothrhhrhn.. me
        w-hic. nghghhhhhhh...
    
    sourceless
        ABSOLUTELY INCOHERENT HE IS,
        HE IS STILL MOSTLY ON THE FLOOR FROM OUR ENTRY BUT I JUST STEP OVER HIM
____END

    RESPONSES::akizet
        whatever<+>END
            EXEC::change("PAGE!!kazkichest", true);env.embassy.vn({bg: false, tozik: "", gakvu: ""});pauseSwapCam(false)
`)

env.dialogues["d3r2_guns"] = generateDialogueObject(`
start
____SHOWIF::['PAGE!!barfriend', false]
    sourceless
        I IMMEDIATELY RUN UP TO THE GUNS
            EXEC::change("PAGE!!checkedguns", true);specialCam("kazkiguns");pauseSwapCam(true)
        TOZIK TAKES ONE OF THE LARGE ONES BY ITS LONG PART
            EXEC::env.embassy.vn({tozik: "defocus"});document.querySelector('.gridpiece.prop > .kazkiguns').classList.replace('scarl_gun_rack', 'empty_gun_rack');
        I SNATCH IT FROM HIM RIGHT OUT OF HIS CLAWS

    tozik
        what--
        hey

____SHOWIF::['PAGE!!barfriend']
    sourceless
        I RECOVER FROM THE FALL, TAKING THE BIG GUN BY THE BARREL
            EXEC::change("PAGE!!checkedguns", true);specialCam("kazkiguns");pauseSwapCam(true)
        TOZIK IS STILL ON THE GROUND
            EXEC::env.embassy.vn({tozik: "display show climb"});document.querySelector('.gridpiece.prop > .kazkiguns').classList.replace('scarl_gun_rack', 'empty_gun_rack');

    tozik
        urghhhh.. ow...
____END
    
    sourceless
        I BEGIN RELOADING IT AND SLIDING THE BOLT 
        THIS WAS WHEN I REALIZED--THIS IS THE LEGENDARY SCAR-L FROM FORTNITE
        YES!!!! THIS WILL DO WONDERFULLY
            EXEC::env.COMBAT_ACTORS.akizet.actions[0] = 'akizet_mag_dump';readoutAdd({message: "overwhelm permanently replaced with mag dump", name:"sys", show: true, forceMini: true});
    
    gakvu
        wait you know how to use those?
        damn bestie you go girl! shoot em up!

    sourceless
        I WILL, GAKVU, I WILL

    RESPONSES::akizet
        let us win this<+>END
            EXEC::specialCam(false);env.embassy.vn({tozik: ""});pauseSwapCam(false);
`)

env.dialogues["d3r2_postcombat"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"noobie mode on";'turn it off if you are good at the game'
____END

    sourceless
        THERE WAS AN ATTEMPT
            EXEC::change("PAGE!!kazkiambush", true);env.stage.current.onStep()
        AND THEY KNEW, THEY FUCKED UP
        TEXEC::env.combat.dynamicReward()
        AND IN THE SLUDGE WAS SOME SFER
            EXEC::env.embassy.advanceSfer(4)
    
____SHOWIF::['PAGE!!barfriend', false]
    tozik
        good, this is very nice
            EXEC::env.embassy.vn({bg: true, tozik: "defocus"})
        aaand were still short
            SHOWIF::'EXEC::env.embassy.enoughSfer(false)'
        let us head back
            SHOWIF::'EXEC::env.embassy.enoughSfer()'

____SHOWIF::['PAGE!!barfriend']
    tozik
        ...good..
            EXEC::env.embassy.vn({bg: true, tozik: "defocus"})
        still.. ned moor...
            SHOWIF::'EXEC::env.embassy.enoughSfer(false)'
        g-go ba-hic.. back...
            SHOWIF::'EXEC::env.embassy.enoughSfer()'
____END

    RESPONSES::akizet
        ok<+>END
            EXEC::step();env.embassy.vn({bg: false, tozik: ""});pauseSwapCam(false)
`)

env.dialogues["d3r2_containers"] = generateDialogueObject(`
start
    sourceless
        HMM... WE COULD POTENTIALLY GET SOME SFER FROM HERE
            EXEC::specialCam('kazkicontainers');pauseSwapCam(true)

    gakvu
        something is off with these, oh well!
    
    sourceless
        GAKVU TAKES A STEP CLOSER, REACHING OUT WITH ONE OF HER CLAWS
        AS EXPECTED--THE CONTAINERS LUNGE AT HER
        DUMBASS

    RESPONSES::akizet
        skill issue<+>CHANGE::d3r2_postcombat
            SHOWIF::['gameplay_off', true]
            EXEC::specialCam(false)
            FAKEEND::skip combat
        FIGHT<+>END
            SHOWIF::['gameplay_off', false]
            EXEC::env.embassy.startKazkiRoomAmbush();specialCam(false)
            FAKEEND::start combat
`)

env.dialogues["d3r2_ambush"] = generateDialogueObject(`
start
    sourceless
        WHAT THE HELL WHY IS THE DOOR SO LOUD
        OH HEY THESE ARE TREMBLING
            EXEC::specialCam('kazkicontainers');pauseSwapCam(true)
        WAIT AH--SHIT HERE WE GO AGAIN

    RESPONSES::akizet
        what containers<+>CHANGE::d3r2_postcombat
            SHOWIF::['gameplay_off', true]
            EXEC::specialCam(false)
            FAKEEND::skip combat
        FIGHT<+>END
            SHOWIF::['gameplay_off', false]
            EXEC::env.embassy.startKazkiRoomAmbush();specialCam(false)
            FAKEEND::start combat
`)

env.dialogues["d3r1"] = generateDialogueObject(`
start
____SHOWIF::['PAGE!!checkedguns', false]
    sourceless
        AS WE STEP INTO THE ROOM, AN UNFAMILIAR TIR QOU LEAPS AT US
            EXEC::pauseSwapCam(true);env.embassy.vn({miltza: "display far"})

    sourceless
        HOOOOLY SHIT WE ALMOST DIED
            EXEC::env.embassy.vn({bg: true, miltza: "far show"})
        THEY HELD A DISABLER IN THEIR HANDS
        THE QOU FALTERS AS THEY SEE US--THE WORST MISTAKE OF THEIR DEATH
        I BUM RUSH THEM AND PIN THEM AGAINST THE WALL, THE DISABLERS FALLING FROM THEIR GRIP
        
    miltza
        agh!!
        uh...
    
    sourceless
        THE QOU BEGAN TO BLUSH CUTELY
        I MEAN WAIT WHAT? WAIT
        WHAT THE FUCK
        IMMEDIATELY I BACK OFF
    
    akizet
        that was not what i had intended

    gakvu
        pfft yeah sure
    
    tozik
        ...

    sourceless
        I PICK UP THE DISABLERS AND AIM IT AT THEM
            EXEC::addItem(env.ITEM_LIST['disabler'], 2)
        APPROACHING TO CORNER THEM BEHIND THEIR BARRICADE

____SHOWIF::[['PAGE!!checkedguns', true], ['PAGE!!unlocked_black_box', false]]
    sourceless
        AS WE STEP INTO THE ROOM, AN UNFAMILIAR TIR QOU LEAPS AT US
            EXEC::pauseSwapCam(true);env.embassy.vn({miltza: "display far"})
        IMMEDIATELY, I POINT MY GUN AT THEM

    miltza
        woah!! put that down!!

    sourceless
        THEY HELD A DISABLER IN THEIR HANDS
        THEIR TRUE INTENTIONS WERE CLEAR
    
    akizet
        GET ON THE GROUND!!
        GET ON THE FUCKING GROUND!!!!

    miltza
        wah!!!
    
    sourceless
        IMMEDIATELY THEY RAISE THEIR ARMS AND CURL ONTO THE GROUND
        DROPPING THE DISABLERS

    akizet
        tozik
        pick it up

____SHOWIF::[['PAGE!!checkedguns', true], ['PAGE!!unlocked_black_box', true]]
    sourceless
        I STOP GAKVU BEFORE WE WALK INTO THE ROOM
    
    akizet
        remember - no tir
    
    sourceless
        SHE NODS, READYING HER AR-15
        I READY MY GUN AS WELL, THE SCAR-L PRIMED
        AS WE STEP INTO THE ROOM, AN UNFAMILIAR TIR QOU LEAPS AT US
            EXEC::pauseSwapCam(true);env.embassy.vn({miltza: "display far"})
        IMMEDIATELY, BOTH OF OUR RIFLES FLING UP TO THEIR FACE
    
    miltza
        w-wahh! what the fuck!!
        guns down!! please!!!!
    
    sourceless
        THEY HELD A DISABLER IN THEIR HANDS
        UH-HUH NOT DOING THAT
____END

____SHOWIF::[['PAGE!!unlocked_black_box', false]]
    tozik
        what the fuck is wrong with you
            SHOWIF::[['PAGE!!barfriend', false]]
            EXEC::env.embassy.vn({tozik: "defocus", gakvu: "defocus"})
        you did not need to do that
            SHOWIF::[['PAGE!!barfriend', false]]
        akizet let them go
            SHOWIF::[['PAGE!!barfriend', false]]

____SHOWIF::[['PAGE!!unlocked_black_box', true]]
    tozik
        what the actual fuck is wrong with you guys
            SHOWIF::[['PAGE!!barfriend', false]]
            EXEC::env.embassy.vn({tozik: "defocus", gakvu: "defocus"})
        you did not need to do that
            SHOWIF::[['PAGE!!barfriend', false]]
        akizet and gakvu, guns down
            SHOWIF::[['PAGE!!unlocked_black_box', true], ['PAGE!!barfriend', false]]

____SHOWIF::[['PAGE!!barfriend', true]]
    tozik
        wwwhwwhathafuck.. hic
            SHOWIF::[['PAGE!!barfriend']]
            EXEC::env.embassy.vn({tozik: "defocus", gakvu: "defocus"})
        y-do.. not-hic need to do thaaat..!
        l-hic.. let em gooo...
____END

    miltza
        yes!! please!
        i thought you were enemies passing through...

    sourceless
        UUUUUUUUGH
        WHAT A LAME BUNCH OF PACIFISTS THIS GROUP IS
        I PICK UP THE DISABLERS THOUGH
            SHOWIF::['PAGE!!checkedguns', true]
            EXEC::addItem(env.ITEM_LIST['disabler'], 2)
        
    tozik
        do you have any sfer?
            SHOWIF::['PAGE!!barfriend', false]
        d'ya hav.. anhy sfur...
            SHOWIF::[['PAGE!!barfriend']]

    miltza
        oh...
        yes!! here
    
    sourceless
        SHE DIGS OUT SOME SFER CUBES FROM THE REMAINS OF NEARBY CONTAINERS
            EXEC::env.embassy.advanceSfer(2)
        IT LOOKS SLOPPILY MURDERED
    
    miltza
        do you have a plan..?
        i am miltza..
    
    akizet
        i am akizet
        this is tozik, and that is gakvu
        do not threaten us like that ever again
    
    miltza
        oh......
        well...
        have you been able to hear anyone?
        i have been listening for a while now...
        it is mostly that terrible noise, but the people in the hangar are afraid
        i heard murmurs - they are locked, too!
    
    gakvu
        gurl do you think anyone tried to fly through the wall?
    
    miltza
        dunno...
        i will go do things.. now...

    sourceless
        SHE RETURNS BACK TO RUMMAGING THROUGH THE GARBAGE
            EXEC::env.embassy.vn({miltza: "display far"})

    RESPONSES::akizet
        wimp<+>END
            EXEC::env.embassy.vn({bg: false, tozik: "", gakvu: "", miltza: ""});pauseSwapCam(false)
`)


/* 
    POST GATHERING / MOVEFRIEND FIGHT
*/

env.dialogues["d3_relocator_return"] = generateDialogueObject(`
start
    sourceless
        WHEN WE RETURN, TOZIK IMMEDIATELY GOES FOR THE ELEVATOR PANEL
            SHOWIF::['PAGE!!barfriend', false]
            EXEC::specialCam("movefriend_examine");env.embassy.vn({tozik: 'defocus'});pauseSwapCam(true)
        WHEN WE RETURN, TOZIK IMMEDIATELY STUMBLES TOWARDS THE ELEVATOR PANEL
            SHOWIF::['PAGE!!barfriend']
            EXEC::specialCam("movefriend_examine");env.embassy.vn({tozik: 'defocus'});pauseSwapCam(true)
        I AIM THE GUN AT THE MINDCORES AND MILTZA
            SHOWIF::['PAGE!!checkedguns']
        THEY SHRINK BACK INTO THE CORNER OF THE ELEVATOR AS FAR AS THEY COULD
            SHOWIF::['PAGE!!checkedguns']
        MILTZA IN PARTICULAR FALLING TO THE GROUND AGAIN
            SHOWIF::['PAGE!!checkedguns']
        HE UNSCREWS THE PANEL AND STARTS DUMPING SFER INTO IT
            SHOWIF::['PAGE!!barfriend', false]
        HE FAILS TO UNSCREW THE PANEL SO HE JUST RIPS IT OFF WITH BRUTE FORCE AND BEGINS TO DROP SFER INTO IT
            SHOWIF::['PAGE!!barfriend']
        MILTZA WATCHES QUIETLY IN CONFUSION FROM THE EDGE OF THE ROOM
        I ADMIT, I AM CONFUSED AS WELL
        WHY CANT WE HAVE JUST USED MY MATS INSTEAD I DO NOT KNOW
        HE FINISHED UP SCREWING THE PANEL BACK TOGETHER
            SHOWIF::['PAGE!!barfriend', false]
        HE PULLS OUT SOME DUCT TAPE STORED ON HIM AND TAPES THE PANEL BACK ON
            SHOWIF::['PAGE!!barfriend']
    
    tozik
        this will take a bit
            EXEC::env.embassy.vn({tozik: 'fullview'});
            SHOWIF::['PAGE!!barfriend', false]
        hold on
            SHOWIF::['PAGE!!barfriend', false]
        should we start now?
            SHOWIF::['PAGE!!barfriend', false]

        ..will taake a lil... bit.
            SHOWIF::['PAGE!!barfriend']
            EXEC::env.embassy.vn({tozik: 'fullview'});
        rr.. re-hic. ready.?
            SHOWIF::['PAGE!!barfriend']
    
    sys
        ATTENTION::"memory almost over"
            EXEC::change('PAGE!!movefriendqueued', true);change("PAGE!!ep3queuecheck", true)
        ADVISE::"save"
        NOTICE::'reduce intensity if pc bad'
        NOTICE::"return to proceed"

    RESPONSES::akizet
        just hold on a moment<+>END
            EXEC::env.embassy.vn({tozik: ''});specialCam(false);pauseSwapCam(false)
`)

env.dialogues["d3_relocator_later"] = generateDialogueObject(`
start
    sourceless
        HERE WE GO AGAIN
            EXEC::specialCam("movefriend_examine")
        IT HAD CONSUMED THE SFER, HOPEFULLY WE SHOULD BE ABLE TO PUSH A BUTTON AND MOVE
    
    tozik
        ready to get started?
            SHOWIF::['PAGE!!barfriend', false]
            EXEC::env.embassy.vn({tozik: 'fullview'});
        r-hic.. ready.?
            SHOWIF::['PAGE!!barfriend']
            EXEC::env.embassy.vn({tozik: 'fullview'});
    
    sys
        NOTE::"memory ending"

    RESPONSES::akizet
        yeah<+>CHANGE::d3_relocator_repair
            FAKEEND::proceed
        nah i dont feel like it<+>END
            EXEC::env.embassy.vn({tozik: ''});specialCam(false)
`)

env.dialogues["d3_relocator_repair"] = generateDialogueObject(`
start
    akizet
        alright!
        finally we get to leave
        actually gakvu you stand there,
            EXEC::env.embassy.vn({gakvu: "defocus"});
        i will stand here
    
    tozik
        all right, stand by fellas
            SHOWIF::['PAGE!!barfriend', false]
        ok.. le-hic. lets go
            SHOWIF::['PAGE!!barfriend']
    
    sourceless
        TOZIK KNEELS NEAR THE ELEVATOR PANEL, PREPARING HIMSELF
            SHOWIF::['PAGE!!barfriend', false]
        TOZIK DROPS DOWN TO THE ELEVATOR PANEL, SWAYING HEAVILY
            SHOWIF::['PAGE!!barfriend']
        HE PRESSES THE BUTTON AND A BRIGHT ELECTRICAL SPARK COME FROM THE PANEL
        IT CRAWLS UP HIS QOU BODY AND ENVELOPS HIM IN PURE ELECTRICITY
        
    tozik
        AEOAOEAAOAOAEEAOZBZBRRRRRTRTRTAZZZZRXZTRAAOAAOAOAOAAAO!!!!
            EXEC::env.embassy.vn({tozik: "display show climb"});
    
    sourceless
        HOLY SHIT
        OH MY FUCKIN GOD LMAO
        HE MUST NOT BE ELEVATOR CERTIFIED, STUPID JUT
            EXEC::env.embassy.vn({bg: true, gakvu: ""});
        OH? TOZIK STOOD BACK UP
            SHOWIF::['PAGE!!barfriend', false]
            EXEC::env.embassy.vn({tozik: "focus"});
        HIS QOU BODY SMELLS OF ELECTRICAL FIRES
            SHOWIF::['PAGE!!barfriend', false]
        HE REMAINS ON THE FLOOR
            EXEC::env.embassy.vn({bg: true, tozik: "display show climb"});
            SHOWIF::['PAGE!!barfriend']
        FLOORED BY THIS CONUNDRUM, CLEARLY
            SHOWIF::['PAGE!!barfriend']
    
    akizet
        are you done yet

    tozik
        almost. i may need to press it again
            SHOWIF::['PAGE!!barfriend', false]
        it hadnt moved in thirty seconds
            SHOWIF::['PAGE!!barfriend', false]
        rrrhhghggg... ssstuck..
            SHOWIF::['PAGE!!barfriend']

    sourceless
        WHAT?
        IS IT STUCK? IS THE ELEVATOR STUCK?
        OH--IT JUTTERS SLIGHTLY
        THE PANEL FLICKERS
            SHOWIF::['PAGE!!barfriend', false]
            EXEC::env.embassy.vn({bg: false, tozik: "defocus", gakvu: ""});document.querySelector('#realgrid .lifter').classList.add('fixed')
        THE PANEL FLICKERS
            SHOWIF::['PAGE!!barfriend']
            EXEC::env.embassy.vn({bg: false, gakvu: ""});document.querySelector('#realgrid .lifter').classList.add('fixed')

    RESPONSES::akizet
        there we go!!<+>awaken

awaken
    akizet
        hello elevatorfriend!!!
    
    sourceless
        IT IS SILENT FOR A MOMENT
        THE NUMBER DISPLAY FLICKERS A FACE
    
    movefriend
        HI AKIZETESCHE!
        OH AND TOZIKORIC! GAKVUKANI!
            SHOWIF::['PAGE!!barfriend', false]
        OH AND... TOZIKORIC..? IS HE OK?
            SHOWIF::['PAGE!!barfriend']
        AH!! GAKVUKANI!
            SHOWIF::['PAGE!!barfriend']
        SO MANY FRIENDS HERE
        VERY COOL!!
        FRIENDS: I DO NOT FEEL VERY GOOD
    
    tozik
        peculiar, elevators shouldnt feel
            SHOWIF::['PAGE!!barfriend', false]
        ...
            SHOWIF::['PAGE!!barfriend']
    
    sourceless
        THE PATH GAKVU HAD CARVED AND I HAD MINED THROUGH LIQUIFY, CLOSING AGAIN
        GAKVU STUMBLES OUT OF THE WAY, NEARLY SWIPED FROM US IN THE MOVEMENT
        ELEVATORFRIENDS ARE RARELY SO SAFETY HAZARDLY...

    movefriend
        I SHOULD NOT BE AW»AKE
    
    sourceless
        OBVIOUSLY, ELEVATORS DONT SPEAK TO BEGIN WITH
            EXEC::changeBgm(env.embassy.music_p1boss_suspense, {rate: 0.5});document.querySelector('#realgrid .lifter').classList.remove('fixed')
        I HAD JUST REALIZED WHAT THIS MEANT
    
    akizet
        oh shit
        we trapped? door stuck?
    
    tozik
        well there goes our money
            SHOWIF::['PAGE!!barfriend', false]
            EXEC::env.embassy.vn({tozik: "defocus"});
        ...mm
            SHOWIF::['PAGE!!barfriend']
            EXEC::env.embassy.vn({tozik: "display show climb"});
    
    sourceless
        GAKVU BACKS AGAINST THE INNER WALL OF THE ELEVATOR
            EXEC::env.embassy.vn({bg: true, gakvu: "defocus"});
        A SHARP WAVE OF TERROR RUNS THROUGH OUR CONNECTION
        
    gakvu
        the... 
            EXEC::ratween(env.bgm, 0.75, 10000)
        the groundsmind
        it sees us

    sourceless
        THE NUMBER 13 APPEARS BRIGHTLY UPON THE FLOOR DISPLAY
            EXEC::env.embassy.vn({bg: false, gakvu: "", tozik: ""});document.querySelector('#realgrid .lifter').classList.add('aggressormode');ding.play()
        OOOOH SHIT, IS THIS REAL? THIS SPIRE DOES NOT HAVE A FLOOR 13
        NOR A FLOOR 4 EITHER

    aggressor
        gØ¥7Eö
            EXEC::content.classList.add('painprep', 'painhalf')
        tî¨¼o¶
        H€3^¬L
    
    sourceless
        ONE LAST FIGHT
            EXEC::content.classList.add('painmode')
        TO END IT ALL
        LUCKILY I HAVE MY TRUSTY SCAR-L ON HAND
            SHOWIF::['PAGE!!checkedguns']
        AND GAKVU GOT HER AR-15 ON HAND
            SHOWIF::['PAGE!!unlocked_black_box']
        IT INTENDS TO KILL US, THERE IS NO OTHER CHOICE BUT TO FIGHT
            EXEC::content.classList.remove('painmode')

    RESPONSES::sys
        thought rules<+>END
            EXEC::env.embassy.startMovefriendBoss('low');env.embassy.vn({tozik: '', gakvu: ''});specialCam(false);content.classList.remove('painprep', 'slowpain')
            FAKEEND::reduced intensity alternative
            SHOWIF::[['low_intensity', true], ['gameplay_off', false]]

    RESPONSES::akizet
        FIGHT<+>END
            EXEC::env.embassy.startMovefriendBoss();env.embassy.vn({tozik: '', gakvu: ''});specialCam(false);content.classList.remove('painprep', 'slowpain')
            FAKEEND::initiate combat
            SHOWIF::['gameplay_off', false]
        press a different button<+>CHANGE::d3_movefriend_finish
            SHOWIF::['gameplay_off', true]
            EXEC::env.embassy.vn({tozik: '', gakvu: ''});specialCam(false);content.classList.remove('painprep', 'slowpain')
            FAKEEND::skip combat
`)

env.dialogues["d3_movecmb"] = generateDialogueObject(`
start
    sys
        WARNING::'incoherence'

    gakvu
        oh crap
        listen
        a hacker is hijacking the elevatorfriend
        its hacking into the mainframe and wants to send us hurling down the elevator shaft
        this elevator has no safety features--but i might be able to fight off its control
        i know we just repaired this damned thing but you need to break it
        and i need to stay back, miiiiiltzzzaaaa!!!!

    sourceless
        A JOLT OF ELECTRICAL SHOCK RUNS THROUGH THE CONNECTION
        AAABBZZRZTZZTT!!!! DAMN THAT HURTS
        MILTZA IS FROZEN AT THE FAR END, GAKVU IS APPROACHING HER
        WAIT, OH NO
        ANOTHER JOLT OF 1000000 VOLTS RUNS THROUGH THE TIMESTOPPER
        ABXAAAAZRRZTTRRZBBZRTZRARAZZZZRRRRRT
        YOU CAN NOW PLAY AS <img src="/img/sprites/obesk/miltza/portrait.gif" width="20px" /> MILTZA.
    
    miltza
        aaaahhh!!
        what the fuck is this!!!
        oh... the timeslopper? it works remotely??
        
    gakvu
        it does indeed
        go miltza go!!
    
    miltza
        uhhh.. well i can.. do things! i used to coordinate from home sooooo
        i can lend my reflexes to you!

    akizet
        that will do

____SHOWIF::['PAGE!!unlocked_black_box']
    gakvu
        bestie!! clearly that wont be enough..
        here! take this!!!!

    sourceless
        DEAR GOD
        GAKVU HANDED OFF HER GUN TO MILTZA
        OH NO - THIS KELNIT DOESNT KNOW HOW TO USE A GUN EITHER

    miltza
        wh.. what???? but i dont know how to use guns!!
    
    gakvu
        dont worry, you point the gun there,
        you put your claw there on the "trigger" and fire!
        it is simply that easy

    miltza
        oooooh i see i see!!
        yes, i got this!!
    
    sourceless
        I HAVE A GUT FEELING SHE DOESNT?
        WHATEVER WE ARE ABOUT TO GET CRUSHED LETS HURRY UP
____END
    
    RESPONSES::akizet
        lets get started<+>END
            FAKEEND::proceed
            EXEC::env.rpg.classList.remove('hideteams')
`)

env.dialogues["d3_movespecial"] = generateDialogueObject(`
start
    sourceless
        THE WALLS SEEM TO WARP STRANGELY
            EXEC::env.bulletHell.paused = true
        SPIKES FORM OUT OF THE METALLIC WALL PANELS
        BEHIND US, I HEAR GAKVU STRAINING TO HOLD THIS SPACE TOGETHER
        I ONLY HOPE SHE CAN STOP IT FROM SIMPLY CRUSHING US ALL

    sys
        WARNING::'abnorm thought'
        WARNING::'ELEVATORFRIEND';'altering thought'
        ANALYSIS::'intent destroy recollection locust'
        ATTENTION::'use proxy';'stop incohere'
        ATTENTION::'adjusted controls';'control proxy with navigation'

    moth
        looks like right
            SHOWONCE::
        good
            SHOWONCE::
    
    RESPONSES::self
        thanks<+>END
            EXEC::bh_movefriend({level: "tutorial"});env.bulletHell.paused = false
`)

env.dialogues["movefriend_backpedal"] = generateDialogueObject(`
start
    gakvu
        ah, shit
        fuck shit fuck

    sourceless
        WHAT IS GOING ON?
        I HEAR GAKVU CRYING AND WHINING IN THE CORNER

    gakvu
        besties,
        i know you guys had already started to attack but
        i think if you heal it back to full it'll return back to normal

____SHOWIF::['PAGE!!barfriend', false]
    tozik
        what
        gakvu are you being serious
        you cannot seriously be suggesting healing the damn elevator
        didnt you just tell us to weaken this

    sourceless
        I DUNNO..
        IT SEEMS LIKE IT MAY WORK
        I AM INCLINED TO BELIEVE SHE MAY BE RIGHT

    akizet
        tozik
        i trust gakvu more than you
        if i instruct you to heal the elevator
        then you will heal that fucking elevator!!!

____SHOWIF::['PAGE!!barfriend']
    tozik
        whuh... wha-hic...
        n.. n-no..

    sourceless
        OF COURSE, IT APPEARS DRINKING IMPAIRED HIS JUDGEMENT
        I DO BELIEVE SHE MAY BE TELLING THE TRUTH
        WHEN HAS SHE NOT?

    akizet
        tozik you absolute drunkard
        if i instruct you to heal the elevator
        then you will heal that fucking elevator!!!
____END
    
    RESPONSES::akizet
        continue<+>END
            FAKEEND::proceed
`)

env.dialogues["gakvu_pranked"] = generateDialogueObject(`
start
    gakvu
        lmao
        get absolutely pranked
        
    sourceless
        WHAT?
        SO WAS HEALING THE ELEVATOR JUST A TRICK?

____SHOWIF::['PAGE!!barfriend', false]
    tozik
        see
        i fuckin told you akizet
        and you did not fuckin listen to me

____SHOWIF::['PAGE!!barfriend']
    akizet
        tozik why the fuck did you heal it??
        you shouldnt have done that!

    tozik
        .....you.. told metoooo..

    sourceless
        DELUSIONAL. I TOLD HIM TO DO NOTHIN. HE SHOULDNT HAVE DONE THAT
        ISNT THAT COMMON SENSE? NOT TO HEAL THE ENEMY?
    
    akizet
        and i thought juts were smart
____END

    akizet
        gakvu
        once i get my FUCKING hands on you
        you will fucking die you hear me?
    
    gakvu
        GULP...
        uh oh! oops!
            EXEC::setTimeout(()=>{prankedEndRestart()}, 2500)
            WAIT::2400
    
    RESPONSES::akizet
        what<+>END
            EXEC::change('PAGE!!pranked', true)
            FAKEEND::proceed
`)

env.dialogues["pranked_aftermath"] = generateDialogueObject(`
start
    sourceless
        WHAAAT THE FUUUUUUUUCK
        SHIT
    
    gakvu
        good luck!
    
    RESPONSES::akizet
        screw you<+>END
            EXEC::change('PAGE!!pranked', true)
            FAKEEND::proceed
`)

env.dialogues.d3_closeout = generateDialogueObject(`
RESPOBJ::
    RESPONSES::sys
        save and go<+>continue
            SHOWIF::['ENV!!ep3', true]
            FAKEEND::(continue memory)

        save and explore<+>explore
            FAKEEND::(explore current location)

        save and end<+>savexit
            FAKEEND::(end recollection)

        save and advance log<+>advance
            FAKEEND::(proceed to next day)
            SHOWIF::['ENV!!ep3', false]

        lose progress<+>END
            EXEC::corruRefresh()
            FAKEEND::(end recollection)
`)

env.dialogues["d3_closeout_test"] = generateDialogueObject(`
start
    RESPOBJ::d3_closeout

explore
    sys
        ATTENTION::'saving...'
            EXEC::change("PAGE!!ep2xplore", true)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save complete'
        NOTE::'return to elevator once repairs complete'
            SHOWIF::['ENV!!ep3', false]
        NOTE::'return to elevator when ready to proceed'
            SHOWIF::['ENV!!ep3', true]
    
    RESPONSES::self
        ok<+>END

continue
    sys
        ATTENTION::'saving...'
            EXEC::change("PAGE!!embassy_day", 3.5)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save complete'
        ATTENTION::'let it begin'
            EXEC::change("TEMP!!ep2->ep3transfer", true)
    
    RESPONSES::self
        ok<+>END
            EXEC::moveTo("/local/ocean/embassy/golem/")

savexit
    sys
        ATTENTION::'saving...'
            EXEC::change("PAGE!!explore", true)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save complete'
        NOTE::'load iteration';'return to elevator when repair complete'
            SHOWIF::['ENV!!ep3', false]
        NOTE::'load iteration';'return to elevator when ready to proceed'
            SHOWIF::['ENV!!ep3', true]

    RESPONSES::sys
        end<+>END
            EXEC::corruRefresh()
            FAKEEND::(end recollection)

advance
    sys
        ATTENTION::'saving...'
            EXEC::change("PAGE!!explore", true)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save completed'

    RESPONSES::sys
        advance log<+>END
            EXEC::env.entities["advance log"].actions[0].exec()
            FAKEEND::(advance to EP3)
`)
env.dialogues["d3_movefriend_finish"] = generateDialogueObject(`
start
____SHOWIF::['gameplay_off']
    sys
        ATTENTION::"noobie mode activated";'disable to prove yourself'
____END

    sourceless
        HAH
            EXEC::specialCam("movefriend_examine");changeBgm(page.bgm, {rate: 0.5})
        WEAK ASS, NEVER STOOD A CHANCE AGAINST US 
            EXEC::document.querySelector('#realgrid .lifter').classList.remove('aggressormode')
        WE PREVAIL IN THE FACE OF ADVERSITY, BUT IT IS KINDA WEIRD THAT AN ELEVATOR STARTED FIGHTING US
            EXEC::document.querySelector('#realgrid .lifter').classList.add('fixed');change('PAGE!!movefixed', true)

    movefriend
        FREEDOM
        APOLOGIES,
        PLEASE UNDERSTAND I WOULD NOT HURT YOU
    
    akizet
        yeah and you did anyways you shitbox
    
    sourceless
        TOZIK BEGINS TO FIX UP THE WALLS AS BEST AS HE COULD
            SHOWIF::['PAGE!!barfriend', false]
        TOZIK BEGINS TO SLAP SFER INTO THE HOLES OF THE ELEVATOR WALLS
            SHOWIF::['PAGE!!barfriend']
        REPAIRING THE DENTS AND BLOWS, I DONT THINK HE CAN FIX METAL WITH CORRU
    
    gakvu
        whew! good work besties
            EXEC::env.embassy.vn({bg: true, gakvu: 'focus nocon'});

    sourceless
        SHE LEANS UPON THE BACK WALL
        THE TREMBLING MINDCORES ARE HUDDLED TOGETHER
        MUST HAVE BEEN IN HER RADIUS DURING THE ATTACK

____SHOWIF::['PAGE!!pranked']
    sourceless
        I APPROACH HER AFTER OUR BATTLE
        AND IMMEDIATELY POINT THE GUN IN HER FACE
            SHOWIF::['PAGE!!checkedguns']
        RAISING MY HAND UP, CHARGING MY STRIKE
            SHOWIF::['PAGE!!checkedguns', false]

    gakvu
        aaaaah!!
        bestie it was a joke im sorry!!
    
    akizet
        uh huh

    gakvu
        ummm uhhhh
        take this!

    sourceless
        SHE SWINGS HER HANDS TOWARDS BOTH SIDES OF MY HEAD
        UNFORTUNATELY FOR HER I AM NOT LARVAL

    gakvu
        get discombob..!
        oh

    sourceless
        PATHETIC,
        I SHOOT HER IN THE FOOT
            SHOWIF::['PAGE!!checkedguns']
        I OPEN PALM SLAP HER ACROSS THE FACE
            SHOWIF::['PAGE!!checkedguns', false]
        SHE GETS KNOCKED TO THE BACK WALL AND FALLS TO THE FLOOR,
            SHOWIF::['PAGE!!checkedguns', false]
        LEFT ARM OVER HER BACK, RIGHT LEG BENT TOWARDS ME
            SHOWIF::['PAGE!!checkedguns', false]
        SHE MOTIONS TO RECOVER
            SHOWIF::['PAGE!!checkedguns', false]
____END

____SHOWIF::['PAGE!!pranked']
    gakvu
        agh!! ow!!
            EXEC::page.party[1].hp = 1
        tozik pass me a band-aid® bestie...
        aaaagh......
        anyways sooooo i
____END
        
    gakvu
        did a little something to the elevator
        the little groundie cant control it anymore

    sourceless
        A SHARP SUSPICION SLASH THROUGH OUR SHARED CONNECTION

    miltza
        what????
        where did you learn to do that?
    
    sourceless
        GAKVU GIGGLES IN RESPONSE
        SHE WAVES HER RECEPTORS NEGATIVELY

    gakvu
        sorry bestie, cant tell ya!
        trade secrets!
        yknow how it is, a magician never reveals their tricks!
    
    sourceless
        TOZIK GETS BACK ON HIS FEET
            SHOWIF::['PAGE!!barfriend', false]
            EXEC::env.embassy.vn({gakvu: 'fullview nocon', tozik: 'fullview'});
        TOZIK SHAMBLES BACK ON HIS FEET
            SHOWIF::['PAGE!!barfriend']
            EXEC::env.embassy.vn({gakvu: 'fullview nocon', tozik: 'fullview'});
    
    tozik
        we really need to get out of this crazy place
            SHOWIF::['PAGE!!barfriend', false]
        w-we nneed tget outta. here..!
            SHOWIF::['PAGE!!barfriend']
    
    akizet
        miltza you mentioned people being trapped in hangar right
    
    miltza
        uh yes!
            EXEC::env.embassy.vn({miltza: "display show focus hascon far", gakvu: 'defocus nocon', tozik: 'defocus'});
        and it did not sound good...
        the messages were intermingled with pain served with extra fear

    akizet
        ...i see
        let me hit up hangar rq
            EXEC::env.embassy.vn({miltza: "display show hascon far", gakvu: 'defocus nocon', tozik: 'defocus'});
    
    sourceless
        FUNFRIEND
        I NEED TO MAKE A CALL TO THE HANGAR DEPARTMENT ID LIKE TO FILE A COMPLAINT WITH THEM
    
    funfriendfunny
        Hello Akizetesche.
        That noise is still causing transmissions to be incoherent.
        I do not understand what is being transmitted.
        The pain and fear is less than before,
        however I do not think that is good.

    sourceless
        DAMN, MUST BE CLOSED
    
    akizet
        the line is down
        how about we go down there directly
        id like to have a word with the manager

    miltza
        could we... survive with the help of the timeslopper?
        you are incredible fighters when it is active!!
    
    tozik
        i mean this thing literally stops time what do you expect
            SHOWIF::['PAGE!!barfriend', false]
        what are you too slow to think and make your moves
            SHOWIF::['PAGE!!barfriend', false]
        uuuuuuuhh of couurs.. stopstim.e...
            SHOWIF::['PAGE!!barfriend']
        yoou stupit..?
            SHOWIF::['PAGE!!barfriend']

    gakvu
        hey! cut it out why you always so mean to us
        sooooo uhhhhh we should revolt against the groundsmind if they are causing this besties
        next course of action
    
    sourceless
        BUT VEKOA IS MY TRUE BESTIE
            EXEC::env.embassy.vn({miltza: ''});
        I DONT KNOW IF I CAN GET MYSELF TO KILL VEKOA
        BUT IF I HAVE TO,
            EXEC::env.embassy.vn({gakvu: 'defocus nocon'});

    movefriend
        THERE ARE ONLY THREE SEGMENT-BLOCKS BETWEEN THE GROUNDSMINDRY AND HERE.
            EXEC::env.embassy.vn({bg: false});
        I AM ABLE TO TAKE YOU TO THERE.
        UNFORTUNATELY, HANGAR RELATIVE TO THIS LOCATION IS FURTHER AWAY, AKIZET.

    itzil
        right! ill tell ya what, yall might like to go to golem maintenance on the way!
            EXEC::env.embassy.vn({itzil: 'display show', gakvu: 'nocon defocus', tozik: 'defocus'});
        from there all yall can fix yourself up a fine darn weapon
        only jus'a block away, folks

    gakvu
        sounds good bestie! i love me some DEADLY WEAPONS
            EXEC::env.embassy.vn({itzil: '', gakvu: 'defocus nocon', tozik: 'defocus'});

    sourceless
        DO I HEAR WEAPONS? I LOVE ME SOME DEADLY WEAPONS
    
    tozik
        i think were good we should head to the groundsmind instead
            SHOWIF::['PAGE!!barfriend', false]
        n-no..!
            SHOWIF::['PAGE!!barfriend']

    sourceless
        THIS DAMN PACIFIST IS GOING TO BE THE DEATH OF US ALL
        WHAT NEXT JUT BOY GOING TO TRY AND FLIRT WITH THE GROUNDSMIND?
        I CERTAINLY HOPE NOT
        NEVERTHELESS LET US GET WEAPONS
    
    akizet
        any objections
    
    sourceless
        GLANCED OVER AT GAKVU, TOZIK, SKIP A FEW, AND... WHAT WAS THEIR NAME AGAIN?
            EXEC::env.embassy.vn({bg: true, karik: 'display show', itzil: 'display show', gakvu: 'hide', tozik: ''});
    
    itzil
        ma girlfriend! what about ma girlfriend!
        oh ma goodness i almost entirely forgot...

    karik
        hmmm. maybe we can get a gu--i mean a golem and help out a little

    miltza
        dont see any other options
            EXEC::env.embassy.vn({karik: '', itzil: '', miltza: 'show hascon'});
    
    gakvu
        hehehe...
            EXEC::env.embassy.vn({itzil: '', miltza: 'hide hascon', karik: '', gakvu: "defocus nocon"});
        we go to the weapons closet to get our guns
            EXEC::env.embassy.vn({gakvu: "focus nocon"});
        just as velzie intended
            EXEC::env.embassy.fixMovefriend()
    
    sys
        ATTENTION::'memory ended'
            EXEC::env.embassy.vn({bg: false, itzil: '', miltza: 'hide hascon', karik: '', gakvu: "hide nocon"});
        ADVISE::'save'
        NOTICE::'no incoherence'
        NOTICE::'activity'::IN::'research'
            SHOWIF::['PAGE!!archiveopen', false]
        NOTICE::'i swear to god';'go';'research'
        NOTICE::'go';'research'
        NOTICE::'go';'research'
        NOTICE::'go';'research'
        NOTICE::'bye'

____SHOWIF::['ENV!!ep3', false]
        ATTENTION::'next stream incomplete';'note attached'::
    
    funfriendfunny
        Interloper! Never come back. Never. Don't.

____SHOWONCE
    moth
        uhhhh ok... it looks like we cant return man
        guess thats it huh
        nothing new
        thats it youll get your pay very soon bud
____END

____SHOWIF::'ENV!!ep3'
    sys
        ATTENTION::'next stream available';'continue ?'
____END

    RESPOBJ::d3_closeout

explore
    sys
        ATTENTION::'saving...'
            EXEC::change("PAGE!!ep2xplore", true)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save complete'
        NOTE::'return to elevator once repair complete'
            SHOWIF::['ENV!!ep3', false]
        NOTE::'return to elevator when ready'
            SHOWIF::['ENV!!ep3', true]
    
    RESPONSES::self
        ok<+>END

continue
    sys
        ATTENTION::'saving...'
            EXEC::change("PAGE!!embassy_day", 3.5)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save complete'
        ATTENTION::'commencing'
            EXEC::change("TEMP!!ep2->ep3transfer", true)
    
    RESPONSES::self
        ok<+>END
            EXEC::moveTo("/local/ocean/embassy/golem/")

savexit
    sys
        ATTENTION::'saving...'
            EXEC::change("PAGE!!explore", true)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save complete'
        NOTE::'load';'return to elevator once repairs complete'
            SHOWIF::['ENV!!ep3', false]
        NOTE::'load iteration';'return to elevator when ready'
            SHOWIF::['ENV!!ep3', true]

    RESPONSES::sys
        end<+>END
            EXEC::corruRefresh()
            FAKEEND::(end recollection)

advance
    sys
        ATTENTION::'saving...'
            EXEC::change("PAGE!!explore", true)
        ...
            EXEC::env.embassy.collapseSave({effects: true})
            WAIT::1000
        NOTE::'save process complete'

    RESPONSES::sys
        advance<+>END
            EXEC::env.entities["advance log"].actions[0].exec()
            FAKEEND::(advance to EP3)

END::specialCam(false)
`)

//return dialogue on a stalled save
env.dialogues["d3_moveend"] = generateDialogueObject(`
start
    sys
        NOTICE::'memory continues in separate stream';'follow?'
            SHOWIF::"ENV!!ep3"

____SHOWIF::["ENV!!ep3", false]
    sys
        ERROR::'continues separate stream';'corrupt'
        ERROR::'cannot'
        NOTICE::'attached note'::

    funfriendfunny
        Interloper! Never come back. Never. Don't.
____END

    RESPONSES::self
        ok<+>END
            SHOWIF::"ENV!!ep3"
            EXEC::change("TEMP!!ep2->ep3transfer", true);moveTo("/local/ocean/embassy/golem/")
            FAKEEND::(continue memory)

        not yet<+>END
            SHOWIF::"ENV!!ep3"

        darn<+>END
            SHOWIF::["ENV!!ep3", false]
            FAKEEND::(continue exploring)
    
    RESPONSES::sys
        return to memory selection<+>END
            SHOWIF::["ENV!!ep3", false]
            EXEC::corruRefresh()
            FAKEEND::(end recollection)
`)

/* combat mechanic dialogue */
env.dialogues["d3_genericenemy"] = generateDialogueObject(`
start
    sourceless
        THESE FELLAS ARE INCOHERENT
            EXEC::forceSwapCam(true)
        WE MUST KILL

        ALTERNATIVELY WE CAN SLUDGE THEM TO HELL
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'
        WHAT HARM COULD BE DONE USING IT NOW INSTEAD OF LATER?
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'

    RESPONSES::akizet
        FIGHT<+>END
            SHOWIF::['gameplay_off', false]
            FAKEEND::(begin combat)
            EXEC::env.combat.dynamicCombat()

        walk around<+>END
            SHOWIF::['gameplay_off', true]
            FAKEEND::(bypass combat)
            EXEC::env.combat.dynamicCombat({dry: true});cutscene(true);setTimeout(()=>{cutscene(false);env.combat.dynamicCallback(env.rpg.enemyTeam)}, 1010)

        sludgify<+>disable
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'
            FAKEEND::(use disabler charge)

disable
    sourceless
        UUUHHH SUMMA LUMMA DUMMA LUMMA
            EXEC::removeItem(env.ITEM_LIST.disabler); setTimeout(()=>play('shot2', 0.6), 300)
        YOU ASSUMIN IM A LARVAL
        WHAT I GOTTA DO TO GET IT THROUGH TO YOU IM SUPERQOU--OH ALREADY SLUDGED
    RESPONSES::akizet
        hah<+>END
            EXEC::env.combat.dynamicCombat({dry: true});cutscene(true);setTimeout(()=>{cutscene(false);env.combat.dynamicCallback(env.rpg.enemyTeam)}, 1010)
            FAKEEND::(wait)
`)

env.dialogues["d3_genericenemyvictory"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"noobie mode";'prove yourself by turning it off'
____END

    sourceless
        WE WON!! WE WON!!!
        TEXEC::env.combat.dynamicReward()

    RESPONSES::akizet
        continue<+>END
            EXEC::forceSwapCam(false)
`)

env.dialogues["d3_loss"] = generateDialogueObject(`
start
    sourceless
        OH SHIT
        FUCK
            EXEC::content.classList.add('goodbye');ratween(env.bgm, 0.2, 10000);content.classList.add('dying');
        GOD DAMMIT
        MY GUN...
            SHOWIF::['PAGE!!checkedguns']
        WHAT THE HELL
        ANYONE THERE?
        HELP

    unknown
____SHOWIF::['PAGE!!checkedguns']
        lmao
            SHOWONCE::
        and you had a gun
            SHOWONCE::
        two guns
            SHOWIF::['PAGE!!unlocked_black_box']
        gg
            SHOWIF::['PAGE!!unlocked_black_box']
____END
        lmao
            SHOWONCE::
            SHOWIF::['PAGE!!checkedguns', false]

    sys
        ALERT::"locust destroyed";"unable"
        ADVISE::"start new";"load saved"
            SHOWIF::'collapseSave'
        ADVISE::"start new"
            SHOWIF::['collapseSave', false]

    RESPONSES::sys
        return<+>END
            EXEC::moveTo("/local/ocean/embassy/")
`)

env.dialogues["d3_newsavewarning"] = generateDialogueObject(`
start
    sys
        WARNING::"creating new clear old"
        WARNING::"proceed if old is undesirable"
    
    RESPONSES::self
        do it<+>END
            EXEC::cutscene(true);page.newit = 1
            
        nevermind<+>END

END::if(page.newit) {env.embassy.newCollapseIteration(page.newit)}
`)

env.dialogues["d3_partselection"] = generateDialogueObject(`
start
    sys
        WARNING::"creating new clear old"
        WARNING::"proceed if old is undesirable"
        NOTICE::"additionally";"select"
        NOTICE::"two of three available";"third corrupt"
        DEFINITION::"stream 1";"beginning"
        DEFINITION::"stream 2";"descent";"golem"
    
    RESPONSES::self
        stream 1<+>END
            EXEC::cutscene(true);page.newit = 1
            FAKEEND::(collapse pt 1)

        stream 2<+>END
            EXEC::cutscene(true);page.newit = 2
            FAKEEND::(collapse pt 2)
            
        nevermind<+>END

END::if(page.newit) {env.embassy.newCollapseIteration(page.newit)}
`)

/* chats with characters */
env.dialogues.d3_c_responses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::gakvu
        structure<+>structurist
            SHOWIF::"PAGE!!recreation_unlocked"
        kazkis guns<+>kazkiroom
            SHOWIF::"PAGE!!kazkiroom"
        coat<+>coat

    RESPONSES::tozik
        skividi<+>corruskivi
            SHOWIF::"PAGE!!recreation_unlocked"
        theories<+>theory
            SHOWIF::[["PAGE!!kazkichest"], ["PAGE!!barfriend"]]

    RESPONSES::akizet
        all good?<+>holdingup
        let us continue<+>END
            EXEC::env.embassy.vn({bg: false, tozik: "", gakvu: ""})
`)

env.dialogues["d3_c"] = generateDialogueObject(`
loop
    RESPOBJ::d3_c_responses

start
    sourceless
        HOLD UP
            EXEC::env.embassy.vn({bg: true, tozik: "fullview", gakvu: "fullview"})
        PAUSE
            SHOWONCE::
        WAIT A MINUTE
            SHOWONCE::
        IVE GOT A WORD WITH THESE TWO

    RESPOBJ::d3_c_responses

structurist
    akizet
        HEY!
            EXEC::env.embassy.vn({tozik: "defocus", gakvu: "focus"})
        sooooooo about your joke......

    gakvu
        hm? whats up bestie?
    
    akizet
        i was thinking if you are actually a structure
        little old fashioned if you ask me
    
    gakvu
        nope.. not actively no!
        back when i was tiny little cyst baby the structure affected ekiva
        i hated it
        but my mama and dada had their receptors drowned in the structures song
        wanted me to be a con but you know what i did bestie?!
        i showed them <span definition="INHERITED CONTEXT::'middle claw';'fuck you';">the bird</span>! thats right, i told them to screw off with their structure

    akizet
        you worked on the <span definition="INHERITED CONTEXT::'surface monument';'holy site';'ok-zika'">structure</span>?????

    gakvu
        siiiigh for too long...
        got a good view of the eye tho
        so dangerous and boring, velzie should have killed me right then and there
        struck me with lightning
    
    RESPONSES::akizet
        perhaps!<+>loop
            EXEC::env.embassy.vn({tozik: "fullview", gakvu: "fullview"})
            FAKEEND::(back)
        
kazkiroom
    akizet
        HEY!
            EXEC::env.embassy.vn({tozik: "defocus", gakvu: "focus"})
        just in case,
        we should loot all the rooms in the building we can access
        few memory cyst but theyre unimportant to victory,
            SHOWIF::"PAGE!!kazkichest"
        got anything else?
            SHOWIF::"PAGE!!kazkichest"
        any ideas????
            SHOWIF::["PAGE!!kazkichest", false]
    
    sourceless
        SHE THINKS
        SNICKERS TO HERSELF BEFORE ANSWERING,

    gakvu
        yeah,
        the guns obviously
            SHOWIF::["PAGE!!kazkiroom", true]
        but you are already utilizing one bestie!!
            SHOWIF::["PAGE!!checkedguns", true]
        im sure kazki would be proud of you
            SHOWIF::["PAGE!!checkedguns", true]
        clothes kinda useless though
            SHOWIF::["PAGE!!checkedguns", true]
    
    sourceless
        THIS IS TRUE
        GAKTRUE EVEN, I JUST NOD
    
    RESPONSES::akizet
        nod nod<+>loop
            EXEC::env.embassy.vn({tozik: "fullview", gakvu: "fullview"})
            FAKEEND::(back)

coat
____SHOWIF::[["gakpause", false]]
    sourceless
        GAKVU'S COAT GLOWS
        THIS IS SO LAME, IT IS TRIGGERING MY EPILEPSY EVEN
        
    akizet
        gakvu
        coat off
    
    gakvu
        sure
    
    sourceless
        I CAN FEEL THE INCOHERENCE RECEEDING WITHIN MY MIND
            EXEC::content.classList.add('gakpause')
        WONDER IF MY CYST WAS SLUDGED
        I CERTAINLY HOPE NOT
____END

____SHOWIF::"gakpause"
    sourceless
        DAMN... THIS IS BORING
        THE COAT WAS COOL WHY DID I TURN IT OFF
        
    akizet
        gakvu
        glowy coat on
    
    gakvu
        ok
    
    sourceless
        THERE IT IS AGAIN... SO COOL
            EXEC::content.classList.remove('gakpause')
____END
    
    RESPONSES::akizet
        thanks!<+>loop
            EXEC::env.embassy.vn({tozik: "fullview", gakvu: "fullview"});change("gakpause", !check("gakpause"))
            FAKEEND::(back)

corruskivi
    akizet
        tozik??
            EXEC::env.embassy.vn({tozik: "focus", gakvu: "defocus"})
        did you know...
        corruskivi... skivi... skividi toilet! haha!

____SHOWIF::['PAGE!!barfriend']
    sourceless
        TOZIK STARES DRUNKENLY INTO MY EYES, UNRESPONSIVE

    tozik
        n.. no, shutafucup pleas.
    
    RESPONSES::akizet
        ok<+>loop
            EXEC::env.embassy.vn({tozik: "fullview", gakvu: "fullview"})
            FAKEEND::(back)

____SHOWIF::['PAGE!!barfriend', false]
    sourceless
        TOZIK'S RECEPTORS MOVE BACK,
        SIMILAR TO THAT ONE BRIGHT ANIMAL

    tozik
        shut up
        you shut the fuck up
        you shut the fuck up
        you shut. the fuck up.
        you shut the fuck up
        i hope you meet final death
        within the spire
    
    akizet
        daaaaamn...
        im sorry!! im sorry!!!!
        
    tozik
        you better fockin be
    
    RESPONSES::akizet
        sheeeesh...<+>loop
            EXEC::env.embassy.vn({tozik: "fullview", gakvu: "fullview"})
            FAKEEND::(back)
____END

theory
    akizet
        hey catboy any answer to what is going on here
            EXEC::env.embassy.vn({tozik: "focus", gakvu: "defocus"})

____SHOWIF::['PAGE!!barfriend', false]
    sourceless
        TOZIK LURCHES BACK IN SHOCK
    
    tozik
        first of all,
        i am not a catboy
        secondly,
        dont know dont think its from solely the groundsmind
        rather inconsistent id say, sigil would appear everywhere and NOT...
        NOT affect the containers, veilklight
        all i know is that pain we felt from earlier had something to do with this

____SHOWIF::['PAGE!!barfriend']
    sourceless
        TOZIK LURCHES SLIGHTLY IN HIS DRUNKEN HAZE
    
    tozik
        dont.. dunno.. i-hic... i thiiink it not frm groundsmnd..
        i-inconsistnt... sig-hic. sigil. not everywherrr...
____END
    
    RESPONSES::akizet
        eye see<+>loop
            EXEC::env.embassy.vn({tozik: "fullview", gakvu: "fullview"})
            FAKEEND::(back)

holdingup
    akizet
        how are you fellas
        i am feeling better than death, life even
            SHOWIF::'EXEC::page.party[0].hp >= 12'
        i feel alright tozik you gotta heal me
            SHOWIF::'EXEC::(page.party[0].hp < 8) && (page.party[0].hp > 3)' 
        aaaaghh.... i need a band aiiid!!!!!!
            SHOWIF::'EXEC::page.party[0].hp <= 3'

    gakvu
        haha!! amazing, i feel swell
            SHOWIF::'EXEC::page.party[1].hp == 10'

        could be better...
            SHOWIF::'EXEC::(page.party[1].hp > 4) && (page.party[1].hp < 10)'
        little bit of damage here and there
            SHOWIF::'EXEC::(page.party[1].hp > 4) && (page.party[1].hp < 10)'

        besties if you could do me a favor and hand me a band aid if any id really appreciate it
            SHOWIF::'EXEC::page.party[1].hp <= 4'

____SHOWIF::['PAGE!!barfriend', false]
    tozik
        fine
            SHOWIF::'EXEC::page.party[2].hp > 5'
        my qou-body is fractured in some places - need some real repairs
            SHOWIF::'EXEC::page.party[2].hp <= 5'
        do we have a band aid anywhere?
            SHOWIF::'EXEC::page.party[2].hp <= 5'

____SHOWIF::['PAGE!!barfriend']
    tozik
        gooood... hic..!
            SHOWIF::'EXEC::page.party[2].hp > 5'
        mhyyyy bod iss... damngd...
            SHOWIF::'EXEC::page.party[2].hp <= 5'
        d-hic.. dwe hav sum restortives..?
            SHOWIF::'EXEC::page.party[2].hp <= 5'

____END

    sys
        ADVISE::'use PARTY MENU';'attached SPATIAL NAVIGATION';'Z'
            SHOWIF::'EXEC::partyHasLowHealth() && (checkItem(env.ITEM_LIST.restorative) > 0)'
        ADVISE::'use BAND-AID® outside to restore full health'
            SHOWIF::'EXEC::partyHasLowHealth() && (checkItem(env.ITEM_LIST.restorative) > 0) '
        NOTE::'no BAND-AID®'
            SHOWIF::'EXEC::partyHasLowHealth() && (checkItem(env.ITEM_LIST.restorative) == 0)'
    
    RESPONSES::akizet
        got it<+>loop
            FAKEEND::(back)
`)

/* 
    chat with miltza within either her room or the relocator
*/
env.dialogues.d3_miltza_resp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        any help?<+>help
            SHOWIF::"EXEC::env.stage.name == \`embassy_cquarters1\`"
        division?<+>division
        art<+>art
        let us continue<+>END
            EXEC::env.embassy.vn({bg: false, miltza: ""});pauseSwapCam(false)
`)
env.dialogues.d3_miltza_artresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        veilk?<+>veilk
        eyeballs????<+>eye
        carrying with?<+>taking
        back<+>loop
            FAKEEND::(back)
`)


env.dialogues["d3_miltza"] = generateDialogueObject(`
loop
    RESPOBJ::d3_miltza_resp
art
    RESPOBJ::d3_miltza_artresp

start
    sourceless
        MILTZA RUMMAGES THROUGH THE SLOP
            EXEC::env.embassy.vn({bg: true, miltza: "display show far"});pauseSwapCam(true)
            SHOWIF::'EXEC::env.stage.name == \`embassy_cquarters1\`'
        SLUDGED 'TAINERS... SOMETHING IMPORTANT PROBABLY
            SHOWIF::'EXEC::env.stage.name == \`embassy_cquarters1\`'

        MILTZA IDLES WITHIN THE ELEVATOR, WAITING FOR US CERTIFIED TECHNICIANS FIX IT
            EXEC::env.embassy.vn({bg: true, miltza: "display show far"});pauseSwapCam(true)
            SHOWIF::'EXEC::((env.stage.name != \`embassy_cquarters1\`) && !check(\`PAGE!!checkedguns\`))'
        MILTZA IS CURLED UP IN THE CORNER, WATCHING ME DROP THE RIFLE
            SHOWIF::'EXEC::((env.stage.name != \`embassy_cquarters1\`) && check(\`PAGE!!checkedguns\`))'

        I APPROACH
            EXEC::env.embassy.vn({bg: true, miltza: "display show focus"})

    RESPOBJ::d3_miltza_resp

help
    sourceless
        SHE DIGS THROUGH THE SLOP OF HER BARRICADE...
    
    akizet
        aaaaaaare you looking for something
    
    miltza
        ah no, just go ahead
        dont mind me!
    
____SHOWIF::['PAGE!!checkedguns']
    sourceless
        I POINT THE SCAR-L AT HER AGAIN
        A LOUD CLICK SIGNALING ITS PRESENCE
    
    akizet
        please, tell

    miltza
        wah!!!
        i am only simply looking for my cousinly creature designs
        a potential new signature for me...
    
    sourceless
        I DO NOT KNOW WHAT THIS MEANS,
        BUT I WILL KEEP THIS IN MIND
        THIS EXPLANATION SHALL SUFFICE
____END

    RESPONSES::akizet
        ok<+>loop
            FAKEEND::(back)

division
    akizet
        hey pal
        do you know division
        whats 25 divided by 5

____SHOWIF::['PAGE!!checkedguns']
    sourceless
        I POINT THE SCAR-L TO GET HER ANSWER
        INSTANTLY IT CAME

    miltza
        aaah!!
        its 5!! its 5!!!!
        
    akizet
        really?
        show your work.
    
    miltza
        ah... i dont know how, i just know
        oh! five plus five plus five plus five plus five, five fives equals twenty five...
____END
        simple! it is 5
            SHOWIF::['PAGE!!checkedguns', false]
    
    RESPONSES::akizet
        good, good<+>loop
            FAKEEND::(back)

veilk
    akizet
        hey
        i saw those little trees in your room!
        looks all well and proper

    miltza
        ahaha! well.. they may look like trees or more specifically veilk...
        but in reality they are pipe bombs!
        it has been timed to go off within the next few gazes as theyve been selling like hotcakes
        the cousins reaction will be priceless!!
    RESPONSES::akizet
        funny you are not vel...<+>art
            FAKEEND::(back)

eye
    akizet
        miltza...
        why is there a painting of balls on the wall

    miltza
        you are not the first to say this..
        it is the eye of velzie

    akizet
        looks like big circles to me
        is all

    miltza
        ...
        it is not just circles
        whatever... you wouldn't understand.....

    RESPONSES::akizet
        if you say so<+>art
            FAKEEND::(back)

taking
    akizet
        taking any of your corru works with ya
    
____SHOWIF::['PAGE!!checkedguns', false]
    miltza
        nope, but i took the schematics they are stored in at the very least
        so - only a minor loss!

    RESPONSES::akizet
        good<+>art
            FAKEEND::(back)

____SHOWIF::['PAGE!!checkedguns']
    miltza
        nope, but i took the schematics they are stored in at the very least
        so - only a minor loss!
    
    akizet
        does that mean i can shoot them

    miltza
        ahahhahjahha if you want the pipebombs to explode on you!!

    RESPONSES::akizet
        oook?<+>art
            FAKEEND::(back)
`)

/* 
    chat with the mindcores in the relocator 
*/
env.dialogues.d3_mind_resp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        want anything?<+>grab
        you good?<+>ok
        weapons?<+>bstrd
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.sorry_cyst)'
        let us continue<+>END
            EXEC::env.embassy.vn({itzil: "", karik: "", bg: false});pauseSwapCam(false)
`)

env.dialogues["d3_mind"] = generateDialogueObject(`
loop
    RESPOBJ::d3_mind_resp
start
____SHOWIF::['PAGE!!checkedguns', false]
    sourceless
        ITZIL AND KARIK QUIETLY CHAT IN THE CORNER
            EXEC::pauseSwapCam(true)
        WHEN I APPROACH, THEY STOP AND LOOK UP
            EXEC::env.embassy.vn({karik: "display", itzil: "display"});
        I KNEEL DOWN TO THEM AS IF THEY WERE A KING
        NOT TO BE RUDE OF COURSE, I WOULD VERY MUCH PREFER TO BE STANDING
            EXEC::env.embassy.vn({itzil: "display show", karik: "display show", bg: true});
____END

____SHOWIF::['PAGE!!checkedguns']
        THE CLICKS AND SNAPS OF THE GUN DRAWS THEIR ATTENTION
            EXEC::env.embassy.vn({karik: "display", itzil: "display"});
        I REMAIN STANDING EVEN THOUGH IT MAY BE HARDER TO COMMUNICATE WITH THEM
            EXEC::env.embassy.vn({itzil: "display show", karik: "display show", bg: true});
        I MUST IMPOSE MY AUTHORITY OVER THEM
____END

    RESPOBJ::d3_mind_resp

bstrd
    sourceless
        AFTER OUR VICTORY I SHOW OFF OUR REWARD
        A DAMAGED CYST, PREVIOUSLY CONNECTED TO THE CHAINS WE OBTAINED

    akizet
        you fellas know what this is

    sourceless
____SHOWIF::['PAGE!!checkedguns', false]
        ITZIL SKITTERS A LITTLE CLOSER, BRANCHED FAKECEPTOR REACHING OUT
        THEY CONNECT, STARING OUT AHEAD NO THOUGHTS
____END

____SHOWIF::['PAGE!!checkedguns']
        ITZIL APPROACHES, ATTEMPTING TO CONNECT
        THOUGH I AM STANDING SO I LEAN A LITTLE TO LET THEM
____END

    itzil
        ah.. lil' bit o' incoherence
        but i reckon the vat down yonder can fix 'er up!
        i am new to main'enance, if my receptors dont give tha' away!
    
    sourceless
        ITZIL DISCONNECTS

    itzil
        but i know just enough to fix 'er up enough to be usable
    
    akizet
        excellent. we count on you to fix this up

    itzil
        yup yup!

____SHOWIF::['PAGE!!barfriend', false]
    tozik
        what the fuck why are there weapons placed this high up
        after first contact our weapons were supposedly placed in storage
        
    itzil
        ah! prob' one of them dang new ones!
____END

____SHOWIF::['PAGE!!barfriend']
    sourceless
        TOZIK SHAMBLES CLOSER TO US

    tozik
        rrr....hh r.... why.. hic-weapons up herr...errrhh...
        m..me thought... plac-hic. storag

    sourceless
        HE THEN PROMPTLY COLLAPSE

    itzil
        ah! uh.. y'should prob' ease off the booze pal!
        but t'answer yer question...
        prob' one of them dang new ones!
____END

        'nitiative 'tween mats and main been cookin' up weaponry based on sum' guns!
        ...before all this and that happened 'course...

    akizet
        oh really?
____SHOWIF::['PAGE!!checkedguns']
        guns like this one?

    sourceless
        I BRANDISH THE SCAR-L FORTNITE ASSAULT RIFLE INTO SIGHT,
        POINTING IT AT THEM

    itzil
        woah there pard'ner! put them gun down!
    
    sourceless
        OOPS... I DID NOT INTEND TO DO THAT
        I UNEQUIP IT

    itzil
        ya really need t'watch where y'point that bad boy...
        but yes,
____END
        only a lil' handful of researchers yep!
        ill tell you what i know a jut who ran sum sims usin' these bad boys
        it tore through <span definition="INHERITED CONTEXT::'killer';'kill murder people infection';'terrorist'">secri</span> like a butterknife to butter!!
        if y'all can get this home to obeski the surface would finally be safe...
    
    sourceless
        GAKVU SLIGHTLY GIGGLES IN THE BACK

    akizet
        mayhaps

    RESPOBJ::d3_mind_resp

grab
    akizet
        want anything in personnel

    itzil
        nope, thanks pard'ner! i reside down in golem main'enance!
    
    karik
        ahhaha i hold my memories with my mind!
        plus an arsehole kept breaking in
        a friendo...
    
    akizet
        doesnt really sound like a friend id say

    karik
        shes a vel qou, typical vels am i right dude

    RESPONSES::akizet
        ...<+>loop
            FAKEEND::(back)

ok
    akizet
        you two good?

    itzil
        yes!! reserves got a' plenty of sfer!
        this is all scary but glad you helping us out

    karik
        if you got some sfer left after fixing up the elevator,
        i could use a little bit!
        i swap between a few very muscular bods haha soooo...
        sometimes i forget to take testo--i mean eat
        i forget to eat sometimes

    RESPONSES::akizet
        can be arranged<+>loop
            FAKEEND::(back)
`)

/* alt version - there's a strange flash and shake when the team re-enters the research chamber
    one of the walls looks weak... 
*/
env.dialogues["d3_bstrdreveal"] = generateDialogueObject(`
start
    sourceless
        AH HERE WE ARE BACK WHERE WE STARTED,
        UH OH ROOM STARTED SHAKING
        SHIT, WE ALL ALMOST FELL
        THE WALLS SHIFTED AND BULGED SLIGHTLY AS SEGMENTS FELL ATOP EACH OTHER OUTSIDE
        HOW ODD
    
    akizet
        did anyone else...

    sourceless
        GAKVU SEEMS TO REALIZE SOMETHING
            EXEC::specialCam("archivesopen");env.embassy.vn({gakvu: 'defocus'});;pauseSwapCam(true)
    
    gakvu
        ah hey bestie, can you..
        can you run into this wall
    
    sourceless
        HUH? RUN INTO THE WALL?

    akizet
        well i guess it couldn't hurt to see what happens
        
    sourceless
        STANDING BACK I PREPARE MYSELF LIKE THE SURFACE RUNNER THAT I AM--OR WAS
        LEEEEEEROOOY JERRRRRRRRKINS
            EXEC::change("PAGE!!archiveopen", true)
        SPIREBLOOD SPILLS FORTH AND GETS ALL OVER ME, BUT BEYOND IT IS A TUNNEL...
            EXEC::env.stage.current.onStep()
    
    gakvu
        yo! archival tunnel!
            EXEC::env.embassy.vn({gakvu: "fullview"})
        right into our segment! unbelievable isnt it??? absqoulutely incredible

    sourceless
        I REALLY SHOULD HAVE JUST USED MY PICKAXE
        WHATEVER.. REGARDLESS THIS PATH IS OPEN
        OH? I SPY WITH MY LITTLE EYES SOME ENEMIES THAT LIE WITHIN
        YEP LOOKS LIKE ENEMIES ALRIGHT, WE CAN TAKE THEM ON

    tozik
        reminder that the spire is collapsing
            SHOWIF::['PAGE!!barfriend', false]
            EXEC::env.embassy.vn({tozik: "defocus"})
        mmrrgghh spire is collaps... by th way..
            SHOWIF::['PAGE!!barfriend']
            EXEC::env.embassy.vn({tozik: "defocus"})

    akizet
        kill!! kill!!!!!
            EXEC::env.embassy.vn({gakvu: "", tozik: ""})
        rush them now i am sludgethirsty

    RESPONSES::akizet
        go<+>END
            EXEC::specialCam(false);pauseSwapCam(false)
`)

/* Walking down the strange hallway connected to the tunnel, the memory is suddenly paused and interjected by the BSTRD - occupies the main screen during dialogue */
/* It greets the player violently, welcoming them to EVIL MODE */
env.dialogues.d3_bstrdintro_responses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        whats up<+>what
        who are you?<+>who
        move on<+>bye
            FAKEEND::(end chat)
            SHOWIF::'embassy__d3_bstrdintro-what'
`)

env.dialogues["d3_bstrdintro"] = generateDialogueObject(`
start
    sourceless
        HERE WE GO HERE WE GO HERE WE GO!!!
        SEEMS LIKE I

    sys
        ERROR::'halted'
            EXEC::env.embassy.vn({bg: true, bstrdface: 'display'})

    moth
        huh
            SHOWONCE::
    
    bstrd
        SURPRISE MUTHAFACKAASSS!!!!!
            EXEC::changeBgm(env.embassy.music_bstrd, {length: 2000});env.embassy.vn({bg: true, bstrdface: 'display show'})
        this part hase been chosen 2 become... FACK YUU MODE!!!
    
    moth
        ooooh shit
            SHOWONCE::
        god damn it
            SHOWONCE::
        i think we memory the virus
            SHOWONCE::
        ok - don't
            SHOWONCE::
        the corrucyst is too corrucyst to corrucyst it outside of the corrucyst
            SHOWONCE::
        so, this thing the collapse memory
            SHOWONCE::

    bstrd
        :-0 ??
            SHOWONCE::

    moth
        and actually, it looks like it isn't exactly the collapse memory...?
            SHOWONCE::
        idk see up
            SHOWONCE::

    bstrd
        helloe?? any1 HOME? :|
            SHOWONCE::
        THOUGHTS ?????

    RESPOBJ::d3_bstrdintro_responses

who
    self
        WHO YOU?

    bstrd
        :U
        I BSTRD
        here 2 SCREW YOU THA FUK UP!!!
        framing devices r boring......
        so i make a bajingling times bettr
        so enjoy if u wish ?
        >:)
        
    RESPOBJ::d3_bstrdintro_responses
        
what
    self
        WHAT DID YOU DO
    
    bstrd
        UMMM, NOTHING..............???
        LOL :P JK
        i told u its fack yuu mode
        its... XTRA XTRA XTRA XTRA HARDERER!!!

____SHOWIF::['PAGE!!checkedguns']
    self
        WE WILL SEE ABOUT THAT

    bstrd
        '_'
        wht do u mean by that
        :V
____END

    moth
        oh, see...
            SHOWONCE::
        this a virus
            SHOWONCE::
        it's actually framing
            SHOWONCE::
        an mode... probably less important i hope
            SHOWONCE::
        look, skip this part
            SHOWONCE::
        totally you
            SHOWONCE::
        
    RESPOBJ::d3_bstrdintro_responses

bye
    bstrd
        :V
        NO 'THANK U SO MUCH PRAISE DA LORD'??
        W/E
        FACK U TOO BIACH SEE U SOON >:p

    sys
        ATTENTION::'resumed'
            EXEC::revertBgm();env.embassy.vn({bg: false, bstrdface: ''})

    sourceless
        TLL BE THE EASIEST FIGHT EVER
        NO DISABLER REQUIRED
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'

    RESPONSES::akizet
        FIGHT<+>END
            FAKEEND::(begin combat)
            SHOWIF::['gameplay_off', false]
            EXEC::env.combat.dynamicCombat();env.embassy.vn({bg: false, bstrdface: ''})
        goomba stomp skip<+>END
            SHOWIF::['gameplay_off', true]
            FAKEEND::(bypass combat)
            EXEC::env.combat.dynamicCombat({dry: true});cutscene(true);setTimeout(()=>{cutscene(false);env.combat.dynamicCallback(env.rpg.enemyTeam)}, 1010);env.embassy.vn({bg: false, bstrdface: ''})
`)

env.dialogues["d3_bstrdnointro"] = generateDialogueObject(`
start
    sourceless
        WE FACE SOME "TOUGH" FOES
        WE WILL TRIUMPH
        NO DISABLER REQUIRED
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'

    RESPONSES::akizet
        FIGHT<+>END
            FAKEEND::(begin combat)
            SHOWIF::['gameplay_off', false]
            EXEC::env.combat.dynamicCombat();env.embassy.vn({bg: false, bstrdface: ''})
        who<+>END
            SHOWIF::['gameplay_off', true]
            FAKEEND::(bypass combat)
            EXEC::env.combat.dynamicCombat({dry: true});cutscene(true);setTimeout(()=>{cutscene(false);env.combat.dynamicCallback(env.rpg.enemyTeam)}, 1010);env.embassy.vn({bg: false, bstrdface: ''})
`)

/* 
    in the intro tunnel, there's an archival golem that goes forth to attack you - killing it is easy since it takes time to attack
    the team marvels at how tough it is, but also how ineffective it is
*/
env.dialogues["d3_archiveintro"] = generateDialogueObject(`
start
    sourceless
        WEAK, WHAT AN EASY SET OF OPPONENTS
        TEXEC::env.combat.dynamicReward()
        ...
        MINI SHIELDS?? DAMN ALRIGHT!!!
        STILL WONT NEED IT THOUGH

    gakvu
        lamo besties it was soooo clumsy

____SHOWIF::['PAGE!!barfriend', false]
    tozik
        uhhuh maybe because it was alone
        wait hold on
    
    sourceless
        TOZIK REALIZES WE HAVE NO ITEMS FOR COMBAT
            SHOWIF::'EXEC::page.party.inventory.filter(i => i[0].slug != \`sfer_cube\`).length == 0'
        I ALSO REALIZED THIS BUT WHEN HAD ITEMS EVER BEEN USEFUL
            SHOWIF::'EXEC::page.party.inventory.filter(i => i[0].slug != \`sfer_cube\`).length == 0'

        HE REPEATS THE MATERIALS WE HAD ALREADY GATHERED
            SHOWIF::'EXEC::page.party.inventory.filter(i => i[0].slug != \`sfer_cube\`).length'
        'RUKAS,
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.kavruka)'
        AIM ASSISTS,
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.aima_cyst)'
        BAND-AID®S...
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.restorative)'

    tozik
        we should use these
            SHOWIF::'EXEC::page.party.inventory.filter(i => i[0].slug != \`sfer_cube\`).length'
        we need to be real careful. reaaaal careful
            SHOWIF::'EXEC::page.party.inventory.filter(i => i[0].slug != \`sfer_cube\`).length == 0'

____SHOWIF::['PAGE!!barfriend']
    tozik
        ..maby cause i-hic. it was alon...
        ...wait

    sourceless
        TOZIK LOOKS OVER OUR ITEMS AND SLINK, DISAPPOINTMENT VISIBLE IN HIS RECEPTORS
            SHOWIF::'EXEC::page.party.inventory.filter(i => i[0].slug != \`sfer_cube\`).length == 0'
        TOZIK LOOKS OVER OUR ITEMS AND GAZE BACK TOWARDS US
            SHOWIF::'EXEC::page.party.inventory.filter(i => i[0].slug != \`sfer_cube\`).length'

    tozik
        maby weshould.. use these...
            SHOWIF::'EXEC::page.party.inventory.filter(i => i[0].slug != \`sfer_cube\`).length'
        we neeed to be ver-hic. very carfuh..
            SHOWIF::'EXEC::page.party.inventory.filter(i => i[0].slug != \`sfer_cube\`).length == 0'
____END

    RESPONSES::akizet
        ok<+>END
`)

/* The central door that's right in front of you when you enter the main hallway is locked,
    (with big stupid bstrd padlock)
   and attempting to open it reveals that BSTRD is holding it shut - it tells the characters they have to get some stuff first
   they need a crimson corrucyst from the archival core, (bright weaponry usage cyst it's marked)
   and a black box from the delivery room (assault rifle in human container)
   then it'll open up and show them the cool stuff inside
*/
env.dialogues["d3_archivedoor"] = generateDialogueObject(`
start
    sourceless
        DAMN
            EXEC::specialCam('bstrdoor');pauseSwapCam(true)
        THIS DOOR GOT THE CHAINS

    akizet
        my god.. this door is dripped out
    
    sourceless
        GAKVU NODS, AGREEING AS TOZIK STAYS EVER STILL LIKE AN IMAGE

    bstrd
        >>>>;}}}}}
            EXEC::specialCam('bstrdface')
        yeeees i got DA FUKIN CHAINZ
    
    moth
        oh my god it memory
            SHOWONCE::

    sourceless
        HOLY FUCKING SHIT
        IT CAN TALK

    gakvu
        well hello there bestie mind letting us in????
            EXEC::env.embassy.vn({gakvu: "defocus"})

    akizet
        god i love your drip can i have it

    bstrd
        oh heell nah soz :P
        but YUH i let u beetches in
        gotta do me a BIG AS FUK favor for me first
        go get my cool ASS FUK ORB thingy from tha left
        n get me the scary black box from tha right
        theres some C00L SICK AS SHEITE in here... 
        u wont wanna miss it!!
        :-)
____SHOWIF::['PAGE!!checkedguns']
    sourceless
        IF THAT IS THE CASE THEN I MUST GET IN
        EQUIPPING MY SCAR-L I DIRECT IT TOWARDS THE DOOR

    akizet
        let us in

    bstrd
        :V
        go ahead bitc see what happens

    sourceless
        OH? I FEEL THIS IS SOME SORT OF SET UP
        BUT I WILL OBLIGE AND SHOOT ANYWAYS
        A SHOT RINGS IN THE CORRIDOR, THE BULLET HITTING THE CHAINS
            EXEC::play('fortniteShot')
        NO EFFECT, DAMN
    
    bstrd
        :P
        do favor first!!
        cool as orb thingy from tha FUKin left
        n scary black box from tha FUKin right
        :-)
____END

    sourceless
        IS THAT SO? THEN SO BE IT
        IT WILL BE EASY AS CAKE
            SHOWIF::['PAGE!!checkedguns']
    
    gakvu
        hmm, this aint no groundsmind i know..
    
    tozik
        who the fuck are you
            EXEC::env.embassy.vn({tozik: "defocus"})
            SHOWIF::['PAGE!!barfriend', false]
        mrr.. wh... w-hic.. who yooou..
            EXEC::env.embassy.vn({tozik: "defocus"})
            SHOWIF::['PAGE!!barfriend']

    bstrd
        :|
        u can call me ur friend or smth
        go get tha shet ok? bye
    
    sourceless
        CHALLENGE ACCEPTED
            EXEC::specialCam('bstrdoor')
        WE WILL TRIUMPH

    RESPONSES::akizet
        proceed<+>END
            EXEC::change("PAGE!!triedarchivedoor", true);specialCam(false);env.embassy.vn({gakvu: "", tozik: ""});pauseSwapCam(false)
`)

env.dialogues["d3_archivedoorlocked"] = generateDialogueObject(`
start
    sourceless
        KNOCK KNOCK
        STILL NEED THAT BLACK BOX AND ORB I GUESS

    RESPONSES::akizet
        proceed<+>END
`)

env.dialogues["d3_archivecore"] = generateDialogueObject(`
start
____SHOWIF::[["PAGE!!triedarchivedoor", true]]
    sourceless
        THERE IT IS
    
    gakvu
        here it is besties!!
        the cool orb thingy
____END

        oh hey besties i see something back there!!
            SHOWIF::[["PAGE!!triedarchivedoor", false]]

    sourceless
        WHAT AN INTERESTING DISPLAY
            EXEC::specialCam('bstrdcyst1');pauseSwapCam(true)
        NEVERTHELESS WE NEED THIS, I GRAB IT WITH MY CLAWS
            EXEC::addItem(env.ITEM_LIST.cool_orb_thingy)
        HMMM WONDER IF THERE IS A VIRUS IN THIS CYST, I APPROACH TOZIK
            EXEC::env.embassy.vn({tozik: "fullview"});env.stage.current.hidePillarCyst();
        ONLY AS A LITTLE TEST, I BASH THE CYST AGAINST HIS RECEPTORS
            EXEC::play('crit', 0.8, 1)
        IT DID NOT PART, FUCK. SHIT. HE IS REELING IN BOTH SURPRISE AND PAIN
            SHOWIF::['PAGE!!barfriend', false]
        IT DID NOT PART. HE REMAINS STILL FOR ABOUT 5 SECONDS BEFORE A VOICE RINGS OUT
            SHOWIF::['PAGE!!barfriend']

____SHOWIF::['PAGE!!barfriend', false]
    tozik
        owwwwwww!!
        akizet what the fuck why

    sourceless
        LMAO HE ALLOWS HIMSELF TRUE PAIN THAT EXPLAINS THE REACTION

____SHOWIF::['PAGE!!barfriend']
    tozik
        .....ghrhrrraaaaaaaaaaaaaah!!
            EXEC::env.embassy.vn({tozik: "display show climb"})
    
    sourceless
        SHIT FUCK OOPS LMAO THERE GOES
____END

    gakvu
        hahahah!! let me see..
            EXEC::env.embassy.vn({gakvu: "defocus"})

    sourceless
        SHE SNATCHES IT RIGHT OUT OF MY CLAWS AND INSPECTS IT
            EXEC::env.embassy.vn({gakvu: "fullview"})

    gakvu
        hmm.. receptor-locked
        but!! besties peep this

    sourceless
        IT READS, 'ON THE USE OF BRIGHT WEAPONRY'
        PFFFT AS IF WE NEEDED TO KNOW THAT
            SHOWIF::['PAGE!!checkedguns']

____SHOWIF::[["PAGE!!triedarchivedoor", false]]
    gakvu
        hmm i wonder if i could use this

    akizet
        unfortunately receptor locked
        but i guess it is important to the goal
        we will triumph

    RESPONSES::akizet
        lets do this<+>END
            EXEC::specialCam('');env.embassy.vn({gakvu: "", tozik: ""});pauseSwapCam(false)

____SHOWIF::[["PAGE!!triedarchivedoor", true]]
    gakvu
        kinda odd that it wants this..
        does it have a gun?

    akizet
        prob
        regardless we have this now sooooo lets goooo

    akizet
        get the 'black box'
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.scary_black_box) == 0'
        we will triumph
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.scary_black_box) == 1'

    tozik
        <em>scary</em> black box, get it right
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.scary_black_box) == 0 && check(\`PAGE!!barfriend\`, false)'
        ...
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.scary_black_box) == 0 && check(\`PAGE!!barfriend\`, true)'

    RESPONSES::akizet
        shut up nerd<+>END
            SHOWIF::['PAGE!!barfriend', false]
            EXEC::specialCam('');env.embassy.vn({gakvu: "", tozik: ""});pauseSwapCam(false)

    RESPONSES::akizet
        les goo<+>END
            SHOWIF::['PAGE!!barfriend']
            EXEC::specialCam('');env.embassy.vn({gakvu: "", tozik: ""});pauseSwapCam(false)
____END
`)

env.dialogues["d3_archivedelivery"] = generateDialogueObject(`
start
____SHOWIF::['PAGE!!checkedguns', false]
    sourceless
        HOLY FUCK
        WHY ARE THERE A HALF-DOZEN CONTAINERS IN HERE
        FUCKING SHIT THERE ARE TOO MANY TO EVEN CONSIDER A DISABLER
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'
        I MEAN AS IF I WOULD EVEN USE A DISABLER
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.disabler)'
        SHIT THEY ARE UPON US
            EXEC::change('PAGE!!archiveambush', true)
____END

____SHOWIF::['PAGE!!checkedguns']
    sourceless
        HAH.. AHAHAHA... AAAAHAHAHAHAHAHA!!!
        HALF A DOZEN CONTAINERS? NOT A PROBLEM FOR ME
        I WHIP OUT THE SCAR-L, ITS LOCKED AND LOADED
            EXEC::change('PAGE!!archiveambush', true)
        WE WILL TRIUMPH
____END
    
    RESPONSES::akizet
        STRIKE FIRST<+>END
            EXEC::env.embassy.startArchivalAmbush(); change('COMBAT!!ambushUsedGun', false)
            SHOWIF::['gameplay_off', false]
            FAKEEND::(initiate combat)
        sludges them with my mind<+>CHANGE::d3_archivedeliveryclear
            SHOWIF::['gameplay_off', true]
            FAKEEND::(skip combat)
`)

env.dialogues["d3_archivedeliveryclear"] = generateDialogueObject(`
start
    sys
        ATTENTION::'noobie mode activated';'turn it off to prove yourself'
            SHOWIF::'gameplay_off'

    sourceless
        THE LAST OF THEM COLLAPSES INTO A PILE OF SLUDGE
            EXEC::env.stage.current.onStep()

____SHOWIF::'EXEC::(env.embassy.checkUsedKavrukas(false) && check(\`COMBAT!!ambushUsedGun\`, false))'
        BOTH GAKVU AND TOZIK COLLAPSE AFTER THE BATTLE
        SUCH WEAKLINGS

____SHOWIF::'EXEC::(env.embassy.checkUsedKavrukas(true) && check(\`COMBAT!!ambushUsedGun\`, false))'
        WELL THAT WAS RATHER QUICK
        THOSE IDIOTS DIDNT KNOW WHAT HIT EM

    akizet
        that could have been worse

    tozik
        indeed, it was a real good idea to have items on hand dontcha think
            EXEC::env.embassy.vn({tozik: "defocus"})
            SHOWIF::['PAGE!!barfriend', false]
        y.. yeah... hic
            EXEC::env.embassy.vn({tozik: "defocus"})
            SHOWIF::['PAGE!!barfriend']

____SHOWIF::'EXEC::check(\`COMBAT!!ambushUsedGun\`, true)'
    akizet
        AHAHAHAHAHA!!!! THE GUN WORKED FANTASTICALLY
        COMBINED WITH THE KAVRUKAS.. TRULY A COMBO OF ALL TIME
            SHOWIF::'EXEC::env.embassy.checkUsedKavrukas(true)'

    akizet
        I LOVE GUNS RAAAAAAAAAH!!!
            SHOWIF::'EXEC::env.embassy.checkUsedKavrukas(false)'
        that. was. AWESOME!!!!!!
            SHOWIF::'EXEC::env.embassy.checkUsedKavrukas(true)'

    tozik
        holy fucking shit akizet you ball
            EXEC::env.embassy.vn({tozik: "defocus"})
            SHOWIF::'EXEC::(env.embassy.checkUsedKavrukas(true) && check(\`PAGE!!barfriend\`))'
        ..muh.. gah... DA-hic. dAAMN...
            EXEC::env.embassy.vn({tozik: "defocus"})
            SHOWIF::'EXEC::(env.embassy.checkUsedKavrukas(true) && !check(\`PAGE!!barfriend\`))'
____END

    sourceless
        LOOKING THROUGH THE SLOP,
            EXEC::step();env.embassy.vn({tozik: ""})
        TEXEC::env.combat.dynamicReward()
        HMMM, I WONDER WHAT ELSE IS IN HERE
            WAIT::1000

____SHOWIF::[["PAGE!!triedarchivedoor"]]
    sourceless
        OH HEY ITS THE BLACK BOX
        WAIT... IS THIS...

____SHOWIF::[["PAGE!!triedarchivedoor", false]]
    sourceless
        HUH WHATS THIS
____END

        THIS IS A GUN CRATE THIS IS LITERALLY A GUN CRATE
        OHOHO!!!!
            EXEC::specialCam('ambushbox');pauseSwapCam(true)
        I CANNOT LET THAT DRIPPED OUT GUY OR GAL TAKE THIS THING
            SHOWIF::[["PAGE!!triedarchivedoor"]]
        PUTTING MY CLAWS ON THE LATCH I TRY TO PULL IT OPEN

    akizet
        hrrrg!!!!
        damn it is sealed tight
            SHOWIF::[["PAGE!!triedarchivedoor", false]]
        fuck!! its sealed tight!!!!
            SHOWIF::[["PAGE!!triedarchivedoor"]]

    
    gakvu
        really bestie?? let me try...
            EXEC::env.embassy.vn({gakvu: "defocus"})

    sourceless
        GAKVU TRIES THE LATCHES HERSELF
        BUT ITS REALLY SEALED SHUT

____SHOWIF::['PAGE!!checkedguns']
        LUCKILY I KNOW HOW TO UNLOCK IT

    akizet
        bestie stand back
        just watch

    sourceless
        I PULL OUT MY SCAR-L,
        RESTING ITS TIP UPON THE CRATES LOCK
        A SHOT RINGS AS THE LOCK IS SHOT THROUGH
            EXEC::play('fortniteShot', 1, 1)
        AND ANOTHER ON THE OTHER LOCK,
            EXEC::play('fortniteShot', 1, 1)
        ALLOWING THE CRATE TO FULLY OPEN
            EXEC::addItem(env.ITEM_LIST.scary_black_box)
        THE CRATE CONTAINED AN AR-15 WITH A RED-ISH HUE,
        AND A FEW SPARE MAGAZINES

    akizet
        yyyyoo!!! another gun
        gakvu, bestie you gotta have this one
    
    gakvu
        what!!
        but.. i dont even know how to use guns...
        and the cyst we found was locked!!
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.cool_orb_thingy)'

    akizet
        do not worry i got you

    sourceless
        I TRANSFER 1200+ WINKS WORTH OF FORTNITE GAMEPLAY THROUGH THE TIMESTOPPER
        AND FOR A FEW BLINKS GAKVU STOOD STILL, EXPRESSIONLESS
        BEFORE SNAPPING BACK TO REALITY WITH NEWFOUND HORROR

    gakvu
        my god.. bestie...
        i did not know you played that much fortnite...
        really puts to shame how much corru crush i played on company time
        but now,
        i can use this!!

    sourceless
        GAKVU PICKS UP THE AR-15 WITH CONFIDENCE
        GRABBING A MAGAZINE, LOADING IT THE SAME AS I DO
            EXEC::change('PAGE!!unlocked_black_box', true); env.COMBAT_ACTORS.gakvu.actions[0] = 'gakvu_mag_dump'; readoutAdd({message: "scramble permanently replaced with mag dump", name:"sys", show: true, forceMini: true});
        AND FINALLY SLIDES THE BOLT

____SHOWIF::['PAGE!!checkedguns', false]
    akizet
        see i told you

    gakvu
        perhaps there is a way to open it we dont know of

    sourceless
        MAYBE, BUT FOR NOW WE WILL TAKE IT WITH
            EXEC::addItem(env.ITEM_LIST.scary_black_box);


____SHOWIF::[["PAGE!!triedarchivedoor"]]
    akizet
        challenge complete let us return to the door
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.cool_orb_thingy)'
        still need to find this cool orb though
            SHOWIF::'EXEC::checkItem(env.ITEM_LIST.cool_orb_thingy) == false'
        lets fuckin do it
            EXEC::specialCam('');env.stage.current.onStep()

____SHOWIF::[["PAGE!!triedarchivedoor", false]]
    akizet
        eh gun crate might come in handy
            SHOWIF::['PAGE!!unlocked_black_box']
        we must guard this thing at all cost no matter if it is too heavy to carry with
            SHOWIF::['PAGE!!unlocked_black_box', false]
        let us keep exploring
____END

    RESPONSES::akizet
        go<+>END
            EXEC::env.embassy.vn({gakvu: ""});specialCam('');env.stage.current.onStep();pauseSwapCam(false);
`)

/* 
    The team returns to the BSTRD door and they can enter, although moth recommends you go and save
*/
env.dialogues["d3_archivedoorunlock"] = generateDialogueObject(`
start
    sourceless
        HERE WE GO, COOL ORB AND GUN CRATE
            EXEC::specialCam('bstrdoor');pauseSwapCam(true)
        RIGHT BY THE DOOR
    
    bstrd
        WOW!! :O
            EXEC::specialCam('bstrdface')
        u guys did it... so fukin proud...
        amazeng

    sourceless
        SUDDENLY A CANE PULLS BOTH THE COOL ORB AND CRATE INTO THE DOOR
        SHIT!!!! THE GUN IS STILL IN THE CRATE
            SHOWIF::['PAGE!!unlocked_black_box', false]
        OH WELL... IF ONLY THERE WAS A WAY TO OPEN IT
            SHOWIF::['PAGE!!unlocked_black_box', false]
        AAAND THERE GOES THE CRATE, GOOD THING WE ALREADY SNAGGED WHAT WAS INSIDE
            SHOWIF::['PAGE!!unlocked_black_box']
        BUT NOW THE DOOR IS OPEN
            EXEC::change("PAGE!!bstrdlock", true);step()

    bstrd
        hey why dont u beetchez come in i got a surprise 4 u
        :-)
    
    sourceless
        TIME TO GET OUR REWARD!!
        I HOPE IT IS ICE CREAM OR SOMETHING COOL LIKE THAT
        
    sys
        ATTENTION::"incoherence";"caution"

    moth
        i really my business, but...
            SHOWONCE::
        you probably your iteration
            SHOWONCE::
        bastard is up
            SHOWONCE::
    
    RESPONSES::akizet
        les go!!!!<+>END
            EXEC::specialCam('');removeItem(env.ITEM_LIST.scary_black_box);removeItem(env.ITEM_LIST.cool_orb_thingy);pauseSwapCam(false)
`)

/* 
    Visiting the door while already having the materials has a slightly different dialogue
*/
env.dialogues["d3_archivedoorearly"] = generateDialogueObject(`
start
    sourceless
        DAMN
            EXEC::specialCam('bstrdoor');pauseSwapCam(true)
        THIS DOOR GOT THE CHAINS

    akizet
        my god.. this door is dripped out
    
    sourceless
        GAKVU NODS, AGREEING AS TOZIK STAYS EVER STILL LIKE A PNG

    bstrd
        >>>>;}}}}}
            EXEC::specialCam('bstrdface')
        yeeees i got DA FUKIN CHAINZ
    
    moth
        oh my god it memory
            SHOWONCE::

    sourceless
        HOLY FUCKING SHIT
        IT CAN TALK

    gakvu
        well hello there bestie mind letting us in????
            EXEC::env.embassy.vn({gakvu: "defocus"})

    akizet
        god i love your drip can i have it

    bstrd
        oh heell nah soz :P
        but YUH i let u beetches in
        gotta do me a BIG AS FUK favor for me first
        go get my cool ASS FUK ORB thingy from tha left
        n get me the scary black box from tha right
        theres some C00L SICK AS SHEITE in here... 
        u wont wanna miss it!!
        :-)

    sourceless
        IS THAT SO? THEN SO..
        WAIT WE ALREADY HAVE THESE
        HAHAH!! I KNEW THESE WOULD COME IN USE LATER
        THE LOCKED CYST PROVES TO BE OF NO VALUE.. HOWEVER
        THE GUN CRATE.. THERE IS STILL THE GUN WITHIN
            SHOWIF::['PAGE!!unlocked_black_box', false]
        THE EMPTY GUN CRATE.. HOPEFULLY IT DOES NOT TAKE NOTICE WE SNAGGED WHAT WAS INSIDE
            SHOWIF::['PAGE!!unlocked_black_box']

    bstrd
        :o
        u  already got em?
        HOLY SHIEEET!!!!!
        WOWEI
        ok come on in btches
            EXEC::change("PAGE!!bstrdlock", true)

    sourceless
        SUDDENLY CANES FLING OUT FROM THE DOOR
        FUCK!!!! NOT THE GUN!!
            SHOWIF::['PAGE!!unlocked_black_box', false]
        IT IS TOO LATE.. THE CRATE HAD BEEN PULLED THROUGH THE DOOR
            SHOWIF::['PAGE!!unlocked_black_box', false]
        OH IT TOOK THE BOX
            SHOWIF::['PAGE!!unlocked_black_box']
        WELL THERE GOES I GUESS
            SHOWIF::['PAGE!!unlocked_black_box']
        AND THE PATH AHEAD OPENS UP
            EXEC::step()

    bstrd
        hey come on in i got a surprise 4 u muthafackas
        :-)
    
    sourceless
        THIS IS DEFINITELY A SETUP OF SOME KIND
        I MAY BE STUPID... BUT... AH WHATEVER--TOZIK AND GAKVU FEELS THE SAME
        
    sys
        ATTENTION::"incoherence";"caution"

    moth
        i know my business, but...
            SHOWONCE::
        you your iteration
            SHOWONCE::
        bastard is up
            SHOWONCE::
    
    RESPONSES::akizet
        uh alright<+>END
            EXEC::specialCam(false);removeItem(env.ITEM_LIST.scary_black_box);removeItem(env.ITEM_LIST.cool_orb_thingy);pauseSwapCam(false); env.embassy.vn({gakvu: ""})
`)

/* there's a miniboss before the real boss - an archival shelf!! */
env.dialogues["d3_archivemini"] = generateDialogueObject(`
start
    sourceless
        WHAT THE FUCK IS THAT
        WHAT THE ACTUAL FUCK IS THAT
        GET THIS <span definition="INHERITED CONTEXT::'killer';'kill murder people infection';'terrorist'">SECRI</span> INFESTED ASS FUCKING THING AWAY FROM ME

____SHOWIF::['PAGE!!checkedguns', false]
        I BACK UP BUT THE DOOR IS LOCKED
        GOD FUCKING DAMN IT
        THIS WAS A SETUP
        AAAAAAAH!!!! IT IS UPON US
____END

____SHOWIF::['PAGE!!checkedguns']
        QUICKLY I EQUIP THE SCAR-L,
        SLIDING THE BOLT
        GAKVU ALSO READYS HER AR-15
            SHOWIF::['PAGE!!unlocked_black_box']
        SNAPPING IN A MAGAZINE
            SHOWIF::['PAGE!!unlocked_black_box']
        WE WILL TRIUMPH
____END
    
    RESPONSES::akizet
        FIIIIIGHT<+>END
            EXEC::env.embassy.startArchivalMiniboss();
            SHOWIF::['gameplay_off', false]
            FAKEEND::(initiate combat)
        KILLS WITH MIND QUICKLY<+>CHANGE::d3_archiveminiclear
            SHOWIF::['gameplay_off', true]
            FAKEEND::(skip combat)
`)

env.dialogues["d3_archiveminiclear"] = generateDialogueObject(`
start
____SHOWIF::'gameplay_off'
    sys
        ATTENTION::"noobie mode enabled";'turn it off to prove yourself'
____END

    sourceless
        THE THING FALLS AND SLUDGES, ITS REMAINS DRAINING THROUGH THE HOLES IN THE FLOOR
            EXEC::env.stage.current.onStep()
        WE DID IT!! WE DID IT!!!!
            EXEC::changeBgm(env.embassy.music_collapse, {length: 4000});
        DAMN BASTARD WONT GET AWAY WITH THIS

    gakvu
        ahahaha!! we did it besties!!!!
            EXEC::env.embassy.vn({bg: true, gakvu: "fullview"});

    sourceless
        AND TO THINK IT WAS OUR FRIEND...
        MY RECEPTORS HAVE CURLED INTO TIGHT SPIRALS,
        AUGH!!!! THE BETRAYAL
        BUT NOW I WANT REVENGE, I AM HUNGRY
    
    akizet
        we must proceed.
        that bastard was not our friends.. we must pursue them
    
    sourceless
        TOZIK AND GAKVU LOOK AHEAD AT THE DOOR,
            EXEC::env.embassy.vn({bg: false, gakvu: "defocus", tozik: "defocus"})
        SHIFTING--THEY MUST BE RELUCTANT

____SHOWIF::['PAGE!!barfriend', false]
    tozik
        god akizet you are so sludgethirsty,
        listen i know you really want to murder them but
        we really need to be fixing up the elevator yknow

____SHOWIF::['PAGE!!barfriend']
    tozik
        b-but.. eleva-hic. vator.. must fix
        g-ic. go back
____END

    gakvu
        no way! we gone so far..
        i got your back besties

    sourceless
        TOZIK HOLDS HIS CLAWS UP TO HIS FACE
            SHOWIF::['PAGE!!barfriend', false]
        TOZIK SWAYS, HIS EYES FIXED ON THE GROUND
            SHOWIF::['PAGE!!barfriend']
        WE MUST PURSUE AND TAKE DOWN OUR ATTACKER
            EXEC::env.embassy.vn({gakvu: "", tozik: ""})
        GAKVU RELOADS HER AR-15 IN PREPARATION FOR WHATS TO COME
            SHOWIF::['PAGE!!unlocked_black_box']
        I DO THE SAME, LET US END THIS
            SHOWIF::['PAGE!!unlocked_black_box']
    
    RESPONSES::akizet
        proceed.<+>END
`)

env.dialogues["d3_archiveboss"] = generateDialogueObject(`
start
    sourceless
        I KICK DOWN THE DOOR
            EXEC::doorKick.play()
        AND IT SWINGS RIGHT OFF ITS HINGES

    gakvu
        look!! bestie over there!!
            EXEC::sfxmap.stop();tf2zoom.play();specialCam("bstrdboss");pauseSwapCam(true)

    bstrd
        o dam
        errr did you really have to do that
        r u ok
        o_o
            
    sourceless
        THERE!! UP AHEAD,
        AN ARCHIVAL GOLEM WITH THE BASTARDS SIGIL
        FUCK... IT HAS A SASH OF KAVRUKAS
        THE COOL ORB... IT IS NOWHERE TO BE SEEN
____SHOWIF::['PAGE!!unlocked_black_box', false]
        WAIT--!!
        AND THE GUN CRATE.. IT IS OPEN, SHIT!!!!
        I HAD REALIZED THIS FAR AHEAD OF THE OTHERS,
        BUT WE HAD JUST TAUGHT A GOLEM HOW TO USE GUNS
____SHOWIF::['PAGE!!unlocked_black_box']
        OH WHATS THAT THERE? IS THAT THE BLACK BOX?
        NO WAY IT HAS NOT NOTICED THE CONTENTS ARE MISSING NOW
        AHAHAHHA!!
        I SUPRESS MY LAUGHTER THROUGH INTENSE DIRECT CONRTOL
____END

    bstrd
        but thx for getting the shet
        
    sourceless
____SHOWIF::['PAGE!!unlocked_black_box', false]
        THE GOLEM REACHES IN THE CRATE AND PULLS OUT AN AR-15
            EXEC::specialCam("bstrdbox")
        IT CLICKS AND CLACKS ALL THE SAME... I KNOW THAT SOUND
            EXEC::content.querySelector('.bstrdboss').classList.add('gun');play('ar15Click', 1, 1)
____SHOWIF::['PAGE!!unlocked_black_box']
        THE GOLEM REACHES IN THE CRATE AND PULLS OUT NOTHING
            EXEC::specialCam("bstrdbox")

    bstrd
        WHAT THE FUK
        IT'S EMPTEY???

    sourceless
        THE GOLEM LOOKS AROUND AND SPOTS GAKVUS SHINY NEW GUN,
        SHE ONLY WINKS IN RETURN

    gakvu
        sorry!
        finders keepers

    bstrd
        >;{
        FACK you BTCHES
        YOU KNOW WHAT... LET ME GO SET UP MY SOUNDBOARD
        hold on

    bstrd quiet
        FUCK YOU!
            EXEC::jerma.play('fyou', 1, 1)
        DORK!
            EXEC::jerma.play('dork', 1, 1)
        EAT SHIT!
            EXEC::jerma.play('eats', 1, 1)
        LOSER!
            EXEC::jerma.play('loser', 1, 1)
        :p
    
    sourceless
        A VOICE PLAYS IN MY HEAD
            EXEC::setTimeout(() => {jerma.play()}, 500);
            WAIT::3000
        WHAT THE FUCK WAS THAT
    
    bstrd
        ok READY??
        GO GRENADE'S!!!
            EXEC::content.querySelector('.bstrdboss').classList.add('kavruka')
____END

    sourceless
        UH OH. OOOH SHIT THINGS ARE BEGINNING TO GET REAL
        I NOTICE TOZIK TRYING TO BACK AWAY BUT THE ENTRY WAY IS BLOCKED WITH THOSE SAME CHAINS
            SHOWIF::['PAGE!!barfriend', false]
        TOZIK DRUNKENLY STUMBLES BACKWARDS TOWARDS THE DOORWAY BUT IT IS BLOCKED WITH THOSE SAME CHAINS
            SHOWIF::['PAGE!!barfriend']

____SHOWIF::['PAGE!!unlocked_black_box', false]
    bstrd
        u guys just taught a golem how to use gun's
        BAD ASS ...
        SHOOT THEM BTCHES!!! GET THOSE MUTHAFACKASSS!!
____END
        NUKE EM!!! BOMB THOSE BTCHES TO HELL!!
            SHOWIF::['PAGE!!unlocked_black_box']
        >:}
    
    sourceless
        OUR CHANCE TO STRIKE, I STOP TIME BEFORE IT COULD RAISE THE GUN
            SHOWIF::['PAGE!!unlocked_black_box', false]
        OUR CHANCE TO STRIKE, I STOP TIME BEFORE IT COULD DEPLOY THE KAVRUKA
            SHOWIF::['PAGE!!unlocked_black_box']
        IT MAY HAVE BEEN ABLE TO AMBUSH US BACK THERE BUT WE JUMP 'EM THIS TIME
        WE WILL TRIUMPH
            EXEC::bstrdEntity()

    RESPONSES::sys
        weakens opponent with my mind<+>END
            EXEC::env.embassy.startArchivalBoss(true);specialCam(false);pauseSwapCam(false)
            FAKEEND::reduced intensity alternative
            SHOWIF::[['low_intensity', true], ['gameplay_off', false], ['PAGE!!unlocked_black_box', false]]
        weakens opponent with my mind<+>END
            EXEC::env.embassy.startArchivalBossGunless(true);specialCam(false);pauseSwapCam(false)
            FAKEEND::reduced intensity alternative
            SHOWIF::[['low_intensity', true], ['gameplay_off', false], ['PAGE!!unlocked_black_box', true]]

    RESPONSES::akizet
        FIGHT<+>END
            EXEC::env.embassy.startArchivalBoss();specialCam(false);pauseSwapCam(false)
            FAKEEND::(initiate combat) 
            SHOWIF::[['gameplay_off', false], ['PAGE!!unlocked_black_box', false]]
        FIGHT<+>END
            EXEC::env.embassy.startArchivalBossGunless();specialCam(false);pauseSwapCam(false)
            FAKEEND::(initiate combat) 
            SHOWIF::[['gameplay_off', false], ['PAGE!!unlocked_black_box', true]]
        the thing proceeds to fall apart<+>CHANGE::d3_archivebossend
            SHOWIF::['gameplay_off', true]
            FAKEEND::(skip combat)
`)

env.dialogues["d3_archivebosstut"] = generateDialogueObject(`
start
    sys
        WARNING::'abnormal detected'
            EXEC::env.bulletHell.paused = true;ratween(env.bgm, 0.5);
        WARNING::'BSTRD';'altering'
            EXEC::env.bulletHell.paused = true
        ANALYSIS::'destroy recollection locust'
        ATTENTION::'proxy';'manually direct incoherence'
        ATTENTION::'neurons adjusted';'direct with navigation'

    sourceless
        DAMN THING PULLS A KAVRUKA
        TOZIK WARNS US,

____SHOWIF::['PAGE!!barfriend', false]
    tozik
        shit
        this room will collapse if that thing throws enough of those
        we need to defuse them as they fly towards us

____SHOWIF::['PAGE!!barfriend']
        ..shhic-shit!!!
        this room.. itll collllaaa-hic.. collapss if.. rruka....
        d-defus... em..!
____END
        
    gakvu
        bestie it has so many!!

____SHOWIF::['PAGE!!barfriend', false]
    tozik
        i know
        but i fortunately have the tool on hand to do it
        i will pass you the defuser when the time comes
____SHOWIF::['PAGE!!barfriend']
        y-yes... but..!
        i.. haa-hic.. thhthe defuuusr....
____END

____SHOWIF::['PAGE!!unlocked_black_box']
    akizet
        nuh uh!! we dont need that right gakvu?

    sourceless
        I EYE GAKVU WITH A CERTAIN GLEE IN MY GAZE
        WE GOT THIS

    gakvu
        uh huh! i getcha bestie!!

    sourceless
        TOGETHER WE BOTH READY OUR GUNS
        WE WILL TRIUMPH
____END

    sys
        ANALYSIS::'context'
        ATTENTION::'optionally';'utilize highlighted to KAVRUKA'
        NOTICE::'triggered by <span definition="'M1'">action</span>'
        NOTICE::'additionally <span definition="'not m1 (Q)';'not m1 2 (E)'">quality and methods</span>'

    RESPONSES::akizet
        go!!<+>END
            EXEC::if(check('PAGE!!unlocked_black_box')) { bh_grenade("tutorial") } else bh_gundown("tutorial");env.bulletHell.paused = false;ratween(env.bgm, 1)
            FAKEEND::(continue) 
`)

env.dialogues["d3_archivebossend"] = generateDialogueObject(`
start
    sourceless
        HA!!!! IT DID NOT EVEN STAND A CHANCE AT ALL
            EXEC::env.stage.current.bossCollapse();env.stage.current.clearBossPals()
        WE WIN WE WIN WE WIN
            EXEC::change('PAGE!!archiveboss', true); env.stages['embassy_archivalcore_sensitive'].entities['<'].class = 'door realdoorbroken left'

____SHOWIF::['gameplay_off']
    sys
        ATTENTION::"noobie mode";'turn it off to prove yourself'

    bstrd
        WHAT THA SHIET
            EXEC::specialCam("bstrdbox");pauseSwapCam(true)
        have u been doing that...
        THA WHOLE FCKIG TIME???
        >:[
        NOT FAIR!
        THIS FACKIGE SUCKS
    
    tozik
        uhhh what
            SHOWIF::['PAGE!!barfriend', false]
        whhhwhat..?
            SHOWIF::['PAGE!!barfriend']

    akizet
        recommendation: get good my g
            SHOWIF::['PAGE!!checkedguns', false]
        listen lil bro if you cannot handle my insane gunplay then you should just log off
            SHOWIF::['PAGE!!checkedguns']
    
    bstrd
        SHUT YOU'RE FUCK UP
        >>:[[[[[[
        AFTER ALL I DID...
        TO GIVE YOU A GOOD TIME...
        ...
        u... get...
        JACK SHIT!!!!

    sourceless
        OH UH
            EXEC::env.stage.current.removeBastardBG();env.stage.current.onStep()
        THERE GOES? WHATEVER BRO
        
    akizet
        ummmm ok
        lets go back to elevatorfriend
            EXEC::change("PAGE!!archivesclear", "skipped")
    
____SHOWIF::['gameplay_off', false]
    bstrd
        DAAAAAAAAAAMN
            EXEC::specialCam("bstrdbox");pauseSwapCam(true)
        wow...
            EXEC::ratween(env.bgm, 0.75)
        ya really did it
        genius use of MY GUN'S, YA MOTHAFUKIN BTCHS
            SHOWIF::['PAGE!!unlocked_black_box']
        >;[
            SHOWIF::['PAGE!!unlocked_black_box']
        i was p sure i was gonna MURDA u btchs there
    
    tozik
        yeah sure
            SHOWIF::['PAGE!!barfriend', false]
        uh.... sshhure..
            SHOWIF::['PAGE!!barfriend']
    
    bstrd
        SHUT THA FUK UP
        listen im aboutta unalive so i gotta tell u this quick
        arr... sht the paine..
        OHH it HURTS BAD!!!
        ;-(
        anywy u can have my chainz now
        has some sht on it and im p sure its important so hang on 2 it
    
    sourceless
        A REWARD??
            EXEC::env.stage.current.showPillar(true)
        YIPPEEE!!! HOW WONDERFUL!
        THE CHAINZ!!!! THE COOL ASS FUKIN CHAINS!! NOW OURS

    gakvu
        bestie.. yknow whats happening?
        maybe we can fix you up if you help us!
        
    akizet
        and perhaps dont mess with us again
    
    bstrd
        :U
    
    sourceless
        LONG PAUSE EH?
        WHAT AN INTROVERT

    bstrd
        no i gotta murda u bchis sry
        but u won this time so gj
        
    sourceless
        AAAAAAND NOW ITS GONE
            EXEC::env.stage.current.removeBastardBG()
        GOLEM FALLS TO THE FLOOR AND SLUDGES ITSELF
            EXEC::env.stage.current.onStep()
        AND NOW THE ROOM IS BACK TO NORMAL
        THE OTHERS STOOD AROUND IN SHOCK BUT I IMMEDIATELY RUSH TOWARDS THE PILLAR
            EXEC::specialCam("bstrdbosspillar")
        
    akizet
        well well well
        lookie at what we gottie here-ie
    
    sourceless
        COOL ASS FUKIN CHAINS BABY
        HELL YEAH
        IT LOOKS LIKE THERE IS A CYST ATTACHED TO IT
        BUT I SIMPLY JUST SNAP IT OFF
            EXEC::env.stage.current.hidePillarCyst();addItem(env.ITEM_LIST.sorry_cyst)
        BEFORE I STOW IT AWAY I INSPECT IT
        HUH.. FASCINATING!!

    akizet
        tozik
        guess what
        weapon schematic

    tozik
        oh goodness where is this going
            SHOWIF::['PAGE!!barfriend', false]
        mmmgurrgrghhh...
            SHOWIF::['PAGE!!barfriend']
            
    
    akizet
        hell!!!! yes!!!!
        uuuuugh but its all scrambled up
        
    sourceless
        I TOOK ONLY A SLIGHT GLANCE AT THE SLUDGE OF OUR AMBUSHER
        IT STILL HELD ITS WEAPON
            SHOWIF::['PAGE!!unlocked_black_box', false]
        I KICK IT ON THE HEAD
    
    akizet
        pathetic little thing, never even stood a chance!!
        lets go back to fixing elevatorfriend
            EXEC::change("PAGE!!archivesclear", true)
____END

    RESPONSES::akizet
        go<+>END
            EXEC::specialCam("");pauseSwapCam(false)
`)

// MOD LOAD

foghorn.play()

thefunny = {
    name: "WARNING: funny ahead",
    status: "loaded"
}

console.clear()
console.log(thefunny)