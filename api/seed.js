const mongoose = require('mongoose');
const ClimateChange = require('./models/ClimateChange');
const Disaster = require('./models/Disaster');

require('dotenv').config();

const climateChangeData = [
  {
    name: "Global Warming",
    description: "Global warming refers to the long-term increase in Earth's average surface temperature due to human activities, particularly the release of greenhouse gases like carbon dioxide (CO₂), methane (CH₄), and nitrous oxide (N₂O). These gases trap heat in the atmosphere, creating a greenhouse effect that warms the planet.",
    causes: [
      {
        name: "Green House Gas Emissions",
        description: "Indonesia is one of the world's top 10 greenhouse gas emitters. The country's emissions account for 34% of the global emissions caused by land use, land use change, and forestry (LULUCF)."
      },
      {
        name: "Deforestation",
        description: "Indonesia's forests are being cut down to make way for agriculture and other development. Carbon-rich peatlands are being cleared for agriculture, making them more vulnerable to fires that release large amounts of carbon into the atmosphere."
      },
      {
        name: "Industrial processes",
        description: "Various industrial activities release greenhouse gases, such as methane and carbon dioxide, into the atmosphere."
      }
    ],
    images: "/global_warming.jpg", // Sample image URL
  },
  {
    name: "Earthquakes",
    description: "Indonesia is one of the most seismically active regions in the world, frequently experiencing earthquakes due to its position along the Pacific Ring of Fire, a horseshoe-shaped zone known for frequent seismic activity and volcanic eruptions. This geological setting results in constant tectonic movement, making earthquakes a common natural event. In Indonesia, earthquakes vary in intensity, from mild tremors to massive quakes, often followed by secondary disasters like tsunamis, landslides, and liquefaction.",
    causes: [
      {
        name: "Tectonic Plate Boundaries",
        description: "Indonesia sits at the convergence of several tectonic plates—the Indo-Australian Plate, Eurasian Plate, and the Pacific Plate. As these plates move and collide, stress builds up and is eventually released in the form of seismic waves, causing an earthquake."
      },
      {
        name: "Subduction Zones",
        description: "The Indo-Australian Plate is being forced under the Eurasian Plate in a process called subduction. This movement generates powerful earthquakes along subduction zones. The Sumatra-Andaman subduction zone, for example, was responsible for the devastating 2004 earthquake and tsunami."
      },
      {
        name: "Volcanic Activity",
        description: "Indonesia is home to over 130 active volcanoes. Volcanic activity, such as magma movement beneath the Earth’s crust, can cause minor earthquakes known as volcanic earthquakes. These are usually less intense but can indicate larger tectonic disturbances."
      },
      {
        name: "Fault Lines",
        description: "Indonesia has many active fault lines, such as the Sumatran Fault and Palu-Koro Fault. Movement along these faults generates frequent seismic activity. The Palu-Koro Fault, for example, was responsible for the 2018 earthquake and tsunami in Palu, Central Sulawesi."
      }
    ],
    images: "/earthquake.jpg", // Sample image URL
  },
  {
    name: "Rising Sea Levels",
    description: "Indonesia, with its extensive coastlines and numerous islands, is highly vulnerable to rising sea levels caused by climate change. Global warming, due to human activity, is melting polar ice caps and glaciers while thermal expansion of the oceans increases the volume of water, leading to higher sea levels. In addition, land subsidence in major urban areas like Jakarta exacerbates the effects.",
    causes: [
      {
        name: "Land Subsidence",
        description: "Excessive groundwater extraction in cities like Jakarta causes the ground to sink, making coastal areas more vulnerable to flooding."
      },
      {
        name: "Melting Ice Caps",
        description: "The melting of polar ice contributes to the rise in global sea levels."
      },
      {
        name: "Thermal Expansion",
        description: "In the context of seawater, thermal expansion refers to the increase in the volume of water as it warms due to global warming. This expansion contributes to rising sea levels, which is one of the major factors driving coastal flooding and erosion."
      }
    ],
    images: "/rising_sea_level.jpg", // Sample image URL
  },
  {
    name: "Extreme Weather Events",
    description: "Indonesia, situated in a tropical climate zone, faces increasingly intense extreme weather events, including cyclones, heavy storms, and floods, often influenced by climate change and warmer ocean temperatures.",
    causes: [
      {
        name: "Warmer Sea Surface Temperatures",
        description: "Indonesia's warm seas fuel the intensity of tropical cyclones and storms, as warmer water increases evaporation, creating stronger winds and heavier rainfall."
      },
      {
        name: "Changing Weather Patterns",
        description: "Climate change affects atmospheric systems, leading to shifts in monsoons and more intense, unpredictable weather patterns."
      },
    ],
    images: "/extreme_weather.avif", // Sample image URL
  },
  {
    name: "Volcanic Erruptions",
    description: "Indonesia is located within the Pacific Ring of Fire, an area with frequent seismic and volcanic activity. The country has more than 130 active volcanoes, making it one of the most volcanically active regions in the world. These volcanoes are primarily located along the Sunda Arc, a region where the Indo-Australian and Eurasian tectonic plates meet. Volcanic eruptions in Indonesia can be highly explosive, affecting large areas and leading to multiple types of disasters. These eruptions are often accompanied by lava flows, pyroclastic flows, ash clouds, and tsunamis, all of which contribute to widespread destruction.",
    causes: [
      {
        name: "Tectonic Activity",
        description: "The primary cause of volcanic eruptions in Indonesia is tectonic movement. The Indo-Australian plate is moving northward, subducting beneath the Eurasian plate. This subduction causes magma to rise through the Earth's crust, leading to volcanic activity."
      },
      {
        name: "Magma Chamber Pressure:",
        description: "Over time, magma accumulates in chambers beneath the volcano. If the pressure becomes too great, the magma can force its way to the surface, resulting in an eruption."
      },
      {
        name: "Volcanic Gas Accumulation",
        description: "Volcanic gases, primarily water vapor, carbon dioxide, sulfur dioxide, and methane, can build up within the magma chamber. The release of these gases during an eruption can significantly increase the force and intensity of the eruption."
      }
    ],
    images: "/volcano.jpg", // Sample image URL
  },
  {
    name: "Ocean Acidification",
    description: "The acidification of Indonesian oceans endangers its marine ecosystems, notably coral reefs that host diverse marine species and support the livelihoods of coastal communities.",
    causes: [
      {
        name: "Rising Sea Temperatures",
        description: "As ocean temperatures rise due to global warming, coral reefs experience stress and expel the algae living inside them, leading to coral bleaching."
      },
      {
        name: "Increased CO₂ Levels",
        description: "More carbon dioxide in the atmosphere leads to higher concentrations of carbonic acid in oceans, making them more acidic. This weakens coral skeletons and affects marine biodiversity."
      },
    ],
    images: "/ocean_acidification.png", // Sample image URL
  },
  {
    name: "Forest Fires",
    description: "Forest fires in Indonesia, especially in Sumatra and Kalimantan, are exacerbated by climate change. These fires are primarily caused by land clearance for palm oil plantations but are made more severe by prolonged droughts and higher temperatures. The resulting haze can affect air quality across the region, leading to health hazards.",
    causes: [
      {
        name: "Deforestation for Agriculture",
        description: "Land clearance for palm oil and timber plantations often involves burning, which increases the risk of large-scale forest fires."
      },
      {
        name: "Drought",
        description: "Hotter, drier conditions from climate change make forests more susceptible to fires. These periodic climate patterns exacerbate dry conditions, worsening the frequency and intensity of fires."
      },
    ],
    images: "/forest_fires.jpg", // Sample image URL
  },
  // {
  //   name: "Shifting Ecosystems and Biodiversity Loss",
  //   description: " Indonesia’s rich biodiversity is under threat as climate zones shift and habitats become less hospitable. Endangered species face greater risks, and ecosystems struggle to adapt.",
  //   causes: [
  //     {
  //       name: "Rising Temperatures and Changing Rainfall",
  //       description: "These shifts force species to migrate or adapt, which many cannot do quickly enough, leading to ecosystem imbalances."
  //     },
  //     {
  //       name: "Deforestation and Habitat Loss",
  //       description: "Logging, mining, and agricultural expansion destroy habitats and reduce biodiversity, compounding the effects of climate change." 
  //     },
  //   ],
  //   images: "/shifting_ecosystems.jpg", // Sample image URL
  // },
];

const disasterData = [
  {
    name: "Coastal Flooding",
    description: "As sea levels rise, coastal areas experience more frequent and severe flooding, especially during high tides and storm surges. In Jakarta, for example, the combination of land subsidence and rising sea levels results in sinking areas, worsening the severity of floods.",
    regionsAffected: [
      { region: "Jakarta", description: "Jakarta faces extreme flooding due to a combination of rising sea levels and land subsidence." },
      { region: "Surabaya", description: "Surabaya's coastal areas are at risk from frequent flooding and storm surges." }
    ],
    impacts: [
      { name: "Infrastructure Damage", description: "Roads, buildings, and sewage systems suffer from constant exposure to saltwater, leading to rapid degradation." },
      { name: "Economic Loss", description: "Coastal businesses, tourism, and fishing industries face disruptions and higher operational costs." },
      { name: "Displacement", description: "Increased flooding forces communities to relocate, especially those with low-income households." }
    ],
    mitigationAndHandling: [
      { name: "Seawalls and Dikes", description: "Construction of protective barriers to block water, though this is a temporary solution as rising seas may eventually surpass these barriers." },
      { name: "Improved Drainage Systems", description: "Upgrading urban drainage and wastewater systems helps manage excess water and prevents pooling." }
    ],
    images: '/coastal_flooding.jpg',
    climateChange: null  // Placeholder for later association
  },
  {
    name: "Tidal Inundation",
    description: "Tidal inundation, also called “tidal flooding,” occurs when coastal areas flood during high tides due to elevated sea levels. In some regions, this has become a daily occurrence, impacting agriculture and settlements.",
    regionsAffected: [
      {
        region: "Sumatra’s Eastern Coastline",
        description: "Known for its vast mangrove forests and rich biodiversity, this coastline suffers from tidal inundation, which threatens ecosystems, agricultural land, and settlements. The saltwater intrusion has become a persistent issue, affecting both local farmers and the fishing industry."
      },
      {
        region: "Northern Coast of Java",
        description: "This region experiences regular flooding during high tides. The combination of rising sea levels and land subsidence intensifies the frequency of tidal inundation, significantly impacting agriculture, settlements, and the livelihoods of local communities."
      }
    ],
    impacts: [
      {
        name: "Infrastructure Damage",
        description: "Roads, buildings, and sewage systems suffer from constant exposure to saltwater, leading to rapid degradation."
      },
      {
        name: "Economic Loss",
        description: "Coastal businesses, tourism, and fishing industries face disruptions and higher operational costs."
      },
      {
        name: "Displacement",
        description: "Increased flooding forces communities to relocate, especially those with low-income households."
      }
    ],
    mitigationAndHandling: [
      {
        name: "Mangrove Restoration",
        description: "Planting mangrove forests acts as a natural barrier, reducing tidal force and preventing soil erosion.Salt-Tolerant Crops: Cultivating salt-resistant crops in affected regions can maintain agricultural productivity."
      },
      {
        name: "Ground Water Management",
        description: "Reducing groundwater extraction prevents further land subsidence, lowering the risk of tidal flooding. Seawater Desalination Plants: Setting up desalination plants to provide clean drinking water in areas affected by saltwater intrusion."
      }
    ],
    images: '/tidal_inudation.jpg',
    climateChange: null  // Placeholder for later association
  },
  {
    name: "Erosion and Loss of Coastal Land",
    description: "Rising sea levels increase wave action along coastlines, accelerating the erosion of beaches and coastal land. This loss of land encroaches on residential and agricultural zones, resulting in long-term displacement of communities and economic challenges.",
    regionsAffected: [
      {
        region: "Bali",
        description: "Known for its beaches and tourism, Bali's coastline suffers from both natural erosion and the impact of coastal development. The erosion here threatens tourism, as beaches shrink and infrastructures, such as hotels and restaurants, become vulnerable to encroaching waters."
      },
      {
        region: "Nusa Tenggara",
        description: "This island region is increasingly affected by erosion due to its exposure to powerful ocean currents and limited natural barriers. The erosion disrupts local fishing communities and reduces land available for housing and agriculture, which are key to the region's economy."
      }
    ],
    impacts: [
      {
        name: "Land Loss",
        description: "Erosion removes valuable land, especially in densely populated coastal areas, forcing people to move inland or adapt to shrinking spaces."
      },
      {
        name: "Habitat Destruction",
        description: "Important ecosystems, including mangroves, beaches, and coral reefs, are destroyed, impacting biodiversity and tourism."
      },
      {
        name: "Increased Vulnerability",
        description: "With natural barriers eroded, remaining land and properties become more exposed to further erosion and flooding."
      }
    ],
    mitigationAndHandling: [
      {
        name: "Beach Nourishment",
        description: "Adding sand to eroded beaches restores land and provides temporary relief, though this process requires regular maintenance.",
      },
      {
        name: "Living Shorelines",
        description: "Constructing natural buffers, such as mangroves and reefs, to stabilize the coastline and absorb wave energy."
      },
      {
        name: "Restricting Coastal Development",
        description: "Policies that limit construction near vulnerable coastal areas help reduce human impact on erosion-prone regions."
      },
      {
        name: "Community Relocation and Planning",
        description: "Investing in strategic relocation plans for communities and infrastructure at risk of future erosion can mitigate long-term displacement."
      }
    ],
    images: '/coastal_erosion.webp',
    climateChange: null  // Placeholder for later association
  },
  {
    name: "Tsunami",
    description: "Tsunamis are large ocean waves that are typically triggered by undersea earthquakes, particularly those occurring at subduction zones. These waves can travel at speeds of up to 500 miles per hour in deep water, and when they reach shallow coastal areas, they can increase in height, causing catastrophic flooding. Indonesia’s extensive coastline makes it highly vulnerable to tsunamis, with waves reaching coastal areas within minutes of an offshore earthquake.",
    regionsAffected: [
      {
        region: "Aceh (Sumatra)",
        description: "Aceh is one of the most vulnerable regions due to its proximity to the Sunda Trench, where the Indo-Australian Plate subducts beneath the Eurasian Plate. The 2004 Indian Ocean earthquake off the coast of Sumatra generated a massive tsunami, devastating Aceh and causing widespread destruction."
      },
      {
        region: "West Sumatra and Northern Java",
        description: "These regions are also at risk from tsunamis triggered by undersea earthquakes along the Sunda Trench."
      }
    ],
    impacts: [
      {
        name: "Destruction of Infrastructure",
        description: "Tsunamis cause massive flooding, destroying buildings, bridges, roads, and utilities. Coastal cities like Banda Aceh were left in ruins."
      },
      {
        name: "Loss of Life",
        description: "Tsunamis are capable of sweeping entire communities away, leading to thousands of casualties, including those caught in the tsunami’s aftermath."
      },
      {
        name: "Displacement of Communities",
        description: "Tsunami waves force thousands of people to relocate, leading to long-term displacement and challenges with providing adequate shelter."
      }
    ],
    mitigationAndHandling: [
      {
        name: "Early Warning Systems",
        description: "Developing and improving tsunami early warning systems that can detect seismic activity and predict potential tsunamis. The 2004 disaster showed the need for a more robust system to alert coastal populations."
      },
      {
        name: "Coastal Infrastructure Resilience",
        description: "Building tsunami-resistant infrastructure such as elevated buildings and reinforced structures. Coastal communities can be better protected by designing structures that can withstand wave impact."
      },
      {
        name: "Community Education and Preparedness",
        description: "Local populations should be trained on tsunami evacuation procedures and emergency plans. Establishing tsunami evacuation routes and safe zones along coastlines is crucial."
      }
    ],
    images: '/tsunami.webp',
    "climateChange": null
  },
  {
    name: "Liquefaction",
    description: "Liquefaction occurs when water-saturated, loosely packed soils lose their strength due to the intense shaking of an earthquake, causing them to behave like liquid. This can cause buildings and infrastructure to sink, tilt, or collapse. Liquefaction is more likely to occur in regions with soft soils and high water content, especially in low-lying coastal areas or river valleys.",
    regionsAffected: [
      {
        region: "Palu, Central Sulawesi (2018)",
        description: "During the 2018 Palu earthquake, widespread liquefaction occurred, especially in the coastal area of Palu. The ground turned to mud, causing neighborhoods to collapse, infrastructure to sink, and lives to be lost."
      },
      {
        region: "Jakarta and Surabaya",
        description: "These areas are also at risk because they are built on soft, water-saturated soil."
      }
    ],
    impacts: [
      {
        name: "Infrastructure Collapse",
        description: "Roads, buildings, and bridges may sink or tilt, causing significant destruction and making the areas uninhabitable."
      },
      {
        name: "Displacement",
        description: "Communities are forced to leave areas affected by liquefaction, which can lead to long-term displacement and challenges in rebuilding."
      },
      {
        name: "Casualties and Property Damage",
        description: "The sudden and violent nature of liquefaction often results in casualties, particularly when buildings collapse, or vehicles and people get trapped."
      }
    ],
    mitigationAndHandling: [
      {
        name: "Soil Stabilization",
        description: "Strengthening and stabilizing soil through techniques like soil compaction, deep foundation systems, or injecting stabilizing materials can reduce the risk of liquefaction."
      },
      {
        name: "Urban Planning",
        description: "Avoiding construction in areas known to be at high risk for liquefaction, particularly in low-lying regions with high groundwater levels."
      },
      {
        name: "Building Codes",
        description: "Implementing strict building codes that require structures to be reinforced against soil instability. Foundations should be designed to prevent sinking or tilting during liquefaction events."
      }
    ],
    images: '/liquefaction.jpeg',
    climateChange: null
  },
  {
    name: "Landslides",
    description: "Earthquakes, particularly those in mountainous or hilly regions, can trigger landslides. The shaking destabilizes slopes, causing soil, rocks, and debris to slide downhill. In Indonesia, where many populated areas are located near or within mountainous regions, landslides can cause significant destruction, particularly in the aftermath of an earthquake.",
    regionsAffected: [
      {
        region: "Yogyakarta (2006)",
        description: "The 2006 Yogyakarta earthquake caused extensive landslides in the hilly regions, blocking roads, trapping communities, and causing significant disruption to the region."
      },
      {
        region: "West Java",
        description: "Earthquake-triggered landslides are also a concern in the hilly regions of West Java, where steep slopes and weak soil make landslides more likely."
      }
    ],
    impacts: [
      {
        name: "Obstructed Roads and Rescue Efforts",
        description: "Landslides often block roads and transportation routes, making it difficult for emergency services to access affected areas and provide aid."
      },
      {
        name: "Loss of Life",
        description: "Landslides can bury villages and settlements, particularly in rural areas, leading to loss of life and injuries."
      },
      {
        name: "Agricultural Damage",
        description: "Landslides destroy agricultural land and can change the course of rivers, affecting local farming communities."
      }
    ],
    mitigationAndHandling: [
      {
        name: "Slope Stabilization",
        description: "Installing retaining walls, terracing, and other slope stabilization techniques to reduce the likelihood of landslides in high-risk areas."
      },
      {
        name: "Early Warning Systems",
        description: "Developing early warning systems to detect seismic activity and predict potential landslides, especially in areas where earthquakes are likely to cause slope instability."
      },
      {
        name: "Land Use Planning",
        description: "Avoiding construction in landslide-prone areas, particularly near steep slopes or along known fault lines."
      }
    ],
    images: '/landslides.jpeg',
    climateChange: null
  },
  {
    name: "Building and Infrastructure Collapse",
    description: "Strong ground shaking during an earthquake can cause buildings, bridges, roads, and other structures to collapse, especially when they are poorly constructed. In densely populated areas, the collapse of buildings can result in massive casualties and widespread destruction.",
    regionsAffected: [
      {
        region: "Lombok (2018)",
        description: "The 2018 Lombok earthquakes led to the collapse of hundreds of buildings, many of which were not built to withstand seismic activity. Thousands were displaced, and there were significant economic losses."
      },
      {
        region: "Jakarta",
        description: "The capital city of Indonesia is home to a large number of high-rise buildings and infrastructure that are susceptible to collapse during an earthquake, particularly older structures that don’t adhere to modern earthquake-resistant building codes."
      }
    ],
    impacts: [
      {
        name: "Immediate Casualties",
        description: "The collapse of buildings leads to immediate fatalities and injuries, particularly in densely populated areas."
      },
      {
        name: "Economic Losses",
        description: "The destruction of infrastructure and buildings results in long-term economic losses, as businesses are forced to shut down, and rebuilding takes time."
      },
      {
        name: "Displacement and Homelessness",
        description: "The collapse of homes and buildings leaves large numbers of people without shelter, causing mass displacement."
      }
    ],
    mitigationAndHandling: [
      {
        name: "Seismic-Resistant Building Codes",
        description: "Enforcing strict building codes that require earthquake-resistant designs, including reinforced concrete, steel frames, and flexible foundations."
      },
      {
        name: "Retrofitting Buildings",
        description: "Retrofitting older buildings to bring them up to current seismic standards can help prevent catastrophic collapse during an earthquake."
      },
      {
        name: "Public Awareness and Emergency Response",
        description: "Educating the public on earthquake preparedness and evacuation procedures, and ensuring emergency services are equipped to respond quickly to structural collapses."
      }
    ],
    climateChange: null
  },
  {
    name: "Flooding",
    description: "Flooding in Indonesia is commonly caused by heavy rainfall, rapid urbanization, and the inability of drainage systems to cope with large volumes of rain. Extreme weather events like tropical storms and cyclones exacerbate flooding, especially during the rainy season (November to March).",
    regionsAffected: [
      {
        region: "Jakarta",
        description: "As the capital, Jakarta is highly vulnerable to flooding due to its dense population and poor drainage systems. River systems like the Ciliwung are prone to overflow."
      },
      {
        region: "Banten and West Java",
        description: "These areas often experience flash floods and inundation due to mountain runoff combined with heavy rainfall."
      }
    ],
    impacts: [
      {
        name: "Loss of Lives",
        description: "Flash floods can sweep away homes, people, and livestock."
      },
      {
        name: "Infrastructure Damage",
        description: "Roads, bridges, and homes are damaged, disrupting transportation and daily life."
      },
      {
        name: "Economic Loss",
        description: "Damage to crops, businesses, and industries results in significant financial losses."
      }
    ],
    mitigationAndHandling: [
      {
        name: "Improved Drainage Systems",
        description: "Upgrading and maintaining drainage infrastructure to prevent water from accumulating in urban areas."
      },
      {
        name: "Flood Barriers",
        description: "Installing barriers and levees along rivers and coastlines to protect urban centers."
      },
      {
        name: "Early Warning Systems",
        description: "Implementing early warning systems to notify citizens about impending floods and prompt evacuations."
      },
      {
        name: "Reforestation",
        description: "Promoting reforestation in upstream areas to reduce the flow of excess water into downstream regions."
      }
    ],
    images: '/floods.jpg',
    climateChange: null
  },
  {
    name: "Tropical Cyclones",
    description: "Tropical cyclones, locally known as 'hurricanes' or 'typhoons,' are strong wind systems that bring heavy rainfall and storm surges to coastal areas. These storms are common during the monsoon season, from December to March, and are often accompanied by high winds, heavy rains, and sea surges.",
    regionsAffected: [
      {
        region: "Sumatra and Java",
        description: "Coastal areas in Sumatra and Java are vulnerable to tropical cyclones, with waves and winds potentially reaching catastrophic levels."
      },
      {
        region: "Kalimantan",
        description: "The southern part of Borneo is also affected by cyclonic storms."
      }
    ],
    impacts: [
      {
        name: "Storm Surges and Coastal Erosion",
        description: "High winds and waves cause storm surges, flooding low-lying coastal areas, and eroding shorelines."
      },
      {
        name: "Agricultural Damage",
        description: "Crops like rice, corn, and fruits are destroyed by the heavy rainfall and flooding."
      },
      {
        name: "Displacement of Communities",
        description: "Communities along coastal areas are displaced due to rising waters and damaged infrastructure."
      }
    ],
    mitigationAndHandling: [
      {
        name: "Cyclone Shelters",
        description: "Building cyclone-resistant shelters to house displaced populations during storms."
      },
      {
        name: "Coastal Defenses",
        description: "Constructing sea walls and breakwaters to reduce the impact of storm surges."
      },
      {
        name: "Climate-Resilient Infrastructure",
        description: "Ensuring that critical infrastructure such as hospitals and schools are built to withstand cyclonic conditions."
      }
    ],
    images: '/cyclones.jpg',
    climateChange: null
  },
  {
    name: "Droughts",
    description: "Droughts in Indonesia are typically caused by long periods of below-average rainfall, exacerbated by the El Niño phenomenon. Droughts impact water resources, agriculture, and ecosystems.",
    regionsAffected: [
      {
        region: "East Java",
        description: "This region faces severe drought conditions due to its proximity to the dry season in the eastern part of Indonesia."
      },
      {
        region: "Nusa Tenggara (East Nusa Tenggara)",
        description: "This area frequently suffers from prolonged dry spells and water shortages, making it one of the driest regions in Indonesia."
      }
    ],
    impacts: [
      {
        name: "Water Shortages",
        description: "Drought leads to reduced water supply for drinking and agriculture."
      },
      {
        name: "Crop Failure",
        description: "The agricultural sector is heavily affected, with rice and maize being the most vulnerable crops."
      },
      {
        name: "Livestock Losses",
        description: "Reduced water availability leads to the death of livestock and decreases in food production."
      }
    ],
    mitigationAndHandling: [
      {
        name: "Water Conservation Measures",
        description: "Promoting water-saving irrigation techniques such as drip irrigation."
      },
      {
        name: "Drought-Resistant Crops",
        description: "Encouraging the planting of drought-resistant varieties of rice and other staple crops."
      },
      {
        name: "Rainwater Harvesting",
        description: "Implementing rainwater harvesting systems to store water during wet periods for use during dry spells."
      },
      {
        name: "Reforestation",
        description: "Preventing deforestation and promoting forest management to help maintain natural water cycles."
      }
    ],
    images: '/droughts.jpg',
    climateChange: null
  },
  {
    name: "Coral Reef Bleaching",
    description: "Coral reefs are particularly vulnerable to ocean acidification. The process of ocean acidification disrupts the ability of corals to form their calcium carbonate skeletons, weakening them and making them more susceptible to bleaching. This happens when corals expel the algae living in their tissues due to stress, turning them white and leaving them vulnerable to disease and death.",
    regionsAffected: [
      {
        region: "Bali",
        description: "The coral reefs around Bali are heavily impacted by rising ocean acidity, affecting both tourism and the local fishing industry."
      },
      {
        region: "Sulawesi",
        description: "Known for its diverse coral reefs, the Sulawesi region faces major risks from coral bleaching."
      },
      {
        region: "Papua New Guinea",
        description: "Though not part of Indonesia, this region shares the same oceanic systems as parts of Indonesia and is similarly affected by acidification."
      }
    ],
    impacts: [
      {
        name: "Biodiversity loss",
        description: "Coral reefs are home to diverse marine species, and their degradation can lead to a loss of marine biodiversity, which affects local ecosystems and food chains."
      },
      {
        name: "Economic loss",
        description: "Coral reefs are critical to local economies, particularly in coastal areas where tourism and fishing are major industries. Coral bleaching can lead to decreased fish stocks, affecting both commercial and subsistence fishing."
      }
    ],
    mitigationAndHandling: [
      {
        name: "Marine protected areas (MPAs)",
        description: "Establishing MPAs can help reduce additional stressors on coral reefs, giving them a better chance to recover."
      },
      {
        name: "Restoration projects",
        description: "Active restoration efforts, such as coral planting and the development of acid-resistant coral species, can help recover damaged reefs."
      },
      {
        name: "Reducing CO2 emissions",
        description: "On a global scale, reducing emissions is essential to slow the pace of acidification and give coral reefs a better chance of survival."
      }
    ],
    images: '/coral_bleaching.avif',
    climateChange: null
  },
  {
    name: "Decline in Fish Stocks",
    description: "Ocean acidification impairs the ability of marine species, such as fish and shellfish, to build their shells and skeletons. Acidification affects the growth, reproduction, and survival rates of marine organisms, particularly those at the base of the food chain, like plankton and mollusks.",
    regionsAffected: [
      {
        region: "Java Sea",
        description: "This area, home to many fishing communities, faces a significant decrease in fish populations due to the impacts of ocean acidification."
      },
      {
        region: "Banda Sea",
        description: "A rich fishing ground that supports many coastal communities in Indonesia, which is seeing declining fish stocks because of acidification affecting marine life."
      }
    ],
    impacts: [
      {
        name: "Reduced fish availability",
        description: "As fish populations decline, local fisheries suffer, leading to reduced food availability and income for coastal communities."
      },
      {
        name: "Economic stress on local communities",
        description: "Fishing communities that rely on fish for their livelihood are disproportionately affected, facing food insecurity and economic hardship."
      }
    ],
    mitigationAndHandling: [
      {
        name: "Sustainable fisheries management",
        description: "Implementing stricter fishing regulations and creating sustainable fisheries can help alleviate pressure on fish stocks."
      },
      {
        name: "Aquaculture development",
        description: "Promoting aquaculture as an alternative source of protein can help maintain food security for coastal populations."
      },
      {
        name: "Monitoring and research",
        description: "Continuous monitoring of fish populations and ocean acidification levels can guide sustainable fishing practices and policy decisions."
      }
    ],
    images: '/fish_population.jpg',
    climateChange: null
  },
  {
    name: "Decline in Shellfish Populations",
    description: "Shellfish, including clams, oysters, and mussels, are particularly sensitive to ocean acidification. As the ocean becomes more acidic, it becomes harder for shellfish to form their calcium carbonate shells, resulting in weaker and smaller populations.",
    regionsAffected: [
      {
        region: "Aceh",
        description: "This region, known for its shellfish harvesting industry, faces significant losses due to reduced shellfish population, which are directly linked to acidification."
      },
      {
        region: "Sumatra Coast",
        description: "Another key region for shellfish production, this area is seeing negative impacts on mollusk populations, leading to economic losses in both coastal and inland markets."
      }
    ],
    impacts: [
      {
        name: "Economic losses in aquaculture",
        description: "The decline in shellfish populations affects local aquaculture businesses that rely on healthy mollusk populations for production."
      },
      {
        name: "Ecosystem imbalance",
        description: "As shellfish play a role in filtering water and supporting other marine life, their decline disrupts the entire coastal ecosystem."
      }
    ],
    mitigationAndHandling: [
      {
        name: "Shellfish farming adaptations",
        description: "Developing acid-resistant shellfish species or enhancing aquaculture systems that mitigate the effects of acidification can help maintain shellfish production."
      },
      {
        name: "Restoration of habitats",
        description: "Protecting and restoring habitats such as seagrass meadows can buffer some of the impacts of acidification on shellfish."
      },
      {
        name: "Local adaptation strategies",
        description: "Training local communities in sustainable aquaculture techniques can help them cope with the effects of acidification."
      }
    ],
    images: '/fish_population.jpg',
    climateChange: null
  },
  {
    "name": "Lava Flows",
    "description": "Lava flows are one of the most immediate and visible impacts of a volcanic eruption. Molten rock flows down the sides of the volcano, destroying everything in its path. These flows can cover large areas, especially in the case of shield volcanoes, where the lava spreads over wide distances.",
    "regionsAffected": [
      {
        "region": "Mount Merapi (Java)",
        "description": "Known for frequent eruptions, Merapi produces fast-moving lava flows that can travel down its slopes, impacting nearby villages and agricultural land."
      },
      {
        "region": "Mount Sinabung (Sumatra)",
        "description": "Sinabung has erupted multiple times since 2010, producing lava flows that have damaged homes and infrastructure."
      }
    ],
    "impacts": [
      {
        "name": "Destruction of Property and Livelihoods",
        "description": "Lava flows can destroy homes, crops, infrastructure, and farmland, leading to displacement and loss of livelihood for affected communities."
      },
      {
        "name": "Loss of Life",
        "description": "Fast-moving lava can quickly engulf villages, leading to fatalities among residents who are unable to evacuate in time."
      },
      {
        "name": "Environmental Damage",
        "description": "Lava flows can alter landscapes and destroy ecosystems, particularly forests and agricultural lands."
      }
    ],
    "mitigationAndHandling": [
      {
        "name": "Evacuation Plans",
        "description": "Establishing effective evacuation systems and providing early warnings can reduce fatalities. Local authorities need to identify risk zones and implement evacuation drills."
      },
      {
        "name": "Land Use Restrictions",
        "description": "Avoiding the construction of homes and critical infrastructure in high-risk areas can mitigate the impact of lava flows."
      },
      {
        "name": "Volcanic Monitoring",
        "description": "Continuous monitoring of volcanic activity can provide early signs of potential eruptions, allowing for timely evacuations."
      }
    ],
    "images": '/lava_flows.jpg',
    "climateChange": null
  },
  {
    "name": "Pyroclastic Flows",
    "description": "Pyroclastic flows are fast-moving currents of hot gas, ash, and volcanic rock that flow down the sides of a volcano. These flows can reach speeds of up to 700 km/h and temperatures of over 1,000°C, making them extremely dangerous.",
    "regionsAffected": [
      {
        "region": "Mount Merapi (Java)",
        "description": "Merapi has produced several pyroclastic flows that have devastated nearby villages, leading to extensive loss of life and property."
      },
      {
        "region": "Mount Kelud (Java)",
        "description": "Kelud's eruptions have also produced deadly pyroclastic flows that have impacted surrounding regions."
      }
    ],
    "impacts": [
      {
        "name": "Massive Loss of Life",
        "description": "Pyroclastic flows are often fatal to those who are caught in them, causing burns, suffocation, and blunt trauma."
      },
      {
        "name": "Destruction of Infrastructure",
        "description": "The flows can destroy entire villages, roads, bridges, and crops, leading to long-term economic hardship."
      },
      {
        "name": "Environmental Devastation",
        "description": "Pyroclastic flows destroy ecosystems, including forests and wildlife habitats, which take decades to recover."
      }
    ],
    "mitigationAndHandling": [
      {
        "name": "Exclusion Zones",
        "description": "Establishing and enforcing evacuation zones around active volcanoes can minimize human casualties."
      },
      {
        "name": "Evacuation Routes",
        "description": "Ensuring there are clear and well-marked evacuation routes can help people escape danger zones in time."
      },
      {
        "name": "Strengthening Infrastructure",
        "description": "Designing buildings and infrastructure to withstand volcanic hazards, including ash and pyroclastic flows, can reduce destruction."
      }
    ],
    "images": '/pyroclastic_flows.jpg',
    "climateChange": null
  },
  {
    "name": "Ash Fall",
    "description": "Ash fall occurs when a volcano erupts and releases large amounts of volcanic ash into the atmosphere. Ash can spread over vast areas depending on wind conditions, blanketing entire regions. The ash can damage machinery, buildings, crops, and human health.",
    "regionsAffected": [
      {
        "region": "Mount Sinabung (Sumatra)",
        "description": "Sinabung has caused widespread ash fall that has blanketed nearby areas, causing disruptions to air travel and agriculture."
      },
      {
        "region": "Mount Tangkuban Perahu (West Java)",
        "description": "Eruptions at Tangkuban Perahu have also caused significant ash fall affecting nearby towns."
      }
    ],
    "impacts": [
      {
        "name": "Health Hazards",
        "description": "Inhalation of volcanic ash can cause respiratory problems, eye irritation, and long-term health issues, particularly for vulnerable populations like children and the elderly."
      },
      {
        "name": "Disruption of Transportation",
        "description": "Ash clouds can severely affect air travel by damaging engines and reducing visibility. Roads and railways may also be closed due to thick ash deposits."
      },
      {
        "name": "Crop Damage",
        "description": "Volcanic ash can smother crops, reducing agricultural yields and affecting food security."
      }
    ],
    "mitigationAndHandling": [
      {
        "name": "Ash Monitoring",
        "description": "Monitoring ash plumes using satellite imagery and ground stations can provide warnings about ash fall."
      },
      {
        "name": "Health Precautions",
        "description": "Providing masks and protective gear for people in affected areas can help reduce health risks. Public health campaigns can educate people on how to protect themselves from ash exposure."
      },
      {
        "name": "Clearing and Disposal",
        "description": "Authorities should develop systems for the safe and efficient removal of ash from roads, airports, and agricultural land."
      }
    ],
    "images": '/volcanic_ash.jpeg',
    "climateChange": null
  },
  {
    "name": "Lahars (Volcanic Mudflows)",
    "description": "Lahars are volcanic mudflows that occur when volcanic ash mixes with water from rain or melted snow, creating fast-moving, destructive flows of mud and debris.",
    "regionsAffected": [
      {
        "region": "Mount Merapi (Java)",
        "description": "Lahars are common in Merapi’s eruptions, often caused by heavy rains that mobilize ash and debris into rivers, flooding downstream areas."
      },
      {
        "region": "Mount Kelud (Java)",
        "description": "Kelud has also generated lahars that have affected nearby settlements."
      }
    ],
    "impacts": [
      {
        "name": "Flooding and Infrastructure Damage",
        "description": "Lahars can bury villages, roads, and bridges, making it difficult for rescue teams to reach affected areas."
      },
      {
        "name": "Loss of Life",
        "description": "Lahars can be as deadly as lava flows, sweeping away homes and people."
      },
      {
        "name": "Agricultural Damage",
        "description": "Lahars can devastate farmlands, burying crops and ruining soil fertility for years."
      }
    ],
    "mitigationAndHandling": [
      {
        "name": "Water Drainage Systems",
        "description": "Developing and maintaining drainage systems to divert water away from vulnerable areas can help reduce the risk of lahars."
      },
      {
        "name": "Evacuation and Early Warning",
        "description": "Local authorities should issue early warnings during heavy rainfall, particularly after an eruption, to prevent lahars from affecting populated areas."
      },
      {
        "name": "Land Use Planning",
        "description": "Avoiding the construction of homes and infrastructure in known lahar paths can minimize future losses."
      }
    ],
    "images": '/volcanic_mud_flows.jpg',
    "climateChange": null
  },
  {
    "name": "Haze Pollution",
    "description": "Haze pollution occurs when smoke from forest fires mixes with fog, creating a thick layer of air pollution. This phenomenon, commonly referred to as 'haze,' is a recurring issue in Indonesia, particularly during the dry season, when large areas of forest and peatlands are burned. The smoke from these fires contains particulate matter, carbon monoxide, and other toxic gases, which have severe consequences for public health and the environment.",
    "regionsAffected": [
      {
        "region": "Sumatra",
        "description": "The southern regions of Sumatra are highly impacted by haze pollution due to the frequent occurrence of forest fires. The haze can spread for hundreds of kilometers, affecting air quality across the island and beyond."
      },
      {
        "region": "Kalimantan (Borneo)",
        "description": "Central and southern parts of Borneo, especially in Kalimantan, are also prone to forest fires and haze pollution. These fires not only affect local air quality but also cause significant environmental and health hazards."
      },
      {
        "region": "Singapore and Malaysia",
        "description": "Haze pollution often drifts across borders, causing hazardous air quality in neighboring countries, particularly Singapore and Malaysia, during peak fire seasons."
      }
    ],
    "impacts": [
      {
        "name": "Health Issues",
        "description": "Increased levels of particulate matter in the air lead to respiratory problems, eye irritation, and cardiovascular diseases. Children, the elderly, and people with pre-existing conditions are particularly vulnerable."
      },
      {
        "name": "Economic Disruptions",
        "description": "Haze causes disruptions to daily life, including school closures, transportation delays, and cancellations of public events. The economic costs include lost productivity and increased healthcare expenses."
      },
      {
        "name": "Environmental Damage",
        "description": "Persistent haze can degrade ecosystems, especially wetlands and forests, by affecting both plant and animal life. The smoke also contaminates water sources, further impacting ecosystems and human populations."
      }
    ],
    "mitigationAndHandling": [
      {
        "name": "Fire Prevention",
        "description": "Enforcing stricter regulations on land clearing and burning, including promoting alternatives like sustainable agricultural practices, can reduce the number of fires."
      },
      {
        "name": "Air Quality Monitoring",
        "description": "Establishing air quality monitoring systems and providing real-time data to the public can help mitigate health risks by advising people to stay indoors during hazardous conditions."
      },
      {
        "name": "International Cooperation",
        "description": "Engaging in transboundary cooperation with neighboring countries, like Malaysia and Singapore, to combat haze pollution and its effects through regional fire management initiatives."
      }
    ],
    "images": '/haze_pollution.jpg',
    "climateChange": null
  },
  {
    "name": "Soil Erosion and Degradation",
    "description": "After a forest fire, the soil becomes exposed and vulnerable to erosion. Without the protection of tree roots and vegetation, rainfall can wash away the topsoil, which is rich in nutrients and essential for agricultural productivity. Soil erosion leads to the degradation of land, making it unsuitable for farming and reducing the ability of the land to retain water.",
    "regionsAffected": [
      {
        "region": "Sumatra",
        "description": "Forest fires in Sumatra lead to significant soil erosion, particularly in areas that are already suffering from deforestation. The loss of fertile soil impacts agricultural communities and leads to lower crop yields."
      },
      {
        "region": "Kalimantan (Borneo)",
        "description": "Fires in Borneo, especially in areas with fragile peat soils, cause widespread soil degradation. The loss of peatlands not only affects agricultural production but also releases large amounts of carbon dioxide into the atmosphere."
      },
      {
        "region": "Sulawesi",
        "description": "The hilly terrain of Sulawesi is vulnerable to landslides and soil erosion after forest fires, particularly in the mountainous areas where the vegetation holds the soil in place."
      }
    ],
    "impacts": [
      {
        "name": "Reduced Agricultural Productivity",
        "description": "Soil erosion leads to a decline in soil fertility, making it difficult for farmers to grow crops. This affects food security and the livelihoods of rural communities."
      },
      {
        "name": "Increased Risk of Landslides",
        "description": "Without the stabilizing effect of trees and plant roots, heavy rainfall can trigger landslides in fire-affected areas, causing further destruction to homes and infrastructure."
      },
      {
        "name": "Water Pollution",
        "description": "Erosion carries sediments into rivers and streams, reducing water quality and impacting aquatic life. This affects both human populations and ecosystems."
      }
    ],
    "mitigationAndHandling": [
      {
        "name": "Reforestation",
        "description": "Restoring forests and vegetation cover can help reduce soil erosion. Reforestation projects, particularly in fire-prone areas, stabilize the soil and improve land productivity."
      },
      {
        "name": "Soil Conservation Techniques",
        "description": "Implementing soil conservation practices, such as terracing, contour farming, and the use of cover crops, can help reduce soil erosion and maintain soil health."
      },
      {
        "name": "Fire Prevention and Control",
        "description": "Preventing forest fires through better land management, firebreaks, and early warning systems can reduce the risk of soil erosion and degradation."
      }
    ],
    "images": '/soil_erode.jpg',
    "climateChange": null
  },
  {
    "name": "Air Quality Crisis",
    "description": "Forest fires in Indonesia lead to a severe air quality crisis, especially during the dry season. The smoke from the fires contains particulate matter, carbon monoxide, and other harmful chemicals that pollute the air, making it hazardous for both humans and wildlife. This crisis worsens during periods of drought when the fires spread uncontrollably.",
    "regionsAffected": [
      {
        "region": "Sumatra",
        "description": "The southern region of Sumatra experiences some of the worst air quality due to the high frequency of forest fires in the area."
      },
      {
        "region": "Kalimantan (Borneo)",
        "description": "Borneo is another hotspot for poor air quality due to the extensive forest fires that occur in the region."
      },
      {
        "region": "Singapore and Malaysia",
        "description": "Haze from Indonesia often affects air quality in neighboring countries, particularly Singapore and Malaysia, where air pollution reaches hazardous levels."
      }
    ],
    "impacts": [
      {
        "name": "Health Hazards",
        "description": "Exposure to poor air quality leads to respiratory diseases such as asthma, bronchitis, and even heart disease. The elderly and children are particularly at risk."
      },
      {
        "name": "Economic Losses",
        "description": "The air quality crisis disrupts everyday activities, leading to school and business closures, as well as increased medical costs due to health complications."
      },
      {
        "name": "Environmental Pollution",
        "description": "The smoke and particulates can damage plant life, reduce visibility, and affect the natural environment by contaminating water sources."
      }
    ],
    "mitigationAndHandling": [
      {
        "name": "Public Health Response",
        "description": "Governments should issue air quality alerts, promote the use of masks, and set up emergency medical services for people suffering from respiratory problems."
      },
      {
        "name": "Control of Fires",
        "description": "Reducing the occurrence of forest fires through better land management practices, such as controlled burns and firebreaks, can reduce the impact of haze pollution."
      },
      {
        "name": "International Collaboration",
        "description": "Working with neighboring countries to address the transboundary pollution and establish regional solutions to reduce haze impact."
      }
    ],
    "images": '/air_quality.jpg',
    "climateChange": null
  },
  // {
  //   "name": "Loss of Biodiversity",
  //   "description": "Forest fires in Indonesia contribute significantly to the loss of biodiversity, especially in tropical rainforests that are home to diverse flora and fauna. The fires destroy crucial habitats, displacing wildlife and making it difficult for species to survive. Species such as orangutans, tigers, and elephants, which are already critically endangered, face even greater threats from deforestation and habitat destruction caused by the fires.",
  //   "regions_affected": [
  //     {
  //       "region": "Borneo (Kalimantan)",
  //       "description": "Borneo’s rainforests are among the most biodiverse on Earth. Fires in Borneo destroy the habitats of rare species such as the Bornean orangutan and pygmy elephant, putting them at high risk of extinction."
  //     },
  //     {
  //       "region": "Sumatra",
  //       "description": "The island's forests, home to the Sumatran tiger and orangutan, are heavily impacted by fire. These species are already critically endangered and face further threats as their habitats are destroyed."
  //     },
  //     {
  //       "region": "Papua",
  //       "description": "Papua's rainforests are a biodiversity hotspot, hosting many unique species. Fires in this region threaten species like the Papua bird-of-paradise and cassowary, which are highly vulnerable to habitat loss."
  //     }
  //   ],
  //   "impact": [
  //     {
  //       "type": "Species Extinction",
  //       "description": "Loss of habitat due to forest fires leads to the extinction of native species. As forests burn, animals lose their homes and food sources, leading to population declines and even extinction for some species."
  //     },
  //     {
  //       "type": "Ecosystem Disruption",
  //       "description": "Forest fires disrupt entire ecosystems, affecting plant life, pollinators, and herbivores, and ultimately the entire food chain. The loss of forests also impacts the local climate by reducing carbon sequestration."
  //     },
  //     {
  //       "type": "Tourism Impact",
  //       "description": "Biodiversity loss affects ecotourism, a major industry in Indonesia. The decline in wildlife reduces the attractiveness of national parks and reserves, resulting in decreased tourism revenue."
  //     }
  //   ],
  //   "mitigation_and_handling": [
  //     {
  //       "strategy": "Conservation Efforts",
  //       "description": "Strengthening conservation programs and protecting key wildlife habitats from deforestation and fire can help mitigate biodiversity loss. Reforestation and restoration of degraded lands are essential."
  //     },
  //     {
  //       "strategy": "Wildlife Protection",
  //       "description": "Establishing wildlife corridors and safe zones for endangered species can help protect them from the direct impacts of fire and habitat destruction."
  //     },
  //     {
  //       "strategy": "Fire-Resistant Agriculture",
  //       "description": "Promoting sustainable agricultural practices, such as agroforestry, can reduce the need for fire-prone land clearing."
  //     }
  //   ],
  //   "images": '/.jpg',
  //   "climateChange": null
  // },
  
  // Add other disaster data as needed...
];


const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    // Clear existing data
    await Disaster.deleteMany({});
    await ClimateChange.deleteMany({});

    // Step 1: Seed climate changes and get their IDs
    const climateChanges = await ClimateChange.insertMany(climateChangeData);
    console.log('Climate Changes seeded');

    // Step 2: Seed disasters
    const disasters = await Disaster.insertMany(disasterData);
    console.log('Disasters seeded');
    console.log('Disasters:', disasters); // Log disasters to confirm insertion

    // Step 3: Update climate change references in disasters
    // Associate disasters with the climate changes manually
    const globalWarmingClimateChange = climateChanges.find(
      (climate) => climate.name === 'Global Warming'
    );
    const risingSeaLevelsClimateChange = climateChanges.find(
      (climate) => climate.name === 'Rising Sea Levels'
    );
    const earthquakeClimateChange = climateChanges.find(
      (climate) => climate.name === 'Earthquakes'
    );

    const extremeWeatherEventsClimateChange = climateChanges.find(
      (climate) => climate.name === 'Extreme Weather Events'
    )

    const oceanAcidificationClimateChange = climateChanges.find(
      (climate) => climate.name === 'Ocean Acidification'
    )

    const volcanicErruptionClimateChange = climateChanges.find(
      (climate) => climate.name === 'Volcanic Erruptions'
    )

    const forestFiresClimateChange = climateChanges.find(
      (climate) => climate.name === 'Forest Fires'
    )
    // Link disasters to Global Warming
    globalWarmingClimateChange.disasters.push(disasters[0]._id); // Coastal Flooding
    await globalWarmingClimateChange.save();

    // Link disasters to Rising Sea Levels
    risingSeaLevelsClimateChange.disasters.push(disasters[0]._id); // Coastal Flooding
    risingSeaLevelsClimateChange.disasters.push(disasters[1]._id); // Tidal Inundation
    risingSeaLevelsClimateChange.disasters.push(disasters[2]._id); // Erosion and Loss of Coastal Land
    await risingSeaLevelsClimateChange.save();

    // Link disaster to Earthquakes
    earthquakeClimateChange.disasters.push(disasters[3]._id); // Tsunami (assuming Tsunami is in disasters[3])
    earthquakeClimateChange.disasters.push(disasters[4]._id); // Liquefaction
    earthquakeClimateChange.disasters.push(disasters[5]._id); // Landslides
    // earthquakeClimateChange.disasters.push(disasters[6]._id); // Building and Infrastructure Collapse 
    await earthquakeClimateChange.save();

    extremeWeatherEventsClimateChange.disasters.push(disasters[7]._id); // Flooding
    extremeWeatherEventsClimateChange.disasters.push(disasters[8]._id); // Tropical Cyclones
    extremeWeatherEventsClimateChange.disasters.push(disasters[9]._id); // Droughts
    extremeWeatherEventsClimateChange.disasters.push(disasters[5]._id); // Landslides

    await extremeWeatherEventsClimateChange.save();

    oceanAcidificationClimateChange.disasters.push(disasters[10]._id); // Coral Reef Bleaching
    oceanAcidificationClimateChange.disasters.push(disasters[11]._id); // Decline in Fish Stocks
    oceanAcidificationClimateChange.disasters.push(disasters[12]._id); // Decline in Shellfish Populations"

    await oceanAcidificationClimateChange.save();

    volcanicErruptionClimateChange.disasters.push(disasters[13]._id); // Lava Flows
    volcanicErruptionClimateChange.disasters.push(disasters[14]._id); // Lava Flows
    volcanicErruptionClimateChange.disasters.push(disasters[15]._id); // Lava Flows
    volcanicErruptionClimateChange.disasters.push(disasters[16]._id); // Lava Flows

    await volcanicErruptionClimateChange.save();

    forestFiresClimateChange.disasters.push(disasters[17]._id); // Fire
    forestFiresClimateChange.disasters.push(disasters[18]._id); // Fire
    forestFiresClimateChange.disasters.push(disasters[19]._id); // Fire

    await forestFiresClimateChange.save();

    console.log('Climate Change linked to disasters');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();
