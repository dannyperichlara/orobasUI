AI.DEFENDED_VALUES = []
AI.PAWNSHIELD = [0,0,0,0]

AI.PAR = [7,10,0,32,17,0,2,0,9,0,0,0,0,0,0,1,1,0,3,32,0,30,0,0,14,15,6,0,22,0,4,26,27,16,0,17,11,7,20,34,0,4,5,0,0,0,0]

AI.PARDISTANCE = [8,2,2,8]

AI.PASSERSBONUS = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,250,240,260,190,240,220,200,360,null,null,null,null,null,null,null,null,70,60,40,-10,30,40,60,60,null,null,null,null,null,null,null,null,10,10,-20,-40,-30,-40,10,0,null,null,null,null,null,null,null,null,0,0,-20,0,-20,20,40,10,null,null,null,null,null,null,null,null,10,10,-10,-10,0,0,10,10,null,null,null,null,null,null,null,null,10,10,-10,-10,-30,0,10,10,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]

AI.POV = [
  89,  280, 331, 479,
 997,  139, 257, 360,
 521, 1000
]

AI.MOB = []

AI.MOB[P] = [[0,100,101,102,103].map((e,i)=>i), new Array(5).fill(0)]
AI.MOB[N] = [[0,300,301,302,303,304,305,306,307].map((e,i)=>i), new Array(9).fill(0)]
AI.MOB[B] = [[0,300,301,302,303,304,305,306,307,308,308,309,310,311].map((e,i)=>i), new Array(14).fill(0)]
AI.MOB[R] = [[0,500,501,502,503,504,505,506,507,508,509,510,520,530,540].map((e,i)=>i), new Array(15).fill(0)]
AI.MOB[Q] = [new Array(28).fill(0).map((e,i)=>i), new Array(28).fill(0)]
AI.MOB[K] = [[0,1,2,3,4,5,6,7,8].map((e,i)=>i), new Array(9).fill(0)]

console.log(AI.MOB)

AI.PSQT = [
  0,   0,   0,   0,   0,   0,  0,   0,    null,null,null,null,null,null,null,null,
   98, 134,  61,  95,  68, 126, 34, -11,    null,null,null,null,null,null,null,null,
   -6,   7,  26,  31,  65,  56, 25, -20,    null,null,null,null,null,null,null,null,
  -14,  13,   6,  21,  23,  12, 17, -23,    null,null,null,null,null,null,null,null,
  -27,  -2,  -5,  12,  17,   6, 10, -25,    null,null,null,null,null,null,null,null,
  -26,  -4,  -4, -10,   3,   3, 33, -12,    null,null,null,null,null,null,null,null,
  -35,  -1, -20, -23, -15,  24, 38, -22,    null,null,null,null,null,null,null,null,
    0,   0,   0,   0,   0,   0,  0,   0,    null,null,null,null,null,null,null,null,

    -167, -89, -34, -49,  61, -97, -15, -107,    null,null,null,null,null,null,null,null,
    -73, -41,  72,  36,  23,  62,   7,  -17,    null,null,null,null,null,null,null,null,
    -47,  60,  37,  65,  84, 129,  73,   44,    null,null,null,null,null,null,null,null,
     -9,  17,  19,  53,  37,  69,  18,   22,    null,null,null,null,null,null,null,null,
    -13,   4,  16,  13,  28,  19,  21,   -8,    null,null,null,null,null,null,null,null,
    -23,  -9,  12,  10,  19,  17,  25,  -16,    null,null,null,null,null,null,null,null,
    -29, -53, -12,  -3,  -1,  18, -14,  -19,    null,null,null,null,null,null,null,null,
   -105, -21, -58, -33, -17, -28, -19,  -23,    null,null,null,null,null,null,null,null,

   -29,   4, -82, -37, -25, -42,   7,  -8,    null,null,null,null,null,null,null,null,
   -26,  16, -18, -13,  30,  59,  18, -47,    null,null,null,null,null,null,null,null,
   -16,  37,  43,  40,  35,  50,  37,  -2,    null,null,null,null,null,null,null,null,
    -4,   5,  19,  50,  37,  37,   7,  -2,    null,null,null,null,null,null,null,null,
    -6,  13,  13,  26,  34,  12,  10,   4,    null,null,null,null,null,null,null,null,
     0,  15,  15,  15,  14,  27,  18,  10,    null,null,null,null,null,null,null,null,
     4,  15,  16,   0,   7,  21,  33,   1,    null,null,null,null,null,null,null,null,
   -33,  -3, -14, -21, -13, -12, -39, -21,    null,null,null,null,null,null,null,null,

   32,  42,  32,  51, 63,  9,  31,  43,    null,null,null,null,null,null,null,null,
   27,  32,  58,  62, 80, 67,  26,  44,    null,null,null,null,null,null,null,null,
   -5,  19,  26,  36, 17, 45,  61,  16,    null,null,null,null,null,null,null,null,
  -24, -11,   7,  26, 24, 35,  -8, -20,    null,null,null,null,null,null,null,null,
  -36, -26, -12,  -1,  9, -7,   6, -23,    null,null,null,null,null,null,null,null,
  -45, -25, -16, -17,  3,  0,  -5, -33,    null,null,null,null,null,null,null,null,
  -44, -16, -20,  -9, -1, 11,  -6, -71,    null,null,null,null,null,null,null,null,
  -19, -13, -19,  17, 16,  7, -37, -26,    null,null,null,null,null,null,null,null,

  -28,   0,  29,  12,  59,  44,  43,  45,    null,null,null,null,null,null,null,null,
   -24, -39,  -5,   1, -16,  57,  28,  54,    null,null,null,null,null,null,null,null,
   -13, -17,   7,   8,  29,  56,  47,  57,    null,null,null,null,null,null,null,null,
   -27, -27, -16, -16,  -1,  17,  -2,   1,    null,null,null,null,null,null,null,null,
    -9, -26,  -9, -10,  -2,  -4,   3,  -3,    null,null,null,null,null,null,null,null,
   -14,   2, -11,  -2,  -5,   2,  14,   5,    null,null,null,null,null,null,null,null,
   -35,  -8,  11,   2,   8,  15,  -3,   1,    null,null,null,null,null,null,null,null,
    -1, -18,  -9,  10, -15, -25, -31, -50,    null,null,null,null,null,null,null,null,

    -65,  23,  16, -15, -56, -34,   2,  13,    null,null,null,null,null,null,null,null,
    29,  -1, -20,  -7,  -8,  -4, -38, -29,    null,null,null,null,null,null,null,null,
    -9,  24,   2, -16, -20,   6,  22, -22,    null,null,null,null,null,null,null,null,
   -17, -20, -12, -27, -30, -25, -14, -36,    null,null,null,null,null,null,null,null,
   -49,  -1, -27, -39, -46, -44, -33, -51,    null,null,null,null,null,null,null,null,
   -14, -14, -22, -46, -44, -30, -15, -27,    null,null,null,null,null,null,null,null,
     1,   7,  -8, -64, -43, -16,   9,   8,    null,null,null,null,null,null,null,null,
   -15,  36,  12, -54,   8, -28,  24,  14,    null,null,null,null,null,null,null,null,

   0,   0,   0,   0,   0,   0,   0,   0,    null,null,null,null,null,null,null,null,
   178, 173, 158, 134, 147, 132, 165, 187,    null,null,null,null,null,null,null,null,
    94, 100,  85,  67,  56,  53,  82,  84,    null,null,null,null,null,null,null,null,
    32,  24,  13,   5,  -2,   4,  17,  17,    null,null,null,null,null,null,null,null,
    13,   9,  -3,  -7,  -7,  -8,   3,  -1,    null,null,null,null,null,null,null,null,
     4,   7,  -6,   1,   0,  -5,  -1,  -8,    null,null,null,null,null,null,null,null,
    13,   8,   8,  10,  13,   0,   2,  -7,    null,null,null,null,null,null,null,null,
     0,   0,   0,   0,   0,   0,   0,   0,    null,null,null,null,null,null,null,null,

     -58, -38, -13, -28, -31, -27, -63, -99,    null,null,null,null,null,null,null,null,
     -25,  -8, -25,  -2,  -9, -25, -24, -52,    null,null,null,null,null,null,null,null,
     -24, -20,  10,   9,  -1,  -9, -19, -41,    null,null,null,null,null,null,null,null,
     -17,   3,  22,  22,  22,  11,   8, -18,    null,null,null,null,null,null,null,null,
     -18,  -6,  16,  25,  16,  17,   4, -18,    null,null,null,null,null,null,null,null,
     -23,  -3,  -1,  15,  10,  -3, -20, -22,    null,null,null,null,null,null,null,null,
     -42, -20, -10,  -5,  -2, -20, -23, -44,    null,null,null,null,null,null,null,null,
     -29, -51, -23, -15, -22, -18, -50, -64,    null,null,null,null,null,null,null,null,

     -14, -21, -11,  -8, -7,  -9, -17, -24,    null,null,null,null,null,null,null,null,
     -8,  -4,   7, -12, -3, -13,  -4, -14,    null,null,null,null,null,null,null,null,
      2,  -8,   0,  -1, -2,   6,   0,   4,    null,null,null,null,null,null,null,null,
     -3,   9,  12,   9, 14,  10,   3,   2,    null,null,null,null,null,null,null,null,
     -6,   3,  13,  19,  7,  10,  -3,  -9,    null,null,null,null,null,null,null,null,
    -12,  -3,   8,  10, 13,   3,  -7, -15,    null,null,null,null,null,null,null,null,
    -14, -18,  -7,  -1,  4,  -9, -15, -27,    null,null,null,null,null,null,null,null,
    -23,  -9, -23,  -5, -9, -16,  -5, -17,    null,null,null,null,null,null,null,null,

    13, 10, 18, 15, 12,  12,   8,   5,    null,null,null,null,null,null,null,null,
    11, 13, 13, 11, -3,   3,   8,   3,    null,null,null,null,null,null,null,null,
     7,  7,  7,  5,  4,  -3,  -5,  -3,    null,null,null,null,null,null,null,null,
     4,  3, 13,  1,  2,   1,  -1,   2,    null,null,null,null,null,null,null,null,
     3,  5,  8,  4, -5,  -6,  -8, -11,    null,null,null,null,null,null,null,null,
    -4,  0, -5, -1, -7, -12,  -8, -16,    null,null,null,null,null,null,null,null,
    -6, -6,  0,  2, -9,  -9, -11,  -3,    null,null,null,null,null,null,null,null,
    -9,  2,  3, -1, -5, -13,   4, -20,    null,null,null,null,null,null,null,null,

    -9,  22,  22,  27,  27,  19,  10,  20,    null,null,null,null,null,null,null,null,
    -17,  20,  32,  41,  58,  25,  30,   0,    null,null,null,null,null,null,null,null,
    -20,   6,   9,  49,  47,  35,  19,   9,    null,null,null,null,null,null,null,null,
      3,  22,  24,  45,  57,  40,  57,  36,    null,null,null,null,null,null,null,null,
    -18,  28,  19,  47,  31,  34,  39,  23,    null,null,null,null,null,null,null,null,
    -16, -27,  15,   6,   9,  17,  10,   5,    null,null,null,null,null,null,null,null,
    -22, -23, -30, -16, -16, -23, -36, -32,    null,null,null,null,null,null,null,null,
    -33, -28, -22, -43,  -5, -32, -20, -41,    null,null,null,null,null,null,null,null,

    -74, -35, -18, -18, -11,  15,   4, -17,    null,null,null,null,null,null,null,null,
    -12,  17,  14,  17,  17,  38,  23,  11,    null,null,null,null,null,null,null,null,
     10,  17,  23,  15,  20,  45,  44,  13,    null,null,null,null,null,null,null,null,
     -8,  22,  24,  27,  26,  33,  26,   3,    null,null,null,null,null,null,null,null,
    -18,  -4,  21,  24,  27,  23,   9, -11,    null,null,null,null,null,null,null,null,
    -19,  -3,  11,  21,  23,  16,   7,  -9,    null,null,null,null,null,null,null,null,
    -27, -11,   4,  13,  14,   4,  -5, -17,    null,null,null,null,null,null,null,null,
    -53, -34, -21, -11, -28, -14, -24, -43,    null,null,null,null,null,null,null,null,
].map(e=>(e > 60? 60 : e < -60? -60 : e))

// AI.PSQT = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,110,126,-159,-83,114,0,119,-187,null,null,null,null,null,null,null,null,126,-189,-115,-21,106,-16,121,8,null,null,null,null,null,null,null,null,-46,-11,5,17,121,27,41,57,null,null,null,null,null,null,null,null,-23,-10,-33,12,37,10,-63,-1,null,null,null,null,null,null,null,null,-34,24,-44,-18,-33,-69,37,4,null,null,null,null,null,null,null,null,-59,-5,-80,-36,-46,60,58,-42,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-162,101,-200,-198,-50,-200,-200,200,null,null,null,null,null,null,null,null,105,-45,200,-200,-172,-200,-200,183,null,null,null,null,null,null,null,null,-179,200,-84,166,67,200,200,200,null,null,null,null,null,null,null,null,-200,25,99,81,40,67,82,-40,null,null,null,null,null,null,null,null,-29,200,-36,-45,-36,3,4,15,null,null,null,null,null,null,null,null,129,6,22,-145,95,34,-19,-76,null,null,null,null,null,null,null,null,200,-200,-74,48,51,-6,200,49,null,null,null,null,null,null,null,null,-200,69,50,-182,91,111,49,-200,null,null,null,null,null,null,null,null,-81,-200,-200,-200,200,200,-200,-93,null,null,null,null,null,null,null,null,200,100,46,-200,-200,116,-200,33,null,null,null,null,null,null,null,null,-132,160,-13,-69,-200,-132,-28,-65,null,null,null,null,null,null,null,null,0,-15,16,-9,9,94,24,-162,null,null,null,null,null,null,null,null,128,105,-38,94,-22,8,2,37,null,null,null,null,null,null,null,null,-7,87,-29,19,-26,116,144,118,null,null,null,null,null,null,null,null,-48,-53,80,-79,34,-82,56,-149,null,null,null,null,null,null,null,null,-200,-11,-34,84,-153,3,-200,123,null,null,null,null,null,null,null,null,92,74,-7,-9,-132,0,-9,151,null,null,null,null,null,null,null,null,83,172,106,-44,-16,183,66,116,null,null,null,null,null,null,null,null,183,197,162,-76,113,13,7,200,null,null,null,null,null,null,null,null,116,131,-60,146,-28,-43,-112,29,null,null,null,null,null,null,null,null,-196,-54,21,-65,-107,-19,124,-200,null,null,null,null,null,null,null,null,-149,99,-71,-103,58,9,-145,-172,null,null,null,null,null,null,null,null,60,-7,116,13,-126,-70,-103,-33,null,null,null,null,null,null,null,null,-43,17,-35,27,8,-29,-61,5,null,null,null,null,null,null,null,null,-200,-200,66,53,-70,112,55,-15,null,null,null,null,null,null,null,null,-126,45,20,-39,86,-163,-64,114,null,null,null,null,null,null,null,null,-41,139,-61,68,65,20,114,200,null,null,null,null,null,null,null,null,35,-110,68,124,-17,-39,-66,14,null,null,null,null,null,null,null,null,-8,-42,-133,27,10,46,43,-73,null,null,null,null,null,null,null,null,20,-3,7,-21,-141,45,-27,-91,null,null,null,null,null,null,null,null,71,-105,8,-2,-24,124,200,65,null,null,null,null,null,null,null,null,-4,-73,63,42,31,-109,5,200,null,null,null,null,null,null,null,null,-200,61,-196,-115,-35,93,200,184,null,null,null,null,null,null,null,null,-143,-88,200,-107,33,113,126,200,null,null,null,null,null,null,null,null,-190,185,-57,-60,-60,-70,41,-102,null,null,null,null,null,null,null,null,31,5,-4,-79,-42,-200,138,180,null,null,null,null,null,null,null,null,200,156,113,-7,34,-91,-34,-136,null,null,null,null,null,null,null,null,-192,-128,38,4,-25,-138,-11,-119,null,null,null,null,null,null,null,null,-200,107,-52,-184,-59,12,13,32,null,null,null,null,null,null,null,null,-200,4,-26,-86,-43,-140,70,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,33,-3,-21,92,143,-147,-68,-200,null,null,null,null,null,null,null,null,-50,60,92,15,135,-63,38,-4,null,null,null,null,null,null,null,null,88,-60,-11,61,133,-117,13,101,null,null,null,null,null,null,null,null,41,5,13,45,-47,24,52,19,null,null,null,null,null,null,null,null,-4,-17,-38,-107,-36,31,7,8,null,null,null,null,null,null,null,null,5,0,-68,150,-20,-28,14,1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-128,200,-200,-146,138,-200,158,200,null,null,null,null,null,null,null,null,83,200,116,200,140,23,-16,-200,null,null,null,null,null,null,null,null,156,200,70,135,-52,200,200,83,null,null,null,null,null,null,null,null,103,147,200,62,79,73,-28,95,null,null,null,null,null,null,null,null,166,-176,200,95,141,85,200,-32,null,null,null,null,null,null,null,null,200,170,34,200,164,21,142,78,null,null,null,null,null,null,null,null,128,200,196,39,-58,200,29,-120,null,null,null,null,null,null,null,null,-199,193,9,200,-14,10,-6,8,null,null,null,null,null,null,null,null,-112,-63,-137,-96,-75,-73,-200,-51,null,null,null,null,null,null,null,null,20,84,-73,9,-21,-24,-97,106,null,null,null,null,null,null,null,null,-114,76,30,46,-190,28,-76,52,null,null,null,null,null,null,null,null,-47,85,27,-112,14,41,-67,18,null,null,null,null,null,null,null,null,-185,86,-46,51,47,-57,-103,-160,null,null,null,null,null,null,null,null,100,21,-68,-46,-27,-33,-141,45,null,null,null,null,null,null,null,null,-34,-166,-144,77,-48,-106,139,-200,null,null,null,null,null,null,null,null,-145,39,-79,16,-9,56,183,-200,null,null,null,null,null,null,null,null,113,46,76,23,119,-2,-4,57,null,null,null,null,null,null,null,null,63,-43,29,53,3,-5,47,36,null,null,null,null,null,null,null,null,68,-87,15,5,-21,81,-19,70,null,null,null,null,null,null,null,null,60,-94,-52,-66,-16,23,43,9,null,null,null,null,null,null,null,null,165,-31,-7,-12,-53,50,-86,-178,null,null,null,null,null,null,null,null,40,-68,-109,16,25,42,-24,66,null,null,null,null,null,null,null,null,-35,61,-38,39,51,112,57,-17,null,null,null,null,null,null,null,null,-1,-6,-13,-18,12,115,-24,-96,null,null,null,null,null,null,null,null,71,-147,43,-14,1,-17,-86,-178,null,null,null,null,null,null,null,null,200,-116,42,9,80,200,-200,-200,null,null,null,null,null,null,null,null,-96,170,193,23,11,43,72,-7,null,null,null,null,null,null,null,null,200,109,56,-23,-18,-64,-8,55,null,null,null,null,null,null,null,null,184,-20,183,200,19,48,99,126,null,null,null,null,null,null,null,null,170,-22,50,-182,-3,60,-49,-191,null,null,null,null,null,null,null,null,-60,-66,-41,64,20,114,-200,128,null,null,null,null,null,null,null,null,-200,-107,-34,-123,-124,-198,8,-200,null,null,null,null,null,null,null,null,200,-200,-200,-82,72,200,200,-32,null,null,null,null,null,null,null,null,76,-36,-51,-148,56,53,105,136,null,null,null,null,null,null,null,null,-169,21,-22,-5,-4,-27,48,-55,null,null,null,null,null,null,null,null,36,-43,4,-30,26,81,30,35,null,null,null,null,null,null,null,null,-39,-59,-15,52,7,32,66,25,null,null,null,null,null,null,null,null,-79,-25,39,72,50,60,4,107,null,null,null,null,null,null,null,null,151,-59,-40,5,2,28,-5,-37,null,null,null,null,null,null,null,null,-200,-66,41,-127,-16,-42,-28,-133,null,null,null,null,null,null,null,null].map(e=>(e > 60? 60 : e < -60? -60 : e))
        
AI.PHASELIMITS = [ 2, 25, 50 ]

AI.PIECEKINGDISTANCE = {
  [P]: [
      0, -118,  0, 0,  23,
      7,    0, -7, 3, -11,
      0,    0, -5, 2,   0
    ],
  [N]: [
      0, -56, 120,   74, 17,
     17,  39,  55,   41, 55,
     94, 120, 120, -118,  0
   ],
  [B]: [
      0,   2, -24, -66, 9,  20,
    -12,   6,   0, -12, 8, -34,
    -72, -73, -13
  ],
  [R]: [
      0,  -1,  6,  5, -4,   9,
      2,   0,  0, 23, 16, -31,
      7, -18, 34
    ],
  [Q]: [
      0, -10,   82,  0, 39,
      7, -26,    0,  0,  0,
    -10, -30, -120, 33,  0
  ],
  [K]: [0,24,12,6,0,-2,-4,-6,-8,-10,-12,-14,-16,-18,-20].map(e=>0),
}

AI.createPieceValues = ()=>{

    AI.PIECE_VALUES[OPENING][0] = 0

    AI.PIECE_VALUES[OPENING][p] = -VPAWN*AI.POV[0]/100 | 0
    AI.PIECE_VALUES[OPENING][n] = -VPAWN*AI.POV[1]/100 | 0
    AI.PIECE_VALUES[OPENING][b] = -VPAWN*AI.POV[2]/100 | 0
    AI.PIECE_VALUES[OPENING][r] = -VPAWN*AI.POV[3]/100 | 0
    AI.PIECE_VALUES[OPENING][q] = -VPAWN*AI.POV[4]/100 | 0
    AI.PIECE_VALUES[OPENING][k] = 0

    AI.PIECE_VALUES[OPENING][P] = VPAWN*AI.POV[0]/100 | 0
    AI.PIECE_VALUES[OPENING][N] = VPAWN*AI.POV[1]/100 | 0
    AI.PIECE_VALUES[OPENING][B] = VPAWN*AI.POV[2]/100 | 0
    AI.PIECE_VALUES[OPENING][R] = VPAWN*AI.POV[3]/100 | 0
    AI.PIECE_VALUES[OPENING][Q] = VPAWN*AI.POV[4]/100 | 0
    AI.PIECE_VALUES[OPENING][K] = 0

    AI.PIECE_VALUES[LATE_ENDGAME][p] = -VPAWN*AI.POV[5]/100 | 0
    AI.PIECE_VALUES[LATE_ENDGAME][n] = -VPAWN*AI.POV[6]/100 | 0
    AI.PIECE_VALUES[LATE_ENDGAME][b] = -VPAWN*AI.POV[7]/100 | 0
    AI.PIECE_VALUES[LATE_ENDGAME][r] = -VPAWN*AI.POV[8]/100 | 0
    AI.PIECE_VALUES[LATE_ENDGAME][q] = -VPAWN*AI.POV[9]/100 | 0
    AI.PIECE_VALUES[LATE_ENDGAME][k] = 0

    AI.PIECE_VALUES[LATE_ENDGAME][P] = VPAWN*AI.POV[5]/100 | 0
    AI.PIECE_VALUES[LATE_ENDGAME][N] = VPAWN*AI.POV[6]/100 | 0
    AI.PIECE_VALUES[LATE_ENDGAME][B] = VPAWN*AI.POV[7]/100 | 0
    AI.PIECE_VALUES[LATE_ENDGAME][R] = VPAWN*AI.POV[8]/100 | 0
    AI.PIECE_VALUES[LATE_ENDGAME][Q] = VPAWN*AI.POV[9]/100 | 0
    AI.PIECE_VALUES[LATE_ENDGAME][K] = 0

    AI.PSQT_OPENING[P] = AI.PSQT.slice(0,127)
    AI.PSQT_OPENING[N] = AI.PSQT.slice(128,255)
    AI.PSQT_OPENING[B] = AI.PSQT.slice(256,383)
    AI.PSQT_OPENING[R] = AI.PSQT.slice(384,511)
    AI.PSQT_OPENING[Q] = AI.PSQT.slice(512,639)
    AI.PSQT_OPENING[K] = AI.PSQT.slice(640,767)
    AI.PSQT_LATE_ENDGAME[P] = AI.PSQT.slice(768,895)
    AI.PSQT_LATE_ENDGAME[N] = AI.PSQT.slice(896,1023)
    AI.PSQT_LATE_ENDGAME[B] = AI.PSQT.slice(1024,1151)
    AI.PSQT_LATE_ENDGAME[R] = AI.PSQT.slice(1152,1279)
    AI.PSQT_LATE_ENDGAME[Q] = AI.PSQT.slice(1280,1407)
    AI.PSQT_LATE_ENDGAME[K] = AI.PSQT.slice(1408,1535)

    AI.PIECEKINGDISTANCE[p] = AI.PIECEKINGDISTANCE[P].map(e=>-e)
    AI.PIECEKINGDISTANCE[n] = AI.PIECEKINGDISTANCE[N].map(e=>-e)
    AI.PIECEKINGDISTANCE[b] = AI.PIECEKINGDISTANCE[B].map(e=>-e)
    AI.PIECEKINGDISTANCE[r] = AI.PIECEKINGDISTANCE[R].map(e=>-e)
    AI.PIECEKINGDISTANCE[q] = AI.PIECEKINGDISTANCE[Q].map(e=>-e)
    AI.PIECEKINGDISTANCE[k] = AI.PIECEKINGDISTANCE[K].map(e=>-e)

    // Total material value doesnt count pawns
    AI.maxMaterialValue = 4 * AI.PIECE_VALUES[OPENING][N] +
                          4 * AI.PIECE_VALUES[OPENING][B] +
                          4 * AI.PIECE_VALUES[OPENING][R] +
                          2 * AI.PIECE_VALUES[OPENING][Q] +
                          2 * AI.PIECE_VALUES[OPENING][K]
}

AI.createPieceValues()

console.log(AI.PSQT_OPENING[R])