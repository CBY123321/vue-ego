<template>
  <div>
    <div class="header">顶部区域</div>
    <!-- 路由出口 -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  background: skyblue;
}
</style>
