export function validateNewTypeId (rule: any, value: any, callback: any) {
  if (value === undefined) {
    callback(new Error('请选择新闻类型'));
  } else {
    callback();
  }
}

export function validateContent (rule: any, value: any, callback: any) {
  if (!value) {
    callback(new Error('请输入新闻内容'));
  } else {
    callback();
  }
}
