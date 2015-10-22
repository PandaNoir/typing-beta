var Typing = require('./function.js');
var assert = require('assert');
var getRoman = Typing.getRoman;
var isSmallChar = Typing.isSmallChar;
var moji = Typing.moji;
// moji('まるどぅっく・すくらんぶる', 1, 1, 'r', );
assert.deepEqual(getRoman('ささだんご', 0), ['sa']);// ま
assert.deepEqual(getRoman('ささだんご', 1), ['sa']);// ま
assert.deepEqual(getRoman('ささだんご', 2), ['da']);// ま
assert.deepEqual(getRoman('ささだんご', 3), ['n']);// ま
assert.deepEqual(getRoman('ささだんご', 4), ['go', 'ngo']);// ま

assert.deepEqual(getRoman('まるどぅっく・すくらんぶる', 0), ['ma']);// ま
assert.deepEqual(getRoman('まるどぅっく・すくらんぶる', 1), ['ru']);// る
assert.deepEqual(getRoman('まるどぅっく・すくらんぶる', 2), ['dwu', 'doxu']);// どぅ
assert.deepEqual(getRoman('まるどぅっく・すくらんぶる', 4), ['kku', 'xtuku', 'xtsuku']);// っく
assert.deepEqual(getRoman('まるどぅっく・すくらんぶる', 6), ['・']);// ・
assert.deepEqual(getRoman('まるどぅっく・すくらんぶる', 7), ['su']);// す
assert.deepEqual(getRoman('まるどぅっく・すくらんぶる', 8), ['ku']);// く
assert.deepEqual(getRoman('まるどぅっく・すくらんぶる', 9), ['ra']);// ら
assert.deepEqual(getRoman('まるどぅっく・すくらんぶる', 10), ['n']);// ん
assert.deepEqual(getRoman('まるどぅっく・すくらんぶる', 11), ['bu', 'nbu']);// ぶ
assert.deepEqual(getRoman('まるどぅっく・すくらんぶる', 12), ['ru']);// る

assert.deepEqual(moji('まるどぅっく・すくらんぶる', 0, 0, 'm', [null]), {ok: true, route: [null]});
assert.deepEqual(moji('まるどぅっく・すくらんぶる', 0, 0, 'k', [null]), {ok: false});
assert.deepEqual(moji('まるどぅっく・すくらんぶる', 2, 0, 'd', [null]), {ok: true, route: [0, 1]});
assert.deepEqual(moji('まるどぅっく・すくらんぶる', 2, 1, 'w', [0, 1]), {ok: true, route: [0]});
assert.deepEqual(moji('まるどぅっく・すくらんぶる', 2, 1, 'o', [0, 1]), {ok: true, route: [1]});
assert.deepEqual(moji('まるどぅっく・すくらんぶる', 2, 2, 'x', [0]), {ok: false}); // dw -> o
assert.deepEqual(moji('まるどぅっく・すくらんぶる', 2, 2, 'u', [1]), {ok: false}); // do -> u
assert.deepEqual(moji('まるどぅっく・すくらんぶる', 11, 0, 'b', [null]), {ok: true, route:[0]}); // do -> u
assert.deepEqual(moji('まるどぅっく・すくらんぶる', 11, 0, 'n', [null]), {ok: true, route:[1]}); // do -> u

assert.equal(isSmallChar('ぁ'), true);
assert.equal(isSmallChar('ぃ'), true);
assert.equal(isSmallChar('ぅ'), true);
assert.equal(isSmallChar('ぇ'), true);
assert.equal(isSmallChar('ぉ'), true);
assert.equal(isSmallChar('ゃ'), true);
assert.equal(isSmallChar('ゅ'), true);
assert.equal(isSmallChar('ょ'), true);
assert.equal(isSmallChar('あ'), false);
assert.equal(isSmallChar('か'), false);
assert.equal(isSmallChar('a'), false);
assert.equal(isSmallChar('A'), false);
assert.equal(isSmallChar('z'), false);
assert.equal(isSmallChar('Z'), false);
assert.equal(isSmallChar('!'), false);
assert.equal(isSmallChar('?'), false);
isSmallChar
