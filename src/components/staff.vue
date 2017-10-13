<template>
  <div>
    <div style="padding:10px 20px;text-align:left;" v-if="$store.state.admin=='false'">
      <router-link to="/home/staff/addStaff">
        <el-button size="small" @click="addStaff">添加</el-button>
      </router-link>
    </div>
    <el-table :data="tableData" stripe style="width: 100%" align="center">
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column prop="name" label="姓名" width="150"></el-table-column>
      <el-table-column prop="sex" label="性别" width="140"></el-table-column>
      <el-table-column prop="position" label="当前职位" width="200"></el-table-column>
      <el-table-column prop="birthday" label="生日" width="200"></el-table-column>
      <el-table-column prop="education_highest" label="最高学历" width="200"></el-table-column>
      <el-table-column prop="university_graduated" label="毕业院校" width="200"></el-table-column>
      <el-table-column prop="share_held" label="占股比例" width="200"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template scope="scope">
          <router-link to="/home/staff/editStaff">
          <el-button type="primary" size="small" icon="edit" @click="editStaff(scope.$index,tableData)" :disabled="$store.state.admin=='true'"></el-button>
          </router-link>
          <el-button type="primary" size="small" icon="delete" @click.native.prevent="delStaff(scope.$index, tableData)" :disabled="$store.state.admin=='true'"></el-button>
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
      console.log(!!this.$store.state.admin)
      console.log(!this.$store.state.admin)
        if(this.$store.state.admin=='true'&&!this.$store.state.id){
          api.getAllStaff(10,1).then((response) => {
            this.getData(response);
          });
        }else if(this.$store.state.admin=='true'&&this.$store.state.id){
          let id = this.$store.state.id;
          api.getIdStaff(id,10,1).then((response) => {
            this.getData(response);
          });
        }else{
          api.getStaff(10,1).then((response) => {
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
            for(var i=0;i<resp.length;i++){
              for(var k in resp[i]){
                if(k === 'sex' && resp[i][k] === false){
                  resp[i][k] = '女';
                }else if(k === 'sex' && resp[i][k] === true){
                  resp[i][k] = '男';
                }
              }
            }
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
          api.getStaff(10,this.currentPage).then((response) => {
            this.getData();
          });
        }
      },
      addStaff(){
        this.dialogFormVisible = true;
        this.listId = '';
        this.title = '新增';
      },
      editStaff(index,rows) {
        this.dialogFormVisible = true;
        this.listId = rows[index].id;
        this.title = '编辑';
      },
      delStaff(index,rows) {
        let id = rows[index].id;
        api.delStaff(id)
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
          api.getAllStaff(10,val).then((response) => {
            this.getData(response);
          });
        }else if(this.$store.state.admin=='true'&&!this.$store.state.id){
          let id = this.$store.state.id;
          api.getIdStaff(id,10,val).then((response) => {
            this.getData(response);
          });
        }else{
          api.getStaff(10,val).then((response) => {
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




