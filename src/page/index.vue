<template>
    <section class="container">
        <div class="link" @click="goDownload">下载文件</div>
        <div class="link" @click="goUpload">上传文件</div>
        <div class="link">
            <div class="title" @click="goWord">文本传输</div>
            <div v-if="content" class="word_wrap">
                <div class="word" id="content" :data-clipboard-text="content" @click="copy">{{content}}</div>
            </div>
        </div>
    </section>
</template>
<script>
import ClipboardJS from "clipboard";
import utils from "../assets/js/utils.js";

export default {
    data() {
        return {
            content: ""
        };
    },
    mounted() {
        window.socket.on("new message", content => {
            this.content = content;
        });
        window.socket.on("new files", ret => {
            if (ret.length) {
                utils.hint(
                    ret.length == 1
                        ? `【新文件】${ret[0].file.name}`
                        : `上传了${ret.length}个新文件.`
                );
            }
        });
    },
    methods: {
        copy() {
            if (ClipboardJS.isSupported()) {
                new ClipboardJS("#content");
                utils.hint("复制成功");
            } else {
                utils.hint("系统不支持，请手动复制");
            }
        },
        goUpload() {
            this.$router.push({
                name: "upload"
            });
        },
        goWord() {
            this.$router.push({
                name: "word"
            });
        },
        goDownload() {
            this.$router.push({
                name: "download"
            });
        }
    }
};
</script>

<style scoped>
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

.link {
    margin: 0 auto;
    width: 100%;
    flex: 1;
    /* height: 60px; */
    /* line-height: 60px; */
    background: #1296db;
    text-align: center;
    font-size: 28px;
    color: #ffffff;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* margin-bottom: 10px; */
    border-bottom: 5px solid rgba(0, 0, 0, 0.1);
}

.link:last-child {
    border-bottom: none;
}

.title,
.word_wrap {
    flex: 1;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.word {
    background: #056a9e;
    box-sizing: border-box;
    color: #fff;
    /* width: 80%;
    height: 80%; */
    min-width: 50%;
    min-height: 50%;
    max-width: 80%;
    max-height: 80%;
    white-space: pre;
    border: 5px solid #eee;
    border-radius: 10px;
    padding: 5px;
    font-size: 14px;
    overflow: auto;
    text-overflow: scroll;
}
</style>
