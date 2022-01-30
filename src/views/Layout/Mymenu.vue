<template>
  <div>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#00ADA2"
      text-color="#122A57"
      active-text-color="#000"
      router
      :collapse="isCollapse"
    >
      <el-menu-item> <span slot="title">易购后台管理系统</span></el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/goods">
        <i class="el-icon-document"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
      <el-menu-item index="/params">
        <i class="el-icon-setting"></i>
        <span slot="title">规格参数</span>
      </el-menu-item>
      <el-menu-item index="/advert">
        <i class="el-icon-setting"></i>
        <span slot="title">广告分类</span>
      </el-menu-item>
      <el-submenu index="/order">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/order/order-list">
            <i class="el-icon-location"></i> <span>订单列表</span></el-menu-item
          >
          <el-menu-item index="/order/order-back">
            <i class="el-icon-location"></i> <span>退货管理</span></el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import bus from "./eventBus";
export default {
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
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  height: 100%;
}
.is-active {
  background-color: #fff !important;
}
</style>
