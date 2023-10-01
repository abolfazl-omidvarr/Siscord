import {currentProfile} from "@/lib/current-profile";
import {redirect} from "next/navigation";
import {prisma} from "@/lib/db";
import NavigationAction from "@/components/navigation/navigation-action";

const NavigationSidebar = async () => {
    const profile = await currentProfile();

    if (!profile) return redirect('/');

    const server = await prisma.server.findMany({
        where: {
            Member: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    const x = 5

    return (
        <div className='space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3'>
            <NavigationAction/>
        </div>
    );
};

export default NavigationSidebar
