<template>
    <div>
        <loading v-show="loading" />
        <input ref="input" type="file" value="" multiple style="display: none;" @change="upload()" />
        <section class="container">
            <div id="file" @click="triggerUpload">上传文件</div>
            <ul id="ul">
                <li v-for="(info,index) in infos" :key="index">
                    <h3>{{info.originalname}}</h3>
                    <p>[path] {{info.path}}</p>
                    <p>[size] {{info.size}}bytes</p>
                    <p>[time] {{new Date().toTimeString()}}</p>
                </li>
                <br ref="bot">
            </ul>
        </section>
    </div>
</template>
<script>
import loading from "../components/loading";

export default {
    data() {
        return {
            loading: false,
            infos: []
        };
    },
    components: {
        loading
    },
    methods: {
        triggerUpload() {
            this.$refs.input.click();
        },
        upload() {
            let files = this.$refs.input.files || [];
            if (!files.length || !window.FileReader) {
                alert("浏览器不支持HTML5");
                return false;
            }
            this.loading = true;
            // 创建一个FormData对象,用来组装一组用 XMLHttpRequest发送请求的键/值对
            var fd = new FormData();
            // 把 input 标签获取的文件加入 FromData 中
            for (var i = 0; i < files.length; i++) {
                fd.append("files", files[i]);
            }
            // Ajax
            var request = new XMLHttpRequest();
            request.open("POST", "upload");
            request.send(fd);
            request.onreadystatechange = () => {
                this.loading = false;
                if ((request.readyState === 4) & (request.status === 200)) {
                    var response = JSON.parse(request.responseText);
                    this.infos = [...this.infos, ...response.rets];
                    this.$nextTick(() => {
                        this.$refs.bot.scrollIntoView();
                    });
                }
            };
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

ul {
    list-style: none;
    padding: 0;
    height: 100%;
    flex: 1;
    overflow: auto;
}

li {
    margin: 10px;
    padding: 10px;
    list-style: none;
    overflow: auto;
    background: #ddd;
}

#file {
    margin: 0 auto;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #1296db;
    text-align: center;
    font-size: 28px;
    color: #ffffff;
    cursor: pointer;
}

h3 {
    font-size: 16px;
}

p {
    word-wrap: break-word;
    word-break: break-all;
}
</style>
