import { Service, Inject } from "typedi"; // typedi 라이브러리에서 Service와 Inject를 임포트한다.
import models from "../../models"; // '../../models' 경로에서 models를 임포트한다.

export default class UserService {
  // UserService 클래스를 정의하고 기본적으로 export한다.
  constructor() {} // 빈 생성자를 정의한다.

  /**
   * 회원가입
   */
  async SignUp(userInfo) {
    // SignUp 메소드를 비동기로 정의하고 userInfo 매개변수를 받는다.
    try {
      // 에러 처리를 위한 try 블록을 시작한다.
      const returnData = {
        // 반환할 데이터 객체를 초기화한다.
        status: 4095, // 기본 상태 코드를 4095로 설정한다.
        data: null, // data 속성을 null로 초기화한다.
      };

      // 구조 분해 할당을 이용하여 원하는 변수만 추출하여 사용할 수 있다.
      const { id, pw } = userInfo; // userInfo 객체에서 id, pw, age를 추출한다.

      const cleanId = id.trim().replace(/\u200B/g, ""); // 아이디 입력값 정리
      // 프론트에서 값이 제대로 넘어오지 않을 수 있기 때문에 이에 관한에러 처리를 해준다.

      // id 검사
      if (!cleanId || cleanId === "") {
        // id가 없는 경우
        // 임의의 값을 정하여 에러 결과를 반환한다.
        returnData.status = 4092; // 입력값 오류 상태 코드.
        return returnData; // returnData 객체를 반환한다.
      }

      // pw 검사
      const cleanPw = pw.trim().replace(/\u200B/g, ""); // 비밀번호 입력값 정리
      if (!cleanPw || cleanPw === "") {
        // pw가 없는 경우
        returnData.status = 4093; // 상태 코드를 4093으로  설정한다.
        return returnData; // returnData 객체를 반환한다.
      }

      // 기존 사용자 확인
      const testUser = await models.user.findOne({
        // id로 사용자 찾기
        where: {
          // 키 값과 변수 명이 같으므로 아래와 같이 콜론 없이도 사용할 수 있다.
          // id
          id: cleanId, // id를 조건으로 설정한다.
        },
      });

      if (!testUser) {
        // 새로운 사용자 생성
        const user = await models.user.create({
          id: cleanId,
          pw: cleanPw,
          factoryTime: 0,
          restaurantTime: 0,
          houseTime: 0,
        });

        returnData.status = 4091; // 상태 코드를 4091로 설정한다.
        returnData.data = user; // 생성된 사용자 데이터를 설정한다.
        return returnData; // returnData 객체를 반환한다.
      }

      returnData.status = 4094; // 사용자가 이미 존재하는 경우 상태 코드를 4094로 설정한다.
      return returnData; // returnData 객체를 반환한다.
    } catch (err) {
      // 에러가 발생한 경우
      // 콘솔 메시지를 이용하여 개발자에게 어디에서 오류가 났는지 알려준다
      console.log("[User] SignUp Service Error!" + err); // 에러 메시지를 콘솔에 출력한다.
      throw err; // 에러를 다시 던진다.
    }
  }

  /**
   * 로그인
   */
  async SignIn(userInfo) {
    // SignIn 메소드를 비동기로 정의하고 userInfo 매개변수를 받는다.
    try {
      // 에러 처리를 위한 try 블록을 시작한다.
      const returnData = {
        // 반환할 데이터 객체를 초기화한다.
        status: 4095, // 기본 상태 코드를 4095로 설정한다.
        data: null, // data 속성을 null로 초기화한다.
      };

      const { id, pw } = userInfo; // userInfo 객체에서 id와 pw를 추출한다.

      // id로 사용자 정보 확인
      const user = await models.user.findOne({
        where: {
          // 변수 명과 키 값이 같기 때문에 id: id을 아래와 같이 간단하게 작성 가능하다.
          id, // id을 조건으로 설정한다.
        },
      });

      if (!user) {
        // 사용자가 없는 경우
        returnData.status = 4092; // 사용자 없음 상태 코드
        return returnData; // returnData 객체를 반환한다.
      }
      // console.log(user.pw + " : " + pw); // 비밀번호 확인을 위한 디버깅 로그

      const cleanPw = pw.trim().replace(/\u200B/g, ""); // 비밀번호 입력값 정리한 뒤 cleanPw에 저장하고 비교한다.
      if (user.pw != cleanPw) {
        // 비밀번호가 일치하지 않는 경우
        returnData.status = 4093; // 비밀번호 불일치 상태 코드
        // console.log("not pw");
        return returnData; // returnData 객체를 반환한다.
      }

      returnData.status = 4091; // 성공 상태 코드.
      returnData.data = {
        id: user.id,
        age: user.age,
        coin: user.coin,
        plantLevel: user.plantLevel,
        experience: user.experience,
      }; // 사용자 데이터를 설정한다.

      return returnData; // returnData 객체를 반환한다.
    } catch (err) {
      // 에러가 발생한 경우
      console.log("[User] SignIn Service Error!" + err); // 에러 메시지를 콘솔에 출력한다.
      throw err; // 에러를 다시 던진다.
    }
  }
}