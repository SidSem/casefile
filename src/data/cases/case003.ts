import { CaseData } from '../../types/case';

export const CASE_003: CaseData = {
  id: 'case-003',
  code: 'CASE 003',
  title: 'THE LAST TRANSMISSION',
  classification: 'SECRET',
  difficulty: 'Detective',
  location: 'Cape Solitude Automated Signal Station, Shoal Rock',
  incidentDate: 'SEPTEMBER 04, 2026 // 03:22 HRS',
  summary: 'Veteran maritime radio officer Jonas Miller sent a panicked distress broadcast on emergency frequency 2182 kHz reporting an armed boarding. First responders arrived at dawn to find the lighthouse console smashed, blood on the catwalk, and the operator missing.',
  briefingNotes: [
    'Audio recording captured sound of steel hatch breaching and twin 9mm discharges.',
    'Signal station coordinates 44.12N / 68.30W are adjacent to a restricted naval disposal grid.',
    'Station radio was manually set to tactical frequency 142.8 MHz prior to destruction.',
    'Coast Guard Cutter Vigilant reported no radar contacts within 15 nautical miles.',
    'Blood pool on the iron catwalk matches Jonas Miller; 9mm Federal Hydra-Shok casing recovered.'
  ],
  crimeScenePhoto: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
  victim: {
    name: 'Jonas Miller',
    age: 51,
    occupation: 'Chief Signal Station Keeper',
    causeOfDeath: 'Gunshot Trauma (9mm Hydra-Shok) followed by Ocean Disposal',
    timeOfDeathEstimate: 'Between 03:15 and 03:30 HRS'
  },
  objectives: [
    'Analyze the emergency radio audio transcript to filter background propulsion noise.',
    'Examine the spent 9mm Hydra-Shok shell casing in the Ballistics Lab.',
    'Cross-reference the Coast Guard Cutter logbook with the coastal radar plot.',
    'Interrogate Officer Frank Navarro, Dr. Sylvia Chen, and salvage captain Sean Briggs.',
    'Expose the false patrol log and identify the naval salvage conspiracy.'
  ],
  evidence: [
    {
      id: 'ev-003-audio',
      caseId: 'case-003',
      title: 'Distress Broadcast Audio Recording & Transcript',
      description: 'Recorded by the regional maritime rescue center at 03:17:42 HRS.',
      detailedAnalysis: 'Audio spectral analysis reveals Jonas Miller yelling: "Mayday! Cutter 402... they\'ve docked at the lower pier... Navarro, don\'t shoot—!" followed by twin gunshots and marine turbine noise matching a twin-diesel patrol boat.',
      category: 'audio_transcript',
      location: 'Maritime Rescue Center Archive',
      timestamp: '03:17 HRS',
      imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
      isInitialClue: true,
      isCrucial: true,
      associatedSuspectIds: ['susp-003-navarro'],
      relatedEvidenceIds: ['ev-003-casing'],
      documentContent: [
        'AUDIO TRANSCRIPT // TAPE REEL #MR-904',
        '[03:17:12] MILLER: "All stations, this is Cape Solitude Station. Unidentified vessel alongside... wait, that\'s Coast Guard livery..."',
        '[03:17:28] MILLER: "Hatch breached! Navarro, what are you doing with that sidearm?! The coordinates are already logged in the book—"',
        '[03:17:35] [SOUND: Heavy steel door slamming open]',
        '[03:17:39] [SOUND: Two sharp detonations: 9mm acoustic signature]',
        '[03:17:42] [SOUND: Marine twin-screw diesel engines accelerating]'
      ]
    },
    {
      id: 'ev-003-casing',
      caseId: 'case-003',
      title: '9mm Luger Federal Hydra-Shok Shell Casing',
      description: 'Found wedged in the grated iron catwalk outside the lighthouse lantern room.',
      detailedAnalysis: 'Headstamp: "FC 9MM LUGER +P+". Firing pin indentation matches the polygonal rifling of a Coast Guard service-issue Glock 19. Ejector claw scratch matches weapon serial #USCG-8812 assigned to Captain Frank Navarro.',
      category: 'ballistics',
      location: 'Lantern Catwalk Grating',
      timestamp: '08:30 HRS',
      isInitialClue: true,
      isCrucial: true,
      associatedSuspectIds: ['susp-003-navarro'],
      relatedEvidenceIds: ['ev-003-logbook'],
      forensicReport: {
        type: 'ballistics',
        summary: 'Breech-face impression and firing pin crater match Coast Guard service weapon #USCG-8812 with 99.8% confidence.',
        metrics: [
          { label: 'Caliber', value: '9x19mm Parabellum' },
          { label: 'Breech-Face Mark', value: 'Glock 19 Gen 5 Match', match: true },
          { label: 'Ejector Pin Serial', value: 'USCG-8812 (Navarro)', match: true }
        ],
        striationsMatch: true
      }
    },
    {
      id: 'ev-003-logbook',
      caseId: 'case-003',
      title: 'USCG Cutter Vigilant Electronic Navigation Log',
      description: 'Automatic GPS positioning records seized from the cutter wheelhouse terminal.',
      detailedAnalysis: 'The official paper log stated the cutter was patrolling Sector 9 (25 miles south) between 02:00 and 04:30. However, raw internal satellite transponder data shows the cutter went "dark" (AIS transponder disabled) from 02:48 until 03:42.',
      category: 'document',
      location: 'USCG Base Sector Office',
      timestamp: '11:15 HRS',
      isInitialClue: false,
      isCrucial: true,
      associatedSuspectIds: ['susp-003-navarro'],
      relatedEvidenceIds: ['ev-003-radar'],
      documentContent: [
        'USCG CUTTER VIGILANT // SHIP LOG EXCERPT',
        'OFFICER OF THE DECK: Captain Frank Navarro',
        '02:45: AIS BEACON: DISABLED (Log note: "Equipment recalibration")',
        '03:45: AIS BEACON: RESTORED at Sector 7 Grid',
        'NOTE: Total nautical distance covered between timestamps is mathematically impossible unless vessel operated at 32 knots directly past Cape Solitude.'
      ]
    },
    {
      id: 'ev-003-radar',
      caseId: 'case-003',
      title: 'Oceanographic Benthic Hydrophone & Radar Log',
      description: 'Acoustic recordings provided by Dr. Sylvia Chen\'s marine research station.',
      detailedAnalysis: 'Hydrophone buoy #4 recorded high-speed cavitation of a 45-foot Coast Guard interceptor vessel coming alongside Cape Solitude at 03:14 HRS, departing at 03:20 HRS.',
      category: 'map',
      location: 'Marine Sciences Institute',
      timestamp: '12:00 HRS',
      isInitialClue: false,
      isCrucial: true,
      associatedSuspectIds: ['susp-003-navarro', 'susp-003-chen'],
      relatedEvidenceIds: ['ev-003-audio']
    },
    {
      id: 'ev-003-manifest',
      caseId: 'case-003',
      title: 'Black Market Munitions Bill of Lading',
      description: 'Found aboard Sean Briggs\' salvage vessel Sea Wolf during DEA/Coast Guard inspection.',
      detailedAnalysis: 'Documents covert salvage of Korean War depth charges and naval brass from underwater coordinate 44.12N. Payoffs list "Protector: F.N." receiving 40% cut.',
      category: 'document',
      location: 'Sea Wolf Bilge Locker',
      timestamp: '14:20 HRS',
      isInitialClue: false,
      isCrucial: true,
      associatedSuspectIds: ['susp-003-briggs', 'susp-003-navarro'],
      relatedEvidenceIds: ['ev-003-logbook']
    }
  ],
  suspects: [
    {
      id: 'susp-003-navarro',
      caseId: 'case-003',
      name: 'Officer Frank Navarro',
      callsignOrAlias: 'The Cutter Captain',
      age: 44,
      occupation: 'Patrol Captain, USCG Cutter Vigilant',
      background: 'Decorated 20-year veteran of maritime law enforcement. Heavily leveraged in bad real-estate developments in South Florida.',
      relationshipToVictim: 'Primary liaison officer responsible for lighthouse supply drops and station inspections.',
      knownMotive: 'Miller intercepted his encrypted smuggling comms with Sean Briggs and was preparing to transmit the coordinates to Naval Intelligence.',
      claimedAlibi: 'Claims the Vigilant was 25 nautical miles south performing routine fisheries patrols all night.',
      personality: 'Defensive, bellicose, relies on military hierarchy to intimidate investigators.',
      stressLevel: 30,
      portraitUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      isCulprit: true,
      dialogueTree: [
        {
          id: 'dlg-navarro-1',
          prompt: 'Where was Cutter Vigilant at 03:17 on September 4th, Captain?',
          response: 'Read my patrol log, Detective. We were running trawler safety inspections in Sector 9, twenty miles away from that damn rock.',
          stressDelta: 5
        },
        {
          id: 'dlg-navarro-audio',
          prompt: 'We recovered the emergency recording. Jonas Miller said your name right before the gunfire: "Navarro, don\'t shoot—"',
          response: 'He... he was delirious! Lone operators lose their minds out there on the lighthouse all the time! Anyone could imitate my name!',
          requiredEvidencePresented: 'ev-003-audio',
          stressDelta: 30,
          revealsContradiction: 'contr-navarro-alibi'
        },
        {
          id: 'dlg-navarro-casing',
          prompt: 'The firing pin strike on the spent 9mm casing matches your service Glock #USCG-8812 down to the micro-groove.',
          response: '...That gun was in my duty locker all week! Someone broke into the armory!',
          requiredEvidencePresented: 'ev-003-casing',
          stressDelta: 40
        },
        {
          id: 'dlg-navarro-logbook',
          prompt: 'Your AIS transponder was switched off for 54 minutes. The satellite telemetry places you right at Cape Solitude pier.',
          response: 'Damn it... Briggs swore Miller wouldn\'t be listening on tactical channel 142.8! I only went up to take his logbook, but Miller pulled a flare gun on me!',
          requiredEvidencePresented: 'ev-003-logbook',
          stressDelta: 50
        }
      ],
      contradictions: [
        {
          id: 'contr-navarro-alibi',
          statement: 'Claims Cutter Vigilant was 25 nautical miles away in Sector 9 with active engines.',
          refutedByEvidenceId: 'ev-003-logbook',
          revealedExplanation: 'Electronic satellite position records prove the cutter was docked at Cape Solitude during the exact timestamp of the murder.'
        }
      ]
    },
    {
      id: 'susp-003-chen',
      caseId: 'case-003',
      name: 'Dr. Sylvia Chen',
      callsignOrAlias: 'The Oceanographer',
      age: 38,
      occupation: 'Lead Marine Researcher, Shoal Rock Observatory',
      background: 'Researches underwater acoustic anomalies. Frequently complained about radio interference from the lighthouse.',
      relationshipToVictim: 'Scientific collaborator and occasional adversary over transmitter frequencies.',
      knownMotive: 'Miller had filed a complaint threatening to shut down her acoustic sonar array.',
      claimedAlibi: 'Was monitoring deep-sea hydrophone data in her harbor laboratory.',
      personality: 'Methodical, calm, willing to cooperate fully with scientific logs.',
      stressLevel: 15,
      portraitUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
      isCulprit: false,
      dialogueTree: [
        {
          id: 'dlg-chen-1',
          prompt: 'Did your acoustic sensors detect any unusual vessels near the station at 03:00?',
          response: 'Yes, Detective. Our high-frequency hydrophones picked up a distinct twin-screw diesel cavitation heading at full throttle toward Cape Solitude at 03:12.',
          stressDelta: -5,
          revealsEvidenceId: 'ev-003-radar'
        }
      ],
      contradictions: []
    },
    {
      id: 'susp-003-briggs',
      caseId: 'case-003',
      name: 'Sean Briggs',
      callsignOrAlias: 'The Smuggler',
      age: 49,
      occupation: 'Salvage Diver & Captain of Sea Wolf',
      background: 'Notorious maritime scavenger with multiple past charges for looting naval war graves and illegal scrap metal trafficking.',
      relationshipToVictim: 'Miller had reported Briggs\' boat lingering near the shoals twice last month.',
      knownMotive: 'Miller was about to expose his illegal depth-charge salvage operation.',
      claimedAlibi: 'Claims he was asleep on his boat tied up at the mainland marina.',
      personality: 'Cynical, weathered, smells of saltwater and diesel oil.',
      stressLevel: 35,
      portraitUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      isCulprit: false,
      dialogueTree: [
        {
          id: 'dlg-briggs-1',
          prompt: 'What was your vessel Sea Wolf doing in naval grid 44.12N last week?',
          response: 'Just retrieving abandoned lobster pots, Detective. A man\'s got to earn an honest living.',
          stressDelta: 10
        },
        {
          id: 'dlg-briggs-manifest',
          prompt: 'Your bill of lading shows depth charge brass and payoffs to "Protector: F.N."',
          response: 'Alright, look! Navarro ran protection for us! He gave us the naval sweep schedules. But I never touched Miller! Navarro told me he would "handle" the radio guy personally!',
          requiredEvidencePresented: 'ev-003-manifest',
          stressDelta: 40
        }
      ],
      contradictions: []
    }
  ],
  timelineEvents: [
    {
      id: 'tl-003-1',
      caseId: 'case-003',
      timeString: '02:15',
      timestampMinutes: 2 * 60 + 15,
      title: 'Jonas Miller intercepts frequency 142.8 MHz',
      description: 'Miller overhears Frank Navarro directing Sean Briggs to haul salvaged munitions.',
      category: 'victim',
      isVerified: true
    },
    {
      id: 'tl-003-2',
      caseId: 'case-003',
      timeString: '02:45',
      timestampMinutes: 2 * 60 + 45,
      title: 'Cutter Vigilant disables AIS satellite beacon',
      description: 'Navarro switches off automated tracker to approach Cape Solitude covertly.',
      category: 'suspect',
      associatedEvidenceId: 'ev-003-logbook',
      isVerified: true
    },
    {
      id: 'tl-003-3',
      caseId: 'case-003',
      timeString: '03:14',
      timestampMinutes: 3 * 60 + 14,
      title: 'Navarro docks at Cape Solitude lower pier',
      description: 'Twin-screw diesel acoustic signature registered by hydrophones.',
      category: 'police',
      associatedEvidenceId: 'ev-003-radar',
      isVerified: true
    },
    {
      id: 'tl-003-4',
      caseId: 'case-003',
      timeString: '03:17',
      timestampMinutes: 3 * 60 + 17,
      title: 'Emergency distress call & gunshot',
      description: 'Miller transmits distress signal; Navarro kicks down lantern door and fires his service Glock.',
      category: 'victim',
      associatedEvidenceId: 'ev-003-audio',
      isVerified: true
    },
    {
      id: 'tl-003-5',
      caseId: 'case-003',
      timeString: '03:20',
      timestampMinutes: 3 * 60 + 20,
      title: 'Body thrown into deep oceanic trench',
      description: 'Navarro tosses Miller\'s body over the catwalk into the cold tidal rip.',
      category: 'suspect',
      isVerified: true
    }
  ],
  deductionRules: {
    correctCulpritId: 'susp-003-navarro',
    correctMotiveId: 'motive-smuggling-coverup',
    validMotiveDescriptions: [
      'smuggling',
      'munitions salvage',
      'coverup',
      'black market',
      'intercepted transmission',
      'naval grid'
    ],
    correctMethodKeywords: [
      'glock',
      'service weapon',
      '9mm',
      'cutter',
      'gunshot',
      'lantern door',
      'hydra-shok'
    ],
    crucialEvidenceIds: [
      'ev-003-audio',
      'ev-003-casing',
      'ev-003-logbook',
      'ev-003-manifest'
    ],
    crucialRefutedEvidenceIds: [
      'ev-003-logbook'
    ],
    minRequiredSupportingEvidence: 3
  },
  narrativeConsequences: {
    perfect: {
      title: 'MILITARY TRIBUNAL CONVICTION: FRANK NAVARRO',
      description: 'Naval Criminal Investigative Service (NCIS) took Captain Frank Navarro into custody at Coast Guard Headquarters. Faced with ballistics matching his Glock 19, satellite radar positioning, and Sean Briggs\' state\'s evidence testimony, Navarro confessed to maritime murder and conspiracy. The naval salvage syndicate was dismantled.',
      verdict: 'CONVICTION SECURED // DISHONORABLE DISCHARGE & LIFE'
    },
    partial: {
      title: 'CONVICTION ON CORRUPTION CHARGES',
      description: 'Navarro was convicted of maritime smuggling and tampering with government logbooks. Without Jonas Miller\'s physical remains, the military judge acquitted on capital murder, handing down a 20-year federal penitentiary sentence.',
      verdict: 'SECONDARY OFFENSES ONLY // 20 YEARS'
    },
    failed: {
      title: 'INVESTIGATION DISMISSED // JURISDICTIONAL DISPUTE',
      description: 'Inconclusive presentation of ballistic evidence allowed naval attorneys to suppress the station recording. Navarro was quietly reassigned to Pacific Command and the file was classified indefinitely.',
      verdict: 'COVERUP SUCCESSFUL // CASE SHELVED'
    }
  },
  hints: {
    level1: 'Listen to the audio recording carefully. What did Jonas Miller scream right before the gunshots?',
    level2: 'Analyze the 9mm shell casing in the Ballistics Lab to find the weapon\'s unique serial registration.',
    level3: 'Compare Navarro\'s official paper patrol log with the vessel\'s satellite transponder gap.'
  }
};
