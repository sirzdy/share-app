<template>
    <section class="app" id="app">
        <transition name="tfade" mode="out-in">
            <router-view>
            </router-view>
        </transition>
    </section>
</template>

<script>
export default {
    name: "app",
    data() {
        return {};
    },
    created() {}
};
</script>

<style>
.app {
    height: 100%;
}
.tfade-enter-active,
.tfade-leave-active {
    transition: opacity 0.1s;
}
.tfade-enter,
.tfade-leave-active {
    opacity: 0;
}
</style>
