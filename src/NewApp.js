import { Routes, Route } from "react-router-dom"
import Home from "./home"
import App from "./App"
import Mint from "./Mint"
import Faucet from "./Faucet"
import Earn from "./Earn"
import Stabilitypool from "./Stability"
import Redemption from "./Redemption"

function Appnew() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <App/> } />
        <Route path="/vault/rETH" element={ <Mint/> } />
        <Route path="/faucet" element={ <Faucet/> } />
        <Route path="/earn" element={ <Earn/> } />
        <Route path="/earn/stabilitypool" element={ <Stabilitypool/> } />
        <Route path="/redemptions" element={ <Redemption/> } />
      </Routes>
    </div>
  )
}

export default Appnew