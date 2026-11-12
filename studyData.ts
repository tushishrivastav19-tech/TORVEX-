
export type Subject = "Physics" | "Chemistry" | "Mathematics";

export type ChapterStatus =
  | "not-started"
  | "in-progress"
  | "completed"
  | "revision-needed";

export interface Topic {
  id: string;
  name: string;
  completed: boolean;
}

export interface Chapter {
  id: string;
  subject: Subject;
  name: string;
  topics: Topic[];
  status: ChapterStatus;
  priority: "high" | "medium" | "low";
}

export interface StudyTask {
  id: string;
  title: string;
  subject: Subject;
  chapterId: string;
  activity:
    | "theory"
    | "questions"
    | "pyq"
    | "revision"
    | "mock-test"
    | "error-analysis";
  plannedMinutes: number;
  questionTarget: number;
  completed: boolean;
  date: string;
  notes: string;
}

export interface StudySession {
  id: string;
  date: string;
  subject: Subject;
  minutes: number;
  questionsAttempted: number;
  correct: number;
  incorrect: number;
}

export const subjects: Subject[] = [
  "Physics",
  "Chemistry",
  "Mathematics",
];


const syllabusData: [Subject, string, string[]][] = [
  // MATHEMATICS — 14 units
  ["Mathematics", "Sets, Relations and Functions", ["Sets and operations", "Power set", "Types of relations", "Equivalence relations", "One-one, into and onto functions", "Composition of functions"]],
  ["Mathematics", "Complex Numbers and Quadratic Equations", ["Complex numbers and Argand plane", "Algebra of complex numbers", "Modulus and argument", "Quadratic equations", "Roots and coefficients", "Nature of roots"]],
  ["Mathematics", "Matrices and Determinants", ["Types and algebra of matrices", "Determinants of order 2 and 3", "Properties and evaluation of determinants", "Area of triangle", "Adjoint and inverse", "Consistency and linear equations"]],
  ["Mathematics", "Permutations and Combinations", ["Fundamental principle of counting", "Permutations", "Combinations", "Simple applications"]],
  ["Mathematics", "Binomial Theorem", ["Binomial theorem", "General term", "Middle term", "Simple applications"]],
  ["Mathematics", "Sequence and Series", ["Arithmetic progression", "Geometric progression", "Arithmetic and geometric means", "Relation between AM and GM"]],
  ["Mathematics", "Limit, Continuity and Differentiability", ["Real-valued functions and graphs", "Limits", "Continuity", "Differentiability", "Differentiation rules", "Implicit and composite functions", "Second-order derivatives", "Rate of change", "Monotonicity", "Maxima and minima"]],
  ["Mathematics", "Integral Calculus", ["Indefinite integration", "Standard integrals", "Substitution", "Integration by parts", "Partial fractions", "Definite integrals", "Fundamental theorem of calculus", "Properties of definite integrals", "Area under curves"]],
  ["Mathematics", "Differential Equations", ["Order and degree", "Formation of differential equations", "Variable separable method", "Homogeneous differential equations", "Linear differential equations"]],
  ["Mathematics", "Coordinate Geometry", ["Cartesian coordinates", "Distance and section formula", "Locus", "Straight lines", "Slope and angle between lines", "Distance from a line", "Centroid, orthocentre and circumcentre", "Circle", "Parabola", "Ellipse", "Hyperbola"]],
  ["Mathematics", "Three Dimensional Geometry", ["Coordinates in space", "Distance and section formula", "Direction ratios and cosines", "Angle between lines", "Equation of a line", "Skew lines", "Shortest distance"]],
  ["Mathematics", "Vector Algebra", ["Scalars and vectors", "Vector addition", "Components of vectors", "Scalar product", "Vector product"]],
  ["Mathematics", "Statistics and Probability", ["Measures of dispersion", "Mean, median and mode", "Variance and standard deviation", "Mean deviation", "Probability of events", "Addition and multiplication theorems", "Bayes theorem", "Random variables and probability distribution"]],
  ["Mathematics", "Trigonometry", ["Trigonometric identities", "Trigonometric functions", "Inverse trigonometric functions", "Properties of inverse trigonometric functions"]],

  // PHYSICS — 20 units
  ["Physics", "Units and Measurements", ["SI units and systems of units", "Fundamental and derived units", "Least count and significant figures", "Errors in measurement", "Dimensions", "Dimensional analysis"]],
  ["Physics", "Kinematics", ["Frame of reference", "Motion in a straight line", "Speed and velocity", "Acceleration and graphs", "Relative velocity", "Motion in a plane", "Projectile motion", "Uniform circular motion"]],
  ["Physics", "Laws of Motion", ["Force and inertia", "Newton's laws", "Momentum and impulse", "Conservation of momentum", "Equilibrium of forces", "Static and kinetic friction", "Circular motion and centripetal force"]],
  ["Physics", "Work, Energy and Power", ["Work by constant and variable forces", "Kinetic and potential energy", "Work-energy theorem", "Power", "Spring potential energy", "Conservation of mechanical energy", "Collisions", "Vertical circular motion"]],
  ["Physics", "Rotational Motion", ["Centre of mass", "Torque and moment of force", "Angular momentum", "Conservation of angular momentum", "Moment of inertia", "Radius of gyration", "Parallel and perpendicular axes", "Rigid body equilibrium and rotation"]],
  ["Physics", "Gravitation", ["Universal law of gravitation", "Acceleration due to gravity", "Variation of g", "Kepler's laws", "Gravitational potential and energy", "Escape velocity", "Satellites and orbital velocity"]],
  ["Physics", "Properties of Solids and Liquids", ["Elasticity and stress-strain", "Hooke's law and elastic moduli", "Fluid pressure and Pascal's law", "Viscosity and Stokes' law", "Bernoulli's principle", "Surface tension and capillarity", "Thermal expansion", "Calorimetry and latent heat", "Heat transfer"]],
  ["Physics", "Thermodynamics", ["Thermal equilibrium", "Zeroth law", "Heat, work and internal energy", "First law", "Isothermal and adiabatic processes", "Second law", "Reversible and irreversible processes"]],
  ["Physics", "Kinetic Theory of Gases", ["Ideal gas equation", "Kinetic theory assumptions", "Pressure and temperature", "RMS speed", "Degrees of freedom", "Equipartition of energy", "Specific heat capacities", "Mean free path"]],
  ["Physics", "Oscillations and Waves", ["Periodic motion", "Simple harmonic motion", "Phase and time period", "Spring oscillations", "Energy in SHM", "Simple pendulum", "Wave motion", "Progressive and standing waves", "Organ pipes and strings", "Beats"]],
  ["Physics", "Electrostatics", ["Electric charge and Coulomb's law", "Superposition principle", "Electric field and field lines", "Electric dipole", "Electric flux and Gauss's law", "Electric potential", "Equipotential surfaces", "Conductors and dielectrics", "Capacitance and capacitors", "Energy stored in capacitors"]],
  ["Physics", "Current Electricity", ["Electric current and drift velocity", "Ohm's law", "Resistance and resistivity", "Series and parallel circuits", "Electrical power", "Cells and internal resistance", "Kirchhoff's laws", "Wheatstone bridge", "Metre bridge"]],
  ["Physics", "Magnetic Effects of Current and Magnetism", ["Biot-Savart law", "Ampere's law", "Magnetic force on charges", "Force on current-carrying conductors", "Torque on current loops", "Moving coil galvanometer", "Magnetic dipole", "Bar magnets", "Magnetic materials"]],
  ["Physics", "Electromagnetic Induction and Alternating Currents", ["Faraday's law", "Lenz's law", "Eddy currents", "Self and mutual inductance", "AC peak and RMS values", "Reactance and impedance", "LCR circuit and resonance", "AC power", "Generator and transformer"]],
  ["Physics", "Electromagnetic Waves", ["Displacement current", "Electromagnetic waves", "Transverse nature", "Electromagnetic spectrum", "Applications of EM waves"]],
  ["Physics", "Optics", ["Reflection and mirrors", "Refraction and lenses", "Lens maker formula", "Total internal reflection", "Prisms", "Microscope and telescope", "Huygens principle", "Interference and Young's experiment", "Diffraction", "Polarisation"]],
  ["Physics", "Dual Nature of Matter and Radiation", ["Dual nature of radiation", "Photoelectric effect", "Einstein's photoelectric equation", "Particle nature of light", "Matter waves", "de Broglie relation"]],
  ["Physics", "Atoms and Nuclei", ["Alpha-particle scattering", "Rutherford model", "Bohr model", "Energy levels and hydrogen spectrum", "Nuclear composition and size", "Mass defect and binding energy", "Nuclear fission and fusion"]],
  ["Physics", "Electronic Devices", ["Semiconductors", "P-N junction diode", "Forward and reverse bias", "Rectifiers", "LED and photodiode", "Solar cell", "Zener diode", "Logic gates"]],
  ["Physics", "Experimental Skills", ["Vernier calipers", "Screw gauge", "Simple pendulum", "Principle of moments", "Young's modulus", "Surface tension experiment", "Viscosity experiment", "Resonance tube", "Specific heat capacity", "Metre bridge and resistivity", "Ohm's law", "Galvanometer", "Focal length experiments", "Prism experiment", "Refractive index", "Diode and Zener characteristics", "Identification of electronic components"]],

  // CHEMISTRY — 20 units
  ["Chemistry", "Some Basic Concepts in Chemistry", ["Matter and its nature", "Dalton's atomic theory", "Atoms and molecules", "Laws of chemical combination", "Atomic and molecular masses", "Mole concept", "Molar mass", "Percentage composition", "Empirical and molecular formula", "Chemical equations and stoichiometry"]],
  ["Chemistry", "Atomic Structure", ["Electromagnetic radiation", "Photoelectric effect", "Hydrogen spectrum", "Bohr model", "Dual nature of matter", "de Broglie relation", "Heisenberg uncertainty principle", "Quantum mechanical model", "Quantum numbers", "Atomic orbitals", "Aufbau principle", "Pauli principle and Hund's rule", "Electronic configuration"]],
  ["Chemistry", "Chemical Bonding and Molecular Structure", ["Ionic and covalent bonds", "Lattice enthalpy", "Electronegativity and Fajan's rule", "Dipole moment", "VSEPR theory", "Valence bond theory", "Hybridisation", "Resonance", "Molecular orbital theory", "Bond order", "Metallic and hydrogen bonding"]],
  ["Chemistry", "Chemical Thermodynamics", ["System and surroundings", "State functions", "Entropy", "First law", "Work, heat and internal energy", "Enthalpy and heat capacity", "Hess's law", "Enthalpy changes", "Second law", "Spontaneity", "Gibbs energy and equilibrium"]],
  ["Chemistry", "Solutions", ["Concentration terms", "Molarity and molality", "Mole fraction", "Raoult's law", "Ideal and non-ideal solutions", "Colligative properties", "Relative lowering of vapour pressure", "Elevation and depression", "Osmotic pressure", "Van't Hoff factor"]],
  ["Chemistry", "Equilibrium", ["Dynamic equilibrium", "Physical equilibrium", "Henry's law", "Law of chemical equilibrium", "Kp and Kc", "Le Chatelier principle", "Acids and bases", "Ionisation constants", "pH", "Common ion effect", "Salt hydrolysis", "Solubility product", "Buffer solutions"]],
  ["Chemistry", "Redox Reactions and Electrochemistry", ["Oxidation and reduction", "Oxidation number", "Balancing redox reactions", "Electrolytic and metallic conduction", "Conductivity and molar conductivity", "Kohlrausch's law", "Galvanic and electrolytic cells", "Electrode potentials", "Nernst equation", "Cell potential and Gibbs energy", "Batteries and fuel cells"]],
  ["Chemistry", "Chemical Kinetics", ["Rate of reaction", "Factors affecting rate", "Order and molecularity", "Rate law and rate constant", "Zero-order reactions", "First-order reactions", "Half-life", "Arrhenius equation", "Activation energy", "Collision theory"]],
  ["Chemistry", "Classification of Elements and Periodicity in Properties", ["Modern periodic law", "Periodic table", "s, p, d and f blocks", "Atomic and ionic radii", "Ionisation enthalpy", "Electron gain enthalpy", "Valency and oxidation states", "Chemical reactivity"]],
  ["Chemistry", "p-Block Elements", ["Groups 13 to 18", "Electronic configuration", "General trends across periods", "General trends down groups", "Physical and chemical properties", "Anomalous behaviour of first elements"]],
  ["Chemistry", "d- and f-Block Elements", ["Transition elements", "Electronic configuration", "Occurrence and properties", "Oxidation states", "Colour and magnetic properties", "Catalytic behaviour", "Complex formation", "KMnO4 and K2Cr2O7", "Lanthanoids and contraction", "Actinoids"]],
  ["Chemistry", "Coordination Compounds", ["Werner's theory", "Ligands and coordination number", "Denticity and chelation", "IUPAC nomenclature", "Isomerism", "Valence bond approach", "Crystal field theory", "Colour and magnetic properties", "Applications"]],
  ["Chemistry", "Purification and Characterisation of Organic Compounds", ["Crystallisation and sublimation", "Distillation", "Differential extraction", "Chromatography", "Detection of extra elements", "Qualitative analysis", "Quantitative analysis", "Empirical and molecular formula calculations"]],
  ["Chemistry", "Some Basic Principles of Organic Chemistry", ["Tetravalency and hybridisation", "Functional groups", "Homologous series", "Structural and stereoisomerism", "IUPAC nomenclature", "Homolytic and heterolytic fission", "Reaction intermediates", "Electrophiles and nucleophiles", "Inductive and electromeric effects", "Resonance and hyperconjugation", "Organic reaction types"]],
  ["Chemistry", "Hydrocarbons", ["Classification and nomenclature", "Alkanes and conformations", "Halogenation of alkanes", "Alkenes and geometrical isomerism", "Electrophilic addition", "Markovnikov and peroxide effect", "Ozonolysis", "Alkynes", "Aromatic hydrocarbons", "Benzene and aromaticity", "Electrophilic substitution"]],
  ["Chemistry", "Organic Compounds Containing Halogens", ["Preparation of halo compounds", "Nature of carbon-halogen bond", "Properties and reactions", "Substitution mechanisms", "Uses and environmental effects"]],
  ["Chemistry", "Organic Compounds Containing Oxygen", ["Alcohols", "Phenols", "Ethers", "Aldehydes and ketones", "Nucleophilic addition", "Grignard reagent", "Oxidation and reduction", "Aldol and Cannizzaro reactions", "Haloform reaction", "Carboxylic acids and acidity"]],
  ["Chemistry", "Organic Compounds Containing Nitrogen", ["Preparation of amines", "Nomenclature and classification", "Structure and basic character", "Identification of amines", "Diazonium salts", "Synthetic importance"]],
  ["Chemistry", "Biomolecules", ["Carbohydrates", "Glucose and fructose", "Sucrose, lactose and maltose", "Amino acids and peptide bond", "Proteins and structures", "Denaturation and enzymes", "Vitamins", "DNA and RNA", "Hormones"]],
  ["Chemistry", "Principles Related to Practical Chemistry", ["Detection of extra elements", "Functional group tests", "Preparation of Mohr's salt and potash alum", "Organic compound preparations", "Acid-base titrations", "KMnO4 titrations", "Qualitative salt analysis", "Enthalpy experiments", "Preparation of sols", "Chemical kinetics experiment"]],
];

export const initialChapters: Chapter[] = syllabusData.map(
  ([subject, name, topicNames]) => {
    const legacyIds: Record<string, string> = {
      "Units and Measurements": "phy-units",
      "Laws of Motion": "phy-motion",
      "Some Basic Concepts in Chemistry": "chem-basic",
      "Atomic Structure": "chem-atomic",
      "Sets, Relations and Functions": "math-functions",
      "Matrices and Determinants": "math-matrices",
    };

    const chapterId =
      legacyIds[name] ||
      `${subject.toLowerCase()}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`;

    return {
      id: chapterId,
      subject,
      name,
      status: "not-started",
      priority: "medium",
      topics: topicNames.map((topic, index) => ({
        id: `${chapterId}-topic-${index + 1}`,
        name: topic,
        completed: false,
      })),
    };
  }
);
: StudyTask[] = [];

export const initialSessions: StudySession[] = [];

export const getChapterProgress = (chapter: Chapter): number => {
  if (chapter.topics.length === 0) return 0;
  const completed = chapter.topics.filter(
    (topic) => topic.completed
  ).length;
  return Math.round((completed / chapter.topics.length) * 100);
};

export const getSubjectProgress = (
  chapters: Chapter[],
  subject: Subject
): number => {
  const selected = chapters.filter(
    (chapter) => chapter.subject === subject
  );
  if (selected.length === 0) return 0;

  const total = selected.reduce(
    (sum, chapter) => sum + getChapterProgress(chapter),
    0
  );

  return Math.round(total / selected.length);
};

export const getStudyStats = (sessions: StudySession[]) => {
  const totalMinutes = sessions.reduce(
    (sum, session) => sum + session.minutes,
    0
  );

  const attempted = sessions.reduce(
    (sum, session) => sum + session.questionsAttempted,
    0
  );

  const correct = sessions.reduce(
    (sum, session) => sum + session.correct,
    0
  );

  const incorrect = sessions.reduce(
    (sum, session) => sum + session.incorrect,
    0
  );

  const accuracy =
    correct + incorrect > 0
      ? Math.round((correct / (correct + incorrect)) * 100)
      : 0;

  return {
    totalMinutes,
    totalHours: Math.round((totalMinutes / 60) * 10) / 10,
    questionsAttempted: attempted,
    correct,
    incorrect,
    accuracy,
  };
};

