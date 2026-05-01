// Geometry Dash - Level Definitions
// Each level: name, difficulty, stars, speed, colors, music config, obstacles
// Obstacle format: [x_position, type] where type: 's'=spike, 'ds'=double spike,
// 'ts'=triple spike, 'b'=block, 'tb'=tall block, 'g'=gap, 'bs'=block+spike, 'sb'=spike+block

const LEVELS = [
  {
    id:1, name:"Stereo Madness", diff:"Easy", stars:1, speed:5.5,
    bg:"#0a1628", ground:"#1a4a7a", accent:"#00ff87", playerColor:"#00ff87",
    tempo:140, key:"C", wave:"square",
    length: 8000,
    obs: [
      [600,'s'],[850,'s'],[1100,'s'],[1400,'b'],[1500,'s'],
      [1800,'ds'],[2200,'s'],[2500,'b'],[2600,'s'],[2900,'s'],
      [3200,'b'],[3350,'s'],[3600,'ds'],[3900,'s'],[4200,'b'],
      [4350,'s'],[4600,'s'],[4800,'ds'],[5100,'b'],[5300,'s'],
      [5500,'s'],[5700,'b'],[5850,'s'],[6100,'ds'],[6400,'s'],
      [6700,'s'],[7000,'b'],[7150,'s'],[7400,'s']
    ]
  },
  {
    id:2, name:"Back On Track", diff:"Easy", stars:2, speed:5.5,
    bg:"#1a0a28", ground:"#5a2a7a", accent:"#ff6bf7", playerColor:"#ff6bf7",
    tempo:130, key:"D", wave:"square",
    length: 8500,
    obs: [
      [500,'s'],[700,'b'],[850,'s'],[1100,'ds'],[1400,'b'],
      [1550,'s'],[1800,'s'],[2000,'portal_ship'],[2300,'b'],[2600,'tb'],
      [2900,'s'],[3200,'b'],[3500,'tb'],[3800,'portal_cube'],[4000,'b'],
      [4150,'s'],[4400,'s'],[4600,'b'],
      [4800,'s'],[5000,'ds'],[5300,'b'],[5500,'s'],[5700,'s'],
      [5900,'b'],[6100,'ds'],[6400,'s'],[6600,'b'],[6800,'s'],
      [7000,'ts'],[7400,'b'],[7600,'s'],[7900,'s']
    ]
  },
  {
    id:3, name:"Polargeist", diff:"Normal", stars:3, speed:6,
    bg:"#0a2818", ground:"#2a7a3a", accent:"#4ade80", playerColor:"#4ade80",
    tempo:145, key:"E", wave:"sawtooth",
    length: 9500,
    obs: [
      [500,'s'],[700,'s'],[900,'ds'],[1200,'b'],[1350,'s'],
      [1550,'tb'],[1800,'s'],[2000,'ds'],[2300,'b'],[2450,'s'],
      [2650,'s'],[2850,'tb'],[3100,'ds'],[3400,'b'],[3550,'s'],
      [3750,'s'],[3950,'ds'],[4200,'tb'],[4450,'s'],[4650,'b'],
      [4800,'s'],[5000,'ds'],[5250,'s'],[5450,'tb'],[5700,'s'],
      [5900,'b'],[6100,'ds'],[6350,'s'],[6550,'tb'],[6800,'ds'],
      [7100,'s'],[7300,'b'],[7500,'ts'],[7800,'s'],[8000,'tb'],
      [8300,'s'],[8600,'ds'],[8900,'s']
    ]
  },
  {
    id:4, name:"Dry Out", diff:"Normal", stars:4, speed:6,
    bg:"#281a0a", ground:"#7a5a2a", accent:"#facc15", playerColor:"#facc15",
    tempo:150, key:"F", wave:"square",
    length: 10000,
    obs: [
      [500,'s'],[680,'ds'],[950,'b'],[1100,'s'],[1300,'tb'],
      [1550,'ds'],[1800,'s'],[2000,'b'],[2150,'s'],[2350,'ds'],
      [2600,'tb'],[2850,'s'],[3050,'ds'],[3300,'b'],[3450,'s'],
      [3650,'ts'],[3950,'b'],[4100,'s'],[4300,'ds'],[4550,'tb'],
      [4800,'s'],[5000,'ds'],[5250,'b'],[5400,'ts'],[5700,'s'],
      [5900,'tb'],[6150,'ds'],[6400,'s'],[6600,'b'],[6800,'ts'],
      [7100,'tb'],[7350,'ds'],[7600,'s'],[7800,'b'],[8000,'ts'],
      [8300,'ds'],[8550,'tb'],[8800,'s'],[9100,'ds'],[9400,'s']
    ]
  },
  {
    id:5, name:"Base After Base", diff:"Hard", stars:5, speed:6.5,
    bg:"#280a0a", ground:"#7a2a2a", accent:"#f97316", playerColor:"#f97316",
    tempo:155, key:"G", wave:"sawtooth",
    length: 11000,
    obs: [
      [450,'ds'],[700,'b'],[850,'s'],[1050,'tb'],[1300,'ds'],
      [1500,'s'],[1700,'b'],[1850,'ts'],[2150,'tb'],[2400,'ds'],
      [2600,'b'],[2750,'s'],[2950,'ds'],[3200,'tb'],[3450,'ts'],
      [3750,'b'],[3900,'s'],[4100,'ds'],[4350,'tb'],[4600,'s'],
      [4800,'ts'],[5100,'b'],[5250,'ds'],[5500,'tb'],[5750,'s'],
      [5950,'ts'],[6250,'b'],[6400,'ds'],[6650,'tb'],[6900,'ts'],
      [7200,'s'],[7400,'b'],[7600,'ds'],[7850,'tb'],[8100,'ts'],
      [8400,'b'],[8600,'ds'],[8850,'s'],[9100,'ts'],[9400,'tb'],
      [9700,'ds'],[10000,'s'],[10300,'ts']
    ]
  },
  {
    id:6, name:"Can't Let Go", diff:"Hard", stars:6, speed:6.5,
    bg:"#0a1a28", ground:"#2a5a8a", accent:"#38bdf8", playerColor:"#38bdf8",
    tempo:160, key:"A", wave:"square",
    length: 11500,
    obs: [
      [400,'ds'],[650,'tb'],[900,'s'],[1100,'ts'],[1400,'b'],
      [1550,'ds'],[1800,'tb'],[2050,'s'],[2250,'ts'],[2550,'b'],
      [2700,'ds'],[2950,'tb'],[3200,'ts'],[3500,'b'],[3650,'s'],
      [3850,'ds'],[4100,'tb'],[4350,'ts'],[4650,'b'],[4800,'ds'],
      [5050,'s'],[5250,'tb'],[5500,'ts'],[5800,'b'],[5950,'ds'],
      [6200,'tb'],[6450,'ts'],[6750,'s'],[6950,'b'],[7150,'ds'],
      [7400,'tb'],[7650,'ts'],[7950,'b'],[8150,'ds'],[8400,'tb'],
      [8650,'ts'],[8950,'s'],[9150,'ds'],[9400,'tb'],[9700,'ts'],
      [10000,'b'],[10200,'ds'],[10500,'ts'],[10800,'s']
    ]
  },
  {
    id:7, name:"Jumper", diff:"Harder", stars:7, speed:7,
    bg:"#1a0a1a", ground:"#6a2a6a", accent:"#c084fc", playerColor:"#c084fc",
    tempo:165, key:"B", wave:"sawtooth",
    length: 12000,
    obs: [
      [400,'s'],[580,'ds'],[800,'tb'],[1000,'ts'],[1250,'b'],
      [1380,'ds'],[1600,'tb'],[1800,'s'],[1950,'ts'],[2200,'b'],
      [2350,'ds'],[2550,'tb'],[2800,'ts'],[3050,'b'],[3200,'s'],
      [3380,'ds'],[3600,'tb'],[3800,'ts'],[4050,'b'],[4200,'ds'],
      [4400,'tb'],[4600,'ts'],[4850,'b'],[5000,'s'],[5180,'ds'],
      [5400,'tb'],[5600,'ts'],[5850,'b'],[6050,'ds'],[6300,'tb'],
      [6500,'ts'],[6750,'b'],[6950,'ds'],[7150,'tb'],[7400,'ts'],
      [7650,'b'],[7850,'ds'],[8050,'tb'],[8300,'ts'],[8550,'b'],
      [8750,'ds'],[8950,'tb'],[9200,'ts'],[9450,'b'],[9700,'ds'],
      [9950,'ts'],[10200,'tb'],[10500,'ds'],[10800,'ts'],[11200,'s']
    ]
  },
  {
    id:8, name:"Time Machine", diff:"Harder", stars:8, speed:7,
    bg:"#0a2828", ground:"#2a7a7a", accent:"#2dd4bf", playerColor:"#2dd4bf",
    tempo:170, key:"C", wave:"triangle",
    length: 12500,
    obs: [
      [400,'ds'],[620,'tb'],[850,'ts'],[1100,'b'],[1250,'ds'],
      [1450,'s'],[1630,'tb'],[1850,'ts'],[2100,'b'],[2280,'ds'],
      [2500,'tb'],[2700,'ts'],[2950,'b'],[3130,'ds'],[3350,'tb'],
      [3550,'ts'],[3800,'b'],[3950,'s'],[4130,'ds'],[4350,'tb'],
      [4550,'ts'],[4800,'b'],[4950,'ds'],[5150,'tb'],[5350,'ts'],
      [5600,'b'],[5780,'ds'],[6000,'tb'],[6200,'ts'],[6450,'b'],
      [6630,'ds'],[6850,'tb'],[7050,'ts'],[7300,'b'],[7480,'ds'],
      [7700,'tb'],[7900,'ts'],[8150,'b'],[8330,'ds'],[8550,'tb'],
      [8750,'ts'],[9000,'b'],[9200,'ds'],[9450,'tb'],[9700,'ts'],
      [10000,'ds'],[10300,'tb'],[10600,'ts'],[10900,'b'],
      [11200,'ds'],[11500,'ts'],[11800,'s']
    ]
  },
  {
    id:9, name:"Cycles", diff:"Harder", stars:9, speed:7.5,
    bg:"#1a1a0a", ground:"#6a6a2a", accent:"#eab308", playerColor:"#eab308",
    tempo:175, key:"D", wave:"square",
    length: 13000,
    obs: [
      [380,'ds'],[580,'tb'],[780,'ts'],[1000,'b'],[1170,'ds'],
      [1370,'tb'],[1570,'ts'],[1800,'b'],[1970,'ds'],[2170,'tb'],
      [2370,'ts'],[2600,'b'],[2770,'ds'],[2970,'tb'],[3170,'ts'],
      [3400,'b'],[3570,'ds'],[3770,'tb'],[3970,'ts'],[4200,'b'],
      [4370,'ds'],[4570,'tb'],[4770,'ts'],[5000,'b'],[5170,'ds'],
      [5370,'tb'],[5570,'ts'],[5800,'b'],[5970,'ds'],[6170,'tb'],
      [6370,'ts'],[6600,'b'],[6770,'ds'],[6970,'tb'],[7170,'ts'],
      [7400,'b'],[7570,'ds'],[7770,'tb'],[7970,'ts'],[8200,'b'],
      [8400,'ds'],[8600,'tb'],[8800,'ts'],[9050,'b'],[9250,'ds'],
      [9450,'tb'],[9700,'ts'],[10000,'ds'],[10300,'tb'],
      [10600,'ts'],[10900,'ds'],[11200,'tb'],[11500,'ts'],
      [11800,'ds'],[12100,'s']
    ]
  },
  {
    id:10, name:"xStep", diff:"Insane", stars:10, speed:8,
    bg:"#280a1a", ground:"#8a2a5a", accent:"#f43f5e", playerColor:"#f43f5e",
    tempo:180, key:"E", wave:"sawtooth",
    length: 14000,
    obs: [
      [350,'ds'],[530,'tb'],[720,'ts'],[920,'b'],[1080,'ds'],
      [1260,'tb'],[1440,'ts'],[1640,'b'],[1800,'ds'],[1980,'tb'],
      [2160,'ts'],[2360,'b'],[2520,'ds'],[2700,'tb'],[2880,'ts'],
      [3080,'b'],[3240,'ds'],[3420,'tb'],[3600,'ts'],[3800,'b'],
      [3960,'ds'],[4140,'tb'],[4320,'ts'],[4520,'b'],[4680,'ds'],
      [4860,'tb'],[5040,'ts'],[5240,'b'],[5400,'ds'],[5580,'tb'],
      [5760,'ts'],[5960,'b'],[6120,'ds'],[6300,'tb'],[6500,'ts'],
      [6700,'b'],[6880,'ds'],[7060,'tb'],[7260,'ts'],[7460,'b'],
      [7640,'ds'],[7820,'tb'],[8020,'ts'],[8220,'b'],[8400,'ds'],
      [8600,'tb'],[8800,'ts'],[9050,'ds'],[9300,'tb'],[9550,'ts'],
      [9800,'ds'],[10100,'tb'],[10400,'ts'],[10700,'ds'],
      [11000,'tb'],[11300,'ts'],[11600,'ds'],[11900,'tb'],
      [12200,'ts'],[12500,'ds'],[12800,'tb'],[13100,'ts'],[13500,'s']
    ]
  },
  {
    id:11, name:"Clutterfunk", diff:"Insane", stars:11, speed:8,
    bg:"#0a280a", ground:"#2a8a2a", accent:"#22c55e", playerColor:"#22c55e",
    tempo:175, key:"F", wave:"square",
    length: 14500,
    obs: generateHardLevel(14500, 160, 8)
  },
  {
    id:12, name:"Theory of Everything", diff:"Insane", stars:12, speed:8.5,
    bg:"#1a0a28", ground:"#5a2a8a", accent:"#a855f7", playerColor:"#a855f7",
    tempo:140, key:"G", wave:"triangle",
    length: 15000,
    obs: generateHardLevel(15000, 155, 8.5)
  },
  {
    id:13, name:"Electroman Adventures", diff:"Insane", stars:13, speed:8.5,
    bg:"#0a1a28", ground:"#2a5a8a", accent:"#3b82f6", playerColor:"#3b82f6",
    tempo:150, key:"A", wave:"sawtooth",
    length: 15500,
    obs: generateHardLevel(15500, 150, 8.5)
  },
  {
    id:14, name:"Clubstep", diff:"Demon", stars:14, speed:9,
    bg:"#1a0a0a", ground:"#5a1a1a", accent:"#dc2626", playerColor:"#dc2626",
    tempo:155, key:"B", wave:"sawtooth",
    length: 18000,
    obs: generateDemonLevel(18000, 140, 9)
  },
  {
    id:15, name:"Electrodynamix", diff:"Insane", stars:12, speed:9,
    bg:"#28280a", ground:"#8a8a2a", accent:"#fbbf24", playerColor:"#fbbf24",
    tempo:160, key:"C", wave:"square",
    length: 15000,
    obs: generateHardLevel(15000, 145, 9)
  },
  {
    id:16, name:"Hexagon Force", diff:"Insane", stars:12, speed:9,
    bg:"#0a2818", ground:"#2a8a5a", accent:"#34d399", playerColor:"#34d399",
    tempo:145, key:"D", wave:"triangle",
    length: 15500,
    obs: generateHardLevel(15500, 148, 9)
  },
  {
    id:17, name:"Blast Processing", diff:"Harder", stars:10, speed:8.5,
    bg:"#280a28", ground:"#8a2a8a", accent:"#e879f9", playerColor:"#e879f9",
    tempo:170, key:"E", wave:"sawtooth",
    length: 13000,
    obs: generateHardLevel(13000, 165, 8.5)
  },
  {
    id:18, name:"Theory of Everything 2", diff:"Demon", stars:14, speed:9.5,
    bg:"#0a0a28", ground:"#2a2a8a", accent:"#818cf8", playerColor:"#818cf8",
    tempo:142, key:"F", wave:"triangle",
    length: 19000,
    obs: generateDemonLevel(19000, 135, 9.5)
  },
  {
    id:19, name:"Geometrical Dominator", diff:"Harder", stars:10, speed:8,
    bg:"#281a0a", ground:"#8a5a2a", accent:"#fb923c", playerColor:"#fb923c",
    tempo:155, key:"G", wave:"square",
    length: 13500,
    obs: generateHardLevel(13500, 160, 8)
  },
  {
    id:20, name:"Deadlocked", diff:"Demon", stars:15, speed:10,
    bg:"#1a0a0a", ground:"#6a1a1a", accent:"#ef4444", playerColor:"#ef4444",
    tempo:165, key:"A", wave:"sawtooth",
    length: 20000,
    obs: generateDemonLevel(20000, 130, 10)
  },
  {
    id:21, name:"Fingerdash", diff:"Insane", stars:12, speed:9,
    bg:"#0a1a1a", ground:"#2a6a6a", accent:"#06b6d4", playerColor:"#06b6d4",
    tempo:150, key:"B", wave:"square",
    length: 16000,
    obs: generateHardLevel(16000, 150, 9)
  }
];

// Generator for harder levels (Insane/Harder) - creates varied obstacle patterns
function generateHardLevel(length, minGap, speed) {
  const obs = [];
  let x = 400;
  const types = ['s','ds','ts','b','tb','ds','s','portal_ship','tb','ts','b','ds','portal_cube','s','ts'];
  let i = 0;
  const scaledGap = minGap * (speed / 6.0);
  while (x < length - 400) {
    const t = types[i % types.length];
    obs.push([x, t]);
    const extra = Math.sin(i * 0.7) * 30;
    x += scaledGap + extra + Math.random() * 40;
    i++;
  }
  return obs;
}

// Generator for demon levels - very tight spacing with complex patterns
function generateDemonLevel(length, minGap, speed) {
  const obs = [];
  let x = 350;
  const types = ['ds','tb','ts','b','portal_ship','ds','ts','tb','portal_cube','s','ts','ds','tb','ts','ds','b','ts'];
  let i = 0;
  const scaledGap = minGap * (speed / 6.0);
  while (x < length - 400) {
    const t = types[i % types.length];
    obs.push([x, t]);
    const extra = Math.sin(i * 0.5) * 20;
    x += scaledGap + extra + Math.random() * 30;
    i++;
  }
  return obs;
}

// Difficulty colors for badges
const DIFF_COLORS = {
  "Easy": "#4ade80",
  "Normal": "#facc15",
  "Hard": "#f97316",
  "Harder": "#ef4444",
  "Insane": "#a855f7",
  "Demon": "#dc2626"
};
