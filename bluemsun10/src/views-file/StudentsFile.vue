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
                <p>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：{{ formatSex(studentInfo.gender)|| '无'  }}</p>
                <p>民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族：{{ formatEthnicGroup (studentInfo.nationality)|| '无'  }}</p>
                <p>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：{{ formatEducation(studentInfo.degree)|| '无'  }}</p>
                <p>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级：{{ formatGrade(studentInfo.grade)|| '无'  }}</p>
                <p>专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业：{{ formatMajor(studentInfo.major)|| '无'  }}</p>
                
              </div>
              <div class="infor2">
                <p>入学时间：{{ studentInfo.admissionDate|| '无'  }}</p>
                <p>政治面貌：{{politicalAppearance(studentInfo.political)|| '无' }}</p>
                <p>婚姻状况：{{ formatMarry(studentInfo.marry)|| '无'  }}</p>
                <p>公&nbsp;&nbsp;寓&nbsp;&nbsp;楼：{{ studentInfo.apartment || '无' }}</p>
                <p>寝&nbsp;&nbsp;室&nbsp;&nbsp;号：{{ studentInfo.dormitory|| '无'  }}</p>
                <p>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：{{ studentInfo.email|| '无'  }}</p>
                <p>手&nbsp;&nbsp;机&nbsp;&nbsp;号：{{ studentInfo.telephone || '无' }}</p>
                

              </div>
              <div class="infor3">
                <p>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;院：{{ formatPoliticalAppearance(studentInfo.college)|| '无'  }}</p>
                <p>生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日：{{ studentInfo.birthday|| '无'  }}</p>
                <p>家庭住址：{{ studentInfo.homeAddress || '无' }}</p>
                <p>资助等级：{{ formatAssistLevel(studentInfo.fundType) || '无' }}</p>
                <p>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：{{ formatStatus(studentInfo.status) || '无' }}</p>
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
                    <div class="context">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：{{ formatSex(studentInfo.gender) || '无' }}</div>
                    <div class="context">民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族：{{ formatEthnicGroup(studentInfo.nationality)|| '无' }}</div>
                    <div class="context">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级：{{ formatGrade(studentInfo.grade) || '无' }}</div>
                    <div class="context">政治面貌：{{ politicalAppearance(studentInfo.political) || '无' }}</div>
                    <div class="context">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;院：{{ formatPoliticalAppearance(studentInfo.college) || '无' }}</div>
                    <div class="context">出生日期：{{ studentInfo.birthday|| '无'  }}</div>
                    <div class="context">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：{{ formatEducation(studentInfo.degree)|| '无'  }}</div>
                    <div class="context">政治面貌：{{ politicalAppearance(studentInfo.political)|| '无'  }}</div>
                    
                   
                  </div>
                  <h3>更改个人信息</h3>
                  <div class="change">
                    <div class="changeInfor"><span>婚姻状况：</span><input type="text" v-model="editInfo.marry" placeholder="婚姻状况" /></div>
                    <div class="changeInfor"><span>公&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;寓：</span><input type="text" v-model="editInfo.apartment" placeholder="公寓" /></div>
                    <br>
                    <div class="changeInfor"><span>宿&nbsp;&nbsp;舍&nbsp;&nbsp;号：</span><input type="text" v-model="editInfo.dormitory" placeholder="宿舍号" /></div>
                    <div class="changeInfor"><span>家庭住址：</span><input type="text" v-model="editInfo.homeAddress" placeholder="家庭住址" /></div>
                    <br>
                    <div class="changeInfor"><span>手&nbsp;&nbsp;机&nbsp;&nbsp;号：</span><input type="text" v-model="editInfo.telephone" placeholder="手机号" /></div>
                    <br>
                    <div class="changeInfor"><span>专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业：</span><input type="text" v-model="editInfo.major" placeholder="专业" /></div>
                    <div class="changeInfor"><span>E&nbsp;&nbsp;-&nbsp;&nbsp;mail   ：</span><input type="text" v-model="editInfo.email" placeholder="e-mail" /></div>
                    <br>
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
                    <td>{{ formatPunishType(punish.category) || '无' }}</td>
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
                    <td>{{ formatFundType(scholarship.type) || '无' }}</td>
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

<!-- <script setup lang="ts">
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
  //
  const response = await axios.get('http://mxt.nat300.top/grow/userOwnInfo/list', {
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
  //const response = await axios.post('http://106.54.24.243:8080/grow/userInfo/updateUserInfo', {
    const response = await axios.post('http://mxt.nat300.top/grow/userInfo/updateUserInfo', {
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
  } 
  else {
    console.error('信息更新失败', response.data.msg);
  }
} 
catch (error) {
  console.error('请求失败', error);
}
};
// 修改社会经历

const addExperience= async () => {
try {
  const response = await axios.post('http://106.54.24.243:8080/grow/project/addProject', {
    //const response = await axios.post('http://mxt.nat300.top/grow/project/addProject', {
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
// 年级
const formatGrade = (grade) => {
const baseYear = 2023;
return `${baseYear - (grade - 1)}级`;
};
// 奖学金类型
const formatFundType = (fundType: number): string => {
switch (fundType) {
  case 0:
    return '国家奖学金';
  case 1:
    return '国家励志奖学金';
  case 2:
    return '学校励志奖学金';
  case 3:
    return '励志学子';
  case 4:
    return '宝钢奖学金';
  case 5:
   return '小米奖学金';
  case 6:
    return '小米特等奖';
  case 7:
    return '恒兴助学奖学金';
  case 8:
    return '小米助学金';
  case 9:
    return '理想与成才';
  default:
    return '未知';
}
}


</script>
 -->
 <script setup lang="ts">
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
     const response = await axios.get('http://mxt.nat300.top/grow/userOwnInfo/list', {
       params: {},
     });
     if (response.data.code === 200) {
       studentInfo.value = response.data.data.fundUserInfoVo;
       welcomeMessage.value = `您好，${studentInfo.value.name}！`;
       fundPunishVo.value = response.data.data.fundPunishVo || [];
       fundScholarshipVo.value = response.data.data.fundScholarshipVo || [];
       socialExperienceVo.value = response.data.data.fundProjectVo || [];
       // 同时更新 editInfo 以保持数据同步
       editInfo.value = {
         degree: studentInfo.value.degree || '',
         grade: studentInfo.value.grade || '',
         political:studentInfo.value.political|| '',
         marry: formatMarry (studentInfo.value.marry) || '',
         apartment: studentInfo.value.apartment || '',
         dormitory: studentInfo.value.dormitory || '',
         homeAddress: studentInfo.value.homeAddress || '',
         college: studentInfo.value.college || '',
         telephone: studentInfo.value.telephone || '',
         major: formatMajor(studentInfo.value.major )|| '',
         email: studentInfo.value.email || '',
         status: formatStatus(studentInfo.value.status) || ''
       };
       // 更新其他信息
       newExperience.value = {
         startDate: newExperience.value.startDate || '',
         endDate: newExperience.value.endDate || '',
         experience: newExperience.value.experience || '',
       }
     }
   } catch (error) {
     console.error('获取学生信息失败', error);
   }
 };
 onMounted(fetchStudentInfo);

    const statusMap = {
      '未婚': '0',
      '已婚': '1',
    };

    const reverseStatusMap = {
      '在校': '0',
      '肄业': '1',
      '离校': '2',
    };
    const majorMap = {
      '51': '图书馆学',
      '61': '生物技术',
      '60': '生物科学',
      '59': '应用化学',
      '58': '化学',
      '57': '电气工程及其自动化',
      '56': '电子信息科学与技术',
      '55': '材料物理',
      '54': '物理学',
      '53': '智能科学与技术',
      '52': '信息资源管理',
      '62': '药学',
      '50': '软件工程',
      '49': '计算机科学与技术',
      '48': '教育技术学',
      '47': '应用统计学',
      '46': '经济统计学',
      '45': '数据科学与大数据技术',
      '44': '统计学',
      '43': '数学与应用数学',
      '42': '社会学',
      '72': '运动训练',
      '81': '汉语言',
      '80': '广播电视学',
      '79': '数字媒体技术',
      '78': '播音与主持艺术',
      '77': '广播电视编导',
      '76': '广告学',
      '75': '新闻学',
      '74': '冰雪运动',
      '73': '武术与民族传统体育',
      '41': '社会工作',
      '71': '体育教育',
      '70': '环境生态工程',
      '69': '环境工程',
      '68': '环境科学',
      '67': '生态学',
      '66': '自然地理与资源环境',
      '65': '地理信息科学',
      '64': '人文地理与城乡规划',
      '63': '地理科学',
      '10': '物流管理',
      '20': '汉语言文学',
      '19': '工商管理',
      '18': '财务管理',
      '17': '人力资源管理',
      '16': '会计学',
      '15': '市场营销',
      '14': '国际经济与贸易',
      '13': '金融学',
      '12': '财政学',
      '11': '经济学',
      '21': '汉语国际教育',
      '9': '政治学与行政学',
      '8': '行政管理',
      '7': '思想政治教育',
      '6': '国际政治',
      '5': '法学',
      '4': '心理学',
      '3': '公共事业管理',
      '2': '小学教育',
      '1': '学前教育',
      '31': '舞蹈编导',
      '40': '哲学',
      '39': '数字媒体艺术',
      '38': '表演',
      '37': '产品设计',
      '36': '服装与服饰设计',
      '35': '环境设计',
      '34': '视觉传达设计',
      '33': '雕塑',
      '32': '美术学',
      '0': '教育学',
      '30': '音乐学',
      '29': '德语',
      '28': '商务英语',
      '27': '日语',
      '26': '俄语',
      '25': '英语',
      '24': '考古学',
      '23': '旅游管理',
      '22': '历史学',
    };

  function getTextValue(text, map) {
    return map[text] || '未知'; // 如果输入的文本不在映射关系中，返回'未知'
  }

const saveEditInfo = async () => {
  try {
    const marryValue = getTextValue(editInfo.value.marry, statusMap);
    const statusValue = getTextValue(editInfo.value.status, reverseStatusMap);
    
    const majorStatus = getTextValue(editInfo.value.major,  majorMap);
    // 准备提交的数据
    const dataToSubmit = {
      degree: editInfo.value.degree,
      grade: editInfo.value.grade,
      college: editInfo.value.college,
      major: majorStatus,
      email: editInfo.value.email,
      apartment: editInfo.value.apartment,
      dormitory: editInfo.value.dormitory,
      telephone: editInfo.value.telephone,
      homeAddress: editInfo.value.homeAddress,
      political:  editInfo.value.political,
      marry: marryValue, // 使用转换后的值
      status: statusValue // 使用转换后的值
    };

    // 发送请求
    const response = await axios.post('http://mxt.nat300.top/grow/userInfo/updateUserInfo', dataToSubmit);
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
 
 const addExperience = async () => {
   try {

     const response = await axios.post('http://106.54.24.243:8080/grow/project/addProject', {
      
       startDate: newExperience.value.startDate,
       endDate: newExperience.value.endDate,
       experience: newExperience.value.experience,
     });
     if (response.data.code === 200) {
       console.log('Experience added successfully');
       await fetchStudentInfo();
       showAddExperienceDialog.value = false; 
     } else {
       console.error('信息更新失败', response.data.msg);
     }
   } catch (error) {
     console.error('请求失败', error);
   }
  }

// 年级
const formatGrade = (grade:number): string => {
const baseYear = 2023;
return `${baseYear - (grade - 1)}级`;
};
//奖学金
const formatFundType = (fundType: string): string => {
   switch (fundType) {
     case '0':
       return '国家奖学金';
     case '1':
       return '国家励志奖学金';
     case '2':
       return '学校励志奖学金';
     case '3':
       return '励志学子';
     case '4':
       return '宝钢奖学金';
     case '5':
       return '小米奖学金';
     case '6':
       return '小米特等奖';
     case '7':
       return '恒兴助学奖学金';
     case '8':
       return '小米助学金';
     case '9':
       return '理想与成才';
     default:
       return '未知';
   }
 }
// 处罚类型
const formatPunishType = (punishType: string): string => {
switch (punishType) {
  case '0':
    return '警告';
  case '1':
    return '严重警告';
  case '2':
    return '记过';
  case '3':
    return '留校察看';
  case '4':
    return '开除学籍';
  default:
    return '未知';
}
}
// 婚烟状态
const formatMarry = (marry: string): string => {
switch (marry) {
  case '0':
    return '未婚';
  case '1':
    return '已婚';
  default:
    return '未知';
}
}
// 资助等级
const formatAssistLevel = (assistLevel: string): string => {
switch (assistLevel) {
  case '0':
    return '经济关注对象';
  case '1':
    return '特别资助对象';
  case '2':
    return '重点资助对象';
  case '3':
    return '一般资助对象';
  case '4':
    return '公费师范生';
  default:
    return '未知';
}
}
//专业
const formatMajor = (majorCode: string): string => {
switch (majorCode) {
  case '51':
    return '图书馆学';
  case '61':
    return '生物技术';
  case '60':
    return '生物科学';
  case '59':
    return '应用化学';
  case '58':
    return '化学';
  case '57':
    return '电气工程及其自动化';
  case '56':
    return '电子信息科学与技术';
  case '55':
    return '材料物理';
  case '54':
    return '物理学';
  case '53':
    return '智能科学与技术';
  case '52':
    return '信息资源管理';
  case '62':
    return '药学';
  case '50':
    return '软件工程';
  case '49':
    return '计算机科学与技术';
  case '48':
    return '教育技术学';
  case '47':
    return '应用统计学';
  case '46':
    return '经济统计学';
  case '45':
    return '数据科学与大数据技术';
  case '44':
    return '统计学';
  case '43':
    return '数学与应用数学';
  case '42':
    return '社会学';
  case '72':
    return '运动训练';
  case '81':
    return '汉语言';
  case '80':
    return '广播电视学';
  case '79':
    return '数字媒体技术';
  case '78':
    return '播音与主持艺术';
  case '77':
    return '广播电视编导';
  case '76':
    return '广告学';
  case '75':
    return '新闻学';
  case '74':
    return '冰雪运动';
  case '73':
    return '武术与民族传统体育';
  case '41':
    return '社会工作';
  case '71':
    return '体育教育';
  case '70':
    return '环境生态工程';
  case '69':
    return '环境工程';
  case '68':
    return '环境科学';
  case '67':
    return '生态学';
  case '66':
    return '自然地理与资源环境';
  case '65':
    return '地理信息科学';
  case '64':
    return '人文地理与城乡规划';
  case '63':
    return '地理科学';
  case '10':
    return '物流管理';
  case '20':
    return '汉语言文学';
  case '19':
    return '工商管理';
  case '18':
    return '财务管理';
  case '17':
    return '人力资源管理';
  case '16':
    return '会计学';
  case '15':
    return '市场营销';
  case '14':
    return '国际经济与贸易';
  case '13':
    return '金融学';
  case '12':
    return '财政学';
  case '11':
    return '经济学';
  case '21':
    return '汉语国际教育';
  case '9':
    return '政治学与行政学';
  case '8':
    return '行政管理';
  case '7':
    return '思想政治教育';
  case '6':
    return '国际政治';
  case '5':
    return '法学';
  case '4':
    return '心理学';
  case '3':
    return '公共事业管理';
  case '2':
    return '小学教育';
  case '1':
    return '学前教育';
  case '31':
    return '舞蹈编导';
  case '40':
    return '哲学';
  case '39':
    return '数字媒体艺术';
  case '38':
    return '表演';
  case '37':
    return '产品设计';
  case '36':
    return '服装与服饰设计';
  case '35':
    return '环境设计';
  case '34':
    return '视觉传达设计';
  case '33':
    return '雕塑';
  case '32':
    return '美术学';
  case '0':
    return '教育学';
  case '30':
    return '音乐学';
  case '29':
    return '德语';
  case '28':
    return '商务英语';
  case '27':
    return '日语';
  case '26':
    return '俄语';
  case '25':
    return '英语';
  case '24':
    return '考古学';
  case '23':
    return '旅游管理';
  case '22':
    return '历史学';
  default:
    return '未知';
}
}
// 政治面貌
const politicalAppearance = (political: string): string => {
switch (political) {
  case '0':
    return '共青团员';
  case '1':
    return '中共党员';
  case '2':
    return '中共预备党员';
  case '3':
    return '民革党员';
  case '4':
    return '民盟盟员';
  case '5':
    return '民建会员';
  case '6':
    return '民进会员';
  case '7':
    return '农工党党员';
  case '8':
    return '致公党党员';
  case '9':
    return '九三学社社员';
  case '10':
    return '台盟盟员';
  case '11':
    return '无党派人士';
  case '12':
    return '群众';
  default:
    return '未知';
}
}
//民族
const formatEthnicGroup = (ethnicGroup: string): string => {
switch (ethnicGroup) {
  case '0':
    return '汉族';
  case '1':
    return '蒙古族';
  case '2':
    return '回族';
  case '3':
    return '藏族';
  case '4':
    return '维吾尔族';
  case '5':
    return '苗族';
  case '6':
    return '彝族';
  case '7':
    return '壮族';
  case '8':
    return '布依族';
  case '9':
    return '朝鲜族';
  case '10':
    return '满族';
  case '11':
    return '侗族';
  case '12':
    return '瑶族';
  case '13':
    return '白族';
  case '14':
    return '土家族';
  case '15':
    return '哈尼族';
  case '16':
    return '哈萨克族';
  case '17':
    return '傣族';
  case '18':
    return '黎族';
  case '19':
    return '傈僳族';
  case '20':
    return '佤族';
  case '21':
    return '畲族';
  case '22':
    return '高山族';
  case '23':
    return '拉祜族';
  case '24':
    return '水族';
  case '25':
    return '东乡族';
  case '26':
    return '纳西族';
  case '27':
    return '景颇族';
  case '28':
    return '柯尔克孜族';
  case '29':
    return '土族';
  case '30':
    return '达斡尔族';
  case '31':
    return '仫佬族';
  case '32':
    return '羌族';
  case '33':
    return '布朗族';
  case '34':
    return '撒拉族';
  case '35':
    return '毛难族';
  case '36':
    return '仡佬族';
  case '37':
    return '锡伯族';
  case '38':
    return '阿昌族';
  case '39':
    return '普米族';
  case '40':
    return '塔吉克族';
  case '41':
    return '怒族';
  case '42':
    return '乌孜别克族';
  case '43':
    return '俄罗斯族';
  case '44':
    return '鄂温克族';
  case '45':
    return '崩龙族';
  case '46':
    return '保安族';
  case '47':
    return '裕固族';
  case '48':
    return '京族';
  case '49':
    return '塔塔尔族';
  case '50':
    return '独龙族';
  case '51':
    return '鄂伦春族';
  case '52':
    return '赫哲族';
  case '53':
    return '门巴族';
  case '54':
    return '珞巴族';
  case '55':
    return '基诺族';
  default:
    return '未知民族';
}
}
//状态
const formatStatus = (Status: string): string => {
switch (Status) {
  case '0':
    return '在校';
  case '1':
    return '肄业';
  case '2':
    return '离校';
  default:
    return '未知';
}
}
//学历
const formatEducation = (assistLevel: string): string => {
switch (assistLevel) {
  case '0':
    return '本科';
  case '1':
    return '研究生';
  default:
    return '未知';
}
}
//性别
const formatSex = (sex: string): string => {
switch (sex) {
  case '0':
    return '男';
  case '1':
    return '女';
  default:
    return '未知';
}
}
//学院
const formatPoliticalAppearance = (political: string): string => {
switch (political) {
  case '0':
    return '教育学部';
  case '1':
    return '心理学院';
  case '2':
    return '政法学院';
  case '3':
    return '经济与管理学院';
  case '4':
    return '文学院';
  case '5':
    return '历史文化学院';
  case '6':
    return '外国语学院';
  case '7':
    return '音乐学院';
  case '8':
    return '美术学院';
  case '9':
    return '马克思主义学部';
  case '10':
    return '数学与统计学院';
  case '11':
    return '信息科学与技术学院';
  case '12':
    return '物理学院';
  case '13':
    return '化学学院';
  case '14':
    return '生命科学学院';
  case '15':
    return '地理科学学院';
  case '16':
    return '环境学院';
  case '17':
    return '体育学院';
  case '18':
    return '传媒科学学院';
  case '19':
    return '国际汉学院';
  default:
    return '未知学院';
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
  height:80vh;
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
/* margin-top:5vh; */
/* margin-bottom:5vh; */
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
margin-bottom:20px;
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