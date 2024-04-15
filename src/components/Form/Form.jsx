import React, { useState, useEffect } from 'react'
import { projectFirestore } from '../../firebase/config'
import logo from '../../assets/NavbarLogo.jpg'
import "./Form.css"
const Form = () => {
    
  const [celed, setCeled] = useState("")
    const [allAnswers, setAllAnswers] = useState([])
    const [rod, setRod] = useState("")
    const [druh, setDruh] = useState("")
    const [puvod, setPuvod] = useState("")
    const [popsal, setPopsal] = useState("")
    const [error, setError] = useState("")
    const [pocetKaret, setPocetKaret] = useState(0);
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

    const submitForm = (event) => {
        event.preventDefault();
        console.log("odeslano")
        if (!celed.trim() || !rod.trim() || druh.trim() === "" || puvod.trim() === "" || popsal.trim() === "") {
            setError("Vyplnte vsechna pole ");
            return;
        }
        const numberOfCards = parseInt(pocetKaret);
        if (isNaN(numberOfCards) || numberOfCards <= 0) {
            setError("Prosim napiste cislo karet");
            return;
        }

        const oneTask = {

            celed: celed,
            druh: druh,
            rod: rod,
            puvod: puvod,
            popsal: popsal,

        };

        try {
            const cardCollection = projectFirestore.collection("card");
            const cardSafe=projectFirestore.collection("cardSafe")
            for (let i = 0; i < numberOfCards; i++) {
                cardCollection.add(oneTask);
            }
            cardSafe.add(oneTask);

            cardSafe.doc(celed)
            

            console.log("poslano");
            setCeled("");
            setDruh("");
            setRod("");
            setPuvod("");
            setPopsal("");
            setError("");
            setPocetKaret(0)
        } catch (error) {
            setError("Task could not be added: " + error.message);
        }
    };


    const submitCeled = (event) => {
        setCeled(event.target.value)
    }
    const submitRod = (event) => {
        setRod(event.target.value)
    }
    const submitDruh = (event) => {
        setDruh(event.target.value)
    }
    const submitPuvod = (event) => {
        setPuvod(event.target.value)
    }
    const submitPopsal = (event) => {
        setPopsal(event.target.value)
    }
    const pocetKaretFun = (event) => {
        setPocetKaret(event.target.value)
    }
    

     return <section className='Form'>
     <div class="mx-auto max-w-md space-y-6 mb-12">
     <div class="space-y-2 text-center">
       <h1 class="text-3xl font-bold">Napiš kartičku</h1>
       <p class="text-gray-500 dark:text-gray-400">Vytvořena kartička ve složce karta</p>
     </div>
     <form onSubmit={submitForm} class="space-y-4">
       <div className="space-y-2 flex-row">
         <label
           class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
           for="Čeled"
         >
           Čeled
         </label>
         <label
           class="text-sm ml-40 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
           for="Rod"
         >
           Rod
         </label>
         <div className='flex flex-row gap-2'>
            
         <input
           className="flex h-10 w-full rounded-md border border-input  bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
           id="text"
           placeholder="Čeled"
           required=""
           type='text'
           value={celed} onChange={submitCeled}
         />
          <input
           className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
           id="text"
           placeholder="Rod"
           
           required=""
           type='text'
           value={rod} onChange={submitRod}
         />
         </div>
         {/* <p class="text-xs text-red-500">Zadejte celed a rod </p> */}
       </div>
       <div class="space-y-2">
         <label
           class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
           for="Puvod"
         >
           Původ
         </label>
         <label 
           class="text-sm ml-40 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
           for="PocetKaret"
         >
           Počet Karet 56 Max
         </label>
         <div className='flex flex-row gap-2'>
         <input
           className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
           id="email"
           placeholder="Původ"
           required=""
           type="text"
           value={puvod} onChange={submitPuvod}
         />
          <input
           className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
           id="email"
           placeholder="Pocet karet"
           required=""
           type="number"
           max={56}
           value={pocetKaret} onChange={pocetKaretFun}
         />
         </div>
         {/* <p class="text-xs text-red-500">Zadejte Puvod a pocet karet krete chcete vysiknout</p> */}
       
       </div>
       <div class="space-y-2">
       <label 
           class="text-sm  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
           for="PocetKaret"
         >
           Druh
         </label>
         
         <input
           className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
           id="text"
           placeholder='Druh'
           required=""
           type="text"
           value={druh} onChange={submitDruh}
         />
         <label 
           class="text-sm  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
           for="PocetKaret"
         >
           Kdo napsal kartičku
         </label>
          <input
           className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
           id="text"
           placeholder='Kdo napsal Kartu'
           required=""
           type="text"
           value={popsal} onChange={submitPopsal}
         />
         
         {/* <p class="text-xs text-red-500">
           Zadejte Druh a kdo popsal
         </p> */}
       </div>
       {error && <p className="text-red-500">{error}</p>}
       <button
         class="inline-flex bg-black text-white items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
         type="submit"
       >
          Vytvořit kartu
       </button>
       </form>
</div>
<div className='the-card'>
      <div className='the-card-left'>
            <p className='under'>{celed}</p>
            <p className='under'>{rod}</p>
            <p className='under'>{druh}</p>
            <p className='under' >{puvod}</p>
            <p className='under'>{popsal}</p>
        </div>
            <div className='the-card-right'>
                   <img className='the-card-logo' src={logo} alt="" /> 
                   <span id='text-logo' className='mt-12 mr-2'>emberizashells.cz</span>
            </div>
            </div>
            </section>
     //<section className='App'>
    //         <div className='input-box'>
    //             <div className="left-box">
    //                 <img className='logo' src={logo} alt="" />
    //                 <form onSubmit={submitForm} className="around-text">
    //                     <input value={celed} onChange={submitCeled} className='celed' type="text" name="celed" id="inp" />
    //                     <input value={rod} onChange={submitRod} className='rod' type="text" name="rod" id="inp" />
    //                     <input value={druh} onChange={submitDruh} className='druh' type="text" name="druh" id="inp" />
    //                     <input value={puvod} onChange={submitPuvod} className='puvod' type="text" name="puvod" id="inp" />
    //                     <input type="number" value={pocetKaret} onChange={pocetKaretFun} className='pocetKaretss' id='inp' name='pocetKaret' />
    //                     <input value={popsal} onChange={submitPopsal} className='popsal' type="text" name="popsal" id='inp' />
    //                     <input
    //                         type="submit"
    //                         className="submitButton"
    //                         value="Vytovr kartu"
    //                     />
    //                 </form>
    //             </div>
    //         </div>
            
    //     </section>
}

export default Form