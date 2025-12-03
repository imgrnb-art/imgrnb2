// ======= ロード確認用 =======
console.log("[Cytube] external.js loaded");

// ======= Cytube の準備ができたら UI を追加 =======
function addUI() {
    // すでに UI がある場合はスキップ
    if (document.getElementById("multi-url-box")) return;

    // 挿入先（Cytube の右側のコントロールパネル）
    const target = document.getElementById("videocontrols");
    if (!target) {
        console.log("[Cytube] #videocontrols が見つからず待機…");
        setTimeout(addUI, 1000);
        return;
    }

    // UI の HTML
    const box = document.createElement("div");
    box.id = "multi-url-box";
    box.innerHTML = `
        <div style="padding:10px; border:1px solid #666; margin-top:10px;">
            <h3>複数URL登録</h3>
            <textarea id="multi-url-input"
                style="width:100%; height:100px;"></textarea>
            <button id="multi-url-button" style="margin-top:8px;">
                順番に登録
            </button>
        </div>
    `;

    target.appendChild(box);
    console.log("[Cytube] UI added!");

    // ボタンクリック処理
    document.getElementById("multi-url-button").onclick = () => {
        const text = document.getElementById("multi-url-input").value.trim();
        if (!text) return alert("URL を入力してください");

        const list = text.split("\n").map(s => s.trim()).filter(Boolean);

        // Cytube の addqueue を順番に実行
        list.forEach(url => {
            socket.emit("queue", {
                id: url,
                type: "url",
                pos: "end"
            });
        });

        alert("登録完了！");
    };
}

// DOM ができてから UI を追加
setTimeout(addUI, 2000);
