import React, {useState} from "react";
import { getEquation, getRandomInt } from "./func";

//ボタンに表示する文字
const button=["-","+","0","1","2","3","4","5","6","7","8","9","del","skip"];

//入力した値を、解答と比較するための配列
const ans=[];

//今が何問目かを表す変数
let que=1;

let date=new Date();
//ページにアクセスした時刻や各問題に正解した時刻を入れる配列
const dateArray=["0."+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()];

export function ButtonList(){
    const [equ,setEqu]=useState(getEquation(getRandomInt(-9,9),getRandomInt(-9,9)));
    let gb=false;
    const [inp, setInp]=useState([]);
    const handleClickEvent=(value)=>{
        if(inp.length%2===0){
            if(value==="+"||value==="-"||value==="del"||value==="skip"){
                inp.push(value);
                setInp([...inp]);
            }else if(value==="0"||value==="1"||value==="2"||
            value==="3"||value==="4"||value==="5"||
            value==="6"||value==="7"||value==="8"||value==="9"){
                inp.push("+");
                inp.push(value);
                setInp([...inp]);
            };
        }else{
            if(value!=="+"&&value!=="-"){
                inp.push(value);
                setInp([...inp]);
            }else{
                inp.pop();
                setInp([...inp]);
            };
        };
        if(inp[inp.length-1]==="del"){
            if(inp.length>=1){
                inp.pop();
                setInp([...inp]);
            };
            if(inp.length>=1){
                inp.pop();
                setInp([...inp]);
            };
        };

        //比較
        if(inp.length>=4){
            if(inp[0]=="+"){
                ans[0]=inp[1];
            }else{
                ans[0]=-inp[1];
            };
            if(inp[2]=="+"){
                ans[1]=inp[3];
            }else{
                ans[1]=-inp[3];
            };
            gb=(ans[0]==equ[0]&&ans[1]==equ[1])||(ans[0]==equ[1]&&ans[1]==equ[0]);
            console.log(ans+":"+(gb?"good!":"bad..."));
        };

        //skip
        if(inp[inp.length-1]==="skip"||inp.length>=4){
            if(gb||inp[inp.length-1]==="skip"){
                setEqu(getEquation(getRandomInt(-9,9),getRandomInt(-9,9)));
                console.log(equ);
                if(gb){
                    date=new Date();
                    dateArray.reverse();
                    dateArray.push(que+"."+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
                    dateArray.reverse();
                    que+=1;
                };
            };
            if(inp.length>=1){
                while(inp.length>0)inp.pop();
                setInp([...inp]);
            };
        };
    };
    return(
        <div>
            <div>
                {que+". "}
            </div>
            <div className="center">
                {(equ[2]?equ[2]:"")+(equ[3]?equ[3]:"")+(equ[4]?equ[4]:"")}
            </div>
            <div className="center">
                =(x{inp[0]?inp[0]:"_"}{inp[1]?inp[1]:"_"})(x{inp[2]?inp[2]:"_"}{inp[3]?inp[3]:"_"})
            </div>
            {button.map((item, idx)=>{
                return(
                    <span key={idx}>
                        <button onClick={()=>handleClickEvent(item)} className="button font">
                            {item}
                        </button>
                        {idx%3===2
                            ?<br />
                            :""
                        }
                    </span>
                );
            })}
            <div>
                {dateArray.map((item, idx)=>{
                    return <div key={"d"+idx}>{dateArray[idx]}</div>
                })}
            </div>
        </div>
    );
}