<template>
    <div>
        <input type="file" @change="handleFileChange" id="file">
        <button @click="haha">确认</button>
    </div>
</template>

<script>
export default {
    name: 'Redirect',
    methods: {
        haha () {
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        },
        handleFileChange (e) {
            console.log(e)
        }
    }
}
</script>
