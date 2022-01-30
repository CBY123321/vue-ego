<template>
  <div>
    <div class="header">
      <i
        v-if="Collapse"
        class="iconfont icon-shuangxianyoujiantou"
        @click="changeCollapse"
      ></i
      ><i
        v-else
        class="iconfont icon-shuangxianzuojiantou"
        @click="changeCollapse"
      ></i>
    </div>
    <!-- 路由出口 -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import bus from "./eventBus";
export default {
  data() {
    return {
      Collapse: true,
    };
  },
  methods: {
    changeCollapse() {
      this.Collapse = !this.Collapse;
      bus.$emit("share", this.Collapse);
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  line-height: 60px;
  color: #122a57;
  background: #00ada2;
  .iconfont {
    font-size: 24px;
  }
}
</style>
