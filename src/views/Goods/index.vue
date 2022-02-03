<template>
  <div class="goods">
    <!-- 搜索区域 -->
    <div class="header">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary">查询</el-button
      ><el-button type="primary">添加</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="swapper">
      <el-table :data="tableData" border>
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="商品ID" width="100">
        </el-table-column>
        <el-table-column
          prop="title"
          label="商品名称"
          width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="price" label="商品价格" width="100">
        </el-table-column>
        <el-table-column prop="num" label="商品数量" width="100">
        </el-table-column>
        <el-table-column prop="category" label="规格类目" width="100">
        </el-table-column>
        <el-table-column prop="image" label="商品图片" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="sellPoint"
          label="商品卖点"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="180"
          ><el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </el-table-column>
      </el-table>
    </div>
    <MyPagination
      :total="total"
      :pageSize="pageSize"
      @changePage="changePage"
    />
  </div>
</template>

<script>
import MyPagination from "../../components/MyPagination.vue";
import { getList } from "../../api/index.js";
export default {
  components: {
    MyPagination,
  },
  data() {
    return {
      page: 1,
      tableData: [],
      input: "",
      pageSize: 1,
      total: 10,
    };
  },
  methods: {
    changePage(val) {
      this.page = val;
      this.getLists();
    },
    async getLists() {
      try {
        const res = await getList({ page: this.page });
        if (res.status === 200) {
          console.log(res);
          this.tableData = res.data.data;
          this.pageSize = res.data.pageSize;
          this.total = res.data.total;
        }
      } catch (err) {
        console.log(err);
      }
    },
    handleEdit() {},
    deleteEdit() {},
  },
  created() {
    this.getLists();
  },
};
</script>

<style lang="less" scoped>
.goods {
  margin: 20px;
}
.header {
  display: flex;
  button {
    margin-left: 20px;
  }
}
.wrapper {
  margin: 20px 0;
}
</style>
