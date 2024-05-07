c = document.querySelector('#c')
icw=c.width = 1920
ich=c.height = 200
x = c.getContext('2d')
C = Math.cos
S = Math.sin
t = 0
T = Math.tan

rsz=window.onresize=()=>{
  setTimeout(()=>{
      c.style.width = 'calc(100% - 40px)'
      setTimeout(()=>c.style.height = c.clientWidth*(ich/icw) + 'px',0)
  },0)
}
rsz()

async function Draw(){
  oX=oY=oZ=0
  if(!t){
    R=R2=(Rl,Pt,Yw,m)=>{
      M=Math
      A=M.atan2
      H=M.hypot
      X=S(p=A(X,Z)+Yw)*(d=H(X,Z))
      Z=C(p)*d
      Y=S(p=A(Y,Z)+Pt)*(d=H(Y,Z))
      Z=C(p)*d
      X=S(p=A(X,Y)+Rl)*(d=H(X,Y))
      Y=C(p)*d
      if(m){
        X+=oX
        Y+=oY
        Z+=oZ
      }
    }
    Q=()=>[c.width/2+X/Z*900,c.height/2+Y/Z*900]

    Rn = Math.random

    stroke = (scol, fcol, lwo=1, od=true, oga=1) => {
      if(scol){
        //x.closePath()
        if(od) x.globalAlpha = .2*oga
        x.strokeStyle = scol
        x.lineWidth = Math.min(1000,100*lwo/Z)
        if(od) x.stroke()
        x.lineWidth /= 4
        x.globalAlpha = 1*oga
        x.stroke()
      }
      if(fcol){
        x.globalAlpha = 1*oga
        x.fillStyle = fcol
        x.fill()
      }
    }

    G_ = 100000, iSTc = 1e4
    ST = Array(iSTc).fill().map(v=>{
      X = (Rn()-.5)*G_
      Y = (Rn()-.5)*G_
      Z = (Rn()-.5)*G_
      return [X,Y,Z]
    })

    burst = new Image()
    burst.src = "https://srmcgann.github.io/temp/burst.png"

    starsLoaded = false, starImgs = [{loaded: false}]
    starImgs = Array(9).fill().map((v,i) => {
      let a = {img: new Image(), loaded: false}
      a.img.onload = () => {
        a.loaded = true
        setTimeout(()=>{
          if(starImgs.filter(v=>v.loaded).length == 9) starsLoaded = true
        }, 0)
      }
      a.img.src = `https://srmcgann.github.io/stars/star${i+1}.png`
      return a
    })

    showstars = false
    
    progress = []
    spawnProgress = () => {
      let obj = {
        X: 0,
        Y: 0,
        Z: 0,
        theta: 0,
      }
      progress = [...progress, obj]
    }
    fs = pct = 0
  }

  oX=0, oY=0, oZ=28
  Rl=0, Pt=0, Yw=0//pct<1?0:Yw+C(t*2)/10

  x.globalAlpha = 1
  x.fillStyle='#000f'
  x.fillRect(0,0,c.width,c.height)
  x.lineJoin = x.lineCap = 'round'

  if(showstars) ST.map(v=>{
    X = v[0]
    Y = v[1]
    Z = v[2]
    R(Rl,Pt,Yw,1)
    if(Z>0){
      if((x.globalAlpha = Math.min(1,(Z/5e3)**2))>.1){
        s = Math.min(1e3, 4e5/Z)
        x.fillStyle = '#ffffff04'
        l = Q()
        x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
        s/=5
        x.fillStyle = '#fffa'
        x.fillRect(l[0]-s/2,l[1]-s/2,s,s)
      }
    }
  })

  x.globalAlpha = 1

  pct = Math.min(1,t/4%2);
  x.textAlign = 'left'
  for(j=0;j<99*pct|0;j++){
    sd = 1
    w = 1
    sp = .5
    tx = (j-50) * sp + (-w/2+.5) * sp - 3.5
    ty = -1
    tz = 0
    ls1 = sp*2
    r = 16
    q2 = Math.PI * 2 / r * j
    for(m=2;m--;) {
      x.beginPath()
      q = (pct<1?t*8:t)+(m?Math.PI:0)
      for(i=sd; i--;){
        X = tx + w/sd*i*sp
        Y = ty + S(p=Math.PI*2/sd*i/r + q + q2)*ls1
        Z = tz + C(p)*ls1
        R(Rl,Pt,Yw,1)
        if(Z>0) x.lineTo(...Q())
        X = tx + w/sd*(i+1)*sp
        Y = ty + S(p=Math.PI*2/sd*(i+1)/r + q + q2)*ls1
        Z = tz + C(p)*ls1
        R(Rl,Pt,Yw,1)
        if(Z>0){
          if(m){
            l1 = Q()
            x.lineTo(...l1)
          }else{
            l2 = Q()
            x.lineTo(...l2)
          }
        }
      }
      col1 = `hsla(${pct<1?m*180:120},99%,50%,.7)`
      stroke(col1,'', 4, true)
    }
    if(typeof ipx == 'undefined') ipx = (l1[0]+l2[0])/2
  }
  if(typeof l1 != 'undefined'){
    x.font = (fs = 85) + "px Courier Prime"
    x.fillStyle = '#fff'
    ipx += (((l1[0]+l2[0])/2+fs/2) - ipx)/4
    s = 100
    if(pct<1){
      x.drawImage(starImgs[6].img,l1[0]-s/2,-s/2+l1[1],s,s)      
      x.drawImage(starImgs[1].img,l2[0]-s/2,-s/2+l2[1],s,s)      
    }else{
      x.drawImage(starImgs[4].img,l1[0]-s/2,-s/2+l1[1],s,s)
      x.drawImage(starImgs[4].img,l2[0]-s/2,-s/2+l2[1],s,s)
    }
    x.fillText((Math.round(pct*100)/1) + '%', ipx+fs*.25, c.height/2 - fs/16)
  }
  
  filename = "abcdefghijklm...xyz0123456789.exe"
  x.fillStyle = '#8888'
  x.textAlign = 'center'
  x.fillText(filename,c.width/2,c.height/2+fs)
  t+=1/60
  requestAnimationFrame(Draw)
}
Draw()