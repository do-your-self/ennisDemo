<template>
  <div >
    <div style="padding:10px 20px;text-align:left;" v-if="$store.state.admin=='false'">
      <router-link to="/home/stg/addStg">
        <el-button size="small" @click="addStg">添加</el-button>
      </router-link>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index" width="100" header-align="center"></el-table-column>
      <el-table-column prop="stg_type" label="策略类型" width="400" header-align="center"></el-table-column>
      <el-table-column prop="product_count" label="产品数量" width="300" header-align="center"></el-table-column>
      <el-table-column prop="scale" label="规模" width="300" header-align="center"></el-table-column>
      <el-table-column prop="scale_ceiling" label="规模上限" width="300" header-align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150" header-align="center">
        <template scope="scope">
          <router-link to="/home/stg/editStg">
          <el-button type="primary" size="small" icon="edit" @click="editStg(scope.$index,tableData)" :disabled="$store.state.admin=='true'"></el-button>
          </router-link>
          <el-button type="primary" size="small" icon="delete" @click.native.prevent="delStg(scope.$index, tableData)" :disabled="$store.state.admin=='true'&&$store.state.id!='null'"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="pageSize"
      :total="total">
    </el-pagination>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="closeDialog">
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
        loading: true,
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
      if(this.$store.state.admin=='true'&&this.$store.state.id=='null'){
        api.getAllStg(10,1).then((response) => {
          this.getData(response);
        });
      }else if(this.$store.state.admin=='true'&&this.$store.state.id!='null'){
        let id = this.$store.state.id;
        api.getIdStg(id,10,1).then((response) => {
          this.getData(response);
        });
      }else{
        api.getStg(10,1).then((response) => {
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
            this.loading = false;
            let resp = response.data.items;
            for(var i=0; i<resp.length;i++){
              resp[i].scale_ceiling=Math.round(resp[i].scale_ceiling* 100) / 100;
            }
            this.tableData = resp; 
            this.currentPage =  response.data.page;
            this.pageSize = [response.data.per_page];
            this.total = response.data.total;
            this.pages = response.data.pages;
          }
        }
      },
      open(index,rows,id) {
        this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.delStg(id)
          .then(response => {
            rows.splice(index, 1);
            this.$message({
              type: 'success',
              message: '删除成功'
            });
          }).catch((err) => {
            console.log(err);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      closeDialog(res,msg){
        this.dialogFormVisible = false;
        this.$router.push('/home/stg');
        if(res==="success"){
          this.$message({
            type: 'success',
            message: msg
          });
          api.getStg(10,this.currentPage).then((response) => {
            this.getData(response);
          });
        }
      },
      addStg(){
        this.dialogFormVisible = true;
        this.listId = '';
        this.title = '新增';
      },
      editStg(index,rows) {
        this.dialogFormVisible = true;
        this.listId = rows[index].id;
        this.title = '编辑';
      },
      delStg(index,rows) {
        let id = rows[index].id;
        this.open(index,rows,id);
      },
      handleSizeChange(val) {

      },
      handleCurrentChange(val) {
        if(this.$store.state.admin=='true'&&this.$store.state.id=='null'){
          api.getAllStg(10,val).then((response) => {
            this.getData(response);
          });
        }else if(this.$store.state.admin=='true'&&this.$store.state.id!='null'){
          let id = this.$store.state.id;
          api.getIdStg(id,10,val).then((response) => {
            this.getData(response);
          });
        }else{
          api.getStg(10,val).then((response) => {
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
  tr {
    cursor: pointer; 
  }
</style>




