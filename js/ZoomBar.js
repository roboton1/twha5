'use strict';

function ZoomBar() {
    const zoom_bar = document.getElementById('scale-zoom');
    const cursor = document.getElementById('scale-zoom-cursor');
    let on_changed_handler = null;

    // 「つまみ」を動かす
    function update_cursor() {
        cursor.style.left = (101 - data.zoom * 16) + 'px';
    }

    function zoom_limit() {
        if (data.zoom < 0) {
            data.zoom = 0;
        } else if (data.zoom > 4) {
            data.zoom = 4;
        }
    }

    this.update = update_cursor;

    this.onchanged = function(f) {
        on_changed_handler = f;
    };

    function update_zoom(e) {
        // マウスまたはタッチ座標からつまみ位置を求める
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        data.zoom = Math.floor((116 - clientX) / 16);
        zoom_limit();
        update_cursor();
        if (on_changed_handler) {
            on_changed_handler();
        }
    }

    // マウス操作
    zoom_bar.addEventListener('mousedown', function(e) {
        update_zoom(e);
        document.addEventListener('mousemove', update_zoom);
    });

    // タッチ操作
    zoom_bar.addEventListener('touchstart', function(e) {
        e.preventDefault(); // スクロールを防ぐ
        update_zoom(e);
        document.addEventListener('touchmove', update_zoom);
    });

    // イベントクリーンアップ
    function cleanup() {
        document.removeEventListener('mousemove', update_zoom);
        document.removeEventListener('touchmove', update_zoom);
    }

    document.addEventListener('mouseup', cleanup);
    document.addEventListener('touchend', cleanup);

    update_cursor();
}
