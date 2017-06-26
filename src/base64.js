/**
 * The core of the Base64 algorithm is really simple. Take three adjacent bytes and redivide their bits over
 * four bytes, with six bits to each byte. The upper two bits of the output bytes are zeroed.
 * You now have four bytes with values in the range from 0 to 63. The characters with those values are not
 * printable ASCII, so to make the final output, the values are replaced with printable characters.
 * 0 to 25 map to A–Z, 26 to 51 map to a–z, 52 to 61 map to 0–9, 62 maps to the character +,
 * and 63 maps to the character /. If the input is not a multiple of three bytes, the output is
 * padded with = characters to make four-byte output blocks
 */

/** @type {String} */
const CODETABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

/** @type {RegExp} */
const INVALID_INPUT = /[^A-Za-z0-9\+\/\=]/g;

/** @type {string} */
const ERR010 = "Base64/010: Invalid characters in the input. Valid characters are A-Z, a-z, 0-9, '+', '/',and '=.";

/**
 * Convert the byte string (raw string) into a Base64 encoded string.
 * @param input {String}
 * @returns {String}
 */
function encode(input) {
    /** @type {String} */
    let output = "";

    /** @type {number} */
    let src1, src2, src3;

    /** @type {number} */
    let enc1, enc2, enc3, enc4;

    const restLen = input.length % 3;
    const fastLen = input.length - restLen;

    /** @type {number}*/
    let i = 0;

    // Input body with length a multiple of 3 bytes.
    while (i < fastLen) {
        // Get the three input bytes.
        src1 = input.charCodeAt(i++);
        src2 = input.charCodeAt(i++);
        src3 = input.charCodeAt(i++);

        // Inflate the contents of three input bytes with 8 data bits to
        // four output bytes, each output byte has room for 6 data bits.
        enc1 = src1 >>> 2;                               // s18 s17 s16 s15 s14 s13
        enc2 = ((src1 & 0b11 ) << 4) | (src2 >>> 4);     // s12 s11*s28 s27 s26 s25
        enc3 = ((src2 & 0b1111 ) << 2) | (src3 >>> 6);   // s24 s23 s22 s21*s38 s37
        enc4 = src3 & 0b111111;                         // s36 s35 s34 s33 s32 s31

        // Convert the output bytes to readable tokens.
        output = output +
            CODETABLE.charAt(enc1) +
            CODETABLE.charAt(enc2) +
            CODETABLE.charAt(enc3) +
            CODETABLE.charAt(enc4);
    }

    // Input remainder bytes, the length that makes the input not a multiple of 3.
    if (restLen) {
        src1 = input.charCodeAt(i++);
        enc1 = src1 >>> 2;
        switch (restLen) {
            case 1:
                enc2 = ((src1 & 0b11) << 4);
                // Add padding.
                enc3 = enc4 = 0b1000000;
                break;
            case 2:
                src2 = input.charCodeAt(i++);
                enc2 = ((src1 & 0b11) << 4) | (src2 >>> 4);
                enc3 = ((src2 & 0b1111) << 2);
                // Add padding.
                enc4 = 0b1000000;
                break;
        }
        output = output +
            CODETABLE.charAt(enc1) +
            CODETABLE.charAt(enc2) +
            CODETABLE.charAt(enc3) +
            CODETABLE.charAt(enc4);
    }

    return output;
}

/**
 * Decode a Base64 encoded string into the original byte string (raw string).
 * An Error is thrown when the input contains tokens that are not in the Base64 character set.
 * @param input {String}
 * @returns {String}
 */
function decode(input) {
    if (INVALID_INPUT.exec(input)) {
        throw new Error(ERR010);
    }

    /** @type {String} */
    let output = "";

    /** @type {number} */
    let src1, src2, src3;

    /** @type {number} */
    let enc1, enc2, enc3, enc4;

    /** @type {number} */
    let i = 0;

    while (i < input.length) {
        // Get four input bytes and translate tokens to byte values.
        enc1 = CODETABLE.indexOf(input.charAt(i++)); // s18 s17 s16 s15 s14 s13
        enc2 = CODETABLE.indexOf(input.charAt(i++)); // s12 s11*s28 s27 s26 s25
        enc3 = CODETABLE.indexOf(input.charAt(i++)); // s24 s23 s22 s21*s38 s37
        enc4 = CODETABLE.indexOf(input.charAt(i++)); // s36 s35 s34 s33 s32 s31

        // Deflate the content from 4 bytes into 3 bytes.
        src1 = (enc1 << 2) | (enc2 >>> 4);
        src2 = ((enc2 & 0b1111) << 4) | (enc3 >>> 2);
        src3 = ((enc3 & 0b11) << 6) | enc4;

        output = output + String.fromCharCode(src1);

        // Skip the padding.
        if (enc3 !== 0b1000000) {
            output = output + String.fromCharCode(src2);
        }
        if (enc4 !== 0b1000000) {
            output = output + String.fromCharCode(src3);
        }
    }
    return output;
}

export {
    encode as encode,
    decode as decode,
}
