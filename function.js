var romanTable = {//{{{
    '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5',
    '6': '6', '7': '7', '8': '8', '9': '9', 'あ': 'a',
    'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o', 'か': 'ka',
    'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko', 'さ': 'sa',
    'し': 'si,shi', 'す': 'su', 'せ': 'se', 'そ': 'so', 'た': 'ta',
    'ち': 'ti,chi', 'つ': 'tu,tsu', 'て': 'te', 'と': 'to', 'な': 'na',
    'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no', 'は': 'ha',
    'ひ': 'hi', 'ふ': 'hu,fu', 'へ': 'he', 'ほ': 'ho', 'ま': 'ma',
    'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo', 'や': 'ya',
    'ゆ': 'yu', 'よ': 'yo', 'ら': 'ra', 'り': 'ri', 'る': 'ru',
    'れ': 're', 'ろ': 'ro', 'わ': 'wa', 'を': 'wo', 'ん': 'nn',
    'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
    'ざ': 'za', 'じ': 'zi,ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
    'だ': 'da', 'ぢ': 'di', 'づ': 'du', 'で': 'de', 'ど': 'do',
    'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
    'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
    'じゃ': 'ja,zya,jixya,zixya', 'じゅ': 'ju,zyu,jixyu,zixyu',
    'じぇ': 'je,zye,jixe,zixe', 'じょ': 'jo,zyo,jixyo,zixyo',
    'てぃ': 'thi,texi', 'てぇ': 'the,text', 'ふぁ': 'fa,fuxa,huxa',
    'ふぃ': 'fi,fuxi,huxi', 'ふぇ': 'fe,fuxe,huxe',
    'ふぉ': 'fo,fuxo,huxo', 'ゔぁ': 'va,vuxa',
    'ゔぃ': 'vi,vuxi', 'ゔ': 'vu', 'ゔぇ': 've,vuxe', 'ゔぉ': 'vo,vuxo',
    'うぁ': 'uxa,wya', 'うぃ': 'wi,uxi,whi', 'うぇ': 'we,uxe,whe',
    'うぉ': 'uxo,who',
    'ぐぁ': 'gwa,guxa', 'ぐぃ': 'gwi,guxi',
    'ぐぅ': 'gwu,guxu', 'ぐぇ': 'gwe,guxe',
    'ぐぉ': 'gwo,guxo',
    'つぁ': 'tsa,tuxa,tsuxa', 'つぃ': 'tsi,tuxi,tsuxi',
    'つぇ': 'tse,tuxe,tsuxe', 'つぉ': 'tso,tuxo,tsuxo',
    'とぁ': 'twa,toxa', 'とぃ': 'twi,toxi',
    'とぅ': 'twu,toxu', 'とぇ': 'twe,toxe',
    'とぉ': 'two,toxo',
    'でぃ': 'dhi,dexi', 'どぅ': 'dwu,doxu',
    'ー': '-', '-': '-', ' ': ' ', ',': ',', ':': ':',
    '(': '(', ')': ')', '{': '{', '}': '}', '.': '.',
    '・': '・', '!': '!', 'a': 'a', 'A': 'A', 'b': 'b',
    'B': 'B', 'c': 'c', 'C': 'C', 'd': 'd', 'D': 'D',
    'e': 'e', 'E': 'E', 'f': 'f', 'F': 'F', 'g': 'g',
    'G': 'G', 'h': 'h', 'H': 'H', 'i': 'i', 'I': 'I',
    'j': 'j', 'J': 'J', 'k': 'k', 'K': 'K', 'l': 'l',
    'L': 'L', 'm': 'm', 'M': 'M', 'n': 'n', 'N': 'N',
    'o': 'o', 'O': 'O', 'p': 'p', 'P': 'P', 'q': 'q',
    'Q': 'Q', 'r': 'r', 'R': 'R', 's': 's', 'S': 'S',
    't': 't', 'T': 'T', 'u': 'u', 'U': 'U', 'v': 'v',
    'V': 'V', 'w': 'w', 'W': 'W', 'x': 'x', 'X': 'X',
    'y': 'y', 'Y': 'Y', 'z': 'z', 'Z': 'Z', '&': '&',
    '。': '.', '%': '%'
};
var consonant = {
    'あ': '', 'い': '', 'う': '', 'え': '', 'お': '',
    'か': 'k', 'き': 'k', 'く': 'k', 'け': 'k', 'こ': 'k',
    'さ': 's', 'し': 's', 'す': 's', 'せ': 's', 'そ': 's',
    'た': 't', 'ち': 't', 'つ': 't', 'て': 't', 'と': 't',
    'な': 'n', 'に': 'n', 'ぬ': 'n', 'ね': 'n', 'の': 'n',
    'は': 'h', 'ひ': 'h', 'ふ': 'h', 'へ': 'h', 'ほ': 'h',
    'ま': 'm', 'み': 'm', 'む': 'm', 'め': 'm', 'も': 'm',
    'や': 'y', 'ゆ': 'y', 'よ': 'y', 'ら': 'r', 'り': 'r',
    'る': 'r', 'れ': 'r', 'ろ': 'r', 'わ': 'w', 'が': 'g',
    'ぎ': 'g', 'ぐ': 'g', 'げ': 'g', 'ご': 'g', 'ざ': 'z',
    'じ': 'z,j', 'ず': 'z', 'ぜ': 'z', 'ぞ': 'z', 'だ': 'd',
    'ぢ': 'd', 'づ': 'd', 'で': 'd', 'ど': 'd', 'ば': 'b',
    'び': 'b', 'ぶ': 'b', 'べ': 'b', 'ぼ': 'b', 'ぱ': 'p',
    'ぴ': 'p', 'ぷ': 'p', 'ぺ': 'p', 'ぽ': 'p'
};//}}}
var moji = function(str, targetPos, pos, key, route) {//{{{
    // strのtargetPosの位置のローマ字と合っているか
    route = route || [null];
    var ok = false,
        newRoute = new Array,
        next = str.charAt(targetPos + 1);
    var nowChar = str.charAt(targetPos);
    if (isSmallChar(next) || nowChar === 'っ' ||
        nowChar === 'ん' || str.charAt(targetPos - 1) === 'ん') {
        //いまの文字が拗音の場合
        str = getRoman(str, targetPos);
    }else if (romanTable[nowChar].indexOf(',') > 0) {
        // ',' でないかつ ',' を含む
        //拗音を含まない。また、複数のキータイプがある。
        str = romanTable[str.charAt(targetPos)].split(',');
    } else {
        //今の文字に拗音を含まない。また、複数のキータイプがない(アルファベットや普通のひらがな)。
        str = getRoman(str, targetPos)[route[0] || 0];
        if (str.charAt(pos) === key) {
            ok = true;
            if (pos === str.length - 1) ok = 'end';
        }
        if (ok) return {route: [null], ok: ok};
        return {ok: false};
    }
    for (var i = 0, j = str.length; i < j; i += 1) {
        //ルートを決定
        if (str[i].charAt(pos) === key &&
            (has(route, i) || has(route, null))) {
            ok = true;
        if (pos === str[i].length - 1) ok = 'end';
        newRoute.push(i);
        }
    }
    if (ok) return {route: newRoute, ok: ok};
    return {ok: false};
};//}}}
var getRoman = function(str, targetPos) {//{{{
    // ローマ字の取得
    // strのtargetPosの位置を取得
    var next = str.charAt(targetPos + 1),
        result = new Array(),
        nowChar = str.charAt(targetPos);
    var smallCharRoman = function(nowChar, next) {
        var smallChar;
        if (next === 'ぃ') smallChar = ['yi', 'ixi'];
        else if (next === 'ぇ') smallChar = ['ye', 'ixe'];
        else if (next === 'ゃ') smallChar = ['ya', 'ixya'];
        else if (next === 'ゅ') smallChar = ['yu', 'ixyu'];
        else if (next === 'ょ') smallChar = ['yo', 'ixyo'];
        var result = new Array();
        // 拗音( = 'っ'とか'ぁ'とか小さいやつ)のローマ字取得
        // 引数には ['yi', 'ixi'] などが渡される
        if (romanTable[nowChar + next]) {
            // 「じゃ」 などromanTableに登録されている場合
            result = romanTable[nowChar + next]
            .split(','); //テーブルにあればそこから
        } else if (consonant[nowChar].indexOf(',') !== -1) {
            // romanTableになければ、引数から組む。
            var consonants = consonant[nowChar].split(',');
            var _i = consonants.length;
            for (var i = 0; i < _i; i = 0 | i + 1) {
                result.push(consonants[i] + smallChar[0]);
                result.push(consonants[i] + smallChar[1]);
                //こっちは入力法がいろいろあるパターン()
            }
        } else {
            result = [
                consonant[nowChar] + smallChar[0],
                consonant[nowChar] + smallChar[1]
            ];
        }
        return result;
    };
    if (nowChar === 'っ') {
        //いまの文字が「っ」の場合、テーブルを作成
        if (consonant[next].indexOf(',') === -1 &&
            !isSmallChar(str.charAt(targetPos + 2))) {

            var nextRoman = romanTable[next].split(',');
            var i = 0, _i = nextRoman.length;
            for (; i < _i; i = 0 | i + 1) {
                result.push(
                    consonant[next] + consonant[next] +
                    romanTable[next].slice(-1)
                );
                result.push('xtu' + nextRoman[i]);
                result.push('xtsu' + nextRoman[i]);
            }
        } else {
            result = new Array();
            if (isSmallChar(str.charAt(targetPos + 2))) {
                //拗音の処理
                targetPos += 1;
                next = str.charAt(targetPos + 1);
                result = smallCharRoman(nowChar, next);
                targetPos -= 1;
                next = str.charAt(targetPos + 1);
                var consonants = consonant[next].split(',');
                var _i = _i = consonants.length;
                for (var i = 0; i < _i; i = 0 | i + 1) {
                    var _j = result.length;
                    for (var j = 0; j < _j; j = 0 | j + 1) {
                        result.push('xtu' + result[j]);
                        result.push('xtsu' + result[j]);
                        result[j] = consonants[i] + result[j];
                    }
                }
            } else {
                var consonants = j = consonant[next].split(',');
                var _i = consonants.length;
                for (var i = 0; i < _i; i = 0 | i + 1) {
                    result.push(consonants[i] + consonants[i] +
                                romanTable[next].slice(-1));
                    result.push('xtu' + romanTable[next]);
                    result.push('xtsu' + romanTable[next]);
                }
            }
        }
    } else if (nowChar === 'ん') {
        if (next !== '' &&
            (consonant[next] === undefined ||
             consonant[next] !== 'n' &&
                 consonant[next] !== '' &&
                     consonant[next] !== 'y')) {
            result = ['n'];
        } else result = ['nn']; //こっちはnの数の判定
    } else if (isSmallChar(next)) {
        if (next === 'ぃ' ||
            next === 'ぇ' ||
            next === 'ゃ' ||
            next === 'ゅ' ||
            next === 'ょ')
            result = smallCharRoman(nowChar, next);
        else result = romanTable[nowChar + next].split(',');
    } else {
        if (romanTable[nowChar] !== ',') {
            result = romanTable[nowChar].split(',');
        } else {
            result = romanTable[nowChar];
        }
    }
    if (str.charAt(targetPos - 1) === 'ん') {
        //こっちはnを足す
        if (consonant[nowChar] !== 'n' && consonant[nowChar] !== '') {
            result = getRoman(str.slice(targetPos), 0);
            for (var i = 0, _i = result.length; i < _i; i = 0 | i + 1) {
                result.push('n' + result[i]);
            }
        }
    }
    return result;
}; //getRoman終わり//}}}
var isSmallChar = function(next) {//{{{
    if (next === 'ぁ' ||
        next === 'ぃ' ||
        next === 'ぅ' ||
        next === 'ぇ' ||
        next === 'ぉ' ||
        next === 'ゃ' ||
        next === 'ゅ' ||
        next === 'ょ') return true;
    return false;
};//}}}
function has(arr, str) {
    for (var i = 0, _i = arr.length; i < _i; i = 0 | i + 1) {
        if (arr[i] === str) return true;
    }
    return false;
};
(function(global) {
    "use strict;"
    if ("process" in global) {
        module["exports"] = {
            romanTable: romanTable,
            moji: moji,
            getRoman: getRoman,
            isSmallChar: isSmallChar
        };
    }
})((this || 0).self || global);
