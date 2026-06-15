import{useState,useRef,useEffect}from'react'
  interface Msg{id:string;text:string;me:boolean;time:string;emoji:string}
  interface Contact{id:string;name:string;av:string;status:string;last:string}
  const uid=()=>Math.random().toString(36).slice(2,8)
  const t=()=>new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})
  const CONTACTS:Contact[]=[
    {id:"1",name:"Sarah Johnson",av:"👩‍💻",status:"online",last:"Looks great! Ship it"},
    {id:"2",name:"Ahmed K.",av:"👨‍💼",status:"away",last:"Can we schedule a call?"},
    {id:"3",name:"Design Team",av:"🎨",status:"online",last:"New mockups are ready"},
    {id:"4",name:"Alex Chen",av:"👨‍💻",status:"offline",last:"Thanks for the review"},
  ]
  const INIT:Msg[]=[
    {id:uid(),text:"Hey! Did you push the new feature?",me:false,time:"10:30",emoji:""},
    {id:uid(),text:"Just pushed 20 repos to GitHub! 🚀",me:true,time:"10:31",emoji:""},
    {id:uid(),text:"That portfolio looks really clean btw",me:false,time:"10:32",emoji:"❤️"},
    {id:uid(),text:"Thanks! TypeScript + React all the way",me:true,time:"10:33",emoji:""},
    {id:uid(),text:"I'll check out the algo visualizer later",me:false,time:"10:34",emoji:""},
  ]
  const REPLIES=["Got it! 👌","Interesting...","Nice work! 🚀","Agreed 💯","Let me check that","On it!"]
  const QUICK=["Sounds good! 👍","On it!","Thanks!","Can you share the link?","Looks great 🚀"]
  const SC:{[k:string]:string}={online:"#22c55e",away:"#f59e0b",offline:"#475569"}
  export default function App(){
    const[active,setActive]=useState("1")
    const[msgs,setMsgs]=useState<Msg[]>(INIT)
    const[input,setInput]=useState("")
    const[typing,setTyping]=useState(false)
    const[search,setSearch]=useState("")
    const endRef=useRef<HTMLDivElement>(null)
    useEffect(()=>endRef.current?.scrollIntoView({behavior:"smooth"}),[msgs])
    const send=(text=input)=>{
      if(!text.trim())return
      setMsgs(m=>[...m,{id:uid(),text:text.trim(),me:true,time:t(),emoji:""}])
      setInput("")
      setTyping(true)
      setTimeout(()=>{
        setTyping(false)
        setMsgs(m=>[...m,{id:uid(),text:REPLIES[Math.floor(Math.random()*REPLIES.length)],me:false,time:t(),emoji:""}])
      },1400)
    }
    const react=(id:string,e:string)=>setMsgs(m=>m.map(x=>x.id===id?{...x,emoji:x.emoji===e?"":e}:x))
    const contact=CONTACTS.find(c=>c.id===active)
    return(
      <div style={{display:"flex",height:"100vh",background:"#0f172a",fontFamily:"Inter,system-ui,sans-serif",color:"#e2e8f0"}}>
        <div style={{width:268,borderRight:"1px solid #1e293b",display:"flex",flexDirection:"column",background:"#111827",flexShrink:0}}>
          <div style={{padding:"1rem",borderBottom:"1px solid #1e293b"}}>
            <div style={{fontWeight:700,color:"#f8fafc",marginBottom:"0.75rem",fontSize:"1rem"}}>💬 Messages</div>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." style={{width:"100%",background:"#0f172a",border:"1px solid #334155",borderRadius:8,padding:"0.4rem 0.75rem",color:"#e2e8f0",outline:"none",fontSize:"0.82rem"}}/>
          </div>
          <div style={{flex:1,overflowY:"auto"}}>
            {CONTACTS.filter(c=>c.name.toLowerCase().includes(search.toLowerCase())).map(c=>(
              <div key={c.id} onClick={()=>setActive(c.id)} style={{padding:"0.75rem 1rem",cursor:"pointer",background:active===c.id?"#1e293b":"transparent",borderLeft:"3px solid "+(active===c.id?"#38bdf8":"transparent"),display:"flex",gap:"0.75rem",alignItems:"center"}}>
                <div style={{position:"relative",flexShrink:0}}>
                  <div style={{width:38,height:38,borderRadius:"50%",background:"#0f172a",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem"}}>{c.av}</div>
                  <div style={{position:"absolute",bottom:0,right:0,width:10,height:10,borderRadius:"50%",background:SC[c.status],border:"2px solid #111827"}}/>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:600,fontSize:"0.88rem",color:"#f1f5f9"}}>{c.name}</div>
                  <div style={{color:"#475569",fontSize:"0.73rem",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.last}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{flex:1,display:"flex",flexDirection:"column"}}>
          <div style={{padding:"0.75rem 1.5rem",borderBottom:"1px solid #1e293b",display:"flex",alignItems:"center",gap:"0.75rem",background:"#111827"}}>
            <div style={{width:36,height:36,borderRadius:"50%",background:"#0f172a",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem"}}>{contact?.av}</div>
            <div>
              <div style={{fontWeight:700,color:"#f1f5f9",fontSize:"0.92rem"}}>{contact?.name}</div>
              <div style={{fontSize:"0.72rem",color:SC[contact?.status||"offline"]}}>{contact?.status}</div>
            </div>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:"1.25rem 1.5rem",display:"flex",flexDirection:"column",gap:"0.7rem"}}>
            {msgs.map(m=>(
              <div key={m.id} style={{display:"flex",justifyContent:m.me?"flex-end":"flex-start",alignItems:"flex-end",gap:"0.5rem"}}>
                {!m.me&&<div style={{width:26,height:26,borderRadius:"50%",background:"#0f172a",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem",flexShrink:0}}>{contact?.av}</div>}
                <div>
                  <div style={{background:m.me?"#0ea5e9":"#1e293b",color:m.me?"#fff":"#e2e8f0",borderRadius:m.me?"14px 14px 4px 14px":"14px 14px 14px 4px",padding:"0.55rem 0.9rem",fontSize:"0.88rem",lineHeight:1.5,maxWidth:420,wordBreak:"break-word"}}>{m.text}</div>
                  <div style={{display:"flex",gap:"0.4rem",alignItems:"center",marginTop:"0.2rem",justifyContent:m.me?"flex-end":"flex-start"}}>
                    {m.emoji&&<span onClick={()=>react(m.id,m.emoji)} style={{cursor:"pointer",fontSize:"0.8rem",background:"#1e293b",borderRadius:8,padding:"0.1rem 0.35rem"}}>{m.emoji}</span>}
                    <span style={{color:"#475569",fontSize:"0.68rem"}}>{m.time}</span>
                  </div>
                </div>
              </div>
            ))}
            {typing&&<div style={{display:"flex",gap:"0.5rem",alignItems:"center"}}>
              <div style={{width:26,height:26,borderRadius:"50%",background:"#0f172a",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem"}}>{contact?.av}</div>
              <div style={{background:"#1e293b",borderRadius:"14px 14px 14px 4px",padding:"0.7rem 1rem"}}>
                <div style={{display:"flex",gap:3}}>{[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:"#94a3b8",opacity:0.5+i*0.25}}/>)}</div>
              </div>
            </div>}
            <div ref={endRef}/>
          </div>
          <div style={{padding:"0.75rem 1rem",borderTop:"1px solid #1e293b",background:"#111827"}}>
            <div style={{display:"flex",gap:"0.4rem",marginBottom:"0.5rem",flexWrap:"wrap"}}>
              {QUICK.map(q=><button key={q} onClick={()=>send(q)} style={{padding:"0.22rem 0.65rem",background:"#1e293b",color:"#94a3b8",border:"1px solid #334155",borderRadius:10,cursor:"pointer",fontSize:"0.72rem"}}>{q}</button>)}
            </div>
            <div style={{display:"flex",gap:"0.75rem",alignItems:"center"}}>
              <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Type a message..." style={{flex:1,background:"#0f172a",border:"1px solid #334155",borderRadius:20,padding:"0.6rem 1rem",color:"#e2e8f0",outline:"none",fontSize:"0.88rem"}}/>
              <button onClick={()=>send()} disabled={!input.trim()} style={{width:38,height:38,borderRadius:"50%",background:input.trim()?"#0ea5e9":"#1e293b",color:"#fff",border:"none",cursor:"pointer",fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center"}}>➤</button>
            </div>
          </div>
        </div>
      </div>
    )
  }