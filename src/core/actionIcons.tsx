/** Iconografía (Lucide) para las acciones de las prácticas de procedimiento: se elige por palabras clave. */
import {
  Activity, AlertTriangle, BookOpen, Brain, Calculator, ClipboardList, DoorOpen, Droplets, Eye, FileText, FlaskConical, Gauge, Hand, HeartPulse, LogOut,
  MapPin, MessageCircle, Microscope, Pill, Pipette, Presentation, Scale, ShieldCheck, Shirt, Syringe, TestTube, Thermometer, Timer, Trash2, Users, Utensils, Wind,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const RULES: [RegExp, LucideIcon][] = [
  [/ingerir|aliment|comer/i, Utensils],
  [/lavado|manos|higiene/i, Hand],
  [/mandil|gorro|mascarilla|guantes|epp|protecci/i, Shirt],
  [/ingres|entrada/i, DoorOpen],
  [/salida|salir/i, LogOut],
  [/bienvenida|presentaci|particip|debriefing|discut|grupo/i, Users],
  [/recorr|laboratorio|sala/i, MapPin],
  [/norma|bioseguridad|prohibid|seguridad/i, ShieldCheck],
  [/teor|formato|ficha|revisar/i, BookOpen],
  [/pregunta|retroalimentaci|resolver/i, MessageCircle],
  [/caso|an[aá]lisis|analizar|cirrosis|renal/i, Brain],
  [/calcul|c[aá]lculo|velocidad|goteo/i, Calculator],
  [/evaluaci[oó]n|informe|registr|examen|hoja/i, ClipboardList],
  [/gr[aá]fic|curva|concentraci[oó]n/i, Activity],
  [/reconoc|suero|soluci[oó]n|ringer|glucosa|salino/i, Droplets],
  [/centrifug|balance/i, Gauge],
  [/temperatura|incub|ba[nñ]o/i, Thermometer],
  [/tiempo|minuto/i, Timer],
  [/pip|dispens|aspir/i, Pipette],
  [/jeringa|punci[oó]n|inyec|extracci/i, Syringe],
  [/f[aá]rmaco|medicament|dosis|pill/i, Pill],
  [/tubo|muestra|suero/i, TestTube],
  [/reactivo|mezcla|azul/i, FlaskConical],
  [/microscop|observ/i, Microscope],
  [/peso|balanza/i, Scale],
  [/complicaci|alerta|riesgo|error/i, AlertTriangle],
  [/paciente|signos|monitor/i, HeartPulse],
  [/limpi|desech|descart/i, Trash2],
  [/aire|ventil/i, Wind],
  [/presenta/i, Presentation],
  [/ver|identific|reconocer/i, Eye],
  [/documento|texto/i, FileText],
]

export function actionIcon(label: string): LucideIcon {
  return RULES.find(([re]) => re.test(label))?.[1] ?? ClipboardList
}
