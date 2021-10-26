<template>
    <div class="wrapper">
        <van-button type="primary">默认按钮</van-button>
        <van-search value="1231" placeholder="请输入搜索关键词"/>
        <van-area title="标题" :area-list="areaList" />
        <div class="box"></div>
    </div>
</template>

<script>
export default {
    name: 'Vant',
    data() {
        return {
            areaList: {
                province_list: {
                    110000: '北京市',
                    120000: '天津市'
                },
                city_list: {
                    110100: '北京市',
                    120100: '天津市'
                },
                county_list: {
                    110101: '东城区',
                    110102: '西城区'
                    // ....
                }
            }
        }
    },
    mounted() {

    },
    methods: {}
}
</script>

<style scoped>
.wrapper {
    width: 750px;
    height: 100%;
    border: 2px solid green;
    box-sizing: border-box;
    margin: 0 auto;
}

.box {
    background: red;
    width: 375px;
    height: 100px;
}

</style>
