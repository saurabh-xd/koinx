import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
      <nav className="sticky top-0 z-50 px-3 py-3 md:p-5 shadow-md border-b-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
     
     <Link href="#">

     <Image src="/koinx.svg"   width="100"
          height="100"
          alt='logo' />
     
     </Link>
    
          

      
        

        
     
    </nav>
  )
}
