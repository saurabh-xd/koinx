import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
      <nav className="px-8 py-6 shadow-md border-b-1 bg-background ">
     
     <Link href="#">

     <Image src="/koinx.svg"   width="100"
          height="100"
          alt='logo' />
     
     </Link>
    
          

      
        

        
     
    </nav>
  )
}
