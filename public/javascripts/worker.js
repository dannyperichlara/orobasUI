"use strict"

// 2rq1rk1/1pb2ppp/p1n2n2/4p1B1/2P4N/1P1B3P/P2N1PP1/2RQ1RK1 b - - 0 15

const P =   1
const N =   2
const B =   3
const R =   4
const Q =   5
const K =   6
const p =   7
const n =   8
const b =   9
const r =  10
const q =  11
const k =  12

const WHITE =  1
const BLACK =  2

let orobas = {
    pieces: new Map(),
    pieceList: {
        pieces: new Map(),
        [k]: 0,
        [q]: 0,
        [r]: 0,
        [b]: 0,
        [n]: 0,
        [p]: 0,
        [P]: 0,
        [N]: 0,
        [B]: 0,
        [R]: 0,
        [Q]: 0,
        [K]: 0,
    },
    coords: [
        "a8","b8","c8","d8","e8","f8","g8","h8",    0,0,0,0,0,0,0,0,
        "a7","b7","c7","d7","e7","f7","g7","h7",    0,0,0,0,0,0,0,0,
        "a6","b6","c6","d6","e6","f6","g6","h6",    0,0,0,0,0,0,0,0,
        "a5","b5","c5","d5","e5","f5","g5","h5",    0,0,0,0,0,0,0,0,
        "a4","b4","c4","d4","e4","f4","g4","h4",    0,0,0,0,0,0,0,0,
        "a3","b3","c3","d3","e3","f3","g3","h3",    0,0,0,0,0,0,0,0,
        "a2","b2","c2","d2","e2","f2","g2","h2",    0,0,0,0,0,0,0,0,
        "a1","b1","c1","d1","e1","f1","g1","h1",    0,0,0,0,0,0,0,0,
    ],
    board: new Uint8Array(120),
    
    boardbits: [
        31,	30,	29,	28,	27,	26,	25,	24,	null,	null,	null,	null,	null,	null,	null,	null,
        23,	22,	21,	20,	19,	18,	17,	16,	null,	null,	null,	null,	null,	null,	null,	null,
        15,	14,	13,	12,	11,	10,	9,	8,	null,	null,	null,	null,	null,	null,	null,	null,
        7,	6,	5,	4,	3,	2,	1,	0,	null,	null,	null,	null,	null,	null,	null,	null,
        31,	30,	29,	28,	27,	26,	25,	24,	null,	null,	null,	null,	null,	null,	null,	null,
        23,	22,	21,	20,	19,	18,	17,	16,	null,	null,	null,	null,	null,	null,	null,	null,
        15,	14,	13,	12,	11,	10,	9,	8,	null,	null,	null,	null,	null,	null,	null,	null,
        7,	6,	5,	4,	3,	2,	1,	0,	null,	null,	null,	null,	null,	null,	null,	null,
    ],

    board64: [
        56,	57,	58,	59,	60,	61,	62,	63,	null,	null,	null,	null,	null,	null,	null,	null,
        48,	49,	50,	51,	52,	53,	54,	55,	null,	null,	null,	null,	null,	null,	null,	null,
        40,	41,	42,	43,	44,	45,	46,	47,	null,	null,	null,	null,	null,	null,	null,	null,
        32,	33,	34,	35,	36,	37,	38,	39,	null,	null,	null,	null,	null,	null,	null,	null,
        24,	25,	26,	27,	28,	29,	30,	31,	null,	null,	null,	null,	null,	null,	null,	null,
        16,	17,	18,	19,	20,	21,	22,	23,	null,	null,	null,	null,	null,	null,	null,	null,
        8,	9,	10,	11,	12,	13,	14,	15,	null,	null,	null,	null,	null,	null,	null,	null,
        0,	1,	2,	3,	4,	5,	6,	7,	null,	null,	null,	null,	null,	null,	null,	null,
    ],

    board0x88: [
        112,113,114,115,116,117,118,119,
        96,	97,	98,	99,	100,101,102,103,
        80,	81,	82,	83,	84,	85,	86,	87,
        64,	65,	66,	67,	68,	69,	70,	71,
        48,	49,	50,	51,	52,	53,	54,	55,
        32,	33,	34,	35,	36,	37,	38,	39,
        16,	17,	18,	19,	20,	21,	22,	23,
        0,	1,	2,	3,	4,	5,	6,	7,
    ],

    ranksW: [
        7,	7,	7,	7,	7,	7,	7,	7,	null,	null,	null,	null,	null,	null,	null,	null,
        6,	6,	6,	6,	6,	6,	6,	6,	null,	null,	null,	null,	null,	null,	null,	null,
        5,	5,	5,	5,	5,	5,	5,	5,	null,	null,	null,	null,	null,	null,	null,	null,
        4,	4,	4,	4,	4,	4,	4,	4,	null,	null,	null,	null,	null,	null,	null,	null,
        3,	3,	3,	3,	3,	3,	3,	3,	null,	null,	null,	null,	null,	null,	null,	null,
        2,	2,	2,	2,	2,	2,	2,	2,	null,	null,	null,	null,	null,	null,	null,	null,
        1,	1,	1,	1,	1,	1,	1,	1,	null,	null,	null,	null,	null,	null,	null,	null,
        0,	0,	0,	0,	0,	0,	0,	0,	null,	null,	null,	null,	null,	null,	null,	null,
    ],

    ranksB: [
        0,	0,	0,	0,	0,	0,	0,	0,	null,	null,	null,	null,	null,	null,	null,	null,
        1,	1,	1,	1,	1,	1,	1,	1,	null,	null,	null,	null,	null,	null,	null,	null,
        2,	2,	2,	2,	2,	2,	2,	2,	null,	null,	null,	null,	null,	null,	null,	null,
        3,	3,	3,	3,	3,	3,	3,	3,	null,	null,	null,	null,	null,	null,	null,	null,
        4,	4,	4,	4,	4,	4,	4,	4,	null,	null,	null,	null,	null,	null,	null,	null,
        5,	5,	5,	5,	5,	5,	5,	5,	null,	null,	null,	null,	null,	null,	null,	null,
        6,	6,	6,	6,	6,	6,	6,	6,	null,	null,	null,	null,	null,	null,	null,	null,
        7,	7,	7,	7,	7,	7,	7,	7,	null,	null,	null,	null,	null,	null,	null,	null,
    ],

    columns: [
        0,	1,	2,	3,	4,	5,	6,	7,	null,	null,	null,	null,	null,	null,	null,	null,
        0,	1,	2,	3,	4,	5,	6,	7,	null,	null,	null,	null,	null,	null,	null,	null,
        0,	1,	2,	3,	4,	5,	6,	7,	null,	null,	null,	null,	null,	null,	null,	null,
        0,	1,	2,	3,	4,	5,	6,	7,	null,	null,	null,	null,	null,	null,	null,	null,
        0,	1,	2,	3,	4,	5,	6,	7,	null,	null,	null,	null,	null,	null,	null,	null,
        0,	1,	2,	3,	4,	5,	6,	7,	null,	null,	null,	null,	null,	null,	null,	null,
        0,	1,	2,	3,	4,	5,	6,	7,	null,	null,	null,	null,	null,	null,	null,	null,
        0,	1,	2,	3,	4,	5,	6,	7,	null,	null,	null,	null,	null,	null,	null,	null,
    ],

    diagonals1: [
        0,	1,	2,	3,	4,	5,	6,	7,	null,	null,	null,	null,	null,	null,	null,	null,
        1,	2,	3,	4,	5,	6,	7,	8,	null,	null,	null,	null,	null,	null,	null,	null,
        2,	3,	4,	5,	6,	7,	8,	9,	null,	null,	null,	null,	null,	null,	null,	null,
        3,	4,	5,	6,	7,	8,	9,	10,	null,	null,	null,	null,	null,	null,	null,	null,
        4,	5,	6,	7,	8,	9,	10,	11,	null,	null,	null,	null,	null,	null,	null,	null,
        5,	6,	7,	8,	9,	10,	11,	12,	null,	null,	null,	null,	null,	null,	null,	null,
        6,	7,	8,	9,	10,	11,	12,	13,	null,	null,	null,	null,	null,	null,	null,	null,
        7,	8,	9,	10,	11,	12,	13,	14,	null,	null,	null,	null,	null,	null,	null,	null,
    ],

    diagonals2: [
        7,	6,	5,	4,	3,	2,	1,	0,	null,	null,	null,	null,	null,	null,	null,	null,
        8,	7,	6,	5,	4,	3,	2,	1,	null,	null,	null,	null,	null,	null,	null,	null,
        9,	8,	7,	6,	5,	4,	3,	2,	null,	null,	null,	null,	null,	null,	null,	null,
        10,	9,	8,	7,	6,	5,	4,	3,	null,	null,	null,	null,	null,	null,	null,	null,
        11,	10,	9,	8,	7,	6,	5,	4,	null,	null,	null,	null,	null,	null,	null,	null,
        12,	11,	10,	9,	8,	7,	6,	5,	null,	null,	null,	null,	null,	null,	null,	null,
        13,	12,	11,	10,	9,	8,	7,	6,	null,	null,	null,	null,	null,	null,	null,	null,
        14,	13,	12,	11,	10,	9,	8,	7,	null,	null,	null,	null,	null,	null,	null,	null,
    ],

    occupiedTop: 0,
    occupiedBottom: 0,

    ply: 0,

    turn: WHITE,
    castlingRights: [15], //8: wks, 4:wqs, 2:bks, 1: bqs
    lastMove: {},
    enPassantSquares: [null],

    hashkey: 0,
    pawnhashkey: 0,

    zobristKeys: {
        positions: new Map(),
        castlingRights: new Map(),
        turn: new Map(),
        enPassantSquares: new Map()
    },

    loadFen(fen) {
        fen = fen.split(' ')
        let board = fen[0]
        let turn = fen[1] === 'w'? 1 : 2
        let castling = fen[2]
        let enpassantsquare = fen[3]
        let movenumber = fen[5]

        this.movenumber = movenumber

        let castlingRights = 0
        
        // if (!castling) console.log(fen)

        if (castling.indexOf('K') > -1) castlingRights ^= 8
        if (castling.indexOf('Q') > -1) castlingRights ^= 4
        if (castling.indexOf('k') > -1) castlingRights ^= 2
        if (castling.indexOf('q') > -1) castlingRights ^= 1
        
        this.castlingRights = [castlingRights]    

        this.board = this.fen2board(board)
        
        this.whiteKingIndex = this.board.indexOf(K)
        this.blackKingIndex = this.board.indexOf(k)

        
        if (enpassantsquare !== '-') {
            this.enPassantSquares = [this.coords.indexOf(enpassantsquare)]
            // console.log('En Passant Square', this.enPassantSquares)
        } else {
            this.enPassantSquares = [null]
        }
        
        this.initHashkey()
        this.changeTurn(turn)
    },

    fen2board (fen) {
        let board = fen.replace(/1/g, '0')
                    .replace(/2/g, '00')
                    .replace(/3/g, '000')
                    .replace(/4/g, '0000')
                    .replace(/5/g, '00000')
                    .replace(/6/g, '000000')
                    .replace(/7/g, '0000000')
                    .replace(/8/g, '00000000')
    
        board = board.replace(/\//g, '').split('')
    
        board = board.map(e=>{
          let piece = 0
    
          if (e === 'k') piece = 12
          if (e === 'q') piece = 11
          if (e === 'r') piece = 10
          if (e === 'b') piece =  9
          if (e === 'n') piece =  8
          if (e === 'p') piece =  7
          if (e === 'K') piece =  6
          if (e === 'Q') piece =  5
          if (e === 'R') piece =  4
          if (e === 'B') piece =  3
          if (e === 'N') piece =  2
          if (e === 'P') piece =  1
    
          return piece 
        })
    
        let board0x88 = []
    
        for (let i in board) {
          if (i % 8 === 0 && i>0) board0x88 = [...board0x88, null, null, null, null, null, null, null, null]
          board0x88.push(board[i])
        }
    
        board0x88 = [...board0x88, null, null, null, null, null, null, null, null]
    
      return board0x88
    },

    createBoard() {
        //r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 
        let board = [
            r,  n,  b,  q,  k,  b,  n,  r,     null, null, null, null, null, null, null, null,
            p,  p,  p,  p,  p,  p,  p,  p,     null, null, null, null, null, null, null, null,
            0,  0,  0,  0,  0,  0,  0,  0,     null, null, null, null, null, null, null, null,
            0,  0,  0,  0,  0,  0,  0,  0,     null, null, null, null, null, null, null, null,
            0,  0,  0,  0,  0,  0,  0,  0,     null, null, null, null, null, null, null, null,
            0,  0,  0,  0,  0,  0,  0,  0,     null, null, null, null, null, null, null, null,
            P,  P,  P,  P,  P,  P,  P,  P,     null, null, null, null, null, null, null, null,
            R,  N,  B,  Q,  K,  B,  N,  R,     null, null, null, null, null, null, null, null,
        ]

        for (let i = 0; i < 120; i++) {
            this.board[i] = board[i]
        }

        // this.board = [
        //     r,  n,  b,  q,  k,  b,  n,  r,     -8, -4, -4, -2, -2, -4, -4, -8,
        //     p,  p,  p,  p,  p,  p,  p,  p,     -1,  0,  1, -1, -1,  1,  0, -1,
        //     0,  0,  0,  0,  0,  0,  0,  0,      0,  1,  2,  3,  3,  2,  1,  0,
        //     0,  0,  0,  0,  0,  0,  0,  0,      1,  2,  3,  4,  4,  3,  2,  1,
        //     0,  0,  0,  0,  0,  0,  0,  0,      1,  2,  3,  4,  4,  3,  2,  1,
        //     0,  0,  0,  0,  0,  0,  0,  0,      0,  1,  2,  3,  3,  2,  1,  0,
        //     P,  P,  P,  P,  P,  P,  P,  P,     -1,  0,  1, -1, -1,  1,  0, -1,
        //     R,  N,  B,  Q,  K,  B,  N,  R,     -8, -4, -4, -2, -2, -4, -4, -8,
        // ]
        this.whiteKingIndex = this.board.indexOf(K)
        this.blackKingIndex = this.board.indexOf(k)

        this.castlingRights = [1 ^ 2 ^ 4 ^ 8]

        this.turn = WHITE
    },

    boardToBits(draw) {
        let top = ""
        let bottom = ""
        for (let i = 0; i < 120; i++) {
            if (i & 0x88) {
                i+=7; continue
            }

            if (this.board[i]) {
                if (i<=55) {
                    top+="1"
                } else {
                    bottom+="1"
                }
            } else {
                if (i<=55) {
                    top+="0"
                } else {
                    bottom+="0"
                }
            }
        }

        this.occupiedTop = parseInt(top, 2)
        this.occupiedBottom = parseInt(bottom, 2)

        if (draw) {
            this.drawBitboard()
        }
    },

    drawBitboard() {
        console.log(this.occupiedTop.toString(2))
        console.log(this.occupiedBottom.toString(2))
        
    },

    initZobrist() {
        // Inicializa keys Pieza/Casilla
        for (let piece of [k, q, r, b, n, p, P, N, B, R, Q, K]) {
            this.zobristKeys.positions[piece] = new Map()

            for (let i = 0; i < 120; i++) {
                if (i & 0x88) {
                    i += 7
                    continue
                }

                this.zobristKeys.positions[piece][i] = (Math.random()*0xFFFFFFFF) >>> 0
            }
        }

        // Inicializa keys de Turno
        this.zobristKeys.turn[WHITE] = (Math.random()*0xFFFFFFFF) >>> 0
        this.zobristKeys.turn[BLACK] = (Math.random()*0xFFFFFFFF) >>> 0

        // Inicializa keys de Derechos de Enroque
        this.zobristKeys.castlingRights[8] = (Math.random()*0xFFFFFFFF) >>> 0
        this.zobristKeys.castlingRights[4] = (Math.random()*0xFFFFFFFF) >>> 0
        this.zobristKeys.castlingRights[2] = (Math.random()*0xFFFFFFFF) >>> 0
        this.zobristKeys.castlingRights[1] = (Math.random()*0xFFFFFFFF) >>> 0

        // Inicializa keys de Casillas En Passant (negras)
        for (let i=32; i<=39; i++) {
            this.zobristKeys.enPassantSquares[i] = (Math.random()*0xFFFFFFFF) >>> 0
        }
        
        // Inicializa keys de Casillas En Passant (blancas)
        for (let i=80; i<=87; i++) {
            this.zobristKeys.enPassantSquares[i] = (Math.random()*0xFFFFFFFF) >>> 0
        }

        this.initHashkey()
    },

    initHashkey() {
        this.hashkey = 0

        // Inicializa hashkey con piezas del tablero
        for (let i = 0; i < 120; i++) {
            if (i & 0x88) {
                i += 7
                continue
            }

            let piece = this.board[i]

            if (piece === 0) continue

            this.updateHashkey(this.zobristKeys.positions[piece][i])

            if (piece === P || piece === p || piece === K || piece === k) {
                this.updatePawnHashkey(this.zobristKeys.positions[piece][i])
            }
        }
    },

    updateHashkey(value) {
        this.hashkey = ((this.hashkey ^ value) >>> 0)
    },

    updatePawnHashkey(value) {
        this.pawnhashkey = ((this.pawnhashkey ^ value) >>> 0)
    },

    createAttackRays() {
        let attackBoards = new Array(120)
        for (i = 0; i < 120; i++) {
            if (i & 0x88) { i+= 7; continue}

            let board = new Array(120).fill(0)
        }

        console.log(attackBoards[2])
        console.log(attackBoards[51])
        console.log(attackBoards[81])
    },

    colorOfSquare(square) {
        return (0x00AA0055 >> square) & 1
    },

    changeTurn(turn) {
        if (turn) {
            if (turn !== this.turn) {
                this.turn = turn

                // this.updateHashkey(this.zobristKeys.turn[WHITE])
                // this.updateHashkey(this.zobristKeys.turn[BLACK])
            }
        } else {
            this.turn = this.turn === WHITE? BLACK : WHITE // Esto es 35% más rápido que ~turn o -turn o cualquier otra cosa
            // this.updateHashkey(this.zobristKeys.turn[WHITE])
            // this.updateHashkey(this.zobristKeys.turn[BLACK])
        }
    },

    createPieces() {
        this.pieces[0] = {symbol: '.', color: 0, offsets: []}

        //Blancas
        this.pieces[P] = {symbol: 'P', color: WHITE, offsets: [-16, -17, -15]}
        this.pieces[N] = {symbol: 'N', color: WHITE, offsets: [-33, -31, -18, -14, 18, 14, 33, 31]}
        this.pieces[B] = {symbol: 'B', color: WHITE, offsets: [-17, -15, 17, 15]}
        this.pieces[R] = {symbol: 'R', color: WHITE, offsets: [-16, -1, 1, 16]}
        this.pieces[Q] = {symbol: 'Q', color: WHITE, offsets: [-17, -15, -16, -1, 1, 17, 15, 16]}
        this.pieces[K] = {symbol: 'K', color: WHITE, offsets: [-17, -15, -16, -1, 1, 17, 15, 16]}
        
        //Negras
        this.pieces[p] = {symbol: 'p', color: BLACK, offsets: [16, 17, 15]}
        this.pieces[n] = {symbol: 'n', color: BLACK, offsets: [33, 31, 18, 14, -18, -14, -33, -31]}
        this.pieces[b] = {symbol: 'b', color: BLACK, offsets: [17, 15, -17, -15]}
        this.pieces[r] = {symbol: 'r', color: BLACK, offsets: [16, 1, -1, -16]}
        this.pieces[q] = {symbol: 'q', color: BLACK, offsets: [17, 15, 16, 1, -1, -17, -15, -16]}
        this.pieces[k] = {symbol: 'k', color: BLACK, offsets: [17, 15, 16, 1, -1, -17, -15, -16]}
    },

    createPieceList() {
        this.pieceList = {
            pieces: new Map(),
            [k]: 0,
            [q]: 0,
            [r]: 0,
            [b]: 0,
            [n]: 0,
            [p]: 0,
            [P]: 0,
            [N]: 0,
            [B]: 0,
            [R]: 0,
            [Q]: 0,
            [K]: 0,
        }

        for (let i = 0; i < 120; i++) {
            if (i & 0x88) {
                i += 7
                continue
            }

            let piece = this.board[i]

            if (piece) {
                this.pieceList.pieces[piece*10 + this.pieceList[piece]] = i
                this.pieceList[piece]++
            }
        }

    },

    isSlidingPiece(piece, turn) {
        if (turn === WHITE) {
            return piece === B || piece === R || piece === Q
        } else {
            return piece === b || piece === r || piece === q
        }

    },

    //Parameters: piece, from, to, isCapture, capturedPiece, castleSide, enPassantSquares, promotingPiece
    createMove(m) {
        m.key = 10000*m.from + 10000000*m.to + 100*m.capturedPiece + m.piece

        return m
    },

    isSquareAttacked(square, attackerSide, count, xrays) {
        if (square & 0x88) return count? 0 : false

        let pFrom
        let nFrom
        let bFrom
        let rFrom
        let qFrom
        let kFrom
        let pTo  
        let nTo  
        let bTo  
        let rTo  
        let qTo  
        let kTo  

        if (attackerSide === BLACK) {
            pFrom = P
            nFrom = N
            bFrom = B
            rFrom = R
            qFrom = Q
            kFrom = K
            pTo   = p
            nTo   = n
            bTo   = b
            rTo   = r
            qTo   = q
            kTo   = k
        } else {
            pFrom = p
            nFrom = n
            bFrom = b
            rFrom = r
            qFrom = q
            kFrom = k
            pTo   = P
            nTo   = N
            bTo   = B
            rTo   = R
            qTo   = Q
            kTo   = K
        }

        let attacks = 0

        //Peones
        for (let i = 1; i <= 2; i++) {
            let to = square + this.pieces[pFrom].offsets[i]

            if (to & 0x88) continue

            if (this.board[to] === pTo) {
                if (count) {attacks++} else {return true}
            }
        }

        // Alfiles
        for (let i = 0; i < 4; i++) {
            let to = square
            let blocked = false
            let outofbounds = false

            while (!blocked && !outofbounds) {
                to = to + this.pieces[bFrom].offsets[i]

                if (to & 0x88) {
                    outofbounds = true
                } else {
                    if (this.board[to]) {
                        if (this.board[to] === bTo || this.board[to] === qTo) {
                            if (count) {
                                attacks++
                                blocked = true
                            } else {
                                return true
                            }
                        } else {
                            if (!xrays) blocked = true
                        }
                    }
                }
            }
        }

        //Torres
        for (let i = 0; i < 4; i++) {
            let to = square
            let blocked = false
            let outofbounds = false

            while (!blocked && !outofbounds) {
                to = to + this.pieces[rFrom].offsets[i]

                if (to & 0x88) {
                    outofbounds = true
                } else {
                    if (this.board[to]) {
                        if (this.board[to] === rTo || this.board[to] === qTo) {
                            if (count) {
                                attacks++
                                blocked = true
                            } else {
                                return true
                            }
                        } else {
                            if (!xrays) blocked = true
                        }
                    }
                }
            }
        }

        // Caballos
        for (let i = 0; i < 8; i++) {
            let to = square + this.pieces[nFrom].offsets[i]

            if (to & 0x88) continue

            if (this.board[to] === nTo) {
                if (count) {attacks++} else {return true}
            }
        }

        //Rey
        for (let i = 0; i <= 7; i++) {
            let to = square + this.pieces[kFrom].offsets[i]

            if (to & 0x88) continue

            if (this.board[to] === kTo) {
                if (count) {attacks++} else {return true}
            }
        }

        return attacks
    },

    getAttackZone(color) {
        let attackZone = Array(120).fill(0)

        for (let square = 0; square < 120; square++) {
            if (square & 0x88) continue
            let attacks = this.isSquareAttacked(square, color, true)

            attackZone[square] += attacks
        }

        return attackZone
    },

    drawAttackZone(attackZone) {
        let attackString = ''

        for (let i = 0; i < 120; i++) {
            if (i & 0x88) {
                i += 7
                continue
            }

            attackString += attackZone[i]? attackZone[i] + ' ' : '. '

            if (i % 16 === 7) attackString += '\n'
        }

        console.log(attackString)
    },

    getCastlingRights() {
        return this.castlingRights[this.castlingRights.length - 1]
    },

    getMoves(forMobility, onlyCaptures) {
        forMobility = !!forMobility

        let mobilityMoves

        if (forMobility) {
            mobilityMoves = new Array(13).fill({safe:0, unsafe:0})
    
            mobilityMoves[P] = {safe:0, unsafe: 0}
            mobilityMoves[N] = {safe:0, unsafe: 0}
            mobilityMoves[B] = {safe:0, unsafe: 0}
            mobilityMoves[R] = {safe:0, unsafe: 0}
            mobilityMoves[Q] = {safe:0, unsafe: 0}
            mobilityMoves[K] = {safe:0, unsafe: 0}
    
            mobilityMoves[p] = {safe:0, unsafe: 0}
            mobilityMoves[n] = {safe:0, unsafe: 0}
            mobilityMoves[b] = {safe:0, unsafe: 0}
            mobilityMoves[r] = {safe:0, unsafe: 0}
            mobilityMoves[q] = {safe:0, unsafe: 0}
            mobilityMoves[k] = {safe:0, unsafe: 0}
        }
        
        let moves = []

        let moveindex = 0

        let occupied = []//(new Array(32)).fill(0)
        let occupiedIndex = 0
        let isWhite = this.turn === WHITE

        for (let i = 0; i < 120; i++) {
            if (i & 0x88) {
                i+=7; continue
            }

            let piece = this.board[i]

            if (!piece) continue

            let from = i

            if (this.color(piece) !== this.turn) continue

            if (!forMobility && !onlyCaptures) {
                let castlingRights = this.getCastlingRights()
                
                if (piece === K && i === 116) {
                    if (castlingRights & 8) {
                        if (
                            !this.board[117] &&
                            !this.board[118] &&
                            !this.isSquareAttacked(117, BLACK) &&
                            !this.isSquareAttacked(118, BLACK)
                            ) {
                            moves[moveindex++]=(this.createMove({piece: K, from:116, to:118, isCapture:false, capturedPiece:0, castleSide:8, enPassantSquares:null}))
                        }
                    }
                    
                    if (castlingRights & 4) {
                        if (
                            !this.board[115] &&
                            !this.board[114] &&
                            !this.board[113] &&
                            !this.isSquareAttacked(115, BLACK) &&
                            !this.isSquareAttacked(114, BLACK)
                            ) {
                            moves[moveindex++]=(this.createMove({piece: K, from:116, to:114, isCapture:false, capturedPiece:0, castleSide:4, enPassantSquares:null}))
                        }
                    } 
                }
    
                if (piece === k && i === 4) {
                    if (castlingRights & 2) {
                        if (
                            !this.board[5] &&
                            !this.board[6] &&
                            !this.isSquareAttacked(5, WHITE) &&
                            !this.isSquareAttacked(6, WHITE)
                            ) {
                            moves[moveindex++]=(this.createMove({piece: k, from:4, to:6, isCapture:false, capturedPiece:0, castleSide:2, enPassantSquares:null}))
                        }
                    }
                    
                    if (castlingRights & 1) {
                        if (
                            !this.board[3] &&
                            !this.board[2] &&
                            !this.board[1] &&
                            !this.isSquareAttacked(3, WHITE) &&
                            !this.isSquareAttacked(2, WHITE)
                            ) {
                            moves[moveindex++]=(this.createMove({piece: k, from:4, to:2, isCapture:false, capturedPiece:0, castleSide:1, enPassantSquares:null}))
                        }
                    }
                }
            }

            //Peones
            if (piece === P || piece === p) {
                if (true || !forMobility) {
                    for (let j = 0, len=this.pieces[piece].offsets.length; j < len; j++) {
                        let to = from + this.pieces[piece].offsets[j]
    
                        if (to & 0x88) continue
    
                        //Offsets 1 & 2 corresponden a capturas
                        if (j >= 1) {
                            let isCapture = false
        
                            let capturedPiece = this.board[to]
        
                            if (capturedPiece) {
                                if (this.color(capturedPiece) === this.turn) {
                                    continue
                                } else {
                                    isCapture = true

                                    let promotingPiece = null
    
                                    if (to>=0 && to <= 7) {
                                        promotingPiece = Q
                                    }
                                    
                                    if (to>=112 && to <= 119) {
                                        promotingPiece = q
                                    }

                                    moves[moveindex++]=(this.createMove({piece, from, to, isCapture, capturedPiece, castleSide:0, enPassantSquares:null, promotingPiece}))    
                                }
                            } else {
                                let lastEP = this.enPassantSquares[this.enPassantSquares.length - 1]
                                if (to === lastEP) {
                                    isCapture = false
                                    //En passant move

                                    moves[moveindex++]=(this.createMove({piece, from, to, isCapture, capturedPiece:0, castleSide:0, enPassantSquares:null, enPassant: true}))
                                    epnodes++
                                }
                            }
                            
                        } else {
                            // let to = from + this.pieces[piece].offsets[0]
                            
                            // if (to & 0x88) continue
                            
                            let blockingPiece = this.board[to]
                            let promotingPiece = null
                            
                            if (blockingPiece) {
                                continue
                            }
                            
                            if (to>=0 && to <= 7) {
                                promotingPiece = Q
                            }
                            
                            if (to>=112 && to <= 119) {
                                promotingPiece = q
                            }

                            if (onlyCaptures && !promotingPiece) continue

                            moves[moveindex++]=(this.createMove({piece, from, to, isCapture:false, capturedPiece:0, castleSide:0, enPassantSquares:null, promotingPiece}))
    
                            let whitePawns = this.turn === WHITE && from >= 96 && from <= 103
                            let blackPawns = this.turn === BLACK && from >= 16 && from <= 23
    
                            if (whitePawns || blackPawns) {
                                let enPassantSquares = to
                                
                                to = to + this.pieces[piece].offsets[0]
    
                                if (to & 0x88) continue
    
                                if (this.board[to]) continue
                                //Doble push
                                let doublePushMove = this.createMove({piece, from, to, isCapture:false, capturedPiece:0, castleSide:0, enPassantSquares})
                                moves[moveindex++]=(doublePushMove)
                            }
                        }
                    }
    
                    continue
                }
            } else {
                for (let j=0, len = this.pieces[piece].offsets.length; j < len; j++) {
                    let to = i
                    
                    while (true) {
                        to += this.pieces[piece].offsets[j]
                        
                        if (to & 0x88) break
                        
                        let isCapture = false
    
                        let capturedPiece = this.board[to]
    
                        if (capturedPiece) {
                            if (this.color(capturedPiece) === this.turn) {
                                break
                            } else {
                                isCapture = true
                            }
                        } else {
                            if (onlyCaptures) continue
                        }
    
                        if (forMobility) {
                            mobilityMoves[piece].unsafe++

                            let safe = true
                            
                            if (this.turn === WHITE) {
                                if (this.board[to - 15] === p || this.board[to - 17] === p) safe = false
                            } else {
                                if (this.board[to + 15] === P || this.board[to + 17] === P) safe = false
                            }
                            
                            if (safe) {
                                mobilityMoves[piece].safe++
                            }
                            
                        } else {
                            moves[moveindex++]=(this.createMove({piece, from, to, isCapture, capturedPiece, castleSide:0, enPassantSquares:null}))
                        }
    
                        if (isCapture || piece === N || piece === n || piece === K || piece === k) {
                            break
                        }
                    }
                }
            }
            
        }

        if (forMobility) return mobilityMoves

        return moves
    },

    evaluate() {
        let material = 0
        let psqt = 0
        
        for (let i = 0; i < 120; i++) {
            if (i & 0x88) {
                i+=7; continue
            }
            let piece = this.board[i]
            if (!piece) continue
            material += 100*piece
            psqt += this.board[i+8] * this.color(piece)
        }

        let score = orobas.color(orobas.turn) * (material + psqt)

        return  score
    },

    draw() {
        let board = ''
        for (let i = 0; i < 120; i++) {
            if (i & 0x88) {
                i += 7
                continue
            }

            let piece = this.board[i]

            board += this.pieces[piece].symbol + ' '

            if (i % 16 === 7) board += '\n'
        }
        console.log(board)
    },

    makeMove(move, illegal) {
        let me = this.turn
        let enemy = this.turn === WHITE? BLACK : WHITE

        if (move.castleSide) {
            let canCastle = move.castleSide & this.getCastlingRights()
            
            if (!canCastle) {
                return false
            }
            
            let from
            let square1
            let to

            if (move.castleSide === 8)  {
                if (this.board[117] || this.board[118]) return false

                if (!this.board[119]) return false

                from = 116; square1 = 117; to = 118
            } else if (move.castleSide === 4)  {
                if (this.board[115] || this.board[114] || this.board[113]) return false

                if (!this.board[112]) return false
                
                from = 116; square1 = 115; to = 114
            } else if (move.castleSide === 2)  {
                if (this.board[5] || this.board[6]) return false
                if (!this.board[7]) return false
                
                from = 4; square1 = 5; to = 6
            } else {
                if (this.board[3] || this.board[2] || this.board[1]) return false
                if (!this.board[0]) return false

                from = 4; square1 = 3; to = 2
            }
            
            if (this.isSquareAttacked(from, enemy)) {
                return false
            }
            if (this.isSquareAttacked(square1, enemy)) {
                return false
            }
            if (this.isSquareAttacked(to, enemy)) {
                return false
            }
        }
        
        this.makeEffectiveMove(move)

        
        //Chequea legalidad
        
        if (this.isKingInCheck()) {
            this.unmakeMove(move)
            
            this.changeTurn()
            return false
        }
        
        this.changeTurn()

        return true
    },

    makeEffectiveMove(move) {
        this.ply++

        // Remueve pieza capturada de casilla de destino
        if (move.isCapture) {
            this.removePiece(move.capturedPiece, move.to)
        }

        // Quita la pieza de casilla de origen
        this.removePiece(move.piece, move.from)
        
        if (move.promotingPiece) {
            this.addPîece(move.promotingPiece, move.to)
        } else {
            this.addPîece(move.piece, move.to)
        }

        if (move.piece === K) this.setKingPosition(WHITE, move.to)
        if (move.piece === k) this.setKingPosition(BLACK, move.to)

        if (move.enPassant) {
            if (this.turn === WHITE) {
                this.removePiece(p, move.to + 16)
            } else {
                this.removePiece(P, move.to - 16)
            }
        }
        
        if (move.enPassantSquares) {
            let lastEnPassantSquare = this.enPassantSquares[this.enPassantSquares.length - 1]
            this.updateHashkey(this.zobristKeys.enPassantSquares[lastEnPassantSquare]) // Quita última casilla e.p.
            this.updateHashkey(this.zobristKeys.enPassantSquares[move.enPassantSquares]) // Agrega nuevo e.p.
        }
        
        this.enPassantSquares.push(move.enPassantSquares)

        let castlingRights = this.getCastlingRights()

        if (move.castleSide) {
            if (move.castleSide === 8) {
                this.removePiece(R, 119)
                this.addPîece(R, 117)
                
                castlingRights = castlingRights & ~8 & ~4
            }
            
            if (move.castleSide === 4) {
                this.removePiece(R, 112)
                this.addPîece(R, 115)
                
                castlingRights = castlingRights & ~8 & ~4
            }

            if (move.castleSide === 2) {
                this.removePiece(r, 7)
                this.addPîece(r, 5)

                castlingRights = castlingRights & ~2 & ~1
            }


            if (move.castleSide === 1) {
                this.removePiece(r, 0)
                this.addPîece(r, 3)

                castlingRights = castlingRights & ~2 & ~1
            }
        } else {
            
        }
        if ((castlingRights & 8) && (move.piece === K || (move.piece === R && move.from === 119) || move.to === 119)) {
            castlingRights = castlingRights & ~8
        }

        if ((castlingRights & 4) && (move.piece === K || (move.piece === R && move.from === 112) || move.to === 112)) {
            castlingRights = castlingRights & ~4
        
        }

        if ((castlingRights & 2) && (move.piece === k || (move.piece === r && move.from === 7) || move.to === 7)) {
            castlingRights = castlingRights & ~2
        }

        if ((castlingRights & 1) && (move.piece === k || (move.piece === r && move.from === 0) || move.to === 0)) {
            castlingRights = castlingRights & ~1
        }
        
        this.castlingRights.push(castlingRights)
    },

    unmakeMove(move) {
        this.ply--

        if (move.promotingPiece) {
            this.removePiece(move.promotingPiece, move.to)
        } else {
            this.removePiece(move.piece, move.to)
        }
        
        if (move.capturedPiece) {
            this.addPîece(move.capturedPiece, move.to)
        }
        
        this.addPîece(move.piece, move.from)

        if (move.piece === K) this.setKingPosition(WHITE, move.from)
        if (move.piece === k) this.setKingPosition(BLACK, move.from)

        if (move.enPassant) {
            if (this.turn === BLACK) {
                this.addPîece(p, move.to + 16)

            } else {
                this.addPîece(P, move.to - 16)
            }
        }

        if (move.castleSide) {
            if (move.castleSide === 8) {
                this.removePiece(R, 117)
                this.addPîece(R, 119)
            }
            
            if (move.castleSide === 4) {
                this.removePiece(R, 115)
                this.addPîece(R, 112)
            }
            
            if (move.castleSide === 2) {
                this.removePiece(r, 5)
                this.addPîece(r, 7)
            }

            if (move.castleSide === 1) {
                this.removePiece(r, 3)
                this.addPîece(r, 0)
            }
        }

        this.castlingRights.pop()
        this.enPassantSquares.pop()

        if (move.enPassantSquares) {
            let lastEnPassantSquare = this.enPassantSquares[this.enPassantSquares.length - 1] // El penúltimo
            this.updateHashkey(this.zobristKeys.enPassantSquares[move.enPassantSquares]) // Quita e.p.
            this.updateHashkey(this.zobristKeys.enPassantSquares[lastEnPassantSquare]) // Agrega e.p. anterior
        }
        
        this.changeTurn()

    },

    addPîece(piece, square) {
        this.updateHashkey(this.zobristKeys.positions[piece][square]) //Agrega pieza al hashkey en casilla de destino

        if (piece === P || piece === p || piece === K || piece === k) {
            this.updatePawnHashkey(this.zobristKeys.positions[piece][square]) //Agrega pieza al hashkey en casilla de destino
        }

        this.board[square] = piece
    },

    removePiece(piece, square) {
        
        this.updateHashkey(this.zobristKeys.positions[piece][square]) //Quita pieza del hashkey de su casilla original
        
        if (piece === P || piece === p || piece === K || piece === k) {
            this.updatePawnHashkey(this.zobristKeys.positions[piece][square]) //Quita pieza del hashkey de su casilla original
        }
        
        this.board[square] = 0
    },

    setKingPosition(turn, square) {
        if (turn === WHITE) {
            this.whiteKingIndex = square
        } else {
            this.blackKingIndex = square
        }
    },
 
    color(piece) {
        return piece >= p? BLACK : WHITE
    },

    perftData: {
        nodes: 0,
        castles: 0,
        captures: 0,
        enpassant: 0,
        checkmates: 0,
        checks: 0
    },

    isKingInCheck() {
        if (this.turn === WHITE) {
            return this.isSquareAttacked(this.whiteKingIndex, BLACK, false)
            
        } else {
            return this.isSquareAttacked(this.blackKingIndex, WHITE, false)

        }
    },

    perft(depth) {
    
        if (depth === 0) {
            this.perftData.nodes++
            return 1
        }
        
        let nodes = 0
        let moves = this.getMoves(false, false)
        
        let legal = 0

        for (let j = 0; j < moves.length; j++) {
            
            if (orobas.makeMove(moves[j])) {
                legal++

                let incheck = this.isKingInCheck()

                if (incheck) this.perftData.checks++

                if (moves[j].isCapture || moves[j].enPassant) this.perftData.captures++
                if (moves[j].castleSide) this.perftData.castles++
                if (moves[j].enPassant) this.perftData.enpassant++

                nodes += this.perft(depth - 1)

                orobas.unmakeMove(moves[j])
            }
        }

        if (legal === 0) {
            this.perftData.checkmates++
        }

        return nodes
    },

    init(silent) {

        if (!silent) console.log('Creating new game!!!!!')
        this.createBoard()
        this.createPieces()
        this.createPieceList()
        this.initZobrist()
        if (!silent) this.draw()
    }
}

let epnodes = 0

orobas.init()

// const {sort} = require('fast-sort')
// require('fast-filter').install('filter')

// let seedrandom = require('seedrandom')
// let rnd = new seedrandom('orobas1234', {global: true})

Math.abs = (x) => {
    let y = (x >> 31);
    return (x ^ y) - y;
}

let AI = {
    version: "3.1.1",
    totaldepth: 48,
    ttNodes: 0,
    collisions: 0,
    iteration: 0,
    qsnodes: 0,
    nodes: 0,
    pnodes: 0, //Pawn structure nodes
    phnodes: 0, //Pawn hash nodes
    pvnodes: 0, //Pawn attack hash nodes
    rnodes: 0, //Random pruned nodes
    evalhashnodes: 0,
    evalnodes: 0,
    evalTime: 0,
    genMovesTime: 0,
    moveTime: 0,
    status: null,
    fhf: 0,
    fh: 0,
    random: 0,
    phase: 0,
    htlength: 8e6,
    pawntlength: 5e5,
    mindepth: [4,4,4,4],
    secondspermove: 0.2,
    lastmove: null,
    f: 0,
    previousls: 0,
    lastscore: 0,
    nullWindowFactor: 20 // +132 ELO
}

// ÍNDICES
const PAWN = 1
const KNIGHT = 2
const BISHOP = 3
const ROOK = 4
const QUEEN = 5
const KING = 6

// const K = KING
// const Q = QUEEN
// const R = ROOK
// const B = BISHOP
// const N = KNIGHT
// const P = PAWN
// const k = KING + 6
// const q = QUEEN + 6
// const r = ROOK + 6
// const b = BISHOP + 6
// const n = KNIGHT + 6
// const p = PAWN + 6

// const WHITE = 1
// const BLACK = 2

const CENTER = [51,52,67,68]

const WIDECENTER = [50,51,52,53,66,67,68,69]

const WHITEINDEX = [1,2,3,4,5,6]
const BLACKINDEX = [7,8,9,10,11,12]
const ALLINDEX = [1,2,3,4,5,6,7,8,9,10,11,12]

const ABS = new Map()

ABS[0] = 0
ABS[k] = K
ABS[q] = Q
ABS[r] = R
ABS[b] = B
ABS[n] = N
ABS[p] = P
ABS[P] = P
ABS[N] = N
ABS[B] = B
ABS[R] = R
ABS[Q] = Q
ABS[K] = K

const OPENING = 0
const MIDGAME = 1
const EARLY_ENDGAME = 2
const LATE_ENDGAME = 3

const LOWERBOUND = -1
const EXACT = 0
const UPPERBOUND = 1

const VPAWN = 100
const VPAWN2 = VPAWN / 2 | 0
const VPAWN3 = VPAWN / 3 | 0
const VPAWN4 = VPAWN / 4 | 0
const VPAWN5 = VPAWN / 5 | 0
const VPAWN10= VPAWN /10 | 0
const VPAWNx2 = 2*VPAWN | 0

const MARGIN1 = VPAWN/AI.nullWindowFactor | 0
const MARGIN2 = VPAWN*2/AI.nullWindowFactor | 0
const MARGIN3 = VPAWN*3/AI.nullWindowFactor | 0
const MARGIN10 = VPAWN*10/AI.nullWindowFactor | 0
const SMALLMARGIN = (VPAWN/2)/AI.nullWindowFactor | 0
const VERYSMALLMARGIN = (VPAWN/4)/AI.nullWindowFactor | 0

AI.PIECE_VALUES = [
    new Map(),
    new Map(),
    new Map(),
    new Map(),
]

AI.PSQT_OPENING =  [null]
AI.PSQT_LATE_ENDGAME =  [null]
AI.MOB = new Array(7).fill([0,0,0])

AI.PAR = []

AI.FACTOR = []

AI.DEFENDED_VALUES = []

// AI.PAR = [
//     40, //0 center control
//     20, //1 outer center lever
//     15, //2 outer center lever 2
//     40, //3 knight mobility blocker
//     20, //4 Blocks knight mobility
//     12, //5 Semi outpost
//     20, //6 bishop x-rays
//     10, //7 pawn in front of outpost bishop
//     20, //8 outpost bishop in rank 6
//     15, //9 knight semi outpost
//     10, //10 enemy pawn in front of outpost knight
//     20, //11 outpost knight in rank 6
//     20, //12 Rook x-rays
//     10, //13 defended rook in rank 5
//     20, //14 queen x-rays
//     20, //15 is king under attack1
//     20, //16 is king under attack2
//     20, //17 is king under attack3,
//     10, //18 pawns at same squares as bishops
//     10, //19 Expensive center control ---
//     10, //20 Occupied by 1 ---
//     5,  //21 Occupied by 2 ---
//     10, //22 incentive for keeping queens and rooks in advantage ---
//     10, //23 blocked pawns with knights ---
//     5,  //24 pawn span midgame --- 
//     10, //25 pawn span endgame ---
//     10, //26 adjacent bishops
//     10, //27 Rook battery

//     //Shield
//     10, //28 King in center
//     15, //29 bishop in front of king

//     //Structure
//     20, //30 pawn imbalance
//     40, //31 backward pawns
//     10, //32 space

//      //Bishops
//     100, //33 in front of pawn at opening
//      40, //34 blocked by own pawn
// ]

// AI.FACTOR = [
    //     100, // 0 BLOCKEDPAWNBONUS
    //     100, // 1 DEFENDEDPAWNBONUS
    //     100, // 2 ALIGNEDPAWNBONUS
    //     100, // 3 NEIGHBOURPAWNBONUS
    //     100, // 4 LEVERPAWNBONUS
    //     100, // 5 PASSERSBONUS
    //     100, // 6 DOUBLEDPENALTY
    //     100, // 7 OUTPOSTBONUSKNIGHT
    //     100, // 8 OUTPOSTBONUSBISHOP
// ]

importScripts('psqtbonus.js')
importScripts('pawnbonus.js')
importScripts('piecedistancebonus.js')
importScripts('parameters.js')

console.log(AI.PIECE_VALUES[OPENING])

console.log('Max material value', AI.maxMaterialValue)

// CONSTANTES
const MATE = (AI.maxMaterialValue + 16*VPAWN) / AI.nullWindowFactor | 0
const DRAW = 0
const INFINITY = MATE + 1 | 0

const EMPTYMOVE = {
    key: 0
}

AI.ZEROINDEX = new Map()

AI.ZEROINDEX[P] = 0
AI.ZEROINDEX[N] = 1
AI.ZEROINDEX[B] = 2
AI.ZEROINDEX[R] = 3
AI.ZEROINDEX[Q] = 4
AI.ZEROINDEX[K] = 5
AI.ZEROINDEX[p] = 0
AI.ZEROINDEX[n] = 1
AI.ZEROINDEX[b] = 2
AI.ZEROINDEX[r] = 3
AI.ZEROINDEX[q] = 4
AI.ZEROINDEX[k] = 5

//CREA TABLA PARA REDUCCIONES
AI.LMR_TABLE = new Array(AI.totaldepth + 1)

for (let depth = 1; depth < AI.totaldepth + 1; depth++) {

    AI.LMR_TABLE[depth] = new Array(218)

    for (let moves = 1; moves < 218; moves++) {
        AI.LMR_TABLE[depth][moves] = Math.log(depth)*Math.log(moves)/1.95 | 0
    }
}

AI.CENTERMANHATTAN = [
    6, 5, 4, 3, 3, 4, 5, 6,  null,  null,  null,  null,  null,  null,  null,  null,
    5, 4, 3, 2, 2, 3, 4, 5,  null,  null,  null,  null,  null,  null,  null,  null,
    4, 3, 2, 1, 1, 2, 3, 4,  null,  null,  null,  null,  null,  null,  null,  null,
    3, 2, 1, 0, 0, 1, 2, 3,  null,  null,  null,  null,  null,  null,  null,  null,
    3, 2, 1, 0, 0, 1, 2, 3,  null,  null,  null,  null,  null,  null,  null,  null,
    4, 3, 2, 1, 1, 2, 3, 4,  null,  null,  null,  null,  null,  null,  null,  null,
    5, 4, 3, 2, 2, 3, 4, 5,  null,  null,  null,  null,  null,  null,  null,  null,
    6, 5, 4, 3, 3, 4, 5, 6,  null,  null,  null,  null,  null,  null,  null,  null,
]

let manhattanDistance = (board, sq1, sq2)=> {
    sq1 = board.board64[sq1] // from 0x88 to 64
    sq2 = board.board64[sq2] // from 0x88 to 64
    let file1, file2, rank1, rank2;
    let rankDistance, fileDistance;
    file1 = sq1  & 7;
    file2 = sq2  & 7;
    rank1 = sq1 >> 3;
    rank2 = sq2 >> 3;
    rankDistance = Math.abs(rank2 - rank1);
    fileDistance = Math.abs(file2 - file1);
    return rankDistance + fileDistance;
}

// Chebyshev distance
let distance = (board, sq1, sq2)=>{
    sq1 = board.board64[sq1] // from 0x88 to 64
    sq2 = board.board64[sq2] // from 0x88 to 64

    let file1, file2, rank1, rank2
    let rankDistance, fileDistance
    file1 = sq1  & 7
    file2 = sq2  & 7
    rank1 = sq1 >> 3
    rank2 = sq2 >> 3
    rankDistance = Math.abs(rank2 - rank1)
    fileDistance = Math.abs(file2 - file1)
    return Math.max(rankDistance, fileDistance)
}

// MVV-LVA
// Valor para determinar orden de capturas,
// prefiriendo la víctima más valiosa con el atacante más débil
//https://open-chess.org/viewtopic.php?t=3058
// /*P*/[6002, 20225, 20250, 20400, 20800, 26900],
let mvvlvaScores = [
    /* P      N      B      R      Q      K
/*P*/[6100, 20225, 20250, 20400, 20800, 26900],
/*N*/[4775,  6004, 20025, 20175, 20575, 26675],
/*B*/[4750,  4975,  6006, 20150, 20550, 26650],
/*R*/[4600,  4825,  4850,  6008, 20400, 26500],
/*Q*/[4200,  4425,  4450,  4600,  6010, 26100],
/*K*/[3100,  3325,  3350,  3500,  3900, 26000],
]

AI.MVVLVASCORES = []
for (let e of ALLINDEX) {
    AI.MVVLVASCORES[e] = []
    for (let f of ALLINDEX) {
        let score = mvvlvaScores[AI.ZEROINDEX[e]][AI.ZEROINDEX[f]]

        AI.MVVLVASCORES[e][f] = score
    }
}

AI.PSQT = [
    Array(64).fill(0),
    Array(64).fill(0),
    Array(64).fill(0),
    Array(64).fill(0),
    Array(64).fill(0),
    Array(64).fill(0),
]

// CREA TABLAS DE TRASPOSICIÓN / PEONES / HISTORIA
AI.createTables = function (board, tt, ev, hh, pp) {
    // console.log('Creating tables', tt, ev, hh, pp)

    if (hh) {
        if  (AI.history) {
            AI.history.splice(0,2)
        }

        AI.history = new Array(AI.totaldepth + 1)

        for (let ply = 0; ply < AI.totaldepth + 1; ply++) {
            AI.history[ply] = new Map()
            
            AI.history[ply][K] = Array(120).fill(0)
            AI.history[ply][Q] = Array(120).fill(0)
            AI.history[ply][R] = Array(120).fill(0)
            AI.history[ply][B] = Array(120).fill(0)
            AI.history[ply][N] = Array(120).fill(0)
            AI.history[ply][P] = Array(120).fill(0)
            
            AI.history[ply][k] = Array(120).fill(0)
            AI.history[ply][q] = Array(120).fill(0)
            AI.history[ply][r] = Array(120).fill(0)
            AI.history[ply][b] = Array(120).fill(0)
            AI.history[ply][n] = Array(120).fill(0)
            AI.history[ply][p] = Array(120).fill(0)
        }

    }


    if (tt) {
        delete AI.hashTable
        AI.hashTable = [null, new Array(this.htlength).fill(null), new Array(this.htlength).fill(null)]
    }

    if (ev) {
        delete AI.evalTable
        AI.evalTable = (new Array(this.htlength)).fill(null)
    }

    if (pp) {
        delete AI.pawnTable
        AI.pawnTable = (new Array(this.pawntlength)).fill(null)

        AI.phnodes = 0
        AI.pnodes = 0
    }
}

//ESTABLECE VALORES ALEATORIAS EN LA APERTURA (PARA TESTEOS)
AI.randomizePSQT = function () {
    if (AI.phase === OPENING) {
        //From Knight to Queen
        for (let i of WHITEINDEX) {
            AI.PSQT[i] = AI.PSQT[i].map(e => {
                return e + Math.random() * AI.random - AI.random / 2 | 0
            })
        }
    }
}

AI.microeval = {
    [P]: (board, i)=> {
        let positionalScore = 0
        //Defended
        if (board.board[i+15] === P || board.board[i+17] === P) {
            positionalScore += AI.DEFENDEDPAWNBONUS[i]
        }

        //Aligned
        if (board.board[i+1] === P || board.board[i-1] === P) {
            positionalScore += AI.ALIGNEDPAWNBONUS[i]
        }

        //Neighbour
        if (board.board[i+2] === P || board.board[i-2] === P) {
            positionalScore += AI.NEIGHBOURPAWNBONUS[i]
        }

        //Levers
        if (board.board[i-15] === p || board.board[i-17] === p) {
            positionalScore += AI.LEVERPAWNBONUS[i]
        }

        //Knight mobility blocker
        if (board.board[i-50] === n || board.board[i-46] === n) {
            positionalScore += AI.PAR[AI.phase][3]
        }


        if (AI.phase <= MIDGAME) {
            //Center control
            if (i === 68 && board.board[51] === 0) positionalScore+=AI.PAR[AI.phase][0]
            if (i === 67 && board.board[52] === 0) positionalScore+=AI.PAR[AI.phase][0]

            // Outer central lever
            if (i === 66 && (board.board[51] === p || board.board[51] === 0)) {
                positionalScore+=AI.PAR[AI.phase][1]

                if (board.board[81] === P || board.board[83] === P) positionalScore += AI.PAR[AI.phase][2]
            } 
            
            if (i === 69 && (board.board[52] === p || board.board[52] === 0)) {
                positionalScore+=AI.PAR[AI.phase][1]

                if (board.board[84] === P || board.board[86] === P) positionalScore += AI.PAR[AI.phase][2]
            }
        }

        return positionalScore
    },

    [p]: (board,i)=>{
        let positionalScore = 0

        //Defended
        if (board.board[i-15] === p || board.board[i-17] === p) {
            positionalScore -= AI.DEFENDEDPAWNBONUS[112^i]
        }

        //Aligned
        if (board.board[i+1] === p || board.board[i-1] === p) {
            positionalScore -= AI.ALIGNEDPAWNBONUS[112^i]
        }

        //Neighbour
        if (board.board[i+2] === p || board.board[i-2] === p) {
            positionalScore -= AI.NEIGHBOURPAWNBONUS[112^i]
        }

        //Levers
        if (board.board[i+15] === P || board.board[i+17] === P) {
            positionalScore -= AI.LEVERPAWNBONUS[112^i]
        }

        //Knight mobility blocker
        if (board.board[i+50] === N || board.board[i+46] === N) {
            positionalScore -= AI.PAR[AI.phase][3]
        }

        if (AI.phase <= MIDGAME) {
            //Center control
            if (i === 51 && board.board[68] === 0) positionalScore-=AI.PAR[AI.phase][0]
            if (i === 52 && board.board[67] === 0) positionalScore-=AI.PAR[AI.phase][0]

            //Outer central lever
            if (i === 50 && (board.board[67] === P || board.board[67] === 0)) {
                positionalScore-=AI.PAR[AI.phase][1]
                if (board.board[33] === p || board.board[35] === p) positionalScore -= AI.PAR[AI.phase][2]
            } 
            if (i === 53 && (board.board[68] === P || board.board[68] === 0)) {
                positionalScore-=AI.PAR[AI.phase][1]
                if (board.board[36] === p || board.board[38] === p) positionalScore -= AI.PAR[AI.phase][2]
            } 
        }

        return positionalScore
    },

    [B]: (board, i)=>{
        let positionalScore = 0

        if (AI.phase === OPENING) {
            // In front of pawn at opening
            if ((i === 83 || i === 84) && board.board[i+16] === P) positionalScore -= AI.PAR[AI.phase][33]

            // Bishop blocked by own pawns
            if (board.board[i-15] === P) positionalScore -= AI.PAR[AI.phase][34]
            if (board.board[i-17] === P) positionalScore -= AI.PAR[AI.phase][34]
        }

        // Blocks knight mobility
        if (board.board[i-48] === n) positionalScore += AI.PAR[AI.phase][4]

        //Semi outpost
        if (AI.phase <= MIDGAME && board.ranksW[i] >= 3 && board.board[i-16] === P) positionalScore+=AI.PAR[AI.phase][5]

        //X-Rays
        if (board.diagonals1[i] === board.diagonals1[board.blackKingIndex]) {
            positionalScore += AI.PAR[AI.phase][6]
        } else if (board.diagonals2[i] === board.diagonals2[board.blackKingIndex]) {
            positionalScore += AI.PAR[AI.phase][6]
        }

        if (board.board[i + 15] === P || board.board[i + 17] === P) {
            positionalScore += AI.OUTPOSTBONUSBISHOP[i]

            //pawn in front of outpost bishop
            if (board.board[i-16] === p) positionalScore += AI.PAR[AI.phase][7]

            //outpost bishop in rank 6
            if (board.ranksW[i] === 6) positionalScore += AI.PAR[AI.phase][8]
        }

        return positionalScore
    },

    [b]: (board, i)=>{
        let positionalScore = 0

        if (AI.phase === OPENING) {
            // In front of pawn at opening
            if ((i === 35 || i === 36) && board.board[i-16] === p) positionalScore += AI.PAR[AI.phase][33]

            // Bishop blocked by own pawns
            if (board.board[i+15] === p) positionalScore += AI.PAR[AI.phase][34]
            if (board.board[i+17] === p) positionalScore += AI.PAR[AI.phase][34]
        }

        // Blocks knight mobility
        if (board.board[i+48] === N) positionalScore -= AI.PAR[AI.phase][4]

        //Semi outpost
        if (board.ranksB[i] >= 3 && board.board[i+16] === p) positionalScore-=AI.PAR[AI.phase][5]

        // X-Rays
        if (board.diagonals1[i] === board.diagonals1[board.whiteKingIndex]) {
            positionalScore -= AI.PAR[AI.phase][6]
        } else if (board.diagonals2[i] === board.diagonals2[board.whiteKingIndex]) {
            positionalScore -= AI.PAR[AI.phase][6]
        }

        if (board.board[i - 15] === p || board.board[i - 17] === p) {
            positionalScore -= AI.OUTPOSTBONUSBISHOP[112^i]

            //pawn in front of outpost bishop
            if (board.board[i+16] === P) positionalScore -= AI.PAR[AI.phase][7]

            //outpost bishop in rank 6
            if (board.ranksB[i] === 6) positionalScore -= AI.PAR[AI.phase][8]
        }

        return positionalScore
    },

    [N]: (board, i)=>{
        let positionalScore = 0

        // Semi outpost
        if (AI.phase <= EARLY_ENDGAME && board.board[i-16] === P) positionalScore+=AI.PAR[AI.phase][9]

        if (board.board[i + 15] === P || board.board[i + 17] === P) {
            positionalScore += AI.OUTPOSTBONUSKNIGHT[i]

            //enemy pawn in front of outpost knight
            if (board.board[i-16] === p) positionalScore += AI.PAR[AI.phase][10]

            //outpost knight in rank 6
            if (board.ranksW[i] === 6) positionalScore += AI.PAR[AI.phase][11]
        }

        return positionalScore
    },

    [n]: (board, i)=>{
        let positionalScore = 0

        // Semi outpost
        if (AI.phase <= EARLY_ENDGAME && board.board[i+16] === p) positionalScore-=AI.PAR[AI.phase][9]

        if (board.board[i - 15] === p || board.board[i - 17] === p) {
            positionalScore -= AI.OUTPOSTBONUSKNIGHT[112^i]

            if (board.board[i+16] === P) positionalScore -= AI.PAR[AI.phase][10]

            if (board.ranksB[i] === 6) positionalScore -= AI.PAR[AI.phase][11]
        }

        return positionalScore
    },

    [R]: (board, i)=>{
        let positionalScore = 0

        // X-Rays
        if (board.columns[i] === board.columns[board.blackKingIndex]) positionalScore += AI.PAR[AI.phase][12]
        if (board.ranksW[i] === board.ranksW[board.blackKingIndex]) positionalScore += AI.PAR[AI.phase][12]

        //defended rook in rank 5
        if (board.ranksW[i] === 5) {
            if (board.board[i + 15] === P || board.board[i + 17] === P) positionalScore += AI.PAR[AI.phase][13]
        }

        //Rook in 7th
        if (board.ranksW[board.blackKingIndex] - board.ranksW[i] === 1 ) {
            positionalScore += 40
        }

        return positionalScore
    },

    [r]: (board, i)=>{
        let positionalScore = 0

        // X-Rays
        if (board.columns[i] === board.columns[board.whiteKingIndex]) positionalScore -= AI.PAR[AI.phase][12]
        if (board.ranksB[i] === board.ranksB[board.whiteKingIndex]) positionalScore -= AI.PAR[AI.phase][12]

        //defended rook in rank 5
        if (board.ranksB[i] === 5) {
            if (board.board[i - 15] === p || board.board[i - 17] === p) positionalScore -= AI.PAR[AI.phase][13]
        }

        //Rook in 7th
        if (board.ranksB[board.whiteKingIndex] - board.ranksB[i] === 1 ) {
            positionalScore -= 40
        }

        return positionalScore
    },

    [Q]: (board, i)=>{
        let positionalScore = 0

        if (board.diagonals1[i] === board.diagonals1[board.blackKingIndex]) {
            positionalScore += AI.PAR[AI.phase][14]
        } else if (board.diagonals2[i] === board.diagonals2[board.blackKingIndex]) {
            positionalScore += AI.PAR[AI.phase][14]
        }

        if (board.columns[i] === board.columns[board.blackKingIndex]) {
            positionalScore += AI.PAR[AI.phase][14]
        } else if (board.ranksW[i] === board.ranksW[board.blackKingIndex]) {
            positionalScore += AI.PAR[AI.phase][14]
        }

        return positionalScore
    },

    [q]: (board, i)=>{
        let positionalScore = 0

        if (board.diagonals1[i] === board.diagonals1[board.whiteKingIndex]) {
            positionalScore -= AI.PAR[AI.phase][14]
        } else if (board.diagonals2[i] === board.diagonals2[board.whiteKingIndex]) {
            positionalScore -= AI.PAR[AI.phase][14]
        }

        if (board.columns[i] === board.columns[board.whiteKingIndex]) {
            positionalScore -= AI.PAR[AI.phase][14]
        } else if (board.ranksB[i] === board.ranksB[board.whiteKingIndex]) {
            positionalScore -= AI.PAR[AI.phase][14]
        }

        return positionalScore
    },

    [K]: (board, i)=>{
        let positionalScore = 0

        // if (board.whiteKingIndex === 118 && board.board[119] === R) positionalScore -= VPAWN
        // if (board.whiteKingIndex === 117 && board.board[119] === R) positionalScore -= VPAWN2
        // if (board.whiteKingIndex === 117 && board.board[118] === R) positionalScore -= VPAWN

        return positionalScore
    },

    [k]: (board, i)=>{
        let positionalScore = 0

        // if (board.blackKingIndex === 6 && board.board[7] === r) positionalScore += VPAWN
        // if (board.blackKingIndex === 5 && board.board[7] === r) positionalScore += VPAWN2
        // if (board.blackKingIndex === 5 && board.board[6] === r) positionalScore += VPAWN

        return positionalScore
    }
}

// FUNCIÓN DE EVALUACIÓN DE LA POSICIÓN
AI.evaluate = function (board, ply, alpha, beta, pvNode, incheck, illegalMovesSoFar) {
    let advance = 100 * (1 - AI.totalmaterial / AI.maxMaterialValue)

    AI.phase = advance > AI.PHASELIMITS[2]? 3 : (advance > AI.PHASELIMITS[1]? 2 : (advance > AI.PHASELIMITS[0]? 1 : 0))

    if (!AI.phase) AI.phase = 0

    // illegalMovesSoFar = illegalMovesSoFar | 0
    
    let evalEntry = AI.evalTable[board.hashkey % this.htlength]
    this.evalnodes++
    let turn = board.turn
    let sign = turn === WHITE? 1 : -1
    let tempoBonus = AI.PAR[AI.phase][35]*sign
    
    if (evalEntry && evalEntry.hashkey === board.hashkey) {
        this.evalhashnodes++
        return sign*evalEntry.score
    }

    // let t0 = Date.now()

    alpha = alpha*this.nullWindowFactor | 0
    beta = alpha + this.nullWindowFactor

    let score = tempoBonus + (AI.random? Math.random()*AI.random - AI.random/2 | 0 : 0)

    let pawnindexW = []
    let pawnindexB = []

    let material = 0
    let psqt = 0
    let microeval = 0

    let tempTotalMaterial = 0

    let mgFactor = AI.totalmaterial / AI.maxMaterialValue
    let egFactor = 1 - mgFactor

    let pieceKingDistance = 0

    let pieceCount = new Array(13).fill(0)

    for (let i = 0; i < 120; i++) {
        if (i & 0x88) {
            i+=7
            continue
        }

        let piece = board.board[i]
        
        if (!piece) {
            continue
        }

        pieceCount[piece]++

        let turn = board.color(piece)
        let sign = turn === WHITE? 1 : -1

        if (pvNode) microeval += AI.microeval[piece](board, i)

        // MATERIAL
        let mgMaterial = mgFactor * AI.PIECE_VALUES[OPENING][piece]
        let egMaterial = egFactor * AI.PIECE_VALUES[LATE_ENDGAME][piece]

        material += (mgMaterial + egMaterial) | 0 //Material

        // The original algorith only considerd non-pawn material; because Orobas defines 4 phases, we include all material in order to allow the pass from Opening to Midgame when material value decreases more than 2%. See AI.PHASELIMITS
        tempTotalMaterial += AI.PIECE_VALUES[OPENING][ABS[piece]]

        let piecetype = ABS[piece]

        let index = turn === WHITE? i : (112^i)
        
        let mgPSQT = AI.PSQT_OPENING[piecetype][index] * mgFactor | 0
        let egPSQT = AI.PSQT_LATE_ENDGAME[piecetype][index] * egFactor | 0
        
        psqt += sign*(mgPSQT + egPSQT)

        if (piecetype === K) {

        } else if (piecetype === P) {
            if (piece === P) {
                pawnindexW.push(i)
            } else if (piece === p) {
                pawnindexB.push(i)
            }
        } else {
            // PIECE-KING DISTANCE (N, B, R and Q)
    
            if (turn === WHITE) {
                // To the enemy king
                {
                    let verticalDistance = board.ranksW[i] - board.ranksW[board.blackKingIndex]
                    let horizontalDistance = board.columns[i] - board.columns[board.blackKingIndex]
        
                    let pieceDistance = AI.PIECEDISTANCE[piecetype][112 + 15*verticalDistance + horizontalDistance]
        
                    pieceKingDistance += AI.PAR[AI.phase][36] * (4 - pieceDistance)
                }

                // To the own king
                {
                    let verticalDistance = board.ranksW[i] - board.ranksW[board.whiteKingIndex]
                    let horizontalDistance = board.columns[i] - board.columns[board.whiteKingIndex]
        
                    let pieceDistance = AI.PIECEDISTANCE[piecetype][112 + 15*verticalDistance + horizontalDistance]
        
                    pieceKingDistance += AI.PAR[AI.phase][37] * (4 - pieceDistance)
                }
            } else {
                // To the enemy king
                {
                    let verticalDistance = board.ranksB[i] - board.ranksB[board.whiteKingIndex]
                    let horizontalDistance = board.columns[i] - board.columns[board.whiteKingIndex]
        
                    let pieceDistance = AI.PIECEDISTANCE[piecetype][112 + 15*verticalDistance + horizontalDistance]
        
                    pieceKingDistance -= AI.PAR[AI.phase][36] * (4 - pieceDistance)
                }

                // To the own king
                {
                    let verticalDistance = board.ranksB[i] - board.ranksB[board.blackKingIndex]
                    let horizontalDistance = board.columns[i] - board.columns[board.blackKingIndex]
        
                    let pieceDistance = AI.PIECEDISTANCE[piecetype][112 + 15*verticalDistance + horizontalDistance]
        
                    pieceKingDistance -= AI.PAR[AI.phase][37] * (4 - pieceDistance)
                }
            }

        }
    }
    
    AI.totalmaterial = tempTotalMaterial

    // Material
    score += material | 0
    
    // Bishop pair
    score += pieceCount[B] > 1? AI.BISHOP_PAIR[AI.phase] : 0
    score -= pieceCount[b] > 1? AI.BISHOP_PAIR[AI.phase] : 0
    
    // Pawn structure
    let structure = AI.getStructure(board, pawnindexW, pawnindexB)
    
    if (AI.phase === LATE_ENDGAME && alpha > VPAWN*5) {
        let opponentKing = turn === WHITE? board.blackKingIndex : board.whiteKingIndex
        let kingToTheCorner = AI.CENTERMANHATTAN[opponentKing] - 3
        let distanceBetweenKings = 8 - manhattanDistance(board, board.whiteKingIndex, board.blackKingIndex)

        let mopup = 20*(kingToTheCorner + distanceBetweenKings)

        if (turn === WHITE) {
            score += mopup
        } else {
            score -= mopup
        }
    }

    // Mobility
    let mobility = AI.getMobility(board)

    // Is king under attack
    let underAttack = 0

    underAttack -= AI.PAR[AI.phase][15]*board.isSquareAttacked(board.whiteKingIndex-15, BLACK, true)
    underAttack -= AI.PAR[AI.phase][16]*board.isSquareAttacked(board.whiteKingIndex-16, BLACK, true)
    underAttack -= AI.PAR[AI.phase][17]*board.isSquareAttacked(board.whiteKingIndex-17, BLACK, true)

    underAttack += AI.PAR[AI.phase][15]*board.isSquareAttacked(board.blackKingIndex+15, WHITE, true)
    underAttack += AI.PAR[AI.phase][16]*board.isSquareAttacked(board.blackKingIndex+16, WHITE, true)
    underAttack += AI.PAR[AI.phase][17]*board.isSquareAttacked(board.blackKingIndex+17, WHITE, true)

    // Expensive center control
    let centerControl = 0

    for (let i = 0, len=WIDECENTER.length; i < len; i++) {
        centerControl += AI.PAR[AI.phase][19] * board.isSquareAttacked(WIDECENTER[i], WHITE, true)
        centerControl -= AI.PAR[AI.phase][19] * board.isSquareAttacked(WIDECENTER[i], BLACK, true)
    }

    // Positional
    let positional = microeval + psqt + structure + pieceKingDistance + mobility + underAttack + centerControl | 0
    
    // to logistic
    positional = AI.logistic(positional, 200) | 0

    score += positional

    let nullWindowScore = score / AI.nullWindowFactor | 0

    AI.evalTable[board.hashkey % this.htlength] = {
        hashkey: board.hashkey,
        score: nullWindowScore
    }

    // let t1 = Date.now()
    // AI.evalTime += t1 - t0

    return sign*nullWindowScore
}

AI.logistic = (x, limit)=> {
    return 2*limit / (1 + Math.exp(-x/(0.5*limit))) - limit
}

AI.getPawnShield = (board)=>{
    let score = 0
    let bonus = AI.PAWNSHIELD[AI.phase]

    if (AI.phase <= MIDGAME && board.columns[board.whiteKingIndex] === 3 || board.columns[board.whiteKingIndex] === 4) score -= AI.PAR[AI.phase][28]
    
    if (board.whiteKingIndex !== 116) {
        score += board.board[board.whiteKingIndex-15] === P? bonus : 0
        score += board.board[board.whiteKingIndex-16] === P? bonus : 0
        score += board.board[board.whiteKingIndex-16] === B? AI.PAR[AI.phase][29] : 0
        score += board.board[board.whiteKingIndex-17] === P? bonus : 0

        if (AI.phase <= MIDGAME && board.board[board.whiteKingIndex-16] === 0) {
            score -= VPAWN
        }

        //TODO: Penalty for doubled pawns in king shelter (mg: 15, eg: 8)
    }
    
    if (AI.phase <= MIDGAME && board.columns[board.blackKingIndex] === 3 || board.columns[board.blackKingIndex] === 4) score += AI.PAR[AI.phase][28]
    
    if (board.blackKingIndex !== 4) {
        score -= board.board[board.blackKingIndex+15] === p? bonus : 0
        score -= board.board[board.blackKingIndex+16] === p? bonus : 0
        score -= board.board[board.blackKingIndex+16] === b? AI.PAR[AI.phase][29] : 0
        score -= board.board[board.blackKingIndex+17] === p? bonus : 0

        if (AI.phase <= MIDGAME && board.board[board.blackKingIndex+16] === 0) {
            score += VPAWN
        }

        //TODO: Penalty for doubled pawns in king shelter (mg: 15, eg: 8)
    }

    return score
} 

AI.isLazyFutile = (sign, score, alpha, beta)=> {
    // return false
    let signedScore = sign * score

    if (signedScore >= beta) {
        return true
    }
}

AI.getMobility = (board)=>{
    let score = 0
    let whiteMoves
    let blackMoves

    if (board.turn === WHITE) {
        whiteMoves = board.getMoves(true,false)
        board.changeTurn()
        blackMoves = board.getMoves(true,false)
        board.changeTurn()
    } else {
        blackMoves = board.getMoves(true,false)
        board.changeTurn()
        whiteMoves = board.getMoves(true,false)
        board.changeTurn()
    }

    let whiteMobility = 0

    whiteMobility += AI.MOB[P][0] * (whiteMoves[P].unsafe) + AI.MOB[P][1] * (whiteMoves[P].safe) - AI.MOB[P][2] | 0
    whiteMobility += AI.MOB[N][0] * (whiteMoves[N].unsafe) + AI.MOB[N][1] * (whiteMoves[N].safe) - AI.MOB[N][2] | 0
    whiteMobility += AI.MOB[B][0] * (whiteMoves[B].unsafe) + AI.MOB[B][1] * (whiteMoves[B].safe) - AI.MOB[B][2] | 0
    whiteMobility += AI.MOB[R][0] * (whiteMoves[R].unsafe) + AI.MOB[R][1] * (whiteMoves[R].safe) - AI.MOB[R][2] | 0
    whiteMobility += AI.MOB[Q][0] * (whiteMoves[Q].unsafe) + AI.MOB[Q][1] * (whiteMoves[Q].safe) - AI.MOB[Q][2] | 0

    let blackMobility = 0
    
    blackMobility += AI.MOB[P][0] * (blackMoves[p].unsafe) + AI.MOB[P][1] * (blackMoves[p].safe) - AI.MOB[P][2] | 0
    blackMobility += AI.MOB[N][0] * (blackMoves[n].unsafe) + AI.MOB[N][1] * (blackMoves[n].safe) - AI.MOB[N][2] | 0
    blackMobility += AI.MOB[B][0] * (blackMoves[b].unsafe) + AI.MOB[B][1] * (blackMoves[b].safe) - AI.MOB[B][2] | 0
    blackMobility += AI.MOB[R][0] * (blackMoves[r].unsafe) + AI.MOB[R][1] * (blackMoves[r].safe) - AI.MOB[R][2] | 0
    blackMobility += AI.MOB[Q][0] * (blackMoves[q].unsafe) + AI.MOB[Q][1] * (blackMoves[q].safe) - AI.MOB[Q][2] | 0

    score = whiteMobility - blackMobility | 0

    return score
}

let max = 0
let min = 0
let total = 1

// IMPORTANTE: Esta función devuelve el valor de la estructura de peones.
// Dado que la estructura tiende a ser relativamente fija, el valor se guarda
// en una tabla hash y es devuelto en caso que se requiera evaluar la misma
// estructura. La tasa de acierto de las entradas hash es mayor al 95%, por lo
// que esta función es esencial para mantener un buen rendimiento.
AI.getStructure = (board, pawnindexW, pawnindexB)=> {
    let hashkey = board.pawnhashkey

    let hashentry = AI.pawnTable[hashkey % AI.pawntlength]

    AI.pnodes++

    if (hashentry) {
        if (hashentry.hashkey === hashkey) {
            AI.phnodes++
            return hashentry.score
        } else {
            AI.pawncollisions++
        }
    }

    let pawnImbalance = AI.PAR[AI.phase][30]*(pawnindexW.length - pawnindexB.length)

    let doubled = AI.getDoubled(board, pawnindexW, pawnindexB)
    let defended = AI.getDefended(board, pawnindexW, pawnindexB)
    let passers = AI.getPassers(board, pawnindexW, pawnindexB)
    let space = AI.getSpace(board, pawnindexW, pawnindexB)
    let backward = AI.getBackwardPawns(board, pawnindexW, pawnindexB)
    let pawnShield = AI.getPawnShield(board)

    let score = pawnImbalance + doubled + defended + passers + space + backward + pawnShield

    AI.pawnTable[hashkey % AI.pawntlength] = {hashkey, score}
    return score

}

AI.getBackwardPawns = (board, pawnindexW, pawnindexB)=>{
    let whiteBackwardPawns = 0
    let blackBackwardPawns = 0

    for (let i = 0; i < pawnindexW.length; i++) {
        let square = pawnindexW[i]

        if (square >= 64 && square <= 87) {
            if (board.board[square + 15] !== P && board.board[square + 17] !== P && board.board[square + 33] !== P && board.board[square + 31] !== P) {
                whiteBackwardPawns++
            }
        }
    }

    for (let i = 0; i < pawnindexB.length; i++) {
        let square = pawnindexB[i]
        if (square >= 32 && square <= 55) {
            if (board.board[square - 15] !== p && board.board[square - 17] !== p && board.board[square - 33] !== p && board.board[square - 31] !== p) {
                blackBackwardPawns++
            }
        }
    }

    return -AI.PAR[AI.phase][31] * (whiteBackwardPawns - blackBackwardPawns)
}

AI.getSpace = (board, pawnindexW, pawnindexB)=>{
    let spaceW = 0
    let spaceB = 0

    for (let i = 0, len=pawnindexW.length; i < len; i++) {
        spaceW += board.ranksW[pawnindexW[i]] - 1
    }

    for (let i = 0, len=pawnindexB.length; i < len; i++) {
        spaceB += board.ranksB[pawnindexB[i]] - 1
    }

    let space = AI.PAR[AI.phase][32]*(spaceW - spaceB)

    return space
}

AI.getPassers = (board, pawnindexW, pawnindexB)=>{
    //De haberlos, estos arreglos almacenan la fila en que se encuentran los peones pasados
    let score = 0

    for (let i = 0, len=pawnindexW.length; i < len; i++) {
        let leftFile = pawnindexW[i] - 17
        let centerFile = pawnindexW[i] - 16
        let rightFile = pawnindexW[i] - 15

        let encounters = 0

        while (!encounters) {
            if ((centerFile & 0x88)) break
            if (board.board[centerFile] === p) encounters++
            if (encounters > 0) break
            centerFile -= 16
        }

        if (!encounters) {
            while (!encounters) {
                if ((leftFile & 0x88)) break
                if (board.board[leftFile] === p) encounters++
                if (encounters > 0) break
                leftFile -= 16
            }

            if (!encounters) {
                while (!encounters) {
                    if ((rightFile & 0x88)) break
                    if (board.board[rightFile] === p) encounters++
                    if (encounters > 0) break
                    rightFile -= 16
                }
            }
    
        }

        if (!encounters) {
            let bonus = AI.PASSERSBONUS[pawnindexW[i]]

            score += bonus

            //blocked passer
            let blockerindex = pawnindexW[i] - 16
            if (board.board[blockerindex] === n || board.board[blockerindex] === b) score-=20

            // Defended passer
            score += pawnindexB[i] + 15 === P? bonus/4 | 0 : 0
            score += pawnindexB[i] + 17 === P? bonus/4 | 0 : 0
            score += pawnindexB[i] -  1 === P? bonus/5 | 0 : 0
            score += pawnindexB[i] +  1 === P? bonus/5 | 0 : 0

            //TODO: passer protected by king
        }
    }
    
    for (let i = 0, len=pawnindexB.length; i < len; i++) {
        let leftFile = pawnindexB[i] + 17
        let centerFile = pawnindexB[i] + 16
        let rightFile = pawnindexB[i] + 15
        
        let encounters = 0
        
        while (!encounters) {
            if ((centerFile & 0x88)) break
            if (board.board[centerFile] === P) encounters++
            if (encounters > 0) break
            centerFile += 16
        }
        
        if (!encounters) {
            while (!encounters) {
                if ((leftFile & 0x88)) break
                if (board.board[leftFile] === P) encounters++
                if (encounters > 0) break
                leftFile += 16
            }
            
            if (!encounters) {
                while (!encounters) {
                    if ((rightFile & 0x88)) break
                    if (board.board[rightFile] === P) encounters++
                    if (encounters > 0) break
                    rightFile += 16
                }
            }
        }
        
        if (!encounters) {
            let bonus = AI.PASSERSBONUS[112^pawnindexB[i]]

            score -= bonus
            
            //blocked passer
            let blockerindex = pawnindexB[i] + 16
            if (board.board[blockerindex] === N || board.board[blockerindex] === B) score+=20

            // Defended passer
            score -= pawnindexB[i] - 15 === p? bonus/4 | 0 : 0
            score -= pawnindexB[i] - 17 === p? bonus/4 | 0 : 0
            score -= pawnindexB[i] -  1 === p? bonus/5 | 0 : 0
            score -= pawnindexB[i] +  1 === p? bonus/5 | 0 : 0
            
            //TODO: passer protected by king
        }
    }
    
    return score
}

AI.getDoubled = (board, pawnindexW, pawnindexB)=>{
    let score = 0

    if (pawnindexW.length > 2) {
        for (let i = 0, len=pawnindexW.length; i < len; i++) {
            let square = pawnindexW[i] - 16
            
            while (true) {
                let piece = board.board[square]
    
                if (piece) {
                    if (piece === P) score -= AI.DOUBLEDPENALTY[square]
                    break
                }
                square -= 16
    
                if ((square - 16) & 0x88) break
    
            }
        }
    }
    
    if (pawnindexB.length > 2) {
        for (let i = 0, len=pawnindexB.length; i < len; i++) {
            let square = pawnindexB[i] + 16
    
            while (true) {
                let piece = board.board[square]
    
                if (piece) {
                    if (piece === p) score += AI.DOUBLEDPENALTY[112^square]
                    break
                }
    
                square += 16
    
                if ((square + 16) & 0x88) break
            }
        }
    }

    return score
}

AI.getDefended = (board, pawnindexW, pawnindexB)=>{
    let defendedW = 0
    let defendedB = 0

    for (let i = 0, len=pawnindexW.length; i < len; i++) {
        if (board.board[pawnindexW[i] + 15] === P) {
            defendedW++
            continue
        }

        if (board.board[pawnindexW[i] + 17] === P) {
            defendedW++
            continue
        }

        if (board.board[pawnindexW[i] + 1] === P) {
            defendedW += 0.5
            continue
        }

        if (board.board[pawnindexW[i] - 1] === P) {
            defendedW += 0.5
            continue
        }
    }

    for (let i = 0, len=pawnindexB.length; i < len; i++) {
        if (board.board[pawnindexB[i] - 15] === p) {
            defendedB++
            continue
        }

        if (board.board[pawnindexB[i] - 17] === p) {
            defendedB++
            continue
        }

        if (board.board[pawnindexB[i] + 1] === p) {
            defendedB += 0.5
            continue
        }

        if (board.board[pawnindexB[i] - 1] === p) {
            defendedB += 0.5
            continue
        }
    }

    let defendedWhitePawns = AI.DEFENDED_VALUES[AI.phase][0]*defendedW - AI.DEFENDED_VALUES[AI.phase][1]
    let defendedBlackPawns = AI.DEFENDED_VALUES[AI.phase][0]*defendedB - AI.DEFENDED_VALUES[AI.phase][1]

    return defendedWhitePawns - defendedBlackPawns | 0
}

// ORDENA LOS MOVIMIENTOS
// Esta función es fundamental para que la poda Alfa-Beta funcione de manera óptima
// El orden establecido permite que la primera jugada
// sea FAIL-HIGH en más de un 90% de los casos.
AI.sortMoves = function (board, moves, turn, ply, depth, ttEntry) {
    if (ply > AI.totaldepth) ply = AI.totaldepth

    let killer1, killer2
    try {

        
        if (AI.killers) {
            killer1 = AI.killers[turn][ply][0]
            killer2 = AI.killers[turn][ply][1]
        }
    } catch(err) {
        console.log('error', ply)
    }

    // let t0 = (new Date).getTime()

    let sortedMoves = []
    let unsortedMoves = []

    for (let i = 0, len = moves.length; i < len; i++) {
        let move = moves[i]

        move.mvvlva = 0
        move.hvalue = 0
        move.killer1 = 0
        move.killer2 = 0
        move.score = 0

        let ttEntryMove = false

        // CRITERIO 1: La jugada está en la Tabla de Trasposición
        if (ttEntry && ttEntry.flag < UPPERBOUND && move.key === ttEntry.move.key) {
            move.tt = true
            move.score += 2e9
            sortedMoves.push(move)
            ttEntryMove = true
            continue
        }

        // CRITERIO 2: La jugada está en la Variante Principal anterior
        if (AI.PV[ply] && AI.PV[ply].key === move.key) {
            // console.log(move.key)
            move.pv = true
            move.score += 2e8
            sortedMoves.push(move)
            continue
        }
        
        if (move.isCapture) {
            move.mvvlva = AI.MVVLVASCORES[move.piece][move.capturedPiece]
            
            // move.score += 1e7 + move.mvvlva
            
            if (move.mvvlva >= 6000) {
                // CRITERIO 3: La jugada es una captura posiblemente ganadora
                
                if (board.turn === WHITE) {
                    if (move.piece > P && board.board[move.to - 15] === p || board.board[move.to - 17] === p) {
                        move.score += 4e6 + move.mvvlva
                    } else {
                        move.score += 1e7 + move.mvvlva
                    }
                } else {
                    if (move.piece > p && board.board[move.to + 15] === P || board.board[move.to + 17] === P) {
                        move.score += 4e6 + move.mvvlva
                    } else {
                        move.score += 1e7 + move.mvvlva
                    }
                }
            } else {
                // CRITERIO 5: La jugada es una captura probablemente perdedora
                move.score += 4e6 + move.mvvlva
            }

            sortedMoves.push(move)

            continue
        } else {
            // if ((ttEntryMove || move.pv) && !move.isCapture) {
            //     unsortedMoves.push(move)
            //     continue
            // }

            // CRITERIO: La jugada es un movimiento Killer
            // (Los killers son movimientos que anteriormente han generado Fail-Highs en el mismo ply)
            if (killer1 && killer1.key === move.key) {
                move.killer1 = true
                move.score += 6e6

                sortedMoves.push(move)

                continue
            }

            // CRITERIO: La jugada es el segundo movimiento Killer
            if (killer2 && killer2.key === move.key) {
                move.killer2 = true
                move.score += 5e6

                sortedMoves.push(move)

                continue
            }
            
            // CRITERIO: La jugada es una promoción
            if (move.promotingPiece) {
                move.score += 3e6

                sortedMoves.push(move)

                continue
            }

            // CRITERIO: Enroque
            if (move.castleSide) {
                if (AI.phase === OPENING) {
                    move.score += 4e6
                } else if (AI.phase === MIDGAME) {
                    move.score += 2e6
                }

                sortedMoves.push(move)

                continue
            }
            
            // CRITERIO 6: Movimientos históricos
            // Se da preferencia a movimientos posicionales que han tenido 
            // éxito en otras posiciones.
            if (!AI.history[ply]) ply = AI.totaldepth

            let hvalue = AI.history[ply][move.piece][move.to] | 0

            if (hvalue) {
                move.score += hvalue

                sortedMoves.push(move)

                continue
            } else {
                // unsortedMoves.push(move)
                // continue

                if (AI.phase <= MIDGAME) {
                    if (turn === WHITE) {
                        move.score += AI.PSQT_OPENING[ABS[move.piece]][move.to] - AI.PSQT_OPENING[ABS[move.piece]][move.from]
                    } else {
                        move.score += AI.PSQT_OPENING[ABS[move.piece]][112^move.to] - AI.PSQT_OPENING[ABS[move.piece]][112^move.from]
                    }
                } else {
                    if (turn === WHITE) {
                        move.score += AI.PSQT_LATE_ENDGAME[ABS[move.piece]][move.to] - AI.PSQT_LATE_ENDGAME[ABS[move.piece]][move.from]
                    } else {
                        move.score += AI.PSQT_LATE_ENDGAME[ABS[move.piece]][112^move.to] - AI.PSQT_LATE_ENDGAME[ABS[move.piece]][112^move.from]
                    }
                }

                sortedMoves.push(move)
            }
        }
    }

    // ORDENA LOS MOVIMIENTOS
    // El tiempo de esta función toma hasta un 10% del total de cada búsqueda.
    // Sería conveniente utilizar un mejor método de ordenamiento.
    if (sortedMoves.length > 1) {
        sortedMoves.sort((a, b) => {
            return b.score - a.score
        })
    }

    moves = sortedMoves.concat(unsortedMoves)

    // let t1 = (new Date()).getTime()

    // AI.sortingTime += (t1 - t0)

    return moves
}

AI.quiescenceSearch = function (board, alpha, beta, depth, ply, pvNode, illegalMovesSoFar, lookForMateTurn, allowNullMove) {
    
    // // Avoids QS explosion
    // if (ply > AI.iteration + 4) {
    //     // console.log('Oops')
    //     return alpha
    // }
    
    AI.qsnodes++

    let turn = board.turn
    let opponentTurn = turn === WHITE? BLACK : WHITE
    let legal = 0
    let standpat = alpha // Only to prevent undefined values for standpat
    
    let hashkey = board.hashkey

    standpat = AI.evaluate(board, ply, alpha, beta, pvNode, false, illegalMovesSoFar) | 0

    if (standpat >= beta) {
        return standpat
    }

    if (standpat > alpha) alpha = standpat

    if (standpat + MARGIN10 < alpha) return alpha

    let moves = board.getMoves(false, true)

    if (moves.length === 0) {
        return alpha
    }
    
    let ttEntry = AI.ttGet(turn, hashkey)
    let score = -INFINITY
    
    moves = AI.sortMoves(board, moves, turn, ply, depth, ttEntry)

    for (let i = 0, len = moves.length; i < len; i++) {
        let move = moves[i]

        // Bad captures pruning (+34 ELO)
        if (move.mvvlva < 6000) {
            if (board.isSquareAttacked(move.to, opponentTurn, false, false)) continue
        }

        // let m0 = (new Date()).getTime()
        if (board.makeMove(move)) {
            // AI.moveTime += (new Date()).getTime() - m0
            legal++

            score = -AI.quiescenceSearch(board, -beta, -alpha, depth - 1, ply + 1, pvNode, legal-1, lookForMateTurn, allowNullMove)

            board.unmakeMove(move)

            if (score >= beta) {
                // AI.ttSave(turn, hashkey, score, LOWERBOUND, depth, move)
                return score
            }

            if (score > alpha) {
                alpha = score
            }
        }
    }

    return alpha

}

AI.ttSave = function (turn, hashkey, score, flag, depth, move) {
    if (AI.stop) {
        // console.log('stop')
        return
    }

    if (!move) {
        // console.log('no move')
        return
    }

    AI.hashTable[turn][hashkey % AI.htlength] = {
        hashkey,
        score,
        flag,
        depth,
        move
    }

    AI.totalTTnodes++
}

AI.ttGet = function (turn, hashkey) {
    AI.ttGets++
    let ttEntry = AI.hashTable[turn][hashkey % AI.htlength]
    
    if (ttEntry) {
        if (ttEntry.hashkey === hashkey) {
            AI.ttnodes++
            return ttEntry
        } else {
            AI.collisions++
            // console.log('Collision', AI.collisions)
            // AI.hashTable[turn][hashkey % AI.htlength] = null
            return null
        }
    } else {
        return null
    }
}

AI.saveHistory = function (ply, move, value) {
    let adjustedValue =  32 * value - AI.history[ply][move.piece][move.to]*Math.abs(value)/512

    for (let i = 0; i < 6; i++) {
        if (value > 0) {
            AI.history[ply + 2*i][move.piece][move.to] += adjustedValue / i | 0
        } else {
            AI.history[ply + 2*i][move.piece][move.to] += value | 0
        }
    }    
}

// PRINCIPAL VARIATION SEARCH
// El método PVS es Negamax + Ventana-Nula
AI.PVS = function (board, alpha, beta, depth, ply, allowNullMove, illegalMovesSoFar, lookForMateTurn) {
    if (ply > AI.totaldepth) ply = AI.totaldepth

    // if (depth > max) console.log('Max depth', max++)

    // let mating_value = MATE - ply;

    // if (mating_value < beta) {
    //     beta = mating_value
    //     if (alpha >= mating_value) return mating_value
    // }

    // mating_value = -MATE + ply;

    // if (mating_value > alpha) {
    //     alpha = mating_value
    //     if (beta <= mating_value) return mating_value
    // }

    let turn = board.turn
    let hashkey = board.hashkey

    let ttEntry = AI.ttGet(turn, hashkey)

    let pvNode = ply == 1 || beta - alpha > 1 || (ttEntry && ttEntry.flag === EXACT) // PV-Node
    
    let cutNode = !pvNode
    
    if (pvNode) AI.pvnodes++
    
    AI.nodes++
    
    // Date.now es un algoritmo que consume mucho tiempo; por esa razón revisa cada 1000 nodos
    if (AI.iteration > AI.mindepth[AI.phase] && AI.nodes % 1000 === 0) {
        if (Date.now() > AI.timer + AI.milspermove) {
            AI.stop = true
        }
    }

    let opponentTurn = turn === WHITE? BLACK : WHITE
    let sign = turn === WHITE? 1 : -1

    if (ttEntry && ttEntry.depth >= depth) {
        if (ttEntry.flag === EXACT) {
            return ttEntry.score
        } else if (ttEntry.flag === LOWERBOUND) {
            if (ttEntry.score > alpha) alpha = ttEntry.score
        } else if (ttEntry.flag === UPPERBOUND) {
            if (ttEntry.score < beta) beta = ttEntry.score
        }

        if (alpha >= beta) {
            if (depth > 0) {
                return ttEntry.score
            } 
        }
    }

    // if (!ttEntry) {
    //     let ttOppositeEntry = AI.ttGet(turn === WHITE? BLACK : WHITE, hashkey)
    
    //     if (ttOppositeEntry && ttOppositeEntry.depth >= depth) {
    //         AI.etcNodes++

    //         let ttScore = -ttOppositeEntry.score

    //         if (ttOppositeEntry.flag === LOWERBOUND) {
    //             if (ttScore < beta) {
    //                 beta = ttScore
    //             }
    //         } else if (ttOppositeEntry.flag === UPPERBOUND) {
                
    //             if (ttScore > alpha) {
    //                 alpha = ttScore
    //             }
    //         }
    //     }
    // }

    let incheck = board.isKingInCheck()

    //Búsqueda QS
    if (depth <= 0) {
        return AI.quiescenceSearch(board, alpha, beta, depth, ply, pvNode, illegalMovesSoFar, lookForMateTurn, allowNullMove)
    }

    if (AI.stop && AI.iteration > AI.mindepth[AI.phase]) return alpha
    
    let mateE = 0 // Mate threat extension
    
    let staticeval = AI.evaluate(board, ply, alpha, beta, pvNode, incheck, illegalMovesSoFar) | 0

    let enPassantSquare = board.enPassantSquares[board.enPassantSquares.length - 1]

    // console.log(ttEntry, AI.PV[ply])

    let prune = ttEntry && depth < 9 && cutNode && !incheck/* && ply > 2*/ && !enPassantSquare && alpha < MATE - AI.totaldepth && allowNullMove && !lookForMateTurn

    if (prune) {
        // //Futility pruning
        if (staticeval - MARGIN2*depth >= beta) {
            // AI.ttSave(turn, hashkey, staticeval, LOWERBOUND, depth, EMPTYMOVE)
            return staticeval
        }
        
        // Null move pruning
        if (staticeval >= beta && AI.phase < LATE_ENDGAME) {
            // Makes null-move
            board.changeTurn()
            
            let nullR = depth > 6? 3 : 2
            let nullScore = -AI.PVS(board, -beta, -beta + 1, depth - nullR - 1, ply, false, 0, 0)

            // Unmakes null-move
            board.changeTurn()

            if (nullScore >= beta) {
                // AI.ttSave(turn, hashkey, nullScore, LOWERBOUND, depth, EMPTYMOVE)

                return nullScore
            } else {
                if (nullScore < -MATE + AI.totaldepth) {
                    mateE = 1
                }
            }
        }

        if (depth <= 3) {
            // Alpha Razoring
            if (staticeval + MARGIN3 + MARGIN2*depth < alpha) {
                let score = AI.quiescenceSearch(board, alpha-1, alpha, 0, ply, pvNode, illegalMovesSoFar, lookForMateTurn, allowNullMove)
                if (score < alpha) {
                    // AI.ttSave(turn, hashkey, score, UPPERBOUND, depth, EMPTYMOVE)
                    return score
                }
            }
            
            // Beta razoring
            if (staticeval + MARGIN2 < beta) { // likely a fail-low node ?
                if (depth <= 3) {
                    let score = AI.quiescenceSearch(board, alpha, beta, 0, ply, pvNode, illegalMovesSoFar, lookForMateTurn, allowNullMove)
        
                    if (score < beta) {
                        // AI.ttSave(turn, hashkey, score, UPPERBOUND, depth, EMPTYMOVE)
                        return score
                    }
                } else {
                    if (staticeval + MARGIN3 < beta) {
                        depth-=2
                    }

                    if (staticeval + MARGIN2 < beta) {
                        depth--
                    }
                }
                
            }
        }
    }

    // IID
    if (!ttEntry && depth > 2) depth--

    let moves = []

    moves = board.getMoves(false, false)

    moves = AI.sortMoves(board, moves, turn, ply, depth, ttEntry)

    let bestmove = moves[0]
    let legal = 0
    let illegalMoves = 0
    
    let alphaOriginal = alpha
    let bestscore = alpha
    let score = -INFINITY

    let E = 0

    for (let i = 0, len = moves.length; i < len; i++) {
        let move = moves[i]
        let piece = move.piece

        if (depth <= 2 && 2*ply < AI.totaldepth) {
            // Extensiones
            E = mateE? 1 : 0
    
            // if (staticeval - MARGIN10 > beta) {
            //     E = 1
            // }
    
            if (AI.phase === LATE_ENDGAME && (piece === P || piece === p)) E = 1
        }

        //Reducciones
        let R = 0

        // // Enhanced Transposition Cut-Off actual position +12 ELO
        // if (!ttEntry) {
            
        //     let ttETC = AI.ttGet(turn, hashkey)
            
        //     if (ttETC && ttETC.hashkey === hashkey && ttETC.depth >= depth) {
        //         AI.etcNodes++
        //         // max++
        //         if (ttETC.flag === LOWERBOUND) {
        //             if (ttETC.score > alpha) alpha = ttETC.score
        //         } else if (ttETC.flag === UPPERBOUND) {
        //             if (ttETC.score < beta) beta = ttETC.score
        //         } else { // EXACT
        //             if (ttETC.score > alpha) { // > beta?
        //                 alpha = ttETC.score
        //             }
        //         }
        //     }
        // }

        // let m0 = (new Date()).getTime()
        if (board.makeMove(move)) {
            // AI.moveTime += (new Date()).getTime() - m0
            legal++

            let inCheckAfterMove = board.isKingInCheck()

            if (incheck || inCheckAfterMove) {
                R = 0
                E = 0
            } else {
                if (prune && !move.killer1 && !move.castleSide) {
                    // Futility Pruning
                    if (move.isCapture) {
                        if (staticeval + AI.PIECE_VALUES[OPENING][ABS[move.capturedPiece]]/this.nullWindowFactor + MARGIN3*depth < alpha) {
                            board.unmakeMove(move)
                            continue
                        }
                    } else {
                        if (staticeval + MARGIN3*depth < alpha) {
                            board.unmakeMove(move)
                            continue
                        }
                    }
                    // if (depth <= 3) {
                    // }
        
                    // if (cutNode && i > 12 && !move.isCapture && !move.castleSide/* && staticeval > alpha - VERYSMALLMARGIN*/) {
                    //     let limit = i > 20? 0.9 : 0.85
                    //     if (Math.random() < limit) {
                    //         AI.rnodes++
                    //          board.unmakeMove(move)
                    //         continue
                    //     }
                    // }
                }

                if (depth >= 3 && legal >= 1 && !mateE) {
                    R += AI.LMR_TABLE[depth][legal]
                }

                if (pvNode || incheck || inCheckAfterMove) R--

                if (!incheck) {
                    if (cutNode || (AI.history[ply][piece][move.to] < 0)) R++
                    
                    if (!move.isCapture) {
                        // Bad moves reductions
                        if (AI.phase <= EARLY_ENDGAME) {
                            // console.log('no')
                            if (board.turn === WHITE && piece !== P && (board.board[move.to-17] === p || board.board[move.to-15] === p)) {
                                R+=4
                            }
                            
                            if (board.turn === BLACK && piece !== p && (board.board[move.to+17] === P || board.board[move.to+15] === P)) {
                                R+=4
                            }
                        }
                    }
                }

                if (R < 0) R = 0
            }
            
            // // Enhanced Transposition Cut-Off +16 ELO
            // let ttETC = AI.ttGet(board.turn, board.hashkey)

            // if (!ttEntry && ttETC && ttETC.hashkey === board.hashkey && ttETC.depth >= depth) {
            //     AI.etcNodes++
                
            //     let scoreETC = -ttETC.score
                
            //     if (ttETC.flag <= EXACT) {
            //         if (scoreETC < beta) beta = ttETC.score
            //         // console.log('beta')
            //     } else if (ttETC.flag === UPPERBOUND) {
            //         if (scoreETC > alpha) alpha = ttETC.score
            //         // console.log('alpha')
            //     }
            // }

            if (legal === 1) {
                // El primer movimiento se busca con ventana total y sin reducciones
                if (AI.stop) {
                    board.unmakeMove(move)
                    return alphaOriginal
                }

                score = -AI.PVS(board, -alpha - 1, -alpha, depth + E - R - 1, ply + 1, allowNullMove, legal - 1, lookForMateTurn)

                if (score > alpha) {
                    score = -AI.PVS(board, -beta, -alpha, depth + E - 1, ply + 1, allowNullMove, legal - 1, lookForMateTurn)
                } else {
                    score = alpha
                }
            } else {
                if (AI.stop) {
                    board.unmakeMove(move)
                    return alphaOriginal
                }

                // score = -AI.PVS(board, -alpha-1, -alpha, depth + E - R - 1, ply + 1, allowNullMove, legal - 1, lookForMateTurn)
                score = -AI.PVS(board, -alpha - 1, -alpha, depth + E - R - 1, ply + 1, allowNullMove, legal - 1, lookForMateTurn)

                if (!AI.stop && score > alpha) {
                    R = 0
                    score = -AI.PVS(board, -beta, -alpha, depth + E - 1, ply + 1, allowNullMove, legal - 1, lookForMateTurn)
                }
            }

            // board.unmakeMove(move)

            if (AI.stop) return alphaOriginal //tested ok
            
            if (score > alpha) {
                // Fail-high
                if (score >= beta) {
                    if (legal === 1) {
                        AI.fhf++
                    }
                    
                    AI.fh++

                    // AI.mostCommonSquares[board.board64[move.from]]++

                    // AI.PV[ply] = move
                    
                    //LOWERBOUND
                    
                    if (!move.isCapture) {
                        // if (AI.killers[turn | 0][ply][0] && AI.killers[turn | 0][ply][0].key != move.key) {
                        //         AI.killers[turn | 0][ply][1] = AI.killers[turn | 0][ply][0]
                        // }
                        
                        // AI.killers[turn | 0][ply][0] = move
                        
                        AI.saveHistory(ply, move, legal*depth*depth)
                    }
                    
                    if (!lookForMateTurn && allowNullMove) {
                        AI.ttSave(turn, hashkey, score, LOWERBOUND, depth + E - R, move)
                        AI.ttSave(board.turn, board.hashkey, -score, UPPERBOUND, depth - 1 + E - R, EMPTYMOVE)
                    }

                    board.unmakeMove(move)
                    
                    return score
                }

                
                bestscore = score
                bestmove = move
                alpha = score

                if (!move.isCapture) { AI.saveHistory(ply, move, depth) }
                
            } else {
                if (!move.isCapture) { AI.saveHistory(ply, move, -depth*depth) }
            }

            board.unmakeMove(move)
        } else {
            illegalMoves++
        }
    }

    if (legal === 0) {
        if (incheck) {
            // Mate
            if (!lookForMateTurn && allowNullMove) AI.ttSave(turn, hashkey, -MATE + ply, EXACT, depth, null)
            // AI.ttSave(turn, hashkey, -MATE + ply, LOWERBOUND, depth, bestmove)
            
            return -MATE + ply
        } else {
            // Ahogado
            if (!lookForMateTurn) AI.ttSave(turn, hashkey, DRAW, EXACT, depth, bestmove)
            // AI.ttSave(turn, hashkey, DRAW, LOWERBOUND, depth, bestmove)
            
            return DRAW
        }

    } else {

        // console.log(ply, bestscore, alphaOriginal)
        if (bestscore > alphaOriginal) {
            // Mejor movimiento
            if (bestmove) {         
                if (!lookForMateTurn && allowNullMove) AI.ttSave(turn, hashkey, bestscore, EXACT, depth, bestmove)
                // AI.ttSave(turn, hashkey, bestscore, LOWERBOUND, depth, bestmove)
            } else {
                console.log(' no po')
            }
            
            return bestscore
        } else {
            //UpperBound
            if (!lookForMateTurn && allowNullMove) AI.ttSave(turn, hashkey, alphaOriginal, UPPERBOUND, depth, bestmove)

            return alphaOriginal
        }

    }
}

AI.getPV = function (board, length) {
    let PV = [null]
    let startinghashkey = board.hashkey
    let legal = 0

    let ttEntry
    let ttFound

    for (let i = 0; i < length; i++) {
        ttFound = false
        let hashkey = board.hashkey
        ttEntry = AI.ttGet(board.turn, hashkey)

        if (ttEntry) {
            let moves = board.getMoves(false, false).filter(move => {
                return move.key === ttEntry.move.key
            })


            if (moves.length > 0) {
                if (board.makeMove(ttEntry.move)) {
                    legal++
                    
                    PV.push(JSON.parse(JSON.stringify(ttEntry.move)))
                    
                    ttFound = true
                }
            }
        } else {
            // break
        }
    }
    
    for (let i = PV.length - 1; i > 0; i--) {
        board.unmakeMove(PV[i])
    }
    
    return PV
}

// https://www.chessprogramming.org/MTD(f) +188 ELO
AI.MTDF = function (board, f, d) {
    //Esta línea permite que el algoritmo funcione como PVS normal
    // return AI.PVS(board, -INFINITY, INFINITY, d, 1, true)
    
    let g = f

    let upperBound = INFINITY
    let lowerBound = -INFINITY

    let lastIterationF = f

    let beta

    do {
        if (g === lowerBound) {
            beta = g + 1
        } else {
            beta = g
        }

        g = AI.PVS(board, beta - 1, beta, d, 1, true, 0, false)

        if (g < beta) {
            upperBound = g
        } else {
            lowerBound = g
        }
    } while (lowerBound < upperBound)


    if (AI.stop) {
        return lastIterationF
    } else {
        return g
    }
}


AI.search = function (board, options) {
    AI.sortingTime = 0
    AI.searchTime0 = Date.now()
    AI.collisions = 0
    AI.ttGets = 0.1
    AI.pawncollisions = 0

    if (board.movenumber && board.movenumber <= 1) {
        AI.lastscore = 0
        AI.bestmove = 0
        AI.bestscore = 0
        AI.f = 0
    }

    let isEnPassant = board.enPassantSquares

    // console.log(isEnPassant)

    if (options && options.seconds) AI.secondspermove = options.seconds

    AI.milspermove = 1000 * AI.secondspermove
    
    let nmoves = board.movenumber * 2
    let changeofphase = false
    
    AI.phase = 0
    
    if (AI.lastphase !== AI.phase) changeofphase = true
    
    AI.lastphase = AI.phase

    // AI.createTables(board, true, true, true, true)

    if (board.movenumber && board.movenumber === 1) {
        AI.createTables(board, true, true, true, true)
        AI.lastscore = 0
        AI.f = 0
    } else {
        if (changeofphase) {
            // AI.createTables(board, true, true, true, true)
        }
        
        AI.f = AI.lastscore / AI.nullWindowFactor | 0
    }
    
    if (!AI.f) AI.f = 0

    return new Promise((resolve, reject) => {
        let color = board.turn

        AI.color = color

        let isWhite = color === 1

        if (isWhite) {
            AI.TESTER = true
        } else {
            AI.TESTER = false
        }

        AI.nodes = 0
        AI.qsnodes = 0
        AI.enodes = 0
        AI.pvnodes = 0
        AI.ttnodes = 0
        AI.etcNodes = 0
        AI.evalhashnodes = 0
        AI.evalnodes = 0
        AI.rnodes = 0
        AI.evalTime = 0
        AI.moveTime = 0
        AI.iteration = 0
        AI.PV = AI.getPV(board, 1)
        AI.stop = false

        AI.changeinPV = true

        let score = 0
        AI.fhfperc = 0

        AI.killers = []

        AI.killers[WHITE] = (new Array(AI.totaldepth + 1)).fill([null, null])
        AI.killers[BLACK] = (new Array(AI.totaldepth + 1)).fill([null, null])

        AI.fh = AI.fhf = 0.001
        
        AI.previousls = AI.lastscore

        let depth = 1
        let alpha = -INFINITY
        let beta = INFINITY

        // board.squareOrder = board.squareOrder.sort((a,b)=>{
        //     return Math.random() > 0.5? 1 : -1
        // })

        // //Search checkmates for both turns without opposite moves
        // let mate = false
        // let depthForMate = 0
        // let mateScore = 0

        // while (!mate && depthForMate < 6 && depthForMate < AI.totaldepth) {
        //     mateScore = AI.PVS(board, -Infinity, Infinity, depthForMate, 1, false, 0, WHITE)

        //     console.log('white', depth, mateScore)

        //     if (Math.abs(mateScore) > VPAWN*10) mate = true

        //     depthForMate++
        // }

        // mateScore = 0
        // mate = false
        // depthForMate = 0
        // while (!mate && depthForMate < 6 && depthForMate < AI.totaldepth) {
        //     mateScore = AI.PVS(board, -Infinity, Infinity, depthForMate, 1, false, 0, BLACK)

        //     console.log('black', depth, mateScore)

        //     if (Math.abs(mateScore) > VPAWN*10) mate = true

        //     depthForMate++
        // }

        // AI.createTables(board, true, true, false, false)

        AI.effectiveEvaluations = 0

        let candidateMoves = []

        let score100, sigmoid

        AI.mostCommonSquares = new Array(64).fill(0)

        AI.timer = Date.now()

        if (true) {
            //Iterative Deepening
            for (; depth <= AI.totaldepth; ) {

                // console.log(AI.mostCommonSquares)

                // board.squareOrder = board.squareOrder.map((a,b)=>{
                //     return AI.mostCommonSquares[b] - AI.mostCommonSquares[a]
                // })

                // console.log(board.hashkey)
                if (AI.stop && AI.bestmove) break

                AI.iteration++

                postMessage({depth: depth - 1})

                let ttEntry = AI.ttGet(board.turn, board.hashkey)

                if (ttEntry && ttEntry.flag <= EXACT && ttEntry.depth > depth) {
                    AI.f = ttEntry.score
                    AI.bestmove = ttEntry.move
                } else {
                    let mtdfScore = AI.MTDF(board, AI.f, depth)
                    if (!AI.stop) AI.f = mtdfScore
                }
                
                score = AI.nullWindowFactor * (isWhite ? 1 : -1) * AI.f

                AI.PV = AI.getPV(board, AI.totaldepth)

                if (AI.PV[1]) {
                    candidateMoves.push(AI.PV[1])
                }

                // console.log(candidateMoves[candidateMoves.length - 1].key)

                if (AI.stop) break

                AI.lastscore = score

                AI.fhfperc = Math.round(AI.fhf * 100 / AI.fh)

                // console.log(depth, `FHF: ${AI.fhfperc}%`)

                if (AI.PV && !AI.stop) {
                    console.log('FHF', AI.fhfperc, 'Depth:', depth, 'Score:', score, 'Nodes:', AI.nodes+AI.qsnodes, 'PV Nodes', AI.pvnodes, 'Pawn Hit Rate:',(AI.phnodes / AI.pnodes * 100 | 0))
                }

                score100 = AI.lastscore * (100/VPAWN)

                // sigmoid = 1 / (1 + Math.pow(10, -score100 / 354))
                sigmoid = 1 / (1 + Math.exp(0.5 * -score100 / 100))

                postMessage({sigmoid})
            
                depth++
            }
        }

        AI.bestmove = candidateMoves[candidateMoves.length - 2]

        if (AI.TESTER) {
            console.info(`_ AI.TESTER ${AI.phase} _____________________________________`)
        } else {
            console.info('________________________________________________________________________________')
        }

        AI.lastmove = AI.bestmove

        //zugzwang prevention
        if (!AI.bestmove) {
            console.log('No bestmove')
            let moves = board.getMoves(false, false)

            AI.bestmove = moves[moves.length * Math.random() | 0]
        }

        AI.searchTime1 = Date.now()
        AI.searchTime = AI.searchTime1 - AI.searchTime0
        console.log('Sorting % time: ', (AI.sortingTime / AI.searchTime) * 100 | 0,
                    'Evaluation % time: ', (AI.evalTime / AI.searchTime) * 100 | 0,
                    'Random Nodes Pruned (%): ', (AI.rnodes / AI.nodes) * 100 | 0,
                    'ETC (%): ', (AI.etcNodes/AI.nodes*1000 | 0) / 10,
                    'Collisions (%): ', (AI.collisions/AI.ttGets*1000 | 0) / 10,
                    'Pawn Collisions (%): ', (AI.pawncollisions/AI.evalnodes*1000 | 0) / 10,
                    'NPS: ', (AI.nodes + AI.qsnodes) / options.seconds | 0,
        )

        // console.log(AI.bestmove, (AI.moveTime / AI.searchTime) * 100 | 0)

        resolve({
            n: board.movenumber, phase: AI.phase, depth: AI.iteration - 1, from: board.board64[AI.bestmove.from],
            to: board.board64[AI.bestmove.to], fromto0x88: [AI.bestmove.from, AI.bestmove.to],
            score: AI.lastscore | 0, sigmoid: (sigmoid * 100 | 0) / 100, nodes: AI.nodes, qsnodes: AI.qsnodes,
            FHF: AI.fhfperc + '%', version: AI.version
        })

        let near2mate = false

        if (board.movenumber && board.movenumber > 2) {
            if (AI.f > MATE - AI.totaldepth) near2mate = true
            if (AI.f < -MATE + AI.totaldepth) near2mate = true
        }

        if (!near2mate) {
            AI.createTables(board, AI.collisions/AI.ttGets > 0.01, AI.collisions/AI.ttGets > 0.01, true, false)
        } else {
            console.log('Near to mate!')
        }
    })
}

AI.createTables(orobas, true, true, true, true)

onmessage = function (oEvent) {
    orobas.loadFen(oEvent.data.fen)
    AI.search(orobas, {seconds: oEvent.data.seconds}).then(res=>{
        postMessage(res);
    })
};

// module.exports = AI
