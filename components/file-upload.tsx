'use client'

import {X} from 'lucide-react'
import Image from 'next/image'

import '@uploadthing/react/styles.css'
import {UploadDropzone} from "@/lib/uploadthing";
import {createContext, FC, ReactNode, useContext, useEffect} from "react";


interface FileUploadProp {
    onChange: (url?: string) => void;
    value: string;
    endpoint: 'messageFile' | 'serverImage'
}

export const FileUpload = ({onChange, value, endpoint}: FileUploadProp) => {

    const fileType = value?.split('.').pop()
    if (value && fileType !== 'pdf') {
        return (

            <div className='relative h-24 w-24 drop-shadow-md'>
                <Image
                    fill
                    alt='server image preview'
                    src={value}
                    className='rounded-full'
                />
                <button onClick={() => onChange('')} className='bg-rose-500 text-white rounded-full absolute top-0 right-0 shadow-sm p-1'>
                    <X className='w-5 h-5'/>
                </button>
            </div>
        )
    }
    const onClientUploadCompleteHandler = (res: any) => {
        onChange(res?.[0].url)
    }
    const onUploadErrorHandler = (err: Error) => {
        console.log(err)
    }

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={onClientUploadCompleteHandler}
            onUploadError={onUploadErrorHandler}/>
    );
};