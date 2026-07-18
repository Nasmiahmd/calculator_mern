import React, { useState } from 'react'

const Home = () => {
    const [currentVal, setCurrentVal] = useState("0")
    const [prevVal, setPrevVal] = useState("")
    const [operator, setOperator] = useState<string | null>(null)
    const [isResetting, setIsResetting] = useState(false)

    const handleNumber = (digit: string) => {
        if(currentVal === "0" || isResetting){
            setCurrentVal(digit)
            setIsResetting(false)
        }else{
            setCurrentVal(currentVal + digit)
        }
    }

    const handleDecimal = () => {
        if(isResetting){
            setCurrentVal("0.")
            setIsResetting(false)
        }
        if(!currentVal.includes(".")){
            setCurrentVal(currentVal + ".")
        }
    }

    const handleOperator = (nextOperator: string) => {
        const numericCurrent = parseFloat(currentVal)

        if(prevVal === ""){
            setPrevVal(currentVal)
        }else if(operator && !isResetting){
            const result = calculate(parseFloat(prevVal), numericCurrent, operator)
            setCurrentVal(String(result))
            setPrevVal(String(result))
        }

        setOperator(nextOperator)
        setIsResetting(true)
    }

    const calculate = (a: number, b: number, op: string): number => {
        switch (op){
            case '+' : return a + b;
            case '-' : return a - b;
            case '*' : return a * b;
            case '/' : return b === 0 ? 0 : a / b;
            case '%' : return a % b;
            default: return b;
        }
    }

    const handleEquals = () => {
        if(!operator || prevVal === "") return;

        const result = calculate(parseFloat(prevVal), parseFloat(currentVal), operator)
        setCurrentVal(String(result))
        setPrevVal("")
        setOperator(null)
        setIsResetting(false)
    }

    const clearAll = () => {
        setCurrentVal("0")
        setPrevVal("")
        setOperator(null)
        setIsResetting(false)
    }

  return (
    <div className='text-white flex flex-col min-h-screen items-center justify-center bg-slate-950 p-4'>
        <div className='w-full max-w-xs bg-slate-900 rounded-3xl border border-slate-800 p-5 shadow-2xl'>
            {/* Display the Screen */}
            <div className='text-right text-5xl font-mono tracking-tighter bg-slate-950 rounded-2xl p-4 mb-5 flex items-end justify-end min-h-21 overflow-hidden'>{currentVal}</div>
            
            {/* Action Grid Layout */}
            <div className='grid grid-cols-4 gap-3'>
                {/* 1st Row */}
                <button onClick={clearAll} className='bg-slate-700 p-4 text-white hover:bg-slate-600 rounded-2xl font-bold transition active:scale-95'>C</button>
                <button className='bg-slate-700 p-4 text-white hover:bg-slate-600 rounded-2xl font-bold transition opacity-50 cursor-not-allowed'>+/-</button>
                <button onClick={()=>handleOperator("%")} className='bg-slate-700 p-4 text-white hover:bg-slate-600 rounded-2xl font-bold transition active:scale-95'>%</button>
                <button onClick={() => handleOperator("/")} className={`p-4 rounded-2xl font-bold transition active:scale-95 ${operator === '/' ? "bg-white text-orange-500" : "bg-orange-500 text-white hover:bg-orange-400"}`}>/</button>

                {/* 2nd Row */}
                <button onClick={() => handleNumber('7')} className='p-4 rounded-2xl font-semibold bg-slate-800 text-white hover:bg-slate-700 transition active:scale-95'>7</button>
                <button onClick={() => handleNumber('8')} className='p-4 rounded-2xl font-semibold bg-slate-800 text-white hover:bg-slate-700 transition active:scale-95'>8</button>
                <button onClick={() => handleNumber('9')} className='p-4 rounded-2xl font-semibold bg-slate-800 text-white hover:bg-slate-700 transition active:scale-95'>9</button>
                <button onClick={() => handleOperator("*")} className={`p-4 rounded-2xl font-bold transition active:scale-95 ${operator === '*' ? "bg-white text-orange-500" : "bg-orange-500 text-white hover:bg-orange-400"}`}>*</button>

                {/* 3rd Row */}
                <button onClick={() => handleNumber('4')} className='p-4 rounded-2xl font-semibold bg-slate-800 text-white hover:bg-slate-700 transition active:scale-95'>4</button>
                <button onClick={() => handleNumber('5')} className='p-4 rounded-2xl font-semibold bg-slate-800 text-white hover:bg-slate-700 transition active:scale-95'>5</button>
                <button onClick={() => handleNumber('6')} className='p-4 rounded-2xl font-semibold bg-slate-800 text-white hover:bg-slate-700 transition active:scale-95'>6</button>
                <button onClick={() => handleOperator("-")} className={`p-4 rounded-2xl font-bold transition active:scale-95 ${operator === '-' ? "bg-white text-orange-500" : "bg-orange-500 text-white hover:bg-orange-400"}`}>-</button>

                {/* 4th Row */}
                <button onClick={() => handleNumber('3')} className='p-4 rounded-2xl font-semibold bg-slate-800 text-white hover:bg-slate-700 transition active:scale-95'>3</button>
                <button onClick={() => handleNumber('2')} className='p-4 rounded-2xl font-semibold bg-slate-800 text-white hover:bg-slate-700 transition active:scale-95'>2</button>
                <button onClick={() => handleNumber('1')} className='p-4 rounded-2xl font-semibold bg-slate-800 text-white hover:bg-slate-700 transition active:scale-95'>1</button>
                <button onClick={() => handleOperator("+")} className={`p-4 rounded-2xl font-bold transition active:scale-95 ${operator === '+' ? "bg-white text-orange-500" : "bg-orange-500 text-white hover:bg-orange-400"}`}>+</button>

                {/* 5th Row */}
                <button onClick={() => handleNumber('0')} className='col-span-2 p-4 rounded-2xl font-semibold bg-slate-800 text-white hover:bg-slate-700 transition active:scale-95'>0</button>
                <button onClick={handleDecimal} className='p-4 rounded-2xl font-semibold bg-slate-800 text-white hover:bg-slate-700 transition active:scale-95'>.</button>
                <button onClick={handleEquals} className={`p-4 rounded-2xl font-bold transition active:scale-95 ${operator === '=' ? "bg-white text-orange-500" : "bg-orange-500 text-white hover:bg-orange-400"}`}>=</button>

            </div>
        </div>
    </div>
  )
}

export default Home