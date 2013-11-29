(function (window) {
	"use strict";

	/**
	 * すべてのクラスを内包するネームスペース
	 * @public
	 * @namespace cavy
	 * @type {Object}
	 */
	window.cavy = window.cavy || {};
	/**
	 * userAgent
	 * @public
	 * @default navigator.userAgent
	 * @type {string}
	 */
	cavy.userAgent = navigator.userAgent;
	var isiOS6 = (cavy.userAgent.search(/OS 6/) !== -1);
	window.requestAnimationFrame = (function (window) {
		var timeout = (function () {
			var lastTime = Date.now(),
				startTime = Date.now();
			return function (callback) {
				var currTime = Date.now(),
					timeToCall = Math.max(0, 16 - (currTime - lastTime));
				lastTime = currTime + timeToCall;
				return window.setTimeout(callback, timeToCall, lastTime - startTime)
			}
		})(window);
		if (isiOS6) {
			return timeout;
		} else {
			return window.webkitRequestAnimationFrame || window.requestAnimationFrame || timeout;
		}
	})(window);
	window.cancelAnimationFrame = (function (window) {
		if (isiOS6) {
			return window.clearTimeout;
		} else {
			return window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.clearTimeout;
		}
	})(window);
	
	/**
	 * Retinaディスプレイ対応
	 * @public
	 * @default false
	 * @type {boolean}
	 */
	cavy.retina = false;
	/**
	 * pixelSnap
	 * @public
	 * @default false
	 * @type {boolean}
	 */
	cavy.pixelSnap = false;
	/**
	 * アニメーションフレームを実時間で調整する
	 * @public
	 * @default true
	 * @type {boolean}
	 */
	cavy.strict = true;
	/**
	 * フレームレート
	 * @public
	 * @default 60
	 * @type {number}
	 */
	cavy.frameRate = 60;
	/**
	 * フレームを飛ばす最大値
	 * @public
	 * @default 60
	 * @type {number}
	 */
	cavy.maxSkip = 60;

	/**
	 * deviceRatio
	 * @public
	 * @default 1
	 * @type {number}
	 */
	cavy.deviceRatio = 1;
	/**
	 * バグ種類別にユーザーエージェントを格納するオブジェクト
	 * @private
	 * @type {object}
	 */
	cavy.bugs = {
		//背景色つけないとcanvas消えちゃう
		background: ["F-06E","L-05E","SC-04E"]
	};

	/**
	 * Canvas外描画を行うかどうか
	 * @type {boolean}
	 */
	cavy.outOfRendering = true;

	/**
	 * Filter機能を使うかどうか
	 * @type {boolean}
	 */
	cavy.useFilter = false;

	/**
	 * canvasの背景色（色を何かしらつけないと一部のAndroid端末で描画されないバグがある）
	 * @default "rgba(255,255,255,0.01)"
	 * @type {string}
	 */
	cavy.backgroundColor = "rgba(255,255,255,0.01)";

    /**
     * アクセス端末に指定したバグがあるかどうか
	 * @private
     * @param type {string} バグタイプを表す文字列
     * @returns {boolean}
     */
    cavy.isBuggyDevice = function(type) {
        var bug = cavy.bugs[type];
        if (!bug) { return false; }
        var l = bug.length;
        while(l--) {
            if (cavy.userAgent.search(bug[l]) !== -1) {
                return true;
            }
        }
        return false;
    };
	/**
	 * Retinaディスプレイかどうかを返却
	 * @public
	 * @return {boolean}
	 */
	cavy.isRetina = function() {
		if (window.devicePixelRatio !== 1) {
			return true;
		}
		return false;
	};
	/**
	 * ネームスペースをすべてwindowに書き出す
	 * @public
	 */
	cavy.expand = function () {
		for (var key in this) {
			window[key] = this[key];
		}
	};
})(window);