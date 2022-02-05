<template>
  <div class="layout">
    <!-- 左侧导航区域 -->
    <MyMenu class="menu" />
    <Content class="content" :class="{ isActive: isCollapse }" />
  </div>
</template>

<script>
import bus from "./eventBus";
import MyMenu from "./Mymenu.vue";
import Content from "./Content.vue";
export default {
  components: {
    MyMenu,
    Content,
  },
  data() {
    return {
      isCollapse: true,
    };
  },
  created() {
    bus.$on("share", (val) => {
      this.isCollapse = val;
    });
  },
};
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  background-color: #fafafa;
  .menu {
    // width: 200px;
    height: 100%;
    background-color: #999;
    position: fixed;
    top: 0;
    left: 0;
  }
  .content {
    width: 100%;
    margin-left: 200px;
  }
  .isActive {
    margin-left: 64px;
  }
}
</style>
