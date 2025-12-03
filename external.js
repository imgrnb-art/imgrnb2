// == Cytube 5 URL BOX 一括追加（CSS強化版） ==
(function() {
    console.log("[Cytube] Multi URL BOX Loaded");

    // ★ BOXの数を自由に変更可能
    const BOX_COUNT = 5;

    function addUI() {
        // 既にUIがある場合はスキップ
        if(document.getElementById("multi-url-boxes")) return;

        // 「動画を追加」ボタンを取得
        const addBtn = document.getElementById("add-video-btn"); 
        if(!addBtn){
            console.log("[Cytube] #add-video-btn が見つからず待機…");
            setTimeout(addUI, 1000);
            return;
        }

        // UIコンテナ作成
        const container = document.createElement("div");
        container.id = "multi-url-boxes";
        container.style.display = "inline-flex";
        container.style.flexDirection = "row";
        container.style.alignItems = "center";
        container.style.marginLeft = "6px";

        // BOX作成
        const boxes = [];
        for(let i=0; i<BOX_COUNT; i++){
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = `URL ${i+1}`;
            // Cytube ボタン風スタイルに合わせる
            input.style.height = "28px";
            input.style.fontSize = "12px";
            input.style.marginRight = "4px";
            input.style.padding = "2px 4px";
            input.style.borderRadius = "3px";
            input.style.border = "1px solid #888";
            input.style.width = "150px";
            boxes.push(input);
            container.appendChild(input);
        }

        // 登録ボタン作成（Cytube風）
        const regBtn = document.createElement("button");
        regBtn.textContent = "順番に追加";
        regBtn.className = "btn"; // Cytube の既存ボタンのクラスを継承
        regBtn.style.height = "28px";
        regBtn.style.fontSize = "12px";
        container.appendChild(regBtn);

        // 「動画を追加」ボタンの右横に挿入
        addBtn.parentNode.insertBefore(container, addBtn.nextSibling);

        // 登録処理
        regBtn.onclick = () => {
            const urls = boxes.map(b => b.value.trim()).filter(Boolean);
            if(urls.length === 0) return alert("URLを1つ以上入力してください");

            urls.forEach(url => {
                socket.emit("playlistAdd", { pos: "end", src: url });
            });

            alert(`${urls.length} 件のURLを追加しました`);
        };
    }

    // DOMが準備できてからUIを追加
    setTimeout(addUI, 2000);
})();
