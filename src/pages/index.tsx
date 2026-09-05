import { useEffect } from "react"
import { useRouter } from "next/router"
export default function Home(){
  const router = useRouter()
  useEffect(()=>{ router.push("/login") },[])
  return <div style={{padding:40}}>Redirecting to login...</div>
}