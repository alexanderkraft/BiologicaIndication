import dupilumab from './dupilumab'
import omalizumab from './omalizumab'
import mepolizumab from './mepolizumab'
import depemokimab from './depemokimab'
import tezepelumab from './tezepelumab'
import type { BiologicProfile } from '../../types/biologic'

export const BIOLOGICS: BiologicProfile[] = [
  dupilumab,
  omalizumab,
  mepolizumab,
  depemokimab,
  tezepelumab,
]

export { dupilumab, omalizumab, mepolizumab, depemokimab, tezepelumab }
