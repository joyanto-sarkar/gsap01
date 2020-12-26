import logo from './logo.svg';
import './App.css';
import {useRef,useEffect, useState} from 'react'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'



gsap.registerPlugin(ScrollTrigger)

const images = [
  {
    img:'https://i.picsum.photos/id/645/200/300.jpg?hmac=fiKW3Nj8r0CWJQY3S-kkeT8PAfvKhA8igd9GIRk41Yw',
  },
  {
    img:'https://i.picsum.photos/id/373/200/300.jpg?hmac=GXSHLvl-WsHouC5yVXzXVLNnpn21lCdp5rjUE_wyK-8',
  },
  {
    img:'https://i.picsum.photos/id/817/200/300.jpg?hmac=Egrlh6ZzXMOSu9esbUDMY8PhK3cBCmeqHyWBXm7dnHQ',
  }
]

function App() {

  const headerRef = useRef(null)

  const revealRefs = useRef([])

  revealRefs.current = []

  const [background, setBackground] =  useState('#4984e3')

  const toggle = () =>{
    const color = background === '#4984e3' ? '#688c64' : '#4984e3'
    setBackground(color)
  }

  useEffect(() => {
    gsap.to(headerRef.current, {
      duration:1,
      backgroundColor:background,
      ease:'none',
    })
  }, [background])


  useEffect(() => {
    gsap.from(headerRef.current, {
      duration:1,
       autoAlpha:0,
        ease:'none',
        delay:1
      })

      revealRefs.current.forEach((el,index)=>{
        gsap.fromTo(el,
          {autoAlpha:0},
           {
             duration: 1,
              autoAlpha:1,
               ease:'none', 
              scrollTrigger:{
               id:`section-${index}`,
               trigger:el,
               start:'top center+=100',
               toggleActions:'play none none reverse',
             }

            })
      })
  }, [])



  const addToRefs = (el) =>{
    if(el && !revealRefs.current.includes(el)){
      revealRefs.current.push(el)
    }
    console.log(revealRefs.current);
  }

  return (
    <div className="App">
      <header ref={headerRef} className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{borderRadius:'50%'}}/>
        <button primary onClick={()=>toggle()}>Color Change</button>
        <p>
          Scroll down for ScrollTrigger.
        </p>
      </header>

      <main className="App-main">
            {
              images.map(({img})=>{
                return (
                  <div key={img} className="note" ref={addToRefs}>
                      <img src={img} alt=''/>
                  </div>
                )
              })
            }
        </main>
    </div>
  );
}

export default App;
