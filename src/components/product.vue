<template>
  <div>
    <div style="padding:10px 20px;text-align:left;" v-if="$store.state.admin=='false'">
      <router-link to="/home/product/addProduct">
        <el-button size="small" @click="addProduct">添加</el-button>
      </router-link>
    </div>
    <el-table :data="tableData" stripe style="width: 100%" align="center">
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column prop="full_name" label="基金产品全称" width="200"></el-table-column>
      <el-table-column prop="short_name" label="基金产品简称" width="150"></el-table-column>
      <el-table-column prop="prod_count" label="产品数量" width="150"></el-table-column>
      <el-table-column prop="prod_scale" label="产品规模" width="200"></el-table-column>
      <el-table-column prop="warning_line" label="预警线" width="150"></el-table-column>
      <el-table-column prop="winding_line" label="风控线" width="150"></el-table-column>
      <el-table-column prop="date_establishment" label="产品成立时间" width="300"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template scope="scope">
          <router-link to="/home/product/editProduct">
          <el-button type="primary" size="small" icon="edit" @click="editProduct(scope.$index,tableData)" :disabled="$store.state.admin=='true'"></el-button>
          </router-link>
          <el-button type="primary" size="small" icon="delete" @click.native.prevent="delProduct(scope.$index, tableData)" :disabled="$store.state.admin=='true'"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"
      :current-page="currentPage"
      :page-sizes="pageSize"
      :total="total">
    </el-pagination>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
    <hr>
      <router-view :listId="listId" v-if="listId||listId==''" v-on:close="closeDialog"></router-view>
    </el-dialog>
  </div>
</template>

<script>
  import api from '../axios.js'
  export default {
    data() {
      return {
        tableData: [],
        currentPage: 1,
        dialogFormVisible: false,
        title: '',
        pageSize: [],
        total: 0,
        listId: null,
        form: null
      }
    },
    beforeCreate(){
      if(this.$store.state.admin=='true'&&!this.$store.state.id){
        api.getAllProd(10,1).then((response) => {
          this.getData(response);
        });
      }else if(this.$store.state.admin=='true'&&this.$store.state.id){
        let id = this.$store.state.id;
        api.getIdProd(id,10,1).then((response) => {
          this.getData(response);
        });
      }else{
        api.getProduct(10,1).then((response) => {
          this.getData(response);
        });
      }
    },
    methods: {
      getData: function(response){
        if(response){
          if(response.status === 401){
            this.$router.push('/login');
            //可以把无效的token清楚掉
            this.$store.dispatch('UserLogout');
          }else{
            let resp = response.data.items;
            this.tableData = resp;
            this.currentPage =  response.data.page;
            this.pageSize = [response.data.per_page];
            this.total = response.data.total;
            this.pages = response.data.pages;
          }
        }
      },
      closeDialog(clo,res){
        this.dialogFormVisible = clo;
        if(res==="success"){
          api.getProduct(10,this.currentPage).then((response) => {
            this.getData(response);
          });
        }
      },
      addProduct(){
        this.dialogFormVisible = true;
        this.listId = '';
        this.title = '新增';
      },
      editProduct(index,rows) {
        this.dialogFormVisible = true;
        this.listId = rows[index].id;
        this.title = '编辑';
      },
      delProduct(index,rows) {
        let id = rows[index].id;
        api.delProduct(id)
        .then(response => {
          rows.splice(index, 1);
          this.$message({
            type: 'success',
            message: '删除成功'
          });
        }).catch((err) => {
          console.log(err);
        })
      },
      handleSizeChange(val) {

      },
      handleCurrentChange(val) {
        if(this.$store.state.admin=='true'&&!this.$store.state.id){
          api.getAllProd(10,val).then((response) => {
            this.getData(response);
          });
        }else if(this.$store.state.admin=='true'&&this.$store.state.id){
          let id = this.$store.state.id;
          api.getIdProd(id,10,val).then((response) => {
            this.getData(response);
          });
        }else{
          api.getProduct(10,val).then((response) => {
            this.getData(response);
          });
        }
      }
    }
  }
</script>

<style>
  .el-pagination {
    margin-top: 20px;
  }
  .el-dialog__body {
      padding: 10px 20px 30px;
      color: #48576a;
      font-size: 14px;
  }
  hr {
    margin-bottom: 20px;
  }
</style>




