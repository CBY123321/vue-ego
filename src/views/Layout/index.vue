<template>
  <div class="layout">
    <!-- 左侧导航区域 -->
    <MyMenu class="menu" />
    <Content class="content" />
  </div>
</template>

<script>
import MyMenu from "./Mymenu.vue";
import Content from "./Content.vue";
export default {
  components: {
    MyMenu,
    Content,
  },
};
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  .menu {
    width: 200px;
    min-height: 500px;
    background-color: #999;
    position: fixed;
    top: 0;
    left: 0;
  }
  .content {
    margin-left: 200px;
  }
}
</style>
