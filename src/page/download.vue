<template>
    <div>
        <iframe width="100%" height="100%" class="iframe" ref="iframe" frameborder="0"></iframe>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {};
    },
    created() {
        axios
            .get("/getDownloadPort", {})
            .then(response => {
                this.$refs.iframe.src =
                    window.location.protocol +
                    "//" +
                    window.location.hostname +
                    ":" +
                    response.data.downloadPort;
            })
            .catch(function(error) {
                alert(error);
            });
    }
};
</script>
<style scoped>
.iframe {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
</style>
