<template>
    <el-form ref="form" :model="form" label-width="100px" :fules="rules">
        <el-col :span="12">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" @change="dateChange"  style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="最高学历" prop="education_highest">
                <el-input v-model="form.education_highest"></el-input>
            </el-form-item>
            <el-form-item label="利益冲突" prop="conflict">
                <el-input v-model="form.conflict"></el-input>
            </el-form-item>
            <el-form-item label="从业年限" prop="year_start_related_industry">
                <el-input type="number" v-model="form.year_start_related_industry"></el-input>
            </el-form-item>
            <el-form-item label="过往从业经历" prop="desc_past_job">
                <el-input type="textarea" v-model="form.desc_past_job"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="性别" prop="sex">
                <el-radio class="radio" v-model="form.sex" label="1">男</el-radio>
                <el-radio class="radio" v-model="form.sex" label="2">女</el-radio>
            </el-form-item>
            <el-form-item label="当前职位" prop="position">
                <el-input v-model="form.position"></el-input>
            </el-form-item>
            <el-form-item label="毕业院校" prop="university_graduated">
                <el-input v-model="form.university_graduated"></el-input>
            </el-form-item>
            <el-form-item label="最近一次收到处罚" prop="punishment">
                <el-input v-model="form.punishment"></el-input>
            </el-form-item>
            <el-form-item label="占股比例" prop="share_held">
                <el-input type="number" v-model="form.share_held"></el-input>
            </el-form-item>
            <el-form-item label="历史业绩" prop="desc_hist_achievement">
                <el-input type="textarea" v-model="form.desc_hist_achievement"></el-input>
            </el-form-item>
        </el-col>
        <el-col>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">提交</el-button>
                <el-button @click="resetForm('form')">取消</el-button>
            </el-form-item>
        </el-col>
    </el-form>             
</template>

<script>
    import api from '../axios.js'
    export default {
        props: ['listId'],
        data() {
            return {
                form: {
                    "id": "",
                    "name": "",
                    "sex": "",
                    "birthday": "",
                    "position": "",
                    "education_highest": "",
                    "university_graduated": "",
                    "year_start_related_industry": "",
                    "share_held": "",
                    "desc_past_job": "",
                    "desc_hist_achievement": "",
                    "punishment": "",
                    "conflict": "",
                    "mgrcomp_id": "" 
                },
                dialogFormVisible: null,
                rules: { //验证规则
                    desc_hist_achievement: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    university_graduated: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    share_held: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    year_start_related_industry: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    conflict: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    punishment: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    desc_past_job: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    name: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    birthday: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    sex: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    education_highest: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    position: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ]
                },
                id: null
            }
        },
        created(){
            api.getStaffId(this.listId).then((response) => {
                if(response){
                    if(response.status === 401){
                        this.$router.push('/login');
                        //可以把无效的token清楚掉
                        this.$store.dispatch('UserLogout');
                    }else{
                        this.form = response.data;
                        console.log(this.form)
                        if(this.form.sex){
                            this.form.sex = '1';
                        }else{
                            this.form.sex = '2';
                        }
                    }
                }
            });
        },
        watch: {
            'listId': function(){
                if(this.listId){
                    api.getStaffId(this.listId).then((response) => {
                        if(response){
                            if(response.status === 401){
                                this.$router.push('/login');
                                //可以把无效的token清楚掉
                                this.$store.dispatch('UserLogout');
                            }else{
                                this.form = response.data;
                                if(this.form.sex){
                                    this.form.sex = '1';
                                }else{
                                    this.form.sex = '2';
                                }
                            }
                        }
                    });
                }
            }
        },
        methods: {
            dateChange(val){
                this.form.birthday = val;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.form.sex = Number(this.form.sex);
                        this.form.share_held = Number(this.form.share_held);
                        let opt = this.form;
                        let id = this.form.id;
                        api.setStaff(id,opt)
                        .then(response => {
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            });
                            //移除节点
                            this.dialogFormVisible = false;
                            this.$emit("close",this.dialogFormVisible,"success");
                        }).catch((err) => {
                            console.log(err);
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: 'error'
                        });
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
                this.$emit("close",this.dialogFormVisible);
            }
        }
    }
</script>

<style scoped>

</style>




