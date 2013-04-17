(function (window, $) {
	$(function () {
		$.getJSON("./tango.json",null,function(data){
			//単語の読み込み待ち
			Array.prototype.fPush=function(){
				for(var i=0,j=arguments.length;i<j;i+=1){
					this[this.length]=arguments[i];
				}
				return this;
			}
			Array.prototype.has = function (str) {
				for (var i = 0, j = this.length; i < j; i += 1) {
					if (this[i] == str) return true
				}
				return false;
			}
			Math.rand=function(num){
				return this.floor(this.random()*num);
			}
			var table = {"0": "0","1": "1","2": "2","3": "3","4": "4","5": "5","6": "6","7": "7","8": "8","9": "9","あ": "a","い": "i","う": "u","え": "e","お": "o","か": "ka","き": "ki","く": "ku","け": "ke","こ": "ko","さ": "sa","し": "si,shi","す": "su","せ": "se","そ": "so","た": "ta","ち": "ti,chi","つ": "tu,tsu","て": "te","と": "to","な": "na","に": "ni","ぬ": "nu","ね": "ne","の": "no","は": "ha","ひ": "hi","ふ": "hu,fu","へ": "he","ほ": "ho","ま": "ma","み": "mi","む": "mu","め": "me","も": "mo","や": "ya","ゆ": "yu","よ": "yo","ら": "ra","り": "ri","る": "ru","れ": "re","ろ": "ro","わ": "wa","を": "wo","ん": "nn","が": "ga","ぎ": "gi","ぐ": "gu","げ": "ge","ご": "go","ざ": "za","じ": "zi,ji","ず": "zu","ぜ": "ze","ぞ": "zo","だ": "da","ぢ": "di","づ": "du","で": "de","ど": "do","ば": "ba","び": "bi","ぶ": "bu","べ": "be","ぼ": "bo","ぱ": "pa","ぴ": "pi","ぷ": "pu","ぺ": "pe","ぽ": "po","じゃ": "ja,zya,jixya,zixya","じゅ": "ju,zyu,jixyu,zixyu","じぇ": "je,zye,jixe,zixe","じょ": "jo,zyo,jixyo,zixyo","てぃ": "thi,texi","てぇ": "the,text","ふぁ": "fa,fuxa,huxa","ふぃ": "fi,fuxi,huxi","ふぇ": "fe,fuxe,huxe","ふぉ": "fo,fuxo,huxo","ゔぁ": "va,vuxa","ゔぃ": "vi,vuxi","ゔ": "vu","ゔぇ": "ve,vuxe","ゔぉ": "vo,vuxo","うぁ": "uxa,wya","うぃ": "wi,uxi,whi","うぇ": "we,uxe,whe","うぉ": "uxo,who","でぃ": "dhi,dexi","ー": "-","-":"-"," ": " ",",": ",",":": ":","(": "(",")": ")","{": "{","}": "}",".": ".","・": "・","!": "!","a": "a","A": "A","b": "b","B": "B","c": "c","C": "C","d": "d","D": "D","e": "e","E": "E","f": "f","F": "F","g": "g","G": "G","h": "h","H": "H","i": "i","I": "I","j": "j","J": "J","k": "k","K": "K","l": "l","L": "L","m": "m","M": "M","n": "n","N": "N","o": "o","O": "O","p": "p","P": "P","q": "q","Q": "Q","r": "r","R": "R","s": "s","S": "S","t": "t","T": "T","u": "u","U": "U","v": "v","V": "V","w": "w","W": "W","x": "x","X": "X","y": "y","Y": "Y","z": "z","Z": "Z","&": "&","。": ".","%":"%"};
			var consonant = {"あ":"","い":"","う":"","え":"","お":"","か": "k","き": "k","く": "k","け": "k","こ": "k","さ": "s","し": "s","す": "s","せ": "s","そ": "s","た": "t","ち": "t","つ": "t","て": "t","と": "t","な": "n","に": "n","ぬ": "n","ね": "n","の": "n","は": "h","ひ": "h","ふ": "h","へ": "h","ほ": "h","ま": "m","み": "m","む": "m","め": "m","も": "m","や": "y","ゆ": "y","よ": "y","ら": "r","り": "r","る": "r","れ": "r","ろ": "r","わ":"w","が": "g","ぎ": "g","ぐ": "g","げ": "g","ご": "g","ざ": "z","じ": "z,j","ず": "z","ぜ": "z","ぞ": "z","だ": "d","ぢ": "d","づ": "d","で": "d","ど": "d","ば": "b","び": "b","ぶ": "b","べ": "b","ぼ": "b","ぱ": "p","ぴ": "p","ぷ": "p","ぺ": "p","ぽ": "p"}
			//consonantは"子音"を意味する;
			var ID=function(selector){
				return window.document.getElementById(selector);
			}
			var moji = function (str, targetPos, pos, key, route) {
				route = route || [null];
				var ok = false,
					newRoute = new Array,
					next = str.charAt(targetPos + 1);
				if (isThis(next) || str.charAt(targetPos) == "っ" || str.charAt(targetPos) == "ん" || str.charAt(targetPos - 1) == "ん") {
					//いまの文字が拗音の場合
					str = getRoman(str, targetPos);
					for (var i = 0, j = str.length; i < j; i += 1) {
						//ルートを決定
						if (str[i].charAt(pos) == key && (route.has(i) || route.has(null))) {
							ok = true;
							if (pos == str[i].length - 1) ok = "end";
							newRoute.fPush(i);
						}
					}
					if (ok) return {
						route: newRoute,
						ok: ok
					}
					return {
						ok: false
					}
				}
				if (table[str.charAt(targetPos)]!=","&&table[str.charAt(targetPos)].indexOf(",") != -1) {
					//拗音を含まない。また、複数のキータイプがある。
					str = table[str.charAt(targetPos)].split(",");
					var newRoute = new Array;
					for (var i = 0, j = str.length; i < j; i += 1) {
						//ルートを決定
						if (str[i].charAt(pos) == key && (route.has(i) || route.has(null))) {
							ok = true;
							if (pos == str[i].length - 1) ok = "end";
							newRoute.fPush(i);
						}
					}
					if (ok) return {
						route: newRoute,
						ok: ok
					}
					return {
						ok: false
					}
				} else {
					//今の文字に拗音を含まない。また、複数のキータイプがない(アルファベットや普通のひらがな)。
					str = getRoman(str, targetPos)[route[0] || 0];
					if (str.charAt(pos) == key) {
						ok = true;
						if (pos == str.length - 1) ok = "end";
					}
					return {
						route: [null],
						ok: ok
					}
				}
			}
			var showRoman = function (nexts) {
				//ローマ字の表示
				$kanji.html(nexts[0]);
				$hira.html(nexts[1]);
				nexts=nexts[1];
				for (var i = 0, j = nexts.length, result = ""; i < j;) {
					var next = nexts.charAt(i + 1) || "";
					if (i != 0) result += "<div>" + getRoman(nexts, i)[0].replace(/ /g, "&nbsp;") + "</div>" //ローマ字部分
					else result += "<div class=\"now\">" + getRoman(nexts, i)[0].replace(/ /g, "&nbsp;") + "</div>" //ローマ字部分
					if (isThis(next) || nexts.charAt(i) == "っ") {
						i += 2;
						if (isThis(nexts.charAt(i))) i += 1
					} else i += 1;
				}
				if($roman.is(".closed")){
					$roman.html(result + "<div id=\"close\">▼</div>").addClass("closed");
				}else{
					$roman.html(result + "<div id=\"close\">▲</div>").removeClass("closed");
				}
			}
			var changeRoman = function (nexts, targetPos, pos) {
				var next=getRoman(nexts, targetPos)[target.route[0] || 0];
				$roman.find("div.now").html("<span class=\"red\">" + next.slice(0, pos).replace(/ /g, "&nbsp;") + "</span>" + next.slice(pos).replace(/ /g, "&nbsp;"));
			}
			var getRoman = function (str, targetPos) {
				//ローマ字の取得
				var next = str.charAt(targetPos + 1),
					result = new Array;
				if (isThis(next) || str.charAt(targetPos) == "っ" || str.charAt(targetPos) == "ん") {
					var consonantAdd = function (a, b) {
						//拗音(="っ"とか"ぁ"とか小さいやつ)のローマ字取得
						if (table[str.charAt(targetPos) + next])
							result = table[str.charAt(targetPos) + next].split(",") //テーブルにあればそこから
						else {
							//なければ、引数から組む。
							if (consonant[str.charAt(targetPos)].indexOf(",") != -1)
								for (var i = 0, j = consonant[str.charAt(targetPos)].split(",").length; i < j; i++)
									result.fPush(consonant[str.charAt(targetPos)].split(",")[i] + a,consonant[str.charAt(targetPos)].split(",")[i] + b); //こっちは入力法がいろいろあるパターン()
							else result = [consonant[str.charAt(targetPos)] + a, consonant[str.charAt(targetPos)] + b];
						}
					}
					if (str.charAt(targetPos) == "っ") {
						//いまの文字が「っ」の場合、テーブルを作成
						if (consonant[next].indexOf(",") == -1 && !isThis(str.charAt(targetPos + 2))) result = [consonant[next] + consonant[next] + table[next].charAt(table[next].length - 1), "xtu" + table[next], "xtsu" + table[next]];
						else {
							result = new Array;
							if (isThis(str.charAt(targetPos + 2))) {
								//拗音の処理
								targetPos += 1;
								next=str.charAt(targetPos + 1);
								var addStr=[];
								
								if(next=="ぃ") addStr=["yi","ixi"];
								else if(next=="ぇ") addStr=["ye","ixe"];
								else if(next=="ゃ") addStr=["ya","ixya"];
								else if(next=="ゅ") addStr=["yu","ixyu"];
								else if(next=="ょ") addStr=["yo","ixyo"];
								consonantAdd(addStr[0],addStr[1]);
								
								targetPos -= 1;
								next=str.charAt(targetPos + 1);
								for (var i = 0, j = consonant[next].split(","), k = j.length; i < k; i += 1) {
									for (var ii = 0, jj = result.length; ii < jj; ii += 1) {
										result.fPush("xtu" + result[ii],"xtsu" + result[ii]);
										result[ii] = j[i] + result[ii];
									}
								}
							} else {
								for (var i = 0, j = consonant[next].split(","), k = j.length; i < k; i += 1) result.fPush(j[i] + j[i] + table[next].charAt(table[next].length - 1),"xtu" + table[next],"xtsu" + table[next]);
							}
						}
					} else if (str.charAt(targetPos) == "ん") {
						if (next != "" && (consonant[next] != "n" && consonant[next] != "" && consonant[next] != "y" || consonant[next] == undefined)) result = ["n"];
						else result = ["nn"]; //こっちはnの数の判定
					} else {
						var addStr=["",""];
						if(next=="ぃ")addStr=["yi","ixi"];
						else if(next=="ぇ") addStr=["ye","ixe"];
						else if(next=="ゃ") addStr=["ya","ixya"];
						else if(next=="ゅ") addStr=["yu","ixyu"];
						else if(next=="ょ") addStr=["yo","ixyo"];
						else result = table[str.charAt(targetPos) + next].split(",");
						if(addStr[0]!="") consonantAdd(addStr[0],addStr[1]);
					}
				} else result = table[str.charAt(targetPos)]!=","?table[str.charAt(targetPos)].split(","):table[str.charAt(targetPos)];
				if (str.charAt(targetPos - 1) == "ん") {
					//こっちはnを足す
					if (consonant[str.charAt(targetPos)] != "n" && consonant[str.charAt(targetPos)] != "") {
						result = getRoman(str.slice(targetPos), 0);
						for (var i = 0, j = result.length; i < j; i += 1) result.fPush("n" + result[i]);
					}
				}
				return result;
			} //getRoman終わり
			var isThis = function (next) {
				if (next == "ぁ" || next == "ぃ" || next == "ぅ" || next == "ぇ" || next == "ぉ" || next == "ゃ" || next == "ゅ" || next == "ょ") return true;
				return false;
			}
			var targetStr=data,
				TheYukari = false,
				m = Math,
				target={
					strPos: 0,
					pos: 0,
					now: m.rand(targetStr.length),
					route:[null]
				},
				miss = 0,
				collect = 0,
				started=false,
				$kanji = $(ID("kanji")),
				$hira = $(ID("hiragana")),
				$misses = $(ID("miss")),
				$collects = $(ID("collect")),
				$roman = $(ID("roman")),
				time=0;
			targetStr.bsearch=function(key){
				var that=this,start=0,end=that.length,mid,m=Math;
				while(start<=end){
					mid=m.floor((start+end)/2);
					if(that[mid][0]>key){
						end=mid-1;
					}
					if(that[mid][0]<key){
						start=mid+1;
					}
					if(that[mid][0]==key) return mid;
				}
			}
			//文字列の検証
/*			console.log("start");
			for (var k = 0,l = targetStr.length; k < l; k += 1) {
				try {
					showRoman(targetStr[k])
				} catch (h$$4) {
					console.log(targetStr[k][1])
					for (var ii = 0, jj = targetStr[k][1].length; ii < jj; ii++) {
						var c;
						loop: {
							c = targetStr[k][1].charAt(ii);
							for (var i = 0, j = table.length; i < j; i++) if (c == table[i]) {
								c = true;
								break loop;
							}
							c = false;
						}
						if(c) console.log("\u300c" + targetStr[k][1].charAt(ii) + "\u300d\u3068\u3044\u3046\u6587\u5b57\u304c\u3042\u308a\u307e\u3059\u3002")
					}
					console.log(k);
					break
				}
				if(k == l- 1) console.log("\u554f\u984c\u306f\u3042\u308a\u307e\u305b\u3093\u3002")
			};
			console.log("end")
			//文字列の検証*/
			$kanji.text("スペースキーでスタート");
			var pressStart=function(e){
				if(e.keyCode==32){
					started=true;
					$(window).off("keydown",pressStart)
					showRoman(targetStr[target.now]);
					setInterval(function(){
						time+=100;
						$(ID("typingSpeed")).text((m.round(collect/(time/1000)*100)/100)+"回/秒");
					},100);
					$roman.on("click", "#close", function () {
						if ($roman.is(".closed")) {
							$(ID("close")).text("▲")
							$roman.removeClass("closed")
						} else {
							$(ID("close")).text("▼")
							$roman.addClass("closed")
						}
					})
					$(window).on("keydown", function (e) {
						var next = targetStr[target.now][1].charAt(target.strPos + 1),
							results, key = String.fromCharCode(e.keyCode);
						if (e.which == 16 || e.which == 91 || e.ctrlKey || e.metaKey) return; //シフトキーを押したとき(押しっぱなしはOK)、コントロールキーを押したとき、コントロールキーが押されているときはパス。
						if (e.shiftKey) {
							if (e.which>57&&e.which<219) key=key.toUpperCase();
							else{
								switch(e.which){
									case 49:key = "!";break; //感嘆符の処理
									case 53:key="%";break;
									case 54:key= "&";break; //&の処理
									case 56:key= "(";break; //初めかっこの処理
									case 57:key= ")"; break;//終わりかっこの処理
									case 219:key= "{"; break;//初め波かっこの処理
									case 221:key= "}"; break;//終わり波かっこの処理
									default:key = key.toUpperCase();
								}
							}
						} else {
							if (e.which>32&&e.which<186) key=key.toLowerCase();
							else {
								switch(e.which){
									case 32:key = " ";break; //スペースキー
									case 186:key = ":";break; //コロンの処理
									case 188:key = ",";break; //コンマの処理
									case 189:key = "-";break; //のばし音の処理
									case 190:key = ".";break; //ドットの処理
									case 191:key = "・";break; //中点の処理
									default: key = key.toLowerCase();
								}
							}
						}
						results = moji(targetStr[target.now][1], target.strPos, target.pos, key, target.route);
						if (results["ok"] == false) {
							miss += 1;
							$misses.text("ミス:" + miss);
						} else {
							collect += 1;
							$collects.text("打鍵数:" + collect);
							target.pos += 1;
							target.route = results["route"];
							if (results["ok"] == "end") {
								//文字列を次に進める
								changeRoman(targetStr[target.now][1], target.strPos, target.pos) //ローマ字を表示
								next = targetStr[target.now][1].charAt(target.strPos + 1);
								$roman.find("div.now").removeClass("now").next().addClass("now")
								if (isThis(next) || targetStr[target.now][1].charAt(target.strPos) == "っ") {
									target.strPos += 2;
									if (isThis(targetStr[target.now][1].charAt(target.strPos))) target.strPos += 1; //「っちゃ」とかの時は「ゃ」がターゲットとなるから、進める。
								} else target.strPos += 1; //普通のとき
	
								if (target.strPos >= targetStr[target.now][1].length) {
									if (!TheYukari) target.now=m.rand(targetStr.length);
			
									target.strPos = 0;
									showRoman(targetStr[target.now]);
								}
								target.route = [null]
								target.pos = 0;
							}
							changeRoman(targetStr[target.now][1], target.strPos, target.pos) //ローマ字部分
							$hira.html("<span class=\"red\">" + $hira.text().slice(0, target.strPos) + "</span>" + $hira.text().slice(target.strPos))
							return false;
						}
					})
					return false;
				}
			}
			$(window).on("keydown",function(e){
				if ((e.ctrlKery && !e.metaKey || !e.ctrlKey && e.metaKey) && e.keyCode == 89 && e.shiftKey) {
					//コード反転 裏コード ザ・ユカリ!!
					
					TheYukari = !TheYukari;
					if (TheYukari){
						//ユカリモードに入ったときの処理
						$("body").addClass("TheYukari");
						target.now=targetStr.bsearch("結月ゆかり");
					}else{
						//ユカリモードを抜けたときの処理
						$("body").removeClass("TheYukari");
						target.now=m.rand(targetStr.length);
					}
					if(started) showRoman(targetStr[target.now]);
					target.route = [null];
					target.pos = 0;
					return false;
				}
			}).on("keydown",pressStart);
		})
	})
})(this, jQuery)
