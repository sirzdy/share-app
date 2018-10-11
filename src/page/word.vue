<template>
    <section class="container">
        <section class="fn">
            <div class="dates">
                <input class="date" type="date" ref="startDate">
                <input class="date" type="date" ref="endDate">
            </div>
            <div class="btn" @click="getTexts">查询</div>
        </section>
        <section class="body">
            <div v-if="newTexts && newTexts.length" class="texts">
                <div class="text_date">新增</div>
                <div class="text" v-for="(r,index) in newTexts" :key="index" ref="newTexts">
                    <div class="text_con">{{r[1]}}</div>
                    <div class="text_fn">
                        <div class="text_fn_time">{{r[0]|getTime}}</div>
                        <img class="text_fn_copy" :data-clipboard-text="r[1]" src="../assets/image/copy.png" alt="" @click="copy(this)">
                    </div>
                </div>
            </div>
            <div v-for="(item,idx) in texts" class="texts" :key="idx">
                <div class="text_date">{{ item.date }}</div>
                <div class="text" v-for="(r,index) in item.res" :key="index">
                    <div class="text_con">{{r[1]}}</div>
                    <div class="text_fn">
                        <div class="text_fn_time">{{r[0]|getTime}}</div>
                        <img class="text_fn_copy" :data-clipboard-text="r[1]" src="../assets/image/copy.png" alt="" @click="copy()">
                    </div>
                </div>
            </div>
        </section>
        <section class="fn">
            <textarea name="" class="content" ref="textarea"></textarea>
            <div class="btn" @click="addText">发送</div>
        </section>
    </section>
</template>
<script>
import ClipboardJS from "clipboard";
import axios from "axios";
import utils from "../assets/js/utils.js";
export default {
    name: "word",
    data() {
        return {
            texts: [],
            newTexts: []
        };
    },
    mounted() {
        this.$refs.startDate.value = this.getDate(new Date());
        this.$refs.endDate.value = this.getDate(new Date());
        this.getTexts();

        window.socket.on("new message", content => {
            this.newTexts.unshift([Date.now(), content]);
        });
    },
    filters: {
        getTime: function(date) {
            date = new Date(Number(date));
            return `${date
                .getHours()
                .toString()
                .padStart(2, "0")}:${date
                .getMinutes()
                .toString()
                .padStart(2, "0")}:${date
                .getSeconds()
                .toString()
                .padStart(2, "0")}`;
        }
    },
    methods: {
        getDate(date) {
            return `${date
                .getFullYear()
                .toString()
                .padStart(4, "0")}-${(date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${date
                .getDate()
                .toString()
                .padStart(2, "0")}`;
        },
        copy() {
            if (ClipboardJS.isSupported()) {
                new ClipboardJS(".text_fn_copy");
                utils.hint("复制成功");
            } else {
                utils.hint("系统不支持，请手动复制");
            }
        },
        addText() {
            let content = this.$refs.textarea.value;
            if (!content) {
                utils.hint("请输入内容！", "fail");
                return;
            }
            axios
                .post("/addText", {
                    content
                })
                .then(response => {
                    if (response.data.state) {
                        utils.hint("发送成功!!!");
                        this.newTexts.unshift([Date.now(), content]);
                    } else {
                        utils.hint(response.data.error, "fail");
                    }
                })
                .catch(function(error) {
                    alert(error);
                });
        },
        getTexts() {
            let startDate = this.$refs.startDate.value;
            let endDate = this.$refs.endDate.value;
            axios
                .get("/getTexts", {
                    params: {
                        startDate,
                        endDate
                    }
                })
                .then(response => {
                    let texts = response.data.texts;
                    texts.forEach(x => x.res.sort((a, b) => b[0] - a[0]));
                    texts.sort((a, b) => (a.date > b.date ? -1 : 1));
                    this.texts = texts;
                })
                .catch(function(error) {
                    alert(error);
                });
        }
    }
};
</script>
<style scoped>
* {
    box-sizing: border-box;
}
.container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #eee;
}

.fn {
    padding: 5px;
    margin: 0 auto;
    width: 100%;
    height: 60px;
    background: #1296db;
    text-align: center;
    font-size: 28px;
    color: #ffffff;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.dates {
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.date {
    text-align: center;
    height: 100%;
    flex: 1;
    border: none;
    background: transparent;
    outline: none;
    color: #fff;
    font-size: 14px;
}
.btn {
    width: 100px;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
}

.body {
    flex: 1;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto；;
}

.content {
    width: 100%;
    flex: 1;
    height: 100%;
    resize: none;
    border: none;
    outline: none;
    background: transparent;
    color: #fff;
    font-family: Microsoft Yahei;
    font-size: 14px;
}
.send {
    width: 50px;
    height: 100%;
    line-height: 50px;
    border-left: 1px solid #eee;
}

.texts {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 5px;
    width: 100%;
    align-items: center;
}
.text_date {
    height: 30px;
    background: #fff;
    padding: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    white-space: pre;
    font-weight: bold;
    margin: 5px;
}
.text {
    width: 100%;
    background: #fff;
    border-radius: 10px;
    padding: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    white-space: pre;
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
}
.text_con {
    padding: 5px;
    white-space: normal;
    word-wrap: break-word;
    overflow: auto;
    text-overflow: ellipsis;
}
.text_fn {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    color: #cdcdcd;
}

.text_fn_copy {
    width: 20px;
    height: 20px;
}
</style>

