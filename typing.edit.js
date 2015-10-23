$(function() {
    $.getJSON('./tango.json', null, function(data) {
        //単語の読み込み待ち
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

        //consonantは'子音'を意味する;
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
            var next = getRoman(nexts, targetPos)[target.route[0] || 0];
            var done = next.slice(0, pos).replace(/ /g, '&nbsp;');
            var rest = next.slice(pos).replace(/ /g, '&nbsp;');
            $roman.find('div.now')
                .html('<span class="red">' + done + '</span>' + rest);
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
                route: UNDECIDED
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
                        target.route = UNDECIDED;
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
                    target.now = text.bsearch('結月ゆかり');
                    // target.now = text.bsearch('マルドゥック・スクランブル');
                    // target.now = text.bsearch('ツァラトゥストラはこう言った');
                } else {
                    //ユカリモードを抜けたときの処理
                    $('body').removeClass('TheYukari');
                    target.now = rand(text.length);
                }
                if (started) showRoman(text[target.now]);
                target.route = UNDECIDED;
                target.pos = 0;
                return false;
            }
        }).on('keydown', pressStart);
    }).error(function(jqXHR, textStatus, errorThrown) {
        console.log('エラー:' + textStatus);
        console.log('テキスト:' + jqXHR.responseText);
    });
});
