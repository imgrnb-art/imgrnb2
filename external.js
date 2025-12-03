(function() {
    // 追加用の親コンテナを作成
    const multiUrlContainer = document.createElement('div');
    multiUrlContainer.id = 'multi-url-box';
    multiUrlContainer.style.padding = '10px';
    multiUrlContainer.style.border = '1px solid #666';
    multiUrlContainer.style.marginTop = '10px';

    // 折り畳みボタン
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = '複数URL登録 ▼';
    toggleBtn.style.marginBottom = '8px';
    toggleBtn.style.width = '100%';
    toggleBtn.onclick = () => {
        if (multiUrls.style.display === 'none') {
            multiUrls.style.display = 'block';
            toggleBtn.textContent = '複数URL登録 ▲';
        } else {
            multiUrls.style.display = 'none';
            toggleBtn.textContent = '複数URL登録 ▼';
        }
    };
    multiUrlContainer.appendChild(toggleBtn);

    const multiUrls = document.createElement('div');
    multiUrls.style.display = 'none';
    multiUrls.style.marginTop = '8px';
    multiUrlContainer.appendChild(multiUrls);

    // URLボックスを最大5つ作成
    const urlBoxes = [];
    for (let i = 0; i < 5; i++) {
        const wrapper = document.createElement('div');
        wrapper.style.marginBottom = '4px';
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';

        const label = document.createElement('span');
        label.textContent = `URL ${i + 1}:`;
        label.style.width = '60px';
        label.style.fontSize = '0.9em';

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'ここにURLを入力';
        input.style.flex = '1';
        input.style.marginRight = '4px';

        const btn = document.createElement('button');
        btn.textContent = '末尾に追加';
        btn.style.flex = '0';
        btn.onclick = () => {
            if (input.value.trim()) {
                const urlInput = document.getElementById('mediaurl');
                urlInput.value = input.value.trim();
                document.getElementById('queue_end').click();
                input.value = '';
            }
        };

        wrapper.appendChild(label);
        wrapper.appendChild(input);
        wrapper.appendChild(btn);
        multiUrls.appendChild(wrapper);
        urlBoxes.push(input);
    }

    // まとめて追加ボタン
    const addAllBtn = document.createElement('button');
    addAllBtn.textContent = '5つまとめて末尾に追加';
    addAllBtn.style.marginTop = '8px';
    addAllBtn.style.width = '100%';
    addAllBtn.onclick = () => {
        urlBoxes.forEach(input => {
            if (input.value.trim()) {
                const urlInput = document.getElementById('mediaurl');
                urlInput.value = input.value.trim();
                document.getElementById('queue_end').click();
                input.value = '';
            }
        });
    };
    multiUrls.appendChild(addAllBtn);

    // ページに追加（右コントロール下）
    const rightControls = document.getElementById('rightcontrols');
    rightControls.appendChild(multiUrlContainer);
})();
