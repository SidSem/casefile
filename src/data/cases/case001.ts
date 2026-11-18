import { CaseData } from '../../types/case';

export const CASE_001: CaseData = {
  id: 'case-001',
  code: 'CASE 001',
  title: 'THE SILENT WITNESS',
  classification: 'CONFIDENTIAL',
  difficulty: 'Rookie',
  location: '404 Mercer Street, Apt 4B, St. Jude',
  incidentDate: 'OCTOBER 24, 2026 // 22:15 HRS',
  summary: 'Investigative journalist Elena Vance is discovered dead in her locked fourth-floor apartment. While initial responders suspected sudden cardiac arrest, local homicide detectives noticed signs of a staged tea service and a forced service elevator switch.',
  briefingNotes: [
    'Victim found slumped over writing desk; cup of chamomile tea half-consumed.',
    'Deadbolt on primary front door was secured from the inside.',
    'Window to external fire escape was unlatched by approximately 3 inches.',
    'Elena Vance had published three exposés on municipal corruption in the St. Jude Daily.',
    'Autopsy reveals lethal digitalis glycoside poisoning administered prior to staging.'
  ],
  crimeScenePhoto: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1200&q=80',
  victim: {
    name: 'Elena Vance',
    age: 32,
    occupation: 'Senior Investigative Journalist',
    causeOfDeath: 'Acute Digitalis Toxicity leading to Induced Ventricular Arrhythmia',
    timeOfDeathEstimate: 'Between 21:15 and 21:45 HRS'
  },
  objectives: [
    'Examine the victim\'s apartment and forensic reports to identify the lethal compound.',
    'Interrogate the three persons of interest: Marcus Sterling, Dr. Chloe Adams, and Arthur Pendleton.',
    'Expose the contradictory alibi using building maintenance logs or CCTV records.',
    'Reconstruct the chronological timeline leading to Elena Vance\'s death.',
    'Submit the formal indictment identifying the killer, motive, and method.'
  ],
  evidence: [
    {
      id: 'ev-001-tea',
      caseId: 'case-001',
      title: 'Porcelain Chamomile Teacup',
      description: 'Found on Elena\'s desk beside her typewriter. Half-full with chamomile herbal tea.',
      detailedAnalysis: 'Liquid residue contains concentrated Foxglove extract (Digoxin/Digitalis). The porcelain rim shows clear lipstick smudges matching the victim, and a faint oily smudge on the outer handle.',
      category: 'toxicology',
      location: 'Apartment 4B Desk',
      timestamp: '22:20 HRS',
      imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
      isInitialClue: true,
      isCrucial: true,
      associatedSuspectIds: ['susp-001-chloe', 'susp-001-marcus'],
      relatedEvidenceIds: ['ev-001-autopsy', 'ev-001-vial'],
      forensicReport: {
        type: 'toxicology',
        summary: 'Mass spectrometry confirms Digoxin concentration of 14.8 ng/mL (lethal threshold: >2.0 ng/mL). Rapid cardiac arrest within 20 minutes of ingestion.',
        metrics: [
          { label: 'Compound', value: 'Digoxin (Digitalis Purpurea)' },
          { label: 'Concentration', value: '14.8 ng/mL', match: true },
          { label: 'Purity Grade', value: 'Laboratory Reagent Grade 99.4%' }
        ],
        chemicalCompound: 'C41H64O14'
      },
      hotspots: [
        {
          id: 'hs-tea-rim',
          x: 48,
          y: 28,
          label: 'Powder Residue',
          description: 'Microscopic inspection under UV light reveals synthetic binding starch used in pharmaceutical compounding.',
          requiresFilter: 'uv'
        },
        {
          id: 'hs-tea-handle',
          x: 75,
          y: 62,
          label: 'Signet Ring Scratch',
          description: 'A distinct circular scratching pattern on the glaze made by heavy signet ring jewelry.',
          requiresFilter: 'magnifier'
        }
      ]
    },
    {
      id: 'ev-001-autopsy',
      caseId: 'case-001',
      title: 'Coroner Autopsy Report #2026-409',
      description: 'Official Medical Examiner report for Elena Vance, signed by Dr. K. Henderson.',
      detailedAnalysis: 'No signs of defensive struggle, ligature marks, or blunt trauma. Death occurred suddenly due to ventricular fibrillation precipitated by cardiac glycoside poisoning.',
      category: 'document',
      location: 'County Morgue',
      timestamp: 'OCT 25 // 04:30 HRS',
      isInitialClue: true,
      isCrucial: true,
      associatedSuspectIds: ['susp-001-chloe'],
      relatedEvidenceIds: ['ev-001-tea'],
      documentContent: [
        'DECEDENT: Vance, Elena (Female, 32 years)',
        'ESTIMATED TIME OF DEATH: 21:30 HRS (+/- 15 min)',
        'CAUSE: Acute cardiac arrhythmia secondary to toxic glycoside ingestion.',
        'GASTRIC ANALYSIS: Chamomile tea and trace starch binder consistent with oral liquid suspension.',
        'TOXICOLOGY SCREEN: Negative for common narcotics, ethanol, or cyanide. HIGH positive for Digoxin.'
      ]
    },
    {
      id: 'ev-001-vial',
      caseId: 'case-001',
      title: 'Discarded Amber Reagent Ampoule',
      description: 'Recovered from the apartment building basement incinerator chute during forensic sweep.',
      detailedAnalysis: 'Amber glass ampoule with label partly dissolved by heat: "PharmaCore Lab Grade Digoxin Solution 50mg/mL". Lot #PC-9942.',
      category: 'physical_object',
      location: 'Basement Incinerator Chute',
      timestamp: 'OCT 25 // 06:15 HRS',
      imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
      isInitialClue: false,
      isCrucial: true,
      associatedSuspectIds: ['susp-001-chloe', 'susp-001-marcus'],
      relatedEvidenceIds: ['ev-001-tea'],
      forensicReport: {
        type: 'fingerprint',
        summary: 'Latent partial fingerprint recovered from neck of ampoule.',
        metrics: [
          { label: 'Ridge Match', value: 'Marcus Sterling (Left Thumb)', match: true, confidence: 94.2 },
          { label: 'Secondary DNA', value: 'Chloe Adams (Trace touch transfer)', match: true, confidence: 88.0 }
        ]
      }
    },
    {
      id: 'ev-001-dossier',
      caseId: 'case-001',
      title: 'Elena\'s Confidential Mercer Harbor File',
      description: 'Manila folder found concealed behind the bathroom ventilation grate in Apt 4B.',
      detailedAnalysis: 'Photocopies of offshore wire transfers totaling $1.4M to "Aegis Port Holdings" signed by Deputy Mayor Marcus Sterling. Notes indicate Elena scheduled a meeting to confront Sterling.',
      category: 'document',
      location: 'Apt 4B Bathroom Vent',
      timestamp: 'OCT 25 // 08:00 HRS',
      isInitialClue: false,
      isCrucial: true,
      associatedSuspectIds: ['susp-001-marcus'],
      relatedEvidenceIds: ['ev-001-cctv'],
      documentContent: [
        'MEMO: ST. JUDE HARBOR REDEVELOPMENT CONTRACT BIDS',
        'CONFIDENTIAL RECIPIENT: Aegis Port Holdings (Grand Cayman)',
        'AUTHORIZED SIGNATORY: Marcus J. Sterling, City Council Commissioner',
        'HANDWRITTEN NOTE BY ELENA: "Sterling agreed to visit Apt 4B at 21:00 on Oct 24 to review evidence before I publish on Monday. Bring recorder."'
      ]
    },
    {
      id: 'ev-001-cctv',
      caseId: 'case-001',
      title: 'Mercer Street Alley CCTV Footage',
      description: 'Security camera footage from the bakery directly opposite the 404 Mercer service alley.',
      detailedAnalysis: 'At 21:04, a tall male wearing a long dark trench coat and wide-brim fedora enters the service door. At 21:48, the same figure exits hastily and gets into a black luxury sedan with municipal plates.',
      category: 'photograph',
      location: 'Mercer Street Bakery CCTV',
      timestamp: '21:04 - 21:48 HRS',
      imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80',
      isInitialClue: true,
      isCrucial: true,
      associatedSuspectIds: ['susp-001-marcus'],
      relatedEvidenceIds: ['ev-001-keycard'],
      hotspots: [
        {
          id: 'hs-cctv-plate',
          x: 82,
          y: 78,
          label: 'Sedan License Plate',
          description: 'Municipal government plate #CC-04 registered to the City Council Executive Motor Pool (Marcus Sterling).',
          requiresFilter: 'magnifier'
        }
      ]
    },
    {
      id: 'ev-001-keycard',
      caseId: 'case-001',
      title: 'Superintendent Master Keycard Log',
      description: 'Electronic access record for 404 Mercer Street utility and apartment master keys.',
      detailedAnalysis: 'Building Superintendent Arthur Pendleton\'s Master RFID Key was swiped at Apt 4B door at 21:08 HRS, and again at the basement service exit at 21:49 HRS.',
      category: 'document',
      location: 'Building Management Office',
      timestamp: 'OCT 25 // 09:20 HRS',
      isInitialClue: false,
      isCrucial: true,
      associatedSuspectIds: ['susp-001-arthur'],
      relatedEvidenceIds: ['ev-001-bank'],
      documentContent: [
        'KEYCARD #M-04 (Assigned: Arthur Pendleton)',
        '21:02 HRS - Basement Service Entry UNLOCKED',
        '21:08 HRS - 4th Floor Corridor Entry UNLOCKED',
        '21:09 HRS - Apartment 4B Deadbolt Override ACTIVE',
        '21:49 HRS - Basement Service Exit UNLOCKED'
      ]
    },
    {
      id: 'ev-001-bank',
      caseId: 'case-001',
      title: 'Arthur Pendleton Bank Deposit Slip',
      description: 'Cash deposit receipt found inside Arthur Pendleton\'s toolbox.',
      detailedAnalysis: 'A sudden $25,000 cash deposit made at 23:15 HRS on October 24 at a 24-hour ATM three blocks from Mercer Street.',
      category: 'document',
      location: 'Basement Workshop Toolbox',
      timestamp: 'OCT 25 // 10:00 HRS',
      isInitialClue: false,
      isCrucial: true,
      associatedSuspectIds: ['susp-001-arthur', 'susp-001-marcus'],
      relatedEvidenceIds: ['ev-001-keycard'],
      documentContent: [
        'FIRST FIDELITY BANK - NIGHT DEPOSIT ENVELOPE',
        'ACCOUNT HOLDER: Pendleton, Arthur E.',
        'AMOUNT: $25,000.00 CASH (100-dollar denominations in federal reserve band)',
        'TRANSACTION TIME: OCT 24, 2026 // 23:14:02 HRS'
      ]
    }
  ],
  suspects: [
    {
      id: 'susp-001-marcus',
      caseId: 'case-001',
      name: 'Marcus Sterling',
      callsignOrAlias: 'The Councilman',
      age: 48,
      occupation: 'Deputy Mayor & City Council Chairman',
      background: 'Ambitious politician running for mayor. Spearheaded the lucrative $800M Mercer Harbor redevelopment project. Longtime patron of city pharmaceutical charities.',
      relationshipToVictim: 'Subject of Elena\'s ongoing corruption investigation.',
      knownMotive: 'Elena had gathered irrefutable evidence of a $1.4M offshore kickback scheme that would end his political career and send him to federal prison.',
      claimedAlibi: 'Claims he was attending the Annual Police Athletic League Gala at the Grand Plaza Ballroom from 19:30 until 23:00 without leaving.',
      personality: 'Polished, authoritative, condescending, but shows nervous fidgeting when his alibi is scrutinized.',
      stressLevel: 25,
      portraitUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      isCulprit: true,
      dialogueTree: [
        {
          id: 'dlg-marcus-1',
          prompt: 'Where were you between 21:00 and 22:00 on October 24th, Councilman?',
          response: 'I was keynote speaker at the Police Gala at the Grand Plaza, Detective. Three hundred witnesses saw me in black tie all evening.',
          stressDelta: 5
        },
        {
          id: 'dlg-marcus-cctv',
          prompt: 'Then explain why municipal car #CC-04 was caught on CCTV in the Mercer Street alley at 21:04.',
          response: 'What? That car is assigned to my office, certainly, but any pool driver or staffer could have taken it. You have no proof I was behind the wheel.',
          requiredEvidencePresented: 'ev-001-cctv',
          stressDelta: 25,
          revealsContradiction: 'contr-marcus-alibi'
        },
        {
          id: 'dlg-marcus-vial',
          prompt: 'We pulled a PharmaCore Digoxin ampoule from the incinerator chute with your thumbprint on it.',
          response: 'Wait... this is an outrageous fabrication! Chloe gave me an asthma spray sample weeks ago... someone is framing me!',
          requiredEvidencePresented: 'ev-001-vial',
          stressDelta: 35
        },
        {
          id: 'dlg-marcus-dossier',
          prompt: 'We found Elena\'s notes. She had scheduled a meeting with you at 21:00 to show you the Cayman bank wire transfers.',
          response: '...She was bluffing. She wanted to blackmail me! She invited me up to talk. I only went to listen, Detective! When I got there, she was already pouring tea...',
          requiredEvidencePresented: 'ev-001-dossier',
          stressDelta: 40,
          revealsEvidenceId: 'ev-001-bank'
        }
      ],
      contradictions: [
        {
          id: 'contr-marcus-alibi',
          statement: 'Claims he was on stage at the Grand Plaza Police Gala continuously between 20:30 and 22:30.',
          refutedByEvidenceId: 'ev-001-cctv',
          revealedExplanation: 'Gala program shows Marcus Sterling stepped off stage for an "urgent private city council emergency call" at 20:50 and did not return until 22:15.'
        }
      ]
    },
    {
      id: 'susp-001-chloe',
      caseId: 'case-001',
      name: 'Dr. Chloe Adams',
      callsignOrAlias: 'The Biochemist',
      age: 36,
      occupation: 'Chief Biochemist, PharmaCore Labs',
      background: 'Elena Vance\'s university roommate and former confidante. Serves as scientific advisor on the City Council Health Committee overseen by Marcus Sterling.',
      relationshipToVictim: 'Close friend; had a falling out two weeks prior over missing clinical trial supplies.',
      knownMotive: 'Elena began asking questions about unrecorded shipments of experimental cardiac compounds leaving PharmaCore.',
      claimedAlibi: 'Claims she was working alone in the PharmaCore downtown synthesis laboratory until 23:00.',
      personality: 'Analytical, guarded, visibly distressed by Elena\'s death.',
      stressLevel: 45,
      portraitUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      isCulprit: false,
      dialogueTree: [
        {
          id: 'dlg-chloe-1',
          prompt: 'Did Elena ever contact you regarding Digoxin or cardiac glycosides?',
          response: 'Elena called me two days ago asking hypotheticals about lethal dosages. I thought she was researching another sensational article! I swear I didn\'t give her anything.',
          stressDelta: 10
        },
        {
          id: 'dlg-chloe-vial',
          prompt: 'We found an ampoule from your lab lot #PC-9942 in the incinerator.',
          response: 'My god... lot 9942? Marcus Sterling visited my facility last Thursday for the municipal ribbon-cutting ceremony. He asked for a demonstration of high-purity cardiac stimulants. I left him alone in the prep room for five minutes!',
          requiredEvidencePresented: 'ev-001-vial',
          stressDelta: -15,
          revealsEvidenceId: 'ev-001-vial'
        }
      ],
      contradictions: []
    },
    {
      id: 'susp-001-arthur',
      caseId: 'case-001',
      name: 'Arthur Pendleton',
      callsignOrAlias: 'The Super',
      age: 54,
      occupation: 'Building Superintendent, 404 Mercer',
      background: 'Longtime maintenance superintendent with keys to every apartment in the complex. Known to have heavy horse-racing debts.',
      relationshipToVictim: 'Building superintendent for Elena\'s apartment.',
      knownMotive: 'Elena had complained to the city housing board about illegal basement sublets managed by Pendleton.',
      claimedAlibi: 'Claims he fell asleep in his basement workshop watching television from 20:00 until sirens arrived at 22:30.',
      personality: 'Gruff, defensive, smells of cheap cigars and stale coffee.',
      stressLevel: 30,
      portraitUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      isCulprit: false,
      dialogueTree: [
        {
          id: 'dlg-arthur-1',
          prompt: 'When was the last time you were on the fourth floor on October 24th?',
          response: 'Told the uniform cops already: around 18:00 to check a radiator valve on 4A. Never went back up.',
          stressDelta: 10
        },
        {
          id: 'dlg-arthur-keycard',
          prompt: 'Your master RFID keycard was logged opening Apt 4B deadbolt at 21:08.',
          response: 'Listen, detective... I didn\'t hurt her! A gentleman offered me five grand just to unlock the front door and look the other way for twenty minutes. He said he was her lover wanting to leave a surprise!',
          requiredEvidencePresented: 'ev-001-keycard',
          stressDelta: 30,
          revealsEvidenceId: 'ev-001-bank'
        },
        {
          id: 'dlg-arthur-bank',
          prompt: 'Five grand? Your bank receipt shows you deposited $25,000 in cash at 23:14.',
          response: 'Okay, okay! It was Sterling! Marcus Sterling himself! He gave me the briefcase full of hundreds in the alley, told me to unlock 4B and leave the back gate open or he\'d have the city bulldoze my brother\'s warehouse!',
          requiredEvidencePresented: 'ev-001-bank',
          stressDelta: 45
        }
      ],
      contradictions: [
        {
          id: 'contr-arthur-alibi',
          statement: 'Claims he stayed in his basement workshop asleep from 20:00 to 22:30.',
          refutedByEvidenceId: 'ev-001-keycard',
          revealedExplanation: 'Keycard access logs record his master card unlocking 4B at 21:08 and the basement gate at 21:49.'
        }
      ]
    }
  ],
  timelineEvents: [
    {
      id: 'tl-001-1',
      caseId: 'case-001',
      timeString: '18:00',
      timestampMinutes: 18 * 60,
      title: 'Arthur Pendleton checks radiator valves',
      description: 'Superintendent enters fourth floor for routine maintenance check.',
      category: 'suspect',
      suspectId: 'susp-001-arthur',
      isVerified: true
    },
    {
      id: 'tl-001-2',
      caseId: 'case-001',
      timeString: '20:45',
      timestampMinutes: 20 * 60 + 45,
      title: 'Marcus Sterling leaves Police Gala',
      description: 'Sterling departs the Grand Plaza ballroom claiming an urgent municipal matter.',
      category: 'suspect',
      suspectId: 'susp-001-marcus',
      isVerified: true
    },
    {
      id: 'tl-001-3',
      caseId: 'case-001',
      timeString: '21:04',
      timestampMinutes: 21 * 60 + 4,
      title: 'City sedan enters Mercer alley',
      description: 'CCTV records dark sedan CC-04 arriving at the service entrance of 404 Mercer.',
      category: 'police',
      associatedEvidenceId: 'ev-001-cctv',
      isVerified: true
    },
    {
      id: 'tl-001-4',
      caseId: 'case-001',
      timeString: '21:08',
      timestampMinutes: 21 * 60 + 8,
      title: 'Apt 4B Deadbolt unlocked with Master Key',
      description: 'Arthur Pendleton unlocks the deadbolt for Marcus Sterling.',
      category: 'suspect',
      associatedEvidenceId: 'ev-001-keycard',
      isVerified: true
    },
    {
      id: 'tl-001-5',
      caseId: 'case-001',
      timeString: '21:15 - 21:30',
      timestampMinutes: 21 * 60 + 20,
      title: 'Elena Vance ingests poisoned chamomile tea',
      description: 'Sterling spikes Elena\'s tea with high-grade Digoxin while confronting her over the harbor dossier.',
      category: 'victim',
      associatedEvidenceId: 'ev-001-tea',
      isVerified: true
    },
    {
      id: 'tl-001-6',
      caseId: 'case-001',
      timeString: '21:48',
      timestampMinutes: 21 * 60 + 48,
      title: 'Perpetrator flees via basement incinerator',
      description: 'Sterling discards the empty Digoxin ampoule into the incinerator chute and escapes in sedan CC-04.',
      category: 'suspect',
      associatedEvidenceId: 'ev-001-vial',
      isVerified: true
    },
    {
      id: 'tl-001-7',
      caseId: 'case-001',
      timeString: '23:14',
      timestampMinutes: 23 * 60 + 14,
      title: 'Arthur Pendleton deposits $25,000 cash bribe',
      description: 'Pendleton deposits his payoff into the 24-hour ATM at First Fidelity Bank.',
      category: 'suspect',
      associatedEvidenceId: 'ev-001-bank',
      isVerified: true
    }
  ],
  deductionRules: {
    correctCulpritId: 'susp-001-marcus',
    correctMotiveId: 'motive-extortion-kickbacks',
    validMotiveDescriptions: [
      'kickbacks',
      'harbor redevelopment',
      'blackmail',
      'mercer harbor',
      'expose corruption',
      'political career'
    ],
    correctMethodKeywords: [
      'digoxin',
      'poison',
      'tea',
      'master key',
      'chamomile',
      'incinerator'
    ],
    crucialEvidenceIds: [
      'ev-001-tea',
      'ev-001-vial',
      'ev-001-cctv',
      'ev-001-dossier'
    ],
    crucialRefutedEvidenceIds: [
      'ev-001-cctv',
      'ev-001-keycard'
    ],
    minRequiredSupportingEvidence: 3
  },
  narrativeConsequences: {
    perfect: {
      title: 'ARREST WARRANT ISSUED: MARCUS STERLING',
      description: 'Deputy Mayor Marcus Sterling was intercepted by Federal marshals while attempting to board a chartered Gulfstream to Grand Cayman. Armed with the Digoxin ampoule fingerprint match, the Mercer alley CCTV logs, and Arthur Pendleton\'s sworn confession, the District Attorney secured a grand jury indictment for First Degree Premeditated Murder and Extortion within 48 hours.',
      verdict: 'CONVICTION SECURED // GUILTY ON ALL COUNTS'
    },
    partial: {
      title: 'ARREST WITH COMPROMISED CHARGES',
      description: 'Marcus Sterling was taken into custody, but defense attorneys exploited ambiguities in the timeline to argue Pendleton acted independently. Sterling avoids capital murder charges, pleading down to conspiracy and tampering with physical evidence.',
      verdict: 'PARTIAL JUSTICE // PLEA BARGAIN ACCEPTED'
    },
    failed: {
      title: 'MISCARRIAGE OF JUSTICE // CASE COMPROMISED',
      description: 'An erroneous indictment was filed against the wrong individual. Capitalizing on the procedural collapse, Marcus Sterling used his political apparatus to dismiss all corruption investigations and scrubbed the Mercer harbor archives.',
      verdict: 'INVESTIGATION COLLAPSED // SUSPECT ESCAPED'
    }
  },
  hints: {
    level1: 'Focus on the physical evidence found on the victim\'s desk. What substance caused her sudden heart arrest?',
    level2: 'Compare the CCTV footage of vehicle CC-04 with the superintendent\'s master keycard logs around 21:08.',
    level3: 'Interrogate Marcus Sterling with the CCTV footage and the discarded Digoxin ampoule recovered from the basement chute.'
  }
};
