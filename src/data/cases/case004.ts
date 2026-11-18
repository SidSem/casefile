import { CaseData } from '../../types/case';

export const CASE_004: CaseData = {
  id: 'case-004',
  code: 'CASE 004',
  title: 'ASHES OF YESTERDAY',
  classification: 'SECRET',
  difficulty: 'Special Agent',
  location: 'Grand Caldera Hotel Ruins, 19th & St. Clair Boulevard',
  incidentDate: 'DECEMBER 01, 2026 // 01:10 HRS',
  summary: 'A three-alarm incendiary fire swept through the condemned Grand Caldera Hotel hours before scheduled demolition. Firefighters quenching the subterranean elevator shaft collapsed a false brick partition, uncovering a steel casket containing skeletal human remains entombed since 1988.',
  briefingNotes: [
    'The victim\'s skeleton was found clutching an engraved 1988 silver pocket watch and a brass key to Safety Deposit Box 204.',
    'Forensic anthropology identifies the remains as Samuel Vance, an auditor who vanished in August 1988.',
    'Arson investigators discovered remnants of military-grade thermite canisters in the executive record vault.',
    'Original 1988 missing persons report concluded Vance fled to Mexico with stolen municipal bonds.',
    'Grand Caldera Hotel was owned and constructed in 1988 by real estate tycoon Raymond Cross.'
  ],
  crimeScenePhoto: 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=1200&q=80',
  victim: {
    name: 'Samuel Vance',
    age: 39,
    occupation: 'Lead Financial Auditor, State Comptroller\'s Office (1988)',
    causeOfDeath: 'Depressed Cranial Occipital Fracture caused by Heavy Blunt Force',
    timeOfDeathEstimate: 'August 14, 1988 // 23:42 HRS'
  },
  objectives: [
    'Examine the skeletal trauma in the Forensic Anthropology Lab to determine the murder weapon.',
    'Inspect the thermite canister chemical signature recovered from the arson debris.',
    'Access the 1988 Land Registry deeds to expose Raymond Cross\'s illicit property acquisition.',
    'Interrogate Raymond Cross, Retired Chief Henry Miller, and Archivist Moira Bell.',
    'Unravel the 38-year-old cold case murder and the subsequent arson coverup.'
  ],
  evidence: [
    {
      id: 'ev-004-skeleton',
      caseId: 'case-004',
      title: 'Forensic Skeletal Examination #1988-V',
      description: 'Human skeletal remains recovered from beneath the concrete elevator foundation slab.',
      detailedAnalysis: 'Skull exhibits a 4.2cm circular depressed cranial fracture along the posterior occipital bone. The impact angle indicates the victim was struck from behind by a heavy, square-cornered brass object.',
      category: 'physical_object',
      location: 'Sub-Basement Elevator Vault',
      timestamp: 'DEC 01 // 09:00 HRS',
      imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
      isInitialClue: true,
      isCrucial: true,
      associatedSuspectIds: ['susp-004-cross'],
      relatedEvidenceIds: ['ev-004-watch'],
      forensicReport: {
        type: 'autopsy',
        summary: 'Mass spectrometry on bone margin reveals brass copper-zinc alloy microscopic transfer chips embedded in the fracture groove.',
        metrics: [
          { label: 'Cranial Trauma', value: 'Occipital Depressed Fracture', match: true },
          { label: 'Microscopic Transfer', value: 'Brass 70/30 (Marine Grade)', match: true },
          { label: 'Estimated Post-Mortem', value: '38 Years (+/- 1.5 yrs)' }
        ],
        rawDetails: [
          'Immediate loss of consciousness and fatal subarachnoid hemorrhage.',
          'Victim was deceased prior to concrete entombment.'
        ]
      }
    },
    {
      id: 'ev-004-watch',
      caseId: 'case-004',
      title: 'Engraved Omega Pocket Watch (Stopped at 23:42)',
      description: 'Found inside the victim\'s tweed coat pocket. Engraved: "To Samuel Vance - Integrity in Truth, 1984".',
      detailedAnalysis: 'Hands permanently frozen at 11:42 PM due to mainspring rupture caused by extreme mechanical shock. Date window registers August 14th.',
      category: 'physical_object',
      location: 'Sub-Basement Elevator Vault',
      timestamp: 'DEC 01 // 10:15 HRS',
      isInitialClue: true,
      isCrucial: true,
      associatedSuspectIds: ['susp-004-cross', 'susp-004-miller'],
      relatedEvidenceIds: ['ev-004-skeleton']
    },
    {
      id: 'ev-004-thermite',
      caseId: 'case-004',
      title: 'Incendiary Thermite Residue & Igniter Igniter',
      description: 'Recovered from the hotel\'s third-floor records office by arson investigators.',
      detailedAnalysis: 'Military-grade TH3 thermite incendiary mixture that burns at 4000°F. Used to ensure total liquefaction of paper files. The electronic detonator matches a batch purchased through Cross Holdings Security subsidiary.',
      category: 'toxicology',
      location: 'Hotel 3rd Floor Records Room',
      timestamp: 'DEC 01 // 14:00 HRS',
      imageUrl: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=800&q=80',
      isInitialClue: false,
      isCrucial: true,
      associatedSuspectIds: ['susp-004-cross'],
      relatedEvidenceIds: ['ev-004-deed'],
      forensicReport: {
        type: 'toxicology',
        summary: 'Chromatography confirms Thermite TH3 with barium nitrate oxidizer and sulfur delay fuse.',
        metrics: [
          { label: 'Compound', value: 'Thermite TH3 / Barium Nitrate' },
          { label: 'Temperature Output', value: '4,100 °F' },
          { label: 'Detonator Serial', value: 'CHS-SEC-0914 (Cross Holdings)', match: true }
        ],
        chemicalCompound: 'Fe2O3 + 2Al'
      }
    },
    {
      id: 'ev-004-deed',
      caseId: 'case-004',
      title: '1988 Safety Deposit Box 204 Auditing Ledger',
      description: 'Retrieved from First State Vault using the key found on Samuel Vance\'s remains.',
      detailedAnalysis: 'Contains original certified copies of the 1988 Caldera land deed transfer, showing fraudulent signature of the original municipal owner and a $200,000 payoff check endorsed by Police Chief Henry Miller.',
      category: 'document',
      location: 'First State Bank Vault',
      timestamp: 'DEC 02 // 11:30 HRS',
      isInitialClue: false,
      isCrucial: true,
      associatedSuspectIds: ['susp-004-cross', 'susp-004-miller'],
      relatedEvidenceIds: ['ev-004-file'],
      documentContent: [
        'STATE COMPTROLLER AUDIT MEMO // AUGUST 14, 1988',
        'AUDITOR: Samuel Vance',
        'FINDING: "Raymond Cross obtained the Caldera Grand parcel through fabricated foreclosures. Chief Henry Miller approved the false declarations in exchange for a 5% silent equity share."',
        'NOTE: "I have arranged to present this indictment to the Federal Prosecutor tomorrow at 09:00."'
      ]
    },
    {
      id: 'ev-004-file',
      caseId: 'case-004',
      title: '1988 Closed Missing Persons Case File #88-441',
      description: 'The original municipal police case folder prepared and signed by Chief Henry Miller.',
      detailedAnalysis: 'File declared Samuel Vance an absconded embezzler who took an AeroMexico flight to Guadalajara on August 15, 1988. Flight manifest was visibly altered with typewriter white-out correction tape.',
      category: 'document',
      location: 'Police Archive Cold Case Annex',
      timestamp: 'DEC 02 // 13:45 HRS',
      isInitialClue: false,
      isCrucial: true,
      associatedSuspectIds: ['susp-004-miller'],
      relatedEvidenceIds: ['ev-004-deed']
    }
  ],
  suspects: [
    {
      id: 'susp-004-cross',
      caseId: 'case-004',
      name: 'Raymond Cross',
      callsignOrAlias: 'The Tycoon',
      age: 67,
      occupation: 'Billionaire Real Estate Developer & Hotelier',
      background: 'Built a massive corporate empire beginning with the Caldera Hotel in the 1980s. Known for ruthless acquisitions and powerful political connections.',
      relationshipToVictim: 'Target of Samuel Vance\'s 1988 financial fraud audit.',
      knownMotive: 'Samuel Vance was hours away from presenting federal fraud charges that would have ruined Cross and sent him to prison.',
      claimedAlibi: 'Claims he was attending an international real-estate conference in London throughout August 1988.',
      personality: 'Cold, predatory, dismissive of investigators, surrounded by lawyers.',
      stressLevel: 25,
      portraitUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      isCulprit: true,
      dialogueTree: [
        {
          id: 'dlg-cross-1',
          prompt: 'Do you remember an auditor named Samuel Vance in August 1988, Mr. Cross?',
          response: 'Thirty-eight years ago? I deal with thousands of accountants, Detective. I believe that fellow stole state bonds and fled to Central America. Old history.',
          stressDelta: 5
        },
        {
          id: 'dlg-cross-skeleton',
          prompt: 'Samuel Vance never went to Mexico. His skeleton was found beneath the concrete in your hotel\'s elevator foundation.',
          response: 'That\'s preposterous. Contractors built that foundation; I don\'t pour concrete personally. If someone buried a body there, talk to the union foreman.',
          requiredEvidencePresented: 'ev-004-skeleton',
          stressDelta: 30,
          revealsContradiction: 'contr-cross-flight'
        },
        {
          id: 'dlg-cross-deed',
          prompt: 'We opened Box 204. We have Vance\'s audit and your forged land deeds with Miller\'s $200,000 payoff check.',
          response: '...Vance came to my penthouse that night thinking he was incorruptible. He wouldn\'t take the million dollars I offered him. He made a move for the door!',
          requiredEvidencePresented: 'ev-004-deed',
          stressDelta: 45
        },
        {
          id: 'dlg-cross-thermite',
          prompt: 'The thermite used to incinerate the Caldera records came directly from Cross Holdings Security.',
          response: 'The building was scheduled for demo! Why let nosy forensic crews dig up the foundations when a fire could clear the lot cleanly?!',
          requiredEvidencePresented: 'ev-004-thermite',
          stressDelta: 50
        }
      ],
      contradictions: [
        {
          id: 'contr-cross-flight',
          statement: 'Claims he was in London attending an international symposium on August 14, 1988.',
          refutedByEvidenceId: 'ev-004-deed',
          revealedExplanation: 'Personal signature on the hand-delivered settlement memo at the Caldera Hotel placed him in St. Jude at 23:15 on August 14, 1988.'
        }
      ]
    },
    {
      id: 'susp-004-miller',
      caseId: 'case-004',
      name: 'Henry Miller',
      callsignOrAlias: 'The Chief',
      age: 74,
      occupation: 'Retired Chief of Police (St. Jude PD)',
      background: 'Led the police department from 1982 to 1996. Retires in luxury in an oceanfront estate; frail but retains sharp tactical cunning.',
      relationshipToVictim: 'Lead investigator on the 1988 Samuel Vance missing persons case.',
      knownMotive: 'Received a 5% silent equity share in the hotel for falsifying the runaway narrative.',
      claimedAlibi: 'Retired citizen; denies any wrongdoing during his tenure.',
      personality: 'Gruff, coughing, cynical about police politics and old secrets.',
      stressLevel: 30,
      portraitUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      isCulprit: false,
      dialogueTree: [
        {
          id: 'dlg-miller-1',
          prompt: 'Why was the flight manifest in file #88-441 altered with white-out tape, Chief?',
          response: 'It was 1988, kid! Typewriters jammed. We didn\'t have your fancy computer databases. Vance skipped town; end of story.',
          stressDelta: 10
        },
        {
          id: 'dlg-miller-deed',
          prompt: 'We found your $200,000 endorsement check from Raymond Cross in Vance\'s safety deposit box.',
          response: '...God help me. Cross called me at midnight on August 14th in a panic. Vance was dead on the marble floor of the executive suite, blood pouring from his ear. Cross said if I didn\'t help bury it, he\'d take the whole city administration down with him.',
          requiredEvidencePresented: 'ev-004-deed',
          stressDelta: 45
        }
      ],
      contradictions: []
    },
    {
      id: 'susp-004-bell',
      caseId: 'case-004',
      name: 'Moira Bell',
      callsignOrAlias: 'The Archivist',
      age: 58,
      occupation: 'Head Archivist, St. Jude Municipal Land Registry',
      background: 'Has managed city land archives for 30 years. Discovered irregularities in the Caldera land grant five years ago but was warned to stay silent.',
      relationshipToVictim: 'No direct connection to victim; custodian of historical deeds.',
      knownMotive: 'None; feared losing her pension if she spoke out.',
      claimedAlibi: 'Was at her home reading when the fire sirens sounded.',
      personality: 'Nervous, quiet, but eager to see historical justice served.',
      stressLevel: 10,
      portraitUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      isCulprit: false,
      dialogueTree: [
        {
          id: 'dlg-bell-1',
          prompt: 'Did anyone request to inspect the 1988 Caldera title deeds recently?',
          response: 'Yes! Two weeks ago, two men from Cross Holdings came in demanding the original 1988 deed ledgers. When I told them they were stored in the state vault, they looked terrified.',
          stressDelta: -5
        }
      ],
      contradictions: []
    }
  ],
  timelineEvents: [
    {
      id: 'tl-004-1',
      caseId: 'case-004',
      timeString: 'AUG 14, 1988 // 22:30',
      timestampMinutes: 22 * 60 + 30,
      title: 'Samuel Vance confronts Raymond Cross',
      description: 'Vance enters Cross\'s executive suite with proof of fraudulent land acquisitions.',
      category: 'victim',
      associatedEvidenceId: 'ev-004-deed',
      isVerified: true
    },
    {
      id: 'tl-004-2',
      caseId: 'case-004',
      timeString: 'AUG 14, 1988 // 23:42',
      timestampMinutes: 23 * 60 + 42,
      title: 'Vance bludgeoned with brass paperweight',
      description: 'Raymond Cross strikes Vance from behind; pocket watch breaks at 23:42.',
      category: 'suspect',
      associatedEvidenceId: 'ev-004-watch',
      isVerified: true
    },
    {
      id: 'tl-004-3',
      caseId: 'case-004',
      timeString: 'AUG 15, 1988 // 01:15',
      timestampMinutes: 25 * 60 + 15,
      title: 'Chief Miller arrives at hotel penthouse',
      description: 'Chief Miller arranges the concrete entombment in the elevator foundation and falsifies missing persons report #88-441.',
      category: 'police',
      associatedEvidenceId: 'ev-004-file',
      isVerified: true
    },
    {
      id: 'tl-004-4',
      caseId: 'case-004',
      timeString: 'DEC 01, 2026 // 01:05',
      timestampMinutes: 26 * 60 + 5,
      title: 'Cross triggers thermite arson fire',
      description: 'Cross detonates military thermite to incinerate remaining records before scheduled demolition crews arrive.',
      category: 'suspect',
      associatedEvidenceId: 'ev-004-thermite',
      isVerified: true
    }
  ],
  deductionRules: {
    correctCulpritId: 'susp-004-cross',
    correctMotiveId: 'motive-land-fraud-audit',
    validMotiveDescriptions: [
      'land fraud',
      'audit',
      'caldera land deed',
      'bribe',
      'comptroller',
      'forged foreclosure'
    ],
    correctMethodKeywords: [
      'blunt force',
      'brass',
      'cranial fracture',
      'struck from behind',
      'elevator shaft',
      'concrete'
    ],
    crucialEvidenceIds: [
      'ev-004-skeleton',
      'ev-004-watch',
      'ev-004-thermite',
      'ev-004-deed'
    ],
    crucialRefutedEvidenceIds: [
      'ev-004-file'
    ],
    minRequiredSupportingEvidence: 3
  },
  narrativeConsequences: {
    perfect: {
      title: 'HISTORIC INDICTMENT: BILLIONAIRE RAYMOND CROSS ARRESTED',
      description: 'Thirty-eight years after Samuel Vance\'s murder, the Federal Bureau of Investigation served high-profile arrest warrants on Raymond Cross and retired Chief Henry Miller. The brass transfer particles on the skull, the recovered 1988 ledger, and Miller\'s full video confession unmasked decades of corruption that reshaped the skyline of St. Jude.',
      verdict: 'CONVICTION SECURED // COLD CASE SOLVED'
    },
    partial: {
      title: 'CONVICTION ON ARSON CHARGES ONLY',
      description: 'Raymond Cross was convicted of first-degree arson and destruction of municipal records, receiving 18 years. High-priced defense motions cited the 38-year statute on certain physical chain of custody records for the murder charge.',
      verdict: 'PARTIAL JUSTICE // 18 YEARS FOR ARSON'
    },
    failed: {
      title: 'CASE DISMISSED // STATUTE CHALLENGE',
      description: 'Legal maneuvers by Cross\'s defense team succeeded in having key physical evidence deemed inadmissible due to the fire destruction. Cross walked free and flew to an undisclosed Mediterranean villa.',
      verdict: 'FAILURE TO INDICT // EVIDENCE SUPPRESSED'
    }
  },
  hints: {
    level1: 'Inspect the skull fractures in the Forensic Lab. What type of weapon caused the 4.2cm trauma?',
    level2: 'Use the brass key found on the skeleton to unlock Safety Deposit Box 204 at First State Bank.',
    level3: 'Confront Chief Henry Miller with the endorsed $200,000 payoff check to break his silence.'
  }
};
