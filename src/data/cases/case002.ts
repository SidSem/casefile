import { CaseData } from '../../types/case';

export const CASE_002: CaseData = {
  id: 'case-002',
  code: 'CASE 002',
  title: 'MIDNIGHT AT BLACKWOOD',
  classification: 'RESTRICTED',
  difficulty: 'Detective',
  location: 'Blackwood Manor, Isle of Skulls, New England Coast',
  incidentDate: 'NOVEMBER 12, 2026 // 02:40 HRS',
  summary: 'During a gale-force nor\'easter cut off all ferry transit to Blackwood Isle, shipping tycoon Lord Alistair Blackwood vanished from his locked study. A broken decanter, arterial blood spatter on a Persian rug, and an open cliffside balcony railing suggest a violent struggle and sea disposal.',
  briefingNotes: [
    'Lord Alistair had summoned his family and legal counsel to execute an amended last will.',
    'Study door was bolted with an antique brass latch from the inside; balcony door was open to the storm.',
    'Blood pool on Persian rug was still wet when discovered by the butler at 02:30.',
    'No body has washed ashore; coastal cliffs plunge 80 feet directly into sea caves.',
    'All maritime vessels were chained to the private harbor boathouse.'
  ],
  crimeScenePhoto: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
  victim: {
    name: 'Lord Alistair Blackwood',
    age: 68,
    occupation: 'Chairman & Founder, Blackwood Shipping Corp',
    causeOfDeath: 'Presumed Gunshot Trauma and Hypothermic Sea Drowning',
    timeOfDeathEstimate: 'Between 00:30 and 01:30 HRS'
  },
  objectives: [
    'Analyze the blood spatter on the Persian rug in the Evidence Lab to confirm genetic origin.',
    'Inspect the study\'s secret compartment and ballistic discharge marks.',
    'Correlate the tide chart with the suspect muddy footprints in the boathouse.',
    'Interrogate Julian, Vivienne, and Butler Godfrey Moore to uncover the disinheritance motive.',
    'Reconstruct the midnight confrontation and locate the disposal vector.'
  ],
  evidence: [
    {
      id: 'ev-002-blood',
      caseId: 'case-002',
      title: 'Persian Rug Blood Samples',
      description: 'Swabs collected from heavy drip patterns and pooling in front of the marble fireplace.',
      detailedAnalysis: 'Electrophoresis and capillary DNA sequencing reveal the blood pool contains a mixed sample: 85% belongs to an immediate male descendant carrying the Blackwood familial marker with hemophilia B, NOT Lord Alistair himself.',
      category: 'dna',
      location: 'Study Fireplace Rug',
      timestamp: '03:15 HRS',
      imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      isInitialClue: true,
      isCrucial: true,
      associatedSuspectIds: ['susp-002-julian'],
      relatedEvidenceIds: ['ev-002-revolver'],
      forensicReport: {
        type: 'dna',
        summary: 'DNA profiling excludes Lord Alistair Blackwood as the source of the high-velocity drip stains. Profile matches Julian Blackwood with 99.98% certainty.',
        metrics: [
          { label: 'Locus D8S1179', value: '13, 15 (Julian Match)', match: true },
          { label: 'Factor IX Marker', value: 'Deficient (Hemophilia B)', match: true },
          { label: 'Probability Ratio', value: '1 in 4.8 Billion' }
        ],
        gelBands: [120, 240, 310, 480]
      }
    },
    {
      id: 'ev-002-will',
      caseId: 'case-002',
      title: 'Amended Last Will & Testament (Draft)',
      description: 'Found inside Lord Alistair\'s desk blotter, dated the evening of the storm.',
      detailedAnalysis: 'A handwritten codicil revoking all prior bequests. Julian Blackwood is disinherited entirely citing "unforgivable debts to criminal bookmakers in Atlantic City." The entire estate ($42M) is assigned to the Saint Jude Maritime Trust.',
      category: 'document',
      location: 'Mahogany Desk Blotter',
      timestamp: '03:45 HRS',
      isInitialClue: true,
      isCrucial: true,
      associatedSuspectIds: ['susp-002-julian', 'susp-002-vivienne'],
      relatedEvidenceIds: ['ev-002-blood'],
      documentContent: [
        'LAST WILL AND TESTAMENT OF ALISTAIR E. BLACKWOOD',
        'CLAUSE IV (AMENDMENT NOV 12): "To my son Julian, who has squandered his heritage in the dens of racketeers, I leave not a single penny or timber of Blackwood Manor."',
        'WITNESSED BY: Godfrey Moore (Butler)',
        'STATUS: Signed by Alistair, awaiting notary stamp scheduled for 09:00 Nov 13.'
      ]
    },
    {
      id: 'ev-002-revolver',
      caseId: 'case-002',
      title: 'Engraved Webley .38 Revolver',
      description: 'Found concealed inside a hollowed copy of The Count of Monte Cristo in the manor library.',
      detailedAnalysis: 'One spent shell casing in the cylinder; five live rounds remaining. Barrel exhibits nitrocellulose powder residue and a smeared bloody print on the textured grip.',
      category: 'ballistics',
      location: 'Library False Book',
      timestamp: '05:20 HRS',
      imageUrl: 'https://images.unsplash.com/photo-1585589074465-a53f095f9e80?auto=format&fit=crop&w=800&q=80',
      isInitialClue: false,
      isCrucial: true,
      associatedSuspectIds: ['susp-002-julian'],
      relatedEvidenceIds: ['ev-002-blood'],
      forensicReport: {
        type: 'ballistics',
        summary: 'Striation marks match a projectile recovered embedded in the oak balcony doorframe. Trigger guard retains skin tissue from an injured palm.',
        metrics: [
          { label: 'Caliber', value: '.38 S&W Special' },
          { label: 'Rifling', value: '7 Grooves, Right Hand Twist' },
          { label: 'Ballistics Match', value: 'Balcony Frame Bullet', match: true }
        ],
        striationsMatch: true
      }
    },
    {
      id: 'ev-002-boots',
      caseId: 'case-002',
      title: 'Muddy Riding Boots with Sea Cave Flora',
      description: 'Hidden beneath a tarp in the private harbor boathouse.',
      detailedAnalysis: 'Heavy rubberized leather boots coated in black peat moss and Pelvetia canaliculata (channelled wrack), an algae species found exclusively in the submerged sea cave known as "Devil\'s Throat". Size 10.5 matching Julian Blackwood.',
      category: 'physical_object',
      location: 'Boathouse Storage Bin',
      timestamp: '06:40 HRS',
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      isInitialClue: false,
      isCrucial: true,
      associatedSuspectIds: ['susp-002-julian'],
      relatedEvidenceIds: ['ev-002-tide'],
      hotspots: [
        {
          id: 'hs-boot-algae',
          x: 52,
          y: 72,
          label: 'Submerged Sea Cave Algae',
          description: 'Specimen matches the high-salinity flora inside Devil\'s Throat sea cavern.',
          requiresFilter: 'magnifier'
        }
      ]
    },
    {
      id: 'ev-002-tide',
      caseId: 'case-002',
      title: 'Coastal Hydrographic Tide Chart',
      description: 'Tide gauge reading for Blackwood Bay on the night of November 12th.',
      detailedAnalysis: 'Peak spring tide peaked at 01:14 HRS with an undertow velocity of 9.2 knots flowing directly into the subterranean fissure beneath the manor cliffs.',
      category: 'map',
      location: 'Butler\'s Quarters Chart Table',
      timestamp: '04:00 HRS',
      isInitialClue: true,
      isCrucial: false,
      associatedSuspectIds: ['susp-002-godfrey'],
      relatedEvidenceIds: ['ev-002-boots']
    }
  ],
  suspects: [
    {
      id: 'susp-002-julian',
      caseId: 'case-002',
      name: 'Julian Blackwood',
      callsignOrAlias: 'The Prodigal Son',
      age: 31,
      occupation: 'Heir & Disgraced Investor',
      background: 'Educated at Oxford; chronic gambler with debts exceeding $2.8M to Atlantic City loan sharks. His right hand is wrapped in a thick gauze bandage.',
      relationshipToVictim: 'Eldest and only biological son of Lord Alistair.',
      knownMotive: 'Was facing imminent financial ruin and violent retribution if cut out of his father\'s $42M fortune.',
      claimedAlibi: 'Claims he took two sleeping sedatives at 23:00 and slept through the storm until woken by the butler\'s screams at 02:30.',
      personality: 'Arrogant, jittery, nursing a whiskey, sweating despite the bitter draft.',
      stressLevel: 35,
      portraitUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
      isCulprit: true,
      dialogueTree: [
        {
          id: 'dlg-julian-1',
          prompt: 'What happened to your right hand, Julian?',
          response: 'I slipped on the wet terrace steps around ten last night. Cut my palm on a broken champagne glass. Godfrey bandaged it for me.',
          stressDelta: 10
        },
        {
          id: 'dlg-julian-blood',
          prompt: 'The forensic lab ran DNA on the blood pool in your father\'s study. It isn\'t his blood—it\'s yours.',
          response: 'What?! That\'s... that\'s absurd! I might have walked in earlier to ask for an aspirin... you can\'t prove anything!',
          requiredEvidencePresented: 'ev-002-blood',
          stressDelta: 35,
          revealsContradiction: 'contr-julian-alibi'
        },
        {
          id: 'dlg-julian-revolver',
          prompt: 'We found the Webley revolver in the library. Your skin and blood are dried on the trigger guard.',
          response: 'He pulled it on ME! The old bastard pulled it out of the desk when I pleaded with him! We grappled, the gun fired... it was an accident! He stumbled over the balcony!',
          requiredEvidencePresented: 'ev-002-revolver',
          stressDelta: 45
        },
        {
          id: 'dlg-julian-boots',
          prompt: 'Then why were your boots found in the boathouse covered in Devil\'s Throat sea cave algae?',
          response: '...The current wouldn\'t carry him away from the cliff. I had to row down to the sea cave to push the body into the vortex... or they would have found the bullet in him...',
          requiredEvidencePresented: 'ev-002-boots',
          stressDelta: 50
        }
      ],
      contradictions: [
        {
          id: 'contr-julian-alibi',
          statement: 'Claims he was asleep in his second-floor bedroom from 23:00 until 02:30.',
          refutedByEvidenceId: 'ev-002-blood',
          revealedExplanation: 'His fresh arterial blood with hemophilia markers was shed in Lord Alistair\'s study between 00:45 and 01:15 during the struggle.'
        }
      ]
    },
    {
      id: 'susp-002-vivienne',
      caseId: 'case-002',
      name: 'Vivienne Blackwood',
      callsignOrAlias: 'The Matriarch',
      age: 42,
      occupation: 'Former Opera Singer & Socialite',
      background: 'Lord Alistair\'s second wife of six years. Unhappy in the isolated manor; maintains separate bank accounts in Zurich.',
      relationshipToVictim: 'Spouse.',
      knownMotive: 'Stood to receive a lifetime stipend, but was negotiating a divorce settlement.',
      claimedAlibi: 'Was in the conservatory playing the grand piano until 01:00, then retired to her private suite in the East Wing.',
      personality: 'Poised, cold, guarded, speaks with aristocratic detachment.',
      stressLevel: 20,
      portraitUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      isCulprit: false,
      dialogueTree: [
        {
          id: 'dlg-vivienne-1',
          prompt: 'Did you hear any gunshot or shouting during the storm?',
          response: 'The nor\'easter was howling like a banshee, Detective. Waves crashed against the granite foundations every ten seconds. I heard nothing over the tempest.',
          stressDelta: 5
        },
        {
          id: 'dlg-vivienne-will',
          prompt: 'Were you aware Alistair was redrafting his will to leave everything to the Maritime Trust?',
          response: 'Alistair changed his will every time he had a spat with Julian. He threatened to cut me off, too. But I have my own trust fund; I don\'t need to push old men off cliffs.',
          requiredEvidencePresented: 'ev-002-will',
          stressDelta: 10
        }
      ],
      contradictions: []
    },
    {
      id: 'susp-002-godfrey',
      caseId: 'case-002',
      name: 'Godfrey Moore',
      callsignOrAlias: 'The Butler',
      age: 61,
      occupation: 'Head Butler & Estate Keeper',
      background: 'Has served the Blackwood family since he was 26. Loyal to Lord Alistair to a fault; deeply resents Julian\'s dissolute lifestyle.',
      relationshipToVictim: 'Personal valet and confidant.',
      knownMotive: 'Had discovered Lord Alistair intended to sell Blackwood Manor to the state park service.',
      claimedAlibi: 'Was tending the basement coal furnace and checking the storm shutters until 02:00.',
      personality: 'Formal, solemn, precise, emotionally devastated by his master\'s fate.',
      stressLevel: 15,
      portraitUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
      isCulprit: false,
      dialogueTree: [
        {
          id: 'dlg-godfrey-1',
          prompt: 'Who had access to the study balcony keys?',
          response: 'Only his Lordship and Master Julian possessed keys to the outer terrace French doors.',
          stressDelta: 5
        },
        {
          id: 'dlg-godfrey-boots',
          prompt: 'Did anyone visit the boathouse after midnight?',
          response: 'I saw a silhouette carrying a heavy bundle across the lower lawn around one-fifteen. When I inspected the boathouse later, the dory was wet and there were bloody handprints on the gunwale.',
          requiredEvidencePresented: 'ev-002-boots',
          stressDelta: 10,
          revealsEvidenceId: 'ev-002-boots'
        }
      ],
      contradictions: []
    }
  ],
  timelineEvents: [
    {
      id: 'tl-002-1',
      caseId: 'case-002',
      timeString: '21:30',
      timestampMinutes: 21 * 60 + 30,
      title: 'Lord Alistair convenes family meeting',
      description: 'Alistair informs Julian and Vivienne he has summoned notary Mr. Graves for the morning to disinherit them.',
      category: 'victim',
      associatedEvidenceId: 'ev-002-will',
      isVerified: true
    },
    {
      id: 'tl-002-2',
      caseId: 'case-002',
      timeString: '00:45',
      timestampMinutes: 24 * 60 + 45,
      title: 'Julian enters Lord Alistair\'s Study',
      description: 'Julian confronts his father armed with the Webley revolver taken from the library.',
      category: 'suspect',
      suspectId: 'susp-002-julian',
      isVerified: true
    },
    {
      id: 'tl-002-3',
      caseId: 'case-002',
      timeString: '01:05',
      timestampMinutes: 25 * 60 + 5,
      title: 'Gunshot discharged during struggle',
      description: 'The revolver discharges into the doorframe; slide recoil severely lacerates Julian\'s palm, spraying his blood onto the rug.',
      category: 'forensic',
      associatedEvidenceId: 'ev-002-blood',
      isVerified: true
    },
    {
      id: 'tl-002-4',
      caseId: 'case-002',
      timeString: '01:14',
      timestampMinutes: 25 * 60 + 14,
      title: 'Peak high spring tide at Devil\'s Throat',
      description: 'Undertow reaches maximum velocity into the subterranean sea cavern.',
      category: 'suspect',
      associatedEvidenceId: 'ev-002-tide',
      isVerified: true
    },
    {
      id: 'tl-002-5',
      caseId: 'case-002',
      timeString: '01:25',
      timestampMinutes: 25 * 60 + 25,
      title: 'Body transported to sea cavern',
      description: 'Julian rows Alistair\'s body in the dory to Devil\'s Throat to ensure deep sea disposal.',
      category: 'suspect',
      associatedEvidenceId: 'ev-002-boots',
      isVerified: true
    },
    {
      id: 'tl-002-6',
      caseId: 'case-002',
      timeString: '02:30',
      timestampMinutes: 26 * 60 + 30,
      title: 'Godfrey Moore discovers bloodied study',
      description: 'Butler discovers the open balcony door, bloodied rug, and missing master.',
      category: 'witness',
      isVerified: true
    }
  ],
  deductionRules: {
    correctCulpritId: 'susp-002-julian',
    correctMotiveId: 'motive-disinheritance-debt',
    validMotiveDescriptions: [
      'disinheritance',
      'gambling debt',
      'inheritance',
      'fortune',
      'will amendment',
      'atlantic city'
    ],
    correctMethodKeywords: [
      'revolver',
      'struggle',
      'gunshot',
      'balcony',
      'sea cave',
      'drowned',
      'devil\'s throat'
    ],
    crucialEvidenceIds: [
      'ev-002-blood',
      'ev-002-revolver',
      'ev-002-will',
      'ev-002-boots'
    ],
    crucialRefutedEvidenceIds: [
      'ev-002-blood'
    ],
    minRequiredSupportingEvidence: 3
  },
  narrativeConsequences: {
    perfect: {
      title: 'INDICTMENT: FIRST-DEGREE MURDER OF LORD BLACKWOOD',
      description: 'State Police divers entered the Devil\'s Throat sea cavern guided by the tide coordinates and recovered Lord Alistair\'s body. With the DNA match on the bloodied rug, the ballistic match on the Webley revolver, and Julian\'s sea-cave mud encrusted boots, Julian broke down during grand jury arraignment and confessed.',
      verdict: 'CONVICTION SECURED // LIFE IMPRISONMENT'
    },
    partial: {
      title: 'MANSLAUGHTER VERDICT',
      description: 'Julian was convicted of involuntary manslaughter and corpse desecration. His high-priced defense argued Lord Alistair initiated the armed altercation and that the fall was accidental during self-defense.',
      verdict: 'REDUCED SENTENCE // 15 YEARS WITH PAROLE'
    },
    failed: {
      title: 'ACQUITTAL // HEIR ESCAPES TO PANAMA',
      description: 'Due to insufficient forensic documentation of the blood evidence, Julian was released on $500,000 bond, liquidated offshore Blackwood assets, and fled on a private yacht before extradition could be processed.',
      verdict: 'SUSPECT FLED JURISDICTION // COLD CASE'
    }
  },
  hints: {
    level1: 'Test the blood on the Persian rug in the Forensic Lab. Is the blood really Lord Alistair\'s?',
    level2: 'Search the library to uncover the missing firearm and compare the caliber with the balcony frame bullet.',
    level3: 'Confront Julian with the DNA electrophoresis match and his mud-coated boathouse boots.'
  }
};
