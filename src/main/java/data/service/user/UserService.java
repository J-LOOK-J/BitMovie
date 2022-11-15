package data.service.user;

import data.domain.user.User;
import data.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    //로그인 (id, password 체크)
    public Map<String, Object> selectLogin (@RequestBody Map<String, String> map) {
        int yesOrNo = userRepository.selectLogin(map);
        int u_pk = 0;
        int pwUdtDate = 0;
        String u_name = "";
        if (yesOrNo == 1) {
            u_pk = userRepository.selectPk(map.get("u_id"));
            u_name = userRepository.selectName(map.get("u_id")); //로그인 성공하면 이름 가져오기
            pwUdtDate = userRepository.selectPwUdtDate(map); //로그인 성공하면 비밀번호 변경 후 지난 기간 가져오기
        }

        Map<String, Object> sendMap = new HashMap<>();
        sendMap.put("yesOrNo", yesOrNo);
        sendMap.put("u_name", u_name);
        sendMap.put("pwUdtDate", pwUdtDate);
        sendMap.put("u_pk",u_pk);

        return sendMap;
    }

    //회원가입 아이디 중복 체크
    public int searchId (String u_id) {
        return userRepository.searchId(u_id);
    }
    //회원가입
    public void insertUser (@RequestBody User user) {
        userRepository.insertUser(user);
    }
    //비밀번호 변경할 때 아이디 참조해서 기존 비밀번호 가져오기(입력한 비밀번호와 일치하는 지 확인용)
    public boolean selectPass (String u_id, String u_pass) {
        String pass = userRepository.selectPass(u_id);
        boolean check = false;
        if (pass == u_pass) {
            check = true;
        }
        return check;
    }
    //비밀번호 변경
    public void updatePass (Map<String, String> map) {
        userRepository.updatePass(map);
    }
    //회원 삭제(상태 변경)
    public void deleteUser (String u_id) {
        userRepository.deleteUser(u_id);
    }
    //비밀번호 안바꿔도 날짜 업데이트
    public void updatePassDate (String u_id) {
        userRepository.updatePassDate(u_id);
    }
    //아이디 찾기
    public String selectId (String u_phone) {
        String id = userRepository.selectFindId(u_phone);
        String resultId = id.substring(0,2) + "**" + id.substring(4);
        return resultId;
    }
    //비밀번호 찾기 (아이디, 핸드폰 번호 확인)
    public int selectFindPass (Map<String, String> map) {
        return userRepository.selectFindPass(map);
    }
    //마이페이지 유저 정보 출력
    public User selectUser (String user_pk) {
        return userRepository.selectUser(user_pk);
    }
    //마이페이지 회원 정보 수정
    public void updateUser (User user) {
        userRepository.updateUser(user);
    }
    //마이페이지 예매 목록 조회
    public Map<String, Object> selectBooking (String user_pk) {
        return userRepository.selectBooking(user_pk);
    }
    //마이페이지 무비로그 조회
    public Map<String, Object> selectMovieLog (String user_pk) {
        return userRepository.selectMovieLog(user_pk);
    }
    //마이페이지 포인트 조회
    public int selectPoint (String user_pk) {
        return userRepository.selectPoint(user_pk);
    }
    //마이페이지 포인트 적립/소멸 조회
    public Map<String, Object> selectPointDetail (String user_pk) {
        return userRepository.selectPointDetail(user_pk);
    }
}
