'use client'
import {Plus} from "lucide-react";
import ActionTooltip from "@/components/action-tooltip";
import { useDispatch } from "react-redux";
import { openCreateServer } from "@/redux/slices/modalSlice";

const NavigationAction = () => {
  const dispatch = useDispatch()
  const onAddServerClickHandler = () =>{
    dispatch(openCreateServer())
  }
    return (
        <div>
            <ActionTooltip
                label='Add a server'
                align='center'
                side='right'>
                <button onClick={onAddServerClickHandler} className='group flex items-center'>
                    <div
                        className='flex items-center justify-center mx-3 h-[48px] w-[48px] rounded-[24px] hover:rounded-[16px] transition-all overflow-hidden bg-background dark:bg-neutral-700 group-hover:bg-emerald-400'>
                        <Plus className='group-hover:text-zinc-100 transition text-emerald-400' size={25}/>
                    </div>
                </button>
            </ActionTooltip>

        </div>


    );
};

export default NavigationAction
