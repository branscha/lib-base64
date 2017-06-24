import {encode as encode, decode as decode} from 'base64';

test('Base64 encoding', () => {
    expect(encode("abc123")).toBe("YWJjMTIz");
    expect(encode("Hello World")).toBe("SGVsbG8gV29ybGQ=");

    // Test length boundaries.
    expect(encode("1")).toBe("MQ==");
    expect(encode("12")).toBe("MTI=");
    expect(encode("123")).toBe("MTIz");
    expect(encode("1234")).toBe("MTIzNA==");

    // Wikipedia examples.
    expect(encode("any carnal pleasure.")).toBe("YW55IGNhcm5hbCBwbGVhc3VyZS4=");
    expect(encode("any carnal pleasure")).toBe("YW55IGNhcm5hbCBwbGVhc3VyZQ==");
    expect(encode("any carnal pleasur")).toBe("YW55IGNhcm5hbCBwbGVhc3Vy");
    expect(encode("any carnal pleasu")).toBe("YW55IGNhcm5hbCBwbGVhc3U=");
    expect(encode("any carnal pleas")).toBe("YW55IGNhcm5hbCBwbGVhcw==");
    expect(encode("pleasure.")).toBe("cGxlYXN1cmUu");
    expect(encode("leasure.")).toBe("bGVhc3VyZS4=");
    expect(encode("easure.")).toBe("ZWFzdXJlLg==");
    expect(encode("asure.")).toBe("YXN1cmUu");
    expect(encode("sure.")).toBe("c3VyZS4=");

    // !TRICK! Make sure we use UTF-8 encoding and not ISO encoding.
    let utfstring = window.unescape(encodeURIComponent("éèüë"));
    expect(encode(utfstring)).toBe("w6nDqMO8w6s=");

    expect(encode(
        "Man is distinguished, not only by his reason, but by this singular passion from other animals, which is a lust of the mind, that by a perseverance of delight in the continued and indefatigable generation of knowledge, exceeds the short vehemence of any carnal pleasure.")).toBe(
        "TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=");
});

test('Base64 decoding', () => {
    expect(decode("YWJjMTIz")).toBe("abc123");
    expect(decode("SGVsbG8gV29ybGQ=")).toBe("Hello World");

    // Test length boundaries.
    expect(decode("MQ==")).toBe("1");
    expect(decode("MTI=")).toBe("12");
    expect(decode("MTIz")).toBe("123");
    expect(decode("MTIzNA==")).toBe("1234");

    // Wikipedia examples.
    expect(decode("YW55IGNhcm5hbCBwbGVhc3VyZS4=")).toBe("any carnal pleasure.");
    expect(decode("YW55IGNhcm5hbCBwbGVhc3VyZQ==")).toBe("any carnal pleasure");
    expect(decode("YW55IGNhcm5hbCBwbGVhc3Vy")).toBe("any carnal pleasur");
    expect(decode("YW55IGNhcm5hbCBwbGVhc3U=")).toBe("any carnal pleasu");
    expect(decode("YW55IGNhcm5hbCBwbGVhcw==")).toBe("any carnal pleas");
    expect(decode("cGxlYXN1cmUu")).toBe("pleasure.");
    expect(decode("bGVhc3VyZS4=")).toBe("leasure.");
    expect(decode("ZWFzdXJlLg==")).toBe("easure.");
    expect(decode("YXN1cmUu")).toBe("asure.");
    expect(decode("c3VyZS4=")).toBe("sure.");

    // You must give Jest a function so that it can evaluate the
    // expression itself. Otherwise the expression will be evaluated before
    // the expect is invoked!
    expect(() => decode("éè")).toThrowError(/^Base64\/010/);

    // !TRICK! Make sure we use UTF-8 encoding and not ISO encoding.
    let utfstring = window.unescape(encodeURIComponent("éèüë"));
    expect( decode("w6nDqMO8w6s=")).toBe(utfstring);

    expect(decode(
        "TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=")).toBe(
        "Man is distinguished, not only by his reason, but by this singular passion from other animals, which is a lust of the mind, that by a perseverance of delight in the continued and indefatigable generation of knowledge, exceeds the short vehemence of any carnal pleasure."
    );
});

