<template>
    <div>
        <button @click="haha">确认</button>
    </div>
</template>

<script>
export default {
    name: 'Redirect',
    methods: {
        haha () {
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        }
    }
}
</script>
