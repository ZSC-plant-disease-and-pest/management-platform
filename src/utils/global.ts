import { ElMessage } from 'element-plus';

export function illegalVisit () {
  ElMessage.warning({
    type: 'warning',
    message: '非法访问！'
  });
}
