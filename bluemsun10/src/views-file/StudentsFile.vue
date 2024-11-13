<template>
    <div class="growth-file">
      <div class="header">
        <div class="title"><h1>个人成长档案</h1></div>
        <div class="welcome"><p>{{ welcomeMessage }}</p></div>
      </div>
      <div class="content">
        <div class="tabs">
          <button
            :class="{ active: currentTab === 'personalInfo' }"
            @click="currentTab = 'personalInfo'"
          >
            个人信息
          </button>
          <button
            :class="{ active: currentTab === 'disciplinaryAction' }"
            @click="currentTab = 'disciplinaryAction'"
          >
            个人处分
          </button>
          <button
            :class="{ active: currentTab === 'rewards' }"
            @click="currentTab = 'rewards'"
          >
            个人奖励
          </button>
          <button
            :class="{ active: currentTab === 'socialExperience' }"
            @click="currentTab = 'socialExperience'"
          >
            社会经历
          </button>
        </div>
        <div class="tab-content">
            <div class="information" v-if="currentTab === 'personalInfo'">
              <h2>个人信息</h2>
              <div  class="personal-info">
                <div class="infor1">
                  <p>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：{{ studentInfo.name|| '无'  }}</p>
                  <p>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：{{ studentInfo.studentId || '无' }}</p>
                  <p>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：{{ studentInfo.gender|| '无'  }}</p>
                  <p>民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族：{{ studentInfo.nationality|| '无'  }}</p>
                  <p>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：{{ studentInfo.degree|| '无'  }}</p>
                  <p>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级：{{ studentInfo.grade|| '无'  }}</p>
                  <p>专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业：{{ studentInfo.major|| '无'  }}</p>
                  
                </div>
                <div class="infor2">
                  <p>入学时间：{{ studentInfo.admissionDate|| '无'  }}</p>
                  <p>政治面貌：{{studentInfo.political|| '无' }}</p>
                  <p>婚姻状况：{{ studentInfo.marry|| '无'  }}</p>
                  <p>公&nbsp;&nbsp;寓&nbsp;&nbsp;楼:{{ studentInfo.apartment || '无' }}</p>
                  <p>寝&nbsp;&nbsp;室&nbsp;&nbsp;号：{{ studentInfo.dormitory|| '无'  }}</p>
                  <p>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件:{{ studentInfo.email|| '无'  }}</p>
                  <p>手&nbsp;&nbsp;机&nbsp;&nbsp;号：{{ studentInfo.telephone || '无' }}</p>
                  

                </div>
                <div class="infor3">
                  <p>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;院:{{ studentInfo.college|| '无'  }}</p>
                  <p>生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日：{{ studentInfo.birthday|| '无'  }}</p>
                  <p>家庭住址：{{ studentInfo.homeAddress || '无' }}</p>
                  <p>资助等级：{{ studentInfo.fundType || '无' }}</p>
                  <p>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：{{ studentInfo.status || '无' }}</p>
                </div>
              </div>
              <!-- 个人信息编辑对话框 -->
              <div v-if="showEditDialog" class="overlay">
                <div v-if="showEditDialog" class="edit-dialog">
                  <div class="dialog-content">
                    <p id="dialog-title">编辑个人信息</p>
                    <h3>个人基本信息</h3>
                    <div class="basicIn">
                      <div class="context">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：{{ studentInfo.name|| '无' }}</div>
                      <div class="context">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：{{ studentInfo.studentId || '无' }}</div>
                      <div class="context">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：{{ studentInfo.gender || '无' }}</div>
                      <div class="context">民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族：{{ studentInfo.nationality || '无' }}</div>
                      <div class="context">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级：{{ studentInfo.grade || '无' }}</div>
                      <div class="context">出生日期：{{ studentInfo.birthday || '无' }}</div>
                    </div>
                    <h3>更改个人信息</h3>
                    <div class="change">
                      <div class="changeInfor"><span>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</span><input type="text" v-model="editInfo.degree" placeholder="学位" /></div>
                      <div class="changeInfor"><span>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级：</span><input type="text" v-model="editInfo.grade" placeholder="学制" /></div>
                      <br>
                      <div class="changeInfor"><span>政治面貌：</span><input type="text" v-model="editInfo.political" placeholder="政治面貌" /></div>
                      <div class="changeInfor"><span>婚姻状况：</span><input type="text" v-model="editInfo.marry" placeholder="婚姻状况" /></div>
                      <br>
                      <div class="changeInfor"><span>公&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;寓：</span><input type="text" v-model="editInfo.apartment" placeholder="公寓" /></div>
                      <div class="changeInfor"><span>宿&nbsp;&nbsp;舍&nbsp;&nbsp;号：</span><input type="text" v-model="editInfo.dormitory" placeholder="宿舍号" /></div>
                      <br>
                      <div class="changeInfor"><span>家庭住址：</span><input type="text" v-model="editInfo.homeAddress" placeholder="家庭住址" /></div>
                      <div class="changeInfor"><span>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;院：</span><input type="text" v-model="editInfo.college" placeholder="学院" /></div>
                      <br>
                      <div class="changeInfor"><span>手&nbsp;&nbsp;机&nbsp;&nbsp;号：</span><input type="text" v-model="editInfo.telephone" placeholder="手机号" /></div>
                      <div class="changeInfor"><span>专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业：</span><input type="text" v-model="editInfo.major" placeholder="专业" /></div>
                      </br>
                      <div class="changeInfor"><span>E&nbsp;&nbsp;-&nbsp;&nbsp;mail   ：</span><input type="text" v-model="editInfo.email" placeholder="e-mail" /></div>
                      <div class="changeInfor"><span>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</span><input type="text" v-model="editInfo.status" placeholder="状态" /></div>
                    </div>
                    <el-button class="btn" type="primary" plain  @click="saveEditInfo">保存</el-button>
                    <el-button class="btn" type="primary" plain @click="showEditDialog = false">取消</el-button>
                  </div>
                </div>
              </div>
               <!-- 修改个人信息按钮 -->
               <el-button  class="btn" type="primary" plain @click="showEditDialog = true">修改个人信息</el-button>
            </div>
            <div v-if="currentTab === 'disciplinaryAction'">
                <h2>个人处分</h2>
                <table class="infor-table">
                  <thead>
                    <tr>
                      <th>处分ID</th>
                      <th>类别</th>
                      <th>原因</th>
                      <th>处分时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="fundPunishVo && fundPunishVo.length === 0">
                      <td class="no-infor" colspan="4"><p>无处分信息</p></td>
                    </tr>
                    <tr v-for="punish in fundPunishVo" :key="punish.id" :class="{'even-row': index % 2 === 0}">
                      <td>{{ punish.userId || '无' }}</td>
                      <td>{{ punish.category || '无' }}</td>
                      <td>{{ punish.reason || '无' }}</td>
                      <td>{{ punish.punishTime || '无' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- 个人奖励信息表格 -->
              <div v-if="currentTab === 'rewards'">
                <h2>个人奖励</h2>
                <table class="infor-table">
                  <thead>
                    <tr>
                      <th>用户ID</th>
                      <th>类型</th>
                      <th>授予日期</th>
                      <th>金额</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="fundScholarshipVo && fundScholarshipVo.length === 0">
                      <td class="no-infor" colspan="4"><p>无奖励信息</p></td>
                    </tr>
                    <tr v-for="scholarship in fundScholarshipVo" :key="scholarship.id" :class="{'even-row': index % 2 === 0}">
                      <td>{{ scholarship.userId || '无' }}</td>
                      <td>{{ scholarship.type || '无' }}</td>
                      <td>{{ scholarship.grantDate || '无' }}</td>
                      <td>{{ scholarship.amount || '无' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            <div v-if="currentTab === 'socialExperience'">
              <h2>社会经历</h2>
              <!-- 社会经历信息表格 -->
              <table class="infor-table">
                <thead>
                  <tr>
                    <th>开始日期</th>
                    <th>结束日期</th>
                    <th>经历描述</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="(socialExperienceVo && socialExperienceVo.length=== 0)">
                    <td class="no-infor" colspan="4"><p>无社会经历信息</p></td>
                  </tr>
                  <tr v-for="project in socialExperienceVo" :key="project.id">
                    <td>{{ project.startDate || '无' }}</td>
                    <td>{{ project.endDate || '无' }}</td>
                    <td>{{ project.experience || '无' }}</td>
                  </tr>
                </tbody>
              </table>
            <!-- 社会经历信息录入表单 -->
              <!-- 添加经历按钮 -->
              <el-button class="btn2" type="primary" plain @click="showAddExperienceDialog = true">添加经历</el-button>
              <!-- 添加经历对话框 -->
            <div v-if="showAddExperienceDialog" class="overlay">
              <div class="edit-dialog add-dialog">
                <div class="dialog-content">
                  <p id="dialog-title">添加社会经历</p>
                  <div class="change2">
                    <div class="changeInfor2">开始日期：<input  v-model="newExperience.startDate" placeholder="yyyy-MM-dd" /></div>
                    <div class="changeInfor2">结束日期：<input  v-model="newExperience.endDate" placeholder="yyyy-MM-dd" /></div>
                    
                    <div class="changeInfor2">经历描述：
                      <br>
                      <textarea v-model="newExperience.experience" style="resize:none;margin-top:10px;" rows="5"  placeholder="经历描述"></textarea></div>
                  </div>
                  <br>
                  <br>
                  <br>
                  <br>
                  <el-button class="btn" type="primary" plain @click="addExperience">保存</el-button>
                  <el-button class="btn" type="primary" plain @click="showAddExperienceDialog = false">取消</el-button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </template>
  
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const studentInfo = ref({});
const currentTab = ref('personalInfo');
const welcomeMessage = ref('您好，欢迎查看个人成长档案');
const fundPunishVo = ref([]); 
const fundScholarshipVo = ref([]); // 奖学金信息
const socialExperienceVo = ref([]); // 社会经历信息
const showEditDialog = ref(false); // 控制编辑对话框显示
const editInfo = ref({
  degree: studentInfo.value.degree || '',
  grade: studentInfo.value.grade || '',
  political: studentInfo.value.political || '',
  marry: studentInfo.value.marry || '',
  apartment: studentInfo.value.apartment || '',
  dormitory: studentInfo.value.dormitory || '',
  homeAddress: studentInfo.value.homeAddress || '',
  college: studentInfo.value.college || '',
  telephone: studentInfo.value.telephone || '',
  major: studentInfo.value.major || '',
  email: studentInfo.value.email || '',
  status: studentInfo.value.status || ''
});
const newExperience = ref({}); // 存储新录入的社会经历信息
const showAddExperienceDialog = ref(false); // 初始值为 false

const authToken = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

const fetchStudentInfo = async () => {
  try {
    const response = await axios.get('http://106.54.24.243:8080/grow/userOwnInfo/list', {
      params: {
      },
    });
    if (response.data.code === 200) {
      studentInfo.value = response.data.data.fundUserInfoVo;
      welcomeMessage.value = `您好，${studentInfo.value.name}！`;
      fundPunishVo.value = response.data.data.fundPunishVo ||[];
      fundScholarshipVo.value = response.data.data.fundScholarshipVo || [];
      socialExperienceVo.value = response.data.data.fundProjectVo || [];
      // 同时更新 editInfo 以保持数据同步
      editInfo.value = {
        degree: studentInfo.value.degree || '',
        grade: studentInfo.value.grade || '',
        political: studentInfo.value.political || '',
        marry: studentInfo.value.marry || '',
        apartment: studentInfo.value.apartment || '',
        dormitory: studentInfo.value.dormitory || '',
        homeAddress: studentInfo.value.homeAddress || '',
        college: studentInfo.value.college || '',
        telephone: studentInfo.value.telephone || '',
        major: studentInfo.value.major || '',
        email: studentInfo.value.email || '',
        status: studentInfo.value.status || ''
      };
      // 更新其他信息
      newExperience.value={
        startDate:newExperience.value.startDate|| '',
        endDate:newExperience.value.endDate|| '',
        experience: newExperience.value.experience|| '',
      }
    }
  } catch (error) {
    console.error('获取学生信息失败', error);
  }
};
onMounted(fetchStudentInfo);

const saveEditInfo = async () => {
  try {
    const response = await axios.post('http://106.54.24.243:8080/grow/userInfo/updateUserInfo', {
      degree: editInfo.value.degree,
      grade: editInfo.value.grade,
      college: editInfo.value.college,
      major: editInfo.value.major,
      email: editInfo.value.email,
      apartment: editInfo.value.apartment,
      dormitory: editInfo.value.dormitory,
      telephone: editInfo.value.telephone,
      homeAddress: editInfo.value.homeAddress,
      political: editInfo.value.political,
      marry: editInfo.value.marry,
      status: editInfo.value.status
    });
    if (response.data.code === 200) {
      console.log('信息更新成功');
      await fetchStudentInfo();
      showEditDialog.value = false; 
    } else {
      console.error('信息更新失败', response.data.msg);
    }
  } catch (error) {
    console.error('请求失败', error);
  }
};
// 修改社会经历

const addExperience= async () => {
  try {
    const response = await axios.post('http://106.54.24.243:8080/grow/project/addProject', {
      startDate:newExperience.value.startDate,
      endDate:newExperience.value.endDate,
      experience: newExperience.value.experience,
    });
    if (response.data.code === 200) {
      console.log('Experience added successfully');
      await fetchStudentInfo();
      showAddExperienceDialog .value = false; 
    } else {
      console.error('信息更新失败', response.data.msg);
    }
  } catch (error) {
    console.error('请求失败', error);
  }
};

</script>
  

<style scoped>
  *{
    margin:0;
    padding:0;
  }
  .growth-file{
    width:80vw;
    padding-left:9vw;
    padding-right:8vw;
  }
  .header{
    height:100px;
    width:80vw;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    color: rgb(51.2, 126.4, 204);
  }
  .header p{
    font-size:15px;
    margin-right:2vw;
    /* color:white; */
  }
  h1{
    line-height:72px;
    text-align: center;
    color: #333;
  }
  .welcome{
    height:10px;
    float:right;
  }
  .growth-file {
    font-family: Arial, sans-serif;
  }
  
  .tabs {
    display: flex;
    margin-bottom: 20px;
    justify-content: center
  }
  
  button {
    padding: 18px 30px;
    margin-right: 15px;
    cursor: pointer;
    background-color: #f0f0f0;
    border: none;
    border-bottom: 2px solid transparent;
    font-size: 15px;
    font-weight:bold;
    margin-top:5vh;
  }
  
  button.active {
    background-color: #e0e0e0;
    border-bottom: 2px solid #007bff;
  }
  
  .content {
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 5px;
  }
  .tab-content{
    width: 76.5vw;
    height:70vh;
    max-height: 75vh; /* 例如，设置最大高度为视口高度的40% */
    overflow: auto; /* 超出部分显示滚动条 */
    overflow-x: hidden; /* 隐藏横向滚动条 */
    background-color:#fafafa;
  }
  .personal-info{
    width: 70vw;
    margin-left:2vw;
    display:flex;
  }
  .infor1{
    display:flex;
    flex-direction: column;
  }
  .infor2{
    display:flex;
    flex-direction: column;
  }
  .infor3{
    display:flex;
    flex-direction: column;
  }
  .infor3 span{
    width:20vw;
  }
  h3{
    text-align: center;
  }
  .personal-info p{
    margin:10px;
    width: 25vw;
  }
  h2{
    margin:25px;
    padding-top:20px;
  }
  /* 表格样式 */


  .infor-table {
    width: 73vw;
    border-collapse: collapse;
  }
 
  .infor-table th,
  .infor-table td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  .no-infor{
    height: 25px;
    vertical-align: middle;
    color: #999;
    font-size: 13px;
  }
  .no-infor p{
    text-align: center;
  }
  table{
    margin-left:1vw;
  }
  /* 编辑对话框样式 */
  .edit-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 60vw;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border: 1px solid #ccc;
    z-index: 100;
  }

  /* 遮罩层样式 */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(31, 31, 31, 0.5);
    z-index: 50;
  }
  #dialog-title{
  /* border-bottom: 2px solid #0d5ccb; */
  line-height: 50px;
  font-size:25px;
  font-weight:bold;
  color:#0d5ccb;
}
.dialog-content h3{
  margin-top:5vh;
  margin-bottom:5vh;
}
.basicIn{
  display:flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  /* border-bottom: #a5a6a6 4px double; */
}
.context{
  width: 21vw;
  margin-right: 0;
  padding:10px;
}
h3{
  padding-top:5px;
}
.change input{
  width: 12vw;
  height: 20px;
  border: 1px solid #a5a6a6;
  border-radius: 5px;
  padding-left: 5px;
  margin-bottom: 10px;
  outline: none;
  box-shadow: 0 0 5px #a5a6a6;
  font-size: 9px;
}
.change{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-direction: row;
}
.changeInfor{
  width: 26vw;
  margin-left:4vw;
  height:45px;
}
.change2{
  display:flex;
  flex-direction: column;
}
.changeInfor2{
  width: 60vw;
  margin-left:4vw;
  height:45px;
  margin-top:10px;
}
.btn{
  float:right;
}
/* 社会经历表格样式 */
.infor-table {
  width: 75vw;
  border-collapse: collapse;
}

.infor-table th,
.infor-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  width: 60px;
}

.infor-table thead {
  background-color: #f2f2f2;
  width: 60px;
}

.infor-table tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}

.infor-table tbody tr:nth-child(even) {
  background-color: #e9e9e9;
}

/* 社会经历表单样式 */
.experience-form {
  margin-top: 20px;
}

.experience-form h3 {
  margin-bottom: 10px;
}

.experience-form input,
.experience-form textarea {
  display: block;
  margin-bottom: 10px;
  padding: 8px;
}

.experience-form button {
  margin-top: 10px;
}
.btn2{
  margin-top:5vh;
  float:right;
}
.add-dialog{
  height: 60vh;
}
.changeInfor2{
  font-size:18px;
}
textarea{
  width: 50vw;

}
</style>