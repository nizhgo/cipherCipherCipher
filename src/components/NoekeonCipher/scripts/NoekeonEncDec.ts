import CryptoJS from "crypto-js";
//    The text vectors should be as follows:
//
//                       k = 00000000 00000000 00000000 00000000
// *                      a = 00000000 00000000 00000000 00000000
// * after NESSIEencrypt, b = b1656851 699e29fa 24b70148 503d2dfc
// * after NESSIEdecrypt, a?= 00000000 00000000 00000000 00000000
// *
// *                      k = ffffffff ffffffff ffffffff ffffffff
// *                      a = ffffffff ffffffff ffffffff ffffffff
// * after NESSIEencrypt, b = 2a78421b 87c7d092 4f26113f 1d1349b2
// * after NESSIEdecrypt, a?= ffffffff ffffffff ffffffff ffffffff
// *
// *                      k = b1656851 699e29fa 24b70148 503d2dfc
// *                      a = 2a78421b 87c7d092 4f26113f 1d1349b2
// * after NESSIEencrypt, b = e2f687e0 7b75660f fc372233 bc47532c
// * after NESSIEdecrypt, a?= 2a78421b 87c7d092 4f26113f 1d1349b2
// *
// /************************************************************************************/
//
// #include "Nessie.h"
//
// /*==================================================================================*/
// /* Number of computation rounds in the block cipher
// /*----------------------------------------------------------------------------------*/
// #define   NROUND		16
// /*----------------------------------------------------------------------------------*/
// /* Round Constants are : 80,1B,36,6C,D8,AB,4D,9A,2F,5E,BC,63,C6,97,35,6A,D4 (encrypt)
// /*----------------------------------------------------------------------------------*/
// #define RC1ENCRYPTSTART  T8 (0x80)
// #define RC2DECRYPTSTART  T8 (0xD4)
//
//
// /*==================================================================================*/
// /* Null Vector
// /*----------------------------------------------------------------------------------*/
// u32 NullVector[4] = {0,0,0,0};
//
//
// /*==================================================================================*/
// void Theta (u32 const * const k,u32 * const a)
// /*----------------------------------------------------------------------------------*/
// /* DIFFUSION - Linear step THETA, involution
// /*==================================================================================*/
// {
// 	u32 tmp;
//
// 	tmp  = a[0]^a[2];
// 	tmp ^= ROTL32(tmp,8)^ROTL32(tmp,24);
// 	a[1]^= tmp;
// 	a[3]^= tmp;
//
// 	a[0] ^= k[0]; a[1] ^= k[1]; a[2] ^= k[2]; a[3] ^= k[3];
//
// 	tmp  = a[1]^a[3];
// 	tmp ^= ROTL32(tmp,8)^ROTL32(tmp,24);
// 	a[0]^= tmp;
// 	a[2]^= tmp;
//
// } /* Theta */
//
//
// /*==================================================================================*/
// void Pi1(u32 * const a)
// /*----------------------------------------------------------------------------------*/
// /* DISPERSION - Rotations Pi1
// /*==================================================================================*/
// { a[1] = ROTL32 (a[1], 1);
// 	a[2] = ROTL32 (a[2], 5);
// 	a[3] = ROTL32 (a[3], 2);
// }  /* Pi1 */
//
//
// /*==================================================================================*/
// void Pi2(u32 * const a)
// /*----------------------------------------------------------------------------------*/
// /* DISPERSION - Rotations Pi2
// /*==================================================================================*/
// { a[1] = ROTL32 (a[1], 31);
// 	a[2] = ROTL32 (a[2], 27);
// 	a[3] = ROTL32 (a[3], 30);
// }  /* Pi2 */
//
//
// /*==================================================================================*/
// void Gamma(u32 * const a)
// /*----------------------------------------------------------------------------------*/
// /* NONLINEAR - gamma, involution
// /*----------------------------------------------------------------------------------*/
// /* Input of i_th s-box = (i3)(i2)(i1)(i0), with (i3) = i_th bit of a[3]
//  *                                              (i2) = i_th bit of a[2]
//  *                                              (i1) = i_th bit of a[1]
//  *                                              (i0) = i_th bit of a[0]
//  *
//  * gamma = NLIN o LIN o NLIN : (i3)(i2)(i1)(i0) --> (o3)(o2)(o1)(o0)
//  *
//  * NLIN ((i3) = (o3) = (i3)                     NLIN is an involution
//  *       (i2)   (o2)   (i2)                      i.e. evaluation order of i1 & i0
//  *       (i1)   (o1)   (i1+(~i3.~i2))                 can be swapped
//  *       (i0))  (o0)   (i0+(i2.i1))
//  *
//  *  LIN ((i3) = (o3) = (0.i3+0.i2+0.i1+  i0)    LIN is an involution
//  *       (i2)   (o2)   (  i3+  i2+  i1+  i0)
//  *       (i1)   (o1)   (0.i3+0.i2+  i1+0.i0)
//  *       (i0))  (o0)   (  i3+0.i2+0.i1+0.i0)
//  *
// /*==================================================================================*/
// { u32 tmp;
//
// 	/* first non-linear step in gamma */
// 	a[1] ^= ~a[3] & ~a[2];
// 	a[0] ^=   a[2] & a[1];
//
// 	/* linear step in gamma */
// 	tmp   = a[3];
// 	a[3]  = a[0];
// 	a[0]  = tmp;
// 	a[2] ^= a[0]^a[1]^a[3];
//
// 	/* last non-linear step in gamma */
// 	a[1] ^= ~a[3] & ~a[2];
// 	a[0] ^=   a[2] & a[1];
// } /* Gamma */
//
//
// /*==================================================================================*/
// void Round (u32 const * const k,u32 * const a,u8 const RC1,u8 const RC2)
// /*----------------------------------------------------------------------------------*/
// /* The round function, common to both encryption and decryption
// /* - Round constants is added to the rightmost byte of the leftmost 32-bit word (=a0)
// /*==================================================================================*/
// {
// 	a[0] ^= RC1;
// 	Theta(k,a);
// 	a[0] ^= RC2;
// 	Pi1(a);
// 	Gamma(a);
// 	Pi2(a);
// }  /* Round */
//
// /*==================================================================================*/
// void RCShiftRegFwd (u8 * const RC)
// /*----------------------------------------------------------------------------------*/
// /* The shift register that computes round constants - Forward Shift
// /*==================================================================================*/
// {
//
// 	if ((*RC)&0x80) (*RC)=((*RC)<<1) ^ 0x1B; else (*RC)<<=1;
//
// } /* RCShiftRegFwd */
//
// /*==================================================================================*/
// void RCShiftRegBwd (u8 * const RC)
// /*----------------------------------------------------------------------------------*/
// /* The shift register that computes round constants - Backward Shift
// /*==================================================================================*/
// {
//
// 	if ((*RC)&0x01) (*RC)=((*RC)>>1) ^ 0x8D; else (*RC)>>=1;
//
// } /* RCShiftRegBwd */
//
// /*==================================================================================*/
// void CommonLoop (u32 const * const k,u32 * const a, u8 RC1, u8 RC2)
// /*----------------------------------------------------------------------------------*/
// /* loop - several round functions, ended by theta
// /*==================================================================================*/
// {
// 	unsigned i;
//
// 	for(i=0 ; i<NROUND ; i++) {
// 		Round(k,a,RC1,RC2);
// 		RCShiftRegFwd(&RC1);
// 		RCShiftRegBwd(&RC2);
// 	}
// 	a[0]^=RC1;
// 	Theta(k,a);
// 	a[0]^=RC2;
//
// } /* CommonLoop */
//
//
// /*==================================================================================*/
// void NESSIEencrypt(const struct NESSIEstruct * const structpointer,
// 	const unsigned char * const plaintext,
// 	unsigned char * const ciphertext)
// /*==================================================================================*/
// { u32 const *k=structpointer->k;
// 	u32 state[4];
//
//
// 	state[0]=U8TO32_BIG(plaintext   );
// 	state[1]=U8TO32_BIG(plaintext+4 );
// 	state[2]=U8TO32_BIG(plaintext+8 );
// 	state[3]=U8TO32_BIG(plaintext+12);
//
// 	CommonLoop (k,state,RC1ENCRYPTSTART,0);
//
// 	U32TO8_BIG(ciphertext   , state[0]);
// 	U32TO8_BIG(ciphertext+4 , state[1]);
// 	U32TO8_BIG(ciphertext+8 , state[2]);
// 	U32TO8_BIG(ciphertext+12, state[3]);
// } /* NESSIEencrypt */
//
// /*==================================================================================*/
// void NESSIEdecrypt(const struct NESSIEstruct * const structpointer,
// 	const unsigned char * const ciphertext,
// 	unsigned char * const plaintext)
// /*==================================================================================*/
// { u32 const *kencrypt=structpointer->k;
// 	u32 k[4],state[4];
//
// 	state[0]=U8TO32_BIG(ciphertext   );
// 	state[1]=U8TO32_BIG(ciphertext+4 );
// 	state[2]=U8TO32_BIG(ciphertext+8 );
// 	state[3]=U8TO32_BIG(ciphertext+12);
//
// 	k[0]=kencrypt[0];
// 	k[1]=kencrypt[1];
// 	k[2]=kencrypt[2];
// 	k[3]=kencrypt[3];
// 	Theta(NullVector,k);
//
// 	CommonLoop (k,state,0,RC2DECRYPTSTART);
//
// 	U32TO8_BIG(plaintext   , state[0]);
// 	U32TO8_BIG(plaintext+4 , state[1]);
// 	U32TO8_BIG(plaintext+8 , state[2]);
// 	U32TO8_BIG(plaintext+12, state[3]);
// } /* NESSIEdecrypt */
//
//
// /*==================================================================================*/
// void NESSIEkeysetup(const unsigned char * const key,
// 	struct NESSIEstruct * const structpointer)
// /*----------------------------------------------------------------------------------*/
// /* PRE:
//  * 128-bit key value in byte array key [16 bytes]
//  *
//  * key: [00] [01] [02] [03] [04] [05] [06] [07] [08] [09] [10] [11] [12] [13] [14] [15]
//  *      ----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----
//  *
//  * POST:
//  * key value written in 32-bit word array k in NESSIEstruct
//  *      -------------------+-------------------+-------------------+-------------------
//  *              k[0]                k[1]                k[2]                k[3]
// /*==================================================================================*/
// { u32 *k=structpointer->k;
//
// 	k[0]=U8TO32_BIG(key   );
// 	k[1]=U8TO32_BIG(key+4 );
// 	k[2]=U8TO32_BIG(key+8 );
// 	k[3]=U8TO32_BIG(key+12);
//
// } /* NESSIEkeysetup */



const Theta = (k: any, a: any) => {
	const c = new Uint32Array(4);
	const d = new Uint32Array(4);

	c[0] = a[0] ^ a[2];
	c[1] = a[1] ^ a[3];
	c[2] = a[2] ^ a[0];
	c[3] = a[3] ^ a[1];

	d[0] = c[0] ^ c[1];
	d[1] = c[1] ^ c[2];
	d[2] = c[2] ^ c[3];
	d[3] = c[3] ^ c[0];

	a[0] ^= d[0];
	a[1] ^= d[1];
	a[2] ^= d[2];
	a[3] ^= d[3];

	a[0] ^= k[0];
	a[1] ^= k[1];
	a[2] ^= k[2];
	a[3] ^= k[3];
}

const Gamma = (a: any) => {
	a[0] = (a[0] << 8) | (a[0] >>> 24);
	a[1] = (a[1] << 8) | (a[1] >>> 24);
	a[2] = (a[2] << 8) | (a[2] >>> 24);
	a[3] = (a[3] << 8) | (a[3] >>> 24);
}

const Pi1 = (a: any) => {
	const t = a[1];
	a[1] = a[2];
	a[2] = a[3];
	a[3] = t;
}

const Pi2 = (a: any) => {
	const t = a[0];
	a[0] = a[3];
	a[3] = a[2];
	a[2] = a[1];
	a[1] = t;
}


const RCShiftRegFwd = (RC: any) => {
	if (RC & 0x01) {
		RC = (RC >> 1) ^ 0x8D;
	}
	else {
		RC >>= 1;
	}
}

const RCShiftRegBwd = (RC: any) => {
	if (RC & 0x80) {
		RC = (RC << 1) ^ 0x1B;
	}
	else {
		RC <<= 1;
	}
}


// void CommonLoop (u32 const * const k,u32 * const a, u8 RC1, u8 RC2)
// /*----------------------------------------------------------------------------------*/
// /* loop - several round functions, ended by theta
// /*==================================================================================*/
// {
// 	unsigned i;
//
// 	for(i=0 ; i<NROUND ; i++) {
// 		Round(k,a,RC1,RC2);
// 		RCShiftRegFwd(&RC1);
// 		RCShiftRegBwd(&RC2);
// 	}
// 	a[0]^=RC1;
// 	Theta(k,a);
// 	a[0]^=RC2;




const RC2ENCRYPTSTART = 0x01;
const RC2DECRYPTSTART = 0x80;

const KeySetup = (key: string) => {
	const k = new Uint32Array(4);
	const keyArray = new Uint8Array(16);
	console.log('key = ', key);
	for (let i = 0; i < key.length; i++) {
		keyArray[i] = key.charCodeAt(i);
	}

	k[0] = U8TO32_BIG(keyArray, 0);
	k[1] = U8TO32_BIG(keyArray, 4);
	k[2] = U8TO32_BIG(keyArray, 8);
	k[3] = U8TO32_BIG(keyArray, 12);

	return k;
}

const U8TO32_BIG = (array: Uint8Array, offset: number) => {
	return (array[offset] << 24) | (array[offset + 1] << 16) | (array[offset + 2] << 8) | array[offset + 3];
}



// void NESSIEencrypt(const struct NESSIEstruct * const structpointer,
// 	const unsigned char * const plaintext,
// 	unsigned char * const ciphertext)
// /*==================================================================================*/
// { u32 const *k=structpointer->k;
// 	u32 state[4];
//
//
// 	state[0]=U8TO32_BIG(plaintext   );
// 	state[1]=U8TO32_BIG(plaintext+4 );
// 	state[2]=U8TO32_BIG(plaintext+8 );
// 	state[3]=U8TO32_BIG(plaintext+12);
//
// 	CommonLoop (k,state,RC1ENCRYPTSTART,0);
//
// 	U32TO8_BIG(ciphertext   , state[0]);
// 	U32TO8_BIG(ciphertext+4 , state[1]);
// 	U32TO8_BIG(ciphertext+8 , state[2]);
// 	U32TO8_BIG(ciphertext+12, state[3]);
// } /* NESSIEencrypt */


const Encrypt = (k: any, plaintext: string) => {
	const RC1ENCRYPTSTART = 0x01;
	const RC2ENCRYPTSTART = 0x80;

	const state = new Uint32Array(4);
	const plaintextArray = new Uint8Array(16);
	for (let i = 0; i < plaintext.length; i++) {
		plaintextArray[i] = plaintext.charCodeAt(i);
	}

	state[0] = U8TO32_BIG(plaintextArray, 0);
	state[1] = U8TO32_BIG(plaintextArray, 4);
	state[2] = U8TO32_BIG(plaintextArray, 8);
	state[3] = U8TO32_BIG(plaintextArray, 12);

	CommonLoop(k, state, RC1ENCRYPTSTART, 0);

	const ciphertext = new Uint8Array(16);
	U32TO8_BIG_3(ciphertext, 0, state[0]);
	U32TO8_BIG_3(ciphertext, 4, state[1]);
	U32TO8_BIG_3(ciphertext, 8, state[2]);
	U32TO8_BIG_3(ciphertext, 12, state[3]);

	return ciphertext;
}

const U32TO8_BIG_3 = (array: Uint8Array, offset: number, value: number) => {
	array[offset] = (value >> 24) & 0xff;
	array[offset + 1] = (value >> 16) & 0xff;
	array[offset + 2] = (value >> 8) & 0xff;
	array[offset + 3] = value & 0xff;
}

// define U32TO8_BIG(c, v)    do { \
// 		u32 x = (v); \
// 		u8 *d = (c); \
// 		d[0] = T8(x >> 24); \
// 		d[1] = T8(x >> 16); \
// 		d[2] = T8(x >> 8); \
// 		d[3] = T8(x); \
// } while (0)
//
// /*

const U32TO8_BIG = (v: any, c: any) => {
	const x = v;
	const d = c;
	d[0] = T8(x >> 24);
	d[1] = T8(x >> 16);
	d[2] = T8(x >> 8);
	d[3] = T8(x);
}

const T8 = (x: any) => {
	return x & 0xFF;
}


const CommonLoop = (k: any, a: any, RCStart: any, RCEnd: any) => {
	let RC = RCStart;
	for (let i = 0; i < 16; i++) {
		Round(k, a, RCStart, RCEnd);
		RCShiftRegFwd(RCStart);
		RCShiftRegBwd(RCEnd);
	}
	a[0] ^= RCStart;
	Theta(k, a);
	a[0] ^= RCEnd;
}

// void Round (u32 const * const k,u32 * const a,u8 const RC1,u8 const RC2)
// /*----------------------------------------------------------------------------------*/
// /* The round function, common to both encryption and decryption
// /* - Round constants is added to the rightmost byte of the leftmost 32-bit word (=a0)
// /*==================================================================================*/
// {
// 	a[0] ^= RC1;
// 	Theta(k,a);
// 	a[0] ^= RC2;
// 	Pi1(a);
// 	Gamma(a);
// 	Pi2(a);
// }  /* Round */

const Round = (k: any, a: any, RC1: any, RC2: any) => {
	a[0] ^= RC1;
	Theta(k, a);
	a[0] ^= RC2;
	Pi1(a);
	Gamma(a);
	Pi2(a);
}

// void NESSIEdecrypt(const struct NESSIEstruct * const structpointer,
// 	const unsigned char * const ciphertext,
// 	unsigned char * const plaintext)
// /*==================================================================================*/
// { u32 const *kencrypt=structpointer->k;
// 	u32 k[4],state[4];
//
// 	state[0]=U8TO32_BIG(ciphertext   );
// 	state[1]=U8TO32_BIG(ciphertext+4 );
// 	state[2]=U8TO32_BIG(ciphertext+8 );
// 	state[3]=U8TO32_BIG(ciphertext+12);
//
// 	k[0]=kencrypt[0];
// 	k[1]=kencrypt[1];
// 	k[2]=kencrypt[2];
// 	k[3]=kencrypt[3];
// 	Theta(NullVector,k);
//
// 	CommonLoop (k,state,0,RC2DECRYPTSTART);
//
// 	U32TO8_BIG(plaintext   , state[0]);
// 	U32TO8_BIG(plaintext+4 , state[1]);
// 	U32TO8_BIG(plaintext+8 , state[2]);
// 	U32TO8_BIG(plaintext+12, state[3]);
// } /* NESSIEdecrypt */

const Decrypt = (key: any, ciphertext: any) => {
	const k = KeySetup(key);
	const nullVector = new Uint32Array(4);

	const state = new Uint32Array(4);
	state[0] = U8TO32_BIG(ciphertext, 0);
	state[1] = U8TO32_BIG(ciphertext, 4);
	state[2] = U8TO32_BIG(ciphertext, 8);
	state[3] = U8TO32_BIG(ciphertext, 12);

	k[0] = k[0];
	k[1] = k[1];
	k[2] = k[2];
	k[3] = k[3];
	Theta(nullVector, k);

	CommonLoop(k, state, 0, RC2DECRYPTSTART);

	const plaintext = new Uint8Array(16);
	U32TO8_BIG(plaintext, state[0]);
	U32TO8_BIG(plaintext, state[1]);
	U32TO8_BIG(plaintext, state[2]);
	U32TO8_BIG(plaintext, state[3]);

return plaintext;
}

const KeySchedule = (key: string) => {
	const k = new Uint32Array(4);
	const keyBytes = new TextEncoder().encode(key);
	k[0] = U8TO32_BIG(keyBytes, 0);
	k[1] = U8TO32_BIG(keyBytes, 4);
	k[2] = U8TO32_BIG(keyBytes, 8);
	k[3] = U8TO32_BIG(keyBytes, 12);
	return k;
}


/* const EncryptUTF8 = (key: string, plaintext: string) => {
	const k = KeySchedule(key);
	const ciphertextArr = []
	for (let i = 0; i < plaintext.length; i += 4) {
		const text = plaintext.substring(i, i + 4);
		const ciphertext = Encrypt(k, text);
		console.log(ciphertext);
		ciphertextArr.push(ciphertext);
	}
	//return ciphertextArr as 16 base encoded string
	return ciphertextArr.map((c) => {
		return btoa(String.fromCharCode(...c));
	}
	).join('');
}

 */

const EncryptUTF8 = (key: string, plaintext: string) => {
	const k = KeySetup(key);
	//plaintext in base64 format
	const ciphertextArr = []
	for (let i = 0; i < plaintext.length; i += 4) {
		const text = plaintext.substring(i, i + 4);
		const ciphertext = Encrypt(k, text);
		console.log(ciphertext);
		ciphertextArr.push(ciphertext);
	}
	//return ciphertextArr in UTF8 format
	return ciphertextArr.map((c) => {
		return String.fromCharCode(...c);
	}
	).join('');
}

const DecryptBase64 = (key: string, ciphertext: string) => {
const k = KeySetup(key);
	const plaintextArr = [];
	for (let i = 0; i < ciphertext.length; i += 16) {
		const text = ciphertext.substring(i, i + 16);
		const plaintext = Decrypt(k, text);
		plaintextArr.push(plaintext);
	}
	return plaintextArr.map((p) => {
		return new TextDecoder().decode(p);
	}
	).join('');
}






const DecryptUTF8 = (key: string, ciphertext: string) => {
	const k = KeySchedule(key);
	//ciphertext from hex
	const ciphertextBytes = [];
	for (let i = 0; i < ciphertext.length; i += 8) {
		ciphertextBytes.push(ciphertext.slice(i, i + 8));
	}

	const plaintext = [];
	for (let i = 0; i < ciphertextBytes.length; i++) {
		plaintext.push(Decrypt(k, ciphertextBytes[i]));
	}
	//plaintext to utf8
	const plaintextUTF8 = [];
	for (let i = 0; i < plaintext.length; i++) {
		plaintextUTF8.push(new TextDecoder().decode(plaintext[i]));
	}
	return plaintextUTF8.join('');
}


const GenerateKey = () => {
	const key = new Uint8Array(8);
	window.crypto.getRandomValues(key);
	return key;
}

// const BinaryEncrypt = (key: Uint8Array, plaintext: Uint8Array) => {
// 	const keyString = Array.from(key).map((x) => String.fromCharCode(x)).join('');
// 	const plaintextString = Array.from(plaintext).map((x) => String.fromCharCode(x)).join('');
// 	const ciphertextString = EncryptUTF8(keyString, plaintextString);
// 	const ciphertext = new Uint8Array(ciphertextString.length);
// 	for (let i = 0; i < ciphertextString.length; i++) {
// 		ciphertext[i] = ciphertextString.charCodeAt(i);
// 	}
// 	return ciphertext;
// };

export { EncryptUTF8, DecryptBase64, GenerateKey};
