import { TradeSolution } from '../types';

export const TRADE_SOLUTIONS: TradeSolution[] = [
  {
    id: 'construction',
    name: 'General Construction & Framing',
    iconName: 'Hammer',
    tagline: 'High-Torque Framing & Concrete Anchoring',
    description: 'Heavy-duty rear-handle worm drive saws, 3-speed hammer drills, and tough storage systems engineered to power commercial jobsites all day.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    recommendedCategory: 'power-tools',
    primaryToolIds: ['dcs577b', 'dcd996b', 'dck299p2', 'dwst08450']
  },
  {
    id: 'carpentry',
    name: 'Carpentry & Fine Finish',
    iconName: 'Ruler',
    tagline: 'Pinpoint Cross-Cutting & Delicate Fastening',
    description: '12-inch double bevel sliding compound miter saws with CUTLINE™ LED alignment, brushless compact trim routers, and precision screwdrivers.',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80',
    recommendedCategory: 'power-tools',
    primaryToolIds: ['dws780', 'dcf887b', 'dwht70275', 'dwa2t40ir']
  },
  {
    id: 'electrical',
    name: 'Electrical & Conduit',
    iconName: 'Zap',
    tagline: 'Cable Tracing, Knockouts & Fast Drilling',
    description: 'Compact ATOMIC drill drivers, 3-mode LED spotlights, step drill bits, and insulated hand tools tested to high voltage tolerances.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    recommendedCategory: 'power-tools',
    primaryToolIds: ['dcd996b', 'dcf887b', 'dcb205-2', 'dwa2t40ir']
  },
  {
    id: 'plumbing',
    name: 'Plumbing & Pipefitting',
    iconName: 'Wrench',
    tagline: 'Demolition Recip Saws & Tight-Space Wrenches',
    description: 'FLEXVOLT 60V reciprocating saws that slice through cast iron, PEX expansion tools, and heavy-duty water-resistant ToughSystem boxes.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    recommendedCategory: 'power-tools',
    primaryToolIds: ['dcs389x1', 'dcf899b', 'dwst08450', 'dcb609-2']
  },
  {
    id: 'mechanical',
    name: 'Mechanical & Automotive',
    iconName: 'Cog',
    tagline: '1,200 Ft-Lbs Breakaway Torque on Heavy Bolts',
    description: 'High-torque 1/2 in. cordless impact wrenches, slim ratchets, socket sets, and right-angle drills for industrial equipment and fleet bays.',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    recommendedCategory: 'power-tools',
    primaryToolIds: ['dcf899b', 'dcb609-2', 'dcb104', 'dwht70275']
  },
  {
    id: 'drywall',
    name: 'Drywall & Interior Remodel',
    iconName: 'Layers',
    tagline: 'High-RPM Screwguns & Dust Extraction Cutters',
    description: '4,400 RPM cordless drywall screwguns, rotary cutout tools, and lightweight ATOMIC series tools designed to minimize worker fatigue.',
    image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80',
    recommendedCategory: 'power-tools',
    primaryToolIds: ['dcf887b', 'dwa2t40ir', 'dwht70275', 'dcb205-2']
  }
];
