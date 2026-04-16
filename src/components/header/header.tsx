import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Info } from "@phosphor-icons/react";

export default function Header() {
  return (
    <div className="flex flex-col gap-3 mb-4">
      <div className="flex items-center  gap-2.5">
        <h2 className="font-bold text-xl text-[#0F172A] dark:text-[#FFFFFF]">Tax Harvesting</h2>
        <Tooltip>
          <TooltipTrigger className="text-[#0052FE] dark:text-[#4A78FF]  text-xs underline ">
            {} How it Works?
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Similique beatae omnis repellat quas? Quidem corporis possimus
            </p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div>
        <Accordion
          defaultValue={["item-1"]}
          className="border border-[#0052FE] bg-[#EAF2FF] dark:bg-[#121D3A]"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="gap-2 items-center text-[#0F172A] dark:text-[#FFFFFF]">
              <Info className="size-4.5 text-blue-600 " />
              Important Notes & Disclaimers
            </AccordionTrigger>
            <AccordionContent className="  text-sm ">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Tax harvesting rules apply based on local tax regulations.
                </li>
                <li>
                  Capital gains/losses are calculated based on selected assets.
                </li>
                <li>Only realised losses are considered.</li>
                <li>
                  Capital gains/losses are calculated based on selected assets.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
