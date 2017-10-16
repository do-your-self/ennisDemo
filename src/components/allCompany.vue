<template>
    <div>
        <el-table :data="tableData" stripe style="width: 100%;text-align: center;" @row-click="link" align="center">
          <!-- <el-table-column v-for="col in cols" :prop="col.prop" :label="col.label" ></el-table-column> -->
            <el-table-column type="index" width="100"></el-table-column>
            <el-table-column prop="user" label="投顾公司" width="150"></el-table-column>
            <el-table-column prop="reg_id" label="协会注册备案号" width="100"></el-table-column>
            <el-table-column prop="address" label="地址" width="150"></el-table-column>
            <el-table-column prop="date_establishment" label="成立时间" width="150"></el-table-column>
            <el-table-column prop="reg_capital" label="注册资本" width="150"></el-table-column>
            <el-table-column prop="shareholder_names" label="股东名单" width="150"></el-table-column>
            <el-table-column prop="num_staff" label="员工数量" width="150"></el-table-column>
            <el-table-column prop="num_rd" label="投研人数" width="150"></el-table-column>
            <el-table-column prop="num_trade" label="交易人员数(含运维)" width="150"></el-table-column>
            <el-table-column prop="num_it" label="IT人数" width="150"></el-table-column>
            <el-table-column prop="num_risk_mgr" label="风控人数" width="150"></el-table-column>
            <el-table-column prop="num_master" label="硕士及以上学历人数" width="150"></el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
              <template scope="scope">
                  <el-button type="primary" size="small" icon="delete" @click.native.prevent="delIdCompany(scope.$index, tableData)"></el-button>
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
                   path:'/home//company',
                   name:'company',
                   params:{
                    id:row.mgrcomp_id
                   }
              });
            }
          },
          delIdCompany(index,rows) {
            let id = rows[index].id;
            api.delIdCompany(id)
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
</style>



