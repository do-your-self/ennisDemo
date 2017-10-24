<template>                
    <el-form ref="form" :model="form" label-width="150px" :rules="rules">
        <el-col :span="18" :offset="2">
            <el-form-item label="产品" prop="prod_id">
                <el-select v-model.number="form.prod_id" filterable placeholder="请选择" style="width:100%" no-match-text="无匹配数据,请添加一个产品">
                    <el-option v-for="item in list" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="策略类型" prop="stg_type">
                <el-select v-model="form.stg_type" placeholder="请选择策略类型" style="width:100%">
                    <el-option label="股票多空" value="股票多空"></el-option>
                    <el-option label="量化对冲" value="量化对冲"></el-option>
                    <el-option label="债券" value="债券"></el-option>
                    <el-option label="套利" value="套利"></el-option>
                    <el-option label="CTA" value="CTA"></el-option>
                    <el-option label="宏观对冲" value="宏观对冲"></el-option>
                    <el-option label="另类策略" value="另类策略"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="产品数量" prop="year_start_backtesting">
                <el-input v-model="form.year_start_backtesting"><template slot="append">只</template></el-input>
            </el-form-item>
            <el-form-item label="规模" prop="year_end_backtesting">
                <el-input v-model="form.year_end_backtesting"><template slot="append">万</template></el-input>
            </el-form-item>
            <el-form-item label="策略占比区间">
                <el-col :span="11">
                    <el-form-item prop="stg_proportion_from">
                        <el-input type="number" v-model.number="form.stg_proportion_from"></el-input>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-form-item prop="stg_proportion_to">
                        <el-input type="number" v-model.number="form.stg_proportion_to"></el-input>
                    </el-form-item>
                </el-col>    
            </el-form-item>
            <el-form-item label="策略描述" prop="desc">
                <el-input v-model="form.desc"></el-input>
            </el-form-item>
        </el-col>
        <el-col style="padding:20px 0 50px;">
            <el-button type="primary" @click="submitForm('form')">提交</el-button>
            <el-button @click="resetForm('form')">取消</el-button>
        </el-col>
    </el-form>
</template>

<script>
    import api from '../axios.js'
    export default {
        props: ['listId'],
        data() {
            return {
                items: [],
                staff: [],
                list: [],
                form: {
                    "stg_type": "",
                    "year_start_backtesting": "",
                    "year_end_backtesting": "",
                    "stg_proportion_from": "",
                    "stg_proportion_to": "",
                    "desc": "",
                    "prod_id": ""
                },
                rules: { //验证规则
                    stg_type: [
                        { required: true, message: '请选择策略类型', trigger: 'change'}
                    ],
                    year_start_backtesting: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    year_end_backtesting: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    stg_proportion_from: [
                        { type: 'number', required: true, message: '不允许为空和非数字类型的值', trigger: 'blur'}
                    ],
                    stg_proportion_to: [
                        { type: 'number', required: true, message: '不允许为空和非数字类型的值', trigger: 'blur'}
                    ],
                    desc: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    prod_id: [
                        { type: 'number', required: true, message: '请选择产品', trigger: 'change'}
                    ]
                },
                id: null
            }
        },
        mounted() {
            api.getProduct(50,1).then(response => {
                this.states = response.data.items;
                this.list = this.states.map(item => {
                    return { value: item.id, label: item.full_name };
                });
                console.log(this.list)
            }).catch((err) => {
                console.log(err);
            })
        },
        created(){
            api.getProdStgId(this.listId).then((response) => {
                this.getData(response);
            });
        },
        watch: {
            'listId': function(){
                if(this.listId){
                    api.getProdStgId(this.listId).then((response) => {
                        this.getData(response);
                    });
                }
            }
        },
        methods: {
            getData(response){      //拿到返回的数据
                if(response){
                    if(response.status === 401){
                        this.$router.push('/login');
                        //可以把无效的token清楚掉
                        this.$store.dispatch('UserLogout');
                    }else{
                        this.form = response.data;
                    }
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let opt = this.form;
                        let id = this.form.id;
                        api.setProdStg(id,opt)
                        .then(response => {
                            //移除节点
                            this.$emit("close","success","修改成功");
                        }).catch((err) => {
                            console.log(err);
                        })
                        // this.$refs[formName].resetFields();
                    } else {
                        this.$message({
                            type: 'error',
                            message: '请按提示输入合法的值'
                        });
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.$emit("close");
            }
        }
    }
</script>

<style scoped>

</style>




