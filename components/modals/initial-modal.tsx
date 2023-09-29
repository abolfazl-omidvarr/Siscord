"use client";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";

import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {DialogDescription} from "@radix-ui/react-dialog";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FileUpload} from "@/components/file-upload";
import axios from "axios";
import {useRouter} from "next/navigation";

const formSchema = z.object({
    name: z
        .string()
        .min(1, {message: "Server name is required"})
        .max(30, {message: "Server name must be less than 30 characters"}),
    imageUrl: z.string().min(1, {message: "Server image is required"}),
});

export const InitialModal = () => {
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        },
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            await axios.post('/api/servers', data)
            router.refresh()
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    };


    if (!isMounted) return null;
    return (
        <Dialog open={true}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Customize your Server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Give your server a personal touch. Add a name and an image. you can
                        always change it in setting
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    name='imageUrl'
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint='serverImage'
                                                    value={field.value}
                                                    onChange={field.onChange}/>
                                            </FormControl>
                                        </FormItem>
                                    )
                                    }/>
                            </div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel
                                            className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Server name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Enter server name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button type="submit" variant="primary" disabled={isLoading}>
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
