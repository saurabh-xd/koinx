import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Info } from "@phosphor-icons/react"

export default function Header() {
  return (
    <div className='flex flex-col gap-2 mb-4'>

        <div className='flex items-center  gap-2.5'>
            <h2 className="font-bold text-xl">Tax Harvesting</h2>
           <Tooltip>
  <TooltipTrigger className="text-blue-900 text-xs underline">{} How it Works?</TooltipTrigger>
  <TooltipContent side="bottom">
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique beatae omnis repellat quas? Quidem corporis possimus</p>
  </TooltipContent>
</Tooltip>
        </div>
        <div>
           <Accordion type="single" collapsible defaultValue="item-1" className="border border-blue-500 bg-blue-100 ">
  <AccordionItem value="item-1">
    <AccordionTrigger className="gap-2 items-center"><Info className="size-4.5 text-blue-600" />Is it accessible?</AccordionTrigger>
    <AccordionContent className="  text-sm ">

     <ul className="list-disc pl-5 space-y-1">
              <li>
                Tax harvesting rules apply based on local tax regulations.
              </li>
              <li>
                Capital gains/losses are calculated based on selected assets.
              </li>
              <li>
                Only realised losses are considered.
              </li>
            </ul>
              
          
    </AccordionContent>
  </AccordionItem>
</Accordion>
        </div>
    </div>
  )
}
