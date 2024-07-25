import UserService from "./user.service"; // UserService 모듈을 임포트한다.
import { Container } from 'typedi'; // typedi 라이브러리에서 Container를 임포트한다.

export default [
    /* 회원가입 */
    {
        path: '/user/signup',
        method: 'post', // HTTP 메소드를 POST로 설정한다.
        middleware: [], // 사용할 미들웨어가 없음을 나타낸다.
        controller: async (req, res, next) => { // 비동기 컨트롤러 함수 정의
            try { // 에러 처리를 위한 try 블록을 시작한다.
                // 콘솔 메시지를 이용하여 개발자에게 어떤 컨트롤러로 진입했는지 알려준다
                // (에러 발생 시 마지막 접근 API를 알기 위함)
                console.log('[User SignUp Controller Enter]'); // 컨트롤러 진입 로그를 출력한다.
                const UserServiceInstance = Container.get(UserService); // UserService 인스턴스를 typedi Container를 통해 가져온다.
                const userInfo = req.body; // 요청 본문에서 userInfo를 추출한다.
                const data = await UserServiceInstance.SignUp(userInfo); // UserService의 SignUp 메소드를 호출하여 결과를 얻는다.

                /**
                 * 4091: 회원가입 성공
                 * 4092: 아이디 없음
                 * 4093: 비밀번호 없음
                 * 4094: 회원 존재
                 */
                let message = ''; // 메시지 변수를 초기화한다.
                switch (data.status) { // data.status 값을 기반으로 메시지를 설정한다.
                    case 4091:
                        message = '회원가입 성공'; // 상태 4091일 때의 메시지
                        break;
                    case 4092:
                        message = '아이디 없음'; // 상태 4092일 때의 메시지
                        break;
                    case 4093:
                        message = '비밀번호 없음'; // 상태 4093일 때의 메시지
                        break;
                    case 4094:
                        message = '회원 존재'; // 상태 4094일 때의 메시지
                        break;
                    default:
                        message = '알 수 없는 오류 발생!'; // 기본 메시지
                        break;
                }
                return res.status(200).json({ // 상태 200과 JSON 형식의 응답을 반환한다.
                    message, // 메시지를 포함한다.
                    ...data, // data 객체의 나머지 속성을 포함한다.
                });
            } catch (err) { // 에러가 발생한 경우
                // 에러가 났을 경우를 대비하여 try-catch문을 이용하여 확실하게 에러 처리를 한다.
                return res.status(500).json({ // 상태 500과 JSON 형식의 에러 메시지를 반환한다.
                    message: err, // 에러 메시지를 포함한다.
                });
            }
        }
    },
    /**
     * 로그인
     */
    {
        path: '/user/signin', // 로그인 API의 경로를 설정한다.
        method: 'post', // HTTP 메소드를 POST로 설정한다.
        middleware: [], // 사용할 미들웨어가 없음을 나타낸다.
        controller: async (req, res, next) => { // 비동기 컨트롤러 함수 정의
            try { // 에러 처리를 위한 try 블록을 시작한다.
                console.log('[User SignIn Controller Enter]'); // 컨트롤러 진입 로그를 출력한다.
                const UserServiceInstance = Container.get(UserService); // UserService 인스턴스를 typedi Container를 통해 가져온다.
                const userInfo = req.body; // 요청 본문에서 userInfo를 추출한다.
                const data = await UserServiceInstance.SignIn(userInfo); // UserService의 SignIn 메소드를 호출하여 결과를 얻는다.

                /**
                 * 4091: 로그인 성공
                 * 4092: 회원이 존재하지 않음
                 * 4093: 비밀번호 틀림
                 */
                let message = ''; // 메시지 변수를 초기화한다.
                switch (data.status) { // data.status 값을 기반으로 메시지를 설정한다.
                    case 4091:
                        message = '로그인 성공'; // 상태 4091일 때의 메시지
                        break;
                    case 4092:
                        message = '회원이 존재하지 않음'; // 상태 4092일 때의 메시지
                        break;
                    case 4093:
                        message = '비밀번호 틀림'; // 상태 4093일 때의 메시지
                        break;
                    default:
                        message = '알 수 없는 오류 발생!'; // 기본 메시지
                        break;
                }

                return res.status(200).json({ // 상태 200과 JSON 형식의 응답을 반환한다.
                    message, // 메시지를 포함한다.
                    ...data, // data 객체의 나머지 속성을 포함한다.
                });
            } catch (err) { // 에러가 발생한 경우
                return res.status(500).json({ // 상태 500과 JSON 형식의 에러 메시지를 반환한다.
                    message: err, // 에러 메시지를 포함한다.
                });
            }
        }
    },
];