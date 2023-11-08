/**
 * 获取顶部地址栏地址
 */
export function getTopUrl() {
  return window.location.href.split("/#/")[0];
}

/**
 * 获取url参数
 * @param name 参数名
 */
export function getQueryString(name) {
  // eslint-disable-next-line no-shadow
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(decodeURI(r[2]));
  return null;
}

//abcdadefg;
//返回无重复最长字符串
export function fuc(str) {
  let longest = 0;
  let longestStr = "";
  if (!str) {
    return;
  }
  for (let i = 0; i < str.length; i++) {
    let substr = "";
    for (let j = i; j < str.length; j++) {
      if (substr.includes(str[j])) {
        break;
      }
      substr += str[j];
      //longest=Math.max(substr.length,longest)
      if (substr.length > longest) {
        longest = substr.length;
        longestStr = substr;
      }
    }
  }
  return `${longest}&&str:${longestStr}`;
}

let str = "abcafcd";

export function sort(arr) {
  if (Array.isArray(arr)) {
    for (let i = 0; i <= arr.length - 1; i++) {
      for (let j = 0; j <= arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  }
}

//判断回文字符串
// let str="aba";
export function huiwenString(str) {
  let reverseStr = str.split("").reverse().join("");
  return str === reverseStr;
}

// 比较版本号
// 5.1 5.2

export function compareVersion(version1, version2) {
  if (!version1 || !version2) {
    return;
  }
  let v1Arr = version1.split(".");
  let v2Arr = version2.split(".");
  const length = Math.max(v1Arr.length, v2Arr.length);
  for (let i = 0; i < length; i++) {
    let num1 = i < v1Arr.length ? v1Arr[i] : 0;
    let num2 = i < v2Arr.length ? v2Arr[i] : 0;
    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }
  return 0;
}

//查找字符串中出现最多的字符
// export function getAppearTimesWord(str) {
//   let newObj = {};
//   let maxKey = null;
//   let maxValue = 0;
//   for (let i = 0; i < str.length; i++) {
//     if (!newObj[str[i]]) {
//       newObj[str[i]] = 1;
//     } else {
//       newObj[str[i]] = newObj[str[i]] + 1;
//     }
//   }
//   for (const key in newObj) {
//     if (newObj.hasOwnProperty(key) && typeof newObj[key] === 'number') {
//       if (newObj[key] > maxValue) {
//         maxValue = newObj[key];
//         maxKey = key;
//       }
//     }
//   }
//   return maxKey;
// }

export function getAppTimesWord(str) {
  //首先计算每个字符出现次数
  let appearObj = {};
  let maxKey = null;
  let maxNumber = 0;
  for (let i = 0; i < str.length; i++) {
    appearObj[str[i]] = (appearObj[str[i]] || 0) + 1;
  }
  for (const key in appearObj) {
    if (appearObj.hasOwnProperty(key) && typeof appearObj[key] === "number") {
      if (appearObj[key] > maxNumber) {
        maxNumber = appearObj[key];
        maxKey = key;
      }
    }
  }
  return maxKey;
}

export function deepcolone(obj) {
  if (obj === null || typeof obj !== "object") {
    return;
  }
  if (Array.isArray(obj)) {
    let newArr = [];
    for (let i = 0; i < obj.length; i++) {
      newArr[i] = deepcolone(obj[i]);
    }
    return newArr;
  }
  let newObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepcolone(obj[key]);
    }
  }
  return newObj;
}

//返回无重复最长字符串
//str="abcabcs"
export function fu11(str) {
  if (!str) {
    return;
  }
  let maxStrLength = 0;
  let finalStr = "";
  for (let i = 0; i < str.length; i++) {
    let subStr;
    for (let j = i; j < str.length; j++) {
      if (!subStr.includes(str[j])) {
        subStr += str[i];
        if (subStr.length > maxStrLength) {
          maxStrLength = subStr.length;
          finalStr = subStr;
        }
      } else {
        break;
      }
    }
  }
  return `longerstr:${finalStr}&&longestLength:${maxStrLength}`;
}

export function debounce(fuc, delay) {
  let timerId; //定时器标识

  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fuc();
    }, delay);
  };
}

const nums = [11, 7, 2, 15];
const target = 9;
//console.log(twoSum(nums, target)); // 应该返回 [0, 1]，因为 nums[0] + nums[1] = 2 + 7 = 9

export function fuc22(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return `[${i},${j}]`;
      }
    }
  }
}

const str1 = "helloworld";
export function reverse(str) {
  let reverseArr = [];

  for (let index = str.length - 1; index >= 0; index--) {
    reverseArr.push(str[index]);
  }
  return reverseArr.join("");
}

//找出出现最多的字符
export function fuc4(str) {
  let appearObj = {};
  for (let i = 0; i < str.length; i++) {
    appearObj[str[i]] = (appearObj[str[i]] || 0) + 1;
  }
  if (Object.keys(appearObj).length > 0) {
    let maxValue = 0;
    let finalStr = "";
    for (let key in appearObj) {
      if (appearObj.hasOwnProperty(key) && typeof appearObj[key] === "number") {
        if (appearObj[key] > maxValue) {
          maxValue = appearObj[key];
          finalStr = key;
        }
      }
    }
    return `${finalStr}&&${maxValue}`;
  }
  return undefined;
}





第一题：
import React, { useState } from 'react';

function Input() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
     <div>{inputValue}</div>
    </div>
  );
}

export default Input;



第二题：

import React, { useState } from 'react';

function Input({ value, onChange }) {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <div>{value}</div>
    </div>
  );
}

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  return (
    <div>
      <p>输入值显示为</p>
      <Input value={inputValue} onChange={handleInputChange} />
    </div>
  );
}

export default App;





// 第三题：
import React, { useState } from 'react';

function Input({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
  );
}

function FormItem({ name }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  return (
    <div>
      <div>{name}:</div>
      <Input value={inputValue} onChange={handleInputChange} />
      <div>value:{inputValue}</div>
    </div>
  );
}

export default FormItem;



let url = "http://www.baidu.com?name=张三&age=25&sex=男&wife=小红"

export const getURLParams=(url)=>{
  let urlStr=url.split('?')[1];
  let urlArr=urlStr.split('&');
  let obj={}
  for (let i=0;i<urlArr.length;i++) {
    let itemArr=urlArr[i].split('=')
    obj[itemArr[0]]=itemArr[1]
  }
  return obj
}


//写一个防抖函数
const debounce=()=>{}

const debounce1=function(fn){
  return function(){
    let timer=null;
    if(timer){
      clearTimeout(timer);
      timer=null;
    }
    setTimeout(()=>{
      fn()
    },1000)
  }
}


let fn=()=>{
  console.log(111);
}

let bb=debounce(fn)