<template>
  <div class="addGood">
    <!-- 添加面包屑 -->
    <div class="bread">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/goods' }"
          >商品管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ title }}商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="form">
      <el-form
        :model="goodsForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="类目选择" prop="category">
          <el-button
            type="primary"
            style="margin-right: 20px"
            @click="dialogVisible = true"
            >类目选择</el-button
          >{{ this.goodsForm.category }}
        </el-form-item>
        <el-form-item label="商品名称" prop="title"
          ><el-input v-model="goodsForm.title"></el-input
        ></el-form-item>
        <el-form-item label="商品价格" prop="price"
          ><el-input v-model="goodsForm.price"></el-input
        ></el-form-item>
        <el-form-item label="商品数量" prop="num"
          ><el-input v-model="goodsForm.num"></el-input
        ></el-form-item>
        <el-form-item label="商品卖点" prop="sellPoint"
          ><el-input v-model="goodsForm.sellPoint"></el-input
        ></el-form-item>
        <el-form-item label="商品图片" prop="image"
          ><el-button type="primary" @click="dialogImg = true"
            >上传图片</el-button
          ><img
            style="margin-left: 30px"
            height="200px"
            :src="goodsForm.image"
            alt=""
        /></el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <div id="main"></div>
        </el-form-item>
        <el-form-item
          ><el-button type="primary" @click="submitForm('ruleForm')"
            >立即{{ title }}</el-button
          >
          <el-button @click="resetForm('ruleForm')"
            >重置</el-button
          ></el-form-item
        >
      </el-form>
    </div>
    <!-- 商品类目 -->
    <el-dialog title="类目选择" :visible.sync="dialogVisible" width="50%">
      <el-tree
        :props="props"
        :load="loadNode"
        lazy
        accordion
        @node-click="getData"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 上传图片 -->
    <el-dialog title="上传图片" :visible.sync="dialogImg" width="50%">
      <el-upload
        class="upload-demo"
        ref="upload"
        :on-success="getPic"
        action="http://localhost:8000/api/upload"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="small" type="primary"
          >选取文件</el-button
        >
        <el-button
          style="margin-left: 10px"
          size="small"
          type="success"
          @click="submitUpload"
          >上传到服务器</el-button
        > </el-upload
      ><span slot="footer" class="dialog-footer">
        <el-button @click="dialogImg = false">取 消</el-button>
        <el-button type="primary" @click="dialogImg = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import E from "wangeditor";
import { add, goodsAdd, goodsEdit } from "../../api/index.js";
export default {
  data() {
    return {
      title: "添加",
      editor: "",
      fileList: "",
      props: {
        label: "name",
      },
      dialogVisible: false,
      dialogImg: false,
      goodsForm: {
        id: "",
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        desc: "",
        category: "",
        cid: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        num: [{ required: true, message: "请输入数量", trigger: "blur" }],
      },
    };
  },
  created() {
    if (this.$route.query.row) {
      this.title = "编辑";
      this.goodsForm = this.$route.query.row;
      this.$nextTick(() => {
        this.editor.txt.html(this.$route.query.row.desc);
      });
    }
    console.log(this.$route);
  },
  // watch: {
  //   "this.goodsForm"(val) {
  //     console.log(val);
  //     this.goodsForm = val;
  //   },
  // },
  mounted() {
    this.editor = new E("#main");
    // 或者 const editor = new E( document.getElementById('div1') )
    this.editor.config.onchange = (newHtml) => {
      this.goodsForm.desc = newHtml;
    };
    // 配置触发 onchange 的时间频率，默认为 200ms
    this.editor.config.onchangeTimeout = 500; // 修改为 500ms
    this.editor.create();
  },
  methods: {
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(async (valid) => {
        if (valid) {
          if (this.$route.query.row) {
            try {
              let {
                id,
                title,
                price,
                num,
                sellPoint,
                image,
                desc,
                category,
                cid,
              } = this.goodsForm;
              await goodsEdit({
                id,
                title,
                price,
                num,
                sellPoint,
                image,
                desc,
                category,
                cid,
              });
            } catch (error) {
              console.log(error);
            }
          } else {
            try {
              console.log(this.goodsForm);
              let { title, price, num, sellPoint, image, desc, category, cid } =
                this.goodsForm;
              await goodsAdd({
                title,
                price,
                num,
                sellPoint,
                image,
                desc,
                category,
                cid,
              });
            } catch (err) {
              console.log(arr);
            }
          }

          this.$router.push("/goods");
        } else {
          console.log("err!!");
          return false;
        }
      });
    },

    getPic(response, file, fileList) {
      let imgUrl = "http://localhost:8000/" + response.url.slice(7);
      console.log(imgUrl);
      this.goodsForm.image = imgUrl;
      //   http://localhost:8000/1644074112455-1.jpg
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    getData(data) {
      this.goodsForm.category = data.name;
    },

    async loadNode(node, resolve) {
      console.log(node);
      if (node.level === 0) {
        const res = await add({ id: 1 });
        return resolve(res.data.result);
      }
      if (node.level >= 1) {
        const res2 = await add({ id: node.data.cid });
        this.goodsForm.cid = node.data.id;
        // console.log(res2);
        if (res2.data.status == 200) return resolve(res2.data.result);
        else return resolve([]);
      }
    },
    resetForm(goodsForm) {
      this.$refs[goodsForm].resetFields();
      this.editor.txt.clear();
    },
  },
};
</script>

<style lang="less" scoped>
.addGood {
  margin: 20px;
}
.bread {
  padding: 10px;
  background-color: #fff;
  border: 1px solid #eee;
  margin-bottom: 20px;
}
.form {
  background-color: #fff;
  padding: 20px;
  padding-right: 30px;
}
</style>
