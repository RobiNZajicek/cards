import React, { useState,useEffect,useRef } from 'react'
import Card from '../card/Card'
import { projectFirestore } from '../../firebase/config'
import { useReactToPrint } from 'react-to-print';
import './CardPage.css'
const CardPage = () => {
    const componentRef = useRef();
    const[allAnswers,setAllAnswers]=useState([])
    const [error, setError] = useState("")
    useEffect(() => {
        const sub = projectFirestore.collection("card").onSnapshot((snap) => {
            if (snap.empty) {
                setError("")
                setAllAnswers([])
            } else {
                let result = []
                snap.docs.forEach((oneCard) => {
                    result.push({ id: oneCard.id, ...oneCard.data() })
                })
                setAllAnswers(result)
                setError(' ')
            }
        }, (error) => {
            setError(error.message);
        });
        return () => {
            sub();
        };
    }, []);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
  return (
            <div id='pg' className='CardPagees'>
            <button onClick={handlePrint} className='print-button'>
            <span className='print-icon'></span>
            </button>
            <div ref={componentRef} className='CardPageLayout'>
            {allAnswers.map((oneCard) => (
                <Card key={oneCard.id} {...oneCard} />
            ))}
            </div>
        </div>
  )
}

export default CardPage