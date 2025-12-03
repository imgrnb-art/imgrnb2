// 各ボタンにクリックイベントを追加
document.querySelectorAll('.multi-url-add').forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        const urlInput = document.querySelectorAll('.multi-url-input')[idx];
        const url = urlInput.value.trim();
        if (!url) return alert('URLを入力してください');

        // Cytube の「末尾に追加」関数を呼び出す
        try {
            queueAddEnd(url); // Cytube標準関数。必要に応じて開始位置やオプションも追加可能
            urlInput.value = ''; // 入力後クリア
        } catch (e) {
            console.error('動画追加エラー', e);
            alert('動画を追加できませんでした');
        }
    });
});
