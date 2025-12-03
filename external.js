// Cytube 最新仕様対応: textarea 1つから複数 URL を登録
(function() {
    const btn = document.getElementById("multi-url-button");
    const textarea = document.getElementById("multi-url-input");
    if (!btn || !textarea) return;

    function detectType(url) {
        if (/youtube\.com|youtu\.be/.test(url)) return "yt";
        if (/nicovideo\.jp/.test(url)) return "nicovideo";
        return null;
    }

    btn.onclick = () => {
        const urls = textarea.value.split("\n").map(u => u.trim()).filter(Boolean);
        if (urls.length === 0) return alert("URL を 1つ以上入力してください");

        urls.forEach(url => {
            const type = detectType(url);
            if (!type) {
                console.warn("未対応メディア: " + url);
                alert("未対応のメディア: " + url);
                return;
            }
            socket.emit("playlistAdd", { pos: "end", type: type, url: url });
            console.log("追加:", url, "type:", type);
        });

        alert(`${urls.length} 件の URL を追加しました`);
    };
})();
