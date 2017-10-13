<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%" align="center">
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column prop="id" label="Id" width="200"></el-table-column>
      <el-table-column prop="username" label="用户名" width="200"></el-table-column>
      <el-table-column prop="comp_name" label="公司名称" width="100"></el-table-column>
      <el-table-column prop="create_time" label="注册时间" width="200"></el-table-column>
      <el-table-column prop="active" label="激活" width="200"></el-table-column>
<!--       <el-table-column fixed="right" label="操作" width="200">
        <template scope="scope">
          <el-button type="primary" size="small" icon="delete" @click.native.prevent="delStaff(scope.$index, tableData)"></el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"
      :current-page="currentPage"
      :page-sizes="pageSize"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import api from '../axios.js'
  export default {
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pageSize: [],
        total: 0,
        form: null
      }
    },
    beforeCreate(){      
      api.getUser(10,1).then((response) => {
        this.getData(response);
      });
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
      // delStaff(index,rows) {
      //   let id = rows[index].id;
      //   api.delStaff(id)
      //   .then(response => {
      //     rows.splice(index, 1);
      //     this.$message({
      //       type: 'success',
      //       message: '删除成功'
      //     });
      //   }).catch((err) => {
      //     console.log(err);
      //   })
      // },
      handleSizeChange(val) {

      },
      handleCurrentChange(val) {
        api.getUser(10,val).then((response) => {
          this.getData(response);
        });
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




