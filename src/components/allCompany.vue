<template>
    <div>
        <el-table :data="tableData" stripe style="width: 100%;" @row-click="link" v-loading="loading">
            <el-table-column type="index" width="100" header-align="center"></el-table-column>
            <el-table-column prop="user" label="投顾公司" width="200" header-align="center"></el-table-column>
            <el-table-column prop="mgrcomp_short_name" label="公司简称" width="200" header-align="center"></el-table-column>
            <el-table-column prop="reg_id" label="协会注册备案号" width="200" header-align="center"></el-table-column>
            <el-table-column prop="address" label="地址" width="250" header-align="center"></el-table-column>
            <el-table-column prop="date_establishment" label="成立时间" width="200" header-align="center"></el-table-column>
            <el-table-column prop="reg_capital" label="注册资本" width="200" header-align="center"></el-table-column>
            <el-table-column prop="num_staff" label="员工数量" width="150" header-align="center"></el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"
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
            dialogFormVisible: false,
            title: '',
            pageSize: [],
            total: 0,
            listId: null,
            form: null,
            col: []
          }
        },
        beforeCreate(){
          api.getAllCompany(10,1).then((response) => {
            this.getData(response);
          });
        },
        methods: {
          getData(response){
            if(response){
              if(response.status === 401){
                this.$router.push('/login');
                //可以把无效的token清楚掉
                this.$store.dispatch('UserLogout');
              }else{
                this.loading = false;
                let resp = response.data.items;
                this.tableData = resp;
                this.currentPage = response.data.page;
                this.pageSize = [response.data.per_page];
                this.total = response.data.total;
                this.pages = response.data.pages;
              }
            }
          },
          closeDialog(clo,res){
            this.dialogFormVisible = clo;
            if(res==="success"){
              api.getAllCompany(10,this.currentPage).then((response) => {
                this.getData(response);
              });
            }
          },
          link(row,event,column){
            if(column.label!="操作"){
              this.$store.dispatch('Id', row.mgrcomp_id);
              this.$router.push({
                path:'/home/company',
                name:'company',
                params:{
                  id:row.mgrcomp_id
                }
              });
            }
          },
          handleSizeChange(val) {

          },
          handleCurrentChange(val) {
            this.loading=true;
            api.getAllCompany(10,val).then((response) => {
              this.getData(response);
            });
          }
        }
    }
</script>

<style>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 600px;
    }
    tr {
      cursor: pointer; 
    }
</style>



