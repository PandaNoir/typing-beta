$(function() {
    $.getJSON('./tango.json', null, function(data) {
        //単語の読み込み待ち
        var has = function(arr, str) {
            for (var i = 0, _i = arr.length; i < _i; i = 0 | i + 1) {
                if (arr[i] === str) return true;
            }
            return false;
        };
        function rand(num) {
            return 0 | Math.random() * num;
        }
        function keyCodeToString(key, pushesShiftKey) {
            var res = '';
            if (pushesShiftKey) {
                if (key === 49) res = '!'; //感嘆符の処理
                else if (key === 53) res = '%';
                else if (key === 54) res = '&'; //&の処理
                else if (key === 56) res = '('; //初めかっこの処理
                else if (key === 57) res = ')'; //終わりかっこの処理
                else if (key === 219) res = ''; //初め波かっこの処理
                else if (key === 221) res = ''; //終わり波かっこの処理
            } else {
                if (key === 32) res = ' '; //スペースキー
                else if (key === 186) res = ':'; //コロンの処理
                else if (key === 188) res = ','; //コンマの処理
                else if (key === 189) res = '-'; //のばし音の処理
                else if (key === 190) res = '.'; //ドットの処理
                else if (key === 191) res = '・'; //中点の処理
            }
            return res;
        }

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
            'うぉ': 'uxo,who', 'でぃ': 'dhi,dexi',
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
        //consonantは'子音'を意味する;
        var moji = function(str, targetPos, pos, key, route) {//{{{
            // strのtargetPosの位置のローマ字を返す
            route = route || [null];
            var ok = false,
            newRoute = new Array,
            next = str.charAt(targetPos + 1);
            var nowChar = str.charAt(targetPos);
            if (isSmallChar(next) || nowChar === 'っ' ||
                nowChar === 'ん' || str.charAt(targetPos - 1) === 'ん') {
                //いまの文字が拗音の場合
                str = getRoman(str, targetPos);
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
            }
            if (romanTable[nowChar].indexOf(',') > 0) {
                // ',' でないかつ ',' を含む
                //拗音を含まない。また、複数のキータイプがある。
                str = romanTable[str.charAt(targetPos)].split(',');
                var newRoute = new Array();
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
            } else {
                //今の文字に拗音を含まない。また、複数のキータイプがない(アルファベットや普通のひらがな)。
                str = getRoman(str, targetPos)[route[0] || 0];
                if (str.charAt(pos) === key) {
                    ok = true;
                    if (pos === str.length - 1) ok = 'end';
                }
                return {route: [null], ok: ok};
            }
        };//}}}
        var showRoman = function(nexts) {//{{{
            //ローマ字の表示
            $kanji.html(nexts[0]);
            $hira.html(nexts[1]);
            nexts = nexts[1];
            for (var i = 0, j = nexts.length, result = ''; i < j;) {
                var next = nexts.charAt(i + 1) || '';
                if (i !== 0) {
                    result += '<div>';
                    result += getRoman(nexts, i)[0].replace(/ /g, '&nbsp;');
                    result += '</div>';//ローマ字部分
                } else {
                    result += '<div class=\'now\'>';
                    result += getRoman(nexts, i)[0].replace(/ /g, '&nbsp;');
                    result += '</div>';//ローマ字部分
                }
                if (isSmallChar(next) || nexts.charAt(i) === 'っ') {
                    i += 2;
                    if (isSmallChar(nexts.charAt(i))) i += 1;
                } else i += 1;
            }
            if ($roman.is('.closed')) {
                $roman.html(result + '<div id="close">▼</div>')
                    .addClass('closed');
            } else {
                $roman.html(result + '<div id="close">▲</div>')
                    .removeClass('closed');
            }
        };//}}}
        var changeRoman = function(nexts, targetPos, pos) {//{{{
            console.log(getRoman(nexts, targetPos));
            var next = getRoman(nexts, targetPos)[target.route[0] || 0];
            var done = next.slice(0, pos).replace(/ /g, '&nbsp;');
            var rest = next.slice(pos).replace(/ /g, '&nbsp;');
            $roman.find('div.now')
                .html('<span class="red">' + done + '</span>' + rest);
        };//}}}
        var getRoman = function(str, targetPos) {//{{{
            // ローマ字の取得
            // strのtargetPosの位置を取得
            var next = str.charAt(targetPos + 1),
                result = new Array();
            var nowChar = str.charAt(targetPos);
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
        var text = data;
        text.bsearch = function(key) {
            var that = this, start = 0, end = that.length, mid;
            while (start <= end) {
                mid = 0 | (start + end) / 2;
                if (that[mid][0] > key) {
                    end = mid - 1;
                }
                if (that[mid][0] < key) {
                    start = mid + 1;
                }
                if (that[mid][0] === key) return mid;
            }
            return -1;
        };
        var TheYukari = false,
            target = {
                strPos: 0,
                pos: 0,
                now: rand(text.length),
                route: [null]
            },
            miss = 0,
            collect = 0,
            started = false,
            $kanji = $('#kanji'),
            $hira = $('#hiragana'),
            $misses = $('#miss'),
            $collects = $('#collect'),
            $roman = $('#roman'),
            time = 0;
        $kanji.text('スペースキーでスタート'); // ロードが終了したから
        var pressStart = function(e) {
            if (e.keyCode !== 32)
                return;

            started = true;
            $(window).off('keydown', pressStart);
            showRoman(text[target.now]);
            setInterval(function() {
                time = 0 | time + 100;
                var sec = time / 1000;
                var record = collect / sec;
                record *= 100;
                record = Math.round(record) / 100;
                $('#typingSpeed').text(record + '回/秒');
            }, 100);
            $roman.on('click', '#close', function() {
                if ($roman.is('.closed')) {
                    $('#close').text('▲');
                    $roman.removeClass('closed');
                } else {
                    $('#close').text('▼');
                    $roman.addClass('closed');
                }
            });
            $(window).on('keydown', function(e) {
                var readings = text[target.now][1];
                var nextChar = readings.charAt(target.strPos + 1);
                var results;
                //シフトキーを押したとき(押しっぱなしはOK)、コントロールキーを押したとき、コントロールキーが押されているとき。
                if (e.which === 16 || e.which === 91 ||
                    e.ctrlKey || e.metaKey)
                    return;

                key = keyCodeToString(e.which, e.shiftKey);
                if (key === '' && e.shiftKey)
                    key = String.fromCharCode(e.keyCode).toUpperCase();
                if (key === '' && !e.shiftKey)
                    key = String.fromCharCode(e.keyCode).toLowerCase();

                var results = moji(
                    text[target.now][1],
                    target.strPos,
                    target.pos,
                    key,
                    target.route
                );

                if (results['ok'] === false) {
                    miss += 1;
                    $misses.text('ミス:' + miss);
                } else {
                    collect += 1;
                    $collects.text('打鍵数:' + collect);
                    target.pos += 1;
                    target.route = results['route'];
                    if (results['ok'] === 'end') {
                        //文字列を次に進める

                        changeRoman(
                            readings,
                            target.strPos, target.pos
                        ); //ローマ字を表示
                        nextChar = readings.charAt(target.strPos + 1);

                        $roman.find('div.now').removeClass('now')
                            .next().addClass('now');
                        var nowReading = readings.charAt(target.strPos);
                        if (isSmallChar(nextChar) || nowReading === 'っ') {
                            target.strPos += 2;
                            if (isSmallChar(readings.charAt(target.strPos))) {
                                //「っちゃ」とかの時は「ゃ」がターゲットとなるから、進める。
                                target.strPos += 1;
                            }
                        } else target.strPos += 1; //普通のとき
                        if (target.strPos >= readings.length) {
                            if (!TheYukari) target.now = rand(text.length);
                            target.strPos = 0;
                            showRoman(text[target.now]);
                        }
                        target.route = [null];
                        target.pos = 0;
                    }
                    changeRoman(
                        text[target.now][1],
                        target.strPos, target.pos
                    ); //ローマ字部分
                    var done = $hira.text().slice(0, target.strPos);
                    var rest = $hira.text().slice(target.strPos);
                    $hira.html(
                        '<span class="red">' + done + '</span>' + rest
                    );
                    return false;
                }
            });
            return false;
        };
        $(window).on('keydown', function(e) {
            if (!(e.ctrlKery && !e.metaKey || !e.ctrlKey && e.metaKey))
                return;
            if (e.keyCode === 89 && e.shiftKey) {
                //コード反転 裏コード ザ・ユカリ!!
                TheYukari = !TheYukari;
                if (TheYukari) {
                    //ユカリモードに入ったときの処理
                    $('body').addClass('TheYukari');
                    //target.now = text.bsearch('結月ゆかり');
                    target.now = text.bsearch('マルドゥック・スクランブル');
                } else {
                    //ユカリモードを抜けたときの処理
                    $('body').removeClass('TheYukari');
                    target.now = rand(text.length);
                }
                if (started) showRoman(text[target.now]);
                target.route = [null];
                target.pos = 0;
                return false;
            }
        }).on('keydown', pressStart);
    }).error(function(jqXHR, textStatus, errorThrown) {
        console.log('エラー:' + textStatus);
        console.log('テキスト:' + jqXHR.responseText);
    });
});
