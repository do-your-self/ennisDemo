<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column type="index" width="200" header-align="center"></el-table-column>
      <el-table-column prop="username" label="用户名" width="300" header-align="center"></el-table-column>
      <el-table-column prop="comp_name" label="公司名称" width="300" header-align="center"></el-table-column>
      <el-table-column prop="create_time" label="注册时间" width="340" header-align="center"></el-table-column>
      <el-table-column prop="active" label="激活" width="200" :formatter="isAct" header-align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150" header-align="center">
        <template scope="scope">
          <el-button type="primary" size="small" icon="delete" @click.native.prevent="delUser(scope.$index, tableData)"></el-button>
        </template>
      </el-table-column>
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
        loading: true,
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
      isAct(data){
        return data.active?'是':'否';
      },
      getData: function(response){
        if(response){
          if(response.status === 401){
            this.$router.push('/login');
            //可以把无效的token清楚掉
            this.$store.dispatch('UserLogout');
          }else{
            let resp = response.data.items;
            this.loading = false;
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
          api.delUser(id)
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
      delUser(index,rows) {
        let id = rows[index].id;
        this.open(index,rows,id);
      },
      handleSizeChange(val) {

      },
      handleCurrentChange(val) {
        this.loading=true;
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




