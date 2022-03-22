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
        m.key = m.piece + 100*m.from + 100000*m.to + 10*m.capturedPiece

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

        let mobilityMoves = new Array(13).fill(0)

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
                if (!forMobility) {
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
                            let safe = true
                            
                            if (this.turn === WHITE) {
                                if (this.board[to - 15] === p || this.board[to - 17] === p) safe = false
                            } else {
                                if (this.board[to + 15] === P || this.board[to + 17] === P) safe = false
                            }
                            
                            if (safe) {
                                mobilityMoves[piece]++
                            }
                        } else {
                            moves[moveindex++]=(this.createMove({piece, from, to, isCapture, capturedPiece, castleSide:0, enPassantSquares:null}))
                        }
    
    
                        if (isCapture) break
    
                        if (piece === N || piece === n || piece === K || piece === k) {
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
        let moves = this.getMoves()
        
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

let AI = {
    version: "2.1.5",
    totaldepth: 128,
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
    // mindepth: [6,10,12,18],
    // mindepth: [18,20,22,24],
    mindepth: [12,12,12,12],
    secondspermove: 1,
    lastmove: null,
    f: 0,
    previousls: 0,
    lastscore: 0,
    nullWindowFactor: 12 // +132 ELO
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

AI.PSQT_OPENING[P] = [8,-1,0,-2,2,-3,5,3,null,null,null,null,null,null,null,null,89,141,52,101,71,132,32,-13,null,null,null,null,null,null,null,null,0,6,12,29,76,65,31,-14,null,null,null,null,null,null,null,null,-25,29,1,21,18,6,13,-27,null,null,null,null,null,null,null,null,-17,-9,-18,-9,12,4,16,-21,null,null,null,null,null,null,null,null,-12,13,-12,-12,1,2,22,-8,null,null,null,null,null,null,null,null,-37,-6,-18,-29,8,25,29,-32,null,null,null,null,null,null,null,null,3,-11,2,2,-14,0,-7,-8,null,null,null,null,null,null,null,null]
AI.PSQT_OPENING[N] = [-46,-56,-29,-44,56,-70,-22,-94,null,null,null,null,null,null,null,null,-50,-42,73,36,26,64,7,-10,null,null,null,null,null,null,null,null,-48,56,42,67,77,132,83,39,null,null,null,null,null,null,null,null,-8,14,11,47,45,73,18,23,null,null,null,null,null,null,null,null,-18,-2,18,10,30,20,21,-15,null,null,null,null,null,null,null,null,-26,-10,22,5,19,24,22,-20,null,null,null,null,null,null,null,null,-34,-44,-18,3,-7,19,-16,-18,null,null,null,null,null,null,null,null,-50,-25,-48,-36,-15,-26,-17,-29,null,null,null,null,null,null,null,null]
AI.PSQT_OPENING[B] = [-16,4,-44,-43,-23,-39,3,-7,null,null,null,null,null,null,null,null,-38,8,-15,-16,26,49,18,-43,null,null,null,null,null,null,null,null,-22,33,53,40,14,49,30,-8,null,null,null,null,null,null,null,null,-9,0,12,53,30,32,9,-4,null,null,null,null,null,null,null,null,-15,20,22,44,36,8,11,10,null,null,null,null,null,null,null,null,1,18,7,15,15,26,26,8,null,null,null,null,null,null,null,null,0,27,13,1,12,14,31,6,null,null,null,null,null,null,null,null,-28,7,-4,-13,-14,-7,-26,-10,null,null,null,null,null,null,null,null]
AI.PSQT_OPENING[R] = [32,38,22,45,64,19,34,38,null,null,null,null,null,null,null,null,26,31,55,62,67,74,29,34,null,null,null,null,null,null,null,null,0,33,18,34,1,47,74,17,null,null,null,null,null,null,null,null,-27,-11,4,17,16,37,-7,-34,null,null,null,null,null,null,null,null,-41,-11,-9,-19,17,-3,15,-18,null,null,null,null,null,null,null,null,-35,-14,-2,-12,-10,-9,-8,-29,null,null,null,null,null,null,null,null,-36,-13,-15,1,-15,4,3,-44,null,null,null,null,null,null,null,null,-33,-15,3,17,16,14,-37,-38,null,null,null,null,null,null,null,null]
AI.PSQT_OPENING[Q] = [-43,6,44,16,50,34,57,58,null,null,null,null,null,null,null,null,-22,-41,-10,-3,-20,58,30,39,null,null,null,null,null,null,null,null,-19,-8,19,3,16,66,60,44,null,null,null,null,null,null,null,null,-19,-21,-23,-5,-5,5,-4,-6,null,null,null,null,null,null,null,null,-14,-24,5,-17,-5,-11,-14,-6,null,null,null,null,null,null,null,null,-5,3,-2,-2,-7,-15,16,0,null,null,null,null,null,null,null,null,-43,-1,2,0,13,23,9,0,null,null,null,null,null,null,null,null,-2,-15,-7,31,-21,-18,-18,-42,null,null,null,null,null,null,null,null]
AI.PSQT_OPENING[K] = [-41,23,26,-13,-47,-32,3,9,null,null,null,null,null,null,null,null,18,4,-24,7,-12,-15,-32,-29,null,null,null,null,null,null,null,null,-9,21,-5,-18,-15,13,25,-17,null,null,null,null,null,null,null,null,-25,-30,-14,-25,-33,-28,-12,-33,null,null,null,null,null,null,null,null,-47,-2,-25,-38,-44,-46,-41,-50,null,null,null,null,null,null,null,null,-23,-10,-32,-50,-49,-25,-8,-32,null,null,null,null,null,null,null,null,2,-2,-11,-45,-50,-20,0,-2,null,null,null,null,null,null,null,null,-15,43,13,-43,18,-20,24,5,null,null,null,null,null,null,null,null]

AI.PSQT_LATE_ENDGAME[P] = [-7,2,0,-1,-10,0,-2,6,null,null,null,null,null,null,null,null,179,166,157,131,142,131,165,191,null,null,null,null,null,null,null,null,103,95,76,68,55,54,83,79,null,null,null,null,null,null,null,null,26,17,11,8,-5,-1,5,16,null,null,null,null,null,null,null,null,7,10,-8,-6,-5,-9,0,-5,null,null,null,null,null,null,null,null,3,2,0,1,0,-2,3,-10,null,null,null,null,null,null,null,null,14,2,6,10,15,-5,2,-6,null,null,null,null,null,null,null,null,1,1,8,-5,1,-8,4,-3,null,null,null,null,null,null,null,null]
AI.PSQT_LATE_ENDGAME[N] = [-39,-38,-9,-39,-36,-19,-46,-50,null,null,null,null,null,null,null,null,-17,-8,-21,0,-18,-25,-20,-49,null,null,null,null,null,null,null,null,-28,-29,-4,4,-9,-15,-29,-45,null,null,null,null,null,null,null,null,-27,0,18,31,33,8,5,-19,null,null,null,null,null,null,null,null,-34,-15,24,28,12,12,-6,-26,null,null,null,null,null,null,null,null,-22,-4,9,22,6,1,-18,-13,null,null,null,null,null,null,null,null,-41,-26,-9,-4,-6,-22,-33,-48,null,null,null,null,null,null,null,null,-31,-50,-22,-10,-6,-10,-45,-48,null,null,null,null,null,null,null,null]
AI.PSQT_LATE_ENDGAME[B] = [-10,-25,-12,-8,-5,-10,-15,-15,null,null,null,null,null,null,null,null,2,-17,1,-21,-6,-18,5,-12,null,null,null,null,null,null,null,null,1,-19,8,11,-4,2,-6,6,null,null,null,null,null,null,null,null,0,6,14,18,17,10,2,-6,null,null,null,null,null,null,null,null,-7,4,13,4,15,22,-7,-16,null,null,null,null,null,null,null,null,-15,0,2,2,14,15,-14,-9,null,null,null,null,null,null,null,null,-15,-21,-1,-7,9,-18,-14,-26,null,null,null,null,null,null,null,null,-24,-13,-22,0,-11,-9,-20,-25,null,null,null,null,null,null,null,null]
AI.PSQT_LATE_ENDGAME[R] = [7,13,9,10,17,5,15,3,null,null,null,null,null,null,null,null,4,0,22,-6,2,0,18,-2,null,null,null,null,null,null,null,null,9,11,3,-17,2,-1,-8,-11,null,null,null,null,null,null,null,null,1,4,15,-8,0,-10,-5,3,null,null,null,null,null,null,null,null,-1,16,8,1,-10,0,-7,-2,null,null,null,null,null,null,null,null,3,2,-3,5,-15,-13,-3,0,null,null,null,null,null,null,null,null,4,-3,1,-3,-7,-5,6,-2,null,null,null,null,null,null,null,null,-10,1,8,3,-8,-2,-4,-14,null,null,null,null,null,null,null,null]
AI.PSQT_LATE_ENDGAME[Q] = [-7,13,39,32,51,31,18,34,null,null,null,null,null,null,null,null,-18,17,31,47,40,26,27,3,null,null,null,null,null,null,null,null,-15,10,17,49,49,42,13,12,null,null,null,null,null,null,null,null,12,9,36,43,50,42,71,35,null,null,null,null,null,null,null,null,-13,25,30,38,31,26,35,8,null,null,null,null,null,null,null,null,-22,-27,8,0,5,14,6,5,null,null,null,null,null,null,null,null,-23,-2,-29,-2,-9,-32,-25,-19,null,null,null,null,null,null,null,null,-33,-22,-25,-44,-7,-32,-28,-49,null,null,null,null,null,null,null,null]
AI.PSQT_LATE_ENDGAME[K] = [-74,-17,-16,-16,-13,7,3,-30,null,null,null,null,null,null,null,null,-10,14,13,17,14,34,25,20,null,null,null,null,null,null,null,null,10,25,18,17,23,44,40,7,null,null,null,null,null,null,null,null,-10,21,18,20,30,28,22,0,null,null,null,null,null,null,null,null,-13,3,18,24,24,20,2,-3,null,null,null,null,null,null,null,null,-21,-8,6,27,18,19,8,-18,null,null,null,null,null,null,null,null,-24,-10,6,17,15,-5,7,-12,null,null,null,null,null,null,null,null,-44,-36,-21,-4,-26,-17,-13,-33,null,null,null,null,null,null,null,null]

AI.POV = [null,100,410,445,580,1250]
AI.PEV = [null,114,342,362,624,1140]

AI.BISHOP_PAIR = [78,59,78,83]

AI.DEFENDED_VALUES = [0, 5, 0]

AI.BLOCKEDPAWNBONUS = [
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
   15, 18, 22, 30, 30, 22, 18, 15,  null,  null,  null,  null,  null,  null,  null,  null, 
    7,  9, 11, 13, 13, 11,  9,  7,  null,  null,  null,  null,  null,  null,  null,  null, 
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
]

AI.DEFENDEDPAWNBONUS = [
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
   35, 36, 37, 38, 38, 37, 36, 35,  null,  null,  null,  null,  null,  null,  null,  null, 
   20, 21, 23, 25, 25, 23, 21, 20,  null,  null,  null,  null,  null,  null,  null,  null, 
   11, 13, 15, 17, 17, 15, 13, 11,  null,  null,  null,  null,  null,  null,  null,  null, 
    5,  6,  8,  9,  9,  8,  6,  5,  null,  null,  null,  null,  null,  null,  null,  null, 
    2,  3,  4,  5,  5,  4,  3,  2,  null,  null,  null,  null,  null,  null,  null,  null, 
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null,
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null,
]

AI.ALIGNEDPAWNBONUS = [
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
   44, 45, 47, 49, 49, 47, 45, 44,  null,  null,  null,  null,  null,  null,  null,  null, 
   35, 36, 37, 38, 38, 37, 36, 35,  null,  null,  null,  null,  null,  null,  null,  null, 
   20, 21, 23, 25, 25, 23, 21, 20,  null,  null,  null,  null,  null,  null,  null,  null, 
   11, 13, 15, 17, 17, 15, 13, 11,  null,  null,  null,  null,  null,  null,  null,  null, 
    5,  6,  8,  9,  9,  8,  6,  5,  null,  null,  null,  null,  null,  null,  null,  null, 
    2,  3,  4,  5,  5,  4,  3,  2,  null,  null,  null,  null,  null,  null,  null,  null, 
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null,
]

AI.NEIGHBOURPAWNBONUS = [
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
   10, 15, 20, 25, 25, 20, 15, 10,  null,  null,  null,  null,  null,  null,  null,  null, 
    6,  8, 12, 16, 16, 12,  8,  6,  null,  null,  null,  null,  null,  null,  null,  null, 
    4,  6,  8, 11, 11,  8,  6,  4,  null,  null,  null,  null,  null,  null,  null,  null, 
    2,  3,  4,  5,  5,  4,  3,  2,  null,  null,  null,  null,  null,  null,  null,  null, 
    2,  2,  3,  4,  4,  3,  2,  2,  null,  null,  null,  null,  null,  null,  null,  null, 
    1,  2,  3,  4,  4,  3,  2,  1,  null,  null,  null,  null,  null,  null,  null,  null, 
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null,
]

AI.LEVERPAWNBONUS = [
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
   16, 18, 22, 24, 24, 22, 18, 16,  null,  null,  null,  null,  null,  null,  null,  null, 
    8,  9, 11, 13, 13, 11,  9,  8,  null,  null,  null,  null,  null,  null,  null,  null, 
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
]

AI.PASSERSBONUS = [
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
   70, 85, 95,110,110, 95, 85, 70,  null,  null,  null,  null,  null,  null,  null,  null, 
   50, 60, 68, 76, 76, 68, 60, 50,  null,  null,  null,  null,  null,  null,  null,  null, 
   30, 40, 48, 56, 56, 48, 40, 30,  null,  null,  null,  null,  null,  null,  null,  null, 
   20, 30, 38, 46, 46, 38, 30, 20,  null,  null,  null,  null,  null,  null,  null,  null, 
   13, 18, 24, 32, 32, 24, 18, 13,  null,  null,  null,  null,  null,  null,  null,  null, 
    6,  8, 12, 14, 14, 13,  8,  6,  null,  null,  null,  null,  null,  null,  null,  null, 
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
]

AI.DOUBLEDPENALTY = [
     0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
    38, 18, 23, 28, 28, 23, 18, 38,  null,  null,  null,  null,  null,  null,  null,  null, 
    36, 16, 21, 26, 26, 21, 16, 36,  null,  null,  null,  null,  null,  null,  null,  null, 
    34, 14, 19, 24, 24, 19, 14, 34,  null,  null,  null,  null,  null,  null,  null,  null, 
    32, 12, 17, 22, 22, 17, 12, 32,  null,  null,  null,  null,  null,  null,  null,  null, 
    30, 10, 15, 20, 20, 15, 10, 30,  null,  null,  null,  null,  null,  null,  null,  null, 
     0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
     0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
]

AI.NMOBILITY = [
    10, 11, 12, 13, 13, 12, 11, 10,  null,  null,  null,  null,  null,  null,  null,  null,
    12, 13, 14, 15, 15, 14, 13, 12,  null,  null,  null,  null,  null,  null,  null,  null,
    12, 17, 22, 24, 24, 22, 17, 12,  null,  null,  null,  null,  null,  null,  null,  null,
    16, 24, 28, 30, 30, 28, 24, 16,  null,  null,  null,  null,  null,  null,  null,  null,
    16, 24, 28, 30, 30, 28, 24, 16,  null,  null,  null,  null,  null,  null,  null,  null,
    12, 17, 22, 24, 24, 22, 17, 12,  null,  null,  null,  null,  null,  null,  null,  null,
    12, 13, 14, 15, 15, 14, 13, 12,  null,  null,  null,  null,  null,  null,  null,  null,
    10, 11, 12, 13, 13, 12, 11, 10,  null,  null,  null,  null,  null,  null,  null,  null,
]

AI.BMOBILITY = [
     8,  9, 10, 11, 11, 10,  9,  8,  null,  null,  null,  null,  null,  null,  null,  null,
    10, 11, 12, 13, 13, 12, 11, 10,  null,  null,  null,  null,  null,  null,  null,  null,
    12, 17, 18, 21, 21, 18, 17, 12,  null,  null,  null,  null,  null,  null,  null,  null,
    15, 22, 25, 26, 26, 25, 22, 15,  null,  null,  null,  null,  null,  null,  null,  null,
    15, 22, 25, 26, 26, 25, 22, 15,  null,  null,  null,  null,  null,  null,  null,  null,
    12, 17, 18, 21, 21, 18, 17, 12,  null,  null,  null,  null,  null,  null,  null,  null,
    10, 11, 12, 13, 13, 12, 11, 10,  null,  null,  null,  null,  null,  null,  null,  null,
     8,  9, 10, 11, 11, 10,  9,  8,  null,  null,  null,  null,  null,  null,  null,  null,
]

AI.RMOBILITY = [
     6,  7,  8,  9,  9,  8,  7,  6,  null,  null,  null,  null,  null,  null,  null,  null,
    10, 11, 12, 13, 13, 12, 11, 10,  null,  null,  null,  null,  null,  null,  null,  null,
     9, 10, 11, 12, 12, 11, 10,  9,  null,  null,  null,  null,  null,  null,  null,  null,
    11, 12, 13, 14, 13, 13, 12, 11,  null,  null,  null,  null,  null,  null,  null,  null,
     9, 10, 11, 12, 12, 11, 10,  9,  null,  null,  null,  null,  null,  null,  null,  null,
     7,  8,  9, 10, 10,  9,  8,  7,  null,  null,  null,  null,  null,  null,  null,  null,
     5,  6,  7,  8,  8,  7,  6,  5,  null,  null,  null,  null,  null,  null,  null,  null,
     4,  5,  6,  7,  7,  6,  5,  4,  null,  null,  null,  null,  null,  null,  null,  null,
]

AI.QMOBILITY = [
     2,  3,  3,  4,  4,  3,  3,  2,  null,  null,  null,  null,  null,  null,  null,  null,
     3,  3,  3,  4,  4,  3,  3,  3,  null,  null,  null,  null,  null,  null,  null,  null,
     6,  6,  6,  7,  7,  6,  6,  6,  null,  null,  null,  null,  null,  null,  null,  null,
     5,  6,  6,  7,  7,  6,  6,  5,  null,  null,  null,  null,  null,  null,  null,  null,
     4,  5,  5,  6,  6,  5,  5,  4,  null,  null,  null,  null,  null,  null,  null,  null,
     3,  4,  5,  5,  5,  5,  4,  3,  null,  null,  null,  null,  null,  null,  null,  null,
     2,  3,  3,  4,  4,  3,  3,  2,  null,  null,  null,  null,  null,  null,  null,  null,
     2,  3,  3,  4,  4,  3,  3,  2,  null,  null,  null,  null,  null,  null,  null,  null,
]

AI.OUTPOSTBONUSKNIGHT= [
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
   28, 45, 60, 70, 70, 60, 45, 28,  null,  null,  null,  null,  null,  null,  null,  null,
   15, 28, 35, 55, 55, 35, 28, 15,  null,  null,  null,  null,  null,  null,  null,  null,
    9, 14, 18, 25, 25, 18, 14,  9,  null,  null,  null,  null,  null,  null,  null,  null,
    5,  7,  9, 12, 12,  9,  7,  5,  null,  null,  null,  null,  null,  null,  null,  null,
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 

]

AI.OUTPOSTBONUSBISHOP= [
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
   28, 45, 60, 70, 70, 60, 45, 28,  null,  null,  null,  null,  null,  null,  null,  null,
   15, 28, 35, 55, 55, 35, 28, 15,  null,  null,  null,  null,  null,  null,  null,  null,
    8, 14, 18, 25, 25, 18, 14,  8,  null,  null,  null,  null,  null,  null,  null,  null,
    5,  7,  9, 12, 12,  9,  7,  5,  null,  null,  null,  null,  null,  null,  null,  null,
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
    0,  0,  0,  0,  0,  0,  0,  0,  null,  null,  null,  null,  null,  null,  null,  null, 
]

AI.ATTACKING_PIECES =  [null,null,0,0,0,0]

AI.PAWNSHIELD = [41,17,0,3]
AI.MOB =  [null,null,[1,43],[9,14],[19,28],[39,19]]
// AI.PAR = new Array(35).fill(0)
AI.PAR = [31,17,17,37,32,15,15,7,4,2,12,16,29,3,30,19,16,22,12,6,0,0,10,13,0,0,12,18,4,9,8,31,2,102,27]

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
//     10, //26 raking bishops
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
//     10, //19 Expensive center control
//     10, //20 Occupied by 1
//     5,  //21 Occupied by 2
//     10, //22 incentive for keeping queens and rooks in advantage
//     10, //23 blocked pawns with knights
//     5,  //24 pawn span midgame
//     10, //25 pawn span endgame
//     10, //26 raking bishops
//     10, //27 Rook battery

//     //Shield
//     10, //28 King in center
//     15, //29 bishop in front of king

//     //Structure
//     20, //30 pawn imbalance
//     40, //31 backward pawns
//     10, //32 space
// ]

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

AI.PIECE_VALUES[LATE_ENDGAME][p] = -VPAWN*AI.POV[P]/100 | 0
AI.PIECE_VALUES[LATE_ENDGAME][n] = -VPAWN*AI.POV[N]/100 | 0
AI.PIECE_VALUES[LATE_ENDGAME][b] = -VPAWN*AI.POV[B]/100 | 0
AI.PIECE_VALUES[LATE_ENDGAME][r] = -VPAWN*AI.POV[R]/100 | 0
AI.PIECE_VALUES[LATE_ENDGAME][q] = -VPAWN*AI.POV[Q]/100 | 0
AI.PIECE_VALUES[LATE_ENDGAME][k] = 0

AI.PIECE_VALUES[LATE_ENDGAME][P] = VPAWN*AI.POV[P]/100 | 0
AI.PIECE_VALUES[LATE_ENDGAME][N] = VPAWN*AI.POV[N]/100 | 0
AI.PIECE_VALUES[LATE_ENDGAME][B] = VPAWN*AI.POV[B]/100 | 0
AI.PIECE_VALUES[LATE_ENDGAME][R] = VPAWN*AI.POV[R]/100 | 0
AI.PIECE_VALUES[LATE_ENDGAME][Q] = VPAWN*AI.POV[Q]/100 | 0
AI.PIECE_VALUES[LATE_ENDGAME][K] = 0

// Total material value doesnt count pawns
AI.maxMaterialValue = 4 * AI.PIECE_VALUES[OPENING][N] +
                      4 * AI.PIECE_VALUES[OPENING][B] +
                      4 * AI.PIECE_VALUES[OPENING][R] +
                      2 * AI.PIECE_VALUES[OPENING][Q] +
                      2 * AI.PIECE_VALUES[OPENING][K]

console.log('Max material value', AI.maxMaterialValue)

// CONSTANTES
const MATE = (AI.maxMaterialValue + 16*VPAWN) / AI.nullWindowFactor | 0
const DRAW = 0
const INFINITY = MATE + 1 | 0

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

let manhattanDistance = (sq1, sq2)=> {
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

// MVV-LVA
// Valor para determinar orden de capturas,
// prefiriendo la víctima más valiosa con el atacante más débil
//https://open-chess.org/viewtopic.php?t=3058
// let mvvlvaScores = [
//     /* P      N      B      R      Q      K
// /*P*/[6002, 20225, 20250, 20400, 20800, 26900],
// /*N*/[4775,  6004, 20025, 20175, 20575, 26675],
// /*B*/[4750,  4975,  6006, 20150, 20550, 26650],
// /*R*/[4600,  4825,  4850,  6008, 20400, 26500],
// /*Q*/[4200,  4425,  4450,  4600,  6010, 26100],
// /*K*/[3100,  3325,  3350,  3500,  3900, 26000],
// ]

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
        delete AI.history
        AI.history = new Map()

        AI.history[K] = Array(120).fill(0)
        AI.history[Q] = Array(120).fill(0)
        AI.history[R] = Array(120).fill(0)
        AI.history[B] = Array(120).fill(0)
        AI.history[N] = Array(120).fill(0)
        AI.history[P] = Array(120).fill(0)
        
        AI.history[k] = Array(120).fill(0)
        AI.history[q] = Array(120).fill(0)
        AI.history[r] = Array(120).fill(0)
        AI.history[b] = Array(120).fill(0)
        AI.history[n] = Array(120).fill(0)
        AI.history[p] = Array(120).fill(0)
    }


    if (tt) {
        delete AI.hashTable
        AI.hashTable = [null, new Array(this.htlength)/*.fill(null)*/, new Array(this.htlength)/*.fill(null)*/]

        
    }

    if (ev) {
        delete AI.evalTable
        AI.evalTable = (new Array(this.htlength)).fill(null)
    }

    if (pp) {
        delete AI.pawnTable
        AI.pawnTable = (new Array(this.pawntlength))//.fill(null)

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

// FUNCIÓN DE EVALUACIÓN DE LA POSICIÓN
AI.evaluate = function (board, ply, alpha, beta, pvNode, incheck, illegalMovesSoFar) {
    // let t0 = Date.now()
    illegalMovesSoFar = illegalMovesSoFar | 0

    let evalEntry = AI.evalTable[board.hashkey % this.htlength]
    this.evalnodes++
    let turn = board.turn
    let sign = turn === WHITE? 1 : -1
    
    if (evalEntry && !pvNode && evalEntry.hashkey === board.hashkey) {
        this.evalhashnodes++
        return sign*evalEntry.score
    }

    alpha = alpha*this.nullWindowFactor | 0
    beta = alpha + VPAWN
        
    let score = AI.random? Math.random()*AI.random - AI.random/2 | 0 : 0

    score -= 2 * sign * illegalMovesSoFar

    // if (score < min) {
    //     min = score
    //     console.log(min)
    // }

    let pawnindexW = []
    let pawnindexB = []

    let knightsW = 0
    let knightsB = 0

    let bishopsW = 0
    let bishopsB = 0

    let rooksW = 0
    let rooksB = 0

    let bishopsindexW = []
    let bishopsindexB = []

    let rookscolumnsW = []
    let rookscolumnsB = []

    let queensW = 0
    let queensB = 0

    let material = 0
    let psqt = 0

    let tempTotalMaterial = 0

    let mgFactor = AI.totalmaterial / AI.maxMaterialValue
    let egFactor = 1 - mgFactor

    let lightSquaresWhitePawns = 0
    let lightSquaresBlackPawns = 0
    let darkSquaresWhitePawns = 0
    let darkSquaresBlackPawns = 0
    let blockedLightSquaresWhitePawns = 0
    let blockedDarkSquaresWhitePawns = 0
    let blockedLightSquaresBlackPawns = 0
    let blockedDarkSquaresBlackPawns = 0

    let lightSquaresWhiteBishop = 0
    let lightSquaresBlackBishop = 0
    let darkSquaresWhiteBishop = 0
    let darkSquaresBlackBishop = 0

    let positionalScore = 0

    for (let i = 0; i < 120; i++) {
        if (i & 0x88) {
            i+=7
            continue
        }

        let piece = board.board[i]
        
        if (!piece) {
            continue
        }

        let sumMaterial = true // Sum material only if piece is not a pawn

        if (piece === P) {
            pawnindexW.push(i)
            sumMaterial = false
        } else if (piece === p) {
            pawnindexB.push(i)
            sumMaterial = false
        }

        if (piece === B) {
            bishopsW++

            bishopsindexW.push(i)

            if (AI.phase === OPENING) {
                if ((i === 83 || i === 84) && board.board[i+16] === P) positionalScore -= AI.PAR[33]
    
                // Bishop blocked by own pawns
                if (board.board[i-15] === P) positionalScore -= AI.PAR[34]
                if (board.board[i-17] === P) positionalScore -= AI.PAR[34]
            }
        } else if (piece === b) {
            bishopsB++

            bishopsindexB.push(i)

            if (AI.phase === OPENING) {
                if ((i === 35 || i === 36) && board.board[i-16] === p) positionalScore += AI.PAR[33]
    
                // Bishop blocked by own pawns
                if (board.board[i+15] === p) positionalScore += AI.PAR[34]
                if (board.board[i+17] === p) positionalScore += AI.PAR[34]
            }
        }

        if (!incheck && pvNode) {
            if (piece === P) {
                // //Attacking pieces
                if (board.board[i-15] === q || board.board[i-17] === q) positionalScore += AI.ATTACKING_PIECES[Q]
                if (board.board[i-15] === r || board.board[i-17] === r) positionalScore += AI.ATTACKING_PIECES[R]
                if (board.board[i-15] === b || board.board[i-17] === b) positionalScore += AI.ATTACKING_PIECES[B]
                if (board.board[i-15] === n || board.board[i-17] === n) positionalScore += AI.ATTACKING_PIECES[N]

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
                    positionalScore += AI.PAR[3]
                }

                if (AI.phase <= MIDGAME) {
                    //Center control
                    if (i === 68 && board.board[51] === 0) positionalScore+=AI.PAR[0]
                    if (i === 67 && board.board[52] === 0) positionalScore+=AI.PAR[0]

                    //Outer central lever
                    if (i === 66 && (board.board[51] === p || board.board[51] === 0)) {
                        positionalScore+=AI.PAR[1]

                        if (board.board[81] === P || board.board[83] === P) positionalScore += AI.PAR[2]
                    } 
                    if (i === 69 && (board.board[52] === p || board.board[52] === 0)) {
                        positionalScore+=AI.PAR[1] 

                        if (board.board[84] === P || board.board[86] === P) positionalScore += AI.PAR[2]
                    }
                }

                if (board.colorOfSquare(i)) {
                    lightSquaresWhitePawns++

                    if (board.board[i-16] === p) {
                        blockedLightSquaresWhitePawns++
                        positionalScore += AI.BLOCKEDPAWNBONUS[i]
                    }
                } else {
                    darkSquaresWhitePawns++
                    if (board.board[i-16] === p) {
                        blockedDarkSquaresWhitePawns++
                        positionalScore += AI.BLOCKEDPAWNBONUS[i]
                    }
                }
            } else if (piece === p) {
                // //Attacking pieces
                if (board.board[i+15] === Q || board.board[i+17] === Q) positionalScore -= AI.ATTACKING_PIECES[Q]
                if (board.board[i+15] === R || board.board[i+17] === R) positionalScore -= AI.ATTACKING_PIECES[R]
                if (board.board[i+15] === B || board.board[i+17] === B) positionalScore -= AI.ATTACKING_PIECES[B]
                if (board.board[i+15] === N || board.board[i+17] === N) positionalScore -= AI.ATTACKING_PIECES[N]

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
                    positionalScore -= AI.PAR[3]
                }

                if (AI.phase <= MIDGAME) {
                    //Center control
                    if (i === 51 && board.board[68] === 0) positionalScore-=AI.PAR[0]
                    if (i === 52 && board.board[67] === 0) positionalScore-=AI.PAR[0]

                    //Outer central lever
                    if (i === 50 && (board.board[67] === P || board.board[67] === 0)) {
                        positionalScore-=AI.PAR[1]
                        if (board.board[33] === p || board.board[35] === p) positionalScore -= AI.PAR[2]
                    } 
                    if (i === 53 && (board.board[68] === P || board.board[68] === 0)) {
                        positionalScore-=AI.PAR[1]
                        if (board.board[36] === p || board.board[38] === p) positionalScore -= AI.PAR[2]
                    } 
                }

                if (board.colorOfSquare(i)) {
                    lightSquaresBlackPawns++
                    if (board.board[i+16] === P) {
                        blockedLightSquaresBlackPawns++
                        positionalScore -= AI.BLOCKEDPAWNBONUS[112^i]
                    }
                } else {
                    darkSquaresBlackPawns++
                    if (board.board[i+16] === P) {
                        blockedDarkSquaresBlackPawns++
                        positionalScore -= AI.BLOCKEDPAWNBONUS[112^i]
                    }
                }
            } else if (piece === B) {
                // Blocks knight mobility
                if (board.board[i-48] === n) positionalScore += AI.PAR[4]

                //Semi outpost
                if (AI.phase <= MIDGAME && board.ranksW[i] >= 3 && board.board[i-16] === P) positionalScore+=AI.PAR[5]
    
                //X-Rays
                if (board.diagonals1[i] === board.diagonals1[board.blackKingIndex]) {
                    positionalScore += AI.PAR[6]
                } else if (board.diagonals2[i] === board.diagonals2[board.blackKingIndex]) {
                    positionalScore += AI.PAR[6]
                }

                if (board.board[i + 15] === P || board.board[i + 17] === P) {
                    positionalScore += AI.OUTPOSTBONUSBISHOP[i]

                    //pawn in front of outpost bishop
                    if (board.board[i-16] === p) positionalScore += AI.PAR[7]

                    //outpost bishop in rank 6
                    if (board.ranksW[i] === 6) positionalScore += AI.PAR[8]
                }

                if (board.colorOfSquare(i)) {
                    lightSquaresWhiteBishop++
                } else {
                    darkSquaresWhiteBishop++
                }
            } else if (piece === b) {
                // Blocks knight mobility
                if (board.board[i+48] === N) positionalScore -= AI.PAR[4]

                //Semi outpost
                if (AI.phase <= MIDGAME && board.ranksB[i] >= 3 && board.board[i+16] === p) positionalScore-=AI.PAR[5]
    
                // X-Rays
                if (board.diagonals1[i] === board.diagonals1[board.whiteKingIndex]) {
                    positionalScore -= AI.PAR[6]
                } else if (board.diagonals2[i] === board.diagonals2[board.whiteKingIndex]) {
                    positionalScore -= AI.PAR[6]
                }

                if (board.board[i - 15] === p || board.board[i - 17] === p) {
                    positionalScore -= AI.OUTPOSTBONUSBISHOP[112^i]

                    //pawn in front of outpost bishop
                    if (board.board[i+16] === P) positionalScore -= AI.PAR[7]

                    //outpost bishop in rank 6
                    if (board.ranksB[i] === 6) positionalScore -= AI.PAR[8]
                }

                if (board.colorOfSquare(i)) {
                    lightSquaresBlackBishop++
                } else {
                    darkSquaresBlackBishop++
                }
            } else if (piece === N) {
                

                // Semi outpost
                if (AI.phase <= MIDGAME && board.ranksW[i] >= 3 && board.board[i-16] === P) positionalScore+=AI.PAR[9]
                
                knightsW++

                if (board.board[i + 15] === P || board.board[i + 17] === P) {
                    positionalScore += AI.OUTPOSTBONUSKNIGHT[i]

                    //enemy pawn in front of outpost knight
                    if (board.board[i-16] === p) positionalScore += AI.PAR[10]

                    //outpost knight in rank 6
                    if (board.ranksW[i] === 6) positionalScore += AI.PAR[11]
                }
                
            } else if (piece === n) {
                

                // Semi outpost
                if (AI.phase <= MIDGAME && board.ranksB[i] >= 3 && board.board[i+16] === p) positionalScore-=AI.PAR[9]
                knightsB++

                if (board.board[i - 15] === p || board.board[i - 17] === p) {
                    positionalScore -= AI.OUTPOSTBONUSKNIGHT[112^i]

                    if (board.board[i+16] === P) positionalScore -= AI.PAR[10]

                    if (board.ranksB[i] === 6) positionalScore -= AI.PAR[11]
                }
            } else if (piece === R) {
                rooksW++
    
                rookscolumnsW.push(board.columns[i])

                // X-Rays
                if (AI.phase <= MIDGAME) {
                    if (board.columns[i] === board.columns[board.blackKingIndex]) positionalScore += AI.PAR[12]
                    if (board.ranksW[i] === board.ranksW[board.blackKingIndex]) positionalScore += AI.PAR[12]
                }

                //defended rook in rank 5
                if (board.ranksW[i] === 5) {
                    if (board.board[i + 15] === P || board.board[i + 17] === P) positionalScore += AI.PAR[13]
                } 
            } else if (piece === r) {
                rooksB++
    
                rookscolumnsB.push(board.columns[i])
    
                // X-Rays
                if (AI.phase <= MIDGAME) {
                    if (board.columns[i] === board.columns[board.whiteKingIndex]) positionalScore -= AI.PAR[12]
                    if (board.ranksB[i] === board.ranksB[board.whiteKingIndex]) positionalScore -= AI.PAR[12]
                }

                //defended rook in rank 5
                if (board.ranksB[i] === 5) {
                    if (board.board[i - 15] === p || board.board[i - 17] === p) positionalScore -= AI.PAR[13]
                }
            } else if (piece === Q) {
                queensW++

                if (board.diagonals1[i] === board.diagonals1[board.blackKingIndex]) {
                    positionalScore += AI.PAR[14]
                } else if (board.diagonals2[i] === board.diagonals2[board.blackKingIndex]) {
                    positionalScore += AI.PAR[14]
                }

                if (board.columns[i] === board.columns[board.blackKingIndex]) {
                    positionalScore += AI.PAR[14]
                } else if (board.ranksW[i] === board.ranksW[board.blackKingIndex]) {
                    positionalScore += AI.PAR[14]
                }
            } else if (piece === q) {
                queensB++
                if (board.diagonals1[i] === board.diagonals1[board.whiteKingIndex]) {
                    positionalScore -= AI.PAR[14]
                } else if (board.diagonals2[i] === board.diagonals2[board.whiteKingIndex]) {
                    positionalScore -= AI.PAR[14]
                }

                if (board.columns[i] === board.columns[board.whiteKingIndex]) {
                    positionalScore -= AI.PAR[14]
                } else if (board.ranksB[i] === board.ranksB[board.whiteKingIndex]) {
                    positionalScore -= AI.PAR[14]
                }
            } else if (piece === K) {
                if (board.whiteKingIndex === 118 && board.board[119] === R) positionalScore -= VPAWN
            } else if (piece === k) {
                if (board.blackKingIndex === 6 && board.board[7] === r) positionalScore += VPAWN
            }
        }

        let turn = board.color(piece)
        let sign = turn === WHITE? 1 : -1

        let mgMaterial = mgFactor * AI.PIECE_VALUES[OPENING][piece] | 0
        let egMaterial = egFactor * AI.PIECE_VALUES[LATE_ENDGAME][piece] | 0

        material += (mgMaterial + egMaterial) //Material

        tempTotalMaterial += sumMaterial? AI.PIECE_VALUES[OPENING][ABS[piece]] : 0 //Not-pawn material

        let index = turn === WHITE? i : (112^i)
        let piecetype = ABS[piece]
        
        let mgPSQT = AI.PSQT_OPENING[piecetype][index] * mgFactor | 0
        let egPSQT = AI.PSQT_LATE_ENDGAME[piecetype][index] * egFactor | 0
        
        psqt += sign*(mgPSQT + egPSQT)
    }
    
    AI.totalmaterial = tempTotalMaterial

    // Material + PSQT
    score += material + psqt + positionalScore | 0

    
    
    // Bishop pair
    score += bishopsW >= 2? AI.BISHOP_PAIR[AI.phase] : 0
    score -= bishopsB >= 2? AI.BISHOP_PAIR[AI.phase] : 0
    
    // Pawn structure
    score += AI.getStructure(board, pawnindexW, pawnindexB)

    if (incheck) {
            
        let nullWindowScore = (score / AI.nullWindowFactor | 0)
        
        AI.evalTable[board.hashkey % this.htlength] = {
            hashkey: board.hashkey,
            score: nullWindowScore
        }
        return sign*nullWindowScore
    }

    if (AI.phase === LATE_ENDGAME && alpha > VPAWNx2) {
        let opponentKing = turn === WHITE? board.blackKingIndex : board.whiteKingIndex
        let kingToTheCorner = AI.CENTERMANHATTAN[opponentKing] - 3
        let distanceBetweenKings = 8 - manhattanDistance(board.whiteKingIndex, board.blackKingIndex)

        let mopup = 20*(kingToTheCorner + distanceBetweenKings)

        if (turn === WHITE) {
            score += mopup
        } else {
            score -= mopup
        }
    }

    
    if (AI.isLazyFutile(sign, score, alpha, beta)) {
        
        let nullWindowScore = (score / AI.nullWindowFactor | 0)
        
        AI.evalTable[board.hashkey % this.htlength] = {
            hashkey: board.hashkey,
            score: nullWindowScore
        }
        return sign*nullWindowScore
    }

    
    if (!incheck && pvNode) {
        

        // Is king under attack
        if (AI.phase >= MIDGAME) {
            score -= AI.PAR[15]*board.isSquareAttacked(board.whiteKingIndex-15, BLACK, false)
            score -= AI.PAR[16]*board.isSquareAttacked(board.whiteKingIndex-16, BLACK, false)
            score -= AI.PAR[17]*board.isSquareAttacked(board.whiteKingIndex-17, BLACK, false)       
            
            score += AI.PAR[15]*board.isSquareAttacked(board.blackKingIndex+15, WHITE, false)
            score += AI.PAR[16]*board.isSquareAttacked(board.blackKingIndex+16, WHITE, false)
            score += AI.PAR[17]*board.isSquareAttacked(board.blackKingIndex+17, WHITE, false)
        }

        if (AI.isLazyFutile(sign, score, alpha, beta)) {
            let nullWindowScore = (score / AI.nullWindowFactor | 0)
            
            AI.evalTable[board.hashkey % this.htlength] = {
                hashkey: board.hashkey,
                score: nullWindowScore
            }
    
            return sign*nullWindowScore
        }

        // Mobility
        score += AI.getMobility(board)

        // Pawns on same squares of bishops //8 for MG, 15 for EG
        let badPawns = 0
            badPawns+= (AI.PAR[18]*lightSquaresWhiteBishop*lightSquaresWhitePawns + AI.PAR[18]*darkSquaresWhiteBishop*darkSquaresWhitePawns)
            badPawns+= (AI.PAR[18]*lightSquaresWhiteBishop*blockedLightSquaresWhitePawns + AI.PAR[18]*darkSquaresWhiteBishop*blockedDarkSquaresWhitePawns)
            
            badPawns-= (AI.PAR[18]*lightSquaresBlackBishop*lightSquaresBlackPawns + AI.PAR[18]*darkSquaresBlackBishop*darkSquaresBlackPawns)
            badPawns-= (AI.PAR[18]*lightSquaresBlackBishop*blockedLightSquaresBlackPawns + AI.PAR[18]*darkSquaresBlackBishop*blockedDarkSquaresBlackPawns)
    
        score -= badPawns

        if (AI.isLazyFutile(sign, score, alpha, beta)) {
            
            let nullWindowScore = (alpha / AI.nullWindowFactor | 0) + 1
            
            AI.evalTable[board.hashkey % this.htlength] = {
                hashkey: board.hashkey,
                score: nullWindowScore
            }
            return sign*nullWindowScore
        }
    
        // Expensive center control
        if (AI.phase <= MIDGAME) {
            for (let i = 0, len=WIDECENTER.length; i < len; i++) {

                
                score += AI.PAR[19] * board.isSquareAttacked(WIDECENTER[i], WHITE, true)
                score -= AI.PAR[19] * board.isSquareAttacked(WIDECENTER[i], BLACK, true)
    
                let piece = board.board[WIDECENTER[i]]
                
                if (!piece) continue
                
                let occupiedBy = board.pieces[piece].color
                
                if (occupiedBy === WHITE) {
                    score += i < 64? AI.PAR[20] : AI.PAR[21]
                } else {
                    score -= i > 64? AI.PAR[20] : AI.PAR[21]
                }
            }
        }
    
        if (AI.isLazyFutile(sign, score, alpha, beta)) {
            
            let nullWindowScore = (alpha / AI.nullWindowFactor | 0) + 1
            
            AI.evalTable[board.hashkey % this.htlength] = {
                hashkey: board.hashkey,
                score: nullWindowScore
            }
            return sign*nullWindowScore
        }


    
        if (AI.phase >= EARLY_ENDGAME) {
            if (score > VPAWNx2) {
                if (queensW >= queensB) score += AI.PAR[22]
                if (rooksW >= rooksB) score += AI.PAR[22]
                
            }
                
            if (score < -VPAWNx2) {
                if (queensB >= queensW) score -= AI.PAR[22]
                if (rooksB >= rooksW) score -= AI.PAR[22]
            }
        }
    
        // Knights with blocked pawns
        let blockedWhitePawns = blockedLightSquaresWhitePawns + blockedDarkSquaresWhitePawns
        let blockedBlackPawns = blockedLightSquaresBlackPawns + blockedDarkSquaresBlackPawns
    
        score += AI.PAR[23]*blockedWhitePawns*knightsW
        score -= AI.PAR[23]*blockedBlackPawns*knightsB
    
        //Pawn span (distance between first and last pawn)
        let spanbonus = AI.phase <= MIDGAME? AI.PAR[24] : AI.PAR[25]
    
        if (pawnindexW.length > 1) {
            score += spanbonus*(board.columns[pawnindexW[pawnindexW.length - 1]] - board.columns[pawnindexW[0]])
        }
    
        if (pawnindexB.length > 1) {
            score -= spanbonus*(board.columns[pawnindexB[pawnindexB.length - 1]] - board.columns[pawnindexB[0]])
        }
    
        // Raking bishops
        if (bishopsW === 2) {
            if (Math.abs(bishopsindexW[0] - bishopsindexW[1]) === 1) score += AI.PAR[26]
            if (Math.abs(bishopsindexW[0] - bishopsindexW[1]) === 16) score += AI.PAR[26]
        }
    
        if (bishopsB === 2) {
            if (Math.abs(bishopsindexB[0] - bishopsindexB[1]) === 1) score -= AI.PAR[26]
            if (Math.abs(bishopsindexB[0] - bishopsindexB[1]) === 16) score -= AI.PAR[26]
        }
    
        //Rook battery
        if (AI.phase <= MIDGAME) {
            if (rookscolumnsW.length === 2) {
                if (rookscolumnsW[0] === rookscolumnsW[1]) score += AI.PAR[27]
            }
    
            if (rookscolumnsB.length === 2) {
                if (rookscolumnsB[0] === rookscolumnsB[1]) score -= AI.PAR[27]
            }
        }
    }

    let nullWindowScore = score / AI.nullWindowFactor | 0

    AI.evalTable[board.hashkey % this.htlength] = {
        hashkey: board.hashkey,
        score: nullWindowScore
    }

    // let t1 = Date.now()
    // AI.evalTime += t1 - t0

    return sign*nullWindowScore
}

AI.getPawnShield = (board, phase)=>{
    let score = 0
    let bonus = AI.PAWNSHIELD[AI.phase]

    if (phase <= MIDGAME && board.columns[board.whiteKingIndex] === 3 || board.columns[board.whiteKingIndex] === 4) score -= AI.PAR[28]
    
    if (board.whiteKingIndex !== 116) {
        score += board.board[board.whiteKingIndex-15] === P? bonus : 0
        score += board.board[board.whiteKingIndex-16] === P? bonus : 0
        score += board.board[board.whiteKingIndex-16] === B && phase <= MIDGAME? AI.PAR[29] : 0
        score += board.board[board.whiteKingIndex-17] === P? bonus : 0

        if (phase <= MIDGAME && board.board[board.whiteKingIndex-16] === 0) {
            score -= VPAWN
        }
        
        //TODO: Penalty for doubled pawns in king shelter (mg: 15, eg: 8)
    }
    
    if (phase <= MIDGAME && board.columns[board.blackKingIndex] === 3 || board.columns[board.blackKingIndex] === 4) score += AI.PAR[28]
    
    if (board.blackKingIndex !== 4) {
        score += board.board[board.blackKingIndex+15] === p? -bonus : 0
        score += board.board[board.blackKingIndex+16] === p? -bonus : 0
        score += board.board[board.blackKingIndex+16] === b && phase <= MIDGAME? -AI.PAR[29] : 0
        score += board.board[board.blackKingIndex+17] === p? -bonus : 0

        if (phase <= MIDGAME && board.board[board.blackKingIndex+16] === 0) {
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

    score += (whiteMoves[N]? AI.MOB[N][0] * Math.log(whiteMoves[N]) - AI.MOB[N][1] | 0 : 0)
    score += (whiteMoves[B]? AI.MOB[B][0] * Math.log(whiteMoves[B]) - AI.MOB[B][1] | 0 : 0)
    score += (whiteMoves[R]? AI.MOB[R][0] * Math.log(whiteMoves[R]) - AI.MOB[R][1] | 0 : 0)
    score += (whiteMoves[Q]? AI.MOB[Q][0] * Math.log(whiteMoves[Q]) - AI.MOB[Q][1] | 0 : 0)
    
    score -= (blackMoves[n]? AI.MOB[N][0] * Math.log(blackMoves[n]) - AI.MOB[N][1] | 0 : 0)
    score -= (blackMoves[b]? AI.MOB[B][0] * Math.log(blackMoves[b]) - AI.MOB[B][1] | 0 : 0)
    score -= (blackMoves[r]? AI.MOB[R][0] * Math.log(blackMoves[r]) - AI.MOB[R][1] | 0 : 0)
    score -= (blackMoves[q]? AI.MOB[Q][0] * Math.log(blackMoves[q]) - AI.MOB[Q][1] | 0 : 0)

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
            // console.log('collision', total++)
        }
    }

    let pawnImbalance = AI.PAR[30]*(pawnindexW.length - pawnindexB.length)

    
    
    let doubled = AI.getDoubled(board, pawnindexW, pawnindexB)
    let defended = AI.getDefended(board, pawnindexW, pawnindexB)
    let passers = AI.getPassers(board, pawnindexW, pawnindexB)
    let space = AI.getSpace(board, pawnindexW, pawnindexB)
    let backward = AI.getBackwardPawns(board, pawnindexW, pawnindexB)
    let pawnShield = AI.getPawnShield(board, AI.phase)

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

    return -AI.PAR[31] * (whiteBackwardPawns - blackBackwardPawns)
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

    let space = AI.PAR[32]*(spaceW - spaceB)

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

    let defendedWhitePawns = -AI.DEFENDED_VALUES[0]*defendedW**2 + AI.DEFENDED_VALUES[1]*defendedW - AI.DEFENDED_VALUES[2]
    let defendedBlackPawns = -AI.DEFENDED_VALUES[0]*defendedB**2 + AI.DEFENDED_VALUES[1]*defendedB - AI.DEFENDED_VALUES[2]

    return defendedWhitePawns - defendedBlackPawns | 0
}

// ORDENA LOS MOVIMIENTOS
// Esta función es fundamental para que la poda Alfa-Beta funcione de manera óptima
// El orden establecido permite que la primera jugada
// sea FAIL-HIGH en más de un 90% de los casos.
AI.sortMoves = function (moves, turn, ply, depth, ttEntry) {

    // let t0 = (new Date).getTime()
    let killer1, killer2

    if (AI.killers) {
        killer1 = AI.killers[turn][ply][0]
        killer2 = AI.killers[turn][ply][1]
    }

    let sortedMoves = []
    let unsortedMoves = []

    for (let i = 0, len = moves.length; i < len; i++) {
        let move = moves[i]

        move.mvvlva = 0
        move.hvalue = 0
        move.killer1 = 0
        move.killer2 = 0
        move.score = 0

        // CRITERIO 0: La jugada está en la Tabla de Trasposición
        if (ttEntry && ttEntry.flag < UPPERBOUND && move.key === ttEntry.move.key) {
            move.tt = true
            move.score += 2e9
            sortedMoves.push(move)
            continue
        }

        if (move.isCapture) {
            move.mvvlva = AI.MVVLVASCORES[move.piece][move.capturedPiece]
            
            if (move.mvvlva >= 6000) {
                // CRITERIO 3: La jugada es una captura posiblemente ganadora
                move.score += 1e7 + move.mvvlva
            } else {
                // CRITERIO 5: La jugada es una captura probablemente perdedora
                move.score += 4e6 + move.mvvlva
            }

            sortedMoves.push(move)

            continue
        }

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
        if (move.castleSide && AI.phase <= MIDGAME) {
            move.score += 20000 // Enough to be over the history moves

            sortedMoves.push(move)

            continue
        }
        
        // CRITERIO 6: Movimientos históricos
        // Se da preferencia a movimientos posicionales que han tenido 
        // éxito en otras posiciones.

        let hvalue = AI.history[move.piece][move.to]

        if (hvalue) {
            move.score += hvalue

            sortedMoves.push(move)

            continue
        } else {
            unsortedMoves.push(move)
            // // y PSQT
            // if (turn === WHITE) {
            //     move.score += AI.PSQT[ABS[move.piece]][move.to] - AI.PSQT[ABS[move.piece]][move.from]
            // } else {
            //     move.score += AI.PSQT[ABS[move.piece]][112^move.to] - AI.PSQT[ABS[move.piece]][112^move.from]
            // }
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

// BÚSQUEDA ¿EN CALMA?
// Para evitar el Efecto-Horizonte, la búqueda continua de manera forzosa hasta
// que se encuentra una posición "en calma" (donde ningún rey está en jaque ni
// donde la última jugada haya sido una captura). Cuando se logra esta posición
// "en calma", se evalúa la posición.
AI.quiescenceSearch = function (board, alpha, beta, depth, ply, pvNode, illegalMovesSoFar) {

    AI.qsnodes++

    let turn = board.turn
    let opponentTurn = turn === WHITE? BLACK : WHITE
    let legal = 0
    let incheck = board.isKingInCheck()
    let standpat = alpha // Only to prevent undefined values for standpat
    
    let hashkey = board.hashkey

    if (!incheck) {
        standpat = AI.evaluate(board, ply, alpha, beta, pvNode, incheck, illegalMovesSoFar) | 0
        
        if (standpat >= beta) {
            return standpat
        }

        if (standpat > alpha) alpha = standpat
    }

    let moves = board.getMoves(false, !incheck)

    if (moves.length === 0) {
        return alpha
    }
    
    let ttEntry = AI.ttGet(turn, hashkey)
    let score = -INFINITY
    
    moves = AI.sortMoves(moves, turn, ply, depth, ttEntry)

    for (let i = 0, len = moves.length; i < len; i++) {
        let move = moves[i]

        if (!incheck) {
            // Bad captures pruning (+34 ELO)
            if (move.mvvlva < 6000) {
                if (board.isSquareAttacked(move.to, opponentTurn, false, false)) continue
            }
            
            // delta pruning para cada movimiento
            if (standpat + AI.PIECE_VALUES[OPENING][ABS[move.capturedPiece]]/this.nullWindowFactor < alpha) {
                continue
            }
        }

        // let m0 = (new Date()).getTime()
        if (board.makeMove(move)) {
            // AI.moveTime += (new Date()).getTime() - m0
            legal++

            score = -AI.quiescenceSearch(board, -beta, -alpha, depth - 1, ply + 1, pvNode)

            board.unmakeMove(move)

            if (score >= beta) {
                AI.ttSave(turn, hashkey, score, LOWERBOUND, depth, move)
                return score
            }
            
            if (score > alpha) {
                alpha = score
            }
        }
    }

    if (incheck && legal === 0) {
        return -MATE + ply
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

AI.saveHistory = function (turn, move, value) {
    AI.history[move.piece][move.to] += 32 * value - AI.history[move.piece][move.to]*Math.abs(value)/512 | 0
}

// PRINCIPAL VARIATION SEARCH
// El método PVS es Negamax + Ventana-Nula
AI.PVS = function (board, alpha, beta, depth, ply, allowNullMove, illegalMovesSoFar) {

    let mating_value = MATE - ply;

    if (mating_value < beta) {
        beta = mating_value
        if (alpha >= mating_value) return mating_value
    }

    mating_value = -MATE + ply;

    if (mating_value > alpha) {
        alpha = mating_value
        if (beta <= mating_value) return mating_value
    }

    let alphaOriginal = alpha
    let pvNode = beta - alpha > 1 // PV-Node
    
    let cutNode = beta - alpha === 1 // Cut-Node
    
    if (pvNode) AI.pvnodes++
    
    AI.nodes++
    
    if (AI.iteration > AI.mindepth[AI.phase]) {
        if (Date.now() > AI.timer + AI.milspermove) {
            AI.stop = true
        }
    }

    let turn = board.turn
    let opponentTurn = turn === WHITE? BLACK : WHITE
    let sign = turn === WHITE? 1 : -1
    let hashkey = board.hashkey

    let ttEntry = AI.ttGet(turn, hashkey)

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
        return AI.quiescenceSearch(board, alpha, beta, depth, ply, pvNode, illegalMovesSoFar)
    }
    
    if (AI.stop && AI.iteration > AI.mindepth[AI.phase]) return alpha
    
    let mateE = 0 // Mate threat extension
    
    let staticeval = AI.evaluate(board, ply, alpha, beta, pvNode, incheck) | 0
        
    // IID
    if (!ttEntry) depth--

    let prune = !incheck && ply > 2 && (depth < 9 || cutNode) && alpha < MATE - AI.totaldepth
    // let prune = !incheck && alpha < MATE - AI.totaldepth

    if (prune) {
        //Futility
        if (staticeval - MARGIN2*depth >= beta) {
            return staticeval
        }
    
        // Null move pruning
        if (allowNullMove && staticeval >= beta && AI.phase < LATE_ENDGAME) {
            if (!board.enPassantSquares[board.enPassantSquares.length - 1]) {
                board.changeTurn()
                let nullR = depth > 6? 4 : 3
                let nullScore = -AI.PVS(board, -beta, -beta + 1, depth - nullR - 1, ply, false)
                board.changeTurn()
                
                if (nullScore >= beta) {
                    return nullScore
                } else {
                    if (nullScore < -MATE + AI.totaldepth) {
                        mateE = 1
                    }
                }
            }
        }
    }
    
    // Razoring
    if (staticeval + MARGIN1 < beta) { // likely a fail-low node ?
        if (depth <= 3) {
            let score = AI.quiescenceSearch(board, alpha, beta, 0, ply, pvNode, illegalMovesSoFar)

            if (score < beta) return score
        } else {
            if (staticeval + MARGIN2 < beta) {
                depth -= 2
            } else {
                depth--
            }
        }
        
    }

    let moves = board.getMoves()

    moves = AI.sortMoves(moves, turn, ply, depth, ttEntry)

    let bestmove = moves[0]
    let legal = 0
    let illegalMoves = 0
    let bestscore = -INFINITY
    let score

    for (let i = 0, len = moves.length; i < len; i++) {
        let move = moves[i]
        let piece = move.piece

        // Extensiones
        let E = mateE && depth <= 2? 1 : 0

        if (pvNode && depth <= 2) {
            if (AI.phase === LATE_ENDGAME && (piece === P || piece === p)) E = 1
        }

        //Reducciones
        let R = 0

        if (prune && !E && !move.killer1 && legal >= 1) {
            // Futility Pruning
            if (depth <= 3) {
                if (move.isCapture) {
                    if (staticeval + AI.PIECE_VALUES[OPENING][ABS[move.capturedPiece]]/this.nullWindowFactor + depth*SMALLMARGIN < alpha) {
                        continue
                    }
                } else {
                    if (staticeval + depth*SMALLMARGIN < alpha) {
                        continue
                    }
                }
            }

            // if (cutNode && ply > 1 && i > 12 && !move.isCapture && staticeval > alpha - VERYSMALLMARGIN) {
            //     let limit = i > 20? 0.85 : 0.8
            //     if (Math.random() < limit) {
            //         AI.rnodes++
            //         continue
            //     }
            // }
        }

        // Enhanced Transposition Cut-Off actual position +12 ELO
        if (!ttEntry) {
            // total++
            
            let ttETC = AI.ttGet(turn, hashkey)
            
            if (ttETC && ttETC.hashkey === hashkey && ttETC.depth >= depth) {
                AI.etcNodes++
                // max++
                if (ttETC.flag === LOWERBOUND) {
                    if (ttETC.score > alpha) alpha = ttETC.score
                } else if (ttETC.flag === UPPERBOUND) {
                    if (ttETC.score < beta) beta = ttETC.score
                } else { // EXACT
                    if (ttETC.score >= beta) { // > beta?
                        return ttETC.score
                    }
                }
            }
        }

        if (cutNode && depth >= 3 && !mateE) {
            R += AI.LMR_TABLE[depth][legal]

            if (pvNode || incheck) {
                R--
            }

            if (cutNode && !move.killer1) R++

            // Reduce negative history
            if (AI.history[piece][move.to] < 0) R++
            
            if (!move.isCapture) {
                // Move count reductions
                if (legal >= (3 + depth*depth) / 2) {
                    R++
                }
                
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
            } else {
                // if TT Move is a capture
                if (ttEntry && ttEntry.move.key === move.key) R++
            }

            // if (R < 0) R = 0

            // let rLimit = legal > 4 && !move.isCapture? 2 : 4

            // if (depth > 6 && Math.abs(alpha - staticeval) > MARGIN3) {
            //     R = Math.max(R, depth - rLimit)
            // }
        }

        // let m0 = (new Date()).getTime()
        if (board.makeMove(move)) {
            // AI.moveTime += (new Date()).getTime() - m0
            legal++

            // Enhanced Transposition Cut-Off +16 ELO
            let ttETC = AI.ttGet(board.turn, board.hashkey)

            if (!ttEntry && ttETC && ttETC.hashkey === board.hashkey && ttETC.depth >= depth) {
                AI.etcNodes++
                
                let scoreETC = -ttETC.score
                
                if (ttETC.flag === LOWERBOUND) {
                    if (scoreETC < beta) beta = ttETC.score
                    // console.log('beta')
                } else if (ttETC.flag === UPPERBOUND) {
                    if (scoreETC > alpha) alpha = ttETC.score
                    // console.log('alpha')
                }
            }

            if (legal === 1) {
                // El primer movimiento se busca con ventana total y sin reducciones
                // if (AI.stop) return alphaOriginal
                score = -AI.PVS(board, -beta, -alpha, depth + E - 1, ply + 1, allowNullMove, illegalMoves)
            } else {
                if (AI.stop) {
                    board.unmakeMove(move)
                    return alphaOriginal
                }
                score = -AI.PVS(board, -alpha-1, -alpha, depth + E - R - 1, ply + 1, allowNullMove, illegalMoves)

                if (!AI.stop && score > alpha) {
                    R = 0
                    score = -AI.PVS(board, -beta, -alpha, depth + E - 1, ply + 1, allowNullMove, illegalMoves)
                }
            }

            board.unmakeMove(move)

            if (AI.stop) return alphaOriginal //tested ok
            
            if (score > alpha) {
                bestscore = score
                bestmove = move
                alpha = score
                
                // Fail-high
                if (score >= beta) {
                    if (legal === 1) {
                        AI.fhf++
                    }
                    
                    AI.fh++
                    
                    //LOWERBOUND
                    
                    if (!move.isCapture) {
                        if (AI.killers[turn | 0][ply][0] && AI.killers[turn | 0][ply][0].key != move.key) {
                                AI.killers[turn | 0][ply][1] = AI.killers[turn | 0][ply][0]
                        }
                        
                        AI.killers[turn | 0][ply][0] = move
                        
                        AI.saveHistory(turn, move, depth*depth)
                    }
                    
                    AI.ttSave(turn, hashkey, score, LOWERBOUND, depth + E - R, move)
                    
                    return score
                }

                if (!move.isCapture) { AI.saveHistory(turn, move, depth) }

            } else {
                if (!move.isCapture) { AI.saveHistory(turn, move, -depth) }
            }
        } else {
            illegalMoves++
        }
    }

    if (legal === 0) {
        if (incheck) {
            // Mate
            // AI.ttSave(turn, hashkey, -MATE + ply, EXACT, depth, bestmove)
            // AI.ttSave(turn, hashkey, -MATE + ply, LOWERBOUND, depth, bestmove)
            
            return -MATE + ply
        } else {
            // Ahogado
            // AI.ttSave(turn, hashkey, DRAW, EXACT, depth, bestmove)
            // AI.ttSave(turn, hashkey, DRAW, LOWERBOUND, depth, bestmove)
            
            return DRAW
        }

    } else {

        if (bestscore > alphaOriginal) {
            // Mejor movimiento
            if (bestmove) {
                AI.ttSave(turn, hashkey, bestscore, EXACT, depth, bestmove)
                // AI.ttSave(turn, hashkey, bestscore, LOWERBOUND, depth, bestmove)
            }

            return bestscore
        } else {
            //Upperbound
            AI.ttSave(turn, hashkey, alphaOriginal, UPPERBOUND, depth, bestmove)

            return alphaOriginal
        }

    }
}

AI.setPhase = function (board) {
    //OPENING
    AI.phase = 0

    //MIDGAME
    if (AI.nofpieces <= 28 || (board.movenumber && board.movenumber > 8)) {
        AI.phase = 1
    }

    let queens = 0

    for (let e of board.board) {
        if (e === q || e === Q) queens++
    }

    //EARLY ENDGAME (the king enters)
    if (queens === 0 && AI.nofpieces > 12) {
        if (AI.nofpieces <= 24 || Math.abs(AI.lastscore) > AI.PIECE_VALUES[OPENING][ROOK]) {
            AI.phase = 2
        }
    }

    //LATE ENDGAME
    if (AI.nofpieces <= 12 || (queens === 0 && Math.abs(AI.lastscore) >= AI.PIECE_VALUES[OPENING][QUEEN])) {
        AI.phase = 3
    }

    // AI.randomizePSQT()
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
            let moves = board.getMoves().filter(move => {
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
AI.MTDF = function (board, f, d, lowerBound, upperBound) {
    //Esta línea permite que el algoritmo funcione como PVS normal
    // return AI.PVS(board, lowerBound, upperBound, d, 1, true)
    
    let bound = [lowerBound, upperBound] // lower, upper
    let lastIterationF = f

    do {
        let beta = f + (f === bound[0])
        f = AI.PVS(board, d < 10? beta - 2 : beta - 1, beta, d, 1, true)
        bound[(f < beta) | 0] = f
    } while (bound[0] < bound[1] && !AI.stop)

    if (AI.stop) {
        return lastIterationF
    } else {
        return f
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

    AI.nofpieces = 0

    for (let e of board.board) {
        if (e !== null && e !== 0) AI.nofpieces++
    }
    
    let nmoves = board.movenumber * 2
    let changeofphase = false
    
    AI.setPhase(board)
    
    if (AI.lastphase !== AI.phase) changeofphase = true
    
    AI.lastphase = AI.phase

    if (board.movenumber && board.movenumber <= 1) {
        AI.createTables(board, true, true, true, true)
        AI.lastscore = 0
        AI.f = 0
    } else {
        if (changeofphase) {
            AI.createTables(board, true, true, true, true)
        }

        AI.f = AI.lastscore / AI.nullWindowFactor | 0
    }
    
    if (!AI.f) AI.f = 0

    AI.absurd = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ]

    AI.RANDOMLIST = new Array(218)

    for (let i = 0; i < 218; i++) {
        AI.RANDOMLIST[i] = Math.sqrt(2) * Math.sqrt(Math.log(i) / (i - 1))
    }

    AI.RANDOMLIST[0] = 1
    AI.RANDOMLIST[1] = 1

    // console.log(AI.RANDOMLIST)

    // process.exit()

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
        AI.timer = Date.now()
        AI.PV = AI.getPV(board, 1)
        AI.stop = false

        AI.changeinPV = true

        let score = 0
        AI.fhfperc = 0

        AI.killers = []

        AI.killers[WHITE] = (new Array(120)).fill([null, null])
        AI.killers[BLACK] = (new Array(120)).fill([null, null])

        AI.fh = AI.fhf = 0.001
        
        AI.previousls = AI.lastscore

        let depth = 0
        let alpha = -INFINITY
        let beta = INFINITY

        if (true) {
            //Iterative Deepening
            for (; depth <= AI.totaldepth; ) {
                // console.log(board.hashkey)
                if (AI.stop) break

                AI.bestmove = [...AI.PV][1]

                AI.iteration++

                let ttEntry = AI.ttGet(board.turn, board.hashkey)

                if (ttEntry && ttEntry.depth >= depth) {
                    AI.f = ttEntry.score
                } else {
                    AI.f = AI.MTDF(board, AI.f, depth, alpha, beta)
                }

                score = AI.nullWindowFactor * (isWhite ? 1 : -1) * AI.f

                
                if (!AI.stop) {
                    AI.PV = AI.getPV(board, AI.totaldepth)
                    AI.lastscore = score
                }

                if ([...AI.PV][1] && AI.bestmove && [...AI.PV][1].value !== AI.bestmove.value) {
                    AI.changeinPV = true
                } else {
                    AI.changeinPV = false
                }

                AI.fhfperc = Math.round(AI.fhf * 100 / AI.fh)

                // console.log(depth, `FHF: ${AI.fhfperc}%`)

                if (AI.PV && !AI.stop) {
                    console.log('FHF', AI.fhfperc, 'Depth:', depth, 'Score:', score, 'Nodes:', AI.nodes+AI.qsnodes, 'PV Nodes', AI.pvnodes, 'Pawn Hit Rate:',(AI.phnodes / AI.pnodes * 100 | 0))
                }
            
                depth++
            }
        }

        // console.log(AI.previousls, AI.lastscore)

        if (AI.TESTER) {
            console.info(`_ AI.TESTER ${AI.phase} _____________________________________`)
        } else {
            console.info('________________________________________________________________________________')
        }

        let score100 = AI.lastscore * (100/VPAWN)

        let sigmoid = 1 / (1 + Math.exp(-0.7 * score100 / 100))

        AI.lastmove = AI.bestmove

        //zugzwang prevention
        if (!AI.bestmove) {
            console.log('No bestmove')
            let moves = board.getMoves()

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

        AI.createTables(board, AI.collisions/AI.ttGets > 0.005, AI.collisions/AI.ttGets > 0.005, true, AI.pawncollisions/AI.evalnodes > 0.005)
    })
}

AI.createTables(true, true, true, true)

onmessage = function (oEvent) {
    orobas.loadFen(oEvent.data.fen)
    AI.search(orobas, {seconds: parseInt(oEvent.data.seconds)}).then(res=>{
        postMessage(res);
    })
};

// module.exports = AI