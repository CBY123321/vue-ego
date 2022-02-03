<template>
  <div style="text-align: center; margin: 20px">
    <el-pagination
      background
      :page-size="pageSize"
      layout="total, prev, pager, next,jumper"
      :total="total"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: "",
    };
  },
  props: {
    total: {
      type: Number,
      default: 100,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
    },
  },
};
</script>

<style></style>
