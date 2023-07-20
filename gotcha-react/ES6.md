## ES6
ES6(ECMAScript 2015)는 ECMAScript 프로그래밍 언어의 6번째 버전으로, 2015년에 발표되었다.<br/> 
브라우저 호환성을 위해 ES6를 바로 사용하기보다는 Babel과 같은 도구를 통해 ES5로 변환하여 사용하는 것이 일반적이다.

1. 변수 선언: let과 const

ES6 이전 var는 함수 스코프를 가지고 있어서 블록 내에서 선언된 변수도 함수 내에서 접근이 가능해 예상치 못한 버그가 발생할 수 있음.

- let: 블록 범위의 변수를 선언, 값이 재할당될 수 있음
- const: 블록 범위의 상수를 선언, 재할당이 불가능
```js
let x = 10;
const y = 5;
```

<br/>

2. 화살표 함수 (Arrow functions)

기존의 함수 표현식보다 간결하며, this의 동작 방식도 다르다. 화살표 함수는 항상 익명 함수로 사용되며, function 키워드 대신 => 기호를 사용하여 정의

```js
// 기존 함수 표현식
function add(a, b) {
  return a + b;
}

// ES6 화살표 함수
const add = (a, b) => a + b;
```
<br/>

3. 클래스 (Classes)

class 키워드를 사용하여 클래스를 정의하고, constructor 메서드를 사용하여 객체를 초기화

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
  }
}

const person = new Person('John', 30);
person.sayHello();
```
<br/>

4. 템플릿 리터럴 (Template literals)<br/>
백틱(`)으로 감싸서 사용하며 문자열을 쉽게 작성할 수 있게 해주며, ${} 내부에 변수나 표현식을 삽입할 수 있음.

```js
const name = 'Alice';
const age = 25;
const message = `My name is ${name} and I'm ${age} years old.`;
console.log(message);
```
<br/>

5. 구조 분해 할당 (Destructuring assignment)<br/>
객체나 배열에서 필요한 값을 추출하여 변수에 할당하는 기능.
```js
// 객체 구조 분해 할당
const person = { name: 'John', age: 30 };
const { name, age } = person;

// 배열 구조 분해 할당
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
```
<br/>

6. 확장 매개변수 (Rest parameters)와 전개 구문 (Spread syntax)<br/>
확장 매개변수는 함수에 전달된 인수들을 배열로 받아올 수 있게 해주며, 전개 구문은 배열이나 객체를 다른 배열이나 객체로 확장할 수 있게 해줌.
```js
// 확장 매개변수
function sum(...numbers) {
  return numbers.reduce((acc, val) => acc + val, 0);
}

// 전개 구문
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const mergedArray = [...arr1, ...arr2];
```
<br/>

7. 모듈 (Modules)<br/>
ES6에서는 자바스크립트 코드를 모듈로 나눌 수 있도록 import와 export 키워드가 추가되었습니다.
```js
// math.js 모듈
export function add(a, b) {
  return a + b;
}

// main.js에서 math.js 모듈 사용
import { add } from './math.js';
console.log(add(2, 3)); // 5
```