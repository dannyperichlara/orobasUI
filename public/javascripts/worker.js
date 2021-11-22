"use strict"

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

        this.changeTurn(turn)
        
        if (enpassantsquare !== '-') {
            this.enPassantSquares = [this.coords.indexOf(enpassantsquare)]
            console.log('En Passant Square', this.enPassantSquares)
        }

        this.initHashkey()
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

            if (piece === P || piece === p || piece === K || piece === k) {
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
                        moves[moveindex++]=(this.createMove({piece: K, from:116, to:118, isCapture:false, capturedPiece:0, castleSide:8, enPassantSquares:null}))
                    }
                    
                    if (castlingRights & 4) {
                        moves[moveindex++]=(this.createMove({piece: K, from:116, to:114, isCapture:false, capturedPiece:0, castleSide:4, enPassantSquares:null}))
                    } 
                }
    
                if (piece === k && i === 4) {
                    if (castlingRights & 2) {
                        moves[moveindex++]=(this.createMove({piece: k, from:4, to:6, isCapture:false, capturedPiece:0, castleSide:2, enPassantSquares:null}))
                    }
                    
                    if (castlingRights & 1) {
                        moves[moveindex++]=(this.createMove({piece: k, from:4, to:2, isCapture:false, capturedPiece:0, castleSide:1, enPassantSquares:null}))
                    }
                }
            }

            //Peones
            if (!forMobility) {
                if (piece === P || piece === p) {
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
                                    // moves[moveindex++]=(this.createMove({piece, from, to, isCapture, capturedPiece:0, castleSide:0, enPassantSquares:null, enPassant: true}))
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
            }
            
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

                    moves[moveindex++]=(this.createMove({piece, from, to, isCapture, capturedPiece, castleSide:0, enPassantSquares:null}))

                    if (isCapture) break

                    if (piece === N || piece === n || piece === K || piece === k) {
                        break
                    }
                }
            }
        }

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
        // this.changeTurn()
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
 
    color(n) {
        return n > 6? BLACK : WHITE
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
    totaldepth: 48,
    ttNodes: 0,
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
    phase: 1,
    htlength: 1 << 22,
    pawntlength: 5e5,
    // mindepth: [6,10,12,18],
    // mindepth: [14,18,20,22],
    mindepth: [1,1,1,1],
    secondspermove: 1,
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

const VPAWN = 82
const VPAWN2 = VPAWN / 2 | 0
const VPAWN3 = VPAWN / 3 | 0
const VPAWN4 = VPAWN / 4 | 0
const VPAWN5 = VPAWN / 5 | 0
const VPAWN10= VPAWN /10 | 0
const VPAWNx2 = 2*VPAWN

const MARGIN1 = VPAWN/AI.nullWindowFactor | 0
const MARGIN2 = VPAWN*2/AI.nullWindowFactor | 0
const MARGIN3 = VPAWN*3/AI.nullWindowFactor | 0
const MARGIN10 = VPAWN*10/AI.nullWindowFactor | 0
const SMALLMARGIN = (VPAWN/2)/AI.nullWindowFactor | 0

AI.PIECE_VALUES = [
    new Map(),
    new Map(),
    new Map(),
    new Map(),
]

AI.PIECE_VALUES[OPENING][p] = -VPAWN
AI.PIECE_VALUES[OPENING][n] = -VPAWN*4.11 | 0
AI.PIECE_VALUES[OPENING][b] = -VPAWN*4.45 | 0
AI.PIECE_VALUES[OPENING][r] = -VPAWN*5.82 | 0
AI.PIECE_VALUES[OPENING][q] = -VPAWN*12.50 | 0
AI.PIECE_VALUES[OPENING][k] = 0

AI.PIECE_VALUES[OPENING][P] = VPAWN
AI.PIECE_VALUES[OPENING][N] = VPAWN*4.11 | 0
AI.PIECE_VALUES[OPENING][B] = VPAWN*4.45 | 0
AI.PIECE_VALUES[OPENING][R] = VPAWN*5.82 | 0
AI.PIECE_VALUES[OPENING][Q] = VPAWN*12.50 | 0
AI.PIECE_VALUES[OPENING][K] = 0

AI.PIECE_VALUES[LATE_ENDGAME][p] = -VPAWN*1.15
AI.PIECE_VALUES[LATE_ENDGAME][n] = -VPAWN*3.43 | 0
AI.PIECE_VALUES[LATE_ENDGAME][b] = -VPAWN*3.62 | 0
AI.PIECE_VALUES[LATE_ENDGAME][r] = -VPAWN*6.24 | 0
AI.PIECE_VALUES[LATE_ENDGAME][q] = -VPAWN*11.41 | 0
AI.PIECE_VALUES[LATE_ENDGAME][k] = 0

AI.PIECE_VALUES[LATE_ENDGAME][P] = VPAWN*1.15
AI.PIECE_VALUES[LATE_ENDGAME][N] = VPAWN*3.43 | 0
AI.PIECE_VALUES[LATE_ENDGAME][B] = VPAWN*3.62 | 0
AI.PIECE_VALUES[LATE_ENDGAME][R] = VPAWN*6.24 | 0
AI.PIECE_VALUES[LATE_ENDGAME][Q] = VPAWN*11.41 | 0
AI.PIECE_VALUES[LATE_ENDGAME][K] = 0

AI.BISHOP_PAIR = [30, 30, 50, 50]

// CONSTANTES
const MATE = 10000 / AI.nullWindowFactor | 0
const DRAW = 0 //-2*VPAWN
const INFINITY = 11000 / AI.nullWindowFactor | 0

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

AI.DEFENDED_VALUES = [0, 5, 10, 15, 20, 25, 30, 10,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40]

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
let mvvlvaScores = [
    /* P      N      B      R      Q      K
/*P*/[6002, 20225, 20250, 20400, 20800, 26900],
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
AI.createTables = function (tt, ev, hh, pp) {
    console.log('Creating tables', tt, hh, pp)

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

// FUNCIÓN DE EVALUACIÓN DE LA POSICIÓN
AI.evaluate = function (board, ply, alpha, beta, pvNode, incheck) {
    // let t0 = Date.now()

    let evalEntry = AI.evalTable[board.hashkey % this.htlength]
    this.evalnodes++
    let turn = board.turn
    let sign = turn === WHITE? 1 : -1
    
    if (evalEntry && evalEntry.hashkey === board.hashkey) {
            this.evalhashnodes++
            return sign*evalEntry.score
    }

    alpha = alpha*this.nullWindowFactor
    beta = alpha + VPAWN
    
    // let incheck = board.isKingInCheck()
    
    let score = AI.random? Math.random()*AI.random - AI.random/2 | 0 : 0

    let safety = 0
    let mobility = 0
    let doubled = 0
    
    let pawns = new Array(120)
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

    let mgFactor = (AI.totalmaterial - 600) / 7360
    let egFactor = (7960 - AI.totalmaterial) / 7360

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

    for (let i = 0; i < 120; i++) {
        if (i & 0x88) {
            i+=7
            continue
        }

        let piece = board.board[i]
        
        if (!piece) {
            continue
        }

        if (piece === P) {
            pawnindexW.push(i)
        } else if (piece === p) {
            pawnindexB.push(i)
        }
        
        if (pvNode){
            // if (board.color(piece) === WHITE) {
            //     if (piece !== P) score -= board.isSquareAttacked(i, BLACK, false)*10
            // } else {
            //     if (piece !== p) score += board.isSquareAttacked(i, WHITE, false)*10
            // }

            if (piece === P) {
                //Attacking pieces
                // if (board.board[i-15] === q || board.board[i-17] === q) score += 100
                // if (board.board[i-15] === r || board.board[i-17] === r) score += 65
                // if (board.board[i-15] === b || board.board[i-17] === b) score += 45
                // if (board.board[i-15] === n || board.board[i-17] === n) score += 45

                //Defended
                if (board.board[i+15] === P || board.board[i+17] === P) {
                    score += AI.DEFENDEDPAWNBONUS[i]
                }

                //Aligned
                if (board.board[i+1] === P || board.board[i-1] === P) {
                    score = AI.ALIGNEDPAWNBONUS[i]
                }

                //Neighbour
                if (board.board[i+2] === P || board.board[i-2] === P) {
                    score += AI.NEIGHBOURPAWNBONUS[i]
                }

                //Levers
                if (board.board[i-15] === p || board.board[i-17] === p) {
                    score += AI.LEVERPAWNBONUS[i]
                }

                //Knight mobility blocker
                if (board.board[i-50] === n || board.board[i-46] === n) {
                    score += 40
                }

                // if (AI.phase <= MIDGAME) {
                //     //Center control
                //     if (i === 68 && board.board[51] === 0) score+=10
                //     if (i === 67 && board.board[52] === 0) score+=10

                //     //Outer central lever
                //     if (i === 66 && (board.board[51] === p || board.board[51] === 0)) {
                //         score+=20

                //         if (board.board[81] === P || board.board[83] === P) score += 15
                //     } 
                //     if (i === 69 && (board.board[52] === p || board.board[52] === 0)) {
                //         score+=20 

                //         if (board.board[84] === P || board.board[86] === P) score += 15
                //     }
                // }

                if (board.colorOfSquare(i)) {
                    lightSquaresWhitePawns++

                    if (board.board[i-16] === p) {
                        blockedLightSquaresWhitePawns++
                        score += AI.BLOCKEDPAWNBONUS[i]
                    }
                } else {
                    darkSquaresWhitePawns++
                    if (board.board[i-16] === p) {
                        blockedDarkSquaresWhitePawns++
                        score += AI.BLOCKEDPAWNBONUS[i]
                    }
                }
            } else if (piece === p) {
                //Attacking pieces
                // if (board.board[i+15] === Q || board.board[i+17] === Q) score -= 100
                // if (board.board[i+15] === R || board.board[i+17] === R) score -= 65
                // if (board.board[i+15] === B || board.board[i+17] === B) score -= 45
                // if (board.board[i+15] === N || board.board[i+17] === N) score -= 45

                //Defended
                if (board.board[i-15] === p || board.board[i-17] === p) {
                    score -= AI.DEFENDEDPAWNBONUS[112^i]
                }

                //Aligned
                if (board.board[i+1] === p || board.board[i-1] === p) {
                    score -= AI.ALIGNEDPAWNBONUS[112^i]
                }

                //Neighbour
                if (board.board[i+2] === P || board.board[i-2] === P) {
                    score -= AI.NEIGHBOURPAWNBONUS[112^i]
                }

                //Levers
                if (board.board[i+15] === P || board.board[i+17] === P) {
                    score -= AI.LEVERPAWNBONUS[112^i]
                }

                //Knight mobility blocker
                if (board.board[i+50] === N || board.board[i+46] === N) {
                    score -= 40
                }

                // if (AI.phase <= MIDGAME) {
                //     //Center control
                //     if (i === 51 && board.board[68] === 0) score-=10
                //     if (i === 52 && board.board[67] === 0) score-=10

                //     //Outer central lever
                //     if (i === 50 && (board.board[67] === P || board.board[67] === 0)) {
                //         score-=20
                //         if (board.board[33] === p || board.board[35] === p) score -= 15
                //     } 
                //     if (i === 53 && (board.board[68] === P || board.board[68] === 0)) {
                //         score-=20
                //         if (board.board[36] === p || board.board[38] === p) score -= 15
                //     } 
                // }

                if (board.colorOfSquare(i)) {
                    lightSquaresBlackPawns++
                    if (board.board[i+16] === P) {
                        blockedLightSquaresBlackPawns++
                        score -= AI.BLOCKEDPAWNBONUS[112^i]
                    }
                } else {
                    darkSquaresBlackPawns++
                    if (board.board[i+16] === P) {
                        blockedDarkSquaresBlackPawns++
                        score -= AI.BLOCKEDPAWNBONUS[112^i]
                    }
                }
            } else if (piece === B) {
                bishopsW++

                bishopsindexW.push(i)

                if (AI.phase === OPENING && (i === 83 || i === 84) && board.board[i+16] === P) score-=100

                // Bishop blocked by own pawns
                if (board.board[i-15] === P) score -= 20
                if (board.board[i-17] === P) score -= 20

                //Semi outpost
                if (AI.phase <= MIDGAME && board.ranksW[i] >= 3 && board.board[i-16] === P) score+=12
    
                //X-Rays
                if (board.diagonals1[i] === board.diagonals1[board.blackKingIndex]) {
                    score += 40
                } else if (board.diagonals2[i] === board.diagonals2[board.blackKingIndex]) {
                    score += 40
                }

                if (board.board[i + 15] === P || board.board[i + 17] === P) {
                    score += AI.OUTPOSTBONUSBISHOP[i]

                    if (board.board[i-16] === p) score += 10

                    if (board.ranksW[i] === 6) score += AI.phase <= MIDGAME? 30 : 15
                }

                if (board.colorOfSquare(i)) {
                    lightSquaresWhiteBishop++
                } else {
                    darkSquaresWhiteBishop++
                }
            } else if (piece === b) {
                bishopsB++

                bishopsindexB.push(i)

                if (AI.phase === OPENING && (i === 35 || i === 36) && board.board[i-16] === p) score+=100

                // Bishop blocked by own pawns
                if (board.board[i+15] === p) score += 20
                if (board.board[i+17] === p) score += 20

                //Semi outpost
                if (AI.phase <= MIDGAME && board.ranksB[i] >= 3 && board.board[i+16] === p) score-=12
    
                // X-Rays
                if (board.diagonals1[i] === board.diagonals1[board.whiteKingIndex]) {
                    score -= 40
                } else if (board.diagonals2[i] === board.diagonals2[board.whiteKingIndex]) {
                    score -= 40
                }

                if (board.board[i - 15] === p || board.board[i - 17] === p) {
                    score -= AI.OUTPOSTBONUSBISHOP[112^i]

                    if (board.board[i+16] === P) score -= 10

                    if (board.ranksB[i] === 6) score -= AI.phase <= MIDGAME? 30 : 15
                }

                if (board.colorOfSquare(i)) {
                    lightSquaresBlackBishop++
                } else {
                    darkSquaresBlackBishop++
                }
            } else if (piece === N) {
                // Semi outpost
                if (AI.phase <= MIDGAME && board.ranksW[i] >= 3 && board.board[i-16] === P) score+=15
                
                knightsW++

                if (board.board[i + 15] === P || board.board[i + 17] === P) {
                    score += AI.OUTPOSTBONUSKNIGHT[i]

                    if (board.board[i-16] === p) score += 10

                    if (board.ranksW[i] === 6) score += AI.phase <= MIDGAME? 30 : 15
                }
                
            } else if (piece === n) {
                // Semi outpost
                if (AI.phase <= MIDGAME && board.ranksB[i] >= 3 && board.board[i+16] === p) score-=15
                knightsB++

                if (board.board[i - 15] === p || board.board[i - 17] === p) {
                    score -= AI.OUTPOSTBONUSKNIGHT[112^i]

                    if (board.board[i+16] === P) score -= 10

                    if (board.ranksB[i] === 6) score -= AI.phase <= MIDGAME? 30 : 15
                }
            } else if (piece === R) {
                rooksW++
    
                rookscolumnsW.push(board.columns[i])
    
                // X-Rays
                if (AI.phase <= MIDGAME) {
                    if (board.columns[i] === board.columns[board.blackKingIndex]) score += 40
                    if (board.ranksW[i] === board.ranksW[board.blackKingIndex]) score += 80
                }

                if (board.ranksW[i] === 5) {
                    if (board.board[i + 15] === P || board.board[i + 17] === P) score += 10
                } 
            } else if (piece === r) {
                rooksB++
    
                rookscolumnsB.push(board.columns[i])
    
                // X-Rays
                if (AI.phase <= MIDGAME) {
                    if (board.columns[i] === board.columns[board.whiteKingIndex]) score -= 40
                    if (board.ranksB[i] === board.ranksB[board.whiteKingIndex]) score -= 80
                }

                if (board.ranksB[i] === 5) {
                    if (board.board[i - 15] === p || board.board[i - 17] === p) score -= 10
                }
            } else if (piece === Q) {
                queensW++
    
                if (board.diagonals1[i] === board.diagonals1[board.blackKingIndex]) {
                    score += 40
                } else if (board.diagonals2[i] === board.diagonals2[board.blackKingIndex]) {
                    score += 40
                }

                if (board.columns[i] === board.columns[board.blackKingIndex]) {
                    score += 40
                } else if (board.ranksW[i] === board.ranksW[board.blackKingIndex]) {
                    score += 40
                }
            } else if (piece === q) {
                queensB++
                if (board.diagonals1[i] === board.diagonals1[board.whiteKingIndex]) {
                    score -= 40
                } else if (board.diagonals2[i] === board.diagonals2[board.whiteKingIndex]) {
                    score -= 40
                }

                if (board.columns[i] === board.columns[board.whiteKingIndex]) {
                    score -= 40
                } else if (board.ranksB[i] === board.ranksB[board.whiteKingIndex]) {
                    score -= 40
                }
            } else if (piece === K) {
                if (board.whiteKingIndex === 118 && board.board[119] === R) score -= VPAWN
            } else if (piece === k) {
                if (board.blackKingIndex === 6 && board.board[7] === r) score += VPAWN
            }
        }

        let turn = board.color(piece)
        let sign = turn === WHITE? 1 : -1

        material += (mgFactor * AI.PIECE_VALUES[OPENING][piece] + egFactor * AI.PIECE_VALUES[LATE_ENDGAME][piece]) | 0 //Material

        tempTotalMaterial += AI.PIECE_VALUES[OPENING][ABS[piece]] //Material

        let index = turn === WHITE? i : (112^i)
        let piecetype = ABS[piece]
        
        let mgPSQT = AI.PSQT_OPENING[piecetype][index] * mgFactor
        let egPSQT = AI.PSQT_LATE_ENDGAME[piecetype][index] * egFactor
        
        psqt += sign*(mgPSQT + egPSQT)
    }
    
    AI.totalmaterial = tempTotalMaterial
    
    // Material + PSQT
    score += material + psqt

    // Pawn structure
    score += AI.getStructure(board, pawnindexW, pawnindexB)

    // Pawn shield
    score += AI.getPawnShield(board, AI.phase)

    if (AI.phase === LATE_ENDGAME && alpha > MARGIN3) {
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
        
        let nullWindowScore = score / AI.nullWindowFactor | 0
        
        AI.evalTable[board.hashkey % this.htlength] = {
            hashkey: board.hashkey,
            score: nullWindowScore
        }

        return sign*nullWindowScore
    }

    // Bishop pair
    score += AI.BISHOP_PAIR[AI.phase]*(bishopsW - bishopsB)

    // Pawns on same squares of bishops //8 for MG, 15 for EG
    let bpmalus = AI.phase <= MIDGAME? 8 : 15
    let badpawns = (bpmalus*lightSquaresWhiteBishop*lightSquaresWhitePawns + bpmalus*darkSquaresWhiteBishop*darkSquaresWhitePawns)
        badpawns+= (10*lightSquaresWhiteBishop*blockedLightSquaresWhitePawns + 10*darkSquaresWhiteBishop*blockedDarkSquaresWhitePawns)
        badpawns-= (bpmalus*lightSquaresBlackBishop*lightSquaresBlackPawns + bpmalus*darkSquaresBlackBishop*darkSquaresBlackPawns)
        badpawns-= (10*lightSquaresBlackBishop*blockedLightSquaresBlackPawns + 10*darkSquaresBlackBishop*blockedDarkSquaresBlackPawns)

    score -= badpawns


    if (pvNode) {
        if (AI.isLazyFutile(sign, score, alpha, beta)) {
            
            let nullWindowScore = score / AI.nullWindowFactor | 0
            
            AI.evalTable[board.hashkey % this.htlength] = {
                hashkey: board.hashkey,
                score: q
            }
            return sign*nullWindowScore
        }

        // Mobility
        score += AI.getMobility(board)
    
        if (AI.isLazyFutile(sign, score, alpha, beta)) {
            
            let nullWindowScore = score / AI.nullWindowFactor | 0
            
            AI.evalTable[board.hashkey % this.htlength] = {
                hashkey: board.hashkey,
                score: nullWindowScore
            }
            return sign*nullWindowScore
        }
    
        // Is king under attack
    
        if (AI.phase >= MIDGAME) {
            score -= 20*board.isSquareAttacked(board.whiteKingIndex-15, BLACK, false)
            score -= 20*board.isSquareAttacked(board.whiteKingIndex-16, BLACK, false)
            score -= 20*board.isSquareAttacked(board.whiteKingIndex-17, BLACK, false)
            
            score += 20*board.isSquareAttacked(board.blackKingIndex+15, WHITE, false)
            score += 20*board.isSquareAttacked(board.blackKingIndex+16, WHITE, false)
            score += 20*board.isSquareAttacked(board.blackKingIndex+17, WHITE, false)
        
            if (AI.isLazyFutile(sign, score, alpha, beta)) {
                
                let nullWindowScore = score / AI.nullWindowFactor | 0
                
                AI.evalTable[board.hashkey % this.htlength] = {
                    hashkey: board.hashkey,
                    score: nullWindowScore
                }
                return sign*nullWindowScore
            }
        }
    
        // Expensive center control
        if (AI.phase <= MIDGAME) {
            for (let i = 0, len=WIDECENTER.length; i < len; i++) {
                
                score += 20 * board.isSquareAttacked(WIDECENTER[i], WHITE, false)
                score -= 20 * board.isSquareAttacked(WIDECENTER[i], BLACK, false)
    
                let piece = board.board[WIDECENTER[i]]
                
                if (!piece) continue
                
                let occupiedBy = board.pieces[piece].color
                
                if (occupiedBy === WHITE) {
                    score += i < 64? 20 : 10
                } else {
                    score -= i > 64? -20 : -10
                }
            }
        }
    
        if (AI.isLazyFutile(sign, score, alpha, beta)) {
            
            let nullWindowScore = score / AI.nullWindowFactor | 0
            
            AI.evalTable[board.hashkey % this.htlength] = {
                hashkey: board.hashkey,
                score: nullWindowScore
            }
            return sign*nullWindowScore
        }
    
        if (AI.phase >= EARLY_ENDGAME) {
            if (score > MARGIN2) {
                if (queensW >= queensB) score += 40
                if (rooksW >= rooksB) score += 40
                
            }
                
            if (score < -MARGIN2) {
                if (queensB >= queensW) score -= 40
                if (rooksB >= rooksW) score -= 40
            }
        }
    
        // Knights with blocked pawns
        let blockedWhitePawns = blockedLightSquaresWhitePawns + blockedDarkSquaresWhitePawns
        let blockedBlackPawns = blockedLightSquaresBlackPawns + blockedDarkSquaresBlackPawns
    
        score += 8*blockedWhitePawns*knightsW
        score -= 8*blockedBlackPawns*knightsB
    
        //Pawn span (distance between first and last pawn)
        let spanbonus = AI.phase <= MIDGAME? 5 : 10
    
        if (pawnindexW.length > 1) {
            score += spanbonus*(board.columns[pawnindexW[pawnindexW.length - 1]] - board.columns[pawnindexW[0]])
        }
    
        if (pawnindexB.length > 1) {
            score -= spanbonus*(board.columns[pawnindexB[pawnindexB.length - 1]] - board.columns[pawnindexB[0]])
        }
    
        // Raking bishops
        if (bishopsW === 2) {
            if (Math.abs(bishopsindexW[0] - bishopsindexW[1]) === 1) score += 10
            if (Math.abs(bishopsindexW[0] - bishopsindexW[1]) === 16) score += 10
        }
    
        if (bishopsB === 2) {
            if (Math.abs(bishopsindexB[0] - bishopsindexB[1]) === 1) score -= 10
            if (Math.abs(bishopsindexB[0] - bishopsindexB[1]) === 16) score -= 10
        }
    
        //Rook battery
        // if (AI.phase <= MIDGAME) {
        //     if (rookscolumnsW.length === 2) {
        //         if (rookscolumnsW[0] === rookscolumnsW[1]) score += 10
        //     }
    
        //     if (rookscolumnsB.length === 2) {
        //         if (rookscolumnsB[0] === rookscolumnsB[1]) score -= 10
        //     }
        // }
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
    let bonus = phase <= MIDGAME? 30 : 15

    if (phase <= MIDGAME && board.columns[board.whiteKingIndex] === 3 || board.columns[board.whiteKingIndex] === 4) score -= 10
    
    if (board.whiteKingIndex !== 116) {
        score += board.board[board.whiteKingIndex-15] === P? bonus : 0
        score += board.board[board.whiteKingIndex-16] === P? bonus : 0
        score += board.board[board.whiteKingIndex-16] === B && phase <= MIDGAME? 15 : 0
        score += board.board[board.whiteKingIndex-17] === P? bonus : 0
        // score += board.board[board.whiteKingIndex-31] === P? bonus : 0
        // score += board.board[board.whiteKingIndex-32] === P? bonus : 0
        // score += board.board[board.whiteKingIndex-33] === P? bonus : 0
        // score += board.board[board.whiteKingIndex-1] === P? bonus : 0
        // score += board.board[board.whiteKingIndex+1] === P? bonus : 0
        if (board.board[board.whiteKingIndex-16] === 0) {
            score -= 20
            
            // score += board.board[board.whiteKingIndex-32] === 0?-20 : 0
        }
        
        //TODO: Penalty for doubled pawns in king shelter (mg: 15, eg: 8)
    }
    
    if (phase <= MIDGAME && board.columns[board.blackKingIndex] === 3 || board.columns[board.blackKingIndex] === 4) score += 10
    
    if (board.blackKingIndex !== 4) {
        score += board.board[board.blackKingIndex+15] === p? -bonus : 0
        score += board.board[board.blackKingIndex+16] === p? -bonus : 0
        score += board.board[board.whiteKingIndex+16] === b && phase <= MIDGAME? -15 : 0
        score += board.board[board.blackKingIndex+17] === p? -bonus : 0
        // score += board.board[board.blackKingIndex+31] === p? -bonus : 0
        // score += board.board[board.blackKingIndex+32] === p? -bonus : 0
        // score += board.board[board.blackKingIndex+33] === p? -bonus : 0
        // score += board.board[board.blackKingIndex-1] === p? -bonus : 0
        // score += board.board[board.blackKingIndex+1] === p? -bonus : 0
        if (board.board[board.whiteKingIndex+16] === 0) {
            score += 20
            
            // score += board.board[board.whiteKingIndex+32] === 0? 20 : 0
        }

        //TODO: Penalty for doubled pawns in king shelter (mg: 15, eg: 8)
    }

    return score
} 

AI.isLazyFutile = (sign, score, alpha, beta)=> {
    // return false
    let signedScore = sign * score

    if (signedScore >= beta + VPAWN) {
        return true
    }

    if (signedScore < alpha - VPAWN) {
        return true
    }
}

AI.getMobility = (board)=>{
    let score = 0
    let whiteMoves = []
    let blackMoves = []

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

    for (let i = 0, len = whiteMoves.length; i < len; i++) {
        let move = whiteMoves[i]

        // Safe Mobility +12 ELO
        if (board.board[move.to - 17] === p || board.board[move.to - 15] === p) continue

        if (move.piece === N) {
            score += AI.NMOBILITY[move.to]
        }

        if (move.piece === B) {
            score += AI.BMOBILITY[move.to]
        }

        if (move.piece === R) {
            score += AI.RMOBILITY[move.to]
        }

        if (move.piece === Q) {
            score += AI.QMOBILITY[move.to]
        }
    }

    for (let i = 0, len = blackMoves.length; i < len; i++) {
        let move = blackMoves[i]

        // Safe Mobility +12 ELO
        if (board.board[move.to + 17] === P || board.board[move.to + 15] === P) continue

        if (move.piece === n) {
            score -= AI.NMOBILITY[112^move.to]
        }

        if (move.piece === b) {
            score -= AI.BMOBILITY[112^move.to]
        }

        if (move.piece === r) {
            score -= AI.RMOBILITY[112^move.to]
        }

        if (move.piece === q) {
            score -= AI.QMOBILITY[112^move.to]
        }
    }

    // console.log(score)

    return score
}

let max = 0
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

    if (hashentry !== null) {
        AI.phnodes++
        return hashentry
    }

    let doubled = AI.getDoubled(board, pawnindexW, pawnindexB) // -32 ELO (why?)
    let defended = AI.getDefended(board, pawnindexW, pawnindexB)
    let passers = AI.getPassers(board, pawnindexW, pawnindexB)
    let space = AI.getSpace(board, pawnindexW, pawnindexB)

    let score = doubled + defended + passers + space

    AI.pawnTable[hashkey % AI.pawntlength] = score
    return score
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

    // let space = 4*(spaceW - spaceB)
    let space = 10*(spaceW - spaceB)

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
            score += AI.PASSERSBONUS[pawnindexW[i]]

            //blocked passer
            let blockerindex = pawnindexW[i] - 16
            if (board.board[blockerindex] === n || board.board[blockerindex] === b) score-=20

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
            score -= AI.PASSERSBONUS[112^pawnindexB[i]]
            
            //blocked passer
            let blockerindex = pawnindexW[i] + 16
            if (board.board[blockerindex] === N || board.board[blockerindex] === B) score+=20
            
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

    return AI.DEFENDED_VALUES[defendedW | 0] - AI.DEFENDED_VALUES[defendedB | 0]
}

// ORDENA LOS MOVIMIENTOS
// Esta función es fundamental para que la poda Alfa-Beta funcione de manera óptima
// El orden establecido permite que la primera jugada
// sea FAIL-HIGH en más de un 90% de los casos.
AI.sortMoves = function (moves, turn, ply, board, ttEntry) {

    // let t0 = (new Date).getTime()
    let killer1, killer2

    if (AI.killers) {
        killer1 = AI.killers[turn][ply][0]
        killer2 = AI.killers[turn][ply][1]
    }

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

            continue
        }

        // CRITERIO: La jugada es un movimiento Killer
        // (Los killers son movimientos que anteriormente han generado Fail-Highs en el mismo ply)
        if (killer1 && killer1.key === move.key) {
            move.killer1 = true
            move.score += 6e6
            continue
        }

        // CRITERIO: La jugada es el segundo movimiento Killer
        if (killer2 && killer2.key === move.key) {
            move.killer2 = true
            move.score += 5e6
            continue
        }
        
        // CRITERIO: La jugada es una promoción
        if (move.promotingPiece) {
            move.score += 3e6
            continue
        }

        // CRITERIO: Enroque
        if (AI.phase <= MIDGAME && move.castleSide) {
            move.score += 2e6
            continue
        }
        

        // CRITERIO 6: Movimientos históricos
        // Se da preferencia a movimientos posicionales que han tenido 
        // éxito en otras posiciones.
        let hvalue = AI.history[move.piece][move.to]

        if (hvalue > 0) {
            move.score += 1000 + hvalue
            continue
        } else {
            move.score += Math.random()*1000 | 0

            continue
        }
    }

    // ORDENA LOS MOVIMIENTOS
    // El tiempo de esta función toma hasta un 10% del total de cada búsqueda.
    // Sería conveniente utilizar un mejor método de ordenamiento.
    moves.sort((a, b) => {
        return b.score - a.score
    })

    // moves = sort(moves).by([
    //     { desc: u => u.score }
    //   ]);

    // let t1 = (new Date()).getTime()

    // AI.sortingTime += (t1 - t0)

    return moves
}

// BÚSQUEDA ¿EN CALMA?
// Para evitar el Efecto-Horizonte, la búqueda continua de manera forzosa hasta
// que se encuentra una posición "en calma" (donde ningún rey está en jaque ni
// donde la última jugada haya sido una captura). Cuando se logra esta posición
// "en calma", se evalúa la posición.
AI.quiescenceSearch = function (board, alpha, beta, depth, ply, pvNode) {

    AI.qsnodes++

    let turn = board.turn
    let opponentTurn = turn === WHITE? BLACK : WHITE
    let legal = 0
    let incheck = board.isKingInCheck()
    let standpat = AI.evaluate(board, ply, alpha, beta, pvNode, incheck)
    let hashkey = board.hashkey

    if (standpat >= beta) {
        return standpat
    }

    if (standpat > alpha) alpha = standpat

    let moves = board.getMoves(false, !incheck)

    if (moves.length === 0) {
        return alpha
    }
    
    let ttEntry = AI.ttGet(turn, hashkey)
    let score = -INFINITY
    
    moves = AI.sortMoves(moves, turn, ply, board, ttEntry)

    let bestmove = moves[0]

    for (let i = 0, len = moves.length; i < len; i++) {
        let move = moves[i]

        // Bad captures pruning (+34 ELO)
        if (move.mvvlva < 6000) {
            if (board.isSquareAttacked(move.to, opponentTurn, false, false)) {
                continue
            }
        }
        
        // delta pruning para cada movimiento
        if (!incheck && standpat + AI.PIECE_VALUES[OPENING][ABS[move.capturedPiece]] < alpha) {
            continue
        }

        // let m0 = (new Date()).getTime()
        if (board.makeMove(move)) {
            // AI.moveTime += (new Date()).getTime() - m0
            legal++

            score = -AI.quiescenceSearch(board, -beta, -alpha, depth - 1, ply + 1, pvNode)

            board.unmakeMove(move)

            if (score >= beta) {
                AI.ttSave(turn, hashkey, score, LOWERBOUND, 0, move)
                return score
            }
            
            if (score > alpha) {
                alpha = score
                bestmove = move
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
}

AI.ttGet = function (turn, hashkey) {
    let ttEntry = AI.hashTable[turn][hashkey % AI.htlength]
    
    if (ttEntry) {
        if (ttEntry.hashkey === hashkey) {
            AI.ttnodes++
            return ttEntry
        } else {
            // console.log('collision')
            return null
        }
    } else {
        return null
    }

}

// let max = 0

AI.saveHistory = function (turn, move, value) {
    // AI.history[move.piece][move.to] += value | 0
    AI.history[move.piece][move.to] += 32 * value - AI.history[move.piece][move.to]*Math.abs(value)/512 | 0

    //HistoryTableEntry += 32 * bonus - HistoryTableEntry * abs(bonus) / 512;
}

// PRINCIPAL VARIATION SEARCH
// El método PVS es Negamax + Ventana-Nula
AI.PVS = function (board, alpha, beta, depth, ply, allowNullMove) {

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

    let oAlpha = alpha
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
    let hashkey = board.hashkey

    let incheck = board.isKingInCheck()

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
            return ttEntry.score
        }
    }

    //Búsqueda QS
    if (!incheck && depth <= 0) {
        return AI.quiescenceSearch(board, alpha, beta, depth, ply, pvNode)
    }

    if (AI.stop && AI.iteration > AI.mindepth[AI.phase]) return alpha

    let mateE = 0 // Mate threat extension

    let staticeval = AI.evaluate(board, ply, alpha, beta, pvNode, incheck)

    //Futility
    if (!pvNode && depth < 9 && staticeval - MARGIN1*depth >= beta && eval < MARGIN10) {
        return staticeval
    }

    // Null move pruning
    if (allowNullMove && !incheck /*&& depth > 2*/  /*&& AI.phase < LATE_ENDGAME*/) {
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

    // Razoring
    if (cutNode && depth <= 3) {
        if (staticeval + MARGIN3 < beta) { // likely a fail-low node ?
            let score = AI.quiescenceSearch(board, alpha, beta, 0, ply, pvNode)
            if (score < beta) return score
        }
    }

    // IID
    if (!ttEntry && depth > 2) depth-=2

    let moves = board.getMoves()

    moves = AI.sortMoves(moves, turn, ply, board, ttEntry)

    let bestmove = moves[0]
    let legal = 0
    let bestscore = -INFINITY
    let score

    for (let i = 0, len = moves.length; i < len; i++) {
        let move = moves[i]
        let piece = move.piece

        // Enhanced Transposition Cutoff actual position +12 ELO
        if (!ttEntry) {
            // total++
            
            let ttETC = AI.ttGet(turn, hashkey)
            
            if (ttETC && ttETC.hashkey === hashkey && ttETC.depth >= depth) {
                // max++
                if (ttETC.flag === LOWERBOUND) {
                    if (ttETC.score > alpha) alpha = ttETC.score
                } else if (ttETC.flag === UPPERBOUND) {
                    if (ttETC.score < beta) beta = ttETC.score
                } else { // EXACT
                    return ttETC.score
                }
            }
        }

        if (!move.killer1 && !incheck && legal >= 1) {
            // Futility Pruning
            if (depth <= 3) {
                if (move.isCapture) {
                    if (staticeval + AI.PIECE_VALUES[OPENING][ABS[move.capturedPiece]] + MARGIN1*depth < alpha) {
                        continue
                    }
                } else {
                    if (staticeval + MARGIN1*depth < alpha) {
                        continue
                    }
                }
            }

            if (ply > 1 && i > 12 && !move.isCapture) {
                if (Math.random() < 0.8) {
                    AI.rnodes++
                    continue
                }
            }
        }

        // Extensiones
        let E = mateE && depth <= 2? 1 : 0

        // if (AI.phase === LATE_ENDGAME && (piece === P || piece === p)) E++

        //Reducciones
        let R = 0

        if (depth >  1 && legal > 1 && !mateE && !incheck) {
            R += AI.LMR_TABLE[depth][legal]

            if (pvNode && i < 6) {
                R--
            }

            if (cutNode && !move.killer1) R+= 2

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

            if (R < 0) R = 0
        }

        // let m0 = (new Date()).getTime()
        if (board.makeMove(move)) {
            // AI.moveTime += (new Date()).getTime() - m0
            legal++

            // Enhanced Transposiiton Table +16 ELO
            let ttETC = AI.ttGet(board.turn, board.hashkey)

            if (legal > 1 && ttETC && ttETC.hashkey === board.hashkey && ttETC.depth > depth) {
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
                // if (AI.stop) return oAlpha
                score = -AI.PVS(board, -beta, -alpha, depth + E - 1, ply + 1, allowNullMove)
            } else {
                if (AI.stop) {
                    board.unmakeMove(move)
                    return oAlpha
                }
                score = -AI.PVS(board, -alpha-1, -alpha, depth + E - R - 1, ply + 1, allowNullMove)

                if (!AI.stop && score > alpha) {
                    score = -AI.PVS(board, -beta, -alpha, depth + E - 1, ply + 1, allowNullMove)
                }
            }

            board.unmakeMove(move)

            if (AI.stop) return oAlpha //tested ok
            
            if (score > alpha) {
                // Fail-high
                if (score >= beta) {
                    if (legal === 1) {
                        AI.fhf++
                    }
    
                    AI.fh++

                    //LOWERBOUND
                    AI.ttSave(turn, hashkey, score, LOWERBOUND, depth, move)
    
                    if (!move.isCapture) {
                        if (
                            AI.killers[turn | 0][ply][0] &&
                            AI.killers[turn | 0][ply][0].key != move.key
                        ) {
                            AI.killers[turn | 0][ply][1] = AI.killers[turn | 0][ply][0]
                        }
    
                        AI.killers[turn | 0][ply][0] = move
    
                        AI.saveHistory(turn, move, depth*depth)
                    }
    
                    return score
                }

                // score > alpha continuation
                bestscore = score
                bestmove = move
                alpha = score

                if (!move.isCapture) { AI.saveHistory(turn, move, depth) }

            } else {
                if (!move.isCapture) { AI.saveHistory(turn, move, -depth) }
            }
        }
    }

    if (legal === 0) {
        // Ahogado
        if (!incheck) {
            AI.ttSave(turn, hashkey, DRAW, EXACT, depth, bestmove)
            // AI.ttSave(turn, hashkey, DRAW, LOWERBOUND, depth, bestmove)
            
            return DRAW
        }
        
        // Mate
        AI.ttSave(turn, hashkey, -MATE + ply, EXACT, depth, bestmove)
        // AI.ttSave(turn, hashkey, -MATE + ply, LOWERBOUND, depth, bestmove)

        return -MATE + ply

    } else {

        if (bestscore > oAlpha) {
            // Mejor movimiento
            if (bestmove) {
                AI.ttSave(turn, hashkey, bestscore, EXACT, depth, bestmove)
                // AI.ttSave(turn, hashkey, bestscore, LOWERBOUND, depth, bestmove)
            }

            return bestscore
        } else {
            //Upperbound
            AI.ttSave(turn, hashkey, oAlpha, UPPERBOUND, depth, bestmove)

            return oAlpha
        }

    }
}

// PIECE SQUARE TABLES basadas en PESTO
AI.createPSQT = function (board) {

    AI.PSQT_OPENING = []

    AI.PSQT_OPENING[PAWN] = [
         0,   0,   0,   0,   0,   0,  0,   0,    null,null,null,null,null,null,null,null,
        98, 134,  61,  95,  68, 126, 34, -11,    null,null,null,null,null,null,null,null,
        -6,   7,  26,  31,  65,  56, 25, -20,    null,null,null,null,null,null,null,null,
       -14,  13,   6,  21,  23,  12, 17, -23,    null,null,null,null,null,null,null,null,
       -27,  -2,  -5,  12,  17,   6, 10, -25,    null,null,null,null,null,null,null,null,
       -26,  -4,  -4, -10,   3,   3, 33, -12,    null,null,null,null,null,null,null,null,
       -35,  -1, -20, -23, -15,  24, 38, -22,    null,null,null,null,null,null,null,null,
         0,   0,   0,   0,   0,   0,  0,   0,    null,null,null,null,null,null,null,null,
    ]

    AI.PSQT_OPENING[KNIGHT] = [
       -167, -89, -34, -49,  61, -97, -15, -107,    null,null,null,null,null,null,null,null,
        -73, -41,  72,  36,  23,  62,   7,  -17,    null,null,null,null,null,null,null,null,
        -47,  60,  37,  65,  84, 129,  73,   44,    null,null,null,null,null,null,null,null,
         -9,  17,  19,  53,  37,  69,  18,   22,    null,null,null,null,null,null,null,null,
        -13,   4,  16,  13,  28,  19,  21,   -8,    null,null,null,null,null,null,null,null,
        -23,  -9,  12,  10,  19,  17,  25,  -16,    null,null,null,null,null,null,null,null,
        -29, -53, -12,  -3,  -1,  18, -14,  -19,    null,null,null,null,null,null,null,null,
       -105, -21, -58, -33, -17, -28, -19,  -23,    null,null,null,null,null,null,null,null,

    ]

    AI.PSQT_OPENING[BISHOP] = [
        -29,   4, -82, -37, -25, -42,   7,  -8,    null,null,null,null,null,null,null,null,
        -26,  16, -18, -13,  30,  59,  18, -47,    null,null,null,null,null,null,null,null,
        -16,  37,  43,  40,  35,  50,  37,  -2,    null,null,null,null,null,null,null,null,
         -4,   5,  19,  50,  37,  37,   7,  -2,    null,null,null,null,null,null,null,null,
         -6,  13,  13,  26,  34,  12,  10,   4,    null,null,null,null,null,null,null,null,
          0,  15,  15,  15,  14,  27,  18,  10,    null,null,null,null,null,null,null,null,
          4,  15,  16,   0,   7,  21,  33,   1,    null,null,null,null,null,null,null,null,
        -33,  -3, -14, -21, -13, -12, -39, -21,    null,null,null,null,null,null,null,null,
    ]

    AI.PSQT_OPENING[ROOK] = [
         32,  42,  32,  51, 63,  9,  31,  43,    null,null,null,null,null,null,null,null,
         27,  32,  58,  62, 80, 67,  26,  44,    null,null,null,null,null,null,null,null,
         -5,  19,  26,  36, 17, 45,  61,  16,    null,null,null,null,null,null,null,null,
        -24, -11,   7,  26, 24, 35,  -8, -20,    null,null,null,null,null,null,null,null,
        -36, -26, -12,  -1,  9, -7,   6, -23,    null,null,null,null,null,null,null,null,
        -45, -25, -16, -17,  3,  0,  -5, -33,    null,null,null,null,null,null,null,null,
        -44, -16, -20,  -9, -1, 11,  -6, -71,    null,null,null,null,null,null,null,null,
        -19, -13,   1,  17, 16,  7, -37, -26,    null,null,null,null,null,null,null,null,
    ]

    AI.PSQT_OPENING[QUEEN] = [
        -28,   0,  29,  12,  59,  44,  43,  45,    null,null,null,null,null,null,null,null,
        -24, -39,  -5,   1, -16,  57,  28,  54,    null,null,null,null,null,null,null,null,
        -13, -17,   7,   8,  29,  56,  47,  57,    null,null,null,null,null,null,null,null,
        -27, -27, -16, -16,  -1,  17,  -2,   1,    null,null,null,null,null,null,null,null,
         -9, -26,  -9, -10,  -2,  -4,   3,  -3,    null,null,null,null,null,null,null,null,
        -14,   2, -11,  -2,  -5,   2,  14,   5,    null,null,null,null,null,null,null,null,
        -35,  -8,  11,   2,   8,  15,  -3,   1,    null,null,null,null,null,null,null,null,
         -1, -18,  -9,  10, -15, -25, -31, -50,    null,null,null,null,null,null,null,null,
    ]

    AI.PSQT_OPENING[KING] = [
        -65,  23,  16, -15, -56, -34,   2,  13,    null,null,null,null,null,null,null,null,
         29,  -1, -20,  -7,  -8,  -4, -38, -29,    null,null,null,null,null,null,null,null,
         -9,  24,   2, -16, -20,   6,  22, -22,    null,null,null,null,null,null,null,null,
        -17, -20, -12, -27, -30, -25, -14, -36,    null,null,null,null,null,null,null,null,
        -49,  -1, -27, -39, -46, -44, -33, -51,    null,null,null,null,null,null,null,null,
        -14, -14, -22, -46, -44, -30, -15, -27,    null,null,null,null,null,null,null,null,
          1,   7,  -8, -64, -43, -16,   9,   8,    null,null,null,null,null,null,null,null,
        -15,  36,  12, -54,   8, -28,  24,  14,    null,null,null,null,null,null,null,null,
    ]


    AI.PSQT_MIDGAME = []

    AI.PSQT_MIDGAME[PAWN] = [
        0,   0,   0,   0,   0,   0,  0,   0,    null,null,null,null,null,null,null,null,
       98, 134,  61,  95,  68, 126, 34, -11,    null,null,null,null,null,null,null,null,
       -6,   7,  26,  31,  65,  56, 25, -20,    null,null,null,null,null,null,null,null,
      -14,  13,   6,  21,  23,  12, 17, -23,    null,null,null,null,null,null,null,null,
      -27,  -2,  -5,  12,  17,   6, 10, -25,    null,null,null,null,null,null,null,null,
      -26,  -4,  -4, -10,   3,   3, 33, -12,    null,null,null,null,null,null,null,null,
      -35,  -1, -20, -23, -15,  24, 38, -22,    null,null,null,null,null,null,null,null,
        0,   0,   0,   0,   0,   0,  0,   0,    null,null,null,null,null,null,null,null,
   ]

    AI.PSQT_MIDGAME[KNIGHT] = [
        -167, -89, -34, -49,  61, -97, -15, -107,    null,null,null,null,null,null,null,null,
        -73, -41,  72,  36,  23,  62,   7,  -17,    null,null,null,null,null,null,null,null,
        -47,  60,  37,  65,  84, 129,  73,   44,    null,null,null,null,null,null,null,null,
            -9,  17,  19,  53,  37,  69,  18,   22,    null,null,null,null,null,null,null,null,
        -13,   4,  16,  13,  28,  19,  21,   -8,    null,null,null,null,null,null,null,null,
        -23,  -9,  12,  10,  19,  17,  25,  -16,    null,null,null,null,null,null,null,null,
        -29, -53, -12,  -3,  -1,  18, -14,  -19,    null,null,null,null,null,null,null,null,
        -105, -21, -58, -33, -17, -28, -19,  -23,    null,null,null,null,null,null,null,null,

    ]

    AI.PSQT_MIDGAME[BISHOP] = [
        -29,   4, -82, -37, -25, -42,   7,  -8,    null,null,null,null,null,null,null,null,
        -26,  16, -18, -13,  30,  59,  18, -47,    null,null,null,null,null,null,null,null,
        -16,  37,  43,  40,  35,  50,  37,  -2,    null,null,null,null,null,null,null,null,
            -4,   5,  19,  50,  37,  37,   7,  -2,    null,null,null,null,null,null,null,null,
            -6,  13,  13,  26,  34,  12,  10,   4,    null,null,null,null,null,null,null,null,
            0,  15,  15,  15,  14,  27,  18,  10,    null,null,null,null,null,null,null,null,
            4,  15,  16,   0,   7,  21,  33,   1,    null,null,null,null,null,null,null,null,
        -33,  -3, -14, -21, -13, -12, -39, -21,    null,null,null,null,null,null,null,null,
    ]

    AI.PSQT_MIDGAME[ROOK] = [
        32,  42,  32,  51, 63,  9,  31,  43,    null,null,null,null,null,null,null,null,
        27,  32,  58,  62, 80, 67,  26,  44,    null,null,null,null,null,null,null,null,
        -5,  19,  26,  36, 17, 45,  61,  16,    null,null,null,null,null,null,null,null,
        -24, -11,   7,  26, 24, 35,  -8, -20,    null,null,null,null,null,null,null,null,
        -36, -26, -12,  -1,  9, -7,   6, -23,    null,null,null,null,null,null,null,null,
        -45, -25, -16, -17,  3,  0,  -5, -33,    null,null,null,null,null,null,null,null,
        -44, -16, -20,  -9, -1, 11,  -6, -71,    null,null,null,null,null,null,null,null,
        -19, -13,   1,  17, 16,  7, -37, -26,    null,null,null,null,null,null,null,null,
    ]

    AI.PSQT_MIDGAME[QUEEN] = [
        -28,   0,  29,  12,  59,  44,  43,  45,    null,null,null,null,null,null,null,null,
        -24, -39,  -5,   1, -16,  57,  28,  54,    null,null,null,null,null,null,null,null,
        -13, -17,   7,   8,  29,  56,  47,  57,    null,null,null,null,null,null,null,null,
        -27, -27, -16, -16,  -1,  17,  -2,   1,    null,null,null,null,null,null,null,null,
            -9, -26,  -9, -10,  -2,  -4,   3,  -3,    null,null,null,null,null,null,null,null,
        -14,   2, -11,  -2,  -5,   2,  14,   5,    null,null,null,null,null,null,null,null,
        -35,  -8,  11,   2,   8,  15,  -3,   1,    null,null,null,null,null,null,null,null,
            -1, -18,  -9,  10, -15, -25, -31, -50,    null,null,null,null,null,null,null,null,
    ]

    AI.PSQT_MIDGAME[KING] = [
        -65,  23,  16, -15, -56, -34,   2,  13,    null,null,null,null,null,null,null,null,
        29,  -1, -20,  -7,  -8,  -4, -38, -29,    null,null,null,null,null,null,null,null,
        -9,  24,   2, -16, -20,   6,  22, -22,    null,null,null,null,null,null,null,null,
        -17, -20, -12, -27, -30, -25, -14, -36,    null,null,null,null,null,null,null,null,
        -49,  -1, -27, -39, -46, -44, -33, -51,    null,null,null,null,null,null,null,null,
        -14, -14, -22, -46, -44, -30, -15, -27,    null,null,null,null,null,null,null,null,
            1,   7,  -8, -64, -43, -16,   9,   8,    null,null,null,null,null,null,null,null,
        -15,  36,  12, -54,   8, -28,  24,  14,    null,null,null,null,null,null,null,null,
    ]

    AI.PSQT_EARLY_ENDGAME = []

        // Pawn
        AI.PSQT_EARLY_ENDGAME[PAWN] = [
            0,   0,   0,   0,   0,   0,   0,   0,    null,null,null,null,null,null,null,null,
            178, 173, 158, 134, 147, 132, 165, 187,    null,null,null,null,null,null,null,null,
             94, 100,  85,  67,  56,  53,  82,  84,    null,null,null,null,null,null,null,null,
             32,  24,  13,   5,  -2,   4,  17,  17,    null,null,null,null,null,null,null,null,
             13,   9,  -3,  -7,  -7,  -8,   3,  -1,    null,null,null,null,null,null,null,null,
              4,   7,  -6,   1,   0,  -5,  -1,  -8,    null,null,null,null,null,null,null,null,
             13,   8,   8,  10,  13,   0,   2,  -7,    null,null,null,null,null,null,null,null,
              0,   0,   0,   0,   0,   0,   0,   0,    null,null,null,null,null,null,null,null,
        ]

        // Knight
        AI.PSQT_EARLY_ENDGAME[KNIGHT] = [
            -58, -38, -13, -28, -31, -27, -63, -99,    null,null,null,null,null,null,null,null,
            -25,  -8, -25,  -2,  -9, -25, -24, -52,    null,null,null,null,null,null,null,null,
            -24, -20,  10,   9,  -1,  -9, -19, -41,    null,null,null,null,null,null,null,null,
            -17,   3,  22,  22,  22,  11,   8, -18,    null,null,null,null,null,null,null,null,
            -18,  -6,  16,  25,  16,  17,   4, -18,    null,null,null,null,null,null,null,null,
            -23,  -3,  -1,  15,  10,  -3, -20, -22,    null,null,null,null,null,null,null,null,
            -42, -20, -10,  -5,  -2, -20, -23, -44,    null,null,null,null,null,null,null,null,
            -29, -51, -23, -15, -22, -18, -50, -64,    null,null,null,null,null,null,null,null,
        ]

        // Bishop
        AI.PSQT_EARLY_ENDGAME[BISHOP] = [
            -14, -21, -11,  -8, -7,  -9, -17, -24,    null,null,null,null,null,null,null,null,
            -8,  -4,   7, -12, -3, -13,  -4, -14,    null,null,null,null,null,null,null,null,
             2,  -8,   0,  -1, -2,   6,   0,   4,    null,null,null,null,null,null,null,null,
            -3,   9,  12,   9, 14,  10,   3,   2,    null,null,null,null,null,null,null,null,
            -6,   3,  13,  19,  7,  10,  -3,  -9,    null,null,null,null,null,null,null,null,
           -12,  -3,   8,  10, 13,   3,  -7, -15,    null,null,null,null,null,null,null,null,
           -14, -18,  -7,  -1,  4,  -9, -15, -27,    null,null,null,null,null,null,null,null,
           -23,  -9, -23,  -5, -9, -16,  -5, -17,    null,null,null,null,null,null,null,null,
        ]
        // Rook
        AI.PSQT_EARLY_ENDGAME[ROOK] = [
            13, 10, 18, 15, 12,  12,   8,   5,    null,null,null,null,null,null,null,null,
            11, 13, 13, 11, -3,   3,   8,   3,    null,null,null,null,null,null,null,null,
             7,  7,  7,  5,  4,  -3,  -5,  -3,    null,null,null,null,null,null,null,null,
             4,  3, 13,  1,  2,   1,  -1,   2,    null,null,null,null,null,null,null,null,
             3,  5,  8,  4, -5,  -6,  -8, -11,    null,null,null,null,null,null,null,null,
            -4,  0, -5, -1, -7, -12,  -8, -16,    null,null,null,null,null,null,null,null,
            -6, -6,  0,  2, -9,  -9, -11,  -3,    null,null,null,null,null,null,null,null,
            -9,  2,  3, -1, -5, -13,   4, -20,    null,null,null,null,null,null,null,null,
        ]

        // Queen
        AI.PSQT_EARLY_ENDGAME[QUEEN] = [
            -9,  22,  22,  27,  27,  19,  10,  20,    null,null,null,null,null,null,null,null,
            -17,  20,  32,  41,  58,  25,  30,   0,    null,null,null,null,null,null,null,null,
            -20,   6,   9,  49,  47,  35,  19,   9,    null,null,null,null,null,null,null,null,
              3,  22,  24,  45,  57,  40,  57,  36,    null,null,null,null,null,null,null,null,
            -18,  28,  19,  47,  31,  34,  39,  23,    null,null,null,null,null,null,null,null,
            -16, -27,  15,   6,   9,  17,  10,   5,    null,null,null,null,null,null,null,null,
            -22, -23, -30, -16, -16, -23, -36, -32,    null,null,null,null,null,null,null,null,
            -33, -28, -22, -43,  -5, -32, -20, -41,    null,null,null,null,null,null,null,null,
        ]

        // King
        AI.PSQT_EARLY_ENDGAME[KING] = [
            -74, -35, -18, -18, -11,  15,   4, -17,    null,null,null,null,null,null,null,null,
            -12,  17,  14,  17,  17,  38,  23,  11,    null,null,null,null,null,null,null,null,
             10,  17,  23,  15,  20,  45,  44,  13,    null,null,null,null,null,null,null,null,
             -8,  22,  24,  27,  26,  33,  26,   3,    null,null,null,null,null,null,null,null,
            -18,  -4,  21,  24,  27,  23,   9, -11,    null,null,null,null,null,null,null,null,
            -19,  -3,  11,  21,  23,  16,   7,  -9,    null,null,null,null,null,null,null,null,
            -27, -11,   4,  13,  14,   4,  -5, -17,    null,null,null,null,null,null,null,null,
            -53, -34, -21, -11, -28, -14, -24, -43,    null,null,null,null,null,null,null,null,
        ]

        AI.PSQT_LATE_ENDGAME = []

        // Pawn
        AI.PSQT_LATE_ENDGAME[PAWN] = [
            0,   0,   0,   0,   0,   0,   0,   0,    null,null,null,null,null,null,null,null,
            178, 173, 158, 134, 147, 132, 165, 187,    null,null,null,null,null,null,null,null,
             94, 100,  85,  67,  56,  53,  82,  84,    null,null,null,null,null,null,null,null,
             32,  24,  13,   5,  -2,   4,  17,  17,    null,null,null,null,null,null,null,null,
             13,   9,  -3,  -7,  -7,  -8,   3,  -1,    null,null,null,null,null,null,null,null,
              4,   7,  -6,   1,   0,  -5,  -1,  -8,    null,null,null,null,null,null,null,null,
             13,   8,   8,  10,  13,   0,   2,  -7,    null,null,null,null,null,null,null,null,
              0,   0,   0,   0,   0,   0,   0,   0,    null,null,null,null,null,null,null,null,
        ]

        // Knight
        AI.PSQT_LATE_ENDGAME[KNIGHT] = [
            -58, -38, -13, -28, -31, -27, -63, -99,    null,null,null,null,null,null,null,null,
            -25,  -8, -25,  -2,  -9, -25, -24, -52,    null,null,null,null,null,null,null,null,
            -24, -20,  10,   9,  -1,  -9, -19, -41,    null,null,null,null,null,null,null,null,
            -17,   3,  22,  22,  22,  11,   8, -18,    null,null,null,null,null,null,null,null,
            -18,  -6,  16,  25,  16,  17,   4, -18,    null,null,null,null,null,null,null,null,
            -23,  -3,  -1,  15,  10,  -3, -20, -22,    null,null,null,null,null,null,null,null,
            -42, -20, -10,  -5,  -2, -20, -23, -44,    null,null,null,null,null,null,null,null,
            -29, -51, -23, -15, -22, -18, -50, -64,    null,null,null,null,null,null,null,null,
        ]

        // Bishop
        AI.PSQT_LATE_ENDGAME[BISHOP] = [
            -14, -21, -11,  -8, -7,  -9, -17, -24,    null,null,null,null,null,null,null,null,
            -8,  -4,   7, -12, -3, -13,  -4, -14,    null,null,null,null,null,null,null,null,
             2,  -8,   0,  -1, -2,   6,   0,   4,    null,null,null,null,null,null,null,null,
            -3,   9,  12,   9, 14,  10,   3,   2,    null,null,null,null,null,null,null,null,
            -6,   3,  13,  19,  7,  10,  -3,  -9,    null,null,null,null,null,null,null,null,
           -12,  -3,   8,  10, 13,   3,  -7, -15,    null,null,null,null,null,null,null,null,
           -14, -18,  -7,  -1,  4,  -9, -15, -27,    null,null,null,null,null,null,null,null,
           -23,  -9, -23,  -5, -9, -16,  -5, -17,    null,null,null,null,null,null,null,null,
        ]
        // Rook
        AI.PSQT_LATE_ENDGAME[ROOK] = [
            13, 10, 18, 15, 12,  12,   8,   5,    null,null,null,null,null,null,null,null,
            11, 13, 13, 11, -3,   3,   8,   3,    null,null,null,null,null,null,null,null,
             7,  7,  7,  5,  4,  -3,  -5,  -3,    null,null,null,null,null,null,null,null,
             4,  3, 13,  1,  2,   1,  -1,   2,    null,null,null,null,null,null,null,null,
             3,  5,  8,  4, -5,  -6,  -8, -11,    null,null,null,null,null,null,null,null,
            -4,  0, -5, -1, -7, -12,  -8, -16,    null,null,null,null,null,null,null,null,
            -6, -6,  0,  2, -9,  -9, -11,  -3,    null,null,null,null,null,null,null,null,
            -9,  2,  3, -1, -5, -13,   4, -20,    null,null,null,null,null,null,null,null,
        ]

        // Queen
        AI.PSQT_LATE_ENDGAME[QUEEN] = [
            -9,  22,  22,  27,  27,  19,  10,  20,    null,null,null,null,null,null,null,null,
            -17,  20,  32,  41,  58,  25,  30,   0,    null,null,null,null,null,null,null,null,
            -20,   6,   9,  49,  47,  35,  19,   9,    null,null,null,null,null,null,null,null,
              3,  22,  24,  45,  57,  40,  57,  36,    null,null,null,null,null,null,null,null,
            -18,  28,  19,  47,  31,  34,  39,  23,    null,null,null,null,null,null,null,null,
            -16, -27,  15,   6,   9,  17,  10,   5,    null,null,null,null,null,null,null,null,
            -22, -23, -30, -16, -16, -23, -36, -32,    null,null,null,null,null,null,null,null,
            -33, -28, -22, -43,  -5, -32, -20, -41,    null,null,null,null,null,null,null,null,
        ]

        // King
        AI.PSQT_LATE_ENDGAME[KING] = [
            -74, -35, -18, -18, -11,  15,   4, -17,    null,null,null,null,null,null,null,null,
            -12,  17,  14,  17,  17,  38,  23,  11,    null,null,null,null,null,null,null,null,
             10,  17,  23,  15,  20,  45,  44,  13,    null,null,null,null,null,null,null,null,
             -8,  22,  24,  27,  26,  33,  26,   3,    null,null,null,null,null,null,null,null,
            -18,  -4,  21,  24,  27,  23,   9, -11,    null,null,null,null,null,null,null,null,
            -19,  -3,  11,  21,  23,  16,   7,  -9,    null,null,null,null,null,null,null,null,
            -27, -11,   4,  13,  14,   4,  -5, -17,    null,null,null,null,null,null,null,null,
            -53, -34, -21, -11, -28, -14, -24, -43,    null,null,null,null,null,null,null,null,
        ]

    if (AI.phase === 0) AI.PSQT = [...AI.PSQT_OPENING]
    if (AI.phase === 1) AI.PSQT = [...AI.PSQT_MIDGAME]
    if (AI.phase === 2) AI.PSQT = [...AI.PSQT_EARLY_ENDGAME]
    if (AI.phase === 3) AI.PSQT = [...AI.PSQT_LATE_ENDGAME]
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

    AI.createPSQT()
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
    
    do {
        let beta = f + (f == bound[0])
        f = AI.PVS(board, beta - (AI.iteration < 10? 2 : 1), beta, d, 1, true)
        bound[(f < beta) | 0] = f
    } while (bound[0] < bound[1] && !AI.stop)
    
    return f
}


AI.search = function (board, options) {
    AI.sortingTime = 0
    AI.searchTime0 = Date.now()

    if (board.movenumber && board.movenumber <= 1) {
        AI.lastscore = 0
        AI.bestmove = 0
        AI.bestscore = 0
        AI.f = 0
    }

    AI.totalmaterial = 7960

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
        AI.createTables(true, true, true, true)
        AI.lastscore = 0
        AI.f = 0
    } else {
        AI.createTables(true, false, true, true)
        // if (changeofphase) {
        //     AI.createTables(true, true, true)
        // } else {
        //     AI.createTables(true, true, true)
        // }
        
        AI.f = AI.lastscore / AI.nullWindowFactor
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
        AI.evalhashnodes = 0
        AI.evalnodes = 0
        AI.rnodes = 0
        AI.evalTime = 0
        AI.moveTime = 0
        AI.iteration = 0
        AI.timer = Date.now()
        AI.stop = false
        AI.PV = AI.getPV(board, 1)

        AI.changeinPV = true

        let score = 0
        let fhfperc = 0

        AI.killers = []

        AI.killers[WHITE] = (new Array(120)).fill([null, null])
        AI.killers[BLACK] = (new Array(120)).fill([null, null])

        AI.fh = AI.fhf = 0.001
        
        AI.previousls = AI.lastscore

        let depth = 1
        let alpha = -INFINITY
        let beta = INFINITY

        if (true) {

            //Iterative Deepening
            for (; depth <= AI.totaldepth; ) {
                // console.log(board.hashkey)
                if (AI.stop) break

                AI.bestmove = [...AI.PV][1]
                AI.iteration++

                AI.f = AI.MTDF(board, AI.f, depth, alpha, beta)

                //Aspiration window
                if (AI.f < alpha) {
                    alpha = -INFINITY
                    continue
                }

                if (AI.f > beta) {
                    beta = INFINITY
                    continue
                }

                alpha -= MARGIN1/2
                beta += MARGIN1/2

                score = AI.nullWindowFactor * (isWhite ? 1 : -1) * AI.f

                AI.PV = AI.getPV(board, AI.totaldepth)

                // if ([...AI.PV][1] && AI.bestmove && [...AI.PV][1].value !== AI.bestmove.value) {
                //     AI.changeinPV = true
                // } else {
                //     AI.changeinPV = false
                // }

                fhfperc = Math.round(AI.fhf * 100 / AI.fh)

                if (!AI.stop) AI.lastscore = score

                // console.log(depth, `FHF: ${fhfperc}%`)

                if (AI.PV && !AI.stop) {
                    console.log(`Depth: ${depth}`, `Score: ${score | 0}`, `PVS Nodes: ${AI.nodes.toString()}`,
                        `QS Nodes: ${AI.qsnodes.toString()}`, `TT Nodes: ${AI.ttnodes.toString()}`)
                    console.log(`Static Eval Hit Rate: ${((100*this.evalhashnodes/(this.evalnodes)) | 0)}`,
                    'PV Nodes: ' + (AI.pvnodes| 0), 'FHF ' + fhfperc + '%',
                    'Pawn Hit Rate: ' + (AI.phnodes / AI.pnodes * 100 | 0))
                    console.log(' ')
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

        let sigmoid = 1 / (1 + Math.pow(10, -score100 / 500))

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
                    'ETC 1 (%): ', (max/total*1000 | 0) / 10,
        )

        // console.log(AI.bestmove, (AI.moveTime / AI.searchTime) * 100 | 0)

        resolve({
            n: board.movenumber, phase: AI.phase, depth: AI.iteration - 1, from: board.board64[AI.bestmove.from],
            to: board.board64[AI.bestmove.to], fromto0x88: [AI.bestmove.from, AI.bestmove.to],
            score: AI.lastscore | 0, sigmoid: (sigmoid * 100 | 0) / 100, nodes: AI.nodes, qsnodes: AI.qsnodes,
            FHF: fhfperc + '%', version: AI.version
        })
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
