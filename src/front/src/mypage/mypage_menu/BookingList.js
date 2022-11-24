import React, {useState} from 'react';
import {Button, Pagination} from "@mui/material";
import usePagination from "../../service/UsePagination";
import moment from "moment";
import axios from "axios";

function BookingList(props) {
    const list=props.booking_list;
    let [page, setPage] = useState(1);
    const PER_PAGE = 3;

    const count = Math.ceil(list.length / PER_PAGE);
    const _DATA = usePagination(list, PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    const cancelReserve=(bookingnum)=>{
        axios.get(`${localStorage.url}/payment/cancel_payment?user=${sessionStorage.user_pk}&booking=${bookingnum}`)
            .then((res)=>{
                alert("!!");
            })
    }

    const chkCancelAble=(day)=>{
        const today = new Date().getTime();
        const rDay = new Date(day).getTime();
        if(rDay-today<=7200000){
            return true
        }else{
            return false;
        }
    }

    const test=()=>{
        console.log(list);
    }

    return (
        <div>
            <div className={"mypage-contents-title"} onClick={test}>
                예매 내역
            </div>
            {/*<table className={"mypage-table"}>*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        <th>예약번호</th>*/}
            {/*        <th>예매일</th>*/}
            {/*        <th>상품명</th>*/}
            {/*        <th>장소</th>*/}
            {/*        <th>이용일</th>*/}
            {/*        <th>현재 상태</th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {*/}
            {/*        list && _DATA.currentData().map((item,i)=>(*/}
            {/*                <tr key={i}>*/}
            {/*                    <td>{item.booknumber}</td>*/}
            {/*                    <td>{moment(item.issue).format("YYYY-MM-DD")}</td>*/}
            {/*                    <td>{item.title}</td>*/}
            {/*                    <td>{item.theater} {item.screen}</td>*/}
            {/*                    /!*<td>{moment(item.date).format("YYYY-MM-DD")}{moment(item.)}</td>*!/*/}
            {/*                </tr>*/}
            {/*            )*/}
            {/*        )*/}
            {/*    }*/}
            {/*    </tbody>*/}
            {/*</table>*/}
            <ul className={"booking-list"}>
                {
                    list && _DATA.currentData().map((item,i)=>(
                            <li key={i}>
                                <div className={"booking-info"}>
                                    <span style={{width:"100%"}}>
                                        예매 번호: {item.booknumber}
                                        <span style={{float:"right"}}>
                                            <Button color={"error"}
                                                    variant={"contained"}
                                                    onClick={()=>{
                                                        cancelReserve(item.booknumber)
                                                    }}
                                                    disabled={chkCancelAble(item.date)}
                                            >예매 취소
                                            </Button>
                                        </span>
                                    </span>
                                    <div className={"box-image"}>
                                        <span className={"thumb-image"}>
                                            <img alt={""} src={`https://image.tmdb.org/t/p/w500${item.poster.split(",")[0]}`}/>
                                        </span>
                                    </div>
                                    <div className={"box-contents"}>
                                        <div className={"movie-title"}>
                                            <div className={"movie-title-kr"}>{item.title}</div>
                                        </div>
                                        <div className={"contents-info"}>
                                            <div>
                                                관람 극장 : {item.theater} &nbsp; {item.screen}
                                            </div>
                                            <div>
                                                관람 인원 : 성인: {item.adult}명, 청소년: {item.youth}명
                                            </div>
                                            <div>
                                                관람 일시: {moment(item.date).format("YYYY-MM-DD")}&nbsp;&nbsp;{item.begin.substring(0,5)}
                                            </div>
                                            <div>
                                                관람 좌석: 좌석
                                            </div>
                                            <div>
                                                예매일 : {moment(item.issue).format("YYYY-MM-DD")}
                                            </div>
                                            <div>
                                                결제액 : {item.price}원
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    )
                }
            </ul>
            <div className={"table-pagination"}>
                <Pagination
                    count={count}
                    size="large"
                    page={page}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export default BookingList;