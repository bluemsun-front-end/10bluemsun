// useNavBarData.ts
import { ref, onMounted } from 'vue';
import axios from 'axios';

export function useNavBarData(token: string) {
  const generalBalance = ref(0);
  const clothingBalance = ref(0);
  const campusName = ref('');

  const fetchData = async () => {
    try {
        const authToken = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization']= `Bearer ${authToken}`;
      // 获取校区名称
      const campusResponse = await axios.get('http://106.54.24.243:8080/system/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (campusResponse.data.code === 200 && campusResponse.data.data) {
        campusName.value = campusResponse.data.data.user.deptName;
      } else {
        console.error('Failed to fetch user profile:', campusResponse.data.msg);
      }

      // 获取爱心币
      const balanceResponse = await axios.get('http://106.54.24.243:8080/market/balance', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (balanceResponse.data.code === 200 && balanceResponse.data.data) {
        generalBalance.value = balanceResponse.data.data.generalBalance;
        clothingBalance.value = balanceResponse.data.data.clothingBalance;
      } else {
        console.error('Failed to fetch balance:', balanceResponse.data.msg);
      }

      // 如果需要，也可以在这里获取 circleUrl
      // circleUrl.value = ...;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  onMounted(() => {
    fetchData();
  });

  return {
    generalBalance,
    clothingBalance,
    campusName,
    // circleUrl,
  };
}