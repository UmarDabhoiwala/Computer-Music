verb = Reverb('space').bus()


//Temporal Recursion with Water, Can Change query on the Fly  
//Can't figure out how to stop it so uhh just reset after playing it
f = Freesound({ query:'water', max: 1.5 }).connect( verb, .35)
 
tr( function( f, _ ) {
  f.pick( _.num )
  if( _.i++ >= 32 ) {
    _.num = ++_.num % 15
    _.i = 0
  }
 
  f.trigger( 1 )    
 
	f.gain = .1 + sin(time) * .6 //Changing the volume with time 
  
  f.start = Math.sin(time*2)*0.2+0.41 
  f.rate = Math.cos(time*0.8)*0.6+1 
  f.pan = .7 + Math.sin(time) / 3 
 
  return Math.sin(time)*0.05+0.07
}, 'freesound', { f, _:{ i:0, num:0 } })




//Early Human part
Clock.bpm = 60
verb = Reverb('space').bus()

//Soundfonts Simple
piano = Soundfont('Acoustic Grand Piano').connect( verb, .25 )
timpani = Soundfont('Timpani').connect( verb, .1 )

piano.chord.seq( [[0,4,7], [2,5,9], [4,7,11], [0,4,7]], 1 )
piano.gain.seq([0.2, 0.3,0.4, 0.5, 0.4,0.3, 0.2], [1/4, 1/8, 1/8,1/16, 1/8,1/8, 1/4])
piano.stop()

timpani.note.tidal('<[-14 -14*3] [-12 -12*3]>')
timpani.gain.seq([0.1, 0.2, 0.4, 0.2, 0.1], [1/4, 1/8, 1/16, 1/8, 1/4])
timpani.stop()



//Random Soundfont
shakuhachi = Soundfont('Shakuhachi').connect(verb, .25)
taiko = Soundfont('Taiko Drum').connect(verb, .25)
birdTweet = Soundfont('Bird Tweet').connect(verb, .25)
agogo = Soundfont('Agogo').connect(verb, .25)

shakuhachi.chord.seq(Rndi(0,14,4), [1/2, 1, 2].rnd())
shakuhachi.gain = rndf(0.1, 0.5)
shakuhachi.stop()


taiko.chord.seq(Rndi(0,14,4), [1/3, 2/3, 1].rnd())
taiko.gain = rndf(0.1, 0.5)
taiko.stop()


birdTweet.chord.seq(Rndi(0,14,4), [1, 2, 3].rnd())
birdTweet.gain = rndf(0.1, 0.5)
birdTweet.stop()


agogo.chord.seq(Rndi(0,14,4), [1/8, 1/4, 1/2].rnd())
agogo.gain = rndf(0.1, 0.5)
agogo.stop()


//Freesound singular query 

// Query for water sounds
waterSound = Freesound({ 
  query:'water', 
  sort:'rating_desc',    
  max:10,               
  count:5                
})
.fx.add( Delay({ time:1/8, feedback:.25 }) )

// Sequence the Freesound object with slower rates and lesser pan
waterSound.rate.seq( [0.5, 0.25], [1, 2] )
waterSound.trigger.seq( 0.5, 2 )
waterSound.pan = gen( .5 + cycle(.1) * .35 )

// Modulate gain
waterSound.gain = gen( cycle(.05) * .35 + .65 )

// Pick a sample with each trigger 
waterSound.pick.seq( Rndi(0, waterSound.length) )
waterSound.stop()

//Classical Music Part 

verb = Reverb('space').bus()
piano2 = Soundfont('Bright Acoustic Piano',{ bank: 2 }).connect(verb, .50)
piano2.gain = .4

stringEnsemble = Soundfont('String Ensemble 1', { bank:3 }).connect( verb, 1 )
stringEnsemble.gain = .2

cello = Soundfont('Cello',{ bank: 2 }).connect(verb,.5)
cello.gain = .3

percussion = Soundfont('Tremolo Strings').connect(verb, 1);
percussion.gain = .4;

melodySteps = Steps({
  'C4': '..x.....X.....x.....X..',       
  'D4': '...x.......x...........',       
  'E4': '......x.....X.....x....',       
  'F4': '.........x...........x.',       
  'G4': '.....x........x........',       
  'A4': 'x.....................X',       
  'B4': '..................x....',       
  'C5': '....x.............x....',       
  'D5': '.......x.......x.......',       
  'E5': '..........x......x.....',       
  'F5': '.............x......x..',       
  'G5': '.................x.....'    ,
}, piano2);

melodySteps.stop()

stringEnsembleSteps = Steps({
  'A4': '...x......x.........x.',        
  'B4': '.......x..........x...',        
  'C5': 'x....................X',        
  'D5': '....x.........x.......',        
  'E5': '..........x.....x.....',        
  'F5': '..............x.......',        
  'G5': '...............x......'  ,
}, stringEnsemble);

stringEnsembleSteps.stop()

celloMelodySteps = Steps({
  'C2': 'x.............x.......',        
  'D2': '....x..............x..',        
  'E2': '......x...............',        
  'F2': '.........x.......x....',        
  'G2': '............x.........',        
  'A2': '...............x......',        
  'B2': '..................x...'   ,
}, cello);

celloMelodySteps.stop()

percussionMelodySteps = Steps({
  'C4': 'x.................x...',       
  'D4': '....x..........x......',       
  'E4': '........x.............',       
  'F4': '...........x..........',       
  'G4': '...............x......'       ,
}, percussion);

percussionMelodySteps.stop()


//Technological Part 

Clock.bpm = 120

Theory.tuning = 'slendro'
Theory.mode = null

verb =  Reverb( 'space' ).bus()
delay = Delay( '1/3' ).bus().connect( verb, .1 )

syn = Monosynth( 'dark' ).connect( verb, .25 )

arp = gen( (1 - phasor( btof(2) )) * 5 )

// sequence the notes of the arpeggio
syn.note.seq( arp , 1/16 )

// add some rhythmic variations to the arpeggio
arp.p1.seq( [2,3,5], [1/4,1/3] )


syn.stop()


// create a polysynth
perc = PolySynth('cry')

// pan each voice of the polysynth
perc.voices.forEach( (v,i) => v.pan = i * .25 )

arp2 = gen( (1 - beats(3)) * 9 )

perc.note.seq( arp2  , 1/8 )

// variations to the second arpeggio
arp2.p1.seq( [1,2,3], [1/2,1/3,1/4] )
arp2.p3.seq( [9,12,18], [2,1] )


perc.pitch.seq( [0, -1/2, -1/4, 0, 1/4, 1/2], 1/16 )

perc.stop()

bass = Synth('bass.hollow')
    .note.seq( [0,-1,-2,1,-3], [1/8, 1/4, 1/8, 1/8, 1/2])
    .trigger.seq( [1, .7, .5, .6, .8], [1/4, 1/8, 1/4, 1/8, 1/4] )

bass.stop()

// Clave euclid
clave = Clave({ gain:.15 }).connect( verb, .35 )
  .trigger.seq(0.5, e = Euclid (5,16))      

clave.stop()

// Setting up the kick drum
kick = Kick()
    .trigger.seq( [1, .5, .8, .5, 1], [1/4, 1/8, 1/4, 1/8, 1/4] )

kick.stop()

// Setting up the hi-hat
hat = Hat({ decay:.0125 })
    .trigger.seq( [.5, .25, .75, .5], [1/16, 1/8, 1/16, 1/8] )

hat.stop()

// Setting up the snare
snare = Snare()
    .trigger.seq( [0, 1, 0, .8, 0], [1/4, 1/4, 1/4, 1/4, 1/4] )

snare.stop()








