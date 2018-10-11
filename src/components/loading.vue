<template>
    <div class="container">
        <section class="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </section>
    </div>
</template>
<style scoped>
.container {
    z-index: 999;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
}
.loading {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 60px;
}
.loading span {
    display: inline-block;
    width: 8px;
    height: 100%;
    border-radius: 4px;
    background: lightgreen;
    -webkit-animation: loading 1s ease-in-out infinite;
    -moz-animation: loading 1s ease-in-out infinite;
    -ms-animation: loading 1s ease-in-out infinite;
    -o-animation: loading 1s ease-in-out infinite;
    animation: loading 1s ease-in-out infinite;
}

@-webkit-keyframes loading {
    0%,
    100% {
        height: 40px;
        background: lightgreen;
    }
    50% {
        height: 70px;
        margin: -15px 0;
        background: lightblue;
    }
}

@-moz-keyframes loading {
    0%,
    100% {
        height: 40px;
        background: lightgreen;
    }
    50% {
        height: 70px;
        margin: -15px 0;
        background: lightblue;
    }
}

@-ms-keyframes loading {
    0%,
    100% {
        height: 40px;
        background: lightgreen;
    }
    50% {
        height: 70px;
        margin: -15px 0;
        background: lightblue;
    }
}

@-o-keyframes loading {
    0%,
    100% {
        height: 40px;
        background: lightgreen;
    }
    50% {
        height: 70px;
        margin: -15px 0;
        background: lightblue;
    }
}

@keyframes loading {
    0%,
    100% {
        height: 40px;
        background: lightgreen;
    }
    50% {
        height: 70px;
        margin: -15px 0;
        background: lightblue;
    }
}

.loading span:nth-child(2) {
    -webkit-animation-delay: 0.2s;
    -moz-animation-delay: 0.2s;
    -ms-animation-delay: 0.2s;
    -o-animation-delay: 0.2s;
    animation-delay: 0.2s;
}

.loading span:nth-child(3) {
    -webkit-animation-delay: 0.4s;
    -moz-animation-delay: 0.4s;
    -ms-animation-delay: 0.4s;
    -o-animation-delay: 0.4s;
    animation-delay: 0.4s;
}

.loading span:nth-child(4) {
    -webkit-animation-delay: 0.6s;
    -moz-animation-delay: 0.6s;
    -ms-animation-delay: 0.6s;
    -o-animation-delay: 0.6s;
    animation-delay: 0.6s;
}

.loading span:nth-child(5) {
    -webkit-animation-delay: 0.8s;
    -moz-animation-delay: 0.8s;
    -ms-animation-delay: 0.8s;
    -o-animation-delay: 0.8s;
    animation-delay: 0.8s;
}
</style>
