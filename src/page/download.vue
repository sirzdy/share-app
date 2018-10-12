<template>
    <section class="container">
        <div class="refresh" @click="refresh">刷新</div>
        <iframe width="100%" height="100%" class="iframe" name="iframe" frameborder="0" :src="src"></iframe>
    </section>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            src: ""
        };
    },
    created() {
        axios
            .get("/getDownloadPort", {})
            .then(response => {
                this.src =
                    window.location.protocol +
                    "//" +
                    window.location.hostname +
                    ":" +
                    response.data.downloadPort;
            })
            .catch(function(error) {
                alert(error);
            });
    },
    methods: {
        refresh() {
            this.src = this.src + "?" + Date.now();
        }
    }
};
</script>
<style scoped>
.container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #eee;
}
.refresh {
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
</style>
