import { ToolCategory } from '../types';
import powerToolsImage from '../assets/images/regenerated_image_1787659274248.png';
import batteriesChargersImage from '../assets/images/regenerated_image_1787659277585.png';
import comboKitsImage from '../assets/images/regenerated_image_1787662197895.png';
import handToolsImage from '../assets/images/regenerated_image_1787662202557.png';
import storageImage from '../assets/images/regenerated_image_1787662206480.png';
import outdoorImage from '../assets/images/regenerated_image_1787662210518.png';
import accessoriesImage from '../assets/images/regenerated_image_1787662213971.png';

export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  shortName: string;
  description: string;
  tagline: string;
  itemCount: number;
  image: string;
  popularSubcategories: string[];
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'power-tools',
    name: 'Power Tools',
    shortName: 'Power Tools',
    description: 'High-performance cordless circular saws, hammer drills, impact drivers, grinders, and rotary hammers engineered for jobsite punishment.',
    tagline: 'Maximum Torque & Heavy Cutting',
    itemCount: 142,
    image: powerToolsImage,
    popularSubcategories: ['Circular & Miter Saws', 'Drills & Hammer Drills', 'Impact Wrenches', 'Reciprocating Saws', 'Angle Grinders']
  },
  {
    id: 'batteries-chargers',
    name: 'Batteries & Chargers',
    shortName: 'Batteries',
    description: 'Keep your crew running with 20V MAX* XR®, FLEXVOLT® 20V/60V dual-voltage battery packs, and multi-port rapid charging stations.',
    tagline: 'FLEXVOLT® & 20V MAX* Power',
    itemCount: 48,
    image: batteriesChargersImage,
    popularSubcategories: ['20V MAX* Batteries', 'FLEXVOLT® Batteries', 'Multi-Port Fast Chargers', 'USB Power Stations', 'Battery Bundles']
  },
  {
    id: 'combo-kits',
    name: 'Combo Kits',
    shortName: 'Combo Kits',
    description: 'Complete commercial 2-tool, 4-tool, and 6-tool contractor combos with high-capacity batteries, fast chargers, and rugged bags.',
    tagline: 'Best Value for Contractors',
    itemCount: 26,
    image: comboKitsImage,
    popularSubcategories: ['2-Tool Hammer/Impact Kits', '4-Tool Commercial Kits', 'FLEXVOLT® System Kits', 'Woodworking Combo Sets']
  },
  {
    id: 'hand-tools',
    name: 'Hand Tools',
    shortName: 'Hand Tools',
    description: 'ToughSeries™ tape measures, ratchets, mechanics tool sets, utility knives, pliers, and levels built with rugged steel metallurgy.',
    tagline: 'Built for Demanding Hands',
    itemCount: 88,
    image: handToolsImage,
    popularSubcategories: ['ToughSeries™ Measuring', 'Socket & Ratchet Sets', 'Wrenches & Pliers', 'Utility Knives & Blades']
  },
  {
    id: 'storage',
    name: 'Tool Storage & ToughSystem®',
    shortName: 'Storage',
    description: 'ToughSystem® 2.0 and TSTAK® modular mobile toolboxes, organizers, soft bags, and rolling mobile carts with IP65 weather seals.',
    tagline: 'Jobsite Mobility & Organization',
    itemCount: 35,
    image: storageImage,
    popularSubcategories: ['ToughSystem® 2.0', 'Rolling Mobile Boxes', 'TSTAK® Organizers', 'Contractor Bags', 'Wall Racks']
  },
  {
    id: 'outdoor',
    name: 'Outdoor Power Equipment',
    shortName: 'Outdoor',
    description: 'Gas-free commercial lawn care and property maintenance including 60V MAX* chainsaws, string trimmers, blowers, and pole saws.',
    tagline: 'Gas Power Without the Hassle',
    itemCount: 22,
    image: outdoorImage,
    popularSubcategories: ['Cordless Chainsaws', 'FLEXVOLT® String Trimmers', 'Handheld & Backpack Blowers', 'Hedge Trimmers']
  },
  {
    id: 'accessories',
    name: 'Accessories & Consumables',
    shortName: 'Accessories',
    description: 'Flextorq® screwdriving bits, SDS-plus masonry bits, carbide circular saw blades, recip blades, and diamond grinding discs.',
    tagline: 'Precision Flextorq & Blades',
    itemCount: 160,
    image: accessoriesImage,
    popularSubcategories: ['Flextorq Bit Sets', 'Carbide Saw Blades', 'SDS Masonry Bits', 'Hole Saws', 'Diamond Blades']
  },
  {
    id: 'specialty',
    name: 'Specialty Tools & Inspection',
    shortName: 'Specialty',
    description: 'Cross-line lasers, SDS rotary hammers, concrete vibrators, threaded rod cutters, and rotary drywall cut-out tools.',
    tagline: 'Specialized Trade Precision',
    itemCount: 19,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    popularSubcategories: ['Green Line Lasers', 'Rotary Concrete Hammers', 'Drywall Cut-Out Tools', 'Rebar Tier & Cutters']
  }
];
