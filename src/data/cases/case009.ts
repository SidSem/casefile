import { CaseData } from '../../types/case';

export const CASE_009: CaseData = {
  id: 'case-009',
  code: 'CASE 009',
  title: 'THE NINTH FILE',
  classification: 'TOP SECRET // EYES ONLY',
  difficulty: 'Special Agent',
  location: 'Sub-Level 4, Federal Archives & Abandoned Transit Spur 9',
  incidentDate: 'DECEMBER 24, 2026 // 03:00 HRS',
  summary: 'Lead Internal Investigator Special Agent Victoria Sterling disappeared after uncovering an unbroken financial nexus linking the Elena Vance murder, the Blackwood offshore shell companies, the Cape Solitude munitions theft, and the Caldera Hotel conspiracy. Her encrypted field laptop was recovered inside an abandoned subway maintenance spur alongside severed fiber cables and bloodied security badges.',
  briefingNotes: [
    'THIS FILE IS CLASSIFIED LEVEL 4 BY EXECUTIVE DIRECTIVE.',
    'Victoria Sterling was investigating high-level treason inside the Federal Bureau itself.',
    'A classified internal initiative code-named "PROJECT CHIMERA" utilized dirty kickbacks from cases 001-004 to fund rogue black operations.',
    'Victoria\'s badge was swiped at Sub-Level 4 Archives at 01:14 HRS; alarm circuits were manually suppressed from the Director\'s terminal.',
    'Federal Executive Director Vance Sterling claims Victoria was compromised by foreign intelligence and ordered her file erased.'
  ],
  crimeScenePhoto: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
  victim: {
    name: 'Special Agent Victoria Sterling',
    age: 34,
    occupation: 'Senior Field Investigator, Office of Internal Accountability',
    causeOfDeath: 'Point-Blank Gunshot Wound (Classified Bureau Armor-Piercing 5.7x28mm)',
    timeOfDeathEstimate: 'Between 01:30 and 02:00 HRS'
  },
  objectives: [
    'Decrypt Victoria Sterling\'s ruggedized field laptop in the Forensic Lab.',
    'Examine the Sub-Level 4 server security terminal override logs.',
    'Trace the secret Swiss bank routing numbers connecting Cases 001, 002, 003, and 004 to Project Chimera.',
    'Interrogate Director Vance Sterling, IA Agent Donald Graves, and Cryptanalyst Dr. Evelyn Thorne.',
    'Expose the conspiratorial architect of Project Chimera and dismantle the rogue bureau cell.'
  ],
  isLocked: true,
  unlockRequirement: 'Complete at least 2 prior investigations or enter Level 4 Master Clearance',
  evidence: [
    {
      id: 'ev-009-laptop',
      caseId: 'case-009',
      title: 'Encrypted Toughbook CF-33 & Decrypted Nexus Ledger',
      description: 'Agent Victoria Sterling\'s field laptop found stashed behind electrical transformers in Transit Spur 9.',
      detailedAnalysis: 'Hard drive contains the master synthesis document: cross-referencing Cayman bank transfers from Marcus Sterling (Case 001), Blackwood Maritime Corp (Case 002), USCG naval salvage payoffs (Case 003), and Cross Holdings (Case 004) all funding a single black account: "CHIMERA OMEGA // ACCT 990-B".',
      category: 'document',
      location: 'Transit Spur 9 Electrical Conduit',
      timestamp: 'DEC 24 // 05:30 HRS',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      isInitialClue: true,
      isCrucial: true,
      associatedSuspectIds: ['susp-009-director'],
      relatedEvidenceIds: ['ev-009-casing'],
      documentContent: [
        'PROJECT CHIMERA // FINANCIAL CORRELATION MATRIX',
        'AUTHORED BY: Special Agent V. Sterling (ID #FA-4491)',
        '• Case 001: Marcus Sterling Mercer harbor bribes -> channeled $1.4M to Chimera Account',
        '• Case 002: Blackwood offshore trust liquidations -> channeled $4.2M to Chimera Account',
        '• Case 003: Cape Solitude salvaged naval munitions -> armed Chimera strike team',
        '• Case 004: Raymond Cross / Chief Miller land graft -> laundered through Chimera foundations',
        'FINAL ENTRY (01:22): "The kill orders are being signed directly by Executive Director Vance Sterling."'
      ]
    },
    {
      id: 'ev-009-casing',
      caseId: 'case-009',
      title: '5.7x28mm Armor-Piercing Spent Casing (SS190)',
      description: 'Recovered from the concrete floor of Sub-Level 4 Server Vault B.',
      detailedAnalysis: 'Exotic high-velocity armor-piercing round manufactured exclusively under federal contract for Executive Protection details. Fired from a FN Five-seveN MK3 sidearm with customized tritium night sights.',
      category: 'ballistics',
      location: 'Sub-Level 4 Server Vault B',
      timestamp: 'DEC 24 // 06:15 HRS',
      isInitialClue: true,
      isCrucial: true,
      associatedSuspectIds: ['susp-009-director', 'susp-009-graves'],
      relatedEvidenceIds: ['ev-009-terminal'],
      forensicReport: {
        type: 'ballistics',
        summary: 'Micro-stamping matches Executive Sidearm #DIR-001 issued to Executive Director Vance Sterling.',
        metrics: [
          { label: 'Caliber', value: '5.7x28mm SS190 AP' },
          { label: 'Breech Impression', value: 'FN Five-seveN Executive Issue', match: true },
          { label: 'Micro-stamp Serial', value: 'DIR-001 (Director Sterling)', match: true }
        ],
        striationsMatch: true
      }
    },
    {
      id: 'ev-009-terminal',
      caseId: 'case-009',
      title: 'Executive Console Sub-Level Security Override Log',
      description: 'Audit dump pulled from the biometric mainframe on Floor 12.',
      detailedAnalysis: 'Shows that at 01:28 HRS, the automated alarm and CCTV feeds for Sub-Level 4 were manually disabled for 22 minutes using retinal scan credentials belonging to Executive Director Vance Sterling.',
      category: 'document',
      location: 'Bureau Central Mainframe',
      timestamp: 'DEC 24 // 07:45 HRS',
      isInitialClue: false,
      isCrucial: true,
      associatedSuspectIds: ['susp-009-director'],
      relatedEvidenceIds: ['ev-009-laptop'],
      documentContent: [
        'SECURITY SYSTEM BIOMETRIC AUDIT TRAIL',
        '01:28:14 HRS: USER "DIRECTOR_STERLING" RETINAL SCAN CONFIRMED.',
        '01:28:30 HRS: SUB-LEVEL 4 SILENT LOCKDOWN INITIATED.',
        '01:28:45 HRS: OPTICAL CAMERAS 401 THROUGH 412 SWITCHED TO LOOPING CACHE.',
        '01:50:02 HRS: NORMAL TELEMETRY RESTORED BY TERMINAL #DIR-EXECUTIVE.'
      ]
    },
    {
      id: 'ev-009-dna',
      caseId: 'case-009',
      title: 'Torn Nomex Glove Fragment with Genetic Epithelial Residue',
      description: 'Found caught on the ventilation duct latch inside Transit Spur 9.',
      detailedAnalysis: 'Black tactical Nomex glove fragment torn during the disposal of Victoria\'s laptop. Contains dried perspiration cells with autosomal DNA profile.',
      category: 'dna',
      location: 'Ventilation Grille Transit Spur 9',
      timestamp: 'DEC 24 // 08:30 HRS',
      isInitialClue: false,
      isCrucial: true,
      associatedSuspectIds: ['susp-009-director'],
      relatedEvidenceIds: ['ev-009-terminal'],
      forensicReport: {
        type: 'dna',
        summary: 'Autosomal profile corresponds to Vance Sterling (Probability: 1 in 12 Billion). Excludes Donald Graves and Evelyn Thorne.',
        metrics: [
          { label: 'Marker CSF1PO', value: '11, 12 (Vance Sterling Match)', match: true },
          { label: 'Marker TH01', value: '7, 9.3 (Vance Sterling Match)', match: true }
        ],
        gelBands: [150, 220, 340, 510]
      }
    }
  ],
  suspects: [
    {
      id: 'susp-009-director',
      caseId: 'case-009',
      name: 'Director Vance Sterling',
      callsignOrAlias: 'The Director',
      age: 59,
      occupation: 'Executive Director of Federal Operations',
      background: 'Thirty-two years in federal service. Uncle to Elena Vance and Marcus Sterling. The highest-ranking law enforcement official in the region, with unilateral classification authority.',
      relationshipToVictim: 'Victoria\'s superior officer and mentor.',
      knownMotive: 'Victoria had uncovered that Project Chimera was his personal shadow empire, using extortion from past cases to fund illegal black ops.',
      claimedAlibi: 'Claims he was asleep at his residence in Potomac, MD, with his personal security detail stationed outside.',
      personality: 'Formidable, icy, commanding, treats all questions as insubordination.',
      stressLevel: 20,
      portraitUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      isCulprit: true,
      dialogueTree: [
        {
          id: 'dlg-director-1',
          prompt: 'Where were you between 01:00 and 02:30 this morning, Director?',
          response: 'In bed at my estate in Potomac, Agent. My security detail logged me in at 22:00. Now stand down before I have your credentials revoked.',
          stressDelta: 5
        },
        {
          id: 'dlg-director-terminal',
          prompt: 'Your retinal scan was logged disabling the CCTV cameras in Sub-Level 4 at 01:28.',
          response: '...Mainframes can be spoofed! Dr. Thorne or Graves could have extracted my biometric hash from the server database!',
          requiredEvidencePresented: 'ev-009-terminal',
          stressDelta: 30,
          revealsContradiction: 'contr-director-alibi'
        },
        {
          id: 'dlg-director-casing',
          prompt: 'The 5.7mm armor-piercing round that killed Victoria carries the micro-stamp of your personal sidearm #DIR-001.',
          response: 'You have no concept of what is at stake! Project Chimera was designed to protect this nation from threats regular law cannot touch! Victoria was going to burn thirty years of intelligence down for a headline!',
          requiredEvidencePresented: 'ev-009-casing',
          stressDelta: 45
        },
        {
          id: 'dlg-director-laptop',
          prompt: 'Victoria decrypted the master ledger. All four cases—Marcus, Blackwood, Navarro, Cross—were feeding your personal slush fund.',
          response: '...They were disposable assets! Necessary evils! Do you think you can arrest the Director of Federal Operations? I AM this agency!',
          requiredEvidencePresented: 'ev-009-laptop',
          stressDelta: 50
        }
      ],
      contradictions: [
        {
          id: 'contr-director-alibi',
          statement: 'Claims he was at his Potomac home from 22:00 until morning.',
          refutedByEvidenceId: 'ev-009-terminal',
          revealedExplanation: 'Biometric retinal scans and physical keycard entries logged Director Sterling in the Sub-Level 4 archive at 01:28.'
        }
      ]
    },
    {
      id: 'susp-009-graves',
      caseId: 'case-009',
      name: 'Agent Donald Graves',
      callsignOrAlias: 'Internal Affairs',
      age: 41,
      occupation: 'Senior Inspector, Internal Affairs',
      background: 'Feared internal watchdog known for ruthless interrogations. Was assigned by Sterling to audit Victoria\'s research.',
      relationshipToVictim: 'Investigated Victoria for alleged security leaks.',
      knownMotive: 'Was suspected of acting as Sterling\'s enforcer.',
      claimedAlibi: 'Was processing case paperwork in his Floor 8 office.',
      personality: 'Suspicious, paranoid, unyielding adherence to protocol.',
      stressLevel: 35,
      portraitUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      isCulprit: false,
      dialogueTree: [
        {
          id: 'dlg-graves-1',
          prompt: 'Why did you seize Victoria\'s research notes yesterday, Inspector?',
          response: 'Director Sterling ordered a level-one compartment audit. He told me Victoria had made contact with foreign agents. I was following orders! When I realized what Victoria was actually investigating, I tried to warn her!',
          stressDelta: 15
        }
      ],
      contradictions: []
    },
    {
      id: 'susp-009-thorne',
      caseId: 'case-009',
      name: 'Dr. Evelyn Thorne',
      callsignOrAlias: 'The Cryptanalyst',
      age: 47,
      occupation: 'Head of Cryptanalysis and Cyber Forensics',
      background: 'Brilliant cryptographer who designed the Bureau\'s biometric and optical encryption keys.',
      relationshipToVictim: 'Collaborated with Victoria to decrypt intercepted dark-web communications.',
      knownMotive: 'Had created the cryptographic hash that locked Project Chimera files.',
      claimedAlibi: 'Was running batch decryption jobs on the high-performance computing cluster.',
      personality: 'Hyper-focused, nervous, knows the walls have ears.',
      stressLevel: 25,
      portraitUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      isCulprit: false,
      dialogueTree: [
        {
          id: 'dlg-thorne-1',
          prompt: 'Could anyone have spoofed Director Sterling\'s retinal scan at 01:28?',
          response: 'Impossible, Detective. Our optic scanners use live pupillary vascular dilation metrics. A dead eye or digital spoof triggers instant lockdown. It had to be Director Sterling in person.',
          stressDelta: -5
        }
      ],
      contradictions: []
    }
  ],
  timelineEvents: [
    {
      id: 'tl-009-1',
      caseId: 'case-009',
      timeString: '00:45',
      timestampMinutes: 45,
      title: 'Victoria Sterling enters Sub-Level 4',
      description: 'Victoria accesses mainframe terminal B to download the master Project Chimera financial ledger.',
      category: 'victim',
      associatedEvidenceId: 'ev-009-laptop',
      isVerified: true
    },
    {
      id: 'tl-009-2',
      caseId: 'case-009',
      timeString: '01:28',
      timestampMinutes: 1 * 60 + 28,
      title: 'Director Sterling biometric override',
      description: 'Vance Sterling uses retinal scan to shut off security feeds and silent alarms in Sub-Level 4.',
      category: 'suspect',
      associatedEvidenceId: 'ev-009-terminal',
      isVerified: true
    },
    {
      id: 'tl-009-3',
      caseId: 'case-009',
      timeString: '01:38',
      timestampMinutes: 1 * 60 + 38,
      title: 'Execution of Victoria Sterling',
      description: 'Sterling corners Victoria in Vault B and fires a single 5.7mm AP round from weapon #DIR-001.',
      category: 'forensic',
      associatedEvidenceId: 'ev-009-casing',
      isVerified: true
    },
    {
      id: 'tl-009-4',
      caseId: 'case-009',
      timeString: '02:05',
      timestampMinutes: 2 * 60 + 5,
      title: 'Laptop stashed in Transit Spur 9',
      description: 'Sterling attempts to hide Victoria\'s laptop in the abandoned subway ventilation shaft.',
      category: 'suspect',
      associatedEvidenceId: 'ev-009-dna',
      isVerified: true
    }
  ],
  deductionRules: {
    correctCulpritId: 'susp-009-director',
    correctMotiveId: 'motive-project-chimera-conspiracy',
    validMotiveDescriptions: [
      'project chimera',
      'black budget',
      'treason',
      'conspiracy',
      'shadow empire',
      'kickback nexus',
      'coverup'
    ],
    correctMethodKeywords: [
      '5.7mm',
      'five-seven',
      'sidearm',
      'dir-001',
      'retinal scan',
      'armor piercing',
      'sub-level 4'
    ],
    crucialEvidenceIds: [
      'ev-009-laptop',
      'ev-009-casing',
      'ev-009-terminal',
      'ev-009-dna'
    ],
    crucialRefutedEvidenceIds: [
      'ev-009-terminal'
    ],
    minRequiredSupportingEvidence: 3
  },
  narrativeConsequences: {
    perfect: {
      title: 'CONSPIRACY UNMASKED: PROJECT CHIMERA DISMANTLED',
      description: 'In an unprecedented joint raid by the Department of Justice Inspector General and Federal Tactical Marshals, Executive Director Vance Sterling was placed in federal custody at gunpoint inside his executive suite. The decrypted Chimera ledger exposed a fifteen-year conspiracy linking corporate murders, munitions trafficking, and municipal kickbacks across the United States. Victoria Sterling was posthumously awarded the Presidential Medal of Valor.',
      verdict: 'CONVICTION SECURED // MASTER CONSPIRACY SHATTERED'
    },
    partial: {
      title: 'DIRECTOR FORCED TO RESIGN // BUREAU COVERUP',
      description: 'Facing insurmountable forensic evidence, Vance Sterling negotiated an immediate quiet resignation with full pension protection, citing national security sensitivities. While Project Chimera was shuttered, high-level co-conspirators escaped criminal indictment.',
      verdict: 'PARTIAL JUSTICE // EXECUTIVE CLEMENCY'
    },
    failed: {
      title: 'INVESTIGATOR ARRESTED // DEEP STATE TRIUMPHS',
      description: 'Flawed case filing allowed Director Sterling to brand the investigation an attempted coup d\'état. You and your field team were stripped of security clearances, detained in solitary confinement, and the files were sealed for 75 years.',
      verdict: 'INVESTIGATION ELIMINATED // STATE TRIUMPHS'
    }
  },
  hints: {
    level1: 'Examine the Toughbook laptop found in the transit spur to uncover the financial thread linking all previous cases.',
    level2: 'Analyze the 5.7mm armor-piercing casing in the Ballistics Lab to match the unique federal weapon registration.',
    level3: 'Confront Director Vance Sterling with his biometric retinal override log from the Floor 12 executive mainframe.'
  }
};
