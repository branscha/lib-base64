# Base 64 Codec [![Build Status](https://travis-ci.org/branscha/lib-base64.svg?branch=master)](https://travis-ci.org/branscha/lib-base64)
## Goal

Standard 'base64' encoding for RFC 3548 or RFC 4648.
* No line splitting (in accordance with this standard).
* https://en.wikipedia.org/wiki/Base64.
* A JavaScript string is interpreted as a string of bytes, each character corresponds to a single byte.

Example using CommonJS semantics.

    var base64 = require('@branscha/base64');
    var encoded = base64.encode("Hello World");
    var decoded = base64.decode(encoded);

The package contains an UMD module.
