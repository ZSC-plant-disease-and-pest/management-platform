export function validateDamagedParts (rule: any, value: any, callback: any) {
  if (value.length === 0) {
    callback(new Error('请选择危害部位'));
  } else {
    callback();
  }
}

export function validateOverview (rule: any, value: any, callback: any) {
  if (value.length === 0) {
    callback(new Error('请选择危害概述'));
  } else {
    callback();
  }
}
