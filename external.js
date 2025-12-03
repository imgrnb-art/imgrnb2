// == Cytube 5 URL BOX 一括追加（最新仕様対応版） ==
(function() {
    console.log("[Cytube] Multi URL BOX Loaded");

    const BOX_COUNT = 5; // BOXの数
    const CONTAINER_ID = "multi-url-box"; // 現状 HTML に合わせた ID

    // URL から type を自動判定
    function detectMediaType(url) {
        if (/youtube\.com|youtu\.be/.test(url)) return "yt";
        if (/nicovideo\.jp/.test(url)) return "nicovideo";
        // 他サービス追加可能
        return null; // サポートなし
    }

    function addUI() {
        const container = document.getElementById(CONTAINER_ID);
        if (!container) {
            console.log("[Cytube] #multi-url-box が見つからず待機…");
            return;
        }

        // 既存内容をクリア
        container.innerHTML = "";

        const wrapper = document.createElement("div");
        wrapper.style.padding = "10px";
        wrapper.style.border = "1px solid #666";
        wrapper.style.marginTop = "10px";

        const title = document.createElement("h3");
        title.textContent = "複数URL登録";
        wrapper.appendChild(title);

        const boxes = [];
        for (let i = 0; i < BOX_COUNT; i++) {
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = `URL ${i + 1}`;
            input.style.width = "100%";
            input.style.marginBottom = "4px";
            boxes.push(input);
            wrapper.appendChild(input);
        }

        const regBtn = document.createElement("button");
        regBtn.textContent = "順番に登録";
        regBtn.style.marginTop = "8px";
        wrapper.appendChild(regBtn);

        container.appendChild(wrapper);

        // 登録処理
        regBtn.onclick = () => {
            const urls = boxes.map(b => b.value.trim()).filter(Boolean);
            if (urls.length === 0) return alert("URLを1つ以上入力してください");

            urls.forEach(url => {
                const type = detectMediaType(url);
                if (!type) {
                    console.warn("[Cytube] 未対応メディア:", url);
                    alert("未対応のメディアタイプです: " + url);
                    return;
                }

                try {
                    socket.emit("playlistAdd", {
                        pos: "end",
                        type: type,
                        url: url
                    });
                    console.log("[Cytube] 追加:", url);
                } catch (e) {
                    console.error("[Cytube] 追加失敗:", url, e);
                    alert("追加に失敗したURLがあります: " + url);
                }
            });

            alert(`${urls.length} 件のURLを追加しました`);
        };

        console.log("[Cytube] 5 BOX UI added!");
    }

    // DOM が作られるまで監視して追加
    const observer = new MutationObserver(() => {
        if (document.getElementById(CONTAINER_ID)) {
            addUI();
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
