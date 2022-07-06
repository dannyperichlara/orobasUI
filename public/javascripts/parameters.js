AI.PAR[0] = [
    40, //0 center control
    20, //1 outer center lever
    15, //2 outer center lever 2
    40, //3 knight mobility blocker
    20, //4 Blocks knight mobility
    12, //5 Semi outpost
    20, //6 bishop x-rays
    10, //7 pawn in front of outpost bishop
    20, //8 outpost bishop in rank 6
    15, //9 knight semi outpost
    10, //10 enemy pawn in front of outpost knight
    20, //11 outpost knight in rank 6
    20, //12 Rook x-rays
    10, //13 defended rook in rank 5
    20, //14 queen x-rays
    20, //15 is king under attack1
    20, //16 is king under attack2
    20, //17 is king under attack3,
    10, //18 pawns at same squares as bishops
    10, //19 Expensive center control ---
    10, //20 Occupied by 1 ---
    5,  //21 Occupied by 2 ---
    10, //22 incentive for keeping queens and rooks in advantage ---
    10, //23 blocked pawns with knights ---
    5,  //24 pawn span midgame --- 
    10, //25 pawn span endgame ---
    10, //26 adjacent bishops
    10, //27 Rook battery

    //Shield
    10, //28 King in center
    15, //29 bishop in front of king

    //Structure
    20, //30 pawn imbalance
    40, //31 backward pawns
    4, //32 space

    //Bishops
    100, //33 in front of pawn at opening
    40,  //34 blocked by own pawn

	//Other
	40,  //35 Tempo bonus
	20,  //36 Piece-distance value
]

AI.PAR[3] = AI.PAR[2] = AI.PAR[1] = AI.PAR[0]

AI.MOB[P] = [13,19,10] //No|-8646107545|0|
AI.MOB[N] = [6,8,0] //No|-8647936893|0|
AI.MOB[B] = [4,5,0] //No|-8651791852|0|
AI.MOB[R] = [5,7,0] //No|-8651653412|0|
AI.MOB[Q] = [0,4,0] //No|-8653106612|0|
AI.DEFENDED_VALUES[0] = [5,0] //No|-8652793052|0|
AI.DEFENDED_VALUES[1] = [5,0] //No|-8651143932|0|
AI.DEFENDED_VALUES[2] = [5,0] //No|-8652059732|0|
AI.DEFENDED_VALUES[3] = [5,0] //No|-8652602492|0|
AI.FACTOR[0] = [100,0] //No|-8651303852|0|
AI.FACTOR[1] = [100,0] //No|-8652231972|0|
AI.FACTOR[2] = [100,0] //No|-8652505812|0|
AI.FACTOR[3] = [100,0] //No|-8652439852|0|
AI.FACTOR[4] = [100,0] //No|-8651773252|0|
AI.FACTOR[5] = [100,0] //No|-8651889252|0|
AI.FACTOR[6] = [100,0] //No|-8651572172|0|
AI.FACTOR[7] = [100,0] //No|-8651903332|0|
AI.FACTOR[8] = [100,0] //No|-8651124492|0|
AI.PAWNSHIELD = [32,24,16,8] //No|-8651756692|0|
AI.POV = [null,100,410,445,580,1250] //No|-8652422452|0|
AI.PEV = [null,114,342,362,624,1140] //No|-8650889492|0|
AI.BISHOP_PAIR = [50, 60, 70, 80]

AI.PHASELIMITS = [2,34,72] //No|-183093966|0|

AI.createPieceValues = ()=>{

    AI.PIECE_VALUES[OPENING][0] = 0

    AI.PIECE_VALUES[OPENING][p] = -VPAWN*AI.POV[P]/100 | 0
    AI.PIECE_VALUES[OPENING][n] = -VPAWN*AI.POV[N]/100 | 0
    AI.PIECE_VALUES[OPENING][b] = -VPAWN*AI.POV[B]/100 | 0
    AI.PIECE_VALUES[OPENING][r] = -VPAWN*AI.POV[R]/100 | 0
    AI.PIECE_VALUES[OPENING][q] = -VPAWN*AI.POV[Q]/100 | 0
    AI.PIECE_VALUES[OPENING][k] = 0

    AI.PIECE_VALUES[OPENING][P] = VPAWN*AI.POV[P]/100 | 0
    AI.PIECE_VALUES[OPENING][N] = VPAWN*AI.POV[N]/100 | 0
    AI.PIECE_VALUES[OPENING][B] = VPAWN*AI.POV[B]/100 | 0
    AI.PIECE_VALUES[OPENING][R] = VPAWN*AI.POV[R]/100 | 0
    AI.PIECE_VALUES[OPENING][Q] = VPAWN*AI.POV[Q]/100 | 0
    AI.PIECE_VALUES[OPENING][K] = 0

    AI.PIECE_VALUES[LATE_ENDGAME][p] = -VPAWN*AI.PEV[P]/100 | 0
    AI.PIECE_VALUES[LATE_ENDGAME][n] = -VPAWN*AI.PEV[N]/100 | 0
    AI.PIECE_VALUES[LATE_ENDGAME][b] = -VPAWN*AI.PEV[B]/100 | 0
    AI.PIECE_VALUES[LATE_ENDGAME][r] = -VPAWN*AI.PEV[R]/100 | 0
    AI.PIECE_VALUES[LATE_ENDGAME][q] = -VPAWN*AI.PEV[Q]/100 | 0
    AI.PIECE_VALUES[LATE_ENDGAME][k] = 0

    AI.PIECE_VALUES[LATE_ENDGAME][P] = VPAWN*AI.PEV[P]/100 | 0
    AI.PIECE_VALUES[LATE_ENDGAME][N] = VPAWN*AI.PEV[N]/100 | 0
    AI.PIECE_VALUES[LATE_ENDGAME][B] = VPAWN*AI.PEV[B]/100 | 0
    AI.PIECE_VALUES[LATE_ENDGAME][R] = VPAWN*AI.PEV[R]/100 | 0
    AI.PIECE_VALUES[LATE_ENDGAME][Q] = VPAWN*AI.PEV[Q]/100 | 0
    AI.PIECE_VALUES[LATE_ENDGAME][K] = 0

    AI.BLOCKEDPAWNBONUS = AI.BLOCKEDPAWNBONUS_ORIGINAL.map(e=>(e*AI.FACTOR[0][0]/100 + AI.FACTOR[0][1] | 0))
    AI.DEFENDEDPAWNBONUS = AI.DEFENDEDPAWNBONUS_ORIGINAL.map(e=>(e*AI.FACTOR[1][0]/100 + AI.FACTOR[1][1] | 0))
    AI.ALIGNEDPAWNBONUS = AI.ALIGNEDPAWNBONUS_ORIGINAL.map(e=>(e*AI.FACTOR[2][0]/100 + AI.FACTOR[2][1] | 0))
    AI.NEIGHBOURPAWNBONUS = AI.NEIGHBOURPAWNBONUS_ORIGINAL.map(e=>(e*AI.FACTOR[3][0]/100 + AI.FACTOR[3][1] | 0))
    AI.LEVERPAWNBONUS = AI.LEVERPAWNBONUS_ORIGINAL.map(e=>(e*AI.FACTOR[4][0]/100 + AI.FACTOR[4][1] | 0))
    AI.PASSERSBONUS = AI.PASSERSBONUS_ORIGINAL.map(e=>(e*AI.FACTOR[5][0]/100 + AI.FACTOR[5][1] | 0))
    AI.DOUBLEDPENALTY = AI.DOUBLEDPENALTY_ORIGINAL.map(e=>(e*AI.FACTOR[6][0]/100 + AI.FACTOR[6][1] | 0))
    AI.OUTPOSTBONUSKNIGHT = AI.OUTPOSTBONUSKNIGHT_ORIGINAL.map(e=>(e*AI.FACTOR[7][0]/100 + AI.FACTOR[7][1] | 0))
    AI.OUTPOSTBONUSBISHOP = AI.OUTPOSTBONUSBISHOP_ORIGINAL.map(e=>(e*AI.FACTOR[8][0]/100 + AI.FACTOR[8][1] | 0))

    // Total material value doesnt count pawns
    AI.maxMaterialValue = 16 * AI.PIECE_VALUES[OPENING][P] +
                          4 * AI.PIECE_VALUES[OPENING][N] +
                          4 * AI.PIECE_VALUES[OPENING][B] +
                          4 * AI.PIECE_VALUES[OPENING][R] +
                          2 * AI.PIECE_VALUES[OPENING][Q] +
                          2 * AI.PIECE_VALUES[OPENING][K]
}

AI.createPieceValues()