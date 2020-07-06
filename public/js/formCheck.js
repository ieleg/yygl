let register = document.getElementById('register');
// register.onsubmit = function(){
//   if(register.username.value == ''){
//     alert('用户名不能为空')
//     return false
//   }
//   if(register.password.value == ''){
//     alert('密码不能为空')
//     return false
//   }
//   if(register.password.value !== register.passwordR.value){
//     alert('两次输入密码不一致')
//     return false
//   }
  
// }
// 策略模式重构
let a=1;
let strategies = {
  isEmpty(value ,errMsg){
    if(value == ''){
      return errMsg
    }
  },
  minLength(value,length,errMsg){
    if(value.length < length){
      return errMsg
    }
  },
  doubleCheck(value1,value2,errMsg){
    if(value1 !== value2){
      return errMsg
    }
  }
}
const Validator = function() {
  this.cache = [];
}
Validator.prototype.add = function(dom,rule,errMsg){
  let arr = rule.split(':');
  this.cache(function(){
    let strategy = arr.shift();
    arr.unshitf(dom.value);
    arr.push(errMsg);
    return strategies[strategy].apply(dom,arr);
  })
}
Validator.prototype.start = function(){
  for(let i = 0 ,validataFunc ; validataFunc = this.cache[i++];){
    let msg = validataFunc();
    if(msg){
      return msg
    }
  }
}
let validataFunc = function(){
  let validator = new Validator();

  validator.add(register.username,'isEmpty','用户名不能为空')
  validator.add(register.password,'isEmpty','密码不能为空')
  validator.add(register.password,'doubleCheck:register.passwordR.value','密码不能为空')
  // 返回校验结果
  console.log(validator);
  
  let errMsg = validator.start();
  return errMsg
}
register.onsubmit = function(){
  let errMsg = validataFunc();
  if(errMsg){
    alert(errMsg)
    return false
  }
  console.log(1);
  return false    
}