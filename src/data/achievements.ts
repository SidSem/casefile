import { Achievement } from '../types/investigator';

export const MASTER_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_blood',
    title: 'First Blood',
    description: 'Submit your first completed case investigation to the Federal Archive.',
    iconName: 'ShieldAlert',
  },
  {
    id: 'sharp_eye',
    title: 'Sharp Eye',
    description: 'Discover all concealed forensic details and hidden evidence layers.',
    iconName: 'Eye',
  },
  {
    id: 'no_loose_ends',
    title: 'No Loose Ends',
    description: 'Close an investigation successfully without requesting a single hint.',
    iconName: 'FileCheck',
  },
  {
    id: 'human_lie_detector',
    title: 'Human Lie Detector',
    description: 'Expose all contradictory statements during suspect interrogations.',
    iconName: 'Mic',
  },
  {
    id: 'master_detective',
    title: 'Master Detective',
    description: 'Achieve a 900+ Elite Investigator score with a Perfect verdict.',
    iconName: 'Award',
  },
  {
    id: 'forensic_prodigy',
    title: 'Forensic Prodigy',
    description: 'Complete photo, document, DNA, and fingerprint examinations in the Evidence Lab.',
    iconName: 'Microscope',
  },
  {
    id: 'the_ninth_key',
    title: 'The Ninth Key',
    description: 'Gain Level 4 clearance and unlock CASE 009: The Ninth File.',
    iconName: 'Key',
  },
  {
    id: 'deep_state_unmasked',
    title: 'Deep State Unmasked',
    description: 'Crack the conspiracy inside CASE 009 and expose Project Chimera.',
    iconName: 'FolderLock',
  }
];
