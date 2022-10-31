const App = {
    data() {
        return {
            lists: [],
            textInput: ""
        }
    },
    mounted() {
        if (localStorage.getItem('uuidList') != null) {
            this.lists = JSON.parse(localStorage.getItem('uuidList'));
        }
        this.textInput = generateUuid();
    },
    methods: {
        add() {
            if (this.textInput.length > 0) {
                if (localStorage.getItem('uuidList') != null) {
                    const uuidList = JSON.parse(localStorage.getItem('uuidList'));
                    const id = uuidList.length + 1;
                    const value = this.textInput;
                    addUuidList(uuidList, id, value);
                } else {
                    const uuidList = [];
                    const id = 1;
                    const value = this.textInput;
                    addUuidList(uuidList, id, value);
                }
            }
            this.textInput = generateUuid();
            this.lists = JSON.parse(localStorage.getItem('uuidList'));
        },
        reload() {
            this.textInput = generateUuid();
        },
        clear() {
            if (confirm('一括クリアしてよろしいですか？')) {
                localStorage.removeItem('uuidList');
                this.lists = [];
            }
        },
        copy(event) {
            navigator.clipboard.writeText(event.value)
                .then(() => {
                    const value = event.value;
                    event.value = value + " ← Copied!";
                    setTimeout(() => {
                        event.value = value;
                    }, 1000);
                })
                .catch(e => {
                    console.error(e);
                });
        }
    }
}

Vue.createApp(App).mount('#app');

function addUuidList(uuidList, id, value) {
    uuidList.push({ id: id, value: value });
    localStorage.setItem("uuidList", JSON.stringify(uuidList));
}

function generateUuid() {
    // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
    // const FORMAT: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
    for (let i = 0, len = chars.length; i < len; i++) {
        switch (chars[i]) {
            case "x":
                chars[i] = Math.floor(Math.random() * 16).toString(16);
                break;
            case "y":
                chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
                break;
        }
    }
    return chars.join("");
}