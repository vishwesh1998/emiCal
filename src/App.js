import './App.css'
import {useRef, useState} from 'react'

export default function App(){
    const [minDP, setMinDP] = useState(0)
    const [maxDP, setMaxDP] = useState(0)
    const [initialDP, setInitialDP] = useState(0)
    const [totalDP, setTotalDP] = useState(0)
    const [totalLoan, setTotalLoan] = useState(0)
    const [emi, setEmi] = useState(0)
    const [tenure, setTenure] = useState(0)
    // const [minEmi, setMinEmi] = useState(0)
    // const [maxEmi, setMaxEmi] = useState(0)
    
    let inp1 = useRef()
    let inp2 = useRef()
    let inp3 = useRef()
    let inp4 = useRef()

    let button = Array.from(document.getElementsByTagName('button'))
    // console.log(button)
    button.forEach(ob=>ob.addEventListener('click', ()=>{
        setTenure(ob.value)
    }))
    // console.log(tenure)

    let checkDpRange = (event) => {
        let totalAmount = inp1.current.value
        let Pf = inp3.current.value
        let Dp = +event.target.value 
        let principleCost = totalAmount-Dp
        let processing_fee = (Pf * principleCost)/100
        setInitialDP(Dp)
        setTotalLoan(principleCost)
        setTotalDP(Dp+processing_fee)
        calculate()
    }

    let setDP = (event) =>{
        let value = event.target.value
        setMinDP((value*10)/100)
        setMaxDP(value)
        // console.log(minDP)
    }
    
    let calculate = (e) =>{
        // P × r × (1 + r)n/((1 + r)n – 1)
        

        let Ior = +inp2.current.value
        let interestRate = (Ior/100)
        let Dp = +inp4.current.value
        let totalAmount = +inp1.current.value
        let principleAmount = totalAmount - Dp
        let part = Math.pow(1+interestRate,tenure)
        let emi = (principleAmount*interestRate*part)/(part-1)
        if(!emi)
        return
        setEmi(emi.toFixed(0))
     }

    return <>
    {/* <hr/>s */}
    <h1 style={{textAlign:'center'}} className='alert-success'><b>EMI Calculator</b></h1>
    <br/>
    {/* <hr/> */}
    <div className='calculator_box'>
    <h5><b>Total Cost Of Asset</b></h5>
    <input type='number' className='form-control' ref={inp1} onBlur={(e)=>setDP(e)}/>
    <br/><br/>
    <h5><b>Intrest Rate (%)</b></h5>
    <input type='number' className='form-control' disabled value='10' ref={inp2}/>
    <br/><br/>
    <h5><b>Processing Fee (%)</b></h5>
    <input type='number' className='form-control'  disabled value='1' ref={inp3}/>
    <br/><br/>
    <h4><b>Down Payment</b></h4>
    <h5><b>Total Down Payment (DP + Processing Fee) :  {totalDP}/-</b></h5>
    <input type='range' className='form-control' ref={inp4} min={minDP} max={maxDP} onChange={(event)=>checkDpRange(event)}/>
    <div className='row'>
        <b className='col-4'>10%</b>
        <b className='col-4 text-center'>Down-Payment : {initialDP}/-</b>
        <b className='col-4 text-right'>100%</b>
    </div>
    <br/><br/>
    <h5><b>Tenure</b></h5>
    <div className='row text-center'>
    <div className='col-3'><button className='btn btn-success p-3 m-3' onClick={(e)=>calculate(e)} value='12'>12</button></div>
    <div className='col-3'><button className='btn btn-success p-3 m-3' value='24' onClick={(e)=>calculate(e)}>24</button></div>
    <div className='col-3'><button className='btn btn-success p-3 m-3' value='36' onClick={(e)=>calculate(e)}>36</button></div>
    <div className='col-3'><button className='btn btn-success p-3 m-3' value='48' onClick={(e)=>calculate(e)}>48</button></div>
    </div>
    <br/><br/>
    <h4><b>Loan Per Month</b></h4>
    <h5><b>Total Loan Amount - {totalLoan}/-</b></h5>
    <input type='text' className='form-control text-center' value={emi==0?'Please Fill All The Details To Check':`Your Monthly EMI : ${emi}/-`} disabled/>
    <br/><br/>
    </div>
    </>
}