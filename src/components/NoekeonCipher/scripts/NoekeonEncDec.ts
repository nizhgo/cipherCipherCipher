
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
