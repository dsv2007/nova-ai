export default function Background() {
  return (
    <div style={{position:"fixed",inset:0,zIndex:0,overflow:"hidden",pointerEvents:"none"}}>
      <style>{`
        @keyframes float1 {
          0%,100% { transform: translate(0,0); }
          50%      { transform: translate(50px,-40px); }
        }
        @keyframes float2 {
          0%,100% { transform: translate(0,0); }
          50%      { transform: translate(-60px,50px); }
        }
        @keyframes float3 {
          0%,100% { transform: translate(0,0); }
          33%      { transform: translate(40px,-30px); }
          66%      { transform: translate(-30px,40px); }
        }
        @keyframes pulse {
          0%,100% { opacity:0.6; transform:scale(1); }
          50%      { opacity:1; transform:scale(1.3); }
        }
      `}</style>

      {/* Glow Orbs */}
      <div style={{position:"absolute",top:"5%",left:"5%",width:"500px",height:"500px",background:"radial-gradient(circle,rgba(59,130,246,0.4),transparent 70%)",borderRadius:"50%",filter:"blur(60px)",animation:"float1 8s ease-in-out infinite"}}/>
      <div style={{position:"absolute",top:"0",right:"0",width:"450px",height:"450px",background:"radial-gradient(circle,rgba(6,182,212,0.35),transparent 70%)",borderRadius:"50%",filter:"blur(60px)",animation:"float2 10s ease-in-out infinite"}}/>
      <div style={{position:"absolute",bottom:"10%",left:"30%",width:"600px",height:"600px",background:"radial-gradient(circle,rgba(139,92,246,0.2),transparent 70%)",borderRadius:"50%",filter:"blur(80px)",animation:"float3 12s ease-in-out infinite"}}/>
      <div style={{position:"absolute",bottom:"0",right:"10%",width:"400px",height:"400px",background:"radial-gradient(circle,rgba(59,130,246,0.3),transparent 70%)",borderRadius:"50%",filter:"blur(60px)",animation:"float1 9s ease-in-out infinite reverse"}}/>

      {/* Floating Dots */}
      <div style={{position:"absolute",top:"15%",left:"20%",width:"8px",height:"8px",borderRadius:"50%",background:"rgba(59,130,246,0.9)",boxShadow:"0 0 20px rgba(59,130,246,0.9)",animation:"float1 5s ease-in-out infinite"}}/>
      <div style={{position:"absolute",top:"25%",right:"20%",width:"6px",height:"6px",borderRadius:"50%",background:"rgba(6,182,212,0.9)",boxShadow:"0 0 15px rgba(6,182,212,0.9)",animation:"float2 6s ease-in-out infinite"}}/>
      <div style={{position:"absolute",top:"60%",left:"15%",width:"5px",height:"5px",borderRadius:"50%",background:"rgba(139,92,246,0.9)",boxShadow:"0 0 15px rgba(139,92,246,0.9)",animation:"float3 7s ease-in-out infinite"}}/>
      <div style={{position:"absolute",top:"70%",right:"15%",width:"8px",height:"8px",borderRadius:"50%",background:"rgba(59,130,246,0.9)",boxShadow:"0 0 20px rgba(59,130,246,0.9)",animation:"float2 8s ease-in-out infinite"}}/>
      <div style={{position:"absolute",top:"40%",right:"8%",width:"5px",height:"5px",borderRadius:"50%",background:"rgba(6,182,212,0.9)",boxShadow:"0 0 12px rgba(6,182,212,0.9)",animation:"float1 4s ease-in-out infinite reverse"}}/>
      <div style={{position:"absolute",top:"85%",left:"40%",width:"7px",height:"7px",borderRadius:"50%",background:"rgba(59,130,246,0.9)",boxShadow:"0 0 18px rgba(59,130,246,0.9)",animation:"float3 9s ease-in-out infinite"}}/>

      {/* Floating Diamonds */}
      <div style={{position:"absolute",top:"20%",right:"15%",width:"16px",height:"16px",border:"1.5px solid rgba(59,130,246,0.7)",boxShadow:"0 0 10px rgba(59,130,246,0.4)",transform:"rotate(45deg)",animation:"float3 9s ease-in-out infinite"}}/>
      <div style={{position:"absolute",top:"65%",left:"22%",width:"12px",height:"12px",border:"1.5px solid rgba(6,182,212,0.7)",boxShadow:"0 0 10px rgba(6,182,212,0.4)",transform:"rotate(45deg)",animation:"float1 7s ease-in-out infinite reverse"}}/>
      <div style={{position:"absolute",top:"30%",left:"60%",width:"20px",height:"20px",border:"1.5px solid rgba(139,92,246,0.6)",boxShadow:"0 0 10px rgba(139,92,246,0.3)",transform:"rotate(45deg)",animation:"float2 11s ease-in-out infinite"}}/>
      <div style={{position:"absolute",top:"78%",right:"30%",width:"10px",height:"10px",border:"1.5px solid rgba(59,130,246,0.6)",transform:"rotate(45deg)",animation:"float3 6s ease-in-out infinite reverse"}}/>

      {/* Floating Lines */}
      <div style={{position:"absolute",top:"45%",left:"5%",width:"70px",height:"1px",background:"linear-gradient(90deg,transparent,rgba(59,130,246,0.8),transparent)",animation:"float2 6s ease-in-out infinite"}}/>
      <div style={{position:"absolute",top:"55%",right:"5%",width:"90px",height:"1px",background:"linear-gradient(90deg,transparent,rgba(6,182,212,0.8),transparent)",animation:"float1 8s ease-in-out infinite reverse"}}/>
      <div style={{position:"absolute",top:"80%",left:"45%",width:"60px",height:"1px",background:"linear-gradient(90deg,transparent,rgba(139,92,246,0.7),transparent)",animation:"float3 5s ease-in-out infinite"}}/>

      {/* Grid */}
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px)",backgroundSize:"60px 60px"}}/>
    </div>
  );
}