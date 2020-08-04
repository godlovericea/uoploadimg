<template>
    <transition name="fade-transform" mode="out-in">
        <div class="request-loading-component" v-if="requestLoading">
            <svg-icon icon-class="loading" />
        </div>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'RequestLoading',
    computed: {
        ...mapGetters([
            'requestLoading'
        ])
    }
}
</script>

<style lang="stylus" scoped>
.request-loading-component {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999999;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 150px;
    background-color: transparent;
}
</style>
